# Week 13: Refactoring & Code Health

## 1. Technical Debt Identified

- **Fixed:** `app.js` was a massive monolith mixing UI, events, and data storage (`localStorage`).
- **Deferred:** Backend routes are tightly coupled to a local JSON file instead of a real database.

## 2. The Refactor

We decoupled the frontend by splitting `app.js` into two files:

- **`storage.js`:** Created to exclusively handle all `localStorage` reads/writes.
- **`app.js`:** Stripped down to act purely as the UI/DOM controller.

## 3. Why It's Better

- **Separation of Concerns:** UI code no longer cares _how_ data is saved.
- **Future-Proofing:** Swapping to a real database API later will only require updating `storage.js`.
- **Readability:** The main `app.js` file is significantly smaller and easier to debug.

## 4. Evidence

- **PR Link:**
- **Safety Net:** proving this structural refactor didn't break the user experience.
