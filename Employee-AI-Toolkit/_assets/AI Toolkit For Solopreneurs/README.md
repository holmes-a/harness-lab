# AI Toolkit for Solopreneurs

A practical AI workflow system for solo business operators using Claude Code. This toolkit defines how to structure your business folder, layer context so the AI always has the right information, and maintain reusable skills that make repeated tasks faster and more consistent.

Built by and for [The Hot Iron](https://thehotiron.co.uk) — a UK-wide ironing and laundry service run by a one-person leadership team.

---

## Core Idea

An AI assistant is only as useful as the context it has. This system solves that by:

1. **Nesting context files** — a root `CLAUDE.md` sets business-wide conventions; each function and project adds its own layer. Claude reads all three levels before acting.
2. **Standard project scaffolds** — every project starts with the same four files (`CLAUDE.md`, `tasks.md`, `decisions.md`, `findings.md`) so nothing is lost between sessions or across machines.
3. **Persistent memory** — a file-based memory system at `~/.claude/projects/<slug>/memory/` stores facts about your business, preferences, and project state that survive across conversations.
4. **Reusable skills** — common workflows are captured as skills the AI invokes on demand (`/wrap-up`, `/project-setup`, etc.).
5. **Hooks** — Claude Code hooks automate memory preservation before context compaction, so long sessions don't lose state.

---

## Folder Structure

```
Your Business/
  CLAUDE.md                     <- root business context (always read)
  00 - Cross Function/
    CLAUDE.md                   <- strategy layer context
    Active Projects/
      [Project]/
        CLAUDE.md               <- project-specific context
        tasks.md                <- open tasks + recently done
        decisions.md            <- settled choices
        findings.md             <- observed facts and analysis
        Assets/
  01 - Create Value/
    CLAUDE.md
    ...
  02 - Marketing/
    CLAUDE.md
    ...
  [etc.]
```

---

## What's in Shareable/

Ready-to-use files you can copy into your own setup.

### `hooks/`

| File | What it does |
|---|---|
| `pre-compact.ps1` | Windows PreCompact hook — injects memory into compaction context |
| `pre-compact.sh` | Mac/Linux equivalent |
| `settings-example.json` | How to wire the hook into `.claude/settings.json` |

**Why the PreCompact hook matters:** Claude Code auto-compacts long conversations to free context. Without the hook, your memory notes may not survive the summarisation. The hook fires just before compaction and injects all your memory files so Claude preserves them.

### `skills/`

| Skill | What it does |
|---|---|
| `wrap-up/` | End-of-session save — updates tasks, decisions, findings, and memory, then prints a summary for review |
| `project-setup/` | Interview-driven scaffold creator — asks one question at a time then writes all project files |
| `project-convert/` | Migrates an existing project folder to the standard scaffold without losing content |
| `grill-me-as/` | Stress-tests a plan by interviewing you from a named business role — `/grill-me-as CFO`, `/grill-me-as Head of Marketing`, etc. |

Install by copying the skill folder to `~/.claude/skills/`. Invoke with `/wrap-up`, `/project-setup`, or `/project-convert`.

### `templates/`

| File | Use for |
|---|---|
| `root-CLAUDE.md` | Your root business context file |
| `project-CLAUDE.md` | Each project's context file |
| `tasks.md` | Task tracking with open / recently done sections |
| `decisions.md` | Settled choices with date, decision, and rationale |
| `findings.md` | Factual observations with status tracking |

### `memory/`

| File | Use for |
|---|---|
| `MEMORY.md` | The index file — loaded into every session |
| `user-example.md` | Template for user profile memories |
| `feedback-example.md` | Template for behaviour guidance memories |
| `project-example.md` | Template for active project state memories |
| `reference-example.md` | Template for external system pointer memories |

Memory files live at `~/.claude/projects/<your-project-slug>/memory/`. They are not checked into git (machine-local), so the project scaffold files (tasks.md, decisions.md, findings.md) are the cross-machine source of truth.

---

## Quick Start

1. Copy `templates/root-CLAUDE.md` to your project root as `CLAUDE.md` and fill it in
2. Create a folder per business function (`01 - Create Value/`, `02 - Marketing/`, etc.), each with its own `CLAUDE.md`
3. For each piece of work, create a project folder using the `templates/project-CLAUDE.md`, `tasks.md`, `decisions.md`, and `findings.md` templates
4. Install the PreCompact hook (`hooks/pre-compact.ps1` or `.sh`) and wire it up per `hooks/settings-example.json`
5. Install the `/wrap-up` skill by copying `skills/wrap-up/` to `~/.claude/skills/`
6. At the end of each session, run `/wrap-up` — Claude updates your scaffold files and prints a summary to commit

---

## The Four Memory Types

Claude's memory system uses four types, each stored as a separate file in the memory directory:

| Type | What to store |
|---|---|
| `user` | Your role, background, working style, preferences |
| `feedback` | Guidance on how Claude should approach recurring tasks — corrections and validated approaches |
| `project` | Current state of active work — what's in progress, key constraints, next steps |
| `reference` | Pointers to external systems — dashboards, issue trackers, shared drives |

The `MEMORY.md` index is loaded automatically at the start of every session. Individual files are read on demand when relevant.

---

*Maintained as part of the AI Toolkit for Solopreneurs project.*
