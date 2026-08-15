import type { CollectionEntry } from 'astro:content';

// Canonical grade keys, K then 01..12, in display order.
export const GRADE_ORDER = [
  'K',
  ...Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')),
];

export function gradeKeyLabel(key: string): string {
  return key === 'K' ? 'K' : String(Number(key));
}

// Flat map of standard ID → objective text, built from the domains collection.
// Powers resolving lesson/unit `objectives:` IDs to human-readable text.
export function buildStandardMap(
  domains: CollectionEntry<'domains'>[],
): Map<string, string> {
  const map = new Map<string, string>();
  for (const d of domains) {
    for (const objs of Object.values(d.data.grade_objectives ?? {})) {
      for (const o of objs) {
        if (o.id && o.text) map.set(o.id, o.text);
      }
    }
  }
  return map;
}

// Resolve a list of objective IDs to their text, dropping unknown IDs.
export function resolveObjectives(
  ids: string[] | undefined,
  map: Map<string, string>,
): Array<{ id: string; text: string }> {
  return (ids ?? []).flatMap((id) => {
    const text = map.get(id);
    return text ? [{ id, text }] : [];
  });
}

// Objectives for one strand, ordered K–12, from a domain's grade_objectives map.
export function objectivesForStrand(
  gradeObjectives: Record<string, Array<{ id?: string; text?: string }>>,
  strandId: string,
): Array<{ gradeKey: string; id: string; text: string }> {
  const out: Array<{ gradeKey: string; id: string; text: string }> = [];
  for (const gradeKey of GRADE_ORDER) {
    for (const o of gradeObjectives[gradeKey] ?? []) {
      if (o.id && o.id.startsWith(`${strandId}.`)) {
        out.push({ gradeKey, id: o.id, text: o.text ?? '' });
      }
    }
  }
  return out;
}

// Domain id → title, from the domains collection.
export function buildDomainIndex(
  domains: CollectionEntry<'domains'>[],
): Map<string, string> {
  const map = new Map<string, string>();
  for (const d of domains) {
    if (d.id) map.set(d.id, d.data.title ?? d.id);
  }
  return map;
}

