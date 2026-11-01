const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function audit() {
  console.log('=================================================================');
  console.log('     COMPREHENSIVE VIDEO COVERAGE AUDIT & VERIFICATION REPORT     ');
  console.log('=================================================================\n');

  // 1. Database Topics (C++, STL, DSA Foundations)
  const dbTopics = await prisma.topic.findMany({
    include: {
      resources: {
        where: { type: 'VIDEO' }
      }
    },
    orderBy: { order: 'asc' }
  });

  console.log(`[1] DATABASE CURRICULUM TOPICS (Total: ${dbTopics.length})`);
  let dbCovered = 0;
  const dbReport = [];

  for (const t of dbTopics) {
    const vids = t.resources;
    if (vids.length > 0) {
      dbCovered++;
      dbReport.push({
        id: t.id,
        title: t.title,
        videoCount: vids.length,
        primaryVideo: vids[0].title,
        channel: vids[0].source || 'YouTube',
        url: vids[0].url,
        covered: true
      });
    } else {
      dbReport.push({
        id: t.id,
        title: t.title,
        videoCount: 0,
        primaryVideo: 'NONE',
        channel: 'NONE',
        url: 'NONE',
        covered: false
      });
    }
  }

  console.log(`-> Covered: ${dbCovered}/${dbTopics.length} (${Math.round((dbCovered / dbTopics.length) * 100)}%)`);

  // 2. System Design Modules
  const sdDataPath = path.join(__dirname, '..', 'apps', 'web', 'src', 'data', 'systemDesignData.ts');
  let sdTopics = [];
  if (fs.existsSync(sdDataPath)) {
    const content = fs.readFileSync(sdDataPath, 'utf8');
    sdTopics = JSON.parse(content.replace(/[\s\S]*?export const SYSTEM_DESIGN_TOPICS: SystemDesignTopic\[\] = /, '').replace(/;[\s\n]*$/, ''));
  }

  console.log(`\n[2] SYSTEM DESIGN ARCHITECTURE MODULES (Total: ${sdTopics.length})`);
  let sdCovered = 0;
  const sdReport = [];

  for (const t of sdTopics) {
    const vids = (t.resources || []).filter(r => r.type === 'VIDEO' || (r.url && r.url.includes('youtube')));
    if (vids.length > 0) {
      sdCovered++;
      sdReport.push({
        id: t.id,
        title: t.title,
        videoCount: vids.length,
        primaryVideo: vids[0].title,
        url: vids[0].url,
        covered: true
      });
    } else {
      sdReport.push({
        id: t.id,
        title: t.title,
        videoCount: 0,
        primaryVideo: 'NONE',
        url: 'NONE',
        covered: false
      });
    }
  }

  console.log(`-> Covered: ${sdCovered}/${sdTopics.length} (${Math.round((sdCovered / sdTopics.length) * 100)}%)`);

  // 3. AI / Machine Learning Modules
  const aimlDataPath = path.join(__dirname, '..', 'apps', 'web', 'src', 'data', 'aimlData.ts');
  let aimlTopics = [];
  if (fs.existsSync(aimlDataPath)) {
    const content = fs.readFileSync(aimlDataPath, 'utf8');
    aimlTopics = JSON.parse(content.replace(/[\s\S]*?export const AIML_TOPICS: AimlTopic\[\] = /, '').replace(/;[\s\n]*$/, ''));
  }

  console.log(`\n[3] AI & LLM SYSTEMS MODULES (Total: ${aimlTopics.length})`);
  let aimlCovered = 0;
  const aimlReport = [];

  for (const t of aimlTopics) {
    const vids = (t.resources || []).filter(r => r.type === 'VIDEO' || (r.url && r.url.includes('youtube')));
    if (vids.length > 0) {
      aimlCovered++;
      aimlReport.push({
        id: t.id,
        title: t.title,
        videoCount: vids.length,
        primaryVideo: vids[0].title,
        url: vids[0].url,
        covered: true
      });
    } else {
      aimlReport.push({
        id: t.id,
        title: t.title,
        videoCount: 0,
        primaryVideo: 'NONE',
        url: 'NONE',
        covered: false
      });
    }
  }

  console.log(`-> Covered: ${aimlCovered}/${aimlTopics.length} (${Math.round((aimlCovered / aimlTopics.length) * 100)}%)`);

  // Summary
  const grandTotal = dbTopics.length + sdTopics.length + aimlTopics.length;
  const totalCovered = dbCovered + sdCovered + aimlCovered;
  console.log('\n=================================================================');
  console.log(`GRAND TOTAL: ${totalCovered}/${grandTotal} Topics & Modules Have Verified Video Coverage (${Math.round((totalCovered / grandTotal) * 100)}%)`);
  console.log('=================================================================');

  // Save detailed JSON report for inspection
  fs.writeFileSync(
    path.join(__dirname, 'video_audit_results.json'),
    JSON.stringify({
      summary: {
        grandTotal,
        totalCovered,
        percent: Math.round((totalCovered / grandTotal) * 100),
        databaseTopics: { total: dbTopics.length, covered: dbCovered },
        systemDesign: { total: sdTopics.length, covered: sdCovered },
        aiml: { total: aimlTopics.length, covered: aimlCovered }
      },
      dbReport,
      sdReport,
      aimlReport
    }, null, 2)
  );

  await prisma.$disconnect();
}

audit().catch(console.error);
