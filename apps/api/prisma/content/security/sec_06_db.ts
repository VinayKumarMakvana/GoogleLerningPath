export const sec_06_db = {
  DATABASE_SECURITY: {
    title: 'Database & Data Security',
    description: 'Learn encryption at rest vs in transit, field-level encryption, and database access control.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 60,
    prerequisites: ['Cryptography for Software Engineers'],
    learningContent: `
# Database & Data Security

Databases hold the crown jewels of any application. Securing them requires defense in depth.

## 1. Encryption
- **Encryption in Transit:** Data moving over the network is encrypted using TLS (HTTPS/TCP-TLS). Prevents Man-in-the-Middle (MITM) packet sniffing.
- **Encryption at Rest:** The physical hard drives on the database server are encrypted (e.g., AWS EBS Encryption, LUKS). If someone physically steals the server rack, they can't read the data.
- **Field-Level Encryption (Application-Level):** Encryption at rest doesn't protect against SQL injection (because the database transparently decrypts the drive for the attacker's query). Field-level encryption encrypts highly sensitive data (like SSNs or Credit Cards) *inside the application* before sending it to the database. The DB only sees ciphertext.

## 2. Access Control & Network Security
- **Network Segmentation:** A database should NEVER have a public IP address. It must be inside a Private Subnet in a VPC, only accessible by specific application servers.
- **Least Privilege Accounts:** 
  - Do not connect the Web API to the database using the \`postgres\` root user.
  - Create a specific user (e.g., \`api_user\`) that only has \`SELECT\`, \`INSERT\`, \`UPDATE\` on specific tables, and explicitly deny \`DROP TABLE\`.

## 3. Auditing and Backups
- **Audit Logging:** Turn on logging for sensitive tables to track exactly *who* queried *what* and *when*.
- **Secure Backups:** Backups must also be encrypted at rest, and stored in a completely separate, isolated account to prevent ransomware from deleting them.
`,
    fullNotes: `
# Detailed Notes: Data Security

- **Key Management Services (KMS):** When you use Field-Level Encryption, where do you store the secret key? Not in the source code! You store it in a secure KMS (like AWS KMS or HashiCorp Vault). The application requests the key (or asks the KMS to do the encryption) at runtime.
- **Data Masking / Tokenization:** Instead of encrypting a credit card, you can tokenize it. You send the credit card to a highly secure 3rd party (Stripe), and they return a meaningless token (\`tok_12345\`). Your database stores the token. If your database is hacked, the tokens are useless to the hackers.
`,
    shortNotes: `
- Encryption in Transit: Protects data moving over the network (TLS).
- Encryption at Rest: Protects the physical hard drives.
- Field-Level Encryption: Encrypts data in the app before it hits the DB. Protects against SQLi.
- Databases must reside in Private Subnets with no public internet access.
- Use Least Privilege DB users (e.g., deny DROP TABLE for the API user).
- Use Tokenization (like Stripe) to avoid storing highly toxic data entirely.
`,
    cheatSheet: `
### Data Toxicity Levels
- **Public:** Marketing copy.
- **Internal:** Source code, company memos.
- **Confidential:** PII (Names, Emails, Addresses). Requires Encryption at Rest/Transit.
- **Toxic/Highly Restricted:** SSNs, Credit Cards, Passwords, Health Records. Requires Field-Level Encryption/Tokenization and strict auditing.
`,
    interviewQuestions: [
      { question: 'If your database hard drives are encrypted at rest, why is Field-Level Encryption still necessary for highly sensitive data like SSNs?', answerHint: 'Encryption at rest (like AWS EBS encryption) only protects against physical theft of the hard drives. When the database server is running, it transparently decrypts the disk to serve queries. If an attacker exploits a SQL Injection vulnerability in your API, the database will happily decrypt and return the SSNs. Field-Level encryption happens in the application layer, meaning the database only ever stores and sees ciphertext, rendering SQL injection useless for that field.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'AWS KMS Cryptographic Details', url: 'https://docs.aws.amazon.com/kms/latest/cryptographic-details/intro.html', type: 'ARTICLE', priority: 'A', source: 'AWS', isOfficial: true }
    ]
  }
};
