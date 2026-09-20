export const sec_10_cicd = {
  SECURE_CICD: {
    title: 'Secure CI/CD & DevSecOps',
    description: 'Inject security into the automated pipeline with SAST, DAST, Secret Scanning, and least-privilege runners.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Web & Application Security', 'Docker & Kubernetes Security'],
    learningContent: `
# Secure CI/CD & DevSecOps

Historically, security was checked right before a release. In modern engineering, we "Shift Left"—integrating security checks directly into the CI/CD pipeline so vulnerabilities are caught before the code is even merged.

## 1. Secrets Management & Scanning
- **The Problem:** Developers accidentally commit API keys, AWS keys, or DB passwords to Git. Once pushed to GitHub, bots scrape them in seconds.
- **The Fix:** Use tools like GitLeaks or TruffleHog in your CI pipeline (and pre-commit hooks) to scan every commit for secrets and block the merge.
- **Secret Stores:** Never store secrets in environment variables in plain text on the CI server. Use dedicated secret managers (GitHub Secrets, AWS Secrets Manager, HashiCorp Vault) and inject them at runtime.

## 2. Code Security Scanning (SAST)
- **Static Application Security Testing (SAST):** Tools (like SonarQube or Semgrep) that scan your raw source code for vulnerabilities (like SQL injection or buffer overflows) without running the code. It is fast and runs on every PR.

## 3. Dynamic Security Scanning (DAST)
- **Dynamic Application Security Testing (DAST):** Tools (like OWASP ZAP) that attack a running, compiled version of your application (usually in a staging environment) from the outside to find runtime vulnerabilities (like XSS or CSRF).

## 4. Securing the Pipeline Itself
The CI/CD server (Jenkins, GitHub Actions) is the most powerful entity in your company. It has access to production servers and source code.
- If an attacker compromises your CI pipeline, they own everything.
- **Mitigation:** CI Runners must operate on the Principle of Least Privilege. Use ephemeral runners (destroyed after every build). Do not allow untrusted code (like PRs from public forks) to access CI secrets.
`,
    fullNotes: `
# Detailed Notes: DevSecOps

- **OIDC for CI/CD:** Historically, to let GitHub Actions deploy to AWS, you created a long-lived AWS IAM User and pasted the secret keys into GitHub Secrets. This is dangerous. Modern pipelines use OpenID Connect (OIDC). GitHub provides a short-lived cryptographic token to the pipeline, which AWS verifies and exchanges for temporary AWS credentials. No long-lived keys exist.
- **Infrastructure as Code (IaC) Scanning:** Tools like Checkov or tfsec scan your Terraform/CloudFormation files in the CI pipeline to ensure you aren't spinning up an S3 bucket with public access.
`,
    shortNotes: `
- Shift Left: Finding security bugs early in the development lifecycle.
- Secret Scanning: Blocks PRs that contain hardcoded API/Cloud keys.
- SAST: Scans raw source code for bugs (Fast, runs on PRs).
- DAST: Attacks a running staging app from the outside (Slower).
- Protect the CI/CD server: It is the ultimate target for hackers.
- Use OIDC to connect CI/CD to Cloud Providers instead of long-lived access keys.
- Scan Terraform/IaC scripts for misconfigurations.
`,
    cheatSheet: `
### Pipeline Security Flow
1. Pre-commit: Secret Scanning.
2. Build (CI): SAST + Dependency Scanning.
3. Test (CI): Unit tests + IaC Scanning.
4. Deploy to Staging (CD): DAST (Automated attack simulation).
5. Deploy to Prod (CD): Signed artifacts.
`,
    interviewQuestions: [
      { question: 'What is the difference between SAST and DAST?', answerHint: 'SAST (Static Application Security Testing) analyzes the raw source code from the inside without executing it, looking for coding flaws like SQL injection. DAST (Dynamic Application Security Testing) analyzes the compiled, running application from the outside, sending simulated attacks to find runtime vulnerabilities like XSS or authentication bypasses.', type: 'TECHNICAL' },
      { question: 'Why is it dangerous to store long-lived AWS access keys as CI/CD secrets (e.g., in GitHub Secrets), and what is the modern alternative?', answerHint: 'Long-lived keys are vulnerable to exfiltration if the CI server is compromised, or if a malicious PR attempts to echo the secrets to the logs. The modern alternative is OIDC (OpenID Connect), where the CI provider assumes an IAM Role using cryptographic federation, granting temporary, short-lived credentials for the duration of the build only.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Securing GitHub Actions', url: 'https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions', type: 'ARTICLE', priority: 'S', source: 'GitHub', isOfficial: true }
    ]
  }
};
