import type { CollectionEntry } from 'astro:content';

// Reverse indexes over the curriculum collections. Whereas `standards.ts`
// walks *down* the traceability chain (standard → objective text), this file
// walks *up* it: given a strand or a single standard, which units and lessons
// actually enact it? Keys are normalized to uppercase so lookups match the
// canonical IDs emitted by the standards pages.

type LessonEntry = CollectionEntry<'lessons'>;
type UnitEntry = CollectionEntry<'units'>;

// A full objective ID is `Dxx.Sn.<grade>.<n>` (e.g. `D05.S2.03.2`,
// `D01.S1.K.01`). Stripping the trailing `.<grade>.<n>` yields the strand.
const OBJECTIVE_RE = /^([A-Z]\d+\.S\d+)\.[A-Za-z0-9]+\.[A-Za-z0-9]+$/i;
const STRAND_RE = /^[A-Z]\d+\.S\d+$/i;

export function strandFromObjective(objectiveId: string): string | null {
  const m = objectiveId.match(OBJECTIVE_RE);
  return m ? m[1].toUpperCase() : null;
}

// Union of a lesson/unit's declared `strand` field and the strands implied by
// its `objectives`, deduped and normalized.
function collectStrands(
  strands: string[] | undefined,
  objectives: string[] | undefined,
): string[] {
  const out = new Set<string>();
  for (const s of strands ?? []) {
    const norm = s.toUpperCase();
    if (STRAND_RE.test(norm)) out.add(norm);
  }
  for (const o of objectives ?? []) {
    const s = strandFromObjective(o);
    if (s) out.add(s);
  }
  return [...out];
}

function sortLessons(list: LessonEntry[]): void {
  list.sort((a, b) => {
    const ga = a.data.grade ?? Number.MAX_SAFE_INTEGER;
    const gb = b.data.grade ?? Number.MAX_SAFE_INTEGER;
    if (ga !== gb) return ga - gb;
    const sa = a.data.sequence_in_unit ?? Number.MAX_SAFE_INTEGER;
    const sb = b.data.sequence_in_unit ?? Number.MAX_SAFE_INTEGER;
    if (sa !== sb) return sa - sb;
    return (a.data.id ?? '').localeCompare(b.data.id ?? '');
  });
}

function sortUnits(list: UnitEntry[]): void {
  list.sort((a, b) => {
    const ga = a.data.grade ?? Number.MAX_SAFE_INTEGER;
    const gb = b.data.grade ?? Number.MAX_SAFE_INTEGER;
    if (ga !== gb) return ga - gb;
    return (a.data.id ?? '').localeCompare(b.data.id ?? '');
  });
}

export function strandToLessons(
  lessons: LessonEntry[],
): Map<string, LessonEntry[]> {
  const map = new Map<string, LessonEntry[]>();
  for (const lesson of lessons) {
    for (const strand of collectStrands(lesson.data.strand, lesson.data.objectives)) {
      const list = map.get(strand) ?? [];
      list.push(lesson);
      map.set(strand, list);
    }
  }
  for (const list of map.values()) sortLessons(list);
  return map;
}

export function standardToLessons(
  lessons: LessonEntry[],
): Map<string, LessonEntry[]> {
  const map = new Map<string, LessonEntry[]>();
  for (const lesson of lessons) {
    for (const objective of lesson.data.objectives ?? []) {
      const key = objective.toUpperCase();
      if (!key) continue;
      const list = map.get(key) ?? [];
      list.push(lesson);
      map.set(key, list);
    }
  }
  for (const list of map.values()) sortLessons(list);
  return map;
}

export function strandToUnits(
  units: UnitEntry[],
): Map<string, UnitEntry[]> {
  const map = new Map<string, UnitEntry[]>();
  for (const unit of units) {
    for (const strand of collectStrands(unit.data.strand, unit.data.objectives)) {
      const list = map.get(strand) ?? [];
      list.push(unit);
      map.set(strand, list);
    }
  }
  for (const list of map.values()) sortUnits(list);
  return map;
}

export function standardToUnits(
  units: UnitEntry[],
): Map<string, UnitEntry[]> {
  const map = new Map<string, UnitEntry[]>();
  for (const unit of units) {
    for (const objective of unit.data.objectives ?? []) {
      const key = objective.toUpperCase();
      if (!key) continue;
      const list = map.get(key) ?? [];
      list.push(unit);
      map.set(key, list);
    }
  }
  for (const list of map.values()) sortUnits(list);
  return map;
}
