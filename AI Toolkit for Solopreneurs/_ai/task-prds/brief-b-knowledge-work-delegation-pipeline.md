# Brief B — Knowledge-Work Delegation Pipeline

**Created:** 2026-07-28
**Status:** ready-for-agent (units B1–B3); B4 onward blocked as marked
**Depends on:** Brief A Unit A1 only (a broken PreCompact hook degrades any long session, including these)

---

## Working environment — read before starting

This work is being done on a **secondary PC**, checked out solely to edit the AI Toolkit project. Deployment to `~/.claude/skills/` happens later, on Adrian's main PC, when he syncs the branch and runs `/ai-toolkit-sync`. See Brief A's Working Environment section for the full constraint.

For this brief specifically, that splits the units in two:

- **Build here:** B1, B2, B6, B7, and the authoring half of B3, B4, B5 — all of it is files in this repo, which travel with the branch.
- **Verify on the main PC:** anything that invokes a pipeline skill end to end, and the live Local Search Optimisation pilot run.

**Settled — pipeline skills go in `Shareable/skills/` and are deployed by `/ai-toolkit-sync`.** Do not place them in a project-level `.claude/skills/`; do not introduce a fourth skill scope. The three scopes recorded in `_ai/decisions.md` stand.

The rationale is portability, and it outranks the convenience of invoking skills from a fresh checkout. This project is not only Hot Iron's toolkit — Adrian copies it into new business folders when he starts a new business, so `Shareable/` is the **distributable artifact** and must remain the single source of truth that syncs outward to wherever it lands. A skill living in one workspace's `.claude/skills/` would not travel that way and the toolkit would fragment across businesses. Author once in `Shareable/`; let `/ai-toolkit-sync` deploy.

Accepted cost: pipeline skills cannot be invoked end to end from this secondary checkout. Build them here, verify on the main PC after syncing. That is a deferral, not a blocker.

**The same rule applies to agent definitions, and this corrects an earlier draft of B3.** The reviewer agent is *consumed* by the pipeline skills, so it must ship with them. It cannot live only at the workspace `.claude/agents/`: that directory sits at the workspace root, outside the `AI Toolkit for Solopreneurs` project folder, so it would not come along when Adrian copies the project into a new business folder — the skills would deploy and their reviewer would be missing.

So: **source of truth is `Shareable/agents/`; `/ai-toolkit-sync` deploys to the workspace `.claude/agents/`.** Same author-once-sync-outward shape as skills, hooks, and the dashboard. `/ai-toolkit-sync` needs a new agents phase to do this — that is part of B7.

Writing a copy directly to `.claude/agents/` on this machine for testing is fine, because it is the deploy target and it travels with this branch. Just never let it become the only copy.

---

## Problem

On developer projects, Adrian invests in planning (`/grill-with-docs` → `/to-spec` → `/to-tickets`) and implementation runs essentially unattended. On every other project — marketing, sales, delivery, finance — he is in the loop continuously and is the rate limiter.

This is not because knowledge work is inherently less delegable. It is because four properties that make `/implement` autonomous are all absent from the knowledge-work side of the toolkit.

### Why `/implement` runs unattended

| Property | Dev pipeline | Toolkit's knowledge work |
|---|---|---|
| **A written contract per unit of work** — behavioural not procedural, durable against change, with complete acceptance criteria and explicit out-of-scope | The ticket / agent brief | Absent. There is a project-level `## Playbook` and `Processes/`, but nothing at the level of one deliverable. |
| **Units sized to one fresh context window** | Tracer-bullet vertical slices | Absent. Work is scoped as "the monthly run" — 5 areas, or 15 GBP posts — one long conversation. |
| **An external queue a cold agent can pick up** | Issue tracker + `ready-for-agent` label | Absent. Work exists in the conversation. `_ai/tasks.md` is state, not executable units. |
| **A verifier that is not the human** | Tests, typecheck, then `/code-review` | Absent. **Adrian is the verifier.** Every quality judgement routes through him because nothing else can say "this is correct". |

The fourth is the binding constraint. Dev work ships with a machine oracle; knowledge work does not have one, so one has to be manufactured. Everything below is downstream of that.

