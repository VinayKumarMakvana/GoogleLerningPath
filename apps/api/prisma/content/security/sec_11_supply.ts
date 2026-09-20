export const sec_11_supply = {
  SUPPLY_CHAIN_SECURITY: {
    title: 'Supply Chain & Dependency Security',
    description: 'Understand the Software Supply Chain, SBOMs, and how to defend against dependency confusion and malicious packages.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 60,
    prerequisites: ['Secure CI/CD & DevSecOps'],
    learningContent: `
# Supply Chain & Dependency Security

Modern software is built on open-source packages. If your app imports a React library, and that library is hacked, your app is hacked. This is a Supply Chain Attack.

## 1. Malicious Dependencies
- **Typosquatting:** Attackers publish a malicious package named \`reeact\` instead of \`react\`. If a developer makes a typo, they download malware.
- **Dependency Confusion:** Attackers figure out the names of your company's private, internal packages. They publish a public package with the *exact same name* but a higher version number. If your package manager (npm, pip) is misconfigured, it pulls the public malware instead of the private code.
- **Compromised Maintainers:** An attacker steals the npm credentials of a popular open-source maintainer and pushes a malicious update (e.g., the \`event-stream\` incident).

## 2. Software Bill of Materials (SBOM)
An SBOM is a formal, machine-readable inventory detailing all the components, libraries, and dependencies included in your software.
- **Why it matters:** When a massive zero-day vulnerability is announced (like Log4j), companies spend weeks asking, "Are we using Log4j somewhere?" If you generate an SBOM during your CI build, you can instantly query your infrastructure to find vulnerable packages.

## 3. Mitigations
- **Dependency Scanning:** Tools (like Dependabot, Snyk) continuously scan your \`package.json\` against vulnerability databases (CVEs) and open automated PRs to bump vulnerable versions.
- **Pinning Dependencies:** Always use lockfiles (\`package-lock.json\`, \`yarn.lock\`) to ensure the exact same cryptographically-hashed versions are installed in Prod as were tested in CI.
- **Signed Commits & Artifacts:** Maintainers should cryptographically sign their commits and docker images (using tools like Sigstore/Cosign).
`,
    fullNotes: `
# Detailed Notes: Supply Chain

- **SolarWinds Attack:** The most famous supply chain attack in history. Russian hackers compromised the build system of SolarWinds (a network monitoring tool). They injected a backdoor into a legitimate software update, which was then downloaded by 18,000 customers, including the US Government and Fortune 500 companies.
- **SLSA (Supply-chain Levels for Software Artifacts):** A security framework pushed by Google to prevent tampering, improve integrity, and secure packages across the CI/CD pipeline.
`,
    shortNotes: `
- Supply Chain Attacks compromise a third-party dependency to hack your application.
- Typosquatting: \`reeact\` instead of \`react\`.
- Dependency Confusion: Publishing a public package to trick internal build systems.
- SBOM: A nutritional label for software. Lists all dependencies for fast auditing.
- Pin Dependencies: Always commit lockfiles to ensure deterministic, safe builds.
- Use Snyk/Dependabot to automatically find and patch known CVEs in libraries.
`,
    cheatSheet: `
### Defensive Package Management
1. Never \`npm install\` blindly from StackOverflow.
2. Verify the weekly downloads and GitHub stars of a package.
3. Configure artifact registries (like AWS CodeArtifact) to prioritize internal feeds over public feeds (prevents Dependency Confusion).
`,
    interviewQuestions: [
      { question: 'What is a Software Bill of Materials (SBOM) and why is it critical during a zero-day vulnerability event?', answerHint: 'An SBOM is a comprehensive, machine-readable inventory of all software components, dependencies, and libraries used in an application. During a zero-day event (like Log4j), security teams use the SBOM to instantly query and identify exactly which microservices are running the vulnerable dependency, rather than manually searching through hundreds of codebases.', type: 'CONCEPTUAL' },
      { question: 'Explain a Dependency Confusion attack.', answerHint: 'Many companies use internal package registries for proprietary code, alongside public registries (like npm). In a Dependency Confusion attack, an attacker discovers the name of an internal package and publishes a malicious package with the exact same name to the public registry, but with a highly inflated version number (e.g., v99.9.9). Misconfigured package managers default to downloading the highest version available, pulling the malware from the public internet instead of the safe internal network.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Dependency Confusion: How I Hacked Into Apple, Microsoft and Dozens of Other Companies', url: 'https://medium.com/@alex.birsan/dependency-confusion-4a5d60fec610', type: 'ARTICLE', priority: 'S', source: 'Alex Birsan', isOfficial: false }
    ]
  }
};
