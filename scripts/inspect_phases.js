const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const roadmaps = await prisma.roadmap.findMany({
    include: {
      phases: {
        orderBy: { order: 'asc' },
        include: {
          modules: {
            orderBy: { order: 'asc' },
            include: {
              skills: {
                orderBy: { title: 'asc' },
                include: {
                  topics: {
                    orderBy: { order: 'asc' },
                    include: {
                      resources: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  console.log(`\n=== FOUND ${roadmaps.length} ROADMAPS IN DATABASE ===`);
  for (const r of roadmaps) {
    console.log(`\n------------------------------------------------------`);
    console.log(`ROADMAP: "${r.title}" (phases: ${r.phases.length})`);
    console.log(`------------------------------------------------------`);
    for (const p of r.phases) {
      const topicCount = p.modules.reduce((acc, m) => acc + m.skills.reduce((sAcc, s) => sAcc + s.topics.length, 0), 0);
      console.log(`  Phase ${p.order}: "${p.title}" (modules: ${p.modules.length}, topics: ${topicCount})`);
      for (const m of p.modules) {
        for (const s of m.skills) {
          for (const t of s.topics) {
            const vids = t.resources.filter(res => res.type === 'VIDEO');
            console.log(`      - [${t.title}] -> Videos: ${vids.length} ${vids.length > 0 ? '(' + vids[0].title + ')' : 'MISSING'}`);
          }
        }
      }
    }
  }

  // Also let's check all phases in DB
  const allPhases = await prisma.phase.findMany({
    orderBy: { order: 'asc' },
    include: { roadmap: true }
  });
  console.log(`\n=== ALL PHASES IN DB (Total: ${allPhases.length}) ===`);
  allPhases.forEach(p => {
    console.log(`ID: ${p.id} | Order: ${p.order} | Title: "${p.title}" | Roadmap: "${p.roadmap ? p.roadmap.title : 'None'}"`);
  });

  await prisma.$disconnect();
}

main().catch(console.error);
