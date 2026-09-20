import { TopicContent } from './types';

export const topic19: TopicContent = {
  title: 'Memory fundamentals',
  learningContent: `
# Stack vs Heap
In C++, memory is divided into different regions. The two most important for you are the Stack and the Heap (Free Store).

## 1. The Stack (Automatic Memory)
*   **What it is:** The stack stores all your local variables, function parameters, and control flow.
*   **How it works:** It operates strictly LIFO (Last In, First Out). When a function is called, memory is pushed onto the stack. When the function ends, that memory is automatically popped off.
*   **Pros:** Incredibly fast allocation. Memory is managed automatically. No leaks.
*   **Cons:** Very small size limit (usually ~1MB to 8MB). If you try to put a massive array on the stack (\`int arr[1000000];\`), you will cause a **Stack Overflow** and crash the program.

## 2. The Heap (Dynamic Memory)
*   **What it is:** A massive pool of memory used for dynamic allocation.
*   **How it works:** You must explicitly ask the OS for memory using \`new\`, and you must explicitly return it using \`delete\`.
*   **Pros:** Massive size (limited only by your physical RAM). Lifetimes are flexible (data persists until you explicitly delete it).
*   **Cons:** Slower allocation. Requires manual management.

## 3. Dynamic Allocation (\`new\` and \`delete\`)
\`\`\`cpp
// Ask for memory on the heap
int* ptr = new int(5); // Allocate 1 integer, initialized to 5

cout << *ptr; // Prints 5

// You MUST free the memory when done
delete ptr; 
ptr = nullptr; // Safety precaution against dangling pointers
\`\`\`
For arrays:
\`\`\`cpp
int* arr = new int[1000]; // Allocate 1000 ints
delete[] arr; // Note the [] for arrays!
\`\`\`

## 4. The Nightmares of Manual Memory
If you use raw \`new\` and \`delete\`, you are exposed to terrifying bugs:
*   **Memory Leak:** You \`new\` some memory but forget to \`delete\` it. The memory is lost forever until the program closes.
*   **Dangling Pointer:** You \`delete\` memory, but keep using the pointer to read/write to it. (Memory corruption).
*   **Double Free:** You \`delete\` the same memory twice. (Instant crash).

## 5. Smart Pointers (The Modern Solution)
Modern C++ (C++11 and later) says: **Never use raw \`new\` or \`delete\`.**
Instead, use Smart Pointers. They use RAII to automatically call \`delete\` when they go out of scope!
*   **\`std::unique_ptr\`:** Sole ownership. When the pointer dies, the memory is deleted.
*   **\`std::shared_ptr\`:** Shared ownership. Keeps a count of how many pointers look at the memory. Deletes the memory only when the count reaches 0.

## DSA CONNECTION
*   **Recursion & The Stack:** Every time a recursive function calls itself, it takes up stack memory. Deep recursion causes Stack Overflows.
*   **Large Arrays:** In competitive programming, never put massive arrays like \`int grid[1000][1000]\` inside \`main()\` (which puts it on the small stack). Either declare it globally (puts it in the BSS/Data segment) or use \`std::vector\` (which puts its internal array on the massive Heap).
`,
  fullNotes: `
# Memory Fundamentals Reference

## 1. Memory Segments
1.  **Code (Text) Segment:** Where the compiled machine instructions live. Read-only.
2.  **Data/BSS Segment:** Where global and static variables live.
3.  **Stack:** Where local variables and function call frames live. Fast, small, automatic.
4.  **Heap (Free Store):** Where dynamic allocations live. Slower, massive, manual.

## 2. RAII and Smart Pointers
To avoid memory leaks from manual \`delete\`, C++ provides smart pointers in the \`<memory>\` header.
\`\`\`cpp
#include <memory>
void process() {
    // std::make_unique allocates on the heap safely
    std::unique_ptr<int> ptr = std::make_unique<int>(10);
    
    // When the function ends, ptr goes out of scope (stack).
    // Its destructor is called, which automatically deletes the heap memory!
}
\`\`\`

## 3. Storage Duration
*   **Automatic:** Stack variables. Created at block entry, destroyed at block exit.
*   **Static:** Global/static variables. Created at program start, destroyed at end.
*   **Dynamic:** Heap variables. Created with \`new\`, destroyed with \`delete\`.

## 4. Interview Relevance
*   **Q:** What is the difference between the stack and the heap?
    *   **A:** The stack is used for static memory allocation and local variables, managed automatically by the CPU. It is fast but small. The heap is used for dynamic memory allocation, managed manually (or via smart pointers). It is slower to allocate but can hold massive amounts of data.
*   **Q:** What is a memory leak?
    *   **A:** A memory leak occurs when a program allocates memory on the heap but fails to release it back to the OS after it is no longer needed, causing the application to consume increasing amounts of RAM over time.
`,
  shortNotes: `
*   **Stack:** Small, fast, automatic memory. Holds local variables. Deep recursion causes Stack Overflow.
*   **Heap:** Huge, manual memory. Used for large arrays and dynamic objects.
*   **\`new\`:** Requests heap memory. Returns a pointer.
*   **\`delete\`:** Returns heap memory back to the OS.
*   **Memory Leak:** Forgetting to \`delete\`.
*   **Double Free:** Calling \`delete\` twice on the same memory (crashes).
*   **Dangling Pointer:** Using a pointer after its memory was deleted.
*   **Smart Pointers:** \`unique_ptr\` and \`shared_ptr\` automatically call \`delete\` for you using RAII. Always prefer these over raw \`new\`.
`,
  cheatSheet: `
| Concept | Storage | Managed By | Lifetime |
|---|---|---|---|
| Local Var | Stack | CPU/Compiler | End of block \`}\` |
| Global Var | Data Seg| Compiler | End of program |
| \`new\` | Heap | Programmer | Until \`delete\` |
| \`unique_ptr\`| Heap | RAII | End of block \`}\` |

| Bug | Cause |
|---|---|
| Leak | Forgot to \`delete\` |
| Dangling | Using pointer after \`delete\` |
| Double Free| \`delete\` called twice |
| Stack Overflow| Array too big or deep recursion |
`,
  resources: [
    {
      title: 'LearnCpp: The Stack and the Heap',
      url: 'https://www.learncpp.com/cpp-tutorial/the-stack-and-the-heap/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Crucial reading to understand memory locations.'
    },
    {
      title: 'LearnCpp: Dynamic memory allocation with new and delete',
      url: 'https://www.learncpp.com/cpp-tutorial/dynamic-memory-allocation-with-new-and-delete/',
      type: 'ARTICLE',
      priority: 'A',
      description: 'How manual memory management works.'
    }
  ]
};
