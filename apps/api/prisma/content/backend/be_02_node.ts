export const be_02_node = {
  NODE_RUNTIME: {
    title: 'Node.js Runtime & Event Loop',
    description: 'Understand the V8 engine, libuv, and how Node.js achieves asynchronous I/O.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 90,
    prerequisites: ['TypeScript Fundamentals'],
    learningContent: `
# Node.js Architecture

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Unlike traditional web servers (like Apache) that create a new thread for every request, Node.js operates on a single thread using non-blocking I/O calls, allowing it to support tens of thousands of concurrent connections.

## The Event Loop
The Event Loop is what allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded. It offloads operations to the system kernel whenever possible.

Phases of the Event Loop:
1. **Timers:** Executes callbacks scheduled by \`setTimeout\` and \`setInterval\`.
2. **Pending Callbacks:** Executes I/O callbacks deferred to the next loop iteration.
3. **Idle, Prepare:** Only used internally.
4. **Poll:** Retrieves new I/O events; executes I/O related callbacks.
5. **Check:** \`setImmediate\` callbacks are invoked here.
6. **Close Callbacks:** e.g., \`socket.on('close', ...)\`.
`,
    fullNotes: `
# Detailed Notes: Node.js Runtime

- **V8 Engine:** Compiles JavaScript directly to native machine code.
- **libuv:** A multi-platform support library with a focus on asynchronous I/O. It provides the Event Loop and the thread pool.
- **Thread Pool:** By default, libuv sets up a thread pool of 4 threads to handle heavy tasks like file system operations (fs), cryptography (crypto), and DNS lookups.
- **Microtask Queue:** \`process.nextTick()\` and Promise callbacks run in the microtask queue, which is evaluated immediately *after* the current operation and *before* the event loop moves to the next phase.
`,
    shortNotes: `
- Single-threaded, non-blocking I/O.
- V8 executes JS; libuv handles the event loop and thread pool.
- Never block the event loop (avoid synchronous heavy compute or sync FS operations).
- \`process.nextTick\` runs before Promises and before the next event loop phase.
`,
    cheatSheet: `
\`\`\`javascript
const fs = require('fs');

// Asynchronous (Non-blocking)
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Avoid Synchronous (Blocking) unless starting up
const data = fs.readFileSync('/file.md'); 
\`\`\`
`,
    interviewQuestions: [
      { question: 'Explain how Node.js handles concurrent requests if it is single-threaded.', answerHint: 'It uses the Event Loop and asynchronous non-blocking I/O offloaded to libuv and the OS kernel.', type: 'TECHNICAL' },
      { question: 'What is the difference between setImmediate and setTimeout(fn, 0)?', answerHint: 'setImmediate executes in the Check phase immediately after Poll. setTimeout(0) executes in the Timers phase. Their execution order depends on context (e.g. within an I/O cycle, setImmediate always runs first).', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'The Node.js Event Loop', url: 'https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick', type: 'ARTICLE', priority: 'S', source: 'Official Docs', isOfficial: true },
      { title: 'What the heck is the event loop?', url: 'https://www.youtube.com/watch?v=8aGhPhVfaqM', type: 'VIDEO', priority: 'S', source: 'YouTube', isOfficial: false }
    ]
  },
  STREAMS: {
    title: 'Streams and Buffers',
    description: 'Learn to handle large data efficiently using Streams and Buffers in Node.js.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Node.js Runtime & Event Loop'],
    learningContent: `
# Streams & Buffers

When dealing with large files or network responses, reading the entire data into memory at once is highly inefficient and can crash your application (Out Of Memory errors). 

## Buffers
A Buffer represents a fixed-size chunk of memory allocated outside of the V8 JavaScript engine. It's used to represent sequences of binary data.

## Streams
Streams allow you to read data from a source or write data to a destination in continuous chunks.
Types of streams:
- **Readable:** Read operations (e.g., \`fs.createReadStream\`).
- **Writable:** Write operations (e.g., \`fs.createWriteStream\`).
- **Duplex:** Both read and write (e.g., TCP sockets).
- **Transform:** A type of duplex stream where the output is computed based on the input (e.g., zlib compression).
`,
    fullNotes: `
# Detailed Notes: Streams & Buffers

- **Piping:** \`readableStream.pipe(writableStream)\` is the easiest way to consume streams, automatically handling backpressure.
- **Backpressure:** Occurs when data is being read faster than it can be written. \`.pipe()\` manages this automatically by pausing the readable stream until the writable stream drains.
- **Buffer vs String:** Converting buffers to strings requires an encoding (like 'utf8'). Dealing directly with Buffers is much faster for raw I/O.
`,
    shortNotes: `
- Buffers: Raw binary data memory allocation.
- Streams: Process data piece-by-piece.
- Always use \`.pipe()\` or \`stream.pipeline()\` for automatic error handling and backpressure management.
- Types: Readable, Writable, Duplex, Transform.
`,
    cheatSheet: `
\`\`\`javascript
const fs = require('fs');

const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('copy.txt');

// Pipe manages backpressure automatically
readStream.pipe(writeStream);

// Handling events manually
readStream.on('data', (chunk) => {
  console.log('Received chunk of size: ', chunk.length);
});
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is backpressure in streams and how do you handle it?', answerHint: 'Backpressure is when the write stream is slower than the read stream. Use .pipe() to handle it automatically, as it pauses and resumes the read stream based on the write stream\'s drain event.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Node.js Streams', url: 'https://nodejs.org/api/stream.html', type: 'ARTICLE', priority: 'S', source: 'Official Docs', isOfficial: true },
      { title: 'Streams in Node.js', url: 'https://www.youtube.com/watch?v=UD4GWz-i0rM', type: 'VIDEO', priority: 'A', source: 'YouTube', isOfficial: false }
    ]
  }
};
