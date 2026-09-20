export const be_07_mongo = {
  MONGO_FUNDAMENTALS: {
    title: 'MongoDB Backend Integration',
    description: 'Learn how to model data and connect to MongoDB using Mongoose in Node.js.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 120,
    prerequisites: ['REST API Principles'],
    learningContent: `
# MongoDB Backend Integration

MongoDB is a NoSQL document database. Data is stored in flexible, JSON-like documents (BSON).

## When to use MongoDB
- High write loads.
- Unstructured or frequently changing data schemas.
- Rapid prototyping.
- When relations (joins) are not the primary way data is accessed.

## Mongoose ODM
While you can use the native MongoDB driver, most Node.js applications use Mongoose. Mongoose provides a straight-forward, schema-based solution to model your application data, bringing structure to the otherwise schema-less MongoDB.
`,
    fullNotes: `
# Detailed Notes: MongoDB & Mongoose

- **Schema & Model:** In Mongoose, you define a Schema, which maps to a MongoDB collection and defines the shape of the documents within that collection. A Model is a compiled version of the Schema used to interact with the database.
- **ObjectIds:** MongoDB automatically generates a unique \`_id\` (ObjectId) for every document. It encodes a timestamp, machine identifier, process id, and counter.
- **Populate:** MongoDB does not have SQL-like JOINs. Mongoose provides \`.populate()\`, which performs a second query behind the scenes to fetch related documents.
- **Indexes:** Crucial for performance. MongoDB automatically indexes \`_id\`, but you should add indexes to fields you frequently query against (e.g., \`email\`).
`,
    shortNotes: `
- NoSQL Document Store (BSON).
- Flexible schema, great for rapid iteration.
- Mongoose is an ODM (Object Data Modeling) library for MongoDB.
- Use \`.populate()\` to simulate SQL JOINs.
- Don't forget to define indexes for queried fields.
`,
    cheatSheet: `
\`\`\`javascript
const mongoose = require('mongoose');

// Define Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  age: Number
}, { timestamps: true });

// Compile Model
const User = mongoose.model('User', userSchema);

// Query
const users = await User.find({ age: { $gt: 18 } }).sort({ createdAt: -1 });
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the difference between an RDBMS (like Postgres) and a Document Database (like MongoDB)?', answerHint: 'RDBMS stores data in tables with strict schemas and uses JOINs for relations. MongoDB stores flexible JSON-like documents, scales horizontally easier, but lacks complex ACID transactions and JOIN performance natively.', type: 'CONCEPTUAL' },
      { question: 'How does Mongoose .populate() work under the hood?', answerHint: 'It does not perform a database JOIN. Instead, it extracts the ObjectIds from the parent document and performs an additional `$in` query to the referenced collection to fetch the related documents.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Mongoose Documentation', url: 'https://mongoosejs.com/docs/guide.html', type: 'ARTICLE', priority: 'S', source: 'Mongoose', isOfficial: true },
      { title: 'MongoDB Crash Course', url: 'https://www.youtube.com/watch?v=ofme2o29ngU', type: 'VIDEO', priority: 'A', source: 'Traversy Media', isOfficial: false }
    ]
  }
};
