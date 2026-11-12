# Project Init — Reference

## Interview Question Sets

### Standard questions (all non-Developer projects)

1. What is this project trying to achieve? (purpose — one paragraph; what and why)
2. What does success look like? (goal — one sentence; what does "done" mean for this project?)
3. What is explicitly in scope?
4. What is explicitly out of scope?
5. Are there any decisions already made that should not be reopened?
6. Are there any known constraints — deadlines, budgets, dependencies?
7. Are there any bespoke folders needed beyond the standard scaffold? (e.g. `Reports/`, `Exports/`) — these go inside `_ai/`
7b. Is this a recurring project with a kick-off routine (e.g. a monthly review, a bi-weekly posting run)? If yes: what's the cadence, and are the steps short enough to write inline (a handful of steps, all Claude-side) or do they need their own file (longer, or involving steps outside Claude)? → `## Playbook` section
8. Is this a **Defined Goal** project (there is a clear condition that marks it complete) or **Ongoing** (no fixed end state — continuously iterated)? → `type` field
9. (If Defined Goal) Is there a deadline? Enter a date (YYYY-MM-DD) or press Enter to skip. → `deadline` field; omit from CLAUDE.md and `projects.json` entirely if blank

### Developer questions (Developer projects only)

1. What does this codebase do? (purpose — one paragraph; what problem does it solve and for whom)
2. What does a good version of this codebase look like? (goal — one sentence; quality or capability bar)
3. What technology stack is it built on?
4. Are there any known constraints — architecture decisions already made, dependencies, security requirements?
5. Is there an existing UX/goal PRD to link as the first input? If yes, provide a friendly name and the path relative to the workspace root.

---

## Standard Project Scaffold

**Files to create** (scoped functions 01–04 — replace `[Context]` with Company, Customer, or Agent):
- `[Function Name]/[Context]/[Project Name]/CLAUDE.md`
- `[Function Name]/[Context]/[Project Name]/_ai/tasks.md`
- `[Function Name]/[Context]/[Project Name]/_ai/decisions.md`
- `[Function Name]/[Context]/[Project Name]/_ai/findings.md`
- `[Function Name]/[Context]/[Project Name]/_ai/facts/` (empty folder — create a `.gitkeep` if needed)
- `[Function Name]/[Context]/[Project Name]/_ai/task-prds/` (empty folder — create a `.gitkeep` if needed)
- `[Function Name]/[Context]/[Project Name]/_assets/.gitkeep` (placeholder — git cannot track an empty folder, so this is required, not optional, or the folder silently vanishes on a fresh clone or `git clean`)
- `[Function Name]/[Context]/[Project Name]/_skills/.gitkeep` (placeholder — holds project-scoped skills created via `/new-skill`)

For non-scoped functions (00, 05): omit `[Context]` — use `[Function Name]/[Project Name]/`.

### CLAUDE.md sections

| Section | Source |
|---|---|
| `## Purpose` | Q1 — what the project achieves, one paragraph |
| `## Goal` | Q2 — what success looks like, one sentence |
| `## Business Function` | Function Q — which business function |
| `## Context` | Step 1b — `Company`, `Customer`, or `Agent` |
| `## Status` | Always `Active` |
| `## Project ID` | Generated in Step 5 — 6 alphanumeric chars |
| `## Type` | Q8 — `Ongoing` or `Defined Goal` |
| `## Deadline` | Q9 — YYYY-MM-DD; omit this section entirely if not provided or if type is Ongoing |
| `## Scope` | Q3 and Q4 — in scope / out of scope bullet lists |
| `## Key Constraints` | Q6 — bullet list; use `None defined yet` if blank |
| `## Playbook` | Q7b — omit entirely if not recurring. Otherwise: `Cadence:` line (descriptive, not a day-count) + `Entry point:` (inline steps or a pointer to a file/folder) |
| `## Working Instructions` | Synthesised from scope and any specific instructions; end with the wrap-up line |
| `## Facts` | Empty at creation — see static content below |
| `## Project Files` | Standard table below |
| `## Entry Standards` | Static — copy exactly |

**Wrap-up line** (append at end of Working Instructions):
*At the end of every session, run `/project-wrap-up` to update `_ai/tasks.md`, `_ai/decisions.md`, and `_ai/findings.md`, then commit all changed project files.*

**`## Facts` section** — write as:
```
<!-- Populated by /project-wrap-up as decisions graduate. Full detail in _ai/facts/[topic].md. Confirm with user before adding entries here. -->
```

**Standard Project Files table:**

