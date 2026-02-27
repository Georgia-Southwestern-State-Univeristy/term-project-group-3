MVP User Stories

Workout Logging

As a user, I want to record a workout (activity type, duration, and timestamp) so that I can track my fitness activity over time.

Workout Viewing

As a user, I want to view my saved workouts in a list so that I can review my activity history.

Workout Editing

As a user, I want to modify an existing workout entry so that I can correct mistakes.

Workout Deletion

As a user, I want to delete a workout entry so that I can remove incorrect or unwanted data.

Local Data Persistence

As a user, I want my workouts saved automatically in the browser so that my data remains available after refreshing or reopening the app.

Basic Summary Display

As a user, I want to see a simple summary (e.g., total workouts or total duration) so that I can quickly understand my activity progress.

Explicit Non-Goals

The following features are intentionally excluded to maintain delivery focus:

User authentication or login systems

Cloud storage or backend database integration

Multi-device synchronization

Social sharing or community features

Advanced analytics or AI recommendations

Complex filtering, searching, or reporting dashboards

Mobile app versions (native iOS/Android)

Real-time integrations with fitness devices or APIs

These may be considered future enhancements but will not consume development time during MVP implementation.

Demo Script Outline

The MVP demo will follow a clear end-to-end workflow:

Open FitTrack in the browser.

Add a new workout entry (activity, duration, timestamp).

Verify the workout appears in the workout list.

Refresh the browser to demonstrate localStorage persistence.

Edit an existing workout entry.

Delete a workout entry.

View updated summary information reflecting the changes.

This script represents the exact functionality required for MVP completion.

Top Risks and Mitigation Plan
Risk 1: localStorage Capacity and Performance

Issue: Large datasets may slow loading and processing.
Mitigation: Keep MVP dataset small, structure JSON efficiently, and load data lazily where possible.

Risk 2: Client-Side Data Integrity

Issue: Invalid or malformed entries could break summaries or display logic.
Mitigation: Implement input validation and standardized data models before storage.

Risk 3: Integration Conflicts During Team Development

Issue: Multiple contributors modifying shared frontend logic may cause merge conflicts.
Mitigation: Use small pull requests, CI checks, and clearly defined data/service boundaries.

Scope Enforcement Rule

## If a feature or change is not explicitly listed in this document, it is not part of the MVP and should not be implemented during this sprint. All development work must directly support the user stories and demo path defined above.

## Progress Update — MVP Story Status

| MVP Story              | Description                          | Status      | Evidence              |
| ---------------------- | ------------------------------------ | ----------- | --------------------- |
| Workout Logging        | Record activity, duration, timestamp | Done        | PR #12 merged to main |
| Workout Viewing        | Display saved workouts list          | Done        | PR #12 merged to main |
| Workout Editing        | Modify existing workout              | Not Started | No PR created         |
| Workout Deletion       | Remove workout entry                 | Not Started | No PR created         |
| Local Data Persistence | Save workouts using localStorage     | Done        | PR #12 merged to main |
| Basic Summary Display  | Show total workouts/duration         | Not Started | No PR created         |

---

## Scope Changes

No major scope changes were introduced. The team prioritized stabilizing core logging and viewing workflows to ensure a reliable MVP demo.

---

## Updated Demo Script

1. Open FitTrack SPA in the browser.
2. Add a new workout entry (activity, duration, timestamp).
3. Confirm the workout appears immediately in the workout list.
4. Refresh the browser to demonstrate localStorage persistence.
5. Attempt to submit an invalid workout entry to demonstrate validation handling.
6. View updated workout list reflecting saved data.

Note: Editing and deletion features are still under active development and are not yet part of the live demo path.

---

## Project Board Evidence

GitHub Project Board:
https://github.com/orgs/Georgia-Southwestern-State-Univeristy/projects/25/views/1?layout_template=board
