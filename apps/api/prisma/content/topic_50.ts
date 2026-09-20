import { TopicContent } from './types';

export const topic50: TopicContent = {
  title: 'Queue Fundamentals',
  learningContent: `
# The Queue Abstraction
A **Queue** is an abstract data structure that follows the **FIFO (First In, First Out)** principle.
Imagine a line of people waiting for a cashier. The first person to join the line is the first person to be served. 

*(Note: Topic 26 covered the syntax of \`std::queue\`. This topic covers the algorithmic theory and DSA applications).*

## 1. Core Operations
Any standard queue must support these operations in **$O(1)$ time**:
*   **Enqueue (Push):** Add an element to the *rear* (back) of the queue.
*   **Dequeue (Pop):** Remove an element from the *front* of the queue.
*   **Front (Peek):** Look at the element at the front without removing it.

## 2. Implementation Concepts
Unlike a Stack, implementing a Queue using a simple array is tricky.
*   **Linked List implementation:** Excellent for queues. You maintain a \`head\` pointer (Front) and a \`tail\` pointer (Rear). You Enqueue at the \`tail\`, and Dequeue at the \`head\`. Both are $O(1)$.
*   **Array implementation (The problem):** If you Enqueue at the end of the array, it's $O(1)$. But to Dequeue from the front (index 0), you have to shift all remaining elements left, taking **$O(N)$** time!

**The Solution: The Circular Queue**
To build an $O(1)$ Queue using an Array, you use two integer pointers: \`front_index\` and \`rear_index\`. 
Instead of shifting elements when you Dequeue, you simply move the \`front_index\` forward. When the \`rear_index\` reaches the end of the array, it "wraps around" back to index 0 using the modulo operator (\`%\`). This perfectly simulates an infinite queue using a fixed-size array in $O(1)$ time.

## 3. RECOGNITION: When to use a Queue
You should immediately think of a Queue when:
*   The problem requires **Breadth-First Search (BFS)** on a tree or graph. (Exploring level by level).
*   You need to process tasks in the exact order they arrived (Scheduling).
*   You are dealing with Producer/Consumer buffering problems.
`,
  fullNotes: `
# Queue Abstraction Reference

## 1. Breadth-First Search (BFS)
The absolute most important DSA application of a Queue is BFS.
If you want to find the shortest path out of a maze, a Stack (DFS) will just pick a random direction and run until it hits a dead end. 
A Queue (BFS) will explore 1 step in *every* direction. Then 2 steps in *every* direction. By using a Queue to hold the next locations to explore, BFS guarantees that the first time you reach the exit, you have found the absolute shortest path.

## 2. Deque (Double-Ended Queue)
A standard Queue only allows inserting at the back and removing from the front.
A **Deque** (pronounced "deck") allows $O(1)$ insertions and deletions at **both** the front and the back.
*   **Application:** Deques are the cornerstone of advanced Sliding Window problems (like finding the Maximum in a Sliding Window in $O(N)$ time using a Monotonic Deque). 

## 3. Priority Queue vs Queue
Do not confuse them. 
*   A standard Queue strictly obeys the time elements arrived (FIFO). 
*   A Priority Queue (which is actually a Heap, not a Queue) completely ignores arrival time and serves elements based on their "value" or "priority" (e.g., largest numbers first).

## 4. Interview Relevance
*   **Q:** How do you implement a Queue using two Stacks?
    *   **A:** You maintain an \`in_stack\` and an \`out_stack\`. 
        To Enqueue, push to \`in_stack\`. 
        To Dequeue, check if \`out_stack\` is empty. If it is, pop EVERY element from \`in_stack\` and push it into \`out_stack\` (this reverses their order!). Then pop from \`out_stack\`. This achieves Amortized $O(1)$ time per operation.
*   **Q:** Why is \`std::queue\` in C++ backed by a \`std::deque\` instead of a \`std::vector\`?
    *   **A:** Because a \`std::vector\` does not support $O(1)$ deletion from the front. A \`deque\` is chunked, allowing $O(1)$ removal from the front, making it the perfect underlying container for a queue adaptor.
`,
  shortNotes: `
*   **Concept:** FIFO (First In, First Out). The first element added is the first one removed.
*   **Operations:** \`Enqueue\` (add to rear), \`Dequeue\` (remove from front), \`Front\` (view first). All $O(1)$ time.
*   **Implementation:** Linked List with Head/Tail pointers, or a Circular Array.
*   **Primary Use:** Breadth-First Search (BFS) on trees and graphs. Guaranteeing shortest paths in unweighted grids. Scheduling tasks.
*   **Deque:** Double-Ended Queue. Allows $O(1)$ push/pop at BOTH ends. Used heavily in advanced Sliding Window tracking.
*   **Trap:** Do not confuse with Priority Queue (which is a Heap and sorts elements).
`,
  cheatSheet: `
| Operation | Alternate Name | Complexity |
|---|---|---|
| Add to Rear | Enqueue, Push | $O(1)$ |
| Remove Front| Dequeue, Pop | $O(1)$ |
| View Front | Peek, Front | $O(1)$ |

**Recognition Clues:**
*   "Breadth-First Search"
*   "Shortest Path in unweighted grid"
*   "Level-order traversal"
*   "Process in exact order of arrival"
`,
  resources: [
    {
      title: 'GeeksForGeeks: Queue Data Structure',
      url: 'https://www.geeksforgeeks.org/queue-data-structure/',
      type: 'ARTICLE',
      priority: 'A',
      description: 'Comprehensive overview of Queue theory and applications.'
    }
  ]
};
