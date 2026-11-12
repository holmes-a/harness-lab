#!/usr/bin/env bash
# ================================================================
# Pre-compact hook -- Mac / Linux / WSL
#
# WHAT IT DOES:
#   Fires before the AI tool auto-compacts a long conversation.
#   Injects your project memory files into the compaction context
#   so that key notes, preferences, and decisions survive the
#   summarisation step.
#
# PROVIDER NOTES:
#   This hook is written for Claude Code (PreCompact event).
#   Codex CLI and other tools may use a different hook event name
#   or trigger mechanism — adapt accordingly.
#
# HOW TO INSTALL:
#   1. Copy this file to <your-workspace-root>/hooks/pre-compact.sh
#   2. Set YOUR_PROJECT_SLUG below (see note)
#   3. Make it executable: chmod +x hooks/pre-compact.sh
#   4. Wire it up in your tool's settings file
#
# YOUR PROJECT SLUG:
#   Claude Code stores project data at: ~/.claude/projects/<slug>/
#   Run: ls ~/.claude/projects/ to find yours.
# ================================================================

PROJECT_SLUG="<YOUR-PROJECT-SLUG>"
MEM_DIR="$HOME/.claude/projects/$PROJECT_SLUG/memory"

if [ ! -d "$MEM_DIR" ]; then exit 0; fi

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
