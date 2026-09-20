export const adv_06_training_infra = {
  TRAINING_INFRA: {
    title: 'Training Infrastructure',
    description: 'Master ML training infrastructure: job scheduling, compute clusters, resource management, checkpointing, and fault-tolerant training.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 75,
    prerequisites: ['Model Registry & Reproducibility', 'GPU Computing & CUDA Fundamentals'],
    learningContent: `
# Training Infrastructure

## 1. Training Job Types
| Type | When | Duration | Resource |
|------|------|---------|---------|
| Development | Exploratory training | Minutes–hours | Single GPU |
| Scheduled batch | Nightly model retraining | Hours | Multi-GPU |
| Distributed | Large model or dataset | Hours–days | GPU cluster |
| Continuous | Online learning from stream | Ongoing | Dedicated |

## 2. Kubernetes Training Jobs
\`\`\`yaml
# Kubernetes Job for ML training
apiVersion: batch/v1
kind: Job
metadata:
  name: recommendation-training-v5
spec:
  parallelism: 1
  completions: 1
  backoffLimit: 2  # Retry up to 2 times on failure
  template:
    spec:
      restartPolicy: OnFailure
      containers:
      - name: trainer
        image: myregistry/ml-trainer:v5.2
        resources:
          requests:
            cpu: "8"
            memory: "32Gi"
            nvidia.com/gpu: "4"
          limits:
            nvidia.com/gpu: "4"
        env:
        - name: MLFLOW_TRACKING_URI
          value: "http://mlflow:5000"
        - name: DATASET_VERSION
          value: "v3.2"
        volumeMounts:
        - name: training-data
          mountPath: /data
        - name: checkpoint-dir
          mountPath: /checkpoints
      volumes:
      - name: training-data
        persistentVolumeClaim:
          claimName: training-data-pvc
      - name: checkpoint-dir
        persistentVolumeClaim:
          claimName: checkpoint-pvc
\`\`\`

## 3. Checkpointing Strategy
\`\`\`python
import torch, os

class CheckpointManager:
    def __init__(self, checkpoint_dir: str, keep_last_n: int = 3):
        self.checkpoint_dir = checkpoint_dir
        self.keep_last_n = keep_last_n
        os.makedirs(checkpoint_dir, exist_ok=True)

    def save(self, epoch: int, model, optimizer, scheduler, metrics: dict):
        path = f"{self.checkpoint_dir}/checkpoint_epoch_{epoch:04d}.pt"
        torch.save({
            'epoch': epoch,
            'model_state_dict': model.state_dict(),
            'optimizer_state_dict': optimizer.state_dict(),
            'scheduler_state_dict': scheduler.state_dict(),
            'metrics': metrics,
            'random_state': torch.get_rng_state()
        }, path)
        self._cleanup_old_checkpoints()
        return path

    def _cleanup_old_checkpoints(self):
        checkpoints = sorted(os.listdir(self.checkpoint_dir))
        for old in checkpoints[:-self.keep_last_n]:
            os.remove(f"{self.checkpoint_dir}/{old}")

    def load_latest(self, model, optimizer, scheduler):
        checkpoints = sorted(os.listdir(self.checkpoint_dir))
        if not checkpoints: return 0
        path = f"{self.checkpoint_dir}/{checkpoints[-1]}"
        state = torch.load(path, map_location='cpu')
        model.load_state_dict(state['model_state_dict'])
        optimizer.load_state_dict(state['optimizer_state_dict'])
        scheduler.load_state_dict(state['scheduler_state_dict'])
        torch.set_rng_state(state['random_state'])
        return state['epoch'] + 1  # Resume from next epoch
\`\`\`

## 4. Spot/Preemptible Instance Strategy
Cloud providers offer 60-90% cheaper spot/preemptible instances that can be reclaimed with 30s-2min notice.

For ML training on spot instances:
1. Checkpoint every N steps (not just every epoch)
2. Save to persistent storage (not instance-local disk)
3. Use automatic instance restart with checkpoint recovery
4. Monitor for preemption signals and checkpoint immediately

\`\`\`python
import signal

def handle_sigterm(signum, frame):
    """Handle spot instance preemption signal"""
    print("SIGTERM received — saving checkpoint before shutdown")
    checkpoint_manager.save(current_epoch, model, optimizer, scheduler, metrics)
    sys.exit(0)

signal.signal(signal.SIGTERM, handle_sigterm)
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Training Infrastructure

- **Spot/Reserved/On-Demand:** On-demand: full price, always available. Reserved (1-3yr): 40-60% cheaper. Spot/Preemptible: 60-90% cheaper but can be reclaimed. Strategy: use reserved for production training, spot for experimentation.
- **Training Data Loading Bottleneck:** GPU training often bottlenecks on data loading (GPU waits for CPU to prepare batches). Profile with PyTorch profiler: if DataLoader time > forward/backward time, increase num_workers, use memory-mapped datasets (HDF5, memmap), or precompute and cache features.
`,
    shortNotes: `
- Checkpoint frequently to persistent storage — not just at epoch boundaries
- Spot instances: 60-90% cheaper, can be reclaimed with ~30s notice
- Handle SIGTERM signal for graceful preemption handling
- Keep checkpoints: model weights + optimizer + scheduler + RNG state + epoch
- Clean up old checkpoints (keep last N) to manage storage costs
- Data loading bottleneck: profile with PyTorch profiler before assuming GPU is the limit
`,
    cheatSheet: `
### Checkpoint Best Practices
\`\`\`python
# Always save: model, optimizer, scheduler, metrics, epoch, RNG state
# Save to persistent storage (S3/GCS/PVC), not local disk
# Checkpoint interval: every N steps, not just epochs (for long training runs)
# Keep last 3 checkpoints (disk efficiency vs rollback capability)
# Immediately checkpoint on SIGTERM (spot preemption signal)
\`\`\`
### Training Job Resource Sizing
| Resource | Small | Medium | Large |
|----------|-------|--------|-------|
| CPU | 4-8 cores | 16-32 cores | 64+ cores |
| Memory | 16-32 GB | 64-128 GB | 256+ GB |
| GPU | 1x A10G | 4x A100 40GB | 8×A100 80GB |
| Storage | 100 GB | 1 TB | 10+ TB |
`,
    interviewQuestions: [
      { question: 'How do you design a fault-tolerant ML training job that can survive spot instance preemption?', answerHint: 'Design with the assumption that the instance can die at any moment: (1) Checkpoint frequently to persistent storage (S3/PVC) — every N steps (e.g., 500 steps for long training), not just at epoch end. (2) Save complete state: model weights + optimizer state + scheduler state + RNG state + current epoch/step. (3) Handle SIGTERM gracefully: register a signal handler that saves an emergency checkpoint on receipt of the preemption signal (2min warning on AWS Spot, 30s on GCP). (4) On restart, automatically detect and load the latest checkpoint before continuing. (5) Design training to be idempotent — replaying the same steps multiple times should not corrupt state.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'PyTorch Checkpointing Guide', url: 'https://pytorch.org/tutorials/recipes/recipes/saving_and_loading_a_general_checkpoint.html', type: 'ARTICLE', priority: 'S', source: 'PyTorch', isOfficial: true, description: 'Official PyTorch guide to saving and loading training checkpoints.' }
    ]
  }
};
