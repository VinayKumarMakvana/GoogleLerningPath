export const be_03_express = {
  EXPRESS_FUNDAMENTALS: {
    title: 'Express.js Fundamentals',
    description: 'Learn routing, request handling, and response formatting in Express.',
    difficulty: 'BEGINNER',
    estimatedLearnTime: 60,
    prerequisites: ['Node.js Runtime & Event Loop'],
    learningContent: `
# Express.js Fundamentals

Express is a fast, unopinionated, minimalist web framework for Node.js. It acts as a thin layer of fundamental web application features on top of Node.js.

## Routing
Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, etc.).

\`\`\`javascript
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/users', (req, res) => {
  res.status(201).json({ user: 'created' })
})
\`\`\`

## Request and Response Objects
- **req:** Represents the HTTP request (params, query string, body, headers).
- **res:** Represents the HTTP response that an Express app sends when it gets an HTTP request.
`,
    fullNotes: `
# Detailed Notes: Express Fundamentals

- **Routers:** Use \`express.Router()\` to create modular, mountable route handlers. This keeps your \`app.js\` clean.
- **Parsing Bodies:** Express needs middleware to parse request bodies. Use \`express.json()\` for JSON payloads and \`express.urlencoded()\` for form data.
- **Route Parameters:** Captured in \`req.params\` (e.g., \`/users/:id\`).
- **Query Strings:** Captured in \`req.query\` (e.g., \`/search?q=term\`).
`,
    shortNotes: `
- Minimalist web framework over Node \`http\` module.
- Use \`app.get\`, \`app.post\`, etc. for routing.
- \`req.params\` for path variables, \`req.query\` for URL queries, \`req.body\` for POST payload.
- Always send a response (\`res.json()\`, \`res.send()\`) to prevent hanging requests.
`,
    cheatSheet: `
\`\`\`javascript
// Setup
const express = require('express');
const app = express();
app.use(express.json()); // Parse JSON bodies

// Router
const router = express.Router();
router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, query: req.query });
});

app.use('/api/users', router);
app.listen(3000);
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the purpose of express.Router()?', answerHint: 'It allows you to create modular, mountable route handlers to organize your application into multiple files.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Express Routing Guide', url: 'https://expressjs.com/en/guide/routing.html', type: 'ARTICLE', priority: 'S', source: 'Official Docs', isOfficial: true },
      { title: 'Express Crash Course', url: 'https://www.youtube.com/watch?v=L72fhGm1tfE', type: 'VIDEO', priority: 'A', source: 'Traversy Media', isOfficial: false }
    ]
  },
  MIDDLEWARE: {
    title: 'Middleware Architecture',
    description: 'Understand how Express middleware forms the backbone of request processing.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Express.js Fundamentals'],
    learningContent: `
# Middleware Architecture

Middleware functions are functions that have access to the request object (\`req\`), the response object (\`res\`), and the \`next\` function in the application's request-response cycle.

## How it works
Middleware can:
1. Execute any code.
2. Make changes to the request and the response objects.
3. End the request-response cycle.
4. Call the next middleware in the stack using \`next()\`.

If the current middleware function does not end the request-response cycle, it **must** call \`next()\` to pass control to the next middleware function. Otherwise, the request will be left hanging.
`,
    fullNotes: `
# Detailed Notes: Middleware

- **Application-level middleware:** Bound to an instance of \`express()\`.
- **Router-level middleware:** Bound to an instance of \`express.Router()\`.
- **Error-handling middleware:** Has exactly 4 arguments: \`(err, req, res, next)\`. Must be defined last, after all other \`app.use()\` and route calls.
- **Third-party middleware:** e.g., \`cors\`, \`helmet\`, \`morgan\`.
`,
    shortNotes: `
- Functions that intercept the request/response cycle.
- Must call \`next()\` or end the response (\`res.send()\`).
- Error middleware takes 4 params: \`(err, req, res, next)\`.
- Execution is strictly top-to-bottom in the order they are defined.
`,
    cheatSheet: `
\`\`\`javascript
// Custom Logging Middleware
const logger = (req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // Pass control to next handler
};
app.use(logger);

// Error Handling Middleware (must be at the very end)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});
\`\`\`
`,
    interviewQuestions: [
      { question: 'What happens if you forget to call next() in a middleware function?', answerHint: 'The request will hang and eventually timeout because the response is never sent and control is never passed to the next handler.', type: 'TECHNICAL' },
      { question: 'How is error handling middleware different from standard middleware?', answerHint: 'It takes exactly four arguments (err, req, res, next) and is executed only when an error is passed via next(err).', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Using Express Middleware', url: 'https://expressjs.com/en/guide/using-middleware.html', type: 'ARTICLE', priority: 'S', source: 'Official Docs', isOfficial: true }
    ]
  }
};
