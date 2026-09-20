export const sec_13_incident = {
  INCIDENT_RESPONSE: {
    title: 'Vulnerability Management & Incident Response',
    description: 'Learn how to handle a data breach, manage CVEs, and the lifecycle of Incident Response.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 60,
    prerequisites: ['Security Testing'],
    learningContent: `
# Vulnerability Management & Incident Response

You will eventually be breached. How your engineering and security teams respond in the first 24 hours determines the survival of the company.

## 1. Vulnerability Management
The continuous process of identifying, evaluating, treating, and reporting on security vulnerabilities in systems.
- **CVE (Common Vulnerabilities and Exposures):** A dictionary of publicly known security vulnerabilities.
- **CVSS (Common Vulnerability Scoring System):** A score from 0 to 10 evaluating the severity of a CVE (10 being Critical).
- **Triage:** You cannot fix every bug. You prioritize patching Critical and High vulnerabilities on internet-facing systems first.

## 2. The Incident Response (IR) Lifecycle
Defined by NIST (National Institute of Standards and Technology).
1. **Preparation:** Having runbooks, logging (CloudTrail), backups, and an IR team ready *before* an attack.
2. **Detection & Analysis:** Identifying the breach via SIEM (Security Information and Event Management) alerts. Figuring out what happened, who is affected, and the scope.
3. **Containment, Eradication, & Recovery:**
   - *Containment:* Stop the bleeding. (e.g., Unplug the server, revoke AWS keys, block the IP). DO NOT delete the server yet; you need it for forensics.
   - *Eradication:* Remove the malware, patch the vulnerability.
   - *Recovery:* Restore from secure backups, bring systems back online securely.
4. **Post-Incident Activity (Blameless Post-Mortem):** Analyze why it happened without blaming individuals. Update architectures and runbooks to ensure it never happens again.

## 3. Forensics & Chain of Custody
During containment, you must preserve evidence. Do not reboot a compromised server (you will lose volatile RAM containing the malware). Take a cryptographic snapshot of the hard drive for analysis.
`,
    fullNotes: `
# Detailed Notes: Incident Response

- **SIEM (Security Information and Event Management):** Software (like Splunk or Datadog Security) that ingests logs from firewalls, databases, and servers, aggregating them to detect anomalous behavior (e.g., "User logged in from New York, then 5 seconds later logged in from Russia").
- **Zero-Day Vulnerability:** A vulnerability that is actively being exploited by hackers *before* the software vendor knows about it (zero days to prepare a patch). Log4Shell was a massive zero-day.
`,
    shortNotes: `
- CVE: Standardized list of known vulnerabilities.
- CVSS: The severity score (0-10) of a vulnerability.
- IR Lifecycle: Prepare -> Detect -> Contain -> Eradicate -> Recover -> Post-Mortem.
- Containment first: Stop the attack from spreading (revoke keys, isolate networks).
- Never delete the compromised server immediately (preserve RAM/Disk for forensics).
- Conduct Blameless Post-Mortems to improve the system.
- SIEM tools aggregate logs to detect breaches.
`,
    cheatSheet: `
### IR Communication Rules
1. Never speculate in writing (e.g., Slack) during an incident. State only facts.
2. Involve Legal and PR immediately for data breaches.
3. Never use the word "breach" until Legal confirms it. Use "incident" or "anomaly".
`,
    interviewQuestions: [
      { question: 'During an active security incident, what is the very first step the Incident Response team should take regarding the compromised server?', answerHint: 'Containment. The immediate priority is to stop the attack from spreading laterally. You should isolate the server from the network (e.g., changing Security Groups to deny all outbound/inbound traffic). You should NOT delete or reboot the server, as this destroys volatile forensic evidence in RAM.', type: 'CONCEPTUAL' },
      { question: 'What is a Zero-Day vulnerability?', answerHint: 'A zero-day vulnerability is a software flaw unknown to the vendor, for which no patch currently exists. Because the vendor has had "zero days" to prepare, attackers can exploit it freely until it is discovered and patched.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'NIST Computer Security Incident Handling Guide', url: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf', type: 'ARTICLE', priority: 'S', source: 'NIST', isOfficial: true }
    ]
  }
};
