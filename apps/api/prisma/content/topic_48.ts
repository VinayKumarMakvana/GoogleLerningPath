import { TopicContent } from './types';

export const topic48: TopicContent = {
  title: 'Linked List Fundamentals',
  learningContent: `
# What is a Linked List?
Unlike an Array or Vector, which stores elements in a single contiguous block of memory, a **Linked List** stores elements in separate, scattered blocks of memory called **Nodes**.

Every Node contains two things:
1.  **Data:** The actual value (e.g., an integer).
2.  **Next Pointer:** A memory address pointing to the exact location of the *next* node in the sequence.

The very first node is called the **Head**. The last node's Next pointer points to \`nullptr\` (null), signaling the end of the list.

## 1. Array vs Linked List
| Feature | Array / Vector | Linked List |
|---|---|---|
| **Memory** | Contiguous (all together) | Scattered on the Heap |
| **Access** | $O(1)$ (Random Access, \`arr[5]\`) | $O(N)$ (Must walk from the Head) |
| **Insertion at Front** | $O(N)$ (Must shift everything) | $O(1)$ (Just update 2 pointers) |
| **Insertion in Middle**| $O(N)$ (Must shift) | $O(1)$ *if you already have the pointer* |
| **CPU Cache** | Extremely fast (Pre-fetching) | Very slow (Cache misses) |

In modern C++, you almost always prefer \`std::vector\` over a Linked List because the CPU cache makes vectors vastly faster in reality. However, Linked Lists are heavily tested in interviews to verify your understanding of **Pointers** and **Memory Management**.

## 2. Implementing a Singly Linked List Node
A "Singly" linked list means pointers only go one way (forward).
\`\`\`cpp
struct ListNode {
    int val;
    ListNode* next;
    
    // Constructor
    ListNode(int x) {
        val = x;
        next = nullptr;
    }
};
\`\`\`

## 3. Basic Traversal
To read a linked list, you start at the \`head\` and use a temporary pointer to "walk" down the list until you hit \`nullptr\`.
\`\`\`cpp
void printList(ListNode* head) {
    ListNode* curr = head; // Never modify the original 'head' pointer directly!
    
    while (curr != nullptr) {
        cout << curr->val << " -> ";
        curr = curr->next; // Move to the next node
    }
    cout << "null";
}
\`\`\`
`,
  fullNotes: `
# Linked List Reference

## 1. Doubly Linked Lists
A **Doubly Linked List** adds a \`prev\` pointer to the node, pointing to the previous element. 
*   **Pros:** You can traverse backward. Deleting a node is easier because you instantly know who the previous node is.
*   **Cons:** Requires extra memory for the \`prev\` pointer, and every insertion/deletion requires carefully updating twice as many pointers.
*   *(C++ \`std::list\` is a doubly linked list).*

## 2. Circular Linked Lists
The \`next\` pointer of the final node points back to the \`head\` instead of \`nullptr\`. Often used in OS scheduling algorithms.

## 3. The "Dummy Node" Technique (Extremely Important)
When solving Linked List DSA problems (like merging two lists or removing elements), the \`head\` of the list might change, or the list might become empty. Writing \`if (head == nullptr)\` edge cases for everything becomes a nightmare.
**Solution:** Create a fake "Dummy" node that sits right before the head. 
\`\`\`cpp
ListNode* dummy = new ListNode(-1);
dummy->next = head;

// Now you can safely manipulate the list without worrying about losing the head
// ...

return dummy->next; // The real head is always right after the dummy
\`\`\`

## 4. Memory Leaks
In interviews, if you remove a node from a linked list, you must physically delete it from RAM, otherwise you cause a memory leak.
\`\`\`cpp
ListNode* to_delete = curr->next;
curr->next = curr->next->next; // Bypass it
delete to_delete;              // Free the memory!
\`\`\`

## 5. Interview Relevance
*   **Q:** How do you reverse a Singly Linked List in $O(1)$ space?
    *   **A:** You need three pointers: \`prev\` (initially null), \`curr\` (initially head), and \`next_node\`. In a loop, save \`curr->next\` into \`next_node\`. Then reverse the pointer by setting \`curr->next = prev\`. Finally, slide \`prev\` and \`curr\` one step forward.
*   **Q:** How do you detect a cycle (an infinite loop) in a linked list?
    *   **A:** Floyd's Cycle-Finding Algorithm (Fast & Slow Pointers). Send a slow pointer moving 1 step at a time, and a fast pointer moving 2 steps at a time. If they ever point to the exact same node, a cycle exists. If the fast pointer hits \`nullptr\`, there is no cycle.
`,
  shortNotes: `
*   **Concept:** Scattered memory nodes connected by pointers. 
*   **Node structure:** Contains \`Data\` and \`Next\` pointer.
*   **Trade-offs:** $O(N)$ random access, but $O(1)$ insertions/deletions if you have the pointer. Bad CPU cache performance.
*   **Singly vs Doubly:** Singly only goes forward. Doubly has a \`prev\` pointer and goes both ways.
*   **Dummy Node:** A fake node placed before the head to eliminate edge cases when the head itself needs to be modified.
*   **Fast/Slow Pointers:** Used to find the middle of a linked list or detect cycles.
*   **Danger:** Always check \`if (curr == nullptr)\` before doing \`curr->next\`, otherwise you will Segmentation Fault.
`,
  cheatSheet: `
| Operation | Code Snippet | Time |
|---|---|---|
| Traversal | \`while (curr != nullptr) { curr = curr->next; }\` | $O(N)$ |
| Insert Front | \`new_node->next = head; head = new_node;\` | $O(1)$ |
| Delete Next | \`curr->next = curr->next->next;\` | $O(1)$ |
| Dummy Node | \`ListNode* dummy = new ListNode(0); dummy->next = head;\` | $O(1)$ |

*   **Rule:** NEVER lose the \`head\` pointer. Always use a \`curr\` pointer to traverse.
`,
  resources: [
    {
      title: 'GeeksForGeeks: Linked List Data Structure',
      url: 'https://www.geeksforgeeks.org/data-structures/linked-list/',
      type: 'ARTICLE',
      priority: 'A',
      description: 'Comprehensive overview of Linked List implementations.'
    }
  ]
};
