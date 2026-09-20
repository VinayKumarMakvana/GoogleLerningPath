export const math_06_probability = {
  PROBABILITY_FUNDAMENTALS: {
    title: 'Probability Fundamentals',
    description: 'Master probability axioms, sample spaces, events, conditional probability, independence, and Bayes theorem.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 75,
    prerequisites: ['Mathematical Foundations'],
    learningContent: `
# Probability Fundamentals

Probability is the mathematical language for quantifying uncertainty. ML models don't just make predictions — they produce probability distributions over possible outputs.

## 1. Probability Axioms (Kolmogorov)
A probability function P assigns a number to every event E in a sample space Ω:
1. **Non-negativity:** P(E) ≥ 0 for all E
2. **Normalization:** P(Ω) = 1 (something always happens)
3. **Additivity:** For mutually exclusive events: P(A ∪ B) = P(A) + P(B)

## 2. Sample Space and Events
- **Sample space Ω:** The set of all possible outcomes
- **Event:** A subset of Ω
- **Complement:** P(Aᶜ) = 1 - P(A)
- **Union:** P(A ∪ B) = P(A) + P(B) - P(A ∩ B)

## 3. Conditional Probability
The probability of A given that B has occurred:
**P(A|B) = P(A ∩ B) / P(B)**   (when P(B) > 0)

**Intuition:** We restrict our sample space to only outcomes where B occurred, then ask: what fraction of those outcomes are also in A?

**Worked Example:** A fair die is rolled.
- P(even) = 3/6 = 0.5
- P(greater than 3) = 3/6 = 0.5
- P(even | greater than 3) = P({4,6}) / P({4,5,6}) = (2/6)/(3/6) = 2/3

## 4. Independence
A and B are **independent** if knowing B gives no information about A:
**P(A ∩ B) = P(A) · P(B)** ⟺ **P(A|B) = P(A)**

**ML Connection:** Naïve Bayes assumes all features are conditionally independent given the class label — P(x₁, x₂, ..., xₙ | y) = Π P(xᵢ | y). This assumption is rarely true but makes computation tractable.

## 5. Total Probability and Bayes Theorem
**Law of Total Probability:** P(B) = Σₐ P(B|A) · P(A)

**Bayes Theorem:** The most important equation in ML.
**P(A|B) = P(B|A) · P(A) / P(B)**

In ML notation:
- **P(θ|data)** = P(data|θ) · P(θ) / P(data)
- **Posterior** ∝ **Likelihood** × **Prior**
`,
    fullNotes: `
# Detailed Notes: Probability

- **Joint vs Marginal vs Conditional:**
  - Joint: P(X=x, Y=y) — probability of both events simultaneously
  - Marginal: P(X=x) = Σᵧ P(X=x, Y=y) — summing out Y
  - Conditional: P(X=x | Y=y) = P(X=x, Y=y) / P(Y=y)
- **Chain Rule of Probability:** P(A, B, C) = P(A) · P(B|A) · P(C|A,B). This generalizes to any number of variables and is the basis for autoregressive language models.
`,
    shortNotes: `
- Kolmogorov axioms: non-negativity, normalization, additivity
- P(A|B) = P(A∩B)/P(B) — conditional probability
- Independent: P(A∩B) = P(A)·P(B)
- Bayes theorem: P(θ|data) ∝ P(data|θ) · P(θ)
- Posterior = Likelihood × Prior / Evidence
- Chain rule: P(A,B,C) = P(A)·P(B|A)·P(C|A,B)
`,
    cheatSheet: `
### Probability Quick Reference
| Formula | Name |
|---------|------|
| P(A|B) = P(A∩B)/P(B) | Conditional probability |
| P(A∩B) = P(A)·P(B|A) | Chain rule (2 variables) |
| P(A∩B) = P(A)·P(B) | Independence condition |
| P(Aᶜ) = 1 - P(A) | Complement rule |
| P(A∪B) = P(A)+P(B)-P(A∩B) | Inclusion-exclusion |
| P(B) = Σₐ P(B|A)P(A) | Total probability |
| P(A|B) = P(B|A)P(A)/P(B) | Bayes theorem |
`,
    interviewQuestions: [
      { question: 'Explain Bayes theorem and its role in machine learning.', answerHint: 'Bayes theorem states P(θ|data) = P(data|θ)·P(θ)/P(data). In ML, it provides a principled framework for updating beliefs given evidence. The prior P(θ) encodes our initial beliefs about model parameters. The likelihood P(data|θ) measures how probable the observed data is under each parameter setting. The posterior P(θ|data) is our updated belief after seeing the data. Maximum Likelihood Estimation (MLE) maximizes P(data|θ); Maximum A Posteriori (MAP) maximizes the posterior P(θ|data).', type: 'CONCEPTUAL' },
      { question: 'What does it mean for two random variables to be independent?', answerHint: 'Two events A and B are independent if P(A∩B) = P(A)·P(B), equivalently P(A|B) = P(A). Independence means knowing B provides no information about A. For random variables X and Y, independence means their joint distribution factors: P(X,Y) = P(X)·P(Y). Note: zero correlation does NOT imply independence — independence is a strictly stronger condition.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Probability Theory: The Logic of Science (Jaynes)', url: 'https://bayes.wustl.edu/etj/prob/book.pdf', type: 'BOOK', priority: 'A', source: 'E.T. Jaynes', isOfficial: false, description: 'Classic Bayesian probability from first principles.' },
      { title: 'StatQuest: Probability Fundamentals', url: 'https://www.youtube.com/watch?v=vimQPFz_1Z8', type: 'VIDEO', priority: 'S', source: 'StatQuest', isOfficial: false, description: 'Clear visual probability fundamentals from StatQuest.' }
    ]
  }
};
