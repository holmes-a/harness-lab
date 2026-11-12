---
name: project-migrate
description: Build a scaffold from scratch for an old or unstructured project folder, mapping existing content into the right files. Use when bringing a legacy folder into the solopreneur scaffold framework for the first time — no CLAUDE.md, or freeform content without scaffold structure.
---

# Project Migrate

Builds a solopreneur scaffold for a folder that has no existing scaffold structure, preserving all content by mapping it into the right files. If the folder already has a scaffold CLAUDE.md, use `/project-update` instead.

## Quick Start

```
/project-migrate
```

If invoked with no arguments, ask for the project folder path before proceeding.

## Process

### Step 0 — Read project-init

Read `.claude/skills/project-init/SKILL.md` at the workspace root — authoritative source of the current scaffold standard. All file paths, section names, and content rules derive from it; do not rely on memory.

If the folder has a `CLAUDE.md` with recognisable scaffold sections, stop and redirect the user to `/project-update` instead.

### Step 1 — Read all existing files

Read everything in the folder: notes, reports, handoff documents, loose markdown, any existing CLAUDE.md. Summarise what was found before proceeding.

### Step 2 — Abbreviated interview

From project-init (Step 0), identify the content required to populate each scaffold section. Ask the user for anything that cannot be inferred from existing files — one question at a time with a recommended answer.

Do not map content to files until the interview is complete.

### Step 3 — Map content

Using the scaffold files defined by project-init, map existing content to the correct destinations. See [REFERENCE.md](REFERENCE.md) for the content mapping rules. Flag anything that doesn't clearly belong — ask the user where it should go before writing.

### Step 4 — Confirm and create

Summarise what will be created and what content goes where. Ask for confirmation before writing anything.

### Step 5 — Write files

Write all scaffold files using the structures and paths defined in project-init (Step 0).

### Step 6 — Clean up

Once content is safely in the new scaffold, offer to delete migrated source files. Always ask before deleting — never delete silently.

### Step 7 — Show summary

List what went where. Do not commit — the user reviews and commits manually.

## Rules

- Read project-init before doing anything else — it is the single source of truth for file names, paths, and scaffold structure
- Never delete content before it is safely written to a scaffold file
- Preserve all dates from existing files in entry `**Date:**` fields
- Do not commit — the user reviews all changes and commits manually
