import { TopicContent } from './types';

export const topic21: TopicContent = {
  title: 'string',
  learningContent: `
# std::string as an STL Container
In C++, \`std::string\` is not just a basic type; it is essentially a highly specialized \`std::vector<char>\`. It obeys the same rules of capacity, size, and contiguous memory storage, but it has extra methods tailored specifically for text manipulation.

## 1. Core STL Properties
\`\`\`cpp
string s = "hello";
s.push_back('!'); // "hello!" (Just like vector)
s.pop_back();     // "hello"

cout << s.size();     // 5
cout << s.length();   // 5 (size() and length() do the exact same thing)
cout << s.capacity(); // Current memory allocated
\`\`\`

## 2. String Manipulation Methods
Strings have many powerful built-in methods that vectors lack.

### Appending
\`\`\`cpp
string a = "cat";
a += "s"; // "cats" (The standard, preferred way to append)
a.append(" are cute"); // "cats are cute"
\`\`\`

### Substrings
\`substr(start_index, length)\` extracts a piece of the string.
\`\`\`cpp
string text = "competitive programming";
// Start at index 12, take 11 characters
cout << text.substr(12, 11); // "programming"
\`\`\`
*Note: \`substr\` creates a brand new string, which takes $O(K)$ time where K is the length of the substring. Don't use it excessively in tight loops.*

### Finding
\`find\` searches for a substring or character and returns the starting index.
\`\`\`cpp
string str = "hello world";
size_t pos = str.find("world"); // pos = 6

if (str.find("dog") == string::npos) {
    cout << "Not found!"; // string::npos represents "no position"
}
\`\`\`

## 3. String Conversions
*   **String to Int:** \`int x = stoi("123");\`
*   **String to Long Long:** \`long long y = stoll("1234567890");\`
*   **Int to String:** \`string s = to_string(123);\`

## DSA CONNECTION
*   **Palindromes:** You can reverse a string easily using the STL \`reverse(s.begin(), s.end())\` to check for palindromes.
*   **Sliding Window / Two Pointers:** You often manipulate a \`left\` and \`right\` integer index pointing into a string, rather than copying substrings (which is slow).
*   **Frequency Counting:** Using a vector of size 26 or an \`unordered_map<char, int>\` to count letter occurrences.
`,
  fullNotes: `
# std::string Reference

## 1. Complexity Considerations
Just like \`std::vector\`:
*   **Indexing (\`s[i]\`):** $O(1)$
*   **Append (\`+=\` or \`push_back\`):** Amortized $O(1)$
*   **Insert/Erase in middle:** $O(N)$
*   **\`substr\` / String copying:** $O(N)$

## 2. Character Arithmetic
Because strings are just arrays of \`char\`s, and \`char\`s are just small integers (ASCII values), you can do math on them. This is heavily used in DSA!
\`\`\`cpp
char c = 'd';
int alphabetIndex = c - 'a'; // 'd' (100) - 'a' (97) = 3
\`\`\`
To convert a digit character to an actual integer:
\`\`\`cpp
char digit = '7';
int val = digit - '0'; // 7
\`\`\`

## 3. String Erase and Insert
\`\`\`cpp
string s = "abcdef";
s.erase(1, 3); // Erase 3 characters starting at index 1. Result: "aef"
s.insert(1, "bcd"); // Insert at index 1. Result: "abcdef"
\`\`\`

## 4. Interview Relevance
*   **Q:** Why should you pass strings by \`const std::string&\` instead of \`std::string\`?
    *   **A:** Passing by value invokes the copy constructor, which allocates new heap memory and performs an $O(N)$ deep copy of the characters. Passing by \`const&\` just passes a lightweight memory address ($O(1)$), avoiding the copy entirely while keeping the data safe from modification.
*   **Q:** How do you split a string by spaces in C++?
    *   **A:** C++ does not have a built-in \`split()\` method like Python or Java. You must use a \`std::stringstream\` (from \`<sstream>\`) to read word by word, or write a custom loop using \`.find()\`.
`,
  shortNotes: `
*   **Dual Nature:** \`std::string\` is a text type, but acts exactly like a \`vector<char>\`.
*   **\`size()\` vs \`length()\`:** Identical. Use whichever you prefer.
*   **\`substr(idx, len)\`:** Returns a new string. $O(L)$ complexity.
*   **\`find(str)\`:** Returns index. Check against \`string::npos\` if not found.
*   **Type Casting:** Use \`to_string(num)\` and \`stoi(str)\`.
*   **ASCII Math:** Convert char to 0-25 index using \`char - 'a'\`. Convert char digit to int using \`char - '0'\`.
`,
  cheatSheet: `
| Operation | Syntax | Note |
|---|---|---|
| Append | \`s += "x"\` | Fast, Amortized O(1) |
| Find | \`s.find("x")\` | Returns index or \`string::npos\`|
| Substring | \`s.substr(0, 5)\` | O(N) copy, use sparingly |
| Erase | \`s.erase(pos, len)\` | O(N) shift |
| To Int | \`stoi(s)\` | From \`<string>\` |
| From Int | \`to_string(42)\` | From \`<string>\` |
`,
  resources: [
    {
      title: 'cppreference: std::basic_string',
      url: 'https://en.cppreference.com/w/cpp/string/basic_string',
      type: 'ARTICLE',
      priority: 'S',
      description: 'API documentation for string methods.'
    }
  ]
};
