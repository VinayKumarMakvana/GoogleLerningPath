export const do_04_compose = {
  DOCKER_COMPOSE: {
    title: 'Docker Compose',
    description: 'Define and run multi-container Docker applications using YAML.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Docker'],
    learningContent: `
# Docker Compose

Modern applications rarely exist as a single container. You usually need an API server, a database, a cache (Redis), and maybe a frontend. Starting all of these manually with \`docker run\` commands is tedious and error-prone.

## What is Docker Compose?
Compose is a tool for defining and running multi-container Docker applications. You use a YAML file (\`docker-compose.yml\`) to configure your application's services, networks, and volumes. Then, with a single command, you create and start all the services.

## The YAML Structure
- **services:** Define the containers (e.g., \`api\`, \`db\`, \`redis\`).
- **networks:** Define communication channels between services. (By default, Compose puts all services in a single default network where they can talk to each other using their service names).
- **volumes:** Define persistent data stores.
`,
    fullNotes: `
# Detailed Notes: Docker Compose

- **Service Discovery:** Compose automatically configures a DNS so services can resolve each other by name. For example, your Node API can connect to Postgres using \`postgres://user:pass@db:5432\` because the service is named \`db\`.
- **Environment Variables:** You can pass environment variables directly in the YAML or point to an \`.env\` file.
- **Depends_on:** You can specify that the \`api\` service depends on the \`db\` service. Compose will start the \`db\` first. *Note: this only waits for the container to start, not for the database inside it to be "ready" to accept connections.*
`,
    shortNotes: `
- Tool for multi-container orchestration on a single host.
- Uses \`docker-compose.yml\`.
- Services can communicate using their YAML service names as hostnames.
- \`docker-compose up -d\` starts everything in the background.
- \`docker-compose down\` stops and removes containers and networks.
`,
    cheatSheet: `
\`\`\`yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
    depends_on:
      - db
  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: secretpassword
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
\`\`\`
`,
    interviewQuestions: [
      { question: 'How do containers in a Docker Compose file communicate with each other?', answerHint: 'Docker Compose automatically creates a default bridge network. Services can resolve each other by using their service name defined in the YAML file as the hostname (e.g., ping db).', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Docker Compose Overview', url: 'https://docs.docker.com/compose/', type: 'ARTICLE', priority: 'S', source: 'Docker Docs', isOfficial: true },
      { title: 'Docker Compose in 12 Minutes', url: 'https://www.youtube.com/watch?v=Qw9zlz3O10U', type: 'VIDEO', priority: 'A', source: 'YouTube', isOfficial: false }
    ]
  }
};
