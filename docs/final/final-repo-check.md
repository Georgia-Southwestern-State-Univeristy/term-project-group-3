# Final Repository Check

This document serves as a final review and guide for the FitTrack Activity Logger repository, ensuring it meets the standards of a professional software project and provides clear instructions for any future maintainers or reviewers.

---

## 1. Where a Reviewer Should Start

To quickly understand the system and its key artifacts, a reviewer should begin with the main README.md file located at the repository root.

The README.md provides:

- A high-level overview of the project
- Instructions on how to set up and run the application (including both frontend and backend)
- A "Start Here" section that points to the most critical documentation files for a newcomer
- A "Full Documentation Index" that comprehensively lists all documentation within the docs/ directory

From the README.md, reviewers can navigate to specific documentation based on their area of interest (e.g., user guide, architecture, API, deployment).

---

## 2. How to Run the System

Detailed instructions for running the FitTrack Activity Logger can be found in the README.md under the "How to Run It" section.

In summary:

1. Clone the repository.
2. Install frontend dependencies using npm install.
3. Install server dependencies: cd server, npm install, cd ..
4. Start the application using npm start.
5. Access the application via a web browser at http://127.0.0.1:3000/index.html.

For more in-depth backend setup information, refer to docs/deployment/fittrack-backend-setup.md.

---

## 3. Evidence for Testing and CI

The repository demonstrates a commitment to quality through various testing and Continuous Integration (CI) practices.

### Testing Evidence

- tests/app.test.js: Contains tests for the core application logic.
- tests/storage.test.js: Contains tests for the localStorage interaction logic.
- tests/test.js: Contains additional tests covering specific features developed in Week 13.
- tests/setup.js: Provides configuration for the testing environment.
- Tests can be executed locally via npm scripts (e.g., npm test, as defined in package.json).

### Continuous Integration (CI) Evidence

The project utilizes GitHub Actions for automated CI workflows, ensuring code quality and functionality with every push.

- .github/workflows/ci.yml: This workflow performs checks such as linting, formatting, and running automated tests.
- .github/workflows/node.js.yml: This workflow specifically targets Node.js environment setup and dependency installation, running tests and build steps.
- Evidence of CI runs can be viewed directly on the GitHub repository under the "Actions" tab. Each push or pull request triggers a workflow run, providing immediate feedback on code health.

---

## 4. Final Cleanup Completed This Week

During the final phase, the following cleanup and refinement activities were completed:

- Documentation Alignment: All documentation paths and references in README.md and other guides were thoroughly reviewed and corrected to reflect the actual file structure, including previously undocumented backend (server/) and authentication files.
- Repo Polish: Tasks outlined in docs/final/repo-polish.md were addressed, including consistency checks, removal of temporary files, and ensuring all required metadata is present.
- Code Quality Review: A final pass was made to ensure consistent coding styles (enforced by .eslintrc.json and .prettierrc) and removal of dead code or commented-out sections.
- Dependency Review: package.json and package-lock.json (both root and server/) were reviewed to ensure all dependencies are necessary and up-to-date.
- Issue Triage: Pending issues were triaged, closed, or moved to a backlog as per docs/final/triage.md.
- Presentation Preparation: Final presentation materials (docs/final/final-presentation.md) were created and rehearsed.
- Handoff Preparation: The hand-off document (docs/handoff/week16-final-hand-off.md) was finalized to ensure a smooth transition for future maintainers.

### Note on Duplicate Config Files

The repository contains some duplicate or overlapping configuration files that may warrant future consolidation:

- eslint.config.js alongside .eslintrc.json
- .prettierrc alongside .prettierrc.json
- scope-lock.md at root alongside docs/mvp/scope-lock.md

These were left as-is during this cleanup phase to avoid breaking existing tooling, but should be reconciled in a future maintenance cycle.

---

## 5. FitTrack Test Suite (18 Tests)

Authentication (4 Tests)

Test 1: Login Page Functionality

    Navigate to login.html
    Click "Log In"
    Expected: Redirected to index.html

Test 2: Redirect When Not Logged In

    Navigate to index.html without logging in
    Expected: Redirected to login.html

Test 3: Logout Functionality

    Click "Log Out"
    Expected: Redirected to login.html
    Navigate to index.html manually
    Expected: Redirected back to login.html

Test 4: Invalid Login State

    In DevTools, set localStorage.setItem('isLoggedIn', 'false')
    Navigate to index.html
    Expected: Redirected to login.html (treated same as absent)

Workout Addition -- Positive Cases (2 Tests)

Test 5: Add Workout Successfully

    Enter "Running", 30 minutes, today's date
    Click "Add Workout"
    Expected: Workout appears with formatted date (e.g., "Thu, Apr 23")

Test 6: Add Workout at Exact Minute Boundary

    Enter "Ultra Marathon", 1440 minutes, today's date
    Click "Add Workout"
    Expected: Workout accepted, total minutes shows 1440

Workout Addition -- Negative Cases (4 Tests)

Test 7: Empty Workout Name

    Leave Workout Name blank, enter 30 minutes, today's date
    Click "Add Workout"
    Expected: Browser HTML5 validation blocks submission (required field)

Test 8: Zero or Negative Minutes

    Enter "Sprint", 0 in Minutes, today's date
    Click "Add Workout"
    Expected: Error: "Workout duration must be at least 1 minute."

Test 9: Minutes Over 1440

    Enter "Impossible", 1441 in Minutes, today's date
    Click "Add Workout"
    Expected: Error: "Workout duration cannot exceed 1440 minutes (24 hours)."

Test 10: Non-Numeric Minutes

    Enter "Test", type "abc" in Minutes field
    Click "Add Workout"
    Expected: Browser HTML5 type="number" blocks non-numeric input

Date Validation (4 Tests)

Test 11: Future Date Rejected

    Enter tomorrow's date
    Click "Add Workout"
    Expected: Error: "Cannot log workouts for future dates."

Test 12: Past Date Beyond 7 Days Rejected

    Enter a date 8+ days ago
    Click "Add Workout"
    Expected: Error message mentioning rolling window

Test 13: Exact 7th Day Boundary (Oldest Allowed)

    Enter a date exactly 6 days ago (e.g., today is 4/23 -- enter 4/17)
    Click "Add Workout"
    Expected: Workout is accepted (this is the oldest valid day)

Test 14: All 7 Days Are Available

    Add one workout for each day from (today - 6) through today
    Expected: All 7 are accepted, list shows 7 workouts

Daily Entry Cap (2 Tests)

Test 15: 6th Workout Accepted, 7th Rejected

    Add 6 workouts for today
    Expected: All 6 accepted
    Attempt to add a 7th workout for today
    Expected: Error: "Maximum 6 workouts per day reached..."

Test 16: Delete and Re-Add

    Delete one of the 6 workouts from today
    Add a new workout for today (replacing the deleted one)
    Expected: New workout is accepted (count is back to 6)

Persistence and Deletion (1 Test)

Test 17: Persistence After Refresh + Delete Updates UI

    Add a workout, refresh the page
    Expected: Workout still visible
    Delete the workout
    Expected: Workout removed without needing another refresh

Data Integrity (1 Test)

Test 18: Corrupted localStorage Doesn't Crash

    In DevTools, set fittrack_workouts to {bad data
    Refresh
    Expected: App loads, shows empty list, doesn't crash
