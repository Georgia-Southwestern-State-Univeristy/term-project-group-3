# Week 10 Security Notes

## Identified Risks

### 1. No Input Validation
The workout form previously allowed any type of input, including invalid or empty values. This could lead to incorrect calculations or application crashes.

### 2. Unsafe Rendering (XSS Risk)
User input stored in localStorage was rendered using innerHTML, which could allow script injection.

### 3. No Authentication or Access Control
The application did not restrict access to the dashboard, allowing any user to view and modify workout data.

---

## Fixes Implemented

### Fix 1: Input Validation
- Duration must be a number between 1 and 300
- Activity type is required

Before:
Invalid or empty data was accepted and stored.

After:
Invalid inputs are rejected and clear error messages are displayed.

---

### Fix 2: Safe Rendering
- Replaced innerHTML with textContent when displaying user data

Before:
Malicious scripts could potentially execute.

After:
User input is displayed safely as plain text.

---

### Fix 3: Basic Authentication Protection
- Added login system using localStorage
- Protected /dashboard route from unauthorized access

Before:
Anyone could access the dashboard.

After:
Unauthorized users are redirected to login page.

---

## Validation Added

### Workout Duration
- Must be numeric
- Range: 1–300

### Activity Type
- Required field

---

## Evidence
PR Links:
- [PR link for validation]
- [PR link for auth]
- [PR link for bug fix]

Before/After Behavior:
- Before: App accepted invalid data and could break
- After: Invalid input is rejected and app remains stable