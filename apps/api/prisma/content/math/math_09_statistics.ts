export const math_09_statistics = {
  STATISTICS_ESTIMATION: {
    title: 'Statistics & Estimation',
    description: 'Master sampling theory, estimators, confidence intervals, hypothesis testing, and statistical foundations for ML.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 75,
    prerequisites: ['Random Variables & Distributions'],
    learningContent: `
# Statistics & Estimation

## 1. Estimators
An **estimator** is a function of observed data that estimates an unknown population parameter θ.

**Properties of good estimators:**
- **Unbiased:** 𝔼[θ̂] = θ — on average, the estimate equals the true value
- **Consistent:** θ̂ → θ as N → ∞ — more data gives better estimates
- **Efficient:** Minimum variance among all unbiased estimators

**Bias-Variance Decomposition:**
𝔼[(θ̂ - θ)²] = [Bias(θ̂)]² + Var(θ̂)
= (𝔼[θ̂] - θ)² + 𝔼[(θ̂ - 𝔼[θ̂])²]

**ML Connection:** This is the exact same bias-variance tradeoff in model selection! High-capacity models have low bias, high variance (overfit). Low-capacity models have high bias, low variance (underfit).

## 2. Sampling Distribution and Standard Error
Given sample mean X̄ = (1/N)Σxᵢ from N(μ, σ²):
- 𝔼[X̄] = μ (unbiased)
- Var(X̄) = σ²/N
- **Standard Error = σ/√N** — how much the sample mean varies across samples

As N increases, the standard error shrinks — larger datasets give more reliable estimates.

## 3. Confidence Intervals
A **95% confidence interval** for the true mean μ:
[X̄ - 1.96·(σ/√N),  X̄ + 1.96·(σ/√N)]

**Correct interpretation:** If we repeated this procedure many times, 95% of constructed intervals would contain the true μ. (It does NOT mean: there's 95% probability μ is in this specific interval.)

## 4. Hypothesis Testing
The framework for deciding if observed data is consistent with a null hypothesis H₀.
1. State H₀ (e.g., the model has no predictive power)
2. Compute test statistic
3. Find p-value: P(seeing data this extreme | H₀ is true)
4. If p < 0.05, reject H₀

**ML Connection:** A/B testing for model comparison uses hypothesis testing to determine if a new model's improvement is statistically significant.

## 5. Bias-Variance Tradeoff in ML
Total Expected Error = Bias² + Variance + Irreducible Noise

- **High Bias (Underfitting):** The model is too simple and fails to capture the true signal.
- **High Variance (Overfitting):** The model memorizes training noise; poor generalization.
- The optimal model balances both.
`,
    fullNotes: `
# Detailed Notes: Statistics

- **Bessel's Correction:** The sample variance s² = (1/(N-1))Σ(xᵢ-x̄)² divides by N-1 instead of N to give an unbiased estimate of the population variance. Dividing by N gives a biased (consistently underestimated) result.
- **p-value Misconceptions:** A p-value of 0.03 does NOT mean: (a) there's 3% probability the null is true, or (b) 97% confidence in the alternative. It means: IF the null hypothesis were true, there would be only 3% chance of observing data this extreme or more extreme by random chance.
- **Multiple Comparisons Problem:** If you test 100 models and use p < 0.05 as threshold, you expect 5 false positives even if all models are equally bad. Use Bonferroni correction or FDR-controlling procedures.
`,
    shortNotes: `
- Bias: systematic deviation of estimator from true value
- Variance: spread of estimator across different samples
- Standard Error = σ/√N — shrinks with more data
- 95% CI: if repeated, 95% of such intervals contain the true parameter
- p-value: probability of seeing this data (or more extreme) if H₀ is true
- Bias-Variance tradeoff: complex models have low bias, high variance
- Use N-1 (Bessel's correction) for unbiased sample variance
`,
    cheatSheet: `
### Statistical Tests Quick Reference
| Test | When to Use |
|------|------------|
| t-test | Compare means (small samples, σ unknown) |
| z-test | Compare means (large N, σ known) |
| chi-squared | Test categorical distributions |
| F-test | Compare variances or multiple means (ANOVA) |
| Mann-Whitney U | Non-parametric alternative to t-test |

### Bias-Variance Examples
| Model | Bias | Variance | Result |
|-------|------|---------|--------|
| Linear regression on complex data | High | Low | Underfitting |
| Deep neural net, small data | Low | High | Overfitting |
| Well-tuned model | Low | Low | Generalizes well |
`,
    interviewQuestions: [
      { question: 'Explain the bias-variance tradeoff in machine learning.', answerHint: 'The expected prediction error of a model decomposes as: Bias² + Variance + Irreducible Noise. Bias measures how wrong the model is on average (underfitting — too simple a model). Variance measures how much the model\'s predictions vary across different training sets (overfitting — too complex, memorizing noise). To minimize total error, you must balance the two: more complex models reduce bias but increase variance; simpler models reduce variance but increase bias. Regularization, dropout, and ensembling (bagging/boosting) are techniques for managing this tradeoff.', type: 'CONCEPTUAL' },
      { question: 'What is a p-value, and what are the most common misconceptions about it?', answerHint: 'A p-value is the probability of observing data at least as extreme as what was observed, assuming the null hypothesis is true. Common misconceptions: (1) p-value is NOT the probability that the null hypothesis is true. (2) A small p-value does NOT prove the alternative hypothesis. (3) Statistical significance does not equal practical significance — a large dataset can make a tiny, practically meaningless difference highly significant. (4) p > 0.05 does not "prove" the null; it only means we failed to reject it.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'StatQuest: Bias and Variance', url: 'https://www.youtube.com/watch?v=EuBBz3bI-aA', type: 'VIDEO', priority: 'S', source: 'StatQuest', isOfficial: false, description: 'Clear visual explanation of bias-variance tradeoff.' },
      { title: 'All of Statistics (Wasserman)', url: 'https://www.stat.cmu.edu/~larry/all-of-statistics/', type: 'BOOK', priority: 'A', source: 'Larry Wasserman', isOfficial: false, description: 'Comprehensive statistics textbook relevant to ML.' }
    ]
  }
};
