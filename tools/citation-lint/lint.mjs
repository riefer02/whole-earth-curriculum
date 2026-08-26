import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  analyzeEvidenceGraph,
  loadEvidenceGraph,
  renderSourceUsageIndex,
} from './evidence-graph.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const USAGE_INDEX = path.join(ROOT, 'sources', 'usage.md');

const problems = [];
const warnings = [];
let graph;

try {
  graph = loadEvidenceGraph(ROOT);
} catch (error) {
  console.error(`Unable to load the evidence graph: ${error.message}`);
  process.exit(1);
}

const { sources, lessons } = graph;
if (sources.length === 0) problems.push('root: "sources" must be a non-empty list');

const seenIds = new Set();
for (const [index, source] of sources.entries()) {
  for (const field of ['id', 'title', 'type']) {
    if (!source?.[field] || !String(source[field]).trim()) {
      problems.push(`source #${index + 1}: missing or empty required field "${field}"`);
    }
  }

  const id = String(source?.id ?? '');
  if (id && !/^S-\d{3}$/.test(id)) problems.push(`${id}: id must match pattern S-NNN (e.g. S-001)`);
  if (seenIds.has(id)) problems.push(`${id}: duplicate id`);
  else if (id) seenIds.add(id);

  if (source?.url && !/^https?:\/\//.test(String(source.url))) {
    problems.push(`${id}: url must start with http:// or https://, got "${source.url}"`);
  }
}

const analysis = analyzeEvidenceGraph(graph);
for (const { sourceId, lesson } of analysis.missingReferences) {
  problems.push(`${lesson.relativePath}: citation "${sourceId}" is missing from sources/sources.yaml`);
}
for (const { sourceId, lesson } of analysis.unreviewedReferences) {
  problems.push(`${lesson.relativePath}: cited source "${sourceId}" is not reviewed`);
}

const expectedIndex = renderSourceUsageIndex(graph, analysis);
if (!fs.existsSync(USAGE_INDEX) || fs.readFileSync(USAGE_INDEX, 'utf8') !== expectedIndex) {
  problems.push('sources/usage.md is missing or stale; run `npm run sources:index`');
}

if (analysis.duplicateUrls.length > 0) {
  warnings.push(
    `${analysis.duplicateUrls.length} duplicate canonical URL(s): ` +
      analysis.duplicateUrls
        .map(({ url, sources: entries }) => `${entries.map((source) => source.id).join('/')} (${url})`)
        .join('; ')
  );
}
if (analysis.unusedSources.length > 0) {
  warnings.push(
    `${analysis.unusedSources.length} registered source(s) are not cited by a lesson: ` +
      `${analysis.unusedSources.slice(0, 12).map((source) => source.id).join(', ')}` +
      (analysis.unusedSources.length > 12 ? ', …' : '')
  );
}
if (analysis.referencesMissingFromResources.length > 0) {
  const examples = analysis.referencesMissingFromResources
    .slice(0, 8)
    .map(({ sourceId, lesson }) => `${lesson.id}/${sourceId}`)
    .join(', ');
  warnings.push(
    `${analysis.referencesMissingFromResources.length} claim-area citation(s) are absent from their lesson's ` +
      `\`## Resources\` section (examples: ${examples}${analysis.referencesMissingFromResources.length > 8 ? ', …' : ''})`
  );
}
if (analysis.lessonsWithoutCitations.length > 0) {
  warnings.push(
    `${analysis.lessonsWithoutCitations.length} lesson(s) contain no S-NNN citation; ` +
      'review factual lessons rather than assuming every lesson needs a source'
  );
}
if (analysis.lessonsWithoutResources.length > 0) {
  warnings.push(`${analysis.lessonsWithoutResources.length} lesson(s) have no \`## Resources\` section`);
}

if (warnings.length > 0) {
  console.warn(`\nEvidence graph: ${warnings.length} maintenance warning(s):\n`);
  for (const warning of warnings) console.warn(`  ⚠ ${warning}`);
}

if (problems.length > 0) {
  console.error(`\n${sources.length} sources and ${lessons.length} lessons checked, ${problems.length} problem(s):\n`);
  for (const problem of problems) console.error(`  ✗ ${problem}`);
  console.error('');
  process.exit(1);
}

console.log(
  `${sources.length} sources, ${lessons.length} lessons, and ` +
    `${analysis.edgeCount} source-to-lesson links checked; 0 problems`
);
