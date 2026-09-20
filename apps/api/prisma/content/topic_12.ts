import { TopicContent } from './types';

export const topic12: TopicContent = {
  title: 'References',
  learningContent: `
# What is a Reference?
A reference is an **alias**—an alternate name—for an existing variable. It is NOT a new, independent object in memory. Once a reference is created, anything you do to the reference happens directly to the original variable.

## Syntax and Initialization
To declare a reference, use the ampersand \`&\` next to the type.
**Rule:** A reference MUST be initialized the moment it is created. It cannot be null.
\`\`\`cpp
int age = 20;
int& refAge = age; // refAge is now another name for age

refAge = 21;
cout << age; // Prints 21!
\`\`\`
*Once initialized, a reference cannot be re-assigned to refer to a different variable.*

## Why are References Important? (Function Parameters)
The main use of references is in function parameters. 
If you pass a massive \`std::string\` to a function normally (pass-by-value), C++ copies the entire string in memory. If you pass it by reference, no copy is made; the function just gets an alias to the original data.

### Pass by Reference (Modifying data)
\`\`\`cpp
void doubleValue(int& x) {
    x = x * 2; // Actually modifies the original variable passed in!
}
\`\`\`

### Pass by Const Reference (Safe, Fast reading)
If you want the speed of references without the risk of accidentally modifying the original data, use \`const&\`.
\`\`\`cpp
// FAST: No copy made. SAFE: Cannot be modified.
void printString(const std::string& text) {
    // text += "!"; // ERROR: Cannot modify const reference
    cout << text;
}
\`\`\`

## Returning References (DANGER!)
You can return a reference from a function, but you **MUST NEVER return a reference to a local variable**. Local variables are destroyed when the function ends. Returning a reference to them results in a "dangling reference" (accessing dead memory), which causes crashes.

## DSA CONNECTION
*   **Performance:** In competitive programming, passing \`std::vector\` or \`std::string\` by value will cause Time Limit Exceeded (TLE) errors. **Always pass large DSA structures by reference.**
*   **Updating State:** If your DFS function needs to update a global \`maxScore\`, pass \`int& maxScore\` into the DFS parameters to avoid global variables.
`,
  fullNotes: `
# References Reference

## 1. Reference Properties
*   **Alias:** A reference is technically just a label. Under the hood, compilers often implement them as constant pointers that are automatically dereferenced, but conceptually, they share the exact same memory address as the target.
*   **No Nulls:** Unlike pointers, a reference cannot be \`nullptr\`. It must point to a valid object upon creation.
*   **Immutability of Binding:** You cannot re-bind a reference to a different variable later. \`ref = newVar;\` simply assigns the value of \`newVar\` into the original variable \`ref\` was pointing to.

## 2. \`const\` References
*   Extends the lifetime of temporary objects.
    \`\`\`cpp
    const int& ref = 5; // Valid! Compiler creates a hidden temporary variable.
    // int& ref = 5; // ERROR: Cannot bind non-const lvalue reference to an rvalue.
    \`\`\`
*   Default rule for modern C++: For fundamental types (\`int\`, \`double\`), pass by value. For class types (\`string\`, \`vector\`, custom classes), pass by \`const&\`.

## 3. Pointers vs References
| Feature | Reference (\`&\`) | Pointer (\`*\`) |
|---|---|---|
| Syntax | Clean (\`ref.member\`) | Requires dereference (\`ptr->member\`) |
| Nullability | Cannot be null | Can be \`nullptr\` |
| Reassignment | Cannot be re-assigned | Can point to different objects |
| Initialization | Must be initialized | Can be uninitialized (dangerous) |

## 4. Interview Relevance
*   **Q:** What happens if you return a reference to a local variable?
    *   **A:** The local variable is destroyed when the function returns. The caller receives a dangling reference. Accessing it causes Undefined Behavior.
*   **Q:** When would you use a pointer instead of a reference?
    *   **A:** When you need "no object" as a valid state (represented by \`nullptr\`), when you need to change what object is being pointed to dynamically, or when implementing dynamic data structures like linked lists.
`,
  shortNotes: `
*   **Reference (\`&\`):** An alias for an existing variable. Shares the same memory.
*   **Initialization:** MUST be initialized immediately. Cannot be \`nullptr\`.
*   **Rebinding:** Cannot be changed to reference a different variable later.
*   **Pass by Reference (\`Type& x\`):** Allows function to modify caller's original variable. Fast, no copies.
*   **Const Reference (\`const Type& x\`):** Fast, no copies, but read-only. Best practice for reading strings/vectors.
*   **Dangling Reference:** NEVER return a reference to a local variable.
`,
  cheatSheet: `
| Intent | Syntax in Function | Copied? | Modifiable? |
|---|---|---|---|
| Read primitive | \`void f(int x)\` | YES | NO (local copy) |
| Mutate original| \`void f(int& x)\` | NO | YES |
| Read heavy obj | \`void f(const string& s)\`| NO | NO (Read-only) |
| Alias var | \`int& ref = original;\` | | |
`,
  resources: [
    {
      title: 'LearnCpp: Lvalue references',
      url: 'https://www.learncpp.com/cpp-tutorial/lvalue-references/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Detailed explanation of references and aliases.'
    },
    {
      title: 'C++ Core Guidelines: F.16 (For "in" parameters, pass cheaply-copied types by value and others by reference to const)',
      url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rf-in',
      type: 'ARTICLE',
      priority: 'A',
      description: 'Official guideline on parameter passing.'
    }
  ]
};