| File | Purpose |
|---|---|
| `_ai/tasks.md` | Current state + open tasks + last 3-5 done |
| `_ai/decisions.md` | Active choices — working set, not an archive; graduates to facts/ when settled |
| `_ai/findings.md` | Observed facts and analysis — check Open findings before starting work |
| `_ai/facts/` | Graduated facts — one-liner pointer in `## Facts` above, full detail per topic |
| `_assets/` | Project-specific files and reference material |
| `_ai/task-prds/` | Detailed PRDs and captured items requiring more than two lines of context |
| `_skills/` | Project-scoped skills — created via `/new-skill`; empty at project creation |

**Standard Entry Standards** — copy exactly:

**decisions.md:** Date · Decision (1 sentence) · Rationale (1 sentence) · Finding ref · Supersedes ref
**findings.md:** Date · Finding (1 sentence) · Source · Status (Open/Actioned/Superseded) · Decision ref
**facts/:** One-liner in `## Facts` → full detail in `_ai/facts/[topic].md`. Graduated by `/project-wrap-up` — always confirm with user before editing CLAUDE.md.
**tasks.md:** Append `[blocked by: X]` to flag a dependency. Append `→ [PRD](_ai/task-prds/filename.md)` where a detailed PRD exists. `## Inbox` holds items captured mid-session via /grilling-handoff — `[task]`, `[finding]`, `[decision]`, `[thought]` entries awaiting triage at next session start.

### Static file contents

**`_ai/tasks.md`:**
```markdown
Project just set up — no work started yet.

## Open

- [ ] 

## Inbox
<!-- Items captured mid-session via /grilling-handoff. Surface at next session start ("what's next") for triage. [task] items are to-dos; [finding], [decision], [thought] items will be routed to their own files at triage. -->

## Recently Done
<!-- Keep last 3-5 completed items; delete older ones -->
```

**`_ai/decisions.md`:**
```markdown
# Decisions

<!-- Entry format:
## [Short title]
**Date:** YYYY-MM-DD
**Decision:** [one sentence]
**Rationale:** [one sentence]
**Finding ref:** [findings.md entry title, or omit]
**Supersedes:** [prior decision title, or omit]

Pruning rules:
- Superseded: remove once the superseding entry is at least one session old.
- Graduated: when a decision is fully implemented and would only be re-opened in a major rethink, write a one-liner to CLAUDE.md ## Facts (confirm with user) and full detail to _ai/facts/[topic].md, then delete this entry. Git history is the archive.
-->
```

**`_ai/findings.md`:**
```markdown
# Findings

<!-- Entry format:
## [Short title]
**Date:** YYYY-MM-DD
**Finding:** [one sentence — factual, not interpretive]
**Source:** [test result / analysis / external research / user feedback]
**Status:** Open | Actioned | Superseded
**Decision:** [ref to decisions.md entry, once made — or omit]

Pruning rule: Keep all Open findings. Remove Actioned or Superseded findings after one full project-wrap-up cycle has passed.
-->
```

---

## Developer Project Scaffold

**Files to create** (scoped functions 01–04):
- `[Function Name]/[Context]/[Project Name]/CLAUDE.md`
- `[Function Name]/[Context]/[Project Name]/_ai/tasks.md`
- `[Function Name]/[Context]/[Project Name]/_ai/inputs.md`
- `[Function Name]/[Context]/[Project Name]/_skills/.gitkeep`

For non-scoped functions (00, 05): omit `[Context]`.

Do not create `_ai/decisions.md`, `_ai/findings.md`, `_ai/facts/`, or `_ai/task-prds/`. Architectural decisions live in `docs/adr/`. Domain knowledge lives in `CONTEXT.md` at project root.

### CLAUDE.md sections

| Section | Source |
|---|---|
| `## Purpose` | Dev Q1 — what the codebase does, one paragraph |
| `## Goal` | Dev Q2 — what a good version looks like, one sentence |
| `## Business Function` | Function Q — which business function |
| `## Context` | Step 1b — `Company`, `Customer`, or `Agent` |
| `## Status` | Always `Active` |
| `## Project ID` | Generated in Step 5 — 6 alphanumeric chars |
| `## Type` | Always `Ongoing` |
| `## Tech Stack` | Dev Q3 — bullet list of languages, frameworks, platforms |
| `## Key Constraints` | Dev Q4 — bullet list; use `None defined yet` if blank |
| `## Inputs` | Pointer to `_ai/inputs.md`; note any initial input from Dev Q5 |
| `## Feature Workflow` | Static — copy exactly |
| `## Maintenance Workflow` | Static — copy exactly |
| `## Working Instructions` | Synthesised from scope; end with the wrap-up line |
| `## Project Files` | Developer table below |
| `## Entry Standards` | Developer standards below |

