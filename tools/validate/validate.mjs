import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import { parse } from 'yaml';
import { readFrontmatter } from '../lib/frontmatter.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');

const KIND_TO_SCHEMA = {
  lesson: 'lesson.schema.json',
  unit: 'unit.schema.json',
  scope: 'scope.schema.json',
  domain: 'domain.schema.json',
};

const REQUIRED_HEADINGS = {
  lesson: ['Procedure', 'Assessment', 'Facilitator note'],
};

const errors = [];
const warnings = [];
let filesChecked = 0;

function loadSchema(name) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, 'schema', name), 'utf8'));
}

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

function rel(p) {
  return path.relative(ROOT, p);
}

function readMd(file) {
  const text = fs.readFileSync(file, 'utf8');
  return { file, text, ...readFrontmatter(text) };
}

function validateFrontmatter(file, data, schema) {
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  if (!validate(data)) {
    for (const err of validate.errors ?? []) {
      errors.push(
        `${rel(file)}: ${err.instancePath || '/'} ${err.message}` +
          (err.params?.allowedValues ? ` (allowed: ${err.params.allowedValues.join(', ')})` : '')
      );
    }
  }
}

function checkHeadings(file, kind, body) {
  const required = REQUIRED_HEADINGS[kind];
  if (!required) return;
  for (const heading of required) {
    const re = new RegExp(`^#{2,}\\s+${heading}\\b`, 'im');
    if (!re.test(body)) {
      errors.push(`${rel(file)}: missing required body heading "## ${heading}"`);
    }
  }
}

function gradeToToken(grade) {
  return grade === 0 ? 'K' : String(grade).padStart(2, '0');
}

function objectiveGradeToken(objectiveId) {
  const parts = String(objectiveId).split('.');
  return parts.length === 4 ? parts[2] : null;
}

function collectStandards() {
  const index = new Map();
  for (const { file, data } of mdContent('standards')) {
    if (data?.kind !== 'domain') continue;
    for (const grade of Object.keys(data.grade_objectives ?? {})) {
      for (const obj of data.grade_objectives[grade] ?? []) {
        if (obj?.id) index.set(obj.id, rel(file));
      }
    }
  }
  return index;
}

function mdContent(subdir) {
  const dir = path.join(ROOT, 'curriculum', subdir);
  return walk(dir, ['.md'])
    .filter((f) => path.basename(f).toLowerCase() !== 'readme.md')
    .map(readMd);
}

