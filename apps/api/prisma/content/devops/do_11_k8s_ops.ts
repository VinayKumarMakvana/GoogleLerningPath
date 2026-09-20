export const do_11_k8s_ops = {
  K8S_PRODUCTION: {
    title: 'Kubernetes Production Operations',
    description: 'Master advanced Kubernetes concepts: Ingress, ConfigMaps, Secrets, Probes, and Helm.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 180,
    prerequisites: ['Kubernetes'],
    learningContent: `
# Kubernetes Production Operations

Running Kubernetes in production requires managing configuration, security, traffic routing, and application health.

## Configuration & Secrets
- **ConfigMap:** Stores non-confidential data in key-value pairs. Pods can consume them as environment variables or configuration files in a volume.
- **Secret:** Similar to ConfigMaps but intended to hold sensitive information (passwords, OAuth tokens, ssh keys). Note: Secrets are only base64 encoded by default, not encrypted!

## Application Health (Probes)
K8s needs to know if your application is healthy.
- **Liveness Probe:** Indicates whether the container is running. If it fails, Kubelet kills the container and restarts it.
- **Readiness Probe:** Indicates whether the container is ready to respond to requests. If it fails, the endpoint controller removes the Pod's IP from all Services (stops sending traffic to it).

## Ingress
A Service (type NodePort or LoadBalancer) exposes an app to the outside world. However, an **Ingress** is a smarter API object that manages external access to the services in a cluster, typically HTTP. It provides load balancing, SSL termination, and name-based virtual hosting (routing based on URL path or domain name).

## Helm
Helm is the package manager for Kubernetes. Instead of managing dozens of raw YAML files, Helm uses "Charts" (templates) to package, configure, and deploy complex K8s applications easily.
`,
    fullNotes: `
# Detailed Notes: K8s Production

- **DaemonSet:** Ensures that a copy of a specific Pod runs on *all* (or some) Nodes. Used for cluster storage, log collection (Fluentd), and node monitoring (Prometheus Node Exporter).
- **StatefulSet:** The workload API object used to manage stateful applications (like databases). Unlike Deployments, a StatefulSet maintains a sticky identity for each of their Pods (e.g., db-0, db-1).
- **Persistent Volume (PV) & Persistent Volume Claim (PVC):** How K8s handles storage. A PV is a piece of storage in the cluster. A PVC is a request for storage by a user.
`,
    shortNotes: `
- ConfigMaps for env vars; Secrets for sensitive data (base64).
- Liveness Probe: Restarts stuck containers.
- Readiness Probe: Stops routing traffic to busy/initializing containers.
- Ingress: HTTP/HTTPS routing, SSL termination (Nginx Ingress Controller is common).
- Helm: K8s package manager using templates (Charts).
- StatefulSet: For databases (sticky identities, ordered deployment).
`,
    cheatSheet: `
\`\`\`bash
# Create a Secret imperatively
kubectl create secret generic db-pass --from-literal=password='supersecret'

# Helm commands
helm search repo prometheus
helm install my-prometheus prometheus-community/prometheus
helm list
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the difference between a Liveness Probe and a Readiness Probe?', answerHint: 'A liveness probe determines if the container is running; if it fails, the container is restarted. A readiness probe determines if the container is ready to accept traffic; if it fails, it is temporarily removed from the Service load balancer (but not killed).', type: 'TECHNICAL' },
      { question: 'Why use an Ingress instead of just exposing a Service as a LoadBalancer?', answerHint: 'A LoadBalancer Service typically provisions a cloud load balancer (like AWS ELB) for *each* service, which gets expensive. An Ingress uses a single load balancer and routes traffic to multiple backend Services based on the HTTP host or path.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'K8s Ingress Documentation', url: 'https://kubernetes.io/docs/concepts/services-networking/ingress/', type: 'ARTICLE', priority: 'S', source: 'K8s Docs', isOfficial: true },
      { title: 'Helm Crash Course', url: 'https://www.youtube.com/watch?v=5_J7RWy4D3o', type: 'VIDEO', priority: 'A', source: 'TechWorld with Nana', isOfficial: false }
    ]
  }
};
