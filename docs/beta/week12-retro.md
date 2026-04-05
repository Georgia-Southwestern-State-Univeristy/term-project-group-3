# Week 12: Beta Retrospective & Next Sprint

## 1. What Went Well
* **CI/CD:** Automated tests successfully prevented regressions.
* **Resilience:** Self-healing data files stopped server crashes.
* **Scope Control:** Delayed OAuth to perfect the core logging feature.

## 2. What Slowed Us Down
* **Testing Setup:** Mocking browser environments in Node was complex.
* **CI Config:** Prettier formatting false alarms blocked early PRs.

## 3. Top 3 Lessons Learned
1. **Tooling:** CI pipelines must be accurate, or developers ignore them.
2. **Defensive Code:** App-level error recovery beats 500 server errors.
3. **Architecture:** Testing vanilla JS is hard; we need decoupled code.

## 4. Top 5 Priorities (Weeks 13–15)
1. **Local Database:** Replace `activities.json` with a robust local DB.
2. **Authentication:** Implement secure user login.
3. **Backend Tests:** Expand CI to cover new API endpoints.
4. **Refactoring:** Modularize frontend JS for easier testing.
5. **Final Polish:** Ensure flawless local setup instructions for everyone can follow.

## 5. Sprint Plan
* **Board:** https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3
