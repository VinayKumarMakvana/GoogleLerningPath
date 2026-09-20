export const sec_14_interview = {
  SEC_INTERVIEW_PREP: {
    title: 'Security Engineering Case Studies & Interviews',
    description: 'Frameworks for answering security architecture questions, identifying flaws in diagrams, and risk assessment.',
    difficulty: 'EXPERT',
    estimatedLearnTime: 60,
    prerequisites: ['Vulnerability Management & Incident Response'],
    learningContent: `
# Security Engineering Case Studies & Interviews

Security Engineering interviews assess your ability to view a system maliciously. You will be given an architecture and asked, "How would you break this, and how would you fix it?"

## The Security Interview Framework

### 1. Define the Assets & Threat Model
Identify the most valuable data (PII, Credit Cards). Ask the interviewer about the threat actors: Are we defending against script kiddies, insider threats (employees), or nation-state attackers?

### 2. Identify the Attack Surface
Look at the architecture diagram and circle the trust boundaries.
- Where does public internet touch the system? (API Gateways).
- How do internal services talk? (mTLS, JWTs).
- Where is data stored? (Databases, S3).

### 3. Apply STRIDE Systematically
Walk through the architecture using STRIDE:
- **Spoofing:** "Is the API validating JWT signatures? Are services using mTLS?"
- **Tampering:** "Is data encrypted in transit? Are we checking digital signatures on webhooks?"
- **Repudiation:** "Do we have CloudTrail enabled? Are logs tamper-proof?"
- **Information Disclosure:** "Are S3 buckets private? Is the DB encrypted at rest? Are we using Field-Level encryption for the credit cards?"
- **Denial of Service:** "Do we have a WAF and Rate Limiting on the API Gateway?"
- **Elevation of Privilege:** "Are the IAM roles using Least Privilege? Are we checking Authorization (BOLA) on every database query?"

## Case Study: Secure Authentication System
- **Flaw:** Storing passwords in plaintext. -> **Fix:** Argon2id hashing with a unique salt.
- **Flaw:** Session hijacking via XSS. -> **Fix:** Store session cookies with \`HttpOnly\`, \`Secure\`, and \`SameSite=Strict\`.
- **Flaw:** Brute forcing the login endpoint. -> **Fix:** Rate limiting, IP blocking, and mandatory Multi-Factor Authentication (MFA).
- **Flaw:** Account recovery bypass. -> **Fix:** Secure, time-limited, single-use password reset tokens sent via email.
`,
    fullNotes: `
# Detailed Notes: Interview Strategy

- **Tradeoffs are Mandatory:** Security always comes at a cost. If you suggest Field-Level encryption, you must acknowledge the massive performance hit and the loss of database searchability (you can't do a SQL \`LIKE\` query on encrypted text). If you suggest MFA on every login, acknowledge the UX friction.
- **The "Insider Threat":** Interviewers love to ask, "What if a rogue database administrator tries to steal the data?" The answer involves Separation of Duties, Audit Logging (where logs are sent to an account the DBA cannot access), and Field-Level encryption where the KMS keys are managed by a completely different team.
`,
    shortNotes: `
- Always define the Assets (what to protect) and the Threat Actors (who to protect against).
- Systematically apply STRIDE to find vulnerabilities in a diagram.
- Address Authentication, Authorization, Encryption (Rest/Transit), and Auditing.
- Discuss the operational tradeoffs of your security suggestions (Performance vs UX vs Security).
- Consider Insider Threats (rogue employees), not just external hackers.
`,
    cheatSheet: `
### Key Interview Phrases
- "To adhere to the Principle of Least Privilege, I will configure this IAM role to only allow..."
- "To prevent BOLA/IDOR, I will ensure the backend verifies the requested resource belongs to the authenticated user ID."
- "To protect against cross-site scripting (XSS), we must rely on contextual output encoding and a strict Content Security Policy (CSP)."
- "Security is about defense in depth; we shouldn't rely on just the network firewall."
`,
    interviewQuestions: [
      { question: 'In a system design interview, you are asked to design a secure payment gateway. How do you handle storing credit card numbers?', answerHint: 'I would actively avoid storing credit card numbers on my own servers if possible, to reduce PCI-DSS compliance scope. I would use a tokenization service (like Stripe). If I absolutely must store them, I would implement Field-Level Encryption in the application tier using a secure KMS (like AWS KMS) to manage the keys, ensure the database is isolated in a private subnet, and implement strict RBAC and audit logging for any service requesting decryption.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'OWASP Security Architecture Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Security_Architecture_Cheat_Sheet.html', type: 'ARTICLE', priority: 'S', source: 'OWASP', isOfficial: true }
    ]
  }
};
