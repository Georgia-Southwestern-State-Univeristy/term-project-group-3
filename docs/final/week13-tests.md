# Week 13: Regression & Testing

## 1. Regression: Missing Data File

- **Protects:** Ensures the app self-heals instead of crashing (500 error) if `activities.json` is deleted.
- **Issue Covered:** Fixed during the Week 11 Beta sprint.

## 2. Regression: Invalid Inputs

- **Protects:** Blocks users from saving workouts with blank or negative times.
- **Issue Covered:** Fixed the `NaN` calculation error on the Weekly Summary dashboard.

## 3. Refactored Code: Isolated Storage

- **Protects:** Proves our new `storage.js` data layer works independently of the UI.
- **Issue Covered:** Tied directly to our Week 13 frontend decoupling refactor.

## 4. Reliability: API Timeout

- **Protects:** Displays a visible error message to the user if the server drops the connection.
- **Issue Covered:** Fixed the silent failure where clicking "Save" previously did nothing if the backend was down.

---

## Evidence

- **Passing CI Pipeline:** https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3/pull/80
