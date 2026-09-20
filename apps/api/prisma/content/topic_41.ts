import { TopicContent } from './types';

export const topic41: TopicContent = {
  title: 'String Manipulation',
  learningContent: `
# String Manipulation
Because a string is essentially just an array of characters, everything you learned about Array Traversal and Manipulation applies directly to strings.
However, strings come with their own unique set of classic algorithmic patterns, usually centered around text processing, palindromes, and character counting.

## 1. Character Math (ASCII)
The most important trick in string manipulation is realizing that \`char\` types are just small integers representing ASCII values.
*   \`'A'\` is 65, \`'B'\` is 66, ..., \`'Z'\` is 90
*   \`'a'\` is 97, \`'b'\` is 98, ..., \`'z'\` is 122
*   \`'0'\` is 48, \`'1'\` is 49, ..., \`'9'\` is 57

If you want to map the lowercase alphabet to indices $0-25$ (which is incredibly common for frequency arrays):
\`\`\`cpp
char c = 'd';
int index = c - 'a'; // 'd'(100) - 'a'(97) = 3. 
\`\`\`
If you want to convert a numeric character to an actual integer:
\`\`\`cpp
char num_char = '7';
int value = num_char - '0'; // '7'(55) - '0'(48) = 7.
\`\`\`

## 2. Classic Pattern: Palindrome Checking
A palindrome is a word that reads the same forwards and backwards ("racecar").
This is the absolute classic introduction to the **Two Pointers** pattern.

Instead of reversing the string and comparing it (which takes $O(N)$ extra space), use an $O(1)$ space approach:
\`\`\`cpp
bool isPalindrome(string s) {
    int left = 0;
    int right = s.length() - 1;
    
    while (left < right) {
        if (s[left] != s[right]) {
            return false; // Mismatch found
        }
        left++;
        right--;
    }
    return true;
}
\`\`\`

## 3. Classic Pattern: Character Frequency (Anagrams)
Two strings are **anagrams** if they contain the exact same characters in any order ("listen" and "silent").
The naive way is to sort both strings and compare them ($O(N \\log N)$ time).
The optimal way is to use a **Frequency Array** ($O(N)$ time, $O(1)$ space).

\`\`\`cpp
bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;
    
    // We only need 26 slots for lowercase English letters
    vector<int> counts(26, 0); 
    
    for (int i = 0; i < s.length(); i++) {
        counts[s[i] - 'a']++; // Increment for string s
        counts[t[i] - 'a']--; // Decrement for string t
    }
    
    // If they are anagrams, every slot must return to exactly 0
    for (int count : counts) {
        if (count != 0) return false;
    }
    return true;
}
\`\`\`
`,
  fullNotes: `
# String Manipulation Reference

## 1. Substrings vs Sliding Windows
A common beginner mistake is using \`s.substr(start, length)\` repeatedly in a loop.
\`\`\`cpp
// DANGEROUS: O(N^2) Time Complexity!
for (int i = 0; i < s.length(); i++) {
    string part = s.substr(i, 5); // Takes O(K) time where K is 5.
    // ...
}
\`\`\`
In C++, \`substr()\` allocates a brand new string and copies the characters over. If you do this inside a loop, you drastically increase your time and space complexity.
**Better Approach:** Use a Sliding Window (two integer index variables tracking the start and end of the relevant substring) to process the string in-place without creating copies.

## 2. Normalization
Interview string problems often involve messy data containing punctuation and mixed casing.
You must be comfortable using the \`<cctype>\` library functions:
*   \`isalnum(c)\`: Returns true if alphanumeric (a-z, A-Z, 0-9).
*   \`isalpha(c)\`: Returns true if a letter.
*   \`isdigit(c)\`: Returns true if a number.
*   \`tolower(c)\`: Converts to lowercase.

\`\`\`cpp
// Example: Safely normalizing a character
char c = 'A';
if (isalnum(c)) {
    char lower_c = tolower(c);
}
\`\`\`

## 3. Interview Relevance
*   **Q:** Why is an array of size 26 or 256 considered $O(1)$ space?
    *   **A:** Space complexity measures how the memory grows relative to the input size $N$. If the input string is 10 characters long, the frequency array is size 26. If the input string is 1 billion characters long, the frequency array is STILL size 26. Because the memory required is a constant, unvarying amount, it is mathematically $O(1)$ space.
*   **Q:** In languages like Java or Python, strings are immutable. Are they immutable in C++?
    *   **A:** No, C++ \`std::string\` is mutable. You can directly change characters using \`s[i] = 'z';\`. This allows for $O(1)$ space in-place string manipulation, which is impossible in Java/Python.
`,
  shortNotes: `
*   **ASCII Math:** The absolute core of string DSA. 
    *   \`char - 'a'\` maps \`a-z\` to \`0-25\`.
    *   \`char - '0'\` converts numeric characters to integers.
*   **Frequency Arrays:** For fixed alphabets (like 26 lowercase letters), use a \`vector<int>(26, 0)\` instead of a hash map. It is vastly faster and mathematically $O(1)$ space.
*   **Palindromes:** Check using Two Pointers (Left and Right moving inwards). $O(N)$ time, $O(1)$ space.
*   **Anagrams:** Use a single frequency array. Increment counts for the first string, decrement for the second. Check if all counts are 0.
*   **Substrings:** Avoid calling \`s.substr()\` in tight loops due to $O(K)$ copy overhead. Use pointer variables (indices) instead.
*   **Normalization:** Use \`isalnum()\` and \`tolower()\` from \`<cctype>\`.
`,
  cheatSheet: `
| Intent | Code/Approach | Complexity |
|---|---|---|
| Char to 0-25 | \`int idx = c - 'a';\` | $O(1)$ |
| Char to Int | \`int val = c - '0';\` | $O(1)$ |
| Is Alphanumeric| \`isalnum(c)\` | $O(1)$ |
| To Lowercase | \`tolower(c)\` | $O(1)$ |
| Palindrome | Two Pointers (L/R) | $O(N)$ Time, $O(1)$ Space |
| Anagram Check | Frequency Array[26] | $O(N)$ Time, $O(1)$ Space |
`,
  resources: [
    {
      title: 'GeeksForGeeks: Check if two strings are anagrams',
      url: 'https://www.geeksforgeeks.org/check-whether-two-strings-are-anagram-of-each-other/',
      type: 'ARTICLE',
      priority: 'B',
      description: 'Excellent breakdown of the frequency array technique.'
    }
  ]
};
