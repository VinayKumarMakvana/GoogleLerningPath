import { TopicContent } from './types';

export const topic8: TopicContent = {
  title: 'Functions',
  learningContent: `
# Functions
A function is a reusable block of code designed to perform a specific task. \`main()\` is a function, but you can create your own!

## Why use functions?
1.  **Reusability:** Write once, call multiple times.
2.  **Organization:** Breaks massive programs into small, manageable chunks.
3.  **Testing:** Easier to test a small function than a 1000-line \`main()\` file.

## Anatomy of a Function
\`\`\`cpp
// Return_Type Function_Name (Parameters)
int add(int a, int b) {
    return a + b; // Body
}
\`\`\`
*   **Return Type:** What the function gives back (e.g., \`int\`, \`double\`, \`string\`). Use \`void\` if it returns nothing.
*   **Parameters:** Variables the function takes as input.
*   **Return Statement:** Exits the function and passes a value back to the caller.

## Pass-by-Value vs Pass-by-Reference
By default, C++ passes arguments **by value**. This means it makes a *copy* of the variable. Modifying the copy inside the function does NOT change the original.
\`\`\`cpp
void doNothing(int x) {
    x = 100; // Only changes the local copy
}
\`\`\`
To modify the original variable, you must pass **by reference** using the \`&\` symbol.
\`\`\`cpp
void changeReal(int& x) {
    x = 100; // Actually changes the original variable!
}
\`\`\`

## Const Reference
Making copies of massive data structures (like a \`std::string\` or \`std::vector\`) is extremely slow. Passing by reference is fast, but it allows the function to modify the data.
If you want to read a large object quickly *without* accidentally modifying it, use a **const reference**.
\`\`\`cpp
void printName(const std::string& name) {
    // Fast, no copying!
    // name = "Bob"; // ERROR: compiler prevents modification
    cout << name;
}
\`\`\`

## DSA CONNECTION
In competitive programming, you should encapsulate your algorithm logic in a separate function rather than writing everything inside \`main()\`.
*   Passing a \`vector\` to a function *by value* creates a full copy of the array. If the array has $10^5$ elements, this takes $O(n)$ time just to pass it! 
*   **Always pass large data structures by reference (\`&\`) or const reference (\`const &\`) in DSA.**
`,
  fullNotes: `
# Functions Reference

## 1. Declaration vs Definition
*   **Declaration (Prototype):** Tells the compiler the function exists, its name, return type, and parameters. Usually placed in header files (\`.h\`) or at the top of the file. E.g., \`int add(int, int);\`
*   **Definition:** The actual body (implementation) of the function.

## 2. Parameter Passing Modes
1.  **Pass by Value (\`int x\`):** Copies the value. Safe, but slow for large objects.
2.  **Pass by Reference (\`int& x\`):** Passes the memory address. Modifies original. Fast.
3.  **Pass by Const Reference (\`const int& x\`):** Passes memory address, but read-only. Fast and safe. Default choice for large objects (strings, vectors).

## 3. Function Overloading
C++ allows multiple functions with the same name, as long as their parameter lists (types or number of parameters) are different.
\`\`\`cpp
int multiply(int a, int b) { return a * b; }
double multiply(double a, double b) { return a * b; }
\`\`\`

## 4. Default Arguments
You can assign default values to parameters. They must be the right-most parameters.
\`\`\`cpp
void greet(string name = "Guest") { ... }
\`\`\`

## 5. Interview Relevance
*   **Q:** When should you use pass-by-reference instead of pass-by-value?
    *   **A:** Use pass-by-reference when you need a function to modify the caller's original variable, or when you are passing large objects (like arrays or vectors) to avoid the expensive performance cost of copying.
*   **Q:** What is function overloading?
    *   **A:** Having multiple functions with the exact same name but different parameters within the same scope. The compiler decides which one to call based on the arguments provided.
`,
  shortNotes: `
*   **Return type:** What it outputs. Use \`void\` for nothing.
*   **Parameters:** Inputs to the function.
*   **Pass by Value (\`int x\`):** Makes a copy. Original is safe.
*   **Pass by Reference (\`int& x\`):** No copy. Modifies original.
*   **Const Reference (\`const string& s\`):** No copy. Read-only. ALWAYS use this for strings and vectors unless modifying.
*   **Overloading:** Same function name, different parameter types.
*   **Declaration vs Definition:** Declaration = "It exists", Definition = "Here is the code".
`,
  cheatSheet: `
| Concept | Syntax Example | Notes |
|---|---|---|
| Definition | \`int add(int a) { return a; }\` | Basic function |
| Void Return | \`void print(int a)\` | Returns nothing |
| Pass by Value | \`void fn(string s)\` | SLOW copy |
| Pass by Ref | \`void fn(string& s)\` | FAST, mutates orig |
| Const Ref | \`void fn(const string& s)\` | FAST, read-only |
| Default Arg | \`void fn(int x = 0)\` | Must be right-most |
`,
  resources: [
    {
      title: 'LearnCpp: Function Parameters and Arguments',
      url: 'https://www.learncpp.com/cpp-tutorial/function-parameters-and-arguments/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Crucial reading to understand pass-by-value.'
    },
    {
      title: 'LearnCpp: Pass by Reference',
      url: 'https://www.learncpp.com/cpp-tutorial/pass-by-lvalue-reference/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Understanding memory and references in functions.'
    }
  ]
};
