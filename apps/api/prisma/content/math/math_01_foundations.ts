export const math_01_foundations = {
  MATHEMATICAL_FOUNDATIONS: {
    title: 'Mathematical Foundations',
    description: 'Master mathematical notation, sets, functions, logic, and the language of mathematics used throughout ML.',
    difficulty: 'BEGINNER',
    estimatedLearnTime: 60,
    prerequisites: [],
    learningContent: `
# Mathematical Foundations

Before studying linear algebra or calculus, it's essential to understand the language of mathematics — notation, sets, functions, and logic.

## 1. Mathematical Notation
ML papers are dense with symbols. Understanding them fluently is prerequisite to reading research.

| Symbol | Meaning |
|--------|---------|
| ∀ | For all (universal quantifier) |
| ∃ | There exists (existential quantifier) |
| ∈ | Element of (x ∈ S means x is in set S) |
| ⊆ | Subset of |
| ℝ | Set of all real numbers |
| ℝⁿ | n-dimensional real vector space |
| ℝᵐˣⁿ | Set of all m×n real matrices |
| ≜ | Defined as |
| ∝ | Proportional to |
| argmax | Argument that maximizes a function |

## 2. Sets
A set is an unordered collection of distinct objects.
- **Intersection:** A ∩ B = elements in both A and B
- **Union:** A ∪ B = elements in A or B (or both)
- **Complement:** Aᶜ = elements NOT in A
- **Cartesian Product:** A × B = all ordered pairs (a, b) where a∈A, b∈B

**ML Connection:** The training set 𝒟 = {(x⁽ⁱ⁾, y⁽ⁱ⁾)}ᵢ₌₁ᴺ is a set of input-output pairs.

## 3. Functions
A function f: X → Y maps each element of domain X to exactly one element of codomain Y.

- **Injective (one-to-one):** Different inputs produce different outputs. f(a) = f(b) ⟹ a = b
- **Surjective (onto):** Every element of Y has at least one preimage in X
- **Bijective:** Both injective and surjective — a perfect pairing

**ML Connection:** A neural network is a function f: ℝⁿ → ℝᵏ mapping input vectors to output probabilities.

## 4. Sums, Products, and Sigma Notation
\`\`\`
N
Σ xᵢ = x₁ + x₂ + ... + xₙ    (sum from i=1 to N)
i=1

N
Π xᵢ = x₁ × x₂ × ... × xₙ   (product)
i=1
\`\`\`

**ML Connection:** The empirical loss is: L(θ) = (1/N) Σᵢ₌₁ᴺ ℓ(f(x⁽ⁱ⁾; θ), y⁽ⁱ⁾)
`,
    fullNotes: `
# Detailed Notes: Mathematical Foundations

- **Proof by Induction:** Base case + inductive step proves a property holds for all natural numbers. Commonly used to prove properties of recursive algorithms and series.
- **Floor and Ceiling:** ⌊x⌋ = largest integer ≤ x. ⌈x⌉ = smallest integer ≥ x. Used in computing kernel sizes, stride calculations, etc.
- **Absolute Value and Modulus:** |x| = x if x ≥ 0, else -x. Extended to complex numbers as modulus. Used in L1 norm.
- **log notation in ML:** In ML, log without a base almost always means natural logarithm (logₑ = ln). This matters because log₂ is used in information theory and logₑ in likelihood calculations.
`,
    shortNotes: `
- ∀ = "for all", ∃ = "there exists", ∈ = "element of"
- ℝⁿ means n-dimensional real vector space (the space ML lives in)
- A function maps each input to exactly one output
- In ML, log without a base means natural log (ln)
- argmax f(x) returns the x value that maximizes f, not the maximum value itself
- Σ (sigma) notation sums a sequence — used everywhere in loss functions
`,
    cheatSheet: `
### ML Math Notation Quick Reference
| Notation | Meaning |
|---------|---------|
| x ∈ ℝⁿ | x is an n-dimensional real vector |
| A ∈ ℝᵐˣⁿ | A is an m×n real matrix |
| θ* = argmin L(θ) | θ* is the parameter that minimizes loss L |
| p(x) | Probability density/mass of x |
| 𝔼[X] | Expected value of random variable X |
| ∇f(x) | Gradient of f at point x |
| ‖x‖₂ | L2 (Euclidean) norm of vector x |
`,
    interviewQuestions: [
      { question: 'What does argmin and argmax mean in the context of ML optimization?', answerHint: 'argmin f(θ) returns the value of θ that minimizes f(θ), not the minimum value itself. argmax f(θ) returns the value that maximizes it. In ML, θ* = argmin_θ L(θ) means we seek the model parameters θ* that minimize the loss function L. This is the fundamental goal of training: finding the parameter vector in a high-dimensional space that produces the smallest possible prediction error.', type: 'CONCEPTUAL' },
      { question: 'What is the difference between a function being injective and surjective?', answerHint: 'An injective (one-to-one) function maps distinct inputs to distinct outputs — no two different inputs produce the same output. A surjective (onto) function ensures every element of the codomain has at least one preimage. A bijective function is both, creating a perfect one-to-one correspondence. In ML, invertible transformations (like in normalizing flows) must be bijective.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Mathematics for Machine Learning (Book — Free PDF)', url: 'https://mml-book.github.io/', type: 'BOOK', priority: 'S', source: 'Deisenroth, Faisal & Ong', isOfficial: true, description: 'The definitive free textbook covering all math needed for ML.' },
      { title: 'Math for ML — Full Course', url: 'https://www.youtube.com/watch?v=uZeDTwWcnuY', type: 'VIDEO', priority: 'S', source: 'StatQuest with Josh Starmer', isOfficial: false, description: 'Clear, intuitive math explanations tailored for ML practitioners.' }
    ]
  }
};
