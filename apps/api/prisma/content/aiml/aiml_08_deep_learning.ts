export const aiml_08_deep_learning = {
  DEEP_LEARNING_FOUNDATIONS: {
    title: 'Deep Learning Foundations',
    description: 'Master neural networks, backpropagation, activation functions, normalization, regularization, and optimization for deep learning.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['ML Pipelines & Reproducibility', 'Gradients, Jacobians & Hessians', 'Information Theory & ML Mathematics'],
    learningContent: `
# Deep Learning Foundations

## 1. The Perceptron and MLP
A **perceptron** computes: y = σ(wᵀx + b)

A **multilayer perceptron (MLP)** stacks layers:
- Layer l: aˡ = σ(Wˡaˡ⁻¹ + bˡ)

**Universal Approximation Theorem:** A neural network with one hidden layer and enough neurons can approximate any continuous function. Depth (more layers) enables hierarchical feature learning.

## 2. Activation Functions
| Activation | Formula | Range | Use Case |
|-----------|---------|-------|---------|
| Sigmoid | 1/(1+e⁻ˣ) | (0,1) | Binary output |
| Tanh | (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ) | (-1,1) | Hidden layers (LSTM) |
| ReLU | max(0,x) | [0,∞) | Default hidden layers |
| Leaky ReLU | max(αx,x) | (-∞,∞) | Fixes dying ReLU |
| GELU | x·Φ(x) | (-∞,∞) | Transformers |
| Softmax | eˣⁱ/Σeˣʲ | (0,1) | Multiclass output |

**Dying ReLU problem:** If a neuron's input is always negative, its gradient is always 0 — it never updates. Fix: LeakyReLU, ELU, or careful initialization.

## 3. Backpropagation
The chain rule applied to compute gradients through a computational graph.

For output neuron j: δʲ = ∂L/∂aʲ · σ'(zʲ)
For hidden neuron i: δⁱ = (Σⱼ wᵢⱼ δʲ) · σ'(zⁱ)
Gradient: ∂L/∂wᵢⱼ = δʲ · aⁱ

(See 9J Gradients module for the full mathematical derivation)

## 4. Normalization
- **Batch Normalization:** Normalize layer inputs across the batch dimension. Reduces internal covariate shift, allows higher learning rates, acts as regularizer.
\`\`\`python
torch.nn.BatchNorm1d(num_features)  # For MLP
torch.nn.BatchNorm2d(num_channels)  # For CNN
\`\`\`
- **Layer Normalization:** Normalize across the feature dimension (not batch). Used in Transformers — works with batch size 1.

## 5. Regularization in Deep Learning
- **Dropout:** Randomly zero out p fraction of neurons during training. Prevents co-adaptation. At test time, scale activations by (1-p).
- **Weight Decay (L2):** Add λ‖w‖² to the optimizer (AdamW's default).
- **Early Stopping:** Monitor validation loss; stop when it plateaus.
- **Data Augmentation:** Create training variety (for images: flip, crop, rotate, color jitter).

## 6. Weight Initialization
- **Xavier/Glorot:** Var(w) = 2/(fanᵢₙ + fanₒᵤₜ). Good for Tanh/Sigmoid.
- **Kaiming/He:** Var(w) = 2/fanᵢₙ. Good for ReLU. (Default in PyTorch Conv layers)
Poor initialization leads to vanishing or exploding gradients.
`,
    fullNotes: `
# Detailed Notes: Deep Learning

- **Vanishing/Exploding Gradients:** In deep networks, gradients can shrink exponentially (vanish, preventing learning in early layers) or grow exponentially (explode, causing NaN). Fixes: proper initialization, gradient clipping, batch norm, ResNet-style skip connections.
- **Residual Connections (ResNets):** Output = F(x) + x — allows gradients to flow directly through the skip connection, enabling very deep networks (100+ layers) without vanishing gradients.
`,
    shortNotes: `
- MLP: stack of linear layers + activation functions
- ReLU: default activation for hidden layers (simple, no vanishing grad problem)
- Backprop: chain rule through computational graph → compute all gradients
- BatchNorm: normalize per-feature across batch → stable training, regularizer
- LayerNorm: normalize per-sample across features → used in Transformers
- Dropout: randomly zero neurons during training → prevents overfitting
- Kaiming init: for ReLU. Xavier init: for Tanh/Sigmoid.
`,
    cheatSheet: `
### Deep Learning Architecture Checklist
1. Input layer → normalize/scale inputs
2. Hidden layers: Linear → BatchNorm → ReLU → Dropout
3. Output layer: Linear → (Sigmoid for binary, Softmax for multiclass)
4. Loss: BCELoss/CrossEntropyLoss
5. Optimizer: AdamW(lr=1e-3, weight_decay=1e-2)
6. Monitor: train loss, val loss, early stopping

### Gradient Problems
| Problem | Symptom | Fix |
|---------|---------|-----|
| Vanishing grad | Early layers don't learn | ReLU, ResNet, good init |
| Exploding grad | NaN loss | Gradient clipping, LR schedule |
| Dying ReLU | Dead neurons | LeakyReLU, ELU |
`,
    interviewQuestions: [
      { question: 'What is batch normalization, and why does it help training?', answerHint: 'Batch normalization normalizes the inputs to each layer across the batch dimension: subtract mean and divide by std, then apply learnable scale (γ) and shift (β). This reduces internal covariate shift — the changing distribution of layer inputs during training. Benefits: allows higher learning rates (stable gradients), reduces sensitivity to initialization, provides mild regularization (batch-level noise acts like dropout), and generally accelerates training. Limitation: depends on batch size (unstable with batch size 1) — use Layer Normalization in Transformers instead.', type: 'TECHNICAL' },
      { question: 'Explain the vanishing gradient problem and how modern architectures address it.', answerHint: 'In deep networks with sigmoid/tanh activations, gradients are multiplied by the derivative of the activation at each layer during backpropagation. Since sigmoid\'s derivative is at most 0.25, after 10 layers the gradient is at most 0.25¹⁰ ≈ 10⁻⁶ — effectively zero. Early layers learn nothing. Solutions: (1) ReLU activation (derivative is 1 for positive inputs, not shrinking). (2) Proper weight initialization (Xavier/Kaiming). (3) Residual connections (ResNets) — add a skip connection y = F(x) + x, so the gradient can flow directly through the addition, bypassing the non-linearity.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Deep Learning Book (Goodfellow et al.)', url: 'https://www.deeplearningbook.org/', type: 'BOOK', priority: 'S', source: 'MIT Press', isOfficial: true, description: 'The foundational deep learning textbook, free online.' },
      { title: 'Neural Networks (3Blue1Brown)', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', type: 'VIDEO', priority: 'S', source: '3Blue1Brown', isOfficial: false, description: 'Visual introduction to neural networks and backpropagation.' }
    ]
  }
};
