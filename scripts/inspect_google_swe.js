const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function inspectGoogleSwePhases() {
  const roadmap = await prisma.roadmap.findFirst({
    where: { title: 'Google SWE Preparation' },
    include: {
      phases: {
        orderBy: { order: 'asc' },
        include: {
          modules: {
            orderBy: { order: 'asc' },
            include: {
              skills: {
                include: {
                  topics: {
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

  console.log(`=== ROADMAP: "${roadmap.title}" ===`);
  for (const p of roadmap.phases) {
    const totalModules = p.modules.length;
    let totalSkills = 0;
    let totalTopics = 0;
    let totalVideos = 0;
    p.modules.forEach(m => {
      totalSkills += m.skills.length;
      m.skills.forEach(s => {
        totalTopics += s.topics.length;
        s.topics.forEach(t => {
          totalVideos += t.resources.filter(r => r.type === 'VIDEO').length;
        });
      });
    });
    console.log(`\nPhase ${p.order}: "${p.title}" | Modules: ${totalModules} | Skills: ${totalSkills} | Topics: ${totalTopics} | Videos: ${totalVideos}`);
    for (const m of p.modules) {
      console.log(`   Module: "${m.title}" (skills: ${m.skills.length})`);
      for (const s of m.skills) {
        console.log(`      Skill: "${s.title}" (topics: ${s.topics.length})`);
        for (const t of s.topics) {
          const vids = t.resources.filter(r => r.type === 'VIDEO');
          console.log(`         Topic: "${t.title}" -> ${vids.length} videos`);
        }
      }
    }
  }

  await prisma.$disconnect();
}

inspectGoogleSwePhases().catch(console.error);
