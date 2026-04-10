# Week 13 Observability and Support Visibility

## Overview

This week, the team focused on making FitTrack easier to monitor, debug, and support. Because FitTrack is a browser-based single-page application that stores workout data locally using the browser Web Storage API, failures are most likely to appear in client-side storage access, input handling, and UI rendering behavior rather than in a backend service. Our support-oriented improvements therefore focus on making these failures easier to detect, explain, and recover from.

---

## Improvement 1: Clearer localStorage error logging

### What issue or blind spot it addresses
Previously, storage-related failures could be difficult to diagnose because malformed or unavailable localStorage data might fail silently or only show generic behavior in the app. This created a support blind spot for maintainers trying to determine whether the problem came from missing data, corrupted JSON, or a browser storage issue.

### Where in the system it applies
- `storage.js`
- any code path that reads or writes workout data from localStorage

### How it helps a future maintainer or operator
This improvement makes failures more visible by logging clear, targeted messages when storage reads, writes, or JSON parsing fail. A future maintainer can more quickly identify the cause of a problem and distinguish between user input issues and storage corruption issues.

### Before
- Storage problems could result in unclear or silent failure behavior.
- Debugging required manually inspecting browser state with little application guidance.

### After
- Storage operations produce clearer error messages.
- JSON parsing and write failures are easier to trace during debugging.
- Maintainers can identify whether the issue happened during load, parse, or save.

### Evidence
- PR: [https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3/pull/81]

---

## Improvement 2: Better fallback state when workout data cannot be loaded

### What issue or blind spot it addresses
If saved workout data is missing, empty, or malformed, the UI could become confusing or misleading. Without a clear fallback state, users and maintainers may not know whether the app is empty by design or whether data loading failed.

### Where in the system it applies
- `app.js`
- workout list/dashboard rendering flow

### How it helps a future maintainer or operator
This improvement makes the application state more understandable. A future maintainer can immediately see whether the app is showing a true empty state or recovering from a failed load. This reduces ambiguity during testing, demos, and support troubleshooting.

### Before
- The UI did not clearly distinguish between “no workouts yet” and “data could not be loaded.”
- Failures were harder to explain during review or debugging.

### After
- The app shows a clear fallback message when no workouts exist.
- The app can safely recover to an empty/default state when stored data is invalid.
- Users receive more understandable feedback instead of a silent or broken screen.

### Evidence
- PR: [https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3/pull/64]

---

## Improvement 3: Stronger validation and user-facing feedback on invalid input

### What issue or blind spot it addresses
Invalid or incomplete workout entries can create bad data and make later debugging harder. If the app accepts empty fields or malformed values, maintainers may have difficulty determining whether downstream problems were caused by user error or storage logic.

### Where in the system it applies
- workout entry form
- submit/save workflow in `app.js`

### How it helps a future maintainer or operator
This improvement prevents bad data from entering the system and provides clear feedback when submission fails validation. That makes system behavior more predictable and helps maintainers trust that stored workout data follows expected structure.

### Before
- Weak or inconsistent validation allowed a higher risk of invalid data being saved.
- Users had limited guidance when a submission failed.

### After
- Invalid submissions are blocked before they reach storage.
- Users receive clearer feedback about what needs to be corrected.
- Maintainers can assume a more reliable baseline structure for saved workout entries.

### Evidence
- PR: [https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3/pull/63]

---

## Summary

These observability and support visibility improvements strengthen FitTrack in three important ways:

1. They make storage failures easier to diagnose.
2. They make the UI behavior clearer when data is missing or broken.
3. They reduce future support effort by preventing invalid data from entering the system.

Together, these changes improve failure visibility and support readiness without increasing system complexity. This is especially important for FitTrack’s current architecture, where the browser client and localStorage handle all core persistence responsibilities.

---

## Related Evidence

- PR 1: [https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3/pull/81]
- PR 2: [https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3/pull/64]
- PR 3: [https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3/pull/63]
- Passing CI Run: [https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3/actions/runs/24211456503]