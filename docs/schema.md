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
| `materials` | array | no | `{ name, quantity, notes }` |
| `duration_minutes` | integer | yes | |
| `summary` | string | no | |
| `cross_cutting_lenses` | array | no | from the allowed list |
| `assessment_type` | array | no | formative/summative/etc. |
| `status` | string | yes | `draft` \| `review` \| `approved` |
| `author` | string | no | |
| `last_updated` | string | no | |

### `unit`

`kind`, `id` (`U.gg.nnn`), `title`, `grade`, `domain`, `pillar`, `strand`,
`objectives`, `essential_questions`, `big_ideas`, `duration_weeks`,
`assessment_plan`, `status`, `author`, `last_updated`.

### `scope`

`kind`, `grade`, `year_title`, `total_school_days` (default 180), `summary`,
`units` (array of `{ unit_id, title, domain, pillar, start_day, end_day,
lesson_count }`), `domain_weighting` (map `Dxx` → days/percent), `assessment_plan`,
`status`.

### `domain`

`kind`, `id` (`Dxx`), `title`, `pillar`, `description`, `rationale`, `strands`
(array of `{ id, title, description }`), `grade_objectives` (map grade → list of
`{ id, text }`), `cross_cutting_lenses`, `status`.

### `agent` / `backlog`

See `agents/README.md` and the machine-readable `agents/definitions/agents.yaml`.

## Required body headings

In addition to valid frontmatter, the Markdown body must include certain headings.

- **`lesson`** requires `## Procedure` and `## Assessment` (case-insensitive, `##`
  level), and is strongly encouraged to include `## Summary`, `## Objectives`,
  `## Materials`, `## Preparation`, `## Differentiation`, `## Resources`.

The validator checks these. Content that fails frontmatter or heading checks will
not pass CI.
