export const do_05_cicd = {
  GITHUB_ACTIONS: {
    title: 'CI/CD & GitHub Actions',
    description: 'Automate testing, building, and deployment using Continuous Integration and Continuous Deployment pipelines.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 120,
    prerequisites: ['Docker', 'Git & GitHub Engineering Workflow'],
    learningContent: `
# CI/CD & GitHub Actions

## What is CI/CD?
- **Continuous Integration (CI):** The practice of automating the integration of code changes from multiple contributors into a single software project. Every time code is pushed, automated tests and linters run to ensure the code is healthy.
- **Continuous Deployment (CD):** An extension of CI. If the automated tests pass, the code is automatically deployed to production. 

## GitHub Actions
GitHub Actions makes it easy to automate all your software workflows directly in your GitHub repository.
Workflows are defined by YAML files placed in the \`.github/workflows/\` directory.

### Core Components
1. **Workflow:** The automated process (e.g., "Build and Test").
2. **Events:** Triggers that run the workflow (e.g., \`push\` to main branch, or \`pull_request\`).
3. **Jobs:** A set of steps that execute on the same runner (server). Jobs run in parallel by default.
4. **Steps:** Individual tasks that run commands or Actions.
5. **Actions:** Reusable standalone commands (e.g., \`actions/checkout@v3\` to clone the repo).
`,
    fullNotes: `
# Detailed Notes: CI/CD

- **Runners:** The servers that execute your workflows. GitHub provides Ubuntu, Windows, and macOS runners, but you can also host your own (Self-hosted runners) for internal network access or cost savings.
- **Secrets Management:** NEVER hardcode passwords or API keys in your workflow YAML. Use GitHub Secrets (\`\${{ secrets.MY_SECRET }}\`), which are encrypted and injected as environment variables during the run.
- **Docker in CI/CD:** A very common CD pipeline:
  1. Push code to \`main\`.
  2. GitHub Actions runs unit tests.
  3. If passed, it builds a Docker image.
  4. Pushes the image to a Container Registry (e.g., Docker Hub, AWS ECR).
  5. Triggers a webhook or SSH command to tell the production server to pull the new image and restart.
`,
    shortNotes: `
- CI = Automated Testing & Linting.
- CD = Automated Deployment.
- Workflows live in \`.github/workflows/*.yml\`.
- Use GitHub Secrets for sensitive data.
- Jobs run in parallel by default; use \`needs\` to make them sequential.
`,
    cheatSheet: `
\`\`\`yaml
# .github/workflows/ci.yml
name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js 18
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'
    - run: npm ci
    - run: npm run lint
    - run: npm test
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the main difference between Continuous Delivery and Continuous Deployment?', answerHint: 'Continuous Delivery automates the release process up to a staging environment, but requires a manual click/approval to go to production. Continuous Deployment is fully automated all the way to production with no manual intervention.', type: 'CONCEPTUAL' },
      { question: 'How do you handle sensitive API keys in GitHub Actions?', answerHint: 'You store them in GitHub Secrets and reference them in the workflow YAML using the `\\${{ secrets.KEY_NAME }}` syntax, mapping them to environment variables.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions', type: 'ARTICLE', priority: 'S', source: 'GitHub', isOfficial: true },
      { title: 'GitHub Actions Crash Course', url: 'https://www.youtube.com/watch?v=R8_veQiYBjI', type: 'VIDEO', priority: 'A', source: 'TechWorld with Nana', isOfficial: false }
    ]
  }
};
