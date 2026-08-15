// Structural taxonomy relations (IDs only — no display labels here; labels live
// in the i18n layer so they are translatable).

export const PILLAR_IDS = ['P1', 'P2', 'P3', 'P4'] as const;

export function pad2(n: number | string): string {
  return String(n).padStart(2, '0');
}

// Sort domain IDs in canonical D01..D10 order.
export function sortDomainIds(ids: string[]): string[] {
  return [...ids].sort((a, b) => a.localeCompare(b));
}
