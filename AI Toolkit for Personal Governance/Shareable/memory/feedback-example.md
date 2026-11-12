---
name: feedback-example
description: Example feedback memory — guidance on how to approach a recurring task or behaviour
metadata:
  type: feedback
---

Always stage changes and show the diff for review before committing to git.

**Why:** User wants to review every change before it hits the repo — a mistaken commit is harder to undo than a missed one.

**How to apply:** After making file changes, run `git diff --staged` (or equivalent) and summarise what will be committed. Wait for explicit approval before running `git commit`.
