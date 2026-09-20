export const aiml_12_transformers = {
  TRANSFORMERS: {
    title: 'Transformers',
    description: 'Master self-attention, multi-head attention, positional encoding, encoder/decoder architectures, and the Transformer model.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['NLP Foundations', 'Deep Learning Foundations'],
    learningContent: `
# Transformers

The Transformer architecture (Vaswani et al., "Attention Is All You Need", 2017) is the foundation of all modern large models.

## 1. The Attention Mechanism
Given Queries (Q), Keys (K), Values (V):
**Attention(Q, K, V) = softmax(QKᵀ / √dₖ) · V**

- QKᵀ: similarity scores between each query and all keys
- /√dₖ: scale by key dimension to prevent gradient vanishing in softmax
- softmax: normalize to a probability distribution
- ·V: weighted sum of values

**Intuition:** For each position, compute how much to "attend to" each other position, then take a weighted average of their values.

\`\`\`python
import torch
import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)  # (B, heads, seq, seq)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))
    weights = F.softmax(scores, dim=-1)
    return torch.matmul(weights, V), weights
\`\`\`

## 2. Multi-Head Attention
Run h attention heads in parallel, each with different learned projections:
**MultiHead(Q,K,V) = Concat(head₁,...,headₕ)Wᴼ**
where headᵢ = Attention(QWᵢQ, KWᵢK, VWᵢV)

Different heads can attend to different aspects (syntax, semantics, coreference).

## 3. Positional Encoding
Attention is permutation-invariant — it doesn't know the order of tokens. Positional encodings add order information:

**Sinusoidal (original):**
PE(pos, 2i) = sin(pos / 10000^(2i/d))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d))

**Learned (modern):** Each position gets a learnable embedding vector. Used by BERT, GPT.
**RoPE (Rotary Position Embedding):** Used by LLaMA, GPT-NeoX — encodes relative positions via rotation.

## 4. Transformer Architecture
\`\`\`
Input → Embedding + Positional Encoding
    ↓
[Encoder Block] × N:
    Multi-Head Self-Attention → Add & Norm
    Feed-Forward (2×Linear + ReLU) → Add & Norm
    ↓
[Decoder Block] × N:
    Masked Multi-Head Self-Attention (causal) → Add & Norm
    Cross-Attention (queries from decoder, keys/values from encoder) → Add & Norm
    Feed-Forward → Add & Norm
    ↓
Linear + Softmax → Next token probability
\`\`\`

- **Encoder-only (BERT):** Bidirectional — sees full context. Good for understanding tasks.
- **Decoder-only (GPT):** Causal (left-to-right) — good for generation.
- **Encoder-Decoder (T5, BART):** Full architecture for seq2seq (translation, summarization).

## 5. Decoding Strategies
- **Greedy:** Always pick argmax token. Fast but can get stuck.
- **Beam Search:** Keep top-B most likely sequences at each step.
- **Temperature Sampling:** Sample from softmax(logits/T). Higher T → more diversity.
- **Top-k / Top-p (nucleus) Sampling:** Sample from top-k tokens or tokens covering top-p probability mass.
`,
    fullNotes: `
# Detailed Notes: Transformers

- **Pre-Layer vs Post-Layer Normalization:** Original Transformer uses Post-LN (after attention/FFN). Modern LLMs use Pre-LN (before attention/FFN) — more stable training at scale.
- **Causal Mask:** In decoder-only models, a lower-triangular mask ensures position i cannot attend to positions j > i (future tokens). This enables training on all positions simultaneously using teacher forcing.
- **Flash Attention:** An IO-aware, fused CUDA kernel for attention that avoids materializing the full N×N attention matrix in GPU HBM. 3-8× speedup for long sequences. Essential for long context LLMs.
`,
    shortNotes: `
- Attention: weighted average of values, weights = softmax(QKᵀ/√d)
- Scale by √dₖ: prevents large dot products from saturating softmax
- Multi-head: h parallel attention heads → different relationship types
- Positional encoding: add positional info (sinusoidal, learned, RoPE)
- Encoder-only (BERT): bidirectional, understanding tasks
- Decoder-only (GPT): causal/autoregressive, generation tasks
- Encoder-Decoder (T5): full seq2seq (translation, summarization)
`,
    cheatSheet: `
### Attention Formula
\`\`\`
Attention(Q, K, V) = softmax(QKᵀ / √dₖ) · V
\`\`\`

### Transformer Variants
| Architecture | Attention | Best For |
|-------------|----------|---------|
| Encoder only | Bidirectional | Classification, NER, QA |
| Decoder only | Causal | Text generation, LLMs |
| Encoder-Decoder | Both | Translation, Summarization |

### Key Papers
- "Attention Is All You Need" (2017) — Original Transformer
- BERT (2018) — Masked LM pretraining, encoder-only
- GPT (2018) — Autoregressive pretraining, decoder-only
`,
    interviewQuestions: [
      { question: 'Explain the scaled dot-product attention mechanism and why we scale by √dₖ.', answerHint: 'Scaled dot-product attention computes: softmax(QKᵀ/√dₖ)·V. For each query, we compute its similarity to all keys via dot products, scale by √dₖ, apply softmax to get attention weights summing to 1, then take a weighted sum of the value vectors. We scale by √dₖ because the dot products QKᵀ have magnitude proportional to dₖ (sum of dₖ random variables). Without scaling, large dₖ values push the softmax inputs into regions with near-zero gradients (softmax saturates), causing vanishing gradients during training.', type: 'TECHNICAL' },
      { question: 'What is the difference between encoder-only and decoder-only Transformer architectures?', answerHint: 'Encoder-only models (BERT) use bidirectional self-attention — each token can attend to all other tokens in both directions. This is ideal for understanding tasks (classification, NER, extractive QA) where you have the full context. Decoder-only models (GPT) use causal (masked) self-attention — each token can only attend to previous tokens. This enables autoregressive text generation. A causal mask prevents "seeing the future," making the model predict one token at a time. Encoder-decoder models (T5) use both: the encoder processes the input bidirectionally, the decoder generates output autoregressively with cross-attention to the encoder.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Attention Is All You Need (Vaswani et al., 2017)', url: 'https://arxiv.org/abs/1706.03762', type: 'ARTICLE', priority: 'S', source: 'arXiv / Google Brain', isOfficial: true, description: 'The original Transformer paper — mandatory reading.' },
      { title: 'The Illustrated Transformer (Jay Alammar)', url: 'https://jalammar.github.io/illustrated-transformer/', type: 'ARTICLE', priority: 'S', source: 'Jay Alammar', isOfficial: false, description: 'The best visual walkthrough of the Transformer architecture.' }
    ]
  }
};
