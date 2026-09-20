import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting Phase 4 Content Audit...');
  const report: any = {
    overview: { totalTopics: 0, pass: 0, requireFixes: 0, incomplete: 0 },
    contentMatrix: [],
    technicalIssues: [],
    resourceIssues: [],
    database: { orphans: [], duplicates: [], invalidRelations: [] }
  };

  // 1. Fetch all topics from DB (we expect 50 for the Foundation phase)
  const topics: any[] = await prisma.topic.findMany({
    include: {
      learningContents: true,
      notes: true,
      shortNotes: true,
      cheatSheets: true,
      resources: true,
    },
    orderBy: { order: 'asc' }
  });

  report.overview.totalTopics = topics.length;

  for (const topic of topics) {
    let topicPass = true;
    let missing = [];
    
    // Check Content Existence
    const hasLearn = topic.learningContents && topic.learningContents.length > 0;
    const hasFullNote = topic.notes && topic.notes.length > 0;
    const hasShortNote = topic.shortNotes && topic.shortNotes.length > 0;
    const hasCheatSheet = topic.cheatSheets && topic.cheatSheets.length > 0;
    const hasResources = topic.resources && topic.resources.length > 0;

    if (!hasLearn) missing.push('Learn');
    if (!hasFullNote) missing.push('Full Notes');
    if (!hasShortNote) missing.push('Short Notes');
    if (!hasCheatSheet) missing.push('Cheat Sheet');

    if (missing.length > 0) {
      report.overview.incomplete++;
      topicPass = false;
    }

    report.contentMatrix.push({
      topic: topic.title,
      learn: hasLearn ? 'OK' : 'MISSING',
      notes: hasFullNote ? 'OK' : 'MISSING',
      shortNotes: hasShortNote ? 'OK' : 'MISSING',
      cheatSheet: hasCheatSheet ? 'OK' : 'MISSING',
      resources: hasResources ? topic.resources.length : 0,
      overall: topicPass ? 'PASS' : 'INCOMPLETE'
    });

    // Check for Duplicates in DB Relations
    if (topic.learningContents && topic.learningContents.length > 1) report.database.duplicates.push(`Duplicate Learn on ${topic.title}`);
    if (topic.notes && topic.notes.length > 1) report.database.duplicates.push(`Duplicate Notes on ${topic.title}`);
    if (topic.shortNotes && topic.shortNotes.length > 1) report.database.duplicates.push(`Duplicate Short Notes on ${topic.title}`);
    if (topic.cheatSheets && topic.cheatSheets.length > 1) report.database.duplicates.push(`Duplicate Cheat Sheet on ${topic.title}`);

    // Aggregate all text for heuristic scanning
    const allText = [
      ...(topic.learningContents || []).map((l: any) => l.content),
      ...(topic.notes || []).map((n: any) => n.content),
      ...(topic.shortNotes || []).map((n: any) => n.content),
      ...(topic.cheatSheets || []).map((c: any) => c.content)
    ].join('\\n');

    // HEURISTIC: Placeholder checks
    if (/lorem ipsum/i.test(allText) || /coming soon/i.test(allText)) {
      report.technicalIssues.push({ issue: 'Placeholder text found', topic: topic.title, severity: 'HIGH' });
      topicPass = false;
    }

    // HEURISTIC: 10^8 rule phrased absolutely
    if (/(10\^8 operations always equals one second|always 10\^8)/i.test(allText)) {
      report.technicalIssues.push({ issue: 'Absolute claim about 10^8 rule. Must be framed as heuristic.', topic: topic.title, severity: 'MEDIUM' });
      topicPass = false;
    }

    // HEURISTIC: unordered_map strict O(1)
    if (/unordered_map/i.test(allText) && /O\(1\)/i.test(allText) && !/worst/i.test(allText) && !/collision/i.test(allText) && !/average/i.test(allText)) {
       report.technicalIssues.push({ issue: 'unordered_map claims O(1) without mentioning collisions/worst-case.', topic: topic.title, severity: 'MEDIUM' });
       topicPass = false;
    }

    // HEURISTIC: Binary Search mid calculation
    if (/binary search/i.test(allText) && /\(low \+ high\) \/ 2/i.test(allText)) {
        report.technicalIssues.push({ issue: 'Binary Search uses unsafe (low+high)/2 calculation.', topic: topic.title, severity: 'CRITICAL' });
        topicPass = false;
    }
    
    // HEURISTIC: Status checks
    const contents = [...(topic.learningContents || []), ...(topic.notes || []), ...(topic.shortNotes || []), ...(topic.cheatSheets || [])];
    for (const item of contents) {
        if (item.status !== 'PUBLISHED') {
            report.technicalIssues.push({ issue: 'Content not published: ' + item.title, topic: topic.title, severity: 'HIGH' });
            topicPass = false;
        }
    }

    // RESOURCE AUDIT
    if (topic.resources) {
        for (const res of topic.resources) {
            if (res.status !== 'PUBLISHED') {
                report.resourceIssues.push({ type: 'Status', details: 'Resource not published: ' + res.title, topic: topic.title });
            }
            if (!res.url.startsWith('http')) {
                report.resourceIssues.push({ type: 'URL', details: 'Invalid URL: ' + res.url, topic: topic.title });
            }
        }
    }

    if (topicPass && missing.length === 0) {
      report.overview.pass++;
    } else if (!topicPass && missing.length === 0) {
      report.overview.requireFixes++;
    }
  }
  
  // Output the raw report data for processing
  fs.writeFileSync('./audit_report_raw.json', JSON.stringify(report, null, 2));
  console.log('Audit complete. Wrote to audit_report_raw.json');
}

main()
  .catch((e) => {
    console.error('Audit script error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
