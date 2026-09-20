export const aiml_17_finetuning = {
  FINE_TUNING: {
    title: 'Fine-Tuning & Adaptation',
    description: 'Master supervised fine-tuning, LoRA/QLoRA, parameter-efficient methods, dataset preparation, and adaptation tradeoffs.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Large Language Model Foundations', 'PyTorch'],
    learningContent: `
# Fine-Tuning & Adaptation

## 1. When to Fine-Tune
Fine-tuning adjusts a pretrained model's weights for a specific task or domain.

**Use fine-tuning when:**
- You need consistent output format/style
- Domain adaptation (medical, legal, code)
- Prompt engineering alone doesn't solve the task
- Cost/latency: a smaller fine-tuned model can outperform a larger general model

**Don't fine-tune when:**
- Few examples (< a few hundred) — use few-shot prompting instead
- The task changes frequently — prompts are easier to update than model weights

## 2. Supervised Fine-Tuning (SFT)
\`\`\`python
from datasets import Dataset
from trl import SFTTrainer
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8B")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3-8B")

# Prepare instruction dataset in chat format
dataset = Dataset.from_list([
    {"messages": [
        {"role": "user", "content": "Classify this email as spam or not."},
        {"role": "assistant", "content": "Not spam. The email discusses a legitimate meeting."}
    ]}
])

training_args = TrainingArguments(
    output_dir="./sft_output",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    learning_rate=2e-5,
    warmup_ratio=0.1,
    lr_scheduler_type="cosine"
)

trainer = SFTTrainer(model=model, args=training_args, train_dataset=dataset, tokenizer=tokenizer)
trainer.train()
\`\`\`

## 3. LoRA — Low-Rank Adaptation (Parameter-Efficient Fine-Tuning)
LoRA freezes the pretrained model weights and adds small low-rank adapter matrices:
**W' = W + ΔW = W + BA**
where B ∈ ℝᵈˣʳ, A ∈ ℝʳˣᵏ, and r << min(d, k) (rank).

This reduces trainable parameters by ~99%: instead of fine-tuning a 7B model's attention weight matrix (d×k = 4096×4096 = 16M params), LoRA trains two small matrices B (4096×16) and A (16×4096) = 131k params.

\`\`\`python
from peft import get_peft_model, LoraConfig, TaskType

lora_config = LoraConfig(
    r=16,                     # Rank — controls adapter capacity
    lora_alpha=32,            # Scaling factor (effective LR = alpha/r)
    target_modules=["q_proj", "v_proj"],  # Which weight matrices to adapt
    lora_dropout=0.05,
    task_type=TaskType.CAUSAL_LM
)
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()  # "trainable params: 6,553,600 || all params: 6,745,497,600"
\`\`\`

## 4. QLoRA — Quantized LoRA
QLoRA combines LoRA with 4-bit NormalFloat (NF4) quantization of the base model weights. Fine-tune a 7B model on a single 24GB GPU.

\`\`\`python
from transformers import BitsAndBytesConfig

quantization_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True
)
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-70B", quantization_config=quantization_config)
\`\`\`

## 5. Catastrophic Forgetting
Fine-tuning can cause the model to forget general capabilities. Mitigations:
- **Low learning rate** (1e-5 to 3e-5 — much lower than pretraining)
- **Few epochs** (1-3 for domain adaptation)
- **LoRA:** Adapters are small → base model knowledge preserved
- **Task-specific data mixing:** Include general instruction data in fine-tuning
`,
    fullNotes: `
# Detailed Notes: Fine-Tuning

- **Data Quality vs Quantity:** For fine-tuning, 1000 high-quality examples typically outperform 10k low-quality ones. Focus on diversity, correctness, and format consistency.
- **Alignment Fine-tuning (RLHF/DPO):** After SFT, RLHF trains a reward model on human preference pairs and uses PPO to maximize reward. DPO (Direct Preference Optimization) directly optimizes preferences without a separate reward model — simpler and often comparable.
- **Adapter Merging:** After LoRA fine-tuning, merge adapters into base weights: W_merged = W + BA. This eliminates inference latency from applying adapters separately.
`,
    shortNotes: `
- Fine-tune when: consistent style needed, domain gap, prompt engineering fails
- SFT: supervised fine-tuning on (instruction, response) pairs
- LoRA: add low-rank adapter matrices (r≈16), freeze base model (99% param reduction)
- QLoRA: LoRA + 4-bit base model quantization → fine-tune 70B on 1 GPU
- Catastrophic forgetting: model forgets general capabilities → use low LR, few epochs
- DPO: direct preference optimization — simpler alternative to RLHF
- After training: merge LoRA adapters into base weights for zero-overhead inference
`,
    cheatSheet: `
### Fine-Tuning Decision Tree
\`\`\`
Is the task achievable with prompting? → Use few-shot prompting
Do you have <500 examples? → Use RAG or prompt engineering
Do you have 500-10k examples? → Fine-tune with LoRA/QLoRA
Do you have >10k examples? → Full fine-tuning or LoRA
Need to preserve general capabilities? → LoRA + low LR + few epochs
Need to run on 1 GPU? → QLoRA
\`\`\`
### LoRA Hyperparameters
| Param | Typical Value | Effect |
|-------|--------------|--------|
| r | 8–64 | Higher = more capacity |
| alpha | 2×r | Controls scaling |
| dropout | 0.05–0.1 | Regularization |
| target_modules | q,v projections | Which layers to adapt |
`,
    interviewQuestions: [
      { question: 'What is LoRA and why does it work for fine-tuning large language models?', answerHint: 'LoRA (Low-Rank Adaptation) hypothesizes that the updates to pretrained weights during fine-tuning have low intrinsic rank — the change ΔW can be approximated by two small matrices BA where r << min(d,k). Instead of fine-tuning W (millions of parameters), you only train B and A (thousands of parameters). This reduces trainable parameters by ~99%, dramatically cutting memory and compute requirements. It works because fine-tuning is task-specific adaptation — the required changes to the weight space lie in a low-dimensional subspace of the full parameter space.', type: 'TECHNICAL' },
      { question: 'What is catastrophic forgetting and how do you mitigate it during fine-tuning?', answerHint: 'Catastrophic forgetting occurs when fine-tuning on a specific task overwrites the general knowledge learned during pretraining. The model becomes specialized but loses broad capabilities. Mitigations: (1) Low learning rate (1e-5 to 3e-5) — small updates minimally disturb pretrained weights. (2) Few training epochs (1-3) — don\'t over-train on task data. (3) LoRA — only the small adapter matrices change; base weights are frozen, preserving all pretrained knowledge. (4) Data mixing — include general instruction data alongside task-specific data in the training set.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'LoRA Paper (Hu et al., 2021)', url: 'https://arxiv.org/abs/2106.09685', type: 'ARTICLE', priority: 'S', source: 'arXiv / Microsoft', isOfficial: false, description: 'Original LoRA paper introducing low-rank adaptation.' },
      { title: 'HuggingFace PEFT Documentation', url: 'https://huggingface.co/docs/peft/', type: 'ARTICLE', priority: 'S', source: 'HuggingFace', isOfficial: true, description: 'Official PEFT library documentation for LoRA, QLoRA, and other PEFT methods.' }
    ]
  }
};
