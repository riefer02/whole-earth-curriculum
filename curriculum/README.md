# Curriculum

The curriculum lives in two parts:

- **`standards/`** — the *vertical* spine: domains → strands → grade-level
  objectives (what students should know and be able to do, K–12).
- **`k-12/`** — the *horizontal* enactment: grade-level scopes, units, and lessons
  (how it is taught, ~180 days per grade).

Lessons link to standards through their `objectives:` frontmatter field, forming the
traceability chain described in [`../docs/taxonomy.md`](../docs/taxonomy.md).

## Writing content

1. Copy the exemplar closest to what you're writing:
   - Domain: `standards/domains/domain-01-self-and-identity/domain.md`
   - Scope: `k-12/grade-00-kindergarten/scope.md`
   - Unit: `k-12/grade-00-kindergarten/units/unit-001-who-am-i/unit.md`
   - Lesson: `k-12/grade-00-kindergarten/units/unit-001-who-am-i/lessons/lesson-001-naming-feelings.md`
2. Follow the field and heading conventions in [`../docs/schema.md`](../docs/schema.md).
3. Run `npm run validate` from the repo root.
