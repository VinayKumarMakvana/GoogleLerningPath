import { TopicContent } from './types';

export const topic34: TopicContent = {
  title: 'Algorithms',
  learningContent: `
# C++ Standard Algorithms (\`<algorithm>\`)
C++ provides a massive library of highly optimized functions that operate on iterator ranges. 
Instead of writing manual \`for\` loops to search, count, or reverse elements, you should use the STL algorithms. They are less bug-prone and often faster.

Every algorithm typically takes a range: \`[first, last)\`.
For a whole vector, this is \`v.begin(), v.end()\`.

## 1. Sorting and Reversing
\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {5, 2, 9, 1};

// Sort ascending (O(N log N))
sort(v.begin(), v.end()); // [1, 2, 5, 9]

// Reverse (O(N))
reverse(v.begin(), v.end()); // [9, 5, 2, 1]
\`\`\`

## 2. Searching
\`\`\`cpp
// find: Returns iterator to the first '5', or v.end() if missing. O(N).
auto it = find(v.begin(), v.end(), 5);

// count: Returns the number of times '9' appears. O(N).
int c = count(v.begin(), v.end(), 9);
\`\`\`

## 3. Binary Search (Requires a SORTED container!)
If your vector is already sorted, you can search in **$O(\\log N)$** time.
\`\`\`cpp
vector<int> sorted_v = {10, 20, 30, 40};

// binary_search: Returns true or false
bool exists = binary_search(sorted_v.begin(), sorted_v.end(), 30); // true

// lower_bound: Returns iterator to the FIRST element >= 25
auto lb = lower_bound(sorted_v.begin(), sorted_v.end(), 25);
cout << *lb; // 30
\`\`\`
*Note: \`lower_bound\` is vastly more useful in DSA than \`binary_search\` because it tells you exactly WHERE the element should be.*

## 4. Min / Max
\`\`\`cpp
cout << min(10, 20); // 10
cout << max(10, 20); // 20

// Find min/max element in a container (Returns an iterator!)
auto min_it = min_element(v.begin(), v.end());
cout << *min_it; 
\`\`\`

## DSA CONNECTION
*   **Sorting:** \`std::sort\` is the backbone of greedy algorithms and preparing arrays for two-pointers.
*   **Binary Search:** \`lower_bound\` is used constantly to optimize $O(N^2)$ solutions down to $O(N \\log N)$.
*   **Accumulate:** Used for prefix sums and total sums.
`,
  fullNotes: `
# Algorithms Reference

## 1. The Erase-Remove Idiom
To delete all instances of a specific value from a vector, you cannot just use an algorithm (because algorithms cannot change a container's size, they only move elements around using iterators). You must combine \`std::remove\` with the vector's \`erase\` method.
\`\`\`cpp
vector<int> v = {1, 3, 3, 4, 3, 5};

// std::remove shifts all non-3s to the front, and returns an iterator to the new "end"
auto new_end = remove(v.begin(), v.end(), 3); 

// v.erase actually deletes the garbage left at the end of the vector
v.erase(new_end, v.end());
// Final: [1, 4, 5]
\`\`\`
*(In C++20, this is simplified to \`std::erase(v, 3);\`, but you must understand the classic idiom for interviews).*

## 2. custom Comparators
Many algorithms take a third parameter: a function that tells the algorithm how to behave.
\`\`\`cpp
bool descending(int a, int b) {
    return a > b;
}
sort(v.begin(), v.end(), descending); // Sorts largest to smallest
\`\`\`

## 3. \`std::stable_sort\`
\`std::sort\` is extremely fast (Introsort), but it does not guarantee relative order of equal elements. If you have objects that are "tied", and you want them to remain in the exact order they originally appeared, you must use \`std::stable_sort(v.begin(), v.end())\`, which uses Mergesort.

## 4. Interview Relevance
*   **Q:** What is the difference between \`binary_search\` and \`lower_bound\`?
    *   **A:** \`binary_search\` strictly returns a boolean indicating whether the element exists. \`lower_bound\` returns an iterator to the first element that does not compare less than the target (i.e., $\\ge$). \`lower_bound\` provides far more information and is generally preferred in competitive programming.
`,
  shortNotes: `
*   **Header:** \`#include <algorithm>\`
*   **Ranges:** Almost all take \`(begin_iterator, end_iterator)\`.
*   **\`sort()\`:** $O(N \\log N)$ Introsort. Best general purpose sort.
*   **\`reverse()\`:** $O(N)$ reversal in-place.
*   **\`find()\`:** $O(N)$ linear search. Returns iterator or \`end()\`.
*   **\`lower_bound(target)\`:** $O(\\log N)$ binary search. Returns iterator to first element $\\ge$ target. Array MUST be sorted first!
*   **Erase-Remove:** \`v.erase(remove(v.begin(), v.end(), val), v.end())\` to fully delete an element from a vector.
`,
  cheatSheet: `
| Algorithm | Code | Complexity | Note |
|---|---|---|---|
| Sort | \`sort(v.begin(), v.end())\` | $O(N \\log N)$| Modifies in-place |
| Reverse | \`reverse(v.begin(), v.end())\` | $O(N)$ | Modifies in-place |
| Search | \`find(v.begin(), v.end(), x)\` | $O(N)$ | Unsorted arrays |
| BinSearch | \`lower_bound(..., x)\` | $O(\\log N)$ | Must be sorted |
| Min Elem | \`min_element(v.begin(), v.end())\`| $O(N)$ | Returns iterator |
| Sum | \`accumulate(v.begin(), v.end(), 0)\`| $O(N)$ | from \`<numeric>\` |
`,
  resources: [
    {
      title: 'cppreference: Algorithms library',
      url: 'https://en.cppreference.com/w/cpp/algorithm',
      type: 'ARTICLE',
      priority: 'S',
      description: 'The master list of all standard algorithms.'
    }
  ]
};
