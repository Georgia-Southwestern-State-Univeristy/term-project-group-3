# Week 13: Refactoring & Code Health

## 1. Technical Debt Identified

- **Debt 1:** `app.js` was a massive monolith. It mixed UI rendering, event listeners, and `localStorage` data access all in one file, making it brittle and hard to test.
- **Debt 2:** Backend API routes are tightly coupled to a local `activities.json` file. This violates the Single Responsibility Principle and will be addressed during our final database migration.

## 2. The Refactor: Decoupling the Frontend

This week, we tackled Debt 1 by decoupling our frontend architecture. We split `app.js` into two distinct files:

- **`storage.js`:** A new module created to exclusively handle all `localStorage` reads, writes, and parsing.
- **`app.js`:** Stripped down to act purely as the UI/DOM controller.

## 3. Why It's Better

- **Separation of Concerns:** The UI code no longer needs to know _how_ data is saved.
- **Future-Proofing:** When we swap `localStorage` for a real backend database, we only have to update `storage.js`.
- **Testability:** We can now write clean unit tests for our data layer without having to mock the entire browser DOM.

## 4. Evidence

- **PR Link:**
