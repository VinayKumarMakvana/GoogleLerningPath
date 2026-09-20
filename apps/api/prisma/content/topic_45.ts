import { TopicContent } from './types';

export const topic45: TopicContent = {
  title: 'Sliding Window Introduction',
  learningContent: `
# PATTERN: Sliding Window
The **Sliding Window** pattern is a specialized version of the Two Pointers technique. It is used to dramatically reduce the time complexity of algorithms operating on **contiguous subarrays or substrings**.

## 1. RECOGNITION: When to use Sliding Window
Look for these absolute giveaways in the problem description:
*   The problem asks about a **contiguous** subarray or substring.
*   It asks for the **Maximum/Minimum/Longest/Shortest** something.
*   It asks for something that meets an exact condition (e.g., "Exactly $K$ unique characters").
*   A naive nested loop solution would be $O(N^2)$ or $O(N^K)$.

## 2. WHY IT WORKS
Imagine finding the maximum sum of any contiguous subarray of size $K=3$.
*   Array: \`[1, 3, 2, 6, -1, 4]\`
*   Naive: Sum \`1+3+2 = 6\`. Then sum \`3+2+6 = 11\`. Then sum \`2+6-1 = 7\`.
Notice the overlap? We recalculated \`3+2\` and \`2+6\`. This is wasted work!

A Sliding Window maintains the "state" of the window (in this case, the sum). When the window moves to the right, we simply **ADD** the new element entering the window, and **SUBTRACT** the old element leaving the window. 
*   Sum of first window: \`1+3+2 = 6\`
*   Slide right: \`6 - 1 (leave) + 6 (enter) = 11\`.
We did it in $O(1)$ math instead of an $O(K)$ loop!

## 3. APPROACH: Fixed vs Variable
There are two main types of windows:
1.  **Fixed Window:** The size of the window ($K$) never changes. You move the right and left pointers in lockstep.
2.  **Variable Window:** You expand the right pointer to consume as much as possible until a condition breaks. Then you shrink the left pointer until the condition is valid again.

## 4. TEMPLATE (Variable Window)
\`\`\`cpp
// Example: Find length of longest subarray with sum <= target
int slidingWindow(vector<int>& nums, int target) {
    int left = 0;
    int current_sum = 0;
    int max_length = 0;
    
    // The right pointer expands the window
    for (int right = 0; right < nums.size(); right++) {
        // 1. ADD the new element to our window state
        current_sum += nums[right];
        
        // 2. SHRINK the window from the left if it breaks the condition
        while (current_sum > target) {
            current_sum -= nums[left]; // Remove left element from state
            left++;                    // Shrink window
        }
        
        // 3. UPDATE our maximum answer (window is guaranteed valid here)
        max_length = max(max_length, right - left + 1);
    }
    
    return max_length;
}
\`\`\`

## 5. COMPLEXITY
*   **Time Complexity:** $O(N)$. Even though there is a \`while\` loop inside a \`for\` loop, the \`left\` and \`right\` pointers each move exactly $N$ times across the entire algorithm. $O(2N)$ simplifies to $O(N)$.
*   **Space Complexity:** $O(1)$ (or $O(K)$ if maintaining a frequency map of characters in the window).
`,
  fullNotes: `
# Sliding Window Reference

## 1. The Invariant
Every sliding window problem relies on an **Invariant**—a rule that must remain true for the window to be valid.
*   *Example Invariant:* "The sum of elements inside the window is $\\le K$".
*   If the invariant is broken by moving the \`right\` pointer, the \`left\` pointer's sole job is to move forward until the invariant is restored.

## 2. Maintaining Window State
The trickiest part of Sliding Window is not the pointers, but the **State**. 
If the problem asks for "longest substring with at most $K$ unique characters", the State is not just a sum. It must be a Hash Map counting the frequencies of characters currently inside the window.
*   **Add (right++):** \`map[s[right]]++\`
*   **Remove (left++):** \`map[s[left]]--\`. If the count hits 0, you must completely \`map.erase(s[left])\` to accurately reflect the number of unique characters.

## 3. COMMON MISTAKES (Traps)
*   **Shrinking incorrectly:** Using an \`if\` statement instead of a \`while\` statement to shrink the left pointer. Sometimes one new element from the right forces you to shrink the left pointer multiple times to restore the invariant! Always use \`while (invalid_condition)\`.
*   **Updating the answer too early:** Updating \`max_length\` *inside* or *before* the while loop. You must only update your answer when the window is guaranteed to be valid (after the while loop finishes).

## 4. WHEN NOT TO USE
*   If the problem does not specify a **contiguous** sequence (e.g., "Find any combination of elements..."), you cannot use a sliding window. Subsequences and subsets usually require Dynamic Programming or Backtracking.
*   If you have a Variable Window problem searching for a target sum, but the array contains **negative numbers**, the sliding window breaks. Why? Because adding a negative number makes the sum *smaller*. The core logic—"my sum is too big, so I must shrink the left side"—is no longer mathematically true. You must use Prefix Sums + Hashing instead.
`,
  shortNotes: `
*   **PATTERN: Sliding Window**
*   **Recognition:** Contiguous subarray/substring. Asking for Max/Min/Longest/Target. 
*   **Why:** Prevents $O(N^2)$ recalculation of overlapping subarrays.
*   **Fixed Window:** Size $K$ is constant. Add right, remove left.
*   **Variable Window:** Expand \`right\` until invalid. Shrink \`left\` until valid again.
*   **Template Logic:** 
    1. Add \`nums[right]\` to State. 
    2. \`while (State is Invalid) { Remove nums[left] from State; left++; }\`
    3. Update Max/Min Answer.
*   **Time Complexity:** $O(N)$ because both pointers only move forward.
*   **Trap:** Fails on Variable Window sum problems if array contains negative numbers!
`,
  cheatSheet: `
| Window Type | Recognition Clue | Loop Structure |
|---|---|---|
| Fixed | "Subarray of size K" | \`if (right-left+1 > K) left++\` |
| Variable (Longest)| "Longest subarray sum $\\le$ K" | \`while (sum > K) shrink left\`|
| Variable (Shortest)| "Shortest subarray sum $\\ge$ K" | \`while (sum >= K) update ans, shrink left\`|

*   **Complexity:** $O(N)$ Time.
`,
  resources: [
    {
      title: 'LeetCode Discuss: Sliding Window Template',
      url: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/discuss/92007/sliding-window-algorithm-template-to-solve-all-the-leetcode-substring-search-problem',
      type: 'ARTICLE',
      priority: 'S',
      description: 'The most famous sliding window template on the internet.'
    }
  ]
};
