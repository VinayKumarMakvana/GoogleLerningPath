import { TopicContent } from './types';

export const topic7: TopicContent = {
  title: 'Loops',
  learningContent: `
# Loops (Iteration)
Loops execute a block of code multiple times until a specific condition is met.

## 1. The \`while\` Loop
Executes as long as the condition is \`true\`. Used when you don't know exactly how many times you need to loop.
\`\`\`cpp
int count = 0;
while (count < 5) {
    cout << count << " ";
    count++; // CRITICAL: don't forget to update the condition!
}
\`\`\`

## 2. The \`for\` Loop
Best when you know exactly how many times to loop (e.g., iterating through an array).
\`\`\`cpp
for (int i = 0; i < 5; i++) {
    cout << i << " ";
}
\`\`\`
It has three parts:
1.  **Initialization:** \`int i = 0\` (runs once).
2.  **Condition:** \`i < 5\` (checked before every iteration).
3.  **Update:** \`i++\` (runs at the end of every iteration).

## 3. Range-based \`for\` Loop (C++11)
The easiest way to loop over collections like arrays or vectors.
\`\`\`cpp
int numbers[] = {1, 2, 3, 4};
for (int num : numbers) {
    cout << num << " ";
}
\`\`\`

## 4. \`break\` and \`continue\`
*   **\`break\`**: Immediately exits the entire loop.
*   **\`continue\`**: Skips the rest of the *current* iteration and jumps straight to the update step (in a for loop) or condition check (in a while loop).

## Common Mistakes
*   **Infinite Loops:** Forgetting to update the loop variable (e.g., forgetting \`count++\` in a while loop).
*   **Off-by-One Errors:** Using \`i <= size\` instead of \`i < size\` when iterating through an array. (Arrays are 0-indexed, so an array of size 5 has indices 0, 1, 2, 3, 4. Index 5 is out of bounds!).

## DSA CONNECTION
Loops are the engine of algorithms.
*   **Array Traversal:** \`for (int i = 0; i < n; i++)\` is the foundation of almost every array problem.
*   **Two Pointers:** \`while (left < right)\` is used to search or reverse data from both ends.
*   **Time Complexity (Big O):** A single loop iterating \`n\` times is typically $O(n)$ time. Nested loops (a loop inside a loop) are typically $O(n^2)$ time. In competitive programming, $O(n^2)$ is usually too slow if $n > 10^4$.
`,
  fullNotes: `
# Loops Reference

## 1. \`while\` vs \`do-while\`
*   **\`while (condition)\`:** Checks condition *before* executing the block. May run 0 times.
*   **\`do { ... } while (condition);\`:** Executes the block first, then checks the condition. Guaranteed to run at least 1 time. (Don't forget the semicolon at the end!).

## 2. \`for\` Loop Anatomy
\`for (init-statement; condition; iteration_expression)\`
*   Variables declared in the init-statement only exist inside the loop's scope.
*   Any of the three parts can be omitted (e.g., \`for(;;)\` is an infinite loop).

## 3. Range-Based For Loop
*   \`for (type element : container)\`
*   Pass by value: \`for (int x : arr)\` (copies elements).
*   Pass by reference: \`for (int& x : arr)\` (allows modifying the actual elements in the container).
*   Pass by const reference: \`for (const int& x : arr)\` (fastest for reading large objects, prevents modification).

## 4. Interview Relevance
*   **Q:** What is an off-by-one error?
    *   **A:** A logic error where a loop iterates one time too many or one time too few, commonly occurring due to confusion between \`<\` and \`<=\` when working with 0-indexed structures like arrays.
*   **Q:** When would you use a \`while\` loop instead of a \`for\` loop?
    *   **A:** Use a \`for\` loop when the number of iterations is known ahead of time (like iterating over an array). Use a \`while\` loop when iterating until a specific event or condition occurs (like reading input until EOF).
`,
  shortNotes: `
*   **\`while\`**: Loops while condition is true. Use when iterations are unknown.
*   **\`for\`**: \`for(init; condition; update)\`. Use for counting/arrays.
*   **Range \`for\`**: \`for(int x : arr)\`. Easiest way to read collections. Use \`for(int& x : arr)\` to modify.
*   **\`break\`**: Exits loop entirely.
*   **\`continue\`**: Skips to the next iteration.
*   **Infinite Loop**: Usually caused by forgetting to update the condition variable.
*   **Off-by-one**: Arrays are 0-indexed. Use \`i < size\`, NOT \`i <= size\`.
`,
  cheatSheet: `
| Loop Type | Syntax / Example |
|---|---|
| For | \`for (int i=0; i<10; i++) {}\` |
| While | \`while (x > 0) { x--; }\` |
| Do-While | \`do { ... } while (cond);\` |
| Range-For | \`for (int val : array) {}\` |
| Break | \`break;\` (Exits loop) |
| Continue | \`continue;\` (Skips to next iter) |
`,
  resources: [
    {
      title: 'LearnCpp: For statements',
      url: 'https://www.learncpp.com/cpp-tutorial/for-statements/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Deep dive into how for loops work.'
    }
  ]
};
