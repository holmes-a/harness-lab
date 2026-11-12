#!/usr/bin/env bash
# ================================================================
# Pre-compact hook for Claude Code -- Mac / Linux / WSL
#
# WHAT IT DOES:
#   Fires before Claude Code auto-compacts a long conversation.
#   Injects your project memory files into the compaction context
#   so that key notes, preferences, and decisions survive the
#   summarisation step.
#
# HOW TO INSTALL:
#   1. Copy this file to <your-workspace-root>/_system/hooks/pre-compact.sh
#   2. Make it executable: chmod +x _system/hooks/pre-compact.sh
#   3. Wire it up in .claude/settings.json (see settings-example.json)
#   There is NO slug to configure -- see below.
#
# NO CONFIGURATION REQUIRED:
#   Claude Code stores project data at ~/.claude/projects/<slug>/, where the
#   slug is your workspace path with non-alphanumeric characters replaced by
#   hyphens (/Users/alice/my-business -> -Users-alice-my-business).
#   Earlier versions of this hook asked you to paste that slug in. Don't --
#   a hardcoded slug breaks silently the moment the workspace is renamed,
#   moved, or checked out on a second machine, and nothing tells you. It is
#   invisible until you notice memory has stopped surviving compaction.
#
#   This version derives the directory at runtime:
#     1. from transcript_path on the hook's stdin payload (authoritative)
#     2. falling back to the working directory mangled into a slug
#
# MANUAL TEST:
#   echo '{}' | ./_system/hooks/pre-compact.sh
# ================================================================

STDIN_PAYLOAD="$(cat)"

MEM_DIR="$(
  STDIN_PAYLOAD="$STDIN_PAYLOAD" python3 - << 'PYEOF'
import os, json, re

payload_raw = os.environ.get("STDIN_PAYLOAD", "")

# 1. Preferred: the parent of transcript_path IS the project directory.
try:
    transcript = json.loads(payload_raw).get("transcript_path")
    if transcript:
        print(os.path.join(os.path.dirname(transcript), "memory"))
        raise SystemExit(0)
except SystemExit:
    raise
except Exception:
    pass

# 2. Fallback: mangle the working directory into Claude Code's project slug.
slug = re.sub(r"[^A-Za-z0-9]", "-", os.getcwd())
print(os.path.join(os.path.expanduser("~"), ".claude", "projects", slug, "memory"))
PYEOF
)"

if [ ! -d "$MEM_DIR" ]; then
  # Do NOT exit silently. A missing memory directory means every compaction from
  # here on loses project memory, and nothing else will tell you.
  WARNING="PreCompact hook: no memory directory at '$MEM_DIR'. Project memory will NOT survive compaction. Check the derived path against 'ls ~/.claude/projects/'."
  echo "$WARNING" >&2
  WARNING="$WARNING" python3 -c 'import json, os; print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreCompact", "additionalContext": "WARNING - " + os.environ["WARNING"]}}))'
  exit 0
fi

python3 - "$MEM_DIR" << 'PYEOF'
import sys, os, json

mem_dir = sys.argv[1]
parts = []

index = os.path.join(mem_dir, "MEMORY.md")
if os.path.exists(index):
    parts.append("### MEMORY.md (index)\n" + open(index, encoding="utf-8").read())

for name in sorted(os.listdir(mem_dir)):
    if name.endswith(".md") and name != "MEMORY.md":
        path = os.path.join(mem_dir, name)
        parts.append(f"### {name[:-3]}\n" + open(path, encoding="utf-8").read())

combined = "\n\n---\n\n".join(parts)
if len(combined) > 20000:
    combined = combined[:20000] + "\n... [truncated - read memory files directly]"

context = (
    "PROJECT MEMORY (auto-injected by pre-compact hook - "
    "these notes persist across sessions and must be preserved "
    "in the compaction summary):\n\n" + combined
)

print(json.dumps({
    "hookSpecificOutput": {
        "hookEventName": "PreCompact",
        "additionalContext": context
    }
}))
PYEOF
