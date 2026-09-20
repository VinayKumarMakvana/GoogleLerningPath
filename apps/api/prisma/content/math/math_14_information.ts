export const math_14_information = {
  INFORMATION_THEORY: {
    title: 'Information Theory & ML Mathematics',
    description: 'Master entropy, cross-entropy, KL divergence, mutual information, and their roles in constructing ML loss functions.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 75,
    prerequisites: ['Random Variables & Distributions', 'Conditional Probability & Bayes'],
    learningContent: `
# Information Theory & ML Mathematics

Information theory (Claude Shannon, 1948) quantifies information, uncertainty, and compression. It is the direct mathematical foundation of ML loss functions.

## 1. Entropy — Measuring Uncertainty
The **entropy** of a discrete random variable X with PMF p:
H(X) = -Σₓ p(x) log p(x)  (measured in bits if log₂, nats if ln)

**Intuition:** Entropy measures expected surprise. A certain event (p=1) has zero surprise, zero entropy. A fair coin (p=0.5 each) has maximum entropy = 1 bit.

**Properties:**
- H(X) ≥ 0 always
- H(X) = 0 iff X is deterministic (p=1 for one outcome)
- H(X) is maximized when X is uniform: H_max = log(|X|)

**Worked Example:**
X: fair coin → P(H)=P(T)=0.5
H(X) = -(0.5·log₂0.5 + 0.5·log₂0.5) = -(0.5·(-1) + 0.5·(-1)) = 1 bit

**ML Connection:** Maximum entropy → uniform distribution → maximum uncertainty → model knows nothing. Minimum entropy → concentrated distribution → model is confident.

## 2. Cross-Entropy — The Most Important Loss Function
For true distribution p and model distribution q:
H(p, q) = -Σₓ p(x) log q(x)

Cross-entropy measures the expected number of bits needed to encode messages from p using a code optimized for q.

**For binary classification** with y ∈ {0,1} and predicted probability ŷ:
L = -[y·log(ŷ) + (1-y)·log(1-ŷ)]

This is the binary cross-entropy loss. When y=1 and ŷ≈1: L≈0 (correct). When y=1 and ŷ≈0: L→∞ (heavy penalty).

**ML Connection:** Minimizing cross-entropy H(p,q) is EQUIVALENT to maximizing log-likelihood!
H(p,q) = H(p) + KL(p‖q)
If p is fixed (true labels), minimizing H(p,q) ↔ minimizing KL(p‖q) ↔ minimizing -log q(y|x).

## 3. KL Divergence — Measuring Distribution Difference
KL(p‖q) = Σₓ p(x) log[p(x)/q(x)]

**Properties:**
- KL(p‖q) ≥ 0 (Gibbs' inequality)
- KL(p‖q) = 0 iff p = q
- NOT symmetric: KL(p‖q) ≠ KL(q‖p)

**ML Connection:** Variational Autoencoders use KL divergence as a regularization term: ELBO = 𝔼[log p(x|z)] - KL(q(z|x)‖p(z)). The KL term keeps the learned latent distribution close to the prior.

## 4. Mutual Information
I(X;Y) = KL(p(x,y)‖p(x)p(y)) = H(X) - H(X|Y)

Measures how much knowing Y reduces uncertainty about X (and vice versa).
I(X;Y) = 0 iff X and Y are independent.

**ML Connection:** Feature selection via mutual information identifies features that share the most information with the target variable.
`,
    fullNotes: `
# Detailed Notes: Information Theory

- **Conditional Entropy:** H(X|Y) = -Σₓᵧ p(x,y) log p(x|y). Conditioning reduces entropy: H(X|Y) ≤ H(X). Knowing Y can only help (or be neutral) — it never increases uncertainty.
- **Data Processing Inequality:** If X → Y → Z form a Markov chain: I(X;Z) ≤ I(X;Y). Processing data cannot increase the mutual information — no transformation creates new information about X beyond what's in Y. This bounds the capacity of communication channels and neural network layers.
- **Entropy and Compression:** Shannon's source coding theorem: the minimum average description length of samples from distribution p is H(p) bits per symbol. You cannot compress below the entropy.
`,
    shortNotes: `
- Entropy H(X): average surprise/uncertainty of X. H=0 (certain) to log|X| (uniform)
- Cross-entropy H(p,q): expected bits to encode p using a q-optimized code
- KL(p‖q): "extra bits" from using q instead of p. Always ≥ 0.
- H(p,q) = H(p) + KL(p‖q). Minimizing cross-entropy = minimizing KL divergence
- Cross-entropy loss = negative log-likelihood = MLE objective
- Mutual information I(X;Y) = 0 iff X,Y independent
`,
    cheatSheet: `
### Information Theory Summary
| Quantity | Formula | Meaning |
|---------|---------|---------|
| Entropy H(X) | -Σp log p | Average uncertainty |
| Cross-entropy H(p,q) | -Σp log q | Loss for predicted q vs true p |
| KL(p‖q) | Σp log(p/q) | Extra bits from using q for p |
| Mutual Info I(X;Y) | H(X) - H(X|Y) | Info shared between X and Y |

### Relationship
H(p,q) = H(p) + KL(p‖q)
Minimizing cross-entropy loss ↔ minimizing KL ↔ maximizing likelihood
`,
    interviewQuestions: [
      { question: 'Why is cross-entropy the natural loss function for classification problems?', answerHint: 'Training a classifier is equivalent to MLE — finding parameters that maximize P(y|x;θ) for all training examples. For a categorical output, this is the categorical distribution, and maximizing log P(y|x) = maximizing log q(y) where q is the model\'s predicted probability. Equivalently, minimizing the negative log-probability: -log q(y) = cross-entropy H(p, q) when p is the one-hot true distribution. So cross-entropy loss IS the MLE objective for classification, providing a principled statistical foundation for this loss choice.', type: 'TECHNICAL' },
      { question: 'What is KL divergence, and how is it used in variational autoencoders?', answerHint: 'KL divergence KL(p‖q) measures how different distribution q is from the reference distribution p. It is always non-negative and equals zero only when p=q. In VAEs, the training objective (ELBO) has two terms: a reconstruction term (cross-entropy between original and reconstructed input) and a regularization term -KL(q(z|x)‖p(z)). The KL term penalizes the encoder distribution q(z|x) for deviating from the prior p(z) (usually N(0,I)), keeping the latent space smooth and continuous for generative sampling.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Visual Information Theory (Chris Olah)', url: 'https://colah.github.io/posts/2015-09-Visual-Information/', type: 'ARTICLE', priority: 'S', source: 'Chris Olah', isOfficial: false, description: 'Beautiful visual explanation of entropy, KL divergence, and mutual information.' },
      { title: 'StatQuest: Entropy and Cross-Entropy', url: 'https://www.youtube.com/watch?v=6ArSys5qHAU', type: 'VIDEO', priority: 'S', source: 'StatQuest', isOfficial: false, description: 'Clear visual walkthrough of entropy and cross-entropy for ML.' }
    ]
  }
};
