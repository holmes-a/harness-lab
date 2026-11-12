# Findings

<!-- Entry format:
## [Short title]
**Date:** YYYY-MM-DD
**Finding:** [one sentence — factual, not interpretive]
**Source:** [test result / analysis / external research / user feedback]
**Status:** Open | Actioned | Superseded
**Decision:** [ref to decisions.md entry, once made — or omit]

Pruning rule: Keep all Open findings. Remove Actioned or Superseded findings after one full project-wrap-up cycle has passed.
-->

## A per-machine global deploy target does not survive a per-business toolkit

**Date:** 2026-07-28
**Finding:** `/ai-toolkit-sync` deployed skills to `~/.claude/skills/`, which is global per machine, not per business. Copying the toolkit into a new business folder per business meant two businesses on one machine would deploy two different `project-init` skills to the same name, last sync winning.
**Source:** Brief A unit A2 source audit (2026-07-28)
**Status:** Actioned — resolved by moving the deploy target to the workspace `.claude/skills/`, committed to git. Toolkit skills are business-coupled, so the personal install was the wrong shape and collisions were its symptom rather than the problem itself.
**Decision:** Toolkit skills deploy to the workspace `.claude/skills/`, committed to git

## Six toolkit skills were being shadowed by the Saturn install

**Date:** 2026-07-28
**Finding:** Claude Code resolves skills **personal over project** — `~/.claude/skills/foo` wins over `.claude/skills/foo` — the opposite of what was initially assumed from the Skill tool's description of nested directory-scoped skills, which is a different mechanism. Confirmed against the Claude Code documentation, then verified live: after deploying the toolkit to `HotIron.Business/.claude/skills/`, six skills still loaded Saturn Visual Solutions' versions inside the Hot Iron workspace — `grill-me-as`, `grilling-handoff`, `project-init`, `project-migrate`, `project-update`, `project-wrap-up`. The session's skill list showed Saturn's descriptions ("Saturn role", "Saturn scaffold framework", `Assets/` rather than `_assets/`) for exactly those six, while the eight non-colliding skills showed Hot Iron's.
**Source:** Live verification during the workspace-deploy migration (2026-07-28)
**Status:** Open — the deploy is done, but the six personal copies still shadow it on this machine and presumably on the main PC. Procedure to clear them is in `_ai/task-prds/migration-skills-to-workspace.md`, to be run on the main PC. The failure is silent: editing a shadowed skill appears to do nothing, with no error, and the natural conclusion is that the edit was wrong rather than that it never loaded.
**Decision:** Personal-level skills shadow workspace ones, so migration must delete the personal copies

## Toolkit skill files were named `skill.md`, which would fail on Mac or Linux

**Date:** 2026-07-28
**Finding:** Every toolkit skill used lowercase `skill.md`. The Agent Skills standard and Claude Code's documentation both specify `SKILL.md`, and the working Matt Pocock skills on this machine all use uppercase. The toolkit worked on Windows only because NTFS is case-insensitive; on a Mac or Linux machine the skills would not be recognised at all.
**Source:** Noticed while deploying to `.claude/skills/` and comparing against the installed Matt Pocock skills (2026-07-28)
**Status:** Actioned — all 14 source files renamed to `SKILL.md` via two-step `git mv` (necessary because `core.ignorecase` is true, so a direct case-only rename is invisible to git), and every reference updated. Worth noting for a toolkit whose stated purpose is to be shareable: this class of bug is invisible on the machine it was written on.
**Decision:** Skill files are named `SKILL.md`, not `skill.md`

## Workspace templates drifted three conventions behind the live workspace

**Date:** 2026-07-28
**Finding:** `Shareable/templates/root-CLAUDE.md` and `function-CLAUDE.md` still described `Active Projects/` and `Archived Projects/` — dropped on 2026-06-29 — and neither mentioned the `_ai/` scaffold layout, scope folders, or the `.gitkeep` rule. The 2026-06-29 restructure updated the live workspace and the skills but not the templates. Because nothing reads a template until a new function or workspace is created, the drift was silent and would have first surfaced when Adrian set up his next business from this toolkit.
**Source:** Brief A unit A2 source audit (2026-07-28)
**Status:** Actioned — both templates rewritten to the current standard; `new-skill`'s example path corrected. Unit A4 adds an automated check so template drift is caught by `/ai-toolkit-sync` rather than by luck.

## MEMORY.md index pattern validated by external design

**Date:** 2026-06-14
**Finding:** The coleam00/claude-memory-compiler independently converged on the same index-first retrieval pattern used in MEMORY.md, confirming it outperforms vector similarity at personal KB scale (50-500 articles).
**Source:** External research — coleam00/claude-memory-compiler AGENTS.md
**Status:** Open

## No function-init skill exists to scaffold standard function folders

