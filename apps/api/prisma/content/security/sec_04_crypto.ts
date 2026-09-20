export const sec_04_crypto = {
  CRYPTOGRAPHY: {
    title: 'Cryptography for Software Engineers',
    description: 'Learn hashing, symmetric vs asymmetric encryption, digital signatures, and password storage.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Authentication & Authorization'],
    learningContent: `
# Cryptography for Software Engineers

You do not need to invent math, but you MUST know which cryptographic tools to use and when. **Rule #1: Never roll your own crypto.**

## 1. Hashing (One-Way)
A hash function takes an input of any size and produces a fixed-size string (digest). It is mathematically impossible to reverse a hash to get the original input.
- **Use Case:** Verifying file integrity, storing passwords.
- **Algorithms:** SHA-256, SHA-3. (Never use MD5 or SHA-1, they are broken).
- **Password Hashing:** Standard hashing is too fast (hackers can brute-force billions of hashes per second). Passwords MUST use slow, compute-intensive hashing algorithms with a unique **Salt** (random string) per user.
- **Standard Password Algos:** Argon2 (best), bcrypt, scrypt.

## 2. Symmetric Encryption (Two-Way, Same Key)
The same secret key is used to both encrypt and decrypt the data.
- **Use Case:** Encrypting data at rest (Databases, Hard drives).
- **Algorithm:** AES-256 (GCM).
- **Pros/Cons:** Extremely fast, but you must securely distribute the secret key to anyone who needs to decrypt it (Key Distribution Problem).

## 3. Asymmetric Encryption (Two-Way, Two Keys)
Also called Public Key Cryptography. You generate a mathematically linked pair of keys: a Public Key (shared with the world) and a Private Key (kept strictly secret).
- Data encrypted with the Public Key can ONLY be decrypted by the Private Key.
- **Use Case:** Secure communication over the internet (TLS/HTTPS), establishing symmetric keys.
- **Algorithms:** RSA (2048+ bit), ECC (Elliptic Curve Cryptography - much smaller and faster than RSA).

## 4. Digital Signatures
The reverse of asymmetric encryption.
- You "sign" a document using your **Private Key**.
- Anyone can verify the signature using your **Public Key**.
- This proves two things: **Authenticity** (it definitely came from you) and **Integrity** (the document was not altered). Used in JWTs (RS256).
`,
    fullNotes: `
# Detailed Notes: Cryptography

- **Salting vs Peppering:** 
  - *Salt:* A random, unique string generated per user, appended to the password before hashing, and stored in the database next to the hash. It defeats Rainbow Table attacks (pre-computed hash databases).
  - *Pepper:* A single, secret string added to all passwords before hashing, but stored in a secure HSM (Hardware Security Module) or Key Management System (AWS KMS), NOT the database. If the DB is stolen, they still can't crack the passwords without the pepper.
- **Forward Secrecy:** In modern TLS, if an attacker records all your encrypted internet traffic for 5 years, and then finally steals your server's Private RSA Key, they STILL cannot decrypt the past traffic. This is because modern TLS generates ephemeral (temporary) session keys using Diffie-Hellman, discarding them immediately.
`,
    shortNotes: `
- Hashing: One-way. (SHA-256).
- Password Hashing: Slow, One-way, Salted. (Argon2, bcrypt).
- Symmetric Encryption: Fast, one shared key. (AES-GCM).
- Asymmetric Encryption: Slow, Public/Private key pair. (RSA, ECC).
- Digital Signatures: Signed with Private Key, verified with Public Key. Ensures Authenticity and Integrity.
- Never write your own cryptography algorithms. Use established libraries (libsodium).
`,
    cheatSheet: `
### What Algorithm to Use?
- Password Storage: **Argon2id** (or bcrypt)
- Symmetric Encryption (Data): **AES-256-GCM** (or ChaCha20-Poly1305)
- Digital Signatures: **Ed25519** (or ECDSA)
- Hashing (Integrity): **SHA-3** or **SHA-256**
`,
    interviewQuestions: [
      { question: 'Why should you never use SHA-256 to hash user passwords?', answerHint: 'SHA-256 is designed to be extremely fast (capable of hashing gigabytes per second). A hacker with a modern GPU can brute force billions of SHA-256 hashes per second. Passwords must be hashed using a computationally expensive "Key Derivation Function" (like Argon2 or bcrypt) that is intentionally slow (e.g., takes 300ms per hash), rendering brute-force attacks economically unfeasible.', type: 'TECHNICAL' },
      { question: 'How do Digital Signatures work?', answerHint: 'A digital signature uses asymmetric cryptography. The sender generates a hash of the document, then encrypts that hash using their Private Key. This encrypted hash is the signature. The receiver uses the sender\'s Public Key to decrypt the signature back into the hash. They then independently hash the document themselves. If the two hashes match, it guarantees the document was not tampered with (Integrity) and absolutely originated from the owner of the Private Key (Authenticity).', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Cryptographic Right Answers', url: 'https://latacora.micro.blog/2018/04/03/cryptographic-right-answers.html', type: 'ARTICLE', priority: 'S', source: 'Latacora', isOfficial: false }
    ]
  }
};
