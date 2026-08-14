import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, stringify } from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const BACKLOG = path.join(ROOT, 'agents', 'backlog', 'backlog.yaml');
const STATE = path.join(ROOT, 'agents', 'state', 'state.json');
const PIPELINE = path.join(ROOT, 'agents', 'pipeline.yaml');

function readBacklog() {
  return parse(fs.readFileSync(BACKLOG, 'utf8')) ?? { items: [] };
}

function writeBacklog(backlog) {
  fs.writeFileSync(BACKLOG, stringify(backlog, { lineWidth: 0 }) + '\n');
}

function readState() {
  if (!fs.existsSync(STATE)) return { claimed: {}, last_updated: null };
  return JSON.parse(fs.readFileSync(STATE, 'utf8'));
}

function writeState(state) {
  fs.writeFileSync(STATE, JSON.stringify(state, null, 2) + '\n');
}

function readPipeline() {
  if (!fs.existsSync(PIPELINE)) return { stages: [] };
  return parse(fs.readFileSync(PIPELINE, 'utf8')) ?? { stages: [] };
}

function stageMap() {
  const map = new Map();
  for (const stage of readPipeline().stages ?? []) {
    for (const agent of stage.agents ?? []) {
      map.set(agent, { order: stage.order, name: stage.name });
    }
  }
  return map;
}

function isUnblocked(item, backlog) {
  const done = new Set(backlog.items.filter((i) => i.status === 'done').map((i) => i.id));
  return (item.depends_on ?? []).every((d) => done.has(d));
}

function nextReviewer(item) {
  for (const agent of item.required_reviews ?? []) {
    const r = (item.reviews ?? {})[agent];
    if (!r || r.verdict !== 'passed') return agent;
  }
  return null;
}

function reviewProgress(item) {
  const req = item.required_reviews ?? [];
  const passed = req.filter((a) => (item.reviews ?? {})[a]?.verdict === 'passed').length;
  return `${passed}/${req.length}`;
}

function stageLabel(agent, map) {
  const s = map.get(agent);
  return s ? `${s.order}.${s.name}` : '?';
}

function readyItems(agentId) {
  const backlog = readBacklog();
  return backlog.items
    .filter((i) => i.status === 'ready' && isUnblocked(i, backlog))
    .filter((i) => !agentId || i.agent === agentId)
    .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99) || a.id.localeCompare(b.id));
}

function reviewItems(agentId) {
  const backlog = readBacklog();
  return backlog.items
    .filter((i) => i.status === 'review')
    .filter((i) => !agentId || nextReviewer(i) === agentId);
}

function report() {
  const backlog = readBacklog();
  const map = stageMap();
  const byStatus = { ready: 0, claimed: 0, review: 0, done: 0 };
  for (const item of backlog.items) {
    byStatus[item.status] = (byStatus[item.status] ?? 0) + 1;
  }
  console.log(`Backlog: ${backlog.items.length} item(s)`);
  for (const [status, count] of Object.entries(byStatus)) {
    console.log(`  ${status.padEnd(8)} ${count}`);
  }
  console.log('\nItems:');
  for (const item of backlog.items) {
    const prog = item.status === 'review' ? ` [reviews ${reviewProgress(item)}]` : '';
    console.log(
      `  ${item.id.padEnd(7)} ${(item.status ?? '?').padEnd(8)} [${stageLabel(item.agent, map).padEnd(12)}] ${(item.agent ?? '').padEnd(20)}${prog} ${item.title}`
    );
  }
}

function pipeline() {
  console.log('Pipeline (sequential stages):');
  for (const stage of readPipeline().stages ?? []) {
    console.log(`  ${stage.order}. ${stage.name.padEnd(12)} ${(stage.agents ?? []).join(', ')}`);
  }
}

function stale(thresholdMin) {
  const backlog = readBacklog();
  const now = Date.now();
  const threshold = thresholdMin * 60 * 1000;
  const flagged = [];
  for (const item of backlog.items) {
    let at = null;
    if (item.status === 'claimed') at = item.claimed_at;
    else if (item.status === 'review') at = item.submitted_at;
    if (!at) continue;
    const age = now - new Date(at).getTime();
    if (age > threshold) flagged.push({ id: item.id, status: item.status, age, title: item.title });
  }
  if (!flagged.length) {
    console.log(`No stalled items (threshold ${thresholdMin} min).`);
    return;
  }
  console.log(`Stalled items (>${thresholdMin} min):`);
  for (const f of flagged) {
    console.log(`  ${f.id.padEnd(7)} ${f.status.padEnd(8)} ~${Math.round(f.age / 60000)} min  ${f.title}`);
  }
}

