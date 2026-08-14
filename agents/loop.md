# The Agent Loop

How the curriculum crew works, coordinated against a shared backlog.

## State machine

Every backlog item moves through four states:

```
ready → claimed → review → done
```

- **`ready`** — defined and available to be picked up.
- **`claimed`** — an author is working on it.
- **`review`** — authored; it now moves through its `required_reviews` chain, in order.
- **`done`** — every required reviewer passed, and the work is merged.

An item can also be **blocked** (its `depends_on` is not yet `done`) — the
orchestrator will not offer blocked items.

## The review gate

This is what keeps quality high: an item cannot reach `done` until every reviewer in
its `required_reviews` list has recorded a `passed` verdict, **in order**. The
tooling enforces this, not just the prompts:

- A reviewer cannot review out of order — the previous reviewer must pass first.
- `loop:complete` refuses unless all required reviews are `passed`.
- A `blocked` verdict sends the item back to `claimed` and restarts the review chain.

The review chain for content is, in order:

```
reviewer → fact-checker → global-culture-editor → accessibility-editor
          → alignment-auditor → child-psychologist
```

`vision-architect` additionally gates scope/standards items. The exact chain for each
item is declared in its `required_reviews` field.

## The loop, step by step (author)

1. **Read your contract.** `AGENTS.md`, your definition in
   `agents/definitions/agents.yaml`, and your prompt in `agents/prompts/<agent>.md`.
2. **Claim.** `npm run loop:next -- <agent-id>`, then
   `npm run loop:claim -- <agent-id> <item-id>`.
3. **Do the work** in the correct directory, following the exemplars.
4. **Validate.** `npm run validate` must pass.
5. **Submit.** `npm run loop:submit -- <item-id>` — hands the work to review.

## The loop, step by step (reviewer)

1. **Find.** `npm run loop:next -- <agent-id>` shows items awaiting your review.
2. **Review** the item against your checks (see your prompt).
3. **Record.** `npm run loop:review -- <item-id> <agent-id> passed|blocked "<note>"`.

## Roles hand off to one another

```
Production:   scope-sequencer → unit-designer → lesson-author
Design:       assessment-designer (works alongside unit-designer and lesson-author)
Review:       reviewer → fact-checker → global-culture-editor → accessibility-editor
               → alignment-auditor → child-psychologist
Integrate:    integrator (completes and commits)
Guardrails:   vision-architect (taxonomy/vision), child-psychologist (development)
```

## Sequential, not parallel

The loop runs **sequentially as dependencies** — one linear thread of traceability
through the git history. This is deliberate: we fan out later, but get it right now.

- The canonical stage order lives in `agents/pipeline.yaml` (`npm run loop:pipeline`).
- Dependencies are explicit: `depends_on` (ordering) and `required_reviews`
  (review gating), both enforced by the tooling.
- One commit per item, in stage order, so the history reads as a single thread.

## Running with opencode

The loop is driven by opencode. A primary **`curriculum`** orchestrator agent
(`opencode.json`) drives it and delegates each item to the matching subagent.

```bash
npm run loop:run                      # drive the full loop until the backlog is empty
npm run loop:run -- lesson-author     # run a single agent's loop
```

`loop:run` invokes `opencode run --agent <agent> --auto`, which claims, delegates,
validates, submits, advances reviews, completes, and commits — in stage order. Use
`npm run loop:coverage` and `npm run loop:report` to check progress.

> After changing `opencode.json` or any agent prompt, restart opencode for the
> changes to take effect.

## Rules

- Never start work that is not a `ready` item for your role (unless a maintainer says
  otherwise).
- Never mark an item `done` before all its required reviews pass.
- Respect `depends_on` and `required_reviews`; do not skip stages or fan out.
- Update state through the orchestrator, not by hand-editing, where possible.
