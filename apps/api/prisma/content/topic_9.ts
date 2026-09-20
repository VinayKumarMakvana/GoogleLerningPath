import { TopicContent } from './types';

export const topic9: TopicContent = {
  title: 'Scope',
  learningContent: `
# Scope and Lifetime
A variable does not live forever, nor is it visible everywhere. Understanding *where* a variable can be used, and *how long* it exists, is crucial for avoiding confusing bugs.

## 1. Scope (Where can I see it?)
Scope determines where an identifier (like a variable name) can be accessed in the code.
*   **Block Scope (Local Scope):** Any variable declared inside curly braces \`{}\` is only visible inside those braces.
    \`\`\`cpp
    int main() {
        int x = 5; // visible inside main
        if (true) {
            int y = 10; // visible ONLY inside this if block
            cout << x; // OK: inner blocks can see outer variables
        }
        // cout << y; // ERROR: y is out of scope here!
    }
    \`\`\`
*   **Global Scope:** A variable declared outside of all functions (including \`main\`) is visible everywhere in the file. **(Generally avoid global variables in large programs as they lead to spaghetti state).**

## 2. Lifetime (How long does it exist?)
Lifetime is the runtime duration that a variable occupies memory.
*   **Automatic Lifetime:** Local variables are created when the block is entered and *destroyed* when the block is exited.
*   **Static Lifetime:** Global variables, and variables marked \`static\`, are created when the program starts and destroyed when the program ends.

## 3. Variable Shadowing
If you declare a variable in an inner scope with the *exact same name* as a variable in an outer scope, the inner variable "shadows" (hides) the outer one.
\`\`\`cpp
int x = 10;
if (true) {
    int x = 20; // Shadows the outer x
    cout << x; // Prints 20
}
cout << x; // Prints 10 (the inner x is dead)
\`\`\`
*Mistake:* Shadowing is almost always an accident and a massive source of logical bugs. Turn on compiler warnings (like \`-Wshadow\`) to catch this.

## DSA CONNECTION
Scope is vital in recursive algorithms and loops.
*   **Loop Variables:** Always declare your loop index inside the loop: \`for (int i = 0; ...)\`. If you declare \`i\` outside, it retains its value after the loop, which might accidentally mess up subsequent code.
*   **Recursive State:** If you need a variable to persist across recursive function calls (like tracking the maximum path sum in a tree), pass it by reference, or use a class member variable. Avoid global variables for CP/DSA state because they don't reset between test cases!
`,
  fullNotes: `
# Scope and Lifetime Reference

## 1. Differentiating Scope and Lifetime
*   **Scope:** A compile-time concept. It dictates *where* the compiler will allow you to type the variable's name.
*   **Lifetime:** A runtime concept. It dictates *when* the variable is allocated and deallocated in RAM.

## 2. Scope Types
*   **Block Scope:** Inside \`{}\`. Ends at the closing \`}\`.
*   **Function Scope:** Variables declared in a function. (Technically a type of block scope).
*   **Global/Namespace Scope:** Outside any function. Visible from declaration to the end of the file.

## 3. Name Hiding (Shadowing)
When an inner scope declares a variable with the same name as an outer scope variable, the outer variable becomes inaccessible by name until the inner scope ends.

## 4. The \`static\` Keyword (Local Variables)
When applied to a local variable inside a function, \`static\` changes its lifetime to the duration of the program, but its scope remains restricted to the function. It retains its value between function calls.
\`\`\`cpp
void countCalls() {
    static int calls = 0; // Initialized ONLY ONCE
    calls++;
    cout << calls;
}
\`\`\`

## 5. Interview Relevance
*   **Q:** What is the difference between scope and lifetime?
    *   **A:** Scope refers to the region of the source code where an identifier is visible to the compiler. Lifetime refers to the duration during program execution when the object is physically stored in memory.
*   **Q:** Why are global variables generally considered bad practice?
    *   **A:** They can be read or modified by any part of the program, making state unpredictable, increasing coupling, and making debugging exceptionally difficult.
`,
  shortNotes: `
*   **Scope:** Where a name can be used.
*   **Lifetime:** How long the object stays in memory.
*   **Block Scope:** Variables in \`{}\` die at the closing \`}\`.
*   **Inner > Outer:** Inner blocks can read outer variables. Outer blocks CANNOT read inner variables.
*   **Shadowing:** Inner variable with same name hides outer variable. Try to avoid.
*   **Global Variables:** Avoid them. They cause unpredictable state changes.
*   **\`static\` local var:** Lives forever, but only accessible inside its function.
`,
  cheatSheet: `
| Term | Meaning | Example / Rule |
|---|---|---|
| Scope | Visibility | Inside \`{}\` |
| Lifetime | Memory duration | Until \`}\` is reached |
| Shadowing | Hiding variables | Outer \`x\` hidden by inner \`x\` |
| Global | Everywhere | \`int x = 5;\` outside main() |
| Static Local | Persistent state | \`static int count = 0;\` |
`,
  resources: [
    {
      title: 'LearnCpp: Local scope',
      url: 'https://www.learncpp.com/cpp-tutorial/local-variables/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Understanding block scope and lifetimes.'
    }
  ]
};
