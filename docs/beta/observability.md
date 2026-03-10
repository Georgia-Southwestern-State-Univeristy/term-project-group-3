# Beta Observability & Error Handling

## Log Location & Viewing

For the Beta phase, we are utilizing client-side structured logging.

- **Where logs live:** All logs are output to the browser's native developer console.
- **How to view them:** Open Developer Tools (F12 or Right-Click -> Inspect) and navigate to the **Console** tab.

## Logged Events & Correlation

To correlate user actions to log entries, every log includes an ISO timestamp and a structured context tag. We track 3 key actions:

1. `[ACTION: LOG_WORKOUT]` - Fired when a user attempts to save a new workout.
2. `[ACTION: LOAD_HISTORY]` - Fired when the application retrieves the workout list from storage.
3. `[ACTION: DELETE_WORKOUT]` - Fired when a user removes an entry.

## Error Handling & Validation

We have implemented explicit validation to prevent corrupted state and provide clear user feedback on two common failure cases:

- **Failure Case 1 (Empty Activity):** If a user tries to save a workout without an activity name, the UI alerts them and a structured `[ERROR: VALIDATION]` log is generated.
- **Failure Case 2 (Invalid Duration):** If a user enters a duration of 0 or a negative number, the submission is blocked, the user is alerted, and an error is logged.

## Sample Log Snippet

`[2026-03-10T12:05:00.000Z] [ACTION: LOAD_HISTORY] Successfully loaded 4 workouts from localStorage.`
`[2026-03-10T12:06:15.000Z] [ACTION: LOG_WORKOUT] Attempting to save: { activity: 'Running', duration: 30 }`
`[2026-03-10T12:07:30.000Z] [ERROR: VALIDATION] Failed to save: Duration must be positive. User input: -5`
