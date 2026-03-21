# Week 10 Sprint Plan

## Sprint Goal
By the end of this sprint, users can securely access the FitTrack dashboard only after login, submit validated workout data, and experience a smoother and more reliable workflow.

---

## Committed Backlog

### 1. Implement client-side authentication
- User can log in through a login page
- Authentication state is stored in localStorage
- Session persists after refresh
Owner: Misbah

---

### 2. Protect /dashboard route
- Unauthorized users are redirected to login page
- Direct access to dashboard is blocked
Owner: Gary

---

### 3. Add input validation to workout form
- Duration must be between 1–300 minutes
- Activity type must be selected
- Errors are displayed for invalid input
Owner: Misbah

---

### 4. Fix unsafe rendering (prevent XSS)
- Replace innerHTML with textContent
- Ensure user input is safely displayed
Owner: Khoa

---

### 5. Fix data corruption bug
- Invalid or empty data does not break app
- Summary calculations remain stable
Owner: Misbah

---

### 6. Improve usability of workout flow
- Add success message after submission
- Clear and helpful error messages
Owner: Gary

---

### 7. Add tests for auth and validation
- Unauthorized access is tested
- Validation failures are tested
- Bug fix regression test added
Owner: Misbah

---

## Evidence
Project Board: https://github.com/orgs/Georgia-Southwestern-State-Univeristy/projects/25