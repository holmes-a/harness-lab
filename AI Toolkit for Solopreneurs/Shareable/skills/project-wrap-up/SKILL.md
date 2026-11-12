---
name: project-wrap-up
description: End-of-session state save — updates the project scaffold files and memory, then prints a summary for review before committing. Use when closing a session to resume later or on another machine.
---

# Project Wrap-Up

Saves session state to the scaffold so the next session resumes cleanly. Git stays untouched: staging
and committing are manual, after the summary has been read.

Work from what the conversation already holds, asking only where something is genuinely ambiguous.
Record what is true, settled, or worth preserving — implementation detail belongs in code comments and
commit messages.

## Typing the project

Identify which project folder(s) were worked on this session. Where more than one, run the whole
process for each in turn.

Read each project's `CLAUDE.md`. A `## Feature Workflow` or `## Maintenance Workflow` section means a
**Developer** project; anything else is a **Standard** project. The type decides which files carry
state:

| | Standard | Developer |
|---|---|---|
| State files | `_ai/tasks.md`, `_ai/decisions.md`, `_ai/findings.md` | `_ai/tasks.md` only — architectural decisions live in `docs/adr/` |
| Steps 4–6 | run | skipped |

Complete when every active project is named and typed.

## Process

### Step 1 — Read the current state

Read the state files for the project's type, and its memory file from
`~/.claude/projects/<project-slug>/memory/`.

Complete when the files that exist for this type have been read.

### Step 2 — Update `_ai/tasks.md`

- Mark tasks completed this session `- [x]`, and add any new open tasks the session identified
- Move completed items into `## Recently Done`, keeping the last 3–5 and dropping older ones silently
- Where a completed task carries a `→ [PRD](_ai/task-prds/filename.md)` link, delete the linked PRD
  file and strip the `→ [PRD]` suffix before the task moves
- **Developer projects:** update `## Active Workflow` — check off completed pipeline steps, and where a
  workflow finished, restore both workflows ready for the next piece of work
- Where the project's state has materially changed, update its current-state summary paragraph

Complete when every task touched this session is in its right section.

### Step 3 — Queue the next cycle

Standard projects whose `CLAUDE.md` has a `## Playbook` section with a `Cadence:` line. A playbook
with no cadence, or a cadence that is event-triggered rather than date-based ("whenever a review
notification arrives"), has nothing to queue.

Where the task marked done this session represents the **full** cycle by the project's own tracking
(e.g. tasks.md states "all 15 posts published, logged, and archived"), compute the next occurrence from
the cadence text — descriptive, not a day-count, e.g. "1st and 15th of each month" — and add it as a
new `- [ ]` item under `## Open`. A **partially** complete cycle leaves the current task open instead.

This keeps the workflow pull-based: the next task waits in `tasks.md` rather than arriving as a
calendar ping.

Complete when the next cycle is queued, or the reason none was is known.

### Step 4 — Update `_ai/decisions.md`

Standard projects only.

**Read the file first.** `grill-me-as` records each decision at the moment it resolves, so after a
grilling session most of this session's decisions are already present. The gap is what this step
fills: decisions reached in ordinary conversation, outside a grilling. Re-adding one already recorded
creates a near-duplicate pair the next session cannot tell apart; where a decision was recorded and
later *superseded*, update that entry so the file carries one position.

Follow the file's existing entry format. Where it has none:

```
## [Short title]
**Date:** YYYY-MM-DD
**Decision:** [one sentence]
**Rationale:** [one sentence]
**Finding:** [ref or omit]
**Supersedes:** [ref or omit]
```

Complete when every decision worth preserving appears exactly once.

### Step 5 — Graduate decisions to facts

Standard projects only. Scan `_ai/decisions.md` for entries that pass both tests:

1. **Skill-enforced** — the decision is fully implemented in a specific skill, so the skill is the
   enforcement mechanism and `decisions.md` restating it is duplication.
2. **No spontaneous-violation risk** — the decision holds even when acting outside a formal skill
   workflow (creating a folder, naming a skill, writing a memory entry mid-session).

A decision that could be violated *without* running a skill stays in `decisions.md`.

For each candidate:

- Identify the right `_ai/facts/` file by task type — which kind of session work needs this fact
- Draft a one-liner of ≤ 15 words: the settled fact in its most portable form
- Draft or update `_ai/facts/[topic].md` with the one-liner, the full detail with examples and edge
  cases, the original decision's title, date and rationale, and a **Load when:** line naming the task
  type that triggers reading it
- Show the candidates and proposed changes and get confirmation before writing
- On confirmation, write the facts file, then get separate explicit confirmation before adding the
  pointer to `CLAUDE.md ## Facts`
- Delete the graduated entry from `_ai/decisions.md`

Complete when every candidate is graduated or consciously left, silently where none qualified.

### Step 6 — Update `_ai/findings.md`

Standard projects only. Add every finding worth preserving, following the file's existing format.
Where it has none:

```
## [Short title]
**Date:** YYYY-MM-DD
**Finding:** [one sentence — factual, not interpretive]
**Source:** [test result / analysis / external research / user feedback]
**Status:** Open | Actioned | Superseded
**Decision:** [ref or omit]
```

Complete when every finding worth preserving is recorded.

### Step 7 — Update the dashboard registry

Read the project's `CLAUDE.md` for its `## Project ID` section. A legacy project without one skips
this step, noted in the summary.

Update `_system/dashboard/data/projects.json` — the **live** registry. Where a glob finds a second,
dev copy of `projects.json` elsewhere in the workspace, update it too so local dev stays in sync; both
files share one schema.

Find the record whose `id` matches, and set exactly three fields:

- `last_worked` — today's date, `YYYY-MM-DD`
- `status_note` — 1–2 sentences on this session's changes and the project's current state. Where
  status is `Completed - Goal Reached`, `Completed - Abandoned` or `Archived`, remove this key entirely
  instead
- `open_tasks` — the count of `- [ ]` items in `_ai/tasks.md ## Open` **as Step 2 left it**, counting
  to the next `##` heading so `## Active Workflow`, `## Inbox` and `## Recently Done` stay out. Write
  it even at 0; omit the field only where the project has no `_ai/tasks.md`

Set `status` as well where it changed this session (became `On Hold`, reverted to `Active`). The
remaining fields — `function`, `context`, `type`, `path`, `id`, `name`, `start_date` — are
`project-init`'s to set and carry through untouched.

**Schema:** `function` takes a swimlane key from the workspace's
`_system/dashboard/data/business-functions.json` — read it rather than assuming, since each workspace
defines its own. `type` is `"Ongoing"` or `"Defined Goal"`.

An unregistered project — no matching record — is noted in the summary and left for `project-init` to
register.

Complete when the registry matches this session, or the reason it could not be updated is in the
summary.

### Step 8 — Update project memory

The memory file is a pointer rather than a summary: it names the project and its scaffold path, then
directs Claude to the files holding current state — `_ai/tasks.md`, `_ai/decisions.md` and
`_ai/findings.md` for a Standard project; `_ai/tasks.md` and `_ai/inputs.md` for a Developer one.
Create it where none exists, and update `MEMORY.md` when it is new.

The scaffold files stay the source of truth, so the memory file points at them rather than repeating
what they hold.

Complete when the memory file points at the right state files for the project's type.

### Step 9 — Print the summary

- Which files changed, and what was added or updated in each
- Any file deliberately left unchanged, and why — no new decisions, nothing material to record
- Open questions and follow-on tasks worth carrying to the next session
- A reminder to stage and commit

Complete when every file the process touched or consciously skipped is accounted for.
