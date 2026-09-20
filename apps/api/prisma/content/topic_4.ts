import { TopicContent } from './types';

export const topic4: TopicContent = {
  title: 'Operators',
  learningContent: `
# Operators in C++
Operators are symbols that tell the compiler to perform specific mathematical, relational, or logical operations on variables and values.

## 1. Arithmetic Operators
*   \`+\`, \`-\`, \`*\`: Standard addition, subtraction, multiplication.
*   \`/\` (Division): **CRITICAL RULE:** If both operands are integers, C++ performs *integer division*, truncating the decimal.
    \`\`\`cpp
    int a = 5 / 2; // a is 2, not 2.5!
    double b = 5.0 / 2; // b is 2.5 (because one operand is a double)
    \`\`\`
*   \`%\` (Modulo): Returns the remainder of division. \`5 % 2\` is \`1\`. Used heavily to check for even/odd (\`x % 2 == 0\`) or wrap around array indices.

## 2. Assignment & Compound Operators
*   \`=\`: Assigns right side to left side.
*   \`+=\`, \`-=\`, \`*=\`: Shorthand. \`x += 5\` is identical to \`x = x + 5\`.

## 3. Increment / Decrement
*   \`++x\` (Pre-increment): Add 1, then use the value.
*   \`x++\` (Post-increment): Use the value, then add 1.
*(When standing alone on a line, \`x++;\` and \`++x;\` do the same thing, but pre-increment can be slightly faster for complex objects).*

## 4. Relational (Comparison) Operators
*   \`==\` (Equal to), \`!=\` (Not equal to)
*   \`<\`, \`>\`, \`<=\`, \`>=\`
**Dangerous Trap:** Confusing \`=\` (assignment) with \`==\` (comparison).
\`\`\`cpp
if (x = 5) // BUG! This sets x to 5, evaluates to true, and always runs!
\`\`\`

## 5. Logical Operators
*   \`&&\` (AND): True if BOTH sides are true.
*   \`||\` (OR): True if AT LEAST ONE side is true.
*   \`!\` (NOT): Reverses the boolean value.
*   **Short-circuit evaluation:** In \`A && B\`, if \`A\` is false, C++ doesn't even evaluate \`B\`.

## 6. Bitwise Operators (Introduction)
Operate directly on the binary bits of integers: \`&\` (AND), \`|\` (OR), \`^\` (XOR), \`~\` (NOT), \`<<\` (Left Shift), \`>>\` (Right Shift).

## DSA CONNECTION
*   **Modulo (\`%\`):** Crucial for circular arrays, clock math, and hash functions.
*   **Integer Division:** Essential in Binary Search to find the middle index: \`int mid = (left + right) / 2;\`
*   **Bitwise XOR (\`^\`):** A common trick in DSA for finding "the single non-duplicate number" in an array.
`,
  fullNotes: `
# Operators Reference

## 1. Operator Categories
*   **Arithmetic:** \`+, -, *, /, %\`
*   **Relational:** \`==, !=, >, <, >=, <=\`
*   **Logical:** \`&&, ||, !\`
*   **Assignment:** \`=, +=, -=, *=, /=, %=\`
*   **Bitwise:** \`&, |, ^, ~, <<, >>\`
*   **Conditional (Ternary):** \`condition ? true_result : false_result\`

## 2. Integer Division vs Float Division
If *both* operands are integers, the fractional part is discarded.
\`\`\`cpp
10 / 3      // Evaluates to 3
10.0 / 3    // Evaluates to 3.333...
10 / 3.0    // Evaluates to 3.333...
static_cast<double>(10) / 3 // 3.333...
\`\`\`

## 3. Precedence and Associativity
Determines the order of evaluation.
*   \`*\`, \`/\`, \`%\` evaluated before \`+\`, \`-\`.
*   Use parentheses \`()\` to force order and improve readability. Don't rely on memorizing complex precedence charts.

## 4. Short-Circuit Evaluation
\`\`\`cpp
if (ptr != nullptr && ptr->value == 10)
\`\`\`
If \`ptr\` is null, the first condition is false. The \`&&\` operator short-circuits and skips the second condition, preventing a crash from dereferencing a null pointer.

## 5. Interview Relevance
*   **Q:** What is the difference between \`=\` and \`==\`?
    *   **A:** \`=\` assigns a value. \`==\` checks for equality. Using \`=\` inside an \`if\` condition is a logical bug.
*   **Q:** What is short-circuit evaluation?
    *   **A:** When evaluating boolean expressions, the evaluation stops as soon as the outcome is determined (e.g., encountering a false in an \`&&\` chain).
`,
  shortNotes: `
*   **Int Division:** \`5 / 2 = 2\`. To get decimal, one must be a float/double: \`5.0 / 2 = 2.5\`.
*   **Modulo \`%\`:** Remainder. \`5 % 2 = 1\`. Only works on integers.
*   **Assignment Trap:** \`if (a = 5)\` is ALWAYS true. Use \`==\` for checking equality.
*   **Short-circuit:** \`A && B\` skips B if A is false. \`A || B\` skips B if A is true.
*   **Pre-increment:** \`++x\` (increment, then read).
*   **Post-increment:** \`x++\` (read, then increment).
*   **Ternary:** \`int max = (a > b) ? a : b;\`
`,
  cheatSheet: `
| Operator | Example | Note |
|---|---|---|
| Division | \`5 / 2\` | Truncates to 2 |
| Modulo | \`5 % 2\` | Remainder (1) |
| Equality | \`a == b\`| True if equal |
| Assign | \`a = b\` | Sets a to b |
| AND | \`A && B\`| Both must be true |
| OR | \`A \|\| B\`| One must be true |
| Ternary | \`c ? x : y\`| If c, then x, else y |
`,
  resources: [
    {
      title: 'LearnCpp: Operators',
      url: 'https://www.learncpp.com/cpp-tutorial/introduction-to-operators/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Great breakdown of operators and precedence.'
    }
  ]
};
