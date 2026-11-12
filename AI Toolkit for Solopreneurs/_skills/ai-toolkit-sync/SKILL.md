---
name: ai-toolkit-sync
description: Deploy skill changes from Shareable/ to installed, detect in-session edits to installed skills, and audit projects for structural conformance. Shareable/ is the source of truth — edit there, deploy here. Project-specific — requires AI Toolkit for Solopreneurs project context. Pass scope args (skills, hooks, dashboard, audit) to limit which phases run; omit for auto-detection from session context.
---

# AI Toolkit Sync

Deploys skills, hooks, and dashboard from `Shareable/` to their installed locations. Does not auto-deploy — surfaces what differs and asks for confirmation. Token cost is proportional to scope: run only the phases that match what changed.

## Step 0 — Determine scope

Before reading any files, check session context for what was changed this session. Map to phases:

| What changed in session | Phase |
|---|---|
| A file under `Shareable/skills/` or `_skills/ai-toolkit-sync/` | `skills` |
| A file under `[function]/_skills/` or `[project]/_skills/` | `skills` |
| A file under `Shareable/agents/` | `agents` |
| A file under `Shareable/hooks/` or `settings.json` | `hooks` |
| A file under `Shareable/dashboard/` | `dashboard` |
| A file under `Shareable/templates/`, or `README.md` | `drift` |
| A `CLAUDE.md`, scaffold file, or project folder added/removed | `audit` (targeted if one project) |

State the inferred scope and ask the user to confirm or adjust **before reading any files**. If scope args were passed (e.g. `/ai-toolkit-sync skills`), skip inference and use those directly.

**Audit is opt-in.** It reads every project CLAUDE.md plus scaffold files. Only include it when project structure changes are in scope, or the user explicitly requests it.

When context is ambiguous or no args given, default proposed scope: `skills agents hooks dashboard drift` — omit `audit`. `drift` is included by default because it is cheap, source-only, and catches the class of error that stays hidden longest.

## Phases

Run only the phases matching confirmed scope. Do not read files for phases not in scope.

| Scope | What it does |
|---|---|
| `skills` | Compare Shareable/ skills ↔ installed; deploy confirmed changes |
| `agents` | Compare `Shareable/agents/` ↔ workspace `.claude/agents/` |
| `hooks` | Compare Shareable/ hooks ↔ `settings.json` + installed scripts |
| `dashboard` | Compare `Shareable/dashboard/` ↔ `_system/dashboard/` |
| `drift` | Documentation-vs-reality check — cheap, source-only, no install needed |
| `audit` | Check all active projects for structural conformance |
| `audit:path` | Audit a single project (e.g. `audit:02 - Marketing/Customer/GBP Posting Engine`) |
| `full` | All phases — warn user this is expensive before starting |

## Phase: `agents`

Agent definitions in `Shareable/agents/` are consumed by the pipeline skills, so they must ship with them. Source of truth is `Shareable/agents/`; the deploy target is the **workspace** `.claude/agents/` (not `~/.claude/agents/`).

Deploy the same way as skills: compare, report differences, confirm, write. An agent present in the deploy target but absent from `Shareable/agents/` is reported, never deleted.

## Phase: `drift`

Catches documentation that has fallen behind the conventions, which is invisible in day-to-day work because nothing reads a template or a README until a new workspace is being set up. Runs entirely against source files — **no installed copy required**, so it works from any checkout on any machine.

Three checks:

**1. Skill name agreement.** Every skill named in `README.md` must have a matching folder in `Shareable/skills/`, and every folder in `Shareable/skills/` must appear in `README.md`. Report both directions. Also check each skill's folder name matches its `name:` frontmatter.

**2. Retired path patterns.** Search every `.md` file under `Shareable/`, `README.md`, and the workspace root `CLAUDE.md` for patterns that were retired by a recorded decision:

| Pattern | Retired by |
|---|---|
| `Active Projects/` | "`_archived/` replaces Active/Archived Projects folders" (2026-06-29) |
| `Archived Projects/` | same |
| `Assets/` without a leading underscore | "`_assets/` convention applies at all levels" (2026-06-29) |
| Scaffold files at project root (`tasks.md`, `decisions.md`, `findings.md` shown outside `_ai/`) | "`_ai/` folder for scaffold files" (2026-06-28) |
| An absolute path containing a machine-specific root (e.g. `C:\Enterprise`, `C:\Work`) | hardcoded paths do not survive a machine move |

