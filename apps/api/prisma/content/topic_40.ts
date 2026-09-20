import { TopicContent } from './types';

export const topic40: TopicContent = {
  title: 'Array Manipulation',
  learningContent: `
# Array Manipulation
While traversal is about *reading* an array, **Manipulation** is about *modifying* its structure: inserting, deleting, updating, reversing, and shifting (rotating) elements.

## 1. The Shifting Penalty (Insertion / Deletion)
Because an array (and \`std::vector\`) stores data in contiguous memory blocks, inserting or deleting elements anywhere *except the very end* is expensive.
If you want to insert a number at index 0, you cannot just put it there. You must first shift every other element one position to the right to make room.
*   **Time Complexity:** $O(N)$
*   **Space Complexity:** $O(1)$ (if done in-place)

## 2. In-Place Reversal
A classic interview question: "Reverse an array in $O(1)$ space."
You cannot create a new \`reversed_arr\`. Instead, you use two pointers (one at the start, one at the end) and **swap** them, moving inwards until they meet.

\`\`\`cpp
vector<int> nums = {1, 2, 3, 4, 5};
int left = 0;
int right = nums.size() - 1;

while (left < right) {
    swap(nums[left], nums[right]);
    left++;
    right--;
}
// nums is now [5, 4, 3, 2, 1]
\`\`\`
*Note: C++ provides \`std::reverse(nums.begin(), nums.end())\` which does exactly this!*

## 3. Array Rotation (The Reversal Algorithm)
Another classic: "Rotate an array to the right by $K$ steps in $O(1)$ space."
If $nums = [1,2,3,4,5,6,7]$ and $K = 3$, result is $[5,6,7,1,2,3,4]$.

A naive approach shifts all elements one-by-one, taking $O(N \\times K)$ time (Too slow!).
The elegant, optimal $O(N)$ time / $O(1)$ space approach is the **Reversal Algorithm**:
1.  Reverse the entire array.
2.  Reverse the first $K$ elements.
3.  Reverse the remaining $N - K$ elements.

\`\`\`cpp
void rotateRight(vector<int>& nums, int k) {
    int n = nums.size();
    k = k % n; // Prevent k > n
    
    // Step 1: Reverse all
    reverse(nums.begin(), nums.end());
    // Step 2: Reverse first K
    reverse(nums.begin(), nums.begin() + k);
    // Step 3: Reverse the rest
    reverse(nums.begin() + k, nums.end());
}
\`\`\`

## 4. Partitioning (Preview)
Moving all elements that satisfy a condition to one side of the array (e.g., "Move all zeros to the end"). This is the foundational logic behind the Quicksort algorithm and many two-pointer problems.
`,
  fullNotes: `
# Array Manipulation Reference

## 1. Move Zeros (In-Place Partitioning)
Problem: Given an array, move all 0s to the end while maintaining the relative order of the non-zero elements. Must be done in $O(1)$ space.

Approach: Maintain a pointer (\`insert_pos\`) that tracks where the next non-zero element should go. Traverse the array with \`i\`. If \`nums[i]\` is non-zero, swap it with \`nums[insert_pos]\` and increment \`insert_pos\`.

\`\`\`cpp
void moveZeroes(vector<int>& nums) {
    int insert_pos = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] != 0) {
            swap(nums[insert_pos], nums[i]);
            insert_pos++;
        }
    }
}
\`\`\`
*   **Time Complexity:** $O(N)$
*   **Space Complexity:** $O(1)$

## 2. Erasing Elements
In C++, if you use \`nums.erase(nums.begin() + 2)\`, you are modifying the array size. This takes $O(N)$ time due to shifting.
If you need to do heavy insertions and deletions in the middle of a collection, you should mathematically deduce if an array is the wrong data structure. (Perhaps a Linked List or a Hash Map is better suited).

## 3. Interview Relevance
*   **Q:** Why is inserting an element at the beginning of a \`std::vector\` an $O(N)$ operation?
    *   **A:** Vectors guarantee contiguous memory layout. To maintain this, inserting at index 0 requires physically shifting every existing element in the array one position to the right in RAM, which requires $N$ copy/move operations.
*   **Q:** How do you handle $K > N$ when rotating an array?
    *   **A:** Rotating an array of size $N$ by $N$ steps results in the exact original array. Therefore, the effective number of rotations is always $K \\% N$ (K modulo N). Always apply this formula first to avoid unnecessary work and out-of-bounds errors.
`,
  shortNotes: `
*   **Insertion/Deletion:** In contiguous arrays (vectors), inserting/deleting in the middle takes $O(N)$ time because elements must shift.
*   **In-Place Algorithms:** Modifying the array without allocating a new one ($O(1)$ space). Usually achieved by swapping elements.
*   **Reversal:** Swap \`left\` and \`right\` pointers moving inwards. (\`std::reverse\`).
*   **Rotation:** To rotate by $K$ steps right: reverse all, reverse first $K$, reverse remaining. Always do \`K = K % N\` first!
*   **Partitioning:** Use a tracking index (\`insert_pos\`) to overwrite or swap elements meeting a condition to the front of the array (e.g., Move Zeroes).
`,
  cheatSheet: `
| Technique | Implementation Idea | Time | Space |
|---|---|---|---|
| In-Place Reverse | \`swap(arr[L++], arr[R--])\` | $O(N)$ | $O(1)$ |
| Array Rotation | Reverse All $\\rightarrow$ Rev First K $\\rightarrow$ Rev Rest | $O(N)$ | $O(1)$ |
| Move Zeros | \`if (x != 0) swap(arr[insert++], arr[i])\`| $O(N)$ | $O(1)$ |
| Erase Middle | \`v.erase(v.begin() + i)\` | $O(N)$ | $O(1)$ |
`,
  resources: [
    {
      title: 'GeeksForGeeks: Array Rotation',
      url: 'https://www.geeksforgeeks.org/array-rotation/',
      type: 'ARTICLE',
      priority: 'A',
      description: 'Covers the Reversal Algorithm for array rotation.'
    }
  ]
};