const [cmd, arg1, arg2, arg3] = process.argv.slice(2);

switch (cmd) {
  case 'next': {
    const map = stageMap();
    const ready = readyItems(arg1);
    const reviews = reviewItems(arg1);
    if (!arg1) {
      const item = ready[0];
      if (item) {
        console.log(`Next item to author (${item.agent}, stage ${stageLabel(item.agent, map)}):`);
        console.log(`  ${item.id}  [${item.type ?? 'work'}]  ${item.title}`);
        if (item.depends_on?.length) console.log(`  depends_on: ${item.depends_on.join(', ')}`);
        console.log(`  claim: npm run loop:claim -- ${item.agent} ${item.id}`);
      } else {
        console.log('No ready items to author.');
      }
      if (reviews.length) {
        console.log('\nPending reviews:');
        for (const r of reviews) {
          console.log(`  ${r.id} — next reviewer: ${nextReviewer(r)} (${reviewProgress(r)} passed)`);
        }
      }
      break;
    }
    const item = ready[0];
    if (item) {
      console.log(`Next item to author for ${item.agent}:`);
      console.log(`  ${item.id}  [${item.type ?? 'work'}]  ${item.title}`);
      if (item.depends_on?.length) console.log(`  depends_on: ${item.depends_on.join(', ')}`);
      console.log(`  claim: npm run loop:claim -- ${item.agent} ${item.id}`);
    }
    if (reviews.length) {
      console.log(`Items awaiting review by ${arg1}:`);
      for (const r of reviews) {
        console.log(`  ${r.id} (${reviewProgress(r)} passed) — ${r.title}`);
        console.log(`  verdict: npm run loop:review -- ${r.id} ${arg1} passed|blocked "<note>"`);
      }
    }
    if (!item && !reviews.length) {
      console.log(`Nothing for agent "${arg1}".`);
    }
    break;
  }

  case 'list': {
    const map = stageMap();
    for (const item of readBacklog().items) {
      const prog = item.status === 'review' ? ` [${reviewProgress(item)}]` : '';
      console.log(
        `${item.id.padEnd(7)} ${(item.status ?? '?').padEnd(8)} [${stageLabel(item.agent, map).padEnd(12)}] ${(item.agent ?? '').padEnd(20)}${prog} ${item.title}`
      );
    }
    break;
  }

  case 'claim': {
    const agentId = arg1;
    const itemId = arg2;
    if (!agentId || !itemId) {
      console.error('Usage: npm run loop:claim -- <agent-id> <item-id>');
      process.exit(1);
    }
    const backlog = readBacklog();
    const item = backlog.items.find((i) => i.id === itemId);
    if (!item) fail(`Item "${itemId}" not found.`);
    if (item.status !== 'ready') fail(`Item "${itemId}" is "${item.status}", not "ready".`);
    if (item.agent !== agentId) fail(`Item "${itemId}" belongs to "${item.agent}", not "${agentId}".`);
    if (!isUnblocked(item, backlog)) fail(`Item "${itemId}" is blocked by unmet dependencies: ${item.depends_on.join(', ')}.`);
    item.status = 'claimed';
    item.claimed_at = new Date().toISOString();
    delete item.submitted_at;
    writeBacklog(backlog);
    const state = readState();
    state.claimed[itemId] = agentId;
    state.last_updated = new Date().toISOString().slice(0, 10);
    writeState(state);
    console.log(`Claimed ${itemId} for ${agentId}.`);
    break;
  }

  case 'submit': {
    const itemId = arg1;
    if (!itemId) {
      console.error('Usage: npm run loop:submit -- <item-id>');
      process.exit(1);
    }
    const backlog = readBacklog();
    const item = backlog.items.find((i) => i.id === itemId);
    if (!item) fail(`Item "${itemId}" not found.`);
    if (item.status !== 'claimed') fail(`Item "${itemId}" is "${item.status}", not "claimed".`);
    item.status = 'review';
    item.submitted_at = new Date().toISOString();
    writeBacklog(backlog);
    console.log(`Submitted ${itemId} for review.`);
    if (item.required_reviews?.length) {
      console.log(`  Required reviewers (in order): ${item.required_reviews.join(' → ')}`);
    } else {
      console.log('  No reviewers required; run loop:complete to finish.');
    }
    break;
  }

  case 'review': {
    const itemId = arg1;
    const agentId = arg2;
    const verdict = arg3;
    const note = process.argv.slice(6).join(' ');
    if (!itemId || !agentId || !['passed', 'blocked'].includes(verdict)) {
      console.error('Usage: npm run loop:review -- <item-id> <agent-id> passed|blocked "<note>"');
      process.exit(1);
    }
    const backlog = readBacklog();
    const item = backlog.items.find((i) => i.id === itemId);
    if (!item) fail(`Item "${itemId}" not found.`);
    if (item.status !== 'review') fail(`Item "${itemId}" is "${item.status}", not "review".`);
    const req = item.required_reviews ?? [];
    const idx = req.indexOf(agentId);
    if (idx === -1) fail(`"${agentId}" is not a required reviewer for ${itemId}.`);
    for (let i = 0; i < idx; i++) {
      if (!(item.reviews ?? {})[req[i]] || (item.reviews ?? {})[req[i]].verdict !== 'passed') {
        fail(`Cannot review out of order: "${req[i]}" must pass before "${agentId}".`);
      }
    }
    item.reviews = item.reviews ?? {};
    if (verdict === 'passed') {
      item.reviews[agentId] = note ? { verdict: 'passed', note } : { verdict: 'passed' };
      writeBacklog(backlog);
      console.log(`${agentId} passed ${itemId} (${reviewProgress(item)}).`);
      if (nextReviewer(item) === null) {
        console.log('  All reviews passed. Run: npm run loop:complete -- ' + itemId);
      }
    } else {
      item.status = 'claimed';
      item.claimed_at = new Date().toISOString();
      delete item.submitted_at;
      item.reviews = {};
      item.notes = (item.notes ? item.notes + ' ' : '') + `Blocked by ${agentId}${note ? ': ' + note : ''}.`;
      writeBacklog(backlog);
      console.log(`${agentId} blocked ${itemId}. Sent back to "${item.agent}" for rework; review chain restarts.`);
    }
    break;
  }

  case 'complete': {
    const itemId = arg1;
    if (!itemId) {
      console.error('Usage: npm run loop:complete -- <item-id>');
      process.exit(1);
    }
    const backlog = readBacklog();
    const item = backlog.items.find((i) => i.id === itemId);
    if (!item) fail(`Item "${itemId}" not found.`);
    if (item.status !== 'review') fail(`Item "${itemId}" is "${item.status}", not "review".`);
    if (!isUnblocked(item, backlog)) fail(`Item "${itemId}" is blocked by unmet dependencies: ${item.depends_on.join(', ')}.`);
    const missing = (item.required_reviews ?? []).filter(
      (a) => (item.reviews ?? {})[a]?.verdict !== 'passed'
    );
    if (missing.length) fail(`Cannot complete ${itemId}: missing reviews from ${missing.join(', ')}.`);
    item.status = 'done';
    delete item.claimed_at;
    delete item.submitted_at;
    writeBacklog(backlog);
    const state = readState();
    delete state.claimed[itemId];
    state.last_updated = new Date().toISOString().slice(0, 10);
    writeState(state);
    console.log(`Completed ${itemId}. Remember to commit the change.`);
    break;
  }

  case 'report':
    report();
    break;

  case 'pipeline':
    pipeline();
    break;

  case 'stale': {
    const n = parseInt(arg1, 10);
    stale(isNaN(n) ? 30 : n);
    break;
  }

  default:
    console.log(
      'Usage:\n' +
        '  npm run loop:next [agent-id]\n' +
        '  npm run loop:list\n' +
        '  npm run loop:claim -- <agent-id> <item-id>\n' +
        '  npm run loop:submit -- <item-id>\n' +
        '  npm run loop:review -- <item-id> <agent-id> passed|blocked "<note>"\n' +
        '  npm run loop:complete -- <item-id>\n' +
        '  npm run loop:report\n' +
        '  npm run loop:pipeline\n' +
        '  npm run loop:stale [minutes]'
    );
    process.exit(cmd ? 1 : 0);
}

function fail(msg) {
  console.error(msg);
  process.exit(1);
}