**Date:** 2026-06-29
**Finding:** Function folders (00–05) accumulated missing `_assets/`, `_archived/`, and `_skills/` folders because no skill exists to initialise or audit function-level structure — there is only `project-init`.
**Source:** Structure audit (2026-06-29) — discovered all six function roots were missing at least one standard folder
**Status:** Open — consider whether a `function-init` or `workspace-audit` skill should be created to enforce this going forward

## 7 Automated Workflow Solution child repos were unregistered

**Date:** 2026-06-30
**Finding:** The 7 child repositories under Automated Workflow Solution were not registered in projects.json — discovered when investigating whether 4th-level paths were causing workflow issues.
**Source:** Session analysis (2026-06-30)
**Status:** Actioned — all 7 registered with Developer type (2026-06-30)
**Decision:** Project definition rule

## HotIron.Tools incorrectly split into two project entries

**Date:** 2026-06-30
**Finding:** HotIron.Tools (a single repository containing AdsReports, AnalyticsReports, and GaLocations sub-tools) was registered as two separate projects, violating the one-repo-one-project rule.
**Source:** Session analysis (2026-06-30)
**Status:** Actioned — collapsed to one entry (ar5m9p, renamed HotIron.Tools at correct path)
**Decision:** Project definition rule

## setup-matt-pocock-skills already installed globally

**Date:** 2026-06-30
**Finding:** setup-matt-pocock-skills skill was already present at `~/.claude/skills/` despite Glob failing to locate it — Read tool found it by direct path.
**Source:** Session discovery (2026-06-30) — Glob search returned no results; Read succeeded
**Status:** Open — Glob limitation with skills directory should be noted; no install action needed

## CLAUDE.md Status field can drift from actual project state

**Date:** 2026-06-29
**Finding:** Agent Bio Update had `Status: Active` in CLAUDE.md but `status.md` recorded it as complete since 2026-05-30 — the status field was never updated when the project finished.
**Source:** Scaffold migration — Batch C (2026-06-29)
**Status:** Open — consider whether `/project-wrap-up` should prompt to update Status if tasks.md shows all done

## Root CLAUDE.md's embedded "Project CLAUDE.md Template" is stale

**Date:** 2026-07-23
**Finding:** The template block at `CLAUDE.md` lines 95–114 (root, live workspace file) is an old, much simpler version than `Shareable/templates/project-CLAUDE.md` — missing `## Goal`, `## Business Function`, `## Context`, `## Project ID`, `## Type`, `## Playbook`, `## Facts`, `## Project Files`, and `## Entry Standards` entirely. Discovered while adding `## Playbook` to the real template.
**Source:** Session work — Playbook rollout (2026-07-23)
**Status:** Actioned — replaced with a pointer to `Shareable/templates/project-CLAUDE.md` (2026-07-28, Brief A unit A5). The pointer explains *why* the copy was removed, so a future session does not helpfully paste it back.

## PreCompact hook was silently broken since the workspace folder rename

