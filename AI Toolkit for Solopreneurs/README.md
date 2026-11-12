# AI Toolkit for Solopreneurs

A practical AI workflow system for solo business operators using Claude Code. This toolkit defines how to structure your business folder, layer context so the AI always has the right information, and maintain reusable skills that make repeated tasks faster and more consistent.

Built by and for [The Hot Iron](https://thehotiron.co.uk) — a UK-wide ironing and laundry service run by a one-person leadership team.

---

## Core Idea

An AI assistant is only as useful as the context it has. This system solves that by:

1. **Nesting context files** — a root `CLAUDE.md` sets business-wide conventions; each function and project adds its own layer. Claude reads all three levels before acting.
2. **Standard project scaffolds** — every project starts with the same files under `_ai/`, so nothing is lost between sessions or across machines.
3. **Persistent memory** — a file-based memory system stores facts about your business, preferences, and project state that survive across conversations.
4. **Reusable skills** — common workflows are captured as skills the AI invokes on demand (`/project-init`, `/project-start`, `/project-wrap-up`).
5. **Hooks** — a PreCompact hook preserves memory before context compaction, so long sessions don't lose state.
6. **A project registry and dashboard** — one view of every project's status across all your business functions.

---

## Folder Structure

```
Your Business/
  CLAUDE.md                      <- root business context (always read)
  _assets/                       <- workspace-level shared assets
  _system/
    hooks/                       <- Claude Code hooks
    dashboard/                   <- project dashboard (static SPA)
      data/projects.json         <- project registry
  00 - Cross Function/
    CLAUDE.md                    <- strategy layer context
    _assets/  _archived/  _skills/
    [Project]/                   <- projects sit directly under the function
  02 - Marketing/
    CLAUDE.md
    _assets/  _archived/  _skills/
    Customer/                    <- optional scope folders
      [Project]/
  [etc.]
```

Every project folder looks like this:

```
[Project]/
  CLAUDE.md                      <- project context — the only file at project root
  _ai/
    tasks.md                     <- current state, open tasks, inbox, recently done
    decisions.md                 <- active choices (working set, not an archive)
    findings.md                  <- observed facts and analysis
    facts/                       <- graduated facts, loaded only when relevant
    task-prds/                   <- briefs and captured items needing detail
  _assets/                       <- files belonging to this project alone
  _skills/                       <- project-scoped skills
```

`_assets/`, `_skills/`, `_ai/facts/`, and `_ai/task-prds/` each need a `.gitkeep` while empty. Git cannot track an empty directory, so a bare folder is invisible from creation and vanishes on the first `git clean`.

**There is no `Active Projects/` wrapper.** Active projects sit directly under their function (or scope folder); completed ones move to the function's `_archived/`.

---

## What's in `Shareable/`

Ready-to-use files you can copy into your own setup.

### `skills/`

| Skill | What it does |
|---|---|
| `project-init/` | Interview-driven scaffold creator — validates the function, interviews you one question at a time, stress-tests the idea, then writes every file and registers the project |
| `project-start/` | Conversational session kick-off — briefs the routine, open tasks, and un-triaged inbox items so you don't have to open files to remember where you were |
| `project-wrap-up/` | End-of-session save — updates tasks, decisions, findings, the registry, and memory, then prints a summary for you to review and commit |
| `project-migrate/` | Builds a scaffold from scratch for an old or unstructured folder, mapping existing content into the right files |
| `project-update/` | Patches a drifted scaffold up to the current standard without re-interviewing content that already exists |
| `archive-project/` | Moves a completed project to its function's `_archived/` and updates its status and registry entry |
| `grill-me-as/` | Stress-tests a plan by interviewing you from a named role — `/grill-me-as "Financial Advisor"`. Writes each resolved decision to `_ai/decisions.md` as it goes |
| `grilling-handoff/` | Captures an out-of-scope item mid-interview into `## Inbox` without derailing the session |
| `new-skill/` | Scaffolds a new function-scoped or project-scoped skill |
| `business-init/` | Builds a whole new business workspace — thin entry point over `BOOTSTRAP.md`, for when the toolkit is already installed |
| `run-cycle/` | Runs one cycle of a recurring project as delegated work — see [Delegating Knowledge Work](#delegating-knowledge-work) |
| `to-brief/` | Turns a planning conversation into a brief for a deliverable |
| `to-work-units/` | Breaks a brief into agent-executable work units with blocking edges |

These deploy to your **workspace** `.claude/skills/` — see [Where skills live](#where-skills-live) below.

### `agents/`

| Agent | What it does |
|---|---|
| `knowledge-reviewer.md` | Judges a produced artifact against the project's `_ai/acceptance.md` and returns PASS or specific violations. Read-only |

Agents deploy to your workspace `.claude/agents/`. They are consumed by the skills above rather than invoked directly. A newly added agent needs a Claude Code session restart before it can be called.

---

## Where skills live

Claude Code loads skills from two places that matter here, and **personal overrides project**:

| Location | Scope | Holds |
|---|---|---|
| `~/.claude/skills/` | every project on the machine | tools about *how you work* |
| `<workspace>/.claude/skills/` | this business only | **this toolkit** |

**Toolkit skills go in the workspace, and are committed to git.** They read your `CLAUDE.md` hierarchy, your `projects.json`, your `_ai/` scaffold — they are coupled to a *business*, not to a machine. Installing them personally means two businesses on one machine fight over every shared skill name.

The dividing test is one question: **does the skill read the business's structure?** Yes → workspace. No → personal. That puts `project-init`, `run-cycle`, and `grill-me-as` in the workspace, and Matt Pocock's engineering suite, `grilling`, `research`, and `tdd` in your personal folder where they belong.

Committing `.claude/skills/` also means a fresh checkout on any machine has working skills with **no install step** — which matters as soon as you work across two computers.

### The shadowing trap

Because personal overrides project, a leftover personal copy of a toolkit skill **silently shadows** the workspace copy. There is no error and no warning: the skill just never loads. You edit it, nothing changes, and the natural conclusion is that your edit was wrong rather than that it was never read.

If you are moving an existing setup to this layout, deploying to the workspace is only half the job — **deleting the personal copies is the half that actually works.** `/ai-toolkit-sync drift` reports any skill in this state.

### `templates/`

| File | Use for |
|---|---|
| `root-CLAUDE.md` | Your root business context file |
| `function-CLAUDE.md` | Each business function's context file |
| `project-CLAUDE.md` | Each project's context file — the single source of truth for the project scaffold |
| `tasks.md` | Task tracking: current state, open, inbox, recently done |
| `decisions.md` | Active choices with date, decision, and rationale |
| `findings.md` | Factual observations with status tracking |

### `hooks/`

| File | What it does |
|---|---|
| `pre-compact.ps1` | Windows PreCompact hook — injects memory into compaction context |
| `pre-compact.sh` | Mac/Linux/WSL equivalent |
| `settings-example.json` | How to wire the hook into `.claude/settings.json` |

**Why the PreCompact hook matters:** Claude Code auto-compacts long conversations to free context. Without the hook, your memory notes may not survive summarisation. The hook fires just before compaction and injects all your memory files so Claude preserves them.

**No configuration needed.** The hook derives your memory directory at runtime — first from the transcript path Claude Code passes it, falling back to the working directory. Earlier versions asked you to paste in a project slug; don't. A hardcoded slug breaks the moment you rename, move, or check out the workspace on a second machine, and it fails *silently*. This one warns instead.

### `memory/`

| File | Use for |
|---|---|
| `MEMORY.md` | The index file — loaded into every session |
| `user-example.md` | Template for user profile memories |
| `feedback-example.md` | Template for behaviour guidance memories |
| `project-example.md` | Template for active project state memories |
| `reference-example.md` | Template for external system pointer memories |

Memory files live at `~/.claude/projects/<your-project-slug>/memory/`. They are machine-local and not checked into git, so the scaffold files under `_ai/` are the cross-machine source of truth.

### `dashboard/`

A static single-page dashboard showing every project's status, function, open task count, and last-worked date, read from `_system/dashboard/data/projects.json`. The registry is written by `/project-init` and kept current by `/project-wrap-up`.

---

## Quick Start

Copy this project folder into an empty business folder, open Claude Code there, and say:

> Read `00 - Cross Function/AI Toolkit for Solopreneurs/Shareable/BOOTSTRAP.md` and follow it.

That is the whole setup. `BOOTSTRAP.md` interviews you about the business, creates the function folders, writes your root and function `CLAUDE.md` files from your answers, installs the skills, agents, and hooks, seeds the memory directory, and registers the project.

**Why a runbook rather than a script or a skill:** Claude Code runs fine with nothing installed, so the bootstrap only needs to be *readable*, not installed. That sidesteps the chicken-and-egg where `/ai-toolkit-sync` is the thing that installs skills but is itself a skill. It also means the bootstrap can adapt and interview you, which a shell script cannot.

Once the toolkit is installed, `/business-init` runs the same process with a shorter invocation — useful for a second or third business.

Two things to know afterwards:

1. **Restart Claude Code.** Agents in `.claude/agents/` are not picked up until a fresh session.
2. **Then `/project-init`** for your first real project, `/project-start` to open each session, `/project-wrap-up` to close it.

### If you already have a business set up on this machine

`~/.claude/skills/` is global per machine, **not per business**. A second business installing the same skill names will overwrite the first one's copies, and last-sync-wins is discovered weeks later as inexplicable behaviour.

`BOOTSTRAP.md` guards against this: it compares every skill before writing and **stops** on any difference rather than overwriting, offering to install under a business-prefixed name, skip the collisions, or abandon and let you decide. It is a stop, not a warning to push past.

---

## The Working Loop

```
/project-init      create a project, once
     |
/project-start     open a session — what's the routine, what's open, what's queued
     |
     ...work...
     |
/project-wrap-up   save state — tasks, decisions, findings, registry, memory
```

`/project-start` and `/project-wrap-up` are the two you use every day. Everything else is occasional.

---

## Delegating Knowledge Work

The hardest problem in solo AI work is not getting good output — it is that *you* are the bottleneck. On a coding project you can plan carefully and let an agent implement unattended, because tests tell it whether it succeeded. Knowledge work has no tests, so every judgement routes back through you.

This toolkit's answer is to manufacture the missing verifier.

### The four properties

Autonomous implementation needs all four. Most knowledge work has none:

| Property | Coding | Knowledge work, by default |
|---|---|---|
| A written contract per unit of work | the ticket | a project-level routine at best |
| Units sized to one fresh context window | tracer-bullet slices | "the monthly run" |
| A queue a cold agent can pick up | issue tracker | it lives in the conversation |
| **A verifier that is not you** | tests, typecheck | **you** |

### The pieces

**`_ai/acceptance.md`** — the manufactured verifier, one per delegating project. Four checkable sections — **Structure** (required output sections, in order), **Must** (assertions), **Never** (prohibitions), **Data** (joins, filters, paths) — plus a **Human gate** section listing judgements deliberately left uncheckable.

Write it by *extracting* rules that already exist in your project's working instructions, not by inventing new ones. "Never mention a service we don't offer" is probably already written down in prose somewhere; the work is turning it into a line a reviewer can check.

**`knowledge-reviewer`** — an agent that receives the work unit, the acceptance file, and the artifact, and nothing about how the artifact was made. Read-only. Returns PASS or specific violations, each quoting the check it breaches. It must not be the agent that produced the work.

**The skills:**

| Skill | For | What it does |
|---|---|---|
| `run-cycle/` | Ongoing projects | Expands the `## Playbook` over its natural unit, produces each with a cold subagent in parallel, reviews every output, returns one exception report |
| `to-brief/` | Defined Goal projects | Synthesises a conversation into a brief — no interview |
| `to-work-units/` | Defined Goal projects | Breaks a brief into units, each executable cold, each declaring what blocks it |

### Where you stay

Three touchpoints, deliberately:

1. **Approving the breakdown** (or the acceptance file, once per project) — the last gate before the work runs unattended
2. **The exception report** — only the units that failed review twice
3. **The publish button** — anything reaching a customer, a website, or a public profile

Drafting and reviewing are delegable. Publishing is not. A failing test fails loudly; a plausible-but-wrong knowledge artifact just goes out.

### When not to use it

This pays where work repeats over a natural unit and a wrong output is recoverable by re-running. It costs more than it saves on one-off strategy work, and it is redundant on code repositories, which already have a better pipeline. Expect roughly a quarter of your projects to qualify — if it applies to everything, the test is wrong.

---

## The Four Memory Types

Claude's memory system uses four types, each stored as a separate file in the memory directory:

| Type | What to store |
|---|---|
| `user` | Your role, background, working style, preferences |
| `feedback` | Guidance on how Claude should approach recurring tasks — corrections and validated approaches |
| `project` | A pointer to the project's scaffold files — not a summary of their content |
| `reference` | Pointers to external systems — dashboards, issue trackers, shared drives |

The `MEMORY.md` index is loaded automatically at the start of every session. Individual files are read on demand when relevant.

**Project memories are pointers, not summaries.** When saving a project memory, write a pointer to the scaffold files rather than summarising their content:

> Active project at `02 - Marketing/Customer/Service Pages/`. Read `_ai/tasks.md`, `_ai/decisions.md`, and `_ai/findings.md` for current state.

The scaffold files are the source of truth. Duplicating their content in memory creates two things to maintain and introduces drift as work progresses. Because memories are pointers, the memory system needs no maintenance tooling — `/project-wrap-up` keeps the scaffold files healthy.

---

## Decisions, Findings, and Facts

Three files, three jobs — the split is what stops any of them becoming a graveyard.

- **`findings.md`** — things you *observed*. Factual, dated, with a source. Status: Open, Actioned, or Superseded.
- **`decisions.md`** — things you *chose*, with a one-line rationale. A working set, not an archive.
- **`facts/`** — decisions that have fully settled and are enforced by a skill. They graduate out of `decisions.md` to a topic file with a `Load when:` line, leaving a one-liner pointer in `CLAUDE.md`.

Graduation keeps `decisions.md` short enough to actually read, and keeps settled detail out of context until the work that needs it comes up.

---

*Maintained as part of the AI Toolkit for Solopreneurs project.*
