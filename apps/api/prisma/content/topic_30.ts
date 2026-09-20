import { TopicContent } from './types';

export const topic30: TopicContent = {
  title: 'map',
  learningContent: `
# What is std::map?
A \`std::map\` is a collection of Key-Value pairs. It is an associative container where each key is **unique** and the keys are stored in **sorted order**.
Think of it like a dictionary: the word is the "Key", and the definition is the "Value". You look up the definition using the word.

Like \`std::set\`, a \`std::map\` is implemented under the hood as a self-balancing binary search tree (Red-Black Tree), meaning lookups, insertions, and deletions take **$O(\\log N)$** time.

## 1. Declaration and Usage
\`\`\`cpp
#include <map>
using namespace std;

// map<KeyType, ValueType>
map<string, int> ages;

// Inserting / Updating via operator[]
ages["Alice"] = 25;
ages["Bob"] = 30;

// Accessing
cout << ages["Alice"]; // 25
\`\`\`

## 2. The \`operator[]\` Trap (CRITICAL)
In C++, the bracket operator \`[]\` on a map is "smart"—sometimes too smart.
If you try to read a key that does **not exist**, the map will silently **CREATE** that key and initialize it with a default value (e.g., 0 for \`int\`, empty string for \`string\`)!
\`\`\`cpp
map<string, int> m;
m["Alice"] = 25;

// We just want to check if Charlie exists...
if (m["Charlie"] == 0) { 
    cout << "Charlie is 0 or doesn't exist.";
}
// BUG! We just accidentally inserted "Charlie" into the map with a value of 0!
// The size of the map just increased.
\`\`\`

**The Safe Way to Check Existence:**
Always use \`.count()\` or \`.find()\` if you just want to check if a key exists without accidentally creating it.
\`\`\`cpp
if (m.count("Charlie")) {
    cout << "Exists!";
}
\`\`\`

## 3. Iteration
When you iterate through a map, you get \`std::pair\` objects back. The pair contains \`.first\` (the key) and \`.second\` (the value). Because it's a map, the iteration is guaranteed to be sorted by the Keys!
\`\`\`cpp
map<string, int> m = { {"Zebra", 5}, {"Apple", 2} };

for (auto pair : m) {
    cout << pair.first << ": " << pair.second << "\\n";
}
// Prints:
// Apple: 2
// Zebra: 5
\`\`\`

## DSA CONNECTION
*   **Coordinate mapping:** When working with a sparse 1D grid where coordinates can be up to $10^9$, you can't use an array (it would take gigabytes of RAM). A \`map<int, int>\` lets you map coordinates to values easily.
*   **Frequency Counting (Ordered):** If a problem asks you to count the frequency of elements AND print them in sorted order, \`std::map\` does both automatically.
`,
  fullNotes: `
# std::map Reference

## 1. \`insert\` vs \`operator[]\`
*   \`m["Key"] = Value;\`: If the key exists, it overwrites the value. If it doesn't, it inserts it.
*   \`m.insert({"Key", Value});\`: If the key exists, it **DOES NOTHING**. It ignores the new value. It only inserts if the key does not exist.

## 2. Iterators and Structure
*   A map stores \`std::pair<const Key, Value>\`. Notice the \`const\` on the Key. Once a key is in the map, its value cannot change because its position in the Red-Black tree is based on that key. To change a key, you must erase the old pair and insert a new one. You can, however, freely modify the Value (\`.second\`).

## 3. Structured Binding (C++17)
Instead of using \`pair.first\` and \`pair.second\`, modern C++ allows you to unpack the pair directly in the loop.
\`\`\`cpp
map<string, int> m = {{"A", 1}, {"B", 2}};

for (auto const& [key, val] : m) {
    cout << key << "=" << val;
}
\`\`\`

## 4. Interview Relevance
*   **Q:** What is the time complexity of searching in a \`std::map\` versus a \`std::unordered_map\`?
    *   **A:** \`std::map\` uses a balanced binary search tree, so lookup is guaranteed $O(\\log N)$ in both average and worst cases. \`std::unordered_map\` uses a hash table, so lookup is $O(1)$ on average, but can degrade to $O(N)$ in the worst case if there are many hash collisions.
*   **Q:** Why might \`std::map\` be slower than a vector for looking up small contiguous integer keys (like 1 to 100)?
    *   **A:** A vector allows $O(1)$ direct memory access. A map requires traversing a node-based tree structure ($O(\\log N)$), which involves multiple pointer dereferences and cache misses. If keys are dense, small integers, always use a vector.
`,
  shortNotes: `
*   **Concept:** Key-Value store. Keys are unique and **sorted automatically**.
*   **Implementation:** Red-Black Tree.
*   **Complexity:** $O(\\log N)$ for insert, search, and delete.
*   **\`[]\` Trap:** Reading a non-existent key via \`map[key]\` will silently INSERT it with a default value.
*   **Safe Check:** Use \`m.count(key)\` to see if a key exists safely.
*   **Iteration:** Yields \`std::pair<const Key, Value>\` ordered by Key.
`,
  cheatSheet: `
| Operation | Syntax | Complexity | Note |
|---|---|---|---|
| Upsert | \`m["x"] = 5\` | $O(\\log N)$ | Inserts or overwrites |
| Read Safe | \`m.at("x")\` | $O(\\log N)$ | Throws if missing |
| Read Unsafe| \`m["x"]\` | $O(\\log N)$ | Inserts 0 if missing! |
| Exists? | \`m.count("x")\` | $O(\\log N)$ | Returns 1 or 0 |
| Delete | \`m.erase("x")\` | $O(\\log N)$ | |
`,
  resources: [
    {
      title: 'cppreference: std::map',
      url: 'https://en.cppreference.com/w/cpp/container/map',
      type: 'ARTICLE',
      priority: 'S',
      description: 'API reference for the map container.'
    }
  ]
};
