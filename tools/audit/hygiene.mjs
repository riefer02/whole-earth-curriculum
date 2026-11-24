#!/usr/bin/env node
/**
 * Content hygiene audit.
 *
 * `npm run validate` proves a file is *well-formed*. This proves it is *usable*:
 * the facilitator note is scannable, and graphics render inside their own canvas
 * with their labels attached to something.
 *
 * Those were review-time judgements being made by eye, inconsistently, and only
 * once a maintainer opened the file. This makes them mechanical.
 *
 *   npm run audit            # summary table
 *   npm run audit -- --all   # every finding
 *   npm run audit -- --json  # machine-readable
 *   npm run audit -- --grade 08
 *
 * Severity:
 *   must-fix  mechanical and certain. Fix it.
 *   look      a candidate. Render the file and use your eyes; dismiss freely.
 *
 * Exit code is 1 when anything must-fix remains, so CI can gate on it.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');

const argv = process.argv.slice(2);
const SHOW_ALL = argv.includes('--all');
const AS_JSON = argv.includes('--json');
const GRADE = argv.includes('--grade') ? argv[argv.indexOf('--grade') + 1] : null;
// --path narrows to any substring, e.g. --path L.09 for a grade's graphics.
const ONLY_PATH = argv.includes('--path') ? argv[argv.indexOf('--path') + 1] : null;
// --strict is the CI gate: it fails when the must-fix count has *grown* past the
// committed baseline, so new pages cannot re-introduce what we are clearing out.
const STRICT = argv.includes('--strict');
const BASELINE_FILE = path.join(ROOT, 'tools', 'audit', 'baseline.json');

// --- thresholds -------------------------------------------------------------
// A facilitator note is guidance a teacher reads *while* teaching. Past this it
// stops being a note and becomes an essay nobody rereads.
const NOTE_MAX_WORDS = 260;
const NOTE_WALL_WORDS = 180; // one unbroken paragraph this long is a wall
const LONGEST_SENTENCE = 70;

// docs/art-style.md asks for low saturation. Anything this vivid is off-house.
const MAX_SATURATION = 0.85; // the palette tops out at 0.69; this catches neon only

// Sentences that are pure boilerplate. The lesson voice is already declared in
// docs/schema.md and docs/facilitation.md; repeating it in 1,300 lessons is
// noise a teacher scrolls past on every page.
const BOILERPLATE = [
  /^this lesson is written to the learner \(["“]you["”]\)\.?$/i,
  /^written to the learner \(["“]you["”]\)\.?$/i,
  /^this lesson is written to the learner\.?$/i,
  /^this lesson is written to the learner \(["“]you["”"]\),? so it works in a classroom and for a self-directed learner\.?$/i,
  /^written to the learner \(["“]you["”"]\) so it works in a classroom and for a self-directed learner\.?$/i,
];

const findings = [];
const flag = (group, file, rule, detail, severity) =>
  findings.push({ group, file, rule, detail, severity });

function walk(dir, match) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, match));
    else if (match(entry.name)) out.push(full);
  }
  return out;
}

const rel = (p) => path.relative(ROOT, p);
const words = (s) => s.split(/\s+/).filter(Boolean).length;

const LENSES = ['ethics', 'egalitarianism', 'global', 'technology', 'environment',
  'social-emotional', 'physical', 'intellectual', 'community', 'professional',
  'critical-thinking'];

function noteOf(file) {
  const body = fs.readFileSync(file, 'utf8').replace(/^---[\s\S]*?\n---\n/, '');
  const start = body.search(/^## Facilitator note\s*$/m);
  if (start === -1) return null;
  const rest = body.slice(start).replace(/^## Facilitator note\s*/, '');
  const end = rest.search(/^## /m);
  return (end === -1 ? rest : rest.slice(0, end)).trim();
}

// --- lessons ---------------------------------------------------------------

