import { TopicContent } from './types';

export const topic33: TopicContent = {
  title: 'iterators',
  learningContent: `
# What is an Iterator?
An iterator is an object that points to an element inside an STL container (like a vector, map, or set). It behaves very much like a pointer.
The C++ Standard Library algorithms (like \`std::sort\`) do not take vectors or arrays directly. They take **iterators**. This allows one single \`std::sort\` function to work on a \`vector\`, a \`deque\`, or a \`std::array\` without rewriting the code!

## 1. \`begin()\` and \`end()\`
Every standard container provides these two methods:
*   **\`v.begin()\`**: Returns an iterator pointing to the **first** element.
*   **\`v.end()\`**: Returns an iterator pointing to **one past the last** element.

> **CRITICAL CONCEPT: [begin, end)**
> In C++, ranges are "half-open". The element at \`begin()\` is included, but the element at \`end()\` is NOT included. \`end()\` points to invalid memory right after the container finishes. This mathematically makes calculating the size of a range extremely easy: \`size = end - begin\`.

## 2. Basic Iterator Usage
Because iterators act like pointers, you use the dereference operator (\`*\`) to read/write the value they point to, and the increment operator (\`++\`) to move to the next element.

\`\`\`cpp
vector<int> v = {10, 20, 30};

// Traditional iterator loop (how range-based for loops work under the hood)
for (vector<int>::iterator it = v.begin(); it != v.end(); ++it) {
    cout << *it << " "; // *it gives the value
}

// Modern C++ with 'auto'
for (auto it = v.begin(); it != v.end(); ++it) { ... }
\`\`\`

## 3. Iterator Invalidation (The Danger Zone)
When you modify a container, its iterators might become permanently broken ("invalidated"). If you try to use an invalidated iterator, your program will crash.
*   **Vector/String:** Reallocating capacity invalidates ALL iterators. Erasing an element invalidates all iterators *after* the erased element.
*   **Deque:** Inserting at the front/back invalidates ALL iterators (but not references).
*   **List/Set/Map:** Highly stable. Inserting never invalidates iterators. Erasing only invalidates the iterator pointing to the specific erased element.

## DSA CONNECTION
*   **Algorithms:** All \`<algorithm>\` functions require iterators. 
    \`std::sort(v.begin(), v.end());\`
*   **Searching Maps/Sets:** \`auto it = myMap.find(key);\` returns an iterator. If it doesn't find the key, it returns \`myMap.end()\`.
`,
  fullNotes: `
# Iterators Reference

## 1. Iterator Categories
Not all iterators are created equal. Containers provide different "strengths" of iterators depending on their internal memory layout.
1.  **Forward Iterators:** Can only move forward (\`++it\`). Example: \`std::forward_list\`, \`std::unordered_map\`.
2.  **Bidirectional Iterators:** Can move forward and backward (\`++it\`, \`--it\`). Example: \`std::list\`, \`std::set\`, \`std::map\`.
3.  **Random Access Iterators:** Can jump directly to any element in $O(1)$ time (\`it + 5\`). Example: \`std::vector\`, \`std::deque\`, \`std::array\`.

*Why does this matter?* You cannot call \`std::sort\` on a \`std::list\` because \`std::sort\` mathematically requires Random Access Iterators to jump around memory quickly.

## 2. Reverse Iterators
If you need to iterate backward, containers provide \`rbegin()\` and \`rend()\`.
\`\`\`cpp
// Prints 30 20 10
vector<int> v = {10, 20, 30};
for (auto it = v.rbegin(); it != v.rend(); ++it) {
    cout << *it << " "; 
}
\`\`\`
*Note: You still use \`++it\` to move the reverse iterator! Using \`--it\` on a reverse iterator moves it forwards towards the start of the array.*

## 3. Const Iterators
If you just want to read data safely, use \`cbegin()\` and \`cend()\`. This returns a \`const_iterator\`, which prevents you from modifying the element via \`*it = 5;\`.

## 4. Interview Relevance
*   **Q:** What does \`v.end()\` point to?
    *   **A:** It points to the theoretical element one past the final valid element in the container. It should never be dereferenced.
*   **Q:** What is iterator invalidation? Give an example.
    *   **A:** It occurs when a container changes its memory layout, causing existing iterators to point to invalid or deallocated memory. For example, pushing to a vector might exceed its capacity, causing a reallocation to a new heap block; all previous iterators now point to the old, deleted block.
`,
  shortNotes: `
*   **Iterator:** An object that behaves like a pointer, used to traverse STL containers.
*   **[begin, end):** \`begin()\` is the first element. \`end()\` is strictly ONE PAST the last element.
*   **Dereference:** Use \`*it\` to get the value. Use \`it->member\` to get an object's member.
*   **Movement:** \`++it\` moves to the next element.
*   **Categories:** Vector/Deque have *Random Access* (can do \`it + 5\`). List/Set/Map are *Bidirectional* (can only do \`++it\` or \`--it\`).
*   **Invalidation:** Modifying a vector (like \`push_back\`) can invalidate all active iterators. Sets/Maps are much safer.
`,
  cheatSheet: `
| Operation | Code | Note |
|---|---|---|
| Start | \`v.begin()\` | Points to 1st element |
| End | \`v.end()\` | Points 1 PAST the last |
| Reverse Start| \`v.rbegin()\` | Points to last element |
| Const Start | \`v.cbegin()\` | Read-only iterator |
| Read Value | \`*it\` | Dereference |
| Move | \`++it\` | Advances iterator |
`,
  resources: [
    {
      title: 'LearnCpp: Introduction to iterators',
      url: 'https://www.learncpp.com/cpp-tutorial/introduction-to-iterators/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Excellent introduction to the concept of iterators.'
    }
  ]
};
