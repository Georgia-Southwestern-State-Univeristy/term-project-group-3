# Week 15 -- Final QA Checklist

## FitTrack Application URL: http://127.0.0.1:58570/login.html

> This document confirms the application is ready for final presentation.
> All tests below were run and passed across all three storage backends
> (localStorage, IndexedDB, REST API).

---

## Section 1: Deployment and Basic Functionality

### 1.1 Startup / Deployment

- **Action:** Run `npm run dev` (for API backend) or `npm start` (for localStorage/IndexedDB).
- **Expected:** Frontend at `localhost:3000` and backend at `localhost:4000` start without errors. Frontend loads quickly.
- **Result:** Passed for all backends.

### 1.2 Auth / Access Checks

- **Action:** Navigate directly to `index.html` without logging in.
- **Expected:** Redirected to `login.html`.
- **Result:** Passed for all backends.

- **Action:** Log in via `login.html`.
- **Expected:** Redirected to `index.html`.
- **Result:** Passed for all backends.

- **Action:** Log out from `index.html`.
- **Expected:** Session cleared, redirected to `login.html`.
- **Result:** Passed for all backends.

---

## Section 2: Core Workflow and Data Management

### 2.1 Workout Addition

- **Action:** Add a new workout with valid name, minutes (e.g., 30), and today's date.
- **Expected:** Workout appears immediately in the list, summaries update, form resets.
- **Result:** Passed for all backends.

### 2.2 Workout Deletion

- **Action:** Add a workout, then click its Delete button.
- **Expected:** Workout removed from list, summaries update, no page refresh needed.
- **Result:** Passed for all backends.

### 2.3 Persistence Across Sessions

- **Action:** Add several workouts, refresh the page (F5), then close and reopen the browser tab.
- **Expected:** All previously added workouts are still present.
- **Result:** Passed for all backends.
- Note for API backend: Persistence is on the server in `data/workouts.json`.

---

## Section 3: Error Handling and Edge Cases

### 3.1 Invalid Input Handling (Frontend Validation)

- **Action:** Attempt to add workouts with empty name.
- **Expected:** Client-side error message prevents submission.
- **Result:** Passed for all backends.

- **Action:** Attempt to add workouts with minutes less than 1.
- **Expected:** Client-side error message displayed.
- **Result:** Passed for all backends.

- **Action:** Attempt to add workouts with minutes greater than 1440.
- **Expected:** Client-side error message displayed.
- **Result:** Passed for all backends.

- **Action:** Attempt to add workouts with non-numeric minutes (via manual input if browser permits).
- **Expected:** Client-side error message displayed.
- **Result:** Passed for all backends.

### 3.2 Date Validation (Rolling 7-Day Window)

- **Action:** Attempt to add a workout for a future date (tomorrow or later).
- **Expected:** Error message displayed. Workout not saved.
- **Result:** Passed for all backends.

- **Action:** Attempt to add a workout for a date more than 7 days ago (e.g., 8 days ago).
- **Expected:** Error message displayed. Workout not saved.
- **Result:** Passed for all backends.

- **Action:** Attempt to add a workout for a date exactly 6 days ago.
- **Expected:** Accepted. This is the oldest valid day.
- **Result:** Passed for all backends.

### 3.3 Daily Workout Limit (6 per day)

- **Action:** Add 6 workouts for the same day, then attempt to add a 7th.
- **Expected:** 7th workout rejected with error: "Maximum 6 workouts per day reached..."
- **Result:** Passed for all backends.
- Note for API backend: This also triggers server-side validation.

### 3.4 Storage Mechanism Failure / Corruption

- **Action (localStorage):** Manually corrupt `fittrack_workouts` in DevTools localStorage (set value to `{bad data`).
- **Expected:** Application shows an error, resets to empty state, does not crash permanently.
- **Result:** Passed.

- **Action (IndexedDB):** Observe behavior if browser blocks IndexedDB (e.g., incognito mode in some browsers).
- **Expected:** Application handles the error gracefully.
- **Result:** Passed.

