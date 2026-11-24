#!/usr/bin/env node
/**
 * Re-wrap facilitator notes to the repository's 88-column convention.
 *
 * docs/schema.md asks for prose wrapped at ~88 characters. Notes written in a hurry
 * drift past it, usually by a few characters. This moves whitespace only.
 *
 * The subtlety is segmentation. A block like
 *
 *     **The facts to land.**
 *     1. Moving is one of the oldest things people do —
 *        for family, work, or safety.
 *
 * is a label line followed by a list, not one paragraph. Joining its lines turns a
 * readable note into a run-on sentence — which is exactly the defect this file is
 * meant to be fixing. So:
 *
 *   - a bullet owns the continuation lines under it, and is wrapped with a hanging
 *     indent;
 *   - a plain paragraph is joined and wrapped;
 *   - a label line stays on its own line, and never absorbs the list under it.
 *
 * Blank lines are never added, removed, or moved.
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
const MARKER = /^(\s*(?:[-*]|\d+\.)\s+)/;

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

function wrap(text, firstPrefix = '', contIndent = '') {
  const words = tokens(text);
  if (!words.length) return [];
  const lines = [];
  let line = `${firstPrefix}${words[0]}`;
  for (const word of words.slice(1)) {
    if (line.length + 1 + word.length > WRAP) {
      lines.push(line);
      line = `${contIndent}${word}`;
    } else {
      line += ` ${word}`;
    }
  }
  lines.push(line);
  return lines;
}

/** Rewrite one note's lines, preserving its blank-line skeleton exactly. */
function reflowNoteLines(noteLines) {
  const out = [];
  let i = 0;
  while (i < noteLines.length) {
    const line = noteLines[i];
    if (!line.trim()) {
      out.push(line);
      i += 1;
      continue;
    }

    const marker = MARKER.exec(line);
    if (marker) {
      // A bullet owns the lines indented under it.
      const parts = [line.slice(marker[0].length)];
      i += 1;
      while (i < noteLines.length && noteLines[i].trim() && !MARKER.test(noteLines[i])) {
        parts.push(noteLines[i].trim());
        i += 1;
      }
      out.push(...wrap(parts.join(' '), marker[0], ' '.repeat(marker[0].length)));
      continue;
    }

    // A plain paragraph: consecutive non-blank, non-marker lines.
    const parts = [];
    while (i < noteLines.length && noteLines[i].trim() && !MARKER.test(noteLines[i])) {
      parts.push(noteLines[i].trim());
      i += 1;
    }
    // A lone bold label keeps its own line; it is a heading, not prose.
    if (parts.length === 1 && /^\*\*[^*]+\*\*$/.test(parts[0])) {
      out.push(parts[0]);
    } else {
      out.push(...wrap(parts.join(' ')));
    }
  }
  return out;
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

  const body = reflowNoteLines(noteLines);
  const rebuilt = [...lines.slice(0, start + 1), ...body, ...lines.slice(end)].join('\n');
  if (rebuilt === src) continue;

  filesChanged += 1;
  linesBefore += noteLines.length;
  linesAfter += body.length;
  if (!DRY) fs.writeFileSync(file, rebuilt);
}

console.log(
  `${DRY ? 'Would reflow' : 'Reflowed'} ${filesChanged} note(s); ` +
    `${linesBefore} -> ${linesAfter} lines.`,
);
