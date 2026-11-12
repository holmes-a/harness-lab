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

## Toolkit skills deploy to the workspace `.claude/skills/`, committed to git

**Date:** 2026-07-28
**Decision:** Every skill this toolkit manages deploys to the workspace `.claude/skills/` — committed to git — and never to `~/.claude/skills/`, which is reserved for business-agnostic tools. The dividing test is "does the skill read the business's structure?"
**Rationale:** Toolkit skills are business-coupled by definition, so a per-machine personal install was the wrong shape and name collisions between businesses were its symptom; committing the deploy copy also means a fresh checkout on any machine has working skills with no install step.
**Supersedes:** the deploy-target half of "Three skill scopes with _skills/ convention" — the three *source* scopes are unchanged

## Personal-level skills shadow workspace ones, so migration must delete the personal copies

**Date:** 2026-07-28
**Decision:** `/ai-toolkit-sync`'s drift phase gained a shadow check that reports any `~/.claude/skills/` entry sharing a name with a workspace skill, and never deletes it automatically.
**Rationale:** Claude Code resolves personal over project, so a leftover personal copy silently wins with no error — verified live on this machine, where six skills loaded Saturn's versions inside the Hot Iron workspace. Deploying per-workspace is only half the fix; the check makes the other half visible. Automatic deletion is unsafe because the personal copy may belong to another business's toolkit.
**Finding ref:** Six toolkit skills were being shadowed by the Saturn install

## Skill files are named `SKILL.md`, not `skill.md`

**Date:** 2026-07-28
**Decision:** All skill definition files use uppercase `SKILL.md`, matching the Agent Skills standard and Claude Code's documented convention.
**Rationale:** The toolkit had used lowercase `skill.md` throughout, which works on Windows only because the filesystem is case-insensitive — on a Mac or Linux machine the skills would not be recognised at all, which is fatal for a toolkit whose stated purpose is to be shareable.

## Business bootstrap is a runbook, not a script or an installed skill

**Date:** 2026-07-28
**Decision:** New-workspace setup lives in `Shareable/BOOTSTRAP.md`, a runbook Claude reads and executes with nothing installed; `Shareable/skills/business-init/` is a thin entry point that reads the same file rather than restating its steps.
**Rationale:** Claude Code runs with zero skills installed, so the bootstrap only needs to be readable — which sidesteps the chicken-and-egg where `ai-toolkit-sync` is the installer but is itself a skill, and keeps the adaptive interview a shell script could not do.

## New workspaces always get all six functions; scope folders are opt-in

**Date:** 2026-07-28
**Decision:** `BOOTSTRAP.md` always creates 00–05 with fixed names and never asks; scope folders are asked about, default to none, apply to functions 01–04 only, and are named by the user in their own words.
**Rationale:** The five-function framework is the toolkit's opinion and every business has all five even when some are thin, so a consistent structure is worth more than flexibility; scope splits are genuinely business-specific — `Company`/`Customer`/`Agent` is service-business-with-a-delivery-network vocabulary and would be wrong for most.

## Skill install collisions stop the bootstrap rather than overwriting

**Date:** 2026-07-28
**Decision:** When installing skills, any existing installed skill of the same name that differs from the source halts the process — the user chooses between a business-prefixed name, skipping the collision, or abandoning; never a silent overwrite.
**Rationale:** `~/.claude/skills/` is global per machine, not per business, so last-sync-wins silently breaks another business's workflow and is discovered weeks later as inexplicable behaviour. This is the safe default regardless of how the broader namespacing question is eventually settled.

## Pipeline skills and agents live in Shareable/ and deploy via ai-toolkit-sync

**Date:** 2026-07-28
**Decision:** The knowledge-work pipeline skills (`/run-cycle`, `/to-brief`, `/to-work-units`) and the reviewer agent are authored in `Shareable/` — `Shareable/skills/` and a new `Shareable/agents/` — and deployed by `/ai-toolkit-sync`; no project-level `.claude/skills/` scope is introduced.
**Rationale:** The project is copied into a new business folder for each new business, so `Shareable/` is the distributable artifact and must stay the single source of truth that syncs outward; anything living only in a workspace's `.claude/` sits outside the project folder and would not travel with the copy.
**Supersedes:** none — reinforces "Three skill scopes with _skills/ convention"

## Memory system requires no lint tooling

**Date:** 2026-06-29
**Decision:** The memory system requires no maintenance tooling — it is a pointer layer, not a compiled knowledge base.
**Rationale:** Memories point to scaffold files rather than accumulating content; the scaffold files are already maintained by `/project-wrap-up`, so no separate lint or compilation steps are needed.

