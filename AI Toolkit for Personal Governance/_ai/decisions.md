# Decisions — AI Toolkit for Personal Governance

Greenfield grilling session, 2026-08-10, `/grill-me-as "an AI expert"`. Everything prior to this
session is treated as unevidenced hypothesis, including the 39 design decisions in `PM/_ai/` and the
README in this folder.

---

## The job is balanced attention, not decision arbitration
**Date:** 2026-08-10
**Decision:** The system exists to keep life spent on things that add value, with work not crowding
out health, fun, and relationships. **Low stress is the outcome being bought**, and balance is the
mechanism.
**Rationale:** Adrian's own statement of the goal — "having a conversation with all critical areas of
my life", and "stress free comes from doing the things you know add value and ensuring it's not all
about work". Ideas will keep arriving regardless; the system's value is that they meet the whole of
life, not that they get adjudicated well.
**Correction, same day:** balance is **one element, not the product**. Adrian: "balance is one of the
important aspects but it's not the product". It sits alongside working on the things that add value,
and following through on what was started — a stated habit is taking on too much and not finishing.
**Consequence:** Arbitration — what the entire prior design is built around — is the *least* supported
job on Adrian's own account. Flow A is not the product.

## Three triggers, not two flows
**Date:** 2026-08-10
**Decision:** The system has three entry points, and they are triggers rather than ceremonies:

1. **Time** — a regular check-in where Adrian updates advisors on what has been done. Long-term
   intent is to reduce this by giving Claude direct access to data it can discover for itself; that
   is an ongoing project, not a precondition.
2. **Idea** — a new plan, business idea, or fitness plan arrives. The job is to spot the challenge
   early: taking on too much, not following through, or working the wrong project. Advisors,
   opposition and PM help find the solution.
3. **Routine** — irregular but frequent, and **task-focused**. "What needs doing so I can move
   things along." PM and advisors hold outstanding tasks; the dashboard shows what is current.

**Rationale:** Adrian's own account. Trigger 2 is not the arbitration flow the prior design assumed —
its job is *pattern detection on Adrian's own known failure modes*, not evaluating an idea on its
merits.
**Consequence:** Trigger 3 is by Adrian's description the most frequent, and the prior design gave it
one line — "jump into any project and ask what's open. No ceremony." The most-used path had the least
design.

## Advisors take a position AND ask — they just cannot assert facts they do not hold
**Date:** 2026-08-10 · **Corrects:** an earlier draft of this decision that removed positions entirely
**Decision:** An advisor weighs the matter against **its own agenda** and presents to the PM. Its
output has three parts: a **position** (support · oppose · conditional, with the cost), the
**questions** it needs answered, and any **missing-data escalation** for its department.
**Rationale:** Two claims were wrongly run together. It is true that an advisor cannot contradict
Adrian on facts it does not hold — Health cannot say "your sleep is poor" with no readings. It does
not follow that it cannot hold a view. **A partial mandate is itself a lens**: the same information
weighed against a different agenda produces different output.

Demonstrated on "drop Saturn to four days for Hot Iron". A single agent with five headings produced
"fewer work days should reduce load" and landed on "consider a trial period". Four partial mandates
produced: Financial — £11k net certain against a business whose *whole* net contribution is ~£14k;
Work — a Technical Director going part-time during a sale process reads as checked out, at the moment
leverage is highest; Health — **this reduces days, not load; what comes off the list?**; Personal —
which day, and has Lucy actually asked for your labour, or are you offering it?