Report file and line. **Flag structural uses, not prose mentions.** A retired pattern is a finding when it appears as a real path — inside a folder-tree diagram, a table's path column, a code span describing where something lives. It is *not* a finding when the surrounding sentence exists to say the convention is retired ("there is no `Active Projects/` wrapper", "`Archived Projects/` was replaced by…"). Those sentences are the fix, not the bug, and flagging them trains the user to ignore this phase.

Three further exclusions:

- `_ai/` working files (`decisions.md`, `findings.md`, `task-prds/`) — these record the history of retired conventions by design
- Migration rules that intentionally name the old form, e.g. `project-update/REFERENCE.md`'s "`Assets/` folder at project root → rename to `_assets/`"
- This skill file itself — the pattern table above would otherwise match every row

**3. Hook health.** Confirm no hook script under `Shareable/hooks/` or `_system/hooks/` contains a hardcoded project slug or absolute workspace path. Then run the installed hook and check that its derived memory directory resolves to an existing directory — report the derived path either way, so a mismatch is diagnosable rather than merely flagged.

**4. Personal-level shadowing.** This is the highest-value check in the phase, because the failure it catches is completely silent.

Claude Code's precedence is **personal overrides project** — `~/.claude/skills/foo` wins over `.claude/skills/foo`. So a leftover personal copy of a toolkit skill silently shadows the workspace copy. The symptom is that editing a skill changes nothing, with no error and no warning, and the natural conclusion is that the edit was wrong rather than that it was never loaded.

List `~/.claude/skills/`. For every name that also exists in the workspace `.claude/skills/`, report it as **SHADOWED** — name it, say the personal copy is winning, and say the fix is to delete the personal copy. Do not delete it yourself: it may belong to another business's toolkit and removing it would break that workspace.

If a personal skill's name does not appear in the workspace, ignore it entirely — that is a legitimate business-agnostic tool.

**5. Bootstrap accuracy.** `Shareable/BOOTSTRAP.md` is executed by a Claude that has *nothing installed*, on a workspace that does not exist yet — so it cannot be tested by running it, and it fails at the worst moment if wrong. Check that every path, filename, and skill name it references still exists in `Shareable/`, and that its function list still matches `Shareable/templates/root-CLAUDE.md`. Check `Shareable/skills/business-init/` still points at it rather than restating its steps. Whenever a phase changes, ask whether `BOOTSTRAP.md` needs the same change.

## Every machine has the skills

Because `.claude/skills/` and `.claude/agents/` are committed to git, every checkout of this workspace already has working skills and agents — there is no "machine without an install" any more. The `skills` and `agents` phases compare source against the committed deploy copy and work identically everywhere.

Two checks still depend on the local machine and must **report "unavailable on this machine — deferred" and continue** rather than failing or reporting drift:

- `drift` check 3 (hook health) — needs to actually run the hook
- `drift` check 4 (personal-level shadowing) — reads `~/.claude/skills/`, which differs per machine. A skill shadowed on one machine may not be on another, so always name the machine when reporting.

## Paths

| What | Path |
|---|---|
| **Deployed skills** | `.claude/skills/` at the **workspace** root — never `~/.claude/skills/` |
| **Deployed agents** | `.claude/agents/` at the **workspace** root |
| Shareable skills (source) | `00 - Cross Function/AI Toolkit for solopreneurs/Shareable/skills/` |
| Shareable agents (source) | `00 - Cross Function/AI Toolkit for solopreneurs/Shareable/agents/` |
| Function-scoped skills (source) | `[function]/_skills/[name]/SKILL.md` |
| Business-project-scoped skills (source) | `[project]/_skills/[name]/SKILL.md` |
| Hook config | `.claude/settings.json` (or `settings.local.json`) at the workspace root → `hooks` object |
| Shareable hooks | `00 - Cross Function/AI Toolkit for solopreneurs/Shareable/hooks/` |
| Deployed hooks | `_system/hooks/` |
| Shareable dashboard | `00 - Cross Function/AI Toolkit for solopreneurs/Shareable/dashboard/` |
| Deployed dashboard | `_system/dashboard/` |

## Deploy target: workspace, not personal

**Every skill this toolkit manages deploys to the workspace `.claude/skills/`.** Nothing is ever written to `~/.claude/skills/`.

