# FitTrack Activity Logger (Release Candidate)

## Project Overview

FitTrack Activity Logger is a lightweight, browser-based fitness tracking application that allows users to log, view, edit, and manage workout activities. The project is designed as a single-page application with an offline-first approach using browser `localStorage` for secure, immediate data persistence.

## Core Value Proposition

FitTrack helps users quickly track workouts without needing an account or backend service. It is simple, fast, and works directly in the browser to respect user privacy and eliminate load times.

## Current Features

- Log a workout with activity type, duration, and timestamp
- View saved workouts in an interactive, chronological list
- Edit or delete existing workout entries
- View a dynamically updated weekly workout summary
- Persist all workout data automatically using browser `localStorage` (data survives page refreshes)

## Main Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Storage:** Browser Web Storage API (`localStorage`)
- **CI/CD & Automation:** GitHub Actions, Node.js

## Documentation & Guides

To review the complete system architecture, release notes, and testing evidence, please see our formal documentation:

- [Startup & Runbook Guide](./docs/final/week14-runbook.md)
- [System & User Guide](./docs/user-guide.md)
- [Week 13 Architecture Refactor](./docs/final/week13-refactoring.md)

---

## Setup and Run Instructions

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Local Run Path

```bash
git clone [https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3](https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3)
cd term-project-group-3
npm install
npm start


# FitTrack: Your Personal Workout Tracker

A modern web application for tracking your daily workouts, featuring multiple storage options (localStorage, IndexedDB, and a REST API backend).

**Live Demo (Local Setup Required):** [http://127.0.0.1:58570/login.html](http://127.0.0.1:58570/login.html)

---

```
