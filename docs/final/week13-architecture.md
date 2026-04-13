Week 13: Architecture Snapshot  
Author: C0D3-Y, of The Bug Writers

This is my understanding of how the app is structured after our Week 13 updates.

Overview of system parts

- Frontend (React app): Shows the user interface, handles clicks and forms. Located in client/src/App.js.
- Storage module: New file this week — storage.js — handles saving and loading workout data using localStorage.
- Backend server: Built with Express.js, runs on the server side, handles requests.
- Database: LocalStorage stores data permanently; accessed through Mongoose.
- Authentication: Uses JWT tokens to check login status. Still needs cleanup.

Key change this week: Separation of concerns

Before, App.js did two jobs:

1. Show the UI
2. Save and load data

That made it hard to test and easy to break.

Now, we created storage.js to handle only data operations:

- saveWorkout()
- getWorkouts()
- deleteWorkout()

App.js now just calls these functions. This makes both files easier to read and test.

Example:
In App.js:

Storage.saveWorkout(newWorkout);

In storage.js:

const saveWorkout = (workout) => { ... }

Why this matters

Separating logic from UI helps prevent bugs and makes testing possible without showing anything on screen.

Improvements in visibility

We added:

- Console logs for key actions and errors
- Validation messages for bad input
- Empty state UI ("No workouts yet")

These help users and developers understand what's happening.

Testing updates

We added 4 new tests:

1. Handles missing data without crashing
2. Rejects invalid inputs (e.g., empty name)
3. Confirms storage.saveWorkout() works
4. Confirms storage.getWorkouts() returns correct list

These run in CI to catch regressions early.

Things I still don’t fully understand

- Best way to organize growing code (folder structure)
- How to securely store passwords long-term
- When to use state management tools like Redux

Lessons learned

1. Small, focused files are easier to fix and test.
2. Writing tests early saves time later.
3. Logs and feedback make debugging less scary.
4. Documentation helps everyone — especially future me.

Thank you for reviewing my work. I welcome feedback.
