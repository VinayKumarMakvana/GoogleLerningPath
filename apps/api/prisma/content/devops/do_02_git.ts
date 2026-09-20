export const do_02_git = {
  GIT_WORKFLOW: {
    title: 'Git & GitHub Engineering Workflow',
    description: 'Master version control, branching strategies, rebasing, and collaborative workflows.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 90,
    prerequisites: ['Linux & Production Environment'],
    learningContent: `
# Git & GitHub Engineering Workflow

Git is a distributed version control system. In a professional DevOps environment, understanding how to cleanly manage history and collaborate is as important as writing code.

## The Git Object Model
Git doesn't store differences (deltas); it stores snapshots. If a file hasn't changed, Git simply stores a reference to the identical file it already stored.
- **Blob:** The contents of a file.
- **Tree:** A directory structure mapping names to Blobs.
- **Commit:** A snapshot containing a Tree, metadata (author, message), and a pointer to parent commit(s).

## Workflows
1. **Trunk-Based Development:** All developers commit directly to the \`main\` branch (or short-lived feature branches). Requires strong CI/CD and feature flags.
2. **GitFlow:** Strict branching model with \`main\`, \`develop\`, \`feature\`, \`release\`, and \`hotfix\` branches. Safe, but often too slow for modern DevOps.
`,
    fullNotes: `
# Detailed Notes: Git

- **Merge vs Rebase:** \`git merge\` creates a new "merge commit" tying two histories together. \`git rebase\` rewrites history by placing your branch's commits on top of the target branch. Rebase makes history cleaner (linear) but must NEVER be done on public/shared branches.
- **Pull Requests (PRs):** The mechanism in GitHub/GitLab to propose changes. PRs trigger CI pipelines (tests, linters) and require manual code reviews before merging.
- **Squash Commits:** When merging a PR, squashing combines all the messy "wip", "fix typo" commits into one clean, descriptive commit on the main branch.
`,
    shortNotes: `
- Git is decentralized; everyone has a full copy of the repository.
- Use \`git rebase\` for local branches to keep history linear. NEVER rebase \`main\`.
- Write descriptive, imperative commit messages ("Fix bug in authentication").
- Protect the \`main\` branch: Require PRs, approvals, and passing CI checks.
`,
    cheatSheet: `
\`\`\`bash
# Standard workflow
git checkout -b feature/auth
git commit -m "Add JWT validation"
git push -u origin feature/auth

# Rebasing (Syncing with main)
git checkout main
git pull
git checkout feature/auth
git rebase main
# (Resolve conflicts if any)
git push --force-with-lease

# Undo last commit (keep changes)
git reset --soft HEAD~1
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the difference between `git merge` and `git rebase`?', answerHint: 'Merge preserves exact history and creates a merge commit. Rebase rewrites history to create a linear progression by applying your commits on top of the base branch.', type: 'TECHNICAL' },
      { question: 'What does `git fetch` do compared to `git pull`?', answerHint: 'Fetch downloads changes from the remote tracking branches but does not merge them into your local working directory. Pull does a fetch followed by an immediate merge.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2', type: 'BOOK', priority: 'S', source: 'Git SCM', isOfficial: true },
      { title: 'Advanced Git Tutorial', url: 'https://www.youtube.com/watch?v=qsTthZi23VE', type: 'VIDEO', priority: 'A', source: 'FreeCodeCamp', isOfficial: false }
    ]
  }
};
