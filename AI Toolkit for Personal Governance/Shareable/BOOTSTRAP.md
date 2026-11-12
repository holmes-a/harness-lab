# Bootstrap — Personal Governance Workspace

Runbook for standing this system up in a fresh workspace. **There is no install step.** Skills are
committed to the repo, in `.claude/skills/` — never copied into `~/.claude/skills/`. A personal skills
folder drifts into a stale, workspace-specific fork; committing skills to the repo is what keeps the
deployed copy and the source of truth (`Shareable/`, here) identical.

## 1. Copy the structure

From this `Shareable/` folder into the root of the new workspace:

| From `Shareable/` | To |
|---|---|
| `agents/` | `.claude/agents/` |
| `skills/` (this folder's six, plus the reused toolkit skills — see below) | `.claude/skills/` |
| `hooks/` | `_system/hooks/` |
| `dashboard/` | `_system/dashboard/` |
| `templates/` | basis for `CLAUDE.md` and manifesto files — see step 2 |
| `memory/` | `~/.claude/projects/<workspace>/memory/` (memory is per-machine, not per-repo) |

Also register the PreCompact hook in `.claude/settings.json`, pointing at `_system/hooks/pre-compact.*`
— use `hooks/settings-example.json` as the model.

## 2. Reused toolkit skills

This project's six skills (`check-in`, `idea`, `routine`, `opposition`, `manifesto`,
`appoint-advisor`) are governance-specific and live in this `Shareable/skills/`. A further nine general
project-management skills — `project-init`, `project-start`, `project-wrap-up`, `project-migrate`,
`project-update`, `archive-project`, `grill-me-as`, `grilling-handoff`, `new-skill` — are reused from
the `AI Toolkit for Solopreneurs` project's own `Shareable/`. Copy those from there, not from here.

## 3. Build the templates — structure only, never content

Using `templates/root-CLAUDE.md`, `templates/function-CLAUDE.md`, and the manifesto shapes in this
project's `Advisors/` and `PM/` folders, create:

- Root `CLAUDE.md` — identity, a **binding life facts** section (placeholder), pointers to
  `PM/manifesto.md`, `Advisors/`, `_system/dashboard/`
- `PM/manifesto.md` — template only: Binding Constraints, Targets, Commitments, Slot Rule, Not-Yet
  List, Balance Plan, Amendment Log — every section a placeholder comment, no invented content
- `Advisors/CLAUDE.md` and, for each of `Work`, `Financial`, `Health`, `Family`, `Personal`: `CLAUDE.md`,
  a template `manifesto.md`, and the standard `_ai/` / `_assets/data/` / `_skills/` / `_archived/`
  scaffold

**Do not fill in a target, commitment, number, date, or priority.** That content only exists once a
grilling session with the workspace's owner produces it — an invented manifesto will be mistaken for
something they actually agreed to. See `_ai/decisions.md` and `_ai/findings.md` in this project for why
the design took this shape.

## 4. Bring it to life

1. Run the `manifesto` skill to grill `PM/manifesto.md` into existence.
2. Run `appoint-advisor` once per department to grill its mandate (written to
   `.claude/agents/minister-<name>.md`), its detailed manifesto, and its method.
3. From there: `check-in` weekly, `idea` when something new arrives, `routine` for a fast status pull.

## What must never exist

- A PM agent — skills convene and route; they never conclude on the owner's behalf.
- An opposition agent — `opposition` is a skill, because its job is procedural (compare two documents),
  not perspectival.
- `register.md` anywhere — killed by design; the comparison against the manifesto is computed on
  demand, never stored.
- Any personally-installed copy of these skills under `~/.claude/skills/` — the repo copy is the only
  copy that runs.
