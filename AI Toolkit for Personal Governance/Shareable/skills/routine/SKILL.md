---
name: routine
description: What needs doing right now, pulled from pre-computed state. Use when Adrian asks what's outstanding, what he should be moving along, or wants a fast status pull — for the weekly review use /check-in, for a new idea use /idea.
---

# Routine

Trigger 3 of three. Answers in seconds because every source it reads is **pre-computed** — the task
files, state tables and project registry that `check-in` and `idea` wrote at write time. Its whole cost
is a handful of file reads. The dashboard is the visual of the same state; this skill is its
conversational equivalent.

**Read-only.** No advisor is convened to find any of it, and nothing found is written back.

## Process

### Step 1 — Read the pre-computed state

Read, in this order:

1. `_system/dashboard/data/projects.json` — project status across all departments
2. `PM/_ai/tasks.md` — the tasks that belong to no single department
3. `PM/opposition-collisions.md` — collisions still unresolved; absent means none open
4. Each of the five departments' `_ai/tasks.md` — open tasks, data-gap tasks included
5. Each of the five departments' `_ai/state.md` — the `Status` column, where a floor breach is already
   recorded

The state table exists so that the evidence log never has to be read; `_assets/data/log.md` stays
closed. Reaching for the log means the state table is missing something, which is a finding for
`check-in`.

Complete when all five departments have been read for both of their files, the empty ones included.

### Step 2 — Return the list

Group by department, PM-level items first. Under each: open tasks, projects needing attention,
outstanding data-gap tasks, and any floor breach the `Status` column already records. Name every
department, the ones with nothing included — "nothing open" is the answer for a quiet department, and
an omitted one reads as an oversight.

Report each item as its source states it. Where two sources disagree — a task done in `tasks.md` but
still open in `projects.json` — report both and name the discrepancy; reconciling it is a write, and
the write belongs to `check-in`. An unresolved collision reports the same way, with `/check-in` named
as where it gets settled.

Complete when every open item from every source in Step 1 appears in the output.
