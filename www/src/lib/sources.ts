// Loads the canonical source registry (`sources/sources.yaml`) for display on
// the public site. The single source of truth is the YAML file owned by the
// fact-checker agent; nothing is duplicated here.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

export interface Source {
  id: string;
  title: string;
  type: string;
  url?: string;
  author?: string;
  organization?: string;
  year?: number;
  reviewed?: boolean;
  contested?: boolean;
}

interface RawSource {
  id?: string;
  title?: string;
  type?: string;
  url?: string;
  author?: string;
  organization?: string;
  year?: number;
  reviewed?: boolean;
  notes?: string;
}

export function loadSources(): Source[] {
  const file = path.resolve(process.cwd(), '..', 'sources', 'sources.yaml');
  const raw = readFileSync(file, 'utf8');
  const data = parse(raw) as { sources?: RawSource[] };
  return (data.sources ?? []).map((s) => ({
    id: s.id ?? '',
    title: s.title ?? '',
    type: s.type ?? '',
    url: s.url,
    author: s.author,
    organization: s.organization,
    year: s.year,
    reviewed: s.reviewed,
    contested: typeof s.notes === 'string' && /CONTESTED/i.test(s.notes),
  }));
}
