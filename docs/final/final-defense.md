# Final Technical Defense Snapshot
**Team:** Group 3 (Bug Writer)
**Project:** FitTrack Activity Logger

### 1. Why did your team choose this architecture and stack?
We chose a pure frontend stack HTML5, CSS3, Vanilla JavaScript, coupled with the Browser Web Storage API `localStorage`. This architecture was selected specifically to enforce our core product vision: 100% user data privacy. By utilizing a decoupled design pattern where a dedicated `storage.js` module handles all data persistence, we achieved an offline-first application that requires zero external servers.

### 2. What were the most important technical trade-offs?
Our most significant trade-off was choosing local browser storage over a traditional backend database like MongoDB. We explicitly traded cross-device synchronization and cloud backups in exchange for zero server latency, zero hosting costs, and absolute data sovereignty for the user. 

### 3. What is the system’s biggest current weakness?
Because data is strictly bound to the user's specific browser via `localStorage`, the system lacks data portability. If a user clears their browser cache or switches to a different device, their workout history is currently inaccessible. 

### 4. What testing and CI evidence gives you confidence in the release?
We have 100% confidence in this release due to our strict CI/CD pipeline. Every Pull Request triggers a GitHub Action that runs Prettier for style consistency. Because our tests explicitly target boundary conditions, no fragile code can be merged into the `main` branch.

### 5. If another team inherited this project, what should they tackle first?
They should write a function that serializes the `localStorage` data into a downloadable JSON file, and an upload parser to restore it, giving users a manual way to back up their data without compromising the offline-first privacy vision.
