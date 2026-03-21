Bug Triage Log and Regression Protection Plan – FitTrack Beta 

Overview 

This document details the issues identified during the midterm demonstration, teammate testing, and a deep code review of the FitTrack Beta application. It logs critical, major, and minor bugs, providing clear reproduction steps, expected versus actual behavior, and a specific regression protection plan for each. The goal is to ensure application stability, data integrity, and reliability prior to release. 

Severity Level Definitions 

    CRITICAL: Completely blocks a core user workflow, causes data loss or corruption, or renders the application unusable. A release blocker. 

    MAJOR: Significantly degrades user experience, prevents a common task from being completed, or impairs a major feature. 

    MINOR: Affects usability, aesthetics, or edge-case workflows. Core functions operate, but the user experience is suboptimal. 

 

Issues Log Summary Below 

Issue 1: Insecure localStorage Usage - Corrupted Data 

Severity: Critical Description: The application lacks error handling for corrupted data in localStorage. If the stored JSON string is invalid, the JSON.parse() call fails with a SyntaxError, crashing the application and preventing it from loading any data. 

Reproduction Steps: 

    Open the application in a browser and add a workout. 

    Open the developer console (F12) and navigate to the "Application" (or "Storage") tab. 

    Find the localStorage entry for fittrack_workouts_v1 and manually change its value to an invalid string (e.g., {invalid json}). 

    Refresh the page. 

Expected Behavior: The application should gracefully handle the corrupted data. It should log an error, clear the corrupted entry, initialize with an empty workout list, and remain fully functional. 

Actual Behavior: A SyntaxError is thrown in the console, halting JavaScript execution. The application fails to load, and the workout list is not displayed. The user is forced to manually clear localStorage. 

Regression Protection Plan: 

    Resolution: Implement a try...catch block around the JSON.parse() call in the Storage.getWorkouts() function. On a SyntaxError, the error will be logged to the console, the corrupted localStorage entry will be cleared using localStorage.removeItem(Storage.STORAGE_KEY), and an empty array [] will be returned. 

    Test: A new unit test, test('should handle corrupted localStorage data gracefully'), has been added to storage.test.js. It verifies that when invalid JSON is stored, getWorkouts() returns an empty array and clears the storage. 

 

Issue 2: No Error Handling for localStorage Write Failures 

Severity: Major Description: The application does not handle failures when attempting to write to localStorage. If a write fails due to quota limits or privacy settings, the operation fails silently, leading to unacknowledged data loss. 

Reproduction Steps: 

    Open the developer console (F12) on the application page. 

    In the console, override the setItem method to simulate a failure: Storage.prototype.setItem = () => { throw new Error('Simulated quota exceeded'); }; 

    Attempt to add a new workout via the form. 

Expected Behavior: The application should detect the write failure, alert the user with a message like "Failed to save workout. Storage may be full or unavailable.", and log the error for debugging. 

Actual Behavior: The localStorage.setItem() call fails and throws an error, but the application continues execution as if the save was successful. The user receives no notification, and the workout is lost upon refresh. 

Regression Protection Plan: 

    Resolution: Wrap the localStorage.setItem() call in the Storage.saveWorkouts() function with a try...catch block. If an error is caught, it will be logged to the console, and the function will return false to signal failure. 

    User Feedback: The addWorkout function in app.js will check the return value. If saveWorkouts returns false, an alert('Failed to save workout. Please check your browser storage settings.') will be shown. 

    Test: A new unit test, test('should handle localStorage write failures'), has been added to storage.test.js. It mocks a failing setItem and verifies that saveWorkouts returns false and logs the error. 

 

Issue 3: No Limits on Daily Activity Entries 

Severity: Major Description: The application allows an unlimited number of workout entries per day, both for a specific activity type and in total. This can lead to data saturation, UI clutter, and unrealistic user behavior. 

Reproduction Steps: 

    Open the application. 

    Set the date in the form to the current day. 

    Enter "Walking" as the type and "30" as the duration. Click "Save". Repeat this step 5 more times. 

    Now, add workouts for 5 different activity types (e.g., Running, Cycling) on the same day. 

Expected Behavior: 

    The system should enforce a limit of 3 entries per activity type per day. 

    The system should enforce a limit of 6 total activities per day. 

    Attempts to exceed these limits should trigger a user alert and prevent the save. 

Actual Behavior: The application accepts and saves all entries without any validation or user notification. 

