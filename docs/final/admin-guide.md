# Admin / Maintenance Guide: FitTrack Activity Logger

## About This Guide

This document helps developers or team members understand how to set up, manage, and troubleshoot the FitTrack application. It explains what is built, how to reset its applicable features, and a pathway to inspect issues if or when something goes wrong.

## How to Set Up and Deploy

FitTrack is a frontend-only web app. That means there’s no server to run in the background. All the code runs in the user’s browser.

### IndexedDB and Front-End Scope

Even though we now use IndexedDB for better local data persistence, FitTrack remains a **client-side (front-end only)** application. IndexedDB is a browser-native storage system, similar to localStorage, but capable of handling larger and more complex data. It requires no server, network call, or backend infrastructure. All code and data remain within the user's browser environment.

To deploy it:

- Take the files from the `src/` folder (HTML, CSS, JS).
- Host them using any static website host like GitHub Pages, Netlify, or Vercel.
- Or test locally by opening `index.html` in a browser, or using a simple server like Python’s `http.server`.

No extra setup is needed for databases or APIs.

## Configuration Notes

There are no config files to edit. All settings are inside the JavaScript code.

Data is stored in the browser using IndexedDB (a built-in feature). If that fails, it falls back to localStorage. This is the updated plan for implementation after Week 14 to handle more data reliably.

## How to Restart or Reset

### Restarting the App

Since it is operating as client-side only, restarting just means refreshing the page in the browser.

For development:

- Make your code changes.
- Save the files.
- Refresh the browser to see updates.

### Clearing All Data (Reseeding)

If you want to start fresh (for testing or demo):

1. Open the app in your browser.
2. Press F12 to open Developer Tools.
3. Go to the **Application** tab.
4. Under **IndexedDB**, find `FitTrack` and delete the database.
5. Under **Local Storage**, clear any entries for the site.
6. Refresh the page. The app will act like it’s brand new.

Warning: This deletes all saved workouts permanently.

## Where to Find Errors and Logs

Most issues will show up in the browser console:

- Press F12 → go to the **Console** tab.
- Look for red error messages or yellow warnings.
- The app logs key events like:
  - "IndexedDB: Connected"
  - "IndexedDB failed, using localStorage"
  - "Saved X workouts"

These help you know if data is saving correctly or if something went wrong.

If the UI breaks, it is advisable to check the console first, as it is known to show missing files or JavaScript errors.

The logs will help us track data flow and catch issues early.

We plan to add user-facing error messages in a future update. Currently, the console remains our main diagnostic tool.

Our goal is transparency. We are focused on intently knowing exactly where things succeed or fail helps us improve steadily.
