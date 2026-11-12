---
name: project-init
description: Set up a new project with standard scaffold (CLAUDE.md, _ai/tasks.md, _ai/decisions.md, _ai/findings.md, _assets/). Developer projects get a different scaffold — pipeline tracker and inputs.md. Use when starting any new piece of work.
---

# Project Init

Creates a new project scaffold by validating the target business function, interviewing you, stress-testing the concept, then writing all files.

Scaffold files always live in `_ai/` — never at the project root. `CLAUDE.md` is the only scaffold file at root.

## Quick Start

```
/project-init "Marketing" "Summer Campaign 2026"
/project-init "Create Value" "Customer Portal Redesign"
/project-init "Developer" "MyApp.API"
```

If invoked with no arguments, ask for business function first, then project name.

## Process

### Step 1 — Validate the business function

List the function folders that exist directly under the workspace root. Compare the supplied function against that list using case-insensitive, number-prefix-tolerant matching (e.g. "Marketing" matches "02 - Marketing"):

- **Exact or near match** — confirm the matched folder name and proceed
- **Ambiguous or close but not exact** — show the closest matches and ask the user to confirm
- **No reasonable match** — display all existing function folders and ask the user to select one

Do not proceed to Step 2 until the function is confirmed.

### Step 1b — Determine context

Context is the scope of the project — who it primarily serves. Valid values: **Company**, **Customer**, **Agent**.

- **Functions with scope folders (01–04):** list the subfolders that exist directly inside the function folder (e.g. `Company/`, `Customer/`, `Agent/`). If the project name or arguments make the context obvious, confirm it and proceed. Otherwise ask: *"Is this a Company, Customer, or Agent project?"*
- **Functions without scope folders (00 — Cross Function, 05 — Finance):** context is always **Company** — do not ask.

The context determines the project folder path — confirm it before proceeding.

### Step 2 — Read context

Read the workspace `CLAUDE.md` and the matched function's `CLAUDE.md` to understand the business and this function's scope.

### Step 3 — Interview

Ask one question at a time, always providing a recommended answer. Use the question sets in [REFERENCE.md](REFERENCE.md) — standard questions for all non-Developer projects, Developer questions for Developer projects.

Do not create any files until the interview is complete.

### Step 4 — Stress-test

Before creating files, say: *"Before I create anything, let me challenge this project."*

Run **3–5 questions** to stress-test purpose and scope from a critical perspective — catch weak assumptions before they are committed to files.

### Step 5 — Confirm and create

Generate a 6-character project ID using lowercase letters and digits at random (not sequentially). This ID is permanent — it does not change if the project is renamed.

Summarise what will be created and ask for confirmation before writing anything. Use the scaffold templates in [REFERENCE.md](REFERENCE.md) to create all files.

Place the project folder at:
- **Scoped functions (01–04):** `[Function Name]/[Context]/[Project Name]/`
- **Non-scoped functions (00, 05):** `[Function Name]/[Project Name]/`

### Step 6 — Register in projects.json

After writing all project files, register the project in `_system/dashboard/data/projects.json` using the schema in [REFERENCE.md](REFERENCE.md). If the file does not exist, create it as `[]` first. Do not commit — the user reviews and commits manually.

## Rules

- Never create files until Steps 3 and 4 are complete and Step 5 is confirmed
- Ask one question at a time; always provide a recommended answer
- Function validation must happen before reading any context — the path depends on it
- All scaffold files go in `_ai/` — never at the project root except `CLAUDE.md`
- Developer projects are always type `Ongoing` — do not ask Q8 or Q9
- Developer projects do not get `_ai/decisions.md`, `_ai/findings.md`, `_ai/facts/`, or `_ai/task-prds/`
- Developer projects do not get a `## Playbook` section or Q7b — a code repo's kick-off is its `## Active Workflow` in `_ai/tasks.md`, not a recurring routine
- `## Playbook` (standard projects only) is omitted entirely unless Q7b confirms the project is recurring — its presence is the signal `/project-start` uses to know a routine exists
- `_ai/tasks.md` opening line: "Project just set up — no work started yet."
- `_ai/decisions.md` and `_ai/findings.md` start with the header comment only, unless the user provides initial content during the interview
- If the user provides decisions or constraints during the interview, pre-populate them as entries rather than leaving the files empty
- `_ai/acceptance.md` and `_ai/work/` are **not** part of the default scaffold — they are created only if the delegation question below is answered yes

### Delegation question (standard projects only)

After the `## Playbook` question, ask once:

> Will this project produce the same kind of deliverable repeatedly — one per area, agent, page, or period? (If yes, it can delegate that work to agents and you review exceptions instead of every artifact.)

- **No** (the common case) — say nothing further and omit `_ai/acceptance.md` and `_ai/work/`.
- **Yes** — create `_ai/work/.gitkeep` and add an open task: *"Write `_ai/acceptance.md` before the first `/run-cycle` — extract the Must/Never/Data checks from this project's Working Instructions."*

Do **not** draft `_ai/acceptance.md` during project-init. At creation there is no output template and no worked example to extract checks from, and an acceptance file written from imagination manufactures false confidence in everything that later passes it. It is written once the project has produced its first artifact by hand.
