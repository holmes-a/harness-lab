# Facts: Toolkit Design

**Load when:** planning new toolkit features, deciding what to build or not build, or setting up a new workspace.

---

## Project registry and dashboard are standard toolkit components

Project registry (`_system/dashboard/data/projects.json`) and the SPA dashboard (`_system/dashboard/`) are included in every solopreneur toolkit instance.

**Full detail:** The registry is maintained by `project-init` (creates the entry) and `project-wrap-up` (updates `last_worked` and status). The SPA dashboard is deployed from `Shareable/dashboard/` via `/ai-toolkit-sync`. Both are optional for a minimal setup but are part of the standard solopreneur scaffold.

**Original decision:** "Project registry and dashboard included" — 2026-06-28
**Rationale:** Adrian is running multiple projects across five functions and expects more over time; a single view of project status earns its overhead.

---

## Business functions are predefined; no function-init skill exists

Business functions are defined at workspace setup and are fixed. `project-init` validates against whatever function folders exist. Adding a new function is a one-off manual action.

**Full detail:** The workspace hierarchy is workspace → business function → project. The function layer is mandatory, not optional. There is no `/function-init` skill and none is planned — solopreneurs rarely change their business model structure.

**Original decision:** "Business function is mandatory middle layer" + "No function-init skill; functions are predefined" — 2026-06-28
**Rationale:** Making the function layer mandatory keeps the scaffold consistent and enables function-scoped context and skills; solopreneurs rarely restructure their business model.

---

## project-init supports a Developer project type

Developer projects get a different scaffold: pipeline tracker (`_ai/tasks.md`) and `_ai/inputs.md`. They do not get `_ai/decisions.md`, `_ai/findings.md`, `_ai/facts/`, or `_ai/task-prds/`.

**Full detail:** A Developer project is identified by the presence of `## Feature Workflow` or `## Maintenance Workflow` in `CLAUDE.md`. Architectural decisions live in `docs/adr/`; domain knowledge lives in `CONTEXT.md`. `project-init` asks developer-specific interview questions and writes the developer scaffold. `project-wrap-up` reads `_ai/tasks.md` only for Developer projects.

**Original decision:** "Developer project type included" — 2026-06-28
**Rationale:** Technical solopreneurs run real code repos; Developer projects have different documentation conventions (ADRs, changelogs) that conflict with the standard scaffold.

---

## The workspace sync skill is named ai-toolkit-sync

The skill is project-scoped (source at `_skills/ai-toolkit-sync/SKILL.md`), not in `Shareable/skills/`. The installed copy at `~/.claude/skills/ai-toolkit-sync/` must match the source.

**Full detail:** The name is intentionally short and toolkit-neutral. A solopreneur has one toolkit so no employer-prefix disambiguation is needed. It is not distributed via Shareable/ because it references workspace-specific paths (the AI Toolkit project location).

**Original decision:** "Sync skill named ai-toolkit-sync" — 2026-06-28
**Rationale:** Short, unambiguous, and toolkit-neutral.
