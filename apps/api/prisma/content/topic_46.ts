import { TopicContent } from './types';

export const topic46: TopicContent = {
  title: 'Prefix Sum Introduction',
  learningContent: `
# PATTERN: Prefix Sum
The **Prefix Sum** pattern is an incredibly powerful mathematical pre-processing technique. It allows you to answer queries about the sum of any contiguous subarray in **$O(1)$ time**.

## 1. RECOGNITION: When to use Prefix Sum
Look for these clues:
*   The problem asks for the **sum of a subarray** or **range**.
*   There are **multiple queries** or you need to check many different subarrays (e.g., checking all possible splits of an array).
*   Sliding window fails because the array contains **negative numbers**.

## 2. WHY IT WORKS
Imagine an array: \`A = [2, 4, 1, 5, 3]\`.
If someone asks for the sum from index \`1\` to \`3\` (\`4+1+5\`), you run a loop. $O(N)$.
If they ask 100,000 times, you run 100,000 loops. $O(N^2)$.

Instead, we pre-calculate a **Prefix Array** where each element is the sum of everything before it, plus itself.
\`Prefix = [2, 6, 7, 12, 15]\`
*   \`Prefix[0] = 2\`
*   \`Prefix[1] = 2+4 = 6\`
*   \`Prefix[2] = 2+4+1 = 7\`

Now, if we want the sum of elements from index $L$ to $R$, we don't need a loop. We just use basic algebra!
**Sum from L to R = \`Prefix[R] - Prefix[L - 1]\`**

Example: Sum from index 1 to 3:
\`Prefix[3] - Prefix[0]\` $\\rightarrow$ \`12 - 2 = 10\`. (Which matches $4+1+5 = 10$). We did it in $O(1)$ time!

## 3. APPROACH: 1-Indexed Prefix Array (The Best Way)
When implementing, the math \`Prefix[L - 1]\` crashes if $L = 0$ (out of bounds). 
To fix this cleanly, we make the Prefix array **one size larger** than the input array and start it with a \`0\`. This is called a 1-indexed prefix array.

\`\`\`cpp
vector<int> buildPrefixSum(vector<int>& nums) {
    int n = nums.size();
    vector<int> prefix(n + 1, 0); // Size N+1, all zeros
    
    for (int i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    
    return prefix;
}
\`\`\`
Now, the sum from original index \`L\` to \`R\` (inclusive) is perfectly safe:
**\`RangeSum(L, R) = prefix[R + 1] - prefix[L]\`**

## 4. COMPLEXITY
*   **Time Complexity:** $O(N)$ to build the prefix array. $O(1)$ to answer any range sum query.
*   **Space Complexity:** $O(N)$ to store the prefix array. (Sometimes $O(1)$ if you are allowed to overwrite the original input array).
`,
  fullNotes: `
# Prefix Sum Reference

## 1. Prefix Sum + Hashing (Advanced Concept)
Prefix Sum becomes an elite pattern when combined with a Hash Map.
Problem: *"Find the total number of continuous subarrays whose sum equals to K."*
Because the array can have negative numbers, Sliding Window will not work.

**Approach:** 
If the current running prefix sum is $P$, and we want a subarray that sums to $K$, we mathematically need to chop off a previous prefix sum of exactly $P - K$.
We use a Hash Map to store how many times we've seen every prefix sum!
\`\`\`cpp
int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> prefixCounts;
    prefixCounts[0] = 1; // Base case: an empty subarray sums to 0!
    
    int current_sum = 0;
    int count = 0;
    
    for (int num : nums) {
        current_sum += num;
        
        int needed = current_sum - k;
        if (prefixCounts.count(needed)) {
            count += prefixCounts[needed]; // Add however many times we saw that prefix
        }
        
        prefixCounts[current_sum]++;
    }
    return count;
}
\`\`\`
This achieves $O(N)$ time, which is impossible with any other pattern.

## 2. 2D Prefix Sum (Preview)
If you need to find the sum of a rectangle in a 2D matrix (like an image pixel grid), the logic expands to 2D.
\`Prefix[i][j] = Matrix[i][j] + Prefix[i-1][j] + Prefix[i][j-1] - Prefix[i-1][j-1]\`.
This allows $O(1)$ rectangular sum queries on a matrix, which is a classic hard interview question.

## 3. COMMON MISTAKES (Traps)
*   **Index off-by-one:** The absolute most common error. If you use a 0-indexed prefix array, you MUST add an \`if (L == 0)\` check to prevent crashing when calculating \`Prefix[R] - Prefix[L-1]\`. Using the 1-indexed (N+1) padding completely avoids this.
*   **Integer Overflow:** If the array contains 100,000 numbers that are up to 100,000 each, the prefix sum will easily exceed the 32-bit \`int\` limit. Always declare your prefix array as \`vector<long long>\` if the data is large!
`,
  shortNotes: `
*   **PATTERN: Prefix Sum**
*   **Recognition:** Subarray sums, range queries, "Number of subarrays summing to K" (especially with negative numbers).
*   **Why:** Converts $O(N)$ range sum calculations into $O(1)$ math operations.
*   **Formula (0-indexed):** \`Sum(L, R) = Prefix[R] - Prefix[L-1]\`.
*   **Formula (1-indexed padding):** \`Sum(L, R) = Prefix[R+1] - Prefix[L]\`. (Safer, avoids $L=0$ crash).
*   **Prefix + Hashing:** Store the frequencies of seen prefix sums in a map. To find a subarray of sum K, check the map for \`current_sum - K\`.
*   **Trap:** Integer overflow! If the sum gets massive, use \`long long\`.
`,
  cheatSheet: `
| Operation | Code | Complexity |
|---|---|---|
| Build (N+1) | \`for(i=0..N) P[i+1] = P[i] + A[i]\` | $O(N)$ |
| Query Range | \`sum = P[R+1] - P[L]\` | $O(1)$ |
| Subarray = K| Hash Map, find \`curr_sum - K\` | $O(N)$ |

*   **Rule of Thumb:** If it's a contiguous sum problem with NEGATIVE numbers, use Prefix Sum + Hash Map. If only positive numbers, use Sliding Window.
`,
  resources: [
    {
      title: 'GeeksForGeeks: Prefix Sum Array',
      url: 'https://www.geeksforgeeks.org/prefix-sum-1d-array-1d-vector/',
      type: 'ARTICLE',
      priority: 'B',
      description: 'Introduction to building and querying prefix sums.'
    }
  ]
};
