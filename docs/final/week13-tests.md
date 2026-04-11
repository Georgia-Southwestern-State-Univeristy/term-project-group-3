# Week 13: Regression & Reliability Testing

## 1. Regression Test A: Missing Data File

- **Protects:** Ensures the system self-heals by returning an empty array instead of crashing if the data file is missing.
- **Issue Covered:** Fixed the Week 11 bug where the server threw a 500 error on boot if `activities.json` didn't exist.

## 2. Regression Test B: Invalid Workout Input

- **Protects:** Blocks users from saving workouts with blank or negative duration times.
- **Issue Covered:** Fixed the bug where invalid inputs caused `NaN` calculation errors on the Weekly Summary dashboard.

## 3. Refactored Code Test: Isolated Storage Module

- **Protects:** Proves our new `storage.js` data layer works perfectly on its own.
- **Issue Covered:** Directly protects the structural changes made during this week's frontend refactor (Part B).

## 4. Reliability Test: Corrupted Local Storage

- **Protects:** Ensures the app resets gracefully if the `localStorage` JSON string becomes corrupted.
- **Issue Covered:** Prevents the app from experiencing a fatal UI crash when `JSON.parse()` fails on bad data.

---

## Evidence

- **Passing CI Pipeline:**
