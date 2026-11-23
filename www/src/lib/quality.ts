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
  data: { status?: string; objectives?: string[] };
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
