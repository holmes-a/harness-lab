---
name: archive-project
description: Archive a completed project into its function's _archived/ folder. Updates CLAUDE.md status and projects.json before moving the folder. Use when a project is finished, completed, abandoned, or on indefinite hold.
---

# Archive Project

Archives a completed project, recording the outcome in CLAUDE.md and projects.json before moving the folder.

## Quick Start

Invoke `/archive-project` and answer the prompts — the skill walks you through target, outcome, and confirmation before making any changes.

## Process

### Step 1 — Identify the target

Ask:
> "Which project are you archiving? (Provide the business function and project name, or the full path)"

Resolve the current path:
- Functions with scopes (01–04): `[Function Name]/[Scope]/[Project Name]/` where Scope is `Company`, `Customer`, or `Agent`
- Functions without scopes (00, 05): `[Function Name]/[Project Name]/`

Verify the folder exists; if not, list the projects under that function and ask the user to confirm the name.

If the project is already inside `[Function Name]/_archived/`, tell the user it is already archived and stop.

Do not proceed to Step 2 until the target path is confirmed.

### Step 2 — Outcome

Ask the user to choose:
> "What was the outcome?"
> 1. Goal Reached
> 2. Partial
> 3. Abandoned

Then ask:
> "Any notes on the outcome? (Press Enter to skip)"

If the user provides notes, record them verbatim. If they skip, continue without notes.

### Step 3 — Confirm

Summarise what will happen and ask for confirmation before making any changes:

```
Ready to archive:
  Project:      [current path]
  Destination:  [Function Name]/_archived/[Project Name]/
  Status:       Completed - [Outcome]
  Outcome note: [note, or "none"]

Proceed? (y/n)
```

Do not make any changes until the user confirms.

### Step 4 — Execute

See [REFERENCE.md](REFERENCE.md) for exact file-update logic.

1. Update `CLAUDE.md` — set `## Status` to `Completed - [Outcome]`; add `## Outcome` section if a note was provided
2. Update `projects.json` — set `status` to `Completed - [Outcome]`, update `last_worked`, update `path` to the new archived location
3. Move the project folder to `[Function Name]/_archived/[Project Name]/`

Create `[Function Name]/_archived/` if it does not exist.

### Step 5 — Summary

Print:
- What was archived and its new location
- Which files were updated and what changed
- Reminder to stage and commit all changed files

## Rules

- Never move any folder until Step 3 is confirmed
- If the target folder does not exist, stop and report — do not guess or create paths
- Do not delete any files — only update and move
- Outcome note is optional; omit the `## Outcome` section entirely if the user skips it
