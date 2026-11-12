# Decisions

<!-- Entry format:
## [Short title]
**Date:** YYYY-MM-DD
**Decision:** [one sentence]
**Rationale:** [one sentence]
**Finding:** [ref to findings.md entry, if any — or omit]
**Supersedes:** [ref to earlier decision, if any — or omit]

Pruning rule: Keep all active decisions. Remove an entry once another decision carries
Supersedes: [that entry] and is at least one session old. The superseding entry is the
authoritative record.

Graduation rule: A decision belongs here only if Claude might violate it when acting
outside of a formal skill workflow. If a decision is fully implemented in a specific skill,
the skill is the enforcement mechanism — graduate it to facts/ instead.
-->

## _system/dashboard/data/ holds workspace JSON data files

**Date:** 2026-06-20
**Decision:** `roles.json` and `projects.json` live at `_system/dashboard/data/` (not workspace root); all skills that read or write these files reference this path.
**Rationale:** Workspace root should contain only role folders (unprefixed) and prefixed system folders; data files at root break the visual scan convention and belong under `_system/` alongside other workspace-level resources.

## Shareable/dashboard/ is source of truth for dashboard dist

**Date:** 2026-06-20
**Decision:** The built dashboard SPA dist lives in `Shareable/dashboard/` as a deployable resource and is synced to `_system/dashboard/` by `/employee-ai-toolkit-sync`; never edit `_system/dashboard/` directly — rebuild from source and update `Shareable/dashboard/` first.
**Rationale:** Treating the dashboard like any other Shareable resource keeps the deployment model consistent and ensures the sync skill manages the full toolkit; editing the deployment target directly would create drift with no source-of-truth to recover from.

## _ai/ subfolder for all project scaffold files

**Date:** 2026-06-18
**Decision:** All project scaffold files (tasks.md, decisions.md, findings.md, facts/, task-prds/) live in an `_ai/` subfolder at the project root; `CLAUDE.md` is the only scaffold file at root.
**Rationale:** Keeps AI context files visually separated from project content — especially important in code repos; consistent with Saturn's `_` prefix convention for non-primary folders; applies across all project types.

## Developer project = the codebase, long-lived

**Date:** 2026-06-18
**Decision:** A Developer project maps to a codebase or application — not to a single feature or initiative — and runs indefinitely; both feature work and maintenance work happen within the same project scaffold.
**Rationale:** Creating a new Saturn project per feature would produce many scaffold folders pointing at the same repo; one project per codebase keeps context in one place and mirrors how non-developer projects are scoped.

## Developer projects use Matt Pocock conventions, not Saturn decisions/findings

**Date:** 2026-06-18
**Decision:** Developer projects do not get `_ai/decisions.md`, `_ai/findings.md`, or `_ai/facts/`; architectural decisions live in `docs/adr/` and domain knowledge in `CONTEXT.md`, both managed by Matt Pocock's skills.
**Rationale:** Running parallel tracking creates two sources of truth for the same information; replacing with Matt Pocock's conventions keeps the codebase as the single source of truth and avoids forking his skills.

## UX/goal PRDs linked by reference in inputs.md

**Date:** 2026-06-18
**Decision:** Non-developer roles pass UX/goal PRDs to Developer projects via `_ai/inputs.md` — a friendly-name → workspace-relative-path reference table — never by copying the document.
**Rationale:** Copying creates two sources of truth that can drift; linking by reference keeps the PRD authoritative in its original role folder and makes the handoff explicit and traceable.

## Workspace root folder convention

**Date:** 2026-06-16
**Decision:** Only role folders appear unprefixed at workspace root; all other workspace-level folders use a `_` prefix (`_context/`, `_archive/`, `_system/`); `_system/` is the designated home for workspace-level configuration such as hooks.
**Rationale:** Unprefixed folders at root should signal "this is a role" at a glance; mixing in configuration and context folders breaks that scan.

## Skills naming convention — prefix by scope

**Date:** 2026-06-15 (updated 2026-06-18)
**Decision:** Workflow skills are named with a scope prefix: `project-` for project lifecycle skills (`project-init`, `project-wrap-up`), `role-` for role skills (`role-init`), and `workspace-` for workspace-level skills; persona and reference skills are named by function (`grill-me-as`).
**Rationale:** The prefix makes the skill library scannable and groups related workflow steps together; scope-qualified prefixes are more precise than a single prefix for all workflow skills.

## LLM agnostic by design

**Date:** 2026-06-12
**Decision:** The toolkit must work regardless of whether the AI tool in use is Claude Code, GitHub Copilot CLI, Codex CLI, or a future alternative.
**Rationale:** Locking to a single vendor at this stage would undermine the evidence base for the board-level adoption decision.

## Context portability is the core challenge

**Date:** 2026-06-12
**Decision:** A canonical shared context strategy — one source of truth that each tool either reads natively or maps to — is a required output of this project.
**Rationale:** CLAUDE.md, AGENTS.md, and copilot-instructions.md serve different tools; without a shared strategy, context will diverge and maintenance cost will grow.

## CLAUDE.md files are intentionally fixed

