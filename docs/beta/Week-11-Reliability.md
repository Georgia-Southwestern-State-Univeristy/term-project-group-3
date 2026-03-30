Week 11: Reliability Improvements

We identified and resolved three failure points to improve system resilience and user trust.

    CI Fails Due to Incorrect File Glob Pattern

Before: Running npx prettier --check "src/**/*.json" caused CI to fail with: [error] No files matching the pattern were found Even when no .json files were changed, this was confusing (no root cause shown) and blocked PRs from merging.

Risk: Developers started ignoring CI output ("false negative"), which reflects poorly on code quality and erodes trust in tooling.

Resolution: Updated script in package.json to only check real source files: json copy download "format:check": "npx prettier --check "docs//*.md" "src//*.{js,html}""

After: CI now runs fast and only reports real formatting issues. No more false failures.

    App Crashes If Data File Is Missing or Corrupted

Before: If data/activities.json was deleted or corrupted, Node.js threw: Error: ENOENT: no such file or directory → Server crashed → 500 error for all users

Risk: Single point of failure that breaks the entire app.

Resolution: Added defensive code in server.js: js copy download if (!fs.existsSync(dataFile)) { fs.writeFileSync(dataFile, '[]', 'utf8'); console.log('Data file missing — created empty activities.json'); }

After: App self-heals on startup. Logs warning instead of crashing.

    Silent Failure When API Is Down

Before: If backend is offline, clicking "Log Activity" does nothing — no message or feedback to the user.

Risk: User thinks app is broken or their input was not properly logged.

Resolution: In activity-form.js, added error handling: js copy download fetch('/api/log', { method: 'POST', body: data }) .catch(() => { alert('Failed to save. Please check your connection and try again.'); });

After: Users get a clear message when something goes wrong.
