import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import { readFrontmatter } from '../lib/frontmatter.mjs';

const SOURCE_ID_PATTERN = /\bS-\d{3}\b/g;

export function extractSourceIds(text = '') {
  return [...new Set(String(text).match(SOURCE_ID_PATTERN) ?? [])].sort();
}

export function normalizeUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(String(value));
    url.hash = '';
    url.hostname = url.hostname.toLowerCase();
    if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/, '');
    return url.toString();
  } catch {
    return String(value).trim();
  }
}

export function splitResourcesSection(body = '') {
  const heading = /^##\s+Resources\s*$/im.exec(body);
  if (!heading) return { exists: false, before: body, resources: '' };

  const restStart = heading.index + heading[0].length;
  const rest = body.slice(restStart);
  const nextHeading = /^##\s+/m.exec(rest);
  const end = nextHeading ? restStart + nextHeading.index : body.length;

  return {
    exists: true,
    before: body.slice(0, heading.index),
    resources: body.slice(restStart, end),
  };
}

function walkMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkMarkdown(full));
    else if (entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

export function loadEvidenceGraph(root) {
  const sourcesFile = path.join(root, 'sources', 'sources.yaml');
  const parsed = parse(fs.readFileSync(sourcesFile, 'utf8'));
  const sources = Array.isArray(parsed?.sources) ? parsed.sources : [];

  const lessons = [];
  for (const file of walkMarkdown(path.join(root, 'curriculum'))) {
    const raw = fs.readFileSync(file, 'utf8');
    const { data, body } = readFrontmatter(raw);
    if (data?.kind !== 'lesson') continue;
    lessons.push({
      file,
      relativePath: path.relative(root, file).split(path.sep).join('/'),
      id: data.id,
      title: data.title,
      body,
    });
  }

  lessons.sort((a, b) => String(a.id).localeCompare(String(b.id)));
  return { sources, lessons };
}

export function analyzeEvidenceGraph({ sources, lessons }) {
  const sourceById = new Map();
  const usage = new Map();
  for (const source of sources) {
    if (!source?.id || sourceById.has(source.id)) continue;
    sourceById.set(source.id, source);
    usage.set(source.id, []);
  }

  const missingReferences = [];
  const unreviewedReferences = [];
  const referencesMissingFromResources = [];
  const lessonsWithoutCitations = [];
  const lessonsWithoutResources = [];
  let edgeCount = 0;

  for (const lesson of lessons) {
    const sections = splitResourcesSection(lesson.body);
    const allIds = extractSourceIds(lesson.body);
    const claimIds = extractSourceIds(sections.before);
    const resourceIds = new Set(extractSourceIds(sections.resources));

    if (allIds.length === 0) lessonsWithoutCitations.push(lesson);
    if (!sections.exists) lessonsWithoutResources.push(lesson);

    for (const sourceId of allIds) {
      edgeCount++;
      const source = sourceById.get(sourceId);
      if (!source) {
        missingReferences.push({ sourceId, lesson });
        continue;
      }
      usage.get(sourceId).push(lesson);
      if (source.reviewed !== true) unreviewedReferences.push({ sourceId, lesson });
    }

    for (const sourceId of claimIds) {
      if (!resourceIds.has(sourceId)) {
        referencesMissingFromResources.push({ sourceId, lesson });
      }
    }
  }

  const urlGroups = new Map();
  for (const source of sources) {
    const normalized = normalizeUrl(source?.url);
    if (!normalized) continue;
    if (!urlGroups.has(normalized)) urlGroups.set(normalized, []);
    urlGroups.get(normalized).push(source);
  }

  const duplicateUrls = [...urlGroups.entries()]
    .filter(([, entries]) => entries.length > 1)
    .map(([url, entries]) => ({ url, sources: entries }))
    .sort((a, b) => a.url.localeCompare(b.url));

  const unusedSources = sources
    .filter((source) => source?.id && (usage.get(source.id)?.length ?? 0) === 0)
    .sort((a, b) => String(a.id).localeCompare(String(b.id)));

  return {
    sourceById,
    usage,
    edgeCount,
    missingReferences,
    unreviewedReferences,
    referencesMissingFromResources,
    lessonsWithoutCitations,
    lessonsWithoutResources,
    duplicateUrls,
    unusedSources,
  };
}

function escapeTableCell(value) {
  return String(value ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, ' ')
    .trim();
}

export function renderSourceUsageIndex({ sources, lessons }, analysis) {
  const orderedSources = [...sources].sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const usedCount = orderedSources.filter((source) => (analysis.usage.get(source.id)?.length ?? 0) > 0).length;
  const lines = [
    '# Source usage index',
    '',
    '> Generated by `npm run sources:index`. Do not edit this file by hand.',
    '',
    'This reverse index connects the vetted source registry to every lesson that cites it.',
    'To locate a lesson file for a source, run `rg -l "S-NNN" curriculum/k-12`.',
    '',
    '## Summary',
    '',
    `- Registered sources: ${orderedSources.length}`,
    `- Sources cited by lessons: ${usedCount}`,
    `- Lessons scanned: ${lessons.length}`,
    `- Source-to-lesson links: ${analysis.edgeCount}`,
    `- Registered sources not cited by a lesson: ${analysis.unusedSources.length}`,
    '',
    '## Sources',
    '',
    '| Source | Title | Domains | Reviewed | Lessons |',
    '|---|---|---|---:|---:|',
  ];

  for (const source of orderedSources) {
    const lessonCount = analysis.usage.get(source.id)?.length ?? 0;
    lines.push(
      `| [${source.id}](#${String(source.id).toLowerCase()}) | ${escapeTableCell(source.title)} | ` +
        `${escapeTableCell((source.domains ?? []).join(', ') || '—')} | ${source.reviewed === true ? 'yes' : 'no'} | ${lessonCount} |`
    );
  }

  lines.push('', '## Usage details', '');
  for (const source of orderedSources) {
    const sourceLessons = analysis.usage.get(source.id) ?? [];
    lines.push(`### ${source.id}`, '');
    if (sourceLessons.length === 0) {
      lines.push('Cited by: no lessons.');
    } else {
      lines.push(`Cited by ${sourceLessons.length} lesson${sourceLessons.length === 1 ? '' : 's'}:`, '');
      for (let index = 0; index < sourceLessons.length; index += 12) {
        const chunk = sourceLessons.slice(index, index + 12);
        lines.push(`- ${chunk.map((lesson) => `\`${lesson.id}\``).join(', ')}`);
      }
    }
    lines.push('');
  }

  return `${lines.join('\n').trimEnd()}\n`;
}
