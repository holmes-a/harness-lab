---
name: archive-project-or-role
description: Archive a completed project into its role's _archive/ folder, or retire a role into the workspace _archive/ folder. Updates CLAUDE.md status and projects.json before moving the folder. Use when a project or role is finished, completed, retiring, closing, or wrapping up.
---

# Archive Project or Role

Archives a completed project or a retired role, recording the outcome in the relevant CLAUDE.md file(s) before moving the folder to the correct archive location.

## Quick Start

Invoke `/archive-project-or-role` and answer the prompts — the skill walks you through target, outcome, and confirmation before making any changes.

## Process

### Step 1 — What are you archiving?

Ask:
> "Are you archiving a **project** or a **role**?"

Wait for the answer before proceeding.

### Step 2 — Identify the target

**If project:**
- Ask for the role name, then the project name
- Resolve the path: `[workspace-root]/[Role]/[Project]/`
- Verify the folder exists; if not, list the projects under that role and ask the user to confirm the name
- If the project is already inside `[Role]/_archive/`, tell the user it is already archived and stop

**If role:**
- Ask for the role name
- Resolve the path: `[workspace-root]/[Role]/`
- Verify the folder exists; if not, list existing role folders and ask the user to confirm
- Identify all active project folders directly under `[Role]/` — subdirectories only, excluding `_archive/` and any non-project folders

Do not proceed to Step 3 until the target path is confirmed.

### Step 3 — Outcome

Ask the user to choose:
> "What was the outcome?"
> 1. Goal Reached
> 2. Partial
> 3. Abandoned

Then ask:
> "Any notes on the outcome? (Press Enter to skip)"

If the user provides notes, record them verbatim. If they skip, continue without notes.

### Step 4 — Confirm

Summarise what will happen and ask for confirmation before making any changes.

**For a project:**
```
Ready to archive:
  Project:      [Role]/[Project]/
  Destination:  [Role]/_archive/[Project]/
  Status:       Completed - [Outcome]
  Outcome note: [note, or "none"]

Proceed? (y/n)
```

**For a role:**
```
Ready to archive:
  Role:        [Role]/
  Destination: workspace _archive/[Role]/
  Active projects that will be updated:
    - [project name]
    - [project name]
  Status applied to all: Completed - [Outcome]
  Outcome note: [note, or "none"]

  ⚠ The workspace CLAUDE.md "My Roles" section will need manual update to remove this role.

Proceed? (y/n)
```

Do not make any changes until the user confirms.

### Step 5 — Execute

See [REFERENCE.md](REFERENCE.md) for exact file-update logic (CLAUDE.md fields, projects.json patching).

**For a project:** update CLAUDE.md → patch projects.json → move folder to `[Role]/_archive/[Project]/`.

**For a role:** repeat the project update for each active project → move `[Role]/` to workspace `_archive/[Role]/`.

### Step 6 — Summary

Print:
- What was archived and its new location
- Which CLAUDE.md files were updated and what changed
- If archiving a role: reminder to update the workspace CLAUDE.md "My Roles" section manually
- Reminder to stage and commit all changed files

## Rules

- Never move any folder until Step 4 is confirmed
- If the target folder does not exist, stop and report — do not guess or create paths
- For role archiving, skip any folders already inside `[Role]/_archive/` — they are already archived
- Do not delete any files — only update and move
- Outcome note is optional; omit the `## Outcome` section entirely if the user skips it
- Workspace CLAUDE.md is not automatically updated when archiving a role — always flag this in the summary
