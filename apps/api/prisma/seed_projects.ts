import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding projects...');

  // 1. C++ Systems Project
  await prisma.project.upsert({
    where: { slug: 'cpp-systems' },
    update: {},
    create: {
      title: 'C++ Systems Project',
      slug: 'cpp-systems',
      description: 'A high-performance C++ systems project simulating a custom memory allocator or lightweight database engine.',
      category: 'FLAGSHIP',
      difficulty: 'HARD',
      projectType: 'SYSTEMS',
      targetSkills: ['C++', 'Memory Management', 'Data Structures', 'OS Concepts'],
      technologies: ['C++', 'CMake', 'Valgrind'],
      architectureSummary: 'Core engine in C++ with custom memory pools, B-Tree indexes, and a simple CLI interface.',
      estimatedHours: 40,
      milestones: {
        create: [
          {
            title: 'Memory Allocator',
            description: 'Build a custom arena allocator to avoid standard library overhead.',
            order: 1,
            tasks: {
              create: [
                { title: 'Design Arena Struct', description: 'Define the memory block structure.', estimatedMinutes: 60, order: 1 },
                { title: 'Implement Allocation Logic', description: 'Write allocate and free methods.', estimatedMinutes: 120, order: 2 },
              ]
            }
          },
          {
            title: 'B-Tree Implementation',
            description: 'Implement a disk-backed B-Tree for indexing.',
            order: 2,
            tasks: {
              create: [
                { title: 'Node Structure', description: 'Design internal and leaf nodes.', estimatedMinutes: 90, order: 1 },
                { title: 'Insert and Split', description: 'Implement insertion logic with node splitting.', estimatedMinutes: 180, order: 2 },
              ]
            }
          }
        ]
      }
    }
  });

  // 2. Production Full-Stack Project
  await prisma.project.upsert({
    where: { slug: 'production-fullstack' },
    update: {},
    create: {
      title: 'Production Full-Stack Project',
      slug: 'production-fullstack',
      description: 'A modern, scalable full-stack web application with authentication, real-time features, and a robust API.',
      category: 'FLAGSHIP',
      difficulty: 'MEDIUM',
      projectType: 'FULLSTACK',
      targetSkills: ['React', 'Node.js', 'PostgreSQL', 'WebSockets', 'Redis'],
      technologies: ['Next.js', 'Express', 'Prisma', 'Tailwind'],
      architectureSummary: 'Next.js frontend communicating with a containerized Express backend. Redis for caching and WebSockets for real-time sync.',
      estimatedHours: 35,
      milestones: {
        create: [
          {
            title: 'Backend Setup',
            description: 'Initialize the API and Database.',
            order: 1,
            tasks: {
              create: [
                { title: 'Express & Prisma Setup', description: 'Initialize repository and schema.', estimatedMinutes: 60, order: 1 },
                { title: 'Auth Implementation', description: 'Add JWT based authentication.', estimatedMinutes: 120, order: 2 },
              ]
            }
          },
          {
            title: 'Frontend Foundation',
            description: 'Setup Next.js and UI components.',
            order: 2,
            tasks: {
              create: [
                { title: 'Next.js Scaffold', description: 'Setup routing and layout.', estimatedMinutes: 60, order: 1 },
                { title: 'Integration', description: 'Connect frontend to Auth API.', estimatedMinutes: 120, order: 2 },
              ]
            }
          }
        ]
      }
    }
  });

  // 3. Scalable Backend Project
  await prisma.project.upsert({
    where: { slug: 'scalable-backend' },
    update: {},
    create: {
      title: 'Scalable Backend Project',
      slug: 'scalable-backend',
      description: 'A high-throughput backend system designed to handle thousands of concurrent requests.',
      category: 'FLAGSHIP',
      difficulty: 'HARD',
      projectType: 'BACKEND',
      targetSkills: ['Go', 'Microservices', 'Message Queues', 'Docker'],
      technologies: ['Golang', 'Kafka', 'PostgreSQL', 'gRPC'],
      architectureSummary: 'Microservice architecture using Go, communicating via gRPC and async Kafka events.',
      estimatedHours: 45,
      milestones: {
        create: [
          {
            title: 'Service Architecture',
            description: 'Define protobufs and initialize services.',
            order: 1,
            tasks: {
              create: [
                { title: 'Define Protobufs', description: 'Write .proto files for User and Order services.', estimatedMinutes: 90, order: 1 },
                { title: 'gRPC Servers', description: 'Implement basic gRPC handlers in Go.', estimatedMinutes: 120, order: 2 },
              ]
            }
          }
        ]
      }
    }
  });

  // 4. Distributed Systems Project
  await prisma.project.upsert({
    where: { slug: 'distributed-systems' },
    update: {},
    create: {
      title: 'Distributed Systems Project',
      slug: 'distributed-systems',
      description: 'A distributed key-value store implementing basic consensus and replication.',
      category: 'FLAGSHIP',
      difficulty: 'HARD',
      projectType: 'SYSTEMS',
      targetSkills: ['Distributed Consensus', 'Networking', 'Fault Tolerance'],
      technologies: ['Go', 'Raft (Concepts)'],
      architectureSummary: 'Multi-node cluster implementing a simplified Raft consensus algorithm for leader election and log replication.',
      estimatedHours: 50,
      milestones: {
        create: [
          {
            title: 'Network Layer',
            description: 'Establish RPC communication between nodes.',
            order: 1,
            tasks: {
              create: [
                { title: 'RPC Setup', description: 'Setup net/rpc for inter-node communication.', estimatedMinutes: 120, order: 1 }
              ]
            }
          }
        ]
      }
    }
  });

  // 5. AI + Distributed Platform
  await prisma.project.upsert({
    where: { slug: 'ai-distributed-platform' },
    update: {},
    create: {
      title: 'AI + Distributed Platform',
      slug: 'ai-distributed-platform',
      description: 'An AI-powered application leveraging distributed ML inference and real-time streaming.',
      category: 'FLAGSHIP',
      difficulty: 'HARD',
      projectType: 'FULLSTACK',
      targetSkills: ['Python', 'Machine Learning', 'Stream Processing', 'React'],
      technologies: ['FastAPI', 'PyTorch', 'Kafka', 'React'],
      architectureSummary: 'FastAPI serving ML models, processing streaming data via Kafka, with a React monitoring dashboard.',
      estimatedHours: 45,
      milestones: {
        create: [
          {
            title: 'Model Serving',
            description: 'Deploy the ML model behind an API.',
            order: 1,
            tasks: {
              create: [
                { title: 'FastAPI Wrapper', description: 'Create endpoints for inference.', estimatedMinutes: 90, order: 1 }
              ]
            }
          }
        ]
      }
    }
  });

  console.log('Projects seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
