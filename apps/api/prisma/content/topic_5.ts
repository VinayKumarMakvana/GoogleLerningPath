import { TopicContent } from './types';

export const topic5: TopicContent = {
  title: 'Input/output',
  learningContent: `
# Input and Output (I/O)
Programs are useless if they can't communicate with the outside world. In C++, standard I/O is handled by streams from the \`<iostream>\` library.

## Output (\`std::cout\`)
\`cout\` stands for "character output". You push data into it using the insertion operator \`<<\`.
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int age = 20;
    cout << "You are " << age << " years old.\\n";
    return 0;
}
\`\`\`
**Newlines:** You can use \`"\\n"\` or \`std::endl\`.
*   \`"\\n"\`: Just adds a newline character (faster, preferred).
*   \`std::endl\`: Adds a newline AND flushes the output buffer (slower, can cause performance issues in massive loops).

## Input (\`std::cin\`)
\`cin\` stands for "character input". You extract data from it using the extraction operator \`>>\`.
\`\`\`cpp
int x;
cin >> x;
\`\`\`
*Important:* \`cin >>\` stops reading at the first whitespace (space, tab, or newline). If you type "John Doe", \`cin >> name\` only grabs "John".

## Reading entire lines (\`std::getline\`)
To read an entire line of text including spaces, use \`std::getline\` (requires \`<string>\`).
\`\`\`cpp
#include <iostream>
#include <string>

int main() {
    std::string fullName;
    std::getline(std::cin, fullName);
    std::cout << fullName;
}
\`\`\`

## The \`cin >>\` then \`getline\` Trap
If you mix \`cin >>\` and \`getline\`, your program might skip the \`getline\` entirely!
Why? \`cin >>\` reads a number but leaves the invisible newline character (Enter key) sitting in the input buffer. \`getline\` sees that newline immediately and thinks you entered an empty string.
**Fix:** Add \`std::cin.ignore();\` after \`cin >>\` to throw away the leftover newline.

## DSA CONNECTION
In Competitive Programming (CP), input reading can be a huge bottleneck. CPers often add these two lines at the top of \`main()\`:
\`\`\`cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
\`\`\`
*   \`sync_with_stdio(false)\`: Disconnects C++ I/O streams from C I/O streams (making \`cin\`/\`cout\` much faster).
*   \`cin.tie(nullptr)\`: Unties \`cin\` from \`cout\`, meaning \`cout\` won't automatically flush before every \`cin\`.
*Warning: If you use these, DO NOT mix \`printf\`/\`scanf\` with \`cout\`/\`cin\`!*
`,
  fullNotes: `
# Input/Output Reference

## 1. Core Streams
*   \`#include <iostream>\`
*   \`std::cout\`: Standard Output stream.
*   \`std::cin\`: Standard Input stream.
*   \`std::cerr\`: Standard Error stream (unbuffered, used for error messages).

## 2. Formatting Output
*   \`std::endl\`: Outputs a newline and flushes the buffer.
*   \`\\n\`: Outputs a newline character. Much faster than \`endl\`.

## 3. Handling Strings with Spaces
*   \`cin >> stringVar\` only reads up to the first whitespace.
*   \`std::getline(std::cin, stringVar)\` reads the entire line until the Enter key.

## 4. The Buffer Trap
When mixing formatted input (\`cin >>\`) with unformatted input (\`getline\`), a stray newline character often remains in the input stream.
\`\`\`cpp
int age;
std::cin >> age; 
std::cin.ignore(); // Crucial! Clears the newline left by cin>>
std::string name;
std::getline(std::cin, name);
\`\`\`

## 5. Interview Relevance
*   **Q:** What is the difference between \`cin >>\` and \`getline\`?
    *   **A:** \`cin >>\` reads word by word (stops at whitespace). \`getline\` reads an entire line, including spaces, stopping at a newline character.
*   **Q:** Why do competitive programmers use \`ios::sync_with_stdio(false)\`?
    *   **A:** It disables the synchronization between C++ streams (\`cin\`/\`cout\`) and C streams (\`scanf\`/\`printf\`), vastly speeding up execution time for large I/O operations.
`,
  shortNotes: `
*   **Output:** \`std::cout << "Text" << var;\`
*   **Input:** \`std::cin >> var;\` (Stops at space).
*   **Newline:** Use \`\\n\` instead of \`std::endl\` for better performance.
*   **Full Line Input:** \`std::getline(std::cin, strVar);\` (Reads spaces).
*   **The Buffer Bug:** If using \`getline\` after \`cin >>\`, you MUST call \`std::cin.ignore();\` in between.
*   **Fast I/O:** \`ios::sync_with_stdio(false); cin.tie(nullptr);\` speeds up competitive programming code.
`,
  cheatSheet: `
| Action | Code | Notes |
|---|---|---|
| Print | \`cout << x;\` | Insertion operator \`<<\` |
| Read Word | \`cin >> x;\` | Extraction \`>>\` (skips spaces) |
| Read Line | \`getline(cin, x);\`| Reads entire line |
| Fast I/O | \`cin.tie(NULL);\` | Add to top of main for CP |
| Clear Buffer| \`cin.ignore();\` | Use between \`cin>>\` and \`getline\` |
`,
  resources: [
    {
      title: 'LearnCpp: Introduction to iostream',
      url: 'https://www.learncpp.com/cpp-tutorial/introduction-to-iostream-cout-cin-and-endl/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Basics of standard input and output.'
    }
  ]
};
