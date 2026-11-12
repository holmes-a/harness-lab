# Saturn AI Toolkit — Shareable Resources

A practical AI workflow system for Saturn Visual Solutions employees. Provider-agnostic by design — the scaffold pattern works regardless of whether you use Claude Code, Codex CLI, or another tool. Provider-specific resources (hooks, skills) include adaptation notes where needed.

---

## What's Here

| Folder | Contents |
|---|---|
| `hooks/` | Pre-compact hook — injects context into the tool's compaction step so long sessions don't lose state |
| `skills/` | Nine skills: `/project-init`, `/role-init`, `/project-wrap-up`, `/project-update`, `/project-migrate`, `/archive-project-or-role`, `/grill-me-as`, `/grilling-handoff`, `/workspace-new-skill` |
| `templates/` | Context hierarchy templates (workspace, role, business function) and project scaffold files (tasks, decisions, findings) |
| `dashboard/` | Built dashboard SPA (dist files) — deployed to `_system/dashboard/` via the sync skill |

---

## How the Harness Works

The toolkit solves one core problem: **AI assistants forget things between sessions and lose context in long ones**. The harness addresses this with three mechanisms that work together.

### 1. Context hierarchy

Context is loaded in layers, from broadest to narrowest:

```
Workspace CLAUDE.md     ← who you are, your tools, your preferences
  └── Role CLAUDE.md    ← this role's scope and responsibilities
        └── Project CLAUDE.md  ← this project's purpose, constraints, stakeholders
```

When you start a session and declare a project, the AI reads all three layers before acting. This means it always knows who you are, what hat you're wearing, and what you're trying to achieve — without you having to explain it.

Context files capture **stable facts** and change only by deliberate edit. They do not accumulate notes or grow as work progresses.

### 2. Scaffold files

Every project has scaffold files under an `_ai/` subfolder that hold the **live state** of the work:

| File | What it holds | Grows how |
|---|---|---|
| `_ai/tasks.md` | Open tasks + recently done | Add tasks freely; prune done items (keep last 3–5) |
| `_ai/decisions.md` | Settled choices | Add when a decision is made; prune superseded entries |
| `_ai/findings.md` | Observed facts and analysis | Add when something is discovered; prune Actioned/Superseded entries |
| `_ai/facts/` | Graduated facts — stable settled knowledge | Promoted from `decisions.md` when a decision is fully resolved |

These files are plain markdown committed to git. Any AI tool can read and update them. The AI checks them at the start of each session so it knows exactly where you left off.

**Developer projects** use a lighter scaffold: `_ai/tasks.md` only, plus an `inputs.md` file for capturing research inputs. No `decisions.md` or `findings.md` — developer work flows through code and commits rather than tracked decisions and findings.

### 3. The pre-compact hook

In a long session, the AI tool may automatically compact (summarise) the conversation to stay within its context window. Without intervention, state and context can be lost during this step.

The pre-compact hook fires before compaction, reads your context hierarchy and scaffold files, and injects their content into the compaction prompt — so the AI summarises with full awareness of what matters. The hook is installed once at the workspace level and protects every project automatically. See `hooks/` for implementation.

---

## Session Lifecycle

A typical working session:

**Start**
1. Declare your project: *"I'd like to work on [project name]"*
2. The AI reads the context hierarchy and scaffold files — no briefing needed
3. The AI checks for Open findings before starting work

**During**
4. Work proceeds; the AI updates scaffold files as tasks complete, decisions are made, and findings are recorded
5. If the session runs long, the pre-compact hook fires automatically to protect context

**End**
6. Run `/project-wrap-up` — the AI updates all scaffold files, applies pruning rules, and prints a summary for review
7. Review the output, then commit the changed files to git

The next session starts at step 1 and picks up exactly where this one left off.

---

## Scaffold File Reference

### _ai/tasks.md

Records what needs doing and what was recently done. The current-state line at the top gives the AI a one-sentence orientation before it reads the details.

```markdown
[Current state — one sentence describing where the project is right now]

## Open

### [Workstream Name]
- [ ] Task description

## Recently Done
<!-- Keep last 3-5 completed items; delete older ones -->
- [x] Completed task (YYYY-MM-DD)
```

**Pruning rule:** Keep the last 3–5 completed items under Recently Done. Delete older ones during `/project-wrap-up`. Open tasks are never pruned — they stay until completed or explicitly dropped.

---

### _ai/decisions.md

Records settled choices. The AI checks this file before starting work to avoid re-opening resolved questions. If you find yourself relitigating a decision, check here first.

```markdown
## [Short title]
**Date:** YYYY-MM-DD
**Decision:** [one sentence]
**Rationale:** [one sentence]
**Finding:** [ref to findings.md entry, if any]
**Supersedes:** [ref to earlier decision, if any]
```