### What already exists and is better than it looks

The raw material is unusually good. This is a refactor, not a green-field build.

- **`Processes/process-review.md`** in Google Ads Optimisation is already an agent brief in all but name: explicit inputs, numbered rules with numbered trigger conditions, a thresholds table, and a literal output template. A cold agent could execute it today.
- **Output templates already exist** — Local Search Optimisation's CLAUDE.md specifies the review document and summary structures verbatim; GBP Posting Engine specifies post length, CTA label, CTA URL pattern, and image prompt format.
- **Constraints are already written down**, just scattered through `## Working Instructions` and `## Key Decisions` as prose: never reference dry cleaning; never imply full duvet washing; laundry only where `IsLaundry = TRUE`; CTA label is "Book" not "Book now"; never use the URL embedded in a post `.md`; always skip "Copy post".
- **Two projects are already fan-out shaped** — Local Search Optimisation (5 areas × one identical review) and GBP Posting Engine (15 areas × one post). These are embarrassingly parallel and currently run serially with a human gate at every step.
- **The scaffold already carries the right discriminator** — `## Type: Ongoing` vs `Defined Goal` maps exactly onto the two pipelines below.

### What must not be copied from Matt Pocock

- **Do not build or adopt an issue tracker.** Knowledge projects have no repo and no `gh`. Use local markdown files, which the `to-tickets` skill already supports as a first-class option.
- **Do not apply this everywhere.** It pays where work is repeatable and fans out over a natural unit (area, agent, page). Ad-hoc strategy work in `00 - Cross Function` should stay conversational — a delegation pipeline over a one-off memo is pure overhead.
- **Do not delegate the publish action.** Code that fails a test fails loudly. A knowledge artifact that is plausible and wrong gets published to a customer, a Google Business Profile, or the website. Drafting and reviewing are delegable; pressing publish is not.

---

## Outcome

For a qualifying project, Adrian's involvement in a cycle drops from *reviewing every artifact* to three touchpoints:

1. Approving the work-unit breakdown once (or the acceptance file once per project, for routine work)
2. Reading one exception report — only the units that failed review twice
3. Pressing publish on anything outward-facing

---

## Design

### Two pipelines, selected by `## Type`

**Pipeline A — Defined Goal projects** (Service Pages, Targeted Agent Recruitment). The direct Pocock analogue, run once per feature:

```
/grill-me-as [role]  →  /to-brief  →  /to-work-units  →  /run-work  →  /review-work
   (writes as it        (synthesise,    (decompose +      (fan out,     (second agent,
    goes — see B6)       no interview)   HUMAN GATE)       parallel)     never the author)
```

**Pipeline B — Ongoing projects** (Local Search Optimisation, GBP Posting Engine, Google Ads Optimisation, Automated Customer Reviews). These already have a spec — the `## Playbook` plus `Processes/`. They do not need re-grilling every cycle. They need one skill:

```
/run-cycle  →  expands the Playbook over its natural unit, writes work units,
               fans out, reviews, returns an exception report
```

### The manufactured verifier: `_ai/acceptance.md`

This is the load-bearing new artifact. One per qualifying project. It is an **extraction**, not an invention — every entry already exists somewhere in the project's CLAUDE.md prose. Four sections:

- **Structure** — the required sections of the output artifact, in order, from the existing template.
- **Must** — assertions that must hold. *(UK English. Every figure traceable to a named source file. CTA URL is `https://thehotiron.co.uk/ironing-services-in-{area-slug}`. CTA label is exactly `Book`.)*
- **Never** — prohibitions. *(Never reference dry cleaning. Never imply full duvet washing. Never mention laundry where `IsLaundry = FALSE`. Never use a URL embedded in a post `.md` file.)*
- **Data** — the joins and filters that must be performed. *(Join `agent-google-business-profile-reference.csv` to `areas.csv` on `Areas RowKey` = `RowKey`; filter `Is Active = TRUE` and `Can Post on GBP = TRUE`.)*

