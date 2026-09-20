import { TopicContent } from './types';

export const topic36: TopicContent = {
  title: 'Complexity fundamentals',
  learningContent: `
# Algorithmic Complexity (Big-O Notation)
In software engineering and interviews, it's not enough that your code works. It must run efficiently. We use **Big-O Notation** to describe how an algorithm's runtime or memory usage grows as the input size ($N$) grows to infinity.

Big-O focuses on the **Worst-Case Scenario**. We drop constants and smaller terms. If an algorithm takes $3N^2 + 5N + 10$ steps, we simply call it **$O(N^2)$**.

## 1. Common Time Complexities (From fastest to slowest)

*   **$O(1)$ - Constant Time:** The operation takes the exact same amount of time regardless of how big the data is.
    *   *Examples:* \`v[5]\` (Array access), Hash map lookup, \`queue.push()\`.
*   **$O(\\log N)$ - Logarithmic Time:** The data is halved at every step. Incredibly fast. Even for $N = 1,000,000,000$, it takes only ~30 steps!
    *   *Examples:* Binary Search (\`lower_bound\`), \`std::set\` and \`std::map\` operations, Priority Queue \`push/pop\`.
*   **$O(N)$ - Linear Time:** You must look at every element exactly once (or a constant number of times).
    *   *Examples:* A single \`for\` loop over an array. Finding the max element.
*   **$O(N \\log N)$ - Linearithmic Time:** The standard benchmark for an efficient complex algorithm.
    *   *Examples:* \`std::sort\` (Mergesort, Quicksort, Introsort).
*   **$O(N^2)$ - Quadratic Time:** Usually the result of a nested loop. Feasible for $N < 10,000$, but will crash/timeout for larger data.
    *   *Examples:* Bubble sort, checking every pair in an array.
*   **$O(2^N)$ - Exponential Time:** Terrifyingly slow. Feasible only for $N < 25$.
    *   *Examples:* Unoptimized recursion, trying every possible subset.

## 2. Space Complexity (Auxiliary Space)
Time complexity measures speed. **Space complexity** measures how much *extra RAM* your algorithm needs, excluding the input array itself.
*   If you just use a few \`int\` variables to solve the problem, space is $O(1)$.
*   If you create a completely new copy of an array of size $N$, space is $O(N)$.
*   If you build a 2D matrix of size $N \\times N$, space is $O(N^2)$.

## 3. Best, Average, Worst, and Amortized
*   **Worst-case (Big-O):** The absolute longest the algorithm could take (e.g., Unordered Map hash collisions -> $O(N)$).
*   **Average-case:** What usually happens in the real world (e.g., Unordered Map lookup -> $O(1)$).
*   **Amortized:** An operation that is occasionally very slow, but mathematically averages out to being fast over time. (e.g., \`vector::push_back\` is $O(N)$ when it reallocates, but amortized $O(1)$ over millions of pushes).

## DSA CONNECTION
In competitive programming, the problem description gives you the maximum value of $N$. You must use this to reverse-engineer what Big-O complexity your solution is allowed to be! (A computer roughly executes $10^8$ operations per second).
*   $N = 10^5$: You must write $O(N \\log N)$ or $O(N)$.
*   $N = 1000$: You can write $O(N^2)$.
*   $N = 20$: You can write $O(2^N)$ recursion.
`,
  fullNotes: `
# Master STL Complexity Table

When interviewing, you MUST know these guarantees for C++ STL containers.

| Container / Operation | Random Access | Insert/Erase Front | Insert/Erase Back | Insert/Erase Middle | Search / Lookup |
|---|---|---|---|---|---|
| **vector** | $O(1)$ | $O(N)$ | Amortized $O(1)$ | $O(N)$ | $O(N)$ |
| **deque** | $O(1)$ | $O(1)$ | $O(1)$ | $O(N)$ | $O(N)$ |
| **list** | $O(N)$ | $O(1)$ | $O(1)$ | $O(1)$ (if iter known) | $O(N)$ |
| **set / map** | N/A | N/A | N/A | $O(\\log N)$ | $O(\\log N)$ |
| **unordered_map** | N/A | N/A | N/A | Avg $O(1)$, Worst $O(N)$ | Avg $O(1)$, Worst $O(N)$|
| **priority_queue** | N/A | N/A | $O(\\log N)$ (push/pop) | N/A | $O(1)$ (top only) |

## Master Container Selection Guide
*   **Need dynamic contiguous sequence:** \`std::vector\`
*   **Need fixed-size array semantics:** \`std::array\`
*   **Need efficient operations at both ends:** \`std::deque\`
*   **Need LIFO:** \`std::stack\`
*   **Need FIFO:** \`std::queue\`
*   **Need priority ordering:** \`std::priority_queue\`
*   **Need sorted unique elements:** \`std::set\`
*   **Need sorted key-value pairs:** \`std::map\`
*   **Need hash-based key-value lookup:** \`std::unordered_map\`
*   **Need hash-based unique membership:** \`std::unordered_set\`

## The "Two Loops" Trap
A very common mistake beginners make is assuming that *any* two nested loops equals $O(N^2)$. This is false. You must analyze the actual iteration behavior.
\`\`\`cpp
for (int i = 0; i < N; i++) {
    for (int j = i; j < N; j++) { ... } // Still O(N^2), doing ~ N^2 / 2 work.
}

for (int i = 0; i < N; i++) {
    for (int j = 1; j < N; j *= 2) { ... } // O(N log N) ! The inner loop doubles.
}

// Two Pointers technique
int right = 0;
for (int left = 0; left < N; left++) {
    while (right < N && condition) {
        right++;
    }
} // O(N)! 'right' only traverses the array ONCE across all 'left' iterations.
\`\`\`
`,
  shortNotes: `
*   **Big-O:** Measures worst-case Time and Space growth relative to input size $N$. Drops constants ($2N \\rightarrow O(N)$).
*   **$O(1)$:** Instant. Array lookup, Math math, Map lookup.
*   **$O(\\log N)$:** Tree height / Binary Search. Extremely fast.
*   **$O(N)$:** Linear scan. A single loop.
*   **$O(N \\log N)$:** Standard sorting speed.
*   **$O(N^2)$:** Nested loops. Too slow for arrays $> 10,000$.
*   **Amortized:** Averages out to be fast (e.g., \`vector::push_back\` is amortized $O(1)$).
*   **Space Complexity:** Extra memory used (not counting the input array).
`,
  cheatSheet: `
| Input Size (N) | Allowed Complexity |
|---|---|
| $N \\le 10^8$ | $O(N)$ or $O(1)$ |
| $N \\le 10^5$ | $O(N \\log N)$ (Sort) |
| $N \\le 10^4$ | $O(N^2)$ (Nested Loop) |
| $N \\le 500$ | $O(N^3)$ |
| $N \\le 20$ | $O(2^N)$ (Recursion) |
| $N \\le 10$ | $O(N!)$ (Permutations) |
`,
  resources: [
    {
      title: 'LearnCpp: Introduction to Big O notation',
      url: 'https://www.learncpp.com/cpp-tutorial/introduction-to-big-o-notation/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'A great primer on time complexity.'
    }
  ]
};
