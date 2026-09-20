import { TopicContent } from './types';

export const topic23: TopicContent = {
  title: 'deque',
  learningContent: `
# What is std::deque?
\`std::deque\` (pronounced "deck") stands for **Double-Ended Queue**. 
It is a sequence container that behaves almost exactly like a \`vector\`, but with one massive advantage: **it allows fast $O(1)$ insertion and deletion at BOTH the front and the back.**

## 1. The Vector Weakness
If you have a \`vector\` and you want to insert an element at the very front, you have to use \`v.insert(v.begin(), 10)\`. This takes **$O(N)$ time** because every single existing element must shift one position to the right. 

## 2. Deque to the Rescue
A deque provides \`push_front\` and \`pop_front\` operations that run in $O(1)$ time!
\`\`\`cpp
#include <deque>
using namespace std;

deque<int> dq;
dq.push_back(10);   // [10]
dq.push_front(20);  // [20, 10]
dq.push_back(30);   // [20, 10, 30]

cout << dq.front(); // 20
cout << dq.back();  // 30
cout << dq[1];      // 10 (Random access is still O(1)!)

dq.pop_front();     // [10, 30]
\`\`\`

## 3. How does it work? (Conceptual)
Unlike a vector, which is one massive contiguous block of memory, a deque is internally implemented as a collection of smaller, separate memory blocks (chunks), with a central "map" keeping track of where the chunks are. 
*   When you \`push_front\`, it just allocates a new chunk if needed and updates the map. No shifting required!
*   Because memory isn't perfectly contiguous in one block, iterating through a deque is slightly slower than a vector (due to CPU cache misses), but the Big-O complexity remains the same.

## 4. Vector vs Deque
*   Need to add/remove at the back only? **Use \`vector\`** (faster overall).
*   Need to add/remove at BOTH the front and back? **Use \`deque\`**.
*   Need to insert in the middle? Both are terrible ($O(N)$).

## DSA CONNECTION
*   **Sliding Window Maximum:** The absolute classic use-case for a deque. You maintain a monotonic structure where you push/pop from both ends to track the maximum value in a moving window in $O(N)$ time.
*   **BFS (Breadth-First Search):** While \`std::queue\` is typically used for BFS, \`std::queue\` is actually just a wrapper around \`std::deque\` under the hood!
*   **0-1 BFS:** A shortest-path algorithm where edges have weight 0 or 1. You use a deque, pushing 0-weight edges to the front and 1-weight edges to the back.
`,
  fullNotes: `
# std::deque Reference

## 1. Complexity Comparison
| Operation | \`std::vector\` | \`std::deque\` |
|---|---|---|
| Random Access (\`dq[i]\`) | $O(1)$ | $O(1)$ (Slightly larger constant factor) |
| \`push_back\` / \`pop_back\` | Amortized $O(1)$ | Amortized $O(1)$ |
| \`push_front\` / \`pop_front\`| **$O(N)$ (Terrible)** | **$O(1)$ (Excellent)** |
| Insert middle | $O(N)$ | $O(N)$ |

## 2. Iterator Invalidation
*   Inserting at the front or back of a deque **invalidates all iterators**, but **pointers and references to existing elements remain valid!** (Because the existing memory chunks are never reallocated/moved, unlike a vector).
*   Inserting/deleting in the middle invalidates everything.

## 3. Why not always use Deque?
Since deque does everything vector does, plus fast front operations, why not use it 100% of the time?
1.  **Memory Overhead:** Deque uses more memory to maintain its chunk-map system.
2.  **Cache Locality:** Vectors are 100% contiguous, making them the absolute fastest structure for standard iteration due to hardware CPU pre-fetching. Deques are chunked, resulting in occasional cache misses.
*Rule of thumb: Default to vector. Switch to deque only if you absolutely need $O(1)$ front insertions.*

## 4. Interview Relevance
*   **Q:** How does a \`std::deque\` achieve $O(1)$ insertion at both ends while maintaining $O(1)$ random access?
    *   **A:** It is implemented as a chunked array (an array of pointers to fixed-size arrays). Random access is $O(1)$ because the index can be mathematically divided to instantly find the correct chunk and the correct offset within that chunk. Front insertion is $O(1)$ because it simply allocates a new chunk and updates the map of pointers, without moving existing elements.
`,
  shortNotes: `
*   **Double-Ended Queue:** Acts like a vector, but fast at BOTH ends.
*   **$O(1)$ Operations:** \`push_back\`, \`pop_back\`, \`push_front\`, \`pop_front\`, and index access \`dq[i]\`.
*   **Internal structure:** Array of arrays (chunks). Not 100% contiguous like a vector, but close enough for $O(1)$ access.
*   **Usage:** Only use over \`vector\` when you explicitly need to add or remove elements from the front.
*   **DSA classic:** Monotonic deques for the "Sliding Window Maximum" problem.
`,
  cheatSheet: `
| Operation | Syntax | Complexity |
|---|---|---|
| Add Front | \`dq.push_front(x)\` | $O(1)$ |
| Remove Front| \`dq.pop_front()\` | $O(1)$ |
| Add Back | \`dq.push_back(x)\` | $O(1)$ |
| Remove Back | \`dq.pop_back()\` | $O(1)$ |
| Access | \`dq[i]\` | $O(1)$ |
`,
  resources: [
    {
      title: 'cppreference: std::deque',
      url: 'https://en.cppreference.com/w/cpp/container/deque',
      type: 'ARTICLE',
      priority: 'S',
      description: 'API reference for deque.'
    }
  ]
};
