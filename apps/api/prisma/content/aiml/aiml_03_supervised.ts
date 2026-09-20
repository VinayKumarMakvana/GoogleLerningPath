export const aiml_03_supervised = {
  SUPERVISED_LEARNING: {
    title: 'Supervised Learning',
    description: 'Master linear/logistic regression, decision trees, SVMs, KNN, and regularization for classification and regression tasks.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 90,
    prerequisites: ['Data Preparation & Feature Engineering', 'Optimization', 'Probability Fundamentals'],
    learningContent: `
# Supervised Learning

## 1. Linear Regression
**Model:** ŷ = wᵀx + b
**Loss:** MSE = (1/N)Σ(yᵢ - ŷᵢ)²
**Closed-form:** w = (XᵀX)⁻¹Xᵀy (Normal Equations)

**Regularization:**
- **Ridge (L2):** min MSE + λ‖w‖₂² → shrinks weights proportionally
- **Lasso (L1):** min MSE + λ‖w‖₁ → drives weights to exactly 0 (feature selection)
- **ElasticNet:** min MSE + λ₁‖w‖₁ + λ₂‖w‖₂² → combines both

\`\`\`python
from sklearn.linear_model import Ridge, Lasso, ElasticNet
model = Ridge(alpha=1.0)  # alpha = regularization strength λ
model.fit(X_train, y_train)
\`\`\`

## 2. Logistic Regression
**Model:** p(y=1|x) = σ(wᵀx + b) where σ is the sigmoid function
**Loss:** Binary cross-entropy: L = -Σ[y log(ŷ) + (1-y)log(1-ŷ)]

**Note:** Logistic regression is a LINEAR classifier despite the name. Decision boundary is a hyperplane.

## 3. Decision Trees
Trees recursively split the feature space by choosing the feature and threshold that best separates classes.

**Split criteria:**
- Classification: Gini Impurity or Information Gain (entropy)
- Regression: MSE reduction

**Gini Impurity:** G = 1 - Σₖ pₖ² (0 = pure, 0.5 = maximum impurity for binary)

**Key hyperparameters:** max_depth, min_samples_split, min_samples_leaf

**Prone to overfitting** — deep trees memorize training data. Use cross-validation to tune depth.

## 4. Support Vector Machines (SVMs)
Find the maximum-margin hyperplane that separates classes.
- **Hard margin:** Assumes linearly separable data
- **Soft margin:** Allows some misclassification with penalty C
- **Kernel trick:** Map data to higher-dimensional space implicitly using kernel functions (RBF, polynomial) — enables non-linear boundaries without explicit feature expansion

\`\`\`python
from sklearn.svm import SVC
model = SVC(kernel='rbf', C=1.0, gamma='scale')
\`\`\`

## 5. K-Nearest Neighbors (KNN)
Classify by majority vote of K nearest training points.
- **No training phase** — all computation at prediction time (lazy learner)
- O(N·d) prediction time where N = training size, d = dimensions
- Sensitive to feature scale — always normalize first
- Sensitive to irrelevant features (curse of dimensionality)
`,
    fullNotes: `
# Detailed Notes: Supervised Learning

- **Multicollinearity:** When input features are highly correlated, linear models become numerically unstable (XᵀX approaches singularity). Ridge regression specifically addresses this by adding λI to XᵀX: (XᵀX + λI)⁻¹ is always invertible.
- **Calibration:** Logistic regression is generally well-calibrated (predicted probabilities match empirical frequencies). Decision trees are poorly calibrated. SVMs do not output probabilities by default — use Platt Scaling post-hoc.
`,
    shortNotes: `
- Linear regression: minimize MSE. Closed-form via Normal Equations.
- Ridge (L2): shrinks all weights. Lasso (L1): drives some weights to zero.
- Logistic regression: sigmoid(wᵀx) → probability. Linear decision boundary.
- Decision tree: recursive binary splits on features. Prone to overfit.
- SVM: maximize margin hyperplane. Kernel trick for non-linear boundaries.
- KNN: no training, lazy learner. O(N) at prediction. Needs feature scaling.
`,
    cheatSheet: `
### Supervised Algorithm Selection Guide
| Algorithm | Best For | Key Limitation |
|-----------|---------|----------------|
| Linear Regression | Continuous target, interpretability | Assumes linearity |
| Ridge/Lasso | Linear + regularization | Still linear |
| Logistic Regression | Binary classification, interpretable | Linear boundary |
| Decision Tree | Interpretable, mixed types | Overfits without tuning |
| SVM (RBF) | Non-linear, small-medium data | Slow at N>100k |
| KNN | Non-linear, small data | Slow prediction, memory |
`,
    interviewQuestions: [
      { question: 'What is the difference between L1 and L2 regularization?', answerHint: 'L2 (Ridge) adds λ‖w‖² to the loss. Its gradient is 2λw — a force proportional to the weight, which shrinks weights continuously but rarely to exactly 0. L1 (Lasso) adds λ‖w‖ to the loss. Its gradient is λ·sign(w) — a constant force toward 0 that drives small weights to exactly 0, performing automatic feature selection. Geometrically: L2 has a smooth circular constraint ball; L1 has a diamond-shaped ball with corners on axes where solutions tend to land (many zeros). ElasticNet combines both.', type: 'TECHNICAL' },
      { question: 'How does the kernel trick enable SVMs to find non-linear decision boundaries?', answerHint: 'The kernel trick allows SVMs to implicitly map data into a higher-dimensional feature space where a linear boundary exists, without ever computing the transformation explicitly. The SVM optimization only requires dot products between examples. A kernel function K(xᵢ, xⱼ) computes this dot product in the transformed space efficiently. The RBF kernel K(xᵢ, xⱼ) = exp(-γ‖xᵢ-xⱼ‖²) effectively projects into an infinite-dimensional space. The boundary in the original space appears non-linear, while the SVM still finds a linear separator in the lifted space.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'scikit-learn Supervised Learning', url: 'https://scikit-learn.org/stable/supervised_learning.html', type: 'ARTICLE', priority: 'S', source: 'scikit-learn', isOfficial: true, description: 'Official comprehensive supervised learning guide.' },
      { title: 'StatQuest: Machine Learning Playlist', url: 'https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF', type: 'VIDEO', priority: 'S', source: 'StatQuest', isOfficial: false, description: 'The best visual explanations of ML algorithms.' }
    ]
  }
};
