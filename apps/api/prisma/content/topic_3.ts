import { TopicContent } from './types';

export const topic3: TopicContent = {
  title: 'Data types',
  learningContent: `
# Fundamental Data Types
C++ provides built-in types to represent different kinds of data: numbers, characters, and truth values.

## Core Types
1.  **\`bool\` (Boolean):** Stores \`true\` (1) or \`false\` (0).
2.  **\`char\` (Character):** Stores a single character, like \`'a'\` or \`'5'\`. It is actually stored as a small integer (ASCII value).
3.  **\`int\` (Integer):** Stores whole numbers (e.g., -42, 0, 100).
4.  **\`double\` (Floating-point):** Stores decimal numbers (e.g., 3.14, -0.001).
5.  **\`std::string\` (String):** (Requires \`#include <string>\`) Stores text (e.g., "Hello").

## Integers: Size and Range
Integer types come in different sizes, dictating how large of a number they can store. *Exact sizes depend on your compiler and architecture*, but generally:
*   \`short\`: Usually 16 bits (roughly ±32,000).
*   \`int\`: Usually 32 bits (roughly ±2 billion).
*   \`long long\`: Guaranteed to be at least 64 bits (roughly ±9 quintillion).

> **Integer Overflow:** If you try to store a number larger than the type can hold, it "wraps around" to the negative extreme. This is a critical bug source!

## Signed vs Unsigned
By default, integers are **signed** (can be positive or negative).
You can make them **unsigned** (only positive, doubling the positive upper limit):
\`\`\`cpp
unsigned int count = 4000000000;
\`\`\`
*Warning: Mixing signed and unsigned variables in math/comparisons can lead to disastrous bugs. Prefer signed integers unless you have a specific reason.*

## Conversions
*   **Implicit (Automatic):** The compiler converts types safely when it can (e.g., \`double x = 5;\` converts int 5 to double 5.0).
*   **Explicit (Casting):** Forcing a conversion. \`static_cast<double>(myInt)\` is the modern C++ way.

## Common Mistakes
*   **Integer Overflow:** Multiplying two large \`int\`s resulting in a number > 2 billion.
*   **Float Equality:** \`double x = 0.1 + 0.2; if (x == 0.3)\` often fails due to precision issues! Never use \`==\` on floats.
*   **Single vs Double quotes:** \`'A'\` is a \`char\`. \`"A"\` is a \`string\`.

## DSA CONNECTION
In competitive programming and DSA, **Integer Overflow is the #1 silent killer.**
*   If an array can have $10^5$ elements, and you sum them up, the sum can exceed $2 \\times 10^9$. You MUST use \`long long\` for the sum.
*   Indices and sizes are often represented by \`std::size_t\` (an unsigned integer type).
`,
  fullNotes: `
# Data Types Reference

## 1. Fundamental Types
| Type | Description | Typical Size |
|---|---|---|
| \`bool\` | true or false | 1 byte |
| \`char\` | single character | 1 byte |
| \`int\` | whole number | 4 bytes |
| \`long long\` | large whole number | 8 bytes |
| \`float\` | single precision decimal | 4 bytes |
| \`double\` | double precision decimal | 8 bytes |

## 2. String Library
*   \`#include <string>\`
*   \`std::string name = "Alice";\`
*   Supports concatenation: \`"Hello " + name\`

## 3. Modifiers
*   \`signed\` (default for ints): Allows negative numbers.
*   \`unsigned\`: Only non-negative numbers. Shifts the range upward.

## 4. Integer Overflow
*   Occurs when a value exceeds the maximum limit of its data type.
*   Signed overflow is technically Undefined Behavior in C++, though it typically wraps around.

## 5. Type Casting
*   **C-style (avoid):** \`(double)x\`
*   **C++ style (preferred):** \`static_cast<double>(x)\`

## 6. Interview Relevance
*   **Q:** What is integer overflow?
    *   **A:** When an arithmetic operation attempts to create a numeric value that is outside the range that can be represented with a given number of bits.
*   **Q:** Why avoid comparing floating-point numbers with \`==\`?
    *   **A:** Due to how floats are represented in binary (IEEE 754), slight precision losses occur, making exact equality checks unreliable. Use an epsilon check instead (\`abs(a - b) < epsilon\`).
`,
  shortNotes: `
*   **\`int\`:** ~2 billion max. Use for standard counting.
*   **\`long long\`:** Massive numbers. Use for sums and large math in DSA.
*   **\`double\`:** Decimals. Avoid \`==\` comparisons due to precision limits.
*   **\`char\`:** Single quotes \`'A'\`. It's actually an integer under the hood.
*   **\`std::string\`:** Double quotes \`"Text"\`. Requires \`<string>\`.
*   **Overflow:** exceeding max value wraps to negative. Huge source of bugs.
*   **Unsigned:** Positive only. Avoid mixing with signed ints.
*   **Cast:** Use \`static_cast<new_type>(value)\`.
`,
  cheatSheet: `
| Type | Keyword | Example |
|---|---|---|
| Boolean | \`bool\` | \`bool flag = true;\` |
| Character | \`char\` | \`char grade = 'A';\` |
| Integer | \`int\` | \`int score = -10;\` |
| Large Int | \`long long\`| \`long long money = 1e12;\` |
| Decimal | \`double\` | \`double pi = 3.14;\` |
| String | \`std::string\`| \`std::string s = "Hi";\` |
| Cast | \`static_cast\`| \`static_cast<int>(3.14)\` |
`,
  resources: [
    {
      title: 'LearnCpp: Fundamental data types',
      url: 'https://www.learncpp.com/cpp-tutorial/fundamental-data-types/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Excellent overview of sizes, ranges, and types.'
    },
    {
      title: 'cppreference: Fundamental types',
      url: 'https://en.cppreference.com/w/cpp/language/types',
      type: 'ARTICLE',
      priority: 'A',
      description: 'Official standard specification.'
    }
  ]
};
