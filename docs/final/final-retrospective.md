# Final Team Retrospective

**Team:** Group 3 (Bug Writer)

### 1. What the team did well

We excelled at architectural discipline and conflict resolution. When the team was split on whether to build a standard database backend or stick to frontend storage, we didn't let the disagreement stall development. We prototyped, measured the performance, and aligned on the LocalStorage approach because it best served our privacy goals. We also successfully maintained a strict Git workflow, ensuring all feature branches were reviewed before merging.

### 2. What the team would change earlier next time

We would implement strict boundary testing _before_ releasing our Beta. During the Beta phase, we fell into the trap of only testing the perfect user inputs. This left us scrambling to patch vulnerabilities later.

### 3. Most valuable engineering practice adopted this semester

Implementing an automated CI/CD pipeline via GitHub Actions was our most valuable practice. By making our reliability tests and Prettier formatting a mandatory "Quality Gate" that blocks broken code from merging, we completely eliminated the anxiety of breaking the `main` branch.

### 4. Most costly mistake or rework point

Our most costly rework point was the initial entanglement of our UI rendering logic and our data saving logic. Because they were mixed together in the early weeks. We had to spend significant engineering hours refactoring and extracting all data logic into a decoupled `storage.js` module.

### 5. How the project improved from proposal to final release

The project evolved from a fragile, basic HTML script into a highly robust, unbreakable application. We replaced native browser `alert()` popups with a custom UI error state, added a live System Health Check widget to monitor storage stability, and scaled our test coverage rigorous boundary checks. We are delivering a true Release Candidate, not just a student prototype.
