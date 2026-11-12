# Archive Project or Role — Reference

## Step 5: File Update Logic

### Updating CLAUDE.md

1. Read the target project's `CLAUDE.md`
2. Replace the `## Status` section value with `Completed - [Outcome]`
3. If an outcome note was provided, insert a `## Outcome` section immediately after `## Status`:
   ```
   ## Outcome
   [user's note]
   ```
4. Write the updated CLAUDE.md

### Updating projects.json

If the project CLAUDE.md contains a `## Project ID` section:
- Read `_system/dashboard/data/projects.json` (if it exists)
- Find the record where `id` matches the Project ID
- Set `status` to `Completed - [Outcome]`
- Set `last_worked` to today (YYYY-MM-DD)
- If an outcome note was provided, set `"status_note": "[outcome note]"`; otherwise remove the `status_note` key from the record
- Write the updated `projects.json`

If no `## Project ID` exists (legacy project), note in the summary that `projects.json` was not updated.

### Role archiving

For each active project folder identified in Step 2, apply the CLAUDE.md and projects.json updates above, then move `[Role]/` to workspace `_archive/[Role]/`.
