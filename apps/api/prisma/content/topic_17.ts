import { TopicContent } from './types';

export const topic17: TopicContent = {
  title: 'Destructors',
  learningContent: `
# What is a Destructor?
Just as a constructor sets up an object when it is born, a **destructor** cleans up the object just before it dies. It is a special member function that is automatically called when an object goes out of scope or is explicitly destroyed.

## 1. Syntax
The destructor has the same name as the class, preceded by a tilde (\`~\`). It takes no arguments and has no return type.
\`\`\`cpp
class Database {
public:
    Database() {
        cout << "Connected to DB\\n";
    }
    ~Database() {
        cout << "Disconnected from DB\\n";
    }
};

int main() {
    if (true) {
        Database db; // Constructor prints "Connected..."
    } // Block ends! db goes out of scope. Destructor prints "Disconnected..."
}
\`\`\`

## 2. RAII (Resource Acquisition Is Initialization)
RAII is the most important programming idiom in C++. 
The core idea: **Tie the lifecycle of a resource (memory, network connection, file handle) to the lifetime of a local object.**
*   **Acquisition:** The resource is acquired in the constructor.
*   **Cleanup:** The resource is released in the destructor.

Because C++ guarantees that local objects are destroyed when they go out of scope (even if a function returns early or throws an error!), RAII guarantees that you will never leak resources.

## 3. What do you put in a destructor?
If your class only contains basic types like \`int\`, \`double\`, or other RAII-compliant classes like \`std::string\` and \`std::vector\`, **you don't need to write a destructor at all!** The compiler's default destructor automatically cleans up member variables.

You ONLY need to write a custom destructor if your class is manually managing a resource, such as:
1.  Memory allocated with \`new\` (must call \`delete\`).
2.  An open file (must be closed).
3.  A network socket (must be disconnected).

*Note: Modern C++ strongly encourages using Smart Pointers instead of manual \`new\`/\`delete\`, meaning you rarely need to write custom destructors for memory management anymore.*

## DSA CONNECTION
When building custom trees or graphs, if you allocate nodes with \`new\`, you technically need a destructor to recursively delete the child nodes to prevent a memory leak.
\`\`\`cpp
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    
    ~TreeNode() {
        // Recursive cleanup (DANGEROUS for deep trees due to stack overflow, but conceptually correct)
        delete left;
        delete right;
    }
};
\`\`\`
However, in competitive programming, memory leaks at the end of a program are usually ignored because the OS reclaims all memory instantly upon exit. For production software engineering, understanding destructors and RAII is absolutely mandatory.
`,
  fullNotes: `
# Destructors Reference

## 1. Rules of Destructors
*   Only one destructor per class. (You cannot overload a destructor because it takes no arguments).
*   Automatically invoked when:
    *   A local (stack-allocated) object goes out of scope.
    *   A dynamically allocated object is explicitly \`delete\`d.
    *   The program terminates (for global/static objects).

## 2. RAII (Resource Acquisition Is Initialization)
RAII relies on the deterministic destruction of C++ objects.
\`\`\`cpp
class FileHandler {
    FILE* file;
public:
    FileHandler(const char* filename) {
        file = fopen(filename, "r");
    }
    ~FileHandler() {
        if (file) fclose(file); // Guaranteed cleanup!
    }
};
\`\`\`
Even if an exception is thrown while the \`FileHandler\` object is in scope, C++ unwinds the stack and calls the destructor, safely closing the file.

## 3. The Rule of Three / Rule of Five
If you find yourself needing to write a custom destructor (usually because you are managing a raw pointer), you almost certainly also need to write a custom Copy Constructor and Copy Assignment Operator. (This is known as the Rule of Three). If you don't, copying your object will result in two objects pointing to the same memory, leading to a "Double Free" crash when both destructors try to delete it.

## 4. Interview Relevance
*   **Q:** What is RAII?
    *   **A:** Resource Acquisition Is Initialization. It's a C++ programming technique that binds the life cycle of a resource (like memory or file handles) to the scope of an object. The constructor acquires the resource, and the destructor automatically releases it, preventing leaks.
*   **Q:** When do you need to write a custom destructor?
    *   **A:** When the class has taken manual ownership of a resource that isn't automatically cleaned up by default destructors, such as memory allocated via \`new\`, raw OS file handles, or network sockets.
`,
  shortNotes: `
*   **Syntax:** \`~ClassName() {}\`. No return type, no parameters.
*   **Trigger:** Called automatically when an object dies (goes out of scope).
*   **Purpose:** Cleanup. Close files, disconnect databases, \`delete\` memory.
*   **RAII:** Tying a resource to an object's scope. Constructor grabs it, destructor frees it. Guarantees safety.
*   **Default:** If you only use \`vector\`, \`string\`, and \`int\`, the compiler's default destructor is perfect. You don't need to write one.
`,
  cheatSheet: `
| Concept | Code |
|---|---|
| Destructor | \`~Car() { /* cleanup */ }\` |
| Manual Cleanup | \`delete rawPointer;\` |
| When is it called? | At closing \`}\` of block |
| RAII | Constructor gets, Destructor frees |
| Rule of Three | If you need a destructor, you need copy mechanics too. |
`,
  resources: [
    {
      title: 'LearnCpp: Destructors',
      url: 'https://www.learncpp.com/cpp-tutorial/destructors/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Understanding object cleanup.'
    }
  ]
};
