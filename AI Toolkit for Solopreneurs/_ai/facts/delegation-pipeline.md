# Facts: Delegation Pipeline

**Load when:** designing, changing, or debugging the knowledge-work delegation pipeline; deciding whether a project should delegate; writing or reviewing an `_ai/acceptance.md`.

---

## Knowledge work needs a manufactured verifier

Four properties make `/implement` run unattended on developer projects: a written contract per unit of work, units sized to one fresh context window, an external queue a cold agent can pick up, and **a verifier that is not the human**. The fourth is the binding constraint. Code ships with a machine oracle — tests, typecheck. Knowledge work does not, so one has to be built.

**Full detail:** The manufactured verifier is `_ai/acceptance.md` plus the `knowledge-reviewer` agent. The acceptance file has four checkable sections — Structure, Must, Never, Data — and a fifth, `## Human gate`, listing judgements deliberately left unreduced. Every entry is an *extraction* from the project's existing Working Instructions and Key Decisions, not an invention; entries cite where they came from. An entry that cannot be verified by reading the artifact and its sources belongs under Human gate.

The reviewer must be a separate agent that did not write the artifact and receives nothing about how it was made. An author checking its own work against its own reading of the brief is not a verifier.

**Original decision:** "Pipeline skills and agents live in Shareable/ and deploy via ai-toolkit-sync" — 2026-07-28
**Rationale:** `Shareable/` is the distributable artifact — the toolkit is copied into a new business folder per business — so anything living only in a workspace `.claude/` would not travel with the copy.

---

## Two pipelines, selected by the project's `## Type`

**Pipeline B — Ongoing/routine projects.** These already have a spec: the `## Playbook` plus any `Processes/`. They do not need re-grilling each cycle. One skill, `/run-cycle`, expands the routine over its natural unit, fans out one cold producer per unit, reviews each output, and returns an exception report.

**Pipeline A — Defined Goal projects.** The direct Matt Pocock analogue: `/grill-me-as` → `/to-brief` → `/to-work-units` → `/run-work`. Run once per feature rather than per cycle.

**Full detail:** Single-unit projects (Google Ads Optimisation, Google Analytics Review — one report per month, no fan-out) still go through Pipeline B. They gain nothing from parallelism and everything from the verifier. Assessment of every active project is in `_ai/pipeline-qualification.md`; roughly a quarter qualify, and 14 of the non-qualifiers are Developer projects already served by the Matt Pocock pipeline.

---

## The human keeps three touchpoints, and the publish button is one of them

Adrian approves the work-unit breakdown (or the acceptance file, once per project), reads the exception report, and presses publish on anything outward-facing.

**Full detail:** Drafting and reviewing are delegated; publishing is not. Code that fails a test fails loudly — a knowledge artifact that is plausible and wrong simply goes out to a customer, a Google Business Profile, or the website. `/run-cycle` produces reviewed drafts and stops; it does not archive, update `_ai/tasks.md`, or publish. Two of the five qualifying Pipeline B projects (GBP Posting Engine, Automated Customer Reviews) publish externally and stay publish-gated permanently.

Producers get exactly one revision pass from the reviewer's findings; a second failure escalates to the exception report. Two strikes bounds the cost of a unit going nowhere and stops a producer/reviewer pair converging on confident nonsense.

**Do not read passing artifacts to "just check."** That reintroduces the bottleneck the pipeline removes. Distrust of the passes means the acceptance file is too weak — fix the checks.

---

## Producers start cold, and that is the test of a work unit

Each producer subagent receives its work unit, `_ai/acceptance.md`, the project `CLAUDE.md`, and its input paths — nothing from the orchestrating conversation.

**Full detail:** If a producer needs conversation context to work, the work unit is written wrong. The fix is the unit, never a richer prompt to the producer. This is what lets the pipeline scale past one context window, and it is why `/to-work-units` refuses to write files until the breakdown is approved — an unapproved breakdown produces units nobody has checked are self-contained.
