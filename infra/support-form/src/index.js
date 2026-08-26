const roles = new Set(['educator', 'expert', 'translator', 'funder', 'contributor', 'other']);
const supportTypes = new Set(['pilot', 'review', 'localize', 'fund', 'other']);
const capacities = new Set(['conversation', 'lessons', 'unit', 'ongoing']);
const fundingRanges = new Set([
  'in-kind',
  'under-5000',
  '5000-25000',
  '25000-100000',
  '100000-plus',
]);
const turnstileVerifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': origin,
      Vary: 'Origin',
      'Cache-Control': 'no-store',
    },
  });
}

function text(value, max, required = false, multiline = false) {
  if (value === null || value === undefined || value === '') {
    if (required) throw new Error('missing');
    return null;
  }
  if (typeof value !== 'string') throw new Error('type');
  const clean = value.normalize('NFC').trim();
  const controls = multiline
    ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/
    : /[\u0000-\u001F\u007F]/;
  if (controls.test(clean)) throw new Error('control');
  if ((required && !clean) || clean.length > max) throw new Error('length');
  return clean || null;
}

function allowed(value, values, required = false) {
  const clean = text(value, 100, required);
  if (clean === null) return null;
  if (!values.has(clean)) throw new Error('choice');
  return clean;
}

async function rateLimitKey(email) {
  const bytes = new TextEncoder().encode(email.toLowerCase());
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function verifyTurnstile(token, secret, origin, request) {
  try {
    const response = await fetch(turnstileVerifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        response: token,
        remoteip: request.headers.get('CF-Connecting-IP') || undefined,
        idempotency_key: crypto.randomUUID(),
      }),
    });
    if (!response.ok) return 'unavailable';

    const result = await response.json();
    const expectedHostname = new URL(origin).hostname;
    if (
      result.success !== true ||
      result.action !== 'support_interest' ||
      result.hostname !== expectedHostname
    ) {
      return 'invalid';
    }
    return 'valid';
  } catch {
    return 'unavailable';
  }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowedOrigins = new Set(
      String(env.ALLOWED_ORIGINS || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    );

    if (!allowedOrigins.has(origin)) {
      return new Response('Origin not allowed', { status: 403 });
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
          Vary: 'Origin',
        },
      });
    }

    const url = new URL(request.url);
    if (request.method !== 'POST' || url.pathname !== '/support-interest') {
      return json({ error: 'Not found' }, 404, origin);
    }

    const contentType = request.headers.get('Content-Type') || '';
    if (!contentType.toLowerCase().startsWith('application/json')) {
      return json({ error: 'Content type must be application/json' }, 415, origin);
    }

    const declaredLength = Number(request.headers.get('Content-Length') || 0);
    if (declaredLength > 20_000) {
      return json({ error: 'Request too large' }, 413, origin);
    }

    let input;
    try {
      const raw = await request.text();
      if (raw.length > 20_000) {
        return json({ error: 'Request too large' }, 413, origin);
      }
      input = JSON.parse(raw);
      if (!input || typeof input !== 'object' || Array.isArray(input)) {
        throw new Error('shape');
      }
    } catch {
      return json({ error: 'Invalid JSON' }, 400, origin);
    }

    // Honeypot submissions receive a neutral success and are not stored.
    if (input.website) return json({ ok: true }, 201, origin);

    let row;
    let turnstileToken;
    try {
      const email = text(input.email, 320, true);
      if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('email');
      if (input.contact_consent !== true) throw new Error('consent');
      turnstileToken = text(input.turnstile_token, 2048, true);

      row = {
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        name: text(input.name, 160, true),
        email,
        role: allowed(input.role, roles, true),
        organization: text(input.organization, 240),
        region: text(input.region, 160, true),
        support_type: allowed(input.support_type, supportTypes, true),
        focus: text(input.focus, 500),
        capacity: allowed(input.capacity, capacities),
        funding_range: allowed(input.funding_range, fundingRanges),
        message: text(input.message, 5000, false, true),
        contact_consent: 1,
        source_path: text(input.source_path, 500) || '/support/',
      };
    } catch {
      return json({ error: 'Invalid submission' }, 400, origin);
    }

    const verification = await verifyTurnstile(
      turnstileToken,
      env.TURNSTILE_SECRET_KEY,
      origin,
      request,
    );
    if (verification === 'unavailable') {
      return json({ error: 'Verification unavailable' }, 503, origin);
    }
    if (verification !== 'valid') {
      return json({ error: 'Verification failed' }, 400, origin);
    }

    // Rate-limit only verified people so forged requests cannot exhaust another
    // person's allowance by submitting their email address.
    const { success: withinLimit } = await env.SUBMISSION_RATE_LIMITER.limit({
      key: await rateLimitKey(row.email),
    });
    if (!withinLimit) {
      return json({ error: 'Too many submissions; please try again later' }, 429, origin);
    }

    try {
      await env.DB.prepare(
        `insert into support_interests (
          id, created_at, name, email, role, organization, region,
          support_type, focus, capacity, funding_range, message,
          contact_consent, source_path
        ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
        .bind(
          row.id,
          row.created_at,
          row.name,
          row.email,
          row.role,
          row.organization,
          row.region,
          row.support_type,
          row.focus,
          row.capacity,
          row.funding_range,
          row.message,
          row.contact_consent,
          row.source_path,
        )
        .run();
    } catch (error) {
      console.error('support_interest_insert_failed', {
        submission_id: row.id,
        error_type: error instanceof Error ? error.name : typeof error,
      });
      return json({ error: 'Storage unavailable' }, 503, origin);
    }

    return json({ ok: true }, 201, origin);
  },

  async scheduled(_controller, env) {
    const result = await env.DB.prepare(
      `delete from support_interests
       where datetime(created_at) < datetime('now', '-24 months')
          or (
            status in ('closed', 'declined')
            and datetime(created_at) < datetime('now', '-12 months')
          )`,
    ).run();
    console.log('support_interest_retention_complete', result.meta?.changes ?? 0);
  },
};
