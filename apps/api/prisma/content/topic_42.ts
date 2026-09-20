import { TopicContent } from './types';

export const topic42: TopicContent = {
  title: 'Basic Hashing',
  learningContent: `
# Basic Hashing
**Hashing** is the process of converting a given key into another value (a hash). In DSA, we use hashing to map massive or non-integer keys (like strings or 9-digit IDs) to small integer indices in an array, allowing us to look them up instantly.

In C++, you don't need to write hash functions manually. You just use the built-in Hash Tables: **\`std::unordered_map\`** (Key-Value pairs) and **\`std::unordered_set\`** (Unique Keys).

## 1. RECOGNITION: When to use Hashing
You should immediately think of hashing when a problem asks you to:
1.  **Count frequencies** of elements that are too large or dispersed for a fixed array (e.g., negative numbers, huge integers, strings).
2.  **Detect duplicates** instantly.
3.  **Check for membership:** "Have I seen this specific element before?"
4.  **Find pairs:** "Does there exist a number $X$ such that $A + X = Target$?"

## 2. APPROACH: The "Two Sum" Concept
The most famous introductory hashing problem is **Two Sum**: Given an array of integers and a \`target\`, find the indices of the two numbers that add up to \`target\`.

**Naive Approach ($O(N^2)$):**
Nested loops checking every possible pair. Too slow!

**Optimal Hashing Approach ($O(N)$ time, $O(N)$ space):**
As we iterate through the array, we ask ourselves: *"What number do I need to reach the target?"* We then check a Hash Map to see if we've already seen that needed number. If we haven't, we store our current number in the map and move on.

\`\`\`cpp
vector<int> twoSum(vector<int>& nums, int target) {
    // Map stores { Number : Its Index }
    unordered_map<int, int> seen; 
    
    for (int i = 0; i < nums.size(); i++) {
        int current = nums[i];
        int needed = target - current; // The exact number we are looking for
        
        // Have we seen 'needed' in the past? (O(1) lookup!)
        if (seen.count(needed)) {
            // Yes! Return the indices.
            return { seen[needed], i }; 
        }
        
        // No. Add the current number to the map for future checks.
        seen[current] = i;
    }
    return {};
}
\`\`\`

## 3. COMPLEXITY
*   **Time Complexity:** Average **$O(1)$** per lookup/insertion. Over an array of size $N$, the total time is **$O(N)$**.
    *   *Warning:* In the absolute worst case (massive Hash Collisions), lookup degrades to $O(N)$, making the total algorithm $O(N^2)$. But for interviews, you assume average $O(1)$.
*   **Space Complexity:** **$O(N)$** auxiliary space, because in the worst case we might store every element in the hash map.
`,
  fullNotes: `
# Basic Hashing Reference

## 1. Frequency Counting
If you need to find the most frequent element in an array, use an \`unordered_map\`:
\`\`\`cpp
vector<int> nums = {4, 1, 2, 1, 2, 1};
unordered_map<int, int> freq;

// 1. Build the frequency map (O(N) time)
for (int num : nums) {
    freq[num]++; 
}

// 2. Find the max (O(N) time)
int max_val = 0, max_count = 0;
for (auto pair : freq) {
    if (pair.second > max_count) {
        max_count = pair.second;
        max_val = pair.first;
    }
}
\`\`\`

## 2. Duplicate Detection (Membership)
If you just need to know if an array contains duplicates, use an \`unordered_set\`:
\`\`\`cpp
bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> seen;
    for (int num : nums) {
        if (seen.count(num)) return true; // Found a duplicate!
        seen.insert(num);
    }
    return false;
}
\`\`\`

## 3. Interview Relevance
*   **Q:** What is a Hash Collision, and how does it affect time complexity?
    *   **A:** A collision occurs when two different keys run through the hash function and produce the exact same array index (bucket). The hash table resolves this by chaining (storing them in a linked list at that index). If many elements collide into the same bucket, finding an element requires a linear scan of that linked list, degrading the normally $O(1)$ lookup time to $O(N)$ worst-case.
*   **Q:** Why not just use a standard array instead of a Hash Map?
    *   **A:** If the keys are small, dense integers (e.g., $0-100$), an array is vastly superior (perfect $O(1)$ time, no hashing overhead). However, if the keys are negative, massive ($10^9$), or non-integers (strings), an array is impossible because it would require gigabytes of RAM. Hashing compresses sparse, large keys into a small dense range.
`,
  shortNotes: `
*   **PATTERN: Basic Hashing**
*   **Recognition:** Counting frequencies of arbitrary data, finding duplicates, or $O(1)$ membership lookups ("have I seen this value before?").
*   **Data Structures:** 
    *   \`unordered_map<Key, Value>\`: Use when you need to store data *about* the key (like frequencies or indices).
    *   \`unordered_set<Key>\`: Use when you only care if the key *exists* (membership).
*   **Complexity:** Trades Space for Time. Improves $O(N^2)$ brute-force searches to $O(N)$ time by using $O(N)$ auxiliary space.
*   **Two Sum Logic:** Instead of searching for pairs, calculate what value is *needed* (\`target - current\`), and check if it exists in the hash map.
*   **Trap:** Assuming Hash Tables are always the answer. If elements are small dense integers ($0-1000$), a fixed array is much faster and uses less memory.
`,
  cheatSheet: `
| Problem Type | Approach | Space |
|---|---|---|
| Duplicates | \`unordered_set<int>\`, check \`count()\` | $O(N)$ |
| Frequencies | \`unordered_map<int, int>\`, \`freq[num]++\` | $O(N)$ |
| Pair Sum | \`unordered_map<int, int>\`, find \`target-curr\` | $O(N)$ |

**Standard C++ Complexity:**
*   **Average Lookup:** $O(1)$
*   **Worst-case Lookup:** $O(N)$ (Hash Collisions)
`,
  resources: [
    {
      title: 'GeeksForGeeks: Hashing Data Structure',
      url: 'https://www.geeksforgeeks.org/hashing-data-structure/',
      type: 'ARTICLE',
      priority: 'B',
      description: 'Conceptual breakdown of how Hash Tables operate.'
    }
  ]
};
