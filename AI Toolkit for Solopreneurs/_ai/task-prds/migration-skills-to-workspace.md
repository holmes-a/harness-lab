# Migration — Personal Skills to Workspace Skills

**Created:** 2026-07-28
**Run on:** Adrian's main PC, after syncing this branch
**Affects:** both the Hot Iron and Saturn Visual Solutions workspaces
**Time:** ~15 minutes

---

## Why

Toolkit skills read a business's structure — its `CLAUDE.md` hierarchy, `projects.json`, `_ai/` scaffold. They belong to the business, not the machine. Installing them to `~/.claude/skills/` (global per machine) meant two businesses on one machine competed for the same skill names.

The fix: every business deploys its toolkit into its own workspace `.claude/skills/`, committed to git. `~/.claude/skills/` keeps only business-agnostic tools.

**Claude Code's precedence is personal over project.** A leftover personal copy silently shadows the workspace copy — no error, no warning, the workspace skill simply never loads. So deploying per-workspace is only half the fix; **removing the personal copies is the half that actually works.**

## Confirmed on this machine

Six skills exist at both levels. All six currently load the Saturn version even when working in the Hot Iron workspace:

```
grill-me-as        grilling-handoff    project-init
project-migrate    project-update      project-wrap-up
```

Verified two ways: `~/.claude/skills/` and `.claude/skills/` were compared directly, and the live skill list showed Saturn's descriptions ("Saturn role", "Saturn scaffold framework") for exactly these six while the eight non-colliding skills showed Hot Iron's.

Expect the same six on the main PC. Re-check rather than assuming — the machines have diverged before.

---

## Procedure

### 1. Hot Iron — already done

`HotIron.Business/.claude/skills/` is populated and committed on this branch. Sync and it is there. Nothing to do.

### 2. Saturn — deploy into its workspace

In the Saturn workspace, run `/ai-toolkit-sync skills agents`. It now deploys to `.claude/skills/` and `.claude/agents/`.

If Saturn's `ai-toolkit-sync` is an older copy that still targets `~/.claude/skills/`, copy Saturn's `Shareable/skills/*` and its own `_skills/*` into `Saturn/.claude/skills/` by hand, then commit. Do not copy Hot Iron's toolkit into Saturn — the two have genuinely diverged (`archive-project-or-role` vs `archive-project`, `workspace-new-skill` vs `new-skill`, plus `role-init`, `ce-assess`, `ce-eval`, `wa-process-request`, which are Saturn-only), and that divergence is legitimate.

### 3. Verify before deleting anything

For each of the six names, confirm the file now exists in **both** workspaces:

```
HotIron.Business/.claude/skills/<name>/SKILL.md
<Saturn workspace>/.claude/skills/<name>/SKILL.md
```

**Do not proceed until every one is present in both.** Step 4 is destructive and this is the check that makes it safe.

### 4. Remove the toolkit skills from `~/.claude/skills/`

Delete only these, and only after step 3 passes:

```
archive-project-or-role    grill-me-as        grilling-handoff
project-init               project-migrate    project-start
project-update             project-wrap-up    role-init
workspace-new-skill        employee-ai-toolkit-sync
ce-assess                  ce-eval            wa-process-request
```

Adjust to what is actually present — the list above is from this machine and the main PC may differ.

**Keep** everything business-agnostic. These are tools about how you work, not about a business, and they should stay personal so they are available everywhere:

```
ask-matt        code-review     codebase-design    diagnosing-bugs
domain-modeling grill-me        grilling           handoff
implement       improve-codebase-architecture      prototype
research        resolving-merge-conflicts          setup-matt-pocock-skills
tdd             teach           to-spec            to-tickets
triage          wayfinder       writing-great-skills
statusline-setup
```

The dividing test: **does the skill read the business's structure?** Yes → workspace. No → personal.

### 5. Restart Claude Code and confirm

Open the Hot Iron workspace and check the skill list. `/project-init`'s description should now mention `_assets/` (Hot Iron's wording), not `Assets/` (Saturn's). Open Saturn and confirm its own descriptions come back.

Then run `/ai-toolkit-sync drift` in each. Check 4 should report no shadowing.

---

## If something breaks

Nothing is lost — every deleted skill exists in its workspace's `Shareable/` and in git. Restore by copying back from either.

The realistic failure is deleting a personal skill that turns out to be business-agnostic and not present in any workspace. Symptom: a slash command stops resolving anywhere. Fix: copy it back from git history or re-run `/setup-matt-pocock-skills`.

## After

- `~/.claude/skills/` holds only business-agnostic tools
- Each business's toolkit lives in its own workspace, in git
- A fresh checkout on any machine has working skills with no install step
- Adding a third business cannot collide with either existing one
