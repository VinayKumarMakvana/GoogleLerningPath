export const sec_12_testing = {
  SECURITY_TESTING: {
    title: 'Security Testing',
    description: 'Master Penetration Testing, Bug Bounties, Fuzzing, and Red/Blue Team dynamics.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Secure CI/CD & DevSecOps'],
    learningContent: `
# Security Testing

Automated CI/CD scanners (SAST/DAST) catch known bugs, but they cannot catch complex logical flaws. Human-driven security testing is required.

## 1. Penetration Testing (Pentesting)
A simulated cyberattack performed by professional security engineers (Pentesters) to evaluate the security of the system.
- **White Box:** The tester has full access to the source code, architecture diagrams, and credentials. (Most thorough).
- **Black Box:** The tester has zero prior knowledge and acts like a random hacker on the internet. (Simulates a real-world attack).
- **Gray Box:** The tester has partial knowledge (e.g., standard user credentials).

## 2. Bug Bounties
Companies (like Google, Apple) offer financial rewards to independent security researchers who find and responsibly disclose vulnerabilities.
- Managed through platforms like HackerOne or Bugcrowd.
- Crowdsources security testing to thousands of hackers.

## 3. Red, Blue, and Purple Teams
- **Red Team:** The offensive team. They simulate real-world adversaries, trying to breach the company's defenses without warning the IT staff, testing both technical and physical security (e.g., social engineering).
- **Blue Team:** The defensive team. The internal security operations center (SOC) that monitors alerts, blocks attacks, and responds to incidents.
- **Purple Team:** Not a distinct team, but a collaborative mindset where Red and Blue teams share tactics and learnings to improve overall security.

## 4. Fuzzing (Fuzz Testing)
An automated software testing technique that involves providing invalid, unexpected, or random data as inputs to a computer program.
- The program is monitored for exceptions such as crashes, failing built-in code assertions, or potential memory leaks.
- Highly effective at finding buffer overflows in C/C++ or unhandled panics in Go/Rust.
`,
    fullNotes: `
# Detailed Notes: Security Testing

- **Responsible Disclosure:** The ethical practice of privately reporting a vulnerability to a company and giving them a reasonable timeframe (e.g., 90 days) to patch it before publishing the details to the public.
- **Social Engineering:** Humans are the weakest link in any security system. Penetration tests often include phishing emails or vishing (voice phishing) calls to employees to steal credentials, bypassing millions of dollars of network security.
`,
    shortNotes: `
- Pentesting: Professional hacking to find vulnerabilities before the bad guys do.
- White Box: Full source code access. Black Box: Zero knowledge.
- Bug Bounties: Paying freelance hackers for responsible disclosure.
- Red Team = Offense (Attackers). Blue Team = Defense (Defenders).
- Fuzzing: Throwing massive amounts of random data at an API/binary to crash it.
- Social Engineering attacks the human, not the computer.
`,
    cheatSheet: `
### The Penetration Testing Lifecycle
1. Reconnaissance (OSINT, scanning).
2. Threat Modeling & Vulnerability Identification.
3. Exploitation (Gaining access).
4. Post-Exploitation (Pivoting, lateral movement, privilege escalation).
5. Reporting (Remediation steps).
`,
    interviewQuestions: [
      { question: 'What is the difference between a Vulnerability Scan and a Penetration Test?', answerHint: 'A vulnerability scan is automated. It uses software to scan networks and applications for known signatures (CVEs) and misconfigurations. It yields many false positives. A penetration test is manual. A human security expert attempts to chain multiple vulnerabilities together to achieve a specific goal (e.g., stealing a database), proving the actual business risk of the flaws.', type: 'CONCEPTUAL' },
      { question: 'What is Fuzzing?', answerHint: 'Fuzzing is an automated testing technique that feeds massive amounts of malformed, unexpected, or completely random data into an application\'s input fields or APIs. The goal is to cause the application to crash, hang, or leak memory, revealing underlying vulnerabilities like buffer overflows or unhandled exceptions that an attacker could exploit.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'The Penetration Testing Execution Standard (PTES)', url: 'http://www.pentest-standard.org/index.php/Main_Page', type: 'ARTICLE', priority: 'S', source: 'PTES', isOfficial: true }
    ]
  }
};
