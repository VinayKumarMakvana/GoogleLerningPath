export const sec_09_k8s = {
  CONTAINER_K8S_SECURITY: {
    title: 'Docker & Kubernetes Security',
    description: 'Learn container escapes, image scanning, rootless containers, and Kubernetes RBAC/Network Policies.',
    difficulty: 'EXPERT',
    estimatedLearnTime: 120,
    prerequisites: ['Cloud Security — AWS & GCP'],
    learningContent: `
# Docker & Kubernetes Security

Containers share the host operating system's kernel. If a container is compromised, the attacker can potentially "escape" to the host machine.

## 1. Docker Security Best Practices
- **Run as Non-Root:** By default, Docker runs processes as root. If an attacker breaches the app, they have root access. You MUST create a dedicated unprivileged user inside the Dockerfile (\`USER appuser\`).
- **Minimal Base Images:** Don't use \`ubuntu:latest\` which contains hundreds of unnecessary tools (like bash, curl, wget) that hackers can use. Use \`alpine\` or Google's \`distroless\` images which contain ONLY your app and its runtime.
- **Image Scanning:** Scan docker images for known OS vulnerabilities (CVEs) before deploying.

## 2. Kubernetes Security Concepts
Kubernetes (K8s) is a massive orchestration platform with a massive attack surface.
- **K8s API Server:** The brain of the cluster. It must be heavily protected, ideally locked behind a private network.
- **RBAC (Role-Based Access Control):** Define exactly which users and which pods (ServiceAccounts) can talk to the K8s API. (e.g., Prevent a random web pod from having the permission to read K8s Secrets).
- **Network Policies:** By default, every pod in a K8s cluster can talk to every other pod. A Network Policy acts like a firewall between pods. You must configure them to explicitly allow only intended traffic (e.g., Frontend Pod can only talk to Backend Pod).
- **K8s Secrets:** By default, K8s secrets are stored in etcd as base64 encoded strings (NOT encrypted). You must enable Encryption at Rest in etcd, or use an external KMS.
`,
    fullNotes: `
# Detailed Notes: Container Security

- **Container Escapes:** If a container is run in \`--privileged\` mode, or mounts the host's Docker socket (\`/var/run/docker.sock\`), an attacker who gains execution inside the container can trivially escape it, taking full root control of the underlying EC2 node and all other containers on it.
- **Security Contexts:** In Kubernetes, you enforce security at the pod level using a SecurityContext. You can mandate \`runAsNonRoot: true\`, drop unnecessary Linux capabilities (like \`NET_RAW\` which allows packet sniffing), and set the root filesystem to \`readOnly: true\`.
`,
    shortNotes: `
- Containers share the host kernel.
- Never run containers as root (\`USER nonroot\`).
- Use Distroless/Alpine images to reduce the attack surface (no bash/curl).
- Don't run containers in \`--privileged\` mode.
- K8s RBAC limits who/what can query the API server.
- K8s Network Policies isolate pod-to-pod traffic (Zero Trust).
- Base64 is not encryption. Encrypt K8s Secrets via etcd or external KMS.
`,
    cheatSheet: `
### Secure Dockerfile Example
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
CMD ["node", "server.js"]
\`\`\`
`,
    interviewQuestions: [
      { question: 'Why is running a Docker container as "root" dangerous, even though the container is isolated?', answerHint: 'Containers are not virtual machines; they share the host OS kernel. If a container runs as root, and an attacker finds a vulnerability (like a kernel exploit or a misconfigured capability) to escape the container, they will emerge on the host node as the root user, gaining complete control over the entire machine and all other containers.', type: 'TECHNICAL' },
      { question: 'What is a Kubernetes Network Policy and why is it essential for cluster security?', answerHint: 'By default, Kubernetes has a flat network where any pod can communicate with any other pod in the cluster. If a frontend pod is breached, the attacker can port-scan and attack the internal database pods directly. A Network Policy acts as a micro-firewall, explicitly denying all traffic by default and only allowing specific, required pod-to-pod communication.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Kubernetes Security Best Practices', url: 'https://kubernetes.io/docs/concepts/security/security-checklist/', type: 'ARTICLE', priority: 'S', source: 'Kubernetes', isOfficial: true }
    ]
  }
};