## Always assign project ID on scaffold migration

**Date:** 2026-06-29
**Decision:** Generate and register a 6-character project ID whenever a project is migrated to the scaffold standard, not only during project-init.
**Rationale:** Projects should be fully registered in projects.json as part of migration so the dashboard is immediately accurate; leaving IDs unassigned creates a follow-up action that is easy to forget.

## _archived/ replaces Active/Archived Projects folders

**Date:** 2026-06-29
**Decision:** Active projects sit directly under the function root (or scope folder for 01–04); `_archived/` at function level replaces `Archived Projects/`; `Active Projects/` wrapper is dropped entirely.
**Rationale:** Removes an unnecessary nesting level, makes archived state a single special folder rather than two sibling wrappers, and aligns 00/05 with the flatter structure already used in 01–04 scopes.

## Scope folders retained for 01–04 functions

**Date:** 2026-06-29
**Decision:** `Company/`, `Customer/`, and `Agent/` scope sub-folders are kept within functions 01–04; scope is dropped from the path on archive (project moves to `[function]/_archived/`) but preserved in `projects.json` metadata.
**Rationale:** Scope conveys who the work serves and is useful for navigation while a project is active; once archived it is retired from daily use so flattening the path is acceptable.

## PreCompact hook over SessionEnd for memory preservation

**Date:** 2026-06-14
**Decision:** Implement a PreCompact hook (PowerShell, no Python dependency) rather than a SessionEnd hook with Claude Agent SDK for memory preservation.
**Rationale:** The PreCompact hook injects memory into compaction context with no per-session API cost and no external package dependencies, which fits the solopreneur low-friction goal.
**Finding:** PreCompact hook closes a memory gap

## /project-wrap-up over automated SessionEnd for session state saving

**Date:** 2026-06-14
**Decision:** Use an explicit `/project-wrap-up` skill for end-of-session saves rather than a fully automated SessionEnd hook calling the Claude Agent SDK.
**Rationale:** Adrian manages session length deliberately and is already pausing to decide to end, so one command is sufficient and avoids per-session API cost and transcript-analysis reliability risk.
**Supersedes:** /wrap-up skill over automated SessionEnd for session state saving

## Skills do not auto-commit

**Date:** 2026-06-14
**Decision:** Skills update project files but do not stage or commit to git.
**Rationale:** Adrian commits manually so he can review the diff and write the commit message himself; this applies to all skills.

## _ai/ folder for scaffold files

**Date:** 2026-06-28
**Decision:** All scaffold files (tasks.md, decisions.md, findings.md, facts/, task-prds/) live in `_ai/` subfolder, not at project root.
**Rationale:** Keeps the project root clean — CLAUDE.md and human-readable outputs at top, AI working machinery below; enables facts/ and task-prds/ without cluttering root.

## _ai/facts/ graduation system adopted

**Date:** 2026-06-28
**Decision:** decisions.md is a working set; settled, skill-enforced decisions graduate to `_ai/facts/[topic].md` with a one-liner pointer in CLAUDE.md ## Facts.
**Rationale:** Prevents decisions.md from becoming a graveyard of stale choices; graduated facts are only loaded when that type of work is active, reducing context noise.

## _assets/ convention applies at all levels

**Date:** 2026-06-29
**Decision:** The `_assets/` naming convention applies at workspace, function, and project levels — not just project level.
**Rationale:** Consistent underscore prefix throughout the hierarchy avoids ambiguity between `Assets/` and `_assets/` at any level; all CLAUDE.md files and project docs updated to reflect this.
**Supersedes:** _assets/ naming convention

## Hooks live in `_system/hooks/`

**Date:** 2026-06-29
**Decision:** The workspace hooks folder lives at `_system/hooks/`, not at the workspace root.
**Rationale:** Consolidates all workspace infrastructure under `_system/`; hook path updated in `settings.local.json` and `Shareable/hooks/settings-example.json`.

## Function roots include `_assets/`, `_archived/`, `_skills/`

**Date:** 2026-06-29
**Decision:** Every function root (00–05) must contain `_assets/`, `_archived/`, and `_skills/` folders.
**Rationale:** Formalises the function-level scaffold standard; previously absent from most function roots, causing inconsistency across the workspace.

## Project definition rule

**Date:** 2026-06-30
**Decision:** A folder is a project if it is a code repository (one repo = one project) or a coordination wrapper with its own CLAUDE.md used for planning and decomposition.
**Rationale:** Provides a clear, unambiguous rule for what gets registered in projects.json — eliminates ambiguity about sub-tools within a repo and wrapper-vs-child relationships.

