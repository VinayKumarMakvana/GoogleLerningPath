export const math_07_distributions = {
  RANDOM_VARIABLES_DISTRIBUTIONS: {
    title: 'Random Variables & Distributions',
    description: 'Master random variables, expectation, variance, covariance, and essential probability distributions used in ML.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 90,
    prerequisites: ['Probability Fundamentals'],
    learningContent: `
# Random Variables & Distributions

## 1. Random Variables
A random variable X maps each outcome in a sample space Ω to a real number.
- **Discrete RV:** Takes countable values. Described by PMF: P(X=x)
- **Continuous RV:** Takes values in ℝ. Described by PDF: f(x), where P(a≤X≤b) = ∫ₐᵇ f(x)dx

## 2. Expectation, Variance, Covariance

**Expectation (Mean):** The weighted average value.
- Discrete: 𝔼[X] = Σₓ x·P(X=x)
- Continuous: 𝔼[X] = ∫ x·f(x)dx

**Properties:** 𝔼[aX + b] = a𝔼[X] + b  |  𝔼[X+Y] = 𝔼[X] + 𝔼[Y] (always!)

**Variance:** Measures spread: Var(X) = 𝔼[(X - 𝔼[X])²] = 𝔼[X²] - (𝔼[X])²

**Covariance:** Measures linear relationship: Cov(X,Y) = 𝔼[(X-μₓ)(Y-μᵧ)]

**Correlation:** ρ(X,Y) = Cov(X,Y) / (σₓ·σᵧ) ∈ [-1, 1]

## 3. Key Distributions for ML

### Bernoulli Distribution
P(X=1) = p, P(X=0) = 1-p
𝔼[X] = p, Var(X) = p(1-p)
**ML use:** Binary classification output layer

### Gaussian (Normal) Distribution
f(x) = (1/√(2πσ²)) exp(-(x-μ)²/2σ²)
𝔼[X] = μ, Var(X) = σ²
**ML use:** Weight initialization, noise models, Gaussian processes, variational autoencoders

### Categorical Distribution
Generalization of Bernoulli to K classes.
P(X=k) = pₖ where Σpₖ = 1
**ML use:** Multiclass classification softmax output

### Exponential Distribution
f(x) = λe^(-λx) for x ≥ 0
𝔼[X] = 1/λ, Var(X) = 1/λ²
**ML use:** Modeling time between events; Poisson processes

### Uniform Distribution
f(x) = 1/(b-a) for a ≤ x ≤ b
**ML use:** Weight initialization (Xavier), random seeds

## 4. Law of Large Numbers & Central Limit Theorem

**Law of Large Numbers (LLN):** As N → ∞, the sample mean converges to the true mean:
(1/N)Σᵢ Xᵢ → 𝔼[X]

**Central Limit Theorem (CLT):** The sum of N independent RVs, properly normalized, converges to a Gaussian distribution, regardless of the original distribution.
Z = (X̄ - μ)/(σ/√N) → N(0,1) as N → ∞
`,
    fullNotes: `
# Detailed Notes: Distributions

- **PDF vs PMF vs CDF:**
  - PMF (probability mass function) gives P(X=x) for discrete RVs
  - PDF (probability density function) f(x) for continuous RVs: P(a≤X≤b) = ∫f(x)dx
  - CDF (cumulative distribution function) F(x) = P(X≤x). F'(x) = f(x) for continuous RVs
- **Multivariate Gaussian:** x ~ N(μ, Σ). The covariance matrix Σ captures correlations. When Σ is diagonal, dimensions are uncorrelated. The PDF involves the inverse and determinant of Σ — tying back to linear algebra.
`,
    shortNotes: `
- Discrete RV: PMF P(X=x). Continuous: PDF f(x)
- 𝔼[X+Y] = 𝔼[X] + 𝔼[Y] (linearity of expectation — always true)
- Var(X) = 𝔼[X²] - (𝔼[X])²
- Gaussian N(μ, σ²): symmetric, bell-shaped — ubiquitous in ML
- LLN: sample means converge to true mean as N→∞
- CLT: sum of many independent RVs is approximately Gaussian
- Correlation ρ ∈ [-1,1]; zero correlation ≠ independence
`,
    cheatSheet: `
### Key Distributions Cheat Sheet
| Distribution | Parameters | Mean | Var | ML Use |
|-------------|-----------|------|-----|--------|
| Bernoulli | p | p | p(1-p) | Binary output |
| Binomial | n, p | np | np(1-p) | Count of successes |
| Gaussian | μ, σ² | μ | σ² | Everywhere |
| Categorical | p₁..pₖ | — | — | Multiclass softmax |
| Uniform | a, b | (a+b)/2 | (b-a)²/12 | Initialization |

\`\`\`python
from scipy import stats
# Gaussian
stats.norm(mu, sigma).pdf(x)
stats.norm(mu, sigma).cdf(x)

# Sampling
np.random.normal(mu, sigma, size=1000)
\`\`\`
`,
    interviewQuestions: [
      { question: 'Why is the Gaussian distribution so prevalent in machine learning?', answerHint: 'Several reasons. (1) Central Limit Theorem: the average of many independent random variables tends toward Gaussian regardless of their original distributions, making it a natural model for many real-world phenomena. (2) Maximum entropy: the Gaussian is the distribution with maximum entropy given a fixed mean and variance, making it the least-informative (most conservative) choice. (3) Mathematical convenience: Gaussians are closed under linear transformations and convolution, making them tractable analytically.', type: 'CONCEPTUAL' },
      { question: 'What does the Central Limit Theorem tell us, and why is it important for ML?', answerHint: 'The CLT states that the sum (or average) of N independent, identically distributed random variables with finite variance approaches a Gaussian distribution as N → ∞, regardless of the original distribution. In ML, it justifies why many estimators (like the sample mean of the training loss) are approximately Gaussian for large datasets, enabling confidence intervals and hypothesis tests. It also underlies why Gaussian noise models are often reasonable approximations.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'StatQuest: Probability Distributions', url: 'https://www.youtube.com/watch?v=oI3hZJqXJuc', type: 'VIDEO', priority: 'S', source: 'StatQuest', isOfficial: false, description: 'Visual, intuitive probability distributions explained for ML.' },
      { title: 'Probability and Statistics for ML (Khan Academy)', url: 'https://www.khanacademy.org/math/statistics-probability', type: 'COURSE', priority: 'A', source: 'Khan Academy', isOfficial: false, description: 'Free, comprehensive probability and statistics course.' }
    ]
  }
};
