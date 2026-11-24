# Contributing

Whole Earth Curriculum is built in the open and offered for free. You do not need
to understand the repository or its schemas to contribute useful evidence.

## Ways to contribute

- **Teach or pilot** — report what worked, preparation time, barriers, adaptations,
  and assessment usefulness through the teacher-feedback issue form.
- **Review** — examine a bounded lesson or unit for factual accuracy,
  age-appropriateness, accessibility, culture, or alignment.
- **Translate or localize** — identify language, cultural, material, and contextual
  changes a community needs.
- **Author content or improve tooling** — submit focused repository changes.

Start at the [public support page](https://wholeearthcurriculum.org/support/) if you
want a conversation or coordinated role. Use a GitHub issue if the feedback can be
public. Never include personal information about learners in either place.

## Before you start

For a code or curriculum change:

1. Read [`docs/vision.md`](docs/vision.md) and
   [`docs/taxonomy.md`](docs/taxonomy.md).
2. If you are an AI agent, read [`AGENTS.md`](AGENTS.md) first — it is mandatory.
3. Check the backlog in `agents/backlog/` to avoid duplicating in-progress work.
4. Find an existing exemplar file and follow it closely.

If you are reporting classroom or expert feedback rather than editing files, choose
the relevant issue template and describe a specific lesson, unit, or claim. A
maintainer will translate accepted feedback into the internal backlog; contributors
do not need to edit agent state.

## Content conventions

- Content is **Markdown + YAML frontmatter**. The frontmatter is validated against
  JSON Schema in `schema/`. See [`docs/schema.md`](docs/schema.md).
- Every lesson must trace to standards via its `objectives:` field.
- Keep the four pillars and cross-cutting lenses visible in every lesson.

## Validating

```bash
npm install
npm run validate   # is the file well-formed?
npm run audit      # is it usable?
```

`validate` checks the schema, required headings, IDs, asset paths and citations.
`audit` checks the two things a reader feels but a schema cannot see: that the
facilitator note fits a teacher's twenty seconds, and that every graphic renders
inside its own canvas with its labels joined to what they label. Both must pass;
CI enforces them, and fails if the audit's must-fix count grows.

See [`docs/facilitation.md`](docs/facilitation.md) § "Writing a facilitator note" and
[`docs/art-style.md`](docs/art-style.md) § "Diagrams: label what you point at".

## Submitting changes

1. Create a branch.
2. Make focused, reviewable changes.
3. Run `npm run validate` and `npm run audit`.
4. Open a pull request describing what changed and why.

By contributing, you agree your contribution is licensed under the same terms as the
file(s) you touch (CC BY-SA 4.0 for content, MIT for tooling).
