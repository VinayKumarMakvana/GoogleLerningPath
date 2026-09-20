export const math_10_calculus = {
  MULTIVARIABLE_CALCULUS: {
    title: 'Multivariable Calculus',
    description: 'Master derivatives, partial derivatives, chain rule, and multivariable calculus foundations required for optimization.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 90,
    prerequisites: ['Mathematical Foundations'],
    learningContent: `
# Multivariable Calculus

## 1. Derivatives
The derivative f'(x) measures the instantaneous rate of change of f at x:
f'(x) = lim_{h→0} [f(x+h) - f(x)] / h

**Geometric interpretation:** Slope of the tangent line at x.

**Key rules:**
- Power rule: d/dx(xⁿ) = nxⁿ⁻¹
- Product rule: d/dx[f·g] = f'g + fg'
- Quotient rule: d/dx[f/g] = (f'g - fg')/g²
- Chain rule: d/dx[f(g(x))] = f'(g(x))·g'(x)

## 2. Partial Derivatives
For f: ℝⁿ → ℝ, the partial derivative with respect to xᵢ treats all other variables as constants:
∂f/∂xᵢ = lim_{h→0} [f(x₁,...,xᵢ+h,...,xₙ) - f(x)] / h

**Worked Example:**
f(x, y) = 3x²y + sin(y)
∂f/∂x = 6xy    (treat y as constant)
∂f/∂y = 3x² + cos(y)   (treat x as constant)

## 3. The Chain Rule (The Most Important Rule for ML)
For composite functions:
d/dx[f(g(x))] = (∂f/∂g)(∂g/∂x)

**Multi-dimensional chain rule:**
If z = f(y₁, ..., yₘ) and each yᵢ = gᵢ(x₁,...,xₙ):
∂z/∂xⱼ = Σᵢ (∂z/∂yᵢ)(∂yᵢ/∂xⱼ)

**ML Connection:** Backpropagation is EXACTLY the chain rule applied recursively through the layers of a neural network. Each layer's gradient = (output's gradient w.r.t. layer output) × (layer output's gradient w.r.t. layer input).

## 4. Taylor Approximation
A function f can be approximated near point a:
f(x) ≈ f(a) + f'(a)(x-a) + (1/2)f''(a)(x-a)² + ...

**First-order approximation (linear):** f(x) ≈ f(a) + f'(a)(x-a)
**Second-order approximation (quadratic):** + (1/2)f''(a)(x-a)²

**ML Connection:** Newton's method for optimization uses the second-order Taylor approximation to find a better step direction than plain gradient descent.
`,
    fullNotes: `
# Detailed Notes: Calculus

- **Implicit Differentiation:** When a relationship between x and y is given implicitly (e.g., x² + y² = 1), differentiate both sides and solve for dy/dx. Used in deriving backpropagation through certain operations.
- **L'Hôpital's Rule:** If a limit gives 0/0 or ∞/∞ form: lim f(x)/g(x) = lim f'(x)/g'(x). Used to analyze behavior of activation functions near their limits.
- **Integration:** The fundamental theorem of calculus: ∫ₐᵇ f'(x)dx = f(b) - f(a). Integration appears in continuous probability distributions (computing probabilities and expectations).
`,
    shortNotes: `
- Derivative f'(x): instantaneous slope of f at x
- Partial derivative ∂f/∂xᵢ: derivative w.r.t. xᵢ, holding all others constant
- Chain rule: d/dx[f(g(x))] = f'(g(x))·g'(x)
- Backpropagation = chain rule applied recursively through network layers
- Taylor approximation: approximate f near a as polynomial
- Second-order Taylor: uses f''(a) — the curvature — for better approximation
`,
    cheatSheet: `
### Derivatives of Common ML Functions
| Function f(x) | f'(x) |
|--------------|-------|
| xⁿ | nxⁿ⁻¹ |
| eˣ | eˣ |
| ln(x) | 1/x |
| sin(x) | cos(x) |
| sigmoid σ(x)=1/(1+e⁻ˣ) | σ(x)(1-σ(x)) |
| tanh(x) | 1 - tanh²(x) |
| ReLU max(0,x) | 0 if x<0, 1 if x>0 |

\`\`\`python
# Numerical gradient (finite differences)
def numerical_gradient(f, x, h=1e-5):
    return (f(x + h) - f(x - h)) / (2 * h)
\`\`\`
`,
    interviewQuestions: [
      { question: 'Why is the chain rule central to training neural networks?', answerHint: 'A neural network is a composition of many functions (layers). To minimize the loss, we need the gradient of the loss with respect to every parameter in every layer. The chain rule allows us to compute these gradients efficiently by propagating the gradient signal backward through the network — this is backpropagation. For each layer, the gradient of the loss w.r.t. that layer\'s input = (gradient w.r.t. layer\'s output) × (Jacobian of the layer\'s operation).', type: 'TECHNICAL' },
      { question: 'What is a Taylor approximation, and how is it used in optimization?', answerHint: 'A Taylor approximation expresses a function as a polynomial around a point. The first-order approximation is the tangent line (linear). The second-order adds curvature information via the second derivative (quadratic bowl shape). In optimization, gradient descent uses the first-order approximation: step in the direction of steepest descent. Newton\'s method uses the second-order approximation (Hessian matrix), finding a better step by accounting for curvature — converging much faster but at greater computational cost.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Essence of Calculus (3Blue1Brown)', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr', type: 'VIDEO', priority: 'S', source: '3Blue1Brown', isOfficial: false, description: 'The best visual introduction to calculus — mandatory viewing.' },
      { title: 'Multivariable Calculus (MIT 18.02)', url: 'https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/', type: 'COURSE', priority: 'A', source: 'MIT OpenCourseWare', isOfficial: true, description: 'MIT OCW multivariable calculus course.' }
    ]
  }
};
