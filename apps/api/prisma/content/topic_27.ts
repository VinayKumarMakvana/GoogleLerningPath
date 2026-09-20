import { TopicContent } from './types';

export const topic27: TopicContent = {
  title: 'priority_queue',
  learningContent: `
# What is std::priority_queue?
A \`priority_queue\` is a container adaptor that provides constant time lookup of the **largest** (by default) element. 
Under the hood, it is implemented as a **Heap** data structure (specifically, a max-heap array).

Unlike a normal queue (FIFO), a priority queue automatically organizes its elements so that the "highest priority" element is always at the \`.top()\`, regardless of the order they were pushed in.

## 1. Max Heap (Default)
By default, C++ creates a **Max Heap**. The largest element is at the top.
\`\`\`cpp
#include <queue> // Note: priority_queue is in the <queue> header!
using namespace std;

priority_queue<int> pq;

pq.push(10);
pq.push(50);
pq.push(20);

cout << pq.top(); // 50 (The largest element!)
pq.pop();         // Removes 50. (Returns void)
cout << pq.top(); // 20
\`\`\`
*   **Time Complexity:** \`push()\` and \`pop()\` take **$O(\\log N)$** time because the heap must re-balance itself. \`top()\` is **$O(1)$**.

## 2. Min Heap (The weird syntax)
If you want the **smallest** element to be at the top, you need a Min Heap. The syntax to declare a Min Heap in C++ is notoriously long and ugly:
\`\`\`cpp
priority_queue<int, vector<int>, greater<int>> min_pq;

min_pq.push(10);
min_pq.push(50);
min_pq.push(20);

cout << min_pq.top(); // 10 (The smallest element!)
\`\`\`
*(You must memorize this syntax for interviews!)*

## 3. Custom Comparators (Advanced but necessary)
If you are storing custom structs (like pairs or nodes), you must tell the priority queue how to sort them.
\`\`\`cpp
struct Point { int x, y; };

// A custom comparator struct
struct ComparePoints {
    bool operator()(const Point& a, const Point& b) {
        // Return true if 'a' should be placed LOWER in the heap than 'b'
        // This creates a MAX HEAP based on the X coordinate
        return a.x < b.x; 
    }
};

priority_queue<Point, vector<Point>, ComparePoints> custom_pq;
\`\`\`

## DSA CONNECTION
This is a **HIGH IMPORTANCE** structure for interviews.
*   **Top K Problems:** "Find the K largest/smallest elements in an array." Maintain a priority queue of size K.
*   **Dijkstra's Algorithm:** Finding the shortest path in a weighted graph relies on a Min Heap to always process the closest node next.
*   **Greedy Algorithms:** Always picking the "best" available option at every step (e.g., Huffman Coding, task scheduling).
*   **Merge K Sorted Lists:** Keep a Min Heap of the current heads of the K lists.
`,
  fullNotes: `
# std::priority_queue Reference

## 1. Underlying Implementation
*   A priority queue is just a wrapper around a \`std::vector\` (by default).
*   It uses the \`<algorithm>\` functions \`std::make_heap\`, \`std::push_heap\`, and \`std::pop_heap\` to maintain the vector as a complete binary tree mathematically structured in the array.
*   Because it uses a vector, it is incredibly cache-efficient.

## 2. Comparator Logic Trap
In C++, a priority queue's comparator logic is the **exact opposite** of the sorting logic for \`std::sort\`.
*   In \`std::sort\`, \`a < b\` means sort ascending (smallest first).
*   In \`std::priority_queue\`, \`a < b\` (which is \`std::less\`, the default) puts the **largest** element at the top (Max Heap).
*   Why? The comparator defines if \`a\` has *lower priority* than \`b\`. If \`a < b\` is true, \`a\` is pushed down the tree. Therefore, the largest elements rise to the top.

## 3. Lack of \`decrease_key\`
A major limitation of \`std::priority_queue\` is that you **cannot modify** an element once it is inside (because modifying it would break the heap structure), and there is no \`decrease_key\` or \`remove_element\` function. 
*   **Workaround for Dijkstra's:** If a node's distance updates, you simply push a *duplicate* copy of the node into the heap with the new distance. When popping, you check if the node has already been visited and ignore the stale duplicates.

## 4. Interview Relevance
*   **Q:** How do you find the median of a streaming array of numbers?
    *   **A:** Maintain two priority queues: A Max Heap for the lower half of the numbers, and a Min Heap for the upper half. Keep their sizes balanced (size difference at most 1). The median is either the top of the larger heap, or the average of the two tops if sizes are equal. Insertion is $O(\\log N)$, finding the median is $O(1)$.
`,
  shortNotes: `
*   **Concept:** A Queue where the "highest priority" element is always at the front. Implemented as a Heap.
*   **Default:** Max Heap (largest element on top).
*   **Min Heap Syntax:** \`priority_queue<int, vector<int>, greater<int>>\` (Memorize this).
*   **Complexity:** \`push()\` is $O(\\log N)$, \`pop()\` is $O(\\log N)$, \`top()\` is $O(1)$.
*   **Usage:** Dijkstra's Algorithm, Top-K elements, Greedy interval scheduling.
*   **Limitation:** You cannot iterate through it, and you cannot search for or remove a specific element inside it.
`,
  cheatSheet: `
| Operation | Code | Complexity |
|---|---|---|
| Max Heap | \`priority_queue<int> pq;\` | |
| Min Heap | \`priority_queue<int, vector<int>, greater<int>> pq;\` | |
| Add | \`pq.push(x)\` | $O(\\log N)$ |
| View Top | \`pq.top()\` | $O(1)$ |
| Remove Top| \`pq.pop()\` | $O(\\log N)$ |
`,
  resources: [
    {
      title: 'cppreference: std::priority_queue',
      url: 'https://en.cppreference.com/w/cpp/container/priority_queue',
      type: 'ARTICLE',
      priority: 'S',
      description: 'API reference for priority queue.'
    }
  ]
};
