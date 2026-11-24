#!/usr/bin/env node
/**
 * Re-wrap facilitator notes to the repository's 88-column convention.
 *
 * docs/schema.md asks for prose wrapped at ~88 characters. Notes rewritten in a
 * hurry drift past it — usually by a few characters, occasionally by a lot. This
 * only moves whitespace: no word changes, no punctuation changes, no newlines
 * added or removed between blocks.
 *
 * Bullets are wrapped against their own indent so the hanging indent survives.
 * A dash never starts a line.
 *
 *   node tools/audit/reflow-notes.mjs --dry
 *   node tools/audit/reflow-notes.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const DRY = process.argv.includes('--dry');
const WRAP = 88;

function walk(dir, match) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, match));
    else if (match(entry.name)) out.push(full);
  }
  return out;
}

/** Glue a dash to the word before it so it never begins a line. */
function tokens(text) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .reduce((acc, word) => {
      if ((word === '\u2014' || word === '\u2013') && acc.length) acc[acc.length - 1] += ` ${word}`;
      else acc.push(word);
      return acc;
    }, []);
}

function wrap(text, indent = '', firstPrefix = '') {
  const words = tokens(text);
  if (!words.length) return [];
  const lines = [];
  let line = `${firstPrefix}${words[0]}`;
  const width = (value) => value.length;
  for (const word of words.slice(1)) {
    if (width(line) + 1 + word.length > WRAP) {
      lines.push(line);
      line = `${indent}${word}`;
    } else {
      line += ` ${word}`;
    }
  }
  lines.push(line);
  return lines;
}

let filesChanged = 0;
let linesBefore = 0;
let linesAfter = 0;

for (const file of walk(path.join(ROOT, 'curriculum', 'k-12'), (n) => /^lesson-.*\.md$/.test(n))) {
  const src = fs.readFileSync(file, 'utf8');
  const lines = src.split('\n');
  const start = lines.findIndex((line) => line.trim() === '## Facilitator note');
  if (start === -1) continue;
  let end = lines.findIndex((line, i) => i > start && line.startsWith('## '));
  if (end === -1) end = lines.length;

  const noteLines = lines.slice(start + 1, end);
  if (!noteLines.some((line) => line.length > WRAP)) continue;

  const out = [];
  let block = [];

  const flush = () => {
    if (!block.length) return;
    const isList = block.every((line) => /^\s*([-*]|\d+\.)\s/.test(line) || /^\s{2,}\S/.test(line));
    if (isList) {
      // Wrap each bullet independently, keeping its marker and hanging indent.
      let current = null;
      const bullets = [];
      for (const line of block) {
        if (/^\s*([-*]|\d+\.)\s/.test(line)) {
          if (current) bullets.push(current);
          current = [line];
        } else if (current) {
          current.push(line);
        }
      }
      if (current) bullets.push(current);
      for (const linesOfBullet of bullets) {
        const marker = linesOfBullet[0].match(/^(\s*(?:[-*]|\d+\.)\s+)/)[1];
        // The marker lives only in the prefix, never in the text being wrapped.
        const text = linesOfBullet
          .map((l) => l.trim())
          .join(' ')
          .replace(/^(?:[-*]|\d+\.)\s+/, '');
        out.push(...wrap(text, ' '.repeat(marker.length), marker));
      }
    } else {
      const text = block.map((l) => l.trim()).join(' ');
      out.push(...wrap(text));
    }
    block = [];
  };

  for (const line of noteLines) {
    if (!line.trim()) {
      flush();
      out.push('');
    } else {
      block.push(line);
    }
  }
  flush();

  while (out.length && !out[0].trim()) out.shift();
  while (out.length && !out[out.length - 1].trim()) out.pop();

  linesBefore += noteLines.length;
  linesAfter += out.length;
  const next = [...lines.slice(0, start + 1), '', ...out, '', ...lines.slice(end)];
  const rebuilt = next.join('\n');
  if (rebuilt !== src) {
    filesChanged += 1;
    if (!DRY) fs.writeFileSync(file, rebuilt);
  }
}

console.log(
  `${DRY ? 'Would reflow' : 'Reflowed'} ${filesChanged} note(s); ` +
    `${linesBefore} -> ${linesAfter} lines.`,
);
