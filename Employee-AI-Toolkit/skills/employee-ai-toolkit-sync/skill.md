---
name: employee-ai-toolkit-sync
description: Deploy skill changes from Shareable/ to installed, detect in-session edits to installed skills, and audit projects/roles for structural conformance. Shareable/ is the source of truth — edit there, deploy here. Project-specific — requires Employee AI Toolkit project context. Pass scope args (skills, hooks, dashboard, audit) to limit which phases run; omit for auto-detection from session context.
---

# Employee AI Toolkit Sync

Deploys skills, hooks, and dashboard from `Shareable/` to their installed locations. Does not auto-deploy — surfaces what differs and asks for confirmation. Token cost is proportional to scope: run only the phases that match what changed.

## Step 0 — Determine scope

Before reading any files, check session context for what was changed this session. Map to phases:

| What changed in session | Phase |
|---|---|
| A file under `Shareable/skills/` or `skills/employee-ai-toolkit-sync/` | `skills` |
| A file under `[role]/_skills/` or `[project]/_skills/` | `skills` |
| A file under `Shareable/hooks/` or `settings.json` | `hooks` |
| A file under `Shareable/dashboard/` | `dashboard` |
| A `CLAUDE.md`, scaffold file, or project folder added/removed | `audit` (targeted if one project) |

State the inferred scope and ask the user to confirm or adjust **before reading any files**. If scope args were passed (e.g. `/employee-ai-toolkit-sync skills`), skip inference and use those directly.

**Audit is opt-in.** It reads every project and role CLAUDE.md plus scaffold files. Only include it when project structure changes are in scope, or the user explicitly requests it.

When context is ambiguous or no args given, default proposed scope: `skills hooks dashboard` — omit `audit`.

## Phases

Run only the phases matching confirmed scope. Do not read files for phases not in scope.

| Scope | What it does |
|---|---|
| `skills` | Compare Shareable/ skills ↔ installed; deploy confirmed changes |
| `hooks` | Compare Shareable/ hooks ↔ `settings.json` + installed scripts |
| `dashboard` | Compare `Shareable/dashboard/` ↔ `_system/dashboard/` |
| `audit` | Check all active projects and roles for structural conformance |
| `audit:path` | Audit a single project or role (e.g. `audit:Developer/Saturn.Business.AI.Dashboard`) |
| `full` | All four phases — warn user this is expensive before starting |

**Read [REFERENCE.md](REFERENCE.md) before running `audit` or `full`.** Conformance markers and full phase logic live there.

## Paths

| What | Path |
|---|---|
| Installed skills | `%USERPROFILE%\.claude\skills\` |
| Shareable skills | `Technical-Director/Employee-AI-Toolkit/Shareable/skills/` |
| Role-scoped skills (source) | `[role]/_skills/[name]/skill.md` |
| Project-scoped skills (source) | `[project]/_skills/[name]/skill.md` |
| Hook config | `%USERPROFILE%\.claude\settings.json` → `hooks` object |
| Shareable hooks | `Technical-Director/Employee-AI-Toolkit/Shareable/hooks/` |
| Shareable dashboard | `Technical-Director/Employee-AI-Toolkit/Shareable/dashboard/` |
| Installed dashboard | `_system/dashboard/` |

## Notes on scoped skills

`employee-ai-toolkit-sync` is project-scoped — source at `Technical-Director/Employee-AI-Toolkit/skills/employee-ai-toolkit-sync/skill.md`. Not in `Shareable/skills/`. Report as **In sync (project-scoped)** or **Drifted (project-scoped)** by comparing the installed copy against that source path.

Role and project-scoped skills created via `/workspace-new-skill` live in `[role]/_skills/[name]/skill.md` or `[project]/_skills/[name]/skill.md`. The skills phase discovers and syncs these automatically — see REFERENCE.md for discovery logic.

## Rules

- `Shareable/skills/` is the source of truth for distributable skills. Never edit installed copies directly; if a quick fix is made in-session to an installed skill, merge it back to Shareable/ before deploying.
- `[role]/_skills/` and `[project]/_skills/` are the source of truth for role and project-scoped skills.
- `Shareable/hooks/` is the source of truth for hooks.
- `Shareable/dashboard/` is the source of truth for dashboard dist files. Never edit `_system/dashboard/` directly.
- Template audit checks structure only — never compare project content to template content.
- Skip any project or role folder inside `_archive/`.
- This skill lives in `Technical-Director/Employee-AI-Toolkit/skills/employee-ai-toolkit-sync/`. The installed copy at `~/.claude/skills/employee-ai-toolkit-sync/` must match.
