Authentication & Access Control

Authentication Method

Users authenticate via session-based authentication using express-session and passport.js. On successful login, a session is created on the server and a session ID is stored in a cookie on the client. Subsequent requests include this cookie, and the server validates it to identify the user.

Protected Endpoints

The following routes are protected server-side:

    POST /api/goals – create a new goal

    DELETE /api/goals/:id – delete a goal

    GET /dashboard – view user dashboard

Access is enforced using the requireAuth middleware, which checks for a valid session.

Role Model

    User: Authenticated user who can create and manage their own goals

    Admin: Not implemented in this release (future enhancement)

Currently, all authenticated users have the same permissions.

Access Control Rules Enforced

    Only logged-in users can create goals

    Server checks: if (!req.session.userId) → respond with 401 Unauthorized

    Evidence: PR #12, commit a1b2c3d

    Only the goal owner can delete a goal

    Server checks: if (goal.userId !== req.session.userId) → respond with 403 Forbidden

    Evidence: PR #15, commit e4f5g6h

Minimum bar met: Protection is enforced server-side. Unauthorized requests are rejected with proper HTTP status codes — not just UI hidden.

Security Assumptions and Limitations

    Assumption: Session store (e.g., Redis or memory) is secure and not accessible to attackers

    Assumption: Cookies are transmitted over HTTPS in production

    Limitation: No rate limiting on login attempts (vulnerable to brute force)

    Limitation: No CSRF protection implemented yet

    Limitation: Passwords are hashed with bcrypt (good), but no 2FA or account lockout

Evidence

    PR #1: Add session-based authentication and requireAuth middleware – implements login session and protects /api/goals

    PR #2: Add ownership check on goal deletion – ensures users can only delete their own goals

Demo Notes

    When unauthenticated user tries to POST /api/goals, server returns 401 Unauthorized

    When user tries to delete another user’s goal (via direct API call), server returns 403 Forbidden

    These checks are made in route handlers before database operations
