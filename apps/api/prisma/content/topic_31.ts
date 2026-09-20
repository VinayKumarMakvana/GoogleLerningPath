import { TopicContent } from './types';

export const topic31: TopicContent = {
  title: 'unordered_map',
  learningContent: `
# What is std::unordered_map?
An \`unordered_map\` is a Key-Value dictionary just like \`std::map\`, but with two massive differences:
1.  **No Ordering:** The keys are stored in a seemingly random order. Iterating through it will give you the elements in a scrambled order.
2.  **Blazing Fast (Usually):** Under the hood, it is implemented as a **Hash Table**. Insertions, deletions, and lookups take **Average $O(1)$** time!

## 1. Syntax and Usage
The syntax is exactly identical to \`std::map\`. You don't have to learn new commands.
\`\`\`cpp
#include <unordered_map>
using namespace std;

unordered_map<string, int> um;

um["Apple"] = 5;
um["Banana"] = 2;

cout << um["Apple"]; // 5
if (um.count("Orange")) { ... }
\`\`\`
It suffers from the exact same \`operator[]\` trap: accessing a missing key will silently insert it.

## 2. How Hashing Works (Conceptual)
When you do \`um["Apple"] = 5\`, the map runs the string "Apple" through a mathematical **Hash Function**. This function spits out an integer (e.g., 832). The map then stores the value \`5\` at index 832 in its internal array (called a bucket).
When you later ask for \`um["Apple"]\`, it recalculates the hash (832), jumps instantly to index 832 in the array, and returns \`5\`. This is why it is $O(1)$!

## 3. The Collision Nightmare (Worst-Case $O(N)$)
What if the hash function accidentally spits out "832" for both "Apple" and "Zebra"? This is a **Hash Collision**.
The unordered_map handles this by storing both items in a linked list at bucket 832. 
If a malicious user (or an incredibly unlucky competitive programming test case) feeds your map thousands of keys that all collide to the same bucket, your $O(1)$ lookup degrades into a linear search through a linked list, making it **$O(N)$ worst-case**.

## DSA CONNECTION
*   **Frequency Counting:** The single most common use for \`unordered_map\`. Given an array of numbers, count how many times each appears.
    \`\`\`cpp
    unordered_map<int, int> freq;
    for (int num : arr) {
        freq[num]++; // Perfectly increments the count in O(1) time
    }
    \`\`\`
*   **Two Sum / Hash lookups:** When you need to instantly check "have I seen this exact number before?" while iterating through an array.
`,
  fullNotes: `
# std::unordered_map Reference

## 1. Map vs Unordered_Map
| Feature | \`std::map\` | \`std::unordered_map\` |
|---|---|---|
| Underlying | Red-Black Tree | Hash Table |
| Ordering | Sorted by Key | Scrambled |
| Search Time| Guaranteed $O(\\log N)$ | Average $O(1)$, Worst $O(N)$ |
| Memory | High (Tree pointers) | Moderate/High (Buckets + linked lists) |

## 2. Custom Types as Keys
You can easily use an \`int\` or a \`string\` as a key in an \`unordered_map\` because C++ provides standard hash functions for them. 
However, if you want to use a \`std::pair<int, int>\` or a custom \`struct Node\` as a key, the compiler will throw a massive error. C++ does not know how to hash a pair or a custom struct by default!
You must either provide a custom hash function (which is tedious in C++), or just use a standard \`std::map\` (which only requires the \`<\` operator, which is much easier to define).

## 3. Load Factor and Rehashing
*   **Load Factor:** The ratio of elements to buckets. (\`size / bucket_count\`).
*   **Rehashing:** When the load factor gets too high (default 1.0), the map allocates a much larger array of buckets and recalculates the hash for every single element, moving them to new buckets. This is an expensive $O(N)$ operation.
*   **Optimization:** If you know you will insert 100,000 items, use \`um.reserve(100000);\` to prevent costly rehashing, exactly like you do for a \`vector\`.

## 4. Interview Relevance
*   **Q:** Why might a competitive programming platform give a TLE (Time Limit Exceeded) error for \`unordered_map\` but pass for \`map\`?
    *   **A:** Codeforces and other CP platforms often use malicious test cases designed to trigger Hash Collisions in the default C++ hash function. This forces the \`unordered_map\` into its worst-case $O(N)$ behavior. A \`std::map\` guarantees $O(\\log N)$ no matter what data is fed into it.
`,
  shortNotes: `
*   **Concept:** Key-Value dictionary powered by a Hash Table.
*   **Ordering:** None. Keys are scrambled.
*   **Complexity:** Average $O(1)$. Worst Case $O(N)$ (due to hash collisions).
*   **Usage:** The default choice for frequency counting and instant lookups.
*   **Trap:** \`um[missing_key]\` will silently insert the key with a default value. Use \`.count()\` to check.
*   **Custom Keys:** You cannot use \`pair\` or custom structs as keys without writing a complex custom hash function.
`,
  cheatSheet: `
| Operation | Syntax | Average Complexity |
|---|---|---|
| Upsert | \`um["x"] = 5\` | $O(1)$ |
| Read Unsafe| \`um["x"]\` | $O(1)$ (Inserts if missing) |
| Exists? | \`um.count("x")\` | $O(1)$ |
| Delete | \`um.erase("x")\` | $O(1)$ |
| Prevent Rehash| \`um.reserve(N)\`| $O(N)$ once |
`,
  resources: [
    {
      title: 'cppreference: std::unordered_map',
      url: 'https://en.cppreference.com/w/cpp/container/unordered_map',
      type: 'ARTICLE',
      priority: 'S',
      description: 'API reference for unordered_map.'
    }
  ]
};
