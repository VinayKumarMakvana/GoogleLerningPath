export const be_10_testing = {
  BACKEND_TESTING: {
    title: 'Backend Testing Strategies',
    description: 'Learn Unit, Integration, and E2E testing for Node.js APIs using Jest and Supertest.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 120,
    prerequisites: ['REST API Principles'],
    learningContent: `
# Backend Testing Strategies

Testing ensures your code works as expected and prevents regressions when making changes.

## Types of Tests
1. **Unit Tests:** Test individual functions or classes in isolation. Dependencies (like the database) are mocked.
2. **Integration Tests:** Test how different parts of the system work together. For a backend, this usually means testing API endpoints *with* a real database connection (often a test DB or in-memory DB).
3. **End-to-End (E2E) Tests:** Test the entire system from the user's perspective, often simulating a real browser hitting a real frontend connected to a real backend.

## Jest & Supertest
- **Jest:** The most popular testing framework for JavaScript/TypeScript. It provides the test runner, assertion library, and mocking capabilities.
- **Supertest:** A library used to test HTTP servers. It allows you to simulate HTTP requests against your Express app without actually starting a network server.
`,
    fullNotes: `
# Detailed Notes: Backend Testing

- **The Testing Pyramid:** You should have many Unit tests (fast, cheap), fewer Integration tests (slower), and even fewer E2E tests (very slow, brittle).
- **Mocking:** In Unit tests, you mock out external services. If testing a Controller, you mock the Service. If testing a Service, you mock the Database (Repository).
- **Test Database:** For integration tests, NEVER use your production database. Spin up a separate Test database (often using Docker) and clear it before each test suite runs.
- **TDD:** Test-Driven Development is a practice where you write a failing test first, then write the code to make it pass, then refactor.
`,
    shortNotes: `
- Unit: Isolated, mocked dependencies, fast.
- Integration: Tests interactions (e.g., API + DB), slower.
- Use Jest for assertions and running tests.
- Use Supertest to make mock HTTP requests to Express.
- Never use the production DB for integration tests.
`,
    cheatSheet: `
\`\`\`javascript
const request = require('supertest');
const app = require('../app'); // Your express app
const db = require('../db');

beforeAll(async () => await db.connect());
afterAll(async () => await db.disconnect());

describe('GET /users', () => {
  it('should return 200 and an array of users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the difference between Unit and Integration tests?', answerHint: 'Unit tests test a single component in isolation with mocked dependencies. Integration tests test how multiple components (like a controller and a real database) work together.', type: 'CONCEPTUAL' },
      { question: 'What is Mocking in the context of testing?', answerHint: 'Mocking is creating a fake version of an external dependency (like a database or 3rd party API) so that the test runs deterministically and does not rely on external state.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Jest Documentation', url: 'https://jestjs.io/docs/getting-started', type: 'ARTICLE', priority: 'S', source: 'Jest', isOfficial: true },
      { title: 'Node.js API Testing with Jest & Supertest', url: 'https://www.youtube.com/watch?v=F-sFp_AvHc8', type: 'VIDEO', priority: 'A', source: 'YouTube', isOfficial: false }
    ]
  }
};
