---
name: project-update
description: Patch a drifted scaffold project to the current project-init standard — missing sections, outdated paths, wrong values, missing wrap-up line. Does not re-interview for content that already exists. Use when a scaffold project has fallen behind the standard, sections are missing, or paths need updating.
---

# Project Update

Patches an existing scaffold project to the current solopreneur standard without losing any content. If the folder has no CLAUDE.md or freeform content without scaffold structure, use `/project-migrate` instead.

## Quick Start

```
/project-update
```

If invoked with no arguments, ask for the project folder path before proceeding.

## Process

### Step 0 — Read project-init

Read `.claude/skills/project-init/SKILL.md` at the workspace root — authoritative source of the current scaffold standard. All file paths, section names, and content rules derive from it; do not rely on memory.

Determine **project type**: if the existing `CLAUDE.md` contains `## Feature Workflow` or `## Maintenance Workflow`, it is a Developer project.

If the folder has no `CLAUDE.md` or its content does not follow the scaffold format, stop and redirect the user to `/project-migrate` instead.

### Step 1 — Read all files

Read everything present in the project folder — `CLAUDE.md`, all files in `_ai/` (if it exists), all files at root, and any subfolders. Do not assume which files exist; discover them.

### Step 2 — Diff against current standard

Using the scaffold defined in project-init for this project type, identify every file that should exist and the required structure of each. Compare what is present: missing files, missing sections, incorrect or outdated values, structural drift, missing comment blocks, missing wrap-up line, files in wrong locations.

Also apply the legacy migration table in [REFERENCE.md](REFERENCE.md) — historical changes that cannot be derived from the current project-init alone.

### Step 3 — Ask for missing information

For any content that is missing and cannot be inferred from existing files, ask the user one question at a time with a recommended answer. Only ask for what is genuinely missing — do not re-interview for content that already exists.

### Step 4 — Apply patches

Write the updated files. Insert missing sections in the correct order as defined by project-init. Apply legacy migrations — when moving files from root to `_ai/`, create the `_ai/` folder if it does not exist, write the file to the new location, then delete the root-level copy. Do not overwrite content that already conforms to the standard.

### Step 5 — Show summary

List every change made. Do not commit — the user reviews and commits manually.

## Rules

- Read project-init before doing anything else — it is the single source of truth for file names, paths, and scaffold structure
- Determine project type before comparing against the standard — Developer and standard projects have different scaffolds
- Only patch gaps — do not overwrite content that already conforms
- Never delete content before it is safely written to a scaffold file
- Preserve all dates from existing files in entry `**Date:**` fields
- Do not commit — the user reviews all changes and commits manually
