import { TopicContent } from './types';

export const topic37: TopicContent = {
  title: 'Time Complexity',
  learningContent: `
# What is Time Complexity?
In Data Structures and Algorithms (DSA), it is not enough to write code that produces the correct output. You must write code that runs *efficiently*. 

Time Complexity is a mathematical way of describing **how the runtime of an algorithm grows as the size of the input grows**.

We do not measure efficiency in seconds or milliseconds, because that depends on how fast your CPU is. Instead, we measure it in **"operations performed"** relative to the input size, $N$.

## 1. Big-O Notation (The Worst Case)
Big-O Notation, written as $O(f(N))$, describes the **upper bound** or the **worst-case scenario** of an algorithm. 
When interviewing, unless specified otherwise, you are always discussing Big-O.

### Rules of Big-O:
1.  **Drop Constants:** $O(5N)$ becomes $O(N)$. $O(N / 2)$ becomes $O(N)$. We only care about the *shape* of the growth curve, not the exact angle.
2.  **Drop Smaller Terms:** $O(N^2 + 500N + 9999)$ becomes $O(N^2)$. As $N$ approaches infinity, the $N^2$ term completely dominates the smaller terms.

## 2. Common Complexities (Fastest to Slowest)

### $O(1)$ - Constant Time
The execution time does not change, regardless of how massive $N$ gets.
*   **Examples:** Accessing an array by index (\`arr[5]\`), pushing to a vector (amortized), looking up a key in a hash map.

### $O(\\log N)$ - Logarithmic Time
The input size is repeatedly halved (or divided by some constant). This is incredibly fast. Even if $N = 1,000,000,000$, it takes at most ~30 steps.
*   **Examples:** Binary Search, inserting into a Red-Black Tree (\`std::set\`).

### $O(N)$ - Linear Time
The time grows directly proportional to the input. If the input doubles, the time doubles.
*   **Examples:** A single \`for\` loop iterating over an array. Linear search.

### $O(N \\log N)$ - Linearithmic Time
The standard time for the fastest general-purpose sorting algorithms.
*   **Examples:** \`std::sort\` (Mergesort / Quicksort).

### $O(N^2)$ - Quadratic Time
The time grows as the square of the input. Usually the result of a nested loop checking every pair of elements. Unacceptably slow if $N > 10,000$.
*   **Examples:** Bubble Sort, Insertion Sort, brute-force pair checking.

### $O(2^N)$ - Exponential Time
The time doubles with every single addition to the input. Terrifyingly slow. Only feasible if $N < 25$.
*   **Examples:** Brute-force recursion exploring all subsets/combinations without memoization.

## 3. Practical Analysis (Don't just count loops!)
Do not fall into the trap of blindly saying "One loop is $O(N)$, two nested loops is $O(N^2)$". **Look at the actual work performed.**

\`\`\`cpp
// Example 1: O(N)
for (int i = 0; i < N; i++) {
    // Does O(1) work N times. Total: O(N)
}

// Example 2: O(N^2)
for (int i = 0; i < N; i++) {
    for (int j = 0; j < N; j++) {
        // Does O(1) work N * N times. Total: O(N^2)
    }
}

// Example 3: O(N log N)
for (int i = 0; i < N; i++) {
    for (int j = 1; j < N; j *= 2) {
        // The inner loop doubles 'j', so it only runs log(N) times.
        // Outer loop runs N times. Total: O(N log N)
    }
}
\`\`\`
`,
  fullNotes: `
# Time Complexity Reference

## 1. The Three Asymptotic Bounds
While Big-O is the most common, there are technically three mathematical bounds:
*   **Big-O $O(f(N))$:** The Upper Bound. The algorithm will take *at most* this amount of time (Worst Case).
*   **Big-Omega $\\Omega(f(N))$:** The Lower Bound. The algorithm will take *at least* this amount of time (Best Case).
*   **Big-Theta $\\Theta(f(N))$:** The Tight Bound. The algorithm is sandwiched between an upper and lower bound that grow at the exact same rate.

## 2. Amortized Complexity
Sometimes an operation is usually very fast ($O(1)$), but occasionally very slow ($O(N)$). 
For example, calling \`push_back()\` on a \`std::vector\` is usually instant. But when the vector runs out of capacity, it must allocate a new array and copy all $N$ elements over (taking $O(N)$ time). 
However, because it doubles the capacity every time it copies, the expensive $O(N)$ operation happens so rarely that if you average the total cost over thousands of pushes, the average cost per push is just $O(1)$. We call this **Amortized $O(1)$**.

## 3. The 10^8 Rule of Thumb (CRITICAL FOR CP)
In competitive programming, a standard C++ program can perform roughly **$10^8$ operations per second**.
When you read a problem, look at the constraints for $N$. You can reverse-engineer the required Big-O complexity!

*   If $N \\le 10^8$, you must write an $O(N)$ or $O(1)$ solution.
*   If $N \\le 10^5$, you can write an $O(N \\log N)$ solution (Sorting is allowed).
*   If $N \\le 10^4$, you can write an $O(N^2)$ solution (Nested loops are allowed).
*   If $N \\le 500$, you can write an $O(N^3)$ solution.
*   If $N \\le 20$, you can write an $O(2^N)$ solution (Recursion/Backtracking).

## 4. Interview Relevance
*   **Q:** What is the difference between Worst Case, Average Case, and Best Case time complexity?
    *   **A:** Worst-case (Big-O) is the maximum theoretical time an algorithm takes for the most difficult input arrangement. Average-case is the expected time for a randomized/typical input. Best-case (Big-Omega) is the minimum theoretical time for the easiest possible input (e.g., Insertion Sort on an already-sorted array is $O(N)$).
*   **Q:** Why do we drop constants in Big-O notation?
    *   **A:** Big-O measures the *growth rate* as input size scales to infinity. Hardware differences (CPU speed, caching) affect the constant factors heavily, making them unreliable for mathematical comparison. An $O(N)$ algorithm will always eventually out-perform an $O(N^2)$ algorithm for a large enough $N$, regardless of the constant multipliers.
`,
  shortNotes: `
*   **Time Complexity:** Measures how runtime scales with input size $N$.
*   **Big-O Notation:** The worst-case upper bound.
*   **Rules:** Drop constants ($O(5N) \\rightarrow O(N)$). Drop non-dominant terms ($O(N^2 + N) \\rightarrow O(N^2)$).
*   **$O(1)$:** Constant. Instant array lookups, hash maps.
*   **$O(\\log N)$:** Logarithmic. Binary search, balanced trees.
*   **$O(N)$:** Linear. Single loop traversal.
*   **$O(N \\log N)$:** Linearithmic. Sorting algorithms.
*   **$O(N^2)$:** Quadratic. Standard nested loops.
*   **Amortized:** An operation that is occasionally slow ($O(N)$) but mathematically averages out to being fast ($O(1)$) over many calls (e.g., \`vector::push_back\`).
*   **Rule of Thumb:** Modern CPUs do $\\sim 10^8$ operations per second.
`,
  cheatSheet: `
| Complexity | Name | Max $N$ for 1 sec | Example |
|---|---|---|---|
| $O(1)$ | Constant | Any | \`arr[i]\` |
| $O(\\log N)$ | Logarithmic | $10^{18}$ | Binary Search |
| $O(N)$ | Linear | $10^8$ | 1D Array scan |
| $O(N \\log N)$ | Linearithmic | $10^5$ | \`std::sort\` |
| $O(N^2)$ | Quadratic | $10^4$ | Nested loops |
| $O(N^3)$ | Cubic | $500$ | 3 Nested loops |
| $O(2^N)$ | Exponential | $20$ | Subsets (Recursion) |
| $O(N!)$ | Factorial | $11$ | Permutations |
`,
  resources: [
    {
      title: 'HackerEarth: Time Complexity Analysis',
      url: 'https://www.hackerearth.com/practice/basic-programming/complexity-analysis/time-and-space-complexity/tutorial/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'A fantastic, practical guide to calculating Big O.'
    }
  ]
};
