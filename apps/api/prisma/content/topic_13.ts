import { TopicContent } from './types';

export const topic13: TopicContent = {
  title: 'Pointers',
  learningContent: `
# Memory and Addresses
Every variable you create is stored in your computer's RAM. You can think of RAM as a massive array of mailboxes, each with a unique numeric ID called a **memory address**.
To find out exactly *where* a variable lives in memory, use the **Address-of Operator (\`&\`)**.
\`\`\`cpp
int x = 10;
cout << &x; // Prints a hex address, e.g., 0x7ffd5a3b9c
\`\`\`

# What is a Pointer?
A pointer is simply a variable that stores a memory address. Instead of holding a value like \`10\` or \`"Hello"\`, it holds a location like \`0x7ffd5a3b9c\`.

## 1. Declaration and Initialization
You declare a pointer by adding an asterisk \`*\` next to the type it points to.
\`\`\`cpp
int x = 10;
int* ptr = &x; // "ptr is a pointer to an integer. It holds the address of x."
\`\`\`
> **CRITICAL RULE:** Never leave a pointer uninitialized. If a pointer shouldn't point to anything yet, set it to \`nullptr\`.
\`\`\`cpp
int* safePtr = nullptr; // Modern C++ (Do not use NULL or 0)
\`\`\`

## 2. Dereferencing (\`*\`)
If you have a pointer, how do you get the actual value inside the mailbox it points to? You use the **Dereference Operator (\`*\`)**.
\`\`\`cpp
int x = 10;
int* ptr = &x;

cout << ptr;  // Prints the ADDRESS (0x...)
cout << *ptr; // Prints the VALUE at that address (10)

*ptr = 99;    // Follows the pointer to x, and changes x to 99!
cout << x;    // Prints 99
\`\`\`
*Warning:* Dereferencing a \`nullptr\` or an uninitialized pointer instantly crashes your program (Segmentation Fault).

## 3. Pointers and Arrays
An array name is essentially a pointer to its first element.
\`\`\`cpp
int arr[3] = {10, 20, 30};
int* p = arr; // p now points to arr[0] (which holds 10)
cout << *p; // 10
\`\`\`
**Pointer Arithmetic:** If you add 1 to a pointer, it moves forward in memory by exactly one element's size.
\`\`\`cpp
cout << *(p + 1); // Moves 4 bytes forward (since int is 4 bytes), prints 20 (arr[1])
\`\`\`

## 4. Pointer Lifetimes and Horrors
Pointers are dangerous because they blindly trust that the memory they point to is valid.
### A. The Dangling Pointer
Occurs when a pointer points to memory that has been deleted or has gone out of scope.
\`\`\`cpp
int* badPointer() {
    int local = 5;
    return &local; // TERRIBLE BUG! Returns address of a dead variable.
}
\`\`\`
### B. Use-After-Free
If you manually allocate memory (using \`new\`) and free it (\`delete\`), but keep using the pointer, your program is corrupting memory.

## 5. Ownership: Raw vs Smart Pointers
In modern C++, **raw pointers (\`T*\`) should ONLY be used to "look" at data (Observer pattern).** They should NEVER own data. They don't communicate who is responsible for deleting the memory.
If you need a pointer that manages its own memory cleanup automatically, modern C++ provides **Smart Pointers** (\`std::unique_ptr\` and \`std::shared_ptr\`), which wrap raw pointers safely.

## DSA CONNECTION
Pointers are the literal physical links in Data Structures:
*   **Linked Lists:** \`Node* next;\` points to the next node in the chain.
*   **Trees:** \`TreeNode* left;\` and \`TreeNode* right;\`.
*   **Graphs:** Arrays of pointers to neighbors.
Understanding how to correctly reassign pointers is 90% of solving Linked List interview questions.
`,
  fullNotes: `
# Pointers Reference

## 1. Syntax Breakdown
*   **\`&\` (Address-of):** Put in front of a variable to get its address. (\`&x\`)
*   **\`*\` (Pointer Type):** Put after a type to declare a pointer variable. (\`int* p\`)
*   **\`*\` (Dereference):** Put in front of a pointer to get the value it points to. (\`*p\`)
*   **\`->\` (Arrow Operator):** Shorthand for dereferencing a pointer to a struct/class and accessing its member. (\`(*ptr).member\` becomes \`ptr->member\`).

## 2. \`const\` with Pointers (Read Carefully)
The position of \`const\` matters significantly. Read it right-to-left.
*   **Pointer to const:** \`const int* ptr;\` 
    *   The integer is constant. You cannot do \`*ptr = 5\`. You CAN change where \`ptr\` points.
*   **Const pointer:** \`int* const ptr = &x;\` 
    *   The pointer is constant. You cannot do \`ptr = &y\`. You CAN change the value: \`*ptr = 5\`.
*   **Const pointer to const:** \`const int* const ptr = &x;\`
    *   Neither the value nor the pointer can be changed.

## 3. Pointers vs References
| Feature | Pointer (\`int*\`) | Reference (\`int&\`) |
|---|---|---|
| Nullability | Can be \`nullptr\` | Must be initialized, cannot be null |
| Reassignment | Can point to something else later | Bound for life |
| Syntax | Requires \`*\` and \`&\` explicitly | Acts exactly like a normal variable |
| Underlying | Holds an address explicitly | Abstracted alias |

## 4. Interview Relevance
*   **Q:** What is a dangling pointer?
    *   **A:** A pointer that points to a memory location that has been deallocated or freed, leading to undefined behavior if dereferenced.
*   **Q:** What is the difference between \`nullptr\` and an uninitialized pointer?
    *   **A:** \`nullptr\` is a well-defined value (essentially address 0) that explicitly indicates "pointing to nothing." Dereferencing it guarantees a crash (fail-fast). An uninitialized pointer holds a garbage memory address. Dereferencing it might crash, or it might silently corrupt random memory, creating a nightmare to debug.
*   **Q:** Explain pointer arithmetic.
    *   **A:** Adding \`1\` to a pointer does not add 1 byte to the address. It adds \`sizeof(Type)\` bytes, shifting the pointer to the next consecutive element of that type in memory.
`,
  shortNotes: `
*   **Pointer:** Variable that stores a memory address.
*   **\`&\` (Address-of):** Gets the address of a variable.
*   **\`*\` (Dereference):** Follows the pointer to read/write the actual value.
*   **\`nullptr\`:** Safe null pointer keyword. Always initialize pointers!
*   **Dangling Pointer:** Pointing to memory that has been destroyed (e.g., returning address of a local variable).
*   **Arrays:** Array name is essentially a pointer to element 0.
*   **Arrow \`->\`:** Use \`ptr->field\` instead of \`(*ptr).field\`.
*   **Ownership:** Raw pointers do not communicate ownership. Only use them as non-owning "observers" in modern C++.
`,
  cheatSheet: `
| Concept | Code | Meaning |
|---|---|---|
| Get Address | \`int* p = &x;\` | p holds address of x |
| Read Value | \`cout << *p;\` | Follows p, prints x |
| Write Value | \`*p = 10;\` | Follows p, sets x to 10 |
| Null Pointer| \`int* p = nullptr;\`| Points to safely "nothing" |
| Access Member| \`nodePtr->value\` | Deref and access member |
| Array logic | \`*(arr + i)\` | Exactly equivalent to \`arr[i]\`|
`,
  resources: [
    {
      title: 'LearnCpp: Pointers',
      url: 'https://www.learncpp.com/cpp-tutorial/introduction-to-pointers/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'The definitive guide to understanding pointers safely.'
    },
    {
      title: 'C++ Core Guidelines: Raw Pointers',
      url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rr-ptr',
      type: 'ARTICLE',
      priority: 'A',
      description: 'Official rules on when (and when not) to use raw pointers.'
    }
  ]
};