Every entry must be checkable by reading the artifact and its sources. "Tone should be warm" is not an acceptance check; "no sentence exceeds 25 words and no paragraph exceeds 3 sentences" is. Where a genuine quality judgement cannot be reduced to a check, it belongs in the human's publish gate, not in this file — say so explicitly rather than writing a vague check.

### The reviewer

A subagent definition at `.claude/agents/knowledge-reviewer.md`. It receives the work unit, the project's `_ai/acceptance.md`, and the produced artifact — and nothing about how the artifact was made. It returns `PASS` or a list of specific violations, each naming the check it breaches.

The producer gets **one** revision pass driven by the reviewer's findings. A second failure escalates to the exception report. Two strikes, then a human — this bounds the cost of a unit that is going nowhere and stops a pair of agents converging on confident nonsense.

The reviewer must be a separate agent that did not write the content. An author reviewing its own output against its own reading of the brief is not a verifier.

### Where the human stays — state this in every skill

- Approving the work-unit breakdown (Pipeline A) — the last gate before autonomy, exactly as `/to-tickets` step 4 works
- Approving `_ai/acceptance.md` once per project, and whenever it changes
- The exception report
- **The publish gate** — GBP posts, website copy, customer or agent communications, anything with an external audience. `/run-cycle` produces reviewed drafts and stops.

---

## Work units

### B1 — Qualify the projects

**Blocked by:** none.

Not every project should get this. Assess each active project against four tests and record the result.

**Tests:** (1) does the work fan out over a natural repeated unit? (2) does an output template already exist or could one be written? (3) can its constraints be reduced to checkable assertions? (4) is a wrong output recoverable by re-running, or does it reach a customer?

**Acceptance criteria:**
- [ ] Every active project in `_system/dashboard/data/projects.json` is assessed against the four tests, with a one-line verdict each
- [ ] Each qualifying project is tagged Pipeline A or Pipeline B by its `## Type`
- [ ] Projects that do not qualify are named with the reason — this list matters as much as the qualifying one
- [ ] Saved to this project as a finding or a file under `_ai/`, not left in conversation

**Expected result** (verify, do not assume): Pipeline B — Local Search Optimisation, GBP Posting Engine, Google Ads Optimisation, Automated Customer Reviews. Pipeline A — Service Pages, Targeted Agent Recruitment. Non-qualifying — most of `00 - Cross Function`.

---

### B2 — Write `_ai/acceptance.md` for the pilot project

**Blocked by:** B1.

**Pilot: Local Search Optimisation.** Chosen deliberately: 5 units, monthly, both the review and summary templates already fully specified in its CLAUDE.md, inputs are static files on disk (no API, no auth, no Playwright), the output is an internal review document rather than published copy, and it has a genuine dependency edge — the cross-area summary is blocked by all five area reviews — which exercises the blocking machinery on the first run.

**Acceptance criteria:**
- [ ] `02 - Marketing/Customer/Local Search Optimisation/_ai/acceptance.md` exists with the four sections above
- [ ] Every entry traces to existing text in that project's `CLAUDE.md` or `_ai/findings.md` — cite where each came from
- [ ] Every entry is checkable by reading the artifact and its named sources; no entry requires a taste judgement
- [ ] Judgement calls that resisted reduction are listed under a `## Human gate` heading rather than being forced into a check
- [ ] Adrian approves the file before B4 runs against it

---

### B3 — Build the reviewer agent

**Blocked by:** none (can run alongside B1/B2).

**Acceptance criteria:**
- [ ] Source of truth is `Shareable/agents/knowledge-reviewer.md`; a deployed copy at the workspace `.claude/agents/knowledge-reviewer.md` is what makes it testable here. Both exist and match
- [ ] It has read-only tools — the reviewer must not be able to edit the artifact it judges
- [ ] It hardcodes nothing Hot Iron specific; the acceptance file it is handed supplies all business context
- [ ] Given a work unit, an acceptance file, and an artifact, it returns either `PASS` or violations that each name the specific check breached and quote the offending text
- [ ] It does not suggest improvements beyond the acceptance file — scope creep in a reviewer is how a two-strike loop becomes infinite
- [ ] Tested against a deliberately broken artifact (e.g. a Local Search review with a section missing and a laundry reference for a non-laundry area) and catches both

