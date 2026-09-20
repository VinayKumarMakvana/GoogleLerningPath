import { TopicContent } from './types';

export const topic44: TopicContent = {
  title: 'Two Pointers Introduction',
  learningContent: `
# PATTERN: Two Pointers
The **Two Pointers** pattern is one of the most elegant and frequently tested patterns in DSA. It involves using two integer variables (pointers/indices) to iterate through an array or string simultaneously, usually to save time or space.

## 1. RECOGNITION: When to use Two Pointers
Look for these clues in the problem description:
*   The array is **sorted** (Huge clue!).
*   You need to find a **pair** or **triplet** of elements that satisfy a condition (like a target sum).
*   You need to **reverse** elements or check for **palindromes**.
*   You need to **compare elements from both ends** moving inwards.
*   You are asked to process the array **in-place** in $O(1)$ space.

## 2. WHY IT WORKS
In a brute-force approach, finding a pair involves a nested loop: checking element $i$ against every element $j$, which is $O(N^2)$.
By using Two Pointers on a *sorted* array, you use the sorting property to make intelligent decisions. Instead of checking every combination, you can safely eliminate whole sections of the array in $O(1)$ time, reducing the total scan to $O(N)$.

## 3. APPROACH: The Opposite-Direction Pointers
This is the most classic variant. One pointer starts at the beginning (\`left = 0\`), and the other starts at the end (\`right = n - 1\`). They move towards each other until they meet.

**Example: Two Sum II (Sorted Array)**
Find two numbers that add up to \`target\`.
1.  Add \`nums[left] + nums[right]\`.
2.  If the sum is exactly the target, you're done!
3.  If the sum is **too small**, you need a bigger number. Since the array is sorted, moving \`left\` to the right gives you a bigger number.
4.  If the sum is **too big**, you need a smaller number. Moving \`right\` to the left gives you a smaller number.

## 4. TEMPLATE (Opposite Direction)
\`\`\`cpp
void twoPointers(vector<int>& nums, int target) {
    int left = 0;
    int right = nums.size() - 1;
    
    while (left < right) { // Strict inequality ensures they don't point to the same element
        int current_sum = nums[left] + nums[right];
        
        if (current_sum == target) {
            // Found it! Process and return.
            return; 
        } 
        else if (current_sum < target) {
            left++; // Need more, move left pointer up
        } 
        else {
            right--; // Need less, move right pointer down
        }
    }
}
\`\`\`

## 5. COMPLEXITY
*   **Time Complexity:** $O(N)$. Each element is visited at most once. (If you had to sort the array first, total time is $O(N \\log N)$).
*   **Space Complexity:** $O(1)$. We only created two integer variables.
`,
  fullNotes: `
# Two Pointers Reference

## 1. Same-Direction Pointers (Fast & Slow)
Not all Two Pointer problems move in opposite directions. Sometimes both start at $0$ and move to the right at different speeds.
This is heavily used for **in-place array modification** (e.g., removing duplicates from a sorted array).

*   **Fast Pointer (\`i\`):** Scans through the entire array looking for valid elements.
*   **Slow Pointer (\`insert_pos\`):** Points to the location where the next valid element should be written.

\`\`\`cpp
// Example: Remove duplicates in-place
int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    
    int slow = 1; // Start at index 1 (index 0 is always unique)
    
    for (int fast = 1; fast < nums.size(); fast++) {
        // If we find a new, unique element
        if (nums[fast] != nums[fast - 1]) {
            nums[slow] = nums[fast]; // Overwrite
            slow++;
        }
    }
    return slow; // 'slow' represents the new length of the array
}
\`\`\`

## 2. COMMON MISTAKES (Traps)
*   **While loop condition:** Using \`while (left <= right)\` when searching for pairs. If \`left == right\`, you are using the same element twice. It must be \`while (left < right)\`.
*   **Unsorted data:** Trying to use the Opposite-Direction Two Sum pattern on an unsorted array. The logic completely falls apart. You must sort it first, or use a Hash Map instead.
*   **Integer Overflow:** If calculating \`nums[left] + nums[right]\`, and the array contains massive integers, their sum might exceed the 32-bit integer limit, causing a wrap-around bug. Use \`long long\` for the sum.

## 3. WHEN NOT TO USE
If the array is unsorted and you are not allowed to sort it (or sorting it destroys original index information that you need to return), you cannot use opposite-direction two pointers. Use Hashing instead.
`,
  shortNotes: `
*   **PATTERN: Two Pointers**
*   **Recognition:** Sorted array asking for pairs/triplets. Palindromes. In-place array modification ($O(1)$ space).
*   **Opposite-Direction:** \`left = 0\`, \`right = N-1\`. Move inwards. (Use for Two Sum, Palindromes, Reversal).
    *   If sum < target: \`left++\`
    *   If sum > target: \`right--\`
*   **Same-Direction (Fast/Slow):** \`slow = 0\`, \`fast = 0\`. Both move right. (Use for removing duplicates, moving zeroes).
    *   \`fast\` explores. \`slow\` tracks the write-position.
*   **Complexity:** $O(N)$ Time. $O(1)$ Space.
*   **Trap:** Do not use opposite-direction logic on an unsorted array!
`,
  cheatSheet: `
| Pattern Type | Problem Example | Key Logic |
|---|---|---|
| Opposite Dir | Two Sum (Sorted) | \`sum < target ? L++ : R--\` |
| Opposite Dir | Palindrome | \`arr[L] != arr[R] ? false\` |
| Opposite Dir | Reverse Array | \`swap(arr[L++], arr[R--])\`|
| Same Dir (Fast/Slow)| Remove Duplicates| \`if (new) arr[slow++] = arr[fast]\`|
`,
  resources: [
    {
      title: 'LeetCode: Two Pointers Articles',
      url: 'https://leetcode.com/articles/two-pointer-technique/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Comprehensive guide to two-pointer variations.'
    }
  ]
};