**Pruning rule:** Keep all active decisions. Remove an entry once another decision carries `Supersedes: [that entry]` and is at least one session old. The superseding entry is the authoritative record — the superseded one is redundant once the new decision is established.

---

### _ai/findings.md

Records observed facts and analysis — things discovered during the project that may inform a decision. Findings are transient: they exist to become decisions. Keep entries factual, not interpretive.

```markdown
## [Short title]
**Date:** YYYY-MM-DD
**Finding:** [one sentence — factual, not interpretive]
**Source:** [test result / analysis / external research / user feedback]
**Status:** Open | Actioned | Superseded
**Decision:** [ref to decisions.md entry, once made]
```

**Status values:**
- `Open` — unresolved; the AI will review this before starting work each session
- `Actioned` — a decision has been made based on this finding; Decision ref recorded
- `Superseded` — overtaken by a later finding or decision

**Pruning rule:** Keep all Open findings. Remove Actioned or Superseded findings after one full wrap-up cycle has passed (i.e., they were written in a prior session, not the current one). Once a finding has a Decision reference and that decision is stable, the finding has served its purpose.

---

## Skills

### /project-init [Role] [Name]

Creates a new project from scratch. Pass the role folder and project name as arguments:

```
/project-init Technical-Director "Board AI Paper"
/project-init Compliance-Officer "ISO 27001 Surveillance Audit 2026"
```

The skill:
1. Validates [Role] against existing role folders — flags mismatches, suggests alternatives
2. Reads the workspace and role context so it understands what you do
3. Interviews you with standard + role-specific questions (via `/role-init`)
4. Stress-tests the project concept from the role's perspective (via `/grill-me-as`) before any files are created
5. Confirms the full scaffold with you, then writes all files

### /role-init [Role Name]

Creates a new role folder, writes its CLAUDE.md, and adds the role to the workspace CLAUDE.md. Also provides role-specific project interview questions used internally by `/project-init`.

When `/project-init` encounters a role that doesn't exist, it invokes this skill automatically after the user confirms the new role. Can also be run directly to add a role at any time.

### /grill-me-as [Role]

Interviews you relentlessly about a plan or decision from a named role's perspective — one question at a time, with a recommended answer for each. Use when stress-testing any plan, validating assumptions, or thinking through a decision from a different functional angle.

### /project-wrap-up

Run at the end of every session. The AI:
1. Updates `_ai/tasks.md` — marks completed tasks, adds any new ones identified during the session
2. Updates `_ai/decisions.md` — adds decisions made during the session, removes superseded entries per the pruning rule
3. Updates `_ai/findings.md` — adds new findings, updates statuses, removes prunable entries
4. Prints a summary of all changes for review before you commit

This is the habit that makes the system work. Without it, scaffold files drift from the actual session state.

### /project-update

Patches an existing scaffold project back to the current Saturn standard — missing sections, outdated paths, wrong values, missing wrap-up line. Does not re-interview for content that already exists. If the folder has no scaffold structure at all, use `/project-migrate` instead.

### /project-migrate

Builds a scaffold from scratch for a folder with no existing structure — no `CLAUDE.md`, or freeform content without scaffold files. Reads existing content and maps it into the right files without losing anything. If the folder already has a scaffold `CLAUDE.md`, use `/project-update` instead.

### /archive-project-or-role

Archives a completed project or an entire role. Updates the project's `CLAUDE.md` status, records the outcome, moves the folder to `_archive/`, and updates `_system/dashboard/data/projects.json` (or `roles.json` for a role archive).

### /grilling-handoff

Captures an out-of-scope task, finding, decision, or thought that surfaces during a `/grill-me-as` session. Writes it to the relevant project's `_ai/tasks.md` inbox so it isn't lost and can be triaged at the next session start.

### /workspace-new-skill

Scaffolds a new skill that is personal to a specific role or project — not for distributable skills (those go in `Shareable/skills/`). The skill:
1. Asks four questions: scope (role or project), which role/project folder, topic prefix, and function name
2. Derives and confirms the skill name (e.g. `ce-answer-question`) and target path (`[location]/_skills/[name]/skill.md`) before writing anything
3. Invokes `/write-a-skill` to author the `skill.md` content
4. Saves to `[role]/_skills/[name]/skill.md` or `[project]/_skills/[name]/skill.md`
5. Runs the sync skill to install the new skill globally

Role and project-scoped skills are version-controlled in the workspace repo — they travel with the workspace when cloned to a new machine and are installed automatically by the sync skill.

---

## Installation

### 1. Set up the context hierarchy

Create context files at each level using the templates in `templates/`:

