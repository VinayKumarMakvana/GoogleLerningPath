import { TopicContent } from './types';

export const topic1: TopicContent = {
  title: 'Program structure',
  learningContent: `
# What is C++?
C++ is a high-performance, compiled, statically-typed programming language. It is widely used in systems engineering, game development, and competitive programming because it gives you direct control over memory and hardware.

## Source Code to Executable: The Lifecycle
Before your program can run, it must be translated from human-readable text into machine code. 
1. **Preprocessing:** Handles directives like \`#include\`, pasting external code into your file.
2. **Compilation:** Translates your C++ code into object code (machine instructions).
3. **Linking:** Combines your object code with external libraries (like the standard library) to create a single **executable** file.
4. **Execution:** The operating system runs your executable.

## The Minimal C++ Program
Let's look at the absolute minimum structure of a C++ program:

\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!\\n";
    return 0;
}
\`\`\`

### Breaking it down:
*   \`#include <iostream>\`: A preprocessor directive. It tells the compiler to include the standard input/output stream library, which gives us access to \`std::cout\`.
*   \`int main()\`: Every C++ program **must** have exactly one \`main\` function. This is where execution begins.
*   \`{\` and \`}\`: These define a **block** of code. They group statements together.
*   \`std::cout\`: "Character output". It prints text to the console. The \`std::\` prefix tells the compiler that \`cout\` lives in the standard namespace.
*   \`<<\`: The insertion operator. It pushes the string "Hello, World!\\n" into the output stream.
*   \`;\`: Every statement in C++ must end with a semicolon.
*   \`return 0;\`: Signals to the operating system that the program finished successfully (0 means success).

## Namespaces
A namespace is a declarative region that provides a scope for identifiers. It prevents name conflicts. The C++ Standard Library places all its entities inside the \`std\` namespace.
*   **Good practice:** Use \`std::cout\`.
*   **Common but discouraged in large projects:** \`using namespace std;\` (can cause naming collisions).

## Comments
Comments are ignored by the compiler.
*   \`//\` Single line comment
*   \`/* */\` Multi-line comment

## Common Mistakes
*   **Forgetting the semicolon:** A classic beginner error. The compiler will complain, often on the line *after* the missing semicolon.
*   **Missing \`#include\`:** If you try to use \`std::cout\` without \`<iostream>\`, the compiler won't know what it is.
*   **Typing \`Main()\` instead of \`main()\`: C++ is case-sensitive!**

## DSA CONNECTION
In Data Structures and Algorithms (DSA) and competitive programming, your \`main()\` function is usually where you will handle reading the input test cases, calling your algorithm function, and printing the output. A solid understanding of how to compile and run your code quickly is essential for debugging.
`,
  fullNotes: `
# Program Structure Reference

## 1. Compilation Process
*   **Source Code (.cpp):** The text file you write.
*   **Preprocessor:** Resolves \`#include\` and macros.
*   **Compiler:** Converts source to object code (.o or .obj).
*   **Linker:** Connects object code and libraries into an executable (.exe or .out).

## 2. The \`main\` Function
*   Execution always starts at \`main()\`.
*   Must return an \`int\`.
*   \`return 0;\` implies success. Non-zero implies an error.
*   Valid signatures: \`int main()\` or \`int main(int argc, char* argv[])\`.

## 3. Headers and \`#include\`
*   Headers contain declarations of functions and classes.
*   \`#include <filename>\` is used for standard library headers (e.g., \`<iostream>\`).
*   \`#include "filename"\` is used for your own local files.

## 4. Namespaces
*   Used to group related code and prevent name clashes.
*   Access elements using the scope resolution operator \`::\` (e.g., \`std::cout\`).
*   \`using namespace std;\` brings all standard library names into the global scope. Avoid in header files.

## 5. Statements and Blocks
*   **Statement:** An instruction ending with \`;\`.
*   **Block:** A group of statements enclosed in \`{}\`. Defines a local scope.

## 6. Interview Relevance
*   **Q:** What is the difference between compilation and linking?
    *   **A:** Compilation translates source code to object code. Linking combines object code and libraries to create the final runnable executable.
*   **Q:** Why is \`using namespace std;\` considered bad practice in header files?
    *   **A:** It forces the entire \`std\` namespace upon any file that includes the header, leading to potential naming conflicts.
`,
  shortNotes: `
*   **Lifecycle:** Source -> Preprocessor -> Compiler -> Linker -> Executable.
*   **\`main()\`:** Entry point of every C++ program. Must return \`int\`.
*   **\`#include <iostream>\`:** Brings in standard I/O library for printing/reading.
*   **\`std::\`:** Scope resolution operator. Means "look inside the \`std\` namespace".
*   **Statements:** Must end with a semicolon \`;\`.
*   **Blocks:** Defined by curly braces \`{}\`.
*   **Comments:** \`// single\` or \`/* multi */\`.
*   **Mistakes:** Missing semicolons, misspelled \`main\`, missing includes.
`,
  cheatSheet: `
| Concept | Syntax / Example | Description |
|---|---|---|
| Include Standard | \`#include <iostream>\` | Imports standard library code |
| Include Local | \`#include "myFile.h"\` | Imports your own files |
| Main Function | \`int main() { ... }\` | Program entry point |
| Print Output | \`std::cout << "Hi";\` | Prints to console |
| Namespace | \`std::\` | Access standard library |
| Statement End | \`;\` | Required at end of instruction |
| Return Success | \`return 0;\` | Placed at end of main |
`,
  resources: [
    {
      title: 'LearnCpp: Structure of a program',
      url: 'https://www.learncpp.com/cpp-tutorial/structure-of-a-program/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Excellent deep-dive into basic C++ program structure.'
    },
    {
      title: 'cppreference: main function',
      url: 'https://en.cppreference.com/w/cpp/language/main_function',
      type: 'ARTICLE',
      priority: 'A',
      description: 'Official standard specification for the main function.'
    }
  ]
};
