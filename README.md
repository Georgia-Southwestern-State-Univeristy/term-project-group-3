# FitTrack Activity Logger

## What Is This

FitTrack Activity Logger is a browser-based fitness tracking application that lets users log, view, edit, and manage workout activities. It also supports user authentication and a goals feature. The frontend runs as a single-page application with localStorage for offline data persistence, while a lightweight Node.js/Express backend handles authentication and goals endpoints.

This project was built as a term project for Georgia Southwestern State University.

---

## What It Does

- Log a workout with activity type, duration, and timestamp
- View saved workouts in a chronological list
- Edit or delete existing workout entries
- View a weekly workout summary
- User login and authentication via backend
- Goals tracking via backend API
- All workout data persists in the browser using localStorage (survives page refreshes)

---

## How to Run It

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Steps

1. Clone the repo:

   ```bash
   git clone https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3.git
   cd term-project-group-3
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Install server dependencies:

   ```bash
   cd server
   npm install
   cd ..
   ```

4. Start the application:

   ```bash
   npm start
   ```

5. Open your browser and go to: http://127.0.0.1:3000/index.html

For detailed backend setup, refer to docs/deployment/fittrack-backend-setup.md.

---

## Where to Find Things

### Start Here

These are the documents a newcomer should read first:

- User Guide: docs/final/week14-user-guide.md
- Architecture Overview: docs/final/week13-architecture.md
- Runbook (Deploy and Maintain): docs/final/week14-runbook.md
- API Documentation: docs/api/interface-documentation.md
- Release Candidate Notes: docs/releases/release-candidate.md
- Repo Polish Checklist: docs/final/week14-repo-polish.md

---

### Contributing

- CONTRIBUTING.md
- CONTRIBUTING-PE.md

---

### Full Documentation Index

**Architecture Decisions**

- docs/adr/ADR-001.md

**API**

- docs/api/interface-documentation.md
- docs/api/openapi.yaml

**Beta Phase (Weeks 9 through 12)**

- docs/beta/beta-plan.md
- docs/beta/bug-triage.md
- docs/beta/observability.md
- docs/beta/week9-pr-index.md
- docs/beta/week9-sprint.md
- docs/beta/week10-sprint.md
- docs/beta/week10-ux.md
- docs/beta/week11-ci.md
- docs/beta/week11-e2e.md
- docs/beta/Week-11-Known Issues.md
- docs/beta/Week-11-Reliability.md
- docs/beta/week11-sprint.md
- docs/beta/week-11-status.md
- docs/beta/week-12-known-issues.md
- docs/beta/week-12-quality.md
- docs/beta/week12-retro.md

**Data Model**

- docs/data/model.md

**Deployment**

- docs/deployment/beta-deploy.md
- docs/deployment/fittrack-backend-setup.md

**Final Phase (Weeks 13 through 16)**

- Architecture, refactoring, and tests: docs/final/week13-architecture.md, docs/final/week13-refactoring.md, docs/final/week13-tests.md
- Admin guide, runbook, user guide, triage, repo polish: docs/final/week14-admin-guide.md, docs/final/week14-runbook.md, docs/final/week14-user-guide.md, docs/final/week14-triage.md, docs/final/week14-repo-polish.md
- Contributions, handoff status, QA, sprint, presentation plan, peer eval confirmation: docs/final/week15-contributions.md, docs/final/week15-handoff-status.md, docs/final/week15-qa.md, docs/final/week15-sprint.md, docs/final/week15-presentation-plan.md, docs/final/week15-peer-eval-confirmation.md
- Final presentation: docs/final/final-presentation.md
- Final repo check: docs/final/final-repo-check.md

**Handoff**

- docs/handoff/week16-final-hand-off.md
- docs/handoff/hand-off-draft.md

**MVP Phase**

- docs/mvp/mvp-checklist.md
- docs/mvp/scope-lock.md
- docs/mvp/demo-readiness.md
- docs/mvp/midterm-snapshot.md
- docs/mvp/release-notes-midterm.md

**Releases**

- docs/releases/beta-release.md
- docs/releases/release-candidate.md

**Security**

- docs/security/auth.md
- docs/security/week10-security-notes.md

**Team**

- docs/team/definition-of-done.md
- docs/team/gary.md
- docs/team/khoa.md
- docs/team/misbahv.md

---

## Tech Stack

- Frontend: HTML, CSS, JavaScript (ES6+)
- Backend: Node.js with Express
- Storage (Client): Browser localStorage
- Storage (Server): Server-side session/token-based auth
- Build and CI: Node.js, npm, GitHub Actions
- Linting and Formatting: ESLint, Prettier
