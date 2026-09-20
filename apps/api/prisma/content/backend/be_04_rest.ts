export const be_04_rest = {
  REST_PRINCIPLES: {
    title: 'REST API Principles',
    description: 'Learn the architectural constraints of REST and how to design clean APIs.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Express.js Fundamentals'],
    learningContent: `
# REST API Principles

REST (Representational State Transfer) is an architectural style for distributed hypermedia systems.

## The 6 Constraints of REST
1. **Client-Server:** Separation of concerns.
2. **Stateless:** Each request from client to server must contain all information needed to understand the request. The server stores no session state.
3. **Cacheable:** Responses must implicitly or explicitly define themselves as cacheable or not.
4. **Uniform Interface:** Resource identification in requests, manipulation through representations, self-descriptive messages, HATEOAS.
5. **Layered System:** A client cannot ordinarily tell whether it is connected directly to the end server, or to an intermediary.
6. **Code on Demand (optional):** Servers can temporarily extend or customize the functionality of a client by transferring executable code.
`,
    fullNotes: `
# Detailed Notes: REST API Design

- **Nouns, not Verbs:** URIs should represent resources (nouns). E.g., \`/users\`, not \`/getUsers\`.
- **HTTP Methods as Actions:**
  - \`GET\`: Retrieve a resource (Safe, Idempotent)
  - \`POST\`: Create a new resource (Not Safe, Not Idempotent)
  - \`PUT\`: Replace an entire resource (Not Safe, Idempotent)
  - \`PATCH\`: Partially update a resource (Not Safe, Not explicitly Idempotent)
  - \`DELETE\`: Delete a resource (Not Safe, Idempotent)
- **Status Codes:** Use appropriate HTTP status codes (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error).
`,
    shortNotes: `
- REST uses standard HTTP methods (GET, POST, PUT, DELETE).
- Endpoints should be nouns (\`/users/123\`).
- Must be stateless (no server-side sessions).
- Always return appropriate HTTP status codes.
- Use plural nouns (\`/articles\` not \`/article\`).
`,
    cheatSheet: `
| Action | Method | URL Path | Status Code |
| :--- | :--- | :--- | :--- |
| Read All | GET | /api/users | 200 OK |
| Read One | GET | /api/users/:id | 200 OK |
| Create | POST | /api/users | 201 Created |
| Update All | PUT | /api/users/:id | 200 OK |
| Update Partial | PATCH | /api/users/:id | 200 OK |
| Delete | DELETE | /api/users/:id | 204 No Content |
`,
    interviewQuestions: [
      { question: 'What is the difference between PUT and PATCH?', answerHint: 'PUT replaces the entire resource. PATCH applies partial modifications to the resource.', type: 'TECHNICAL' },
      { question: 'What does it mean for an HTTP method to be idempotent?', answerHint: 'Making multiple identical requests has the same effect as making a single request. GET, PUT, and DELETE are idempotent.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'What is REST', url: 'https://restfulapi.net/', type: 'ARTICLE', priority: 'S', source: 'REST API Tutorial', isOfficial: true },
      { title: 'REST API Design Best Practices', url: 'https://www.youtube.com/watch?v=q6awMqtH30w', type: 'VIDEO', priority: 'A', source: 'YouTube', isOfficial: false }
    ]
  }
};
