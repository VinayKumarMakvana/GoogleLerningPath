export const do_06_aws_fund = {
  AWS_FUNDAMENTALS: {
    title: 'AWS Fundamentals',
    description: 'Learn cloud computing concepts, AWS Global Infrastructure, and the AWS Shared Responsibility Model.',
    difficulty: 'BEGINNER',
    estimatedLearnTime: 60,
    prerequisites: ['Linux & Production Environment'],
    learningContent: `
# AWS Fundamentals

Cloud computing is the on-demand delivery of IT resources over the Internet with pay-as-you-go pricing. Amazon Web Services (AWS) is the most broadly adopted cloud platform.

## Global Infrastructure
- **Regions:** A physical location in the world where AWS has multiple data centers (e.g., \`us-east-1\` in N. Virginia).
- **Availability Zones (AZs):** One or more discrete data centers with redundant power, networking, and connectivity in an AWS Region. Deploying across multiple AZs ensures high availability.
- **Edge Locations:** Endpoints for AWS used for caching content (CloudFront CDN) to reduce latency for end users.

## Shared Responsibility Model
Security and Compliance is a shared responsibility between AWS and the customer.
- **Security OF the Cloud:** AWS is responsible for protecting the infrastructure that runs all of the services offered in the AWS Cloud (Hardware, physical security, hypervisors).
- **Security IN the Cloud:** The customer is responsible for guest operating systems, application software, firewalls, and data encryption.
`,
    fullNotes: `
# Detailed Notes: AWS Fundamentals

- **CapEx vs OpEx:** Cloud moves you from Capital Expenses (buying expensive servers upfront) to Operating Expenses (paying only for what you consume).
- **Scalability:**
  - *Vertical Scaling:* Upgrading to a bigger server (more RAM/CPU). Requires downtime.
  - *Horizontal Scaling:* Adding more servers. Highly preferred in the cloud.
- **Elasticity:** The ability to scale out (add servers) when demand is high, and scale in (remove servers) when demand drops, automatically.
`,
    shortNotes: `
- Region = Geographical area. AZ = Distinct data center within a Region.
- AWS handles security OF the cloud (physical hardware).
- You handle security IN the cloud (passwords, patches, app code).
- Horizontal scaling = adding more instances.
- Elasticity = automatically scaling up and down based on load.
`,
    cheatSheet: `
### Key CLI Commands
\`\`\`bash
# Configure AWS CLI credentials
aws configure

# Check caller identity (Who am I?)
aws sts get-caller-identity
\`\`\`
`,
    interviewQuestions: [
      { question: 'Under the AWS Shared Responsibility Model, who is responsible for patching the guest operating system on an EC2 instance?', answerHint: 'The customer is responsible for security IN the cloud, which includes patching the guest OS running on EC2.', type: 'CONCEPTUAL' },
      { question: 'What is the difference between Scalability and Elasticity?', answerHint: 'Scalability is the ability to handle growth (e.g., adding more servers). Elasticity is the ability to automatically scale both up AND down based on current demand, saving costs.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'AWS Shared Responsibility Model', url: 'https://aws.amazon.com/compliance/shared-responsibility-model/', type: 'ARTICLE', priority: 'S', source: 'AWS', isOfficial: true },
      { title: 'AWS Certified Cloud Practitioner Course', url: 'https://www.youtube.com/watch?v=SOTamWNgDKc', type: 'VIDEO', priority: 'A', source: 'FreeCodeCamp', isOfficial: false }
    ]
  }
};
