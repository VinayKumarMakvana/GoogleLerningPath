export const sec_03_auth = {
  AUTHENTICATION_AUTHORIZATION: {
    title: 'Authentication & Authorization',
    description: 'Master sessions, JWTs, OAuth 2.0, OpenID Connect, and RBAC/ABAC.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 120,
    prerequisites: ['Web & Application Security'],
    learningContent: `
# Authentication & Authorization

- **Authentication (AuthN):** Proving *who* you are (Login, MFA).
- **Authorization (AuthZ):** Verifying *what* you are allowed to do (Permissions, Roles).

## 1. Session-Based Authentication (Stateful)
1. User logs in.
2. Server verifies credentials, creates a Session in the DB/Redis, and sends a \`Session ID\` back to the browser in a secure Cookie.
3. On every request, the browser sends the Cookie. The server looks up the Session ID in the DB to verify the user.
- *Pros:* Highly secure, easy to revoke a session immediately (just delete from DB).
- *Cons:* Stateful. Requires DB lookup on every single request.

## 2. Token-Based Authentication (JWT - Stateless)
JSON Web Tokens (JWTs) are cryptographically signed JSON objects.
1. User logs in.
2. Server verifies credentials, creates a JWT containing the \`user_id\`, signs it with a secret key, and sends it to the client.
3. On every request, the client sends the JWT (usually in the \`Authorization: Bearer\` header).
4. The server verifies the signature locally (using CPU math). It DOES NOT need to query the database.
- *Pros:* Stateless, highly scalable, great for microservices.
- *Cons:* **Cannot be easily revoked.** If a JWT is stolen and valid for 1 hour, the attacker has access for 1 hour even if you change the password.

## 3. OAuth 2.0 & OpenID Connect (OIDC)
- **OAuth 2.0:** A framework for *Delegated Authorization*. It allows a third-party app (e.g., a printing service) to access user data on another service (e.g., Google Photos) WITHOUT giving the printing service your Google password.
- **OpenID Connect (OIDC):** An identity layer built ON TOP of OAuth 2.0. OAuth handles authorization (Access Tokens), OIDC handles authentication (ID Tokens). This is what powers "Sign in with Google/Apple".
`,
    fullNotes: `
# Detailed Notes: Auth & JWT Security

- **JWT Security Flaws:** 
  - *The "none" algorithm:* Attackers can change the header algorithm to "none" and strip the signature. The server must explicitly reject the "none" algorithm.
  - *Symmetric vs Asymmetric:* Microservices shouldn't share a single symmetric secret to verify JWTs. An Identity Provider (IdP) should sign the JWT with an Asymmetric Private Key (RS256). Microservices verify it using the Public Key.
- **RBAC vs ABAC:**
  - *Role-Based Access Control (RBAC):* Permissions assigned to roles (Admin, Editor, Viewer).
  - *Attribute-Based Access Control (ABAC):* Fine-grained permissions based on attributes (e.g., "User can edit Document ONLY IF Document.Department == User.Department").
`,
    shortNotes: `
- AuthN = Who are you? AuthZ = What can you do?
- Session Auth: Stateful, highly secure, easy to revoke, requires DB lookup.
- JWT Auth: Stateless, scalable, hard to revoke, verified via cryptography.
- Never store sensitive data (passwords, SSNs) inside a JWT payload (it is base64 encoded, not encrypted).
- OAuth 2.0 is for Authorization (Delegated access).
- OIDC is for Authentication (SSO / Sign in with Google).
- Use Short-lived Access Tokens (15 mins) and Long-lived Refresh Tokens (7 days).
`,
    cheatSheet: `
### Secure Cookie Flags
If storing session IDs or JWTs in cookies, always use:
- \`HttpOnly\`: Prevents JavaScript (XSS) from reading the cookie.
- \`Secure\`: Cookie is only sent over HTTPS.
- \`SameSite=Strict/Lax\`: Prevents CSRF attacks.
`,
    interviewQuestions: [
      { question: 'What is the main drawback of using JWTs for authentication compared to server-side sessions?', answerHint: 'JWTs are stateless, meaning once issued, they cannot be easily invalidated on the server side. If a user logs out or their account is compromised, the JWT remains valid until its expiration time. You must implement a "token blocklist" (making it stateful again) or use very short expiration times with Refresh Tokens to mitigate this.', type: 'TECHNICAL' },
      { question: 'What is the difference between OAuth 2.0 and OpenID Connect?', answerHint: 'OAuth 2.0 is strictly an authorization protocol designed to grant limited access to resources (via an Access Token) without sharing credentials. It does not provide information about the authenticated user. OpenID Connect (OIDC) is an identity layer built on top of OAuth 2.0 that provides an ID Token (a JWT), which allows the client to securely verify the identity and profile information of the user.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Stop using JWT for sessions', url: 'http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/', type: 'ARTICLE', priority: 'A', source: 'Sven Slootweg', isOfficial: false },
      { title: 'OAuth 2.0 and OpenID Connect (in plain English)', url: 'https://www.youtube.com/watch?v=996OiexHze0', type: 'VIDEO', priority: 'S', source: 'OktaDev', isOfficial: false }
    ]
  }
};
