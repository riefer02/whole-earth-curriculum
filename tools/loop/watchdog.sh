#!/usr/bin/env bash
# Watch the curriculum loop and flag a stall while you are away.
# Start this in a second terminal AFTER `npm run loop:run`.
# Usage: bash tools/loop/watchdog.sh [minutes]   (default 20)
set -u
cd "$(dirname "$0")/../.."
THRESHOLD="${1:-20}"
LOG="agents/state/watchdog.log"

log() { echo "$(date '+%F %T') $*" >> "$LOG"; }

notify() {
  if command -v osascript >/dev/null 2>&1; then
    osascript -e "display notification \"$1\" with title \"NWO-EDU loop\"" >/dev/null 2>&1 || true
  fi
}

newest_age() {
  local newest now
  newest=$(find curriculum agents sources assets -type f -not -name 'watchdog.log' -exec stat -f %m {} \; 2>/dev/null | sort -rn | head -1)
  [ -z "$newest" ] && newest=$(date +%s)
  now=$(date +%s)
  echo $(( now - newest ))
}

pending() {
  node tools/loop/loop.mjs next 2>/dev/null | grep -qE 'claim:|verdict:|Next item|Pending reviews' && echo 1 || echo 0
}

log "watchdog started (threshold ${THRESHOLD}m)"
alerted=0
while true; do
  sleep 60
  age=$(newest_age)
  if [ "$(pending)" = "1" ]; then
    if [ "$age" -gt $(( THRESHOLD * 60 )) ]; then
      if [ "$alerted" = "0" ]; then
        log "STALLED - no file changes for ~$(( age / 60 ))m with work pending"
        notify "Loop stalled: no progress for ~$(( age / 60 ))m"
        alerted=1
      fi
    else
      alerted=0
    fi
  else
    log "DONE - backlog empty"
    notify "Loop finished."
    exit 0
  fi
done
