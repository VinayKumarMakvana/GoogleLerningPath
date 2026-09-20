import { TopicContent } from './types';

export const topic15: TopicContent = {
  title: 'Classes',
  learningContent: `
# What is a Class?
A class is a blueprint for creating objects. While a \`struct\` is traditionally used just to hold data, a **class** bundles data (member variables) and behavior (member functions/methods) together.

## 1. Encapsulation and Access Specifiers
The core concept of a class is **Encapsulation**: hiding the internal state of an object and requiring all interaction to happen through specific, controlled functions.
*   **\`private\`:** Members cannot be accessed from outside the class. (This is the default for classes).
*   **\`public\`:** Members can be accessed freely from anywhere.

\`\`\`cpp
class BankAccount {
private:
    double balance = 0.0; // Hidden data

public:
    // Controlled access method
    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    
    // Controlled read method (Getter)
    double getBalance() const {
        return balance;
    }
};
\`\`\`
If \`balance\` were public, someone could do \`account.balance = -99999;\`. By making it private, we enforce the rule that deposits must be > 0.

## 2. Objects (Instances)
A class is the blueprint. An **object** is the actual house built from the blueprint.
\`\`\`cpp
int main() {
    BankAccount myAccount; // myAccount is an object of type BankAccount
    myAccount.deposit(100.50);
    cout << myAccount.getBalance();
    // myAccount.balance = 500; // ERROR: balance is private!
}
\`\`\`

## 3. Const Member Functions
Notice the \`const\` at the end of \`double getBalance() const\`. 
This is a promise to the compiler: *"This function will only READ data, it will never modify any member variables."*
If you have a const reference to an object (e.g., \`void printInfo(const BankAccount& acc)\`), the compiler will **only** let you call \`const\` member functions on it.

## 4. The \`this\` Pointer
Inside a class method, \`this\` is a hidden pointer holding the memory address of the current object. It is rarely needed explicitly, except when resolving naming conflicts (variable shadowing).
\`\`\`cpp
void setBalance(double balance) {
    this->balance = balance; // "My class balance = the parameter balance"
}
\`\`\`

## DSA CONNECTION
While raw structs are fine for simple Linked List nodes, complex data structures like Hash Maps, Heaps, and Tries are almost always implemented as Classes. 
Encapsulation allows you to hide the nasty array manipulations of a Heap inside \`private\`, exposing only clean \`insert()\` and \`extractMax()\` methods to the public.
`,
  fullNotes: `
# Classes Reference

## 1. Class vs Struct Review
*   **Class:** Defaults to \`private\` access. Used for objects with invariants (rules that must be maintained, like balance >= 0).
*   **Struct:** Defaults to \`public\` access. Used for passive data structures.

## 2. Getters and Setters
*   Methods used to retrieve (get) or modify (set) private data safely.
*   Do not blindly create getters and setters for every private variable—that breaks encapsulation! Only expose what is necessary.

## 3. Const Correctness
*   Any method that does not alter member variables should be marked \`const\` immediately after the parameter list.
*   Without \`const\` methods, you cannot read from objects passed by \`const&\`.

## 4. Method Definition (In-class vs Out-of-class)
Methods can be defined directly inside the class block (implicitly inline), or defined outside the class using the scope resolution operator \`::\`.
\`\`\`cpp
class Player {
public:
    void takeDamage(int amount); // Declaration
};

// Definition outside the class
void Player::takeDamage(int amount) {
    // logic...
}
\`\`\`

## 5. Interview Relevance
*   **Q:** What is Encapsulation?
    *   **A:** The bundling of data with the methods that operate on that data, restricting direct access to some of the object's components. It prevents external code from putting the object into an invalid state.
*   **Q:** What does the \`this\` pointer do?
    *   **A:** It is a constant pointer passed implicitly into non-static member functions, pointing to the instance of the object on which the function was called.
`,
  shortNotes: `
*   **Class:** Blueprint for objects. Bundles data (attributes) and logic (methods).
*   **\`private\`:** Default. Hidden from the outside world.
*   **\`public\`:** Accessible from \`main()\` or other functions.
*   **Encapsulation:** Hiding internal state to prevent invalid modifications.
*   **Const Method:** \`int get() const { }\`. Promises not to modify the object. Required if passing objects by \`const&\`.
*   **\`this\` pointer:** Hidden pointer to the current object. Used to resolve variable shadowing: \`this->name = name;\`
`,
  cheatSheet: `
| Concept | Code | Note |
|---|---|---|
| Definition | \`class MyClass { ... };\` | Semicolon required |
| Private Data | \`private: int data;\` | Hidden state |
| Public Method| \`public: void act();\` | Accessible interface |
| Const Method | \`int read() const;\` | Won't modify state |
| This Pointer | \`this->var = var;\` | Disambiguate names |
`,
  resources: [
    {
      title: 'LearnCpp: Classes and class members',
      url: 'https://www.learncpp.com/cpp-tutorial/classes-and-class-members/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Fundamentals of building classes in C++.'
    },
    {
      title: 'LearnCpp: Public vs Private access',
      url: 'https://www.learncpp.com/cpp-tutorial/public-and-private-access-specifiers/',
      type: 'ARTICLE',
      priority: 'A',
      description: 'Understanding encapsulation.'
    }
  ]
};
