import assert from 'node:assert/strict';
import test from 'node:test';

import worker from './index.js';

const origin = 'https://wholeearthcurriculum.org';

function valid(overrides = {}) {
  return {
    name: 'A Reviewer',
    email: 'reviewer@example.org',
    role: 'expert',
    organization: null,
    region: 'East Africa',
    support_type: 'review',
    focus: 'Grade 4 science',
    capacity: 'unit',
    funding_range: null,
    message: 'I can review one unit.',
    contact_consent: true,
    source_path: '/support/',
    website: '',
    turnstile_token: 'valid-test-token',
    ...overrides,
  };
}

function environment({ withinLimit = true } = {}) {
  const calls = [];
  return {
    calls,
    env: {
      ALLOWED_ORIGINS: origin,
      TURNSTILE_SECRET_KEY: 'test-secret',
      SUBMISSION_RATE_LIMITER: {
        async limit({ key }) {
          assert.match(key, /^[a-f0-9]{64}$/);
          return { success: withinLimit };
        },
      },
      DB: {
        prepare(sql) {
          return {
            bind(...values) {
              return {
                async run() {
                  calls.push({ sql, values });
                  return { success: true };
                },
              };
            },
          };
        },
      },
    },
  };
}

async function withTurnstile(result, callback) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
    assert.equal(options.method, 'POST');
    const body = JSON.parse(options.body);
    assert.equal(body.secret, 'test-secret');
    assert.equal(body.response, 'valid-test-token');
    return new Response(JSON.stringify(result), {
      status: result.httpStatus || 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };
  try {
    return await callback();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function validTurnstile(overrides = {}) {
  return {
    success: true,
    action: 'support_interest',
    hostname: 'wholeearthcurriculum.org',
    ...overrides,
  };
}

function request(body, overrides = {}) {
  return new Request('https://worker.example/support-interest', {
    method: 'POST',
    headers: {
      Origin: origin,
      'Content-Type': 'application/json',
      ...(overrides.headers || {}),
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

test('accepts a valid submission without storing the Turnstile token', async () => {
  const { env, calls } = environment();
  const response = await withTurnstile(validTurnstile(), () =>
    worker.fetch(request(valid()), env),
  );

  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(calls.length, 1);
  assert.match(calls[0].sql, /^insert into support_interests/);
  assert.equal(calls[0].values.includes('valid-test-token'), false);
});

test('rejects requests from unlisted origins', async () => {
  const { env, calls } = environment();
  const response = await worker.fetch(
    request(valid(), { headers: { Origin: 'https://attacker.example' } }),
    env,
  );

  assert.equal(response.status, 403);
  assert.equal(calls.length, 0);
});

test('has no public read route', async () => {
  const { env, calls } = environment();
  const response = await worker.fetch(
    new Request('https://worker.example/support-interest', {
      method: 'GET',
      headers: { Origin: origin },
    }),
    env,
  );

  assert.equal(response.status, 404);
  assert.equal(calls.length, 0);
});

test('rejects invalid enumerated values', async () => {
  const { env, calls } = environment();
  const response = await worker.fetch(request(valid({ role: 'administrator' })), env);

  assert.equal(response.status, 400);
  assert.equal(calls.length, 0);
});

test('rejects control characters in single-line fields', async () => {
  const { env, calls } = environment();
  const response = await worker.fetch(request(valid({ name: 'Bad\nName' })), env);

  assert.equal(response.status, 400);
  assert.equal(calls.length, 0);
});

test('silently discards honeypot submissions', async () => {
  const { env, calls } = environment();
  const response = await worker.fetch(request(valid({ website: 'spam.example' })), env);

  assert.equal(response.status, 201);
  assert.equal(calls.length, 0);
});

test('enforces body size when content-length is unavailable', async () => {
  const { env, calls } = environment();
  const response = await worker.fetch(request(`{"message":"${'x'.repeat(20_100)}"}`), env);

  assert.equal(response.status, 413);
  assert.equal(calls.length, 0);
});

test('rejects an invalid or replayed Turnstile token', async () => {
  const { env, calls } = environment();
  const response = await withTurnstile(validTurnstile({ success: false }), () =>
    worker.fetch(request(valid()), env),
  );

  assert.equal(response.status, 400);
  assert.equal(calls.length, 0);
});

test('rejects a Turnstile token issued for another hostname', async () => {
  const { env, calls } = environment();
  const response = await withTurnstile(
    validTurnstile({ hostname: 'attacker.example' }),
    () => worker.fetch(request(valid()), env),
  );

  assert.equal(response.status, 400);
  assert.equal(calls.length, 0);
});

test('fails closed when Turnstile verification is unavailable', async () => {
  const { env, calls } = environment();
  const response = await withTurnstile(validTurnstile({ httpStatus: 503 }), () =>
    worker.fetch(request(valid()), env),
  );

  assert.equal(response.status, 503);
  assert.equal(calls.length, 0);
});

test('rate limits verified repeated submissions before storage', async () => {
  const { env, calls } = environment({ withinLimit: false });
  const response = await withTurnstile(validTurnstile(), () =>
    worker.fetch(request(valid()), env),
  );

  assert.equal(response.status, 429);
  assert.equal(calls.length, 0);
});

test('scheduled retention removes only expired records without reading PII', async () => {
  let statement = '';
  const env = {
    DB: {
      prepare(sql) {
        statement = sql;
        return {
          async run() {
            return { meta: { changes: 2 } };
          },
        };
      },
    },
  };

  await worker.scheduled({}, env);
  assert.match(statement, /delete from support_interests/);
  assert.match(statement, /'-24 months'/);
  assert.match(statement, /status in \('closed', 'declined'\)/);
});

test('storage failures log identifiers and error types without PII', async () => {
  const { env } = environment();
  env.DB.prepare = () => ({
    bind() {
      return {
        async run() {
          throw new Error('reviewer@example.org must never reach logs');
        },
      };
    },
  });

  const logged = [];
  const originalError = console.error;
  console.error = (...args) => logged.push(args);
  try {
    const response = await withTurnstile(validTurnstile(), () =>
      worker.fetch(request(valid()), env),
    );
    assert.equal(response.status, 503);
  } finally {
    console.error = originalError;
  }

  const output = JSON.stringify(logged);
  assert.match(output, /support_interest_insert_failed/);
  assert.match(output, /submission_id/);
  assert.match(output, /Error/);
  assert.doesNotMatch(output, /reviewer@example\.org/);
});
