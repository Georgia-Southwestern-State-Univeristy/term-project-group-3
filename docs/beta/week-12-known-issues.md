# Week 12 Known Issues and Technical Debt

This document lists current bugs and code improvements needed in the FitTrack Beta (beta-v0.1). As a software engineer, I am maintaining an activity log to properly track the issues. Most of these issues were found during testing; others came up during code review.

## Issue 1: App Might Crash If Stored Data Is Corrupted

Sometimes, if the data saved in localStorage isn't valid JSON, the app fails to load. This could happen if someone edits the storage manually or if a bug writes bad data.

The solution is to wrap the JSON.parse calls in try-catch blocks and provide a notification or message instead of crashing.

Next step: Add error handling in the Storage class.

## Issue 2: No Warning When LocalStorage Fails

If the browser blocks storage (like in incognito mode or due to space limits), the app silently fails when trying to save workouts.

We don't tell the user anything, which makes it look like the app is broken.

I plan to add a try-catch around setItem() and show an alert explaining the problem.

## Issue 3: Users Can Log Too Many Workouts in One Day

Right now, nothing stops a user from logging 10, 20, or even 100 workouts in a single day. While unlikely, this could cause performance issues or abuse.

We decided to limit it to 6 per day. There's now a test for this, but the actual logic needs to be added to the addWorkout function.

## Issue 4: Two Different Storage Keys Are Used

I noticed the app uses two keys: 'fittrack_workouts' and 'fittrack_workouts_v1'. This seems to be from earlier versions when we changed how data was stored.

Some parts of the code use the old key, others use the new one. This can cause confusion and missing data.

We should pick one key and update all code to use it. Also, we should make sure the Storage class is always used instead of direct localStorage access.

## Issue 5: Workout List Doesn't Refresh After Delete

When a user deletes a workout, it still shows up on screen until the page is refreshed. The data is gone from storage, but the UI doesn't update accordingly.

This is occurring because we are not calling renderAll() or updating the DOM after deletion.

Fix: Call the refresh function after delete completes.

## Issue 6: Date Format Is Inconsistent

Some places show dates like 2026-04-04, while others use Mon, Apr 4. It looks messy and confusing.

Most of the code uses a formatDate() helper, but not everywhere. We must implement a fix to use that function consistently across the app.

Also, maybe create a shared utility file for formatting functions.

## Issue 7: No Limit on Workout Duration Input

The form accepts any number in the duration field, even things like 99999 minutes. That is over 6 days long and clearly not realistic.

We will set a max value, maybe 1440 minutes (24 hours), and show an error if exceeded.

We must implement HTML validation before saving.
