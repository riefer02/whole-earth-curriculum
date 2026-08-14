# Roadmap

Sequencing of the build. The curriculum is produced by the agent loop (see
`agents/`); this document defines the *order* of that production.

## Phase 0 — Foundation (current)

Establish the monorepo, vision, philosophy, taxonomy, schemas, validator, and the
agent loop. Prove the pipeline with one complete exemplar strand/unit.

**Exit criteria:** a new agent can clone the repo, read `AGENTS.md`, claim a backlog
item, author valid content, and pass validation — end to end.

## Phase 1 — Standards backbone

Author the full standards tree: every domain's strands and grade-level objectives,
K–12. This is the vertical spine every lesson will hang from.

**Exit criteria:** `curriculum/standards/` is complete for D01–D10, all grades, and
passes validation. The traceability chain is load-bearing.

## Phase 2 — Exemplar vertical slices

Build one complete vertical slice for a small number of strands — full units and
lessons for Kindergarten, Grade 4, Grade 8, and Grade 12 — to calibrate
age-appropriateness, depth, and voice before mass production.

**Exit criteria:** four grade levels have at least one fully-authored, validated,
audited unit; reviewers and alignment auditors have signed off.

## Phase 3 — Horizontal mass production

Author all 13 grade levels (K–12), ≈180 days each, using the calibrated templates.

**Exit criteria:** every grade has a complete `scope.md` and a full year of
validated, audited lessons.

## Phase 4 — Assets & accessibility

Produce the scholastic assets (illustrations, worksheets, audio, video, translated
editions) and ensure accessibility.

**Exit criteria:** every lesson's `materials:` resolve to real assets; core lessons
have accessible and multilingual variants.

## Phase 5 — Delivery

Build the renderers and distribution (web, print, EPUB, offline bundles) on top of
the content source of truth.

**Exit criteria:** a learner anywhere with a device or a printed binder can access
the full curriculum at no cost.
