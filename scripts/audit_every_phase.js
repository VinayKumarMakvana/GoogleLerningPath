const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Check if phaseRoadmapData has guide for phase
const roadmapDataContent = fs.readFileSync(path.join(__dirname, '..', 'apps', 'web', 'src', 'data', 'phaseRoadmapData.ts'), 'utf8');

async function auditEveryPhase() {
  console.log('================================================================================');
  console.log('       COMPLETE PHASE-BY-PHASE AUDIT: ROADMAP, NOTES, CHEATSHEETS & VIDEOS      ');
  console.log('================================================================================\n');

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
                    orderBy: { order: 'asc' },
                    include: {
                      learningContents: true,
                      notes: true,
                      shortNotes: true,
                      cheatSheets: true,
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

  if (!roadmap) {
    console.error('Roadmap not found!');
    return;
  }

  let totalPhases = roadmap.phases.length;
  let phasesWithCompleteContent = 0;
  let totalTopicsCount = 0;
  let topicsWithAllFiveFields = 0;

  for (const phase of roadmap.phases) {
    const hasGuide = roadmapDataContent.includes(`phaseOrder: ${phase.order}`);
    console.log(`--------------------------------------------------------------------------------`);
    console.log(`PHASE ${phase.order}: "${phase.title}"`);
    console.log(`  * Roadmap Strategy & Diagram Guide Present: ${hasGuide ? 'YES (100% Configured)' : 'NO'}`);

    let phaseTopics = 0;
    let phaseTopicsComplete = 0;

    for (const mod of phase.modules) {
      console.log(`\n  Module: "${mod.title}"`);
      for (const skill of mod.skills) {
        console.log(`    Skill: "${skill.title}"`);
        for (const topic of skill.topics) {
          phaseTopics++;
          totalTopicsCount++;

          const hasLearn = topic.learningContents.length > 0;
          const hasNotes = topic.notes.length > 0;
          const hasShort = topic.shortNotes.length > 0;
          const hasCheat = topic.cheatSheets.length > 0;
          const hasVideo = topic.resources.some(r => r.type === 'VIDEO' || (r.url && r.url.includes('youtube')));

          const isComplete = hasLearn && hasNotes && hasShort && hasCheat && hasVideo;
          if (isComplete) {
            phaseTopicsComplete++;
            topicsWithAllFiveFields++;
          }

          const vid = topic.resources.find(r => r.type === 'VIDEO' || (r.url && r.url.includes('youtube')));

          console.log(`      * Topic: "${topic.title}"`);
          console.log(`        - Full Notes:   ${hasNotes ? 'YES (' + topic.notes[0].title + ')' : 'MISSING'}`);
          console.log(`        - Short Notes:  ${hasShort ? 'YES (' + topic.shortNotes[0].title + ')' : 'MISSING'}`);
          console.log(`        - Cheat Sheet:  ${hasCheat ? 'YES (' + topic.cheatSheets[0].title + ')' : 'MISSING'}`);
          console.log(`        - Learn Guide:  ${hasLearn ? 'YES (' + topic.learningContents[0].title + ')' : 'MISSING'}`);
          console.log(`        - YouTube Vid:  ${hasVideo ? 'YES (' + vid.title + ' -> ' + vid.url + ')' : 'MISSING'}`);
        }
      }
    }

    if (phaseTopics > 0 && phaseTopics === phaseTopicsComplete && hasGuide) {
      phasesWithCompleteContent++;
      console.log(`\n  >> PHASE ${phase.order} STATUS: 100% COMPLETE & VERIFIED (${phaseTopics}/${phaseTopics} Topics Fully Equipped)`);
    } else {
      console.log(`\n  >> PHASE ${phase.order} STATUS: INCOMPLETE (${phaseTopicsComplete}/${phaseTopics} Complete)`);
    }
  }

  console.log(`\n================================================================================`);
  console.log(`SUMMARY RESULT:`);
  console.log(`Total Phases: ${totalPhases}`);
  console.log(`Phases with 100% Complete Roadmap + Notes + Cheat Sheets + Videos: ${phasesWithCompleteContent}/${totalPhases} (${Math.round((phasesWithCompleteContent / totalPhases) * 100)}%)`);
  console.log(`Total Topics: ${totalTopicsCount}`);
  console.log(`Topics with All 5 Fields (Learn + Notes + Short Notes + Cheat Sheet + Video): ${topicsWithAllFiveFields}/${totalTopicsCount} (${Math.round((topicsWithAllFiveFields / totalTopicsCount) * 100)}%)`);
  console.log(`================================================================================`);

  await prisma.$disconnect();
}

auditEveryPhase().catch(console.error);
