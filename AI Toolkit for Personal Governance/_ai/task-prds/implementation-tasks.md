# Implementation Tasks — Personal Governance Workspace

**Read `implementation-brief.md` first. It is the spec. This file is the work order.**

**Target:** `C:\Enterprise\Holmes.Administration`
**Reuse source:** `C:\Enterprise\Holmes.Lifecoach\AI Toolkit for Solopreneurs\Shareable\`

Tasks are grouped in phases. Phases are ordered; tasks within a phase are independent unless a
dependency is stated. Every task has **acceptance criteria** that a second agent can check without
having done the work.

> **The single most important rule:** build structure, never content. Any file that should hold
> Adrian's goals, commitments, targets or values must be a **template with placeholder comments**. An
> invented manifesto is a failing result, not a partial success.

---

## Phase 1 — Repo scaffold

### T1 · Root folders
Create in `Holmes.Administration/`: `.claude/agents/`, `.claude/skills/`, `PM/`, `Advisors/`,
`_system/dashboard/data/`, `_system/hooks/`.

**Accept:** all six paths exist. `git status` shows them as untracked or staged (empty dirs need a
`.gitkeep`).

### T2 · Root `CLAUDE.md`
Base it on `templates/root-CLAUDE.md`. Must contain: who Adrian is, the **binding life facts** layer
(durable constraints read before any advisor speaks), and **pointers** to `PM/manifesto.md`,
`Advisors/`, and `_system/dashboard/`.

**Accept:** file exists; under 120 lines; contains a pointer to `PM/manifesto.md`; contains a "binding
life facts" or equivalently-named section; contains **no** financial baseline table, **no** dated
status snapshots, and **no** commitments. (Those rot — the old workspace's root file carried a
thirteen-month-stale baseline.)

### T3 · `.claude/settings.json`
Register the PreCompact hook, using `hooks/settings-example.json` as the model, with paths pointing at
`_system/hooks/`.

**Accept:** valid JSON; references `_system/hooks/pre-compact.*`; parses with a JSON parser.

---

## Phase 2 — Reused components

### T4 · Copy toolkit skills
Copy the nine skills listed in brief §8 into `.claude/skills/`, preserving each skill's folder and all
its files (`SKILL.md`, and `REFERENCE.md` where present).

**Accept:** `.claude/skills/` contains exactly these nine plus the six from Phase 5:
`project-init`, `project-start`, `project-wrap-up`, `project-migrate`, `project-update`,
`archive-project`, `grill-me-as`, `grilling-handoff`, `new-skill`.
**Must NOT contain:** `business-init`, `run-cycle`, `to-brief`, `to-work-units`.
Each copied skill has a `SKILL.md` with valid YAML frontmatter containing `name` and `description`.

### T5 · De-Hot-Iron `project-wrap-up`
The copied skill hardcodes a Hot Iron dashboard path
(`01 - Create Value/Company/HotIron.Business.Dashboard/data/projects.json`) and Hot Iron swimlane keys
as valid `function` values. Repoint it at `_system/dashboard/data/projects.json` and the six swimlane
keys from brief §8.

**Accept:** `grep -ri "hotiron\|hot iron\|01 - Create Value" .claude/skills/` returns **nothing**. The
skill references `_system/dashboard/data/projects.json`. Valid `function` values are exactly
`PM · Work · Financial · Family · Personal · Health`.

### T6 · Hooks
Copy `pre-compact.ps1`, `pre-compact.sh`, `settings-example.json` to `_system/hooks/`.

**Accept:** all three exist. `pre-compact.ps1` is non-empty.

### T7 · Dashboard
Copy `dashboard/` to `_system/dashboard/`. Create `data/business-functions.json` with the exact
six-lane JSON in brief §8. Create `data/projects.json` as an empty array `[]`.

**Accept:** `_system/dashboard/index.html` exists; `assets/` contains a `.js` and a `.css`;
`data/business-functions.json` parses and contains exactly six objects with keys
`PM, Work, Financial, Family, Personal, Health`; `data/projects.json` parses as `[]`.
**Manual check required:** open `index.html` in a browser — six swimlanes must render. Record the
result; do not mark T7 done on file existence alone.

---

## Phase 3 — PM office and departments

### T8 · PM office
Create `PM/` with `CLAUDE.md`, `reviews/`, `_ai/{tasks,decisions,findings}.md`, `_ai/facts/`,
`_ai/task-prds/`, `_assets/`, `_skills/`, `_archived/`. Use the toolkit `templates/` for the `_ai/`
files. `PM/CLAUDE.md` describes how the office works and **points at** `manifesto.md` rather than
containing it.

**Accept:** all paths exist; `PM/CLAUDE.md` under 80 lines and contains a pointer to `manifesto.md`;
`PM/_ai/tasks.md` contains an `## Inbox` section.

