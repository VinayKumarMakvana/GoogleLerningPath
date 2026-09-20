import { TopicContent } from './types';

export const topic38: TopicContent = {
  title: 'Space Complexity',
  learningContent: `
# What is Space Complexity?
While Time Complexity measures how long an algorithm takes to run, **Space Complexity** measures how much RAM (memory) an algorithm uses as the input size $N$ grows.

Just like Time Complexity, it is expressed using **Big-O Notation**.

## 1. Total Space vs Auxiliary Space
When interviews ask for "Space Complexity", they are almost always asking for **Auxiliary Space**.

*   **Input Space:** The memory required just to hold the data the user passed to your function (e.g., the \`vector<int>& nums\` array).
*   **Auxiliary Space (Important):** The *extra* temporary memory your algorithm creates to solve the problem (e.g., creating a hash map, creating a temporary array, or recursive function calls).
*   **Total Space:** Input Space + Auxiliary Space.

If a problem asks you to solve it in **$O(1)$ space**, it means you are not allowed to create any data structures whose size depends on $N$. You must solve it **in-place** using only a few primitive variables (like \`int i\`, \`int max_val\`).

## 2. Common Space Complexities

### $O(1)$ - Constant Space
You only use a fixed number of variables. It does not matter if $N$ is 10 or 1,000,000.
*   **Example:** Finding the maximum value in an array. You only need one \`int\` variable to keep track of the max seen so far.
*   **Example:** Two-pointers technique. You just need \`left\` and \`right\` integer variables.

### $O(N)$ - Linear Space
You create a new data structure that scales perfectly with the input size.
*   **Example:** Storing frequency counts of the array in an \`unordered_map\`. 
*   **Example:** Reversing an array by creating a completely new blank vector of size $N$ and copying elements backwards into it. (Instead of swapping elements in-place which would be $O(1)$).

### $O(N^2)$ - Quadratic Space
You create a 2D matrix based on a 1D input.
*   **Example:** Creating a 2D DP (Dynamic Programming) table of size $N \\times N$.

## 3. The Hidden Cost: The Recursion Stack (CRITICAL)
This is the #1 reason candidates fail space complexity questions in interviews.

**Recursion is NOT free.** Every time a function calls itself, the computer allocates a "Stack Frame" in memory to hold the local variables and return address of that specific function call.
If your recursive function calls itself $N$ times before reaching the base case, there will be $N$ stack frames sitting in memory simultaneously. **This means the Space Complexity is $O(N)$, even if you didn't create a single array or map!**

## DSA CONNECTION
*   **Array Manipulation:** Interviewers will constantly ask you to optimize an $O(N)$ space solution down to $O(1)$ space by modifying the input array "in-place".
*   **Trees and Graphs:** The space complexity of a Depth-First Search (DFS) is bounded by the maximum depth of the recursion stack, which is $O(H)$ where $H$ is the height of the tree.
`,
  fullNotes: `
# Space Complexity Reference

## 1. Trade-offs: Time vs Space
In computer science, you can almost always sacrifice Space to gain Time, or sacrifice Time to gain Space.
*   **Example:** You have an array and need to answer 10,000 queries about whether a number exists in it.
    *   *Optimize for Space:* Use $O(1)$ space, but every query requires a linear scan ($O(N)$ time). Total Time: $O(Q \\times N)$.
    *   *Optimize for Time:* Dump the array into an \`unordered_set\` (Costs $O(N)$ auxiliary space), but now every query takes $O(1)$ time. Total Time: $O(N + Q)$.

## 2. In-Place Algorithms
An algorithm is considered **in-place** if it operates directly on the input data, requiring only $O(1)$ auxiliary memory space (or sometimes $O(\\log N)$ for recursion). 
For example, \`std::reverse\` swaps elements at opposite ends of the vector using a single temporary variable. This is $O(1)$ space. If it created a new vector to hold the reversed elements, it would be $O(N)$ space and no longer in-place.

## 3. Variables inside Loops
A common beginner confusion:
\`\`\`cpp
for (int i = 0; i < N; i++) {
    int temp = arr[i] * 2;
}
\`\`\`
Is the space complexity $O(N)$ because \`temp\` is created $N$ times? 
**No.** The variable \`temp\` is created, used, and immediately destroyed on every single iteration. At any given moment, there is only *one* \`temp\` variable alive in memory. The space complexity is $O(1)$.

## 4. Interview Relevance
*   **Q:** What is the space complexity of quicksort?
    *   **A:** While quicksort sorts the array in-place without creating auxiliary arrays, its space complexity is $O(\\log N)$ on average, and $O(N)$ in the worst case. This space is entirely consumed by the implicit recursion call stack.
*   **Q:** Can an algorithm have $O(1)$ time complexity but $O(N)$ space complexity?
    *   **A:** Mathematically impossible. If an algorithm allocates $O(N)$ space, it takes at least $O(N)$ time simply to ask the OS for that memory and initialize it. Time complexity must always be $\\ge$ Space complexity.
`,
  shortNotes: `
*   **Space Complexity:** Measures how much RAM an algorithm requires as $N$ grows.
*   **Total vs Auxiliary:** "Space Complexity" almost always refers to *Auxiliary Space* (the *extra* temporary memory you allocate, not the input data itself).
*   **$O(1)$ Space (In-Place):** You only use primitive variables (pointers, counters, flags). Memory usage does not grow with $N$.
*   **$O(N)$ Space:** Creating a new vector of size $N$, or using a hash map storing $N$ items.
*   **The Recursion Stack:** Recursive function calls consume physical memory for Stack Frames. A recursion depth of $N$ means $O(N)$ auxiliary space, even if no arrays are created.
*   **Trade-off:** We frequently use hash maps (costing $O(N)$ space) to reduce time complexity from $O(N^2)$ to $O(N)$.
`,
  cheatSheet: `
| Technique | Auxiliary Space | Note |
|---|---|---|
| In-place Swapping | $O(1)$ | Optimal |
| Two Pointers | $O(1)$ | Optimal |
| Iterative Traversal | $O(1)$ | Optimal |
| DFS (Recursion) | $O(H)$ | $H$ = height of recursion tree |
| Hash Map (Frequency) | $O(U)$ | $U$ = number of unique items |
| Creating a copy array| $O(N)$ | Sub-optimal |
| DP Matrix | $O(N \\times M)$| |
`,
  resources: [
    {
      title: 'GeeksForGeeks: Space Complexity',
      url: 'https://www.geeksforgeeks.org/g-fact-86/',
      type: 'ARTICLE',
      priority: 'A',
      description: 'Detailed explanation of Auxiliary vs Total space.'
    }
  ]
};
