#!/usr/bin/env node
/**
 * Strip the boilerplate opener from facilitator notes.
 *
 * "This lesson is written to the learner ("you")." opens 1,586 of 1,676 notes.
 * The voice rule is already canon (docs/schema.md § "Voice: learner-first",
 * docs/facilitation.md § "Voice: speak and write to the learner"), so repeating
 * it on every page is ~17,000 words of noise a teacher scrolls past.
 *
 * Only the exact, contentless forms are removed. Any opener that carries real
 * guidance ("…and it closes the unit — so the closing circle is also…") is left
 * alone and reported for a human.
 *
 *   node tools/audit/fix-notes.mjs --dry   # report
 *   node tools/audit/fix-notes.mjs         # apply
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const DRY = process.argv.includes('--dry');
const WRAP = 88;

const BOILERPLATE = [
  /^This lesson is written to the learner \("you"\),? so it works in a classroom and for a self-directed learner\.$/i,
  /^Written to the learner \("you"\) so it works in a classroom and for a self-directed learner\.$/i,
  /^This lesson is written to the learner \("you"\)\.$/i,
  /^Written to the learner \("you"\)\.$/i,
  /^This lesson is written to the learner\.$/i,
];

function walk(dir, match) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, match));
    else if (match(entry.name)) out.push(full);
  }
  return out;
}

const sentences = (s) => s.replace(/\s+/g, ' ').trim().match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];

function reflow(text) {
  // A dash never starts a line: glue it to the word before it.
  const words = text.split(/\s+/).filter(Boolean).reduce((acc, w) => {
    if ((w === '—' || w === '–') && acc.length) acc[acc.length - 1] += ` ${w}`;
    else acc.push(w);
    return acc;
  }, []);
  const out = [];
  let line = '';
  for (const w of words) {
    if (line && line.length + 1 + w.length > WRAP) {
      out.push(line);
      line = w;
    } else {
      line = line ? `${line} ${w}` : w;
    }
  }
  if (line) out.push(line);
  return out.join('\n');
}

let changed = 0;
const skipped = [];

for (const file of walk(path.join(ROOT, 'curriculum', 'k-12'), (n) => /^lesson-.*\.md$/.test(n))) {
  const original = fs.readFileSync(file, 'utf8');
  const lines = original.split('\n');
  const heading = lines.findIndex((l) => l.trim() === '## Facilitator note');
  if (heading === -1) continue;
  let end = lines.findIndex((l, i) => i > heading && l.startsWith('## '));
  if (end === -1) end = lines.length;

  const note = lines.slice(heading + 1, end).join('\n').trim();
  const paragraphs = note.split(/\n\s*\n/).filter((p) => p.trim());
  if (!paragraphs.length) continue;

  const first = paragraphs[0].replace(/\s+/g, ' ').trim();
  const [opener] = sentences(first);
  const rule = BOILERPLATE.find((re) => re.test(opener.trim()));
  if (!rule) continue;

  const remainder = first.slice(opener.length).trim();
  const rest = paragraphs.slice(1).join(' ').trim();
  if (words(`${remainder} ${rest}`) < 15) {
    skipped.push(`${path.relative(ROOT, file)} — nothing but boilerplate; needs a real note`);
    continue;
  }

  const rebuilt = remainder ? [reflow(remainder), ...paragraphs.slice(1)] : paragraphs.slice(1);
  const body = rebuilt
    .map((p) => (/^\s*([-*]|\d+\.)\s/m.test(p) || /^\s*\|/.test(p) ? p.trimEnd() : reflow(p)))
    .join('\n\n');

  const updated = [
    ...lines.slice(0, heading + 1),
    '',
    ...body.split('\n'),
    '',
    ...lines.slice(end),
  ].join('\n');

  changed += 1;
  if (!DRY) fs.writeFileSync(file, updated);
}

function words(s) {
  return s.split(/\s+/).filter(Boolean).length;
}

console.log(`${DRY ? 'Would strip' : 'Stripped'} the opener from ${changed} facilitator note(s).`);
if (skipped.length) {
  console.log(`\nLeft alone (${skipped.length}):`);
  for (const s of skipped) console.log(`  ${s}`);
}
