// Canonical ID → URL resolvers. All internal links go through these functions
// so that permalinks stay stable (keyed by ID) even if content slugs change.

import { pad2 } from './taxonomy';

export function gradePath(grade: number): string {
  return `/curriculum/${pad2(grade)}/`;
}

export function unitPath(unitId: string): string {
  // U.gg.nnn
  const m = unitId.match(/^U\.(\d+)\.(\d+)$/);
  if (!m) return `/curriculum/`;
  const [, gg, nnn] = m;
  return `/curriculum/${pad2(gg)}/${pad2(nnn)}/`;
}

export function lessonPath(lessonId: string): string {
  // L.gg.nnn.nn
  const m = lessonId.match(/^L\.(\d+)\.(\d+)\.(\d+)$/);
  if (!m) return `/curriculum/`;
  const [, gg, nnn, nn] = m;
  return `/curriculum/${pad2(gg)}/${pad2(nnn)}/${pad2(nn)}/`;
}

export function domainPath(domainId: string): string {
  return `/standards/${domainId.toLowerCase()}/`;
}

export function strandPath(strandId: string): string {
  // Dxx.Sn
  const m = strandId.match(/^([A-Z]\d+)\.(S\d+)$/i);
  if (!m) return '/standards/';
  return `/standards/${m[1].toLowerCase()}/${m[2].toLowerCase()}/`;
}

export function docPath(slug: string): string {
  return `/docs/${slug}/`;
}
