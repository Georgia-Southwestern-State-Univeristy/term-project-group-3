# Final Bug Triage: Week 14 Progress

## Purpose

This document lists the remaining work we need to finish before our final presentation. We have reviewed what is left and ranked each item by importance so we can have a systematic focus.

## What We Fixed This Upcoming Week

Before listing what is left to be completed. Here is a list of items to be completed:

### Upgraded Data Storage System

\*\*Assigned to: Gary

In our initial build we used `localStorage` to save workouts, however, we learned through constructive feedback that we were misaligned with the projected plan to implement MongoDB as our backend.

We learned from the insight and have decided to upgrade to **IndexedDB** which is a better way to store data in the browser. It can hold more information and handles errors more gracefully.

We will maintain a fallback to `localStorage` in case IndexedDB fails to initialize. For example, if an error occurs in private browsing mode.

This change makes our data system clearer and stronger, without adding a full backend. This will allow us to remain aligned with our initial plan and avoid feature creep.

We also updated our architecture doc to explain this clearly.

### Cleaned Up Old Pull Requests

\*\*Assigned to: Misbah and Gary

We had 11 old PRs from early weeks that were never merged or closed. They were not broken, but some were outdated.

This upcoming week, we review each one:

- Add comments to explain why we are closing any that do not affect our project at this stage (e.g., “no longer needed,” “replaced by newer feature”)
- Label them properly
- Fix or repair any that are required for functionality purposes

These actions will ensure that our GitHub repository looks clean and focused. Our intention to prevent future reviewers from getting confused during project review.

## Remaining Tasks listed below:

### Critical

\*\*Assigned to: Khoa and Gary

These have to be done before we present.

- **Make sure the app still works when IndexedDB is blocked.**  
  Right now, we fall back to localStorage, but we need to test it in private mode and make sure nothing crashes.

- **Stop bad data from being saved.**  
  Users should not be able to save a workout with no type or negative time. We will add simple checks before saving.

### Important

Our intent is to finish fixing the following items as indicated below because they improve the experience a lot.

- **Fix layout on small phone screens.**  
  \*\*Assigned to: Misbah
  The form looks okay on desktop, but fields sometimes overlap on smaller phones. We must adjust the CSS to make it easier to use on smaller screen such as mobile devices.

- **Show helpful messages when things go wrong.**  
  \*\*Assigned to: Gary
  If a save fails, the user should see a message like “Unable to save. Please try again.” rather than simply an error in the console.

- **Write more automated tests.**
  \*\*Assigned to: Khoa  
   We already have a few tests. We will add several more with at least 2-3 that are focused on the implementation of IndexedDB and the save function to make sure it keeps working.

- **Clean up repeated code.**  
  \*\*Assigned to: Misbah, Khoa and Gary
  Some functions for saving and loading are written twice. We will combine them into one place so it is easier to fix later.

### Optional

\*\*Assigned to: Misbah, Khoa and Gary

Only if we finish everything above.

- **Add a “Clear All Data” button (hidden for now).**  
  A small tool for us to reset the app during demos. Not for regular users.

- **Create a simple About page.**  
  Just a modal with the app name, team members, and date. Nothing overly complicated.

- **Let users filter workouts by type.**  
  Like showing only “RUN” entries. Useful, but low priority.

## Next Steps

We will spend the next few days fixing the Critical items first, then move forward to complete important ones.

Our goal is not perfection. It is a clean, working app that shows thoughtful decisions and steady progress.

Even though we did not build a backend; we improved our local storage, fixed documentation, and cleaned up our work. We intend this effort to demonstrate real progress.
