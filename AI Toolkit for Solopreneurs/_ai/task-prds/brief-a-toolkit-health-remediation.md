# Brief A — Toolkit Health Remediation

**Created:** 2026-07-28
**Status:** ready-for-agent
**Depends on:** nothing — can start immediately
**Relationship to Brief B:** independent. B does not need A finished, but A's Unit A1 removes a live bug that silently degrades every long session, so run A1 first regardless.

---

## Working environment — read before starting

This work is being done on a **secondary PC** (`C:\Work\Playground\HotIron.Business`, user `adrian.holmes`), checked out solely to edit the AI Toolkit project. It is not Adrian's main working machine.

Consequences that bind every unit below:

- **`~/.claude/skills/` on this machine is not a signal.** It holds the Saturn Visual Solutions skill set, because this is a Saturn machine. The absence of `project-start` or `ai-toolkit-sync` here says nothing about the Hot Iron install — do not treat it as drift and do not "fix" it by installing anything globally.
- **Edit source only.** `Shareable/`, `_skills/`, `_system/`, and project files. Deployment to `~/.claude/skills/` happens on the main PC when Adrian syncs the branch and runs `/ai-toolkit-sync`.
- **Anything that can only be verified against an installed skill is deferred**, not skipped. Mark it explicitly in the summary so Adrian knows what to check after syncing.

---

## Problem

The toolkit's source of truth (`Shareable/`, `README.md`, this project's own scaffold) has drifted from what is actually installed and running on this machine. The drift is not cosmetic: one hook is silently broken, and at least two skills the project believes are deployed are not invocable.

The workspace has also moved path and machine since the toolkit was last synced — from `C:\Enterprise\HotIron.Business` (user `adria`) to `C:\Work\Playground\HotIron.Business` (user `adrian.holmes`). Most of the drift traces to that move.

## Outcome

`Shareable/` and `README.md` describe what actually exists; the installed skill set on this machine matches the source; the PreCompact hook works and cannot break again the next time the workspace moves.

---

## Work units

Each unit is sized for one fresh context window. Blocking edges are stated per unit.

### A1 — Make the PreCompact hook path-independent

**Blocked by:** none.

**Current behaviour:** `_system/hooks/pre-compact.ps1` line 4 hardcodes the memory directory as
`$env:USERPROFILE\.claude\projects\C--Enterprise-HotIron-Business\memory`.
The live memory directory on this machine is `C--Work-Playground-HotIron-Business`. The hook is therefore injecting nothing into compaction. This is the **second** occurrence of this exact bug — `_ai/findings.md` records the first (2026-07-24, caused by the `Active Projects/` folder rename). The recorded fix corrected the literal; it did not remove the cause.

Adrian now works this repo from two machines at two different paths under two different usernames. A hardcoded slug cannot be correct on both, so this stops being a stale-value bug and becomes a design defect: the hook must derive.

**Desired behaviour:** the hook derives the project slug from its own runtime location rather than carrying a literal. Claude Code's slug convention is the absolute workspace path with non-alphanumeric characters replaced by `-`. Derive it, resolve the memory directory, and if that directory does not exist, emit a visible warning in the hook's output rather than silently returning empty context.

**Acceptance criteria:**
- [ ] `_system/hooks/pre-compact.ps1` contains no hardcoded workspace path or slug
- [ ] Running the hook from this workspace returns non-empty `additionalContext` (the 2026-07-24 finding used ~16KB as the healthy signal)
- [ ] Running the hook when the derived memory directory is absent produces a warning that a human would notice, not silence
- [ ] `Shareable/hooks/pre-compact.ps1` and `pre-compact.sh` get the same derivation logic, replacing the `<YOUR-PROJECT-SLUG>` placeholder entirely — the placeholder is the root cause and should stop existing
- [ ] `Shareable/hooks/settings-example.json` still matches the working `.claude/settings.local.json` hook block

**Out of scope:** changing what the hook injects, or the PreCompact-vs-SessionEnd decision (settled, see `_ai/decisions.md`).

---

### A2 — Verify the skill source set is complete and self-consistent

**Blocked by:** none.

**Current behaviour:** the source set has never been checked as a whole. Individual skills have been edited over many sessions and cross-reference each other by name, path, and file convention, with no check that those references resolve. The 2026-07-24 session found `ai-toolkit-sync` referencing its own pre-rename path — that class of error is invisible until something breaks.

This unit is **source-only**. Do not inspect or modify `~/.claude/skills/` (see Working Environment above).

**Desired behaviour:** every skill in `Shareable/skills/` and `_skills/` is internally consistent and every cross-reference between them resolves, so that when Adrian runs `/ai-toolkit-sync` on his main PC it deploys a coherent set.

**Acceptance criteria:**
- [ ] A written inventory exists in this project (not a scratch file) listing every skill folder under `Shareable/skills/` and `_skills/`, with its `name:` frontmatter value and whether folder name and `name:` agree
- [ ] Every path referenced inside a skill resolves against the current workspace structure — flag any surviving reference to `Active Projects/`, `Archived Projects/`, `Assets/` (no underscore), or an absolute path containing `C:\Enterprise`
- [ ] Every skill named by another skill exists in the source set (e.g. `project-wrap-up` referencing `/grilling-handoff`, `project-init` referencing `/setup-matt-pocock-skills`)
- [ ] `Shareable/skills/project-start/` and `_skills/ai-toolkit-sync/` are confirmed present in source — `_ai/tasks.md` records the `project-start` rollout as complete, so its absence from source would be a real regression
- [ ] Any skill whose name differs from the Saturn workspace equivalent (`archive-project` vs `archive-project-or-role`, `new-skill` vs `workspace-new-skill`) is noted in the inventory as a **naming divergence between two toolkit forks that deploy into one shared global skills directory**. Record it as an Open finding in `_ai/findings.md` and stop

