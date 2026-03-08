# FitTrack Midterm Release (midterm)

## What's Included in the Midterm Build
This release represents the core MVP functionality for the FitTrack application, focusing entirely on local, client-side execution.
* **Workout Logging:** Users can record an activity type and duration.
* **Workout Viewing:** Saved workouts are immediately displayed in a historical list.
* **Local Data Persistence:** All data is saved directly to the browser's `localStorage` and persists across browser refreshes.

## Known Issues & Limitations
* **No Backend or Cloud Sync:** There is no database. If a user clears their browser cache, their workout history will be lost.
* **No Authentication:** User login is an explicit non-goal for the MVP.
* **Incomplete UI Features:** The logic for Workout Editing and Deletion exists, but UI integration is deferred to Beta.

## How to Reproduce the Demo Path
To run the app and verify this release, please use the following steps in a Bash terminal:

**1. Open the Project in VS Code**
Make sure you have the FitTrack project folder already open in VS Code. Repository link: https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3

**2. Open the Integrated Terminal**
In VS Code, go to Terminal -> New Terminal. Make sure the terminal's current directory is the root of the FitTrack project.

**3. Get Latest Changes**
Run this command to pull the latest updates from the repository:
`git pull origin main`

**4. Install Dependencies**
`npm install`

**5. Start the Application**
`npm start`
This will launch the app in your web browser, usually at http://localhost:3000. If the browser doesn't open automatically, just copy http://localhost:3000 into your web browser.
