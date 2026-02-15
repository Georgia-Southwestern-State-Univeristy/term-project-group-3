# Contributing Guidelines

Thank you for contributing to this project.

## Branch Naming
Use descriptive branch names:

feature/<feature-name>
fix/<bug-name>
docs/<documentation-change>

Examples:
feature/workout-log
fix/login-error
docs/update-readme

## Pull Request Expectations
- Create PRs from your feature branch into `main`
- Provide a clear description of changes
- Keep PRs small and focused
- Ensure all checks pass before requesting review

## Review Expectations
- At least one teammate reviews before merge
- Reviewer checks:
  - Code readability
  - Functionality
  - Linting passes (if applicable)
  - No broken features

## Running Checks Locally
If you work locally, run:

npm install
npm run lint