Toolkit skills read the business's structure — the `CLAUDE.md` hierarchy, `projects.json`, the `_ai/` scaffold. They are business-coupled by definition, so a per-machine personal install was always the wrong shape: two businesses on one machine collide on every shared skill name, and the last deploy silently wins.

The dividing test is one question: **does the skill read the business's structure?**

- **Yes** → workspace `.claude/skills/`. Everything in `Shareable/skills/`, plus every function-scoped and business-project-scoped skill.
- **No** → the user's personal `~/.claude/skills/`, and **not this skill's concern.** Tools about how the user works rather than about a business — Matt Pocock's engineering suite, `grilling`, `handoff`, `research`, `tdd`. Never deploy these, never report them as drift, never remove them.

`.claude/skills/` is committed to git, so a fresh checkout on any machine has working skills with no install step.

All three source scopes are unchanged — `Shareable/`, `[function]/_skills/`, `[project]/_skills/`. Only the deploy target moved.

## Fresh workspace

On a workspace where the toolkit has never been deployed, the `skills`, `agents`, `hooks`, and `dashboard` phases **create** their targets rather than reporting them as missing — `.claude/skills/`, `.claude/agents/`, `_system/hooks/`, and `_system/dashboard/`. Confirm with the user first, as always; a first deploy is still a deploy.

Because `.claude/skills/` is committed to git, a fresh *checkout* of an existing workspace already has working skills and needs no deploy at all. Only a genuinely new workspace does, and `Shareable/BOOTSTRAP.md` handles that case.

## Notes on scoped skills

`ai-toolkit-sync` has its source at `00 - Cross Function/AI Toolkit for solopreneurs/_skills/ai-toolkit-sync/SKILL.md`, not in `Shareable/skills/`, because it references workspace-specific paths. It deploys to `.claude/skills/` like everything else. Report it as **In sync** or **Drifted** against that source path.

Function-scoped and business-project-scoped skills created via `/new-skill` live at `[function]/_skills/[name]/SKILL.md` or `[project]/_skills/[name]/SKILL.md`. The skills phase discovers and deploys these automatically — search for `_skills/` folders in all function and project directories, excluding `_archived/`. They deploy flat into `.claude/skills/`, so their names must be unique across the workspace; flag any collision between two source scopes.

**Vocabulary warning.** "Project" means two different things here. Claude Code calls `.claude/skills/` *project*-level, meaning the whole workspace. This toolkit calls `[project]/_skills/` *project*-scoped, meaning one business project like GBP Posting Engine. When writing reports, say **workspace** for the former and **business-project** for the latter — the ambiguity has already caused one wrong deploy-target decision.

*Possible future refinement, not implemented:* Claude Code also loads skills from nested `.claude/skills/` directories below the working directory (v2.1.203+), which would let a function-scoped skill live at `[function]/.claude/skills/` and activate only when working in that function. Worth revisiting if flat-namespace collisions become common.

## Audit conformance markers

A conforming project has:
- `CLAUDE.md` with `## Project ID`, `## Status`, `## Facts`, `## Working Instructions` (with wrap-up line), and `## Project Files` sections
- `_ai/tasks.md`, `_ai/decisions.md`, `_ai/findings.md` present (standard projects)
- `_ai/tasks.md` and `_ai/inputs.md` present (Developer projects — identified by `## Feature Workflow` in CLAUDE.md)
- `_assets/.gitkeep` present — the `.gitkeep` specifically, not just the folder; a bare `_assets/` is untracked by git and vanishes on `git clean`
- `_skills/.gitkeep` present

Skip any projects inside `_archived/`.

## Rules

- `Shareable/skills/` is the source of truth for distributable skills. Never edit installed copies directly; if a quick fix is made in-session to an installed skill, merge it back to Shareable/ before deploying.
- `[function]/_skills/` and `[project]/_skills/` are the source of truth for function and project-scoped skills.
- `Shareable/hooks/` is the source of truth for hooks.
- `Shareable/dashboard/` is the source of truth for dashboard dist files. Never edit `_system/dashboard/` directly.
- Audit checks structure only — never compare project content to template content.
- This skill lives in `00 - Cross Function/AI Toolkit for solopreneurs/_skills/ai-toolkit-sync/`. The installed copy at `~/.claude/skills/ai-toolkit-sync/` must match.