## Path hierarchy over parent_id in projects.json

**Date:** 2026-06-30
**Decision:** projects.json uses no parent_id field; parent-child relationships between wrapper and child projects are implicit in the path.
**Rationale:** Path already encodes the relationship; parent_id would create a denormalised field that could drift and is not needed by any current skill.

## Child briefs live in child task-prds

**Date:** 2026-06-30
**Decision:** When a wrapper project decomposes a feature PRD, each child-project brief is saved to `[child-project]/_ai/task-prds/[feature-name].md`.
**Rationale:** Co-locates the brief with the child session's working context — the child session can reference it directly in /grill-with-docs without a cross-project path.

## Developer projects get /setup-matt-pocock-skills open task

**Date:** 2026-06-30
**Decision:** project-init Developer scaffold includes a default open task to run /setup-matt-pocock-skills for issue tracker, triage labels, and domain docs.
**Rationale:** Ensures each new code repo gets the Matt Pocock engineering scaffold without coupling project-init to that skill — the task is a reminder, not automation.

## Wrapper feature workflow is decomposition-only

**Date:** 2026-06-30
**Decision:** Coordination wrapper projects use a two-session Feature Workflow: wrapper runs /grill-me-as → decompose → save child briefs; each child repo runs the standard Developer Feature Workflow independently.
**Rationale:** Wrappers do planning and decomposition, not design or code — running the full Developer workflow at wrapper level would produce PRDs and issues in the wrong project context.

## Three skill scopes with _skills/ convention

**Date:** 2026-06-28
**Decision:** Skills exist at three scopes — global (Shareable/), function-scoped ([function]/_skills/), and project-scoped ([project]/_skills/).
**Rationale:** Formalises an existing pattern (project-scoped skills already used in HotIron); the /new-skill entry point and /ai-toolkit-sync deployment make the convention explicit and friction-free.

## README.md dropped from mandatory scaffold; replaced by conversational kickoff

**Date:** 2026-07-23
**Decision:** README.md is no longer a required project-init deliverable or dashboard link. A new `/project-start [name]` skill gives a conversational kickoff brief instead — read `## Playbook` (if present) → open items in `_ai/tasks.md` → un-triaged `## Inbox` items.
**Rationale:** The actual pain point was "I have to dig into the project to remember what to do," not "there's no document" — a conversational brief you can drill into beats a document you have to remember to open. Existing README.md files (e.g. Google Ads Optimisation) are not deleted; a project's `## Playbook` pointer can still reference one where it already exists.

## `## Playbook` section added to CLAUDE.md template for recurring projects