Regression Protection Plan: 

    Resolution: Add validation logic to the addWorkout() function in app.js. Before saving, it will: 

    Retrieve the current workout list. 

    Filter workouts by the selected date. 

    Count workouts for the selected type. If count >= 3, show alert "You can only log '[type]' 3 times per day." and return. 

    Count total workouts for the date. If count >= 6, show alert "You can only log 6 workouts per day." and return. 

    Test: A new unit test, test('should enforce daily entry limits'), has been added to app.test.js. It verifies that attempts to save a 4th workout of the same type or a 7th workout of any type on the same date are blocked. 

 

Issue 4: Duplicate Storage Implementations and Key Mismatch 

Severity: Critical Description: The application has two conflicting data storage systems. src/app.js directly uses localStorage with the key 'fittrack_workouts', while src/storage.js is a dedicated module that uses 'fittrack_workouts_v1'. This inconsistency means app.js bypasses the intended central storage logic, leading to potential data conflicts and a lack of code reusability. 

Reproduction Steps: 

    Review the src/app.js file. Observe the getWorkouts() and saveWorkouts() functions that directly interact with localStorage using 'fittrack_workouts'. 

    Review the src/storage.js file. Observe the STORAGE_KEY is set to 'fittrack_workouts_v1'. 

    Run the application. The data is saved under 'fittrack_workouts', making the storage.js module effectively unused. 

Expected Behavior: All data persistence operations should be handled by the storage.js module using a single, consistent key. app.js should only use the public methods of the Storage object. 

Actual Behavior: The core app.js file implements its own storage logic, ignoring the existing storage.js module and using a different storage key. 

Regression Protection Plan: 

    Resolution: app.js has been refactored to remove its getWorkouts and saveWorkouts functions and instead use Storage.getWorkouts() and Storage.saveWorkout(workout) for all operations. 

    Test: The storage.test.js suite now covers all storage logic. A functional test in app.test.js verifies the integration. 

 

Issue 5: No Prevention of Duplicate Workout Entries 

Severity: Critical Description: The application allows users to log identical workouts multiple times, which inflates weekly statistics and corrupts data integrity. 

Reproduction Steps: 

    Add a workout (e.g., Running, 30 minutes, for today). 

    Immediately add the same workout again with identical details. 

    Check the workout list and weekly summary. 

Expected Behavior: The application should detect and prevent the saving of a workout that exactly matches an existing one (same date, type, duration). 

Actual Behavior: Two identical workout entries are created and displayed. 

Regression Protection Plan: 

    Resolution: The Storage.saveWorkout(workout) function now checks for existing workouts with the same date, type, and duration. If a duplicate is found, the function returns false. 

    User Feedback: The addWorkout function in app.js checks the return value and alerts the user if a duplicate is detected. 

    Test: A unit test test('should prevent saving duplicate workouts') in storage.test.js verifies this logic. 

 

Issue 6: Inconsistent Date Formatting in Display 

Severity: Minor Description: Dates in the workout list are displayed in the raw YYYY-MM-DD format, which is not user-friendly. 

Reproduction Steps: 

    Add a new workout with a date. 

    Observe the date format in the rendered workout list. 

Expected Behavior: Dates should be displayed in a human-readable format (e.g., "Mon, Mar 15"). 

Actual Behavior: Dates are shown as "2026-03-15". 

Regression Protection Plan: 

    Resolution: The formatDate(dateString) utility function in app.js is already correctly implemented and used. This issue appears to be a documentation error. The function converts the date to a readable string. 

    Test: A unit test test('should format date correctly') in app.test.js verifies the output of formatDate for various inputs. 

 
Issue 7: Workout List Not Updated After Deletion 
 
Severity: Minor 
Description: After a user deletes a workout, the on-screen list is not refreshed. The deleted workout remains visible until the user manually reloads the page, providing a confusing and poor user experience. 
 
Reproduction Steps: 
 
Add one or more workouts. 
Click the "Delete" button on one of the workout entries. 
Observe the workout list. 
Expected Behavior: The deleted workout entry should immediately disappear from the list on the screen. 
Actual Behavior: The workout entry remains visible in the list. The deletion is only reflected in localStorage, not in the DOM. 
Regression Protection Plan: 
 
Resolution: The deleteWorkout(id) function in app.js must call renderAll() after successfully removing the workout from the array and saving to storage. 
Test: A new unit test, test('should remove workout from DOM after deletion'), will be added to app.test.js. It will simulate a click on a delete button and assert that the corresponding DOM element is removed from the page. 
 
 
