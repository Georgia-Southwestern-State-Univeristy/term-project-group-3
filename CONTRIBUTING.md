<<<<<<< repo-standards
# Contributing Guidelines

## Branch Naming

- feature/<feature-name>
- bugfix/<issue-name>
- docs/<documentation-update>

Example:
feature/login-page

## Pull Request Expectations

- Create a PR from your branch to `main`
- Provide a clear description of changes
- Ensure all checks pass before merging

## Review Expectations

- At least one teammate reviews the PR
- Reviewer checks formatting, clarity, and functionality
- Address review comments before merging
=======
# Contributing to FitTrack

Thank you for contributing to FitTrack!  
This document defines how our team collaborates.

---

## Branch Naming

We use short-lived branches.

Format:

feature/<description>
fix/<description>
docs/<description>

Examples:
feature/add-workout-form
fix/storage-error
docs/update-readme

Branches should be merged quickly and deleted after merge.

---

## Pull Request Expectations

- Open PRs early (draft PRs encouraged)
- Keep PRs small and focused
- Describe what changed clearly
- CI checks must pass before merging

---

## Review Expectations

- At least one teammate approval required
- Reviewer checks:
  - readability
  - correct behavior
  - follows team standards

---
>>>>>>> main

## Running Checks Locally

Install dependencies:

<<<<<<< repo-standards
npm install

Run formatting check:

npm run format:check

Fix formatting:

npx prettier --write "\*_/_.{html,css,js,json,md}"
=======
Run linter:

Run tests:
>>>>>>> main
