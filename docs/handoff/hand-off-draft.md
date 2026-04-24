# FitTrack Hand-Off Document

## System Overview

FitTrack is a browser-based single-page application (SPA) that allows users to log, view, edit, delete, and summarize workout activity. The system is designed to be lightweight, easy to run, and focused on core functionality without requiring external services.

The application runs entirely in the browser and does not require a backend server or database.

---

## Architecture Snapshot

FitTrack uses a client-only architecture:

- **Frontend (SPA):**
  - Built with HTML, CSS, and JavaScript
  - Handles user input, validation, and UI rendering

- **Data Storage:**
  - Uses the browser’s Web Storage API (`localStorage`)
  - Stores all workout data locally on the user’s device

There is:

- No backend server
- No external database
- No authentication system

This design supports quick setup and offline usage but introduces limitations for scalability and data persistence across devices.

---

## Stack Rationale

The project uses HTML, CSS, JavaScript, and localStorage to prioritize:

- Simplicity and maintainability
- Fast development and testing
- No setup requirements for servers or databases
- Offline-first usability

This approach allows the system to demonstrate clean architecture and modular design while staying within project scope.

---

## Deployment and Setup

To run the project locally:

1. Clone the repository
2. Install dependencies:

   ```
   npm install
   ```

3. Run formatting checks:

   ```
   npm run format:check
   ```

4. Run tests:

   ```
   npm test
   ```

5. Open the application:
   - Use VS Code Live Server, OR
   - Open `index.html` in a browser

No environment variables, database setup, or authentication configuration is required.

---

## Core Functionality

The application supports the following user workflows:

- Add a workout (activity, duration, timestamp)
- View all logged workouts
- Edit existing workouts
- Delete workouts
- View basic summary information (e.g., totals)

All actions persist automatically using localStorage.

---

## Known Issues and Constraints

- Data is stored only in the browser using localStorage
- Data does not persist across different devices
- Clearing browser storage will delete all saved workouts
- localStorage has size limits (approximately 5–10MB depending on browser)
- Performance may degrade as the dataset grows
- No authentication or user account system is implemented
- No server-side validation or backup of data

---

## Recommended Next Steps

- Increase automated test coverage for full workflows
- Improve error handling for storage failures
- Enhance input validation and user feedback
- Improve UI for empty states and edge cases
- Add integration or end-to-end tests
- Consider IndexedDB for handling larger datasets
- Consider a backend service if multi-device sync or user accounts are required
- Continue ensuring documentation matches the implemented architecture

---

## User and Admin References

- User Guide: `/docs/final/week14-user-guide.md`
- Admin Guide: `/docs/final/week14-admin-guide.md`
- Deployment Guide: `/docs/deployment/beta-deploy.md`
- QA Documentation: `/docs/final/week15-qa.md`
- Release Notes: `/docs/releases/`

---

## Summary

FitTrack is a simple, maintainable, and functional activity logging application designed for demonstration and learning purposes. The system is stable for its intended use but has known limitations due to its client-only architecture.

Future improvements should focus on scalability, robustness, and enhanced user experience.
