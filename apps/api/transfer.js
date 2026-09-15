const { PrismaClient } = require('@prisma/client');
const Database = require('better-sqlite3');
const path = require('path');
const crypto = require('crypto');

const prisma = new PrismaClient();

// Helper to convert UUID to deterministic 24-char hex string (ObjectId)
function uuidToObjectId(uuid) {
  if (!uuid) return null;
  const hash = crypto.createHash('md5').update(uuid).digest('hex');
  return hash.substring(0, 24);
}

const idMap = new Map();
function mapId(oldId) {
  if (!oldId) return null;
  if (!idMap.has(oldId)) {
    idMap.set(oldId, uuidToObjectId(oldId));
  }
  return idMap.get(oldId);
}

async function transfer() {
  console.log('--- STARTING MIGRATION: SQLITE TO MONGODB ---');
  
  // 1. Safety Check: Is MongoDB empty?
  const existingTracks = await prisma.track.count();
  if (existingTracks > 0) {
    console.error('ERROR: MongoDB already contains data (Tracks > 0). Aborting to prevent overwrite.');
    process.exit(1);
  }

  // 2. Connect to SQLite
  const dbPath = path.join(__dirname, 'prisma', 'dev.db.bak');
  let sqliteDb;
  try {
    sqliteDb = new Database(dbPath, { readonly: true });
    console.log(`Connected to SQLite backup at ${dbPath}`);
  } catch (err) {
    console.error(`ERROR: Could not open SQLite backup database: ${err.message}`);
    process.exit(1);
  }

  // 3. Extract Data
  console.log('\nExtracting data from SQLite...');
  const tracks = sqliteDb.prepare('SELECT * FROM Track').all();
  const roadmaps = sqliteDb.prepare('SELECT * FROM Roadmap').all();
  const phases = sqliteDb.prepare('SELECT * FROM Phase').all();
  const modules = sqliteDb.prepare('SELECT * FROM Module').all();
  const skills = sqliteDb.prepare('SELECT * FROM Skill').all();
  const topics = sqliteDb.prepare('SELECT * FROM Topic').all();
  let prerequisites = [];
  try {
    prerequisites = sqliteDb.prepare('SELECT * FROM _TopicPrerequisites').all();
  } catch (e) {
    // Table might not exist if no prerequisites were actually seeded, but we know it does
  }

  console.log(`Tracks: ${tracks.length}`);
  console.log(`Roadmaps: ${roadmaps.length}`);
  console.log(`Phases: ${phases.length}`);
  console.log(`Modules: ${modules.length}`);
  console.log(`Skills: ${skills.length}`);
  console.log(`Topics: ${topics.length}`);
  console.log(`Prerequisites: ${prerequisites.length}`);

  // 4. Transform & Load Data
  console.log('\nTransferring data to MongoDB...');

  // Track
  for (const row of tracks) {
    await prisma.track.create({
      data: {
        id: mapId(row.id),
        title: row.title,
        description: row.description,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt)
      }
    });
  }

  // Roadmap
  for (const row of roadmaps) {
    await prisma.roadmap.create({
      data: {
        id: mapId(row.id),
        title: row.title,
        description: row.description,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt)
      }
    });
  }

  // Phase
  for (const row of phases) {
    await prisma.phase.create({
      data: {
        id: mapId(row.id),
        roadmapId: mapId(row.roadmapId),
        title: row.title,
        order: row.order,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt)
      }
    });
  }

  // Module
  for (const row of modules) {
    await prisma.module.create({
      data: {
        id: mapId(row.id),
        phaseId: mapId(row.phaseId),
        title: row.title,
        order: row.order,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt)
      }
    });
  }

  // Skill
  for (const row of skills) {
    await prisma.skill.create({
      data: {
        id: mapId(row.id),
        moduleId: mapId(row.moduleId),
        title: row.title,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt)
      }
    });
  }

  // Map prerequisites for Topic
  const prereqMap = new Map(); // topicId -> [prerequisiteIds]
  for (const link of prerequisites) {
    const A = link.A; // The prerequisite topic
    const B = link.B; // The topic that requires A
    if (!prereqMap.has(B)) prereqMap.set(B, []);
    prereqMap.get(B).push(mapId(A));
  }

  // Topic
  for (const row of topics) {
    const pIds = prereqMap.get(row.id) || [];
    
    await prisma.topic.create({
      data: {
        id: mapId(row.id),
        skillId: mapId(row.skillId),
        trackId: mapId(row.trackId),
        title: row.title,
        description: row.description,
        order: row.order,
        difficulty: row.difficulty,
        priority: row.priority,
        estimatedLearnTime: row.estimatedLearnTime,
        estimatedPracticeTime: row.estimatedPracticeTime,
        interviewRelevance: row.interviewRelevance === 1,
        projectRelevance: row.projectRelevance === 1,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt),
        prerequisiteIds: pIds
      }
    });
  }

  console.log('\n--- MIGRATION COMPLETE ---');
  sqliteDb.close();

  // Verify MongoDB Counts
  console.log('\n--- MONGODB VERIFICATION ---');
  console.log('Tracks:', await prisma.track.count());
  console.log('Roadmaps:', await prisma.roadmap.count());
  console.log('Phases:', await prisma.phase.count());
  console.log('Modules:', await prisma.module.count());
  console.log('Skills:', await prisma.skill.count());
  console.log('Topics:', await prisma.topic.count());
}

transfer()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
