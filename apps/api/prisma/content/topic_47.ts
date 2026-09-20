import { TopicContent } from './types';

export const topic47: TopicContent = {
  title: 'Binary Search Introduction',
  learningContent: `
# PATTERN: Binary Search
Binary Search is the ultimate Divide and Conquer algorithm. It is arguably the single most important pattern to master for $O(\\log N)$ time complexity.

## 1. RECOGNITION: When to use Binary Search
*   The array is **sorted** (Ascending or Descending).
*   The problem asks you to find an element, or find a boundary/transition point.
*   The required time complexity is $O(\\log N)$ (e.g., $N = 10^9$).
*   **Advanced:** The search space is a range of numbers, and you are asked for the "Minimum/Maximum possible value that satisfies a condition" (Search on Answer).

## 2. WHY IT WORKS
If you are searching for the word "Zebra" in a physical dictionary, you don't read page 1, then page 2. You open the book to the exact middle. You see "Monkey". Because "Zebra" comes after "Monkey", you instantly rip the left half of the dictionary off and throw it away. You just eliminated 50% of the work in 1 step!
In computer science, doing this repeatedly reduces $N$ elements to $1$ element in exactly $\\log_2(N)$ steps.

## 3. TEMPLATE (The Standard Search)
This template finds the exact target index, or returns -1 if not found.
\`\`\`cpp
int binarySearch(vector<int>& nums, int target) {
    int low = 0;
    int high = nums.size() - 1;
    
    while (low <= high) { // Important: <= allows checking an array of size 1
        int mid = low + (high - low) / 2; // OVERFLOW SAFE!
        
        if (nums[mid] == target) {
            return mid; // Found it
        } 
        else if (nums[mid] < target) {
            low = mid + 1; // Discard left half
        } 
        else {
            high = mid - 1; // Discard right half
        }
    }
    
    return -1; // Target not found
}
\`\`\`

## 4. The Overflow Trap (CRITICAL)
Why did we write \`mid = low + (high - low) / 2\` instead of the mathematical equivalent \`mid = (low + high) / 2\`?

If the array is massive, \`low\` might be $2 \\times 10^9$ and \`high\` might be $2 \\times 10^9$. 
If you add them together (\`(low + high)\`), the sum is $4 \\times 10^9$, which exceeds the 32-bit integer limit ($2.14 \\times 10^9$). The number overflows into a negative number, your code crashes, and you fail the interview.
**Always use \`low + (high - low) / 2\`.**

## 5. First/Last Occurrence (lower_bound)
What if the array has duplicates \`[1, 2, 2, 2, 3]\` and you need the *first* occurrence of 2?
Standard binary search will just return a random '2' in the middle.

Instead of returning immediately when we find a '2', we record the position and *force the search to continue to the left* to see if there is an earlier '2'.
\`\`\`cpp
int first_pos = -1;
// inside while loop:
if (nums[mid] == target) {
    first_pos = mid;   // Record it
    high = mid - 1;    // Keep searching left!
}
\`\`\`
*(Note: C++ provides \`std::lower_bound\` which handles this mathematically, but you must know how to code it yourself).*
`,
  fullNotes: `
# Binary Search Reference

## 1. Advanced: Search on Answer (Monotonic Condition)
The hardest binary search problems don't ask you to search an array at all. They ask you to search a theoretical range of numbers.

**Problem Type:** "Find the minimum capacity $C$ a ship needs to transport $N$ weights in $D$ days."
1.  **Search Space:** The minimum possible capacity is the \`max(weights)\`. The maximum possible capacity is the \`sum(weights)\`.
2.  **Monotonicity:** If capacity $C$ works, then $C+1, C+2...$ also work. If capacity $C$ fails, then $C-1, C-2...$ also fail. The condition maps to a Boolean array: \`[F, F, F, T, T, T]\`.
3.  **Binary Search:** You binary search between \`low = max(weights)\` and \`high = sum(weights)\`. For the \`mid\` capacity, you run a simulation to see if it works. If it works (\`T\`), you record it and shrink \`high = mid - 1\` to find a smaller one. If it fails (\`F\`), you increase \`low = mid + 1\`.

## 2. COMMON MISTAKES (Traps)
*   **Infinite Loops:** The most terrifying binary search bug. It usually occurs when you write \`while (low < high)\` and then set \`low = mid\` (instead of \`mid + 1\`). When \`low\` and \`high\` are 1 apart, \`mid\` equals \`low\`. Setting \`low = mid\` does nothing, and the loop runs forever. Sticking strictly to the template \`low = mid + 1\` and \`high = mid - 1\` prevents this entirely.
*   **Using on Unsorted Data:** Binary search mathematically requires the data to be ordered (or monotonically boolean \`F -> T\`). If you use it on scrambled data, it will return complete garbage.

## 3. Interview Relevance
*   **Q:** Can binary search be implemented recursively? Which is better?
    *   **A:** Yes, it can be recursive. However, the iterative \`while\` loop is strongly preferred in C++. Iterative uses $O(1)$ space. Recursive uses $O(\\log N)$ space on the call stack. Since binary search is often used in performance-critical code, avoiding the function call overhead of recursion is best.
`,
  shortNotes: `
*   **PATTERN: Binary Search**
*   **Recognition:** Sorted array, searching for a value, $O(\\log N)$ required time, or finding a minimum/maximum valid threshold.
*   **Core Logic:** Find \`mid\`. If \`mid\` is too small, discard left (\`low = mid + 1\`). If \`mid\` is too big, discard right (\`high = mid - 1\`).
*   **Overflow Trap:** NEVER write \`(low + high) / 2\`. Always write \`low + (high - low) / 2\`.
*   **First Occurrence:** When \`mid == target\`, don't return. Save the index and force \`high = mid - 1\`.
*   **Search on Answer:** Binary searching a range of theoretical integer answers, testing each \`mid\` against a simulation function. (Used when condition is monotonic \`F F F T T T\`).
`,
  cheatSheet: `
| Concept | Code Snippet | Note |
|---|---|---|
| Safe Mid | \`int mid = low + (high - low) / 2;\` | Prevents Overflow |
| Move Left | \`high = mid - 1;\` | |
| Move Right| \`low = mid + 1;\` | |
| Loop Cond | \`while (low <= high)\` | For exact search |
| First Occur| \`if (ans) { res=mid; high=mid-1; }\` | Keep searching left |
`,
  resources: [
    {
      title: 'TopCoder: Binary Search Tutorial',
      url: 'https://www.topcoder.com/thrive/articles/Binary%20Search',
      type: 'ARTICLE',
      priority: 'S',
      description: 'The legendary TopCoder tutorial on advanced Binary Search concepts.'
    }
  ]
};
