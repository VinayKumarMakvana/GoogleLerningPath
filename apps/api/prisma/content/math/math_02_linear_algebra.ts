export const math_02_linear_algebra = {
  LINEAR_ALGEBRA_FUNDAMENTALS: {
    title: 'Linear Algebra Fundamentals',
    description: 'Understand scalars, vectors, tensors, vector operations, dot products, and norms — the language of data in ML.',
    difficulty: 'BEGINNER',
    estimatedLearnTime: 75,
    prerequisites: ['Mathematical Foundations'],
    learningContent: `
# Linear Algebra Fundamentals

Linear algebra is the mathematics of vectors, matrices, and linear transformations. It is the primary language of modern machine learning.

## 1. Scalars, Vectors, Matrices, Tensors

- **Scalar:** A single number. x ∈ ℝ. (e.g., a learning rate α = 0.01)
- **Vector:** An ordered list of scalars. **x** ∈ ℝⁿ. (e.g., a feature vector with n features)
- **Matrix:** A 2D array of scalars. **A** ∈ ℝᵐˣⁿ. (e.g., a dataset with m samples and n features)
- **Tensor:** A generalization to higher dimensions. (e.g., a batch of color images is a rank-4 tensor: batch_size × height × width × channels)

\`\`\`python
import numpy as np

scalar = 3.14                           # rank 0
vector = np.array([1.0, 2.0, 3.0])     # rank 1, shape (3,)
matrix = np.array([[1,2],[3,4]])        # rank 2, shape (2,2)
tensor = np.zeros((32, 224, 224, 3))   # rank 4 — batch of images
\`\`\`

## 2. Vector Operations

**Addition:** **u** + **v** = element-wise addition
**Scalar multiplication:** c**v** = each element multiplied by c

### Dot Product (Inner Product)
**u** · **v** = Σᵢ uᵢvᵢ = u₁v₁ + u₂v₂ + ... + uₙvₙ

Geometric interpretation: **u** · **v** = ‖**u**‖ ‖**v**‖ cos(θ)
where θ is the angle between the vectors.

- If **u** · **v** = 0, the vectors are **orthogonal** (perpendicular)
- If **u** · **v** > 0, the angle is acute (vectors point in similar directions)
- If **u** · **v** < 0, the angle is obtuse (vectors point in opposite directions)

**ML Connection:** A linear neuron computes y = **w** · **x** + b — the dot product between weights and input features.

## 3. Norms (Measuring Vector Length)

The **Lp norm** is defined as: ‖**x**‖_p = (Σᵢ |xᵢ|ᵖ)^(1/p)

- **L1 norm (Manhattan):** ‖**x**‖₁ = Σ|xᵢ|  → encourages sparsity (LASSO regularization)
- **L2 norm (Euclidean):** ‖**x**‖₂ = √(Σxᵢ²) → standard distance in space (Ridge regularization)
- **L∞ norm (Chebyshev):** ‖**x**‖_∞ = max(|xᵢ|) → the maximum element

**ML Connection:**
- L2 regularization (weight decay) penalizes ‖**w**‖₂² in the loss
- L1 regularization penalizes ‖**w**‖₁ → drives weights to exactly 0 (feature selection)
`,
    fullNotes: `
# Detailed Notes: Linear Algebra Fundamentals

- **Unit Vector:** A vector with norm exactly 1. Computed by normalizing: **û** = **x** / ‖**x**‖₂. Unit vectors represent directions without magnitude.
- **Cosine Similarity:** cos(θ) = (**u** · **v**) / (‖**u**‖ · ‖**v**‖). Used in NLP to measure semantic similarity between word/sentence embeddings, because it captures angular distance irrespective of vector magnitude.
- **Triangle Inequality:** ‖**u** + **v**‖ ≤ ‖**u**‖ + ‖**v**‖ — the norm of a sum is at most the sum of norms. Fundamental property of distance metrics.
`,
    shortNotes: `
- Scalar (0D) → Vector (1D) → Matrix (2D) → Tensor (ND)
- Dot product = Σ uᵢvᵢ = ‖u‖‖v‖cos(θ)
- Orthogonal vectors have dot product = 0
- L1 norm = sum of absolute values (encourages sparsity)
- L2 norm = Euclidean distance (standard regularization)
- Unit vector = x / ‖x‖ (direction without magnitude)
- Cosine similarity measures angle between vectors — used in embeddings
`,
    cheatSheet: `
### Norms and When to Use Them
| Norm | Formula | ML Use Case |
|------|---------|------------|
| L1 | Σ|xᵢ| | LASSO regularization, sparse features |
| L2 | √(Σxᵢ²) | Ridge regularization, Euclidean distance |
| L∞ | max|xᵢ| | Adversarial robustness constraints |

### NumPy Implementation
\`\`\`python
import numpy as np
u = np.array([3.0, 4.0])
np.linalg.norm(u)       # L2 = 5.0
np.linalg.norm(u, 1)    # L1 = 7.0
np.dot(u, u)            # dot product = 25.0
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the geometric interpretation of the dot product, and how is it used in a neural network?', answerHint: 'Geometrically, u·v = ‖u‖‖v‖cos(θ), where θ is the angle between the vectors. When both vectors are unit vectors, the dot product directly gives the cosine of the angle — a measure of similarity. In a neural network, the output of a linear layer is y = w·x + b, which measures how aligned the input x is with the learned weight vector w. The larger the dot product, the more the input "activates" that neuron.', type: 'TECHNICAL' },
      { question: 'Why does L1 regularization produce sparse weights while L2 regularization does not?', answerHint: 'L1 regularization adds a ‖w‖₁ penalty term to the loss. The gradient of ‖w‖₁ is the sign function (±1), which applies a constant force pushing weights toward zero regardless of their magnitude. This force eventually drives small weights to exactly 0. L2 regularization adds ‖w‖₂², whose gradient is 2w — a force proportional to the weight\'s magnitude. As weights approach zero, this force vanishes, so L2 shrinks weights but rarely drives them to exactly 0.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Essence of Linear Algebra (3Blue1Brown)', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', type: 'VIDEO', priority: 'S', source: '3Blue1Brown', isOfficial: false, description: 'The best visual introduction to linear algebra — mandatory viewing.' },
      { title: 'Mathematics for ML: Linear Algebra (Imperial College)', url: 'https://www.coursera.org/learn/linear-algebra-machine-learning', type: 'COURSE', priority: 'A', source: 'Coursera / Imperial College', isOfficial: false, description: 'Coursera course on linear algebra specifically for ML.' }
    ]
  }
};
