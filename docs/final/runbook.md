# Week 16: Deployment & Runbook Verification

## 1. Environment & Dependency Requirements

- **OS:** Windows, macOS, or Linux
- **Environment:** Node.js (v18+) and npm installed
- **Browser:** Modern web browser (Chrome, Firefox, Safari)

## 2. Exact Startup Steps

1. Clone the repository: `git clone https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3`
2. Navigate to the project directory: `cd term-project-group-3`
3. Install dependencies: `npm install`
4. Start the application: `npm start`
5. Open your browser and navigate to `http://localhost:3000`

## 3. Database Migration / Seed Process

- **Migration:** None required. The application uses decoupled `localStorage` for offline-first data persistence.
- **Seeding:** The app includes a self-healing seed function.

## 4. System Health Verification

- **UI Check:** The dashboard should load without console errors and display the "Total Workouts" widget.
- **Persistence Check:** Add a test workout, then refresh the page. If the workout remains, the storage module is healthy.
- **Test Suite:** Run `npm test`. All regression and unit tests should pass.

## 5. Verification Evidence

- **Who followed the runbook:** BUG WRITERS
- **What failed (if anything):** The startup sequence ran smoothly without errors.
- **What was corrected:** Verified that the instructions were clear and no hidden environment variables were required.
