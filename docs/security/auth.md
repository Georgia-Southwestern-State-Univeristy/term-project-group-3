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

    User: Authenticated user with a session. Can create and manage their own goals.

    Admin: Not implemented in this release (future enhancement)

    Currently, all authenticated users have the same permissions.

    Anonymous users cannot access protected routes without login.

Access Control Rules Enforced

    Only logged-in users can create goals

    Server checks: if (!req.session.userId) → respond with 401 Unauthorized

    Evidence: PR #66, commit 7f59816

    Only the goal owner can delete a goal

    Server checks: if (goal.userId !== req.session.userId) → respond with 403 Forbidden

Evidence: PR #66, commit 7f59816

Minimum bar met: Protection is enforced server-side. Unauthorized requests are rejected with proper HTTP status codes — not just UI hidden.

Security Assumptions and Limitations

    Assumption: Session store (e.g., Redis or memory) is secure and not accessible to attackers

    Assumption: Cookies are transmitted over HTTPS in production

    Limitation: No rate limiting on login attempts (vulnerable to brute force)

    Limitation: No CSRF protection implemented yet

    Limitation: Passwords are hashed with bcrypt, but no 2FA or account lockout

Evidence

    PR #66: Add session-based authentication and requireAuth middleware – implements login session and protects /api/goals

    PR #2: Add ownership check on goal deletion – ensures users can only delete their own goals

Demo Notes

    When unauthenticated user tries to POST /api/goals, server returns 401 Unauthorized

    When user tries to delete another user’s goal (via direct API call), server returns 403 Forbidden

    These checks are made in route handlers before database operations

\*\*\*Security Assumptions and Limitations

Assumptions:

    Sessions are stored server-side securely.

    The SESS_SECRET is kept confidential and is cryptographically strong.

    The app runs behind HTTPS in production (not just HTTP).

    User IDs from the session are trusted (sanitized on login).

Limitations:

    No rate limiting on login attempts.

    No account lockout or 2FA.

    Session timeout is not explicitly configured.

    No admin role or granular permissions.
