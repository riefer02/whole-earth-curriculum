# AGENTS.md

This file is the contract for any AI agent (opencode, Claude Code, or other)
working in this repository. Read it fully before making any change. It is not
optional context — it is the rules you must follow.

## 1. What this repository is

A single, comprehensive, humanitarian, egalitarian K–12 curriculum ("New World
Order Education") offered free to the world. Its purpose is to produce humans who
are emotionally, physically, and intellectually aware of themselves, their context,
and their environment — raising the baseline standard of living for all life on
Earth.

The repository is a **monorepo**. Its backbone is a traceability chain:

```
Vision → Pillar (P1–P4) → Domain (D01–D10) → Strand (Dxx.Sn)
       → Standard/Objective (Dxx.Sn.<grade>.<n>) → Unit (U.gg.nnn) → Lesson (L.gg.nnn.nn)
```

Nothing you write may break this chain. Every lesson MUST declare `objectives:` that
resolve to real standard IDs.

## 2. Canonical reference documents (read these)

- `docs/vision.md` — the North Star and four pillars. Alignment here is non-negotiable.
- `docs/philosophy.md` — pedagogical and values commitments.
- `docs/taxonomy.md` — the domain/strand/ID scheme.
- `docs/schema.md` — the frontmatter schema and required body headings.
- `docs/architecture.md` — how the monorepo is organized.
- `docs/roadmap.md` — sequencing of the build.

## 3. Authoring rules

- Content is **Markdown + YAML frontmatter** (delimiters `---`).
- Frontmatter MUST include a `kind` field (`lesson`, `unit`, `scope`, `domain`,
  `agent`, `backlog`, or `standard`).
- Frontmatter is validated against JSON Schema in `schema/`. Run `npm run validate`
  after any content change; it must pass.
- IDs must follow the scheme in `docs/taxonomy.md`. Never invent a new ID format.
- Every lesson must include required body headings (`## Procedure`, `## Assessment`
  at minimum) and must visibly carry the cross-cutting lenses.
- Content must be **age-appropriate**, **spiral** (build on prior grades), and
  written through the lenses of **ethics, egalitarianism, global/anthropological
  perspective, and the effect of technology on humanity and the environment**.
- Avoid U.S.-centric or Eurocentric default framing; the curriculum is global.
- Cite sources for factual/scientific claims; distinguish evidence from values.

## 4. The agent loop

If you are contributing curriculum, you are one of the agents defined in
`agents/definitions/agents.yaml` (see also `agents/loop.md`). Work the loop:

1. Read your agent definition and prompt (`agents/prompts/<agent>.md`).
2. Claim the next `ready` item for your agent from the backlog
   (`agents/backlog/backlog.yaml`).
3. Do the work in the correct directory.
4. Validate (`npm run validate`).
5. Submit for review (`npm run loop:submit -- <item-id>`). If you are a reviewer,
   record your verdict with `npm run loop:review -- <item-id> <agent-id> passed|blocked`.
   An item is not `done` until every reviewer in its `required_reviews` has passed,
   in order.

Never start work that is not represented by a backlog item for your role, unless a
maintainer directs otherwise.

## 5. State management

- Backlog statuses live in `agents/backlog/backlog.yaml`
  (`ready`, `claimed`, `review`, `done`).
- The canonical sequential stage order lives in `agents/pipeline.yaml`.
- Loop metadata lives in `agents/state/state.json`.
- Use the `tools/loop/loop.mjs` orchestrator (`npm run loop:next`,
  `npm run loop:claim -- <agent-id> <item-id>`, `npm run loop:submit -- <item-id>`,
  `npm run loop:review -- <item-id> <agent-id> passed|blocked`,
  `npm run loop:complete -- <item-id>`, `npm run loop:report`,
  `npm run loop:pipeline`, `npm run loop:coverage`) rather than hand-editing state
  where possible.
- The loop runs **sequentially as dependencies**, one linear thread through git
  history. Respect `depends_on` and `required_reviews`; do not skip stages or fan
  out in parallel.
- To run the loop unattended, use `npm run loop:run` (opencode-driven; see
  `agents/loop.md`).

## 6. Do not

- Do not break the traceability chain or invent new ID schemes.
- Do not commit content that fails validation.
- Do not add dependencies to the tooling without updating `package.json` and the CI
  workflow.
- Do not introduce content that promotes hierarchy, supremacy, or enrichment of the
  few over the many.
- Do not claim work as done before it validates.