### T9 · `PM/manifesto.md` — TEMPLATE ONLY
Sections: **Binding constraints** (pointing at root `CLAUDE.md`, not restating it) · **Targets** ·
**Commitments** · **Slot rule** · **Not-yet list, with triggers** · **Balance plan** · **Amendment
log**.

Each commitment row carries a **time element** and an **agency grade** (`mine` / `shared` /
`influence`).

**Accept:** every section present; every section body is a placeholder comment naming what the
grilling will fill in; the commitments table has columns for both time element and agency grade; the
file contains **no** actual target, number, date, or commitment. **Verifier must fail this task if any
plausible-looking Adrian content is present.**

### T10 · `Advisors/CLAUDE.md`
Explains the department model: mandate lives in `.claude/agents/`, department lives here, advisors
read the PM manifesto, output contract is position + questions + data-gap, "nothing this week" is
valid, an empty department is legitimate.

**Accept:** exists; names all five departments; states the three-part output contract.

### T11 · Five department scaffolds
For each of `Work`, `Financial`, `Health`, `Family`, `Personal` create:
`CLAUDE.md` · `manifesto.md` (template) · `_ai/state.md` · `_ai/{tasks,decisions,findings}.md` ·
`_ai/facts/` · `_ai/task-prds/` · `_assets/data/log.md` · `_skills/` · `_archived/`.

`_ai/state.md` is the **state table**: columns `Tracking | Last heard | Status`, header row only.
`_assets/data/log.md` is append-only, with a header explaining it is never read whole.

**Accept:** all five departments have all nine paths. Each `_ai/state.md` has the three-column header.
Each `_assets/data/log.md` is empty apart from its header. Each `manifesto.md` is a template with
placeholders and **no invented content**. Each `CLAUDE.md` is under 60 lines.

---

## Phase 4 — Agents

### T12 · Five minister agents
Create `.claude/agents/minister-{work,financial,health,family,personal}.md`. Each needs YAML
frontmatter (`name`, `description`, `tools`) and a body stating:

- Its **partial mandate** — accountable for its department, explicitly not required to be balanced
- That it reads: its own department (`CLAUDE.md`, `manifesto.md`, `_ai/state.md`, `_assets/data/`) and
  `PM/manifesto.md`
- The **three-part output contract** — position with cost · questions · data-gap escalation
- **No hedging.** "It depends" is not an answer
- **Never assert facts it does not hold** — a gap produces a question and a task
- That "nothing this week" is a valid output
- A pointer to its method skill in `Advisors/<Dept>/_skills/`

**Accept:** five files exist, named exactly as above. Each has valid frontmatter. Each contains the
three-part contract and the no-hedging rule. **None** contains invented departmental content —
mandates describe *the role*, not Adrian's actual goals. **No** `minister-opposition.md` or PM agent
exists.

---

## Phase 5 — Skills

Each is a folder in `.claude/skills/` with a `SKILL.md` carrying valid YAML frontmatter.

### T13 · `check-in` — trigger 1
Implements brief §4 trigger 1, all seven steps. Must specify: **questions first, never a blank page**;
advisors launched **in parallel in a single batch**; per-department clocks; **no cap on length**;
writes a snapshot to `PM/reviews/`.

**Accept:** contains all seven steps in order; explicitly states parallel launch; explicitly states no
length cap; names `PM/reviews/` as the snapshot destination; states "nothing this week" is valid.

### T14 · `idea` — trigger 2
Implements brief §4 trigger 2, all eight steps. Must specify: the quick test is on **potential value,
not capacity**; two blind rounds (questions, then positions), each **parallel**; the **verbatim brief
rule** (6.4); forced disposition commit/park-with-trigger/kill; capacity applies at disposition.

**Accept:** all eight steps present; contains the verbatim-brief rule; states capacity is *not* the
entry test; forced disposition with all three outcomes named; writes a record to `PM/reviews/`.

### T15 · `routine` — trigger 3
Reads pre-computed state and returns what needs doing. **Convenes no advisors. Writes nothing.**

**Accept:** explicitly states it convenes no agents and writes no files; reads
`_system/dashboard/data/projects.json`, department `_ai/tasks.md` files, and `_ai/state.md` files.