**Wrap-up line:** *At the end of every session, run `/project-wrap-up` to update `_ai/tasks.md`, then commit all changed project files.*

**`## Inputs` section:**
```
Reference documents for this project — see `_ai/inputs.md`.
```
If the user provided an initial input in Dev Q5, add: `[Friendly Name] UX/goal PRD is linked.`

**`## Feature Workflow` section** — copy exactly:
```
Use when building new features or amending existing functionality. Requires a UX/goal PRD linked in `_ai/inputs.md`.

1. `/grill-me-as` — understand the problem space and constraints from a domain expert perspective
2. `/grill-with-docs` — design the codebase; reference `CONTEXT.md` and `docs/adr/`
3. `/to-spec` — produce the technical spec
4. `/to-tickets` — break spec into tracer-bullet tickets
5. `/implement` — build the work (uses `/tdd` at seams)
```

**`## Maintenance Workflow` section** — copy exactly:
```
Use for technical debt, upgrades, refactors, or re-architecting. No UX PRD required.

1. `/grill-with-docs` — understand the problem; reference `_ai/tasks.md` and the codebase
2. `/to-spec` — technical spec (optional for small changes)
3. `/to-tickets` — break into tickets (optional for small changes)
4. `/implement` — build the work (uses `/tdd` at seams)
```

**Developer Project Files table:**

| File | Purpose |
|---|---|
| `_ai/tasks.md` | Pipeline tracker — active workflow, current step, open work items |
| `_ai/inputs.md` | Reference documents — friendly name → path table |
| `CONTEXT.md` | Domain glossary — created and maintained by `/grill-with-docs` |
| `docs/adr/` | Architectural decision records — created by `/grill-with-docs` |
| `_skills/` | Project-scoped skills — created via `/new-skill`; empty at project creation |

**Developer Entry Standards:**

**tasks.md:** `## Active Workflow` tracks the current pipeline — delete the unused workflow at session start, check off steps as you progress, restore both when starting new work. `## Open` for non-pipeline items. `## Inbox` for mid-session captures. `## Recently Done` (last 3-5 items).
**inputs.md:** Table with columns Name | Path | Description. Paths are relative to the workspace root.

### Static file contents

**`_ai/tasks.md`:**
```markdown
Project just set up — no work started yet.

## Active Workflow

<!-- At session start: delete the workflow you are not using, check off steps as you progress. Restore both when starting a new piece of work. -->

**Feature workflow** — new features or amended functionality. Requires a UX/goal PRD in `_ai/inputs.md`.
- [ ] `/grill-me-as` — understand the problem space and constraints
- [ ] `/grill-with-docs` — design the codebase; reference `CONTEXT.md` and `docs/adr/`
- [ ] `/to-spec` — produce the technical spec
- [ ] `/to-tickets` — break spec into tracer-bullet tickets
- [ ] `/implement` — build the work (uses `/tdd` at seams)

**Maintenance workflow** — technical debt, upgrades, refactors, re-architecting. No UX PRD required.
- [ ] `/grill-with-docs` — understand the problem; reference this file and the codebase
- [ ] `/to-spec` — technical spec (optional for small changes)
- [ ] `/to-tickets` — break into tickets (optional for small changes)
- [ ] `/implement` — build the work (uses `/tdd` at seams)

## Open

- [ ] 

## Inbox
<!-- Items captured mid-session via /grilling-handoff. Surface at next session start for triage. -->

## Recently Done
<!-- Keep last 3-5 completed items; delete older ones -->
```

**`_ai/inputs.md`:**
```markdown
# Project Inputs

Reference documents linked to this project. Add rows as new inputs are provided. Paths are relative to the workspace root.

| Name | Path | Description |
|---|---|---|
```

If the user provided an initial input in Dev Q5, add it as the first row.

---

## projects.json Schema

Register in `_system/dashboard/data/projects.json` after writing all project files. If the file does not exist, create it as `[]` first. Read the existing array, append, and write back:

```json
{
  "id": "[generated 6-char ID]",
  "name": "[project name]",
  "function": "[swimlane key — e.g. Cross-Function, Create-Value, Marketing, Sales, Deliver-Value, Finance]",
  "context": "[Company | Customer | Agent]",
  "path": "[Function Name]/[Context]/[Project Name]",
  "type": "[Ongoing | Defined Goal]",
  "status": "Active",
  "start_date": "[today YYYY-MM-DD]",
  "last_worked": "[today YYYY-MM-DD]"
}
```

For non-scoped functions (00, 05): `"context": "Company"` and `"path": "[Function Name]/[Project Name]"` (no context segment).

Include `"deadline"` (YYYY-MM-DD) only if the user provided one in Q9. Omit `"status_note"` at creation.
