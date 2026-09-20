export const adv_16_k8s_ai = {
  K8S_AI: {
    title: 'Kubernetes for AI Workloads',
    description: 'Orchestrate distributed training, GPU resource scheduling, and scalable model serving on Kubernetes.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 60,
    prerequisites: ['Training Infrastructure', 'High-Performance Model Serving'],
    learningContent: `
# Kubernetes for AI Workloads

## 1. GPUs in Kubernetes
Kubernetes doesn't manage GPUs natively out-of-the-box. You must install the **NVIDIA Device Plugin**.
Once installed, GPUs become a schedulable resource, just like CPU and memory.

\`\`\`yaml
# Requesting a GPU in a Pod
apiVersion: v1
kind: Pod
metadata:
  name: gpu-inference-pod
spec:
  containers:
  - name: inference-container
    image: my-model-server:latest
    resources:
      limits:
        nvidia.com/gpu: 1  # Kubernetes allocates exactly 1 GPU to this pod
\`\`\`

## 2. Advanced GPU Scheduling
- **Node Selectors & Taints:** Ensure ML workloads only schedule on expensive GPU nodes, and standard microservices don't accidentally consume GPU nodes.
- **Multi-Instance GPU (MIG):** Partition a large A100 GPU into smaller slices. Kubernetes can expose these slices as \`nvidia.com/mig-1g.5gb\`, allowing 7 pods to share one physical GPU with hardware isolation.
- **Time-slicing:** Software-based sharing where multiple pods request \`nvidia.com/gpu\`, and the GPU context-switches between them (good for bursty, low-utilization inference; bad for training).

## 3. Distributed Training Operators
Running multi-node distributed training manually on K8s is hard (managing network topologies, rank assignment, restart policies). Use **Kubeflow Training Operator**.

\`\`\`yaml
# PyTorchJob Custom Resource Definition (CRD)
apiVersion: "kubeflow.org/v1"
kind: "PyTorchJob"
metadata:
  name: "distributed-training"
spec:
  pytorchReplicaSpecs:
    Master:
      replicas: 1
      template:
        spec:
          containers:
          - name: pytorch
            image: my-training-image
            resources:
              limits:
                nvidia.com/gpu: 4
    Worker:
      replicas: 3
      template:
        spec:
          containers:
          - name: pytorch
            image: my-training-image
            resources:
              limits:
                nvidia.com/gpu: 4
# The operator automatically sets up MASTER_ADDR, MASTER_PORT, WORLD_SIZE, and RANK environment variables.
\`\`\`

## 4. Autoscaling Inference Workloads
Horizontal Pod Autoscaler (HPA) typically scales on CPU. For ML, scale on custom metrics via KEDA (Kubernetes Event-driven Autoscaling).

- **Queue Depth:** Scale based on the number of pending inference requests in a Kafka/RabbitMQ queue.
- **GPU Utilization (DCGM):** Use the NVIDIA DCGM exporter to expose GPU metrics to Prometheus, then configure HPA to scale when GPU utilization > 80%.

\`\`\`yaml
# KEDA ScaledObject for queue-based scaling
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: inference-scaler
spec:
  scaleTargetRef:
    name: inference-deployment
  minReplicaCount: 1
  maxReplicaCount: 10
  triggers:
  - type: prometheus
    metadata:
      serverAddress: http://prometheus-server
      metricName: triton_queue_delay
      threshold: '50'  # Scale up if queue delay > 50ms
\`\`\`

## 5. Storage for ML
ML requires high-throughput storage for loading datasets and model weights.
- **ReadWriteMany (RWX):** NFS, EFS, or specialized parallel file systems (Lustre, Weka, FSx). Allows multiple worker pods to read the training dataset simultaneously.
- **HostPath/Local Persistent Volumes:** Fastest for caching datasets directly on the GPU node's NVMe drives, avoiding network bottlenecks during training.
`,
    fullNotes: `
# Detailed Notes: K8s for AI

- **GPU Node Pools:** Cloud architectures isolate GPU instances into separate node pools. Apply taints (e.g., \`gpu=true:NoSchedule\`) to the node pool, and require pods to have matching tolerations. This prevents a random NGINX pod from taking up an expensive $32/hr A100 node.
- **Topology Aware Routing:** In multi-GPU multi-node training (e.g., PyTorch DDP), network latency between nodes is the bottleneck. Advanced K8s schedulers attempt to pack pods onto the same physical rack or use cloud-provider specific RDMA/Infiniband networking configurations.
- **Model Fetching (Init Containers):** A common pattern for model serving is an init container that downloads the model weights from S3/GCS into an emptyDir volume before the main inference container starts. This decouples the model artifacts from the Docker image, keeping images small.
`,
    shortNotes: `
- NVIDIA Device Plugin: makes GPUs schedulable resources (nvidia.com/gpu) in K8s
- MIG (Multi-Instance GPU): hardware-level partitioning of large GPUs into smaller slices
- Kubeflow Training Operator: CRDs (PyTorchJob) that automatically configure distributed training env vars
- KEDA: event-driven autoscaling — scale inference pods based on queue depth or GPU utilization, not CPU
- Storage bottleneck: use RWX parallel file systems or local NVMe caching for training datasets
- Init Containers: use to download model weights from object storage at pod startup
`,
    cheatSheet: `
### K8s GPU Request Example
\`\`\`yaml
resources:
  limits:
    nvidia.com/gpu: 2
  requests:
    cpu: "8"
    memory: "32Gi"
tolerations:
- key: "nvidia.com/gpu"
  operator: "Exists"
  effect: "NoSchedule"
\`\`\`

### Common AI K8s Tools
| Tool | Purpose |
|------|---------|
| NVIDIA Device Plugin | GPU scheduling |
| DCGM Exporter | GPU metrics for Prometheus |
| KEDA | GPU/Queue-based autoscaling |
| Kubeflow Training | Distributed training orchestration |
| KServe / Seldon | Serverless model serving |
`,
    interviewQuestions: [
      { question: 'Why is standard Horizontal Pod Autoscaler (HPA) using CPU metrics ineffective for scaling machine learning inference services on Kubernetes?', answerHint: 'ML inference workloads are heavily bound by GPU compute or GPU memory bandwidth, not CPU. A serving pod\'s CPU utilization might be very low (e.g., 10%) while its GPU is pegged at 100% utilization. If standard HPA relies on CPU, it will never scale out the deployment, resulting in increased latency and dropped requests. To scale ML workloads effectively, you must use custom metrics — typically utilizing Prometheus and KEDA to scale based on GPU utilization (via NVIDIA DCGM exporter), inference request queue depth, or custom concurrent request metrics exposed by the inference server (like Triton).', type: 'TECHNICAL' },
      { question: 'How do you handle deploying large (e.g., 20GB+) ML models in Kubernetes without bloating Docker images?', answerHint: 'Baking a 20GB model into a Docker image creates massive pull times, exceeds container registry limits, and couples model versioning with code versioning. The best practice is the Init Container pattern. The main inference container image only contains the code and dependencies (e.g., Triton server, Python). The pod spec includes an Init Container (a lightweight script using AWS CLI or similar) that mounts a shared Volume (e.g., emptyDir). Before the main container starts, the Init Container downloads the specific model weights from an object store (S3/GCS) into the shared volume. When the main container starts, it reads the weights from the mounted volume. This decouples the model from the image.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Kubernetes NVIDIA Device Plugin', url: 'https://github.com/NVIDIA/k8s-device-plugin', type: 'ARTICLE', priority: 'S', source: 'NVIDIA', isOfficial: true, description: 'Official documentation for scheduling GPUs on K8s.' },
      { title: 'Kubeflow Training Operator', url: 'https://www.kubeflow.org/docs/components/training/', type: 'ARTICLE', priority: 'A', source: 'Kubeflow', isOfficial: true, description: 'Orchestrating PyTorch, TF, and MPI distributed jobs on K8s.' }
    ]
  }
};
