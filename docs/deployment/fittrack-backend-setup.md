# FitTrack Backend Setup Guide

> A step-by-step guide to setting up and running the FitTrack application with three different storage backends.

---

## Before You Start

You will need two things installed on your computer:

1. **Node.js** — This lets you run JavaScript outside of the browser (on your machine). You can download it from [https://nodejs.org](https://nodejs.org).
2. **npm** — This stands for **Node Package Manager**. It comes bundled with Node.js, so if you have Node.js, you already have npm. Think of npm like an app store, but for JavaScript code libraries.

To check if you have them, open your terminal and run:

```bash
node --version
npm --version

***What Each File Does

config.js	This is like a settings file. It has one important variable that tells the app which storage backend to use.

storage.adapter.js	This is the "adapter" — it reads config.js and then loads the correct storage file. Think of it like a power adapter that works in different countries.

storage.localstorage.js	Stores data in the browser's localStorage. Simple, but limited.

storage.indexeddb.js Stores data in the browser's IndexedDB. More powerful than localStorage.

storage.api.js	Instead of storing data in the browser, this sends data to a server over the network.

server.js	This is the backend server. It runs on your machine and responds to requests from storage.api.js.

app.js	The main JavaScript file that powers the frontend of your app.

data/workouts.json	A simple text file that the server uses as a mini-database. It starts as an empty list: []


Step 2: Install Dependencies

What are dependencies? Dependencies are external libraries (code written by other people) that your project needs to work. Instead of writing everything from scratch, we use these libraries to handle common tasks.

Open your terminal, navigate to your fittrack folder, and run:

bash
copy
download
npm install express cors concurrently http-server

This command downloads four libraries:
Library	What It Does	Why We Need It
express	A framework for building web servers in Node.js	We use it to build our REST API server (server.js)

cors	Stands for Cross-Origin Resource Sharing	Browsers block requests from one port (3000) to another (4000) for security. CORS tells the browser "it's okay, we trust this server."

concurrently	Runs multiple commands at the same time	We need to run the frontend AND the backend at the same time. This lets us do that with one command.

http-server	A simple server that serves static files (HTML, CSS, JS)	We use it to serve our frontend on localhost:3000

After this runs, you'll see a new node_modules/ folder and a package-lock.json file. Do not edit these. They are managed automatically by npm.

Step 3: Configure package.json Scripts

Your package.json file has a scripts section. Scripts are shortcuts — instead of typing a long command every time, you type a short one.

***What each script does

Script	Command	What Happens
npm start	Runs http-server on port 3000	Serves your frontend (HTML/CSS/JS) at http://localhost:3000.

The -c-1 disables caching (so you always see your latest changes) and --cors allows cross-origin requests.
npm run server	Runs node server.js	Starts your Express backend API server at http://localhost:4000.

npm run dev	Runs both of the above at the same time	Uses concurrently to start the frontend on port 3000 AND the backend on port 4000 with one command.

###
    Port 3000 = Your frontend (the website the user sees in the browser)

    Port 4000 = Your backend (the API server that stores and retrieves data)

When you use the api storage backend, your frontend on port 3000 sends HTTP requests to your backend on port 4000.

When you use localstorage or indexeddb, the backend is not needed since everything stays in the browser.

###Common Issues and Fixes

"Port 3000 is already in use"

Something else is already running on port 3000. You can either:

    Close the other program that's using port 3000
    Or change the port in the npm start script (e.g., change -p 3000 to -p 3001)

"Port 4000 is already in use"

This message indicates that something is already running on port 4000. Change the port in server.js or close the other program.
```
