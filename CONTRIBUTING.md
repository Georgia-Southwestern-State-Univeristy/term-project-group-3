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

## Running Checks Locally

Install dependencies:

npm install

Run formatting check:

npm run format:check

Fix formatting:

npx prettier --write "\*_/_.{html,css,js,json,md}"