- **Action (API):** Stop the Express server while frontend is running.
- **Expected:** Application shows an error instead of silently breaking.
- **Result:** Passed.

---

## Section 4: UI/UX and Cross-Backend Verification

### 4.1 Backend Indicator and Switching

- **Action:** Verify the backend badge is visible (`#backendBadge`).
- **Expected:** Badge is shown on the page.
- **Result:** Passed for all backends.

- **Action:** Confirm the badge color and text correctly reflect `STORAGE_BACKEND` set in `config.js`.
- **Expected:** Green for localStorage, Blue for IndexedDB, Orange for API.
- **Result:** Passed for all backends.

- **Action:** Switch `STORAGE_BACKEND` in `config.js`, restart, and refresh.
- **Expected:** Badge updates to match. App works correctly with new backend.
- **Result:** Passed for all backends.

---

## Section 5: Final 10 Test Checklist

> These 10 tests represent the minimum viable verification before presenting.
> Run them in order. Each test builds on the state from the previous one.

### Test 1: Login redirects to index.html

- **Steps:**
  1. Open http://127.0.0.1:58570/login.html
  2. Enter valid credentials (e.g., `user` / `pass`)
  3. Click "Log In"
- **Expected:** Browser redirects to `index.html`.
- **Status:** [ ] Pass [ ] Fail

### Test 2: Add a workout appears in list with green status flash

- **Steps:**
  1. On the dashboard, fill in workout name (e.g., "Running")
  2. Fill in duration (e.g., 30)
  3. Select today's date
  4. Click submit
- **Expected:** Workout appears in the list immediately. Green status flash confirms success.
- **Status:** [ ] Pass [ ] Fail

### Test 3: Add a workout with duration = 1500 is rejected with red status

- **Steps:**
  1. Fill in workout name (e.g., "Impossible Workout")
  2. Fill in duration: 1500
  3. Select today's date
  4. Click submit
- **Expected:** Workout is NOT added. Red status message appears explaining the error.
- **Status:** [ ] Pass [ ] Fail

### Test 4: Adding a 7th workout for today is rejected with red status

- **Steps:**
  1. Add workouts for today until you have 6 total for that day
  2. Attempt to add a 7th workout for the same day
- **Expected:** 7th workout is rejected. Red status message: "Maximum 6 workouts per day reached..."
- **Status:** [ ] Pass [ ] Fail

### Test 5: Edit a workout saves and re-renders

- **Steps:**
  1. Find an existing workout in the list
  2. Click "Edit"
  3. Change the name or duration
  4. Save the edit
- **Expected:** Workout updates in the list. Summaries re-calculate. No page refresh needed.
- **Status:** [ ] Pass [ ] Fail

### Test 6: Delete a workout removes and re-renders

- **Steps:**
  1. Find an existing workout in the list
  2. Click "Delete"
- **Expected:** Workout disappears from the list. Summaries update immediately. No page refresh needed.
- **Status:** [ ] Pass [ ] Fail

### Test 7: Future date is rejected

- **Steps:**
  1. Fill in a valid workout name and duration
  2. Select tomorrow's date (or any future date)
  3. Click submit
- **Expected:** Workout is NOT added. Error message explains that future dates are not allowed.
- **Status:** [ ] Pass [ ] Fail

### Test 8: Date 8+ days ago is rejected

- **Steps:**
  1. Fill in a valid workout name and duration
  2. Select a date that is 8 or more days in the past
  3. Click submit
- **Expected:** Workout is NOT added. Error message explains the 7-day window limit.
- **Status:** [ ] Pass [ ] Fail

### Test 9: Refresh the page and workouts persist

- **Steps:**
  1. Verify workouts are present on the dashboard
  2. Press F5 to refresh the page
- **Expected:** All previously added workouts are still visible after refresh.
- **Status:** [ ] Pass [ ] Fail

