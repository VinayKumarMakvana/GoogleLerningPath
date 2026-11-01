const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: { url: 'mongodb://127.0.0.1:27017/mentorship-platform?directConnection=true' }
  }
});

async function main() {
  try {
    await prisma.$connect();
    console.log('SUCCESS: Connected to local MongoDB!');
    const users = await prisma.user.count();
    const tracks = await prisma.track.count();
    const problems = await prisma.practiceProblem.count();
    console.log(`Users: ${users}, Tracks: ${tracks}, Problems: ${problems}`);
  } catch (err) {
    console.error('ERROR:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
