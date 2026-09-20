import { TopicContent } from './types';

export const topic16: TopicContent = {
  title: 'Constructors',
  learningContent: `
# What is a Constructor?
When you create a new object from a class, it is usually full of uninitialized garbage memory. A **constructor** is a special function that is automatically called the exact moment an object is created. Its job is to set up the object into a valid, usable state.

## 1. Syntax Rules
1.  Must have the **exact same name** as the class.
2.  Must have **no return type** (not even \`void\`).

## 2. The Default Constructor
Takes no parameters. If you don't write *any* constructors, the compiler generates a blank one for you.
\`\`\`cpp
class Player {
public:
    int hp;
    // Default constructor
    Player() {
        hp = 100;
    }
};

int main() {
    Player p1; // Calls Player(), p1.hp is 100
}
\`\`\`

## 3. Parameterized Constructors
Take arguments so you can initialize objects with specific data.
\`\`\`cpp
class Player {
public:
    int hp;
    string name;
    
    // Parameterized constructor
    Player(string n, int h) {
        name = n;
        hp = h;
    }
};

// Player p1; // ERROR: No default constructor exists anymore!
Player p2("Alice", 100); // OK
\`\`\`

## 4. Member Initializer Lists (CRITICAL)
In the example above, the variables are actually created with garbage values first, and *then* assigned inside the constructor body. This is highly inefficient for large objects like strings.
Instead, use a **Member Initializer List**. This initializes the variables directly as they are being created.
\`\`\`cpp
class User {
private:
    int id;
    std::string name;
public:
    // Initializer List (Fast and correct)
    User(int id_in, std::string name_in) 
        : id(id_in), name(name_in) // <-- Initialize here
    { 
        // Body can be empty
    }
};
\`\`\`
> **Rule:** ALWAYS use member initializer lists instead of assignment in the constructor body. It is required for \`const\` and reference members, and faster for objects.

## DSA CONNECTION
When building custom Tree or Graph nodes, you will use constructors heavily to write cleaner code.
\`\`\`cpp
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    
    // Clean constructor
    TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

// In DSA code:
TreeNode* root = new TreeNode(5); // Creates node safely with null children
\`\`\`
`,
  fullNotes: `
# Constructors Reference

## 1. Constructor Overloading
Like normal functions, you can have multiple constructors as long as their parameter lists differ.
\`\`\`cpp
class Box {
public:
    Box() : width(0) {} // Default
    Box(int w) : width(w) {} // Parameterized
private:
    int width;
};
\`\`\`

## 2. The Synthesized Default Constructor
If you write NO constructors at all, the compiler generates a default constructor (\`ClassName() {}\`).
**Warning:** The moment you write *any* constructor (e.g., a parameterized one), the compiler stops generating the default constructor. If you still want one, you must write it yourself, or use \`= default\` (C++11).
\`\`\`cpp
class Box {
public:
    Box(int w) : width(w) {}
    Box() = default; // Tells compiler: "Generate the default one anyway"
};
\`\`\`

## 3. Default Member Initialization (C++11)
You can assign default values directly where you declare the member variables. This is often cleaner than a default constructor.
\`\`\`cpp
class Box {
    int width = 0;
    int height = 0;
};
\`\`\`

## 4. std::move in Constructors (Brief Intro)
If passing a large string to a constructor by value, you can "move" its internal memory instead of copying it.
\`\`\`cpp
User(std::string n) : name(std::move(n)) {}
\`\`\`
\`std::move\` casts the variable to an rvalue, allowing the string class to steal the memory buffer rather than doing a deep copy.

## 5. Interview Relevance
*   **Q:** Why use an initializer list instead of assignment in the constructor body?
    *   **A:** Assignment inside the body requires the member to be default-constructed first, and then re-assigned. An initializer list constructs the member directly with the correct value, saving an operation. It is also the *only* way to initialize \`const\` members and reference members.
`,
  shortNotes: `
*   **Purpose:** Initializes an object to a valid state immediately upon creation.
*   **Syntax:** Same name as class, NO return type.
*   **Default Constructor:** Takes no arguments. \`Class() {}\`.
*   **Parameterized:** Takes arguments. \`Class(int x) {}\`.
*   **Initializer List:** \`Class(int x) : var(x) {}\`. ALWAYS prefer this over assigning in the \`{}\` body for performance and correctness.
*   **Compiler behavior:** If you write a parameterized constructor, the compiler deletes the default one unless you bring it back (\`Class() = default;\`).
`,
  cheatSheet: `
| Feature | Code |
|---|---|
| Default | \`Car() {}\` |
| Parameterized | \`Car(int spd) : speed(spd) {}\` |
| Overloaded | Have both of the above |
| Explicit Default| \`Car() = default;\` |
| Init List | \`: speed(spd), fuel(100) { }\` |
| Member Default| \`int speed = 0;\` (in class body) |
`,
  resources: [
    {
      title: 'LearnCpp: Constructors',
      url: 'https://www.learncpp.com/cpp-tutorial/constructors/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Understanding object initialization.'
    },
    {
      title: 'LearnCpp: Constructor member initializer lists',
      url: 'https://www.learncpp.com/cpp-tutorial/constructor-member-initializer-lists/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Crucial optimization and correctness guide.'
    }
  ]
};