function auditLesson(file) {
  const note = noteOf(file);
  if (!note) return;
  const name = rel(file);
  const raw = fs.readFileSync(file, 'utf8');

  // A restructured note promises one bullet per declared lens. If a lens was
  // dropped in the rewrite, the lesson no longer visibly carries it.
  const declared = LENSES.filter((l) => new RegExp(`^\\s+-\\s+${l}\\s*$`, 'm').test(raw));
  const bulleted = [...note.matchAll(/^- \*([^*\n]+?):\*/gm)]
    .map((m) => m[1].toLowerCase().replace(/\s+/g, '-'));
  if (bulleted.length) {
    const missing = declared.filter(
      (l) => !bulleted.some((b) => b.includes(l) || b.includes(l.replace('-', ' '))));
    if (missing.length) {
      flag('lesson-note', name, 'lens-not-in-note',
        `declared but not in the note: ${missing.join(', ')}`, 'look');
    }
  }
  const count = words(note);

  if (count < 35) {
    flag('lesson-note', name, 'note-thin',
      `${count} words — a note this short usually lost its substance`, 'look');
  }

  if (count > NOTE_MAX_WORDS) {
    flag('lesson-note', name, 'note-too-long',
      `${count} words (limit ${NOTE_MAX_WORDS})`,
      count > NOTE_MAX_WORDS * 1.4 ? 'must-fix' : 'look');
  }

  // A wall: long, and with nothing to skim by.
  const paragraphs = note.split(/\n\s*\n/).filter((p) => p.trim());
  const hasList = /^\s*([-*]|\d+\.)\s/m.test(note);
  if (count > NOTE_WALL_WORDS && !hasList && paragraphs.length < 2) {
    flag('lesson-note', name, 'note-is-one-wall',
      `${count} words in one unbroken paragraph`, 'must-fix');
  }

  // Clause-chaining: the sentence nobody can hold in their head.
  const sentences = note.replace(/\*\*/g, '').split(/(?<=[.!?])\s+/);
  const longest = sentences.reduce((a, b) => (words(b) > words(a) ? b : a), '');
  if (words(longest) > LONGEST_SENTENCE) {
    flag('lesson-note', name, 'runaway-sentence',
      `${words(longest)}-word sentence: "${longest.slice(0, 80)}…"`, 'must-fix');
  }

  const first = (sentences[0] || '').trim();
  if (BOILERPLATE.some((re) => re.test(first))) {
    flag('lesson-note', name, 'boilerplate-opener',
      `"${first.slice(0, 70)}" — already stated in docs/`, 'must-fix');
  } else if (/^(this lesson is written to the learner|written to the learner)/i.test(first)) {
    flag('lesson-note', name, 'boilerplate-buried',
      `"${first.slice(0, 90)}…" — boilerplate fused to real guidance; split it`, 'look');
  }
}

// --- assets ----------------------------------------------------------------

