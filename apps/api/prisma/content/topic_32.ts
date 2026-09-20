import { TopicContent } from './types';

export const topic32: TopicContent = {
  title: 'unordered_set',
  learningContent: `
# What is std::unordered_set?
An \`unordered_set\` is a collection of **unique** elements, implemented using a **Hash Table**.
It is the exact same concept as an \`unordered_map\`, except it only stores Keys (it doesn't store Values).

## 1. The Membership Container
The primary purpose of an \`unordered_set\` is to answer one question as fast as possible: **"Have I seen this item before?"**

\`\`\`cpp
#include <unordered_set>
using namespace std;

unordered_set<int> seen;

seen.insert(10);
seen.insert(20);
seen.insert(10); // Ignored, 10 is already in the set

if (seen.count(20)) {
    cout << "I have seen 20!";
}
\`\`\`
Because it is a Hash Table, \`insert()\`, \`erase()\`, and \`count()\` take **Average $O(1)$** time.

## 2. Set vs Unordered_Set
If you want to maintain a collection of unique elements, how do you choose?

*   Do you need to iterate over the elements in sorted order? -> **Use \`std::set\`** ($O(\\log N)$)
*   Do you need to find the "smallest element greater than X" (\`lower_bound\`)? -> **Use \`std::set\`**
*   Do you JUST need to check if something exists? -> **Use \`std::unordered_set\`** ($O(1)$)

## 3. Order is Scrambled
Because elements are placed into buckets based on their hash values, iterating through an \`unordered_set\` will yield the elements in a seemingly random order that has nothing to do with insertion order or numerical value.
\`\`\`cpp
unordered_set<int> us = {50, 10, 30};
for (int x : us) cout << x << " "; 
// Might print: 30 50 10
\`\`\`

## DSA CONNECTION
*   **Duplicate Detection:** Given an array, does it contain any duplicates? Just dump elements into an \`unordered_set\` and check if the size of the set equals the size of the array.
*   **Visited State in Graph Traversal:** During BFS or DFS, you need to keep track of which nodes you have already visited to avoid infinite loops. An \`unordered_set\` is perfect for checking \`visited.count(currentNode)\` in $O(1)$ time.
`,
  fullNotes: `
# std::unordered_set Reference

## 1. Complexity Breakdown
*   **Average Case:** $O(1)$ for insertion, deletion, and lookup.
*   **Worst Case:** $O(N)$ for insertion, deletion, and lookup. This occurs if there are massive Hash Collisions (all elements hash to the same bucket).
*   Like \`unordered_map\`, it can undergo an $O(N)$ rehashing operation if it grows too large. Use \`.reserve(N)\` if you know exactly how many unique elements you will insert.

## 2. What cannot be hashed?
Just like \`unordered_map\`, the C++ standard library does not provide a default hash function for \`std::pair\` or \`std::vector\`.
If you try to write:
\`\`\`cpp
unordered_set<pair<int, int>> visited_coordinates;
\`\`\`
It will result in a massive compilation error. You must either provide a custom hash struct, or simply use \`std::set<pair<int, int>>\` which works perfectly out-of-the-box because \`std::pair\` has a default \`<\` operator.

## 3. Interview Relevance
*   **Q:** You need to store $10^6$ unique integers and frequently check if a specific integer exists. Should you use a \`std::set\` or \`std::unordered_set\`?
    *   **A:** \`std::unordered_set\` is the better choice. Lookup is $O(1)$, which is substantially faster than $O(\\log N)$ for $10^6$ elements. The only exception is if the problem requires protecting against worst-case $O(N)$ malicious hash collisions, in which case \`std::set\` provides guaranteed $O(\\log N)$ safety.
`,
  shortNotes: `
*   **Concept:** A collection of unique elements backed by a Hash Table.
*   **Ordering:** None. Iteration order is undefined/scrambled.
*   **Complexity:** Average $O(1)$ for insert, erase, and lookup.
*   **Primary Use:** High-speed membership testing ("Have I visited this node?", "Is this a duplicate?").
*   **Limitations:** Cannot use \`lower_bound\`. Cannot easily store \`std::pair\` or custom structs without writing a custom hash function.
`,
  cheatSheet: `
| Operation | Syntax | Average Complexity |
|---|---|---|
| Add | \`us.insert(10)\` | $O(1)$ |
| Remove | \`us.erase(10)\` | $O(1)$ |
| Exists? | \`us.count(10)\` | $O(1)$ (Returns 1/0) |
| Find Iter | \`us.find(10)\` | $O(1)$ |
`,
  resources: [
    {
      title: 'cppreference: std::unordered_set',
      url: 'https://en.cppreference.com/w/cpp/container/unordered_set',
      type: 'ARTICLE',
      priority: 'S',
      description: 'API reference for unordered_set.'
    }
  ]
};
