import { TopicContent } from './types';

export const topic10: TopicContent = {
  title: 'Arrays',
  learningContent: `
# What is an Array?
An array is a contiguous block of memory that holds multiple variables of the same type. Instead of creating \`score1\`, \`score2\`, \`score3\`, you can create one \`scores\` array that holds all three.

## Fixed-Size C-Style Arrays
In standard C++, a raw array's size must be known at compile-time and cannot change.
\`\`\`cpp
// Declaration
int scores[5]; // Holds 5 integers (uninitialized, contains garbage!)

// Initialization
int numbers[3] = {10, 20, 30}; 

// Size inference
int days[] = {1, 2, 3, 4, 5}; // Compiler knows size is 5
\`\`\`

## Indexing & Modification
Arrays use **zero-based indexing**. The first element is at index 0.
\`\`\`cpp
int nums[3] = {10, 20, 30};
cout << nums[0]; // Prints 10
nums[2] = 99;    // Changes the 3rd element to 99
\`\`\`
> **DANGER:** C++ does NOT check if your index is out of bounds. Accessing \`nums[5]\` will compile, but it will read or write garbage memory, causing catastrophic bugs or crashes!

## Traversal
Iterating over an array is usually done with a \`for\` loop.
\`\`\`cpp
int arr[4] = {2, 4, 6, 8};

// Standard for loop
for (int i = 0; i < 4; i++) {
    cout << arr[i] << " ";
}

// Modern Range-based for loop
for (int val : arr) {
    cout << val << " ";
}
\`\`\`

## Multidimensional Arrays (2D Arrays)
You can create arrays of arrays, useful for grids or matrices.
\`\`\`cpp
int grid[2][3] = {
    {1, 2, 3}, // Row 0
    {4, 5, 6}  // Row 1
};
cout << grid[1][2]; // Accesses row 1, column 2 (value: 6)
\`\`\`

## Array Decay and Passing to Functions
When you pass a raw array to a function, it **decays** into a pointer to its first element. The function loses all knowledge of the array's size!
\`\`\`cpp
// You MUST pass the size separately!
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) cout << arr[i] << " ";
}
\`\`\`

## Modern C++: \`std::vector\` and \`std::array\`
Because raw C-style arrays are dangerous and inflexible, modern C++ prefers:
1.  **\`std::vector<int>\`:** A dynamic array that can grow and shrink in size. (Used 99% of the time in DSA).
2.  **\`std::array<int, 5>\`:** A safe, fixed-size array that doesn't decay to a pointer and knows its own size.

## DSA CONNECTION
Arrays are the foundational data structure in DSA. Contiguous memory means accessing any element by its index takes **$O(1)$ time** (instant).
Common array patterns include:
*   **Prefix Sums:** Precomputing sums for fast range queries.
*   **Two Pointers:** Variables \`left = 0\` and \`right = n - 1\` closing in on the center.
*   **Sliding Window:** Maintaining a sub-segment of the array.
*   **Binary Search:** Fast searching in a sorted array.
`,
  fullNotes: `
# Arrays Reference

## 1. Memory Layout
*   Arrays are allocated in **contiguous memory**. If an \`int\` is 4 bytes, \`arr[1]\` is located exactly 4 bytes after \`arr[0]\`.
*   This locality makes arrays incredibly fast for modern CPU caches.

## 2. Syntax & Initialization
*   \`int arr[5];\` (Uninitialized)
*   \`int arr[5] = {};\` (Initializes all to 0)
*   \`int arr[5] = {1, 2};\` (Initializes first two, rest are 0)

## 3. The Out-of-Bounds Trap
C++ prioritizes speed over safety. It will let you write \`arr[100] = 5;\` on an array of size 10. This overwrites adjacent memory (potentially other variables or program instructions), leading to Undefined Behavior.

## 4. Array Decay
\`\`\`cpp
void process(int myArr[10]) {
    // sizeof(myArr) inside this function will return the size of a pointer (usually 8 bytes), NOT 40 bytes!
    // The "10" in the parameter is completely ignored by the compiler.
}
\`\`\`

## 5. Array vs Vector
| Feature | C-Style Array | \`std::vector\` |
|---|---|---|
| Size | Fixed at compile time | Dynamic (can grow/shrink) |
| Bounds Check | None | Optional via \`.at()\` |
| Knows its size? | Only in original scope | Yes (\`.size()\`) |
| Use Case | Legacy code, extreme low-level | 99% of modern code & DSA |

## 6. Interview Relevance
*   **Q:** Why do arrays in C++ decay into pointers when passed to a function?
    *   **A:** For performance. Passing an entire array by value would require copying every element. Decaying to a pointer passes just the memory address of the first element (8 bytes).
*   **Q:** How do you find the number of elements in a raw array?
    *   **A:** \`sizeof(arr) / sizeof(arr[0])\`. However, this *only* works in the scope where the array was declared, not after it decays to a pointer.
`,
  shortNotes: `
*   **Contiguous Memory:** Elements are stored side-by-side. Fast access ($O(1)$).
*   **0-Indexed:** First element is \`arr[0]\`. Last is \`arr[size - 1]\`.
*   **No Bounds Checking:** \`arr[999]\` might compile, but will crash.
*   **Decay:** When passed to functions, arrays become pointers. You lose the size. Always pass \`size\` as a second argument.
*   **Vectors:** Modern C++ uses \`std::vector<T>\` which manages its own size and memory dynamically.
`,
  cheatSheet: `
| Operation | Syntax | Note |
|---|---|---|
| Declare | \`int a[5];\` | Uninitialized |
| Init Zeros| \`int a[5] = {};\` | All zeros |
| Access | \`a[2] = 10;\` | Sets 3rd element |
| Traversal | \`for(int x : a)\` | Reads all elements |
| Array Size| \`sizeof(a)/sizeof(a[0])\` | Fails in functions! |
| 2D Array | \`int grid[2][3];\` | 2 rows, 3 cols |
`,
  resources: [
    {
      title: 'LearnCpp: Arrays (C-style)',
      url: 'https://www.learncpp.com/cpp-tutorial/arrays-part-i/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Comprehensive guide to raw arrays.'
    }
  ]
};
