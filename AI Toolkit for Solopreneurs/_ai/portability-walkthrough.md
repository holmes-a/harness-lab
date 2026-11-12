# Portability Walkthrough

**Date:** 2026-07-28 (Brief B, unit B7)
**Question:** copy this project folder into an empty business folder, run `/ai-toolkit-sync`. Does a working pipeline come out? What is left behind?

Done on paper, not executed — there is no second business folder yet. Re-run for real the first time one is created.

---

## What travels

Everything inside `00 - Cross Function/AI Toolkit for Solopreneurs/`:

- `Shareable/skills/` — all 12 skills, including the three pipeline skills
- `Shareable/agents/knowledge-reviewer.md` — the verifier
- `Shareable/templates/`, `Shareable/hooks/`, `Shareable/dashboard/`, `Shareable/memory/`
- `_skills/ai-toolkit-sync/` — the sync skill's source
- `README.md`, `CLAUDE.md`

## What does not travel, and is correctly handled

| Left behind | Why it is fine |
|---|---|
| `.claude/agents/` | Deployed copy only; source is `Shareable/agents/`, and the sync tool's `agents` phase recreates it |
| `_system/hooks/`, `_system/dashboard/` | Deployed copies; sources are in `Shareable/`, recreated by sync |
| `.claude/settings.local.json` hook wiring | Manual step, documented in the README Quick Start with `settings-example.json` |
| `_system/dashboard/data/projects.json` | `project-init` creates it as `[]` when absent |
| Root and function `CLAUDE.md` files | Manual step from templates, documented in Quick Start |
| Memory files (`~/.claude/projects/<slug>/memory/`) | Machine-local by design; scaffold files are the cross-machine source of truth |

## Gaps found

### 1. Bootstrap chicken-and-egg — `ai-toolkit-sync` cannot install itself

`ai-toolkit-sync` is project-scoped (`_skills/ai-toolkit-sync/`), deliberately not in `Shareable/` because it references workspace-specific paths. But it is also the thing that installs everything else. On a fresh business folder there is no way to run it until it is installed, and nothing documents that the first install is manual.

**Fixed:** README Quick Start now has a bootstrap step — copy `_skills/ai-toolkit-sync/` to `~/.claude/skills/` by hand, once, then let it install the rest.

### 2. Copying the project brings Hot Iron's history with it

`_ai/decisions.md`, `_ai/findings.md`, `_ai/tasks.md`, `_ai/facts/`, and `_ai/task-prds/` all sit inside the project folder, so a wholesale copy carries this business's decision history into the new one. Some of it is genuinely portable (toolkit design facts); most is not (the PreCompact hook incident, the Saturn naming collision, Local Search filename conventions). Left in place, a new business starts with a `## Facts` list referring to events that never happened to it.

**Fixed:** README Quick Start now says to clear `_ai/` on copy, keeping only `_ai/facts/` entries that are about the toolkit rather than the business.

### 3. `.claude/commands/` is outside the project

`grill-me.md` and `marketing-process-customer-reviews.md` live at the workspace root. The second is Hot Iron-specific and should not travel. The first is Matt Pocock's `grill-me`, which `grilling-handoff`'s description references.

**Not fixed — low impact.** `grilling-handoff` mentions `/grill-me` in prose only; it does not invoke it, and `/grill-me-as` is the toolkit's own entry point and does travel. Noted so it is not mistaken for a bug later.

## Verdict

Portable, with the two fixes above applied. The pipeline specifically — three skills plus the reviewer agent — travels cleanly, because all four live in `Shareable/`. That is the decision from 2026-07-28 doing its job: had the reviewer stayed at `.claude/agents/`, the skills would have deployed and their verifier would have silently gone missing.
