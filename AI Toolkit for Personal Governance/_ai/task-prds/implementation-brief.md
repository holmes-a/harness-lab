# Implementation Brief — Personal Governance Workspace

**Target repo:** `C:\Enterprise\Holmes.Administration` (fresh, contains only `README.md` and an
initial commit)
**Source of reusable components:** `C:\Enterprise\Holmes.Lifecoach\AI Toolkit for Solopreneurs\Shareable\`
**Design record:** `C:\Enterprise\Holmes.Lifecoach\PM\AI Toolkit for Personal Governance\_ai\decisions.md`
**Task list:** `implementation-tasks.md`, alongside this file

This brief is **self-contained**. An agent with no prior conversation context can build from it.

---

## 0. Rules that override everything else

**0.1 — Build the structure, never the content.**
The manifesto, the department mandates, the commitments, the floors, the relationship grades and the
distilled methods are all produced by **grilling sessions with Adrian**, later. You are building the
*templates and scaffolding* they will be written into.

**Do not invent:** Adrian's goals, commitments, targets, tolerances, priorities, values, or any
department's actual mandate content. A template with `<!-- filled by the manifesto grilling -->` is
correct. A plausible-looking manifesto is a failure, and a costly one — it will be mistaken for
something Adrian agreed to.

**0.2 — Reuse before invention.** If a file exists in the Solopreneurs `Shareable/`, copy it. Do not
rewrite it. Exact source paths are given in §8.

**0.3 — Do not copy anything from `C:\Enterprise\Holmes.Lifecoach\PM\_ai\decisions.md`.** That file is
marked superseded. The current design is the `decisions.md` in this project.

**0.4 — Do not migrate content from the old workspace.** Adrian transfers active projects himself
after verifying the scaffold. Your job ends at an empty, correct, working structure.

---

## 1. What this system is

A decision-making and attention system for one person's life, running on Claude Code. Adrian Holmes is
the Prime Minister. Five specialist advisors hold departments. An opposition *skill* audits decisions
against a manifesto.

**What it is for**, in Adrian's words: having a conversation with all critical areas of his life;
doing the things that add value; making sure it is not all about work. Low stress is the outcome being
bought. Balance is **one element**, alongside working on the right things and following through.

**The problem it solves.** A workspace full of context files describes a situation and does nothing
with it. A single assistant reading files you wrote will agree with you. And method — the thing that
makes a session worth attending — has historically lived elsewhere (a business idea got properly
evaluated in ChatGPT, because that is where the method was).

**A fourth purpose, explicitly stated:** the system is where Adrian's reading gets banked. Elements he
finds useful from books — *The Personal MBA* for business ideas, *The Psychology of Money* for
investing — are distilled into advisor methods so he relies on the system rather than his memory.

---

## 2. The cast

### The PM — Adrian. Not an agent.

**There is no PM agent, and you must not create one.** Skills convene, route, assemble and record.
They never conclude. A PM agent would read five advisor outputs and reason its way to a balanced
recommendation, which is the exact failure the whole design exists to prevent.

### Five advisors — one per department

`Work` · `Financial` · `Health` · `Family` · `Personal`

- **Family** — Lucy, Jensen, the household. Where dated commitments actually live.
- **Personal** — Adrian himself. Fun, friends, hobbies. What gets squeezed first.

These are separate seats deliberately: a single seat holding both reaches for hobbies, because that
half needs nobody else's cooperation.

**An advisor is three things:**

| Part | What it is | Where it lives |
|---|---|---|
| **Mandate** | What it argues for. Partial by design — accountable for its department, explicitly *not* required to be balanced | `.claude/agents/minister-<name>.md` |
| **Evidence** | Dated testimony from Adrian, plus any data it acquires | `Advisors/<Dept>/_assets/data/` |
| **Method** | How it evaluates something in its domain, distilled from chosen sources and Adrian's own failure patterns | `Advisors/<Dept>/_skills/` |

**Advisor output contract — three parts:**
1. A **position** — support · oppose · conditional, **with the cost named**. No hedging. "It depends" is not an answer.
2. The **questions** it needs answered.
3. Any **data-gap escalation** for its department.

**Advisors read the PM manifesto in full.** The collision check is cross-department by nature — Family
can only say "that eats the evenings" if it can see what Work promised.

**Advisors never assert facts they do not hold.** A gap in the data produces a **question**, and then a
**task asking Adrian to supply it**. Never a caveat, never an assumption.

**"Nothing this week" is a valid and expected output.**

### The opposition — a skill, not an agent

Do not create an opposition agent. Its job is procedural, not perspectival: hold the manifesto and the
decision side by side, and force a choice — **amend the manifesto, or reverse the ruling**.

- Fires on the **first** collision, not a threshold.
- **Persists** — it owns a file of unresolved collisions and re-raises each one every session until
  settled.
- It does not argue against the plan. "Attack the plan" is unfalsifiable; "these two documents say
  different things" either holds or it does not.

---

## 3. The manifesto

**Two levels, cascading.**

- **`PM/manifesto.md`** — high-level. Targets, binding constraints, the slot rule, the not-yet list
  with triggers, and the balance plan. Small enough to read every session.
- **`Advisors/<Dept>/manifesto.md`** — much more detailed. How the PM's target is delivered in that
  area. Loaded only when that advisor is convened.

Example of the relationship: the PM manifesto sets an earnings target; the Work manifesto says where
that split comes from.

**Commitments carry two properties:**

**A time element**, at both levels. This is what generates questions — if a commitment's clock has
elapsed and nothing was reported, the advisor speaks up.

**An agency grade**, set when written:

| Grade | Example | What the system may do |
|---|---|---|
| `mine` | Walk three evenings a week | Measure it. Floors apply |
| `shared` | Two evenings with Lucy | Track whether it happened; never treat a miss as Adrian's failure |
| `influence` | Chris agrees the V3 terms | Track the attempt, never the outcome |

Adrian can suggest but not enforce another person's actions. Without this grading the system nags him
about things he cannot unilaterally deliver.

**The balance plan uses two different instruments:**
- **Ratios and timeboxing** — a *planning* tool, used when something new arrives. "What time do I have
  spare? Could I reduce time on other projects?"
- **Floors** — a *measurement* tool, used at check-in, with a tolerance band. Skipping a walk or two
  is not a finding; skipping a week is.

**The manifesto changes only by explicit, dated, reasoned amendment** — never as a side effect.
Reversing a ruling is a decision made in the moment; amending the manifesto is recorded. If amending
were easy the manifesto would become a log of what Adrian did anyway, and the system would quietly
disable its own alarm.

**There is no `register.md`.** It was killed. Reality lives in tasks, project status, and the state
tables. The comparison is computed on demand, not stored.

---

## 4. The three triggers — three separate skills

Deliberately different in cost. **Not one flow with a volume knob** — a shared code path always drifts
back to full ceremony.

### Trigger 1 — Check-in. Weekly. Skill: `check-in`

**Opens with the advisors' questions. Never presents a blank page.** "Tell me what's happened" is
work; "did you get to three walks this week?" is just answering. Reporting will not be done reliably;
questions always get answered.

1. Read the last snapshot from `PM/reviews/` — what was outstanding
2. Each advisor, **in parallel**, produces questions from manifesto commitments and its own last-heard
   dates
3. Adrian answers conversationally — this is the whole session from his side
4. Route answers to departments: append to logs, update state tables
5. Advisors return commitment status, new questions, data-gap tasks
6. The `opposition` skill compares against the manifesto and raises collisions
7. Write output — tasks, unanswered questions, unresolved collisions — and a **new snapshot**

**No cap on session length.** Questions only exist where a commitment's clock elapsed and nothing was
reported, so a long session means a lot genuinely went unreported — exactly the session that should be
long. The length control lives in how many commitments Adrian makes, not here.

**Per-department clocks.** The check-in is weekly; the departments are not. Financial may be silent
for eleven weeks and then have something real.

### Trigger 2 — Idea. Skill: `idea`

Rare and allowed to be expensive. Its job is to spot the challenge early — taking on too much, not
following through, working the wrong project.

1. **Quick value test** — tests the idea's **potential value**, not Adrian's capacity. Uses the owning
   advisor's method (§2). Capacity is *not* the entry test: working an idea through both validates it
   and gets it out of Adrian's head, and a capacity gate destroys both.
2. Owning advisor grills to **understand** the idea. Most ideas die here, cheaply
3. All advisors, **in parallel and blind**, ask questions. They assume nothing
4. Adrian answers
5. All advisors, **in parallel and blind**, return positions with costs
6. Conflicts surfaced; `opposition` checks against the manifesto
7. Adrian resolves. **Disposition is forced: commit · park-with-a-trigger · kill.** A park with no
   trigger and no date is a kill nobody wrote down. **This is where capacity applies** — what comes
   off the board
8. Output lands as task, decision or finding in the owning folder; record written to `PM/reviews/`

### Trigger 3 — Routine. Skill: `routine`

**Convenes nobody. Answers in seconds.** "What needs doing so I can move things along."

Reads pre-computed state — tasks by department, project status, data-gap tasks, floor breaches — and
returns the list. Writes nothing. The dashboard is its visual.

---

## 5. Data model

### Per department

| Artifact | Behaviour | Read pattern |
|---|---|---|
| `_assets/data/log.md` | **Append-only**, dated testimony | **Never read whole.** Archive to search |
| `_ai/state.md` | **Rewritten**, fixed size. The state table | Read every session |
| `manifesto.md` | Rewritten on amendment | Read when convened |
| `_ai/{tasks,decisions,findings}.md`, `_ai/facts/` | Standard toolkit scaffold | As normal |

**The state table is the mechanism.** Roughly:

| Tracking | Last heard | Status |
|---|---|---|
| Sleep | 3 Jun | no data — asked twice |
| Evening walks | 28 Jul | 2/week against 3 promised |

"Five weeks of silence" is a **date subtraction**, not a scan of history — so the question costs
nothing and fires reliably. An advisor that must reason its way to noticing a gap will miss it.

### Governing performance rule

**Compute at write time, never at read time.** When something is recorded, update the state table
then. Reading stays cheap permanently, which is what keeps trigger 3 fast.

The real cost is token volume across five advisors, not computation. The fixed-size state table *is*
the optimisation: the log is never read whole, and advisors run **in parallel**, so five seats cost
wall-clock like one.

### History

`PM/reviews/` holds one record per session for triggers 1 and 2. Trigger 3 writes nothing.

Each record includes the **computed comparison as a snapshot**, so the next session reads the last
snapshot and processes only what changed. **The history is also the optimisation.**

History is load-bearing, not decorative — two mechanisms need it: a *run* of rulings against the same
manifesto line, and a repeated floor breach. Drift is only visible across time.

### Rulings

When Adrian overrides advisors, the decision **and its reason** are recorded and returned to every
advisor that took part. The winner learns its objection carried; the loser learns why, or it
re-proposes the same shape of thing next quarter.

**A run of rulings against the same manifesto line means the manifesto is wrong** — the rule was never
"find passive income", it was "find passive income that costs no evenings", and the second half was
never written down. Rulings are a drift detector pointed at the manifesto itself.

---

## 6. Hard constraints on implementation

**6.1 — `CLAUDE.md` holds identity and pointers only.** In every folder it is the smallest,
least-revised file: what this thing is, where to look for the rest. Detail goes in separate files
loaded on demand. Departments contain **projects**, each with its own scaffold — a business idea under
discussion is a project folder, not a section of the department's context file.

**6.2 — Advisor outputs are presented verbatim, never summarised.** Summarising is arbitration wearing
a different hat: compressing five positions into a paragraph decides which tensions matter. Five short
positions read in full are cheaper than a good summary. The `opposition` skill is the one exception,
and narrowly — it compares against the manifesto, it does not summarise positions.

**6.3 — Advisors run as parallel subagent invocations in a single batch.** Sequential execution means
each advisor sees what came before, the first voice anchors the rest, and blindness becomes decorative
while still reading as if it worked.

**6.4 — Brief contamination is a real failure.** The orchestrating skill has read the manifesto; the
brief it writes must be **the idea as Adrian stated it, plus his answers, verbatim**. No summarising,
no framing, no characterisation.

**6.5 — Skills are committed to the repo, in `.claude/skills/`.** Not installed personally. The
existing `~/.claude/skills/` copies are a Hot Iron-specific stale fork and must not be relied on.

---

## 7. Target folder structure

```
Holmes.Administration/
  CLAUDE.md                        identity + binding life facts + pointers
  README.md                        human-readable manual
  .claude/
    agents/
      minister-work.md
      minister-financial.md
      minister-health.md
      minister-family.md
      minister-personal.md
    skills/
      check-in/SKILL.md            trigger 1
      idea/SKILL.md                trigger 2
      routine/SKILL.md             trigger 3
      opposition/SKILL.md          the auditor
      manifesto/SKILL.md           grills the manifesto into existence + amends it
      appoint-advisor/SKILL.md     grills a department into existence
      <reused toolkit skills>      see §8
    settings.json                  hook registration
  PM/
    CLAUDE.md
    manifesto.md                   TEMPLATE ONLY — content comes from a grilling
    reviews/                       session records + snapshots
    _ai/  _assets/  _skills/  _archived/
  Advisors/
    CLAUDE.md
    Work/  Financial/  Health/  Family/  Personal/
      CLAUDE.md
      manifesto.md                 TEMPLATE ONLY
      _ai/
        state.md                   the state table
        tasks.md  decisions.md  findings.md  facts/  task-prds/
      _assets/
        data/log.md                append-only testimony
      _skills/                     the advisor's method
      _archived/
  _system/
    dashboard/                     index.html, assets/, data/
    hooks/                         pre-compact
  PM/AI Toolkit for Personal Governance/
    Shareable/                     source of truth for everything deployed
