# Architecture

How the monorepo is organized, and why.

## Guiding principle

This is a **monorepo**: one repository holds the curriculum, its standards, the
scholastic assets, the tooling, and the agent system that produces it all. New
facets (a website, a mobile app, a print pipeline) will be added as top-level
directories later, but they will all read from the same source of truth — the
content here — rather than forking it.

## The source of truth

Content is plain **Markdown + YAML frontmatter**. This is deliberate:

- It is human-readable and diffable in Git.
- It is trivially readable/writable by AI agents.
- It is independent of any runtime, so it can be rendered to web, print, EPUB, or
  anything else later.

The *structure* of that content is enforced by JSON Schema (in `schema/`) and a
validator (`tools/validate/`). Schemas are the contract; the validator is the
gatekeeper.

Factual claims have a complementary evidence chain. Lessons cite vetted `S-NNN`
records in `sources/sources.yaml`; `sources/usage.md` is the generated reverse index
from each source to every lesson that depends on it. Curriculum traceability and
evidence lineage therefore meet at the lesson without changing either ID scheme.

## Top-level directories

| Directory | Purpose |
|-----------|---------|
| `docs/` | The canonical reference documents (vision, philosophy, taxonomy, etc.). |
| `schema/` | JSON Schema for every `kind` of content file. |
| `curriculum/standards/` | Domains → strands → grade-level objectives. The **what**. |
| `curriculum/k-12/` | Grade-level units and lessons. The **how**. |
| `sources/` | Vetted references and the generated lesson-usage index. The **evidence**. |
| `agents/` | The curriculum-building agent crew, its loop, backlog, and state. |
| `tools/` | Validator and loop orchestrator (the only code today). |
| `assets/` | Scholastic assets referenced by lessons (images, worksheets, audio, video). |
| `.github/` | CI workflows. |

## The two halves of curriculum

**Standards** (`curriculum/standards/`) and **enacted curriculum**
(`curriculum/k-12/`) are separated on purpose:

- Standards describe *what* students should know and be able to do, organized
  vertically (spiral) by strand across all grades.
- Units and lessons describe *how* that is taught, organized horizontally by grade
  and by the school year (≈180 days).

A lesson's `objectives:` field links the two, creating the traceability chain.
Because they are separate, the standards can be assessed against multiple
enactments (different languages, different cultures, different calendars) without
rewriting the backbone.

## The agent system

The curriculum is produced by a crew of agents running a loop (see `agents/`). Each
agent has a defined role, goal, inputs, outputs, and done-criteria. The loop is
backlog-driven and stateful: work moves `ready → claimed → done`, and the state is
committed so progress survives across sessions.

## Versioning & scale

- 13 grade levels (K + 12), ~180 instructional days each.
- Each grade is a `scope.md` (the year plan) plus ordered units containing lessons.
- Content is authored incrementally by the agent loop, validated continuously, and
  released as stable snapshots.
