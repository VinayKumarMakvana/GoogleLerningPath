export const aiml_13_llm_foundations = {
  LLM_FOUNDATIONS: {
    title: 'Large Language Model Foundations',
    description: 'Master LLM architecture, pretraining, tokenization, context windows, inference, prompting, and emergent capabilities.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Transformers', 'Information Theory & ML Mathematics'],
    learningContent: `
# Large Language Model Foundations

## 1. What is an LLM?
A Large Language Model is a decoder-only Transformer trained via autoregressive language modeling to predict the next token P(xₜ | x₁, ..., xₜ₋₁).

**Scaling laws (Kaplan et al., Hoffmann et al.):** Model performance (next-token prediction loss) scales predictably with:
- Number of parameters N
- Training tokens D
- Compute budget C ≈ 6ND

Chinchilla scaling law: optimal training uses N ≈ 20D tokens per parameter.

## 2. Pretraining
Train on massive text corpora (web, books, code, scientific papers) to minimize:
L = -Σₜ log P(xₜ | x₁,...,xₜ₋₁)

This single objective induces:
- World knowledge (facts stored in model weights)
- Grammar, syntax, reasoning patterns
- Code and formal language understanding
- In-context learning ability

## 3. Tokenization for LLMs
\`\`\`python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3-8B")
tokens = tokenizer("The capital of France is")
print(tokens.input_ids)          # [464, 3135, 286, 4881, 318]
print(tokenizer.decode([464]))   # "The"

# Token count matters: affects cost, speed, context limits
token_count = len(tokenizer.encode(long_text))
\`\`\`

## 4. Context Window
The context window is the maximum number of tokens the model can process in one forward pass. Beyond this length, the model cannot access older context.

- GPT-3.5: 4k tokens
- GPT-4: 128k tokens
- Claude 3: 200k tokens
- LLaMA 3: 128k tokens (with RoPE extension)

**Why it matters:** Long documents, multi-turn conversations, large code files.

## 5. Inference and Decoding
\`\`\`python
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8B")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3-8B")

inputs = tokenizer("Explain attention in one sentence:", return_tensors="pt")
outputs = model.generate(
    **inputs,
    max_new_tokens=100,
    temperature=0.7,     # Creativity control
    top_p=0.9,           # Nucleus sampling
    do_sample=True       # Enable sampling (vs greedy)
)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
\`\`\`

## 6. Prompting Strategies
- **Zero-shot:** Direct question with no examples. "Translate to French: Hello."
- **Few-shot:** Provide 3–10 examples in the prompt before the target.
- **Chain-of-Thought (CoT):** Add "Let's think step by step" to trigger reasoning traces.
- **Instruction tuning:** RLHF/SFT models (GPT-4, Claude) are already instruction-tuned — natural language instructions work directly.

## 7. Emergent Capabilities
At sufficient scale, LLMs exhibit capabilities not present in smaller models:
- In-context learning (learn from prompt examples)
- Multi-step reasoning
- Code generation and execution
- Arithmetic
- Instruction following
`,
    fullNotes: `
# Detailed Notes: LLM Foundations

- **KV Cache:** During autoregressive generation, the key and value tensors for each attention head are computed once and cached. Each new token only adds one new row to the KV cache instead of recomputing all prior tokens. Essential for efficient inference.
- **RLHF (Reinforcement Learning from Human Feedback):** After pretraining, models are fine-tuned on human preference data via PPO. This aligns model outputs with human preferences (helpfulness, harmlessness, honesty). Used by GPT-4, Claude, Gemini.
- **Instruction Tuning (SFT):** Fine-tune a base pretrained LLM on a curated dataset of (instruction, response) pairs. Cheaper and simpler than RLHF; often sufficient for most use cases.
`,
    shortNotes: `
- LLM = decoder-only Transformer trained to predict next token
- Pretraining objective: minimize next-token prediction loss on massive text
- Chinchilla: optimal: ~20 tokens per parameter for training
- Context window: max tokens in one forward pass — affects memory and cost
- KV cache: cache past keys/values for efficient autoregressive generation
- Temperature: controls output diversity. T→0: greedy. T→∞: uniform.
- Top-p (nucleus) sampling: sample from tokens covering top p probability mass
`,
    cheatSheet: `
### Prompting Strategies
| Strategy | Template | Use When |
|----------|---------|---------|
| Zero-shot | Task: {input} | Simple, well-defined tasks |
| Few-shot | Example1...ExampleN. Task: {input} | Need to specify format/style |
| Chain-of-Thought | "Think step by step." | Multi-step reasoning |
| ReAct | Thought/Action/Observation loop | Tool use, agentic tasks |

### Decoding Parameters
| Parameter | Effect |
|-----------|--------|
| temperature=0 | Greedy (deterministic) |
| temperature=1 | Standard sampling |
| temperature>1 | More creative/diverse |
| top_p=0.9 | Nucleus sampling (recommended) |
| max_new_tokens | Hard stop on generation length |
`,
    interviewQuestions: [
      { question: 'What is the KV cache and why is it critical for LLM inference efficiency?', answerHint: 'During autoregressive generation, each new token must attend to all previous tokens. Without a KV cache, the key and value projections of all prior tokens would need to be recomputed for every new token, making generation O(N²) in sequence length. The KV cache stores the key and value tensors from prior tokens in GPU memory. When generating token t+1, we only compute K and V for the new token and append them — all prior K/V are already cached. This reduces per-step computation to O(1) in sequence length (one new row per head), enabling practical long-context generation.', type: 'TECHNICAL' },
      { question: 'What is the difference between zero-shot, few-shot, and chain-of-thought prompting?', answerHint: 'Zero-shot prompting provides only the instruction with no examples — relies entirely on the model\'s pretrained capabilities. Few-shot prompting provides 3-10 (input, expected output) examples in the prompt before the target, demonstrating the desired format and task behavior. Chain-of-thought (CoT) prompting adds "let\'s think step by step" or provides examples with intermediate reasoning steps, encouraging the model to produce a reasoning trace before the answer. CoT dramatically improves performance on complex multi-step tasks (math, logical reasoning, multi-hop QA) by making the reasoning process explicit.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Andrej Karpathy: Let\'s Build GPT from Scratch', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', type: 'VIDEO', priority: 'S', source: 'Andrej Karpathy', isOfficial: false, description: 'Build a GPT model from scratch — the best hands-on LLM introduction.' },
      { title: 'Attention Is All You Need + GPT-3 Paper', url: 'https://arxiv.org/abs/2005.14165', type: 'ARTICLE', priority: 'S', source: 'arXiv / OpenAI', isOfficial: true, description: 'GPT-3 paper showing scaling leads to few-shot learning abilities.' }
    ]
  }
};
