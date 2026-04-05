# FitTrack: Beta Deployment & Run Path

## 1. Run Environment
For the Beta release, the application is designed to be run locally via Node.js. The system uses a local file-based database (`data/activities.json`) to persist workouts.

## 2. Prerequisites
* **Node.js**: v18.0.0 or higher
* **Git**: To clone the repository

## 3. Setup & Run Instructions
To run the FitTrack Beta on a fresh machine, execute the following commands in your terminal:

` ` `bash
# 1. Clone the repository
git clone https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3.git

# 2. Navigate into the project directory
cd term-project-group-3

# 3. Install dependencies
npm install

# 4. Start the application server
npm start
` ` `

## 4. Environment Variables
Currently, the application defaults to standard local ports and does not require external API keys for the Beta core workflow. 
* `PORT` (Optional): The server defaults to port `3000`. You can override this by creating a `.env` file in the root directory and adding `PORT=8080`.

## 5. Database Setup & Seed Data
* **No manual database setup is required.** Thanks to our system reliability implementations, if `data/activities.json` does not exist upon startup, the server will automatically self-heal and generate a clean, empty data file to prevent 500 errors.
* **Test Accounts:** Advanced authentication is deferred to the final release. No login is required to test the Beta functionality.

## 6. What to Do First After Launch
1. Open your browser and navigate to `http://localhost:3000`.
2. Enter a new workout (e.g., "Running", "30 minutes") and click **Save**.
3. Verify that the workout appears in the Dashboard and the "Weekly Summary" totals update immediately.
4. Refresh the page to verify that the data persists successfully.

## 7. Testing Evidence
* **Verified by Team:** This exact run path was tested on a fresh repository clone by a team member. The server booted successfully, the auto-generated `activities.json` file was created, and the core end-to-end logging workflow functioned without errors.
