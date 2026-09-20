export const math_13_numerical = {
  NUMERICAL_METHODS: {
    title: 'Numerical Methods & Computational Mathematics',
    description: 'Master floating-point arithmetic, numerical stability, numerical differentiation, and linear system solvers.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 60,
    prerequisites: ['Matrices & Linear Transformations', 'Optimization'],
    learningContent: `
# Numerical Methods & Computational Mathematics

## 1. Floating-Point Arithmetic
Computers represent real numbers in binary floating-point (IEEE 754). This introduces limitations:

- **Machine epsilon (ε):** The smallest number such that 1 + ε ≠ 1 in floating-point. For float64: ε ≈ 2.2×10⁻¹⁶. Numbers differing by less than ε are indistinguishable.
- **Overflow:** Result exceeds the maximum representable value (returns ±inf)
- **Underflow:** Result is smaller than the minimum positive value (rounded to 0)

\`\`\`python
import numpy as np

# Catastrophic cancellation example
a = 1.0
b = 1.0 + 1e-15
print(b - a)          # ~9.99e-16 (ok)

a = 1e16
b = 1e16 + 1
print(b - a)          # 0.0! — a and b are indistinguishable in float64
\`\`\`

## 2. Numerical Stability
A computation is **numerically stable** if small errors in the input cause only small errors in the output.

**Log-Sum-Exp trick (critical for ML):**
Computing log(Σeˣⁱ) for large xᵢ causes overflow. Subtract the max first:
log(Σeˣⁱ) = max(x) + log(Σe^(xᵢ - max(x)))

This keeps exponents ≤ 0, preventing overflow. Used in every softmax implementation.

\`\`\`python
def log_softmax_stable(x):
    # Numerically stable log-softmax
    x_max = np.max(x)
    log_sum = np.log(np.sum(np.exp(x - x_max))) + x_max
    return x - log_sum
\`\`\`

## 3. Numerical Differentiation
When an analytical gradient is unavailable, approximate with finite differences:

**Forward difference:** f'(x) ≈ [f(x+h) - f(x)] / h  — error O(h)
**Central difference:** f'(x) ≈ [f(x+h) - f(x-h)] / (2h)  — error O(h²) — preferred

\`\`\`python
# Gradient checking in ML (validates backprop implementation)
def gradient_check(f, params, h=1e-5):
    numerical_grad = np.zeros_like(params)
    for i in range(params.size):
        params_plus = params.copy(); params_plus.flat[i] += h
        params_minus = params.copy(); params_minus.flat[i] -= h
        numerical_grad.flat[i] = (f(params_plus) - f(params_minus)) / (2 * h)
    return numerical_grad
\`\`\`

## 4. Solving Linear Systems
For Ax = b, avoid computing A⁻¹ directly. Instead:
- **LU decomposition:** A = LU, then solve Ly = b (forward sub), Ux = y (backward sub)
- **Conjugate Gradient:** For symmetric positive definite systems — iterative, efficient for large sparse A

**Condition Number:** κ(A) = σₘₐₓ/σₘᵢₙ
- κ ≈ 1: well-conditioned (numerically stable)
- κ >> 1: ill-conditioned (small input changes → large output changes)
`,
    fullNotes: `
# Detailed Notes: Numerical Methods

- **Catastrophic Cancellation:** Subtracting two nearly equal numbers loses significant digits. E.g., computing (√(x+1) - √x) for large x using this formula is catastrophic. Rewrite algebraically first: multiply by (√(x+1)+√x)/(√(x+1)+√x) to get 1/(√(x+1)+√x).
- **float16 vs float32 vs float64:** ML training typically uses float32 (4 bytes, ε≈1.19×10⁻⁷) for a good speed/accuracy trade-off. Float16 (2 bytes) is used in mixed-precision training — fast on GPU tensor cores, but prone to overflow/underflow for sensitive operations. Float64 (8 bytes) is Python's default and is used in scientific computing where high precision matters.
`,
    shortNotes: `
- Float64 machine epsilon ≈ 2.2×10⁻¹⁶ — numbers closer than this are identical
- Never subtract nearly-equal floating-point numbers (catastrophic cancellation)
- Log-Sum-Exp trick: subtract max before exponentiation to prevent overflow
- Central difference (h²) more accurate than forward difference (h) for numerical gradients
- Condition number κ = σ_max/σ_min — high κ → ill-conditioned system
- Use np.linalg.solve(A, b), not np.linalg.inv(A) @ b for numerical stability
`,
    cheatSheet: `
### Numerically Stable ML Patterns
| Problem | Unstable | Stable |
|---------|---------|--------|
| Softmax | exp(x)/Σexp(x) | exp(x-max)/Σexp(x-max) |
| Log-softmax | log(softmax(x)) | x - log(Σexp(x)) using LSE trick |
| L2 norm | sqrt(Σx²) | np.linalg.norm(x) (uses hypot) |
| Solve Ax=b | inv(A) @ b | np.linalg.solve(A, b) |

\`\`\`python
# Numerically stable log-sum-exp
def logsumexp(x):
    c = np.max(x)
    return c + np.log(np.sum(np.exp(x - c)))
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is numerical stability, and why does it matter in ML?', answerHint: 'Numerical stability means that small perturbations in the input cause proportionally small errors in the output. Unstable computations amplify floating-point rounding errors, leading to incorrect or inf/nan results. In ML, this matters during training because an unstable forward or backward pass can produce nan gradients, causing the optimizer to diverge. Classic examples: direct softmax computation overflows for large logits (fixed by subtracting the max — the log-sum-exp trick), and computing log(p) directly underflows for very small probabilities.', type: 'TECHNICAL' },
      { question: 'Why is the central difference formula preferred over the forward difference for gradient checking?', answerHint: 'The forward difference approximation has error O(h) — the error is proportional to the step size h. The central difference has error O(h²) — much smaller for the same h. With h=1e-5, the forward difference has error ≈10⁻⁵ while the central difference has error ≈10⁻¹⁰. This precision is critical for gradient checking, where you\'re comparing numerical and analytical gradients and need the numerical one to be highly accurate to detect bugs.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Numerical Methods for Scientists and Engineers', url: 'https://numerical.recipes/', type: 'BOOK', priority: 'A', source: 'Numerical Recipes', isOfficial: false, description: 'Classic reference for numerical methods.' },
      { title: 'Fast.ai Numerical Stability Lesson', url: 'https://www.youtube.com/watch?v=4u8FxNEDUeg', type: 'VIDEO', priority: 'A', source: 'fast.ai', isOfficial: false, description: 'Practical numerical stability for deep learning practitioners.' }
    ]
  }
};
