export const eng_10_git = {
  GIT_ENGINEERING_WORKFLOW: {
    title: 'Git & Engineering Workflow',
    description: 'Stop using Git as just a save button. Master Rebasing, Bisect, Reflogs, and clean commit histories.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 45,
    prerequisites: [],
    learningContent: `
# Git & Engineering Workflow

Junior developers use Git as a cloud backup system (commit, push, pray). Senior engineers use Git as a forensic tool to understand the evolution of the codebase. A clean Git history is essential for debugging.

## 1. Merge vs Rebase
When you branch off \`main\` and work for a week, \`main\` has likely received new commits from other developers. You need to integrate those changes into your branch.
- **git merge main:** Creates a new "Merge Commit" tying the two histories together. This is safe, but it makes the Git history look like a messy, unreadable spiderweb.
- **git rebase main:** Takes your branch's commits, temporarily sets them aside, fast-forwards your branch to the tip of \`main\`, and then re-applies your commits one by one on top. It creates a perfectly straight, linear history.
  - *Golden Rule:* **Never rebase a public branch** that other people are working on, because rebase rewrites history (changes commit hashes). Only rebase your local feature branches.

## 2. Interactive Rebase & Squashing
If you committed 15 times with messages like "wip", "fix typo", "fix tests", do not merge that garbage into \`main\`.
Use **Interactive Rebase** (\`git rebase -i HEAD~15\`). This opens an editor allowing you to combine (squash) all 15 commits into one single, cohesive commit with a descriptive message: "feat: implemented payment gateway".

## 3. Git Bisect (The Ultimate Debugging Tool)
You discover a subtle bug on \`main\`, but you don't know when it was introduced.
1. You run \`git bisect start\`.
2. You mark the current broken commit: \`git bisect bad\`.
3. You find a commit from 3 months ago that worked, and mark it: \`git bisect good [commit-hash]\`.
4. Git uses **Binary Search**, checking out a commit exactly in the middle. You test the app and tell Git if it's \`good\` or \`bad\`.
5. Git halves the search space repeatedly, finding the exact commit that introduced the bug out of 10,000 commits in just 13 steps.

## 4. The Reflog (The Undo Button)
If you accidentally ran a terrible command (like a hard reset) and deleted a week of commits, they are not gone.
\`git reflog\` shows a chronological log of every action your local Git repository has taken, even actions that rewrote history. You can find the hash of your "deleted" commit and easily restore it.
`,
    fullNotes: `
# Detailed Notes: Git Workflows

- **Trunk-Based Development:** Modern high-performing teams (CI/CD) do not use GitFlow (long-living \`develop\` and \`release\` branches). They use Trunk-Based Development. Everyone branches directly off \`main\`, writes a small change, and merges back into \`main\` within 24 hours. Features are hidden from users using Feature Flags until they are ready. This prevents "Merge Hell".
- **Conventional Commits:** A standard for writing commit messages that allows CI/CD tools to parse them.
  - \`feat: add user login\` (Triggers a minor release v1.1.0)
  - \`fix: resolve null pointer in checkout\` (Triggers a patch release v1.0.1)
  - \`feat!: breaking change to auth API\` (Triggers a major release v2.0.0)
`,
    shortNotes: `
- git merge: Safe, but creates messy web-like history.
- git rebase: Rewrites history to create a clean, linear timeline. Never rebase shared branches.
- Interactive Rebase: Used to squash messy "wip" commits into a single clean commit before merging.
- git bisect: Uses binary search to find exactly which commit introduced a bug.
- git reflog: The ultimate undo button. Recovers "deleted" commits.
- Trunk-Based Development: Merge small PRs to main daily. Use feature flags.
`,
    cheatSheet: `
### Essential Git Commands
- \`git commit --amend\`: Add forgotten files to the last commit without making a new one.
- \`git cherry-pick <hash>\`: Grab a specific commit from another branch and apply it to your current branch.
- \`git stash\`: Temporarily save uncommitted work so you can switch branches.
`,
    interviewQuestions: [
      { question: 'What is the difference between git merge and git rebase, and what is the golden rule of rebasing?', answerHint: 'Both integrate changes from one branch to another. Merge creates a new "merge commit" uniting the two histories, which preserves exact chronological history but creates messy graph webs. Rebase rewrites history by placing your branch\'s commits directly on top of the target branch, resulting in a clean, linear history. The golden rule is to NEVER rebase a public/shared branch (like main), because rebasing changes commit hashes, which will destroy the local repositories of anyone else working on that branch.', type: 'TECHNICAL' },
      { question: 'You are tasked with finding when a specific bug was introduced into the main branch, which has 5,000 commits. How do you find the offending commit efficiently?', answerHint: 'I would use `git bisect`. By providing git with a known "bad" commit (the current state) and a known "good" commit (a point in the past before the bug existed), git performs a binary search. It checks out a commit in the middle, asks me to test if the bug is present, and based on my answer, cuts the search space in half. It can find the exact broken commit among 5,000 in roughly 12 to 13 steps.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2', type: 'BOOK', priority: 'S', source: 'Scott Chacon', isOfficial: true }
    ]
  }
};
