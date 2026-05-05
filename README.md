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

    Install frontend dependencies:

    bash
    copy
    download
    npm install

    Install server dependencies:

    bash
    copy
    download
    cd server
    npm install
    cd ..

    Start the application:

    bash
    copy
    download
    npm start

    Open your browser and go to: http://127.0.0.1:3000/index.html
   ```

For detailed backend setup, refer to docs/deployment/fittrack-backend-setup.md.
Where to Find Things
Start Here

These are the documents a newcomer should read first:

    User Guide: docs/final/user-guide.md
    Architecture Overview: docs/final/architecture.md
    Runbook (Deploy and Maintain): docs/final/runbook.md
    API Documentation: docs/api/interface-documentation.md
    Release Candidate Notes: docs/releases/release-candidate.md
    Repo Polish Checklist: docs/final/repo-polish.md

Contributing

    CONTRIBUTING.md
    docs/contributing-peer-eval.md

Full Documentation Index

Architecture Decisions

    docs/adr/ADR-001.md

API

    docs/api/interface-documentation.md
    docs/api/openapi.yaml

Beta Phase (Weeks 9 through 12)

    docs/beta/beta-plan.md
    docs/beta/bug-triage.md
    docs/beta/observability.md
    docs/beta/week9-pr-index.md
    docs/beta/week9-sprint.md
    docs/beta/week10-sprint.md
    docs/beta/week10-ux.md
    docs/beta/week11-ci.md
    docs/beta/week11-e2e.md
    docs/beta/Week-11-Known Issues.md
    docs/beta/Week-11-Reliability.md
    docs/beta/week11-sprint.md
    docs/beta/week-11-status.md
    docs/beta/week-12-known-issues.md
    docs/beta/week-12-quality.md
    docs/beta/week12-retro.md

Data Model

    docs/data/model.md

Deployment

    docs/deployment/beta-deploy.md
    docs/deployment/fittrack-backend-setup.md

Final Phase (Weeks 13 through 16)

    Architecture: docs/final/architecture.md
    Refactoring: docs/final/refactoring.md
    Tests: docs/final/tests.md
    Admin guide: docs/final/admin-guide.md
    Runbook: docs/final/runbook.md
    User guide: docs/final/user-guide.md
    Triage: docs/final/triage.md
    Repo polish: docs/final/repo-polish.md
    Contributions: docs/final/contributions.md
    Handoff status: docs/final/handoff-status.md
    QA: docs/final/qa.md
    Sprint: docs/final/sprint.md
    Presentation plan: docs/final/presentation-plan.md
    Peer eval confirmation: docs/final/peer-eval-confirmation.md
    Final defense: docs/final/final-defense.md
    Final presentation: docs/final/final-presentation.md
    Final repo check: docs/final/final-repo-check.md
    Final retrospective: docs/final/final-retrospective.md

Handoff

    docs/handoff/hand-off.md

MVP Phase

    docs/mvp/mvp-checklist.md
    docs/mvp/scope-lock.md
    docs/mvp/demo-readiness.md
    docs/mvp/midterm-snapshot.md
    docs/mvp/release-notes-midterm.md

Releases

    docs/releases/beta-release.md
    docs/releases/release-candidate.md

Security

    docs/security/auth.md
    docs/security/week10-security-notes.md

Team

    docs/team/definition-of-done.md
    docs/team/gary.md
    docs/team/khoa.md
    docs/team/misbahv.md

Tech Stack

    Frontend: HTML, CSS, JavaScript (ES6+)
    Backend: Node.js with Express
    Storage (Client): Browser localStorage
    Storage (Server): Server-side session/token-based auth
    Build and CI: Node.js, npm, GitHub Actions
    Linting and Formatting: ESLint, Prettier
