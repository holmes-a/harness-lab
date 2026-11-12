---
name: project-init
description: Set up a new project with standard scaffold (CLAUDE.md, _ai/tasks.md, _ai/decisions.md, _ai/findings.md, Assets/). Developer projects get a different scaffold — pipeline tracker, inputs.md, and Matt Pocock engineering skills wired in. Use when starting any new piece of work.
---

# Project Init

Creates a new project scaffold by validating the target role, interviewing you with role-specific questions, stress-testing the concept, then writing all files.

Scaffold files always live in `_ai/` — never at the project root. `CLAUDE.md` is the only scaffold file at root.

## Quick Start

```
/project-init Technical-Director "Board AI Paper"
/project-init Compliance-Officer "ISO 27001 Surveillance Audit 2026"
/project-init Developer "SaturnVision"
```

If invoked with no arguments, ask for role first, then project name.

## Process

### Step 1 — Validate the role

List the role folders that exist directly under the workspace root. Compare [Role] against that list using case-insensitive, hyphen/space-tolerant matching:

- **Exact or near match** — confirm the matched folder name and proceed
- **Ambiguous or close but not exact** — show the closest matches and ask the user to confirm
- **No reasonable match** — display all existing role folders and ask the user to select one, or confirm a new role. If new, invoke `/role-init [new role name]` and proceed once complete.

Do not proceed to Step 2 until the role is confirmed.

### Step 2 — Read context

Read the workspace `CLAUDE.md` and the matched role's `CLAUDE.md` to understand Saturn's business and this role's scope and responsibilities.

### Step 3 — Read role questions

Read `~/.claude/skills/role-init/skill.md` (Windows: `%USERPROFILE%\.claude\skills\role-init\skill.md`). Identify the question set for the matched role.

### Step 4 — Interview

Ask one question at a time, always providing a recommended answer. Use the question sets in [REFERENCE.md](REFERENCE.md) — standard questions for all non-Developer roles, Developer questions for the Developer role. Then apply the role-specific questions from the role-init skill.

Do not create any files until the interview is complete.

### Step 5 — Grill-me-as round

Before creating files, say: *"Before I create anything, let me put on my [Role] hat and challenge this project."*

Apply the grill-me-as process from `~/.claude/skills/grill-me-as/skill.md` — adopt the matched role's perspective and run **3–5 questions** to stress-test purpose and scope. Catch weak assumptions before they are committed to files, not exhaust every branch.

### Step 6 — Confirm and create

Generate a 6-character project ID using lowercase letters and digits at random (not sequentially). This ID is permanent — it does not change if the project is renamed.

Summarise what will be created and ask for confirmation before writing anything. Use the scaffold templates in [REFERENCE.md](REFERENCE.md) to create all files.

### Step 7 — Register in projects.json

After writing all project files, register the project in `_system/dashboard/data/projects.json` using the schema in [REFERENCE.md](REFERENCE.md). Do not commit — the user reviews and commits manually.

### Step 8 — setup-matt-pocock-skills (Developer projects only)

Invoke `/setup-matt-pocock-skills`. Say: *"Scaffold complete. Now let's configure the engineering skills for this repo."* then run the skill.

## Rules

- Never create files until Steps 4 and 5 are complete and Step 6 is confirmed
- Ask one question at a time; always provide a recommended answer
- Role validation must happen before reading any context — the path depends on it
- All scaffold files go in `_ai/` — never at the project root except `CLAUDE.md`
- Developer projects are always type `Ongoing` — do not ask Q8 or Q9
- Developer projects do not get `_ai/decisions.md`, `_ai/findings.md`, `_ai/facts/`, or `_ai/task-prds/`
- `_ai/tasks.md` opening line: "Project just set up — no work started yet."
- `_ai/decisions.md` and `_ai/findings.md` start with the header comment only, unless the user provides initial content during the interview
- If the user provides decisions or constraints during the interview, pre-populate them as entries rather than leaving the files empty
- `/setup-matt-pocock-skills` always runs at the end of Developer project init — the repo always has a `.git` folder and remote before `project-init` is invoked
