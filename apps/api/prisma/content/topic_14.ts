import { TopicContent } from './types';

export const topic14: TopicContent = {
  title: 'Structs',
  learningContent: `
# What is a Struct?
While fundamental types (like \`int\` and \`string\`) are great for single pieces of data, real-world objects consist of multiple attributes. A **struct** (short for structure) allows you to group different data types together under one name.

## 1. Declaration and Instantiation
You define a struct outside of \`main()\` to create a new custom data type.
\`\`\`cpp
struct Student {
    int id;
    std::string name;
    double gpa;
}; // DO NOT FORGET THE SEMICOLON HERE!
\`\`\`
Now you can create variables (instances) of this new type:
\`\`\`cpp
int main() {
    Student s1;       // Uninitialized fields!
    s1.id = 123;      // Member access using the dot (.) operator
    s1.name = "Alice";
    s1.gpa = 3.8;
}
\`\`\`

## 2. Initialization
Modern C++ allows aggregate initialization using curly braces, making initialization much safer and cleaner.
\`\`\`cpp
Student s2 = {456, "Bob", 3.2}; // Order must match struct definition
Student s3{789, "Charlie", 4.0}; // Preferred C++11 brace initialization
\`\`\`

## 3. Pointers to Structs and the Arrow Operator
When you have a pointer to a struct, you must dereference it before using the dot operator: \`(*ptr).name\`. Because this is ugly, C++ provides the **arrow operator (\`->\`)**.
\`\`\`cpp
Student* ptr = &s3;
cout << ptr->name; // Identical to (*ptr).name
\`\`\`

## Struct vs Class (Preview)
In C++, a \`struct\` and a \`class\` are almost exactly the same thing. The ONLY technical difference is default visibility:
*   In a \`struct\`, all members are **public** by default.
*   In a \`class\`, all members are **private** by default.
**Best Practice:** Use \`struct\` for simple data structures (Plain Old Data) where everything is public and there is no complex logic. Use \`class\` when you need encapsulation (hiding data) and complex methods.

## DSA CONNECTION
Structs are fundamentally how custom Data Structures are built!
*   **Pairs / Tuples:** Often implemented as simple structs when \`std::pair\` isn't descriptive enough.
    \`\`\`cpp
    struct Point { int x; int y; };
    \`\`\`
*   **Linked List Nodes:** A struct containing data and a pointer to the next struct.
    \`\`\`cpp
    struct ListNode {
        int val;
        ListNode* next;
    };
    \`\`\`
*   **Trees:** 
    \`\`\`cpp
    struct TreeNode {
        int val;
        TreeNode* left;
        TreeNode* right;
    };
    \`\`\`
`,
  fullNotes: `
# Structs Reference

## 1. Defining a Struct
*   Always ends with a semicolon \`;\`. Forgetting this causes massive, confusing compiler errors on the lines following the struct.
*   Members can be initialized with default values inside the struct definition (C++11):
    \`\`\`cpp
    struct Player {
        string name = "Guest";
        int hp = 100;
    };
    \`\`\`

## 2. Member Access
*   **Dot operator (\`.\`):** Used when you have the actual object or a reference to it. (\`player.hp\`)
*   **Arrow operator (\`->\`):** Used when you have a pointer to the object. (\`playerPtr->hp\`)

## 3. Structs in Memory
*   Structs allocate memory for all their members sequentially.
*   However, the total size of a struct might be larger than the sum of its members due to **memory padding/alignment** inserted by the compiler for CPU optimization.

## 4. Passing Structs
*   Structs are treated like any other variable. Passing by value copies the *entire* struct (all its members).
*   Always pass large structs by \`const&\` to avoid massive performance hits.

## 5. Interview Relevance
*   **Q:** What is the difference between a \`struct\` and a \`class\` in C++?
    *   **A:** Technically, the only difference is default access control. Members of a \`struct\` are public by default, while members of a \`class\` are private by default. By convention, developers use structs for simple, passive data containers (Plain Old Data) and classes for objects that require encapsulation and active behavior.
`,
  shortNotes: `
*   **Struct:** Groups multiple variables of different types under one name.
*   **Syntax:** Ends with a semicolon! \`struct Name { int x; };\`
*   **Access:** Use \`.\` to access members (e.g., \`s.name\`).
*   **Pointer Access:** Use \`->\` if you have a pointer to a struct.
*   **Initialization:** \`Student s{1, "Bob"};\`
*   **Struct vs Class:** Structs are public by default. Classes are private by default.
*   **DSA:** Essential for defining \`ListNode\`, \`TreeNode\`, \`Point\`, etc.
`,
  cheatSheet: `
| Operation | Syntax | Note |
|---|---|---|
| Definition | \`struct Point { int x; int y; };\` | DON'T FORGET SEMICOLON |
| Init | \`Point p{10, 20};\` | Brace init |
| Dot Access | \`p.x = 15;\` | Direct object |
| Arrow Access| \`ptr->x = 15;\` | Pointer to object |
| Default Val| \`struct X { int a = 0; };\` | C++11 default init |
`,
  resources: [
    {
      title: 'LearnCpp: Structs',
      url: 'https://www.learncpp.com/cpp-tutorial/structs/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Complete guide to creating and using structs.'
    }
  ]
};