const hexes = (s) =>
  (s
    .replace(/&#?[a-z0-9]+;/gi, ' ')      // &#160; is not the colour #160
    .replace(/url\([^)]*\)/g, ' ')       // url(#gradient)
    .replace(/\bid="[^"]*"/g, ' ')        // id="af1…" is not a hex colour
    .match(/#[0-9a-fA-F]{6}\b/g) || []).map((h) => h.toLowerCase());

function saturationOf(hex) {
  let h = hex.slice(1);
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (h.length !== 6) return 0;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return 0;
  return l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
}

// Calibrated against renders: sans-serif averages ~0.47em across mixed-case
// prose. Measuring too generously flags healthy files.
const estWidth = (str, size) => str.length * size * 0.47;

// SVG is read as a stream of tags rather than with a DOM, so a `translate()` on a
// <g> or a font-size inherited from a parent has to be carried by hand. Getting
// this wrong makes the tool lie in both directions: it "found" off-canvas labels
// that were really at x=0 inside a translate, and "missed" small type measured as
// the inherited 16px default.
const VOID = new Set(['br', 'img', 'hr', 'input', 'meta', 'link']);
const ATTR = (attrs, k) => {
  const m = attrs.match(new RegExp(`\\b${k}="([^"]*)"`));
  return m ? m[1] : null;
};
const NUM = (attrs, k, dflt = 0) => {
  const v = ATTR(attrs, k);
  return v === null ? dflt : Number.parseFloat(v);
};

function translateOf(attrs) {
  const t = ATTR(attrs, 'transform');
  if (!t) return { dx: 0, dy: 0, skewed: false };
  const m = t.match(/translate\(\s*(-?[\d.]+)(?:[,\s]+(-?[\d.]+))?\s*\)/);
  const skewed = /(scale|rotate|matrix|skew)/.test(t);
  return { dx: m ? Number(m[1]) : 0, dy: m && m[2] ? Number(m[2]) : 0, skewed };
}

/** Walk the document once, yielding measured text runs and circles in canvas space. */
function measure(src) {
  const texts = [];
  const circles = [];
  const stack = [{ dx: 0, dy: 0, skewed: false, size: 16, anchor: 'start' }];
  const tagRe = /<(\/?)([a-zA-Z][\w:-]*)([^>]*?)(\/?)>/g;
  let m;
  while ((m = tagRe.exec(src))) {
    const closing = m[1] === '/';
    const name = m[2].toLowerCase();
    const attrs = m[3] || '';
    const selfClosing = m[4] === '/' || VOID.has(name);

    if (closing) {
      if (stack.length > 1) stack.pop();
      continue;
    }
    const parent = stack[stack.length - 1];
    const t = translateOf(attrs);
    const frame = {
      dx: parent.dx + t.dx,
      dy: parent.dy + t.dy,
      skewed: parent.skewed || t.skewed,
      size: ATTR(attrs, 'font-size') ? Number.parseFloat(ATTR(attrs, 'font-size')) : parent.size,
      anchor: ATTR(attrs, 'text-anchor') || parent.anchor,
    };
    if (!selfClosing) stack.push(frame);

    if (name === 'text') {
      const body = src.slice(m.index + m[0].length);
      const content = (body.match(/^[^<]*/) || [''])[0].replace(/&#?\w+;/g, 'x');
      if (content.trim()) {
        texts.push({
          content,
          size: frame.size,
          x: NUM(attrs, 'x') + frame.dx,
          y: NUM(attrs, 'y') + frame.dy,
          anchor: frame.anchor,
          skewed: frame.skewed,
        });
      }
    } else if (name === 'circle') {
      circles.push({
        r: NUM(attrs, 'r'),
        cx: NUM(attrs, 'cx') + frame.dx,
        cy: NUM(attrs, 'cy') + frame.dy,
      });
    }
  }
  return { texts, circles };
}

function auditSvg(file) {
  const src = fs.readFileSync(file, 'utf8');
  const name = rel(file);

  const vb = (src.match(/viewBox="([^"]+)"/) || [])[1];
  if (!vb) {
    flag('asset', name, 'no-viewbox', 'no viewBox — will not scale', 'must-fix');
    return;
  }
  const [, , vw] = vb.split(/[\s,]+/).map(Number);

  if (!/role="img"/.test(src)) flag('asset', name, 'no-role-img', 'missing role="img"', 'must-fix');
  if (!/<title[\s>]/.test(src)) flag('asset', name, 'no-title', 'missing <title>', 'must-fix');
  if (!/<desc[\s>]/.test(src)) flag('asset', name, 'no-desc', 'missing <desc>', 'must-fix');

  const garish = [...new Set(hexes(src))].filter((h) => saturationOf(h) > MAX_SATURATION);
  if (garish.length) {
    flag('asset', name, 'garish-colour',
      `${garish.join(' ')} — above ${MAX_SATURATION} saturation`, 'look');
  }

  const { texts, circles } = measure(src);
  const smallType = [];

  for (const t of texts) {
    // A scale or rotation means the number on the page is not the number I can
    // reason about. Say so rather than guess.
    if (t.skewed) {
      flag('asset', name, 'text-in-transformed-group',
        `"${t.content.slice(0, 30)}" sits inside a scale/rotate — check it by eye`, 'look');
      continue;
    }
    const w = estWidth(t.content, t.size);
    const left = t.anchor === 'middle' ? t.x - w / 2 : t.anchor === 'end' ? t.x - w : t.x;
    const right = left + w;
    if (right > vw - 2 || left < 2) {
      flag('asset', name, 'text-off-canvas',
        `"${t.content.slice(0, 38)}" ends at ${Math.round(right)}px of ${vw}`, 'must-fix');
    }
    if (t.size !== Math.round(t.size * 2) / 2) {
      flag('asset', name, 'auto-fitted-type',
        `font-size ${t.size} is a hand-shrunk fit — use 12/13/14/15`, 'look');
    } else if (t.size < 12) {
      smallType.push(t.size);
    }
  }
  if (smallType.length) {
    flag('asset', name, 'type-below-floor',
      `${smallType.length} text run(s) under the 12px print floor (smallest ${Math.min(...smallType)})`,
      'look');
  }

  // Callout markers with no leader line: the label points at nothing.
  // Faces and icons also use small circles, so this is a candidate, not a verdict.
  const lines = [...src.matchAll(/<line\b([^>]*?)\/?>/g)].map((m) => {
    const a = m[1];
    return { x1: NUM(a, 'x1'), y1: NUM(a, 'y1'), x2: NUM(a, 'x2'), y2: NUM(a, 'y2') };
  });
  const hasLeaderNear = (px, py) =>
    lines.some(({ x1, y1, x2, y2 }) => {
      const d2 = (x2 - x1) ** 2 + (y2 - y1) ** 2 || 1;
      const t = Math.max(0, Math.min(1, ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / d2));
      return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1))) < 30;
    });
  const markers = circles.filter((c) => c.r > 2.5 && c.r <= 8);

  // Only worth reporting when the whole drawing has *no* connector anywhere:
  // that is the "labels float free" diagram, not a face or an icon grid.
  // Cap the count: a diagram has a handful of callout markers. Ten small circles
  // means pupils, seeds, produce or icons — an illustration, not a callout chart.
  if (markers.length >= 2 && markers.length <= 5 && lines.length === 0) {
    flag('asset', name, 'labels-float-free',
      `${markers.length} marker dots, zero leader lines — labels point at nothing`, 'look');
  }

  // The copy-pasted figure: circle head + straight-line limbs, and no real path
  // work anywhere. A silhouette built from thick round-capped strokes is a path
  // drawing that happens to use <line>, so it must not be caught here.
  const roundLines = (src.match(/<line\b[^>]*stroke-linecap="round"/g) || []).length;
  const paths = (src.match(/<path\b/g) || []).length;
  if (roundLines >= 4 && paths < 2 && /<circle\b[^>]*r="3[0-9]"/.test(src)) {
    flag('asset', name, 'stick-figure-template',
      'limbs are bare lines — rebuild as a silhouette', 'must-fix');
  }
}

