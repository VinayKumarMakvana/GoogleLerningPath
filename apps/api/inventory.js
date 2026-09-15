const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'prisma', 'dev.db');
const db = new Database(dbPath, { readonly: true });

function countTable(tableName) {
  try {
    const row = db.prepare(`SELECT count(*) as count FROM ${tableName}`).get();
    return row.count;
  } catch (e) {
    return 0; // Table might not exist or other error
  }
}

console.log('--- SQLITE INVENTORY ---');
console.log('Tracks:', countTable('Track'));
console.log('Roadmaps:', countTable('Roadmap'));
console.log('Phases:', countTable('Phase'));
console.log('Modules:', countTable('Module'));
console.log('Skills:', countTable('Skill'));
console.log('Topics:', countTable('Topic'));
console.log('Subtopics:', countTable('Subtopic'));
console.log('Prerequisite Links:', countTable('_TopicPrerequisites'));

db.close();
