export const aiml_20_interview = {
  AIML_INTERVIEW: {
    title: 'AI/ML Engineering Interview Preparation',
    description: 'Comprehensive ML interview preparation covering ML system design, coding challenges, theoretical questions, and FAANG-level depth.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Model Serving & Inference Fundamentals'],
    learningContent: `
# AI/ML Engineering Interview Preparation

## 1. Interview Formats

| Interview Type | What to Expect |
|---------------|---------------|
| ML Theory | Derive gradient descent, explain backprop, regularization, optimization |
| ML Coding | Implement models from scratch (LogReg, KNN, K-Means in NumPy) |
| ML System Design | Design a recommendation system, search ranking, fraud detection |
| Applied ML | Analyze a dataset, train a model, discuss tradeoffs |
| Behavioral | ML failures, tradeoff decisions, cross-functional collaboration |

## 2. ML System Design Framework
For any ML design question:
1. **Clarify requirements:** What are we optimizing? Online or offline? Latency SLA?
2. **Define the ML task:** Classification? Ranking? Generation?
3. **Data:** Sources, scale, labeling strategy, freshness
4. **Features:** Feature engineering, storage, online vs offline features
5. **Model:** Algorithm choice + justification, training infrastructure
6. **Offline evaluation:** Metrics, evaluation dataset, baseline
7. **Online evaluation:** A/B test design, guardrail metrics
8. **Serving:** Latency, throughput, caching, fallback
9. **Monitoring:** Data drift, concept drift, performance degradation

## 3. Classic Implementation Challenges
\`\`\`python
# Implement K-Means from scratch
import numpy as np

def kmeans(X, k, max_iters=100):
    centroids = X[np.random.choice(len(X), k, replace=False)]
    for _ in range(max_iters):
        distances = np.linalg.norm(X[:, np.newaxis] - centroids, axis=2)  # (N, k)
        labels = np.argmin(distances, axis=1)
        new_centroids = np.array([X[labels == i].mean(axis=0) for i in range(k)])
        if np.allclose(centroids, new_centroids):
            break
        centroids = new_centroids
    return labels, centroids

# Implement logistic regression with gradient descent
def sigmoid(z): return 1 / (1 + np.exp(-z))

def logistic_regression(X, y, lr=0.01, epochs=1000):
    w, b = np.zeros(X.shape[1]), 0.0
    for _ in range(epochs):
        z = X @ w + b
        p = sigmoid(z)
        grad_w = X.T @ (p - y) / len(y)
        grad_b = (p - y).mean()
        w -= lr * grad_w
        b -= lr * grad_b
    return w, b
\`\`\`

## 4. Top ML Interview Questions with Deep Answers

**Q: How does gradient descent find the minimum?**
A: Gradient descent iteratively moves parameters in the direction of steepest descent (negative gradient). For a convex loss surface, this guaranteed to reach the global minimum with appropriate learning rate. For non-convex surfaces (neural networks), it typically finds a local minimum or saddle point — but empirically, SGD with noise finds flat minima that generalize well.

**Q: What is the curse of dimensionality?**
A: As feature dimension d increases, the volume of the space grows exponentially. Data becomes increasingly sparse — your nearest neighbors are almost as far as your furthest neighbors, making distance-based methods (KNN, K-Means, SVM) ineffective. Also, the amount of training data needed to maintain statistical density grows exponentially with d.

**Q: Design a recommendation system for a video platform.**
A: Frame as collaborative filtering + content-based hybrid. Offline: train matrix factorization (ALS) or two-tower model on user-video interactions. Features: video embeddings (title, description, visual), user history embeddings, context (time of day, device). Serving: precompute user vectors, ANN retrieval of top-100 candidates, rerank with a point-wise model (XGBoost). Online evaluation: CTR, watch time, diversity metrics, fairness. Fallback: popularity-based for cold-start users.

## 5. Critical Concepts for Final Review
- Loss functions and their probabilistic interpretation (MLE connection)
- Regularization: L1 (sparse weights) vs L2 (shrinks weights)
- Attention mechanism: QKV formulation, masking, multi-head
- Backpropagation: chain rule through computational graph
- Bias-variance tradeoff and learning curves
- Cross-validation: stratified K-fold, time-series CV
- Data leakage: preprocessing leakage, target leakage, temporal leakage
- Evaluation: precision vs recall, ROC-AUC vs PR-AUC, calibration
`,
    fullNotes: `
# Senior ML Interview Topics

- **Two-Tower Models:** Widely used in recommendation and search. Query tower encodes user/query features; item tower encodes item features. Train with contrastive loss (positive = clicked item, negatives = random sample). Both towers produce embeddings; ANN search retrieves top-k items at inference time.
- **Model Debugging:** If model performs poorly: plot learning curves (overfitting vs underfitting), compute per-class performance (class imbalance?), examine high-loss examples (labeling errors?), check feature importance (signal from right features?).
`,
    shortNotes: `
- ML design interviews: requirements → task → data → features → model → eval → serving
- Always start with a simple baseline (logistic regression, rule-based)
- Know how to implement: LogReg, KNN, K-Means, softmax, backprop in NumPy
- Explain every algorithm choice with tradeoffs — not just "I used XGBoost because it's best"
- Know evaluation deeply: when to use F1 vs AUC vs PR-AUC
- Data leakage is the #1 ML engineering failure mode — demonstrate awareness
- LLM design questions: consider RAG vs fine-tuning vs prompting tradeoffs
`,
    cheatSheet: `
### ML System Design Checklist
- [ ] Clarify the business objective and ML framing
- [ ] Define offline and online success metrics
- [ ] Identify data sources and labeling strategy
- [ ] Design feature engineering pipeline
- [ ] Justify model choice with tradeoffs
- [ ] Define evaluation framework (train/val/test splits, CV)
- [ ] Design serving architecture (latency, throughput, caching)
- [ ] Plan A/B test and rollout strategy
- [ ] Identify monitoring needs (drift, performance degradation)

### Key Papers to Know
| Paper | Why Important |
|-------|--------------|
| Attention Is All You Need | Transformer architecture |
| LoRA | Parameter-efficient fine-tuning |
| InstructGPT (RLHF) | LLM alignment |
| Chain-of-Thought Prompting | Emergent reasoning |
| REALM/RAG | Retrieval-augmented generation |
`,
    interviewQuestions: [
      { question: 'You are asked to build a spam detection system for email. Walk through your complete ML approach.', answerHint: 'Data: collect labeled emails (spam/ham) with metadata. Features: TF-IDF on body/subject, sender reputation, header analysis, URL features, attachment presence. Model: start with Logistic Regression baseline (strong for text), then XGBoost with feature engineering, then fine-tuned BERT for high-accuracy. Handle imbalance: spam typically <5% — use class_weight, PR-AUC as metric. Evaluation: precision vs recall tradeoff (prefer high recall to catch spam, accept some false positives), maintain user-reported metrics. Serving: <10ms latency required, cache sender reputation, online feature store for real-time signals. Monitor: data drift as spammers adapt, periodic retraining.', type: 'SYSTEM_DESIGN' },
      { question: 'Explain the attention mechanism and why Transformers replaced RNNs for NLP.', answerHint: 'Attention computes: softmax(QKᵀ/√dₖ)·V — a weighted sum of values where weights reflect query-key similarity. RNNs process sequences sequentially, so gradients must flow through many timesteps to connect distant tokens (vanishing gradient, poor long-range dependencies). Transformers use attention to directly connect any two positions in O(1) steps regardless of distance. All positions are processed in parallel (not sequentially), enabling massive hardware utilization. The attention matrix provides interpretable token-to-token relationships. The main limitation is O(N²) attention for sequence length N — addressed by sparse attention, Flash Attention, and linear attention approximations.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'ML Interview Book (Chip Huyen)', url: 'https://huyenchip.com/ml-interviews-book/', type: 'BOOK', priority: 'S', source: 'Chip Huyen', isOfficial: false, description: 'The definitive ML interview preparation book — free online.' },
      { title: 'Machine Learning System Design Interview', url: 'https://www.youtube.com/watch?v=wUQp0mHm-Z4', type: 'VIDEO', priority: 'S', source: 'Exponent', isOfficial: false, description: 'ML system design interview walkthrough with expert commentary.' }
    ]
  }
};
