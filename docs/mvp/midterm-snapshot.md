# Midterm Technical Snapshot

Project: FitTrack Activity Logger  
Team: Group 3  
Date: 2026-03-05  
Branch: week8-mvp-demo-evidence  
Commit: 5c4048b4f4eae86c3785ef36ec9e3eb461855bf3

---

## Architecture Recap

FitTrack is implemented as a browser-based Single Page Application (SPA).  
The application runs entirely on the client side using standard web technologies.

The architecture follows a simplified container model:

Frontend: HTML, CSS, JavaScript SPA  
Storage: Browser localStorage using the Web Storage API  
CI/CD: GitHub Actions for automated checks and validation

### Data Flow

User Input → JavaScript Logic → localStorage → Application State → UI Rendering

All workout data is persisted locally inside the browser. When the application loads, the stored data is retrieved from localStorage and rendered in the UI.

---

## What’s Implemented (MVP)

The following features have been implemented and merged to the main branch:

- Activity logging form for recording workouts
- Display of recorded workout entries in a list view
- Edit functionality for updating previously recorded workouts
- Delete functionality with confirmation prompts
- Client-side data persistence using localStorage
- Weekly summary calculations based on stored workout data
- Modular JavaScript structure separating UI logic and storage utilities
- Responsive interface that works on desktop and mobile browsers
- Basic input validation for workout fields
- CI pipeline configured with GitHub Actions

---

## What’s Missing (Beta Scope)

The following features are planned for the Beta phase but are not included in the current MVP:

- User authentication system for multi-user support
- Backend API for storing and retrieving workout data
- Migration from localStorage to a scalable database
- Data export functionality (CSV or PDF reports)
- Progressive Web App (PWA) support for installable offline usage
- Integration tests for full workflow validation

---

## System Run Instructions

Full run instructions are available in the repository README.

### Prerequisites

- Node.js v18+
- npm v9+

### Quick Start

Clone the repository:

git clone [repo-url]

Navigate into the project:

cd term-project-group-3

Install dependencies:

npm ci

Start the development server:

npm run dev

After starting the server, open:

http://localhost:5173

in a web browser.

---

## Test Status

The project currently includes basic unit tests for core functionality.

Current testing coverage includes:

- Storage utility functions
- Data formatting logic
- Core activity logging functionality

Tests can be run using:

npm test

Future work will include integration tests that simulate complete user workflows.

---

## CI Status

Continuous Integration is handled using GitHub Actions.

The CI pipeline performs the following checks on every pull request:

- Dependency installation
- Code formatting verification
- Unit test execution

Only pull requests that pass all checks can be merged into the main branch.  
This ensures the MVP remains stable and reproducible for demonstrations.