export const be_05_auth = {
  AUTHENTICATION_JWT: {
    title: 'Authentication & JWT',
    description: 'Learn how to securely authenticate users using JSON Web Tokens (JWT).',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 90,
    prerequisites: ['REST API Principles'],
    learningContent: `
# Authentication & JWT

Authentication is the process of verifying who a user is.

## JSON Web Tokens (JWT)
A JWT is a compact, URL-safe means of representing claims to be transferred between two parties. The token is composed of three parts:
1. **Header:** Contains the algorithm and token type.
2. **Payload:** Contains the claims (e.g., user ID, role).
3. **Signature:** Used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

## Authentication Flow
1. Client sends credentials (username/password) to the server.
2. Server verifies credentials against the database.
3. If valid, Server generates a signed JWT and sends it back to the Client.
4. For subsequent requests, the Client includes the JWT in the \`Authorization: Bearer <token>\` header.
5. Server verifies the JWT signature. If valid, the request is processed.
`,
    fullNotes: `
# Detailed Notes: Authentication & JWT

- **Stateless:** JWTs are stateless. The server does not need to query the database to verify the token, making them highly scalable.
- **Security:** Do NOT store sensitive information (like passwords) in the JWT payload, as it is only base64 encoded, not encrypted.
- **Storage:** Storing JWTs in localStorage is vulnerable to XSS attacks. Storing them in HttpOnly cookies is preferred to mitigate XSS, though it introduces CSRF considerations.
- **Revocation:** Because JWTs are stateless, they cannot easily be revoked before they expire. Common solutions include short expiration times + refresh tokens, or a token blacklist in Redis.
`,
    shortNotes: `
- AuthN = Who you are.
- JWT = Header.Payload.Signature.
- Payload is readable by anyone; do not store secrets.
- Verification is done cryptographically on the server using a secret key.
- Send token via \`Authorization: Bearer <token>\` header.
`,
    cheatSheet: `
\`\`\`javascript
const jwt = require('jsonwebtoken');

// 1. Sign a token
const token = jwt.sign({ userId: 123 }, 'SECRET_KEY', { expiresIn: '1h' });

// 2. Verify a token (usually in middleware)
try {
  const decoded = jwt.verify(token, 'SECRET_KEY');
  console.log(decoded.userId);
} catch (err) {
  // Invalid or expired token
}
\`\`\`
`,
    interviewQuestions: [
      { question: 'Why is JWT considered stateless?', answerHint: 'Because the token itself contains all the information needed to authenticate the user and the cryptographic signature ensures it hasn\'t been tampered with. The server doesn\'t need to query a database or session store.', type: 'TECHNICAL' },
      { question: 'How do you handle token revocation with JWTs?', answerHint: 'Keep expiration times short and use refresh tokens, or maintain a blacklist of revoked tokens in a fast store like Redis.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'JWT Introduction', url: 'https://jwt.io/introduction', type: 'ARTICLE', priority: 'S', source: 'JWT.io', isOfficial: true },
      { title: 'Node.js JWT Authentication Tutorial', url: 'https://www.youtube.com/watch?v=mbsmsi7l3r4', type: 'VIDEO', priority: 'A', source: 'Web Dev Simplified', isOfficial: false }
    ]
  },
  AUTHORIZATION_BCRYPT: {
    title: 'Authorization & Password Hashing',
    description: 'Learn role-based access control and how to securely hash passwords.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Authentication & JWT'],
    learningContent: `
# Authorization & Password Hashing

While Authentication verifies *who* you are, Authorization verifies *what* you are allowed to do.

## Role-Based Access Control (RBAC)
RBAC is a method of restricting network access based on the roles of individual users within an enterprise.
- You assign roles (e.g., USER, ADMIN, MODERATOR) to users.
- You restrict routes or actions based on those roles.

## Password Hashing
Never store passwords in plain text. If the database is compromised, attackers will have all passwords.
Instead, use a cryptographic hashing algorithm like **bcrypt**.
- **Hashing:** A one-way function that turns a password into a fixed-length string.
- **Salting:** Adding random data to the input of a hash function to guarantee a unique output, protecting against dictionary attacks and rainbow tables.
`,
    fullNotes: `
# Detailed Notes: Authorization & Hashing

- **Bcrypt:** bcrypt automatically handles salting. It is computationally slow by design to deter brute-force attacks. You configure a "cost factor" (rounds) which determines how slow it is.
- **Authorization Middleware:** After JWT authentication middleware sets \`req.user\`, an authorization middleware can check \`req.user.role\`.
`,
    shortNotes: `
- AuthZ = What you can do.
- RBAC restricts access by user role.
- NEVER store plain text passwords.
- Use bcrypt to hash passwords. It handles salting automatically.
- Salting protects against rainbow table attacks.
`,
    cheatSheet: `
\`\`\`javascript
const bcrypt = require('bcryptjs');

// 1. Hash a password (during signup)
const salt = await bcrypt.genSalt(10); // 10 rounds
const hashedPassword = await bcrypt.hash('mypassword123', salt);

// 2. Compare a password (during login)
const isValid = await bcrypt.compare('mypassword123', user.hashedPassword);
if (!isValid) throw new Error('Invalid credentials');
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is a salt and why is it used in password hashing?', answerHint: 'A salt is random data added to a password before hashing. It ensures that identical passwords have different hashes, preventing rainbow table attacks.', type: 'TECHNICAL' },
      { question: 'What is the difference between Authentication and Authorization?', answerHint: 'Authentication validates identity (who you are). Authorization validates permissions (what you can do).', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'OWASP Password Storage Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html', type: 'ARTICLE', priority: 'S', source: 'OWASP', isOfficial: true },
      { title: 'Bcrypt in Node.js', url: 'https://www.youtube.com/watch?v=O6cmuiTBZVs', type: 'VIDEO', priority: 'A', source: 'YouTube', isOfficial: false }
    ]
  }
};
