# ================================================================
# Pre-compact hook — Windows / PowerShell
#
# WHAT IT DOES:
#   Fires before the AI tool auto-compacts a long conversation.
#   Injects your project memory files into the compaction context
#   so that key notes, preferences, and decisions survive the
#   summarisation step.
#
# PROVIDER NOTES:
#   This hook is written for Claude Code (PreCompact event).
#   Codex CLI and other tools may use a different hook event name
#   or trigger mechanism — adapt accordingly.
#
# HOW TO INSTALL:
#   1. Copy this file to <your-workspace-root>/hooks/pre-compact.ps1
#   2. Set YOUR_PROJECT_SLUG below (see note)
#   3. Wire it up in your tool's settings file
#
# YOUR PROJECT SLUG:
#   Claude Code stores project data at:
#     %USERPROFILE%\.claude\projects\<slug>\
#   The slug is your workspace root path with backslashes and colons
#   replaced by hyphens. For example:
#     C:\Work\Saturn.JaneDoe  ->  C--Work-Saturn-JaneDoe
#   Open %USERPROFILE%\.claude\projects\ in Explorer to find yours.
# ================================================================

$projectSlug = "<YOUR-PROJECT-SLUG>"
$memDir = "$env:USERPROFILE\.claude\projects\$projectSlug\memory"

if (-not (Test-Path $memDir)) { exit 0 }

$parts = [System.Collections.Generic.List[string]]::new()

$indexPath = Join-Path $memDir "MEMORY.md"
if (Test-Path $indexPath) {
    $content = Get-Content $indexPath -Raw -Encoding UTF8
    $parts.Add("### MEMORY.md (index)`n$content")
}

$files = Get-ChildItem -Path $memDir -Filter "*.md" -ErrorAction SilentlyContinue |
         Where-Object { $_.Name -ne "MEMORY.md" } |
         Sort-Object Name

foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw -Encoding UTF8
    $parts.Add("### $($f.BaseName)`n$content")
}

$combined = $parts -join "`n`n---`n`n"

if ($combined.Length -gt 20000) {
    $combined = $combined.Substring(0, 20000) + "`n... [truncated - read memory files directly for full content]"
}

$additionalContext = "PROJECT MEMORY (auto-injected by pre-compact hook - these notes persist across sessions and must be preserved in the compaction summary):`n`n$combined"

[PSCustomObject]@{
    hookSpecificOutput = [PSCustomObject]@{
        hookEventName    = "PreCompact"
        additionalContext = $additionalContext
    }
} | ConvertTo-Json -Depth 10 -Compress