```

---

## 8. Exact reuse sources

Base: `C:\Enterprise\Holmes.Lifecoach\AI Toolkit for Solopreneurs\Shareable\`

| Copy from | To | Note |
|---|---|---|
| `skills/project-init/` | `.claude/skills/project-init/` | Both `SKILL.md` and `REFERENCE.md` |
| `skills/project-start/` | `.claude/skills/project-start/` | |
| `skills/project-wrap-up/` | `.claude/skills/project-wrap-up/` | **Needs editing** — hardcodes a Hot Iron dashboard path and Hot Iron swimlane keys |
| `skills/project-migrate/` | `.claude/skills/project-migrate/` | |
| `skills/project-update/` | `.claude/skills/project-update/` | |
| `skills/archive-project/` | `.claude/skills/archive-project/` | |
| `skills/grill-me-as/` | `.claude/skills/grill-me-as/` | The engine under every grilling step. Do not reimplement |
| `skills/grilling-handoff/` | `.claude/skills/grilling-handoff/` | |
| `skills/new-skill/` | `.claude/skills/new-skill/` | |
| `hooks/pre-compact.ps1`, `pre-compact.sh`, `settings-example.json` | `_system/hooks/` | |
| `templates/{tasks,decisions,findings}.md` | scaffold source | |
| `templates/function-CLAUDE.md` | basis for department `CLAUDE.md` | |
| `templates/project-CLAUDE.md` | basis for project `CLAUDE.md` | |
| `templates/root-CLAUDE.md` | basis for root `CLAUDE.md` | |
| `memory/` | `PM/AI Toolkit.../Shareable/memory/` | index + four memory-type examples |
| `dashboard/` | `_system/dashboard/` | **Ships without `data/business-functions.json` — you must create it** |

**Do not copy:** `business-init`, `run-cycle`, `to-brief`, `to-work-units` — business-specific.

**Dashboard swimlanes.** Create `_system/dashboard/data/business-functions.json`:

```json
[
  { "key": "PM",        "label": "PM Office", "order": 1 },
  { "key": "Work",      "label": "Work",      "order": 2 },
  { "key": "Financial", "label": "Financial", "order": 3 },
  { "key": "Family",    "label": "Family",    "order": 4 },
  { "key": "Personal",  "label": "Personal",  "order": 5 },
  { "key": "Health",    "label": "Health",    "order": 6 }
]
```

---

## 9. Out of scope

- **Other workspaces** — Hot Iron, Localix, Revvado. The route in is a CEO role added to those
  projects, reporting a business summary this system reads. That is a task for the Work advisor, not a
  dependency of this build.
- **Adrian's actual content** — see rule 0.1.
- **Migrating existing projects** — Adrian does this himself after verification.
- **`register.md`** — killed. Do not create it.
- **A PM agent** — see §2.
- **An opposition agent** — it is a skill.