**Date:** 2026-06-15
**Decision:** Context files (CLAUDE.md at workspace, role, and project level) capture stable facts and change only by deliberate edit — they do not accumulate notes or grow as work progresses.
**Rationale:** Keeping context files stable prevents drift and noise; the scaffold files (tasks.md, decisions.md, findings.md) are the correct place for evolving state.

## Project memory is a pointer, not a summary

**Date:** 2026-06-15
**Decision:** Project memory entries — in any tool's memory system — should point to the scaffold files (tasks.md, decisions.md, findings.md) rather than summarise their content.
**Rationale:** Scaffold files are the authoritative, git-committed source of truth; duplicating their content in memory creates drift risk and two things to maintain.

## Facts/ graduation test — two conditions required

**Date:** 2026-06-18
**Decision:** A decision graduates to facts/ only if it passes both tests: (1) fully implemented in a specific skill — the skill is the enforcement mechanism; and (2) no spontaneous-violation risk — Claude would not violate it when acting outside a formal skill workflow.
**Rationale:** The first test alone was insufficient — decisions implemented in skills were being retained "in case Claude needs to know", but the skill already enforces the behaviour; only decisions with genuine spontaneous-violation risk belong in the working set.
**Supersedes:** facts/ pattern for graduated decisions (partial — refines the graduation criterion)

## CLAUDE.md ## Facts uses task-scoped link files

**Date:** 2026-06-18
**Decision:** Facts/ files are grouped by task type and listed in CLAUDE.md ## Facts as link files with a "Load when:" trigger description; they are loaded on demand, not always; groupings are re-evaluated each pass as the project grows.
**Rationale:** Always loading all facts files wastes context on every session; task-scoped files let Claude pull in the right detail only when that type of work is active; re-evaluation each pass prevents stale groupings from accumulating.

## decisions.md is a working set, not an archive

**Date:** 2026-06-17
**Decision:** decisions.md holds only active decisions — entries that Claude might violate when acting outside of a formal skill workflow; settled entries graduate through a Finding → Decision → Fact ratchet rather than accumulating indefinitely.
**Rationale:** A file that only grows becomes token-heavy and stale; treating it as a working set keeps context quality high and forces a natural review cycle at each wrap-up.

## facts/ pattern for graduated decisions

**Date:** 2026-06-17
**Decision:** A graduated decision becomes a one-liner pointer in CLAUDE.md `## Facts` (user confirms before writing) linking to full detail in `_ai/facts/[topic].md`; the decision entry is then deleted.
**Rationale:** CLAUDE.md stays lean for the common case; detail is available on demand; git history is the archive — no information is lost, and there is no duplicate to maintain.

## Shareable/ is source of truth for distributable skills

**Date:** 2026-06-17
**Decision:** `Shareable/skills/` is the single source of truth for distributable skills; installed copies in `~/.claude/skills/` are deployment artifacts managed by `/employee-ai-toolkit-sync`, which deploys Shareable/ → installed by default.
**Rationale:** Editing in two places created manual sync burden and drift risk; a single source with a deploy step eliminates dual-file editing and makes the direction of truth unambiguous.

## Role and project-scoped skills live in _skills/ and install globally

**Date:** 2026-06-23
**Decision:** Skills scoped to a role or project live in `[role]/_skills/[name]/skill.md` or `[project]/_skills/[name]/skill.md` (source of truth) and are installed to `~/.claude/skills/` by `/employee-ai-toolkit-sync`; they are not duplicated into `Shareable/`.
**Rationale:** Two scopes (role and project) cover all personal skill needs; `_skills/` uses the Saturn `_` prefix convention to signal non-primary content, consistent with other role/project subfolders; sync keeps installation automatic across machines.
**Supersedes:** Project-scoped skills live in [project]/skills/ and install globally

## Role/project skills use a topic prefix in their name

**Date:** 2026-06-23
**Decision:** Skills in `_skills/` are named with a short topic prefix derived from the role or project — e.g. `ce-` for Cyber Essentials, `co-` for Compliance Officer — followed by a function descriptor.
**Rationale:** All skills install into the same global `~/.claude/skills/` namespace; a topic prefix prevents collision with Shareable skills and makes the origin immediately visible without opening the file.

## workspace-new-skill is the entry point for creating role/project skills

**Date:** 2026-06-23
**Decision:** `workspace-new-skill` (a Shareable skill) is the required entry point when creating a role or project-scoped skill; it scaffolds the correct `_skills/` folder, enforces topic prefix naming, invokes `/write-a-skill` to author the content, and runs `/employee-ai-toolkit-sync` on completion.
**Rationale:** Without an enforcing skill, folder structure and naming conventions are remembered inconsistently; the wrapping skill removes all decisions from the user's head and guarantees the process is followed every time.

## Project-scoped skills live in [project]/skills/ and install globally

**Date:** 2026-06-16
**Decision:** Skills useful only within a specific project live in `[project]/skills/[name]/skill.md` (source of truth) and are installed to `~/.claude/skills/`; they are not duplicated into `Shareable/`.
**Rationale:** Claude Code has no per-project skill scope; the project `skills/` folder is the source of truth and the descriptive name makes the global installation self-documenting.
