# Bootstrap a New Business Workspace

**This file needs no installation.** Claude Code runs fine with zero skills installed, so this is a runbook Claude reads and executes — not a script to run or a skill to install first. That is deliberate: it solves the chicken-and-egg where `/ai-toolkit-sync` is the thing that installs skills but is itself a skill.

## How to start

Drop this project folder into an empty business folder, open Claude Code there, and say:

> Read `00 - Cross Function/AI Toolkit for Solopreneurs/Shareable/BOOTSTRAP.md` and follow it.

Once the toolkit is installed, `/business-init` is the same process with a shorter invocation.

---

# Instructions for Claude

Work through the phases in order. **Interview fully before creating anything** — the folder structure depends on answers, and undoing a half-built workspace is worse than asking first.

Ask **one question at a time**, always with a recommended answer. Never bundle.

## Phase 0 — Pre-flight

Check and report all of these before asking anything:

1. **Where am I?** Confirm the workspace root — the folder containing this project. Everything is created relative to it.
2. **Is it empty?** If it already has function folders or a root `CLAUDE.md`, this is not a fresh workspace. Stop and ask whether the user wants `/project-update` or `/ai-toolkit-sync audit` instead.
3. **Is there a personal-level toolkit install?** List `~/.claude/skills/`. Any toolkit skill names found there will *shadow* the workspace copies this bootstrap creates, because personal overrides project. Note them now; Phase 5 handles the fix.
4. **Is this a git repository?** If not, offer to `git init`. Recommend yes — the scaffold files are the cross-machine source of truth and only work if they are versioned.
5. **Python 3 available?** Only matters on Mac/Linux, where the PreCompact hook uses it. Note if absent.

Report what you found in a few lines, then begin the interview.

## Phase 1 — Interview

The answers fill the root and function `CLAUDE.md` files. Collect all of it before creating anything.

**About the business**
1. What is the business called?
2. What does it do, who does it serve, and how does it operate? (One paragraph — this is the first thing Claude reads every session, so push for specifics over generalities.)
3. Who are the key people, and what is each responsible for?
4. How do customers find you? How is the service or product delivered?
5. Current scale — revenue, customers, team size. Any hard constraints (geography, capacity, seasonality)?

**About the work**
6. Does any function's work split by who it serves? Default is **no** — projects sit directly under the function. If yes, ask which functions and what the splits are called, in their words. (This workspace uses `Company` / `Customer` / `Agent`, but that is vocabulary for a service business with a delivery network — do not suggest it as a default.)
7. UK or US English?
8. Who is the audience for customer-facing content, and what register suits them?
9. Main tools and platforms — code and hosting, marketing, finance, productivity, payments.

**Confirm before building.** Summarise the workspace you are about to create — folder tree, which functions get scope folders, what gets installed. Get an explicit yes.

## Phase 2 — Structure

Create at the workspace root:

```
_assets/.gitkeep
_system/hooks/
_system/dashboard/data/projects.json      <- contains exactly: []
```

Then the six functions, **always all six, always these names**:

```
00 - Cross Function/
01 - Create Value/
02 - Marketing/
03 - Sales/
04 - Deliver Value/
05 - Finance/
```

Every function gets `_assets/.gitkeep`, `_archived/.gitkeep`, `_skills/.gitkeep`.

Scope folders, if the user asked for them in Q6, go in functions **01–04 only**. `00 - Cross Function` and `05 - Finance` never have them — the CEO and finance layers do not operate per audience. Each scope folder gets a `.gitkeep` too.

Every `.gitkeep` matters. Git cannot track an empty directory, so a bare folder is invisible from creation and disappears on the first `git clean`.

## Phase 3 — Context files

**Root `CLAUDE.md`** — from `Shareable/templates/root-CLAUDE.md`, filled in from the interview. Replace every bracketed placeholder. A root file left with `[Business Name]` in it is worse than none, because it looks finished.

**One `CLAUDE.md` per function** — from `Shareable/templates/function-CLAUDE.md`. Fill Purpose and What Belongs Here from the interview and from what that function means for *this* business. If a function is genuinely dormant right now, say so in its Purpose rather than inventing activity for it.

Do not copy this workspace's function content. Marketing means something different in every business.

## Phase 4 — The toolkit project's own scaffold

The copied project carries the previous business's history. Reset it:

