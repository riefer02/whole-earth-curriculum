#!/usr/bin/env node
/**
 * Keep facilitator notes speaking one dialect.
 *
 * Parallel authoring drifts: block labels fork ("The lenses" / "The lenses,
 * briefly"), lens bullets fork (`- **Ethics:**` / `- *Ethics:*` / `- **Ethics** —`),
 * and lens names fork ("Egalitarian" / "egalitarianism", "Critical thinking" /
 * `critical-thinking`). None of that is a content defect, but a teacher scanning
 * four lessons in a row should find "the facts to land" in the same place, in the
 * same shape, every time.
 *
 * This only rewrites the first line of a bullet or block label. It never touches
 * prose, and it is idempotent — safe to re-run after any authoring pass.
 *
 *   node tools/audit/normalize-notes.mjs --dry
 *   node tools/audit/normalize-notes.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const DRY = process.argv.includes('--dry');

// docs/facilitation.md § "Writing a facilitator note"
const BLOCK_ALIASES = {
  'tone note': 'Tone',
  'tone': 'Tone',
  'the facts to land': 'The facts to land',
  'facts to land': 'The facts to land',
  "don't overshoot": "Don't overshoot",
  'do not overshoot': "Don't overshoot",
  'the lenses, briefly': 'The lenses, briefly',
  'the lenses': 'The lenses, briefly',
  'lenses': 'The lenses, briefly',
  'the skill': 'The skill',
  'skill': 'The skill',
  'accessibility': 'Access',
  'access and safety': 'Access',
  'safety': 'Safety floor',
  'safety net': 'Safety floor',
  'safety floor': 'Safety floor',
  'emotional safety': 'Emotional safety',
  'evidence vs values': 'Evidence and values',
  'evidence vs. facts': 'Evidence and values',
  'evidence and values': 'Evidence and values',
};

// schema/lesson.schema.json cross_cutting_lenses
const LENSES = ['ethics', 'egalitarianism', 'global', 'technology', 'environment',
  'social-emotional', 'physical', 'intellectual', 'community', 'professional',
  'critical-thinking'];
const LENS_ALIASES = {
  egalitarian: 'egalitarianism',
  'critical thinking': 'critical-thinking',
  'social and emotional': 'social-emotional',
  'social emotional': 'social-emotional',
  environmental: 'environment',
  technological: 'technology',
  communal: 'community',
};

const canonicalLens = (raw) => {
  const k = raw.trim().toLowerCase().replace(/[.:]+$/, '');
  if (LENSES.includes(k)) return k;
  if (LENS_ALIASES[k]) return LENS_ALIASES[k];
  if (LENS_ALIASES[k.replace(/-/g, ' ')]) return LENS_ALIASES[k.replace(/-/g, ' ')];
  return null;
};

const titleCase = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function walk(dir, match) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, match));
    else if (match(entry.name)) out.push(full);
  }
  return out;
}

let filesTouched = 0;
let labels = 0;
let bullets = 0;

for (const file of walk(path.join(ROOT, 'curriculum', 'k-12'), (n) => /^lesson-.*\.md$/.test(n))) {
  const src = fs.readFileSync(file, 'utf8');
  const body = src.replace(/^---[\s\S]*?\n---\n/, '');
  const heading = body.search(/^## Facilitator note\s*$/m);
  if (heading === -1) continue;

  const cut = src.length - body.length + heading;
  const tailStart = body.slice(heading).search(/\n## /);
  const noteEnd = tailStart === -1 ? src.length : cut + tailStart;
  const note = src.slice(cut, noteEnd);

  let out = note;
  const next = out
    .split('\n')
    .map((line) => {
      // bold block label at the start of a line: **Tone.** / **Safety:** / ...
      const block = line.match(/^\*\*([^*\n]{2,40}?)(\.|:)?\*\*(.*)$/);
      if (block) {
        const canon = BLOCK_ALIASES[block[1].trim().toLowerCase().replace(/[.:]+$/, '')];
        if (canon && canon !== block[1]) {
          labels += 1;
          return `**${canon}.**${block[3]}`;
        }
        return line;
      }
      // lens bullet: - *Ethics:* / - **Ethics:** / - **Ethics** — / - *Egalitarian*:
      const bullet = line.match(/^- (?:\*\*|\*)([^*\n]{2,40}?)(?:\*\*|\*)(?::?)\s*(?:—\s*)?(.*)$/);
      if (bullet) {
        const lens = canonicalLens(bullet[1]);
        if (lens && bullet[2].trim()) {
          bullets += 1;
          return `- *${titleCase(lens)}:* ${bullet[2].trim()}`;
        }
      }
      return line;
    })
    .join('\n');

  if (next !== out) {
    filesTouched += 1;
    if (!DRY) fs.writeFileSync(file, src.slice(0, cut) + next + src.slice(noteEnd));
  }
}

console.log(`${DRY ? 'Would normalise' : 'Normalised'} ${labels} block label(s) and ` +
  `${bullets} lens bullet(s) across ${filesTouched} note(s).`);
