import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedPhase5B3() {
  console.log('Starting Phase 5B-3 Curation Seed...');

  const patternsToCreate = [
    { name: 'Binary Tree DFS', slug: 'binary-tree-dfs', description: 'Depth-first search traversal on a binary tree.' },
    { name: 'Binary Tree BFS', slug: 'binary-tree-bfs', description: 'Breadth-first search / Level-order traversal on a binary tree.' },
    { name: 'Binary Search Tree', slug: 'binary-search-tree', description: 'Leveraging BST properties (left < node < right).' },
    { name: 'Heap / Priority Queue', slug: 'heap-priority-queue', description: 'Using a Heap for dynamic top-K or min/max operations.' },
    { name: 'Graph Traversal', slug: 'graph-traversal', description: 'DFS/BFS on a node-and-edge graph structure.' },
    { name: 'Grid Traversal', slug: 'grid-traversal', description: 'DFS/BFS on a 2D array or grid.' },
    { name: 'Greedy', slug: 'greedy', description: 'Making locally optimal choices to achieve a global optimum.' },
    { name: 'Interval Processing', slug: 'interval-processing', description: 'Sorting and merging intervals or ranges.' },
    { name: '1D Dynamic Programming', slug: '1d-dynamic-programming', description: 'Breaking down a problem into overlapping subproblems on a linear state.' }
  ];

  const existingPatterns = await prisma.dsaPattern.findMany();
  const patternMap: Record<string, string> = {};
  for (const p of existingPatterns) {
    patternMap[p.name] = p.id;
  }
  
  for (const p of patternsToCreate) {
    if (!patternMap[p.name]) {
      const pattern = await prisma.dsaPattern.upsert({
        where: { slug: p.slug },
        update: { name: p.name, description: p.description },
        create: p
      });
      patternMap[p.name] = pattern.id;
    }
  }
  
  // Aliases for the specific requested patterns
  patternMap['Tree Traversal'] = patternMap['Binary Tree DFS'];
  patternMap['Tree BFS'] = patternMap['Binary Tree BFS'];
  patternMap['Tree DFS'] = patternMap['Binary Tree DFS'];
  patternMap['BST Search'] = patternMap['Binary Search Tree'];
  patternMap['BST Validation'] = patternMap['Binary Search Tree'];
  patternMap['BST Traversal'] = patternMap['Binary Search Tree'];
  patternMap['Heap / Selection'] = patternMap['Heap / Priority Queue'];
  patternMap['Max Heap'] = patternMap['Heap / Priority Queue'];
  patternMap['Heap'] = patternMap['Heap / Priority Queue'];
  patternMap['Graph DFS/BFS'] = patternMap['Graph Traversal'];
  patternMap['Grid DFS/BFS'] = patternMap['Grid Traversal'];
  patternMap['Multi-source BFS'] = patternMap['Grid Traversal'];
  patternMap['Graph DFS'] = patternMap['Graph Traversal'];
  patternMap['Connected Components'] = patternMap['Graph Traversal'];
  patternMap['Greedy + Sorting'] = patternMap['Greedy'];
  patternMap['Greedy / Running Minimum'] = patternMap['Greedy'];
  patternMap['Intervals + Sorting'] = patternMap['Interval Processing'];
  patternMap['Greedy + Intervals'] = patternMap['Interval Processing'];
  // Re-used from Phase 5B-2
  patternMap['Backtracking'] = existingPatterns.find(p => p.name === 'Backtracking')?.id || '';

  const topics = await prisma.topic.findMany();
  const getTopicIds = (titles: string[]) => {
    return topics.filter(t => titles.includes(t.title)).map(t => t.id);
  };

  const problemsData = [
    // TREES
    {
      slug: 'leetcode-104-maximum-depth-of-binary-tree', platform: 'LEETCODE', sourceProblemId: '104',
      title: 'Maximum Depth of Binary Tree', sourceUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', difficulty: 'EASY',
      statement: 'Given the `root` of a binary tree, return its maximum depth. A binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
      expectedTime: 'O(N)', expectedSpace: 'O(H)',
      tags: ['tree', 'dfs', 'recursion'], pattern: 'Binary Tree DFS', topics: ['Trees'],
      hints: [
        '**Level 0 — Understand**: Find the longest path from the root to any leaf.',
        '**Level 1 — Brute Force Thinking**: Check all paths and keep track of the max depth seen.',
        '**Level 2 — Bottleneck Recognition**: DFS naturally visits all paths, we just need to return the height.',
        '**Level 3 — Pattern Recognition**: Recursive Depth First Search.',
        '**Level 4 — Algorithmic Direction**: Base case: if root is null, return 0. Recursive case: return 1 + max(maxDepth(left), maxDepth(right)).',
        '**Level 5 — Complexity Target**: Time O(N) to visit all nodes, Space O(H) for recursion stack where H is tree height.'
      ]
    },
    {
      slug: 'leetcode-226-invert-binary-tree', platform: 'LEETCODE', sourceProblemId: '226',
      title: 'Invert Binary Tree', sourceUrl: 'https://leetcode.com/problems/invert-binary-tree/', difficulty: 'EASY',
      statement: 'Given the `root` of a binary tree, invert the tree, and return its root. (Mirror it horizontally).',
      expectedTime: 'O(N)', expectedSpace: 'O(H)',
      tags: ['tree', 'dfs', 'recursion'], pattern: 'Binary Tree DFS', topics: ['Trees'],
      hints: [
        '**Level 0 — Understand**: Left children become right children, and right children become left children, recursively for every node.',
        '**Level 1 — Brute Force Thinking**: Create a new tree and manually assign nodes. Space O(N).',
        '**Level 2 — Bottleneck Recognition**: You can just swap the pointers of the existing nodes.',
        '**Level 3 — Pattern Recognition**: Post-order or Pre-order DFS Traversal.',
        '**Level 4 — Algorithmic Direction**: If root is null, return null. Swap root->left and root->right. Recurse on root->left and root->right. Return root.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(H) for recursion stack.'
      ]
    },
    {
      slug: 'leetcode-100-same-tree', platform: 'LEETCODE', sourceProblemId: '100',
      title: 'Same Tree', sourceUrl: 'https://leetcode.com/problems/same-tree/', difficulty: 'EASY',
      statement: 'Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.',
      expectedTime: 'O(N)', expectedSpace: 'O(H)',
      tags: ['tree', 'dfs', 'recursion'], pattern: 'Tree Traversal', topics: ['Trees'],
      hints: [
        '**Level 0 — Understand**: Both trees must look exactly the same.',
        '**Level 1 — Brute Force Thinking**: Traverse both trees simultaneously. If any value doesn\'t match, or structure doesn\'t match, return false.',
        '**Level 2 — Bottleneck Recognition**: Standard simultaneous DFS is optimal.',
        '**Level 3 — Pattern Recognition**: Recursive DFS.',
        '**Level 4 — Algorithmic Direction**: If both null, true. If one null and other isn\'t, false. If values differ, false. Return `isSame(p.left, q.left) && isSame(p.right, q.right)`.',
        '**Level 5 — Complexity Target**: Time O(N) where N is minimum nodes of p and q. Space O(H).'
      ]
    },
    {
      slug: 'leetcode-102-binary-tree-level-order-traversal', platform: 'LEETCODE', sourceProblemId: '102',
      title: 'Binary Tree Level Order Traversal', sourceUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', difficulty: 'MEDIUM',
      statement: 'Given the `root` of a binary tree, return the level order traversal of its nodes\' values. (i.e., from left to right, level by level).',
      expectedTime: 'O(N)', expectedSpace: 'O(N)',
      tags: ['tree', 'bfs', 'queue'], pattern: 'Tree BFS', topics: ['Trees'],
      hints: [
        '**Level 0 — Understand**: Group nodes that are at the same depth into their own arrays.',
        '**Level 1 — Brute Force Thinking**: Use DFS, pass down a `level` parameter, and append to `result[level]`.',
        '**Level 2 — Bottleneck Recognition**: DFS works, but BFS inherently processes the tree level by level.',
        '**Level 3 — Pattern Recognition**: Breadth-First Search with Level Slicing.',
        '**Level 4 — Algorithmic Direction**: Use a Queue. While queue is not empty, get its `size`. Loop `size` times: pop node, add to current level array, push left and right children. Add level array to result.',
        '**Level 5 — Complexity Target**: Time O(N). Space O(N) since the bottom level can have N/2 nodes in the queue.'
      ]
    },
    {
      slug: 'leetcode-543-diameter-of-binary-tree', platform: 'LEETCODE', sourceProblemId: '543',
      title: 'Diameter of Binary Tree', sourceUrl: 'https://leetcode.com/problems/diameter-of-binary-tree/', difficulty: 'EASY',
      statement: 'Given the `root` of a binary tree, return the length of the diameter of the tree. The diameter is the length of the longest path between any two nodes in a tree.',
      expectedTime: 'O(N)', expectedSpace: 'O(H)',
      tags: ['tree', 'dfs', 'recursion'], pattern: 'Tree DFS', topics: ['Trees'],
      hints: [
        '**Level 0 — Understand**: The longest path might pass through the root, or it might be entirely in a left or right subtree.',
        '**Level 1 — Brute Force Thinking**: For every node, calculate height of left and right subtrees. The diameter passing through it is `left_height + right_height`. Find the max of this over all nodes. Time O(N^2).',
        '**Level 2 — Bottleneck Recognition**: We are repeatedly calculating heights.',
        '**Level 3 — Pattern Recognition**: Post-order DFS returning height, updating global max diameter.',
        '**Level 4 — Algorithmic Direction**: DFS function returns the height of the current subtree. Inside the function, update a global/reference variable `max_diameter = max(max_diameter, left_height + right_height)`.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(H).'
      ]
    },
    // BST
    {
      slug: 'leetcode-700-search-in-a-binary-search-tree', platform: 'LEETCODE', sourceProblemId: '700',
      title: 'Search in a Binary Search Tree', sourceUrl: 'https://leetcode.com/problems/search-in-a-binary-search-tree/', difficulty: 'EASY',
      statement: 'Find the node in the BST that the node\'s value equals `val` and return the subtree rooted with that node. If such a node does not exist, return `null`.',
      expectedTime: 'O(H)', expectedSpace: 'O(1) iterative',
      tags: ['tree', 'bst'], pattern: 'BST Search', topics: ['Binary Search Tree'],
      hints: [
        '**Level 0 — Understand**: A BST has left children < root and right children > root. Use this to search quickly.',
        '**Level 1 — Brute Force Thinking**: Traverse the whole tree like a normal binary tree. Time O(N).',
        '**Level 2 — Bottleneck Recognition**: We can discard half the tree at every step.',
        '**Level 3 — Pattern Recognition**: BST Binary Search.',
        '**Level 4 — Algorithmic Direction**: While root != null: if `val < root.val` go left. If `val > root.val` go right. Else return root.',
        '**Level 5 — Complexity Target**: Time O(H) where H is tree height. Space O(1) iterative.'
      ]
    },
    {
      slug: 'leetcode-98-validate-binary-search-tree', platform: 'LEETCODE', sourceProblemId: '98',
      title: 'Validate Binary Search Tree', sourceUrl: 'https://leetcode.com/problems/validate-binary-search-tree/', difficulty: 'MEDIUM',
      statement: 'Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).',
      expectedTime: 'O(N)', expectedSpace: 'O(H)',
      tags: ['tree', 'bst', 'dfs'], pattern: 'BST Validation', topics: ['Binary Search Tree'],
      hints: [
        '**Level 0 — Understand**: Every node must be strictly greater than ALL nodes in its left subtree and strictly less than ALL nodes in its right subtree.',
        '**Level 1 — Brute Force Thinking**: For every node, run a DFS on left to ensure all are smaller, and right to ensure all are larger. Time O(N^2).',
        '**Level 2 — Bottleneck Recognition**: We can pass down constraints to child nodes to do it in one pass.',
        '**Level 3 — Pattern Recognition**: DFS with bounds (min, max).',
        '**Level 4 — Algorithmic Direction**: `isValid(node, min, max)`. If `node.val <= min` or `>= max`, return false. Return `isValid(left, min, node.val) && isValid(right, node.val, max)`. Use Long/Infinity for initial bounds.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(H).'
      ]
    },
    {
      slug: 'leetcode-235-lowest-common-ancestor-of-a-binary-search-tree', platform: 'LEETCODE', sourceProblemId: '235',
      title: 'Lowest Common Ancestor of a Binary Search Tree', sourceUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', difficulty: 'MEDIUM',
      statement: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.',
      expectedTime: 'O(H)', expectedSpace: 'O(1) iterative',
      tags: ['tree', 'bst'], pattern: 'BST Traversal', topics: ['Binary Search Tree'],
      hints: [
        '**Level 0 — Understand**: The LCA is the lowest node in the tree that has both `p` and `q` as descendants.',
        '**Level 1 — Brute Force Thinking**: Use the standard LCA algorithm for a normal binary tree. Time O(N).',
        '**Level 2 — Bottleneck Recognition**: The tree is a BST. We can find the split point where `p` and `q` diverge.',
        '**Level 3 — Pattern Recognition**: BST Divergence Point.',
        '**Level 4 — Algorithmic Direction**: If both `p` and `q` are less than root, move left. If both are greater, move right. If one is less and one is greater, or one equals the root, the current root is the LCA.',
        '**Level 5 — Complexity Target**: Time O(H), Space O(1) iteratively.'
      ]
    },
    // HEAP / PRIORITY QUEUE
    {
      slug: 'leetcode-215-kth-largest-element-in-an-array', platform: 'LEETCODE', sourceProblemId: '215',
      title: 'Kth Largest Element in an Array', sourceUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', difficulty: 'MEDIUM',
      statement: 'Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array.',
      expectedTime: 'O(N log K)', expectedSpace: 'O(K)',
      tags: ['heap', 'sorting'], pattern: 'Heap / Selection', topics: ['Heaps'],
      hints: [
        '**Level 0 — Understand**: You need the Kth largest without fully sorting the array.',
        '**Level 1 — Brute Force Thinking**: Sort the array descending, return `nums[k-1]`. Time O(N log N).',
        '**Level 2 — Bottleneck Recognition**: Sorting N elements is overkill when we only care about K elements.',
        '**Level 3 — Pattern Recognition**: Min-Heap of size K.',
        '**Level 4 — Algorithmic Direction**: Push elements into a Min-Heap. If the heap size exceeds K, pop the minimum. At the end, the top of the Min-Heap is the Kth largest element.',
        '**Level 5 — Complexity Target**: Time O(N log K), Space O(K). (Alternatively O(N) average with Quickselect).'
      ]
    },
    {
      slug: 'leetcode-1046-last-stone-weight', platform: 'LEETCODE', sourceProblemId: '1046',
      title: 'Last Stone Weight', sourceUrl: 'https://leetcode.com/problems/last-stone-weight/', difficulty: 'EASY',
      statement: 'You are given an array of integers `stones`. On each turn, we choose the heaviest two stones and smash them together. If x == y they destroy each other. If x != y, the remainder becomes a new stone. Return the weight of the last remaining stone.',
      expectedTime: 'O(N log N)', expectedSpace: 'O(N)',
      tags: ['heap', 'simulation'], pattern: 'Max Heap', topics: ['Heaps'],
      hints: [
        '**Level 0 — Understand**: Always get the top 2 elements. Process them, and potentially insert a new element.',
        '**Level 1 — Brute Force Thinking**: Sort the array, take the last two, push the result, sort again. Time O(N^2 log N).',
        '**Level 2 — Bottleneck Recognition**: We need to continuously extract the maximums and insert elements efficiently.',
        '**Level 3 — Pattern Recognition**: Max-Heap Simulation.',
        '**Level 4 — Algorithmic Direction**: Push all stones into a Max-Heap. While size > 1, pop two largest. If they aren\'t equal, push the difference back. Return the last element or 0 if empty.',
        '**Level 5 — Complexity Target**: Time O(N log N), Space O(N) to build heap.'
      ]
    },
    {
      slug: 'leetcode-973-k-closest-points-to-origin', platform: 'LEETCODE', sourceProblemId: '973',
      title: 'K Closest Points to Origin', sourceUrl: 'https://leetcode.com/problems/k-closest-points-to-origin/', difficulty: 'MEDIUM',
      statement: 'Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane and an integer `k`, return the `k` closest points to the origin `(0, 0)`.',
      expectedTime: 'O(N log K)', expectedSpace: 'O(K)',
      tags: ['heap', 'geometry', 'math'], pattern: 'Heap', topics: ['Heaps'],
      hints: [
        '**Level 0 — Understand**: Distance is `sqrt(x^2 + y^2)`. Find the K points with smallest distances.',
        '**Level 1 — Brute Force Thinking**: Calculate distance for all points, sort them, take the first K. Time O(N log N).',
        '**Level 2 — Bottleneck Recognition**: Same as Kth largest. We only need the K smallest, not to sort everything.',
        '**Level 3 — Pattern Recognition**: Max-Heap of size K (because we want to quickly pop and discard points that are too far).',
        '**Level 4 — Algorithmic Direction**: Use a Max-Heap storing `[distance, x, y]`. Push points. If size > K, pop. The heap will retain the K points with the smallest distances.',
        '**Level 5 — Complexity Target**: Time O(N log K), Space O(K).'
      ]
    },
    // GRAPH FOUNDATION
    {
      slug: 'leetcode-1971-find-if-path-exists-in-graph', platform: 'LEETCODE', sourceProblemId: '1971',
      title: 'Find if Path Exists in Graph', sourceUrl: 'https://leetcode.com/problems/find-if-path-exists-in-graph/', difficulty: 'EASY',
      statement: 'There is a bi-directional graph with `n` vertices, where each vertex is labeled from `0` to `n - 1`. Determine if a valid path exists from vertex `source` to vertex `destination`.',
      expectedTime: 'O(V + E)', expectedSpace: 'O(V + E)',
      tags: ['graph', 'dfs', 'bfs'], pattern: 'Graph DFS/BFS', topics: ['Graphs'],
      hints: [
        '**Level 0 — Understand**: You have an edge list. Can you reach node B from node A?',
        '**Level 1 — Brute Force Thinking**: Build an adjacency list. Traverse starting from source.',
        '**Level 2 — Bottleneck Recognition**: Standard graph traversal is required. Nothing to optimize beyond that.',
        '**Level 3 — Pattern Recognition**: Graph DFS / BFS / Disjoint Set Union (Union Find).',
        '**Level 4 — Algorithmic Direction**: Build an adjacency list `adj[u] = [v1, v2...]`. Use BFS with a Queue and a `visited` set to explore from `source` until you hit `destination` or run out of nodes.',
        '**Level 5 — Complexity Target**: Time O(V + E), Space O(V + E).'
      ]
    },
    {
      slug: 'leetcode-200-number-of-islands', platform: 'LEETCODE', sourceProblemId: '200',
      title: 'Number of Islands', sourceUrl: 'https://leetcode.com/problems/number-of-islands/', difficulty: 'MEDIUM',
      statement: 'Given an `m x n` 2D binary grid `grid` which represents a map of `\'1\'`s (land) and `\'0\'`s (water), return the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.',
      expectedTime: 'O(M * N)', expectedSpace: 'O(M * N)',
      tags: ['graph', 'dfs', 'bfs', 'matrix'], pattern: 'Grid DFS/BFS', topics: ['Graphs'],
      hints: [
        '**Level 0 — Understand**: Count connected groups of `1`s.',
        '**Level 1 — Brute Force Thinking**: Scan the grid. When you find a `1`, run a DFS to find all connected `1`s. Mark them as `0` or visited so you don\'t count them again.',
        '**Level 2 — Bottleneck Recognition**: Modifying the grid in-place (sinking the island) gives O(1) auxiliary space (excluding recursion stack).',
        '**Level 3 — Pattern Recognition**: Grid Connected Components via DFS/BFS.',
        '**Level 4 — Algorithmic Direction**: Iterate `i, j` over grid. If `grid[i][j] == \'1\'`, increment island count, then call `dfs(i, j)`. The DFS turns all connected `1`s to `0`s.',
        '**Level 5 — Complexity Target**: Time O(M * N), Space O(M * N) for recursion stack in worst case.'
      ]
    },
    {
      slug: 'leetcode-733-flood-fill', platform: 'LEETCODE', sourceProblemId: '733',
      title: 'Flood Fill', sourceUrl: 'https://leetcode.com/problems/flood-fill/', difficulty: 'EASY',
      statement: 'An image is represented by an `m x n` integer grid `image` where `image[i][j]` represents the pixel value. You are given `sr`, `sc`, and `color`. Perform a flood fill on the image starting from `image[sr][sc]`.',
      expectedTime: 'O(M * N)', expectedSpace: 'O(M * N)',
      tags: ['graph', 'dfs', 'bfs', 'matrix'], pattern: 'Grid DFS/BFS', topics: ['Graphs'],
      hints: [
        '**Level 0 — Understand**: Like the paint bucket tool. Change all connected pixels of the original color to the new color.',
        '**Level 1 — Brute Force Thinking**: DFS starting from `sr`, `sc`. Change colors as you go.',
        '**Level 2 — Bottleneck Recognition**: If the new color is the same as the old color, the DFS will infinitely loop.',
        '**Level 3 — Pattern Recognition**: Grid DFS.',
        '**Level 4 — Algorithmic Direction**: Get `old_color = image[sr][sc]`. If `old_color == color`, return image immediately. Otherwise, run DFS changing `old_color` to `color` on 4-directional neighbors.',
        '**Level 5 — Complexity Target**: Time O(M * N), Space O(M * N) recursion.'
      ]
    },
    {
      slug: 'leetcode-133-clone-graph', platform: 'LEETCODE', sourceProblemId: '133',
      title: 'Clone Graph', sourceUrl: 'https://leetcode.com/problems/clone-graph/', difficulty: 'MEDIUM',
      statement: 'Return a deep copy (clone) of a graph. Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.',
      expectedTime: 'O(V + E)', expectedSpace: 'O(V)',
      tags: ['graph', 'dfs', 'bfs', 'hash-map'], pattern: 'Graph Traversal', topics: ['Graphs'],
      hints: [
        '**Level 0 — Understand**: You must create new Node objects. Copy the structure exactly, including cycles.',
        '**Level 1 — Brute Force Thinking**: Traverse the graph and create new nodes. When you hit a cycle, you might accidentally create an infinite loop or duplicate nodes.',
        '**Level 2 — Bottleneck Recognition**: We need a way to map an original node to its newly created clone to wire up neighbors correctly.',
        '**Level 3 — Pattern Recognition**: Graph Traversal + Hash Map (Clone Map).',
        '**Level 4 — Algorithmic Direction**: Maintain a `map<Node, Node>`. During DFS, if a node is in the map, return its clone. If not, create a clone, put it in the map, then recursively clone all neighbors and add them to the clone\'s neighbors list.',
        '**Level 5 — Complexity Target**: Time O(V + E), Space O(V) for the map and recursion stack.'
      ]
    },
    // BFS / DFS
    {
      slug: 'leetcode-994-rotting-oranges', platform: 'LEETCODE', sourceProblemId: '994',
      title: 'Rotting Oranges', sourceUrl: 'https://leetcode.com/problems/rotting-oranges/', difficulty: 'MEDIUM',
      statement: 'You are given an `m x n` `grid` where each cell can have `0` (empty), `1` (fresh), or `2` (rotten). Every minute, any fresh orange adjacent to a rotten orange becomes rotten. Return the minimum number of minutes until no cell has a fresh orange.',
      expectedTime: 'O(M * N)', expectedSpace: 'O(M * N)',
      tags: ['graph', 'bfs', 'matrix'], pattern: 'Multi-source BFS', topics: ['Graphs'],
      hints: [
        '**Level 0 — Understand**: All currently rotten oranges spread simultaneously per minute. Find time to rot all.',
        '**Level 1 — Brute Force Thinking**: Simulate the process. Find all 2s, rot neighbors, repeat until no more changes. Time O((M*N)^2).',
        '**Level 2 — Bottleneck Recognition**: Re-scanning the grid every minute is inefficient.',
        '**Level 3 — Pattern Recognition**: Multi-source BFS.',
        '**Level 4 — Algorithmic Direction**: Scan grid once. Count fresh oranges. Push all initial rotten oranges into a Queue. Run BFS layer by layer (minute by minute). If a fresh orange is rotted, decrement fresh count.',
        '**Level 5 — Complexity Target**: Time O(M * N), Space O(M * N) for queue.'
      ]
    },
    {
      slug: 'leetcode-841-keys-and-rooms', platform: 'LEETCODE', sourceProblemId: '841',
      title: 'Keys and Rooms', sourceUrl: 'https://leetcode.com/problems/keys-and-rooms/', difficulty: 'MEDIUM',
      statement: 'There are `n` rooms labeled from `0` to `n - 1`. You start in room `0`. Each room has a set of keys to open other rooms. Return `true` if you can visit all the rooms.',
      expectedTime: 'O(V + E)', expectedSpace: 'O(V)',
      tags: ['graph', 'dfs', 'bfs'], pattern: 'Graph DFS', topics: ['Graphs'],
      hints: [
        '**Level 0 — Understand**: You start with key 0. Can you reach all rooms using keys found along the way?',
        '**Level 1 — Brute Force Thinking**: Run a DFS or BFS from room 0. Keep track of visited rooms.',
        '**Level 2 — Bottleneck Recognition**: The input is already an adjacency list where `rooms[i]` contains the neighbors.',
        '**Level 3 — Pattern Recognition**: Simple Graph Connectivity.',
        '**Level 4 — Algorithmic Direction**: DFS or BFS with a `visited` boolean array. Start at 0. Finally, check if all `visited[i]` are true.',
        '**Level 5 — Complexity Target**: Time O(V + E) where V is rooms and E is keys. Space O(V).'
      ]
    },
    {
      slug: 'leetcode-547-number-of-provinces', platform: 'LEETCODE', sourceProblemId: '547',
      title: 'Number of Provinces', sourceUrl: 'https://leetcode.com/problems/number-of-provinces/', difficulty: 'MEDIUM',
      statement: 'There are `n` cities. Some are connected. If city `a` is connected directly with city `b`, and city `b` with `c`, then `a` is connected indirectly with `c`. A province is a group of directly or indirectly connected cities. Return the number of provinces.',
      expectedTime: 'O(N^2)', expectedSpace: 'O(N)',
      tags: ['graph', 'dfs', 'bfs', 'union-find'], pattern: 'Connected Components', topics: ['Graphs'],
      hints: [
        '**Level 0 — Understand**: The input is an adjacency matrix. Count the number of isolated networks of cities.',
        '**Level 1 — Brute Force Thinking**: Iterate through cities. If unvisited, run DFS to find all cities in its province. Increment province count. Time O(N^2) due to matrix reading.',
        '**Level 2 — Bottleneck Recognition**: Standard approach is optimal.',
        '**Level 3 — Pattern Recognition**: Connected Components (DFS / BFS) OR Union Find.',
        '**Level 4 — Algorithmic Direction**: Maintain a `visited` array. Loop `i` from 0 to N-1. If `!visited[i]`, `count++` and call `dfs(i)`. The DFS marks all connected cities as visited by checking `isConnected[i][j] == 1`.',
        '**Level 5 — Complexity Target**: Time O(N^2) to read the matrix. Space O(N).'
      ]
    },
    // GREEDY
    {
      slug: 'leetcode-455-assign-cookies', platform: 'LEETCODE', sourceProblemId: '455',
      title: 'Assign Cookies', sourceUrl: 'https://leetcode.com/problems/assign-cookies/', difficulty: 'EASY',
      statement: 'Assume you are an awesome parent and want to give your children some cookies. Each child `i` has a greed factor `g[i]`, and each cookie `j` has a size `s[j]`. If `s[j] >= g[i]`, you can assign the cookie. Maximize the number of content children.',
      expectedTime: 'O(N log N + M log M)', expectedSpace: 'O(1) auxiliary',
      tags: ['greedy', 'sorting', 'two-pointers'], pattern: 'Greedy + Sorting', topics: ['Greedy'],
      hints: [
        '**Level 0 — Understand**: Match the smallest cookies to the least greedy children to maximize assignments.',
        '**Level 1 — Brute Force Thinking**: Try all permutations of assignments. Extremely slow.',
        '**Level 2 — Bottleneck Recognition**: We should always try to satisfy the least greedy child with the smallest cookie that works.',
        '**Level 3 — Pattern Recognition**: Sorting + Two Pointers (Greedy matching).',
        '**Level 4 — Algorithmic Direction**: Sort both `g` and `s`. Use pointer `i` for children and `j` for cookies. If `s[j] >= g[i]`, both increment (child satisfied). If not, increment `j` (try a bigger cookie).',
        '**Level 5 — Complexity Target**: Time O(N log N + M log M) to sort. Space O(1).'
      ]
    },
    {
      slug: 'leetcode-121-best-time-to-buy-and-sell-stock', platform: 'LEETCODE', sourceProblemId: '121',
      title: 'Best Time to Buy and Sell Stock', sourceUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', difficulty: 'EASY',
      statement: 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
      expectedTime: 'O(N)', expectedSpace: 'O(1)',
      tags: ['array', 'greedy', 'dp'], pattern: 'Greedy / Running Minimum', topics: ['Greedy'], // Adjusting proxy topics
      hints: [
        '**Level 0 — Understand**: Find the maximum difference `prices[j] - prices[i]` where `j > i`.',
        '**Level 1 — Brute Force Thinking**: Check all pairs `i` and `j` where `j > i`. Time O(N^2).',
        '**Level 2 — Bottleneck Recognition**: We only care about the lowest price we have seen *before* the current day.',
        '**Level 3 — Pattern Recognition**: Greedy Track Minimum.',
        '**Level 4 — Algorithmic Direction**: Maintain `min_price_so_far` and `max_profit`. As you iterate, `min_price_so_far = min(min_price, prices[i])`. Then `max_profit = max(max_profit, prices[i] - min_price_so_far)`.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-55-jump-game', platform: 'LEETCODE', sourceProblemId: '55',
      title: 'Jump Game', sourceUrl: 'https://leetcode.com/problems/jump-game/', difficulty: 'MEDIUM',
      statement: 'You are given an integer array `nums`. You are initially positioned at the array\'s first index, and each element in the array represents your maximum jump length at that position. Return `true` if you can reach the last index.',
      expectedTime: 'O(N)', expectedSpace: 'O(1)',
      tags: ['array', 'greedy', 'dp'], pattern: 'Greedy', topics: ['Greedy'],
      hints: [
        '**Level 0 — Understand**: Can you hop to the end of the array without getting stuck on a 0?',
        '**Level 1 — Brute Force Thinking**: Backtracking. From index `i`, try all jumps from `1` to `nums[i]`. Time O(2^N).',
        '**Level 2 — Bottleneck Recognition**: We don\'t need to know *how* to get there, just *if* we can get there. We only care about the furthest point we can reach.',
        '**Level 3 — Pattern Recognition**: Greedy Reachability.',
        '**Level 4 — Algorithmic Direction**: Maintain `max_reach`. Iterate `i` from 0 to N. If `i > max_reach`, return false (we can\'t even get to `i`). Otherwise, `max_reach = max(max_reach, i + nums[i])`. If `max_reach >= n - 1`, return true.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-134-gas-station', platform: 'LEETCODE', sourceProblemId: '134',
      title: 'Gas Station', sourceUrl: 'https://leetcode.com/problems/gas-station/', difficulty: 'MEDIUM',
      statement: 'There are `n` gas stations along a circular route, where the amount of gas at the `i`th station is `gas[i]`. You have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel to the next station. Return the starting gas station\'s index if you can travel around the circuit once in the clockwise direction, otherwise return -1.',
      expectedTime: 'O(N)', expectedSpace: 'O(1)',
      tags: ['array', 'greedy'], pattern: 'Greedy', topics: ['Greedy'],
      hints: [
        '**Level 0 — Understand**: Find a starting point where running `tank = tank + gas[i] - cost[i]` never drops below 0.',
        '**Level 1 — Brute Force Thinking**: Try starting at every station. Run the simulation. Time O(N^2).',
        '**Level 2 — Bottleneck Recognition**: If you start at A and fail at B, no station between A and B can be a valid starting point either (they have even less gas to start).',
        '**Level 3 — Pattern Recognition**: Greedy Prefix Sum / Accumulator.',
        '**Level 4 — Algorithmic Direction**: Maintain `total_tank` and `current_tank`. If `total_tank` of `gas - cost` over the whole array is < 0, return -1. As you iterate, if `current_tank < 0`, the start must be `i + 1`, so reset `current_tank = 0`.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    // INTERVALS
    {
      slug: 'leetcode-56-merge-intervals', platform: 'LEETCODE', sourceProblemId: '56',
      title: 'Merge Intervals', sourceUrl: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'MEDIUM',
      statement: 'Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
      expectedTime: 'O(N log N)', expectedSpace: 'O(N)',
      tags: ['array', 'sorting'], pattern: 'Interval Processing', topics: ['Arrays', 'Sorting Fundamentals'], // Using proxy topic
      hints: [
        '**Level 0 — Understand**: `[[1,3],[2,6],[8,10]]` -> `[[1,6],[8,10]]`. Combine overlapping ranges.',
        '**Level 1 — Brute Force Thinking**: Compare every interval with every other interval. Messy and hard to implement.',
        '**Level 2 — Bottleneck Recognition**: If intervals are sorted by start time, overlapping intervals will always be adjacent in the array.',
        '**Level 3 — Pattern Recognition**: Sorting + Interval Merging.',
        '**Level 4 — Algorithmic Direction**: Sort by `start`. Add first interval to `result`. Iterate through the rest: if `current_start <= last_merged_end`, update `last_merged_end = max(last_merged_end, current_end)`. Else, add `current` to `result`.',
        '**Level 5 — Complexity Target**: Time O(N log N), Space O(N) for result array.'
      ]
    },
    {
      slug: 'leetcode-57-insert-interval', platform: 'LEETCODE', sourceProblemId: '57',
      title: 'Insert Interval', sourceUrl: 'https://leetcode.com/problems/insert-interval/', difficulty: 'MEDIUM',
      statement: 'You are given an array of non-overlapping intervals `intervals` sorted by start time. Insert `newInterval` into `intervals` such that `intervals` is still sorted and non-overlapping (merge overlapping intervals if necessary).',
      expectedTime: 'O(N)', expectedSpace: 'O(N)',
      tags: ['array'], pattern: 'Interval Processing', topics: ['Arrays'],
      hints: [
        '**Level 0 — Understand**: The input is ALREADY sorted and merged. Just insert one new interval and fix overlaps.',
        '**Level 1 — Brute Force Thinking**: Add the new interval to the array, and run the `Merge Intervals` algorithm. Time O(N log N).',
        '**Level 2 — Bottleneck Recognition**: It\'s already sorted, so sorting again is unnecessary. We can do it in O(N).',
        '**Level 3 — Pattern Recognition**: Linear Interval Merging.',
        '**Level 4 — Algorithmic Direction**: Iterate. 1. Add all intervals ending before `newInterval` starts. 2. While intervals overlap `newInterval`, merge them into `newInterval` (`min` start, `max` end). Add the merged `newInterval`. 3. Add the rest.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(N).'
      ]
    },
    {
      slug: 'leetcode-435-non-overlapping-intervals', platform: 'LEETCODE', sourceProblemId: '435',
      title: 'Non-overlapping Intervals', sourceUrl: 'https://leetcode.com/problems/non-overlapping-intervals/', difficulty: 'MEDIUM',
      statement: 'Given an array of intervals `intervals`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.',
      expectedTime: 'O(N log N)', expectedSpace: 'O(1) auxiliary',
      tags: ['array', 'greedy', 'sorting'], pattern: 'Greedy + Intervals', topics: ['Greedy', 'Sorting Fundamentals'],
      hints: [
        '**Level 0 — Understand**: Find overlapping intervals and remove the one that causes the most damage (overlaps the most with future intervals).',
        '**Level 1 — Brute Force Thinking**: Try removing every subset of intervals and check if valid. Time O(2^N).',
        '**Level 2 — Bottleneck Recognition**: An interval that ends *early* leaves the most room for future intervals.',
        '**Level 3 — Pattern Recognition**: Greedy Scheduling (Sort by End Time).',
        '**Level 4 — Algorithmic Direction**: Sort intervals by their END time. Track `prev_end`. Iterate through: if `current_start >= prev_end`, we can keep it (update `prev_end = current_end`). If it overlaps, we must discard it (`count++`).',
        '**Level 5 — Complexity Target**: Time O(N log N) to sort, Space O(1).'
      ]
    },
    // BACKTRACKING
    {
      slug: 'leetcode-39-combination-sum', platform: 'LEETCODE', sourceProblemId: '39',
      title: 'Combination Sum', sourceUrl: 'https://leetcode.com/problems/combination-sum/', difficulty: 'MEDIUM',
      statement: 'Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`. You may choose the same number an unlimited number of times.',
      expectedTime: 'O(N^(T/M))', expectedSpace: 'O(T/M)',
      tags: ['array', 'backtracking'], pattern: 'Backtracking', topics: ['Recursion Fundamentals'],
      hints: [
        '**Level 0 — Understand**: `[2,3,6,7]`, target `7` -> `[[2,2,3], [7]]`. Order doesn\'t matter, no duplicates.',
        '**Level 1 — Brute Force Thinking**: Nested loops are impossible because we don\'t know how many numbers we will pick.',
        '**Level 2 — Bottleneck Recognition**: We need an exploration algorithm that branches out for every possible choice.',
        '**Level 3 — Pattern Recognition**: Backtracking / DFS on a state space tree.',
        '**Level 4 — Algorithmic Direction**: `backtrack(start_index, current_sum, current_path)`. At each step, iterate `i` from `start_index` (to allow reuse but prevent permutations). Add `candidates[i]`, recurse, pop.',
        '**Level 5 — Complexity Target**: Exponential time. Space depends on the max recursion depth (Target / min_element).'
      ]
    },
    {
      slug: 'leetcode-17-letter-combinations-of-a-phone-number', platform: 'LEETCODE', sourceProblemId: '17',
      title: 'Letter Combinations of a Phone Number', sourceUrl: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', difficulty: 'MEDIUM',
      statement: 'Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent.',
      expectedTime: 'O(4^N * N)', expectedSpace: 'O(N)',
      tags: ['hash-map', 'string', 'backtracking'], pattern: 'Backtracking', topics: ['Recursion Fundamentals', 'Strings'],
      hints: [
        '**Level 0 — Understand**: T9 keyboard. `2` -> `a,b,c`. `3` -> `d,e,f`. `"23"` -> `"ad","ae","af","bd"...`',
        '**Level 1 — Brute Force Thinking**: 4 nested loops? But the input string length varies, so we can\'t hardcode loops.',
        '**Level 2 — Bottleneck Recognition**: We need to branch cleanly for each digit.',
        '**Level 3 — Pattern Recognition**: Backtracking / DFS.',
        '**Level 4 — Algorithmic Direction**: Maintain a map of `digit -> letters`. Use `backtrack(index, current_string)`. Loop through letters for `digits[index]`, append to string, recurse to `index + 1`, and pop.',
        '**Level 5 — Complexity Target**: Time O(4^N * N) (4 is max letters per digit, N for string building), Space O(N) for recursion stack.'
      ]
    },
    // DYNAMIC PROGRAMMING
    {
      slug: 'leetcode-70-climbing-stairs', platform: 'LEETCODE', sourceProblemId: '70',
      title: 'Climbing Stairs', sourceUrl: 'https://leetcode.com/problems/climbing-stairs/', difficulty: 'EASY',
      statement: 'You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
      expectedTime: 'O(N)', expectedSpace: 'O(1)',
      tags: ['math', 'dp', 'memoization'], pattern: '1D Dynamic Programming', topics: ['Dynamic Programming'], // DP Proxy
      hints: [
        '**Level 0 — Understand**: To reach step 5, you either came from step 4 (took a 1-step) or from step 3 (took a 2-step).',
        '**Level 1 — Brute Force Thinking**: Recursive branching: `ways(n) = ways(n-1) + ways(n-2)`. Time O(2^N).',
        '**Level 2 — Bottleneck Recognition**: Overlapping subproblems. `ways(3)` is calculated multiple times.',
        '**Level 3 — Pattern Recognition**: 1D Dynamic Programming (Fibonacci).',
        '**Level 4 — Algorithmic Direction**: Use an array `dp` where `dp[i] = dp[i-1] + dp[i-2]`. To optimize to O(1) space, just keep track of `prev1` and `prev2`.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-198-house-robber', platform: 'LEETCODE', sourceProblemId: '198',
      title: 'House Robber', sourceUrl: 'https://leetcode.com/problems/house-robber/', difficulty: 'MEDIUM',
      statement: 'You are a professional robber planning to rob houses along a street. You cannot rob adjacent houses. Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight.',
      expectedTime: 'O(N)', expectedSpace: 'O(1)',
      tags: ['array', 'dp'], pattern: '1D Dynamic Programming', topics: ['Dynamic Programming'],
      hints: [
        '**Level 0 — Understand**: Maximize the sum of elements without picking two adjacent elements.',
        '**Level 1 — Brute Force Thinking**: Backtracking. For every house, either rob it (skip next) or skip it. Time O(2^N).',
        '**Level 2 — Bottleneck Recognition**: The decision for house `i` only depends on the max money robbed up to `i-1` and `i-2`.',
        '**Level 3 — Pattern Recognition**: 1D Dynamic Programming.',
        '**Level 4 — Algorithmic Direction**: `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`. Optimize to O(1) space by tracking `rob1` and `rob2`.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-322-coin-change', platform: 'LEETCODE', sourceProblemId: '322',
      title: 'Coin Change', sourceUrl: 'https://leetcode.com/problems/coin-change/', difficulty: 'MEDIUM',
      statement: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount, or -1 if impossible.',
      expectedTime: 'O(amount * C)', expectedSpace: 'O(amount)',
      tags: ['array', 'dp'], pattern: '1D Dynamic Programming', topics: ['Dynamic Programming'],
      hints: [
        '**Level 0 — Understand**: E.g. coins `[1,2,5]`, amount `11` -> `5 + 5 + 1` = 3 coins.',
        '**Level 1 — Brute Force Thinking**: Greedy doesn\'t always work (e.g., coins `[1,3,4]`, amount `6` -> greedy gives 4+1+1=3, optimal is 3+3=2). Must use recursion to explore all paths.',
        '**Level 2 — Bottleneck Recognition**: Recursion recalculates the minimum coins for the same amount repeatedly.',
        '**Level 3 — Pattern Recognition**: Unbounded Knapsack / 1D DP.',
        '**Level 4 — Algorithmic Direction**: Initialize an array `dp` of size `amount + 1` with Infinity. `dp[0] = 0`. For every amount `a` from 1 to `amount`, for every coin `c`, `dp[a] = min(dp[a], 1 + dp[a - c])`.',
        '**Level 5 — Complexity Target**: Time O(Amount * num_coins), Space O(Amount).'
      ]
    }
  ];

  for (const prob of problemsData) {
    const patternId = patternMap[prob.pattern];
    const matchedTopics = getTopicIds(prob.topics);
    await prisma.practiceProblem.upsert({
      where: { slug: prob.slug },
      update: {
        title: prob.title, statement: prob.statement, platform: prob.platform, sourceProblemId: prob.sourceProblemId,
        sourceUrl: prob.sourceUrl, difficulty: prob.difficulty, tags: prob.tags, expectedTime: prob.expectedTime,
        expectedSpace: prob.expectedSpace, hints: prob.hints, status: 'PUBLISHED',
        patternIds: patternId ? [patternId] : [], topicIds: matchedTopics
      },
      create: {
        slug: prob.slug, title: prob.title, statement: prob.statement, platform: prob.platform, sourceProblemId: prob.sourceProblemId,
        sourceUrl: prob.sourceUrl, difficulty: prob.difficulty, problemType: 'CODING', tags: prob.tags, expectedTime: prob.expectedTime,
        expectedSpace: prob.expectedSpace, hints: prob.hints, status: 'PUBLISHED',
        patternIds: patternId ? [patternId] : [], topicIds: matchedTopics
      }
    });
  }

  console.log(`✅ Seed Phase 5B-3 complete. Upserted ${problemsData.length} problems.`);
}

seedPhase5B3().catch(console.error).finally(() => prisma.$disconnect());
