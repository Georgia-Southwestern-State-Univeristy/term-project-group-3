Hand-Off Draft – Week 13  
Prepared by: C0D3-Y, of The Bug Writers

This document is meant to help the next person who works on this app.

What does this app do?

The app lets users log workouts and manage a triage list of tasks. It has a frontend built with React and a backend using Node.js and Express. Data is stored locally.

This week, our team worked on making the code easier to maintain and less likely to break.

What changed this week?

We focused on cleaning up the code and improving reliability. Here's what each part was about:

A) Goals: Improve maintainability  
We wanted to reduce bugs and make future changes safer. We added better error handling and cleaned up messy code.

B) Extracted data logic into storage.js

Before, all the code for saving and loading workouts was inside App.js and blended with the user interface. That made it hard to test.  
Now, we moved that logic into a new file called storage.js. This separates data handling from the UI, which makes testing easier.

C) Added logging and feedback

We added console logs for key actions (like saving or deleting) and for errors. We also added a message that says "No workouts yet" when the list is empty. These help users and developers see what's happening.

D) Added 4 new tests

We wrote tests to:

- Prevent crashes if data is missing
- Block invalid inputs (like empty workout names)
- Make sure the new storage.js module works correctly

These tests run automatically when someone pushes new code.

Known issues (still need help)

Even with improvements, some problems remain:

- Login logic is repeated in many places and should be centralized.
- The main component (TriageList) does too much — it should be split into smaller parts.
- Error handling is better but not complete — network failures could still cause issues.
- There's no health check endpoint (like /health) to test if the server is running.
- Logs go to the console only — no persistent logging or dashboard.

Suggestions for next steps

1. Continue splitting code into small, focused modules (like we did with storage.js).
2. Move repeated login checks into one shared function or middleware.
3. Add more tests for edge cases and user flows.
4. Improve error recovery — for example, what happens if the database is down?
5. Write more comments in complex parts so future developers (like me!) can understand faster.

Final note

This was my first time contributing to a full-stack project of this size. I’ve learned how important clean code, testing, and documentation are. Thank you for reading this. I welcome any feedback.
