import { TopicContent } from './types';

export const topic22: TopicContent = {
  title: 'array',
  learningContent: `
# What is std::array?
\`std::array\` (introduced in C++11) is a thin, safe wrapper around raw C-style arrays.
Like a C-style array, its size is fixed at compile-time and it allocates memory contiguously on the stack (if declared locally).
Unlike a C-style array, it doesn't spontaneously decay into a pointer, it knows its own size, and it provides an STL-compliant interface (like \`.begin()\`, \`.size()\`).

## 1. Declaration and Initialization
Because the size is fixed at compile time, you must specify the type AND the size inside the angle brackets.
\`\`\`cpp
#include <array>
using namespace std;

array<int, 5> arr1;                  // Uninitialized (contains garbage)
array<int, 5> arr2 = {1, 2, 3, 4, 5}; // Initialized
array<int, 5> arr3 = {};             // All 5 elements initialized to 0
\`\`\`

## 2. Common Operations
It behaves almost exactly like a \`std::vector\`, except you cannot change its size (no \`push_back\`, no \`resize\`).
\`\`\`cpp
array<int, 3> arr = {10, 20, 30};

cout << arr.size();  // 3
cout << arr.front(); // 10
cout << arr.back();  // 30
cout << arr[1];      // 20
\`\`\`

## 3. Why use std::array?
If you need an array and you know its exact size at compile time (e.g., a 26-element array to count letter frequencies), you have three choices:

1.  **C-Style Array (\`int arr[26];\`):** Fast, but dangerous. Decays to a pointer when passed to functions, losing its size.
2.  **std::vector (\`vector<int> arr(26);\`):** Safe, but allocates memory on the Heap. This requires a slightly slower dynamic allocation.
3.  **std::array (\`array<int, 26> arr;\`):** The best of both worlds. Safe, knows its size, doesn't decay, supports iterators, BUT allocates directly on the Stack (extremely fast).

## DSA CONNECTION
In competitive programming, you'll still see people use \`vector\` even for fixed sizes because it's slightly less typing, but \`std::array\` is technically superior for fixed-size requirements.
*   **Frequency maps:** \`array<int, 26> freq = {};\` for counting a-z lowercase letters.
*   **Coordinates:** \`array<int, 2> point = {x, y};\`
`,
  fullNotes: `
# std::array Reference

## 1. Stack Allocation
Because the size of \`std::array\` must be a compile-time constant, the compiler knows exactly how many bytes it needs. When declared as a local variable inside a function, \`std::array\` is allocated on the Stack. 
*   **Pros:** Instantaneous allocation. No heap fragmentation.
*   **Cons:** The stack is small. \`array<int, 1000000> arr;\` will likely cause a Stack Overflow. Use a \`vector\` for large data.

## 2. Passing to Functions
Unlike C-style arrays that decay to a pointer (requiring you to pass the size separately), \`std::array\` retains its type and size.
\`\`\`cpp
// You must specify the size in the parameter type!
void printArray(const std::array<int, 5>& arr) {
    for (int x : arr) cout << x << " ";
}
\`\`\`
*Note: Because the size is part of the type, \`array<int, 5>\` and \`array<int, 6>\` are completely different types. You cannot write a single normal function that accepts both! (You would need to use C++ Templates for that).*

## 3. Comparison
\`std::array\` supports standard comparison operators (\`==\`, \`<\`, etc.). It compares elements lexicographically, which raw arrays cannot do.
\`\`\`cpp
array<int, 3> a1 = {1, 2, 3};
array<int, 3> a2 = {1, 2, 3};
if (a1 == a2) { /* This works! */ }
\`\`\`

## 4. Interview Relevance
*   **Q:** What is the difference between \`std::array\` and \`std::vector\`?
    *   **A:** \`std::array\` has a fixed size determined at compile-time and is typically allocated on the stack. \`std::vector\` has a dynamic size determined at runtime and allocates its underlying array on the heap.
`,
  shortNotes: `
*   **\`std::array<Type, Size>\`:** A safe, modern replacement for C-style arrays.
*   **Fixed Size:** The size must be a compile-time constant. Cannot be resized.
*   **Stack Allocation:** Fast memory allocation, but vulnerable to stack overflows if the array is massive.
*   **Safe Passing:** Can be passed by value or reference without decaying to a pointer. Knows its own \`.size()\`.
*   **STL Compatible:** Works perfectly with range-based for loops and STL algorithms like \`std::sort\`.
`,
  cheatSheet: `
| Operation | Syntax | Note |
|---|---|---|
| Declare | \`array<int, 5> a;\` | Uninitialized |
| Init Zeros | \`array<int, 5> a = {};\` | All 0s |
| Size | \`a.size()\` | Known at compile time |
| Read/Write| \`a[0] = 5;\` | $O(1)$ |
| Sorting | \`sort(a.begin(), a.end())\` | Works seamlessly |
`,
  resources: [
    {
      title: 'cppreference: std::array',
      url: 'https://en.cppreference.com/w/cpp/container/array',
      type: 'ARTICLE',
      priority: 'S',
      description: 'API reference for std::array.'
    },
    {
      title: 'LearnCpp: std::array',
      url: 'https://www.learncpp.com/cpp-tutorial/stdarray/',
      type: 'ARTICLE',
      priority: 'A',
      description: 'Detailed tutorial on modern arrays.'
    }
  ]
};
