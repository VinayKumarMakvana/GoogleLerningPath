export const math_08_bayes = {
  CONDITIONAL_PROBABILITY_BAYES: {
    title: 'Conditional Probability & Bayes',
    description: 'Master Bayesian reasoning, MLE, MAP estimation, and the probabilistic foundations of supervised learning.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 75,
    prerequisites: ['Random Variables & Distributions'],
    learningContent: `
# Conditional Probability & Bayesian Inference

## 1. Joint, Marginal, and Conditional Distributions
For two random variables X and Y with joint distribution p(x, y):

- **Marginal:** p(x) = ∫ p(x, y) dy — integrate out Y to get distribution of X alone
- **Conditional:** p(x|y) = p(x, y) / p(y)
- **Chain Rule:** p(x, y) = p(x|y) · p(y) = p(y|x) · p(x)

## 2. Maximum Likelihood Estimation (MLE)
Given data D = {x₁, ..., xₙ} and a model parameterized by θ:

**Likelihood:** L(θ) = p(D; θ) = Πᵢ p(xᵢ; θ)  (if samples are i.i.d.)
**Log-likelihood:** ℓ(θ) = log L(θ) = Σᵢ log p(xᵢ; θ)

MLE: θ̂_MLE = argmax_θ ℓ(θ)

**Worked Example — Gaussian MLE:**
Given samples x₁,...,xₙ from N(μ, σ²), maximize ℓ(μ, σ²).
Setting ∂ℓ/∂μ = 0 → μ̂ = (1/N)Σxᵢ (sample mean)
Setting ∂ℓ/∂σ² = 0 → σ̂² = (1/N)Σ(xᵢ - μ̂)² (sample variance)

**ML Connection:** Training a neural network with cross-entropy loss is equivalent to MLE for a categorical distribution.

## 3. Maximum A Posteriori (MAP) Estimation
MAP incorporates prior beliefs about parameters:
θ̂_MAP = argmax_θ [log p(D|θ) + log p(θ)]
= argmax_θ [log-likelihood + log-prior]

**ML Connection:** MAP with a Gaussian prior P(θ) = N(0, 1/λ·I) is equivalent to training with L2 (Ridge) regularization! The regularization coefficient λ encodes the precision of the prior.

## 4. The Bayesian Update
Posterior ∝ Likelihood × Prior
p(θ|D) ∝ p(D|θ) · p(θ)

As we observe more data, the likelihood dominates and the posterior concentrates around the true parameter (assuming a consistent model).

**Intuition:** Prior = what we believe before seeing data. Posterior = updated belief after evidence.
`,
    fullNotes: `
# Detailed Notes: Bayesian Inference

- **Conjugate Priors:** If the prior and posterior are in the same distribution family, the prior is conjugate to the likelihood. E.g., Beta prior + Bernoulli likelihood → Beta posterior. Allows analytical closed-form updates without integration.
- **MLE vs MAP vs Bayesian:** MLE gives a single point estimate. MAP gives a point estimate with regularization. Full Bayesian inference keeps the entire posterior distribution, allowing uncertainty quantification — at the cost of computational complexity (requires integration over θ).
- **Empirical Bayes:** Setting the prior hyperparameters by maximizing the marginal likelihood p(D) = ∫ p(D|θ)p(θ)dθ. A middle ground between MAP and full Bayesian.
`,
    shortNotes: `
- MLE: maximize P(data|θ) — finds parameters that make observed data most probable
- Log-likelihood: log of the product becomes a sum — numerically stable
- MAP: maximize P(data|θ)·P(θ) — MLE + prior knowledge (regularization)
- L2 regularization = MAP with Gaussian prior
- L1 regularization = MAP with Laplace prior
- Bayesian inference: maintain full posterior distribution over θ
- Cross-entropy loss ≡ negative log-likelihood for categorical models
`,
    cheatSheet: `
### MLE vs MAP vs Bayesian
| Method | Objective | Result | Cost |
|--------|----------|--------|------|
| MLE | max P(D|θ) | Point estimate | Cheap |
| MAP | max P(D|θ)P(θ) | Point estimate + regularization | Cheap |
| Bayesian | full P(θ|D) | Distribution over θ | Expensive |

### Regularization as Bayesian Priors
| Regularizer | Equivalent Prior |
|-------------|-----------------|
| L2 (Ridge) | Gaussian prior N(0, 1/λ) |
| L1 (LASSO) | Laplace prior |
`,
    interviewQuestions: [
      { question: 'Why do we use log-likelihood instead of likelihood in MLE?', answerHint: 'Two reasons. First, numerical stability: the likelihood is a product of many probabilities (each ≤ 1), which quickly underflows to zero in floating-point arithmetic for large datasets. Taking the log converts the product to a sum, preventing underflow. Second, mathematical convenience: log is a monotone transformation, so maximizing log-likelihood gives the same parameters as maximizing likelihood. The log of a product becomes a sum, which is easier to differentiate.', type: 'TECHNICAL' },
      { question: 'Explain how L2 regularization has a Bayesian interpretation.', answerHint: 'MAP estimation maximizes log P(D|θ) + log P(θ). If we choose a Gaussian prior P(θ) = N(0, (1/λ)I), then log P(θ) = -λ/2 · ‖θ‖² + const. So MAP becomes: argmax [log-likelihood - (λ/2)‖θ‖²], which is equivalent to minimizing: [-log-likelihood + (λ/2)‖θ‖²]. The second term is exactly L2 regularization. The regularization coefficient λ controls the precision of the Gaussian prior — a large λ corresponds to a tight prior pulling θ toward 0.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'StatQuest: Maximum Likelihood', url: 'https://www.youtube.com/watch?v=XepXtl9YKwc', type: 'VIDEO', priority: 'S', source: 'StatQuest', isOfficial: false, description: 'Intuitive MLE explanation with worked examples.' },
      { title: 'Bayesian Methods for ML (HSE Coursera)', url: 'https://www.coursera.org/learn/bayesian-methods-in-machine-learning', type: 'COURSE', priority: 'A', source: 'Coursera / HSE University', isOfficial: false, description: 'Comprehensive Bayesian ML course.' }
    ]
  }
};
