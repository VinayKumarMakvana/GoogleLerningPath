import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedPhase5B2() {
  console.log('Starting Phase 5B-2 Curation Seed...');

  const patternsToCreate = [
    { name: 'Cycle Detection', slug: 'cycle-detection', description: 'Detecting cycles using hash sets or fast/slow pointers.' },
    { name: 'Sliding Window (Fixed)', slug: 'sliding-window-fixed', description: 'Maintaining a window of fixed size over an array.' },
    { name: 'Sliding Window (Variable)', slug: 'sliding-window-variable', description: 'Expanding and contracting a window to meet a condition.' },
    { name: 'Monotonic Stack', slug: 'monotonic-stack', description: 'Maintaining a stack sorted in a specific order.' },
    { name: 'Queue', slug: 'queue', description: 'FIFO data structure usage.' },
    { name: 'Linked List Traversal', slug: 'linked-list-traversal', description: 'Traversing a linked list.' },
    { name: 'Linked List Merge', slug: 'linked-list-merge', description: 'Merging two or more linked lists.' },
    { name: 'Two Pointers / Merge', slug: 'two-pointers-merge', description: 'Using two pointers to merge sorted arrays.' },
    { name: 'Dutch National Flag', slug: 'dutch-national-flag', description: 'Three-way partitioning of an array.' },
    { name: 'Insertion Sort', slug: 'insertion-sort', description: 'Building a sorted list one element at a time.' },
    { name: 'Recursion', slug: 'recursion', description: 'A function calling itself to solve smaller subproblems.' },
    { name: 'Backtracking', slug: 'backtracking', description: 'Exploring all possible states and abandoning invalid ones.' }
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
  
  // Create aliases mapping for slightly different requested names
  patternMap['Hashing / Frequency Signature'] = patternMap['Frequency Map'];
  patternMap['Frequency / Voting'] = patternMap['Frequency Map'];
  patternMap['Hash Set / Cycle Detection'] = patternMap['Cycle Detection'];
  patternMap['Sorting + Two Pointers'] = patternMap['Two Pointers'];
  patternMap['Prefix Sum + Hash Map'] = patternMap['Prefix Sum'];
  patternMap['Stack Design'] = patternMap['Data Structure Design'];
  patternMap['Queue Design'] = patternMap['Data Structure Design'];
  patternMap['Linked List + Two Pointers'] = patternMap['Fast and Slow Pointers'];
  patternMap['Insertion Sort / Linked List'] = patternMap['Insertion Sort'];
  patternMap['Recursion / Dynamic Programming Introduction'] = patternMap['Recursion'];
  patternMap['Recursion / Bitwise'] = patternMap['Recursion'];
  patternMap['Sliding Window + Frequency'] = patternMap['Sliding Window (Fixed)']; // or variable, but typically fixed length of anagram

  const topics = await prisma.topic.findMany();
  const getTopicIds = (titles: string[]) => {
    return topics.filter(t => titles.includes(t.title)).map(t => t.id);
  };

  const problemsData = [
    // HASHING
    {
      slug: 'leetcode-49-group-anagrams', platform: 'LEETCODE', sourceProblemId: '49',
      title: 'Group Anagrams', sourceUrl: 'https://leetcode.com/problems/group-anagrams/', difficulty: 'MEDIUM',
      statement: 'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.',
      expectedTime: 'O(N * K)', expectedSpace: 'O(N * K)',
      tags: ['arrays', 'hash-map', 'strings'], pattern: 'Hashing / Frequency Signature', topics: ['Basic Hashing', 'unordered_map', 'Strings'],
      hints: [
        '**Level 0 — Understand**: Group strings that contain the exact same characters in the same amounts.',
        '**Level 1 — Brute Force Thinking**: Compare every string with every other string using a frequency count. Time: O(N^2 * K).',
        '**Level 2 — Bottleneck Recognition**: We are doing N^2 comparisons instead of a single grouping pass.',
        '**Level 3 — Pattern Recognition**: Frequency Signature / Hash Map Lookup.',
        '**Level 4 — Algorithmic Direction**: Sort each string, or build a character frequency array (e.g., `#2#1#0...`), and use it as a key in a hash map where the value is a list of strings.',
        '**Level 5 — Complexity Target**: Time O(N * K log K) for sorting or O(N * K) for frequency array. Space O(N * K).'
      ]
    },
    {
      slug: 'leetcode-169-majority-element', platform: 'LEETCODE', sourceProblemId: '169',
      title: 'Majority Element', sourceUrl: 'https://leetcode.com/problems/majority-element/', difficulty: 'EASY',
      statement: 'Given an array `nums` of size `n`, return the majority element (appears more than `⌊n / 2⌋` times).',
      expectedTime: 'O(N)', expectedSpace: 'O(1)',
      tags: ['arrays', 'hash-map'], pattern: 'Frequency / Voting', topics: ['Arrays', 'Basic Hashing'],
      hints: [
        '**Level 0 — Understand**: Find the element that makes up strictly more than half of the array.',
        '**Level 1 — Brute Force Thinking**: Two nested loops to count occurrences of each element. Time O(N^2).',
        '**Level 2 — Bottleneck Recognition**: We recount elements unnecessarily.',
        '**Level 3 — Pattern Recognition**: Frequency Map OR Boyer-Moore Majority Vote Algorithm.',
        '**Level 4 — Algorithmic Direction**: Use a Hash Map to count occurrences. Or for O(1) space, use a `candidate` and a `count`. When `count` is 0, pick a new `candidate`. If `nums[i] == candidate`, `count++`, else `count--`.',
        '**Level 5 — Complexity Target**: Time O(N). Space O(1) with Boyer-Moore.'
      ]
    },
    {
      slug: 'leetcode-202-happy-number', platform: 'LEETCODE', sourceProblemId: '202',
      title: 'Happy Number', sourceUrl: 'https://leetcode.com/problems/happy-number/', difficulty: 'EASY',
      statement: 'Write an algorithm to determine if a number `n` is happy. A happy number is defined by replacing the number with the sum of the squares of its digits, and repeating until it equals 1, or loops endlessly.',
      expectedTime: 'O(log N)', expectedSpace: 'O(log N)',
      tags: ['hash-set', 'math'], pattern: 'Hash Set / Cycle Detection', topics: ['Basic Hashing', 'unordered_set'],
      hints: [
        '**Level 0 — Understand**: Take digits, square them, sum them. Repeat. Does it ever hit 1? Or does it loop forever?',
        '**Level 1 — Brute Force Thinking**: Keep doing the operation in a while loop. But if it loops forever, the program hangs.',
        '**Level 2 — Bottleneck Recognition**: We need to detect if we\'ve seen a number before to break infinite loops.',
        '**Level 3 — Pattern Recognition**: Cycle Detection using Hash Set.',
        '**Level 4 — Algorithmic Direction**: Maintain a `unordered_set`. Calculate the sum of squares. If it is 1, return true. If it\'s already in the set, return false. Otherwise, insert it and continue.',
        '**Level 5 — Complexity Target**: Time O(log N) (numbers collapse quickly). Space O(log N).'
      ]
    },
    // TWO POINTERS
    {
      slug: 'leetcode-15-3sum', platform: 'LEETCODE', sourceProblemId: '15',
      title: '3Sum', sourceUrl: 'https://leetcode.com/problems/3sum/', difficulty: 'MEDIUM',
      statement: 'Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. No duplicate triplets.',
      expectedTime: 'O(N^2)', expectedSpace: 'O(1) auxiliary',
      tags: ['arrays', 'two-pointers', 'sorting'], pattern: 'Sorting + Two Pointers', topics: ['Arrays', 'Two Pointers Introduction', 'Sorting Fundamentals'],
      hints: [
        '**Level 0 — Understand**: Find 3 numbers that sum to 0. You cannot reuse the same index, and you must not return duplicate combinations like `[-1, 0, 1]` and `[0, 1, -1]`.',
        '**Level 1 — Brute Force Thinking**: Three nested loops checking `a + b + c == 0`. Time O(N^3). Space O(N) to store sets to prevent duplicates.',
        '**Level 2 — Bottleneck Recognition**: O(N^3) is way too slow for N=3000. Duplicate checking via sets is messy.',
        '**Level 3 — Pattern Recognition**: Sorting + Two Sum II (Opposite Direction Two Pointers).',
        '**Level 4 — Algorithmic Direction**: Sort the array first. Loop `i` from 0 to N-2. For each `i`, run the Two Pointers approach on the subarray `i+1` to `N-1` looking for `-nums[i]`. Skip duplicate `nums[i]` to avoid duplicate triplets.',
        '**Level 5 — Complexity Target**: Time O(N^2), Space O(1) (excluding output array).'
      ]
    },
    {
      slug: 'leetcode-11-container-with-most-water', platform: 'LEETCODE', sourceProblemId: '11',
      title: 'Container With Most Water', sourceUrl: 'https://leetcode.com/problems/container-with-most-water/', difficulty: 'MEDIUM',
      statement: 'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn. Find two lines that together with the x-axis form a container, such that the container contains the most water.',
      expectedTime: 'O(N)', expectedSpace: 'O(1)',
      tags: ['arrays', 'two-pointers'], pattern: 'Two Pointers', topics: ['Arrays', 'Two Pointers Introduction'],
      hints: [
        '**Level 0 — Understand**: Water amount = `width * min(height_left, height_right)`. Maximize this area.',
        '**Level 1 — Brute Force Thinking**: Two nested loops to check all pairs of lines. Time O(N^2).',
        '**Level 2 — Bottleneck Recognition**: The width is maximized at the very edges. The only way to get a larger area by shrinking the width is if the height increases.',
        '**Level 3 — Pattern Recognition**: Opposite Direction Two Pointers.',
        '**Level 4 — Algorithmic Direction**: Start `left` at 0, `right` at `n-1`. Calculate area. Then, move the pointer that points to the shorter line inward (since keeping it and moving the taller one would only decrease the width without increasing the limiting height).',
        '**Level 5 — Complexity Target**: Time O(N). Space O(1).'
      ]
    },
    {
      slug: 'leetcode-977-squares-of-a-sorted-array', platform: 'LEETCODE', sourceProblemId: '977',
      title: 'Squares of a Sorted Array', sourceUrl: 'https://leetcode.com/problems/squares-of-a-sorted-array/', difficulty: 'EASY',
      statement: 'Given an integer array `nums` sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.',
      expectedTime: 'O(N)', expectedSpace: 'O(N)',
      tags: ['arrays', 'two-pointers'], pattern: 'Two Pointers', topics: ['Arrays', 'Two Pointers Introduction'],
      hints: [
        '**Level 0 — Understand**: Array has negatives. Squaring makes them positive. So `-4` becomes `16`, which might be larger than `3` squared `9`.',
        '**Level 1 — Brute Force Thinking**: Square all elements in-place, then run a sorting algorithm. Time O(N log N).',
        '**Level 2 — Bottleneck Recognition**: The array is already sorted. The largest squares will always be at the far left (most negative) or far right (most positive).',
        '**Level 3 — Pattern Recognition**: Opposite Direction Two Pointers + Merge.',
        '**Level 4 — Algorithmic Direction**: Place `left` at 0, `right` at `n-1`. Create a result array of size `n`. Fill it from right to left (largest to smallest) by comparing `nums[left]^2` and `nums[right]^2`.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(N).'
      ]
    },
    // SLIDING WINDOW
    {
      slug: 'leetcode-643-maximum-average-subarray-i', platform: 'LEETCODE', sourceProblemId: '643',
      title: 'Maximum Average Subarray I', sourceUrl: 'https://leetcode.com/problems/maximum-average-subarray-i/', difficulty: 'EASY',
      statement: 'You are given an integer array `nums` consisting of `n` elements, and an integer `k`. Find a contiguous subarray whose length is equal to `k` that has the maximum average value and return this value.',
      expectedTime: 'O(N)', expectedSpace: 'O(1)',
      tags: ['arrays', 'sliding-window'], pattern: 'Sliding Window (Fixed)', topics: ['Arrays', 'Array Traversal'],
      hints: [
        '**Level 0 — Understand**: Find the sum of any contiguous `k` elements that is the largest. Return `sum / k`.',
        '**Level 1 — Brute Force Thinking**: For every index `i`, loop `k` times to find the sum. Time O(N*K).',
        '**Level 2 — Bottleneck Recognition**: When moving the window one step, `k-1` elements are exactly the same. Re-adding them is redundant.',
        '**Level 3 — Pattern Recognition**: Fixed Sliding Window.',
        '**Level 4 — Algorithmic Direction**: Calculate the sum of the first `k` elements. Then, for `i` from `k` to `n-1`, update the window sum by adding `nums[i]` and subtracting `nums[i-k]`. Keep track of the max sum.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-3-longest-substring-without-repeating', platform: 'LEETCODE', sourceProblemId: '3',
      title: 'Longest Substring Without Repeating Characters', sourceUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'MEDIUM',
      statement: 'Given a string `s`, find the length of the longest substring without repeating characters.',
      expectedTime: 'O(N)', expectedSpace: 'O(1) auxiliary',
      tags: ['strings', 'sliding-window', 'hash-set'], pattern: 'Sliding Window (Variable)', topics: ['Strings', 'Two Pointers Introduction'],
      hints: [
        '**Level 0 — Understand**: "abcabcbb" -> longest is "abc", length 3.',
        '**Level 1 — Brute Force Thinking**: Check all possible substrings (O(N^2)). For each, check if it has duplicates (O(N)). Time O(N^3).',
        '**Level 2 — Bottleneck Recognition**: If a substring from `i` to `j` has a duplicate, extending `j` further will never fix it. We need to shrink from the left.',
        '**Level 3 — Pattern Recognition**: Variable Sliding Window using a Set/Hash Map.',
        '**Level 4 — Algorithmic Direction**: Use `left` and `right` pointers. Expand `right`. If `s[right]` is in the set, remove `s[left]` and increment `left` until `s[right]` can be added. Track max window size.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1) (bounded by alphabet size).'
      ]
    },
    {
      slug: 'leetcode-567-permutation-in-string', platform: 'LEETCODE', sourceProblemId: '567',
      title: 'Permutation in String', sourceUrl: 'https://leetcode.com/problems/permutation-in-string/', difficulty: 'MEDIUM',
      statement: 'Given two strings `s1` and `s2`, return true if `s2` contains a permutation of `s1`, or false otherwise.',
      expectedTime: 'O(N)', expectedSpace: 'O(1)',
      tags: ['strings', 'sliding-window', 'hash-map'], pattern: 'Sliding Window + Frequency', topics: ['Strings', 'Basic Hashing'],
      hints: [
        '**Level 0 — Understand**: A permutation means the substring in `s2` has the exact same character frequencies as `s1`. Length must be exactly `s1.length()`.',
        '**Level 1 — Brute Force Thinking**: Generate all permutations of `s1` and search for them in `s2`. Time O(N!). Or check every substring of size `s1.length()` in `s2` to see if frequencies match. Time O(N * K).',
        '**Level 2 — Bottleneck Recognition**: We don\'t need to recount the frequencies from scratch for every substring.',
        '**Level 3 — Pattern Recognition**: Fixed Sliding Window + Frequency Map.',
        '**Level 4 — Algorithmic Direction**: Maintain a frequency array for `s1` and one for the current window in `s2`. Slide a window of size `s1.length()` across `s2`, updating the window frequencies by adding the right char and removing the left char. Compare arrays.',
        '**Level 5 — Complexity Target**: Time O(N) (comparing 26-char arrays is O(1)), Space O(1).'
      ]
    },
    // PREFIX SUM
    {
      slug: 'leetcode-1732-find-the-highest-altitude', platform: 'LEETCODE', sourceProblemId: '1732',
      title: 'Find the Highest Altitude', sourceUrl: 'https://leetcode.com/problems/find-the-highest-altitude/', difficulty: 'EASY',
      statement: 'You are given an integer array `gain` of length `n` where `gain[i]` is the net gain in altitude between points `i` and `i + 1`. The biker starts at altitude `0`. Return the highest altitude of a point.',
      expectedTime: 'O(N)', expectedSpace: 'O(1)',
      tags: ['arrays', 'prefix-sum'], pattern: 'Prefix Sum', topics: ['Arrays', 'Prefix Sum Introduction'],
      hints: [
        '**Level 0 — Understand**: Start at 0. Add each gain element to get the altitude at that point. Find the max altitude.',
        '**Level 1 — Brute Force Thinking**: Simulate the process. Keep a running sum. Track the maximum value seen so far.',
        '**Level 2 — Bottleneck Recognition**: Simulation is already optimal O(N) time.',
        '**Level 3 — Pattern Recognition**: Prefix Sum / Running Sum.',
        '**Level 4 — Algorithmic Direction**: Maintain `current_altitude = 0` and `max_altitude = 0`. Iterate through `gain`, adding to `current_altitude`, and updating `max_altitude`.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-560-subarray-sum-equals-k', platform: 'LEETCODE', sourceProblemId: '560',
      title: 'Subarray Sum Equals K', sourceUrl: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'MEDIUM',
      statement: 'Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.',
      expectedTime: 'O(N)', expectedSpace: 'O(N)',
      tags: ['arrays', 'prefix-sum', 'hash-map'], pattern: 'Prefix Sum + Hash Map', topics: ['Arrays', 'Prefix Sum Introduction', 'Basic Hashing'],
      hints: [
        '**Level 0 — Understand**: Find how many contiguous subarrays add up to exactly `k`. Subarrays can have negative numbers.',
        '**Level 1 — Brute Force Thinking**: Check all possible subarrays. Loop `i` from 0 to `N`, and `j` from `i` to `N`, summing elements. Time O(N^2).',
        '**Level 2 — Bottleneck Recognition**: The sum from `i` to `j` is `prefix[j] - prefix[i-1]`. If this equals `k`, then `prefix[i-1] = prefix[j] - k`.',
        '**Level 3 — Pattern Recognition**: Prefix Sum + Hash Map (Two Sum logic applied to Prefix Sums).',
        '**Level 4 — Algorithmic Direction**: Iterate through the array maintaining a running `prefix_sum`. Check if `prefix_sum - k` exists in a hash map of seen prefix sums. Add its frequency to the total count. Then add `prefix_sum` to the hash map.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(N).'
      ]
    },
    // BINARY SEARCH
    {
      slug: 'leetcode-74-search-a-2d-matrix', platform: 'LEETCODE', sourceProblemId: '74',
      title: 'Search a 2D Matrix', sourceUrl: 'https://leetcode.com/problems/search-a-2d-matrix/', difficulty: 'MEDIUM',
      statement: 'You are given an `m x n` integer matrix `matrix` with the following two properties: Each row is sorted in non-decreasing order. The first integer of each row is greater than the last integer of the previous row. Given an integer `target`, return `true` if `target` is in `matrix` or `false` otherwise.',
      expectedTime: 'O(log(M * N))', expectedSpace: 'O(1)',
      tags: ['arrays', 'binary-search', 'matrix'], pattern: 'Binary Search', topics: ['Arrays', 'Binary Search Introduction'],
      hints: [
        '**Level 0 — Understand**: The matrix behaves exactly like a single sorted 1D array cut into rows.',
        '**Level 1 — Brute Force Thinking**: Scan every element. Time O(M * N). Or binary search each row independently. Time O(M log N).',
        '**Level 2 — Bottleneck Recognition**: We aren\'t fully utilizing the global sorted property across rows.',
        '**Level 3 — Pattern Recognition**: 1D to 2D Binary Search.',
        '**Level 4 — Algorithmic Direction**: Treat the matrix as an array of length `M * N`. `left = 0`, `right = M * N - 1`. The 2D coordinates for any `mid` are `row = mid / n` and `col = mid % n`.',
        '**Level 5 — Complexity Target**: Time O(log(M * N)), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-153-find-minimum-in-rotated-sorted-array', platform: 'LEETCODE', sourceProblemId: '153',
      title: 'Find Minimum in Rotated Sorted Array', sourceUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'MEDIUM',
      statement: 'Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. Given the sorted rotated array `nums` of unique elements, return the minimum element of this array.',
      expectedTime: 'O(log N)', expectedSpace: 'O(1)',
      tags: ['arrays', 'binary-search'], pattern: 'Binary Search', topics: ['Arrays', 'Binary Search Introduction'],
      hints: [
        '**Level 0 — Understand**: `[3,4,5,1,2]` is sorted but rotated. The minimum is the "pivot" point (1).',
        '**Level 1 — Brute Force Thinking**: Linear scan to find the minimum. Time O(N).',
        '**Level 2 — Bottleneck Recognition**: The array is mostly sorted. Linear scan ignores this structure.',
        '**Level 3 — Pattern Recognition**: Binary Search on rotated property.',
        '**Level 4 — Algorithmic Direction**: If `nums[mid] > nums[right]`, the minimum must be to the right of `mid`. Otherwise, the minimum is `mid` or to its left.',
        '**Level 5 — Complexity Target**: Time O(log N), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-33-search-in-rotated-sorted-array', platform: 'LEETCODE', sourceProblemId: '33',
      title: 'Search in Rotated Sorted Array', sourceUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', difficulty: 'MEDIUM',
      statement: 'There is an integer array `nums` sorted in ascending order (with distinct values) that is possibly rotated. Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.',
      expectedTime: 'O(log N)', expectedSpace: 'O(1)',
      tags: ['arrays', 'binary-search'], pattern: 'Binary Search', topics: ['Arrays', 'Binary Search Introduction'],
      hints: [
        '**Level 0 — Understand**: You must find a target in O(log n) time inside a rotated sorted array.',
        '**Level 1 — Brute Force Thinking**: Find the pivot first, then run normal binary search on the correct half. Time O(log N) total. Can we do it in one pass?',
        '**Level 2 — Bottleneck Recognition**: Standard binary search fails because the whole array isn\'t monotonically sorted.',
        '**Level 3 — Pattern Recognition**: Binary Search with piecewise monotonic properties.',
        '**Level 4 — Algorithmic Direction**: At any `mid`, one half of the array (left or right) MUST be properly sorted. Check which half is sorted. If the target falls within the bounds of that sorted half, narrow the search to it. Otherwise, search the other half.',
        '**Level 5 — Complexity Target**: Time O(log N), Space O(1).'
      ]
    },
    // STACK
    {
      slug: 'leetcode-155-min-stack', platform: 'LEETCODE', sourceProblemId: '155',
      title: 'Min Stack', sourceUrl: 'https://leetcode.com/problems/min-stack/', difficulty: 'MEDIUM',
      statement: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
      expectedTime: 'O(1) per operation', expectedSpace: 'O(N)',
      tags: ['stack', 'design'], pattern: 'Stack Design', topics: ['stack', 'Stack Fundamentals'],
      hints: [
        '**Level 0 — Understand**: Standard stack operations, plus `getMin()` in O(1) time.',
        '**Level 1 — Brute Force Thinking**: Use a normal stack. When `getMin` is called, iterate through the stack to find the minimum. Time O(N) per `getMin` call.',
        '**Level 2 — Bottleneck Recognition**: We need to know the minimum at any state of the stack instantly, even after popping the current minimum.',
        '**Level 3 — Pattern Recognition**: Parallel State Stack.',
        '**Level 4 — Algorithmic Direction**: Store pairs `(value, current_min)` in the stack. When pushing `x`, the new `current_min` is `min(x, previous_min)`. Or use two stacks: one for values, one strictly for minimums.',
        '**Level 5 — Complexity Target**: Time O(1) per operation, Space O(N).'
      ]
    },
    {
      slug: 'leetcode-739-daily-temperatures', platform: 'LEETCODE', sourceProblemId: '739',
      title: 'Daily Temperatures', sourceUrl: 'https://leetcode.com/problems/daily-temperatures/', difficulty: 'MEDIUM',
      statement: 'Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`th day to get a warmer temperature.',
      expectedTime: 'O(N)', expectedSpace: 'O(N)',
      tags: ['arrays', 'stack', 'monotonic-stack'], pattern: 'Monotonic Stack', topics: ['Arrays', 'stack', 'Stack Fundamentals'],
      hints: [
        '**Level 0 — Understand**: `[73, 74, 75, 71, 69, 72]` -> For 73 wait 1 day (74). For 75 wait 3 days (missing larger element implies checking later).',
        '**Level 1 — Brute Force Thinking**: Two nested loops. For each day, look forward until you find a higher temperature. Time O(N^2).',
        '**Level 2 — Bottleneck Recognition**: We repeatedly scan the same decreasing sequences (like 71, 69).',
        '**Level 3 — Pattern Recognition**: Next Greater Element -> Monotonic Stack.',
        '**Level 4 — Algorithmic Direction**: Maintain a stack of indices. Iterate through the array. While the current temperature is greater than the temperature at the index on top of the stack, pop the stack and resolve its answer (`i - popped_index`). Push the current index.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(N).'
      ]
    },
    {
      slug: 'leetcode-150-evaluate-reverse-polish-notation', platform: 'LEETCODE', sourceProblemId: '150',
      title: 'Evaluate Reverse Polish Notation', sourceUrl: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', difficulty: 'MEDIUM',
      statement: 'Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are +, -, *, and /.',
      expectedTime: 'O(N)', expectedSpace: 'O(N)',
      tags: ['stack', 'math', 'strings'], pattern: 'Stack', topics: ['stack', 'Stack Fundamentals'],
      hints: [
        '**Level 0 — Understand**: `["2", "1", "+", "3", "*"]` -> `((2 + 1) * 3) = 9`. Operands come before the operator.',
        '**Level 1 — Brute Force Thinking**: Scan for an operator, apply it to the two previous numbers, replace all three with the result. Time O(N^2).',
        '**Level 2 — Bottleneck Recognition**: Modifying the array continuously is slow. We need a LIFO structure.',
        '**Level 3 — Pattern Recognition**: RPN Evaluation -> Stack.',
        '**Level 4 — Algorithmic Direction**: Iterate through the tokens. If it\'s a number, push to stack. If it\'s an operator, pop two numbers, apply the operator (careful with division truncation), and push the result back.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(N).'
      ]
    },
    // QUEUE
    {
      slug: 'leetcode-933-number-of-recent-calls', platform: 'LEETCODE', sourceProblemId: '933',
      title: 'Number of Recent Calls', sourceUrl: 'https://leetcode.com/problems/number-of-recent-calls/', difficulty: 'EASY',
      statement: 'You have a `RecentCounter` class which counts the number of recent requests within a certain time frame (last 3000 milliseconds).',
      expectedTime: 'O(1) amortized', expectedSpace: 'O(W)',
      tags: ['queue', 'design'], pattern: 'Queue', topics: ['queue', 'Queue Fundamentals'],
      hints: [
        '**Level 0 — Understand**: `ping(t)` returns how many pings occurred between `t - 3000` and `t`.',
        '**Level 1 — Brute Force Thinking**: Store all pings in an array. On every `ping(t)`, iterate through the array and count how many are `>= t - 3000`.',
        '**Level 2 — Bottleneck Recognition**: We don\'t need to keep pings older than `t - 3000`. They will never be counted again.',
        '**Level 3 — Pattern Recognition**: FIFO Sliding Window -> Queue.',
        '**Level 4 — Algorithmic Direction**: Use a Queue. On `ping(t)`, push `t`. While the front of the queue is `< t - 3000`, pop it. Return the size of the queue.',
        '**Level 5 — Complexity Target**: Time O(1) amortized per ping, Space O(W) where W is max pings in a 3000ms window.'
      ]
    },
    {
      slug: 'leetcode-622-design-circular-queue', platform: 'LEETCODE', sourceProblemId: '622',
      title: 'Design Circular Queue', sourceUrl: 'https://leetcode.com/problems/design-circular-queue/', difficulty: 'MEDIUM',
      statement: 'Design your implementation of the circular queue. A circular queue uses a fixed-size array and acts as if connected end-to-end.',
      expectedTime: 'O(1) per operation', expectedSpace: 'O(K)',
      tags: ['queue', 'design', 'arrays'], pattern: 'Queue Design', topics: ['queue', 'Queue Fundamentals', 'Arrays'],
      hints: [
        '**Level 0 — Understand**: Implement a queue of fixed capacity `k`. When reaching the end of the array, wrap around to index 0.',
        '**Level 1 — Brute Force Thinking**: Use an array. Maintain `head` and `tail` pointers. Shift elements manually when full.',
        '**Level 2 — Bottleneck Recognition**: Shifting elements destroys the O(1) performance requirement of a Queue.',
        '**Level 3 — Pattern Recognition**: Modulo Arithmetic / Circular Buffer.',
        '**Level 4 — Algorithmic Direction**: Use an array of size `k`. Maintain `head`, `tail` (or `count`). Increment indices using `(index + 1) % k`. Check `count == k` for full and `count == 0` for empty.',
        '**Level 5 — Complexity Target**: Time O(1) per operation, Space O(K).'
      ]
    },
    // LINKED LIST
    {
      slug: 'leetcode-203-remove-linked-list-elements', platform: 'LEETCODE', sourceProblemId: '203',
      title: 'Remove Linked List Elements', sourceUrl: 'https://leetcode.com/problems/remove-linked-list-elements/', difficulty: 'EASY',
      statement: 'Given the `head` of a linked list and an integer `val`, remove all the nodes of the linked list that has `Node.val == val`, and return the new head.',
      expectedTime: 'O(N)', expectedSpace: 'O(1)',
      tags: ['linked-list'], pattern: 'Linked List Traversal', topics: ['Linked List Fundamentals'],
      hints: [
        '**Level 0 — Understand**: `1->2->6->3->4->5->6`, val=6 -> `1->2->3->4->5`.',
        '**Level 1 — Brute Force Thinking**: Traverse the list, put non-matching values in an array, then build a new list. Time O(N), Space O(N).',
        '**Level 2 — Bottleneck Recognition**: We don\'t need to allocate memory. We can just skip over the nodes that match `val`.',
        '**Level 3 — Pattern Recognition**: In-place Pointer Modification / Dummy Head.',
        '**Level 4 — Algorithmic Direction**: Create a `dummy` node pointing to `head`. Maintain a `curr` pointer starting at `dummy`. If `curr->next->val == val`, skip it via `curr->next = curr->next->next`. Else, advance `curr = curr->next`.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-21-merge-two-sorted-lists', platform: 'LEETCODE', sourceProblemId: '21',
      title: 'Merge Two Sorted Lists', sourceUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/', difficulty: 'EASY',
      statement: 'You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list by splicing together the nodes of the first two lists.',
      expectedTime: 'O(N + M)', expectedSpace: 'O(1)',
      tags: ['linked-list', 'two-pointers'], pattern: 'Linked List Merge', topics: ['Linked List Fundamentals'],
      hints: [
        '**Level 0 — Understand**: `1->2->4` and `1->3->4` -> `1->1->2->3->4->4`.',
        '**Level 1 — Brute Force Thinking**: Extract all values into an array, sort the array, build a new list. Time O((N+M) log(N+M)).',
        '**Level 2 — Bottleneck Recognition**: The inputs are already sorted. We can merge them in one pass.',
        '**Level 3 — Pattern Recognition**: Merge Step of Merge Sort / Two Pointers with Linked Lists.',
        '**Level 4 — Algorithmic Direction**: Use a `dummy` head. Compare `list1->val` and `list2->val`. Attach the smaller node to `curr->next`. Advance the chosen list and `curr`. When one list is exhausted, attach the remainder of the other list.',
        '**Level 5 — Complexity Target**: Time O(N + M), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-19-remove-nth-node-from-end', platform: 'LEETCODE', sourceProblemId: '19',
      title: 'Remove Nth Node From End of List', sourceUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', difficulty: 'MEDIUM',
      statement: 'Given the `head` of a linked list, remove the `n`th node from the end of the list and return its head.',
      expectedTime: 'O(N)', expectedSpace: 'O(1)',
      tags: ['linked-list', 'two-pointers'], pattern: 'Two Pointers', topics: ['Linked List Fundamentals', 'Two Pointers Introduction'],
      hints: [
        '**Level 0 — Understand**: `1->2->3->4->5`, n=2 -> remove 4 (2nd from end). Result: `1->2->3->5`.',
        '**Level 1 — Brute Force Thinking**: Traverse the list to count its length `L`. Traverse again to node `L - n`. Delete it. Time O(N), two passes.',
        '**Level 2 — Bottleneck Recognition**: Two passes is fine, but can we do it in one pass?',
        '**Level 3 — Pattern Recognition**: Fast and Slow Pointers (Delayed Start).',
        '**Level 4 — Algorithmic Direction**: Use a `dummy` node. Move `fast` pointer `n + 1` steps ahead. Then move `fast` and `slow` (from `dummy`) simultaneously until `fast` reaches null. `slow` will be right before the node to delete.',
        '**Level 5 — Complexity Target**: Time O(N) one pass, Space O(1).'
      ]
    },
    {
      slug: 'leetcode-143-reorder-list', platform: 'LEETCODE', sourceProblemId: '143',
      title: 'Reorder List', sourceUrl: 'https://leetcode.com/problems/reorder-list/', difficulty: 'MEDIUM',
      statement: 'You are given the head of a singly linked-list. Reorder it to: `L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...`. You may not modify the values in the list\'s nodes.',
      expectedTime: 'O(N)', expectedSpace: 'O(1)',
      tags: ['linked-list', 'two-pointers'], pattern: 'Linked List + Two Pointers', topics: ['Linked List Fundamentals'],
      hints: [
        '**Level 0 — Understand**: `1->2->3->4` becomes `1->4->2->3`.',
        '**Level 1 — Brute Force Thinking**: Store all nodes in an array. Then use two pointers (left and right) on the array to rebuild the list. Space O(N).',
        '**Level 2 — Bottleneck Recognition**: We must do it in-place using O(1) space.',
        '**Level 3 — Pattern Recognition**: Middle Finding + Reversing + Merging.',
        '**Level 4 — Algorithmic Direction**: 1. Find the middle of the list (fast/slow pointers). 2. Reverse the second half of the list. 3. Merge the two halves alternately.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    // SORTING
    {
      slug: 'leetcode-88-merge-sorted-array', platform: 'LEETCODE', sourceProblemId: '88',
      title: 'Merge Sorted Array', sourceUrl: 'https://leetcode.com/problems/merge-sorted-array/', difficulty: 'EASY',
      statement: 'You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order. Merge `nums2` into `nums1` as one sorted array. `nums1` has a length of `m + n`, with the last `n` elements set to 0.',
      expectedTime: 'O(M + N)', expectedSpace: 'O(1)',
      tags: ['arrays', 'two-pointers', 'sorting'], pattern: 'Two Pointers / Merge', topics: ['Arrays', 'Sorting Fundamentals'],
      hints: [
        '**Level 0 — Understand**: Combine two sorted arrays. Put the result directly inside the first array (which has enough empty space at the end).',
        '**Level 1 — Brute Force Thinking**: Copy elements of `nums2` into the empty spaces of `nums1`. Call `sort(nums1.begin(), nums1.end())`. Time O((M+N) log(M+N)).',
        '**Level 2 — Bottleneck Recognition**: The arrays are already sorted. Sorting again destroys that advantage.',
        '**Level 3 — Pattern Recognition**: Merge from the Back (Two Pointers).',
        '**Level 4 — Algorithmic Direction**: Place `p1` at `m-1` and `p2` at `n-1`. Place a `write` pointer at `m+n-1`. Compare `nums1[p1]` and `nums2[p2]`, put the larger one at `write`, and decrement pointers. If `nums2` remains, copy it over.',
        '**Level 5 — Complexity Target**: Time O(M + N), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-75-sort-colors', platform: 'LEETCODE', sourceProblemId: '75',
      title: 'Sort Colors', sourceUrl: 'https://leetcode.com/problems/sort-colors/', difficulty: 'MEDIUM',
      statement: 'Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red (0), white (1), and blue (2).',
      expectedTime: 'O(N)', expectedSpace: 'O(1)',
      tags: ['arrays', 'two-pointers', 'sorting'], pattern: 'Dutch National Flag', topics: ['Arrays', 'Sorting Fundamentals'],
      hints: [
        '**Level 0 — Understand**: Sort an array containing only 0s, 1s, and 2s in-place.',
        '**Level 1 — Brute Force Thinking**: Use standard `sort()` which takes O(N log N). Or count the number of 0s, 1s, and 2s in one pass, then overwrite the array in a second pass. Time O(N), Space O(1).',
        '**Level 2 — Bottleneck Recognition**: Counting sort is a valid two-pass O(N) solution. Can we do it in one pass?',
        '**Level 3 — Pattern Recognition**: Dutch National Flag Algorithm (Three-Way Partitioning).',
        '**Level 4 — Algorithmic Direction**: Maintain three pointers: `low`, `mid`, `high`. While `mid <= high`, if `nums[mid] == 0`, swap `mid` with `low` and increment both. If 1, just increment `mid`. If 2, swap `mid` with `high` and decrement `high` (do not increment `mid`).',
        '**Level 5 — Complexity Target**: Time O(N) one pass, Space O(1).'
      ]
    },
    {
      slug: 'leetcode-147-insertion-sort-list', platform: 'LEETCODE', sourceProblemId: '147',
      title: 'Insertion Sort List', sourceUrl: 'https://leetcode.com/problems/insertion-sort-list/', difficulty: 'MEDIUM',
      statement: 'Given the head of a singly linked list, sort the list using insertion sort, and return the sorted list\'s head.',
      expectedTime: 'O(N^2)', expectedSpace: 'O(1)',
      tags: ['linked-list', 'sorting'], pattern: 'Insertion Sort / Linked List', topics: ['Linked List Fundamentals', 'Sorting Fundamentals'],
      hints: [
        '**Level 0 — Understand**: Implement insertion sort algorithm directly on a linked list.',
        '**Level 1 — Brute Force Thinking**: Read values to an array, sort array, build new list. But the problem specifically asks to perform Insertion Sort on the linked list.',
        '**Level 2 — Bottleneck Recognition**: Insertion sort requires taking an element and scanning from the beginning to find its correct place.',
        '**Level 3 — Pattern Recognition**: In-place Linked List Traversal / Dummy Head.',
        '**Level 4 — Algorithmic Direction**: Create a `dummy` node. Maintain `curr` on the original list. In a while loop, take `curr`, scan from `dummy` to find where `curr->val` fits, insert it, and advance `curr`.',
        '**Level 5 — Complexity Target**: Time O(N^2), Space O(1).'
      ]
    },
    // RECURSION / BACKTRACKING
    {
      slug: 'leetcode-509-fibonacci-number', platform: 'LEETCODE', sourceProblemId: '509',
      title: 'Fibonacci Number', sourceUrl: 'https://leetcode.com/problems/fibonacci-number/', difficulty: 'EASY',
      statement: 'The Fibonacci numbers form a sequence where `F(n) = F(n-1) + F(n-2)`, for `n > 1`. Given `n`, calculate `F(n)`.',
      expectedTime: 'O(N)', expectedSpace: 'O(1)',
      tags: ['math', 'recursion', 'dp'], pattern: 'Recursion / Dynamic Programming Introduction', topics: ['Recursion Fundamentals', 'Recursion'], // Using 'Recursion' as topic proxy if fundamentals doesn't exist
      hints: [
        '**Level 0 — Understand**: `F(0) = 0`, `F(1) = 1`. Next is the sum of the previous two.',
        '**Level 1 — Brute Force Thinking**: Direct recursion `fib(n) = fib(n-1) + fib(n-2)`. Time O(2^N) because of exponential redundant calculations.',
        '**Level 2 — Bottleneck Recognition**: Recomputing `fib(3)` multiple times is extremely inefficient.',
        '**Level 3 — Pattern Recognition**: Memoization (Top-Down DP) or Tabulation (Bottom-Up DP).',
        '**Level 4 — Algorithmic Direction**: For O(1) space, maintain two variables `prev1` and `prev2`. Update them in a loop from 2 to `n`. `curr = prev1 + prev2`, then shift variables.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-231-power-of-two', platform: 'LEETCODE', sourceProblemId: '231',
      title: 'Power of Two', sourceUrl: 'https://leetcode.com/problems/power-of-two/', difficulty: 'EASY',
      statement: 'Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.',
      expectedTime: 'O(1)', expectedSpace: 'O(1)',
      tags: ['math', 'bit-manipulation', 'recursion'], pattern: 'Recursion / Bitwise', topics: ['Recursion Fundamentals', 'Basic Logic'], // Adjusting proxy topics
      hints: [
        '**Level 0 — Understand**: 1, 2, 4, 8, 16 are powers of two. 6 is not.',
        '**Level 1 — Brute Force Thinking**: While `n > 1` and `n % 2 == 0`, divide by 2. If it ends at 1, it is true. Time O(log N). Recursive solution: `return (n % 2 == 0) && isPowerOfTwo(n / 2)`.',
        '**Level 2 — Bottleneck Recognition**: The division loop is fine, but can we do it instantly?',
        '**Level 3 — Pattern Recognition**: Bit Manipulation.',
        '**Level 4 — Algorithmic Direction**: A power of two in binary has exactly one `1` bit (e.g., `1000`). If you subtract 1, it flips all bits starting from that 1 (`0111`). Thus, `n & (n - 1)` must be 0.',
        '**Level 5 — Complexity Target**: Time O(1), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-78-subsets', platform: 'LEETCODE', sourceProblemId: '78',
      title: 'Subsets', sourceUrl: 'https://leetcode.com/problems/subsets/', difficulty: 'MEDIUM',
      statement: 'Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.',
      expectedTime: 'O(N * 2^N)', expectedSpace: 'O(N * 2^N)',
      tags: ['arrays', 'backtracking'], pattern: 'Backtracking', topics: ['Recursion Fundamentals', 'Backtracking'],
      hints: [
        '**Level 0 — Understand**: `[1,2]` -> `[], [1], [2], [1,2]`.',
        '**Level 1 — Brute Force Thinking**: Iterate through all `2^n` possibilities using bitmasks (where the `i`th bit means include/exclude).',
        '**Level 2 — Bottleneck Recognition**: Generating permutations using loops is hard. Recursion fits perfectly.',
        '**Level 3 — Pattern Recognition**: Backtracking (Include / Exclude pattern).',
        '**Level 4 — Algorithmic Direction**: Create a recursive `backtrack(index, current_list)`. Add `current_list` to results. Then loop `i` from `index` to `n-1`, append `nums[i]`, recurse on `i + 1`, and pop `nums[i]` (backtrack).',
        '**Level 5 — Complexity Target**: Time O(N * 2^N) to generate all subsets. Space O(N * 2^N) to store them.'
      ]
    },
    {
      slug: 'leetcode-46-permutations', platform: 'LEETCODE', sourceProblemId: '46',
      title: 'Permutations', sourceUrl: 'https://leetcode.com/problems/permutations/', difficulty: 'MEDIUM',
      statement: 'Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.',
      expectedTime: 'O(N * N!)', expectedSpace: 'O(N * N!)',
      tags: ['arrays', 'backtracking'], pattern: 'Backtracking', topics: ['Recursion Fundamentals', 'Backtracking'],
      hints: [
        '**Level 0 — Understand**: `[1,2,3]` -> `[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]`.',
        '**Level 1 — Brute Force Thinking**: Generate all combinations and filter out the invalid ones. Very slow.',
        '**Level 2 — Bottleneck Recognition**: We need to dynamically build valid permutations element by element.',
        '**Level 3 — Pattern Recognition**: Backtracking with a "Visited" state or In-place Swapping.',
        '**Level 4 — Algorithmic Direction**: Use `backtrack(start)`. If `start == nums.length`, add a copy of `nums` to results. Otherwise, loop `i` from `start` to `nums.length - 1`, swap `nums[start]` and `nums[i]`, recurse on `start + 1`, and swap back.',
        '**Level 5 — Complexity Target**: Time O(N * N!) because there are N! permutations and each takes O(N) to copy. Space O(N * N!).'
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

  console.log(`✅ Seed Phase 5B-2 (Chunk 1) complete.`);
}

seedPhase5B2().catch(console.error).finally(() => prisma.$disconnect());
