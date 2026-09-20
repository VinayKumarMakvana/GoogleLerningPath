import { TopicContent } from './types';

export const topic43: TopicContent = {
  title: 'Sorting Fundamentals',
  learningContent: `
# Sorting Fundamentals
Sorting is the process of arranging data in a specific order (e.g., ascending, descending, alphabetical).
While you will rarely be asked to implement a sorting algorithm from scratch in a modern interview, sorting is often the **pre-processing step** that makes advanced patterns (like Two Pointers or Binary Search) possible.

## 1. Why Sort?
An unsorted array requires $O(N)$ time to search and makes relationship analysis (like finding the closest pairs) nearly impossible without $O(N^2)$ brute force.
Once sorted:
*   You can find elements in $O(\\log N)$ time using Binary Search.
*   Duplicates are grouped adjacent to each other.
*   You can process elements systematically using Two Pointers.

## 2. Conceptual Algorithms
You must understand the theory behind the major algorithms, even if you just use \`std::sort\` in practice.

### O(N^2) Algorithms (The Slow Ones)
*   **Bubble Sort:** Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The largest elements "bubble" to the top.
*   **Selection Sort:** Repeatedly finds the minimum element from the unsorted part and puts it at the beginning.
*   **Insertion Sort:** Builds the sorted array one element at a time by repeatedly taking the next element and inserting it into its correct position among the already-sorted elements. (Actually very fast for tiny arrays $N < 20$).

### O(N log N) Algorithms (The Fast Ones)
*   **Merge Sort:** A Divide and Conquer algorithm. Recursively splits the array in half until sizes are 1, then merges the sorted halves back together. (Requires $O(N)$ extra auxiliary space).
*   **Quicksort:** Picks a "pivot" element, partitions the array so smaller elements are on the left and larger on the right, then recursively sorts the sides. (In-place, but worst-case is $O(N^2)$ if the pivot is chosen poorly).
*   **Heap Sort:** Builds a Max Heap, then repeatedly extracts the max element. (In-place and guaranteed $O(N \\log N)$, but practically slower than Quicksort due to cache misses).

## 3. Stability
A sorting algorithm is **Stable** if two identical elements remain in the exact same relative order they were in before sorting.
*   *Example:* If you sort a list of students by Grade, and two students have an 'A', a stable sort guarantees that whichever student appeared first in the original list will appear first in the sorted list.
*   **Stable:** Merge Sort, Insertion Sort. (\`std::stable_sort\`)
*   **Unstable:** Quicksort, Heap Sort. (\`std::sort\`)

## DSA CONNECTION
*   **Two Pointers:** Sorting is mandatory before using the opposite-direction Two Pointer approach for problems like Pair Sum.
*   **Greedy Algorithms:** Always picking the "best" option often requires sorting the options first.
*   **Interval Problems:** Problems like "Merge Intervals" require sorting the intervals by their start times first.
`,
  fullNotes: `
# Sorting Reference

## 1. std::sort Under the Hood
When you call \`std::sort(v.begin(), v.end())\`, C++ does not just run Quicksort. It runs **Introsort**.
Introsort is a hybrid algorithm:
1.  It starts with **Quicksort**, which is incredibly fast due to contiguous memory cache locality.
2.  If the recursion depth gets too deep (meaning the Quicksort pivots are bad and it's heading towards $O(N^2)$), it abandons Quicksort and switches to **Heap Sort**, guaranteeing $O(N \\log N)$ worst-case.
3.  For very small partitions (e.g., $< 16$ elements), it switches to **Insertion Sort**, because Insertion Sort has virtually zero overhead and is faster for tiny arrays.

## 2. Non-Comparison Sorting
All the algorithms listed above are "Comparison-based", meaning they compare elements using \`<\` or \`>\`. Mathematical proofs show that comparison-based sorts CANNOT be faster than $O(N \\log N)$.
However, there are non-comparison sorts that run in **$O(N)$ time**:
*   **Counting Sort:** If you know the elements are integers bounded by a small range (e.g., $0-100$), you can just count frequencies in an array, then reconstruct the sorted output. (This uses $O(K)$ space where K is the range).
*   **Radix Sort:** Sorts integers digit by digit.

## 3. Interview Relevance
*   **Q:** Why is Quicksort usually preferred over Mergesort for arrays, even though Quicksort has a worse worst-case complexity?
    *   **A:** Two reasons. First, Quicksort is an in-place algorithm (requiring only $O(\\log N)$ recursion stack space), while Mergesort requires allocating an entirely new $O(N)$ temporary array to merge into. Second, Quicksort's memory access pattern is highly contiguous, maximizing CPU cache hits, making its real-world constant factors significantly faster than Mergesort.
*   **Q:** When would you use Mergesort over Quicksort?
    *   **A:** When stability is required, or when sorting Linked Lists (since Linked Lists do not suffer the $O(N)$ extra space penalty for merging, and Quicksort's random access requirement is impossible on a Linked List).
`,
  shortNotes: `
*   **Why Sort?** Pre-processing to enable Binary Search, Two Pointers, or Greedy algorithms.
*   **$O(N^2)$ Sorts:** Bubble, Selection, Insertion. (Avoid, except Insertion for tiny data).
*   **$O(N \\log N)$ Sorts:** Quicksort, Mergesort, Heapsort.
*   **Stability:** If identical elements keep their original relative order. (Mergesort is stable, Quicksort is unstable).
*   **C++ std::sort:** Uses Introsort (Hybrid of Quicksort, Heapsort, and Insertion Sort). Unstable. $O(N \\log N)$ guaranteed.
*   **C++ std::stable_sort:** Uses Mergesort. Stable. $O(N \\log N)$. Requires extra memory.
*   **$O(N)$ Sorting:** Counting Sort. Possible only if the range of numbers is small and known in advance.
`,
  cheatSheet: `
| Algorithm | Time (Avg) | Time (Worst) | Space | Stable? |
|---|---|---|---|---|
| Bubble | $O(N^2)$ | $O(N^2)$ | $O(1)$ | Yes |
| Insertion | $O(N^2)$ | $O(N^2)$ | $O(1)$ | Yes |
| Mergesort| $O(N \\log N)$| $O(N \\log N)$| $O(N)$ | Yes |
| Quicksort| $O(N \\log N)$| $O(N^2)$ | $O(\\log N)$| No |
| Heapsort | $O(N \\log N)$| $O(N \\log N)$| $O(1)$ | No |
| Counting | $O(N+K)$ | $O(N+K)$ | $O(K)$ | Yes |
`,
  resources: [
    {
      title: 'GeeksForGeeks: Sorting Algorithms',
      url: 'https://www.geeksforgeeks.org/sorting-algorithms/',
      type: 'ARTICLE',
      priority: 'B',
      description: 'Comprehensive overview of all sorting algorithms.'
    }
  ]
};