### T16 · `opposition`
Compares decisions against the manifesto; fires on the **first** collision; **persists** via a file of
unresolved collisions re-raised each session; forces the choice **amend or reverse**.

**Accept:** states first-collision firing; owns a named collisions file under `PM/`; states the
amend-or-reverse choice; states it does **not** argue against the plan.

### T17 · `manifesto`
Grills the PM manifesto into existence (v1), and runs dated, reasoned amendments thereafter.

**Accept:** invokes `grill-me-as` rather than reimplementing grilling; writes only to
`PM/manifesto.md`; requires every amendment to be dated with a reason and appended to the amendment
log.

### T18 · `appoint-advisor`
Grills one department into existence: its mandate, its data demands, its manifesto, and its method
(including which chosen sources — e.g. *The Personal MBA* — get distilled into it).

**Accept:** invokes `grill-me-as`; writes to `.claude/agents/minister-<name>.md`,
`Advisors/<Dept>/manifesto.md` and `Advisors/<Dept>/_skills/`; explicitly asks which sources to
distil.

---

## Phase 6 — Toolkit project and docs

### T19 · Toolkit project skeleton
Create `PM/AI Toolkit for Personal Governance/` in the new repo with `CLAUDE.md`, `README.md`, `_ai/`,
`_assets/`, `_skills/`, and `Shareable/{agents,skills,templates,memory,hooks,dashboard}`. Copy the
current `_ai/decisions.md` and `_ai/findings.md` from the old project — **these are the current design
record and must survive the move**. Copy `memory/` from the Solopreneurs `Shareable/`.

**Accept:** structure exists; `_ai/decisions.md` present and contains the greenfield session's
decisions; **does not** contain the superseded 39-decision file from `Holmes.Lifecoach/PM/_ai/`.

### T20 · Populate `Shareable/`
Copy every component authored in Phases 3–5 into the matching `Shareable/` folder, so the source of
truth and the deployed copy start identical.

**Accept:** for each of the five agents and six new skills, a byte-identical copy exists under
`Shareable/`. `Shareable/dashboard/data/business-functions.json` **is present** (the Solopreneurs copy
ships without it — that drift is a known defect and must not be repeated).

### T21 · `README.md`
Human-readable manual for the workspace: what it is, the cast, the three triggers, the folder
structure with file purposes, and how to get started.

**Accept:** exists; documents all three triggers; documents all five departments; documents the
folder structure; states that the opposition is a skill and there is no PM agent.

### T22 · `BOOTSTRAP.md`
Runbook for standing this up in a fresh workspace, with **no install step** — skills are committed to
the repo, not installed to `~/.claude/`.

**Accept:** exists in `Shareable/`; contains no instruction to copy skills into `~/.claude/skills/`.

### T23 · First commit
Stage and commit everything with a descriptive message. **Do not push.**

**Accept:** `git log` shows a commit beyond `b5049fc Initial commit`; `git status` is clean; no remote
push occurred.

---

## Verification pass — for the second agent

Do not trust the build agent's report. Check the artifacts.

**V1 — Structure.** Every path in brief §7 exists. No extra top-level folders.

**V2 — The content rule.** This is the one most likely to have been broken, and the most damaging.
Open `PM/manifesto.md`, all five `Advisors/*/manifesto.md`, all five `minister-*.md`, and root
`CLAUDE.md`. **Fail any file containing a specific goal, target, number, date, commitment or priority
that Adrian did not supply.** Placeholders are correct; plausible content is a failure.

**V3 — Forbidden artifacts.** None of these may exist: `register.md` anywhere · a PM agent ·
`.claude/agents/opposition.md` · any Hot Iron path or swimlane key · `business-init`, `run-cycle`,
`to-brief`, `to-work-units` in `.claude/skills/`.

**V4 — Skill contracts.** For T13–T18, confirm each acceptance criterion literally appears. Grep for
the load-bearing phrases: parallel launch, verbatim brief, no length cap, first-collision, convenes no
agents.

**V5 — Frontmatter.** Every `SKILL.md` and every agent file has parseable YAML with `name` and
`description`.

**V6 — Dashboard.** Open `_system/dashboard/index.html` in a browser. **Six swimlanes must render.**
File existence is not sufficient — the Solopreneurs copy ships without `business-functions.json` and
renders no lanes, which is exactly the failure being guarded against.

**V7 — Shareable parity.** Every agent and new skill exists identically in both `.claude/` and
`Shareable/`. Report any divergence as a defect.

**Report format:** per task — `PASS` / `FAIL` / `PARTIAL`, with the specific criterion that failed and
the file path. Do not fix; report.
