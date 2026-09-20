export const math_11_gradients = {
  GRADIENTS_JACOBIANS_HESSIANS: {
    title: 'Gradients, Jacobians & Hessians',
    description: 'Master gradient vectors, Jacobian matrices, Hessians, directional derivatives, and their roles in optimization.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Multivariable Calculus', 'Matrices & Linear Transformations'],
    learningContent: `
# Gradients, Jacobians & Hessians

## 1. The Gradient (Vector of Partial Derivatives)
For f: ℝⁿ → ℝ (scalar-valued function of a vector):
∇f(x) = [∂f/∂x₁, ∂f/∂x₂, ..., ∂f/∂xₙ]ᵀ ∈ ℝⁿ

**Critical Properties:**
- The gradient points in the direction of **steepest ascent**
- The **negative gradient** points in the direction of steepest descent
- The gradient is perpendicular (normal) to the level curves of f

**Worked Example:**
f(x, y) = x² + 2y²
∇f = [2x, 4y]ᵀ
At (1, 1): ∇f = [2, 4]ᵀ — steeply ascending in y-direction

**ML Connection:** Gradient descent updates: θ ← θ - α∇L(θ)
The gradient ∇L(θ) tells us which direction increases the loss most — we step in the opposite direction.

## 2. Directional Derivative
The rate of change of f in direction **u** (unit vector):
D_u f(x) = ∇f(x) · **u** = ‖∇f(x)‖ cos(θ)

Maximum when θ = 0 (u points in gradient direction), giving ‖∇f‖.
Zero when u ⊥ ∇f (moving perpendicular to gradient doesn't change f immediately).

## 3. The Jacobian (Matrix of Partial Derivatives)
For f: ℝⁿ → ℝᵐ (vector-valued function):
J(x) ∈ ℝᵐˣⁿ where Jᵢⱼ = ∂fᵢ/∂xⱼ

The Jacobian is the best linear approximation: f(x + δ) ≈ f(x) + J(x)δ

**ML Connection:** The Jacobian of the network output w.r.t. the layer input is used in backpropagation to propagate gradients through each layer.

## 4. The Hessian (Matrix of Second Derivatives)
For f: ℝⁿ → ℝ:
H(x) ∈ ℝⁿˣⁿ where Hᵢⱼ = ∂²f/∂xᵢ∂xⱼ

The Hessian captures **curvature** — how the gradient is changing.

**Second-Order Taylor Approximation:**
f(x + δ) ≈ f(x) + ∇f(x)ᵀδ + (1/2)δᵀH(x)δ

**Convexity via Hessian:**
- H positive definite (all eigenvalues > 0) ⟹ f is strictly convex at x (bowl shape — local min)
- H negative definite ⟹ f is strictly concave at x (dome shape — local max)
- H has both positive and negative eigenvalues ⟹ saddle point

**ML Connection:** Saddle points are a major challenge in deep learning optimization — the loss surface has exponentially many saddle points, but gradient descent with noise (SGD) can escape them.
`,
    fullNotes: `
# Detailed Notes: Gradients & Hessians

- **Gradient of Matrix Operations (for ML):**
  - ∂/∂w(wᵀx) = x
  - ∂/∂w(‖w‖²) = 2w
  - ∂/∂W(Wx) = Xᵀ (for matrix W)
  These are the formulas used directly in computing gradients for linear layers.
- **Hessian Cost:** Computing the full Hessian for a neural network with N parameters requires O(N²) memory and O(N³) to invert. For modern networks with billions of parameters, this is completely intractable. Methods like diagonal Hessian approximations (K-FAC, Shampoo) approximate the Hessian efficiently.
`,
    shortNotes: `
- Gradient ∇f(x): vector pointing in direction of steepest ascent
- Gradient descent: θ ← θ - α∇L(θ)
- Jacobian J(x): mxn matrix, best linear approximation of a vector-valued function
- Hessian H(x): nxn symmetric matrix of second-order partial derivatives
- Hessian encodes curvature of the loss surface
- Positive definite Hessian → local minimum (convex)
- Saddle points: positive eigenvalues in some directions, negative in others
`,
    cheatSheet: `
### Gradient Cheat Sheet for Linear Algebra Operations
| Expression | Gradient w.r.t. x |
|-----------|-------------------|
| aᵀx | a |
| xᵀAx | (A + Aᵀ)x = 2Ax (if A symmetric) |
| ‖x‖² = xᵀx | 2x |
| ‖Ax - b‖² | 2Aᵀ(Ax - b) |

\`\`\`python
# Numerical gradient check
def grad_check(f, x, h=1e-5):
    grad = np.zeros_like(x)
    for i in range(x.size):
        x_plus = x.copy(); x_plus.flat[i] += h
        x_minus = x.copy(); x_minus.flat[i] -= h
        grad.flat[i] = (f(x_plus) - f(x_minus)) / (2 * h)
    return grad
\`\`\`
`,
    interviewQuestions: [
      { question: 'What does the Hessian matrix tell us about the shape of the loss surface?', answerHint: 'The Hessian captures curvature. If all eigenvalues of H are positive (positive definite), the loss surface is bowl-shaped at that point — a local minimum. If all are negative, it\'s a local maximum. If eigenvalues have mixed signs, it\'s a saddle point — a minimum in some directions and maximum in others. In deep learning, the loss surface has exponentially many saddle points in high dimensions. The ratio of the largest to smallest eigenvalue (condition number) determines how "elongated" the bowl is — high condition numbers make gradient descent slow and oscillatory.', type: 'TECHNICAL' },
      { question: 'Why can\'t we use Newton\'s method (which uses the Hessian) in practice for deep neural networks?', answerHint: 'Newton\'s method requires computing, storing, and inverting the Hessian matrix, which is an n×n matrix where n is the number of parameters. A model with 100 million parameters would require a 10¹⁶ element matrix — completely intractable in memory (petabytes) and computationally (inverting takes O(n³)). In practice, approximate second-order methods like L-BFGS (quasi-Newton), K-FAC, or Shampoo approximate the Hessian efficiently for use in optimization.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Matrix Calculus for Deep Learning', url: 'https://explained.ai/matrix-calculus/', type: 'ARTICLE', priority: 'S', source: 'Terence Parr & Jeremy Howard', isOfficial: false, description: 'Comprehensive guide to matrix calculus — the calculus used in ML.' },
      { title: 'Calculus for ML (3Blue1Brown + DeepLearning.AI)', url: 'https://www.youtube.com/watch?v=tIeHLnjs5U8', type: 'VIDEO', priority: 'A', source: '3Blue1Brown', isOfficial: false, description: 'Visual explanation of gradients and backpropagation calculus.' }
    ]
  }
};