**Date:** 2026-07-23
**Decision:** Recurring/periodic projects get an explicit `## Playbook` section in CLAUDE.md, holding a cadence line (descriptive text, e.g. "1st and 15th of each month" — not a day-count, since cadences aren't uniform intervals) plus either inline steps (short routines) or a pointer to a separate file (long/technical routines, e.g. README.md + Processes/). Absence of the section is the signal a project has no routine — `/project-start` just falls back to `tasks.md`.
**Rationale:** Playbook content (sequence of actions, often outside Claude) is a different kind of thing from CLAUDE.md's existing state/facts content (Scope, Working Instructions, Facts) — folding it into prose would bloat every session's context for routine that's only relevant at kickoff. Threshold for inline-vs-file is "outside-Claude steps or >~5 steps."

## `/project-wrap-up` auto-queues the next cycle for routine projects

**Date:** 2026-07-23
**Decision:** When `/project-wrap-up` runs on a project with a `## Playbook` cadence and the task just completed represents a full cycle (per existing tasks.md tracking, e.g. "all 15 posts published"), it computes the next occurrence from the cadence text and adds it to `_ai/tasks.md ## Open`. Partial-cycle completion (e.g. some but not all GBP areas posted) leaves the current cycle's task open instead.
**Rationale:** Formalises a pattern the model was already doing correctly by inference (GBP Posting Engine's tasks.md already says "Ready for the next bi-weekly run") into an explicit checked step, removing the risk of a future session skipping or miscalculating it. Keeps the workflow pull-based — no calendar pings, just the next task waiting when the user opens the project.

## `/project-start` reads Playbook, then tasks, then Inbox — in that order

**Date:** 2026-07-23
**Decision:** `/project-start [name]` presents, in order: (1) the `## Playbook` brief if present — cadence, next step, entry point; (2) open items from `_ai/tasks.md`; (3) un-triaged `## Inbox` items from `/grilling-handoff`. Collapsed into one brief, not three separate dumps.
**Rationale:** The routine is the primary thing the user forgets and the main reason this skill exists; tasks and inbox items are secondary context so kickoff isn't blind to a stuck item, but shouldn't bury the routine under a task list. Symmetric pairing with `project-init` (create) and `project-wrap-up` (end session).

## `_assets/` requires a `.gitkeep` in the standard scaffold

**Date:** 2026-07-24
**Decision:** `project-init`'s standard scaffold now creates `_assets/.gitkeep`, not a bare empty `_assets/` folder.
**Rationale:** Git cannot track empty directories, so a bare `_assets/` was invisible to git from creation and silently vanished (e.g. on `git clean`) — an `/ai-toolkit-sync full` audit found it missing on 5 otherwise-conforming projects. Matches the existing `.gitkeep` convention already used for `_skills/`, `_ai/facts/`, and `_ai/task-prds/`.
**Finding ref:** `_assets/` had no `.gitkeep` in the standard scaffold spec — 5 projects lost the folder

## `ai-toolkit-sync` updates installed hook slugs without overwriting the whole file

**Date:** 2026-07-24
**Decision:** When `/ai-toolkit-sync` finds a project-specific installed hook (e.g. `pre-compact.ps1`) whose configured value (project slug) has drifted from reality, it corrects that value in place rather than overwriting the file with the generic `Shareable/hooks/` template.
**Rationale:** The generic Shareable template intentionally uses a `<YOUR-PROJECT-SLUG>` placeholder for public reuse — overwriting the installed copy with it would replace a working value with a non-functional placeholder. A stale slug (found this session — the hook pointed at the pre-folder-rename project path and had likely injected no memory into compaction since 2026-06-29) needs a targeted correction, not a template overwrite.
**Finding ref:** PreCompact hook was silently broken since the workspace folder rename


## `project-wrap-up` reads swimlane keys from `business-functions.json` instead of hardcoding them

**Date:** 2026-08-12
**Decision:** The `function` schema rule no longer lists the six Hot Iron swimlane keys. It names
`_system/dashboard/data/business-functions.json` as the source and instructs the agent to read it,
since each workspace defines its own. The HotIron dev-copy path (`01 - Create Value/Company/
HotIron.Business.Dashboard/data/projects.json`) is likewise replaced by a glob for a second
`projects.json` anywhere in the workspace.
**Rationale:** The hardcoded keys were the reason Holmes.Administration had to fork this skill — its
swimlanes are `PM`/`Work`/`Financial`/`Family`/`Personal`/`Health`, not `Cross-Function`/`Create-Value`/
etc. The environment is a source of truth, and a document restating it is a cache that only earns its
load when the lookup is expensive; here the lookup is one JSON file the dashboard already maintains.
With both hardcodes gone, one version of the skill is correct in every workspace and the fork
dissolves — all five live copies are now byte-identical.
**Finding ref:** Holmes.Administration had a forked copy solely to carry different swimlane keys

## `project-wrap-up` counted open tasks before updating them

**Date:** 2026-08-12
**Decision:** The dashboard registry update moves from step 2b to Step 7, after `_ai/tasks.md` is
updated, and its `open_tasks` rule now reads "as Step 2 left it".
**Rationale:** A correctness bug, not a style point. Step 2b counted `- [ ]` items in `## Open` and
wrote that number to `projects.json`; step 3 then marked tasks done and added new ones. Every run wrote
a count that was stale by one step, so the dashboard's open-task figure was always the *previous*
session's. Found during a `writing-for-agents` review.

## `project-wrap-up` restructured against `writing-for-agents`

**Date:** 2026-08-12
**Decision:** Ten steps numbered 1–9 plus a typing gate, replacing the `1, 2, 2b, 3, 3b, 4, 4b, 5, 6, 7`
sequence; a completion criterion on every step; the Standard/Developer branch resolved once in a table
at the top instead of re-litigated at six separate steps; `Rules` deleted, its two live bullets moved
into the intro and Step 9; the `Quick Start` block and the `<YOUR-PROJECT-SLUG>` lookup instructions
dropped.
**Rationale:** The `b` suffixes read as subordinate when 2b, 3b and 4b each perform their own writes.
No step carried a completion criterion, and this skill runs at end of session — the point of lowest
energy and highest context pressure — which is where premature completion is most likely. The
`<YOUR-PROJECT-SLUG>` lines addressed a human in an agent-facing document, and Claude Code already
holds the memory path in context.
