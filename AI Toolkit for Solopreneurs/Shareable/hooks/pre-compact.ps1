# ================================================================
# Pre-compact hook for Claude Code — Windows / PowerShell
#
# WHAT IT DOES:
#   Fires before Claude Code auto-compacts a long conversation.
#   Injects your project memory files into the compaction context
#   so that key notes, preferences, and decisions survive the
#   summarisation step.
#
# HOW TO INSTALL:
#   1. Copy this file to <your-workspace-root>/_system/hooks/pre-compact.ps1
#   2. Wire it up in .claude/settings.json (see settings-example.json)
#   There is NO slug to configure — see below.
#
# NO CONFIGURATION REQUIRED:
#   Claude Code stores project data at %USERPROFILE%\.claude\projects\<slug>\,
#   where the slug is your workspace path with non-alphanumeric characters
#   replaced by hyphens (C:\Projects\MyBusiness -> C--Projects-MyBusiness).
#   Earlier versions of this hook asked you to paste that slug in. Don't —
#   a hardcoded slug breaks silently the moment the workspace is renamed,
#   moved, or checked out on a second machine, and nothing tells you. It is
#   invisible until you notice memory has stopped surviving compaction.
#
#   This version derives the directory at runtime:
#     1. from transcript_path on the hook's stdin payload (authoritative)
#     2. falling back to the working directory mangled into a slug
#
# MANUAL TEST (stdin must be supplied or the read blocks on a console):
#   echo '{}' | powershell -ExecutionPolicy Bypass -File _system\hooks\pre-compact.ps1
# ================================================================

$ErrorActionPreference = "Stop"

function Get-MemoryDir {
    # 1. Preferred: derive from the transcript path Claude Code passes on stdin.
    #    Its parent directory IS the project directory — no string mangling needed.
    try {
        $raw = [Console]::In.ReadToEnd()
        if ($raw) {
            $payload = $raw | ConvertFrom-Json
            if ($payload.transcript_path) {
                $projectDir = Split-Path -Parent $payload.transcript_path
                if ($projectDir) { return (Join-Path $projectDir "memory") }
            }
        }
    } catch {
        # Malformed or absent stdin — fall through to the cwd fallback.
    }

    # 2. Fallback: mangle the working directory into Claude Code's project slug.
    $slug = ($PWD.Path -replace '[^A-Za-z0-9]', '-')
    return Join-Path "$env:USERPROFILE\.claude\projects\$slug" "memory"
}

$memDir = Get-MemoryDir

if (-not (Test-Path $memDir)) {
    # Do NOT exit silently. A missing memory directory means every compaction from
    # here on loses project memory, and nothing else will tell you.
    $warning = "PreCompact hook: no memory directory at '$memDir'. Project memory will NOT survive compaction. Check the derived path against your %USERPROFILE%\.claude\projects\ folder."
    [Console]::Error.WriteLine($warning)
    [PSCustomObject]@{
        hookSpecificOutput = [PSCustomObject]@{
            hookEventName     = "PreCompact"
            additionalContext = "WARNING - $warning"
        }
    } | ConvertTo-Json -Depth 10 -Compress
    exit 0
}

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
