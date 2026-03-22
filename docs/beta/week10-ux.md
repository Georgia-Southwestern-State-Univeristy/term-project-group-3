# Week 10: Testing & Usability Improvements

## 1. Usability (UX) Improvements
  Visual Save Confirmation:
  Before: Users had to scroll down to check if their save actually worked.
  After: Submit button flashes "✅ Saved!" for instant visual feedback.
  Fast Data Entry:
  Before: Users had to manually click fields to log back-to-back workouts.
  After: Form resets and auto-focuses the "Activity Type" dropdown for rapid entry.

## 2. Test Coverage 
  Auth (Unauthorized): Verifies a `401 Unauthorized` response without a valid token.
  Auth (Authorized): Verifies a `200 OK` response with a valid token.
  Validation Failure: Rejects durations that are empty, non-numeric, <1, or >300.
  Regression: Catches `localStorage` JSON errors, clearing bad data instead of crashing the dashboard.

## 3. Evidence
  CI Run Link (Green Build): [GitHub Actions Run 23410425782](https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3/actions/runs/23410425782)
  PR Link: [Pull Request #67](https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3/pull/67)  
