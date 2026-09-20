export const do_10_k8s = {
  K8S_FUNDAMENTALS: {
    title: 'Kubernetes',
    description: 'Learn container orchestration, Pods, Deployments, and Services.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 180,
    prerequisites: ['Docker', 'AWS Compute, Storage & Networking'],
    learningContent: `
# Kubernetes (K8s)

Docker is great for running a few containers. But what if you have 1,000 containers across 50 servers? What happens if a server crashes? How do you route traffic? 

Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications (Container Orchestration).

## Architecture
- **Control Plane (Master Nodes):** Manages the cluster (API Server, Scheduler, etcd, Controller Manager).
- **Worker Nodes:** The actual servers that run your containers (Kubelet, Kube-proxy, Container Runtime).

## Core Objects
1. **Pod:** The smallest deployable unit in K8s. A Pod encapsulates one (or more) containers, storage resources, a unique network IP, and options that govern how the container(s) should run.
2. **Deployment:** Manages a set of identical Pods. It ensures the correct number of Pods are running and handles zero-downtime rolling updates.
3. **Service:** An abstract way to expose an application running on a set of Pods as a network service. Since Pods are ephemeral (IPs change), Services provide a stable IP/DNS name to route traffic to them.
`,
    fullNotes: `
# Detailed Notes: Kubernetes

- **Declarative vs Imperative:** K8s is declarative. You write a YAML file describing the *Desired State* (e.g., "I want 3 replicas of the Node API"). You submit it to the API server. K8s constantly works to make the *Current State* match the *Desired State*.
- **ReplicaSet:** Created by Deployments to ensure a specified number of pod replicas are running at any given time.
- **Namespaces:** Virtual clusters backed by the same physical cluster. Useful for separating environments (dev/prod) or teams.
- **kubectl:** The command-line tool used to communicate with the Kubernetes API server.
`,
    shortNotes: `
- Container Orchestration platform.
- Declarative configuration (YAML).
- Pod = Smallest unit (1+ containers).
- Deployment = Manages Pods, scaling, and rolling updates.
- Service = Stable IP/DNS for a group of volatile Pods.
- Control Plane (Master) manages Worker Nodes.
`,
    cheatSheet: `
\`\`\`bash
# Apply a YAML configuration
kubectl apply -f deployment.yaml

# Inspect resources
kubectl get pods
kubectl get svc
kubectl describe pod <pod-name>

# Troubleshooting
kubectl logs <pod-name>
kubectl exec -it <pod-name> -- /bin/sh
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is a Pod in Kubernetes?', answerHint: 'The smallest deployable unit that can be created and managed in K8s. It represents a single instance of a running process in your cluster, usually containing one container (but can contain multiple tightly-coupled containers).', type: 'TECHNICAL' },
      { question: 'Why do we need Services in Kubernetes? Why not just connect directly to Pod IPs?', answerHint: 'Pods are ephemeral; they are created and destroyed frequently (scaling, node failure, updates), causing their IPs to change. A Service provides a stable, abstract IP and DNS name that load balances traffic across a dynamic set of Pods.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Kubernetes Concepts', url: 'https://kubernetes.io/docs/concepts/', type: 'ARTICLE', priority: 'S', source: 'K8s Docs', isOfficial: true },
      { title: 'Kubernetes Crash Course', url: 'https://www.youtube.com/watch?v=X48VuDVv0do', type: 'VIDEO', priority: 'A', source: 'TechWorld with Nana', isOfficial: false }
    ]
  }
};
