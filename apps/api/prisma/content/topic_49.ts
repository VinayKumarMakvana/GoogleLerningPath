import { TopicContent } from './types';

export const topic49: TopicContent = {
  title: 'Stack Fundamentals',
  learningContent: `
# The Stack Abstraction
A **Stack** is an abstract data structure that follows the **LIFO (Last In, First Out)** principle.
Imagine a physical stack of plates: you can only place a new plate on the top, and you can only take a plate off the top. You cannot remove a plate from the middle without knocking the stack over.

*(Note: Topic 25 covered the syntax of \`std::stack\`. This topic covers the algorithmic theory and DSA applications).*

## 1. Core Operations
Any stack must support these operations, all in **$O(1)$ time**:
*   **Push:** Add an element to the top.
*   **Pop:** Remove the element from the top.
*   **Peek / Top:** Look at the top element without removing it.

## 2. Implementation Concepts
Because a Stack is just an "abstraction" (a set of rules), it can be physically implemented using different underlying data structures:
*   **Array / Vector implementation:** You keep an array and an integer \`top_index\`. \`push\` inserts at \`arr[++top_index]\`. \`pop\` simply does \`top_index--\`. Extremely fast due to cache locality.
*   **Linked List implementation:** You maintain a \`head\` pointer. \`push\` inserts a new node at the head. \`pop\` removes the node at the head. Useful if you need a stack that can grow infinitely without ever reallocating memory.

## 3. RECOGNITION: When to use a Stack
You should immediately think of a Stack when:
*   The problem involves **Nested structures** (like parentheses, HTML tags, or folders).
*   You need to process a sequence and occasionally **Undo** or go backwards.
*   You are asked to evaluate **Mathematical Expressions** (like a calculator).
*   You need to keep track of a "history" of states.

## 4. Classic Application: Valid Parentheses
Problem: Given a string of brackets \`"{ [ ( ) ] }"\`, is it valid?
Every time you see an opening bracket \`{\`, \`[\`, \`(\`, you **Push** it onto the stack.
Every time you see a closing bracket, you **Peek** at the stack. If the top of the stack is the matching opening bracket, you **Pop** it. If it doesn't match, or the stack is empty, the string is invalid.
`,
  fullNotes: `
# Stack Abstraction Reference

## 1. Recursion Simulation
Under the hood, every programming language uses a Stack (the Call Stack) to manage function calls and recursion. When a function calls itself, the local variables are pushed onto the Call Stack. When it returns, they are popped.
**If an interview prohibits recursion, you can ALWAYS rewrite a recursive algorithm into an iterative one by manually creating a \`std::stack\` and pushing/popping your variables into it.** This is a frequent requirement for Depth-First Search (DFS) on trees and graphs.

## 2. The Monotonic Stack (Advanced Pattern Preview)
A Monotonic Stack is a stack whose elements are always kept strictly sorted (either always increasing or always decreasing).
If you push a new element that breaks the sorting rule, you must \`pop()\` elements off the stack until the rule is satisfied again.

**Example Use Case: "Next Greater Element"**
Given an array \`[2, 1, 5, 3]\`, find the next larger number to the right of each element.
A brute force nested loop takes $O(N^2)$.
By using a Monotonic Stack, you can process the array in exactly **$O(N)$ time**. 
*(This is a highly advanced pattern that will be covered deeply in the Practice Engine, but you must know it exists!)*

## 3. Interview Relevance
*   **Q:** Why might you implement a Stack using an Array instead of a Linked List?
    *   **A:** Arrays provide contiguous memory, meaning pushing and popping benefit from CPU cache pre-fetching, resulting in much faster real-world execution. Linked Lists require a slow heap allocation (\`new Node\`) for every single push.
*   **Q:** What happens if you call \`pop()\` on an empty stack?
    *   **A:** It results in a Stack Underflow, which in C++ causes Undefined Behavior (usually a fatal crash). You must always check \`if (!stack.empty())\` before popping.
`,
  shortNotes: `
*   **Concept:** LIFO (Last In, First Out). The last element added is the first one removed.
*   **Operations:** \`Push\` (add), \`Pop\` (remove), \`Top\` (view). All must be $O(1)$ time.
*   **Implementations:** Can be built using an Array (faster, contiguous) or a Linked List (dynamic, no reallocation).
*   **Primary Uses:** Validating nested structures (Parentheses), undo mechanisms, Depth-First Search (DFS), evaluating expressions (Postfix/Prefix).
*   **Monotonic Stack:** A stack kept strictly sorted to solve "Next Greater/Smaller Element" problems in $O(N)$ time.
*   **Trap:** Always check if the stack is empty before calling \`top()\` or \`pop()\`.
`,
  cheatSheet: `
| Operation | Complexity | Description |
|---|---|---|
| \`Push\` | $O(1)$ | Add to top |
| \`Pop\` | $O(1)$ | Remove from top |
| \`Top / Peek\` | $O(1)$ | Look at top |

**Recognition Clues:**
*   "Valid Parentheses"
*   "Reverse Polish Notation"
*   "Undo history"
*   "Next Greater Element" (Monotonic Stack)
`,
  resources: [
    {
      title: 'GeeksForGeeks: Stack Data Structure',
      url: 'https://www.geeksforgeeks.org/stack-data-structure/',
      type: 'ARTICLE',
      priority: 'A',
      description: 'Comprehensive overview of Stack theory and applications.'
    }
  ]
};
