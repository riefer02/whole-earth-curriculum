# Agents

The curriculum is produced by a **crew of AI agents** running a stateful loop. This
directory defines who they are, what they must achieve, and how their work is
coordinated.

## Contents

| Path | Purpose |
|------|---------|
| [`loop.md`](loop.md) | The loop state machine and process. |
| [`definitions/agents.yaml`](definitions/agents.yaml) | Machine-readable agent definitions (roles, goals, done-criteria). |
| [`prompts/`](prompts/) | Prompt templates, one per agent. |
| [`backlog/backlog.yaml`](backlog/backlog.yaml) | The tracked work items. |
| [`state/state.json`](state/state.json) | Shared loop state (who is claiming what). |

## The crew

| Agent ID | Role |
|----------|------|
| `vision-architect` | Guards the vision, philosophy, and taxonomy. |
| `scope-sequencer` | Builds each grade's year plan (scope) and unit stubs. |
| `unit-designer` | Designs units (objectives, questions, assessment plan). |
| `assessment-designer` | Designs assessments and rubrics aligned to the philosophy. |
| `asset-designer` | Authors SVG graphics/worksheets and tiered materials. |
| `lesson-author` | Writes the lessons that enact units. |
| `reviewer` | Validates and quality-checks authored content. |
| `fact-checker` | Verifies factual accuracy and maintains the `sources/` registry. |
| `global-culture-editor` | Ensures global representation and cultural accuracy. |
| `accessibility-editor` | Ensures UDL, inclusion, and low-tech/no-tech accessibility. |
| `alignment-auditor` | Audits the cross-cutting lenses and traceability. |
| `child-psychologist` | Guards developmental appropriateness and emotional safety. |
| `integrator` | Merges approved work and keeps indexes/state coherent. |

## Working the loop

```bash
npm run loop:next                        # next ready item / pending reviews
npm run loop:claim -- <agent> <item>     # claim a ready item
npm run loop:submit -- <item>            # hand finished work to review
npm run loop:review -- <item> <agent> passed|blocked
npm run loop:complete -- <item>          # finish after all reviews pass
npm run loop:report                      # progress summary
npm run loop:pipeline                    # show the sequential stage order
npm run loop:stale                       # flag items stalled >30 min
npm run loop:coverage                    # standards coverage by domain/grade
npm run loop:run                         # drive the loop with opencode
```

See [`loop.md`](loop.md) for the full process and the review gate.
