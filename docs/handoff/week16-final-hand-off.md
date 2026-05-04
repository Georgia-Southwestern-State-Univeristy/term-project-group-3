FitTrack Final Hand-Off Document
System Overview

FitTrack is a browser-based single-page application (SPA) that allows users to log, view, edit, delete, and summarize workout activity. The frontend runs in the browser using localStorage for workout data, while a Node.js/Express backend handles user authentication and goals.
Architecture Snapshot

FitTrack uses a client-server architecture:

    Frontend: HTML, CSS, and JavaScript handle the UI, form validation, and user interaction. Workout data is stored in the browser using localStorage.

    Backend: A Node.js/Express server handles user login and registration. It also provides the goals API endpoints.

    Data Storage: Workout data is stored in the browser's localStorage. Authentication data is handled server-side using session or token-based auth.

Tech Stack and Rationale

We chose this stack because it is simple to set up and easy to maintain:

    HTML, CSS, JavaScript (ES6+) for the frontend
    Node.js with Express for the backend
    localStorage for client-side workout data
    Session/token-based auth for user login on the server
    ESLint and Prettier for consistent code style
    GitHub Actions for CI

Setup / Deployment

    Clone the repository:

    bash
    copy
    download
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

No environment variables are required. For more details on backend setup, see docs/deployment/fittrack-backend-setup.md.
Known Issues and Constraints

    Workout data is only stored in the browser, so clearing browser storage will erase it
    There is no multi-device sync for workout data
    localStorage has size limits of about 5 to 10 MB
    Performance may slow down with very large datasets

User / Admin Guidance

    User Guide: docs/final/week14-user-guide.md
    Admin Guide: docs/final/week14-admin-guide.md
    Runbook: docs/final/week14-runbook.md
    API Documentation: docs/api/interface-documentation.md

Maintenance Notes

    Keep documentation in sync with the actual code
    Watch localStorage usage if the dataset grows
    Write tests for any new features
    Keep formatting and CI checks consistent
    Update server dependencies occasionally by running cd server && npm audit

Recommended Next Steps

    Consider switching to IndexedDB for better client-side storage
    Add a real database on the server side for persistent storage
    Improve the UI and form validation
    Add more test coverage
    Add multi-device sync for workout data
    Add password reset or email verification to the auth system

Summary

FitTrack is a straightforward application with a browser-based frontend and a lightweight Express backend. It works well within its scope but has some limitations because workout data lives in localStorage. The authentication and goals features rely on the Express server.
