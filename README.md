# Term Project – Group 3

### Team 3 Workflow

## Project Overview

This project demonstrates good software engineering practices including:

- Branching and PR discipline
- Code quality checks with linters/formatters
- Team-defined standards
- Minimal end-to-end workflow

---

## Setup

1. Clone the repository:

```bash
git clone https://github.com/YourUserName/FitnessTrackerApp.git

cd FitnessTrackerApp
```

All contributions must follow our Definition of Done:
See: [Definition of Done](docs/team/definition-of-done.md)

```

```
## Part C: One Real MVP Path

**PR:** #44 – Fitness Tracker localStorage Persistence  
**CI Status:** [View Passing Run](https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3/actions/runs/22254150443)

### MVP Feature
Users can save workouts to localStorage and retrieve workout history across browser sessions.

### Source Files
- `src/app.js` - Main application logic and DOM handling
- `src/storage.js` - localStorage persistence layer
- `src/index.html` - User interface markup

### Local Setup & Test

```bash
# Install dependencies
npm install

# Run tests (4 tests passing)
npm test

# Check code formatting
npm run format
