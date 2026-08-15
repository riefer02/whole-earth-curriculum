import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// NOTE: these schemas intentionally mirror schema/*.json but are lenient
// (`.optional()` + `.loose()`). The JSON Schema validator in the repo
// root (`npm run validate`) is the single gatekeeper for content correctness.
// The site only extracts the fields it renders, so a new frontmatter field
// must never break the build. Do not tighten these to match schema/*.json.

const idList = z.array(z.string()).optional();
const strArray = z.array(z.string()).optional();

const material = z.object({
  name: z.string().optional(),
  quantity: z.union([z.string(), z.number()]).optional(),
  notes: z.string().optional(),
});

const asset = z.object({
  path: z.string().optional(),
  alt: z.string().optional(),
  kind: z.string().optional(),
  source: z.string().optional(),
});

// YAML parses `last_updated: 2026-08-14` as a date, so accept string/date/number.
const lastUpdated = z.union([z.string(), z.date(), z.number()]).optional();

const contextVariant = z.object({
  context: z.string().optional(),
  note: z.string().optional(),
});

const lessons = defineCollection({
  loader: glob({
    pattern: '**/lessons/*.md',
    base: '../curriculum/k-12',
    generateId: ({ data }) => String((data as { id?: string }).id ?? ''),
  }),
  schema: z
    .object({
      kind: z.string().optional(),
      id: z.string().optional(),
      title: z.string().optional(),
      grade: z.coerce.number().optional(),
      unit: z.string().optional(),
      sequence_in_unit: z.coerce.number().optional(),
      domain: idList,
      pillar: idList,
      strand: idList,
      objectives: idList,
      essential_question: z.string().optional(),
      key_vocabulary: strArray,
      materials: z.array(material).optional(),
      materials_low_tech: z.array(material).optional(),
      materials_enriched: z.array(material).optional(),
      context_variants: z.array(contextVariant).optional(),
      assets: z.array(asset).optional(),
      duration_minutes: z.coerce.number().optional(),
      summary: z.string().optional(),
      cross_cutting_lenses: strArray,
      assessment_type: strArray,
      status: z.string().optional(),
      author: z.string().optional(),
      last_updated: lastUpdated,
    })
    .loose(),
});

const units = defineCollection({
  loader: glob({
    pattern: '**/units/*/unit.md',
    base: '../curriculum/k-12',
    generateId: ({ data }) => String((data as { id?: string }).id ?? ''),
  }),
  schema: z
    .object({
      kind: z.string().optional(),
      id: z.string().optional(),
      title: z.string().optional(),
      grade: z.coerce.number().optional(),
      domain: idList,
      pillar: idList,
      strand: idList,
      objectives: idList,
      essential_questions: strArray,
      big_ideas: strArray,
      duration_weeks: z.coerce.number().optional(),
      assessment_plan: z.string().optional(),
      status: z.string().optional(),
      author: z.string().optional(),
      last_updated: lastUpdated,
    })
    .loose(),
});

const scopes = defineCollection({
  loader: glob({
    pattern: '**/scope.md',
    base: '../curriculum/k-12',
    generateId: ({ data }) => `g${String((data as { grade?: number }).grade ?? 0).padStart(2, '0')}`,
  }),
  schema: z
    .object({
      kind: z.string().optional(),
      grade: z.coerce.number().optional(),
      year_title: z.string().optional(),
      total_school_days: z.coerce.number().optional(),
      summary: z.string().optional(),
      units: z
        .array(
          z.object({
            unit_id: z.string().optional(),
            title: z.string().optional(),
            domain: idList,
            pillar: idList,
            start_day: z.coerce.number().optional(),
            end_day: z.coerce.number().optional(),
            lesson_count: z.coerce.number().optional(),
          }),
        )
        .optional(),
      domain_weighting: z.record(z.string(), z.coerce.number()).optional(),
      assessment_plan: z.string().optional(),
      status: z.string().optional(),
      author: z.string().optional(),
      last_updated: lastUpdated,
    })
    .loose(),
});

const domains = defineCollection({
  loader: glob({
    pattern: '**/domain.md',
    base: '../curriculum/standards/domains',
    generateId: ({ data }) => String((data as { id?: string }).id ?? ''),
  }),
  schema: z
    .object({
      kind: z.string().optional(),
      id: z.string().optional(),
      title: z.string().optional(),
      pillar: idList,
      description: z.string().optional(),
      rationale: z.string().optional(),
      strands: z
        .array(
          z.object({
            id: z.string().optional(),
            title: z.string().optional(),
            description: z.string().optional(),
          }),
        )
        .optional(),
      grade_objectives: z
        .record(
          z.string(),
          z.array(z.object({ id: z.string().optional(), text: z.string().optional() })),
        )
        .optional(),
      cross_cutting_lenses: strArray,
      status: z.string().optional(),
      author: z.string().optional(),
      last_updated: lastUpdated,
    })
    .loose(),
});

const docs = defineCollection({
  loader: glob({ pattern: '*.md', base: '../docs' }),
  schema: z.object({}).loose(),
});

export const collections = { lessons, units, scopes, domains, docs };
