import { TopicContent } from './types';

export const topic28: TopicContent = {
  title: 'set',
  learningContent: `
# What is std::set?
A \`std::set\` is an associative container that stores **unique** elements in a specifically **ordered** way (ascending by default).
If you try to insert the number \`5\` into a set that already contains \`5\`, it simply ignores the insertion. 
Because it maintains order at all times, iterating through a \`std::set\` will always give you the elements from smallest to largest.

## 1. Core Operations (All $O(\\log N)$)
Under the hood, a \`std::set\` is usually implemented as a **Red-Black Tree** (a self-balancing binary search tree). Because it is a tree, inserting, deleting, and searching all take **$O(\\log N)$** time.

\`\`\`cpp
#include <set>
using namespace std;

set<int> s;

s.insert(30); // [30]
s.insert(10); // [10, 30] (Maintains sorted order automatically!)
s.insert(20); // [10, 20, 30]
s.insert(10); // [10, 20, 30] (Ignored, 10 is already present)

// Check if an element exists
if (s.count(20)) { // count() returns 1 if present, 0 if not
    cout << "20 is in the set";
}

s.erase(20); // Removes 20. Current set: [10, 30]
\`\`\`

## 2. Iterators
You can traverse a set, and it will guarantee sorted order.
\`\`\`cpp
for (int x : s) {
    cout << x << " "; // Prints: 10 30
}
\`\`\`
*Note: Because the set strictly controls the order of its elements to maintain the binary tree structure, the iterators return \`const\` references. You **cannot modify** an element once it is inside a set. To change an element, you must erase the old one and insert the new one.*

## DSA CONNECTION
*   **Deduplication:** The fastest way to remove duplicates from an array and sort it at the same time is to dump the array into a \`set\`.
*   **Ordered State Maintenance:** If a problem requires you to constantly add/remove elements and frequently ask "What is the smallest/largest element currently available?", a set is perfect.
*   **Coordinate Compression:** A common competitive programming trick using sets to map sparse coordinates to dense indexes.
`,
  fullNotes: `
# std::set Reference

## 1. lower_bound and upper_bound
Because the set is sorted, it supports incredibly fast binary search operations natively as member functions. (Do not use \`std::lower_bound\` from the \`<algorithm>\` header on a set; it will compile, but it will take $O(N)$ time instead of $O(\\log N)$ because sets lack random access!).

*   \`s.lower_bound(x)\`: Returns an iterator to the **first element $\\ge x$**.
*   \`s.upper_bound(x)\`: Returns an iterator to the **first element $> x$**.

\`\`\`cpp
set<int> s = {10, 20, 30, 40};
auto it = s.lower_bound(25); 
if (it != s.end()) {
    cout << *it; // Prints 30
}
\`\`\`

## 2. Performance Overhead
While $O(\\log N)$ sounds fast, it is significantly slower than $O(1)$ operations in an \`unordered_set\` (Hash Table) and slower than operations on a contiguous \`vector\`. A set is a node-based container; every insertion requires a separate heap allocation for the new node and potentially several tree rotation operations to keep the tree balanced. 
*Rule of thumb: If you don't need the elements to be in sorted order, use \`unordered_set\` instead.*

## 3. Interview Relevance
*   **Q:** How does a \`std::set\` handle duplicate insertions?
    *   **A:** The \`insert()\` method returns a \`std::pair<iterator, bool>\`. If the element was successfully inserted, the bool is \`true\`. If the element already existed, the bool is \`false\` and the insertion is safely ignored.
*   **Q:** What is the underlying data structure of a \`std::set\`?
    *   **A:** A self-balancing binary search tree, almost always implemented as a Red-Black Tree. This guarantees $O(\\log N)$ worst-case time for insertions, deletions, and lookups.
`,
  shortNotes: `
*   **Properties:** Ordered (ascending by default) and Unique elements only.
*   **Implementation:** Red-Black Tree.
*   **Complexity:** $O(\\log N)$ for \`insert\`, \`erase\`, \`find\`, \`count\`.
*   **Modification:** Elements inside are \`const\`. Cannot be modified, only erased/inserted.
*   **Search:** Use \`s.find(x)\` or \`s.count(x)\` to check existence.
*   **Range queries:** Use \`s.lower_bound(x)\` and \`s.upper_bound(x)\` (must use the member functions, not the \`<algorithm>\` ones!).
`,
  cheatSheet: `
| Operation | Syntax | Complexity |
|---|---|---|
| Add | \`s.insert(10)\` | $O(\\log N)$ |
| Remove | \`s.erase(10)\` | $O(\\log N)$ |
| Contains | \`s.count(10)\` | $O(\\log N)$ (Returns 1/0)|
| Find Iter| \`s.find(10)\` | $O(\\log N)$ |
| First $\\ge x$| \`s.lower_bound(x)\` | $O(\\log N)$ |
`,
  resources: [
    {
      title: 'cppreference: std::set',
      url: 'https://en.cppreference.com/w/cpp/container/set',
      type: 'ARTICLE',
      priority: 'S',
      description: 'API reference for the set container.'
    }
  ]
};
