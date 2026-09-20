import { TopicContent } from './types';

export const topic26: TopicContent = {
  title: 'queue',
  learningContent: `
# What is std::queue?
A \`queue\` is a data structure that follows the **FIFO (First In, First Out)** principle.
Imagine a line of people waiting at a cashier: the first person to get in line is the first person to be served and leave the line.

## 1. Container Adaptor
Exactly like \`std::stack\`, \`std::queue\` is a **Container Adaptor**. 
Under the hood, it wraps a \`std::deque\` (by default). It restricts the interface so you can only add to the back and remove from the front.

## 2. Core Operations (All $O(1)$)
\`\`\`cpp
#include <queue>
using namespace std;

queue<int> q;

q.push(10); // [10]
q.push(20); // [10, 20]
q.push(30); // [10, 20, 30]

cout << q.front();  // 10 (Looks at the first element)
cout << q.back();   // 30 (Looks at the last element)
cout << q.size();   // 3

q.pop();            // Removes 10 from the front. (Returns void)
cout << q.front();  // 20
\`\`\`

## 3. The \`pop()\` Trap
Just like \`std::stack\`, \`queue::pop()\` does NOT return the element. It returns \`void\`. 
To process and remove the front element safely, the standard idiom is:
\`\`\`cpp
while (!q.empty()) {
    int current = q.front(); // 1. Read it
    q.pop();                 // 2. Remove it
    
    // Process current...
}
\`\`\`

## DSA CONNECTION
Queues are the absolute backbone of a specific category of algorithms:
*   **BFS (Breadth-First Search):** When exploring a graph or a grid, a queue ensures you explore all nodes at distance $K$ before exploring nodes at distance $K+1$.
*   **Level Order Traversal:** Printing a binary tree level by level.
*   **Scheduling / Buffering:** Producer-consumer algorithms where tasks must be processed in the exact order they arrived.
`,
  fullNotes: `
# std::queue Reference

## 1. Underlying Container restrictions
Unlike \`std::stack\` (which can use a \`vector\`), a \`std::queue\` CANNOT use a \`std::vector\` as its underlying container. 
Why? Because \`std::queue\` requires $O(1)$ removal from the front (\`pop_front\`). Vectors do not support $O(1)$ front removal. You can only back a queue with a \`std::deque\` (the default) or a \`std::list\`.

## 2. Front vs Top
*   In a \`std::stack\`, you look at the element using \`.top()\`.
*   In a \`std::queue\`, you look at the element using \`.front()\`.
Do not confuse these during interviews!

## 3. Emplace
\`q.emplace(args...)\` constructs the object in-place at the back of the queue, exactly like \`push()\`, but potentially faster for complex objects since it avoids a copy/move operation.

## 4. Interview Relevance
*   **Q:** How would you implement a Queue using only Stacks?
    *   **A:** This is a classic interview question. You need two stacks (e.g., \`in_stack\` and \`out_stack\`). You \`push\` all new elements onto \`in_stack\`. When a \`pop\` or \`front\` is requested, if \`out_stack\` is empty, you pop everything from \`in_stack\` and push it onto \`out_stack\` (reversing the order). Then you pop/read from \`out_stack\`. Amortized time is $O(1)$ per operation.
`,
  shortNotes: `
*   **FIFO:** First In, First Out.
*   **Adaptor:** Wraps a \`deque\` or \`list\`. Cannot wrap a \`vector\`.
*   **No Iteration:** You cannot loop through a queue.
*   **$O(1)$ Operations:** \`push()\` (adds to back), \`pop()\` (removes from front), \`front()\`, \`back()\`.
*   **\`pop()\` Trap:** Returns \`void\`. Call \`front()\` first!
*   **DSA Uses:** Breadth-First Search (BFS), Level-order traversal.
`,
  cheatSheet: `
| Operation | Code | Complexity | Note |
|---|---|---|---|
| Add | \`q.push(x)\` | $O(1)$ | Pushes to back |
| View First| \`q.front()\` | $O(1)$ | Crashes if empty |
| Remove | \`q.pop()\` | $O(1)$ | Removes from front |
| Is Empty? | \`q.empty()\` | $O(1)$ | |
| Size | \`q.size()\` | $O(1)$ | |
`,
  resources: [
    {
      title: 'cppreference: std::queue',
      url: 'https://en.cppreference.com/w/cpp/container/queue',
      type: 'ARTICLE',
      priority: 'S',
      description: 'API reference for the queue adaptor.'
    }
  ]
};
