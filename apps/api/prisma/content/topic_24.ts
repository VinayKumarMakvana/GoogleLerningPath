import { TopicContent } from './types';

export const topic24: TopicContent = {
  title: 'list',
  learningContent: `
# What is std::list?
\`std::list\` is a **Doubly Linked List**.
Unlike vectors and deques, a list does not store its elements in contiguous memory. Instead, each element (node) is allocated dynamically on the heap and contains three things:
1. The data value.
2. A pointer to the previous node.
3. A pointer to the next node.

## 1. No Random Access!
Because the memory is scattered, **you cannot use the \`[]\` operator**. You cannot jump instantly to the 5th element (\`myList[5]\` is a compile error). To reach the 5th element, you must start at the beginning and follow the pointers 5 times. This takes **$O(N)$ time**.

## 2. Fast Insertions and Deletions
The main superpower of a linked list is that inserting or removing an element *in the middle* of the list takes **$O(1)$ time**... *assuming you already have an iterator pointing to that exact location!*
Unlike a vector, which has to shift all subsequent elements over, a list just updates a couple of pointers.

\`\`\`cpp
#include <list>
using namespace std;

list<int> l = {10, 20, 30};

// O(1) front and back
l.push_front(5);  // [5, 10, 20, 30]
l.push_back(40);  // [5, 10, 20, 30, 40]

// O(1) insertion if we have an iterator
auto it = l.begin();
advance(it, 2); // Move iterator to '20' (Takes O(N) time to find it though!)
l.insert(it, 15); // [5, 10, 15, 20, 30, 40] (Insertion itself is O(1))
\`\`\`

## 3. Why is \`list\` rarely used in DSA?
You might think: *"If inserting is $O(1)$, I should use lists everywhere!"* 
**Wrong.**
1.  **Cache misses:** Because nodes are scattered randomly in memory, iterating through a list causes massive CPU cache misses. A vector is often 10x–100x faster for iterating, even if the Big-O complexity is technically the same.
2.  **Search time:** To insert in the middle, you first have to *find* the middle, which takes $O(N)$ time. This ruins the $O(1)$ insertion benefit.
3.  **Memory overhead:** Every \`int\` (4 bytes) requires two additional pointers (16 bytes on a 64-bit system), massively inflating memory usage.

## DSA CONNECTION
*   **LRU Cache (Least Recently Used):** This is the one famous DSA problem where \`std::list\` is mandatory. You pair a \`list\` (to track the most/least recently used items with $O(1)$ moves) with an \`unordered_map\` (to hold iterators to the list nodes for average $O(1)$ random access).
*   In 99% of other scenarios, if you think you need a Linked List, a \`vector\` or \`deque\` is usually better in modern C++, unless a specific interview question asks you to implement a raw Linked List from scratch using pointers.
`,
  fullNotes: `
# std::list Reference

## 1. Iterator Invalidation
One massive advantage of \`std::list\` over \`std::vector\`: **Iterators, pointers, and references are NEVER invalidated by insertions or deletions** (unless you delete the exact element the iterator is pointing to).
Because nodes never move in memory, their addresses are permanently stable.

## 2. std::forward_list
C++ also provides \`std::forward_list\`. This is a **Singly Linked List**. It only has a "next" pointer, saving memory. It can only be iterated forwards. You will almost never use this unless operating under extreme memory constraints.

## 3. Specialized List Methods
Because standard algorithms like \`std::sort\` require random access, you cannot use them on a list. Instead, \`list\` provides its own built-in methods:
*   \`l.sort();\` (Uses a specialized mergesort)
*   \`l.reverse();\`
*   \`l.unique();\`
*   \`l.remove(val);\`

## 4. Interview Relevance
*   **Q:** In what scenario is a \`std::list\` faster than a \`std::vector\`?
    *   **A:** When you need to do heavy insertions and deletions in the middle of a massive sequence, AND you already possess iterators to the target locations (e.g., maintaining an LRU Cache with a hash map of iterators).
*   **Q:** Why is iterating through a \`std::vector\` much faster than iterating through a \`std::list\` in the real world?
    *   **A:** Cache locality. A vector's contiguous memory is prefetched by the CPU cache, meaning access is nearly instantaneous. A list's scattered heap nodes require individual, slow fetches from main RAM.
`,
  shortNotes: `
*   **std::list:** Doubly Linked List.
*   **No Random Access:** \`l[5]\` is illegal. Finding an element takes $O(N)$ time.
*   **$O(1)$ Insert/Erase:** If you already have an iterator pointing to the location, inserting or deleting is $O(1)$.
*   **Never Invalidates:** Insertions/deletions do not invalidate pointers to other elements.
*   **Slow Iteration:** Terrible CPU cache performance compared to vectors.
*   **LRU Cache:** The most famous algorithm requiring \`std::list\` paired with a hash map.
`,
  cheatSheet: `
| Operation | Code | Complexity |
|---|---|---|
| Front/Back | \`push_front()\`, \`push_back()\` | $O(1)$ |
| Insert at Iter | \`l.insert(it, val)\` | $O(1)$ |
| Erase at Iter | \`l.erase(it)\` | $O(1)$ |
| Find index | \`advance(it, 5)\` | $O(N)$ |
| Sorting | \`l.sort()\` | $O(N \\log N)$ |
`,
  resources: [
    {
      title: 'cppreference: std::list',
      url: 'https://en.cppreference.com/w/cpp/container/list',
      type: 'ARTICLE',
      priority: 'S',
      description: 'API reference for Doubly Linked List.'
    }
  ]
};