function main() {
  // 1. Schema + heading validation for all curriculum markdown.
  for (const { file, data, body, hasFrontmatter } of mdContent('')) {
    filesChecked++;
    if (!hasFrontmatter || !data) {
      errors.push(`${rel(file)}: missing frontmatter block (--- ... ---)`);
      continue;
    }
    if (!data.kind) {
      errors.push(`${rel(file)}: frontmatter missing required "kind"`);
      continue;
    }
    const schemaName = KIND_TO_SCHEMA[data.kind];
    if (!schemaName) {
      errors.push(`${rel(file)}: unknown kind "${data.kind}"`);
      continue;
    }
    validateFrontmatter(file, data, loadSchema(schemaName));
    checkHeadings(file, data.kind, body);
  }

  // 2. Traceability: lesson/unit objectives must resolve to real standards.
  const standards = collectStandards();
  for (const { file, data } of mdContent('')) {
    if (data?.kind !== 'lesson' && data?.kind !== 'unit') continue;
    for (const obj of data.objectives ?? []) {
      if (!standards.has(obj)) {
        errors.push(`${rel(file)}: objective "${obj}" does not resolve to a standard in curriculum/standards/`);
      }
    }
  }

  // 3. Consistency: duplicate IDs, orphaned lessons, grade alignment.
  const units = new Map();
  const lessons = [];
  const scopes = [];
  for (const { file, data } of mdContent('')) {
    if (data?.kind === 'unit') {
      if (units.has(data.id)) errors.push(`${rel(file)}: duplicate unit id "${data.id}"`);
      else units.set(data.id, { file, grade: data.grade });
    }
    if (data?.kind === 'lesson') lessons.push({ file, data });
    if (data?.kind === 'scope') scopes.push({ file, data });
  }

  const seenLessons = new Set();
  for (const { file, data } of lessons) {
    if (seenLessons.has(data.id)) errors.push(`${rel(file)}: duplicate lesson id "${data.id}"`);
    seenLessons.add(data.id);

    const unit = units.get(data.unit);
    if (!unit) {
      errors.push(`${rel(file)}: lesson references missing unit "${data.unit}"`);
    } else if (unit.grade !== data.grade) {
      errors.push(
        `${rel(file)}: lesson grade ${data.grade} does not match unit "${data.unit}" grade ${unit.grade}`
      );
    }

    for (const obj of data.objectives ?? []) {
      const token = objectiveGradeToken(obj);
      if (token && token !== gradeToToken(data.grade)) {
        errors.push(
          `${rel(file)}: objective "${obj}" is grade "${token}" but lesson is grade ${data.grade}`
        );
      }
    }
  }

  for (const { file, data } of scopes) {
    for (const u of data.units ?? []) {
      const unit = units.get(u.unit_id);
      if (!unit) {
        warnings.push(`${rel(file)}: unit "${u.unit_id}" planned but not yet authored`);
      } else if (unit.grade !== data.grade) {
        errors.push(`${rel(file)}: planned unit "${u.unit_id}" is grade ${unit.grade}, not ${data.grade}`);
      }
    }
  }

  for (const { file, data } of lessons) {
    for (const a of data.assets ?? []) {
      if (!fs.existsSync(path.join(ROOT, a.path))) {
        warnings.push(`${rel(file)}: asset "${a.path}" referenced but not found on disk`);
      }
    }
    if ((data.materials_enriched ?? []).length && !(data.materials_low_tech ?? []).length) {
      warnings.push(`${rel(file)}: declares materials_enriched but no materials_low_tech; add a universal variant`);
    }
  }

  // 4. Agent definitions.
  const agentsFile = path.join(ROOT, 'agents', 'definitions', 'agents.yaml');
  if (fs.existsSync(agentsFile)) {
    filesChecked++;
    const agentSchema = loadSchema('agent.schema.json');
    for (const agent of parse(fs.readFileSync(agentsFile, 'utf8')) ?? []) {
      validateFrontmatter(agentsFile, agent, agentSchema);
    }
  }

  // 5. Backlog.
  const backlogFile = path.join(ROOT, 'agents', 'backlog', 'backlog.yaml');
  if (fs.existsSync(backlogFile)) {
    filesChecked++;
    const backlogSchema = loadSchema('backlog.schema.json');
    for (const item of parse(fs.readFileSync(backlogFile, 'utf8'))?.items ?? []) {
      validateFrontmatter(backlogFile, item, backlogSchema);
    }
  }

  // 6. Source registry.
  const sourcesFile = path.join(ROOT, 'sources', 'sources.yaml');
  if (fs.existsSync(sourcesFile)) {
    filesChecked++;
    const sourceSchema = loadSchema('source.schema.json');
    for (const source of parse(fs.readFileSync(sourcesFile, 'utf8'))?.sources ?? []) {
      validateFrontmatter(sourcesFile, source, sourceSchema);
    }
  }

  if (warnings.length > 0) {
    console.warn(`\n⚠ ${warnings.length} warning(s):`);
    for (const w of warnings) console.warn(`  ${w}`);
  }

  if (errors.length > 0) {
    console.error(`\nValidation failed: ${errors.length} issue(s) across ${filesChecked} file(s).\n`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    console.error('');
    process.exit(1);
  }

  console.log(`✓ Validation passed: ${filesChecked} file(s) checked${warnings.length ? `, ${warnings.length} warning(s)` : ''}.`);
}

main();
