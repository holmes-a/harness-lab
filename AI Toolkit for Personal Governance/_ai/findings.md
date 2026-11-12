# Findings — AI Toolkit for Personal Governance

## The idea-arbitration rate is about one a year
**Date:** 2026-08-10 · **Source:** Greenfield grilling · **Status:** Open
Asked to name decisions from the last twelve months this system would have changed, Adrian named one:
Localix. The value it would have delivered was **shelving it sooner** — speed of rejection, not
quality of deliberation.

A five-seat cabinet with two blind rounds is sized for a decision stream that does not exist. The cost
per sitting is what would kill attendance, and the prior design's triage gate is a partial admission
of this.

## People sit on a gradient of influence, and it changes what a commitment even is
**Date:** 2026-08-10 · **Source:** Greenfield grilling · **Status:** Open
Adrian, on who the system should represent: **children** — jointly responsible, most influence.
**Lucy** — wife, shared resources including all money, but "I'm not responsible for her actions, I can
suggest but not enforce". **Friends** — same as Lucy but with even less influence.

The axis that varies is not the domain (personal vs professional) but **how much agency Adrian has**,
and that determines what kind of advice is useful: plan and commit · negotiate and align · influence
and adapt. Separately, Adrian wants the system to *advise on relationships* — personal and
professional both — which is a capability he wants, not a representation problem. The two should not
be solved with the same mechanism.

## Adrian already knows what adds value
**Date:** 2026-08-10 · **Source:** Greenfield grilling · **Status:** Open
"Doing the things you know add value" — the system is not being asked to *discover* what matters. It
is being asked to make sure the known-valuable things actually get attention. That is an attention
problem, not an analysis problem, and the two want very different machines.

## `_system/dashboard/data/projects.json` is empty while an active project exists
**Date:** 2026-08-12 · **Source:** `routine` skill review · **Status:** Open
The file parses as `[]`. `AI Toolkit for Personal Governance` is an active project sitting in `PM/` and
has no record in it, and its `CLAUDE.md` carries no `## Project ID` section for one to key against.

Two things are blind as a result: the dashboard, and `routine`'s first source. `project-init` Step 6
registers projects it creates, so the mechanism works — this project predates the registry and was
never back-filled.

## The brief designates `grill-me-as` the grilling engine, and two skills reimplement it
**Date:** 2026-08-12 · **Source:** `opposition` skill review · **Status:** Open
Brief §8's reuse map lists `grill-me-as` as "the engine under every grilling step. Do not reimplement".
`opposition` Step 3 and `idea` Step 2 both state their one-question-at-a-time cadence inline instead.

The repo's copy at `.claude/skills/grill-me-as/` is committed, so §6.5's stale-fork rule does not apply
to it — that rule bites only on `grilling`, which is genuinely absent from the repo. The copy has been
de-Saturned relative to the `~/.claude/` fork, but every role it names is still a business role and its
Step 1 reads the workspace `CLAUDE.md` "to understand the business", in a workspace where work is one
department of five. It also has no `Shareable/` source, making it the one skill outside the
source-of-truth rule.