---

### B4 — Build `/run-cycle` (Pipeline B)

**Blocked by:** B2, B3.

**Desired behaviour:** invoked on an Ongoing project, it reads `## Playbook` and `_ai/acceptance.md`, expands the routine over its natural unit, writes one work unit file per unit to `_ai/work/[yyyy-mm-dd]/NN-[unit].md`, then fans out — one producer subagent per unit, in parallel where no blocking edge exists — and runs the reviewer over each output. Units with a `Blocked by:` edge wait for their blockers.

Work units use the same shape as `/to-tickets`' local template: what to produce, blocked by, acceptance criteria. Reuse that vocabulary rather than inventing a parallel one.

**Location:** `Shareable/skills/run-cycle/` — settled, see Working Environment. It must be written to survive `/ai-toolkit-sync` deployment into *any* business workspace built from this toolkit, so it may not hardcode Hot Iron paths, project names, or the five Local Search areas. It reads what it needs from the target project's `## Playbook` and `_ai/acceptance.md`.

**Before starting:** check whether Local Search Optimisation's input files for a recent month are present in this checkout. If the BrightLocal exports are not committed, the live run defers to the main PC — build the skill and dry-run the work-unit generation only.

**Acceptance criteria:**
- [ ] Running it on Local Search Optimisation writes 6 work units — 5 area reviews plus 1 summary marked `Blocked by: all area reviews`
- [ ] The 5 area reviews run in parallel; the summary runs only after all 5 pass
- [ ] Each producer subagent starts cold — it is given its work unit, the acceptance file, and its input file paths, and nothing from the orchestrating conversation
- [ ] Each artifact is reviewed by the B3 agent; failures get exactly one revision pass, then escalate
- [ ] Output is a single exception report: units passed, units escalated with the reviewer's specific findings, units not attempted and why
- [ ] It stops there. It does not archive files, update `tasks.md`, or publish anything
- [ ] Adrian's involvement in one full run is: invoke it, read the exception report
- [ ] If the live pilot run could not happen on this machine, the summary says so explicitly and lists exactly what Adrian should run first after syncing

**Out of scope:** GBP Posting Engine's Playwright publishing. `/run-cycle` may draft GBP posts later, but publishing stays manual and human-gated.

---

### B5 — Build `/to-brief` and `/to-work-units` (Pipeline A)

**Blocked by:** B3, B4 (B4 proves the fan-out and reviewer machinery on a narrower problem first).

`/to-brief` — synthesises the current conversation into `_ai/task-prds/brief-[slug].md`. No interview; it works from what has already been discussed, exactly as `/to-spec` does. Template: Problem / Outcome / Audience and voice / Deliverables / Constraints (must and never) / Acceptance checks / Out of scope / Source material.

`/to-work-units` — decomposes a brief into `_ai/work/[slug]/NN-[unit].md`, one deliverable per file, each sized for one fresh context window, each declaring `Blocked by:`. Presents the breakdown as a numbered list and **iterates with Adrian until he approves** — this is the last human gate and must not be skipped or auto-confirmed.

**Acceptance criteria:**
- [ ] Both skills exist under `Shareable/skills/` — installation is deferred to the main PC and is not a criterion here
- [ ] Neither hardcodes Hot Iron project names or paths; both work in any business workspace built from this toolkit
- [ ] `/to-brief` never asks an interview question — it synthesises or it reports what is missing
- [ ] `/to-work-units` refuses to write files until the breakdown is explicitly approved
- [ ] Work unit files are the same shape `/run-work` and `/run-cycle` consume — one format, not two
- [ ] Dry-run against Service Pages: the remaining pages decompose into units a cold agent could execute

---

### B6 — Make grilling write as it goes

**Blocked by:** none, but sequence after B4 so the pipeline is proven before touching a working skill.

