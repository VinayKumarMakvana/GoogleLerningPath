import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedPhase5B1() {
  console.log('Starting Phase 5B-1 Curation Seed...');

  // 1. Ensure all patterns exist
  const patternsToCreate = [
    { name: 'Basic Decision Making', slug: 'basic-decision-making', description: 'Translating simple logical conditions into conditionals.' },
    { name: 'String Traversal', slug: 'string-traversal', description: 'Iterating character by character through a string.' },
    { name: 'String Manipulation', slug: 'string-manipulation', description: 'Transforming or manipulating strings.' },
    { name: 'String Comparison', slug: 'string-comparison', description: 'Comparing strings lexically.' },
    { name: 'Frequency / Character Counting', slug: 'frequency-counting', description: 'Counting frequencies of characters in a string.' },
    { name: 'Set Membership', slug: 'set-membership', description: 'Using a Set to determine existence.' },
    { name: 'Array Traversal', slug: 'array-traversal', description: 'Iterating through elements of an array.' },
    { name: 'Array Mapping', slug: 'array-mapping', description: 'Mapping elements from one array to another.' },
    { name: 'Array Transformation', slug: 'array-transformation', description: 'Transforming elements in an array.' },
    { name: 'Array Filtering', slug: 'array-filtering', description: 'Filtering elements based on a condition.' },
    { name: 'Prefix Accumulation', slug: 'prefix-accumulation', description: 'Accumulating a running total or state.' },
    { name: 'Two Pointers', slug: 'two-pointers', description: 'Using two indices to traverse an array or string.' },
    { name: 'Frequency Map', slug: 'frequency-map', description: 'Using a Hash Map to store counts.' },
    { name: 'Hash Map Lookup', slug: 'hash-map-lookup', description: 'Using a Hash Map for O(1) lookups.' },
    { name: 'Bidirectional Mapping', slug: 'bidirectional-mapping', description: 'Ensuring 1-to-1 mappings between two structures.' },
    { name: 'Prefix Sum', slug: 'prefix-sum', description: 'Precomputing contiguous range sums.' },
    { name: 'Binary Search', slug: 'binary-search', description: 'Searching a sorted space in O(log n).' },
    { name: 'Stack', slug: 'stack', description: 'Using LIFO ordering for matching or state.' },
    { name: 'Data Structure Design', slug: 'data-structure-design', description: 'Simulating one data structure with another.' },
    { name: 'Pointer Manipulation', slug: 'pointer-manipulation', description: 'Modifying pointers to alter linked structures.' },
    { name: 'Fast and Slow Pointers', slug: 'fast-and-slow-pointers', description: 'Using pointers moving at different speeds.' }
  ];

  const patternMap: Record<string, string> = {};
  for (const p of patternsToCreate) {
    const pattern = await prisma.dsaPattern.upsert({
      where: { slug: p.slug },
      update: { name: p.name, description: p.description },
      create: p
    });
    patternMap[p.name] = pattern.id;
  }
  
  // Also support canonical legacy names from Phase 5A if needed, though they should be covered above.
  
  console.log('Patterns seeded.');

  // 2. Fetch required Topics to link them up
  const topics = await prisma.topic.findMany();
  const getTopicIds = (titles: string[]) => {
    return topics.filter(t => titles.includes(t.title)).map(t => t.id);
  };

  // 3. Define the Problems
  const problemsData = [
    // GROUP A — C++ / IMPLEMENTATION / BASIC LOGIC
    {
      slug: 'codeforces-4a-watermelon',
      platform: 'CODEFORCES',
      sourceProblemId: '4A',
      title: 'Watermelon',
      sourceUrl: 'https://codeforces.com/problemset/problem/4/A',
      difficulty: 'EASY',
      statement: 'Determine if a given weight `w` can be divided into two parts, where both parts are strictly even integers and greater than 0.',
      expectedTime: 'O(1)',
      expectedSpace: 'O(1)',
      tags: ['math', 'implementation'],
      pattern: 'Basic Decision Making',
      topics: ['Complexity Fundamentals'],
      hints: [
        '**Level 0 — Understand**: The watermelon weighs `w` kilos. Can it be divided into two even parts? E.g., 8 -> 4 and 4 (Yes). 5 -> No.',
        '**Level 1 — Brute Force Thinking**: We could check all pairs of numbers `(x, y)` such that `x + y = w`. If both `x` and `y` are even, return YES.',
        '**Level 2 — Bottleneck Recognition**: Iteration is not necessary. We just need to evaluate a mathematical condition.',
        '**Level 3 — Pattern Recognition**: Basic Decision Making using modulo operator.',
        '**Level 4 — Algorithmic Direction**: If `w` is even and strictly greater than 2, it can always be split into two even numbers.',
        '**Level 5 — Complexity Target**: Time O(1), Space O(1). Output YES or NO.'
      ]
    },
    {
      slug: 'codeforces-71a-way-too-long-words',
      platform: 'CODEFORCES',
      sourceProblemId: '71A',
      title: 'Way Too Long Words',
      sourceUrl: 'https://codeforces.com/problemset/problem/71/A',
      difficulty: 'EASY',
      statement: 'Given a word, if its length is strictly greater than 10 characters, abbreviate it by writing its first character, the number of characters between the first and last, and its last character. Otherwise, return the word unchanged.',
      expectedTime: 'O(N) per word',
      expectedSpace: 'O(1)',
      tags: ['strings', 'string-manipulation'],
      pattern: 'String Traversal',
      topics: ['Strings', 'String Manipulation'],
      hints: [
        '**Level 0 — Understand**: Input "localization" (length 12) becomes "l10n".',
        '**Level 1 — Brute Force Thinking**: Check the string length. If `> 10`, build a new string by accessing the first and last character and taking `length - 2`.',
        '**Level 2 — Bottleneck Recognition**: No real bottleneck here; the logic is straightforward.',
        '**Level 3 — Pattern Recognition**: String Manipulation and concatenation.',
        '**Level 4 — Algorithmic Direction**: Check `s.length()`. If `> 10`, output `s[0] + to_string(s.length() - 2) + s[s.length() - 1]`.',
        '**Level 5 — Complexity Target**: Time O(1) for abbreviation, Space O(1).'
      ]
    },
    {
      slug: 'codeforces-281a-word-capitalization',
      platform: 'CODEFORCES',
      sourceProblemId: '281A',
      title: 'Word Capitalization',
      sourceUrl: 'https://codeforces.com/problemset/problem/281/A',
      difficulty: 'EASY',
      statement: 'Capitalize the first letter of a given string. If it is already capitalized, do nothing.',
      expectedTime: 'O(1) transformation',
      expectedSpace: 'O(1)',
      tags: ['strings', 'string-manipulation'],
      pattern: 'String Manipulation',
      topics: ['Strings', 'String Manipulation'],
      hints: [
        '**Level 0 — Understand**: Input "apple" -> "Apple". Input "ApPLe" -> "ApPLe".',
        '**Level 1 — Brute Force Thinking**: Access the first character and change it to uppercase if it is lowercase.',
        '**Level 2 — Bottleneck Recognition**: Straightforward operation on `s[0]`.',
        '**Level 3 — Pattern Recognition**: String Manipulation / ASCII offset.',
        '**Level 4 — Algorithmic Direction**: In C++, use `toupper(s[0])` to safely convert it without needing manual ASCII math.',
        '**Level 5 — Complexity Target**: Time O(1), Space O(1).'
      ]
    },
    {
      slug: 'codeforces-112a-petya-and-strings',
      platform: 'CODEFORCES',
      sourceProblemId: '112A',
      title: 'Petya and Strings',
      sourceUrl: 'https://codeforces.com/problemset/problem/112/A',
      difficulty: 'EASY',
      statement: 'Compare two strings lexicographically, ignoring case. Output -1 if the first is smaller, 1 if larger, and 0 if they are equal.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(1)',
      tags: ['strings', 'string-comparison'],
      pattern: 'String Comparison',
      topics: ['Strings', 'String Manipulation'],
      hints: [
        '**Level 0 — Understand**: Compare "aaaa" and "aaaA" -> they are equal (0) ignoring case.',
        '**Level 1 — Brute Force Thinking**: Traverse both strings simultaneously. If characters differ regardless of case, stop and return the result.',
        '**Level 2 — Bottleneck Recognition**: Need a unified case to compare characters properly.',
        '**Level 3 — Pattern Recognition**: String Normalization + Comparison.',
        '**Level 4 — Algorithmic Direction**: Convert both strings entirely to lowercase, then use standard `<` or `>` operators, or iterate and compare character by character.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1) if transformed in place.'
      ]
    },
    {
      slug: 'codeforces-59a-word',
      platform: 'CODEFORCES',
      sourceProblemId: '59A',
      title: 'Word',
      sourceUrl: 'https://codeforces.com/problemset/problem/59/A',
      difficulty: 'EASY',
      statement: 'Given a word, convert it completely to uppercase if it contains strictly more uppercase letters than lowercase letters. Otherwise, convert it entirely to lowercase.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(1)',
      tags: ['strings', 'string-manipulation'],
      pattern: 'Frequency / Character Counting',
      topics: ['Strings', 'String Manipulation'],
      hints: [
        '**Level 0 — Understand**: Count uppercase vs lowercase. Apply the dominant case. In a tie, favor lowercase.',
        '**Level 1 — Brute Force Thinking**: Loop once to count cases. Loop a second time to convert all characters to the target case.',
        '**Level 2 — Bottleneck Recognition**: The double pass is completely fine and optimal O(N) time.',
        '**Level 3 — Pattern Recognition**: Frequency Counting + Transformation pass.',
        '**Level 4 — Algorithmic Direction**: Maintain `upper_count` and `lower_count`. Use `<cctype>` functions like `isupper` and `tolower`.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    {
      slug: 'codeforces-236a-boy-or-girl',
      platform: 'CODEFORCES',
      sourceProblemId: '236A',
      title: 'Boy or Girl',
      sourceUrl: 'https://codeforces.com/problemset/problem/236/A',
      difficulty: 'EASY',
      statement: 'Given a username string, count the number of DISTINCT characters. If the count is odd, output "IGNORE HIM!". If it is even, output "CHAT WITH HER!".',
      expectedTime: 'O(N)',
      expectedSpace: 'O(1) auxiliary',
      tags: ['strings', 'hash-set'],
      pattern: 'Set Membership',
      topics: ['Strings', 'Basic Hashing', 'unordered_set'],
      hints: [
        '**Level 0 — Understand**: Count unique characters only. Input "wjmzbmr" -> 6 distinct characters -> Even -> "CHAT WITH HER!".',
        '**Level 1 — Brute Force Thinking**: For each character, check if we have seen it before by scanning the string again. O(N^2).',
        '**Level 2 — Bottleneck Recognition**: The nested loop to check for existence is slow.',
        '**Level 3 — Pattern Recognition**: Need fast lookup and uniqueness guarantee -> Set.',
        '**Level 4 — Algorithmic Direction**: Insert all characters into an `unordered_set<char>`, then check its `.size()`. Alternatively, sort the string and count unique adjacent elements.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1) since alphabet is limited to 26 characters.'
      ]
    },
    // GROUP B — ARRAYS / BASIC ITERATION
    {
      slug: 'leetcode-1480-running-sum-of-1d-array',
      platform: 'LEETCODE',
      sourceProblemId: '1480',
      title: 'Running Sum of 1d Array',
      sourceUrl: 'https://leetcode.com/problems/running-sum-of-1d-array/',
      difficulty: 'EASY',
      statement: 'Given an array `nums`. We define a running sum of an array as `runningSum[i] = sum(nums[0]...nums[i])`. Return the running sum of `nums`.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(1) in-place, or O(N)',
      tags: ['arrays', 'prefix-sum'],
      pattern: 'Prefix Accumulation',
      topics: ['Arrays', 'Array Traversal'],
      hints: [
        '**Level 0 — Understand**: `[1, 2, 3, 4]` -> `[1, 3, 6, 10]`. Each element includes the sum of all previous elements.',
        '**Level 1 — Brute Force Thinking**: For each element `i`, loop from `0` to `i` and sum them up. O(N^2) time.',
        '**Level 2 — Bottleneck Recognition**: Recomputing the sum of previous elements is redundant. We already computed it for `i-1`.',
        '**Level 3 — Pattern Recognition**: Prefix Accumulation (carrying a running state).',
        '**Level 4 — Algorithmic Direction**: `nums[i] = nums[i] + nums[i-1]`. Modify the array in-place starting from index 1.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1) if modified in-place.'
      ]
    },
    {
      slug: 'leetcode-1920-build-array-from-permutation',
      platform: 'LEETCODE',
      sourceProblemId: '1920',
      title: 'Build Array from Permutation',
      sourceUrl: 'https://leetcode.com/problems/build-array-from-permutation/',
      difficulty: 'EASY',
      statement: 'Given a zero-based permutation `nums`, build an array `ans` of the same length where `ans[i] = nums[nums[i]]`.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(N)',
      tags: ['arrays', 'array-transformation'],
      pattern: 'Array Mapping',
      topics: ['Arrays', 'Array Manipulation'],
      hints: [
        '**Level 0 — Understand**: `nums = [0,2,1,5,3,4]`. For `i=1`, `nums[1]` is `2`. So `ans[1] = nums[2]` which is `1`.',
        '**Level 1 — Brute Force Thinking**: Create a new array. Loop through `nums`, and directly assign `ans[i] = nums[nums[i]]`.',
        '**Level 2 — Bottleneck Recognition**: This approach requires O(N) extra space. Can we do it in O(1)?',
        '**Level 3 — Pattern Recognition**: Array Mapping / In-place state encoding.',
        '**Level 4 — Algorithmic Direction**: (Optional O(1) trick): Encode two numbers in one using `nums[i] = nums[i] + (nums[nums[i]] % n) * n`. Then decode by dividing by `n`. If O(N) space is fine, the brute force is perfectly acceptable.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(N) standard, or O(1) advanced.'
      ]
    },
    {
      slug: 'leetcode-1470-shuffle-the-array',
      platform: 'LEETCODE',
      sourceProblemId: '1470',
      title: 'Shuffle the Array',
      sourceUrl: 'https://leetcode.com/problems/shuffle-the-array/',
      difficulty: 'EASY',
      statement: 'Given the array `nums` consisting of `2n` elements in the form `[x1,x2,...,xn,y1,y2,...,yn]`. Return the array in the form `[x1,y1,x2,y2,...,xn,yn]`.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(N)',
      tags: ['arrays', 'array-transformation'],
      pattern: 'Array Transformation',
      topics: ['Arrays', 'Array Manipulation'],
      hints: [
        '**Level 0 — Understand**: Break array in half. Interleave elements from the first half and second half.',
        '**Level 1 — Brute Force Thinking**: Create an answer array of size `2n`. Loop `i` from `0` to `n-1`. Assign `ans[2*i] = nums[i]` and `ans[2*i+1] = nums[i+n]`.',
        '**Level 2 — Bottleneck Recognition**: No bottleneck. The math mapping is direct and O(N).',
        '**Level 3 — Pattern Recognition**: Two-pointer read / Mathematical Array Construction.',
        '**Level 4 — Algorithmic Direction**: Standard implementation requires a new array and placing elements directly into their calculated target indices.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(N).'
      ]
    },
    {
      slug: 'leetcode-1295-find-numbers-even-digits',
      platform: 'LEETCODE',
      sourceProblemId: '1295',
      title: 'Find Numbers with Even Number of Digits',
      sourceUrl: 'https://leetcode.com/problems/find-numbers-with-even-number-of-digits/',
      difficulty: 'EASY',
      statement: 'Given an array `nums` of integers, return how many of them contain an even number of digits.',
      expectedTime: 'O(N * log10(MAX_NUM))',
      expectedSpace: 'O(1)',
      tags: ['arrays', 'math'],
      pattern: 'Array Filtering',
      topics: ['Arrays', 'Array Traversal'],
      hints: [
        '**Level 0 — Understand**: `12` has 2 digits (even). `345` has 3 digits (odd). Count the evens.',
        '**Level 1 — Brute Force Thinking**: Convert each number to a string and check if `length % 2 == 0`.',
        '**Level 2 — Bottleneck Recognition**: Converting to string has a slight overhead. Can we do it mathematically?',
        '**Level 3 — Pattern Recognition**: Integer digit counting / Array Filtering.',
        '**Level 4 — Algorithmic Direction**: Divide by 10 in a loop until the number is 0 to count digits, or use `floor(log10(n)) + 1`.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    // GROUP C — STRINGS
    {
      slug: 'valid-palindrome',
      platform: 'LEETCODE',
      sourceProblemId: '125',
      title: 'Valid Palindrome',
      sourceUrl: 'https://leetcode.com/problems/valid-palindrome/',
      difficulty: 'EASY',
      statement: 'Given a string `s`, return true if it is a palindrome, considering only alphanumeric characters and ignoring case.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(1)',
      tags: ['strings', 'two-pointers'],
      pattern: 'Two Pointers',
      topics: ['Strings', 'Two Pointers Introduction'],
      hints: [
        '**Level 0 — Understand**: Strip out spaces and punctuation. Lowercase it. Does it read the same forward and backward?',
        '**Level 1 — Brute Force Thinking**: Build a new string containing only alphanumeric lowercase characters. Create a reversed copy. Compare them. O(N) time, O(N) space.',
        '**Level 2 — Bottleneck Recognition**: We don\'t need to allocate extra memory for a new string.',
        '**Level 3 — Pattern Recognition**: Opposite-direction traversal -> Two Pointers.',
        '**Level 4 — Algorithmic Direction**: Place `left` at 0, `right` at `s.length() - 1`. If `s[left]` isn\'t alphanumeric, `left++`. If `s[right]` isn\'t, `right--`. Else, compare lowercase versions and move both inward.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-344-reverse-string',
      platform: 'LEETCODE',
      sourceProblemId: '344',
      title: 'Reverse String',
      sourceUrl: 'https://leetcode.com/problems/reverse-string/',
      difficulty: 'EASY',
      statement: 'Write a function that reverses a string. The input string is given as an array of characters `s`. You must do this by modifying the input array in-place with O(1) extra memory.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(1)',
      tags: ['strings', 'two-pointers'],
      pattern: 'Two Pointers',
      topics: ['Strings', 'Two Pointers Introduction'],
      hints: [
        '**Level 0 — Understand**: `["h","e","l","l","o"]` becomes `["o","l","l","e","h"]`.',
        '**Level 1 — Brute Force Thinking**: Create a new array and push characters from the end of the original array to the new one. But the problem forbids O(N) extra space.',
        '**Level 2 — Bottleneck Recognition**: We need an in-place swap.',
        '**Level 3 — Pattern Recognition**: Two Pointers moving towards the center.',
        '**Level 4 — Algorithmic Direction**: Maintain `left` and `right`. Swap `s[left]` with `s[right]`, then `left++` and `right--` until they meet.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-387-first-unique-character',
      platform: 'LEETCODE',
      sourceProblemId: '387',
      title: 'First Unique Character in a String',
      sourceUrl: 'https://leetcode.com/problems/first-unique-character-in-a-string/',
      difficulty: 'EASY',
      statement: 'Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return -1.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(1) auxiliary',
      tags: ['strings', 'hash-map'],
      pattern: 'Frequency Map',
      topics: ['Strings', 'Basic Hashing', 'unordered_map'],
      hints: [
        '**Level 0 — Understand**: Input "leetcode", \'l\' appears once and is first. Return 0. Input "loveleetcode", \'v\' is first unique.',
        '**Level 1 — Brute Force Thinking**: For each character, scan the whole string to see if it appears again. O(N^2).',
        '**Level 2 — Bottleneck Recognition**: Repeated scanning to count occurrences is too slow.',
        '**Level 3 — Pattern Recognition**: Frequency Counting / Hash Map.',
        '**Level 4 — Algorithmic Direction**: Make a first pass to store counts of all characters in a hash map (or array of size 26). Make a second pass over the string; the first char with count == 1 is the answer.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1) (size 26 array is constant space).'
      ]
    },
    {
      slug: 'leetcode-242-valid-anagram',
      platform: 'LEETCODE',
      sourceProblemId: '242',
      title: 'Valid Anagram',
      sourceUrl: 'https://leetcode.com/problems/valid-anagram/',
      difficulty: 'EASY',
      statement: 'Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(1) auxiliary',
      tags: ['strings', 'hash-map'],
      pattern: 'Frequency Map',
      topics: ['Strings', 'Basic Hashing', 'unordered_map'],
      hints: [
        '**Level 0 — Understand**: An anagram contains exactly the same characters with the same frequencies.',
        '**Level 1 — Brute Force Thinking**: Sort both strings and compare them. Time complexity: O(N log N).',
        '**Level 2 — Bottleneck Recognition**: Sorting is slightly heavier than necessary.',
        '**Level 3 — Pattern Recognition**: Frequency Map.',
        '**Level 4 — Algorithmic Direction**: Use an array of size 26 or a hash map. Iterate over `s` to increment character counts, and over `t` to decrement them. If all counts are zero at the end, they are anagrams.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1) (26 letters).'
      ]
    },
    {
      slug: 'leetcode-205-isomorphic-strings',
      platform: 'LEETCODE',
      sourceProblemId: '205',
      title: 'Isomorphic Strings',
      sourceUrl: 'https://leetcode.com/problems/isomorphic-strings/',
      difficulty: 'EASY',
      statement: 'Given two strings `s` and `t`, determine if they are isomorphic (characters in `s` can be replaced to get `t`). No two characters may map to the same character.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(1) auxiliary',
      tags: ['strings', 'hash-map'],
      pattern: 'Bidirectional Mapping',
      topics: ['Strings', 'Basic Hashing', 'unordered_map'],
      hints: [
        '**Level 0 — Understand**: "egg" and "add" map e->a, g->d. Valid. "foo" and "bar" map f->b, o->a, o->r. Invalid (o cannot map to two things).',
        '**Level 1 — Brute Force Thinking**: Check mappings as you go. If `s[i]` maps to something new, assign it. If it maps to something old, ensure it matches.',
        '**Level 2 — Bottleneck Recognition**: We must ensure both "s to t" and "t to s" mappings are unique.',
        '**Level 3 — Pattern Recognition**: Hash Map / Bidirectional Mapping.',
        '**Level 4 — Algorithmic Direction**: Maintain two maps: `mapS2T` and `mapT2S`. At each index, if the mapping exists and doesn\'t match the current character, return false.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1) (ASCII character set limit).'
      ]
    },
    // GROUP D — HASHING / LOOKUP
    {
      slug: 'two-sum',
      platform: 'LEETCODE',
      sourceProblemId: '1',
      title: 'Two Sum',
      sourceUrl: 'https://leetcode.com/problems/two-sum/',
      difficulty: 'EASY',
      statement: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(N)',
      tags: ['arrays', 'hash-map'],
      pattern: 'Hash Map Lookup',
      topics: ['Arrays', 'Basic Hashing', 'unordered_map'],
      hints: [
        '**Level 0 — Understand**: Find two elements that sum to `target`. Return their indices.',
        '**Level 1 — Brute Force Thinking**: A nested loop checking every pair `i` and `j` where `nums[i] + nums[j] == target`. Time: O(N^2).',
        '**Level 2 — Bottleneck Recognition**: We repeatedly search the array for the complement (`target - nums[i]`).',
        '**Level 3 — Pattern Recognition**: Fast lookup -> Hash Map.',
        '**Level 4 — Algorithmic Direction**: As you iterate, store `{value: index}` in a hash map. Before storing, check if the complement `target - nums[i]` already exists in the map.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(N).'
      ]
    },
    {
      slug: 'leetcode-217-contains-duplicate',
      platform: 'LEETCODE',
      sourceProblemId: '217',
      title: 'Contains Duplicate',
      sourceUrl: 'https://leetcode.com/problems/contains-duplicate/',
      difficulty: 'EASY',
      statement: 'Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(N)',
      tags: ['arrays', 'hash-set'],
      pattern: 'Set Membership',
      topics: ['Arrays', 'Basic Hashing', 'unordered_set'],
      hints: [
        '**Level 0 — Understand**: Are all numbers unique?',
        '**Level 1 — Brute Force Thinking**: Compare every element with every other element (O(N^2)). Or sort the array and check adjacent elements (O(N log N)).',
        '**Level 2 — Bottleneck Recognition**: Sorting is good (O(1) space), but we can achieve O(N) time if we use extra memory.',
        '**Level 3 — Pattern Recognition**: Uniqueness check -> Hash Set.',
        '**Level 4 — Algorithmic Direction**: Insert elements into an `unordered_set`. If `insert()` fails (element exists), return true.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(N).'
      ]
    },
    {
      slug: 'leetcode-349-intersection-of-two-arrays',
      platform: 'LEETCODE',
      sourceProblemId: '349',
      title: 'Intersection of Two Arrays',
      sourceUrl: 'https://leetcode.com/problems/intersection-of-two-arrays/',
      difficulty: 'EASY',
      statement: 'Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must be unique.',
      expectedTime: 'O(N + M)',
      expectedSpace: 'O(N)',
      tags: ['arrays', 'hash-set'],
      pattern: 'Set Membership',
      topics: ['Arrays', 'Basic Hashing', 'unordered_set'],
      hints: [
        '**Level 0 — Understand**: Find which elements exist in BOTH arrays. Return them without duplicates.',
        '**Level 1 — Brute Force Thinking**: For every element in `nums1`, search for it in `nums2`. Store in a set to avoid duplicates. Time: O(N * M).',
        '**Level 2 — Bottleneck Recognition**: Linear search in `nums2` is slow.',
        '**Level 3 — Pattern Recognition**: Fast lookup -> Hash Set.',
        '**Level 4 — Algorithmic Direction**: Convert `nums1` to a hash set. Iterate through `nums2`, and if the element exists in the set, add it to the result and remove it from the set (to avoid duplicates).',
        '**Level 5 — Complexity Target**: Time O(N + M), Space O(N).'
      ]
    },
    // GROUP E — TWO POINTERS
    {
      slug: 'leetcode-167-two-sum-ii',
      platform: 'LEETCODE',
      sourceProblemId: '167',
      title: 'Two Sum II - Input Array Is Sorted',
      sourceUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
      difficulty: 'MEDIUM',
      statement: 'Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(1)',
      tags: ['arrays', 'two-pointers', 'binary-search'],
      pattern: 'Two Pointers',
      topics: ['Arrays', 'Two Pointers Introduction'],
      hints: [
        '**Level 0 — Understand**: Like Two Sum, but the array is sorted and you must use O(1) space. Return 1-based indices.',
        '**Level 1 — Brute Force Thinking**: Use the Hash Map solution from Two Sum. But that takes O(N) space, violating the O(1) requirement.',
        '**Level 2 — Bottleneck Recognition**: We are ignoring the fact that the array is already sorted.',
        '**Level 3 — Pattern Recognition**: Sorted array pair targeting -> Opposite Direction Two Pointers.',
        '**Level 4 — Algorithmic Direction**: Start `left` at 0 and `right` at end. If `sum == target`, return. If `sum < target`, `left++` (we need a bigger number). If `sum > target`, `right--` (we need a smaller number).',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-283-move-zeroes',
      platform: 'LEETCODE',
      sourceProblemId: '283',
      title: 'Move Zeroes',
      sourceUrl: 'https://leetcode.com/problems/move-zeroes/',
      difficulty: 'EASY',
      statement: 'Given an integer array `nums`, move all 0\'s to the end of it while maintaining the relative order of the non-zero elements. Must be in-place.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(1)',
      tags: ['arrays', 'two-pointers'],
      pattern: 'Two Pointers',
      topics: ['Arrays', 'Two Pointers Introduction', 'Array Manipulation'],
      hints: [
        '**Level 0 — Understand**: `[0,1,0,3,12]` becomes `[1,3,12,0,0]`.',
        '**Level 1 — Brute Force Thinking**: Create a new array. Iterate to push non-zeros, then pad with zeros. But it must be in-place.',
        '**Level 2 — Bottleneck Recognition**: We need to shift elements leftwards overwriting the zeroes.',
        '**Level 3 — Pattern Recognition**: Slow and Fast Pointer (Write Pointer).',
        '**Level 4 — Algorithmic Direction**: Maintain a `write_index` starting at 0. Iterate through array. If `nums[i] != 0`, swap `nums[i]` and `nums[write_index]`, then increment `write_index`.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-26-remove-duplicates-sorted-array',
      platform: 'LEETCODE',
      sourceProblemId: '26',
      title: 'Remove Duplicates from Sorted Array',
      sourceUrl: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/',
      difficulty: 'EASY',
      statement: 'Given a sorted array `nums`, remove the duplicates in-place such that each element appears only once and returns the new length.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(1)',
      tags: ['arrays', 'two-pointers'],
      pattern: 'Two Pointers',
      topics: ['Arrays', 'Two Pointers Introduction', 'Array Manipulation'],
      hints: [
        '**Level 0 — Understand**: Since it\'s sorted, duplicates are adjacent. Modify the array so the first `k` elements are unique.',
        '**Level 1 — Brute Force Thinking**: Use a hash set to track seen elements. But this takes extra space.',
        '**Level 2 — Bottleneck Recognition**: The array is already sorted, so we only need to compare against the previous element.',
        '**Level 3 — Pattern Recognition**: Slow and Fast Pointer (Write Pointer).',
        '**Level 4 — Algorithmic Direction**: Maintain `write_index = 1`. Iterate `i` from 1. If `nums[i] != nums[i-1]`, we found a new unique element. Place it at `nums[write_index]` and increment `write_index`.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    // GROUP F — PREFIX SUM
    {
      slug: 'leetcode-303-range-sum-query-immutable',
      platform: 'LEETCODE',
      sourceProblemId: '303',
      title: 'Range Sum Query - Immutable',
      sourceUrl: 'https://leetcode.com/problems/range-sum-query-immutable/',
      difficulty: 'EASY',
      statement: 'Given an integer array `nums`, handle multiple queries of the form: calculate the sum of the elements of `nums` between indices `left` and `right` inclusive.',
      expectedTime: 'O(1) per query',
      expectedSpace: 'O(N)',
      tags: ['arrays', 'prefix-sum'],
      pattern: 'Prefix Sum',
      topics: ['Arrays', 'Prefix Sum Introduction'],
      hints: [
        '**Level 0 — Understand**: You will be asked `sumRange(i, j)` thousands of times on the same unchanging array.',
        '**Level 1 — Brute Force Thinking**: For every query, loop from `left` to `right` and calculate the sum. Time: O(N) per query.',
        '**Level 2 — Bottleneck Recognition**: The array doesn\'t change (immutable), so looping repeatedly is redundant computation.',
        '**Level 3 — Pattern Recognition**: Prefix Sum.',
        '**Level 4 — Algorithmic Direction**: Precompute `prefix[i] = sum(0 to i)`. Then `sumRange(left, right)` is simply `prefix[right] - prefix[left - 1]`.',
        '**Level 5 — Complexity Target**: Time O(N) initialization, O(1) per query. Space O(N).'
      ]
    },
    {
      slug: 'leetcode-724-find-pivot-index',
      platform: 'LEETCODE',
      sourceProblemId: '724',
      title: 'Find Pivot Index',
      sourceUrl: 'https://leetcode.com/problems/find-pivot-index/',
      difficulty: 'EASY',
      statement: 'Given an array of integers `nums`, calculate the pivot index of this array (where sum of numbers strictly to the left equals sum of numbers strictly to the right).',
      expectedTime: 'O(N)',
      expectedSpace: 'O(1)',
      tags: ['arrays', 'prefix-sum'],
      pattern: 'Prefix Sum',
      topics: ['Arrays', 'Prefix Sum Introduction'],
      hints: [
        '**Level 0 — Understand**: Find an index `i` such that `sum(0 to i-1) == sum(i+1 to end)`.',
        '**Level 1 — Brute Force Thinking**: For every index `i`, loop to sum the left side, loop to sum the right side, and compare. Time: O(N^2).',
        '**Level 2 — Bottleneck Recognition**: The sum of the left and right sides can be derived mathematically if we know the total sum of the array.',
        '**Level 3 — Pattern Recognition**: Prefix Sum / Running Sum.',
        '**Level 4 — Algorithmic Direction**: First pass: calculate `total_sum`. Second pass: maintain `left_sum`. `right_sum` is `total_sum - left_sum - nums[i]`. If `left_sum == right_sum`, return `i`.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    // GROUP G — BINARY SEARCH INTRODUCTION
    {
      slug: 'leetcode-704-binary-search',
      platform: 'LEETCODE',
      sourceProblemId: '704',
      title: 'Binary Search',
      sourceUrl: 'https://leetcode.com/problems/binary-search/',
      difficulty: 'EASY',
      statement: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return -1.',
      expectedTime: 'O(log N)',
      expectedSpace: 'O(1)',
      tags: ['arrays', 'binary-search'],
      pattern: 'Binary Search',
      topics: ['Arrays', 'Binary Search Introduction'],
      hints: [
        '**Level 0 — Understand**: Find a number in a sorted array as fast as possible.',
        '**Level 1 — Brute Force Thinking**: Linear scan. Loop from start to end. Time O(N).',
        '**Level 2 — Bottleneck Recognition**: The array is sorted. We shouldn\'t need to look at every element.',
        '**Level 3 — Pattern Recognition**: Binary Search.',
        '**Level 4 — Algorithmic Direction**: `left = 0`, `right = n - 1`. While `left <= right`, find `mid`. If `nums[mid] == target`, return. If `nums[mid] < target`, discard left half. Else, discard right half.',
        '**Level 5 — Complexity Target**: Time O(log N), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-35-search-insert-position',
      platform: 'LEETCODE',
      sourceProblemId: '35',
      title: 'Search Insert Position',
      sourceUrl: 'https://leetcode.com/problems/search-insert-position/',
      difficulty: 'EASY',
      statement: 'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.',
      expectedTime: 'O(log N)',
      expectedSpace: 'O(1)',
      tags: ['arrays', 'binary-search'],
      pattern: 'Binary Search',
      topics: ['Arrays', 'Binary Search Introduction'],
      hints: [
        '**Level 0 — Understand**: If found, return index. If not found, return where it belongs to keep the array sorted.',
        '**Level 1 — Brute Force Thinking**: Loop through array. The first index where `nums[i] >= target` is the answer. Time O(N).',
        '**Level 2 — Bottleneck Recognition**: Array is sorted. Linear scan is too slow. Must use O(log N).',
        '**Level 3 — Pattern Recognition**: Binary Search.',
        '**Level 4 — Algorithmic Direction**: Standard binary search. If loop finishes without finding the target, `left` will naturally rest at the correct insertion index.',
        '**Level 5 — Complexity Target**: Time O(log N), Space O(1).'
      ]
    },
    // GROUP H — STACK / QUEUE FOUNDATIONS
    {
      slug: 'leetcode-20-valid-parentheses',
      platform: 'LEETCODE',
      sourceProblemId: '20',
      title: 'Valid Parentheses',
      sourceUrl: 'https://leetcode.com/problems/valid-parentheses/',
      difficulty: 'EASY',
      statement: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid (brackets must be closed in the correct order).',
      expectedTime: 'O(N)',
      expectedSpace: 'O(N)',
      tags: ['strings', 'stack'],
      pattern: 'Stack',
      topics: ['Strings', 'stack', 'Stack Fundamentals'],
      hints: [
        '**Level 0 — Understand**: `({[]})` is valid. `([)]` is invalid because `)` closes `(` before `]` closes `[`.',
        '**Level 1 — Brute Force Thinking**: Repeatedly use string replacement to remove `()`, `{}`, and `[]`. If the string becomes empty, it\'s valid. Time: O(N^2).',
        '**Level 2 — Bottleneck Recognition**: String manipulation is slow. We need to remember the order of open brackets.',
        '**Level 3 — Pattern Recognition**: LIFO (Last-In-First-Out) state -> Stack.',
        '**Level 4 — Algorithmic Direction**: Push opening brackets onto a stack. When you see a closing bracket, pop the stack and check if it matches. If the stack is empty or doesn\'t match, return false.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(N).'
      ]
    },
    {
      slug: 'leetcode-225-implement-stack-using-queues',
      platform: 'LEETCODE',
      sourceProblemId: '225',
      title: 'Implement Stack using Queues',
      sourceUrl: 'https://leetcode.com/problems/implement-stack-using-queues/',
      difficulty: 'EASY',
      statement: 'Implement a last-in-first-out (LIFO) stack using only two queues (or one queue).',
      expectedTime: 'O(N) for push, O(1) for pop',
      expectedSpace: 'O(N)',
      tags: ['stack', 'queue', 'design'],
      pattern: 'Data Structure Design',
      topics: ['stack', 'queue', 'Stack Fundamentals', 'Queue Fundamentals'],
      hints: [
        '**Level 0 — Understand**: You must simulate a Stack (LIFO) using the operations of a Queue (FIFO).',
        '**Level 1 — Brute Force Thinking**: Use two queues. On push, add to q2, transfer everything from q1 to q2, then swap names.',
        '**Level 2 — Bottleneck Recognition**: Two queues works fine, but can we do it with just one?',
        '**Level 3 — Pattern Recognition**: Data Structure Simulation.',
        '**Level 4 — Algorithmic Direction**: Push element to queue. Then, pop the previous `size-1` elements from the front of the queue and push them back to the end of the same queue.',
        '**Level 5 — Complexity Target**: Push is O(N). Pop/Top is O(1).'
      ]
    },
    // GROUP I — LINKED LIST FOUNDATION
    {
      slug: 'leetcode-206-reverse-linked-list',
      platform: 'LEETCODE',
      sourceProblemId: '206',
      title: 'Reverse Linked List',
      sourceUrl: 'https://leetcode.com/problems/reverse-linked-list/',
      difficulty: 'EASY',
      statement: 'Given the `head` of a singly linked list, reverse the list, and return the reversed list.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(1) iterative, O(N) recursive',
      tags: ['linked-list', 'pointers'],
      pattern: 'Pointer Manipulation',
      topics: ['Linked List Fundamentals', 'Pointers'],
      hints: [
        '**Level 0 — Understand**: `1 -> 2 -> 3 -> null` becomes `3 -> 2 -> 1 -> null`.',
        '**Level 1 — Brute Force Thinking**: Traverse the list, store values in an array, then build a new list. Takes O(N) extra space.',
        '**Level 2 — Bottleneck Recognition**: We don\'t need to move values, we just need to change where the `next` pointers point.',
        '**Level 3 — Pattern Recognition**: In-place Pointer Manipulation.',
        '**Level 4 — Algorithmic Direction**: Maintain `prev`, `curr`, and `next_temp` pointers. Point `curr->next` to `prev`, then shift all pointers forward one step.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-876-middle-linked-list',
      platform: 'LEETCODE',
      sourceProblemId: '876',
      title: 'Middle of the Linked List',
      sourceUrl: 'https://leetcode.com/problems/middle-of-the-linked-list/',
      difficulty: 'EASY',
      statement: 'Given the `head` of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(1)',
      tags: ['linked-list', 'two-pointers'],
      pattern: 'Fast and Slow Pointers',
      topics: ['Linked List Fundamentals', 'Pointers'],
      hints: [
        '**Level 0 — Understand**: `1->2->3->4->5` returns `3`. `1->2->3->4->5->6` returns `4`.',
        '**Level 1 — Brute Force Thinking**: Traverse list to count length `N`. Traverse again to node `N/2`. Time O(N), two passes.',
        '**Level 2 — Bottleneck Recognition**: Can we do it in one pass?',
        '**Level 3 — Pattern Recognition**: Fast and Slow Pointers.',
        '**Level 4 — Algorithmic Direction**: `slow` moves 1 step, `fast` moves 2 steps. When `fast` reaches the end, `slow` is exactly at the middle.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    },
    {
      slug: 'leetcode-141-linked-list-cycle',
      platform: 'LEETCODE',
      sourceProblemId: '141',
      title: 'Linked List Cycle',
      sourceUrl: 'https://leetcode.com/problems/linked-list-cycle/',
      difficulty: 'EASY',
      statement: 'Given `head`, the head of a linked list, determine if the linked list has a cycle in it.',
      expectedTime: 'O(N)',
      expectedSpace: 'O(1)',
      tags: ['linked-list', 'two-pointers'],
      pattern: 'Fast and Slow Pointers',
      topics: ['Linked List Fundamentals', 'Pointers'],
      hints: [
        '**Level 0 — Understand**: A cycle occurs if a node\'s `next` points back to a previous node.',
        '**Level 1 — Brute Force Thinking**: Traverse the list, adding visited nodes to a Hash Set. If you hit a node already in the set, there is a cycle. Time O(N), Space O(N).',
        '**Level 2 — Bottleneck Recognition**: Hash set requires O(N) space. Can we do it with O(1) space?',
        '**Level 3 — Pattern Recognition**: Fast and Slow Pointers (Floyd\'s Cycle-Finding).',
        '**Level 4 — Algorithmic Direction**: `slow` moves 1 step, `fast` moves 2 steps. If they ever point to the same node, a cycle exists. If `fast` reaches `null`, no cycle.',
        '**Level 5 — Complexity Target**: Time O(N), Space O(1).'
      ]
    }
  ];

  console.log(`Starting insertion of ${problemsData.length} problems...`);

  for (const prob of problemsData) {
    // Determine Pattern ID
    const patternId = patternMap[prob.pattern];
    if (!patternId) {
      console.warn(`Warning: Pattern '${prob.pattern}' not found for ${prob.slug}.`);
    }

    // Determine Topic IDs
    const matchedTopics = getTopicIds(prob.topics);
    if (matchedTopics.length === 0) {
      console.warn(`Warning: No topics found for ${prob.slug}. Checked: ${prob.topics.join(', ')}`);
    }

    await prisma.practiceProblem.upsert({
      where: { slug: prob.slug },
      update: {
        title: prob.title,
        statement: prob.statement,
        platform: prob.platform,
        sourceProblemId: prob.sourceProblemId,
        sourceUrl: prob.sourceUrl,
        difficulty: prob.difficulty,
        tags: prob.tags,
        expectedTime: prob.expectedTime,
        expectedSpace: prob.expectedSpace,
        hints: prob.hints,
        status: 'PUBLISHED',
        patternIds: patternId ? [patternId] : [],
        topicIds: matchedTopics
      },
      create: {
        slug: prob.slug,
        title: prob.title,
        statement: prob.statement,
        platform: prob.platform,
        sourceProblemId: prob.sourceProblemId,
        sourceUrl: prob.sourceUrl,
        difficulty: prob.difficulty,
        problemType: 'CODING',
        tags: prob.tags,
        expectedTime: prob.expectedTime,
        expectedSpace: prob.expectedSpace,
        hints: prob.hints,
        status: 'PUBLISHED',
        patternIds: patternId ? [patternId] : [],
        topicIds: matchedTopics
      }
    });
  }

  console.log(`✅ Seed Phase 5B-1 complete. Upserted ${problemsData.length} problems.`);
}

seedPhase5B1()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