### Test 10: Logout redirects to login.html

- **Steps:**
  1. Click "Log Out" on the dashboard
- **Expected:** Session is cleared. Browser redirects to `login.html`.
- **Status:** [ ] Pass [ ] Fail

---

## Section 6: Demo Path

The demo will use the REST API backend (`STORAGE_BACKEND = 'api'`) because it is the most complex and shows server-side validation.

### Pre-Demo Setup

1. Set `STORAGE_BACKEND` to `'api'` in `config.js`.
2. Clear browser's application storage (localStorage and IndexedDB) in DevTools.
3. Clear or delete `data/workouts.json` for a clean start.
4. Run `npm run dev` from the project root. This starts the frontend and the mock backend.

### Demo Script

**Step 1 -- Introduction (1 min):**

"Welcome to FitTrack, a fitness tracking application. Today we will demonstrate its core features and its modular storage architecture."

Point out the backend badge showing "Storage: API".

**Step 2 -- Authentication (1 min):**

"First, let's log in."

Enter credentials and click "Log In". Show the redirect to the dashboard.

**Step 3 -- Adding Workouts (2 min):**

"Now let's add a few workouts."

Add: "Running", 30 minutes, today's date.
Add: "Weightlifting", 60 minutes, today's date.
Add: "Yoga", 20 minutes, a date 3 days ago.

"Notice the summaries update in real time."

**Step 4 -- Error Handling (3 min):**

"FitTrack provides validation on both the client and the server."

Client-side demo:

- Attempt to add a workout with an empty name. Point out the browser validation.
- Attempt to add a workout with 1500 minutes. Point out the custom error message.

Server-side demo:

- Add 3 more workouts for today to reach the daily limit.
- Attempt to add a 7th workout. Show the server rejection message.
- Explain that this check happens on the server, not just in the UI.

**Step 5 -- Deletion and Persistence (1.5 min):**

"Deleting is straightforward."

Click Delete on one workout. Show it disappears instantly.

"Data is persisted on the server."

Refresh the page. Show the workouts are still there.

**Step 6 -- Logout (30 sec):**

Click "Log Out". Show the redirect to the login page.

**Step 7 -- Backend Flexibility (1 min, optional):**

"Behind the scenes, FitTrack can switch between localStorage, IndexedDB, or the API backend by changing one setting in config.js."

---

## Section 7: Rehearsal Outcomes

### What Succeeded

- Switching backends via `config.js` worked smoothly every time.
- Real-time UI updates after adding and deleting workouts were consistent.
- Error messages for date validation, duration limits, and daily caps were clear and helpful.
- Demonstrating the server rejecting the 7th workout was a strong point for the API backend.

### What Broke or Was Confusing

- `server.js` crashed on startup once because `data/workouts.json` did not exist yet. Fixed by adding `fs.mkdirSync` and `fs.writeFileSync` to `server.js` to auto-create the directory and file.
- During a fast run-through, it was unclear whether a blank-field error came from the browser's HTML5 `required` attribute or from our custom JS validation. Clarified: `required` handles empty fields, our JS handles logic-based rules like min/max minutes.
- IndexedDB was difficult to clear between backend switches. Needed to go to DevTools > Application > IndexedDB > Delete database.

### What Was Fixed

1. `server.js` now auto-creates the `data/` directory and `workouts.json` on startup if they do not exist.
2. All custom error messages now appear in the status bar (`#status`). No more inconsistent `alert()` calls.
3. Added a "clear storage" step to the pre-demo checklist for a consistent starting state.
4. Auth check updated from `localStorage.isLoggedIn` to `localStorage.getItem('isLoggedIn') === 'true'` to guard against string vs. boolean type issues.

---

## Section 8: Final PR Links

- Backend Architecture PR: [TODO - add link after PR is opened]
- Server-Side Persistence and Validation PR: [TODO - add link after PR is opened]
- `app.js` Async Refactor and Auth Fix PR: [TODO - add link after PR is opened]
