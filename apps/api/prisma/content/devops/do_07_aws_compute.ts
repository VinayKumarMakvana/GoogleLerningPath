export const do_07_aws_compute = {
  AWS_COMPUTE_STORAGE: {
    title: 'AWS Compute, Storage & Networking',
    description: 'Master EC2, S3, and VPCs—the core foundational services of AWS.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 120,
    prerequisites: ['AWS Fundamentals'],
    learningContent: `
# AWS Compute, Storage & Networking

## EC2 (Elastic Compute Cloud)
EC2 provides secure, resizable compute capacity (Virtual Machines) in the cloud. 
- You choose the OS (AMI - Amazon Machine Image).
- You choose the instance type (CPU/RAM ratio).
- You configure Security Groups (virtual firewalls that control inbound and outbound traffic).

## S3 (Simple Storage Service)
S3 is an object storage service offering industry-leading scalability, data availability, security, and performance.
- Objects (files) are stored in Buckets.
- Universally flat namespace; folders are just key name prefixes.
- Great for storing images, backups, and hosting static websites.

## VPC (Virtual Private Cloud)
A VPC is a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define.
- **Subnets:** Public subnets have access to the Internet (via Internet Gateway). Private subnets do not.
- Place databases in private subnets; place load balancers in public subnets.
`,
    fullNotes: `
# Detailed Notes: Compute & Storage

- **EC2 Pricing Models:** 
  - *On-Demand:* Pay by the second.
  - *Reserved Instances:* Commit to 1-3 years for massive discounts.
  - *Spot Instances:* Bid on unused capacity for up to 90% discount, but AWS can terminate them with 2 minutes notice (use only for stateless, resilient workloads).
- **S3 Storage Classes:** Standard, Infrequent Access (IA), Glacier (for long-term archiving).
- **EBS (Elastic Block Store):** Network drives you attach to your EC2 instances. They are locked to a specific AZ.
`,
    shortNotes: `
- EC2 = Virtual Machines. Use Security Groups to act as firewalls.
- S3 = Object storage (files). Globally unique bucket names.
- EBS = Block storage (Hard drives for EC2).
- VPC = Private network. Use Public subnets for load balancers/web servers, Private subnets for databases.
- Spot Instances are cheap but can be terminated at any time.
`,
    cheatSheet: `
\`\`\`bash
# S3 CLI Commands
aws s3 ls # List buckets
aws s3 cp my-file.txt s3://my-bucket/ # Upload a file
aws s3 sync ./local-folder s3://my-bucket/ # Sync a folder

# EC2 CLI
aws ec2 describe-instances # List instances
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the difference between Amazon S3 and Amazon EBS?', answerHint: 'EBS is block storage attached to a single EC2 instance, acting like a hard drive (fast, requires formatting). S3 is object storage accessed over the network/HTTP, used for storing files, backups, and static assets (slower, infinitely scalable).', type: 'TECHNICAL' },
      { question: 'How do you secure a database in an AWS VPC?', answerHint: 'Place the database in a Private Subnet (no route to an Internet Gateway). Configure its Security Group to only allow inbound traffic on the database port (e.g., 5432) from the Security Group of the application servers.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Amazon EC2 Documentation', url: 'https://docs.aws.amazon.com/ec2/', type: 'ARTICLE', priority: 'S', source: 'AWS', isOfficial: true },
      { title: 'AWS VPC Masterclass', url: 'https://www.youtube.com/watch?v=5_bE6D9MAZc', type: 'VIDEO', priority: 'A', source: 'YouTube', isOfficial: false }
    ]
  }
};
