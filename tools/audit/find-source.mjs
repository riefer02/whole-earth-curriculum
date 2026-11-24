#!/usr/bin/env node
/**
 * Find a registered source by keyword.
 *
 * Citations in this repository must point at a source that is already in
 * `sources/sources.yaml` — there is one registry, and nobody adds to it casually.
 * This searches it so an author can find the right existing citation instead of
 * inventing one, or quietly dropping the claim.
 *
 *   node tools/audit/find-source.mjs retrieval
 *   node tools/audit/find-source.mjs sleep --limit 5
 *   node tools/audit/find-source.mjs --list-domains
 *
 * Prints: id · year · title · url · domains. Exits 1 when nothing matches, so a
 * shell loop can tell "no source for this claim" from "found one".
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const args = process.argv.slice(2);
const limitFlag = args.indexOf('--limit');
const limit = limitFlag === -1 ? 12 : Number(args[limitFlag + 1] ?? 12);
const terms = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--limit');

const { sources } = parse(fs.readFileSync(path.join(ROOT, 'sources', 'sources.yaml'), 'utf8'));

if (args.includes('--list-domains')) {
  const domains = new Set();
  for (const source of sources) for (const d of source.domains ?? []) domains.add(d);
  console.log([...domains].sort().join('\n'));
  process.exit(0);
}

const query = terms.join(' ').trim().toLowerCase();
const haystack = (source) =>
  [source.id, source.title, source.organization, source.url, source.type, ...(source.domains ?? []), source.notes]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

const hits = sources
  .filter((source) => !query || haystack(source).includes(query))
  .slice(0, limit);

if (!hits.length) {
  console.error(`No registered source matches "${query}".`);
  console.error('Do not invent one. Either use a source that does support the claim, or');
  console.error('leave the claim uncited and report it.');
  process.exit(1);
}

for (const source of hits) {
  const domains = (source.domains ?? []).join(', ') || '—';
  console.log(`${source.id} · ${source.year ?? '—'} · ${source.title}`);
  console.log(`    ${source.url ?? ''}`);
  console.log(`    domains: ${domains}`);
  if (source.notes) console.log(`    notes: ${String(source.notes).slice(0, 220)}`);
}
