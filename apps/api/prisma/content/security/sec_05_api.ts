export const sec_05_api = {
  API_SECURITY: {
    title: 'API Security',
    description: 'Protecting REST and GraphQL APIs using rate limiting, input validation, and replay protection.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Web & Application Security', 'Authentication & Authorization'],
    learningContent: `
# API Security

APIs are the primary attack surface of modern architectures. Because APIs are designed to be consumed by machines, they are highly susceptible to automated attacks.

## 1. Rate Limiting & Throttling
APIs must be protected against Brute Force attacks, Credential Stuffing, and Denial of Service (DoS).
- **Rate Limiting:** Restricting the number of requests a user/IP can make in a given timeframe (e.g., 100 requests per minute).
- **Throttling:** Slowing down the response time for users who are approaching their limit.
- Implementation usually occurs at the API Gateway or using Redis (Token Bucket algorithm).

## 2. Input Validation (Sanitization)
Never trust data originating from an API client.
- **Strict Typing:** Ensure the \`age\` field is actually an integer, not a massive SQL string.
- **Allowlisting vs Denylisting:** Always use allowlisting (defining exactly what IS allowed). Denylisting (trying to block bad words like \`<script>\`) always fails because attackers find bypasses.
- **Mass Assignment:** If an API accepts \`PUT /users/1\` with \`{"name": "Vinay", "isAdmin": true}\`, and the backend blindly binds the JSON to the DB object, the user just gave themselves Admin rights. Explicitly map permitted fields.

## 3. Replay Attacks & Protection
- **Replay Attack:** An attacker intercepts a valid API request (e.g., a bank transfer) and simply resends the exact same payload multiple times to drain the account.
- **Mitigation:**
  - *HTTPS/TLS:* Prevents interception on the network.
  - *Idempotency Keys:* The API rejects requests with duplicate UUIDs.
  - *Timestamps & Nonces:* The payload includes a timestamp and a random string (nonce), and is cryptographically signed. The server rejects requests older than 5 minutes or requests with reused nonces.
`,
    fullNotes: `
# Detailed Notes: API Security

- **BOLA (Broken Object Level Authorization):** Previously known as IDOR. This is the #1 vulnerability on the OWASP API Security Top 10. It occurs when an API exposes a direct reference to an internal object (like \`/api/orders/105\`), and the API fails to check if the currently authenticated user actually *owns* order 105.
- **GraphQL Security:** GraphQL allows clients to ask for exactly what they want. However, a malicious client can ask for deeply nested relationships (\`user -> posts -> comments -> author -> posts...\`) causing a Denial of Service by exhausting database CPU. 
  - *Mitigation:* Implement Query Depth Limiting, Query Complexity Analysis, and Timeout controls.
`,
    shortNotes: `
- BOLA (IDOR) is the most common API vulnerability. Check authorization on EVERY object access.
- Implement Rate Limiting at the API Gateway to prevent DoS and brute force.
- Prevent Mass Assignment by strictly mapping allowed fields (DTOs).
- Defend against Replay Attacks using TLS, Idempotency keys, and signed timestamps.
- GraphQL requires strict Depth and Complexity limiting to prevent CPU exhaustion.
`,
    cheatSheet: `
### API Security Checklist
1. All traffic over TLS (HTTPS).
2. Rate Limiting enabled on all routes (stricter on \`/login\`).
3. Authentication via secure JWT or OAuth.
4. Authorization checked on every requested resource ID.
5. Strict Schema validation on all incoming JSON.
6. CORS configured strictly (No \`Access-Control-Allow-Origin: *\` for authenticated APIs).
`,
    interviewQuestions: [
      { question: 'What is a Mass Assignment vulnerability in an API?', answerHint: 'It occurs when a backend framework automatically binds incoming JSON payload fields directly to internal database objects. If the developer doesn\'t explicitly filter the fields, an attacker can inject sensitive fields (like {"is_admin": true, "balance": 10000}) into a standard profile update request, and the database will save them.', type: 'TECHNICAL' },
      { question: 'How do you secure a GraphQL API against Denial of Service (DoS) attacks?', answerHint: 'Because GraphQL allows the client to define the query shape, a malicious client can request deeply nested, recursive relationships that crash the database. You must implement Query Depth Limiting (e.g., max 5 levels deep) and Query Cost/Complexity Analysis (assigning a point value to each field and limiting the total points per query).', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'OWASP API Security Top 10', url: 'https://owasp.org/www-project-api-security/', type: 'ARTICLE', priority: 'S', source: 'OWASP', isOfficial: true }
    ]
  }
};