- **Empty** `_ai/tasks.md`, `_ai/decisions.md`, `_ai/findings.md`, and `_ai/task-prds/` — keep the header comments and entry-format blocks, drop every entry. These record incidents that never happened to this business.
- **`_ai/facts/`** — keep only files about the *toolkit* (`toolkit-design.md`, `delegation-pipeline.md`). Delete anything about the old business. Then prune the `## Facts` pointers in the project's `CLAUDE.md` to match what survived.
- **`CLAUDE.md`** — generate a new 6-character Project ID (lowercase letters and digits, random not sequential). Update Purpose if it names the old business.
- **Register it** in `_system/dashboard/data/projects.json` as the first entry, using the schema in `Shareable/skills/project-init/REFERENCE.md`.

## Phase 5 — Deploy

**Everything deploys into this workspace. Nothing is ever written to `~/.claude/skills/`.**

Toolkit skills read the business's structure, so they belong to the business, not the machine. Deploying per-workspace means two businesses on one machine never collide, and — because `.claude/skills/` is committed to git — a fresh checkout on any machine has working skills with no install step.

| From | To |
|---|---|
| `Shareable/skills/*` | `.claude/skills/` at the workspace root |
| `_skills/ai-toolkit-sync/` | `.claude/skills/` |
| `Shareable/agents/*` | `.claude/agents/` at the workspace root |
| `Shareable/hooks/pre-compact.ps1` and `.sh` | `_system/hooks/` |

### Shadow check — do this after deploying

Claude Code's precedence is **personal overrides project**: `~/.claude/skills/foo` wins over `.claude/skills/foo`. A leftover personal copy therefore silently shadows the workspace copy — no error, no warning, the skill simply never loads and edits to it appear to do nothing.

List `~/.claude/skills/`. For any name that also exists in `.claude/skills/`, tell the user it is **shadowed**, that the personal copy is winning, and that deleting the personal copy is the fix. **Do not delete it yourself** — it may belong to another business's toolkit, and removing it would break that workspace. This is theirs to resolve.

Personal skills whose names do not appear in `.claude/skills/` are fine and should not be mentioned. Those are business-agnostic tools — engineering skills, interview loops — and they belong exactly where they are.

**Hook wiring.** Add the `PreCompact` block from `Shareable/hooks/settings-example.json` to the workspace `.claude/settings.json`, keeping any existing content. Use the Windows or Mac/Linux command line, not both. The path stays relative — the hook needs no slug and no absolute path.

**Memory directory.** Create `~/.claude/projects/<workspace-slug>/memory/` and seed it with `Shareable/memory/MEMORY.md`. The slug is the workspace path with every non-alphanumeric character replaced by a hyphen. Without this the hook has nothing to inject and will warn on first compaction.

## Phase 6 — Verify

Check and report each, plainly. Do not claim success for anything you did not actually run:

- [ ] Run the PreCompact hook. It should return non-empty context. On Windows: `echo '{}' | powershell -ExecutionPolicy Bypass -File _system\hooks\pre-compact.ps1`
- [ ] Every function folder exists with its three standard sub-folders and `.gitkeep`s
- [ ] Root and all six function `CLAUDE.md` files exist with no bracketed placeholders left
- [ ] `_system/dashboard/data/projects.json` parses and contains the toolkit project
- [ ] `.claude/skills/` contains every skill from `Shareable/skills/` plus `ai-toolkit-sync`
- [ ] No skill in `.claude/skills/` is shadowed by a personal-level copy — or if any is, the user has been told which

## Phase 7 — Hand off

Tell the user, in this order:

1. **Restart Claude Code.** Agents in `.claude/agents/` are not picked up until a fresh session. Until then `knowledge-reviewer` will not resolve.
2. **Review and commit** the new workspace. Do not commit for them.
3. **Next step:** `/project-init` to create their first real project.
4. **Anything deferred** — a collision they chose to skip, a missing Python 3, a check that could not run. Be specific about what is unresolved rather than ending on a clean-sounding summary.

## Rules

- Interview fully before creating anything.
- One question at a time, always with a recommendation.
- Never write to `~/.claude/skills/`. Everything deploys into the workspace.
- Never delete a personal-level skill, even one that is shadowing. Report it; the user decides.
- Never commit to git.
- Fill every template placeholder. A half-filled context file is worse than an obviously empty one.
- Do not copy this workspace's business content into the new one. Structure travels; content does not.
- If a phase cannot complete, say which and why. Do not report a partial bootstrap as done.
