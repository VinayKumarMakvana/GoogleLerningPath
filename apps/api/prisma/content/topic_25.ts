import { TopicContent } from './types';

export const topic25: TopicContent = {
  title: 'stack',
  learningContent: `
# What is std::stack?
A \`stack\` is a data structure that follows the **LIFO (Last In, First Out)** principle.
Imagine a stack of plates in a cafeteria: you can only add a plate to the top of the stack, and you can only remove a plate from the top.

## 1. Container Adaptor
In C++, \`std::stack\` is not actually a core data structure. It is a **Container Adaptor**. 
Under the hood, it just wraps a \`std::deque\` (by default) and restricts its interface. It *hides* operations like \`push_front\` and \`operator[]\` so that you are mathematically forced to use it as a LIFO stack.

## 2. Core Operations (All $O(1)$)
\`\`\`cpp
#include <stack>
using namespace std;

stack<int> st;

st.push(10); // [10]
st.push(20); // [10, 20]
st.push(30); // [10, 20, 30]

cout << st.top();   // 30 (Looks at the top element, DOES NOT remove it)
cout << st.size();  // 3

st.pop();           // Removes 30. (Does NOT return the value, returns void)
cout << st.top();   // 20
\`\`\`
> **Trap:** In C++, \`pop()\` does NOT return the removed element. If you want the value and want to remove it, you must call \`top()\` first, save the value, and then call \`pop()\`.

## 3. Iteration? NO.
You **cannot** iterate through a stack. There is no \`begin()\` or \`end()\`. You can only ever look at the \`top()\` element. If you need to search through the elements, you shouldn't be using a stack; you should use a vector.

## DSA CONNECTION
Stacks are incredibly powerful in algorithm design.
*   **Valid Parentheses:** When you see a \`(\`, push it. When you see a \`)\`, check if the \`top()\` is a matching \`(\`, then \`pop()\`.
*   **Undo Mechanisms:** Tracking history of operations.
*   **Expression Evaluation:** Reverse Polish Notation (Postfix) calculators.
*   **Depth-First Search (DFS):** While recursion uses the hardware call stack, you can write an iterative DFS using a \`std::stack\`.
*   **Monotonic Stack (Advanced):** Maintaining a stack that is always sorted to solve "Next Greater Element" problems in $O(N)$ time.
`,
  fullNotes: `
# std::stack Reference

## 1. Changing the Underlying Container
Because it is just an adaptor, you can tell it to use a \`std::vector\` or a \`std::list\` under the hood instead of a \`std::deque\`.
\`\`\`cpp
#include <vector>
#include <stack>

// A stack powered by a vector
std::stack<int, std::vector<int>> myStack;
\`\`\`
Using a \`vector\` as the underlying container is often slightly faster than \`deque\` due to perfect cache locality, though the difference is negligible for most interview problems.

## 2. Emplace vs Push
Like vectors, stacks have an \`emplace()\` method that constructs the object in-place directly on the top of the stack, avoiding a copy operation for complex objects.

## 3. Empty Checks
Always check if a stack is empty before calling \`top()\` or \`pop()\`.
\`\`\`cpp
if (!st.empty()) {
    cout << st.top();
    st.pop();
}
\`\`\`
Calling \`top()\` on an empty stack results in Undefined Behavior (usually a segmentation fault).

## 4. Interview Relevance
*   **Q:** Why does \`pop()\` in C++ return \`void\` instead of returning the popped value like in Java/Python?
    *   **A:** Exception safety. If \`pop()\` were to return the value by value, it would have to invoke a copy constructor. If that copy constructor threw an exception (e.g., out of memory), the element would already be removed from the stack, but the caller never received it—the data is lost forever. Separating the operations into \`top()\` (read) and \`pop()\` (remove) guarantees no data loss if exceptions occur.
`,
  shortNotes: `
*   **LIFO:** Last In, First Out.
*   **Adaptor:** Wraps a \`deque\` (by default) to restrict operations.
*   **No Iteration:** You cannot loop through a stack.
*   **$O(1)$ Operations:** \`push()\`, \`pop()\`, \`top()\`, \`empty()\`, \`size()\`.
*   **\`pop()\` Trap:** \`pop()\` returns \`void\`. You must call \`top()\` to see the value before popping!
*   **DSA Uses:** Valid Parentheses, Iterative DFS, Next Greater Element (Monotonic Stack).
`,
  cheatSheet: `
| Operation | Code | Complexity | Note |
|---|---|---|---|
| Add | \`st.push(x)\` | $O(1)$ | |
| View Top | \`st.top()\` | $O(1)$ | Crashes if empty! |
| Remove Top| \`st.pop()\` | $O(1)$ | Returns \`void\` |
| Is Empty? | \`st.empty()\` | $O(1)$ | |
| Size | \`st.size()\` | $O(1)$ | |
`,
  resources: [
    {
      title: 'cppreference: std::stack',
      url: 'https://en.cppreference.com/w/cpp/container/stack',
      type: 'ARTICLE',
      priority: 'S',
      description: 'API reference for the stack adaptor.'
    }
  ]
};
