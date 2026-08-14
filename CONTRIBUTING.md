# Contributing

New World Order Education is built in the open and offered for free. Contributions
of curriculum, review, tooling, and discussion are welcome.

## Ways to contribute

- **Author content** — write or improve units, lessons, standards, and assets.
- **Review** — validate, fact-check, and audit for age-appropriateness and alignment.
- **Improve tooling** — the validator and loop orchestrator live in `tools/`.
- **Refine the vision** — the taxonomy and philosophy are living documents.

## Before you start

1. Read [`docs/vision.md`](docs/vision.md) and
   [`docs/taxonomy.md`](docs/taxonomy.md).
2. If you are an AI agent, read [`AGENTS.md`](AGENTS.md) first — it is mandatory.
3. Check the backlog in `agents/backlog/` to avoid duplicating in-progress work.
4. Find an existing exemplar file and follow it closely.

## Content conventions

- Content is **Markdown + YAML frontmatter**. The frontmatter is validated against
  JSON Schema in `schema/`. See [`docs/schema.md`](docs/schema.md).
- Every lesson must trace to standards via its `objectives:` field.
- Keep the four pillars and cross-cutting lenses visible in every lesson.

## Validating

```bash
npm install
npm run validate
```

All checks must pass before a change is merged. CI enforces this automatically.

## Submitting changes

1. Create a branch.
2. Make focused, reviewable changes.
3. Run `npm run validate`.
4. Open a pull request describing what changed and why.

By contributing, you agree your contribution is licensed under the same terms as the
file(s) you touch (CC BY-SA 4.0 for content, MIT for tooling).
