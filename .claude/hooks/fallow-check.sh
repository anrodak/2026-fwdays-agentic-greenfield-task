#!/usr/bin/env bash
# Claude Code PostToolUse hook: after Claude edits code, run fallow over the
# project and hand error-level findings back to Claude to fix.
# Wired in .claude/settings.json; fallow rules live in .fallowrc.json.
set -uo pipefail

root="${CLAUDE_PROJECT_DIR:-$(pwd)}"
file=$(jq -r '.tool_input.file_path // .tool_response.filePath // empty')

# Only files inside this project that can change what fallow reports.
case "$file" in
  "$root"/node_modules/* | "$root"/.next/* | "$root"/docs/*) exit 0 ;;
  "$root"/*) ;;
  *) exit 0 ;;
esac
case "$file" in
  *.ts | *.tsx | *.mts | *.cts | *.js | *.jsx | *.mjs | *.cjs | */package.json | */.fallowrc.json) ;;
  *) exit 0 ;;
esac

cd "$root" || exit 0

# npx --no-install exits 1 when fallow is missing, which would read as findings.
if [ ! -x node_modules/.bin/fallow ]; then
  jq -n '{systemMessage: "fallow не встановлений: запустіть npm install, щоб працювала перевірка після редагувань."}'
  exit 0
fi

report=$(npx --no-install fallow --quiet --format compact 2>&1)
status=$?

[ "$status" -eq 0 ] && exit 0

if [ "$status" -ne 1 ]; then
  # fallow itself failed (bad config, runtime error): tell the person, don't block Claude.
  jq -n --arg status "$status" --arg tail "$(printf '%s\n' "$report" | tail -n 3)" \
    '{systemMessage: ("fallow завершився з помилкою (код \($status)): \($tail)")}'
  exit 0
fi

# Exit 1: an error-level gate failed. Drop the metric lines, keep findings and the gate summary.
findings=$(printf '%s\n' "$report" | grep -vE '^(vital-signs|cyclomatic-population|file-score):')

jq -n --arg file "${file#"$root"/}" --arg findings "$findings" '{
  decision: "block",
  reason: ("fallow found error-level issues after editing \($file):\n\($findings)\n\n"
    + "Fix what this change introduced: wire up or remove unused files and exports, drop unused dependencies, "
    + "split duplicated or overly complex code. If a finding is work in progress that your next edit wires up, carry on. "
    + "For a false positive, add an ignore with a comment to .fallowrc.json instead of deleting code. "
    + "`npx fallow fix --dry-run` previews the automatic cleanup; run `npx fallow fix --yes` only after reviewing it.")
}'
exit 0
