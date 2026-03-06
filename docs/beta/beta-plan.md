# Beta Development Plan

Project: FitTrack Activity Logger  
Team: Group 3  
Timeline: Weeks 9–12

---

## Top Backlog Items

| Priority | Feature                  | Description                                         |
| -------- | ------------------------ | --------------------------------------------------- |
| 1        | Backend API              | Create Node.js/Express API for storing workout data |
| 2        | Database Integration     | Replace localStorage with MongoDB                   |
| 3        | User Authentication      | Allow users to create accounts and log in           |
| 4        | Data Migration           | Move existing local data to backend database        |
| 5        | Integration Testing      | Add automated tests for full user workflows         |
| 6        | Data Export              | Export workout history to CSV or PDF                |
| 7        | UI Improvements          | Improve layout and usability                        |
| 8        | Performance Optimization | Improve loading speed for larger datasets           |
| 9        | PWA Support              | Enable offline installable web app                  |
| 10       | Error Handling           | Improve validation and error messaging              |

---

## Sprint Breakdown

### Sprint 1 (Week 9–10)

Focus: Backend foundation

Tasks:

- Set up Node.js + Express backend
- Implement API endpoints for workout data
- Configure MongoDB database
- Create API integration with frontend

Quality Sprint Item:

- Add integration test framework

---

### Sprint 2 (Week 11)

Focus: User management and data handling

Tasks:

- Implement user authentication
- Add account registration and login
- Connect user accounts to stored workout data
- Begin migration from localStorage

Quality Sprint Item:

- Expand automated test coverage

---

### Sprint 3 (Week 12 – Hardening)

Focus: Stability and usability

Tasks:

- Implement data export functionality
- Improve UI responsiveness
- Optimize performance for larger datasets
- Fix bugs identified during testing

Quality Sprint Item:

- Documentation updates and demo validation

---

## Highest Technical Risk

Risk: Implementing the backend API and database integration.

Reason:  
This introduces a new architecture layer and requires reliable communication between frontend and backend services.

Mitigation Plan:

- Implement backend early in Sprint 1
- Develop API endpoints incrementally
- Use integration tests to validate data flow
- Maintain fallback support for localStorage during transition
