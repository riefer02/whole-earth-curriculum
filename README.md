# New World Order Education (NWO-EDU)

> A comprehensive, meaningful, holistic, and freely available K–12 curriculum for
> humans — designed to be a drop-in replacement for failing public-education
> systems, and offered to the world at no cost.

NWO-EDU exists to raise the baseline standard of living for all life on Earth, from
the cellular level to the anthropological level, and for the entire Earth
environment. It does this by producing humans who are **emotionally, physically, and
intellectually aware** of themselves, the context they live in, and the environment
around them.

The curriculum is:

- **Holistic** — mind, body, emotion, and context are developed together, not in
  silos.
- **Egalitarian** — global history through an anthropological and scientific lens,
  ethics and morality at the core, built to benefit the many rather than the few.
- **Age-appropriate and cumulative** — lessons build on one another from
  Kindergarten through Grade 12, spiraling upward to foster critical thinking,
  social, professional, community, physical, and scientific skills.
- **Aware of now** — contemporary technologies and their effect on humanity and the
  environment are a first-class subject, not an afterthought.

## Repository layout

```
new-world-order-edu/
├── docs/               # The vision, philosophy, architecture, taxonomy, roadmap
├── schema/             # JSON Schema for all content files (the contract)
├── curriculum/
│   ├── standards/      # Domains → strands → grade-level objectives (the "what")
│   └── k-12/           # Grade-level units + lessons (the "how")
├── agents/             # The curriculum-building agent crew, loop, and backlog
├── tools/              # Validator + loop orchestrator (Node)
├── assets/             # Scholastic assets (images, worksheets, audio, video)
├── AGENTS.md           # Instructions for any AI agent working in this repo
└── .github/workflows/  # CI validation
```

## The backbone: traceable objectives

Everything descends from a single North Star, and every lesson traces back to it:

```
Vision → Pillar → Domain → Strand → Standard (objective) → Unit → Lesson
```

Every lesson declares the standards it serves (`objectives:` in its frontmatter),
which link it to a strand, a domain, a pillar, and ultimately the vision. This
traceability is the backbone — it is what keeps thousands of independently-authored
lessons aligned.

See [`docs/architecture.md`](docs/architecture.md) and
[`docs/taxonomy.md`](docs/taxonomy.md).

## Quick start

```bash
npm install            # installs the validator + loop tooling only
npm run validate       # validate all curriculum/agents content against the schema
npm run loop:report    # see curriculum-building progress
npm run loop:next      # see the next backlog item to work
```

No runtime app is required to author or validate curriculum. Content is plain
Markdown + YAML frontmatter.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). If you are an AI agent, read
[`AGENTS.md`](AGENTS.md) first — it is your contract.

## License

Curriculum content: [CC BY-SA 4.0](LICENSE) (free, with attribution + share-alike).
Tooling under `tools/`: MIT (`tools/LICENSE`).
