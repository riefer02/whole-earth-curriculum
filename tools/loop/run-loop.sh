#!/usr/bin/env bash
# Drive the NWO-EDU agent loop with opencode until the backlog is empty.
#
# Usage:
#   npm run loop:run                 # use the default 'curriculum' orchestrator
#   npm run loop:run -- lesson-author # run a single agent's loop instead
set -euo pipefail
cd "$(dirname "$0")/../.."
AGENT="${1:-curriculum}"
MESSAGE="Work the curriculum loop: read AGENTS.md, agents/loop.md, and agents/pipeline.yaml. Claim the next ready item, delegate it to the correct subagent, validate, complete, and commit in stage order. Repeat until no ready items remain, then print the coverage report."
exec opencode run --agent "$AGENT" --auto "$MESSAGE"
