export const do_09_gcp = {
  GCP_FUNDAMENTALS: {
    title: 'GCP Fundamentals',
    description: 'Understand Google Cloud Platform equivalents and core architectural differences from AWS.',
    difficulty: 'BEGINNER',
    estimatedLearnTime: 60,
    prerequisites: ['AWS Fundamentals'],
    learningContent: `
# GCP Fundamentals

Google Cloud Platform (GCP) is the third largest cloud provider behind AWS and Azure. It is highly regarded for its networking, machine learning, and Kubernetes (GKE) capabilities.

## Global Infrastructure
Like AWS, GCP uses Regions and Zones. A key difference in GCP is its **Global VPC network**. In AWS, a VPC is bound to a single Region. In GCP, a VPC spans all regions globally, making multi-region deployments significantly easier.

## Service Equivalents
When moving from AWS to GCP, understanding the terminology mapping is key:
- **Compute:** EC2 -> Compute Engine (GCE)
- **Object Storage:** S3 -> Cloud Storage (GCS)
- **Managed Kubernetes:** EKS -> Google Kubernetes Engine (GKE)
- **Serverless Compute:** Lambda -> Cloud Functions / Cloud Run
- **Relational DB:** RDS -> Cloud SQL
- **NoSQL DB:** DynamoDB -> Firestore / Cloud Bigtable
- **IAM:** AWS IAM -> Cloud IAM
`,
    fullNotes: `
# Detailed Notes: GCP

- **Projects:** GCP organizes resources into "Projects". Every resource must belong to a project. Projects can be grouped into Folders, which belong to an Organization. This provides a very clean billing and isolation boundary (unlike AWS where Accounts form the primary boundary).
- **Cloud Run:** GCP's standout serverless offering. Unlike Lambda which runs functions, Cloud Run runs any stateless Docker container entirely serverless (scaling to zero).
- **GKE (Google Kubernetes Engine):** Since Google invented Kubernetes, GKE is widely considered the most advanced and stable managed Kubernetes service in the market.
`,
    shortNotes: `
- GCP VPCs are global (span multiple regions).
- Resources are organized into Projects.
- Compute Engine = VMs. Cloud Storage = Object Storage.
- Cloud Run = Serverless Docker containers.
- GKE is the premier managed Kubernetes offering.
`,
    cheatSheet: `
\`\`\`bash
# gcloud CLI commands
gcloud init # Authenticate and setup
gcloud config set project my-project-id # Switch projects
gcloud compute instances list # List VMs
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the fundamental difference between an AWS VPC and a GCP VPC?', answerHint: 'An AWS VPC is regional (restricted to a single region). A GCP VPC is global (spans all regions, though subnets are regional).', type: 'TECHNICAL' },
      { question: 'What is Google Cloud Run?', answerHint: 'A fully managed serverless platform that automatically scales stateless HTTP containers. You provide a Docker container, and GCP handles the provisioning, routing, and scaling to zero.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'AWS to GCP Service Mapping', url: 'https://cloud.google.com/docs/get-started/aws-gcp-landscape', type: 'ARTICLE', priority: 'S', source: 'GCP Docs', isOfficial: true },
      { title: 'GCP Crash Course', url: 'https://www.youtube.com/watch?v=FIhEwXgI6EA', type: 'VIDEO', priority: 'A', source: 'FreeCodeCamp', isOfficial: false }
    ]
  }
};