**Why this matters more than it first appears.** Adrian's plan is to copy this project into a new business folder each time he starts a new business — the toolkit is a distributable artifact, and he is its first re-user. But `/ai-toolkit-sync` deploys to `~/.claude/skills/`, which is **global per machine, not per business**. Two businesses on one machine means two `project-init` skills competing for one name, and the last sync wins. The Saturn/Hot Iron divergence already visible today is not a one-off — it is a preview of what happens on every new business folder.

So the finding should state the general problem, not just the two names: *a per-machine global deploy target does not survive a per-business toolkit.* Options worth naming for Adrian (do not choose): namespace deployed skills per business, have `/ai-toolkit-sync` detect an existing foreign copy and refuse rather than overwrite, or accept one-business-per-machine as a constraint.

**Out of scope:** installing anything, comparing against any installed copy, or choosing between those options.

---

### A3 — Bring `README.md` back in line with reality

**Blocked by:** A2 (needs the reconciliation to know what to describe).

**Current behaviour:** `README.md` is the public-facing artifact and is materially wrong:
- Describes skills `/wrap-up`, `/project-setup`, `/project-convert` — none of which exist under those names (they are `project-wrap-up`, `project-init`, `project-migrate`)
- Its folder-structure diagram shows `Active Projects/` and scaffold files at project root — both dropped on 2026-06-29 (`_ai/decisions.md`, "`_archived/` replaces Active/Archived Projects folders" and "`_ai/` folder for scaffold files")
- Lists four skills; `Shareable/skills/` holds eight
- No mention of `_ai/facts/`, `_ai/task-prds/`, `## Playbook`, `/project-start`, `/grilling-handoff`, or the projects.json registry and dashboard

The project's own `CLAUDE.md` Working Instructions say "Keep `README.md` and `Shareable/` in sync with the actual setup as conventions evolve — flag when they drift." It has drifted through at least three convention changes without being caught.

**Acceptance criteria:**
- [ ] Every skill name in `README.md` matches a folder in `Shareable/skills/`
- [ ] The folder-structure diagram shows `_ai/` scaffold files and no `Active Projects/`
- [ ] `_ai/facts/`, `_ai/task-prds/`, and `## Playbook` are documented
- [ ] The Quick Start steps reference commands that exist
- [ ] A reader following the Quick Start end to end reaches a working setup — walk it mentally and note any step that assumes knowledge the README never gave

**Out of scope:** rewriting the toolkit's philosophy sections (Core Idea, The Four Memory Types) — they are still accurate.

---

### A4 — Add a drift check to `ai-toolkit-sync`

**Blocked by:** A2, A3.

**Current behaviour:** drift between `Shareable/` and `README.md` is caught only when someone happens to notice. A1, A2, and A3 are all the same failure recurring: the toolkit has no check that says "the documentation and the installed state disagree."

**Desired behaviour:** `/ai-toolkit-sync` gains an audit that compares `README.md`'s claimed skill names and folder structure against `Shareable/skills/` and the current scaffold spec, and reports mismatches. Cheap, textual, no cleverness needed — the failure mode is stale names and stale paths.

**Acceptance criteria:**
- [ ] `/ai-toolkit-sync` reports any skill named in `README.md` that has no `Shareable/skills/` folder, and vice versa
- [ ] It reports any path in `README.md` matching a known-retired pattern (`Active Projects/`, scaffold files at project root, `Assets/` without underscore)
- [ ] It reports when the hook's derived memory directory does not resolve to an existing directory — and, because the same branch is checked out on more than one machine, reports the derived path so a mismatch is diagnosable rather than just flagged
- [ ] Checks that require an installed skill set degrade gracefully: on a machine with no Hot Iron install, they report "not installed on this machine — deferred" rather than failing or reporting drift
- [ ] Running it now, after A1–A3, reports clean on source checks; install checks report as deferred

**Out of scope:** auto-fixing drift. Report only — the fix is a judgement call.

---

### A5 — Clear the stale open task

**Blocked by:** none.

Two items sit under `## Open` in `_ai/tasks.md`:

1. Root `CLAUDE.md`'s embedded "Project CLAUDE.md Template" is a stale duplicate of `Shareable/templates/project-CLAUDE.md` — replace it with a pointer. Still valid; do it.
2. "Resolve `00 - Cross Function/Employee-AI-Toolkit/`" — **already resolved.** The folder is now at `00 - Cross Function/_archived/Employee-AI-Toolkit/`. Close the task, note it in `_ai/findings.md` if anything about it is worth keeping, and remove the item.

**Acceptance criteria:**
- [ ] Root `CLAUDE.md` no longer contains a second copy of the project template — it points to `Shareable/templates/project-CLAUDE.md`
- [ ] The Employee-AI-Toolkit item is removed from `## Open`
- [ ] The corresponding `_ai/findings.md` entry ("Root CLAUDE.md's embedded ... is stale") moves to `Actioned`

---

## Constraints

- UK English throughout.
- Do not stage or commit to git — Adrian reviews diffs and writes his own commit messages (`_ai/decisions.md`, "Skills do not auto-commit").
- Do not re-open settled decisions in `_ai/decisions.md` or `_ai/facts/toolkit-design.md`.
- Where a unit surfaces a question rather than a fix (A2's skills collision), write it up and stop — do not decide it.

## Out of scope for Brief A

- Anything in Brief B (the delegation pipeline).
- Restructuring `project-wrap-up` — that is proposed in Brief B, Unit B6, and should not be attempted twice.
