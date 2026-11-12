# Pipeline Qualification

**Assessed:** 2026-07-28 (Brief B, unit B1)
**Source:** `_system/dashboard/data/projects.json`, plus each project's `CLAUDE.md`

Which projects should get the knowledge-work delegation pipeline, and which should not. **The non-qualifying list matters as much as the qualifying one** — applying this machinery to one-off work is pure overhead.

## The four tests

1. **Fan-out** — does the work repeat over a natural unit (area, agent, page, review)?
2. **Template** — does an output template exist, or could one be written?
3. **Checkable** — can its constraints be reduced to assertions a reviewer can verify?
4. **Recoverable** — is a wrong output fixed by re-running, or does it reach a customer?

---

## Pipeline B — Ongoing, routine work

| Project | Unit | Fan-out | Template | Checkable | Recoverable | Verdict |
|---|---|---|---|---|---|---|
| **Local Search Optimisation** | area (5) | Yes | Yes — review + summary structures specified verbatim in CLAUDE.md | Yes | Yes — internal review doc | **PILOT** |
| **GBP Posting Engine** | area (15) | Yes — highest volume | Yes — length, CTA label, CTA URL, image prompt all specified | Yes | **No** — publishes to live profiles | Phase 2, **draft-only** |
| **Google Ads Optimisation** | month (1) | Weak — rules are cross-agent, one report | Yes — `Processes/process-review.md` is already an agent brief | Yes — explicit thresholds table | Yes — recommendations, not changes | Qualifies, single-unit |
| **Google Analytics Review** | month (1) | Weak — same shape as Google Ads | Yes — `Processes/` stage/compile/review | Yes | Yes | Qualifies, single-unit |
| **Automated Customer Reviews** | review | Yes | Yes | Yes | **No** — responses post publicly | Qualifies, **publish-gated** |

**On the single-unit cases** (Google Ads, Google Analytics): they gain nothing from parallelism — there is one report per month, not five. They gain everything from the *verifier*. `process-review.md` already encodes rules precisely enough for a cold agent; what is missing is a reviewer that checks the output obeyed them. Run these through `/run-cycle` with one work unit rather than skipping them.

## Pipeline A — Defined Goal work

| Project | Unit | Verdict |
|---|---|---|
| **Service Pages** | page (9, ~6 remaining) | **Strong.** Structure specified, constraints unusually crisp (no dry cleaning, no duvet-washing implication), output is copy handed over for implementation — a human publishes |
| **Targeted Agent Recruitment** | deliverable | Moderate. Briefs already live in `_ai/task-prds/`. Deliverables are heterogeneous (copy, campaign config, dev briefs), so work units need writing by hand rather than generating |
| **Google Ads Location IDs** | — | Marginal. Essentially one data task; a brief would be longer than the work |
| **Liverpool Customer Share** | — | Marginal. One-off analysis |

## Non-qualifying

| Project | Why not |
|---|---|
| **All 14 Create-Value Developer projects** — HotIron.Agents, HotIron.Tools, HotIron.Operations.*, HotIron.Automation.*, SqlBuilder, Customer PageSpeed Insights, HotIron.Business.Dashboard, Automated Workflow Solution | Already served by the Matt Pocock pipeline (`/grill-with-docs` → `/to-spec` → `/to-tickets` → `/implement`). Building a second pipeline over them would be duplication. **This pipeline is the knowledge-work analogue of that one, not a replacement for it.** |
| **New Agent Launch** | Fan-out exists (per agent) but the work is heavily interactive — Azure table writes, blob uploads, coordination with Lucy. The constraint is real-world sequencing, not drafting throughput |
| **AI Toolkit for Solopreneurs** | Meta-project. Work is bespoke design, not repeated deliverables |
| **Everything in 00 - Cross Function** | Strategy and one-off memos. A delegation pipeline over a single document costs more than it saves |

## Summary

- **5** projects qualify for Pipeline B; 2 of those publish externally and stay publish-gated
- **2** qualify for Pipeline A (1 strongly)
- **18** do not qualify, 14 of them because they already have a better pipeline

Roughly a quarter of active projects qualify. That is the expected shape — if this ended up applying to everything, the tests would be wrong.
