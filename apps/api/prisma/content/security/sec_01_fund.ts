export const sec_01_fund = {
  SEC_FUNDAMENTALS: {
    title: 'Security Fundamentals & Threat Modeling',
    description: 'Master the CIA triad, Attack Surfaces, and how to proactively model threats using STRIDE.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: [],
    learningContent: `
# Security Fundamentals & Threat Modeling

Security is not a feature you add at the end of development; it is a mindset applied during the design phase. 

## The CIA Triad
The three pillars of information security:
1. **Confidentiality:** Only authorized users can access the data (Encryption, IAM).
2. **Integrity:** Data cannot be modified tampered with by unauthorized users (Hashing, Digital Signatures).
3. **Availability:** The system must be accessible to authorized users when needed (DDoS protection, Load Balancing, Backups).

## Threat Modeling (STRIDE)
Before writing code, you evaluate the architecture to find vulnerabilities. STRIDE is a framework created by Microsoft:
- **S**poofing (Impersonating someone else) -> Mitigated by Authentication.
- **T**ampering (Modifying data) -> Mitigated by Integrity (Signatures/TLS).
- **R**epudiation (Claiming you didn't do something) -> Mitigated by Non-repudiation (Audit Logs).
- **I**nformation Disclosure (Data leaks) -> Mitigated by Confidentiality (Encryption/RBAC).
- **D**enial of Service (Crashing the system) -> Mitigated by Availability (Rate limiting).
- **E**levation of Privilege (A user gaining Admin rights) -> Mitigated by Authorization (Least Privilege).

## Core Concepts
- **Attack Surface:** The sum of all points where an unauthorized user can try to enter data or extract data. (e.g., open ports, API endpoints, input fields).
- **Trust Boundary:** A boundary where data changes its level of "trust". For example, the line between the public internet and your internal API Gateway is a trust boundary. Data crossing this boundary must be rigorously validated.
- **Principle of Least Privilege (PoLP):** A user or service should only have the bare minimum permissions necessary to do its job, and nothing more.
`,
    fullNotes: `
# Detailed Notes: Threat Modeling

- **Defense in Depth:** The concept of layering security defenses. If a hacker bypasses the WAF (Web Application Firewall), they still have to bypass the API authentication, then the database network segmentation, then the database encryption. Never rely on a single layer of security.
- **Zero Trust Architecture:** "Never trust, always verify." Historically, companies used a "castle-and-moat" model (if you are on the corporate VPN, you are trusted). Zero Trust assumes the network is already compromised. Every single internal microservice must authenticate and authorize every request from every other internal microservice.
`,
    shortNotes: `
- CIA Triad: Confidentiality, Integrity, Availability.
- STRIDE helps identify architectural flaws before coding starts.
- Trust Boundaries separate untrusted user input from trusted internal systems.
- Least Privilege: Give the absolute minimum access required.
- Defense in Depth: Multiple overlapping security layers.
- Zero Trust: Assume the internal network is hostile. Authenticate everything.
`,
    cheatSheet: `
### Security Design Principles
1. Fail Securely (If a permission check crashes, default to Deny).
2. Keep Security Simple (Complex security is often misconfigured).
3. Secure by Default (Users shouldn't have to turn on security settings).
4. Separation of Duties (The person writing code shouldn't be the one deploying to prod).
`,
    interviewQuestions: [
      { question: 'What is the Principle of Least Privilege?', answerHint: 'It states that a user, program, or process should have only the bare minimum privileges necessary to perform its intended function. For example, a microservice that only needs to read user profiles should be given a database credential that only has SELECT permissions on the users table, not root/admin access.', type: 'CONCEPTUAL' },
      { question: 'What is Zero Trust Architecture?', answerHint: 'Zero Trust is a security framework that discards the old "castle and moat" concept where anyone inside the internal network was trusted. It assumes the internal network is already compromised. Therefore, every single request, even between two internal microservices, must be strictly authenticated and authorized.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'OWASP Threat Modeling', url: 'https://owasp.org/www-community/Threat_Modeling', type: 'ARTICLE', priority: 'S', source: 'OWASP', isOfficial: true }
    ]
  }
};
