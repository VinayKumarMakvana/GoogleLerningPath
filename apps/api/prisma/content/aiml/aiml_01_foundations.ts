export const aiml_01_foundations = {
  ML_FOUNDATIONS: {
    title: 'Machine Learning Foundations',
    description: 'Understand the ML problem formulation, types of learning, datasets, the train/val/test split, and the ML engineering lifecycle.',
    difficulty: 'BEGINNER',
    estimatedLearnTime: 75,
    prerequisites: ['Mathematical Foundations for Machine Learning', 'Python Fundamentals'],
    learningContent: `
# Machine Learning Foundations

## 1. What is Machine Learning?
ML is the discipline of building systems that **learn from data** rather than being explicitly programmed with rules.

**Formal definition (Tom Mitchell):** A computer program learns from experience E with respect to task T and performance measure P, if its performance on T improves with E.

## 2. Types of Learning

| Type | Definition | Examples |
|------|-----------|---------|
| **Supervised** | Learn a mapping f: X→Y from labeled examples | Classification, Regression |
| **Unsupervised** | Find structure in unlabeled data | Clustering, Dimensionality Reduction |
| **Semi-supervised** | Few labels + many unlabeled examples | Self-training, pseudo-labeling |
| **Self-supervised** | Labels generated from the data itself | BERT pretraining (masked tokens) |
| **Reinforcement** | Learn from reward signals via interaction | Game playing, robotics |

## 3. The ML Lifecycle
1. **Problem formulation** — what are you predicting? what is success?
2. **Data collection & labeling**
3. **EDA & data understanding**
4. **Preprocessing & feature engineering**
5. **Model selection & training**
6. **Evaluation** — offline metrics
7. **Deployment**
8. **Monitoring** — online metrics, data drift

## 4. The Dataset Split
\`\`\`python
from sklearn.model_selection import train_test_split

X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.30, random_state=42)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.50, random_state=42)
# Result: 70% train / 15% val / 15% test
\`\`\`

- **Training set:** Used to fit the model.
- **Validation set:** Used for hyperparameter tuning and model selection.
- **Test set:** Used ONCE at the very end. Never use test labels during development.

**Data Leakage:** Any situation where test or future information leaks into training. One of the most common and insidious ML bugs.

## 5. Inductive Bias and the No-Free-Lunch Theorem
Every ML algorithm embeds **inductive biases** — assumptions about the form of the true function (e.g., linear models assume linearity). No algorithm works best on all problems (No-Free-Lunch theorem). Model selection must be driven by data characteristics and domain knowledge.
`,
    fullNotes: `
# Detailed Notes: ML Foundations
- **Generalization:** The true goal of ML is to perform well on unseen data. Good training performance means nothing without good test performance.
- **Statistical Learning Theory (PAC):** Theoretical generalization bounds depend on hypothesis complexity and dataset size. See 9J — Mathematical Foundations for Machine Learning.
- **i.i.d. assumption:** Most ML theory assumes training and test data are independent and identically distributed. Distribution shift (test data comes from a different distribution) is a major real-world challenge.
`,
    shortNotes: `
- ML: learn from data instead of explicit rules
- Supervised: labeled (X,y) pairs. Unsupervised: no labels.
- Self-supervised: labels derived from data (e.g., predict masked tokens)
- Always split: train / val / test. Use test ONCE at the very end.
- Data leakage: test information contaminating training — invalidates evaluation
- No-Free-Lunch: no single model wins on all problems
- i.i.d. assumption: train/test data must be from the same distribution
`,
    cheatSheet: `
### ML Problem Formulation Checklist
1. What is the input X? (tabular, text, image, time-series?)
2. What is the target Y? (binary, multiclass, continuous, structured?)
3. What is the success metric? (F1, AUC, RMSE, MAP@K?)
4. What training data exists? Is it labeled?
5. What are the constraints? (latency, interpretability, cost)
6. What is the baseline? (random, heuristic, previous model)
`,
    interviewQuestions: [
      { question: 'What is data leakage and why is it so dangerous?', answerHint: 'Data leakage occurs when information from outside the training dataset inappropriately influences model development, leading to overly optimistic evaluation metrics that do not reflect real-world performance. Common forms: (1) Target leakage — using features that are derived from or correlated with the target and only available after the target is observed. (2) Temporal leakage — using future data to predict the past (shuffling time-series before splitting). (3) Preprocessing leakage — fitting a scaler or imputer on the full dataset before splitting. Detection: suspiciously high metrics, features with unexpected importance.', type: 'TECHNICAL' },
      { question: 'Why do we need a separate validation set in addition to a test set?', answerHint: 'The validation set is used during model development for hyperparameter tuning and model selection. Each time we make a decision based on validation performance, we "use up" some of the independence of that set. If we used the test set for this purpose, our final reported metric would be optimistically biased — we would have implicitly selected the model that happened to work best on the test set. The test set must be held completely separate and evaluated only once, providing an unbiased estimate of generalization performance.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Hands-On Machine Learning (Aurélien Géron)', url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/', type: 'BOOK', priority: 'S', source: "O'Reilly", isOfficial: false, description: 'The definitive practical guide to ML with scikit-learn and TensorFlow.' },
      { title: 'Stanford CS229: Machine Learning', url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU', type: 'VIDEO', priority: 'S', source: 'Stanford / Andrew Ng', isOfficial: false, description: 'Andrew Ng\'s complete ML course — the gold standard introduction.' }
    ]
  }
};
