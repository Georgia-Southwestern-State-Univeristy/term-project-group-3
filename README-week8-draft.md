<!--
README-WEEK8-DRAFT.md
======================
PROPOSED DOCUMENTATION UPDATE - Week 8 Sprint
This file demonstrates the complete README updates planned for Week 9.
Current README.md (old) + README(1).md (duplicate) will be consolidated
into a single updated README.md in Week 9 deliverables.

See: Week 8 MVP Demo Evidence
-->

# Term Project – Group 3

### Team 3 Workflow

## Project Overview

This project demonstrates good software engineering practices including:

- Branching and PR discipline
- Code quality checks with linters/formatters
- Team-defined standards
- Minimal end-to-end workflow

---

## Getting Started

- Only use VS Code for repo access and modifications
- Only use Bash for terminal commands

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation & Running

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3.git
   cd term-project-group-3
   ```

2. **Install dependencies**

```bash
 npm install
```

3. **Start the development server**

```bash
 npm start
```

4. **Open site below in browser:**

```bash
http://localhost:3000
the application will automatically open in your default browser
```

5. **Available Scripts**

- npm start - Runs the Express server on port 3000
- npm test - Runs unit tests
- npm run format:check - Checks code formatting with Prettier
- npm run format - Auto-fixes code formatting

6. **Known Limitations--Note on Data Persistence: This MVP uses browser localStorage for data persistence**

- Workouts are stored locally in your browser
- Data will not sync across different devices or browsers
- Clearing browser data will remove workout history
- Future iterations will include backend database integration

7. **CI/CD Pipeline**

- All pull requests trigger automated checks:
  - Code formatting verification (Prettier)
  - Unit test execution
  - Dependency installation validation

See .github/workflows/ci.yml for configuration.

### Before Submitting (Contributor Checklist)

Before pushing changes, always run:

```bash
npm run format     # Auto-fix all formatting
npm run format:check  # Verify formatting (optional but recommended)

**All contributions must follow our Definition of Done:
See: Definition of Done**
```
