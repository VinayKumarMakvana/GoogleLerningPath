import { TopicContent } from './types';

export const topic39: TopicContent = {
  title: 'Array Traversal',
  learningContent: `
# The Foundation: Array Traversal
Before you can learn complex patterns like Sliding Windows or Two Pointers, you must achieve absolute mastery over basic **Array Traversal**.

Traversal simply means visiting every element in an array/vector exactly once.

## 1. RECOGNITION: When to use Traversal
You need a simple traversal whenever the problem requires you to inspect every element to derive a single result.
*   "Find the maximum/minimum..."
*   "Count how many times X appears..."
*   "Calculate the sum/average..."
*   "Check if property Y holds true for all elements..."

## 2. APPROACH: The 4 Types of Traversal

### A. Range-Based Traversal (The Modern Way)
If you only need to look at the values and do not care about the index, use a range-based for loop. It is safe, clean, and prevents out-of-bounds errors.
\`\`\`cpp
vector<int> nums = {5, 2, 9, 1};
int max_val = INT_MIN; // Start with the smallest possible integer

for (int num : nums) {
    if (num > max_val) {
        max_val = num;
    }
}
\`\`\`

### B. Indexed Traversal (The Classic Way)
If the math you are doing requires the actual *position* (index) of the element, you must use a standard \`for\` loop.
\`\`\`cpp
// Example: Find the index of the number 9
int target_index = -1;
for (int i = 0; i < nums.size(); i++) {
    if (nums[i] == 9) {
        target_index = i;
        break; // Stop traversing, we found it!
    }
}
\`\`\`

### C. Reverse Traversal
Sometimes it is advantageous to process an array from back to front (e.g., modifying an array in-place without overwriting data you haven't processed yet).
\`\`\`cpp
for (int i = nums.size() - 1; i >= 0; i--) {
    cout << nums[i] << " ";
}
\`\`\`
*(Warning: If you use \`size_t i\` instead of \`int i\`, the condition \`i >= 0\` will result in an infinite loop because \`size_t\` is unsigned and can never be negative!)*

### D. Step Traversal
Visiting every $K$-th element.
\`\`\`cpp
// Print elements at even indices (0, 2, 4...)
for (int i = 0; i < nums.size(); i += 2) {
    cout << nums[i] << " ";
}
\`\`\`

## 3. COMPLEXITY
*   **Time Complexity:** $O(N)$, because we visit every element exactly once (or a fraction of $N$ times, which simplifies to $O(N)$).
*   **Space Complexity:** $O(1)$, because we only use a loop counter \`i\` and maybe a tracking variable like \`max_val\`.
`,
  fullNotes: `
# Array Traversal Reference

## 1. The Iterator Approach
While you can use \`nums[i]\`, you can also traverse using iterators. This is how the STL \`<algorithm>\` library actually works internally.
\`\`\`cpp
for (auto it = nums.begin(); it != nums.end(); ++it) {
    cout << *it << " ";
}
\`\`\`

## 2. Modifying during Range-Based Traversal
If you write \`for (int num : nums)\`, \`num\` is a **copy** of the element. Modifying \`num\` will not change the original vector.
If you need to traverse and modify the array in-place using the clean syntax, you must capture by **reference**:
\`\`\`cpp
for (int& num : nums) {
    num *= 2; // Actually doubles the values in the original vector!
}
\`\`\`

## 3. Frequency Arrays (Advanced Traversal)
If you know the integers in the array are constrained to a small range (e.g., $0 \\le x \\le 100$), you can traverse the array once to build a frequency map using a plain array, which is blazingly fast.
\`\`\`cpp
vector<int> nums = {1, 5, 1, 2, 5, 5};
vector<int> freq(101, 0); // Indexes 0-100 initialized to 0

for (int num : nums) {
    freq[num]++; // The index itself is the value we are tracking!
}

cout << "5 appears " << freq[5] << " times.";
\`\`\`
This is a critical precursor concept to Hashing and Counting Sort.

## 4. Interview Relevance
*   **Q:** Why might a reverse \`for\` loop with \`nums.size()\` cause an infinite loop?
    *   **A:** \`nums.size()\` returns a \`size_t\`, which is an unsigned integer. If you declare your loop counter as \`size_t i = nums.size() - 1;\` and decrement it past 0, it wraps around to the maximum possible positive integer (integer underflow), meaning the condition \`i >= 0\` is always true. Always cast to \`int\` for reverse loops: \`int i = (int)nums.size() - 1;\`.
`,
  shortNotes: `
*   **Traversal:** Visiting every element in a data structure to inspect or process it.
*   **Time Complexity:** Always $O(N)$ for a standard array.
*   **Space Complexity:** $O(1)$ auxiliary space.
*   **Range-based:** \`for (int x : nums)\` is best when you don't need the index. Use \`for (int& x : nums)\` if you need to modify the array.
*   **Indexed:** \`for (int i = 0; i < N; i++)\` is required when math relies on the index.
*   **Reverse Danger:** Be careful of \`size_t\` underflow when writing \`i >= 0\` loops. Use \`int\`.
`,
  cheatSheet: `
| Intent | Code | Complexity |
|---|---|---|
| Read values only | \`for (int x : arr) { ... }\` | $O(N)$ Time, $O(1)$ Space |
| Modify values | \`for (int& x : arr) { x=0; }\`| $O(N)$ Time, $O(1)$ Space |
| Need Index | \`for (int i=0; i<N; ++i)\` | $O(N)$ Time, $O(1)$ Space |
| Reverse | \`for (int i=N-1; i>=0; --i)\`| $O(N)$ Time, $O(1)$ Space |
| Skip elements | \`for (int i=0; i<N; i+=2)\` | $O(N)$ Time, $O(1)$ Space |
`,
  resources: [
    {
      title: 'GeeksForGeeks: Array Traversal',
      url: 'https://www.geeksforgeeks.org/array-data-structure/array-traversal/',
      type: 'ARTICLE',
      priority: 'B',
      description: 'Basic introduction to array traversal.'
    }
  ]
};
