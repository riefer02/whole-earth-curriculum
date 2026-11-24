// Derives the public quality numbers from the curriculum collections and the
// source registry. Nothing here is hand-maintained: every figure equals what the
// repository actually contains when the site is built, so the published numbers
// cannot drift from the content they describe.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

interface StatusEntry {
  data: { status?: string };
}

interface LessonLike {
  body?: string;
  data: {
    status?: string;
    objectives?: string[];
    assets?: Array<{ path?: string }>;
  };
}

interface DomainLike {
  data: { grade_objectives?: Record<string, Array<{ id?: string }>> };
}

export interface Tally {
  total: number;
  byStatus: Record<string, number>;
}

export function tallyStatus(entries: StatusEntry[]): Tally {
  const byStatus: Record<string, number> = {};
  for (const entry of entries) {
    const status = entry.data.status ?? 'unspecified';
    byStatus[status] = (byStatus[status] ?? 0) + 1;
  }
  return { total: entries.length, byStatus };
}

const SOURCE_REF = /S-\d{3}/;

// Must match tools/audit/hygiene.mjs and docs/facilitation.md.
export const NOTE_BUDGET_WORDS = 260;

function facilitatorNote(body: string): string | null {
  const start = body.search(/^## Facilitator note\s*$/m);
  if (start === -1) return null;
  const rest = body.slice(start).replace(/^## Facilitator note\s*/, '');
  const end = rest.search(/^## /m);
  return (end === -1 ? rest : rest.slice(0, end)).trim();
}

/**
 * How many facilitator notes fit the documented budget. A note is guidance a
 * teacher reads while the room is moving; past the budget it stops being read.
 */
export function noteBudget(lessons: LessonLike[]): { total: number; within: number } {
  let within = 0;
  let total = 0;
  for (const lesson of lessons) {
    const note = facilitatorNote(lesson.body ?? '');
    if (note === null) continue;
    total += 1;
    if (note.split(/\s+/).filter(Boolean).length <= NOTE_BUDGET_WORDS) within += 1;
  }
  return { total, within };
}

export function citationCoverage(lessons: LessonLike[]): {
  total: number;
  citing: number;
  percent: number;
} {
  const citing = lessons.filter((l) => SOURCE_REF.test(l.body ?? '')).length;
  const total = lessons.length;
  return { total, citing, percent: total ? Math.round((citing / total) * 100) : 0 };
}

export function objectiveCoverage(
  domains: DomainLike[],
  lessons: LessonLike[],
): { declared: number; taught: number } {
  const declared = new Set<string>();
  for (const domain of domains) {
    for (const list of Object.values(domain.data.grade_objectives ?? {})) {
      for (const objective of list ?? []) {
        if (objective?.id) declared.add(objective.id);
      }
    }
  }
  const taught = new Set<string>();
  for (const lesson of lessons) {
    for (const objective of lesson.data.objectives ?? []) {
      if (declared.has(objective)) taught.add(objective);
    }
  }
  return { declared: declared.size, taught: taught.size };
}

/**
 * Recorded verdicts from the project's own agent backlog. Read at build time;
 * the file is provenance, not a live queue.
 */
export function reviewVerdicts(): { passed: number; blocked: number; other: number } {
  const file = path.resolve(process.cwd(), '..', 'agents', 'backlog', 'backlog.yaml');
  let items: Array<{ reviews?: Record<string, { verdict?: string }> }> = [];
  try {
    const data = parse(readFileSync(file, 'utf8')) as {
      items?: Array<{ reviews?: Record<string, { verdict?: string }> }>;
    };
    items = data.items ?? [];
  } catch {
    return { passed: 0, blocked: 0, other: 0 };
  }

  let passed = 0;
  let blocked = 0;
  let other = 0;
  for (const item of items) {
    for (const review of Object.values(item.reviews ?? {})) {
      if (review?.verdict === 'passed') passed += 1;
      else if (review?.verdict === 'blocked') blocked += 1;
      else other += 1;
    }
  }
  return { passed, blocked, other };
}

/**
 * How many referenced graphics describe themselves. A diagram without a `<title>`
 * or `<desc>` is invisible to a screen reader, whatever it looks like to the rest
 * of us. Read from disk because that is where the asset lives — the lesson only
 * carries its path.
 */
export function graphicDescriptions(lessons: LessonLike[]): { total: number; described: number } {
  const root = path.resolve(process.cwd(), '..');
  const seen = new Set<string>();
  let described = 0;

  for (const lesson of lessons) {
    for (const asset of lesson.data.assets ?? []) {
      const assetPath = asset?.path;
      if (!assetPath || !assetPath.endsWith('.svg') || seen.has(assetPath)) continue;
      seen.add(assetPath);
      let source: string;
      try {
        source = readFileSync(path.join(root, assetPath), 'utf8');
      } catch {
        continue;
      }
      if (/role="img"/.test(source) && /<title[\s>]/.test(source) && /<desc[\s>]/.test(source)) {
        described += 1;
      }
    }
  }
  return { total: seen.size, described };
}