The Health question is the tell. The single agent produced the balanced, plausible, wrong answer
because it was arbitrating with itself as it went.
**Consequence:** Multi-agent is retained and is load-bearing. Empty-department behaviour ("I have had
no data from you in five weeks") is an *addition* to the contract, not a replacement for holding a
view.

## The manifesto is the source of the questions — advisors read it
**Date:** 2026-08-10 · **Supersedes:** "an advisor does not see the manifesto"
**Decision:** Advisors hold the manifesto. It is what their questions are generated *from*:
- **Commitment check** — "you promised x. Was x done this week?"
- **Collision check** — "you now want y. y will get in the way of x."

**Rationale:** Adrian's own point. The prior rule hid the manifesto from advisors so their *positions*
would be independent rather than reasoned toward a balanced answer. Once advisors stop taking
positions, that rule protects nothing and removes the only reference a question can be generated
from. A dated promise is also the one piece of evidence that cannot be retroactively spun — the
Adrian of today cannot edit what the Adrian of 3 June committed to.
**Consequence:** Testimony over time becomes the evidence base, which means the manifesto and the
check-in log are load-bearing from day one. Automated data is upside, not a precondition.

## Three triggers, three separate machines
**Date:** 2026-08-10
**Decision:** Each trigger gets its own skill, deliberately different in cost. Not one flow with a
volume knob.

| Trigger | Convenes | Cost | Character |
|---|---|---|---|
| **1 · Check-in** | All advisors | Medium | No proposal on the table — advisors ask, track, and report staleness against commitments |
| **2 · Idea** | All advisors + opposition | Expensive, and allowed to be | A proposal exists. Advisors weigh it against their own agenda and take positions |
| **3 · Routine** | Nobody | Seconds | Reads state and answers "what needs doing". The dashboard is the visual |

**Rationale:** Adrian: triggers 1 and 2 "feel different to me". They differ in the thing that decides
cost — whether there is a proposal to react to. Trigger 3 is the most frequent path and wants an
answer in seconds; convening four advisors to weigh agendas would be the wrong machine.
**Consequence:** One flow with a "quick mode" always drifts back to full ceremony, because the code
path is shared and the design effort went into the ceremony. Separate skills stay separate.

## The testimony log lives in `_assets/data/`, not `findings.md`
**Date:** 2026-08-10
**Decision:** Each department keeps a dated, append-only log of what Adrian told it, in
`Advisors/[Dept]/_assets/data/`. `findings.md` keeps its existing job — curated analysis in the
working set. Alongside the log, a small rewritten state table (tracking · last heard · status) is what
the advisor actually reads each session.
**Rationale:** Adrian asked whether `findings.md` was the same thing. It is not: `findings.md` is
rewritten, always read, fixed size; the log is appended and never read whole. Mixing them recreates
the failure already flagged for manifesto-vs-register — generated content in the same file as authored
content eventually clobbers it. But no new concept is needed: `_assets/data/` was defined from the
start as the minister's own evidence, and testimony over time *is* now the evidence base.

## Gaps in data produce questions, never assertions
**Date:** 2026-08-10
**Decision:** An advisor missing what it needs **asks for it**. It does not assert, hedge, or reason
from absence.
**Rationale:** Adrian: "I'm not about to lie to Claude... gaps in data should mean no false
conclusions, you just need to ask." Giving Claude direct data access is an ongoing challenge, not a
precondition. This removes the need to design defensively around stale state — an advisor reasoning
from a stale last-heard date would cry wolf; one that asks is self-correcting.

## PM rulings are fed back to advisors, with reasons — and a run of them amends the manifesto
**Date:** 2026-08-10
**Decision:** When the PM (with the opposition) overrides advisors, the decision **and its reason** are
recorded and returned to every advisor that took part.
- The advisor that "won" learns its objection carried — objections that vanish into a void stop being
  made properly.
- The advisor that "lost" learns why, or it re-proposes the same shape of thing next quarter. It did
  nothing wrong; it executed its mandate and lost.
- The opposition holds rulings as **precedent** — a later decision going the other way on the same
  grounds is exactly the erosion it exists to catch.

**Rationale:** Adrian's example — Work's manifesto says find passive income; an idea satisfies it;
Finance agrees; Health and Personal kill it; PM rules against.
**Consequence — the important part:** that ruling *contradicts the manifesto*. Once is a judgement
call. A run of rulings against the same manifesto line means the stated promise and the real promise
have diverged: the rule was never "find passive income", it was "find passive income that costs no
evenings", and the second half was never written down. **Rulings are therefore a drift detector
pointed at the manifesto itself**, arriving from a direction the prior design never considered.

## The opposition's mandate: force the reconciliation, on the first collision
**Date:** 2026-08-10 · **Supersedes:** "attack the plan", and "flag decisions that break the manifesto"
**Decision:** When a ruling and the manifesto disagree, neither is automatically wrong, but the
disagreement is **not allowed to sit unresolved**. The opposition holds the two side by side and forces
a choice: *amend the manifesto, or reverse the ruling.*
- It fires on the **first** collision, not a threshold. Tunable later if too noisy — Adrian: "at this
  early stage the important thing is we have the debate."
- It **persists**. The opposition holds a register of unresolved collisions and re-raises each one
  every session until it is resolved. Raising once and dropping it is not the job.

**Rationale:** "Attack the plan" is unfalsifiable and produces fluent noise. "These two documents say
different things" either holds or it does not — a mandate that is concrete and checkable.
**Consequence — the asymmetry that keeps this honest:** if amending is easy, the manifesto stops being
a promise and becomes a log of what Adrian did anyway; every collision closes by editing intent, and
the system quietly disables its own alarm. So the two paths must cost differently. Reversing a ruling
is a decision made in the moment. **Amending the manifesto is dated, reasoned, and recorded as an
amendment** — never blocked, never invisible.

## Manifestos cascade: PM sets the target, the department says how
**Date:** 2026-08-10 · **Supersedes:** a single manifesto file
**Decision:** Two levels. `PM/manifesto.md` holds high-level targets, binding constraints, the slot
rule, the not-yet list, and the balance plan. Each department holds its own **much more detailed**
manifesto — how the PM's target is delivered in that area.
**Rationale:** Adrian: "I may set a target for earnings in the PM manifesto but the Work advisor will
say where this split comes from." Corporate shape — strategy at the centre, plans in the departments.
**Consequence:** Solves the token problem as a side effect. The PM manifesto stays small enough to
read every session; a department manifesto loads only when that advisor is convened. Advisors still
read the *PM* manifesto in full, because the collision check is cross-department by nature — Health
can only say "that eats the evenings" if it can see what Work promised.

## The opposition is a skill, not an agent
**Date:** 2026-08-10 · **Supersedes:** the opposition as a seat in `.claude/agents/`
**Decision:** The opposition is a skill that takes the advisors' responses, compares them against the
manifesto, and runs a **grilling session** to resolve collisions and set a plan to move forward. It
owns a file of unresolved collisions and re-raises them until settled.
**Rationale:** Adrian's proposal. An agent earns its existence by having a *lens* — a partial mandate
that makes it weigh the same facts differently. Once "attack the plan" was rejected as unfalsifiable,
the opposition had no lens left: its job is procedural (hold two documents side by side, force the
choice, persist) rather than perspectival. It holds no private data and needs no personality.
**Consequence:** Its scope is bounded correctly by Adrian's own example — it does not push back on
earning extra income; it raises the risk of losing focus on other areas.

## The balance plan stays — the hours metric does not
**Date:** 2026-08-10 · **Corrects:** the proposal to cut "intended allocation" as unfalsifiable
**Decision:** The manifesto keeps an explicit plan for **proportioning focus across areas**. It is
expressed in terms the system can observe, not in hours.
**Rationale:** Adrian: "it's essential I find a way to balance my life... if not I have a habit of it
all being work." Balance is the product — cutting the section would cut the purpose. The objection was
only ever to the metric: "20% on health" cannot be checked and will never be measured.
**Consequence:** Attention leaves traces. Movement per area, commitments met against promised, and
time since an area last had anything to report are all observable without tracking hours — and are
what the dashboard should render. Exact form to be settled in the manifesto grilling.

## Ratios plan; floors measure
**Date:** 2026-08-10 · **Refines:** the balance plan
**Decision:** Two different instruments, used at two different moments — not one metric.

- **Ratios and timeboxing — a planning tool, used when something new arrives (trigger 2).** "New
  passion project, brings fun. What time do I have spare? Could I reduce time on other projects?"
  Applies especially to projects, where a box can actually be drawn round the work.
- **Floors — a measurement tool, used at check-in (trigger 1).** Actions compared against manifesto
  commitments, with a **tolerance band**: skipping a walk or two is not a finding; skipping a week is
  raised.

**Rationale:** Adrian's split. Ratios are hard to measure but useful for deciding what fits; floors
are easy to check but useless for planning. Collapsing them into a single metric — as first proposed
— loses both jobs. Life must stay flexible, so the ratio is an input to a decision, never a rule.
**Status:** The specific floors, tolerances and boxes are **out of scope here** — Adrian: "that's a
separate grilling task." They are settled in the manifesto grilling, in the live workspace.

## Five seats — Family splits out of Personal
**Date:** 2026-08-10 · **Supersedes:** the four departments inherited from the folder structure
**Decision:** **Work · Financial · Health · Family · Personal.**
- **Family** — Lucy, Jensen, the household. Where dated commitments actually live: EEG follow-ups,
  time with Lucy, joint decisions.
- **Personal** — Adrian himself. Fun, friends, hobbies. The things that get squeezed first and
  generate no arrivals.

**Rationale:** The old Personal seat held "relationships, social, hobbies, lifestyle" — so the seat
meant to catch work crowding out family was also holding fishing and the classic car, and would reach
for hobbies when asked for a view, because that half needs nobody else's cooperation. Adrian named
"fun, health etc" as distinct things; the structure should match.
**Cost, accepted:** a fifth voice in every trigger-2 session.
**Falsifier:** if the manifesto grilling finds family and personal commitments keep turning out to be
the same commitments, one seat was right. Cheap to discover, and it happens before anything is built.

## Commitments are graded by agency
**Date:** 2026-08-10
**Decision:** Every commitment carries a grade, set when it is written:

| Grade | Example | What the system may do |
|---|---|---|
| **Mine** | Walk three evenings a week | Measure it. Floors apply |
| **Shared** | Two evenings with Lucy | Track whether it happened; never treat a miss as Adrian's failure |
| **Influence** | Chris agrees the V3 terms | Track the attempt, never the outcome |

**Rationale:** Adrian: "I'm not responsible for her actions, I can suggest but not enforce." That is
not a caveat — it is a property the commitment carries. Without it the system nags about things Adrian
cannot unilaterally deliver, which is the fastest route to avoiding it.

## Relationships: influence now; dependency and energy designed-for; value confined to Work
**Date:** 2026-08-10
**Decision:** The toolkit supports a grading dimension on relationships. Three dimensions are
designed for; **only influence is built now.**

- **Influence** — how much agency Adrian has. Built. Determines what a commitment is (above).
- **Dependency** — who relies on Adrian. Designed for, not built. Carries the weight in a collision.
- **Energy** — who restores and who drains. Designed for, not built. Directly relevant to the
  low-stress goal and cuts across personal and professional alike.
- **Strategic value** — graded, but **only inside Work's brief**, for professional contacts.

**Rationale:** Grading family and close friends by value-to-goals breaks the system on its own terms.
Adrian's stated purpose is that work stops crowding out everything else; a value score hands Work the
lever *"this evening scores low"* — the exact departmental capture the opposition exists to catch,
written into the data model where the opposition cannot see it. Dependency also demonstrates the value
axis is wrong for family: Jensen ranks highest on dependency and low on almost any value measure.
**Consequence:** Every dimension is something to maintain at check-in. Two kept honestly beat five
that go stale — so influence ships alone, and the others are added when a real session shows they were
needed. The actual grades are live-instance content, settled in the manifesto and department
grillings, not here.

## Other workspaces are out of scope; a CEO role reports in later
**Date:** 2026-08-10 · **Supersedes:** the `_system/portfolio.json` cross-workspace contract
**Decision:** Hot Iron, Localix and Revvado are **out of scope at this stage**. The route in is a
**CEO role added to those projects**, part of whose job is producing a business summary this system
reads. Recorded as an outstanding task for the **Work advisor**, not a dependency of this build.
**Rationale:** Adrian's call, and it avoids building a cross-repo file contract against workspaces
that are mostly unscaffolded. It also puts the reporting burden where the work happens rather than
having Adrian report second-hand on Lucy's day-to-day.

## A gap in the data becomes a task
**Date:** 2026-08-10
**Decision:** When an advisor lacks data — nothing reported, or a known hole — it raises a **task
asking Adrian to supply it**. Not a warning, not a caveat: a task, in the normal task list.
**Rationale:** Adrian's generalisation. It converts the whole missing-data problem into the mechanism
that already exists and is already surfaced.
**Consequence:** This closes the loop with trigger 3. "Health has no sleep data" becomes an item on
the list Adrian sees when he asks what needs doing — so starved departments get fed through the most
frequent path in the system, without needing a nagging mechanism of their own.

## `register.md` is killed
**Date:** 2026-08-10 · **Supersedes:** the register as an artifact, and unblocks a long-blocked task
**Decision:** There is no `register.md`. Reality is already recorded — tasks, project status, and the
last-heard dates on each department's state table. **The register was never a file, it was a view over
files that already exist**, and the dashboard is that view.

| Was going to hold | Where it lives now |
|---|---|
| Project status | `projects.json`, machine-written, already rendered |
| Slots and capacity | The manifesto — a rule Adrian sets, not an observation |
| Cross-workspace holdings | Out of scope |
| Edges between holdings | Never had a demonstrated use |

**Consequence:** the old headline — "the gap between manifesto and register is the entire product" —
survives, but relocates. Commitments live in the manifesto, evidence in the logs and state tables, and
the opposition skill does the comparing. Nothing holds the comparison as a standing artifact; it is
computed when asked for.

## History lives in `PM/reviews/`, and the history is the optimisation
**Date:** 2026-08-10
**Decision:** `PM/reviews/` holds a record per session for triggers 1 and 2. Trigger 3 writes nothing.
Each record includes the **computed comparison as a snapshot**, so the next session reads the last
snapshot and processes only what changed since — rather than recomputing from nothing.
**Rationale:** Adrian asked whether a historic view is needed and whether computing is expensive. It
is needed, and the same artifact answers both. Two agreed mechanisms require history: a *run* of
rulings against the same manifesto line, and a repeated floor breach. Drift is only visible across
time — that is what makes it drift.
**The governing rule: compute at write time, not read time.** When something is recorded, the state
table is updated then. Reading stays cheap permanently, which is what keeps trigger 3 fast.
**Consequence:** The real cost is token volume across five advisors, not computation. The fixed-size
state table *is* the optimisation — the log is never read whole, and advisors run in parallel, so five
seats cost wall-clock like one.

## The check-in opens with the advisors' questions, and runs weekly
**Date:** 2026-08-10
**Decision:** Trigger 1 is **weekly**, and it **never presents a blank page**. The advisors ask first;
Adrian answers.

1. Read the last snapshot — what was outstanding
2. Each advisor, in parallel, produces its questions from manifesto commitments and its own
   last-heard dates
3. **Adrian answers, conversationally** — this is the whole session from his side
4. Answers are routed to departments: appended to logs, state tables updated
5. Advisors return commitment status, new questions, and data-gap tasks
6. The opposition skill compares against the manifesto and raises collisions
7. Output: tasks, unanswered questions, unresolved collisions, and a new snapshot

**Rationale:** "Tell me what's happened since July" is work — remembering, structuring, deciding what
is relevant. "Did you get to three walks this week? Has Jensen's EEG date come through?" is just
answering. The prior design found this and it is the most useful thing in it: reporting will not be
done reliably; questions will always be answered.
**Consequence:** Coverage solves itself — Health asks whether or not health is on Adrian's mind, which
is exactly the department that would never come up if he were driving. Weekly also matches the
tolerance already stated: skipping a walk or two is not a finding, skipping a week is.
**Risk:** an advisor asking from stale dates opens with questions already answered elsewhere, which
reads as being nagged by something that is not listening. The routing in step 4 must be reliable — the
cost of a dropped answer is not a missing record, it is the same question arriving again next week.

## Per-department clocks; no cap on session length
**Date:** 2026-08-10 · **Rejects:** a cap on questions per check-in
**Decision:** Commitments carry a time element at **both** levels — high-level in the PM manifesto,
detailed in the advisor's own manifesto. **If no update has been reported against a commitment whose
clock has elapsed, the advisor speaks up.** The session takes as long as it takes.
**Rationale:** Adrian's call, and it is stronger than the proposed cap. A cap assumes there is filler
to trim; under per-department clocks there is none, because nothing generates a question except an
elapsed, unreported commitment. A long session means a lot genuinely went unreported — exactly the
session that should be long. Capping would suppress the signal precisely when it is loudest.
**Consequence:** The check-in is weekly, the departments are not. Financial is silent for eleven weeks
and then has something real; "Financial: nothing this week" is a valid and expected output. Coverage
comes from commitment tolerances, not from an obligation to fill a slot.
**Where the length control actually lives:** in **how many commitments Adrian makes**, not in the
check-in. Forty commitments means long sessions forever regardless of session design. That control is
the slot rule and the manifesto's own discipline.
**Free check:** an advisor silent for six weeks when its commitments are weekly is not quiet, it is
broken — visible in the state table's last-heard column with nothing monitoring for it.

## No PM agent — skills orchestrate, Adrian arbitrates
**Date:** 2026-08-10
**Decision:** There is no PM agent. Skills convene, route, assemble and record. **They never
conclude.** Adrian is the PM.
**Rationale:** A PM agent would read five advisor outputs and produce a recommendation — precisely one
model reading five perspectives and reasoning its way to a balanced answer, the failure mode this
whole design exists to avoid, rebuilt one layer higher where it is harder to see because it arrives
with the authority of the chair. On the Saturn four-day example, a PM agent hands over "directionally
sound, consider a trial period" and the tension between Health's *"this reduces days, not load"* and
Financial's *"£11k certain against a £14k business"* is gone — five advisors paid for and discarded.

## Advisor outputs are presented verbatim, never summarised
**Date:** 2026-08-10
**Decision:** Skills pass advisor output through unchanged. No synthesis, no compression, no
"advisors broadly agree that…".
**Rationale:** Summarising is arbitration wearing a different hat — the moment a skill compresses five
positions into a paragraph it has decided which tensions matter. Five short positions read in full are
cheaper than a good summary anyway.
**Exception:** the opposition skill, narrowly. It does not summarise positions; it compares them
against the manifesto and reports collisions. Different job.

## The idea gate tests potential value, not capacity
**Date:** 2026-08-10 · **Rejects:** the slot rule as the entry test for trigger 2
**Decision:** A quick test sits in front of a full session, and it tests **the idea's potential
value**. Capacity is *not* the entry test. The slot question moves to the **disposition** step —
commit · park-with-a-trigger · kill — where it belongs.
**Rationale:** Adrian: working through an idea does two things — it validates it, and **it gets it out
of his head**. A capacity gate destroys both. The second is real value, not a side effect: an
unprocessed idea keeps charging background attention until it has been worked through. Capacity after
thinking, not instead of thinking.

## Each advisor has a method, not just a mandate and evidence
**Date:** 2026-08-10
**Decision:** An advisor is **three** things: a **mandate** (what it argues for), its **evidence**
(the log and state table), and a **method** (how it evaluates something in its own domain) — the last
delivered as a per-advisor idea-review skill.
- **Work** — the 10-point rule from *The Personal MBA*. Adrian has a set of instructions from ChatGPT
  that **need reviewing** before they are adopted. Recorded as a task.

**Rationale:** Adrian's proposal, and it closes the loop with the original diagnosis: this workspace
had context but no capability, and the Localix conversation happened in ChatGPT **because that is
where the method lived**. Method is what makes a session worth attending.

## The system is where Adrian's reading gets banked — a stated purpose, not a detail
**Date:** 2026-08-10 · **Corrects:** "a thin method beats a borrowed one", which was wrong
**Decision:** An advisor's method is **distilled from sources Adrian has chosen** — *The Personal MBA*
for business ideas, *The Psychology of Money* for investing — **and** from his own documented failure
patterns. Both, not either.
**Rationale:** Adrian: "I learn a lot from books but it can be information overload. Taking the
elements I think are most useful to my life and baking them into a system I can rely on (not my
memory) is an important element of this project." This is a first-class purpose of the project, and it
was missing from the record.

The earlier framing was wrong. The distinction is not book-derived versus personal — it is **chosen
and distilled** versus **bolted on to fill an empty slot**. *The Personal MBA* works because Adrian
picked it and finds it useful; a wellness framework chosen by Claude for Health would be worthless,
not because it came from a book but because nobody chose it.
**Consequence:** Health, Family and Personal do not lack available methods — Adrian has **not yet
named the sources** he wants baked in for those areas. That is an input to those department grillings,
not a design problem. Distilled method is also what gives an advisor *expertise* rather than merely an
agenda: the difference between the Work advisor asking sharp questions about a business idea and
asking obvious ones.

## `CLAUDE.md` holds identity and pointers only
**Date:** 2026-08-10
**Decision:** In every folder, `CLAUDE.md` is the smallest and least-revised file: what this thing is,
and where to look for the rest. Detail lives in separate files loaded on demand — the department
manifesto, the log in `_assets/data/`, the state table, `_ai/`, and each project's own scaffold.
**Rationale:** Adrian's concern that the `CLAUDE.md` files get too big if everything goes in them.
Compounded by departments containing **projects** — a new business idea under discussion is a project
folder with its own scaffold, not a section of the department's context file.

## The per-department clock lives in the department's `CLAUDE.md`
**Date:** 2026-08-12
**Decision:** Each department's clock — how often it is due to speak at all, as distinct from a single
commitment's time element — is recorded as a **Per-department clock** line in
`Advisors/<Dept>/CLAUDE.md`, and `appoint-advisor` fills it during the department grilling. This takes
that skill from writing three files to four; it still writes only that one line of the `CLAUDE.md`.
**Rationale:** The clock was asserted in three places and stored in none. `check-in` named it as a
second source of questions alongside elapsed commitment clocks; `Advisors/CLAUDE.md` pointed at
`check-in` for it; `check-in` pointed back at the advisor. No department template had a field for it,
so the second source had no data behind it and collapsed into the first. `minister-financial.md` in
fact asserted the opposite — that only an elapsed *commitment* clock generates a question.
**Consequence:** An empty clock line means the department is never skipped, which is the safe default
while the five grillings are still outstanding. The review criterion in `PM/_ai/tasks.md` for
`appoint-advisor` — "writes to exactly the three files" — is updated to four.

## `check-in` reads `PM/opposition-collisions.md` at Step 1
**Date:** 2026-08-12
**Decision:** Step 1 of `check-in` reads the open-collisions file directly and re-raises every open
entry before the ministers are launched, rather than sourcing outstanding collisions from the last
`PM/reviews/` snapshot.
**Rationale:** `opposition` Step 5 declares that file the single source of truth for open collisions
and states they are re-raised at the start of every subsequent session — but nothing actioned it.
`opposition` itself is not invoked until `check-in` Step 6, the end of the session, so the re-raise
could never happen and two files claimed to own the same state.

## `routine` reads PM-level tasks and open collisions, not departments alone
**Date:** 2026-08-12
**Decision:** `routine` Step 1 reads five sources, not three: `projects.json`, `PM/_ai/tasks.md`,
`PM/opposition-collisions.md`, and each department's `_ai/tasks.md` and `_ai/state.md`. The brief's
accept criteria for T15 named only the last three.
**Rationale:** The skill claims to return "what needs doing", and two whole tiers of outstanding work
were invisible to it. `PM/CLAUDE.md` puts PM-level tasks — calls about how the system runs rather than
about any one department — in `PM/_ai/tasks.md`, and nothing else read that file; today it holds the
entire live backlog. `PM/opposition-collisions.md` is by `opposition` Step 5 the single source of truth
for unsettled collisions, the highest-value outstanding item the system produces, and it surfaced only
inside a full weekly session.
**Consequence:** `routine` stays read-only — it reports an open collision and names `/check-in` as
where it is settled. It does not resolve one, which would need a write and an amend-or-reverse
forcing that belongs to `opposition`.

## `opposition` raises advisor-vs-advisor disagreement, not collisions alone
**Date:** 2026-08-12
**Decision:** `opposition` raises two kinds of **conflict** — a **collision** (a decision against
`PM/manifesto.md`) and a **disagreement** (two advisor positions that cannot both be acted on) — and
works each one to a resolution Adrian gives, one at a time, before the next is named. Neither kind is
settled by the skill. A collision still forces amend-or-reverse; a disagreement forces Adrian to name
which cost he accepts. Both persist in `PM/opposition-collisions.md`, which keeps its name and now
holds entries of both kinds, tagged.
**Rationale:** `idea` Step 6 presented five positions and Step 8 said "Adrian resolves", with no
mechanism between them — the design's central tension, five partial voices disagreeing, had nowhere to
be worked. This is the existing Step 4 forcing pattern widened rather than new behaviour: present a
conflict, force Adrian to choose, never choose for him. "Procedural, not perspectival" still holds —
raising a conflict and grilling him through it is not arguing its merits, and the skill picks no side.
**Consequence:** `idea` Step 7 and `check-in` Step 6 both widened to pass the five positions and to
complete on every conflict settled or recorded open, rather than on a collision merely "put to
Adrian". `idea` Step 7 is the invocation point rather than Step 8 as first sketched in
`PM/_ai/tasks.md` — a second invocation at Step 8 would run the scan twice. `opposition` does **not**
invoke `grill-me-as`, which adopts a role and supplies a recommended answer with every question; that
would make the skill perspectival and hand Adrian a side to take.

## The one-at-a-time loop also fixes multi-collision sessions
**Date:** 2026-08-12
**Decision:** After a conflict is settled or recorded open, `opposition` returns to Step 2 and carries
the scan on from where it stopped. The step completes only when a fresh pass raises nothing new.
**Rationale:** "Fire on the first collision" was implemented as "stop scanning for more in that pass",
with nothing sending the skill back afterwards — so a session containing two collisions raised one and
silently dropped the other. First-collision firing is about refusing to batch or wait for a threshold,
not about capping a session at one.

## `opposition` owns the collisions file outright
**Date:** 2026-08-12
**Decision:** `PM/opposition-collisions.md` is written by `opposition` Step 4 alone. `check-in` Step 7
no longer writes it, and its session output drops from four artifacts to three.
**Rationale:** Both skills wrote the same file, so an unresolved conflict had two owners and either
could be the one that recorded it. `opposition` already declared itself the single source of truth for
what is still open.

## The manifesto is the senior source; amending it takes explicit instruction
**Date:** 2026-08-12
**Decision:** Adrian's ruling. A collision defaults to *reverse the ruling* — `PM/manifesto.md` stands
as written. *Amend the manifesto* stays available to him at any time but requires his **explicit
instruction**; `opposition` puts both options in front of him and proposes neither. Where a conflict
repeats, the skill reports the facts of the repetition — which line or which two departments, how many
times, on what dates, how each was ruled — and draws no conclusion from it.
**Rationale:** Adrian's words: the job of the skill is to raise, and to provide the facts; he makes the
judgement. The previous Step 5 asserted that a run of collisions against one manifesto line "is itself
a signal that the manifesto is wrong" — a conclusion the skill has no standing to reach, and one that
quietly demoted the manifesto to a document that yields under repetition. Seniority makes the two
options asymmetric where they had been an even binary.
**Consequence:** The skill may give an opinion **when asked** and must label it as one; it never
volunteers a side. Supersedes the open item logged earlier the same day about the repeat-signal
covering collisions but not disagreements — with the conclusion removed, both kinds report the same
way and the asymmetry disappears.

## `opposition` recommends, but the recommendation is found in the cascade, not formed
**Date:** 2026-08-12
**Decision:** Adrian's ruling, refining the entry above. `opposition` **does** give a recommendation on
a conflict, sourced by reading down the manifesto cascade and stopping at the first level that settles
it — `PM/manifesto.md`, then the two departments' `manifesto.md` — and quoting the line it rests on.
Where no level settles it, the skill says so in those words and puts one short argument for each side
so the choice is quick to review.
**Rationale:** Adrian's point: if the PM manifesto is senior and the department manifestos sit under
it, a recommendation can be derived from that hierarchy rather than invented. That keeps the skill
**procedural, not perspectival** — a recommendation traced to a written line is falsifiable in exactly
the way a comparison is, and it is not the skill taking a side. It also makes his review cheaper: he
checks a citation instead of weighing a view. The earlier "volunteer no side" position over-corrected,
leaving him to do work the documents had already done.
**Consequence:** "Found, not formed" is the test. A recommendation with no line behind it is the case
the skill must report as unsettled rather than fill with judgement — and manifesto silence on a pair of
departments is reported as a fact, not as an argument for amending. Softens the standing objection to
`grill-me-as` ("provide your recommended answer with every question"): what remains is that it forms
recommendations from an adopted role's perspective where `opposition` must locate them in documents.

## `grill-me-as` recommends only where a document exists to cite
**Date:** 2026-08-12
**Decision:** Adrian's ruling, settling the standing objection to "provide your recommended answer with
every question". The instruction is neither kept nor stripped — it **branches on whether a source
exists**. Where the cascade settles a question, the skill recommends and quotes the line, carrying
`opposition`'s **found, not formed** test verbatim. Where the documents are silent — `manifesto` Mode A,
or a department whose manifesto is still a template — it says so in those words and puts the question
with no proposal attached.
**Rationale:** A first-fill grilling has no cascade to read, so any recommendation offered there is
necessarily *formed* from the adopted role's perspective. That is Rule 0.1's exact failure case: a
plausible answer supplied at the moment Adrian has written nothing, then mistaken for something he
agreed to. Everywhere else a source exists, and the reasoning from the entry above applies unchanged —
a recommendation traced to a written line is not the skill taking a side, and it makes his review
cheaper. The role decides which questions get asked; the cascade decides which get a recommendation.
**Consequence:** "Found, not formed" now spans two skills, which is deliberate — shared language makes
the agent reach the same behaviour in both. Unblocks the `manifesto` and `appoint-advisor` reviews,
which were held on this question.

## `grill-me-as` points at the minister mandates rather than restating them
**Date:** 2026-08-12
**Decision:** The adapted skill names the five ministers and sends the agent to
`.claude/agents/minister-<name>.md` for what each role challenges, rather than listing those concerns
inline as the inherited version did for its five business roles.
**Rationale:** The environment is a source of truth, and a document restating it is a cache that earns
its load only when the lookup is expensive. Here the lookup is one file. Worse, the mandates are about
to be sharpened by `appoint-advisor` on all five departments — an inline copy would be stale the day
that work lands, and would be a second source of truth for a mandate that already has one.
**Consequence:** The role list is now three kinds rather than five names: a minister (read the mandate),
the PM seat (read `PM/manifesto.md`), or any other named role.

## Build-time brief pointers come out of runtime skills
**Date:** 2026-08-12
**Decision:** The four `implementation-brief.md` §-references in `manifesto` are dropped, completing the
removal already done in `routine`, `idea` and `opposition`. Where the cited reasoning was load-bearing
it was already inlined in the skill (§0.1's never-invent rule, §3's why-amending-is-deliberate), so
nothing was lost; §5's repeated-rulings pattern now points at `opposition` Step 5, which owns it.
**Rationale:** Two defects in one pointer. The wording was weak — a bare filename for a file at
`PM/AI Toolkit for Personal Governance/_ai/task-prds/` — and a pointer's wording, not its target,
decides how reliably the agent reaches it. The deeper problem is that the brief is the *build spec*: a
runtime skill citing the document that describes how it was constructed makes live behaviour depend on
a build artifact. `check-in` and `appoint-advisor` still carry four between them; they go at their own
reviews rather than in a sweep.
**Consequence:** The Mode A test for "is this a first fill" is now the file itself — placeholder
comments in `PM/manifesto.md` — rather than a brief citation. The environment is the source of truth
and the lookup is one file.

## `grill-me-as`'s write target for `manifesto` was wrong, and is corrected
**Date:** 2026-08-12
**Decision:** The *Where decisions land* table in `grill-me-as` gave `manifesto` the Amendment Log as
its target. It now reads `PM/manifesto.md` — the section being filled or amended — with the Amendment
Log named as an additional write for an amendment.
**Rationale:** An error introduced the same day, caught by the `manifesto` review. Mode A resolves
questions into *section bodies* and only seeds the log once at the end; only Mode B's decisions are
themselves log entries. The original row would have sent a first fill's answers into the Amendment Log
and left the manifesto sections as placeholders.
**Consequence:** Both modes now name their target at the point of invocation rather than relying on the
table's default, which is the pattern the table was built to support.

## A department manifesto's pointer-only sections stay pointers at appointment
**Date:** 2026-08-12
**Decision:** `appoint-advisor` Step 6 now names which sections of `Advisors/<Dept>/manifesto.md` it
fills — **How This Delivers the PM Targets** and **Commitments** — and states that **Mandate Summary**
and **Method Notes** are confirmed and left pointing. It also seeds that manifesto's Amendment Log with
a first entry, matching what `manifesto` Mode A does at PM level.
**Rationale:** The step read "replace the placeholder sections with what Steps 3–4 established", which
taken literally fills all five, including the two the template marks "Pointer only — do not restate".
That would put the mandate in two places (the agent file and the manifesto) and the method in two more
(`_skills/` and the manifesto), so sharpening a mandate later would leave a stale copy behind. Same
defect class as the inline role list removed from `grill-me-as`: restating what already has a home.
**Consequence:** The Step 6 completion criterion is exhaustive on both counts — all four outputs
written, and the two pointer-only sections still pointing.

## `appoint-advisor` passes the minister role rather than a hand-built one
**Date:** 2026-08-12
**Decision:** Step 2 passes the minister role by name (`work`, `financial`, …) to `grill-me-as`,
replacing the prose role it used to construct ("the advisor accountable for Adrian's Financial
department").
**Rationale:** The adapted `grill-me-as` takes a minister by name and reads its mandate from
`.claude/agents/minister-<name>.md`, so a hand-built role bypasses the mechanism the two skills now
share. It also makes the recommendation rule work correctly without special handling: `PM/manifesto.md`
exists by the time a department is appointed, so questions about delivering PM targets can carry a
cited recommendation, while the department's own manifesto is still silent. The cascade resolves that
per-question; no branch in this skill is needed.

## Amending an appointed department has no owner
**Date:** 2026-08-12
**Decision:** Logged as a gap, not filled. `appoint-advisor` Step 1 now stops where a department already
holds real content, and says so, rather than proceeding to overwrite it.
**Rationale:** The step already read those files "to confirm they are still template scaffolds, not
already filled" and then did nothing with the answer. The department manifesto template says the file is
"amended thereafter the same way the PM manifesto is" — but `manifesto` writes only `PM/manifesto.md`,
and this skill appoints rather than amends, so nothing owns a department-level amendment. Building a
Mode B here is a design decision in its own right and was not taken as a side effect of a review.
**Consequence:** New task in `PM/_ai/tasks.md`. Until it is settled, a department manifesto changes only
by hand.