**Date:** 2026-07-24
**Finding:** The installed `_system/hooks/pre-compact.ps1` had the project slug hardcoded to `C--Enterprise-Projects-Active-HotIron-Business` — the pre-"Active Projects wrapper drop" workspace path. The live memory folder is `C--Enterprise-HotIron-Business`. The hook has likely been injecting no memory (or the wrong project's) into every compaction since that rename (2026-06-29).
**Source:** `/ai-toolkit-sync` full run, hooks phase (2026-07-24) — diffed installed hook against `Shareable/hooks/pre-compact.ps1`
**Status:** Actioned — slug corrected in the installed hook; verified it now returns ~16KB of memory context. `Shareable/hooks/pre-compact.ps1` itself is correct as-is (a generic `<YOUR-PROJECT-SLUG>` placeholder is intentional for a public template, not drift).
**Decision:** ai-toolkit-sync updates the slug in project-specific installed hooks without overwriting them with the generic Shareable template

## ai-toolkit-sync's own path references were stale

**Date:** 2026-07-24
**Finding:** `_skills/ai-toolkit-sync/skill.md` (both source and installed copy — they matched, so the bug was in the source itself) referenced the pre-2026-06-29 `00 - Cross Function/Active Projects/AI Toolkit for Solopreneurs/` path throughout, plus an `Archived Projects/` exclusion that should be `_archived/`.
**Source:** `/ai-toolkit-sync` full run (2026-07-24) — noticed while resolving the skill's own Shareable path
**Status:** Actioned — all path references corrected in source and redeployed to installed

## `_assets/` had no `.gitkeep` in the standard scaffold spec — 5 projects lost the folder

**Date:** 2026-07-24
**Finding:** `project-init`'s standard scaffold created `_assets/` as a bare empty folder with no `.gitkeep`, unlike `_skills/`, `_ai/facts/`, and `_ai/task-prds/` which all explicitly get one. Git cannot track empty directories, so the folder was invisible to git from creation and vulnerable to disappearing entirely (e.g. `git clean`). Audit found it missing on disk for 5 otherwise-conforming projects: Service Pages, Automated Customer Reviews, Google Ads Optimisation, Liverpool Customer Share, New Agent Launch. Also found: `HotIron.Business.Dashboard` missing `_skills/` entirely (predates the Batch C `_skills/.gitkeep` backfill) and `Google Ads Location IDs` missing `_ai/decisions.md` + `_ai/findings.md` (predates `project-init` altogether).
**Source:** `/ai-toolkit-sync full` audit phase (2026-07-24)
**Status:** Actioned — `project-init` REFERENCE.md now specifies `_assets/.gitkeep`; all 7 affected projects backfilled and re-verified conforming

## Project path casing drift: "Solopreneurs" vs actual "solopreneurs"

**Date:** 2026-07-24
**Finding:** The real folder is `00 - Cross Function/AI Toolkit for solopreneurs/` (lowercase "s"), but `projects.json` (both live and dev copies) and the project's own memory pointer file recorded it as `AI Toolkit for Solopreneurs`. `HotIron.Business.Dashboard`'s CLAUDE.md deploy instructions had the same wrong casing. Harmless on Windows (case-insensitive filesystem) but wrong data.
**Source:** Noticed while updating projects.json during `/project-wrap-up` (2026-07-24)
**Status:** Actioned — corrected in both projects.json copies, the memory pointer, and HotIron.Business.Dashboard's CLAUDE.md

## knowledge-reviewer caught eight violations beyond the two deliberately planted

**Date:** 2026-07-28
**Finding:** The B3 reviewer agent was tested against an Exeter review with two planted defects (a missing `## Local Listings` section, and laundry keywords for an area where `IsLaundry = FALSE`). It caught both, plus eight further real violations: an empty scorecard cell, a missing zone-variance paragraph, a fabricated competitor ("Devon Laundry Services" — verified absent from the actual July GBP audit CSV, where the real #2 is Silver Spin), four untraceable figures caught by cross-checking June's review, a multi-paragraph re-analysis of an already-logged structural finding, and a cross-area action written into an area review. It correctly parsed the `areas.csv` column offset (noting the `TRUE` in position 9 is `KeyLocation`, not `IsLaundry`), correctly declined to judge figures it could not verify because the PDFs would not render, and correctly did *not* flag a single-line acknowledgement of a known finding.
**Source:** Brief B unit B3 test run (2026-07-28)
**Status:** Actioned — reviewer validated. Two caveats for the pilot: (1) the agent needs a Claude Code session restart before `subagent_type: knowledge-reviewer` resolves, so the first real run must happen in a fresh session; (2) PDF rendering was unavailable in the test environment, so the reviewer could not verify figures sourced from the BrightLocal PDFs — on the main PC, confirm a PDF reader is available or the traceability check degrades to CSV-only.

## Exeter GBP review count appears to be 2, not the figure implied by prior reporting

**Date:** 2026-07-28
**Finding:** While verifying a test artifact, the reviewer read `exeter-google-business-profile-audit-2026-07.csv` and found The Hot Iron recorded with a review count of 2 (5.0 stars) on every tracked keyword, consistent with June's review scoring Reviews as "Fair" at 2 reviews. Noted here because Exeter's review volume is far below other areas (Leicester: 76) and may warrant attention in its own right.
**Source:** Incidental discovery during Brief B unit B3 reviewer test (2026-07-28)
**Status:** Open — not investigated; belongs to Local Search Optimisation rather than this project. Surface at the next Local Search cycle.

## Three overlapping interview skills are installed — consolidation proposed, not executed

**Date:** 2026-07-28
**Finding:** Three skills run an interview loop: `grilling` (Matt Pocock, model-invoked, the generic relentless-interview loop), `grill-me` (Matt Pocock, also present as a workspace command at `.claude/commands/grill-me.md`), and `grill-me-as` (this toolkit, adds a named-role lens plus — as of today — writing decisions to `_ai/decisions.md` as they resolve). The loop mechanics are restated in each: one question at a time, walk the decision tree, recommend an answer, resolve dependencies in order.
**Source:** Brief B unit B6 (2026-07-28)
**Status:** Open — **proposal, deliberately not executed.** Recommended shape: keep `grill-me-as` as the entry point (it is the one with the role lens and the write-as-you-go behaviour, which is what makes a grilling session produce durable constraints rather than a transcript), and have it delegate the interview loop to `grilling` rather than restating it. That leaves one loop to maintain and one role/writing layer on top. Not done here because `/grill-me-as` is in constant use and the change touches how every planning session behaves — Adrian's call.
