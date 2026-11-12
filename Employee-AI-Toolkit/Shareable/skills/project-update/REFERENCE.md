# Project Refresh — Reference

## Legacy Migration Table

Check each entry during Step 2. Flag and apply any that apply to the project being refreshed.

| Legacy state | Patch to |
|---|---|
| `## Purpose` section in CLAUDE.md | Rename to `## Brief` |
| Status value `In Progress` in CLAUDE.md | Change to `Active` |
| `decisions.md` description `Settled choices — do not re-open without checking contradictions` | Update to `Active choices — working set, not an archive; graduates to facts/ when settled` |
| `facts/` folder at project root | Move to `_ai/facts/` |
| `tasks.md` at project root | Move to `_ai/tasks.md` |
| `decisions.md` at project root | Move to `_ai/decisions.md` |
| `findings.md` at project root | Move to `_ai/findings.md` |
| `task-prds/` at project root | Move to `_ai/task-prds/` |
| CLAUDE.md wrap-up line references root-level `tasks.md`, `decisions.md`, `findings.md` | Update to `_ai/` paths |
| CLAUDE.md `## Project Files` table references root-level scaffold files | Update all paths to `_ai/` prefix |
| CLAUDE.md `## Entry Standards` references root-level `facts/` or `task-prds/` | Update to `_ai/facts/` and `_ai/task-prds/` |
| CLAUDE.md `## Facts` comment references `facts/[topic].md` | Update to `_ai/facts/[topic].md` |
| `## Facts` section absent from CLAUDE.md (standard projects) | Add empty `## Facts` section with comment after `## Working Instructions` |
| `_skills/` folder absent | Create `_skills/.gitkeep` at project root |
