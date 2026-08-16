import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFrontmatter } from '../lib/frontmatter.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const GRADES = Array.from({ length: 13 }, (_, i) => i); // 0..12

function walk(dir, exts) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, exts));
    else if (exts.some((e) => entry.name.endsWith(e))) out.push(full);
  }
  return out;
}

function readMd(file) {
  return { file, ...readFrontmatter(fs.readFileSync(file, 'utf8')) };
}

function standardsIndex() {
  const byDomain = new Map(); // domainId -> { total, byGrade: Map }
  for (const { data } of walk(path.join(ROOT, 'curriculum', 'standards'), ['.md'])
    .filter((f) => path.basename(f).toLowerCase() !== 'readme.md')
    .map(readMd)) {
    if (data?.kind !== 'domain') continue;
    const info = { id: data.id, title: data.title, total: 0, byGrade: new Map() };
    for (const grade of Object.keys(data.grade_objectives ?? {})) {
      const n = (data.grade_objectives[grade] ?? []).length;
      info.byGrade.set(grade, n);
      info.total += n;
    }
    byDomain.set(data.id, info);
  }
  return byDomain;
}

function enactedIndex() {
  const grades = new Map(); // grade -> { units, lessons, objectives: Set }
  for (const g of GRADES) grades.set(g, { units: 0, lessons: 0, objectives: new Set() });

  const k12 = path.join(ROOT, 'curriculum', 'k-12');
  const gradeDirs = fs.existsSync(k12)
    ? fs
        .readdirSync(k12, { withFileTypes: true })
        .filter((e) => e.isDirectory() && /^grade-\d{2}-/.test(e.name))
        .map((e) => path.join(k12, e.name))
    : [];

  for (const dir of gradeDirs) {
    const m = path.basename(dir).match(/^grade-(\d{2})-/);
    const grade = parseInt(m[1], 10);
    const g = grades.get(grade) ?? { units: 0, lessons: 0, objectives: new Set() };
    for (const { data } of walk(dir, ['.md'])
      .filter((f) => path.basename(f).toLowerCase() !== 'readme.md')
      .map(readMd)) {
      if (data?.kind === 'unit') g.units += 1;
      if (data?.kind === 'lesson') {
        g.lessons += 1;
        for (const o of data.objectives ?? []) g.objectives.add(o);
      }
    }
    grades.set(grade, g);
  }
  return grades;
}

function pct(part, whole) {
  if (!whole) return '  -';
  return `${Math.round((part / whole) * 100)}%`;
}

const standards = standardsIndex();
const enacted = enactedIndex();

const totalStandards = [...standards.values()].reduce((s, d) => s + d.total, 0);
const totalUnits = [...enacted.values()].reduce((s, g) => s + g.units, 0);
const totalLessons = [...enacted.values()].reduce((s, g) => s + g.lessons, 0);
const coveredObjectives = new Set();
for (const g of enacted.values()) for (const o of g.objectives) coveredObjectives.add(o);

console.log('Curriculum status\n');
function gradeStatus() {
  const k12 = path.join(ROOT, 'curriculum', 'k-12');
  const info = new Map();
  for (const g of GRADES) info.set(g, { hasScope: false, units: 0, lessons: 0 });
  if (fs.existsSync(k12)) {
    for (const entry of fs.readdirSync(k12, { withFileTypes: true })) {
      if (!entry.isDirectory() || !/^grade-(\d{2})-/.test(entry.name)) continue;
      const g = parseInt(entry.name.slice(6, 8), 10);
      const dir = path.join(k12, entry.name);
      const rec = info.get(g) ?? { hasScope: false, units: 0, lessons: 0 };
      rec.hasScope = fs.existsSync(path.join(dir, 'scope.md'));
      for (const { data } of walk(dir, ['.md'])
        .filter((f) => path.basename(f).toLowerCase() !== 'readme.md')
        .map(readMd)) {
        if (data?.kind === 'unit') rec.units += 1;
        if (data?.kind === 'lesson') rec.lessons += 1;
      }
      info.set(g, rec);
    }
  }
  return info;
}
const gs = gradeStatus();
const assetCount = walk(path.join(ROOT, 'assets'), ['.svg']).length;
const complete = [];
const scopeOnly = [];
const exemplar = [];
const untouched = [];
for (const g of GRADES) {
  const r = gs.get(g);
  const label = g === 0 ? 'K' : String(g);
  if (r.hasScope && r.lessons > 0) complete.push(label);
  else if (r.hasScope) scopeOnly.push(label);
  else if (r.units > 0 || r.lessons > 0) exemplar.push(label);
  else untouched.push(label);
}
const fmt = (arr) => (arr.length ? arr.join(', ') : '—');
console.log(`  Grades complete (scope + lessons): ${fmt(complete)}`);
console.log(`  Grades with scope, no lessons yet: ${fmt(scopeOnly)}`);
console.log(`  Grades with exemplars only:        ${fmt(exemplar)}`);
console.log(`  Grades untouched:                  ${fmt(untouched)}`);
console.log(
  `  Standards: ${totalStandards}  |  Units: ${totalUnits}  |  Lessons: ${totalLessons}  |  Assets: ${assetCount}\n`
);

console.log('Curriculum coverage\n');
console.log(`Standards declared : ${totalStandards}`);
console.log(`Units authored     : ${totalUnits}`);
console.log(`Lessons authored   : ${totalLessons}`);
console.log(`Objectives covered : ${coveredObjectives.size} / ${totalStandards} (${pct(coveredObjectives.size, totalStandards)})\n`);

console.log('By domain');
console.log('  ' + 'Domain'.padEnd(8) + 'Objectives'.padEnd(12) + 'Covered'.padEnd(12) + 'Coverage');
for (const [id, info] of [...standards.entries()].sort()) {
  let covered = 0;
  for (const obj of coveredObjectives) if (obj.startsWith(`${id}.`)) covered++;
  console.log(`  ${id.padEnd(8)}${String(info.total).padEnd(12)}${String(covered).padEnd(12)}${pct(covered, info.total)}`);
}

console.log('\nDeclared objectives by grade x domain (spine)');
const gradeTokens = ['K', ...Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))];
let header = '  ' + 'Domain'.padEnd(6);
for (const g of gradeTokens) header += g.padStart(4);
header += '  total';
console.log(header);
for (const [id, info] of [...standards.entries()].sort()) {
  let row = '  ' + id.padEnd(6);
  for (const g of gradeTokens) {
    const n = info.byGrade.get(g) ?? 0;
    row += (n === 0 ? '.' : String(n)).padStart(4);
  }
  row += '  ' + String(info.total).padStart(4);
  console.log(row);
}

console.log('\nBy grade');
console.log('  ' + 'Grade'.padEnd(8) + 'Units'.padEnd(8) + 'Lessons'.padEnd(10) + 'Objectives covered');
for (const g of GRADES) {
  const label = g === 0 ? 'K' : String(g);
  const e = enacted.get(g);
  console.log(
    `  ${label.padEnd(8)}${String(e.units).padEnd(8)}${String(e.lessons).padEnd(10)}${e.objectives.size}`
  );
}
