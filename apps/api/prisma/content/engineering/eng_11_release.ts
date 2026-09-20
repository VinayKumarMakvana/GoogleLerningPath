export const eng_11_release = {
  RELEASE_ENGINEERING: {
    title: 'CI Quality Gates & Release Engineering',
    description: 'Learn Semantic Versioning, zero-downtime deployments, and how to build unshakeable CI pipelines.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 45,
    prerequisites: ['Git & Engineering Workflow'],
    learningContent: `
# Release Engineering & CI Quality Gates

If your deployment process consists of an engineer SSH-ing into a server and running \`git pull\`, you are one typo away from a catastrophic outage. Release Engineering is the discipline of making deployments boring, automated, and strictly governed.

## 1. Continuous Integration (CI) Quality Gates
When a developer opens a Pull Request, a machine should immediately evaluate it before a human does. These automated checks are "Quality Gates". If any gate fails, the "Merge" button is disabled.
- **Gate 1: Static Analysis.** Does the code compile? Does it pass ESLint? Is it formatted with Prettier?
- **Gate 2: Security Scans.** Does the code contain hardcoded AWS keys (Secret Scanning)? Does \`package.json\` contain libraries with known CVE vulnerabilities (SAST)?
- **Gate 3: Testing & Coverage.** Do all Unit Tests pass? Did the developer drop the overall Test Coverage below 80%?

## 2. Semantic Versioning (SemVer)
A standard for assigning version numbers to software releases: \`MAJOR.MINOR.PATCH\` (e.g., \`v2.1.4\`).
- **PATCH (2.1.4 -> 2.1.5):** Backwards-compatible bug fixes. No new features.
- **MINOR (2.1.4 -> 2.2.0):** Backwards-compatible new features. (You added a new endpoint, but the old endpoints still work perfectly).
- **MAJOR (2.1.4 -> 3.0.0):** Breaking changes. (You renamed a field in your JSON response from \`userId\` to \`id\`. Anyone using your API will crash).

## 3. Zero-Downtime Deployment Strategies
Never take down the live server to start the new server.
- **Blue/Green Deployment:** You have two identical production environments (Blue and Green). Users are currently routed to Blue. You deploy the new code to Green, run tests on it privately. If it passes, you flip the Load Balancer switch, instantly routing all users to Green. If users report bugs, you instantly flip the switch back to Blue (a 1-second rollback).
- **Canary Release:** You deploy the new code to a small subset of servers. You route 1% of live user traffic to the Canary. You watch the error metrics. If the 1% are fine, you route 10%, then 50%, then 100%. (Used by companies like Google and Netflix to minimize blast radius).
`,
    fullNotes: `
# Detailed Notes: Release Engineering

- **Feature Flags (Toggles):** The ultimate decoupling of Deployment from Release. You deploy the code to production on Monday, but the feature is wrapped in an \`if(feature_enabled)\` block. The feature is "live", but dormant. On Friday, the marketing team presses a button in a UI (like LaunchDarkly), which flips the flag to \`true\`, releasing the feature to users instantly without a deployment. If the feature breaks the site, they flip it back to \`false\` in 1 second.
- **Immutable Infrastructure:** You never update a running server. If you need to upgrade Node.js from v18 to v20, you do not SSH in and run \`apt-get update\`. You build a brand new Docker image with v20, deploy it, and destroy the old v18 containers. This prevents "Configuration Drift" where servers become unique, un-reproducible snowflakes.
`,
    shortNotes: `
- CI Quality Gates block bad PRs (Linting, Tests, Security Scans).
- SemVer: MAJOR (breaking) . MINOR (feature) . PATCH (bugfix).
- Blue/Green Deployment: Two identical environments. Flip the load balancer to switch. Immediate rollbacks.
- Canary Release: Route 1% of traffic to the new code to test the waters.
- Feature Flags: Deploy code silently. Turn the feature on via a UI later.
- Immutable Infrastructure: Never update a server. Destroy it and replace it with a new image.
`,
    cheatSheet: `
### NPM SemVer Symbols
When looking at a \`package.json\`:
- \`"react": "18.2.0"\`: Exactly this version.
- \`"react": "~18.2.0"\`: Allow patch updates (18.2.1 is okay).
- \`"react": "^18.2.0"\`: Allow minor updates (18.3.0 is okay, but NOT 19.0.0).
`,
    interviewQuestions: [
      { question: 'What is Semantic Versioning (SemVer), and when are you required to increment the MAJOR version?', answerHint: 'SemVer follows the format MAJOR.MINOR.PATCH. You increment the PATCH version for backwards-compatible bug fixes, and the MINOR version for new backwards-compatible features. You are strictly required to increment the MAJOR version anytime you introduce a "breaking change"—such as removing an API endpoint, changing the shape of a JSON response, or altering a function signature—because this change will break the code of any downstream consumers relying on your software.', type: 'CONCEPTUAL' },
      { question: 'Explain how a Blue/Green deployment works and why it is superior to a Rolling Update.', answerHint: 'In a Blue/Green deployment, you maintain two identical production environments. Live traffic hits Blue. You deploy the new code to Green, test it safely, and then switch the Load Balancer to route 100% of traffic to Green instantly. It is superior to a rolling update because if a critical bug is discovered, rolling back is simply switching the Load Balancer back to Blue, which takes 1 second. Rolling updates take much longer to roll back because you have to wait for containers to be destroyed and recreated.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Semantic Versioning 2.0.0', url: 'https://semver.org/', type: 'ARTICLE', priority: 'S', source: 'Tom Preston-Werner', isOfficial: true }
    ]
  }
};
