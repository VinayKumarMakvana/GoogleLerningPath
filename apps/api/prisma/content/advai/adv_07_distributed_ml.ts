export const adv_07_distributed_ml = {
  DISTRIBUTED_ML: {
    title: 'Distributed ML Training',
    description: 'Master data parallelism, model parallelism, pipeline parallelism, gradient synchronization, and distributed training frameworks.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Training Infrastructure'],
    learningContent: `
# Distributed ML Training

## 1. Why Distribute Training?
- Model doesn't fit in single GPU memory → need model parallelism
- Training is too slow on one GPU → need data parallelism
- Both → need combined parallelism strategies

## 2. Data Parallelism (DDP)
Split the dataset across N GPUs. Each GPU has a full copy of the model.

**Gradient synchronization:** After each backward pass, gradients are averaged across all GPUs using All-Reduce (ring algorithm). Each GPU then takes the same optimization step.

\`\`\`python
import torch
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP
from torch.utils.data.distributed import DistributedSampler

def train_ddp(rank: int, world_size: int):
    # Initialize process group
    dist.init_process_group(backend='nccl', rank=rank, world_size=world_size)

    # Move model to GPU for this process
    model = MyModel().to(rank)
    model = DDP(model, device_ids=[rank])

    # DistributedSampler ensures each GPU sees different data
    dataset = MyDataset()
    sampler = DistributedSampler(dataset, num_replicas=world_size, rank=rank)
    loader = DataLoader(dataset, batch_size=64, sampler=sampler)

    optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3)

    for epoch in range(10):
        sampler.set_epoch(epoch)  # Shuffle differently each epoch
        for batch in loader:
            optimizer.zero_grad()
            loss = model(batch['x'].to(rank), batch['y'].to(rank))
            loss.backward()  # Gradients automatically synchronized across GPUs
            optimizer.step()

    dist.destroy_process_group()

# Launch with torchrun
# torchrun --nproc_per_node=4 train.py
import torch.multiprocessing as mp
mp.spawn(train_ddp, args=(4,), nprocs=4)
\`\`\`

## 3. Model Parallelism
When a single model layer (e.g., a Transformer weight matrix) doesn't fit on one GPU.

**Tensor Parallelism:** Split a weight matrix W across GPUs column-wise or row-wise.
- Megatron-LM style: attention heads split across GPUs
- Each GPU computes partial results, then All-Reduce to combine

**Pipeline Parallelism:** Split model layers across GPUs in a pipeline:
- GPU 0: layers 1-8
- GPU 1: layers 9-16
- GPU 2: layers 17-24
- GPU 3: layers 25-32

**Micro-batching:** Split each batch into micro-batches. GPU 1 processes micro-batch 2 while GPU 0 processes micro-batch 3 — reduces GPU idle time (bubble).

## 4. Training Frameworks
\`\`\`python
# DeepSpeed: Microsoft's distributed training library
from deepspeed import DeepSpeedEngine
import deepspeed

model_engine, optimizer, _, _ = deepspeed.initialize(
    model=model,
    config={
        "train_batch_size": 256,
        "fp16": {"enabled": True},
        "zero_optimization": {
            "stage": 3,  # ZeRO-3: shard parameters across GPUs
            "offload_optimizer": {"device": "cpu"},  # Offload optimizer state to CPU
        }
    }
)

# ZeRO-3: instead of each GPU holding full model copy,
# each GPU holds 1/N of parameters, gradients, and optimizer states
# Enables training models 10x larger than fit in one GPU
\`\`\`

## 5. Parallelism Strategy Selection
| Model Size | Strategy |
|-----------|---------|
| Fits on 1 GPU | Single GPU training |
| 1-8B params | DDP (data parallelism only) |
| 8-70B params | DDP + Tensor Parallelism |
| 70B+ params | Full 3D parallelism (data + tensor + pipeline) |
`,
    fullNotes: `
# Detailed Notes: Distributed Training

- **All-Reduce Ring Algorithm:** In DDP, gradients are synchronized using a ring all-reduce: each GPU sends gradients to the next GPU while receiving from the previous. After N rounds, all GPUs have the sum of gradients from all GPUs. This achieves O(2(N-1)/N × D) communication (nearly optimal) where D is gradient size.
- **Gradient Compression:** For very large models, communicating full-precision gradients across GPUs is expensive. Techniques: FP16 gradient communication, gradient quantization, top-k sparsification. All-reduce with compression trades accuracy for bandwidth.
- **FSDP (Fully Sharded Data Parallel):** PyTorch's native equivalent of DeepSpeed ZeRO. Shards model parameters, gradients, and optimizer states across GPUs. Enabled with: model = FullyShardedDataParallel(model).
`,
    shortNotes: `
- DDP: full model copy per GPU, gradient synchronization via All-Reduce
- ZeRO-3: shard params + gradients + optimizer state across GPUs → fits larger models
- Tensor parallelism: split weight matrices across GPUs (Megatron-LM style)
- Pipeline parallelism: different layers on different GPUs, overlapped with micro-batching
- torchrun: PyTorch's built-in distributed launcher (replaces torch.multiprocessing.spawn)
- DeepSpeed / FSDP: production-grade distributed training frameworks
- 3D parallelism: data × tensor × pipeline — used for 100B+ parameter models
`,
    cheatSheet: `
### Parallelism Decision Guide
\`\`\`
Model fits on 1 GPU?
  Yes → Single GPU or DDP for speed
  No → Use ZeRO-3/FSDP or model parallelism

Layer too large for 1 GPU?
  → Tensor parallelism (Megatron-style)

Pipeline too slow (bubble overhead)?
  → Micro-batching to reduce bubble fraction

Memory still not enough?
  → CPU offloading (ZeRO-infinity)
  → Gradient checkpointing (recompute activations)
\`\`\`

### torchrun Command
\`\`\`bash
# Launch 4-GPU training on single node
torchrun --nproc_per_node=4 train.py

# Launch across 2 nodes, 4 GPUs each
torchrun --nnodes=2 --nproc_per_node=4 --node_rank=0 --master_addr=... train.py
\`\`\`
`,
    interviewQuestions: [
      { question: 'Explain the difference between data parallelism, tensor parallelism, and pipeline parallelism.', answerHint: 'Data parallelism: replicate the full model on N GPUs, split the data batch across them. Gradients are synchronized via All-Reduce after each step. Works well when the model fits on one GPU. Tensor parallelism: split individual weight matrices across GPUs (e.g., each GPU holds a subset of attention heads). Used when individual layers are too large. Requires All-Reduce after each layer. Pipeline parallelism: assign different layers to different GPUs sequentially. GPU 0 processes layers 1-8, GPU 1 receives intermediate activations and processes layers 9-16. Micro-batching reduces idle time ("bubbles"). 3D parallelism combines all three for training 100B+ parameter models.', type: 'TECHNICAL' },
      { question: 'What is ZeRO-3 and how does it enable training larger models than fit on one GPU?', answerHint: 'ZeRO-3 (Zero Redundancy Optimizer Stage 3) shards model parameters, gradients, AND optimizer states across all GPUs, eliminating redundancy. In standard DDP, each GPU holds a full copy of all three (3× the model size per GPU). With ZeRO-3, each GPU holds only 1/N of each, reducing memory by N×. When a layer\'s parameters are needed during forward/backward, they are gathered from all GPUs via All-Gather, used, then re-sharded (freed). This allows training models N times larger than fit in a single GPU, at the cost of additional communication volume.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'PyTorch DDP Tutorial', url: 'https://pytorch.org/tutorials/intermediate/ddp_tutorial.html', type: 'ARTICLE', priority: 'S', source: 'PyTorch', isOfficial: true, description: 'Official PyTorch Distributed Data Parallel tutorial.' },
      { title: 'DeepSpeed Documentation', url: 'https://www.deepspeed.ai/docs/', type: 'ARTICLE', priority: 'S', source: 'Microsoft / DeepSpeed', isOfficial: true, description: 'Official DeepSpeed documentation for ZeRO and distributed training.' }
    ]
  }
};
