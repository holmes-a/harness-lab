---
name: project-convert
description: Convert an existing project folder to the standard scaffold (CLAUDE.md, tasks.md, decisions.md, findings.md, Assets/). Reads current files and migrates content without losing anything. Use when user wants to migrate an existing project, convert a project to the standard structure, or upgrade an existing project folder.
---

# Project Convert

Migrates an existing project folder to the standard scaffold, preserving all content.

## How to Install

Copy this folder to `~/.claude/skills/project-convert/`. Invoke with `/project-convert`.

## Process

1. **Read all existing files** in the project folder — CLAUDE.md, any handoff or state files, reports, notes, loose documents. Also confirm which of the five functions this project belongs to (Create Value / Marketing / Sales / Deliver Value / Finance — or Cross Function) and its scope (Customer / Organisation / Agent), so it can be placed in the correct path if it needs moving.

2. **Map content** to the new structure:
   - Existing decisions, key choices, settled architecture → entries in `decisions.md`
   - Handoff notes, in-progress state, PR descriptions, status files → `tasks.md` current-state paragraph + open task list
   - Analysis, observations, test results, reports → `findings.md`
   - Remaining CLAUDE.md content → updated to the new template (see [TEMPLATES.md](TEMPLATES.md))

3. **Flag ambiguous content** — show the user anything that doesn't clearly belong in one file and ask where it should go before writing.

4. **Create missing files and folders** — write any scaffold files that don't yet exist.

5. **Clean up** — delete migrated source files (e.g. `handoff.md`, old state notes) once their content is safely in the new structure.

6. **Show summary** — list what went where before finishing. Do not commit — the user does that manually after reviewing.

## Rules

- Never delete content — migrate it first, then delete the source
- Preserve all dates found in existing files; use them in entry `**Date:**` fields
- All entries in `decisions.md` and `findings.md` must follow the entry standard (see [TEMPLATES.md](TEMPLATES.md))
- If the existing `CLAUDE.md` already has the new template structure, only add missing sections — do not overwrite content that's already correct
- `Assets/` folder: create if missing; do not move existing files into it without asking
- Do not commit — the user reviews the migration summary and commits manually
