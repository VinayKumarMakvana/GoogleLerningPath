import { TopicContent } from './types';

export const topic35: TopicContent = {
  title: 'Lambdas',
  learningContent: `
# What is a Lambda?
A lambda is an **anonymous, inline function**.
Instead of writing a separate, named function outside of \`main()\`, you can define a small, throw-away function right exactly where you need to use it.

Lambdas are heavily used in modern C++ to pass custom logic to STL algorithms like \`std::sort\` or \`std::count_if\`.

## 1. The Anatomy of a Lambda
\`\`\`cpp
[captures] (parameters) -> return_type { 
    // function body
}
\`\`\`
*   **\`[ ]\` Capture Clause:** Allows the lambda to "see" variables from the surrounding scope.
*   **\`( )\` Parameters:** Exactly like normal function arguments.
*   **\`-> type\` Return Type:** Usually omitted, the compiler can automatically deduce it.
*   **\`{ }\` Body:** The actual code.

## 2. Basic Example: Custom Sorting
Imagine you want to sort a vector of integers in *descending* order.
\`\`\`cpp
vector<int> v = {1, 5, 3, 9};

// Using a lambda as a custom comparator
sort(v.begin(), v.end(), [](int a, int b) {
    return a > b; // Sort descending
});
\`\`\`
The lambda \`[](int a, int b) { return a > b; }\` acts exactly like passing a standalone function, but it's much cleaner to read inline.

## 3. The Capture Clause \`[ ]\`
Normally, a function cannot access local variables from the function that called it. A lambda can, if you **capture** them.

*   **\`[ ]\`**: Capture nothing.
*   **\`[x]\`**: Capture \`x\` by **value** (read-only copy).
*   **\`[&x]\`**: Capture \`x\` by **reference** (allows modifying the original \`x\`).
*   **\`[=]\`**: Capture *everything* used in the lambda by value.
*   **\`[&]\`**: Capture *everything* used in the lambda by reference.

\`\`\`cpp
int limit = 10;
int count = 0;

// Count how many numbers are > limit
for_each(v.begin(), v.end(), [&count, limit](int val) {
    if (val > limit) {
        count++; // We can modify count because it was captured by &
    }
});
\`\`\`

## DSA CONNECTION
*   **Sorting Arrays of Objects/Pairs:** When you have a \`vector<pair<int, int>>\`, and you need to sort by the *second* element, a lambda is the fastest and cleanest way to do it.
*   **Custom Priority Queues:** While slightly tricky syntax, lambdas are used to define custom Min/Max heap logic.
`,
  fullNotes: `
# Lambdas Reference

## 1. Sorting Custom Structs
In DSA, you frequently need to sort custom data.
\`\`\`cpp
struct Interval { int start, end; };
vector<Interval> intervals = {{1, 3}, {2, 6}, {8, 10}};

// Sort intervals primarily by start time. If tied, sort by end time descending.
sort(intervals.begin(), intervals.end(), [](const Interval& a, const Interval& b) {
    if (a.start != b.start) return a.start < b.start;
    return a.end > b.end;
});
\`\`\`
*Notice the parameters are passed as \`const Interval&\` to prevent copying large objects, just like a normal function!*

## 2. The \`mutable\` Keyword
By default, variables captured by value (e.g., \`[x]\`) are \`const\` inside the lambda body. You cannot modify your local copy of them. If you absolutely need to modify the local copy without modifying the original, you must use the \`mutable\` keyword.
\`\`\`cpp
int x = 5;
auto myLambda = [x]() mutable {
    x++; // Allowed because of 'mutable'. (Does NOT affect the original x outside)
};
\`\`\`

## 3. Assigning Lambdas to Variables
You can save a lambda to a variable using \`auto\` and call it later like a normal function. This is useful for writing clean recursive DFS functions inside \`main()\`.
\`\`\`cpp
auto add = [](int a, int b) { return a + b; };
cout << add(5, 3); // 8
\`\`\`

## 4. Interview Relevance
*   **Q:** Explain the difference between \`[=]\` and \`[&]\` in a lambda capture list.
    *   **A:** \`[=]\` captures all referenced variables from the enclosing scope by value (read-only copies). \`[&]\` captures all referenced variables by reference, allowing the lambda to modify the original variables and avoid copy overhead. Use \`[&]\` with extreme caution if the lambda outlives the current scope (e.g., passing it to another thread), as it will result in dangling references.
`,
  shortNotes: `
*   **Lambda:** Anonymous, inline function. Great for custom sorting.
*   **Syntax:** \`[captures](params) { body; }\`
*   **Captures:** How the lambda accesses variables outside its scope.
    *   \`[x]\` -> Read-only copy of x.
    *   \`[&x]\` -> Modifiable reference to x.
    *   \`[&]\` -> Catch-all reference for everything.
*   **Comparator usage:** \`sort(v.begin(), v.end(), [](int a, int b) { return a > b; });\`
*   **Efficiency:** Always pass objects/strings into lambda parameters via \`const&\` just like normal functions.
`,
  cheatSheet: `
| Capture | Meaning |
|---|---|
| \`[]\` | Access nothing outside |
| \`[x, &y]\` | \`x\` by value, \`y\` by reference |
| \`[=]\` | Everything by value (copy) |
| \`[&]\` | Everything by reference |

| Example | Code |
|---|---|
| Custom Sort | \`sort(v.begin(), v.end(), [](int a, int b){ return a > b; });\` |
| Count If | \`count_if(v.begin(), v.end(), [](int x){ return x%2==0; });\` |
`,
  resources: [
    {
      title: 'LearnCpp: Introduction to lambdas',
      url: 'https://www.learncpp.com/cpp-tutorial/introduction-to-lambdas-anonymous-functions/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Excellent breakdown of lambda anatomy and captures.'
    }
  ]
};
