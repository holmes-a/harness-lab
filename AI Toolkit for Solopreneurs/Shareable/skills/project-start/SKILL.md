---
name: project-start
description: Conversational session kick-off for an existing project — briefs the routine (if any), open tasks, and un-triaged inbox items, so you don't have to open files to remember what to do. Symmetric with project-init (create) and project-wrap-up (end session). Use when resuming work on a project, especially a recurring one (monthly review, bi-weekly posting run).
---

# Project Start

Reads a project's current state and gives you a short conversational brief instead of making you open and re-read files. Read-only — this skill never writes anything.

## Quick Start

```
/project-start "Google Ads Optimisation"
/project-start "GBP Posting Engine"
```

If invoked with no argument, ask which project.

## Process

### Step 1 — Resolve the project

Match the supplied name against project folders (case-insensitive, partial match tolerant — e.g. "Google Ads" matches "Google Ads Optimisation"). If ambiguous, show the close matches and ask. If no match, list active projects from `_system/dashboard/data/projects.json` and ask the user to pick.

### Step 2 — Read CLAUDE.md

Read the project's `CLAUDE.md`. Determine project type: if it contains `## Feature Workflow` or `## Maintenance Workflow`, it's a Developer project — skip Step 3 entirely (Developer projects don't get a `## Playbook`), go straight to Step 4 using `## Active Workflow` instead of `## Open`.

### Step 3 — Playbook brief (standard projects only)

Check for a `## Playbook` section.

- **Absent:** no routine — skip straight to Step 4, say nothing about a playbook.
- **Present:** read the `Cadence:` and `Entry point:` lines.
  - If `Entry point` is a file/folder pointer, note where the detail lives but don't read the whole thing unless asked.
  - If `Entry point` is inline, read the steps that follow.
  - Do not compute "is it due" from the cadence yourself — `/project-wrap-up` already queues the next cycle as an open task when the prior one completes (see `## Playbook` decisions in this project's `_ai/decisions.md`). Whether the routine is "ready to run" is answered by whether `_ai/tasks.md` has an open task for it, not by date math here.

### Step 4 — Open tasks

Read `_ai/tasks.md`:
- **Standard project:** list items under `## Open`
- **Developer project:** list unchecked items under `## Active Workflow`, plus any items under `## Open`

### Step 5 — Inbox

Read `## Inbox` in `_ai/tasks.md`. If it has un-triaged items (captured via `/grilling-handoff`), list them and offer to triage now or leave them for later — don't triage unprompted.

### Step 5b — Unactioned exceptions (delegating projects only)

If the project has an `_ai/work/` folder, check the most recent cycle for units that were escalated and never resolved — a work unit whose output is missing, or a cycle with no artifact for every unit. If any exist, name them in one line: an escalation from a previous cycle is the most likely reason a routine has stalled, and it will otherwise sit invisible until someone opens the folder.

Skip silently if there is no `_ai/work/` or the last cycle completed clean.

### Step 6 — Present the brief

One collapsed brief, in this order: Playbook (if present) → open tasks → inbox (if non-empty). Do not print three separate walls of text — weave open-task and inbox counts into a short paragraph under the playbook line. Example shape:

> **[Project Name]** — [cadence summary from Playbook, or omit if none]. [Entry point / next step].
> Also open: [N] task(s) — [1–2 line summary]. [If inbox non-empty: M un-triaged inbox item(s) — triage now?]

Then stop and wait — this skill's job is to brief, not to start executing tasks.

## Rules

- Read-only: never edit `CLAUDE.md`, `_ai/tasks.md`, or any other project file
- Don't ask "is it time for the routine" — that's answered by whether an open task for it exists, not by date logic in this skill
- Keep the brief short — a paragraph, not a report. The user can ask to drill into any part
- If the project has neither a Playbook, nor open tasks, nor inbox items, say so plainly (e.g. "Nothing outstanding — a clean state") rather than a hollow templated brief
