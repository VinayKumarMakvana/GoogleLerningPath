export const do_12_infra = {
  INFRA_AS_CODE: {
    title: 'Infrastructure, Deployment & Reliability',
    description: 'Learn Infrastructure as Code (Terraform), Observability, and Site Reliability Engineering (SRE) principles.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 120,
    prerequisites: ['AWS Compute, Storage & Networking', 'CI/CD & GitHub Actions'],
    learningContent: `
# Infrastructure, Deployment & Reliability

## Infrastructure as Code (IaC)
Manually clicking through the AWS console to create servers and databases is prone to human error, untrackable, and impossible to replicate perfectly across environments (dev, staging, prod).

IaC is the process of managing and provisioning computing infrastructure through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools.

### Terraform
Terraform by HashiCorp is the industry standard for IaC. It uses a declarative configuration language (HCL).
- **State:** Terraform keeps a state file (\`terraform.tfstate\`) to map real-world resources to your configuration.
- **Providers:** Plugins that allow Terraform to interact with cloud APIs (AWS, GCP, GitHub).

## Site Reliability Engineering (SRE)
SRE is what happens when you ask a software engineer to design an operations team.
- **SLIs (Service Level Indicators):** A carefully defined quantitative measure of some aspect of the level of service that is provided (e.g., error rate, request latency).
- **SLOs (Service Level Objectives):** A target value or range of values for a service level that is measured by an SLI (e.g., 99.9% of requests will succeed).
- **Error Budget:** 100% is the wrong reliability target. An error budget allows teams to balance feature velocity with reliability.
`,
    fullNotes: `
# Detailed Notes: IaC & Reliability

- **Terraform Workflow:**
  1. \`terraform init\`: Initializes the working directory and downloads providers.
  2. \`terraform plan\`: Creates an execution plan, showing you exactly what will change.
  3. \`terraform apply\`: Executes the actions proposed in a Terraform plan.
- **State Management:** In production, the Terraform state file MUST be stored remotely (e.g., in an S3 bucket) and locked (e.g., using DynamoDB) so multiple engineers don't overwrite each other's changes. NEVER commit \`terraform.tfstate\` to Git as it may contain plaintext secrets.
- **Observability:** You cannot maintain reliability if you cannot see the system. Logs (events over time), Metrics (numerical representations of data over time), and Traces (the lifecycle of a single request across multiple services) are the three pillars of observability.
`,
    shortNotes: `
- IaC: Manage infrastructure using code (declarative).
- Terraform: Industry standard IaC tool.
- Terraform State must be stored securely and remotely.
- SLI = What you measure (latency).
- SLO = The target you agree upon (99.9% under 200ms).
- SLA = The legal contract (what happens if SLO is missed).
`,
    cheatSheet: `
\`\`\`hcl
# main.tf (Terraform)
provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "HelloWorld"
  }
}
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the purpose of the Terraform state file?', answerHint: 'It acts as a database mapping the real-world cloud resources to your HCL configuration. It allows Terraform to know what has changed, what needs to be created, and what needs to be destroyed.', type: 'TECHNICAL' },
      { question: 'Explain the difference between an SLI, an SLO, and an SLA.', answerHint: 'SLI is the metric you measure (e.g., uptime). SLO is the internal target for that metric (e.g., 99.9% uptime). SLA is a business agreement containing the SLO and the financial consequences if the target is missed.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Introduction to Terraform', url: 'https://developer.hashicorp.com/terraform/intro', type: 'ARTICLE', priority: 'S', source: 'HashiCorp', isOfficial: true },
      { title: 'Terraform Course for Beginners', url: 'https://www.youtube.com/watch?v=7xngnjfIlK4', type: 'VIDEO', priority: 'A', source: 'FreeCodeCamp', isOfficial: false }
    ]
  }
};
