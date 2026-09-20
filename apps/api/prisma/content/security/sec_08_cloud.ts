export const sec_08_cloud = {
  CLOUD_SECURITY: {
    title: 'Cloud Security — AWS & GCP',
    description: 'Master Cloud Identity and Access Management (IAM), the Shared Responsibility Model, and securely managing cloud keys.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Network Security'],
    learningContent: `
# Cloud Security (AWS & GCP)

When you move to the cloud, the perimeter changes from the physical network to **Identity**. IAM is the new firewall.

## 1. The Shared Responsibility Model
Cloud providers (AWS/GCP/Azure) are responsible for security **OF** the cloud (Physical data centers, hypervisors, global networking). 
You (the customer) are responsible for security **IN** the cloud (Your application code, your IAM policies, your database encryption settings, your network firewall rules).

## 2. Identity and Access Management (IAM)
IAM controls who can do what in your cloud account.
- **Users:** Long-term credentials (Passwords, Access Keys) assigned to humans.
- **Roles (Service Accounts):** Short-term, temporary credentials assigned to machines (EC2 instances, Lambda functions).
- **Policies:** JSON documents attached to Users or Roles that explicitly define permissions (e.g., "Allow S3 GetObject on bucket-x").

## 3. The Golden Rule of IAM
**Never put long-term AWS Access Keys in your source code, and never pass them to servers manually.**
If an EC2 instance needs to read from an S3 bucket, you create an IAM Role with that permission, and attach the Role to the EC2 instance. The cloud provider automatically injects short-lived, rotating credentials into the instance.

## 4. Cloud Misconfigurations
The vast majority of cloud hacks are not sophisticated zero-days; they are simple misconfigurations:
- Publicly accessible S3 buckets.
- Security Groups left open to \`0.0.0.0/0\` on SSH (port 22).
- Hardcoded IAM keys accidentally pushed to public GitHub repos.
`,
    fullNotes: `
# Detailed Notes: Cloud Sec

- **Resource-Based Policies vs Identity-Based Policies:** 
  - *Identity:* Attached to the user (e.g., "Alice is allowed to read S3").
  - *Resource:* Attached to the resource (e.g., an S3 Bucket Policy: "This bucket is only accessible by IPs originating from our corporate office"). AWS evaluates both to determine access.
- **CloudTrail / Cloud Audit Logs:** Every single API call made to your AWS/GCP account (creating a server, deleting a database) is logged. These logs must be protected and actively monitored for suspicious activity (e.g., an EC2 instance suddenly being spun up in a region you never use—likely a crypto-mining hack).
`,
    shortNotes: `
- Shared Responsibility: AWS secures the hardware; You secure the configuration and code.
- IAM controls identity. Follow Least Privilege strictly.
- Never hardcode IAM Access Keys.
- Use IAM Roles (Service Accounts) to give machines temporary, auto-rotating permissions.
- Misconfigurations (Public S3 buckets) cause most cloud breaches.
- Monitor CloudTrail/Audit Logs to detect unauthorized API usage.
`,
    cheatSheet: `
### AWS IAM Policy Structure
- **Effect:** Allow or Deny (Explicit Deny always wins).
- **Action:** e.g., \`s3:GetObject\`
- **Resource:** e.g., \`arn:aws:s3:::my-bucket/*\`
- **Condition (Optional):** e.g., Only allow if MFA is present, or from specific IP.
`,
    interviewQuestions: [
      { question: 'What is the Shared Responsibility Model in Cloud Computing?', answerHint: 'It dictates the division of security obligations. The Cloud Provider is responsible for the security OF the cloud (physical facilities, hardware, hypervisors, managed services). The Customer is responsible for security IN the cloud (configuring IAM policies, patching OS vulnerabilities on VMs, encrypting data, and securing application code). If your S3 bucket is left public and data is stolen, it is entirely the customer\'s fault.', type: 'CONCEPTUAL' },
      { question: 'How should an application running on an AWS EC2 instance securely access an S3 bucket without using hardcoded access keys?', answerHint: 'You should create an IAM Role with a policy granting the specific S3 permissions. You then attach (assume) this role to the EC2 instance via an Instance Profile. AWS will automatically and securely inject short-lived, auto-rotating credentials into the instance metadata service (IMDS), which the AWS SDK inside the app will automatically use.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'AWS Shared Responsibility Model', url: 'https://aws.amazon.com/compliance/shared-responsibility-model/', type: 'ARTICLE', priority: 'S', source: 'AWS', isOfficial: true }
    ]
  }
};
