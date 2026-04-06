# Week 12 Quality Assurance Report

This report is about the testing setup for FitTrack Beta version beta-v0.1. Although I am still learning how QA works, I wanted to make sure our app doesn't break as we keep building it.

## Types of Tests We Have

Right now, we have two kinds of automated tests.

We have 8 unit tests. These check small parts of the code, like whether a workout gets saved correctly or if the date shows up in the right format. They help catch bugs early without having to test everything by hand.

We also have 4 integration tests. These test how different pieces work together. For example, one test checks if the form data actually gets stored when you click save. Another makes sure deleting a workout removes it from local storage.

We don’t have any end-to-end tests yet. That means we can’t fully automate things like “add a workout, edit it, then delete it.” For now, we test those full flows manually in the browser.

There are a total of 12 passing automated tests that run every time someone pushes code.

## What Is Being Tested Automatically

The main things covered by tests are:

- Adding new workouts with valid data
- Stopping invalid inputs, like leaving the activity field empty or using negative time values
- Deleting workouts and making sure they’re removed from storage
- Calculating the weekly summary based on workouts from the last 7 days
- Preventing duplicate entries (same activity, duration, and date)

These tests help protect us from reintroducing old bugs. For example, last week we had an issue where duplicates could be saved. Now there’s a test to stop that from happening again.

## CI/CD Check

Our project uses GitHub Actions to run tests automatically whenever code is pushed. This helps catch problems before they reach users.

I will provide a link later with a real run after pushing these changes.

## New Tests Added This Week

This week, I added two new tests to improve reliability:

- A test that checks what happens if the data in localStorage is corrupted or not valid JSON. Before, the app might crash in that case. Now the test makes sure the app handles it safely.
- A test that enforces a daily limit of 6 workouts per user. It fails if someone tries to log more than that in one day. This was requested during team feedback.

## What Still Needs Testing

There are some things not covered by automated tests yet:

- What happens if localStorage is full or blocked (like in private mode)
- Whether the UI updates immediately after deleting a workout
- How the app behaves on mobile devices with touch input
- Edge cases like extremely large numbers in the duration field

We are testing these manually for now, but I know we should automate them eventually.

## Bug Prevention Example

This week, we fixed a bug where users could accidentally save the same workout twice. To make sure it doesn’t come back:

- I wrote a new test called "should prevent saving duplicate workouts"

- I updated the saveWorkout function to check for existing entries before saving

- Now the test fails if duplicates get through

Having this test gives me more confidence when changing other parts of the code.

<!-- Committed by C0D3-Y on 2026-04-06 -->
