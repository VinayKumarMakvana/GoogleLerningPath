import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedPractice() {
  console.log('Seeding Practice Engine...');

  // 1. Create Patterns
  const arrayPattern = await prisma.dsaPattern.upsert({
    where: { slug: 'array-traversal' },
    update: {},
    create: {
      name: 'Array Traversal',
      slug: 'array-traversal',
      description: 'Iterating through arrays using loops or pointers.',
    },
  });

  const twoPointers = await prisma.dsaPattern.upsert({
    where: { slug: 'two-pointers' },
    update: {},
    create: {
      name: 'Two Pointers',
      slug: 'two-pointers',
      description: 'Using two indices to traverse an array, often from opposite ends.',
    },
  });

  const hashing = await prisma.dsaPattern.upsert({
    where: { slug: 'hashing' },
    update: {},
    create: {
      name: 'Hashing',
      slug: 'hashing',
      description: 'Using hash maps or sets to achieve O(1) lookups.',
    },
  });

  // 2. Find relevant Topics (assuming they exist from Phase 4)
  const arraysTopic = await prisma.topic.findFirst({ where: { title: 'Arrays' } });
  const twoPointersTopic = await prisma.topic.findFirst({ where: { title: 'Two Pointers Introduction' } });
  const stringsTopic = await prisma.topic.findFirst({ where: { title: 'Strings' } });
  const hashingTopic = await prisma.topic.findFirst({ where: { title: 'Basic Hashing' } });

  // 3. Seed "Two Sum"
  const twoSumTopicIds = [];
  if (arraysTopic) twoSumTopicIds.push(arraysTopic.id);
  if (hashingTopic) twoSumTopicIds.push(hashingTopic.id);

  await prisma.practiceProblem.upsert({
    where: { slug: 'two-sum' },
    update: {},
    create: {
      title: 'Two Sum',
      slug: 'two-sum',
      statement: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.',
      problemType: 'CODING',
      difficulty: 'EASY',
      source: 'LeetCode 1',
      sourceProblemId: '1',
      platform: 'LEETCODE',
      tags: ['array', 'hash-table'],
      constraints: [
        '`2 <= nums.length <= 10^4`',
        '`-10^9 <= nums[i] <= 10^9`',
        '`-10^9 <= target <= 10^9`',
        'Only one valid answer exists.'
      ],
      inputFormat: '`nums = [2,7,11,15], target = 9`',
      outputFormat: '`[0,1]`',
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        },
        {
          input: 'nums = [3,2,4], target = 6',
          output: '[1,2]',
          explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
        }
      ],
      hints: [
        'A really brute force way would be to search for all possible pairs of numbers but that would be too slow.',
        'Can we change our array in some way to make the search faster?',
        'What if we could look up the complement (`target - current_num`) in O(1) time using a Hash Map?'
      ],
      expectedTime: 'O(N)',
      expectedSpace: 'O(N)',
      status: 'PUBLISHED',
      topicIds: twoSumTopicIds,
      patternIds: [arrayPattern.id, hashing.id]
    },
  });

  // 4. Seed "Valid Palindrome"
  const palindromeTopicIds = [];
  if (stringsTopic) palindromeTopicIds.push(stringsTopic.id);
  if (twoPointersTopic) palindromeTopicIds.push(twoPointersTopic.id);

  await prisma.practiceProblem.upsert({
    where: { slug: 'valid-palindrome' },
    update: {},
    create: {
      title: 'Valid Palindrome',
      slug: 'valid-palindrome',
      statement: 'A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.',
      problemType: 'CODING',
      difficulty: 'EASY',
      source: 'LeetCode 125',
      sourceProblemId: '125',
      platform: 'LEETCODE',
      tags: ['two-pointers', 'string'],
      constraints: [
        '`1 <= s.length <= 2 * 10^5`',
        '`s` consists only of printable ASCII characters.'
      ],
      inputFormat: '`s = "A man, a plan, a canal: Panama"`',
      outputFormat: '`true`',
      examples: [
        {
          input: 's = "A man, a plan, a canal: Panama"',
          output: 'true',
          explanation: '"amanaplanacanalpanama" is a palindrome.'
        },
        {
          input: 's = "race a car"',
          output: 'false',
          explanation: '"raceacar" is not a palindrome.'
        }
      ],
      hints: [
        'Since we only care about alphanumeric characters, consider filtering them out or skipping them in-place.',
        'To check if a string is a palindrome, you can compare the characters at the ends and move inwards.',
        'Use Two Pointers, one at the start (`left`) and one at the end (`right`). Move them towards the center.'
      ],
      expectedTime: 'O(N)',
      expectedSpace: 'O(1)',
      status: 'PUBLISHED',
      topicIds: palindromeTopicIds,
      patternIds: [twoPointers.id, arrayPattern.id]
    },
  });

  console.log('✅ Seed Practice completed.');
}

seedPractice()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