**Current behaviour:** `/grill-me-as` reads `CLAUDE.md`, `_ai/decisions.md`, and `_ai/findings.md`, conducts an excellent interview, and produces **no artifact**. Everything resolved during the session exists only in the transcript until `/project-wrap-up` reconstructs it at the end of the session — the point of lowest energy and highest context pressure. Matt Pocock's `/grill-with-docs` writes ADRs and glossary entries *during* the interview for precisely this reason.

This lossy round trip is a direct cause of the human-in-the-loop problem: decisions that were made never become durable constraints, so the next agent cannot act on them and has to ask Adrian again.

**Desired behaviour:** when a branch of the interview resolves, `/grill-me-as` appends the decision to `_ai/decisions.md` immediately and confirms in one line, then continues. `/project-wrap-up` then finds the decisions already recorded and has less to reconstruct.

**Acceptance criteria:**
- [ ] `/grill-me-as` writes each resolved decision to `_ai/decisions.md` at the point of resolution, in the existing entry format
- [ ] It does not interrupt the interview flow to do so — one confirmation line, same pattern as `/grilling-handoff`
- [ ] `/project-wrap-up` step 4 skips decisions already recorded rather than duplicating them
- [ ] Three interview skills currently exist — `grilling` (Matt, model-invoked), `grill-me` (Matt, also a `.claude/commands/` entry), and `grill-me-as` (toolkit). Propose a consolidation to Adrian: keep `grill-me-as` as the role-lens entry point and have it delegate the interview loop to `grilling` rather than restating it. **Propose, do not execute** — this touches a skill Adrian uses constantly.

---

### B7 — Fold the pipeline into the scaffold standard

**Blocked by:** B4, B5.

**Acceptance criteria:**
- [ ] `Shareable/templates/project-CLAUDE.md` documents `_ai/acceptance.md` and `_ai/work/` in `## Project Files`
- [ ] `project-init` creates `_ai/work/.gitkeep` (see `_ai/decisions.md` on why `.gitkeep` is mandatory) and asks whether the project qualifies for a pipeline
- [ ] `project-start` mentions any un-actioned exception report from the last cycle
- [ ] `README.md` documents the pipeline — this is the toolkit's most shareable idea and the reason a solopreneur would adopt it
- [ ] `_ai/facts/` gains a `delegation-pipeline.md` with a `Load when:` line
- [ ] **`/ai-toolkit-sync` gains an agents phase** — deploys `Shareable/agents/` to the workspace `.claude/agents/`, matching how it already handles skills, hooks, and the dashboard
- [ ] A fresh copy of this project into an empty business folder, followed by `/ai-toolkit-sync`, yields a working pipeline — skills *and* their reviewer agent. Walk this through on paper and name anything that would be left behind; this is the check that the toolkit is genuinely portable rather than Hot Iron shaped

**Out of scope:** back-filling `_ai/acceptance.md` across every project. Pilot first; generalise on evidence.

---

## Success measure

Stated up front so it can be judged honestly rather than declared:

> One full Local Search Optimisation monthly cycle completes with Adrian invoking one command, reading one exception report, and reviewing zero passing artifacts — and the five area reviews are of a standard he would have signed off had he read them.

This is measured on Adrian's main PC after syncing, on a real month's data. Nothing built on the secondary machine counts as proven until that run happens.

If the reviews are not that good, the acceptance file is too weak — fix the checks, not the process. If they are good but Adrian reads them anyway, the trust gap is the real problem and is worth naming rather than engineering around.

---

## Constraints

- UK English throughout.
- Do not stage or commit to git.
- Edit source files in this repo only. Do not install anything to `~/.claude/skills/` — deployment is the main PC's job.
- Work units and briefs are markdown files in the project. No new tracker, no database, no dashboard.
- Reuse `/to-tickets`' vocabulary and file shape — do not invent a parallel ticket format.
- Producer subagents start cold: a work unit that only makes sense with the orchestrator's conversation in context is a badly written work unit, and that is the bug to fix.
- Nothing in this brief authorises publishing to GBP, the website, or any customer or agent channel.

## Out of scope for Brief B

- Everything in Brief A.
- GBP Playwright publishing automation.
- Any change to `projects.json`, the dashboard, or the memory system.
- Restructuring `project-wrap-up` beyond the B6 de-duplication.
