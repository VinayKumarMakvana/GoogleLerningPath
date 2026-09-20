import { TopicContent } from './types';

export const topic11: TopicContent = {
  title: 'Strings',
  learningContent: `
# Strings in C++
A string is simply a sequence of characters used to represent text. Modern C++ provides \`std::string\` (in the \`<string>\` header), which is incredibly powerful, safe, and dynamic.

## C-Style Strings vs \`std::string\`
*   **C-Style String:** An array of \`char\` ending with a special null terminator \`'\\0'\` (e.g., \`char name[] = "Bob";\`). These are difficult to manipulate and prone to buffer overflows.
*   **\`std::string\`:** A class that manages its own memory, knows its own size, and can grow dynamically. **Always use \`std::string\` in modern C++.**

## Basic Operations
\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string first = "Hello";
    string last = "World";
    
    // Concatenation
    string full = first + " " + last; // "Hello World"
    
    // Length
    cout << full.length(); // 11
    
    // Indexing (0-based, exactly like arrays)
    cout << full[0]; // 'H'
    full[0] = 'J';   // Changes to "Jello World"
}
\`\`\`

## String Traversal
You can iterate through a string character by character.
\`\`\`cpp
string word = "Code";
for (char c : word) {
    cout << c << "-"; // Prints: C-o-d-e-
}
\`\`\`

## Important Methods
*   \`s.empty()\`: Returns \`true\` if the string has no characters. (Faster than \`s.length() == 0\`).
*   \`s.substr(start_index, length)\`: Extracts a piece of the string.
*   \`s.find(substring)\`: Returns the starting index of a substring, or \`string::npos\` if not found.

## Input: \`cin\` vs \`getline\`
*   \`cin >> str;\` reads one word. It stops at the first space.
*   \`getline(cin, str);\` reads the whole line including spaces.
> **Warning:** Mixing \`cin >>\` (for numbers) followed by \`getline\` will cause \`getline\` to read an empty line. Always use \`cin.ignore();\` in between!

## DSA CONNECTION
Strings in C++ are essentially dynamic arrays of characters.
*   **Frequency Counting:** Counting how many times 'a', 'b', etc., appear by using an array of size 26 or a hash map.
*   **Two Pointers:** Checking if a string is a palindrome by putting a pointer at the start and end, comparing, and moving inward.
*   **Sliding Window:** Finding the longest substring without repeating characters.
`,
  fullNotes: `
# Strings Reference

## 1. Initialization and Assignment
*   \`std::string s1 = "Hello";\`
*   \`std::string s2(5, 'A');\` // Creates "AAAAA"
*   \`std::string s3 = s1;\` // Creates a deep copy of s1

## 2. Capacity vs Size
*   **Size/Length:** How many characters are currently in the string (\`s.size()\`).
*   **Capacity:** How much memory is allocated. As strings grow, capacity doubles to prevent constant memory reallocation.

## 3. String Methods
*   \`s.push_back('c');\` // Appends a single char. Faster than \`s += 'c'\`.
*   \`s.pop_back();\` // Removes the last char.
*   \`s.substr(pos, len);\` // Returns a new string starting at \`pos\` spanning \`len\` characters.
*   \`s.find("text");\` // Returns index of first match. Check against \`std::string::npos\`.

## 4. Comparing Strings
Unlike C-style strings (which require \`strcmp\`), \`std::string\` supports standard operators: \`==\`, \`!=\`, \`<\`, \`>\`. These compare strings lexicographically (alphabetical order).

## 5. Performance considerations
Passing strings to functions by value (\`void print(string s)\`) makes a complete copy of the string in memory. For large strings, this is devastating to performance. **Always pass strings by const reference** if you only need to read them: \`void print(const string& s)\`.

## 6. Interview Relevance
*   **Q:** What is the difference between \`size()\` and \`capacity()\`?
    *   **A:** \`size()\` is the number of active characters. \`capacity()\` is the total allocated memory block size.
*   **Q:** How do you reverse a string in C++?
    *   **A:** Use the standard library algorithm: \`std::reverse(s.begin(), s.end());\`
`,
  shortNotes: `
*   **Header:** \`#include <string>\`.
*   **Initialization:** \`string s = "Hello";\`
*   **Concatenation:** \`s = s1 + s2;\`
*   **Indexing:** \`s[0]\` gets the first char. It behaves like an array of chars.
*   **Size:** \`s.length()\` or \`s.size()\`.
*   **Substrings:** \`s.substr(startIndex, length)\`.
*   **Find:** \`s.find("abc")\`. If not found, returns \`string::npos\`.
*   **Input:** \`getline(cin, s)\` to read spaces.
*   **Function Params:** Always pass as \`const string& name\` to avoid slow copies.
`,
  cheatSheet: `
| Operation | Code | Result |
|---|---|---|
| Length | \`s.length()\` | Int |
| Access | \`s[i]\` | \`char\` at index i |
| Append | \`s += "!"\` | Mutates s |
| Substring | \`s.substr(0, 3)\` | First 3 chars |
| Search | \`s.find("A")\` | Index or \`npos\` |
| Is Empty? | \`s.empty()\` | \`true\`/\`false\` |
`,
  resources: [
    {
      title: 'cppreference: std::basic_string',
      url: 'https://en.cppreference.com/w/cpp/string/basic_string',
      type: 'ARTICLE',
      priority: 'A',
      description: 'Official API documentation for string methods.'
    },
    {
      title: 'LearnCpp: Introduction to std::string',
      url: 'https://www.learncpp.com/cpp-tutorial/introduction-to-stdstring/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Excellent beginner explanation of strings.'
    }
  ]
};