// --- run -------------------------------------------------------------------

const wanted = (p) =>
  (!GRADE || p.includes(`grade-${GRADE}`)) && (!ONLY_PATH || p.includes(ONLY_PATH));
const lessons = walk(path.join(ROOT, 'curriculum', 'k-12'), (n) => /^lesson-.*\.md$/.test(n))
  .filter((f) => wanted(rel(f)));
const svgs = walk(path.join(ROOT, 'assets'), (n) => n.endsWith('.svg')).filter((f) => wanted(rel(f)));

for (const f of lessons) auditLesson(f);
for (const f of svgs) auditSvg(f);

const mustFix = findings.filter((f) => f.severity === 'must-fix');

if (AS_JSON) {
  const group = (key) => {
    const out = {};
    for (const f of findings.filter((x) => x.group === key)) (out[f.rule] ||= []).push(f.file);
    return out;
  };
  console.log(JSON.stringify({
    lessons: { total: lessons.length, ...group('lesson-note') },
    assets: { total: svgs.length, ...group('asset') },
    mustFix: mustFix.length,
  }, null, 2));
  process.exit(0);
}

const byRule = {};
for (const f of findings) (byRule[`${f.group}:${f.rule}`] ||= []).push(f);

console.log(`\nAudited ${lessons.length} lessons and ${svgs.length} graphics.` +
  `${mustFix.length} must-fix, ${findings.length - mustFix.length} to look at.\n`);

for (const [key, hits] of Object.entries(byRule).sort((a, b) => b[1].length - a[1].length)) {
  const [group, rule] = key.split(':');
  const mf = hits.filter((h) => h.severity === 'must-fix').length;
  console.log(`  ${(group === 'asset' ? 'graphic' : 'lesson ').padEnd(9)}${rule.padEnd(23)}` +
    `${String(hits.length).padStart(5)}${mf ? `  (${mf} must-fix)` : ''}`);
}

if (!findings.length) {
  console.log('\nClean.\n');
  process.exit(0);
}

const shown = SHOW_ALL
  ? findings.sort((a, b) => (a.severity === b.severity ? 0 : a.severity === 'must-fix' ? -1 : 1))
  : mustFix.slice(0, 30);
if (shown.length) {
  console.log('\n--- must fix ---');
  for (const f of shown) {
    console.log(`  ${f.file}\n    ${f.rule}: ${f.detail}`);
  }
}
if (!SHOW_ALL && findings.length > shown.length) {
  console.log(`\n  …${findings.length - shown.length} more. Nothing hidden: npm run audit -- --all`);
}
console.log('');

if (argv.includes('--baseline')) {
  fs.writeFileSync(BASELINE_FILE, `${JSON.stringify({
    mustFix: mustFix.length,
    updated: new Date().toISOString().slice(0, 10),
  }, null, 2)}\n`);
  console.log(`Baseline set: ${mustFix.length} must-fix findings.\n`);
  process.exit(0);
}

if (STRICT) {
  const baseline = fs.existsSync(BASELINE_FILE)
    ? JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8')).mustFix
    : Infinity;
  if (mustFix.length > baseline) {
    console.log(`FAIL: ${mustFix.length} must-fix findings, baseline is ${baseline}.`);
    console.log('Nothing new may be added while the backlog is being cleared.');
    console.log('Run: npm run audit -- --all\n');
    process.exit(1);
  }
  console.log(`OK: ${mustFix.length} must-fix findings, baseline ${baseline}.` +
    (mustFix.length < baseline ? ' Ratchet it down: npm run audit -- --baseline\n' : '\n'));
  process.exit(0);
}

process.exit(0);
