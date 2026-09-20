export const math_12_optimization = {
  OPTIMIZATION: {
    title: 'Optimization',
    description: 'Master convexity, gradient descent, SGD, constrained optimization, and Lagrange multipliers.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Gradients, Jacobians & Hessians'],
    learningContent: `
# Optimization

Optimization is the mathematical engine of machine learning. Training a model means solving:
θ* = argmin_θ L(θ)
where L is the loss function.

## 1. Convexity

A function f is **convex** if for any x, y and t ∈ [0,1]:
f(tx + (1-t)y) ≤ tf(x) + (1-t)f(y)

(The chord between any two points lies above the function — "bowl shaped")

**Why convexity matters:** Convex functions have only ONE global minimum. Any local minimum is the global minimum. Gradient descent is guaranteed to find it.

**Checking convexity:**
- f''(x) ≥ 0 for all x (1D)
- Hessian H(x) is positive semi-definite for all x (multi-D)

**ML Connection:** Logistic regression, SVMs, and linear regression have convex loss functions (global optimum guaranteed). Neural networks do NOT — but empirically, local minima found by SGD generalize well.

## 2. Gradient Descent
Iteratively move against the gradient:
θₜ₊₁ = θₜ - α∇L(θₜ)

where α is the **learning rate** (step size).

**Convergence Analysis:**
- If f is convex and α ≤ 1/L (where L is the Lipschitz constant of ∇f), gradient descent converges.
- Convergence rate: O(1/t) for convex, O(exp(-t)) for strongly convex.

**Choosing α:**
- Too large: diverges (overshoots minimum)
- Too small: very slow convergence
- Optimal: use line search or adaptive learning rates

## 3. Stochastic Gradient Descent (SGD)
Instead of computing the full gradient over N samples (expensive), use ONE random sample:
θₜ₊₁ = θₜ - α∇L(θₜ; xᵢ, yᵢ)

**Mini-batch SGD:** Use a batch of B samples (B = 32, 64, 128, etc.) — balances speed and accuracy of gradient estimate.

**Why SGD works:** The noisy gradient is an unbiased estimator of the true gradient. The noise also helps escape saddle points and poor local minima.

## 4. Constrained Optimization & Lagrange Multipliers
Minimize f(x) subject to constraint g(x) = 0.

Form the **Lagrangian:** L(x, λ) = f(x) + λg(x)

At the optimum: ∇ₓL = 0 and ∂L/∂λ = 0 (i.e., g(x) = 0)

This is equivalent to finding where ∇f and ∇g are parallel.

**Worked Example — SVM Hard Margin:**
Maximize margin ⟺ minimize ‖w‖²/2
Subject to: yᵢ(wᵀxᵢ + b) ≥ 1

The Lagrangian formulation leads to the dual problem where support vectors (points on the margin) have nonzero Lagrange multipliers.
`,
    fullNotes: `
# Detailed Notes: Optimization

- **KKT Conditions:** For inequality constraints g(x) ≤ 0, the Karush-Kuhn-Tucker (KKT) conditions generalize Lagrange multipliers. A point x* is optimal if: ∇f(x*) + Σλᵢ∇gᵢ(x*) = 0, λᵢ ≥ 0, λᵢgᵢ(x*) = 0. The complementary slackness condition (λᵢgᵢ = 0) means either the constraint is active (binding) or its multiplier is zero.
- **Lipschitz Continuity:** A function f is L-Lipschitz if |f(x) - f(y)| ≤ L‖x-y‖. Gradient descent requires the gradient to be L-Lipschitz smooth for convergence guarantees. This bounds how much the gradient can change per unit step.
`,
    shortNotes: `
- Convex function: chord always lies above curve — single global minimum
- Hessian positive semi-definite ↔ convex function
- Gradient descent: θ ← θ - α∇L(θ). Learning rate α is critical.
- SGD: use one (or mini-batch) sample per update — unbiased gradient estimate
- SGD noise helps escape saddle points — useful in non-convex ML loss surfaces
- Lagrange multipliers: optimization with equality constraints
- KKT conditions: generalization to inequality constraints
`,
    cheatSheet: `
### Optimization Methods Comparison
| Method | Gradient Computation | Memory | Convergence |
|--------|-------------------|--------|------------|
| Batch GD | Full dataset | O(n) | Stable, slow per iter |
| SGD | 1 sample | O(1) | Noisy, fast iters |
| Mini-batch SGD | B samples | O(B) | Balance of both |
| Newton's | Full Hessian | O(n²) | Fast (quadratic) |
| L-BFGS | Hessian approx | O(n) | Quasi-Newton |
| Adam | Adaptive per-param | O(n) | Practical default |

\`\`\`python
# Gradient descent in numpy
def gradient_descent(f_grad, theta, lr=0.01, steps=1000):
    for _ in range(steps):
        theta = theta - lr * f_grad(theta)
    return theta
\`\`\`
`,
    interviewQuestions: [
      { question: 'Why does SGD often perform better than full-batch gradient descent in practice for deep learning?', answerHint: 'Several reasons. (1) Computational efficiency: SGD processes one mini-batch per update, allowing many more updates per unit time than full-batch GD. (2) Regularization effect: the inherent noise in SGD acts as a form of regularization, preventing overfitting. (3) Escape from saddle points: the gradient noise helps escape saddle points (which have zero gradient) and sharp local minima that would trap deterministic GD. (4) Online learning: SGD can process a continuous data stream without storing all data in memory.', type: 'TECHNICAL' },
      { question: 'What is the role of Lagrange multipliers in constrained optimization?', answerHint: 'Lagrange multipliers transform a constrained optimization problem into an unconstrained one. For minimizing f(x) subject to g(x) = 0, we form the Lagrangian L(x,λ) = f(x) + λg(x). At the optimum, ∇L = 0 requires that ∇f and ∇g are parallel — the objective\'s gradient has no component along the constraint surface. The multiplier λ quantifies how much the optimal value of f changes with a unit change in the constraint. In SVMs, Lagrange multipliers identify the support vectors.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Convex Optimization (Boyd & Vandenberghe)', url: 'https://web.stanford.edu/~boyd/cvxbook/', type: 'BOOK', priority: 'S', source: 'Stanford', isOfficial: true, description: 'The definitive free textbook on convex optimization.' },
      { title: 'Gradient Descent — StatQuest', url: 'https://www.youtube.com/watch?v=sDv4f4s2SB8', type: 'VIDEO', priority: 'S', source: 'StatQuest', isOfficial: false, description: 'Clear visual explanation of gradient descent.' }
    ]
  }
};
