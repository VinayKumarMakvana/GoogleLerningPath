import { TopicContent } from './types';

export const topic2: TopicContent = {
  title: 'Variables',
  learningContent: `
# What is a Variable?
A variable is a named location in computer memory where you can store data. You can think of it as a labeled box where you can put a value, read it later, or change it.

## Why does it matter?
Without variables, programs couldn't remember anything! They hold the state of your application—from loop counters and indices to player scores and database records.

## Declaration vs Initialization vs Assignment

1.  **Declaration:** Telling the compiler a variable exists and what type it is.
    \`\`\`cpp
    int age; // Declared, but holds unpredictable "garbage" data!
    \`\`\`
2.  **Initialization:** Giving a variable a value at the exact moment it is created.
    \`\`\`cpp
    int score = 0; // Copy initialization
    int health{100}; // Brace initialization (preferred in modern C++)
    \`\`\`
3.  **Assignment:** Changing the value of a variable that already exists.
    \`\`\`cpp
    score = 10; // Assignment
    \`\`\`

> **Golden Rule:** ALWAYS initialize your variables. Reading an uninitialized variable leads to undefined behavior.

## Naming Rules (Identifiers)
*   Must begin with a letter (a-z, A-Z) or an underscore \`_\`.
*   Can contain numbers, but cannot start with a number.
*   Cannot be a C++ keyword (like \`int\`, \`if\`, \`return\`).
*   Case sensitive (\`Age\` and \`age\` are different).

## Constants (\`const\`)
If a variable's value should never change after initialization, use \`const\`. This prevents accidental modification and helps the compiler optimize your code.
\`\`\`cpp
const double PI = 3.14159;
PI = 3; // ERROR! Compiler will stop you.
\`\`\`

## Type Deduction (\`auto\`)
Modern C++ allows you to use \`auto\` to let the compiler figure out the type based on the initial value.
\`\`\`cpp
auto count = 10; // Compiler knows count is an int
auto name = "Alice"; // Compiler knows name is a string literal
\`\`\`
*Note: You MUST initialize an \`auto\` variable, otherwise the compiler can't deduce the type.*

## Common Mistakes
*   **Uninitialized variables:** \`int x; cout << x;\` might print 0, or it might print -8439201. Never rely on default initialization for primitive types.
*   **Variable shadowing:** Creating a variable inside a block with the same name as one outside the block, accidentally hiding the outer one.
*   **Modifying const:** Trying to assign a new value to a \`const\` variable.

## DSA CONNECTION
In DSA, variables are your building blocks.
*   **Counters:** Tracking how many items you've seen.
*   **Indices:** Pointing to current elements in an array (e.g., \`int left = 0;\`).
*   **State:** Storing the current maximum value or a running sum.
Using descriptive names (like \`maxSum\` instead of \`m\`) is crucial in technical interviews to communicate your thought process.
`,
  fullNotes: `
# Variables Reference

## 1. Syntax
*   **Declaration:** \`type name;\` (e.g., \`int x;\`)
*   **Initialization (Copy):** \`type name = value;\` (e.g., \`int x = 5;\`)
*   **Initialization (Brace):** \`type name{value};\` (e.g., \`int x{5};\`) - *Preferred as it prevents narrowing conversions.*
*   **Assignment:** \`name = new_value;\` (e.g., \`x = 10;\`)

## 2. Naming Guidelines
*   Use camelCase for variables (e.g., \`userAge\`, \`totalScore\`).
*   Constants are often UPPER_SNAKE_CASE (e.g., \`MAX_SIZE\`).
*   Be descriptive but concise.

## 3. The \`const\` Keyword
*   Marks a variable as read-only.
*   Must be initialized at the time of declaration.
*   \`const int MAX = 100;\`

## 4. The \`auto\` Keyword (C++11)
*   Compiler deduces type from the initializer.
*   Reduces verbosity for complex types.
*   \`auto i = 0; // int\`

## 5. Scope and Lifetime (Introduction)
*   **Scope:** Where the variable name is visible (usually between the \`{\` and \`}\` where it was declared).
*   **Lifetime:** How long the variable stays in memory.

## 6. Interview Relevance
*   **Q:** What is the difference between initialization and assignment?
    *   **A:** Initialization gives a variable its first value at the moment of creation. Assignment replaces an existing value with a new one.
*   **Q:** Why is \`const\` useful?
    *   **A:** It enforces immutability, making code safer by preventing accidental state changes, and allows compiler optimizations.
`,
  shortNotes: `
*   **Variable:** Named memory location.
*   **ALWAYS INITIALIZE:** Uninitialized primitive variables contain garbage data.
*   **Brace Initialization:** \`int x{0};\` (safer, prevents data loss).
*   **Identifiers:** Start with letter/_, case-sensitive, no spaces/keywords.
*   **\`const\`:** Read-only. Must initialize immediately. E.g., \`const int MAX = 10;\`
*   **\`auto\`:** Let compiler deduce type. E.g., \`auto x = 5.5;\` (double).
*   **Shadowing:** Inner block variable hides outer block variable of the same name.
`,
  cheatSheet: `
| Concept | Syntax |
|---|---|
| Declaration | \`int x;\` (Avoid doing this alone) |
| Copy Init | \`int x = 5;\` |
| Brace Init | \`int x{5};\` (Preferred) |
| Assignment | \`x = 10;\` |
| Constant | \`const double PI = 3.14;\` |
| Type Deduction | \`auto count = 5;\` |
`,
  resources: [
    {
      title: 'LearnCpp: Variable assignment and initialization',
      url: 'https://www.learncpp.com/cpp-tutorial/variable-assignment-and-initialization/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Comprehensive guide to variables and initialization styles.'
    },
    {
      title: 'C++ Core Guidelines: Constants',
      url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#con-constants-and-immutability',
      type: 'ARTICLE',
      priority: 'A',
      description: 'Best practices for using const in C++.'
    }
  ]
};
