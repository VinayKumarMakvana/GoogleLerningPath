import { TopicContent } from './types';

export const topic6: TopicContent = {
  title: 'Conditions',
  learningContent: `
# Conditional Statements
Conditions allow your program to make decisions. They evaluate a boolean expression (\`true\` or \`false\`) and execute code blocks accordingly.

## 1. The \`if\` Statement
Executes a block of code only if the condition is true.
\`\`\`cpp
int age = 20;
if (age >= 18) {
    cout << "You can vote!";
}
\`\`\`

## 2. \`else\` and \`else if\`
Provide alternatives when the initial condition is false.
\`\`\`cpp
if (score >= 90) {
    cout << "A";
} else if (score >= 80) {
    cout << "B";
} else {
    cout << "C";
}
\`\`\`
*Note: Conditions are checked in order. Once a true condition is found, its block executes, and the rest are skipped.*

## 3. The \`switch\` Statement
Useful when comparing a single integer or character against many specific values.
\`\`\`cpp
char grade = 'B';
switch (grade) {
    case 'A':
        cout << "Excellent";
        break; // CRITICAL: Without break, it falls through to 'B'
    case 'B':
        cout << "Good";
        break;
    default:
        cout << "Unknown";
}
\`\`\`
*Mistake:* Forgetting the \`break;\` causes "fallthrough", executing all subsequent cases until a break is found.

## 4. The Conditional (Ternary) Operator
A shorthand for a simple \`if-else\`.
Syntax: \`condition ? true_value : false_value\`
\`\`\`cpp
int max = (a > b) ? a : b;
\`\`\`

## Common Mistakes
*   **Assignment in condition:** \`if (x = 5)\` (assigns 5, evaluates to true) instead of \`if (x == 5)\` (compares to 5).
*   **Missing Braces:** If you omit \`{}\`, only the *very next line* is considered part of the \`if\`. Always use braces to prevent logic bugs when adding lines later.
    \`\`\`cpp
    if (false)
        cout << "Skipped";
        cout << "ALWAYS PRINTS!"; // Not part of the if!
    \`\`\`

## DSA CONNECTION
Conditions form the backbone of logic in algorithms:
*   **Binary Search:** \`if (target == arr[mid])\`, \`else if (target < arr[mid])\`
*   **Boundary Checking:** \`if (index < 0 || index >= arraySize)\` (Crucial to prevent segfaults!)
*   **Dynamic Programming / Recursion:** Base case checking (\`if (n <= 1) return n;\`).
`,
  fullNotes: `
# Conditions Reference

## 1. If / Else If / Else
*   Parentheses around the condition are mandatory: \`if (condition)\`.
*   Braces \`{}\` define the block. Technically optional for single-line statements, but highly recommended for safety.
*   Any non-zero value evaluates to \`true\`. \`0\` evaluates to \`false\`.

## 2. Switch Statements
*   Only works with integral types (int, char, enum). Cannot switch on \`std::string\` or \`double\`.
*   \`case\` values must be compile-time constants.
*   \`break\` exits the switch block. Omitting it causes "fallthrough" behavior (sometimes intentional, mostly a bug).
*   \`default\` acts like an \`else\` catch-all.

## 3. Logical Operators in Conditions
*   Combine multiple conditions using \`&&\` (AND), \`||\` (OR), and \`!\` (NOT).
*   Leverage Short-Circuit Evaluation: put the most likely-to-fail or cheapest-to-compute condition first in an \`&&\` chain.

## 4. Interview Relevance
*   **Q:** Can you use strings in a \`switch\` statement in C++?
    *   **A:** No, C++ switch statements only accept integral or enumeration types. You must use \`if-else if\` chains or hash maps for string routing.
*   **Q:** What is "fallthrough" in a switch statement?
    *   **A:** It occurs when a \`case\` block lacks a \`break\` statement, causing execution to continue directly into the next \`case\` block regardless of whether it matches.
`,
  shortNotes: `
*   **\`if\` / \`else\`**: Standard branching. Always use \`{}\` even for single lines to avoid bugs.
*   **\`switch\`**: Only for integers/chars. Don't forget \`break;\`!
*   **Ternary \`?\`**: \`var = (cond) ? valIfTrue : valIfFalse;\`
*   **Trap 1:** \`if (x = 5)\` (Assignment, not equality). Use \`==\`.
*   **Trap 2:** Omitting braces.
*   **Trap 3:** Falling through a \`switch\` by forgetting \`break\`.
`,
  cheatSheet: `
| Statement | Example |
|---|---|
| If / Else | \`if (x > 0) { ... } else { ... }\` |
| Else If | \`else if (x == 0) { ... }\` |
| Ternary | \`ans = (a > b) ? a : b;\` |
| Switch | \`switch (x) { case 1: ... break; }\` |
| Trap Avoidance | Always use \`==\` and \`{}\`! |
`,
  resources: [
    {
      title: 'LearnCpp: Control flow introduction',
      url: 'https://www.learncpp.com/cpp-tutorial/control-flow-introduction/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Excellent introduction to branching and if statements.'
    }
  ]
};
