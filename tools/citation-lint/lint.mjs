import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const SOURCES_FILE = path.join(ROOT, 'sources', 'sources.yaml');

const problems = [];
let sourceCount = 0;

const raw = fs.readFileSync(SOURCES_FILE, 'utf8');
const data = parse(raw);

if (!data || !Array.isArray(data.sources)) {
  problems.push(`root: "sources" must be a non-empty list`);
} else {
  const seenIds = new Set();

  for (const source of data.sources) {
    sourceCount++;

    for (const field of ['id', 'title', 'type']) {
      if (!source[field] || !String(source[field]).trim()) {
        problems.push(`source #${sourceCount}: missing or empty required field "${field}"`);
      }
    }

    const id = String(source.id ?? '');
    if (id) {
      if (!/^S-\d{3}$/.test(id)) {
        problems.push(`${id}: id must match pattern S-NNN (e.g. S-001)`);
      }
      if (seenIds.has(id)) {
        problems.push(`${id}: duplicate id`);
      } else {
        seenIds.add(id);
      }
    }

    const url = source.url;
    if (url) {
      if (!/^https?:\/\//.test(String(url))) {
        problems.push(`${id}: url must start with http:// or https://, got "${url}"`);
      }
    }
  }
}

if (problems.length > 0) {
  console.error(`\n${sourceCount} sources checked, ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  console.error('');
  process.exit(1);
}

console.log(`${sourceCount} sources checked, 0 problems`);
process.exit(0);