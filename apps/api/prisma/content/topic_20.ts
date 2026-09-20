import { TopicContent } from './types';

export const topic20: TopicContent = {
  title: 'vector',
  learningContent: `
# What is std::vector?
\`std::vector\` is a dynamic array. It is the most important and most frequently used container in modern C++ and Data Structures & Algorithms.
Unlike a raw C-style array (\`int arr[10]\`), a vector can grow or shrink in size automatically. It manages its own memory on the heap but provides contiguous memory access just like a raw array.

## 1. Declaration and Initialization
\`\`\`cpp
#include <vector>
using namespace std;

vector<int> v1;                 // Empty vector of ints
vector<int> v2 = {1, 2, 3};     // Initialized with 3 elements
vector<int> v3(5, 10);          // 5 elements, all initialized to 10: [10, 10, 10, 10, 10]
vector<int> v4(10);             // 10 elements, all initialized to 0
\`\`\`

## 2. Capacity vs Size (CRITICAL CONCEPT)
This is the most common interview question regarding vectors.
*   **Size (\`v.size()\`)**: The actual number of elements currently in the vector.
*   **Capacity (\`v.capacity()\`)**: The amount of memory the vector has currently allocated on the heap.

When you push an element into a vector that is already full (\`size == capacity\`), the vector must:
1. Allocate a completely new, larger block of memory (usually double the current capacity).
2. Copy/move all existing elements into the new block.
3. Delete the old block.
This reallocation is expensive ($O(N)$), but because it doubles the size, it happens rarely. Therefore, pushing to the back of a vector is considered **Amortized $O(1)$**.

### Avoiding Reallocation: \`reserve()\`
If you know you will add 10,000 elements, tell the vector in advance to avoid multiple slow reallocations!
\`\`\`cpp
vector<int> v;
v.reserve(10000); // Sets capacity to 10000. Size is still 0.
// Now 10,000 push_backs will happen instantly with zero reallocations.
\`\`\`

## 3. Common Operations
\`\`\`cpp
vector<int> v = {10, 20, 30};

// Adding and Removing from the BACK is fast (Amortized O(1))
v.push_back(40); // [10, 20, 30, 40]
v.pop_back();    // [10, 20, 30]

// Accessing is instant (O(1))
cout << v[0];    // 10 (Fast, no bounds checking)
cout << v.at(0); // 10 (Slightly slower, throws exception if out of bounds)
cout << v.front(); // 10
cout << v.back();  // 30

// Clearing
v.clear();       // Size becomes 0. Capacity remains unchanged!
\`\`\`

## 4. Why is Vector the Default Container?
Unless you have a very specific reason to use something else, **use a vector**. 
Because it uses contiguous memory, it is incredibly friendly to the CPU cache. Iterating through a vector is vastly faster than iterating through a Linked List or a Set, even if those other structures claim to have the same Big-O time complexity.

## DSA CONNECTION
*   **Adjacency List (Graphs):** \`vector<vector<int>> adj\` is the standard way to represent graphs.
*   **Dynamic Arrays:** Any problem requiring you to store an unknown amount of inputs.
*   **Two Pointers / Sliding Window:** You use vectors as the underlying data structure for these algorithms.
*   **Prefix Sums:** Creating a secondary \`vector<int> prefix\` to store running totals.
`,
  fullNotes: `
# std::vector Reference

## 1. Internal Workings
A \`vector\` is typically implemented under the hood as a class containing three pointers:
1. Pointer to the beginning of the allocated array.
2. Pointer to the current end of the active elements (\`size\`).
3. Pointer to the end of the allocated storage (\`capacity\`).

## 2. Iterator Invalidation
*Warning:* When a vector reallocates its memory (because \`size\` exceeded \`capacity\`), the entire array is moved to a new memory address. **ALL existing pointers and iterators to the vector's elements instantly become invalid (dangling).**
\`\`\`cpp
vector<int> v = {1, 2};
int* ptr = &v[0];
v.push_back(3); // Might trigger reallocation!
cout << *ptr; // DANGER: ptr might now point to deleted memory.
\`\`\`

## 3. \`push_back()\` vs \`emplace_back()\`
*   \`push_back(obj)\`: Takes an already constructed object and copies/moves it into the vector.
*   \`emplace_back(args...)\`: Forwards the arguments directly to the constructor of the object *inside* the vector's memory. This avoids creating a temporary object and moving it, making it slightly more efficient for complex objects. For primitive types like \`int\`, they are identical.

## 4. Insertion/Deletion in the Middle
Vectors are terrible at inserting or removing elements anywhere except the very end.
\`\`\`cpp
v.insert(v.begin(), 99); // Inserts at the front
\`\`\`
This takes **$O(N)$** time because every single existing element must be shifted one position to the right to make room.

## 5. Interview Relevance
*   **Q:** What is the time complexity of \`push_back\`?
    *   **A:** Amortized $O(1)$. Most calls are $O(1)$, but occasionally it hits capacity, requiring an $O(N)$ reallocation. Over many insertions, the average cost per insertion remains $O(1)$.
*   **Q:** How do you completely free a vector's memory?
    *   **A:** \`v.clear()\` changes the size to 0 but keeps the capacity (and memory). To actually shrink the capacity to 0, use \`v.shrink_to_fit()\` or the swap trick: \`vector<int>().swap(v);\`.
`,
  shortNotes: `
*   **Vector:** Dynamic array. Contiguous memory. Fast CPU cache performance.
*   **Size:** Current number of elements.
*   **Capacity:** Allocated memory limit. Reallocates (doubles) when \`size == capacity\`.
*   **\`reserve(N)\`:** Pre-allocates memory for N elements. Use it to avoid slow reallocations.
*   **$O(1)$ Operations:** Access (\`v[i]\`), \`push_back\`, \`pop_back\`.
*   **$O(N)$ Operations:** \`insert\` or \`erase\` anywhere except the back (requires shifting).
*   **Invalidation:** Reallocation invalidates all pointers/iterators to the vector.
`,
  cheatSheet: `
| Operation | Syntax | Complexity | Note |
|---|---|---|---|
| Read/Write | \`v[i]\` | $O(1)$ | No bounds check |
| Safe Read | \`v.at(i)\` | $O(1)$ | Throws if invalid |
| Add End | \`v.push_back(x)\`| Amortized $O(1)$ | May reallocate |
| Remove End | \`v.pop_back()\` | $O(1)$ | |
| Add Middle | \`v.insert(iter, x)\`| $O(N)$ | Shifts elements |
| Preallocate| \`v.reserve(100)\`| $O(N)$ once | Prevents reallocs |
| Empty vector| \`v.clear()\` | $O(N)$ | Keeps capacity |
`,
  resources: [
    {
      title: 'cppreference: std::vector',
      url: 'https://en.cppreference.com/w/cpp/container/vector',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Official API reference.'
    },
    {
      title: 'LearnCpp: std::vector',
      url: 'https://www.learncpp.com/cpp-tutorial/an-introduction-to-stdvector/',
      type: 'ARTICLE',
      priority: 'A',
      description: 'Excellent beginner breakdown of vectors.'
    }
  ]
};
