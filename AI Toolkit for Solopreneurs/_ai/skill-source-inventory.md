# Skill Source Inventory

**Audited:** 2026-07-28 (Brief A, unit A2)
**Scope:** source only — `Shareable/skills/`, `Shareable/agents/`, `_skills/`. No installed copy was inspected; this machine is a secondary checkout and its `~/.claude/skills/` belongs to a different workspace.

Re-run this audit via `/ai-toolkit-sync audit`.

---

## Inventory

All folder names match their `name:` frontmatter. No mismatches.

| Source path | `name:` | Scope | Notes |
|---|---|---|---|
| `Shareable/skills/archive-project` | `archive-project` | Global | Naming divergence — see below |
| `Shareable/skills/grill-me-as` | `grill-me-as` | Global | Writes decisions live as of 2026-07-28 (B6) |
| `Shareable/skills/grilling-handoff` | `grilling-handoff` | Global | |
| `Shareable/skills/new-skill` | `new-skill` | Global | Naming divergence — see below |
| `Shareable/skills/project-init` | `project-init` | Global | Has `REFERENCE.md` |
| `Shareable/skills/project-migrate` | `project-migrate` | Global | Has `REFERENCE.md` |
| `Shareable/skills/project-start` | `project-start` | Global | Present in source — the rollout recorded in `_ai/tasks.md` did happen |
| `Shareable/skills/project-update` | `project-update` | Global | Has `REFERENCE.md` |
| `Shareable/skills/project-wrap-up` | `project-wrap-up` | Global | |
| `Shareable/skills/run-cycle` | `run-cycle` | Global | Added 2026-07-28 (Brief B, B4) |
| `Shareable/skills/to-brief` | `to-brief` | Global | Added 2026-07-28 (Brief B, B5) |
| `Shareable/skills/to-work-units` | `to-work-units` | Global | Added 2026-07-28 (Brief B, B5) |
| `Shareable/agents/knowledge-reviewer.md` | `knowledge-reviewer` | Global (agent) | Added 2026-07-28 (Brief B, B3) |
| `_skills/ai-toolkit-sync` | `ai-toolkit-sync` | Project | Not in `Shareable/` by design — references workspace-specific paths |

## Cross-reference check

Every skill named by another skill or template exists in the source set: `archive-project`, `ai-toolkit-sync`, `grill-me-as`, `grilling-handoff`, `new-skill`, `project-init`, `project-migrate`, `project-start`, `project-update`, `project-wrap-up`. No dangling references.

`/grill-me` and `/setup-matt-pocock-skills` are referenced but are external (Matt Pocock's skill suite, plus a workspace command at `.claude/commands/grill-me.md`). Expected, not drift.

## Stale path references found and fixed

Four, all in files that seed **new** workspaces — which is why they mattered more than their age suggested:

| File | Was | Now |
|---|---|---|
| `Shareable/templates/root-CLAUDE.md` | `Active Projects/` + `Archived Projects/` in the folder structure | Current structure — projects directly under function, `_archived/`, `_assets/`, `_skills/`, full `_ai/` layout, `.gitkeep` rule |
| `Shareable/templates/function-CLAUDE.md` | `## Active Projects` heading, projects "live under `Active Projects/`" | `## Projects`, direct-under-function, optional scope folders, standard folders section |
| `Shareable/skills/new-skill/skill.md` | Example path `02 - Marketing/Active Projects/GBP Posting Engine/` | `02 - Marketing/Customer/GBP Posting Engine/` |
| `README.md` | Structure diagram with `Active Projects/` and root-level scaffold files | Rewritten in unit A3 |

`Shareable/skills/project-update/REFERENCE.md:17` also matches the `Assets/` pattern, but that is a **migration rule** ("`Assets/` folder at project root → rename to `_assets/`"), not drift. Left as-is.

No absolute `C:\Enterprise` paths survive anywhere in the source set.

## Why this class of bug keeps recurring

The 2026-06-29 restructure updated the live workspace and the skills, but not the templates. Templates are invisible in day-to-day work — nothing reads them until someone creates a new function or a new workspace — so drift there is silent for months and only surfaces at the worst moment, when a new business is being set up. Unit A4 adds a check for exactly this.