| Template | Level | Purpose |
|---|---|---|
| `workspace-context.md` | Workspace root | Who you are, your roles, your working style |
| `role-context.md` | Role folder | Role scope, responsibilities, deliverables |
| `business-function-context.md` | `_context/` (optional) | Business function strategy imported by role files |
| `project-context.md` | Project folder | Project purpose, constraints, stakeholders |

The business function template is optional. If your role file doesn't use `@import`, you can inline any relevant context directly in the role file instead.

Name the context file for your tool:

| Tool | Context file |
|---|---|
| Claude Code | `CLAUDE.md` |
| Codex CLI / OpenAI | `AGENTS.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |

### 2. Install the pre-compact hook

Copy `hooks/pre-compact.ps1` (Windows) or `hooks/pre-compact.sh` (Mac/Linux) to your tool's hooks directory:
- Claude Code: `~/.claude/hooks/`
- Other tools: check your tool's documentation

Set your project slug in the file, then wire it up per `hooks/settings-example.json`. The example targets Claude Code's `PreCompact` event — adapt the event name for other providers.

### 3. Install the skills

Copy each skill folder from `skills/` to your tool's skills directory:
- Claude Code: `~/.claude/skills/`
- Codex CLI: check your tool's documentation for the skills path

Each skill's `skill.md` includes a Provider Notes section with adaptation guidance.

### 4. Deploy the dashboard

Copy the files from `dashboard/` to `_system/dashboard/` in your workspace. This gives you a visual overview of all active projects across roles. The dashboard reads `_system/dashboard/data/roles.json` and `_system/dashboard/data/projects.json` — these are created and maintained automatically by the skills.

### 5. Set up your project

For a new project, run `/project-init [Role] [Name]` — the skill interviews you, stress-tests the concept, and writes all scaffold files.

For an existing project, run `/project-update` — the AI reads your existing files and migrates content into the standard structure without losing anything.

### 6. End every session with /project-wrap-up

This is the only discipline required to keep the system working. Run it before closing the session, review the output, commit the changed files.

---

## Workspace Structure

```
YourName.Saturn/
  CLAUDE.md                       ← workspace context (who you are, tools, preferences)
  _system/
    hooks/                        ← workspace-level hook scripts
    dashboard/                    ← project dashboard SPA (dist files)
    data/
      roles.json                  ← role hierarchy (maintained by /role-init)
      projects.json               ← project registry (maintained by /project-init)
  _context/
    bf-*.md                       ← optional business function strategy files
  _archive/                       ← archived role folders
  RoleFolder/
    CLAUDE.md                     ← role-level context (scope, responsibilities, role assets inventory)
    _assets/                      ← reference material owned by this role; shared across its projects
    _skills/                      ← role-scoped skills (created via /workspace-new-skill)
    _archive/                     ← archived projects for this role
    ProjectName/
      CLAUDE.md                   ← project context (purpose, constraints, stakeholders)
      _ai/
        tasks.md                  ← open tasks + recently done
        decisions.md              ← settled choices (standard projects only)
        findings.md               ← observations and analysis (standard projects only)
        facts/                    ← graduated stable knowledge (promoted from decisions.md)
      _assets/                    ← project-specific files
      _skills/                    ← project-scoped skills (created via /workspace-new-skill)
```

Multiple role folders are fine. Each has its own `CLAUDE.md` and an `assets/` folder for reference material that spans multiple projects within that role (policies, templates, reference docs). The `## Role Assets` section in the role `CLAUDE.md` declares what's there so the AI knows to look without being told. Projects sit under their primary role folder; cross-role work is declared in the project's own `CLAUDE.md`.

**Developer projects** follow the same structure but `_ai/` contains only `tasks.md` and an optional `inputs.md`. No `decisions.md`, `findings.md`, or `facts/` — developer work is tracked through code and commits.

---

## Memory

Most AI tools maintain a memory system — a set of `.md` files that persist facts about you, your preferences, and your work across sessions. Both Claude Code and Codex CLI use this pattern. The specific file paths, loading mechanism, and format are tool-controlled and are not templated here.

**The one shareable principle: project memory entries should be pointers, not summaries.**

When your tool creates or asks you to create a project memory entry, direct it to the scaffold files rather than summarise their content:

> Active project under `RoleFolder/ProjectName/`. Read `_ai/tasks.md`, `_ai/decisions.md`, and `_ai/findings.md` in that folder for current state.

The scaffold files are the source of truth. Duplicating their content in a memory entry creates two things to maintain and introduces drift as the files evolve. Because memories are pointers rather than accumulated content, the memory system needs no maintenance tooling — the scaffold files are already kept healthy by `/project-wrap-up`.

---

*Part of the Saturn Employee AI Toolkit — Technical Director*
