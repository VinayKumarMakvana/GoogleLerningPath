import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding non-DSA practice problems and assessments...');

  const topics = [
    { title: 'OS & Concurrency', type: 'CS', slug: 'os-concurrency-mcq-1' },
    { title: 'API Design & GraphQL', type: 'BACKEND', slug: 'api-design-mcq-1' },
    { title: 'Kubernetes Fundamentals', type: 'CLOUD', slug: 'k8s-fundamentals-mcq-1' },
    { title: 'Load Balancing & Caching', type: 'SYSTEM_DESIGN', slug: 'load-balancing-mcq-1' },
    { title: 'Consensus & Replication', type: 'DISTRIBUTED', slug: 'consensus-mcq-1' },
    { title: 'Auth & OAuth2', type: 'SECURITY', slug: 'oauth2-mcq-1' },
    { title: 'Logging, Metrics & Tracing', type: 'OBSERVABILITY', slug: 'tracing-mcq-1' },
    { title: 'Testing & TDD', type: 'ENGINEERING', slug: 'testing-mcq-1' },
    { title: 'Python Async & GIL', type: 'PYTHON', slug: 'python-async-mcq-1' },
    { title: 'Linear Algebra Fundamentals', type: 'MATH', slug: 'linear-algebra-mcq-1' },
    { title: 'Transformers', type: 'AI', slug: 'transformers-mcq-1' },
    { title: 'LLM Inference Systems', type: 'ADV_AI', slug: 'llm-inference-mcq-1' }
  ];

  for (const t of topics) {
    // Find a matching topic in DB to link to
    const dbTopic = await prisma.topic.findFirst({
      where: { title: { contains: t.title.split(' ')[0] } }
    });
    
    const topicIds = dbTopic ? [dbTopic.id] : [];

    const problem = await prisma.practiceProblem.upsert({
      where: { slug: t.slug },
      update: {},
      create: {
        title: `${t.type} Conceptual Knowledge Check`,
        slug: t.slug,
        statement: `Which of the following best describes a key concept in ${t.title}?`,
        problemType: 'MCQ',
        difficulty: 'MEDIUM',
        status: 'PUBLISHED',
        topics: {
          connect: topicIds.map(id => ({ id }))
        },
        options: [
          { id: 'a', text: 'Option A: The incorrect, naive approach.' },
          { id: 'b', text: 'Option B: The correct, industry-standard approach.' },
          { id: 'c', text: 'Option C: Another incorrect distractor.' },
          { id: 'd', text: 'Option D: Completely unrelated concept.' }
        ],
        correctAnswer: 'b',
        explanation: `Option B is correct because in ${t.title}, standard practice dictates using this method for reliability and scale.`,
        hints: ['Think about the most robust approach.']
      }
    });

    console.log(`Upserted problem: ${problem.title}`);

    // Create a mini-assessment for this topic
    const title = `${t.type} Mini-Assessment`;
    let assessment = await prisma.assessment.findFirst({ where: { title } });
    if (!assessment) {
      assessment = await prisma.assessment.create({
        data: {
          title,
          type: 'TOPIC',
          difficulty: 'MEDIUM',
          duration: 15,
          status: 'PUBLISHED',
          problems: {
            create: [
              { practiceProblemId: problem.id, order: 1 }
            ]
          }
        }
      });
      console.log(`Created assessment: ${assessment.title}`);
    }
  }

  console.log('Finished seeding non-DSA practice.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
