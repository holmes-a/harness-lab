---
name: project-setup
description: Set up a new project folder with standard scaffold (CLAUDE.md, tasks.md, decisions.md, findings.md, Assets/). Grills the user to populate CLAUDE.md before creating any files. Use when user wants to create a new project, set up a project folder, or start a new piece of work.
---

# Project Setup

Creates a standard project scaffold by interviewing you first, then writing all files.

## How to Install

Copy this folder to `~/.claude/skills/project-setup/`. Invoke with `/project-setup`.

## Process

1. **Read context** — read the root `CLAUDE.md` and the relevant function-level `CLAUDE.md` to understand where this project sits in the five-function framework.

2. **Interview** — ask one question at a time (with a recommended answer) to gather:
   - Which of the five functions the project belongs to (Create Value / Marketing / Sales / Deliver Value / Finance — or Cross Function if it spans more than one), and what scope (Customer / Organisation / Agent)
   - Project name
   - Purpose (what and why — one paragraph)
   - Scope (what is explicitly in; what is explicitly out)
   - Working instructions (tone, output format, constraints specific to this project)
   - Any decisions already made that Claude should not re-open
   - Any known findings worth recording from the outset
   - Any bespoke folders needed beyond the standard scaffold (e.g. `Reports/`, `Exports/`)

3. **Create scaffold** — write all files using the templates in [TEMPLATES.md](TEMPLATES.md). Place the project folder in the correct function path:
   - `01 - Create Value/[Scope] Projects/[Project Name]/`
   - `02 - Marketing/[Scope] Projects/[Project Name]/`
   - `03 - Sales/[Scope] Projects/[Project Name]/`
   - `04 - Deliver Value/[Scope] Projects/[Project Name]/`
   - `05 - Finance/Active Projects/[Project Name]/`
   - `00 - Cross Function/Active Projects/[Project Name]/`

## Standard Scaffold

```
[Project Name]/
  CLAUDE.md
  tasks.md
  decisions.md
  findings.md
  Assets/
```

Only add bespoke folders if the user confirms they are needed.

## Rules

- Ask one question at a time; provide a recommended answer for each
- Do not create any files until the interview is complete
- `decisions.md` and `findings.md` start with the header comment only, unless the user provides initial content during the interview
- `tasks.md` current-state line: "Project just set up — no work started yet."
- Do not commit — the user does that manually after reviewing the created files
