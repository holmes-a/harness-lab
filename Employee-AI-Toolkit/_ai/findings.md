# Findings

<!-- Entry format:
## [Short title]
**Date:** YYYY-MM-DD
**Finding:** [one sentence — factual, not interpretive]
**Source:** [test result / analysis / external research / user feedback]
**Status:** Open | Actioned | Superseded
**Decision:** [ref to decisions.md entry, once made — or omit]

Pruning rule: Keep all Open findings. Remove Actioned or Superseded findings after one
full project-wrap-up cycle has passed (i.e., written in a prior session). Once a finding has a
Decision reference and the decision is stable, the finding has served its purpose.
-->

## workspace-init interview must cover five core context categories

**Date:** 2026-06-16
**Finding:** Analysis of Adrian's legacy agent configs identified five information categories that define useful AI context for a Saturn employee — these are the categories `workspace-init` must elicit via interview, regardless of whether the employee has any prior AI setup.
**Source:** Analysis of legacy files in `assets/legacy-agent-configs/` — multiple role-specific agent configs across ChatGPT and M365 Copilot; files have no fixed format and many employees will start with nothing.
**Status:** Open

**Detail:** The five categories:
- **Role scope & responsibilities** — what the role covers, what decisions it owns
- **Tech environment** — stack, cloud provider, tooling, architecture patterns
- **Working style & output format** — tone, format defaults, audience calibration
- **Domain-specific context** — e.g. compliance scope, ISMS boundaries, security obligations
- **Org structure** — team composition, reporting lines, stakeholder landscape

`workspace-init` must derive all of this from conversation — it cannot assume any prior documents exist.

**Decision:** —

## PreCompact additionalContext visibility during compaction unconfirmed

**Date:** 2026-06-12
**Finding:** It is unconfirmed whether the PreCompact hook's `additionalContext` payload is visibly surfaced to Claude during compaction or runs silently in the background.
**Source:** Observation at hook setup — not yet tested under real compaction conditions
**Status:** Open

## Solopreneur scaffold pattern validated by parallel development

**Date:** 2026-06-15
**Finding:** The `decisions.md` + `findings.md` + `/project-wrap-up` scaffold was independently developed and tested in a live solo business context, confirming its practical viability before adoption here.
**Source:** AI Toolkit For Solopreneurs project review
**Status:** Open

## Session-start project declaration is friction-heavy

**Date:** 2026-06-16
**Finding:** The current `@` path-navigation approach to declaring a project at session start is unreliable — the folder picker doesn't consistently surface the right options, and it requires navigating the folder hierarchy rather than just naming the project.
**Source:** Session design discussion — a lightweight name-to-path mapping (separate from `projects.json`, excluding archived projects) would allow free-text project naming at session start without loading heavy data.
**Status:** Open

## Hook comparison algorithm produces false positive on personalised lines

**Date:** 2026-06-20
**Finding:** The non-placeholder line comparison filters lines in the Shareable copy that contain `<YOUR-`, but the corresponding personalised line in the installed copy (e.g. `$projectSlug = "C--Work-Saturn-AdrianHolmes"`) does not contain `<YOUR-` and is therefore included — causing a 1-line offset that reports as DRIFTED_STRUCTURAL even when the hook is correctly personalised.
**Source:** Sync run — all non-placeholder lines after the personalised slug line appeared misaligned; content was structurally identical.
**Status:** Open

