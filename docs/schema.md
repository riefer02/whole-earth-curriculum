# Schema

How content files are structured: frontmatter fields and required body headings.

Every content file is Markdown with a YAML frontmatter block delimited by `---`.

```markdown
---
kind: lesson
id: L.00.001.01
# ... more fields ...
---

# Lesson title

## Procedure
...

## Assessment
...
```

The frontmatter is validated against JSON Schema in `schema/`. The `kind` field
selects which schema applies.

## Kinds

| `kind` | File location | Purpose |
|--------|---------------|---------|
| `domain` | `curriculum/standards/domains/*/domain.md` | A domain: strands + grade-level objectives. |
| `scope` | `curriculum/k-12/grade-*/*/scope.md` | The year plan for a grade (≈180 days). |
| `unit` | `curriculum/k-12/grade-*/*/units/*/unit.md` | A multi-lesson block. |
| `lesson` | `curriculum/k-12/grade-*/*/units/*/lessons/*.md` | One day of instruction. |
| `agent` | `agents/definitions/agents.yaml` | A curriculum-building agent definition. |
| `backlog` | `agents/backlog/backlog.yaml` | The work backlog (list of items). |

## Field reference by kind

### `lesson`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `kind` | string | yes | must be `lesson` |
| `id` | string | yes | `L.gg.nnn.nn` |
| `title` | string | yes | |
| `grade` | integer | yes | `0` (K) – `12` |
| `unit` | string | yes | owning unit ID `U.gg.nnn` |
| `sequence_in_unit` | integer | no | position within the unit |
| `domain` | array | yes | one or more `Dxx` |
| `pillar` | array | no | one or more `Px` |
| `strand` | array | no | one or more `Dxx.Sn` |
| `objectives` | array | yes | one or more standard IDs |
| `essential_question` | string | no | |
| `key_vocabulary` | array | no | |
| `materials` | array | no | standard classroom supplies `{ name, quantity, notes }` |
| `materials_low_tech` | array | no | no-cost/universal variant (paper, found objects, voice, body) |
| `materials_enriched` | array | no | lab/device/field-trip variant |
| `context_variants` | array | no | `{ context, note }` for environment changes (forest vs lab, etc.) |
| `assets` | array | no | `{ path, alt, kind, source }` — `path` must resolve to a real file |
| `duration_minutes` | integer | yes | |
| `summary` | string | no | |
| `cross_cutting_lenses` | array | no | from the allowed list |
| `assessment_type` | array | no | formative/summative/etc. |
| `status` | string | yes | `draft` \| `review` \| `approved` |
| `author` | string | no | |
| `last_updated` | string | no | |

Recommended `context_variants` contexts: `large-group` (30+ learners), `multi-age`,
`self-directed` (no facilitator), `level-grouped` (by mastery, not age), and
`outdoor-only`. See [`docs/contexts.md`](contexts.md).

### `unit`

`kind`, `id` (`U.gg.nnn`), `title`, `grade`, `domain`, `pillar`, `strand`,
`objectives`, `essential_questions`, `big_ideas`, `duration_weeks`,
`assessment_plan`, `status`, `author`, `last_updated`.

### `scope`

`kind`, `grade`, `year_title`, `total_school_days` (default 180), `summary`,
`units` (array of `{ unit_id, title, domain, pillar, start_day, end_day,
lesson_count }`), `domain_weighting` (map `Dxx` → days/percent), `assessment_plan`,
`status`.

#### Writing a scope

A grade page renders exactly two pieces of prose: `summary` as the lede paragraph at
the top of the page, and the body's `## Year at a glance` section as the overview
below the unit timeline. Both are read by parents, teachers, and curious visitors who
want to *understand the year*, not to audit every standard. Keep them short, distinct,
and non-overlapping.

| Piece | Target | Job |
|-------|--------|-----|
| `summary` | 60–110 words, 3–5 sentences | The page lede and the meta description. What the year is about and what the learner becomes. No unit list, no standard IDs, no enumeration. |
| `## Year at a glance` | 350–650 words | The narrative arc: how the year builds on the prior grade, how the units cluster into two to four movements, and the pillar balance. |

Rules:

- **Never recite the standards.** Do not walk through objectives one by one, with or
  without IDs, and do not string sentences together with "and … and … and". Objective
  text already lives in `curriculum/standards/domains/*/domain.md` and on each unit
  page's objectives list. The scope names each unit once, in the form
  `*Unit Title* (U.gg.nnn, Dxx)` — both domains for a two-domain unit, as
  `(U.gg.nnn, Dxx + Dyy)` — and says what the unit is *for*.
- **Do not repeat `summary` in the body.** The lede and the overview sit inches apart
  on the same page; restating one in the other doubles the wall of text for no gain.
- **Keep the closing pillar paragraph** (roughly 80–140 words) — it is the one place
  the page states how P1–P4 are weighted in the year.
- **Do not pad back up later.** The year plan, `units`, `domain_weighting`, and
  `assessment_plan` carry the detail. `npm run validate` warns when a scope summary or
  body drifts past these targets.

Line-wrap body prose at ~88 characters, as elsewhere in the repository.

### `domain`

`kind`, `id` (`Dxx`), `title`, `pillar`, `description`, `rationale`, `strands`
(array of `{ id, title, description }`), `grade_objectives` (map grade → list of
`{ id, text }`), `cross_cutting_lenses`, `status`.

### `agent` / `backlog`

See `agents/README.md` and the machine-readable `agents/definitions/agents.yaml`.

## Required body headings

In addition to valid frontmatter, the Markdown body must include certain headings.

- **`lesson`** requires `## Procedure`, `## Assessment`, `## Facilitator note`, and
  `## Connection` (case-insensitive, `##` level), and is strongly encouraged to
  include `## Summary`, `## Objectives`, `## Materials`, `## Preparation`,
  `## Differentiation`, `## Resources`, and `## Home connection`.
- **`scope`** requires `# <Grade> Scope`, `## How to read this scope`, and
  `## Year at a glance`.

The validator checks these. Content that fails frontmatter or heading checks will
not pass CI.

## Voice: learner-first

The `## Procedure` is written **to the learner** ("you"), so a lesson works in a
classroom *and* for a self-directed learner. Teacher guidance lives in
`## Facilitator note`. See [`docs/facilitation.md`](facilitation.md).

## Connection: anchor to real life

Every lesson's `## Connection` (2–3 sentences) ties the concept to everyday life,
written so it survives different lives:

- **Concrete before abstract** — a real, recognizable example before the abstraction.
- **Faithful** — the example illustrates the *real* concept, not a distorted cartoon.
- **Varied** — offer more than one context (city and farm, sea and mountain) or keep
  it explicitly adaptable. Life differs everywhere; avoid one default.
