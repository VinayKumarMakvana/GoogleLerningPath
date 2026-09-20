export const math_15_ml_foundations = {
  ML_MATH_FOUNDATIONS: {
    title: 'Mathematical Foundations for Machine Learning',
    description: 'Synthesize all mathematical tools — how they connect to model training, generalization, loss functions, and the math behind ML algorithms.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Information Theory & ML Mathematics', 'Optimization', 'Statistics & Estimation'],
    learningContent: `
# Mathematical Foundations for Machine Learning

This capstone module synthesizes all prior mathematics into a coherent framework for understanding ML.

## 1. The Mathematical Framework of Supervised Learning
Given: Training set D = {(x⁽ⁱ⁾, y⁽ⁱ⁾)}ᵢ₌₁ᴺ
Find: Function f: X → Y parameterized by θ that minimizes empirical risk:
R̂(θ) = (1/N) Σᵢ ℓ(f(x⁽ⁱ⁾; θ), y⁽ⁱ⁾)

**Mathematical pieces:**
- f(x; θ): the model (hypothesis class)
- ℓ(ŷ, y): the loss function
- θ*: found by optimization (gradient descent, SGD)
- Generalization: the gap between R̂(θ) (training) and R(θ) (true risk)

## 2. Loss Functions and Their Mathematical Origins

| Loss | Formula | Distribution | Method |
|------|---------|-------------|--------|
| MSE | (ŷ - y)² | Gaussian noise | MLE with Gaussian |
| MAE | |ŷ - y| | Laplace noise | MLE with Laplace |
| Cross-entropy | -Σy log ŷ | Categorical | MLE for classifier |
| Hinge (SVM) | max(0, 1-y·ŷ) | Geometric margin | Structured risk |

## 3. Regularization — Mathematical Foundations

**L2 Regularization:** min L(θ) + (λ/2)‖θ‖₂²
Mathematical effect: Adds a penalty proportional to weight magnitude. Equivalent to MAP with Gaussian prior.
Geometric effect: Constrains θ to an ℓ₂ ball. Shrinks weights toward zero proportionally.

**L1 Regularization:** min L(θ) + λ‖θ‖₁
Mathematical effect: Equivalent to MAP with Laplace prior.
Geometric effect: Constrains θ to an ℓ₁ (diamond-shaped) ball. Produces exactly sparse solutions.

## 4. Generalization — The PAC Learning Framework
**PAC (Probably Approximately Correct):** With probability at least 1-δ:
R(θ̂) ≤ R̂(θ̂) + O(√(VC_dim/N))

- R̂(θ̂): empirical risk (training error)
- R(θ̂): true risk (generalization)
- VC_dim: complexity of the hypothesis class
- N: number of training samples

**Key insight:** Generalization improves with more data and simpler models (smaller VC dimension).

## 5. The Geometry of Optimization in ML
The loss surface L(θ) for a neural network is:
- Non-convex (many local minima, saddle points)
- High-dimensional (millions of parameters)
- But: In high dimensions, almost all critical points are saddle points, not local minima. SGD with noise navigates this surface, and the flat minima it finds tend to generalize better than sharp minima.

## 6. Mathematical Connections Map
- **Linear regression** = MLE with Gaussian noise = minimize MSE = closed-form via normal equations (XᵀX)β = Xᵀy
- **Logistic regression** = MLE with Bernoulli = minimize cross-entropy = no closed form, use gradient descent
- **PCA** = eigendecomposition of covariance = SVD of data matrix = maximize variance
- **SVM** = constrained optimization via Lagrange multipliers = dual problem with kernels
- **Backpropagation** = chain rule of calculus applied to computational graphs
`,
    fullNotes: `
# Detailed Notes: ML Mathematics Synthesis

- **Implicit Regularization of SGD:** Even without explicit regularization, SGD implicitly regularizes by preferring flat minima. Flatter minima correspond to wider basins in the loss landscape, which generalize better (Hochreiter & Schmidhuber, 1997).
- **Neural Tangent Kernel (NTK):** In the infinite-width limit, neural networks converge to a kernel regression with a specific kernel (the NTK). This connects deep learning to classical kernel methods mathematically, allowing analysis of training dynamics.
- **Double Descent:** In modern ML, test error follows a non-classical "double descent" curve: as model complexity increases past the interpolation threshold (0 training error), test error decreases again. This challenges the classical bias-variance tradeoff narrative.
`,
    shortNotes: `
- ML training = empirical risk minimization (ERM) via gradient descent
- Loss functions arise from MLE with specific noise model assumptions
- L2 regularization = Gaussian prior (MAP). L1 regularization = Laplace prior (MAP)
- Generalization gap: empirical risk − true risk, bounded by √(complexity/N)
- Backpropagation = chain rule of calculus through a computational graph
- Deep networks: non-convex surface, many saddle points, SGD finds flat minima
- PCA = SVD = eigendecomposition of covariance — all the same thing
`,
    cheatSheet: `
### Math→ML Connection Map
| Math Area | ML Application |
|-----------|---------------|
| Linear algebra | Data representation, layers, PCA, SVD |
| Probability | Distributions, MLE, Bayesian learning |
| Calculus | Backpropagation via chain rule |
| Optimization | Gradient descent, SGD, Adam |
| Statistics | Bias-variance, generalization theory |
| Information theory | Loss functions (cross-entropy, KL) |
| Linear transformations | Neural network layers |
| Eigendecomposition | PCA, covariance modeling |
| Lagrange multipliers | SVMs, constrained optimization |
`,
    interviewQuestions: [
      { question: 'Mathematically, what is the connection between MSE loss and the assumption of Gaussian noise?', answerHint: 'Assume the target y = f(x;θ) + ε where ε ~ N(0,σ²). The likelihood of the data given θ is P(y|x,θ) = N(f(x;θ), σ²). The log-likelihood is: log P = -N/2·log(2πσ²) - (1/2σ²)Σ(yᵢ - f(xᵢ;θ))². Maximizing this log-likelihood with respect to θ is equivalent to minimizing Σ(yᵢ - f(xᵢ;θ))² — which is exactly the mean squared error loss. Therefore, MSE is the correct loss whenever Gaussian noise is a reasonable assumption.', type: 'TECHNICAL' },
      { question: 'Explain what backpropagation is from a mathematical perspective.', answerHint: 'Backpropagation is the efficient application of the chain rule of calculus to compute gradients through a computational graph. A neural network is a composition of functions: L = loss(fₙ(...f₂(f₁(x;θ₁);θ₂)...; θₙ)). To train, we need ∂L/∂θᵢ for every layer i. By the chain rule: ∂L/∂θᵢ = (∂L/∂aₙ)(∂aₙ/∂aₙ₋₁)...(∂aᵢ₊₁/∂aᵢ)(∂aᵢ/∂θᵢ), where aᵢ is the output of layer i. Backprop computes these Jacobian products in reverse order (from output to input), reusing intermediate values stored during the forward pass. This achieves O(N) time for N parameters instead of O(N²) for naive computation.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Mathematics for ML (Deisenroth et al.) — Full Book', url: 'https://mml-book.github.io/book/mml-book.pdf', type: 'BOOK', priority: 'S', source: 'Cambridge University Press', isOfficial: true, description: 'The complete free MML textbook synthesizing all math for ML.' },
      { title: 'The Matrix Calculus You Need for Deep Learning', url: 'https://explained.ai/matrix-calculus/index.html', type: 'ARTICLE', priority: 'S', source: 'Terence Parr & Jeremy Howard', isOfficial: false, description: 'Essential matrix calculus for understanding backpropagation.' }
    ]
  }
};
