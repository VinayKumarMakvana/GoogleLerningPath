export const do_08_aws_data = {
  AWS_DB_IAM: {
    title: 'AWS Databases, IAM & Application Services',
    description: 'Learn RDS, DynamoDB, Identity and Access Management (IAM), and serverless architectures.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 120,
    prerequisites: ['AWS Compute, Storage & Networking'],
    learningContent: `
# AWS Databases, IAM & Serverless

## IAM (Identity and Access Management)
IAM enables you to manage access to AWS services and resources securely.
- **Users:** End users (people or services).
- **Groups:** A collection of users.
- **Roles:** An identity with permission policies that determines what the identity can and cannot do. (e.g., Give an EC2 instance a Role to allow it to read from S3 without hardcoding credentials).
- **Policies:** JSON documents that define permissions.

## Databases
- **RDS (Relational Database Service):** Managed Postgres, MySQL, Oracle, etc. AWS handles automated backups, patching, and multi-AZ deployments for high availability.
- **DynamoDB:** A fast and flexible NoSQL database service for any scale. Fully managed, serverless, single-digit millisecond latency.

## Application Services & Serverless
- **AWS Lambda:** Run code without thinking about servers. You pay only for the compute time you consume (by the millisecond).
- **API Gateway:** Create, publish, maintain, monitor, and secure APIs at any scale. Often paired with Lambda.
`,
    fullNotes: `
# Detailed Notes: IAM & Databases

- **Principle of Least Privilege:** When creating IAM policies, always grant only the permissions required to perform a task, and nothing more.
- **IAM Roles vs Users:** Never store long-term User credentials (Access Keys) on an EC2 instance. Always attach an IAM Role to the instance. The AWS SDK will automatically use the temporary credentials provided by the role.
- **RDS Multi-AZ:** Used for Disaster Recovery. AWS creates a standby database in another AZ and synchronously replicates data. If the master fails, AWS automatically fails over to the standby.
- **Read Replicas:** Used for scaling read-heavy workloads (asynchronous replication).
`,
    shortNotes: `
- IAM: Users (people), Roles (machines/services), Policies (JSON permissions).
- Always use the Principle of Least Privilege.
- RDS = Managed Relational DB. Multi-AZ = High Availability/Failover. Read Replica = Read Scaling.
- DynamoDB = Managed NoSQL DB.
- Lambda = Serverless compute. Pay per millisecond of execution.
`,
    cheatSheet: `
\`\`\`json
// Example IAM Policy allowing read access to a specific S3 bucket
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::my-special-bucket",
        "arn:aws:s3:::my-special-bucket/*"
      ]
    }
  ]
}
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the Principle of Least Privilege?', answerHint: 'A security concept where a user or system is given only the minimum levels of access necessary to complete its function.', type: 'CONCEPTUAL' },
      { question: 'How do you allow an application running on an EC2 instance to securely read files from an S3 bucket?', answerHint: 'Create an IAM Role with a policy granting read access to the S3 bucket. Attach that IAM Role to the EC2 instance. The application (using the AWS SDK) will automatically assume the role and authenticate without hardcoded keys.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'AWS IAM Best Practices', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html', type: 'ARTICLE', priority: 'S', source: 'AWS', isOfficial: true }
    ]
  }
};
