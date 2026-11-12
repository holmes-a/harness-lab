# AI Toolkit for Personal Governance

The project that built the workspace it now lives inside. `Holmes.Administration` is a decision-making
and attention system for Adrian's life, run on Claude Code — this folder is where that system's own
framework is authored and kept in sync.

Sibling to **AI Toolkit for Solopreneurs**, which organises *business* work by value-chain function.
This one organises *a life* by role. They share a project scaffold; the governing model is not shared.

> For the workspace's own user-facing manual — the cast, the three triggers, the folder structure — see
> the root `README.md`. This file is about the toolkit project itself: what it builds, where the design
> record lives, and how the framework stays in sync between here and the live workspace.

## Status

**Structural build complete.** Phases 1–6 of `_ai/task-prds/implementation-tasks.md` are done: the
scaffold, the reused toolkit skills, the five minister agents, the six new skills, and this project's
own move into the workspace it governs. What's still missing is content — Adrian's actual manifesto,
each department's manifesto, and each department's distilled method — all of which come from grilling
sessions, not from this build (see `implementation-brief.md` §0.1).

## Design record

The current design is recorded in `_ai/decisions.md` and `_ai/findings.md`, both carried over verbatim
from a greenfield grilling session on 2026-08-10 that superseded an earlier 39-decision design (the
earlier file is marked superseded at its own top and was deliberately **not** brought into this
workspace — see `implementation-brief.md` §0.3).

`_ai/task-prds/implementation-brief.md` is the spec this build followed, and
`_ai/task-prds/implementation-tasks.md` is the task-by-task work order, including the acceptance
criteria every task in this build was checked against.

## How the framework is built and deployed

**`Shareable/` is the source of truth.** Everything deployed into the live workspace — the five
minister agents in `.claude/agents/`, the toolkit and personal-governance skills in `.claude/skills/`,
the hooks and dashboard in `_system/` — has a byte-identical origin under `Shareable/` here. Author
changes here first, then deploy out; do not edit the deployed copy directly and let it drift. The
Solopreneurs toolkit has known drift between its `Shareable/` and its deployed copies (its dashboard
ships without `business-functions.json`, for one) — this project exists partly to not repeat that.

```
Shareable/
  agents/       the five minister-*.md mandate files
  skills/       check-in, idea, routine, opposition, manifesto, appoint-advisor
                 + the nine reused toolkit skills (project-init, grill-me-as, etc.)
  templates/    root/PM/Advisors/department CLAUDE.md and manifesto.md templates
  hooks/        pre-compact.ps1 / .sh, settings-example.json
  dashboard/    index.html, assets/, data/business-functions.json
  memory/       index + four memory-type examples, reused from the Solopreneurs toolkit
```

## Standing this up somewhere else

`BOOTSTRAP.md`, alongside this file under `Shareable/`, is the runbook for standing up a fresh copy of
this system in a new workspace. There is no install step — skills are committed to the target repo's
`.claude/skills/`, never copied into `~/.claude/skills/`.

## Project Files

| File | Purpose |
|---|---|
| `_ai/tasks.md` | Current build state, open tasks, recently done |
| `_ai/decisions.md` | The design record — carried over from the 2026-08-10 greenfield session |
| `_ai/findings.md` | Observed facts and analysis from that same session |
| `_ai/task-prds/` | `implementation-brief.md` (the spec) and `implementation-tasks.md` (the work order) |
| `Shareable/` | The publishable framework — source of truth for everything deployed |
