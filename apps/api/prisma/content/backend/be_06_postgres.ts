export const be_06_postgres = {
  POSTGRES_FUNDAMENTALS: {
    title: 'PostgreSQL Backend Integration',
    description: 'Learn how to connect, query, and manage PostgreSQL databases from a Node.js backend using ORMs.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 120,
    prerequisites: ['REST API Principles'],
    learningContent: `
# PostgreSQL Backend Integration

PostgreSQL is a powerful, open-source object-relational database system. When building backends, you need a way for your Node.js code to interact with Postgres.

## Connection Approaches
1. **Raw Drivers (node-postgres / pg):** You write raw SQL strings. Highest performance, full SQL control, but vulnerable to SQL injection if not careful, and lacks type safety.
2. **Query Builders (Knex.js):** You write JavaScript methods that generate SQL. Better abstraction, dynamic queries, but still loosely typed.
3. **ORMs (Prisma, TypeORM, Sequelize):** Maps database tables to JavaScript/TypeScript objects. High productivity, strong type safety, automatic migrations, but abstracts away the SQL which can hide performance issues.

## Prisma ORM
Prisma is a modern ORM that generates a fully type-safe client based on a \`schema.prisma\` file.
`,
    fullNotes: `
# Detailed Notes: Postgres & Prisma

- **Connection Pools:** Creating a new database connection for every request is extremely slow. Use connection pooling (like \`pg.Pool\` or PgBouncer) so connections are reused. Prisma handles connection pooling automatically.
- **Prisma Schema:** The single source of truth for your database. You define models, relations, and the datasource.
- **Migrations:** \`prisma migrate dev\` generates SQL migration files based on schema changes and applies them to the database, ensuring schema version control.
- **N+1 Problem:** A common ORM issue where fetching a list of items and their relations results in 1 query for the list + N queries for the relations. Prisma avoids this using DataLoader patterns under the hood when using \`include\`.
`,
    shortNotes: `
- Postgres is a relational DB.
- Use raw drivers (\`pg\`), query builders (\`knex\`), or ORMs (\`prisma\`).
- Always use connection pooling.
- ORMs provide type safety and migration management at the cost of some abstraction overhead.
- Beware of the N+1 query problem.
`,
    cheatSheet: `
\`\`\`prisma
// schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  posts Post[]
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  authorId Int
  author   User   @relation(fields: [authorId], references: [id])
}
\`\`\`

\`\`\`typescript
// Using Prisma Client
const usersWithPosts = await prisma.user.findMany({
  include: { posts: true }
});
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the N+1 query problem?', answerHint: 'It occurs when an application executes a query to get N items, and then executes a separate query for each item to get related data (N queries), resulting in N+1 total queries. It severely degrades performance.', type: 'TECHNICAL' },
      { question: 'Why use an ORM like Prisma instead of writing raw SQL?', answerHint: 'ORMs provide type safety, automatic autocompletion, database-agnostic code, and built-in migration tools, significantly increasing developer productivity.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Prisma Client Documentation', url: 'https://www.prisma.io/docs/concepts/components/prisma-client', type: 'ARTICLE', priority: 'S', source: 'Prisma Docs', isOfficial: true },
      { title: 'Learn Prisma In 60 Minutes', url: 'https://www.youtube.com/watch?v=RebA5J-rlwg', type: 'VIDEO', priority: 'A', source: 'Web Dev Simplified', isOfficial: false }
    ]
  }
};
