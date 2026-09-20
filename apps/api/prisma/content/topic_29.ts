import { TopicContent } from './types';

export const topic29: TopicContent = {
  title: 'multiset',
  learningContent: `
# What is std::multiset?
A \`std::multiset\` is identical to a \`std::set\` in almost every way (it is an ordered, self-balancing binary search tree), with one major difference: **it allows duplicate elements.**

## 1. Core Operations
\`\`\`cpp
#include <set> // multiset is in the <set> header
using namespace std;

multiset<int> ms;

ms.insert(10);
ms.insert(20);
ms.insert(10); // ALLOWED!

cout << ms.size(); // 3
for (int x : ms) cout << x << " "; // Prints: 10 10 20
\`\`\`

## 2. The \`erase()\` Trap (CRITICAL)
This is the most common bug students write when using a \`multiset\`.
If you pass a **value** to \`erase()\`, it deletes **ALL** copies of that value!
\`\`\`cpp
multiset<int> ms = {10, 10, 10, 20};
ms.erase(10); // Deletes EVERY 10. Current state: [20]
\`\`\`
If you only want to delete **ONE** copy of a duplicate value, you must find an iterator to it, and erase the iterator:
\`\`\`cpp
multiset<int> ms = {10, 10, 10, 20};
auto it = ms.find(10); // Finds the first 10
if (it != ms.end()) {
    ms.erase(it); // Erases ONLY that one 10. State: [10, 10, 20]
}
\`\`\`

## 3. The \`count()\` Warning
Because a multiset can have many duplicates, calling \`ms.count(10)\` will traverse the tree to find 10, and then linearly iterate through all identical copies to count them. If you have 100,000 copies of '10', \`count()\` will take $O(N)$ time instead of $O(\\log N)$.
If you just want to know if an element exists, use \`ms.find(10) != ms.end()\`. It stops at the first one it sees, guaranteeing $O(\\log N)$ time.

## DSA CONNECTION
*   **Sliding Window with order:** If you need a sliding window where you need to continuously find the maximum/minimum element in the window, but elements can be duplicated, a \`multiset\` is perfect. You insert the new element, find and erase one copy of the exiting element, and the \`.rbegin()\` / \`.begin()\` instantly gives you the max/min.
`,
  fullNotes: `
# std::multiset Reference

## 1. Complexity Comparison
| Operation | \`std::set\` | \`std::multiset\` |
|---|---|---|
| \`insert(x)\` | $O(\\log N)$ | $O(\\log N)$ |
| \`find(x)\` | $O(\\log N)$ | $O(\\log N)$ (Returns first instance) |
| \`erase(x)\` | $O(\\log N)$ | $O(\\log N + K)$ (where K is number of copies deleted) |
| \`erase(iter)\`| $O(1)$ amortized | $O(1)$ amortized |
| \`count(x)\` | $O(\\log N)$ | $O(\\log N + K)$ |

## 2. bounds in multiset
*   \`lower_bound(x)\` returns an iterator to the **first** instance of \`x\` (or the next greater element).
*   \`upper_bound(x)\` returns an iterator to the first element strictly **greater** than \`x\`.
*   Using \`equal_range(x)\` returns a pair of iterators \`[lower_bound, upper_bound)\`, which exactly encompasses all duplicate instances of \`x\`.

## 3. Interview Relevance
*   **Q:** How do you delete exactly one instance of a duplicated element in a \`multiset\`?
    *   **A:** You must not call \`ms.erase(value)\`, because that removes all instances of that value. Instead, use \`ms.erase(ms.find(value))\`, ensuring to check if \`find\` returned \`ms.end()\` first to prevent crashing.
*   **Q:** Why is \`std::priority_queue\` usually preferred over \`std::multiset\` for keeping track of the largest element?
    *   **A:** While both can track the largest element and allow duplicates, \`priority_queue\` is backed by a vector (an array). It is vastly more cache-efficient and uses less memory overhead than a \`multiset\`, which allocates a separate heap node for every single insertion. Use \`multiset\` only if you need to remove arbitrary elements from the middle of the structure.
`,
  shortNotes: `
*   **Concept:** Like a \`set\` (ordered Red-Black tree), but allows duplicate values.
*   **Danger 1:** \`ms.erase(val)\` deletes ALL copies of \`val\`. To delete just one, use \`ms.erase(ms.find(val))\`.
*   **Danger 2:** \`ms.count(val)\` is $O(\\log N + K)$. If you just want to know if it exists, use \`find()\`, not \`count()\`.
*   **Usage:** Maintaining sorted order of elements in a sliding window where duplicates are expected.
`,
  cheatSheet: `
| Intent | Code | Complexity |
|---|---|---|
| Add | \`ms.insert(5)\` | $O(\\log N)$ |
| Delete ALL | \`ms.erase(5)\` | $O(\\log N + K)$ |
| Delete ONE | \`ms.erase(ms.find(5))\` | $O(\\log N)$ |
| Exists? | \`ms.find(5) != ms.end()\`| $O(\\log N)$ |
`,
  resources: [
    {
      title: 'cppreference: std::multiset',
      url: 'https://en.cppreference.com/w/cpp/container/multiset',
      type: 'ARTICLE',
      priority: 'S',
      description: 'API reference for multiset.'
    }
  ]
};
