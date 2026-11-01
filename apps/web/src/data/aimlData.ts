// Auto-generated real AI/ML systems curriculum data
export interface AimlTopic {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedLearnTime: number;
  learningContent: string;
  fullNotes: string;
  shortNotes: string;
  cheatSheet: string;
  interviewQuestions: Array<{ question: string; answerHint: string; type: string }>;
  resources: Array<{ title: string; url: string; type: string }>;
}

export const AIML_TOPICS: AimlTopic[] = [
  {
    "id": "aiml_01_foundations",
    "slug": "foundations",
    "title": "Machine Learning Foundations",
    "description": "Understand the ML problem formulation, types of learning, datasets, the train/val/test split, and the ML engineering lifecycle.",
    "difficulty": "BEGINNER",
    "estimatedLearnTime": 75,
    "learningContent": "# Machine Learning Foundations\n\n## 1. What is Machine Learning?\nML is the discipline of building systems that **learn from data** rather than being explicitly programmed with rules.\n\n**Formal definition (Tom Mitchell):** A computer program learns from experience E with respect to task T and performance measure P, if its performance on T improves with E.\n\n## 2. Types of Learning\n\n| Type | Definition | Examples |\n|------|-----------|---------|\n| **Supervised** | Learn a mapping f: X→Y from labeled examples | Classification, Regression |\n| **Unsupervised** | Find structure in unlabeled data | Clustering, Dimensionality Reduction |\n| **Semi-supervised** | Few labels + many unlabeled examples | Self-training, pseudo-labeling |\n| **Self-supervised** | Labels generated from the data itself | BERT pretraining (masked tokens) |\n| **Reinforcement** | Learn from reward signals via interaction | Game playing, robotics |\n\n## 3. The ML Lifecycle\n1. **Problem formulation** — what are you predicting? what is success?\n2. **Data collection & labeling**\n3. **EDA & data understanding**\n4. **Preprocessing & feature engineering**\n5. **Model selection & training**\n6. **Evaluation** — offline metrics\n7. **Deployment**\n8. **Monitoring** — online metrics, data drift\n\n## 4. The Dataset Split\n\\`\\`\\`python\nfrom sklearn.model_selection import train_test_split\n\nX_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.30, random_state=42)\nX_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.50, random_state=42)\n# Result: 70% train / 15% val / 15% test\n\\`\\`\\`\n\n- **Training set:** Used to fit the model.\n- **Validation set:** Used for hyperparameter tuning and model selection.\n- **Test set:** Used ONCE at the very end. Never use test labels during development.\n\n**Data Leakage:** Any situation where test or future information leaks into training. One of the most common and insidious ML bugs.\n\n## 5. Inductive Bias and the No-Free-Lunch Theorem\nEvery ML algorithm embeds **inductive biases** — assumptions about the form of the true function (e.g., linear models assume linearity). No algorithm works best on all problems (No-Free-Lunch theorem). Model selection must be driven by data characteristics and domain knowledge.",
    "fullNotes": "# Detailed Notes: ML Foundations\n- **Generalization:** The true goal of ML is to perform well on unseen data. Good training performance means nothing without good test performance.\n- **Statistical Learning Theory (PAC):** Theoretical generalization bounds depend on hypothesis complexity and dataset size. See 9J — Mathematical Foundations for Machine Learning.\n- **i.i.d. assumption:** Most ML theory assumes training and test data are independent and identically distributed. Distribution shift (test data comes from a different distribution) is a major real-world challenge.",
    "shortNotes": "- ML: learn from data instead of explicit rules\n- Supervised: labeled (X,y) pairs. Unsupervised: no labels.\n- Self-supervised: labels derived from data (e.g., predict masked tokens)\n- Always split: train / val / test. Use test ONCE at the very end.\n- Data leakage: test information contaminating training — invalidates evaluation\n- No-Free-Lunch: no single model wins on all problems\n- i.i.d. assumption: train/test data must be from the same distribution",
    "cheatSheet": "### ML Problem Formulation Checklist\n1. What is the input X? (tabular, text, image, time-series?)\n2. What is the target Y? (binary, multiclass, continuous, structured?)\n3. What is the success metric? (F1, AUC, RMSE, MAP@K?)\n4. What training data exists? Is it labeled?\n5. What are the constraints? (latency, interpretability, cost)\n6. What is the baseline? (random, heuristic, previous model)",
    "interviewQuestions": [
      {
        "question": "What is data leakage and why is it so dangerous?",
        "answerHint": "Data leakage occurs when information from outside the training dataset inappropriately influences model development, leading to overly optimistic evaluation metrics that do not reflect real-world performance. Common forms: (1) Target leakage — using features that are derived from or correlated with the target and only available after the target is observed. (2) Temporal leakage — using future data to predict the past (shuffling time-series before splitting). (3) Preprocessing leakage — fitting a scaler or imputer on the full dataset before splitting. Detection: suspiciously high metrics, features with unexpected importance.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "Machine Learning Fundamentals by StatQuest",
        "url": "https://www.youtube.com/watch?v=Gv9_4yMHFhI",
        "type": "VIDEO"
      },
      {
        "title": "The Essence of Linear Algebra by 3Blue1Brown",
        "url": "https://www.youtube.com/watch?v=fNk_zzaMoSs",
        "type": "VIDEO"
      },
      {
        "title": "Hands-On Machine Learning (Aurélien Géron)",
        "url": "https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/",
        "type": "BOOK"
      },
      {
        "title": "Stanford CS229: Machine Learning",
        "url": "https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU",
        "type": "VIDEO"
      }
    ]
  },
  {
    "id": "aiml_02_data_prep",
    "slug": "data_prep",
    "title": "Data Preparation & Feature Engineering",
    "description": "Master data cleaning, preprocessing, feature engineering, and handling class imbalance for ML pipelines.",
    "difficulty": "INTERMEDIATE",
    "estimatedLearnTime": 90,
    "learningContent": "# Data Preparation & Feature Engineering\n\nFeature engineering is often the highest-leverage activity in ML. Better features beat better algorithms.\n\n## 1. Data Cleaning\n\\`\\`\\`python\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv(\"data.csv\")\n\n# Missing values\ndf[\"age\"].fillna(df[\"age\"].median(), inplace=True)   # Numerical: median imputation\ndf[\"city\"].fillna(\"Unknown\", inplace=True)            # Categorical: constant imputation\n\n# From sklearn: more sophisticated imputation\nfrom sklearn.impute import KNNImputer\nimputer = KNNImputer(n_neighbors=5)\ndf_imputed = imputer.fit_transform(df[numerical_cols])\n\n# Outliers: cap with IQR\nQ1, Q3 = df[\"salary\"].quantile([0.25, 0.75])\nIQR = Q3 - Q1\ndf[\"salary\"] = df[\"salary\"].clip(Q1 - 1.5*IQR, Q3 + 1.5*IQR)\n\\`\\`\\`\n\n## 2. Feature Scaling\n**Critical for:** Linear models, SVMs, KNN, neural networks. Not needed for tree-based models.\n\n\\`\\`\\`python\nfrom sklearn.preprocessing import StandardScaler, MinMaxScaler\n\n# StandardScaler: zero mean, unit variance. Robust to outliers if they're handled.\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)  # fit + transform on train\nX_test_scaled = scaler.transform(X_test)         # ONLY transform on test (use train's stats)\n\n# MinMaxScaler: scales to [0, 1]. Sensitive to outliers.\n\\`\\`\\`\n\n**Important:** Always fit scalers ONLY on training data. Applying training statistics to test data is correct — it simulates the real-world scenario where you don't have test statistics.\n\n## 3. Encoding Categorical Features\n\\`\\`\\`python\nfrom sklearn.preprocessing import OrdinalEncoder, OneHotEncoder\n\n# OneHotEncoder: for nominal categories (no ordering)\nenc = OneHotEncoder(sparse_output=False, handle_unknown='ignore')\n\n# OrdinalEncoder: for ordinal categories (low < medium < high)\nenc = OrdinalEncoder(categories=[['low', 'medium', 'high']])\n\n# For high-cardinality categoricals: Target Encoding (mean target per category)\n# Use category_encoders library\n\\`\\`\\`\n\n## 4. Feature Engineering\nCreating new, informative features from raw data:\n\\`\\`\\`python\n# Interaction features\ndf[\"revenue_per_user\"] = df[\"revenue\"] / (df[\"users\"] + 1)  # +1 avoids division by zero\n\n# Datetime features\ndf[\"hour\"] = df[\"timestamp\"].dt.hour\ndf[\"day_of_week\"] = df[\"timestamp\"].dt.dayofweek\ndf[\"is_weekend\"] = df[\"day_of_week\"].isin([5, 6]).astype(int)\n\n# Log transformation (for skewed distributions)\ndf[\"log_price\"] = np.log1p(df[\"price\"])   # log(1+x) — handles zeros\n\\`\\`\\`\n\n## 5. Class Imbalance\n\\`\\`\\`python\nfrom imblearn.over_sampling import SMOTE\nfrom imblearn.under_sampling import RandomUnderSampler\n\n# SMOTE: Synthetic Minority Over-sampling — generates synthetic minority samples\nsmote = SMOTE(random_state=42)\nX_res, y_res = smote.fit_resample(X_train, y_train)\n\n# Or: Use class_weight='balanced' in sklearn models to weight minority class higher\nfrom sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression(class_weight='balanced')\n\\`\\`\\`",
    "fullNotes": "# Detailed Notes: Data Preparation\n\n- **Pipeline Architecture:** Always wrap preprocessing in sklearn Pipelines to prevent data leakage and ensure reproducibility. The pipeline object's fit_transform/transform methods handle the train/test split correctly automatically.\n- **Feature Selection:** Remove redundant/irrelevant features with: Variance Threshold (remove near-zero variance), Correlation analysis (remove highly correlated pairs), Recursive Feature Elimination (RFE), and feature importance from tree models.\n- **Text of why not fit_transform on test:** If you compute the scaler mean/std on the test set, you're using information from the future (the distribution of unseen data). In production, you never have access to the test distribution — so fitting on test is unrealistic and leaky.",
    "shortNotes": "- Always fit preprocessors on train only; transform both train and test\n- Numerical imputation: median (robust to outliers). Categorical: mode or 'Unknown'\n- StandardScaler: zero mean, unit variance (use for most ML)\n- OneHotEncoder for nominal. OrdinalEncoder for ordered categories.\n- Feature engineering: domain-driven transformations often beat algorithmic complexity\n- SMOTE: generates synthetic minority samples — apply ONLY on training data\n- class_weight='balanced': automatic inverse-frequency class weighting",
    "cheatSheet": "### Preprocessing Quick Reference\n| Situation | Method |\n|-----------|--------|\n| Missing numeric | Median imputation or KNN |\n| Missing categorical | Mode or constant 'Unknown' |\n| Nominal categories | OneHotEncoder |\n| High-cardinality nominal | Target Encoding |\n| Ordinal categories | OrdinalEncoder |\n| Numeric scaling (linear/NN) | StandardScaler |\n| Skewed numeric | log1p transform |\n| Class imbalance | SMOTE + class_weight='balanced' |",
    "interviewQuestions": [
      {
        "question": "Why must you fit preprocessors only on the training set and not on the entire dataset?",
        "answerHint": "Fitting a scaler or imputer on the full dataset (including test data) constitutes data leakage. The test set represents future, unseen data. By using test statistics (mean, std) during training preprocessing, you incorporate information about the test distribution that would not be available in a real deployment. This leads to overly optimistic evaluation metrics. In production, you apply the training-fitted scaler to incoming data — perfectly mirrored by fitting on train and transforming test with training statistics.",
        "type": "TECHNICAL"
      },
      {
        "question": "What is SMOTE and when should it NOT be used?",
        "answerHint": "SMOTE (Synthetic Minority Over-sampling Technique) generates synthetic minority class samples by interpolating between existing minority samples in feature space. It should only be applied to the training set — never to the validation or test set, as doing so would create synthetic test samples and bias evaluation metrics. SMOTE should not be used: (1) when the minority class is genuinely rare and you want to preserve that rarity in evaluation, (2) for high-dimensional sparse data (like text BoW) where interpolation is meaningless, (3) when class_weight adjustment alone is sufficient.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "Feature Engineering & Data Preprocessing Pipeline",
        "url": "https://www.youtube.com/watch?v=vhnPnp_j30o",
        "type": "VIDEO"
      },
      {
        "title": "sklearn Preprocessing Guide",
        "url": "https://scikit-learn.org/stable/modules/preprocessing.html",
        "type": "ARTICLE"
      },
      {
        "title": "Feature Engineering for ML",
        "url": "https://www.youtube.com/watch?v=6WDFfaYtN6s",
        "type": "VIDEO"
      }
    ]
  },
  {
    "id": "aiml_03_supervised",
    "slug": "supervised",
    "title": "Supervised Learning",
    "description": "Master linear/logistic regression, decision trees, SVMs, KNN, and regularization for classification and regression tasks.",
    "difficulty": "INTERMEDIATE",
    "estimatedLearnTime": 90,
    "learningContent": "# Supervised Learning\n\n## 1. Linear Regression\n**Model:** ŷ = wᵀx + b\n**Loss:** MSE = (1/N)Σ(yᵢ - ŷᵢ)²\n**Closed-form:** w = (XᵀX)⁻¹Xᵀy (Normal Equations)\n\n**Regularization:**\n- **Ridge (L2):** min MSE + λ‖w‖₂² → shrinks weights proportionally\n- **Lasso (L1):** min MSE + λ‖w‖₁ → drives weights to exactly 0 (feature selection)\n- **ElasticNet:** min MSE + λ₁‖w‖₁ + λ₂‖w‖₂² → combines both\n\n\\`\\`\\`python\nfrom sklearn.linear_model import Ridge, Lasso, ElasticNet\nmodel = Ridge(alpha=1.0)  # alpha = regularization strength λ\nmodel.fit(X_train, y_train)\n\\`\\`\\`\n\n## 2. Logistic Regression\n**Model:** p(y=1|x) = σ(wᵀx + b) where σ is the sigmoid function\n**Loss:** Binary cross-entropy: L = -Σ[y log(ŷ) + (1-y)log(1-ŷ)]\n\n**Note:** Logistic regression is a LINEAR classifier despite the name. Decision boundary is a hyperplane.\n\n## 3. Decision Trees\nTrees recursively split the feature space by choosing the feature and threshold that best separates classes.\n\n**Split criteria:**\n- Classification: Gini Impurity or Information Gain (entropy)\n- Regression: MSE reduction\n\n**Gini Impurity:** G = 1 - Σₖ pₖ² (0 = pure, 0.5 = maximum impurity for binary)\n\n**Key hyperparameters:** max_depth, min_samples_split, min_samples_leaf\n\n**Prone to overfitting** — deep trees memorize training data. Use cross-validation to tune depth.\n\n## 4. Support Vector Machines (SVMs)\nFind the maximum-margin hyperplane that separates classes.\n- **Hard margin:** Assumes linearly separable data\n- **Soft margin:** Allows some misclassification with penalty C\n- **Kernel trick:** Map data to higher-dimensional space implicitly using kernel functions (RBF, polynomial) — enables non-linear boundaries without explicit feature expansion\n\n\\`\\`\\`python\nfrom sklearn.svm import SVC\nmodel = SVC(kernel='rbf', C=1.0, gamma='scale')\n\\`\\`\\`\n\n## 5. K-Nearest Neighbors (KNN)\nClassify by majority vote of K nearest training points.\n- **No training phase** — all computation at prediction time (lazy learner)\n- O(N·d) prediction time where N = training size, d = dimensions\n- Sensitive to feature scale — always normalize first\n- Sensitive to irrelevant features (curse of dimensionality)",
    "fullNotes": "# Detailed Notes: Supervised Learning\n\n- **Multicollinearity:** When input features are highly correlated, linear models become numerically unstable (XᵀX approaches singularity). Ridge regression specifically addresses this by adding λI to XᵀX: (XᵀX + λI)⁻¹ is always invertible.\n- **Calibration:** Logistic regression is generally well-calibrated (predicted probabilities match empirical frequencies). Decision trees are poorly calibrated. SVMs do not output probabilities by default — use Platt Scaling post-hoc.",
    "shortNotes": "- Linear regression: minimize MSE. Closed-form via Normal Equations.\n- Ridge (L2): shrinks all weights. Lasso (L1): drives some weights to zero.\n- Logistic regression: sigmoid(wᵀx) → probability. Linear decision boundary.\n- Decision tree: recursive binary splits on features. Prone to overfit.\n- SVM: maximize margin hyperplane. Kernel trick for non-linear boundaries.\n- KNN: no training, lazy learner. O(N) at prediction. Needs feature scaling.",
    "cheatSheet": "### Supervised Algorithm Selection Guide\n| Algorithm | Best For | Key Limitation |\n|-----------|---------|----------------|\n| Linear Regression | Continuous target, interpretability | Assumes linearity |\n| Ridge/Lasso | Linear + regularization | Still linear |\n| Logistic Regression | Binary classification, interpretable | Linear boundary |\n| Decision Tree | Interpretable, mixed types | Overfits without tuning |\n| SVM (RBF) | Non-linear, small-medium data | Slow at N>100k |\n| KNN | Non-linear, small data | Slow prediction, memory |",
    "interviewQuestions": [
      {
        "question": "What is the difference between L1 and L2 regularization?",
        "answerHint": "L2 (Ridge) adds λ‖w‖² to the loss. Its gradient is 2λw — a force proportional to the weight, which shrinks weights continuously but rarely to exactly 0. L1 (Lasso) adds λ‖w‖ to the loss. Its gradient is λ·sign(w) — a constant force toward 0 that drives small weights to exactly 0, performing automatic feature selection. Geometrically: L2 has a smooth circular constraint ball; L1 has a diamond-shaped ball with corners on axes where solutions tend to land (many zeros). ElasticNet combines both.",
        "type": "TECHNICAL"
      },
      {
        "question": "How does the kernel trick enable SVMs to find non-linear decision boundaries?",
        "answerHint": "The kernel trick allows SVMs to implicitly map data into a higher-dimensional feature space where a linear boundary exists, without ever computing the transformation explicitly. The SVM optimization only requires dot products between examples. A kernel function K(xᵢ, xⱼ) computes this dot product in the transformed space efficiently. The RBF kernel K(xᵢ, xⱼ) = exp(-γ‖xᵢ-xⱼ‖²) effectively projects into an infinite-dimensional space. The boundary in the original space appears non-linear, while the SVM still finds a linear separator in the lifted space.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "Support Vector Machines (SVM) Explained",
        "url": "https://www.youtube.com/watch?v=efR1C6CvhmE",
        "type": "VIDEO"
      },
      {
        "title": "Logistic Regression & Gradient Descent by StatQuest",
        "url": "https://www.youtube.com/watch?v=yIYKR4sgzI8",
        "type": "VIDEO"
      },
      {
        "title": "scikit-learn Supervised Learning",
        "url": "https://scikit-learn.org/stable/supervised_learning.html",
        "type": "ARTICLE"
      },
      {
        "title": "StatQuest: Machine Learning Playlist",
        "url": "https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF",
        "type": "VIDEO"
      }
    ]
  },
  {
    "id": "aiml_04_unsupervised",
    "slug": "unsupervised",
    "title": "Unsupervised Learning",
    "description": "Master clustering (K-Means, DBSCAN), dimensionality reduction (PCA, UMAP), and anomaly detection.",
    "difficulty": "INTERMEDIATE",
    "estimatedLearnTime": 75,
    "learningContent": "# Unsupervised Learning\n\n## 1. K-Means Clustering\n**Algorithm:**\n1. Initialize K cluster centroids (randomly or K-Means++)\n2. Assign each point to nearest centroid\n3. Update centroids to mean of assigned points\n4. Repeat until convergence\n\n**Objective:** Minimize within-cluster sum of squares (WCSS): Σₖ Σ_{x∈Cₖ} ‖x - μₖ‖²\n\n\\`\\`\\`python\nfrom sklearn.cluster import KMeans\n\n# Choosing K: Elbow method\nwcss = []\nfor k in range(1, 11):\n    kmeans = KMeans(n_clusters=k, random_state=42, n_init='auto')\n    kmeans.fit(X)\n    wcss.append(kmeans.inertia_)\n# Plot WCSS vs K — look for the \"elbow\"\n\n# Silhouette score: measures cluster quality (-1 to 1, higher is better)\nfrom sklearn.metrics import silhouette_score\nscore = silhouette_score(X, kmeans.labels_)\n\\`\\`\\`\n\n**Limitations:** Assumes spherical clusters, sensitive to outliers, requires K upfront.\n\n## 2. DBSCAN\nDensity-based clustering — finds arbitrarily shaped clusters and identifies outliers.\n\n- **Core points:** Have ≥ minPts neighbors within radius ε\n- **Border points:** Within ε of a core point but fewer than minPts neighbors\n- **Noise (outliers):** Not reachable from any core point\n\n\\`\\`\\`python\nfrom sklearn.cluster import DBSCAN\ndb = DBSCAN(eps=0.5, min_samples=5)\nlabels = db.fit_predict(X)\n# label = -1 means outlier/noise\n\\`\\`\\`\n\n## 3. PCA — Dimensionality Reduction\nPCA finds orthogonal directions of maximum variance. (See 9J Eigenvalues module for the math.)\n\n\\`\\`\\`python\nfrom sklearn.decomposition import PCA\n\npca = PCA(n_components=2)            # Keep top 2 principal components\nX_reduced = pca.fit_transform(X)\n\nprint(pca.explained_variance_ratio_) # % variance explained by each component\nprint(pca.explained_variance_ratio_.cumsum())  # Cumulative — choose n for ~95%\n\\`\\`\\`\n\n## 4. UMAP — Non-linear Dimensionality Reduction\nUMAP (Uniform Manifold Approximation and Projection) learns non-linear manifold structure, preserving both local and global structure better than t-SNE. Used heavily for visualizing embeddings.\n\n\\`\\`\\`python\nimport umap\nreducer = umap.UMAP(n_components=2, random_state=42)\nX_2d = reducer.fit_transform(X)\n\\`\\`\\`\n\n## 5. Anomaly Detection\n\\`\\`\\`python\nfrom sklearn.ensemble import IsolationForest\n\n# Isolation Forest: isolates anomalies by random splitting\n# Anomalies require fewer splits to isolate\nclf = IsolationForest(contamination=0.05, random_state=42)  # 5% anomaly rate expected\npreds = clf.fit_predict(X)  # -1 = anomaly, 1 = normal\n\\`\\`\\`",
    "fullNotes": "# Detailed Notes: Unsupervised Learning\n\n- **K-Means++ Initialization:** Instead of random centroid initialization (which can lead to poor solutions), K-Means++ chooses centroids probabilistically — each new centroid is chosen proportionally to its squared distance from existing centroids. Guarantees O(log K) approximation to optimal and converges faster.\n- **Hierarchical Clustering:** Builds a tree (dendrogram) of clusters. Agglomerative (bottom-up): start with N clusters and merge. Divisive (top-down): start with 1 and split. Useful when K is unknown.\n- **t-SNE vs UMAP:** Both are non-linear dimensionality reduction for visualization. t-SNE is slower (O(N²)), focuses on local structure, and cannot generalize to new points. UMAP is faster, preserves both local and global structure, and can transform new data.",
    "shortNotes": "- K-Means: iterative assignment + centroid update. Minimize WCSS.\n- Use Elbow method + Silhouette score to choose K.\n- DBSCAN: density-based, finds outliers (label=-1), no K needed.\n- PCA: linear dimensionality reduction. Maximize variance.\n- explained_variance_ratio_: choose n_components for 95% cumulative variance.\n- UMAP: non-linear, faster than t-SNE, preserves global structure.\n- Isolation Forest: anomaly detection via random partitioning.",
    "cheatSheet": "### Clustering Algorithm Comparison\n| Algorithm | Shape | Outliers | Need K? | Scale |\n|-----------|-------|---------|---------|-------|\n| K-Means | Spherical | Sensitive | Yes | Large |\n| DBSCAN | Arbitrary | Robust (flags them) | No | Medium |\n| Hierarchical | Arbitrary | Sensitive | No | Small |\n| GMM | Ellipsoidal | Soft assignment | Yes | Medium |",
    "interviewQuestions": [
      {
        "question": "What are the limitations of K-Means clustering and how does DBSCAN address them?",
        "answerHint": "K-Means assumes spherical clusters of similar size, is sensitive to outliers (which get assigned to the nearest centroid and distort it), and requires K to be specified upfront. DBSCAN addresses these by using density to define clusters — it finds arbitrarily shaped clusters without requiring K, and explicitly labels low-density points as outliers (noise, label=-1) rather than assigning them to a cluster. However, DBSCAN struggles with varying density clusters and is sensitive to its ε and minPts hyperparameters.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "scikit-learn Clustering Guide",
        "url": "https://scikit-learn.org/stable/modules/clustering.html",
        "type": "ARTICLE"
      },
      {
        "title": "StatQuest: K-means and DBSCAN",
        "url": "https://www.youtube.com/watch?v=4b5d3muPQmA",
        "type": "VIDEO"
      }
    ]
  },
  {
    "id": "aiml_05_evaluation",
    "slug": "evaluation",
    "title": "Model Evaluation & Experimentation",
    "description": "Master classification/regression metrics, cross-validation, threshold selection, experiment tracking, and error analysis.",
    "difficulty": "INTERMEDIATE",
    "estimatedLearnTime": 75,
    "learningContent": "# Model Evaluation & Experimentation\n\n## 1. Classification Metrics\n\n**Confusion Matrix:**\n| | Predicted Positive | Predicted Negative |\n|--|--|--|\n| Actual Positive | TP | FN |\n| Actual Negative | FP | TN |\n\n- **Precision:** TP / (TP + FP) — \"Of all positive predictions, how many are actually positive?\" (minimize false alarms)\n- **Recall (Sensitivity):** TP / (TP + FN) — \"Of all actual positives, how many did we catch?\" (minimize misses)\n- **F1 Score:** 2 × (Precision × Recall) / (Precision + Recall) — harmonic mean\n- **Accuracy:** (TP + TN) / Total — misleading for imbalanced classes\n\n\\`\\`\\`python\nfrom sklearn.metrics import classification_report, confusion_matrix, roc_auc_score\n\nprint(classification_report(y_test, y_pred))  # Full per-class report\ncm = confusion_matrix(y_test, y_pred)\nauc = roc_auc_score(y_test, y_proba)\n\\`\\`\\`\n\n## 2. ROC-AUC and PR-AUC\n- **ROC curve:** TPR (Recall) vs FPR at all thresholds. AUC = probability that model ranks a random positive above a random negative. Threshold-independent.\n- **PR-AUC:** Precision vs Recall at all thresholds. More informative than ROC-AUC for heavily imbalanced datasets.\n\n**When to use PR-AUC:** When the positive class is rare and you care more about the performance on that class (fraud detection, cancer screening).\n\n## 3. Regression Metrics\n- **MAE (Mean Absolute Error):** Average |ŷ - y|. Robust to outliers.\n- **MSE (Mean Squared Error):** Average (ŷ - y)². Penalizes large errors more heavily.\n- **RMSE:** √MSE. Same units as target.\n- **R² (Coefficient of Determination):** 1 - SS_res/SS_tot. Fraction of variance explained. 1.0 = perfect.\n\n## 4. Cross-Validation\n\\`\\`\\`python\nfrom sklearn.model_selection import cross_val_score, StratifiedKFold\n\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)\nscores = cross_val_score(model, X, y, cv=cv, scoring='roc_auc')\nprint(f\"AUC: {scores.mean():.3f} ± {scores.std():.3f}\")\n\\`\\`\\`\n\nUse **Stratified K-Fold** for classification to preserve class proportions in each fold.\n\n## 5. Experiment Tracking\n\\`\\`\\`python\nimport mlflow\n\nmlflow.set_experiment(\"my_classification_exp\")\nwith mlflow.start_run():\n    mlflow.log_params({\"n_estimators\": 100, \"max_depth\": 5})\n    mlflow.log_metrics({\"auc\": 0.91, \"f1\": 0.78})\n    mlflow.sklearn.log_model(model, \"model\")\n\\`\\`\\`",
    "fullNotes": "# Detailed Notes: Evaluation\n\n- **Threshold Selection:** By default, most classifiers use 0.5 as the decision threshold. Adjust it based on business cost: if false negatives are more costly than false positives (e.g., cancer screening), lower the threshold to boost recall at the expense of precision. Plot precision-recall curve and choose the threshold that meets business constraints.\n- **Calibration:** A calibrated model's predicted probability of 0.7 means the event actually occurs ~70% of the time. Calibrate with Platt Scaling or Isotonic Regression using sklearn's CalibratedClassifierCV.\n- **Offline vs Online Evaluation:** Offline metrics (AUC, F1 on held-out set) are necessary but not sufficient. Online A/B tests measure the true business impact of deploying a model.",
    "shortNotes": "- Precision: minimize false alarms. Recall: minimize misses. F1: balance.\n- Accuracy is misleading for class imbalance — always report F1 / AUC.\n- ROC-AUC: threshold-independent ranking metric. PR-AUC: better for imbalance.\n- Use StratifiedKFold for classification cross-validation.\n- Report mean ± std across CV folds to account for variance.\n- Log all experiments with MLflow/W&B: params, metrics, model artifacts.\n- Threshold tuning: lower threshold → higher recall, lower precision.",
    "cheatSheet": "### Metric Selection Guide\n| Task | Primary Metric | Secondary |\n|------|---------------|-----------|\n| Balanced classification | Accuracy, F1 | ROC-AUC |\n| Imbalanced (rare positive) | PR-AUC, F1 | Recall |\n| Fraud/Medical detection | Recall | Precision |\n| Ranking/Retrieval | MAP@K, NDCG | Precision@K |\n| Regression | RMSE | MAE, R² |\n| Probabilistic output | Log-loss | Calibration |",
    "interviewQuestions": [
      {
        "question": "When would you prefer PR-AUC over ROC-AUC?",
        "answerHint": "ROC-AUC can be misleading for heavily imbalanced datasets because it includes the True Negative Rate in its computation. When negatives vastly outnumber positives (e.g., fraud: 0.1% positive rate), a model can have a high ROC-AUC even with poor precision on the minority class. PR-AUC focuses only on the positive class — Precision vs Recall — providing a more honest measure of performance when detecting rare events (fraud, cancer, network intrusions) where the positive class is what matters.",
        "type": "TECHNICAL"
      },
      {
        "question": "What is the bias-variance tradeoff and how do you diagnose it in a model?",
        "answerHint": "High bias (underfitting): the model is too simple and has systematically wrong predictions. Symptoms: high training error AND high validation error, similar magnitudes. Fix: more complex model, more features. High variance (overfitting): the model has memorized training noise. Symptoms: low training error but high validation error (large gap). Fix: regularization, dropout, more data, simpler model, feature selection. Diagnose by plotting learning curves (training vs validation error vs dataset size) or train/validation error gap.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "scikit-learn Model Evaluation",
        "url": "https://scikit-learn.org/stable/modules/model_evaluation.html",
        "type": "ARTICLE"
      },
      {
        "title": "Precision, Recall, F1, ROC — StatQuest",
        "url": "https://www.youtube.com/watch?v=4jRBRDbJemM",
        "type": "VIDEO"
      }
    ]
  },
  {
    "id": "aiml_06_ensemble",
    "slug": "ensemble",
    "title": "Ensemble Methods & Advanced Classical ML",
    "description": "Master Random Forests, Gradient Boosting (XGBoost, LightGBM), and ensemble techniques for production ML.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 90,
    "learningContent": "# Ensemble Methods & Advanced Classical ML\n\nEnsemble methods combine multiple models to achieve lower bias AND lower variance than any single model.\n\n## 1. Bagging (Bootstrap Aggregating)\nTrain B models on different bootstrap samples of the training data, then aggregate.\n- **Reduces variance** (averaging cancels out noise)\n- Works best with high-variance base learners (deep trees)\n\n## 2. Random Forests\nDecision trees + bagging + **random feature subsets at each split**.\n\n\\`\\`\\`python\nfrom sklearn.ensemble import RandomForestClassifier\n\nrf = RandomForestClassifier(\n    n_estimators=200,    # Number of trees\n    max_depth=None,      # Grow fully — variance reduced by averaging\n    max_features='sqrt', # Random feature subset at each split\n    random_state=42,\n    n_jobs=-1            # Use all CPU cores\n)\nrf.fit(X_train, y_train)\n\n# Feature importance (based on mean impurity decrease)\nimportances = rf.feature_importances_\n\\`\\`\\`\n\n## 3. Gradient Boosting\nBuild trees **sequentially**, each correcting the residual errors of the previous ensemble.\n- **Reduces bias** iteratively\n- Powerful but prone to overfitting\n\n### XGBoost — Industry Standard\n\\`\\`\\`python\nimport xgboost as xgb\n\nmodel = xgb.XGBClassifier(\n    n_estimators=500,\n    learning_rate=0.05,      # Shrinks each tree's contribution\n    max_depth=6,\n    subsample=0.8,           # Row subsampling (like bagging)\n    colsample_bytree=0.8,    # Feature subsampling\n    reg_alpha=0.1,           # L1 regularization\n    reg_lambda=1.0,          # L2 regularization\n    eval_metric='auc',\n    early_stopping_rounds=50  # Stop if val score doesn't improve for 50 rounds\n)\nmodel.fit(X_train, y_train, eval_set=[(X_val, y_val)], verbose=False)\n\\`\\`\\`\n\n### LightGBM — Faster XGBoost Alternative\n\\`\\`\\`python\nimport lightgbm as lgb\nmodel = lgb.LGBMClassifier(n_estimators=500, learning_rate=0.05)\n\\`\\`\\`\nLightGBM uses leaf-wise tree growth (vs level-wise in XGBoost), is much faster on large datasets, and handles categorical features natively.\n\n## 4. Stacking\nTrain a \"meta-model\" on the out-of-fold predictions of multiple base models.\n\\`\\`\\`python\nfrom sklearn.ensemble import StackingClassifier\nfrom sklearn.linear_model import LogisticRegression\n\nestimators = [('rf', RandomForestClassifier()), ('xgb', xgb.XGBClassifier())]\nstacker = StackingClassifier(estimators=estimators, final_estimator=LogisticRegression(), cv=5)\n\\`\\`\\`\n\n## 5. Hyperparameter Tuning\n\\`\\`\\`python\nfrom sklearn.model_selection import RandomizedSearchCV\n\nparam_dist = {'n_estimators': [100,200,500], 'max_depth': [3,6,9], 'learning_rate': [0.01,0.05,0.1]}\nsearch = RandomizedSearchCV(model, param_dist, n_iter=20, cv=5, scoring='roc_auc', n_jobs=-1)\nsearch.fit(X_train, y_train)\nprint(search.best_params_)\n\\`\\`\\`",
    "fullNotes": "# Detailed Notes: Ensemble Methods\n\n- **Out-of-Bag (OOB) Error:** Each bootstrap sample leaves out ~37% of data. Random Forest uses these left-out samples to estimate generalization error without a separate validation set. OOB error is a free, unbiased estimate of test error.\n- **Feature Importance Caution:** Tree-based feature importance (mean impurity decrease) is biased toward high-cardinality features. For unbiased importance, use permutation importance or SHAP values.\n- **SHAP Values:** SHapley Additive exPlanations provide model-agnostic, individual-level feature attributions grounded in game theory. The SHAP library works with XGBoost, LightGBM, and scikit-learn.",
    "shortNotes": "- Bagging: parallel training on bootstrap samples → reduces variance\n- Random Forest: bagging + random feature subsets → decorrelates trees\n- Gradient Boosting: sequential, each tree corrects residuals → reduces bias\n- XGBoost: add regularization (L1/L2) + early stopping to gradient boosting\n- LightGBM: faster than XGBoost, leaf-wise growth, native categoricals\n- Stacking: meta-model trained on base model predictions\n- Use SHAP values for unbiased, explainable feature attribution",
    "cheatSheet": "### XGBoost Key Hyperparameters\n| Parameter | Effect | Range |\n|-----------|--------|-------|\n| n_estimators | Number of trees | 100–2000 |\n| learning_rate | Shrinkage per tree | 0.01–0.3 |\n| max_depth | Tree complexity | 3–10 |\n| subsample | Row fraction per tree | 0.6–1.0 |\n| colsample_bytree | Feature fraction per tree | 0.5–1.0 |\n| reg_alpha | L1 regularization | 0–1 |\n| reg_lambda | L2 regularization | 0–10 |\n\n**Golden rule:** Use early_stopping_rounds — let the data decide n_estimators.",
    "interviewQuestions": [
      {
        "question": "How does gradient boosting differ from random forests?",
        "answerHint": "Random forests build trees independently in parallel and reduce variance by averaging. Gradient boosting builds trees sequentially — each new tree is fit to the residual errors (gradient of the loss) from the current ensemble, reducing bias. Random forests use deep trees (low bias, high variance); gradient boosting uses shallow trees (high bias, low variance) that collectively form a low-bias model. Gradient boosting tends to outperform random forests but is more prone to overfitting and has more hyperparameters.",
        "type": "TECHNICAL"
      },
      {
        "question": "What is early stopping in gradient boosting and why is it important?",
        "answerHint": "Early stopping monitors a validation metric (e.g., AUC) after each boosting round. If the metric does not improve for a specified number of rounds (early_stopping_rounds), training stops and the best model is restored. This prevents overfitting — gradient boosting with too many trees will memorize the training data. It also removes the burden of choosing n_estimators upfront: set a large value and let early stopping find the optimal number based on held-out validation performance.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "XGBoost Mathematical Foundations by StatQuest",
        "url": "https://www.youtube.com/watch?v=OtD8wVxBQgU",
        "type": "VIDEO"
      },
      {
        "title": "Random Forests and Decision Trees by StatQuest",
        "url": "https://www.youtube.com/watch?v=J4Wdy0Wc_xQ",
        "type": "VIDEO"
      },
      {
        "title": "XGBoost Documentation",
        "url": "https://xgboost.readthedocs.io/",
        "type": "ARTICLE"
      },
      {
        "title": "StatQuest: Gradient Boost",
        "url": "https://www.youtube.com/watch?v=3CC4N4z3GJc",
        "type": "VIDEO"
      }
    ]
  },
  {
    "id": "aiml_07_pipelines",
    "slug": "pipelines",
    "title": "ML Pipelines & Reproducibility",
    "description": "Build reproducible ML pipelines with scikit-learn Pipelines, experiment tracking, and versioning best practices.",
    "difficulty": "INTERMEDIATE",
    "estimatedLearnTime": 60,
    "learningContent": "# ML Pipelines & Reproducibility\n\n## 1. scikit-learn Pipelines\nA Pipeline chains preprocessing and modeling steps into a single object, guaranteeing correct fit/transform logic and preventing leakage.\n\n\\`\\`\\`python\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.ensemble import RandomForestClassifier\n\n# Define preprocessing for each column type\nnumeric_features = ['age', 'salary']\ncategorical_features = ['department', 'city']\n\npreprocessor = ColumnTransformer(transformers=[\n    ('num', StandardScaler(), numeric_features),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)\n])\n\n# Full pipeline: preprocessor + model\npipeline = Pipeline(steps=[\n    ('preprocessor', preprocessor),\n    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))\n])\n\n# This single object correctly handles train/test split\npipeline.fit(X_train, y_train)\ny_pred = pipeline.predict(X_test)\n\n# Cross-validation on the full pipeline\nfrom sklearn.model_selection import cross_val_score\nscores = cross_val_score(pipeline, X, y, cv=5, scoring='roc_auc')\n\\`\\`\\`\n\n## 2. Experiment Tracking with MLflow\n\\`\\`\\`python\nimport mlflow\nimport mlflow.sklearn\n\nmlflow.set_tracking_uri(\"http://localhost:5000\")\nmlflow.set_experiment(\"customer_churn_v2\")\n\nwith mlflow.start_run(run_name=\"rf_baseline\"):\n    # Log hyperparameters\n    mlflow.log_params({\n        \"n_estimators\": 100,\n        \"max_depth\": 10,\n        \"feature_set\": \"v2_with_tenure\"\n    })\n    \n    pipeline.fit(X_train, y_train)\n    \n    # Log metrics\n    mlflow.log_metrics({\n        \"train_auc\": roc_auc_score(y_train, pipeline.predict_proba(X_train)[:,1]),\n        \"val_auc\": roc_auc_score(y_val, pipeline.predict_proba(X_val)[:,1])\n    })\n    \n    # Log the full pipeline as a model artifact\n    mlflow.sklearn.log_model(pipeline, \"model\", input_example=X_train[:5])\n\\`\\`\\`\n\n## 3. Reproducibility Checklist\n- Set random seeds: \\`random_state=42\\",
    "fullNotes": "# Detailed Notes: ML Pipelines\n\n- **DVC (Data Version Control):** Git-like versioning for large ML datasets and model artifacts stored in S3, GCS, or local storage. Allows reproducible dataset tracking alongside code.\n- **Custom Transformers:** You can create custom pipeline steps by implementing sklearn's BaseEstimator and TransformerMixin with fit() and transform() methods.\n- **Weights & Biases (W&B):** An alternative to MLflow with richer visualization and team collaboration features. Strongly preferred in deep learning research.",
    "shortNotes": "- sklearn Pipeline: chain preprocessing + model. Handles train/test correctly.\n- ColumnTransformer: apply different preprocessors to different columns.\n- Always use Pipelines — they prevent data leakage in cross-validation.\n- MLflow: log params, metrics, and model artifacts for every experiment.\n- Pin all dependency versions for reproducibility.\n- Set random_state seeds everywhere (train_test_split, models, CV).\n- Save models with joblib; use MLflow model registry for production.",
    "cheatSheet": "### sklearn Pipeline Cheat Sheet\n\\`\\`\\`python\nPipeline([\n    ('step1', Transformer1()),\n    ('step2', Transformer2()),\n    ('model',  Estimator())\n])\n# .fit(X_train) → fits all steps on train\n# .predict(X_test) → transforms X_test, then predicts (no re-fitting!)\n# .fit_transform(X_train) only valid for transformers\n\\`\\`\\`\n### Reproducibility Seeds\n\\`\\`\\`python\nimport random, numpy as np\nrandom.seed(42)\nnp.random.seed(42)\n# For PyTorch: torch.manual_seed(42)\n\\`\\`\\`",
    "interviewQuestions": [
      {
        "question": "Why should preprocessing be inside a scikit-learn Pipeline rather than done manually before model training?",
        "answerHint": "Putting preprocessing inside a Pipeline guarantees correct separation of training and test data during cross-validation. If you manually scale X before calling cross_val_score, the scaler is fitted on all folds (including the validation fold), leaking test statistics into training. With a Pipeline, cross_val_score fits the scaler only on the training fold and applies it to the validation fold — the correct procedure. Pipelines also make deployment easier: one object handles all transforms and predictions, eliminating desynchronization bugs.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "Production ML Pipelines with MLflow and Feature Stores",
        "url": "https://www.youtube.com/watch?v=9_KkW3XkQ5U",
        "type": "VIDEO"
      },
      {
        "title": "sklearn Pipeline Documentation",
        "url": "https://scikit-learn.org/stable/modules/compose.html",
        "type": "ARTICLE"
      },
      {
        "title": "MLflow Documentation",
        "url": "https://mlflow.org/docs/latest/index.html",
        "type": "ARTICLE"
      }
    ]
  },
  {
    "id": "aiml_08_deep_learning",
    "slug": "deep_learning",
    "title": "Deep Learning Foundations",
    "description": "Master neural networks, backpropagation, activation functions, normalization, regularization, and optimization for deep learning.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 90,
    "learningContent": "# Deep Learning Foundations\n\n## 1. The Perceptron and MLP\nA **perceptron** computes: y = σ(wᵀx + b)\n\nA **multilayer perceptron (MLP)** stacks layers:\n- Layer l: aˡ = σ(Wˡaˡ⁻¹ + bˡ)\n\n**Universal Approximation Theorem:** A neural network with one hidden layer and enough neurons can approximate any continuous function. Depth (more layers) enables hierarchical feature learning.\n\n## 2. Activation Functions\n| Activation | Formula | Range | Use Case |\n|-----------|---------|-------|---------|\n| Sigmoid | 1/(1+e⁻ˣ) | (0,1) | Binary output |\n| Tanh | (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ) | (-1,1) | Hidden layers (LSTM) |\n| ReLU | max(0,x) | [0,∞) | Default hidden layers |\n| Leaky ReLU | max(αx,x) | (-∞,∞) | Fixes dying ReLU |\n| GELU | x·Φ(x) | (-∞,∞) | Transformers |\n| Softmax | eˣⁱ/Σeˣʲ | (0,1) | Multiclass output |\n\n**Dying ReLU problem:** If a neuron's input is always negative, its gradient is always 0 — it never updates. Fix: LeakyReLU, ELU, or careful initialization.\n\n## 3. Backpropagation\nThe chain rule applied to compute gradients through a computational graph.\n\nFor output neuron j: δʲ = ∂L/∂aʲ · σ'(zʲ)\nFor hidden neuron i: δⁱ = (Σⱼ wᵢⱼ δʲ) · σ'(zⁱ)\nGradient: ∂L/∂wᵢⱼ = δʲ · aⁱ\n\n(See 9J Gradients module for the full mathematical derivation)\n\n## 4. Normalization\n- **Batch Normalization:** Normalize layer inputs across the batch dimension. Reduces internal covariate shift, allows higher learning rates, acts as regularizer.\n\\`\\`\\`python\ntorch.nn.BatchNorm1d(num_features)  # For MLP\ntorch.nn.BatchNorm2d(num_channels)  # For CNN\n\\`\\`\\`\n- **Layer Normalization:** Normalize across the feature dimension (not batch). Used in Transformers — works with batch size 1.\n\n## 5. Regularization in Deep Learning\n- **Dropout:** Randomly zero out p fraction of neurons during training. Prevents co-adaptation. At test time, scale activations by (1-p).\n- **Weight Decay (L2):** Add λ‖w‖² to the optimizer (AdamW's default).\n- **Early Stopping:** Monitor validation loss; stop when it plateaus.\n- **Data Augmentation:** Create training variety (for images: flip, crop, rotate, color jitter).\n\n## 6. Weight Initialization\n- **Xavier/Glorot:** Var(w) = 2/(fanᵢₙ + fanₒᵤₜ). Good for Tanh/Sigmoid.\n- **Kaiming/He:** Var(w) = 2/fanᵢₙ. Good for ReLU. (Default in PyTorch Conv layers)\nPoor initialization leads to vanishing or exploding gradients.",
    "fullNotes": "# Detailed Notes: Deep Learning\n\n- **Vanishing/Exploding Gradients:** In deep networks, gradients can shrink exponentially (vanish, preventing learning in early layers) or grow exponentially (explode, causing NaN). Fixes: proper initialization, gradient clipping, batch norm, ResNet-style skip connections.\n- **Residual Connections (ResNets):** Output = F(x) + x — allows gradients to flow directly through the skip connection, enabling very deep networks (100+ layers) without vanishing gradients.",
    "shortNotes": "- MLP: stack of linear layers + activation functions\n- ReLU: default activation for hidden layers (simple, no vanishing grad problem)\n- Backprop: chain rule through computational graph → compute all gradients\n- BatchNorm: normalize per-feature across batch → stable training, regularizer\n- LayerNorm: normalize per-sample across features → used in Transformers\n- Dropout: randomly zero neurons during training → prevents overfitting\n- Kaiming init: for ReLU. Xavier init: for Tanh/Sigmoid.",
    "cheatSheet": "### Deep Learning Architecture Checklist\n1. Input layer → normalize/scale inputs\n2. Hidden layers: Linear → BatchNorm → ReLU → Dropout\n3. Output layer: Linear → (Sigmoid for binary, Softmax for multiclass)\n4. Loss: BCELoss/CrossEntropyLoss\n5. Optimizer: AdamW(lr=1e-3, weight_decay=1e-2)\n6. Monitor: train loss, val loss, early stopping\n\n### Gradient Problems\n| Problem | Symptom | Fix |\n|---------|---------|-----|\n| Vanishing grad | Early layers don't learn | ReLU, ResNet, good init |\n| Exploding grad | NaN loss | Gradient clipping, LR schedule |\n| Dying ReLU | Dead neurons | LeakyReLU, ELU |",
    "interviewQuestions": [
      {
        "question": "What is batch normalization, and why does it help training?",
        "answerHint": "Batch normalization normalizes the inputs to each layer across the batch dimension: subtract mean and divide by std, then apply learnable scale (γ) and shift (β). This reduces internal covariate shift — the changing distribution of layer inputs during training. Benefits: allows higher learning rates (stable gradients), reduces sensitivity to initialization, provides mild regularization (batch-level noise acts like dropout), and generally accelerates training. Limitation: depends on batch size (unstable with batch size 1) — use Layer Normalization in Transformers instead.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "Neural Networks & Backpropagation by 3Blue1Brown",
        "url": "https://www.youtube.com/watch?v=aircAruvnKk",
        "type": "VIDEO"
      },
      {
        "title": "Deep Learning Book (Goodfellow et al.)",
        "url": "https://www.deeplearningbook.org/",
        "type": "BOOK"
      },
      {
        "title": "Neural Networks (3Blue1Brown)",
        "url": "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
        "type": "VIDEO"
      }
    ]
  },
  {
    "id": "aiml_09_pytorch",
    "slug": "pytorch",
    "title": "PyTorch",
    "description": "Master PyTorch tensors, autograd, datasets, training loops, optimizers, GPU training, and debugging.",
    "difficulty": "INTERMEDIATE",
    "estimatedLearnTime": 90,
    "learningContent": "# PyTorch\n\nPyTorch is the dominant deep learning framework in research and increasingly in production.\n\n## 1. Tensors\n\\`\\`\\`python\nimport torch\n\n# Create tensors\nx = torch.tensor([[1.0, 2.0], [3.0, 4.0]])\nx = torch.zeros(3, 4)\nx = torch.randn(2, 3)            # Standard normal\n\n# GPU transfer\ndevice = 'cuda' if torch.cuda.is_available() else 'cpu'\nx = x.to(device)\n\n# Tensor operations (same as NumPy)\nx.shape          # torch.Size([2, 3])\nx.dtype          # torch.float32\nx + y            # Element-wise\nx @ y            # Matrix multiply\nx.T              # Transpose\nx.reshape(6)     # Reshape\nx.numpy()        # Convert to numpy (CPU only)\n\\`\\`\\`\n\n## 2. Autograd (Automatic Differentiation)\n\\`\\`\\`python\nx = torch.tensor([2.0], requires_grad=True)\ny = x**2 + 3*x + 1          # y = x² + 3x + 1\ny.backward()                  # Compute dy/dx = 2x + 3\nprint(x.grad)                 # tensor([7.]) — correct!\n\n# In practice: use .zero_grad() before each backward pass\noptimizer.zero_grad()\nloss.backward()\noptimizer.step()\n\\`\\`\\`\n\n## 3. Building Models\n\\`\\`\\`python\nimport torch.nn as nn\n\nclass MLP(nn.Module):\n    def __init__(self, input_dim, hidden_dim, output_dim):\n        super().__init__()\n        self.net = nn.Sequential(\n            nn.Linear(input_dim, hidden_dim),\n            nn.BatchNorm1d(hidden_dim),\n            nn.ReLU(),\n            nn.Dropout(0.3),\n            nn.Linear(hidden_dim, output_dim)\n        )\n\n    def forward(self, x):\n        return self.net(x)\n\nmodel = MLP(128, 256, 10).to(device)\n\\`\\`\\`\n\n## 4. Datasets and DataLoaders\n\\`\\`\\`python\nfrom torch.utils.data import Dataset, DataLoader\n\nclass MyDataset(Dataset):\n    def __init__(self, X, y):\n        self.X = torch.FloatTensor(X)\n        self.y = torch.LongTensor(y)\n\n    def __len__(self):\n        return len(self.y)\n\n    def __getitem__(self, idx):\n        return self.X[idx], self.y[idx]\n\ntrain_loader = DataLoader(MyDataset(X_train, y_train), batch_size=64, shuffle=True, num_workers=4)\n\\`\\`\\`\n\n## 5. The Training Loop\n\\`\\`\\`python\noptimizer = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-2)\nscheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=num_epochs)\ncriterion = nn.CrossEntropyLoss()\n\nfor epoch in range(num_epochs):\n    # Training phase\n    model.train()\n    for X_batch, y_batch in train_loader:\n        X_batch, y_batch = X_batch.to(device), y_batch.to(device)\n        optimizer.zero_grad()\n        outputs = model(X_batch)\n        loss = criterion(outputs, y_batch)\n        loss.backward()\n        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)  # Gradient clipping\n        optimizer.step()\n\n    # Validation phase\n    model.eval()\n    with torch.no_grad():\n        for X_batch, y_batch in val_loader:\n            outputs = model(X_batch.to(device))\n            # Compute val metrics\n\n    scheduler.step()\n\n# Save checkpoint\ntorch.save({'epoch': epoch, 'model_state_dict': model.state_dict(), 'optimizer_state_dict': optimizer.state_dict()}, 'checkpoint.pt')\n\\`\\`\\`\n\n## 6. Mixed Precision Training\n\\`\\`\\`python\nscaler = torch.cuda.amp.GradScaler()\nwith torch.autocast(device_type='cuda', dtype=torch.float16):\n    outputs = model(X_batch)\n    loss = criterion(outputs, y_batch)\nscaler.scale(loss).backward()\nscaler.step(optimizer)\nscaler.update()\n\\`\\`\\`\nMixed precision uses float16 for compute (2x speed, 2x memory savings) and float32 for optimizer state.",
    "fullNotes": "# Detailed Notes: PyTorch\n\n- **torch.no_grad() vs model.eval():** They do different things. torch.no_grad() disables gradient computation (saves memory and compute during inference). model.eval() changes the behavior of BatchNorm (uses running statistics instead of batch statistics) and Dropout (disabled). Always use BOTH during evaluation.\n- **DataLoader num_workers:** Spawns background processes to prefetch data. On Windows, use num_workers=0 or guard with if __name__ == '__main__'. On Linux, 4–8 workers typically saturate a GPU.",
    "shortNotes": "- tensor.to(device): move tensors to GPU. Always move model AND data.\n- requires_grad=True: track computations for autograd\n- optimizer.zero_grad() before each backward — PyTorch accumulates gradients by default\n- model.train() / model.eval(): switch BatchNorm/Dropout behavior\n- torch.no_grad(): disable gradient tracking for inference (saves memory)\n- DataLoader: shuffle=True for training, False for validation\n- Save/load with torch.save / torch.load (state_dict is preferred over full model)",
    "cheatSheet": "### PyTorch Training Loop Template\n\\`\\`\\`python\nfor epoch in range(epochs):\n    model.train()\n    for X, y in train_loader:\n        X, y = X.to(device), y.to(device)\n        optimizer.zero_grad()\n        loss = criterion(model(X), y)\n        loss.backward()\n        optimizer.step()\n\n    model.eval()\n    with torch.no_grad():\n        val_loss = sum(criterion(model(X.to(device)), y.to(device)) for X, y in val_loader)\n    print(f\"Epoch {epoch}: val_loss={val_loss/len(val_loader):.4f}\")\n\\`\\`\\`",
    "interviewQuestions": [
      {
        "question": "What is the difference between model.eval() and torch.no_grad()?",
        "answerHint": "model.eval() changes the behavior of specific layers: BatchNorm switches from using batch statistics to its running (training-time) statistics, and Dropout is disabled (all neurons active, activations scaled). torch.no_grad() disables the autograd engine for all operations inside the context, saving memory and compute by not building the computational graph. Both are needed during inference: model.eval() for correct layer behavior and torch.no_grad() for efficiency. They are completely orthogonal.",
        "type": "TECHNICAL"
      },
      {
        "question": "Why do we call optimizer.zero_grad() before backward()?",
        "answerHint": "PyTorch accumulates gradients by default — each call to backward() adds the new gradients to the existing .grad tensors without clearing them. This is useful for gradient accumulation (training with effective large batches when memory is limited). But for a standard training step, you want fresh gradients for each batch. Calling zero_grad() before backward() resets all gradients to zero, ensuring each batch computes its own clean gradient estimate.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "Building micrograd by Andrej Karpathy",
        "url": "https://www.youtube.com/watch?v=VMj-3S1tku0",
        "type": "VIDEO"
      },
      {
        "title": "PyTorch Full Course for Beginners by freeCodeCamp",
        "url": "https://www.youtube.com/watch?v=V_xro1bcAuA",
        "type": "VIDEO"
      },
      {
        "title": "PyTorch Official Tutorials",
        "url": "https://pytorch.org/tutorials/",
        "type": "ARTICLE"
      },
      {
        "title": "PyTorch for Deep Learning Full Course",
        "url": "https://www.youtube.com/watch?v=Z_ikDlimN6A",
        "type": "VIDEO"
      }
    ]
  },
  {
    "id": "aiml_10_computer_vision",
    "slug": "computer_vision",
    "title": "Computer Vision",
    "description": "Master image representation, CNNs, transfer learning, image classification, and object detection foundations.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 90,
    "learningContent": "# Computer Vision\n\n## 1. Image Representation\nAn image is a rank-3 tensor: [Height × Width × Channels] (HWC) or [Channels × Height × Width] (CHW in PyTorch).\n- Grayscale: 1 channel\n- RGB: 3 channels\n- Each pixel value ∈ [0, 255] → normalized to [0, 1] or standardized\n\n\\`\\`\\`python\nfrom torchvision import transforms\n\ntransform = transforms.Compose([\n    transforms.Resize((224, 224)),\n    transforms.RandomHorizontalFlip(),       # Data augmentation\n    transforms.ColorJitter(brightness=0.2),  # Data augmentation\n    transforms.ToTensor(),                   # PIL/numpy [0,255] → tensor [0,1]\n    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # ImageNet stats\n])\n\\`\\`\\`\n\n## 2. Convolutional Neural Networks (CNNs)\nCNNs exploit spatial structure: nearby pixels are related (translation equivariance).\n\n**Convolution operation:** slide a small filter (kernel) over the image, computing dot products at each position.\n- Kernel size: 3×3, 5×5, 7×7\n- Stride: how many pixels to skip between positions\n- Padding: add zeros around the border to preserve spatial size\n\n\\`\\`\\`python\nimport torch.nn as nn\n\nclass SimpleCNN(nn.Module):\n    def __init__(self, num_classes=10):\n        super().__init__()\n        self.features = nn.Sequential(\n            nn.Conv2d(3, 32, kernel_size=3, padding=1),  # 3 channels → 32 feature maps\n            nn.BatchNorm2d(32),\n            nn.ReLU(),\n            nn.MaxPool2d(2),                              # Halve spatial dims\n            nn.Conv2d(32, 64, kernel_size=3, padding=1),\n            nn.BatchNorm2d(64),\n            nn.ReLU(),\n            nn.MaxPool2d(2),\n        )\n        self.classifier = nn.Sequential(\n            nn.AdaptiveAvgPool2d(1),           # Global average pooling\n            nn.Flatten(),\n            nn.Linear(64, num_classes)\n        )\n\n    def forward(self, x):\n        return self.classifier(self.features(x))\n\\`\\`\\`\n\n## 3. Transfer Learning\nPre-train on large dataset (ImageNet, 1.2M images) → fine-tune on small target dataset.\n\\`\\`\\`python\nimport torchvision.models as models\n\n# Load pretrained ResNet50\nmodel = models.resnet50(weights='IMAGENET1K_V2')\n\n# Freeze all layers except the final classifier\nfor param in model.parameters():\n    param.requires_grad = False\n\n# Replace the final layer for your number of classes\nmodel.fc = nn.Linear(model.fc.in_features, num_classes)\n\n# Only optimize the new head\noptimizer = torch.optim.Adam(model.fc.parameters(), lr=1e-3)\n\\`\\`\\`\n\n## 4. Object Detection (Conceptual)\nBeyond classification: predict both the **class** and **bounding box** of each object.\n\n**YOLO (You Only Look Once):** Single-pass detection — divide image into grid, each cell predicts bounding boxes + class probabilities. Extremely fast.\n\n**Two-stage detectors (Faster R-CNN):** First propose candidate regions (Region Proposal Network), then classify each region. Slower but more accurate.\n\n**Key metrics:** mAP (mean Average Precision), IoU (Intersection over Union) for bounding box quality.",
    "fullNotes": "# Detailed Notes: Computer Vision\n\n- **MaxPool vs AvgPool vs GlobalAvgPool:** MaxPool retains the most prominent feature in a region (good for feature detection). AvgPool computes the average (smoother). Global Average Pooling (GAP) replaces the flatten + fully-connected layers with a single average per feature map — drastically reduces parameters and overfitting.\n- **ResNet (He et al., 2015):** Introduced skip/residual connections F(x)+x, enabling training of 152-layer networks. Key insight: adding an identity mapping makes it easy for layers to learn \"no change\" (identity), avoiding degradation.\n- **EfficientNet:** Systematically scales width, depth, and resolution together using a compound scaling coefficient, achieving state-of-the-art accuracy/efficiency.",
    "shortNotes": "- Image tensor: [C×H×W] in PyTorch. Always normalize with dataset statistics.\n- Conv2d: learn local spatial filters. Kernel slides over the image.\n- MaxPool2d: downsample (halve spatial size). Adds translation invariance.\n- Transfer learning: freeze pre-trained backbone, train new classifier head.\n- Use ImageNet pretrained models for most vision tasks (ResNet, EfficientNet).\n- Data augmentation: random flips, crops, color jitter → prevents overfitting.\n- IoU: bounding box overlap metric. mAP: object detection performance metric.",
    "cheatSheet": "### CNN Architecture Template\n\\`\\`\\`python\n# Feature extraction backbone\nConv2d → BatchNorm2d → ReLU → MaxPool2d  (×N layers)\n\n# Classifier head\nAdaptiveAvgPool2d(1) → Flatten → Dropout → Linear(num_classes)\n\\`\\`\\`\n\n### Transfer Learning Strategy\n| Target Dataset | Strategy |\n|---------------|---------|\n| Small + Similar | Freeze all, train head only |\n| Small + Different | Freeze early layers, fine-tune later layers + head |\n| Large + Any | Fine-tune entire model (low LR for backbone, high LR for head) |",
    "interviewQuestions": [
      {
        "question": "What makes CNNs suitable for image processing compared to fully-connected networks?",
        "answerHint": "CNNs exploit two properties of images: (1) Local connectivity — nearby pixels are correlated; a 3×3 filter captures local patterns efficiently. A fully-connected layer on a 224×224 image would require 150k+ parameters per neuron, while a 3×3 conv filter has only 9 parameters that are shared across the image. (2) Translation equivariance — the same pattern (e.g., a horizontal edge) looks the same regardless of where it appears. CNNs detect it everywhere with the same filter, while FC networks would need to relearn the pattern for each position.",
        "type": "TECHNICAL"
      },
      {
        "question": "What is transfer learning and why does it work?",
        "answerHint": "Transfer learning reuses a model trained on a large source task (ImageNet) on a smaller target task. It works because lower layers of CNNs learn generic features (edges, textures, colors) that are universally useful across visual tasks, regardless of the specific domain. Only the higher layers and final classifier are task-specific. By freezing the pretrained backbone and only training the new head, we get good performance with far less data and compute. Fine-tuning (slightly updating all layers with a low learning rate) pushes performance further when more target data is available.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "Convolutional Neural Networks (CNNs) & Vision Transformers",
        "url": "https://www.youtube.com/watch?v=YRhxdVk_sIs",
        "type": "VIDEO"
      },
      {
        "title": "torchvision documentation",
        "url": "https://pytorch.org/vision/stable/index.html",
        "type": "ARTICLE"
      },
      {
        "title": "Deep Learning for Computer Vision (Michigan)",
        "url": "https://www.youtube.com/playlist?list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r",
        "type": "VIDEO"
      }
    ]
  },
  {
    "id": "aiml_11_nlp",
    "slug": "nlp",
    "title": "NLP Foundations",
    "description": "Master tokenization, text preprocessing, word embeddings, and sequence representations for NLP tasks.",
    "difficulty": "INTERMEDIATE",
    "estimatedLearnTime": 75,
    "learningContent": "# NLP Foundations\n\n## 1. Text Preprocessing\n\\`\\`\\`python\nimport re\nimport nltk\nfrom nltk.tokenize import word_tokenize\nfrom nltk.stem import PorterStemmer\n\ndef preprocess(text: str) -> list[str]:\n    text = text.lower()                          # Lowercase\n    text = re.sub(r'[^a-z0-9\\\\s]', '', text)     # Remove punctuation\n    tokens = word_tokenize(text)                  # Tokenize\n    tokens = [t for t in tokens if t not in stopwords]  # Remove stopwords\n    tokens = [PorterStemmer().stem(t) for t in tokens]   # Stem\n    return tokens\n\\`\\`\\`\n\n**Bag of Words (BoW):** Represent text as a vector of word counts. Loses word order. Works surprisingly well for classification.\n\n**TF-IDF:** Term Frequency × Inverse Document Frequency. Weights words by how discriminative they are — common words (the, a) get low weights.\n\n## 2. Tokenization Strategies\n- **Word tokenization:** Split on whitespace. Simple but breaks for subwords (running → run + ning)\n- **Subword (BPE — Byte Pair Encoding):** Start with characters, iteratively merge frequent pairs into subword tokens. Used in GPT models. Handles OOV (out-of-vocabulary) words naturally.\n- **Sentencepiece/WordPiece:** Alternative subword algorithms. Used in BERT.\n\n\\`\\`\\`python\nfrom transformers import GPT2Tokenizer\n\ntokenizer = GPT2Tokenizer.from_pretrained('gpt2')\ntokens = tokenizer(\"Hello, how are you?\")\nprint(tokens['input_ids'])  # [15496, 11, 703, 389, 345, 30]\nprint(tokenizer.decode(tokens['input_ids']))  # \"Hello, how are you?\"\n\\`\\`\\`\n\n## 3. Word Embeddings\n**Word2Vec:** Train a shallow neural network to predict context words. Result: dense vector representations where semantic similarity = cosine similarity.\n\nTwo architectures:\n- **CBOW:** Predict center word from context\n- **Skip-gram:** Predict context words from center word (better for rare words)\n\n\\`\\`\\`python\nfrom gensim.models import Word2Vec\n\nmodel = Word2Vec(sentences, vector_size=100, window=5, min_count=2, sg=1)  # sg=1: Skip-gram\nmodel.wv['king'] - model.wv['man'] + model.wv['woman'] ≈ model.wv['queen']\n\\`\\`\\`\n\n**GloVe:** Train on global co-occurrence statistics. Complements Word2Vec.\n\n## 4. Text Classification\n\\`\\`\\`python\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\n\nclf = Pipeline([\n    ('tfidf', TfidfVectorizer(max_features=50000, ngram_range=(1,2))),\n    ('clf', LogisticRegression(C=1.0))\n])\nclf.fit(X_train_texts, y_train)\n\\`\\`\\`\n\nA TF-IDF + Logistic Regression baseline is a surprisingly strong starting point for most text classification tasks.",
    "fullNotes": "# Detailed Notes: NLP Foundations\n\n- **Vocabulary size tradeoff:** Large vocabulary → better coverage, more parameters. Small vocabulary → more OOV, less memory. BPE tokenizers typically use 30k-50k tokens, covering essentially any text without OOV.\n- **Static vs Contextual Embeddings:** Word2Vec gives one vector per word regardless of context (\"bank\" always has the same embedding). Contextual embeddings (BERT) give a different vector per occurrence based on surrounding words — dramatically more powerful.\n- **N-grams:** Capture short phrases in BoW/TF-IDF. bigram(1,2) often significantly improves text classification over unigrams alone.",
    "shortNotes": "- BoW: word count vector (no order). TF-IDF: weighted by discriminativeness.\n- BPE tokenization: handles OOV, used by GPT. WordPiece: used by BERT.\n- Word2Vec: dense word embeddings where semantic similarity = cosine similarity\n- king - man + woman ≈ queen: word analogy demonstrates embedding geometry\n- TF-IDF + LogReg: strong baseline for text classification\n- Stopwords: high-frequency words with low information (the, a, is)\n- Static embeddings (Word2Vec) vs contextual (BERT/GPT)",
    "cheatSheet": "### NLP Pipeline Steps\n1. Text → Preprocessing (lowercase, remove special chars)\n2. Tokenization (whitespace, BPE, WordPiece)\n3. Vocabulary / Embedding lookup\n4. Sequence representation (BoW, TF-IDF, embeddings)\n5. Model (LogReg, LSTM, Transformer)\n6. Output (class label, generated text, extracted spans)\n\n### Tokenizer Comparison\n| Tokenizer | Used In | OOV Handling |\n|-----------|---------|-------------|\n| Word | Classic NLP | Fails on new words |\n| BPE | GPT-2/3/4 | Character fallback |\n| WordPiece | BERT | ## prefix for subwords |\n| Sentencepiece | T5, LLaMA | Language-agnostic |",
    "interviewQuestions": [],
    "resources": [
      {
        "title": "Word2Vec & Text Embeddings by StatQuest",
        "url": "https://www.youtube.com/watch?v=viZrOnJcl9A",
        "type": "VIDEO"
      },
      {
        "title": "Stanford CS224N: NLP with Deep Learning",
        "url": "https://web.stanford.edu/class/cs224n/",
        "type": "COURSE"
      },
      {
        "title": "Word2Vec Paper (Mikolov et al., 2013)",
        "url": "https://arxiv.org/abs/1301.3781",
        "type": "ARTICLE"
      }
    ]
  },
  {
    "id": "aiml_12_transformers",
    "slug": "transformers",
    "title": "Transformers",
    "description": "Master self-attention, multi-head attention, positional encoding, encoder/decoder architectures, and the Transformer model.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 90,
    "learningContent": "# Transformers\n\nThe Transformer architecture (Vaswani et al., \"Attention Is All You Need\", 2017) is the foundation of all modern large models.\n\n## 1. The Attention Mechanism\nGiven Queries (Q), Keys (K), Values (V):\n**Attention(Q, K, V) = softmax(QKᵀ / √dₖ) · V**\n\n- QKᵀ: similarity scores between each query and all keys\n- /√dₖ: scale by key dimension to prevent gradient vanishing in softmax\n- softmax: normalize to a probability distribution\n- ·V: weighted sum of values\n\n**Intuition:** For each position, compute how much to \"attend to\" each other position, then take a weighted average of their values.\n\n\\`\\`\\`python\nimport torch\nimport torch.nn.functional as F\n\ndef scaled_dot_product_attention(Q, K, V, mask=None):\n    d_k = Q.size(-1)\n    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)  # (B, heads, seq, seq)\n    if mask is not None:\n        scores = scores.masked_fill(mask == 0, float('-inf'))\n    weights = F.softmax(scores, dim=-1)\n    return torch.matmul(weights, V), weights\n\\`\\`\\`\n\n## 2. Multi-Head Attention\nRun h attention heads in parallel, each with different learned projections:\n**MultiHead(Q,K,V) = Concat(head₁,...,headₕ)Wᴼ**\nwhere headᵢ = Attention(QWᵢQ, KWᵢK, VWᵢV)\n\nDifferent heads can attend to different aspects (syntax, semantics, coreference).\n\n## 3. Positional Encoding\nAttention is permutation-invariant — it doesn't know the order of tokens. Positional encodings add order information:\n\n**Sinusoidal (original):**\nPE(pos, 2i) = sin(pos / 10000^(2i/d))\nPE(pos, 2i+1) = cos(pos / 10000^(2i/d))\n\n**Learned (modern):** Each position gets a learnable embedding vector. Used by BERT, GPT.\n**RoPE (Rotary Position Embedding):** Used by LLaMA, GPT-NeoX — encodes relative positions via rotation.\n\n## 4. Transformer Architecture\n\\`\\`\\`\nInput → Embedding + Positional Encoding\n    ↓\n[Encoder Block] × N:\n    Multi-Head Self-Attention → Add & Norm\n    Feed-Forward (2×Linear + ReLU) → Add & Norm\n    ↓\n[Decoder Block] × N:\n    Masked Multi-Head Self-Attention (causal) → Add & Norm\n    Cross-Attention (queries from decoder, keys/values from encoder) → Add & Norm\n    Feed-Forward → Add & Norm\n    ↓\nLinear + Softmax → Next token probability\n\\`\\`\\`\n\n- **Encoder-only (BERT):** Bidirectional — sees full context. Good for understanding tasks.\n- **Decoder-only (GPT):** Causal (left-to-right) — good for generation.\n- **Encoder-Decoder (T5, BART):** Full architecture for seq2seq (translation, summarization).\n\n## 5. Decoding Strategies\n- **Greedy:** Always pick argmax token. Fast but can get stuck.\n- **Beam Search:** Keep top-B most likely sequences at each step.\n- **Temperature Sampling:** Sample from softmax(logits/T). Higher T → more diversity.\n- **Top-k / Top-p (nucleus) Sampling:** Sample from top-k tokens or tokens covering top-p probability mass.",
    "fullNotes": "# Detailed Notes: Transformers\n\n- **Pre-Layer vs Post-Layer Normalization:** Original Transformer uses Post-LN (after attention/FFN). Modern LLMs use Pre-LN (before attention/FFN) — more stable training at scale.\n- **Causal Mask:** In decoder-only models, a lower-triangular mask ensures position i cannot attend to positions j > i (future tokens). This enables training on all positions simultaneously using teacher forcing.\n- **Flash Attention:** An IO-aware, fused CUDA kernel for attention that avoids materializing the full N×N attention matrix in GPU HBM. 3-8× speedup for long sequences. Essential for long context LLMs.",
    "shortNotes": "- Attention: weighted average of values, weights = softmax(QKᵀ/√d)\n- Scale by √dₖ: prevents large dot products from saturating softmax\n- Multi-head: h parallel attention heads → different relationship types\n- Positional encoding: add positional info (sinusoidal, learned, RoPE)\n- Encoder-only (BERT): bidirectional, understanding tasks\n- Decoder-only (GPT): causal/autoregressive, generation tasks\n- Encoder-Decoder (T5): full seq2seq (translation, summarization)",
    "cheatSheet": "### Attention Formula\n\\`\\`\\`\nAttention(Q, K, V) = softmax(QKᵀ / √dₖ) · V\n\\`\\`\\`\n\n### Transformer Variants\n| Architecture | Attention | Best For |\n|-------------|----------|---------|\n| Encoder only | Bidirectional | Classification, NER, QA |\n| Decoder only | Causal | Text generation, LLMs |\n| Encoder-Decoder | Both | Translation, Summarization |\n\n### Key Papers\n- \"Attention Is All You Need\" (2017) — Original Transformer\n- BERT (2018) — Masked LM pretraining, encoder-only\n- GPT (2018) — Autoregressive pretraining, decoder-only",
    "interviewQuestions": [
      {
        "question": "Explain the scaled dot-product attention mechanism and why we scale by √dₖ.",
        "answerHint": "Scaled dot-product attention computes: softmax(QKᵀ/√dₖ)·V. For each query, we compute its similarity to all keys via dot products, scale by √dₖ, apply softmax to get attention weights summing to 1, then take a weighted sum of the value vectors. We scale by √dₖ because the dot products QKᵀ have magnitude proportional to dₖ (sum of dₖ random variables). Without scaling, large dₖ values push the softmax inputs into regions with near-zero gradients (softmax saturates), causing vanishing gradients during training.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "Visual Guide to Transformers by 3Blue1Brown",
        "url": "https://www.youtube.com/watch?v=wjZofJX0v4U",
        "type": "VIDEO"
      },
      {
        "title": "Attention is All You Need: Transformers Explained by Umar Jamil",
        "url": "https://www.youtube.com/watch?v=bCz4OMemCcA",
        "type": "VIDEO"
      },
      {
        "title": "Attention Is All You Need (Vaswani et al., 2017)",
        "url": "https://arxiv.org/abs/1706.03762",
        "type": "ARTICLE"
      },
      {
        "title": "The Illustrated Transformer (Jay Alammar)",
        "url": "https://jalammar.github.io/illustrated-transformer/",
        "type": "ARTICLE"
      }
    ]
  },
  {
    "id": "aiml_13_llm_foundations",
    "slug": "llm_foundations",
    "title": "Large Language Model Foundations",
    "description": "Master LLM architecture, pretraining, tokenization, context windows, inference, prompting, and emergent capabilities.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 90,
    "learningContent": "# Large Language Model Foundations\n\n## 1. What is an LLM?\nA Large Language Model is a decoder-only Transformer trained via autoregressive language modeling to predict the next token P(xₜ | x₁, ..., xₜ₋₁).\n\n**Scaling laws (Kaplan et al., Hoffmann et al.):** Model performance (next-token prediction loss) scales predictably with:\n- Number of parameters N\n- Training tokens D\n- Compute budget C ≈ 6ND\n\nChinchilla scaling law: optimal training uses N ≈ 20D tokens per parameter.\n\n## 2. Pretraining\nTrain on massive text corpora (web, books, code, scientific papers) to minimize:\nL = -Σₜ log P(xₜ | x₁,...,xₜ₋₁)\n\nThis single objective induces:\n- World knowledge (facts stored in model weights)\n- Grammar, syntax, reasoning patterns\n- Code and formal language understanding\n- In-context learning ability\n\n## 3. Tokenization for LLMs\n\\`\\`\\`python\nfrom transformers import AutoTokenizer\n\ntokenizer = AutoTokenizer.from_pretrained(\"meta-llama/Llama-3-8B\")\ntokens = tokenizer(\"The capital of France is\")\nprint(tokens.input_ids)          # [464, 3135, 286, 4881, 318]\nprint(tokenizer.decode([464]))   # \"The\"\n\n# Token count matters: affects cost, speed, context limits\ntoken_count = len(tokenizer.encode(long_text))\n\\`\\`\\`\n\n## 4. Context Window\nThe context window is the maximum number of tokens the model can process in one forward pass. Beyond this length, the model cannot access older context.\n\n- GPT-3.5: 4k tokens\n- GPT-4: 128k tokens\n- Claude 3: 200k tokens\n- LLaMA 3: 128k tokens (with RoPE extension)\n\n**Why it matters:** Long documents, multi-turn conversations, large code files.\n\n## 5. Inference and Decoding\n\\`\\`\\`python\nfrom transformers import AutoModelForCausalLM, AutoTokenizer\nimport torch\n\nmodel = AutoModelForCausalLM.from_pretrained(\"meta-llama/Llama-3-8B\")\ntokenizer = AutoTokenizer.from_pretrained(\"meta-llama/Llama-3-8B\")\n\ninputs = tokenizer(\"Explain attention in one sentence:\", return_tensors=\"pt\")\noutputs = model.generate(\n    **inputs,\n    max_new_tokens=100,\n    temperature=0.7,     # Creativity control\n    top_p=0.9,           # Nucleus sampling\n    do_sample=True       # Enable sampling (vs greedy)\n)\nprint(tokenizer.decode(outputs[0], skip_special_tokens=True))\n\\`\\`\\`\n\n## 6. Prompting Strategies\n- **Zero-shot:** Direct question with no examples. \"Translate to French: Hello.\"\n- **Few-shot:** Provide 3–10 examples in the prompt before the target.\n- **Chain-of-Thought (CoT):** Add \"Let's think step by step\" to trigger reasoning traces.\n- **Instruction tuning:** RLHF/SFT models (GPT-4, Claude) are already instruction-tuned — natural language instructions work directly.\n\n## 7. Emergent Capabilities\nAt sufficient scale, LLMs exhibit capabilities not present in smaller models:\n- In-context learning (learn from prompt examples)\n- Multi-step reasoning\n- Code generation and execution\n- Arithmetic\n- Instruction following",
    "fullNotes": "# Detailed Notes: LLM Foundations\n\n- **KV Cache:** During autoregressive generation, the key and value tensors for each attention head are computed once and cached. Each new token only adds one new row to the KV cache instead of recomputing all prior tokens. Essential for efficient inference.\n- **RLHF (Reinforcement Learning from Human Feedback):** After pretraining, models are fine-tuned on human preference data via PPO. This aligns model outputs with human preferences (helpfulness, harmlessness, honesty). Used by GPT-4, Claude, Gemini.\n- **Instruction Tuning (SFT):** Fine-tune a base pretrained LLM on a curated dataset of (instruction, response) pairs. Cheaper and simpler than RLHF; often sufficient for most use cases.",
    "shortNotes": "- LLM = decoder-only Transformer trained to predict next token\n- Pretraining objective: minimize next-token prediction loss on massive text\n- Chinchilla: optimal: ~20 tokens per parameter for training\n- Context window: max tokens in one forward pass — affects memory and cost\n- KV cache: cache past keys/values for efficient autoregressive generation\n- Temperature: controls output diversity. T→0: greedy. T→∞: uniform.\n- Top-p (nucleus) sampling: sample from tokens covering top p probability mass",
    "cheatSheet": "### Prompting Strategies\n| Strategy | Template | Use When |\n|----------|---------|---------|\n| Zero-shot | Task: {input} | Simple, well-defined tasks |\n| Few-shot | Example1...ExampleN. Task: {input} | Need to specify format/style |\n| Chain-of-Thought | \"Think step by step.\" | Multi-step reasoning |\n| ReAct | Thought/Action/Observation loop | Tool use, agentic tasks |\n\n### Decoding Parameters\n| Parameter | Effect |\n|-----------|--------|\n| temperature=0 | Greedy (deterministic) |\n| temperature=1 | Standard sampling |\n| temperature>1 | More creative/diverse |\n| top_p=0.9 | Nucleus sampling (recommended) |\n| max_new_tokens | Hard stop on generation length |",
    "interviewQuestions": [
      {
        "question": "What is the KV cache and why is it critical for LLM inference efficiency?",
        "answerHint": "During autoregressive generation, each new token must attend to all previous tokens. Without a KV cache, the key and value projections of all prior tokens would need to be recomputed for every new token, making generation O(N²) in sequence length. The KV cache stores the key and value tensors from prior tokens in GPU memory. When generating token t+1, we only compute K and V for the new token and append them — all prior K/V are already cached. This reduces per-step computation to O(1) in sequence length (one new row per head), enabling practical long-context generation.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "Intro to Large Language Models by Andrej Karpathy",
        "url": "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        "type": "VIDEO"
      },
      {
        "title": "Let us build GPT from scratch by Andrej Karpathy",
        "url": "https://www.youtube.com/watch?v=kCc8FmEb1nY",
        "type": "VIDEO"
      },
      {
        "title": "Attention Is All You Need + GPT-3 Paper",
        "url": "https://arxiv.org/abs/2005.14165",
        "type": "ARTICLE"
      }
    ]
  },
  {
    "id": "aiml_14_embeddings",
    "slug": "embeddings",
    "title": "Embeddings & Vector Databases",
    "description": "Master embedding models, semantic similarity, vector search algorithms, and production vector databases.",
    "difficulty": "INTERMEDIATE",
    "estimatedLearnTime": 75,
    "learningContent": "# Embeddings & Vector Databases\n\n## 1. What are Embeddings?\nAn embedding model maps content (text, images, code) to a dense vector in a semantic space where similar content has similar vectors (measured by cosine similarity or dot product).\n\n\\`\\`\\`python\nfrom sentence_transformers import SentenceTransformer\nimport numpy as np\n\nmodel = SentenceTransformer('all-MiniLM-L6-v2')  # 384-dim embeddings\n\nsentences = [\n    \"The cat sat on the mat.\",\n    \"A feline rested on the rug.\",   # Semantically similar\n    \"The stock market crashed today.\" # Semantically different\n]\nembeddings = model.encode(sentences)  # Shape: (3, 384)\n\n# Cosine similarity\ndef cosine_sim(a, b):\n    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))\n\nprint(cosine_sim(embeddings[0], embeddings[1]))  # ~0.85 (similar)\nprint(cosine_sim(embeddings[0], embeddings[2]))  # ~0.12 (different)\n\\`\\`\\`\n\n## 2. Embedding Model Types\n- **Sentence Transformers (SBERT):** Siamese network trained with contrastive loss to produce sentence-level embeddings. Fast, widely used for semantic search.\n- **OpenAI text-embedding-3:** High-quality embeddings via API. 1536 or 3072 dimensions.\n- **BGE / E5 / GTE:** Open-source models competitive with OpenAI.\n- **Matryoshka Embeddings:** Can be truncated to smaller dimensions without retraining.\n\n## 3. Approximate Nearest Neighbor (ANN) Search\nExact nearest neighbor search is O(N·d) — too slow for millions of vectors.\nANN algorithms find approximate top-k results in O(log N) or O(d√N).\n\n**FAISS (Facebook AI Similarity Search):**\n\\`\\`\\`python\nimport faiss\nimport numpy as np\n\nd = 384          # Embedding dimension\nindex = faiss.IndexFlatIP(d)  # Inner product (cosine after normalization)\nfaiss.normalize_L2(embeddings) # Normalize to unit sphere for cosine similarity\n\nindex = faiss.IndexIVFFlat(faiss.IndexFlatIP(d), d, 100)  # IVF: 100 clusters\nindex.train(embeddings)\nindex.add(embeddings)\n\nquery = model.encode([\"cat sitting on floor\"])\nfaiss.normalize_L2(query)\ndistances, indices = index.search(query, k=5)  # Top-5 results\n\\`\\`\\`\n\n**HNSW (Hierarchical Navigable Small World):** Graph-based ANN. Used by Qdrant, Weaviate, pgvector. Excellent recall/speed tradeoff.\n\n## 4. Vector Databases\n| Database | Type | Best For |\n|----------|------|---------|\n| **Qdrant** | Purpose-built vector DB | Production RAG, filtering |\n| **Weaviate** | Vector DB + GraphQL | Hybrid search, ML integrations |\n| **Pinecone** | Managed cloud | Minimal ops, quick start |\n| **pgvector** | PostgreSQL extension | Existing PostgreSQL stack |\n| **ChromaDB** | Embeddable, local | Development, prototyping |\n\n\\`\\`\\`python\nfrom qdrant_client import QdrantClient\nfrom qdrant_client.models import VectorParams, Distance, PointStruct\n\nclient = QdrantClient(\":memory:\")  # In-memory for dev\nclient.create_collection(\"docs\", vectors_config=VectorParams(size=384, distance=Distance.COSINE))\n\npoints = [PointStruct(id=i, vector=emb.tolist(), payload={\"text\": sentences[i]}) for i, emb in enumerate(embeddings)]\nclient.upsert(\"docs\", points=points)\n\nresults = client.search(\"docs\", query_vector=query[0].tolist(), limit=3)\n\\`\\`\\`",
    "fullNotes": "# Detailed Notes: Embeddings\n\n- **Asymmetric Embeddings:** Some tasks require different models for queries vs documents (e.g., BEIR benchmark tasks). Asymmetric models (BGE-M3) are trained with query-document pairs specifically.\n- **Embedding Drift:** The meaning of the same text can map to different vectors if you switch embedding models or update model versions. This requires re-embedding all documents — plan for this in production.\n- **Reranking:** ANN retrieval returns approximate nearest neighbors. A cross-encoder reranker (e.g., cross-encoder/ms-marco-MiniLM) takes each (query, candidate) pair and scores them more accurately, but at O(k) cost for top-k candidates.",
    "shortNotes": "- Embeddings: dense vectors where semantic similarity = cosine similarity\n- SBERT: fast sentence embeddings via Siamese Transformer network\n- ANN search: find approximate nearest neighbors in O(log N) instead of O(N)\n- FAISS: Facebook's ANN library. HNSW: graph-based ANN (used by most vector DBs).\n- Vector databases: Qdrant, Weaviate, Pinecone, pgvector\n- Always normalize embeddings to unit sphere for cosine similarity with dot product index\n- Reranking: fast retrieval (ANN) → accurate reranking (cross-encoder)",
    "cheatSheet": "### Embedding Pipeline\n\\`\\`\\`\nText → Embedding Model → Dense Vector (384-3072 dims)\n      ↓\nVector Database (HNSW index)\n      ↓\nQuery → ANN Search → Top-k candidates → (Optional) Reranker → Final results\n\\`\\`\\`\n\n### Choosing ANN Index (FAISS)\n| Index | Memory | Speed | Recall | Use When |\n|-------|--------|-------|--------|---------|\n| IndexFlatL2 | High | Slow | 100% | Small datasets (<100k) |\n| IndexIVFFlat | Medium | Fast | ~95% | Medium datasets |\n| IndexHNSWFlat | Medium | Very Fast | ~97% | Production retrieval |\n| IndexIVFPQ | Low | Fast | ~90% | Memory-constrained |",
    "interviewQuestions": [
      {
        "question": "What is a reranker and when should you use one in a retrieval system?",
        "answerHint": "A reranker is a cross-encoder model that takes a (query, candidate) pair and produces a fine-grained relevance score. Unlike bi-encoder retrieval (embed query and doc independently, then compare), cross-encoders compute attention between query and candidate jointly — much more accurate but O(k) times slower (for k candidates). In a retrieval pipeline: (1) fast ANN retrieval fetches the top-100 candidates using embeddings, (2) the cross-encoder reranker scores each of the 100 (query, candidate) pairs and reorders them, (3) the top-5 reranked results are returned. This combines speed and accuracy.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "Vector Databases Explained: Pinecone, Milvus, Qdrant",
        "url": "https://www.youtube.com/watch?v=klTvEwg3oJ8",
        "type": "VIDEO"
      },
      {
        "title": "FAISS Documentation",
        "url": "https://faiss.ai/",
        "type": "ARTICLE"
      },
      {
        "title": "Sentence Transformers Documentation",
        "url": "https://www.sbert.net/",
        "type": "ARTICLE"
      }
    ]
  },
  {
    "id": "aiml_15_rag",
    "slug": "rag",
    "title": "RAG & Retrieval Systems",
    "description": "Master Retrieval-Augmented Generation: document ingestion, chunking, retrieval, reranking, and production RAG evaluation.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 90,
    "learningContent": "# RAG & Retrieval Systems\n\n## 1. What is RAG?\nRAG (Retrieval-Augmented Generation) grounds LLM responses in external knowledge by:\n1. **Retrieve:** Find relevant documents from a knowledge base\n2. **Augment:** Inject retrieved context into the LLM prompt\n3. **Generate:** LLM produces an answer grounded in retrieved context\n\nThis addresses two key LLM limitations: knowledge cutoff and hallucination.\n\n## 2. Document Ingestion Pipeline\n\\`\\`\\`python\nfrom langchain.document_loaders import PyPDFLoader, DirectoryLoader\nfrom langchain.text_splitter import RecursiveCharacterTextSplitter\n\n# Load documents\nloader = DirectoryLoader('./docs', glob=\"**/*.pdf\", loader_cls=PyPDFLoader)\ndocuments = loader.load()\n\n# Chunk documents\nsplitter = RecursiveCharacterTextSplitter(\n    chunk_size=512,        # Max tokens per chunk\n    chunk_overlap=64,      # Overlap for context continuity\n    separators=[\"\\\\n\\\\n\", \"\\\\n\", \" \", \"\"]  # Try these separators in order\n)\nchunks = splitter.split_documents(documents)\nprint(f\"Split into {len(chunks)} chunks\")\n\n# Add metadata for filtering\nfor chunk in chunks:\n    chunk.metadata['doc_type'] = 'policy'\n    chunk.metadata['version'] = '2024-Q3'\n\\`\\`\\`\n\n## 3. Retrieval Strategies\n\\`\\`\\`python\nfrom qdrant_client import QdrantClient\nfrom sentence_transformers import SentenceTransformer\n\nencoder = SentenceTransformer('all-MiniLM-L6-v2')\nclient = QdrantClient(url=\"http://localhost:6333\")\n\ndef retrieve(query: str, top_k: int = 10, filters: dict = None):\n    query_vec = encoder.encode(query).tolist()\n    results = client.search(\n        collection_name=\"knowledge_base\",\n        query_vector=query_vec,\n        limit=top_k,\n        query_filter=filters  # Metadata filtering\n    )\n    return [r.payload['text'] for r in results]\n\\`\\`\\`\n\n**Hybrid Retrieval:** Combine dense (embedding) + sparse (BM25/TF-IDF) retrieval using Reciprocal Rank Fusion (RRF):\n\\`\\`\\`python\ndef hybrid_retrieve(query, dense_results, bm25_results, k=60):\n    # RRF scoring: score = Σ 1/(rank_i + k)\n    scores = {}\n    for rank, doc in enumerate(dense_results): scores[doc] = scores.get(doc, 0) + 1/(rank+1+k)\n    for rank, doc in enumerate(bm25_results): scores[doc] = scores.get(doc, 0) + 1/(rank+1+k)\n    return sorted(scores, key=scores.get, reverse=True)\n\\`\\`\\`\n\n## 4. Context Construction and Generation\n\\`\\`\\`python\nfrom openai import OpenAI\n\nclient = OpenAI()\n\ndef rag_query(user_question: str) -> str:\n    # Step 1: Retrieve\n    retrieved_chunks = retrieve(user_question, top_k=5)\n    context = \"\\\\n\\\\n\".join(retrieved_chunks)\n\n    # Step 2: Augment prompt\n    prompt = f\"\"\"Answer the question based ONLY on the provided context. \nIf the context doesn't contain the answer, say \"I don't know.\"\n\nContext:\n{context}\n\nQuestion: {user_question}\"\"\"\n\n    # Step 3: Generate\n    response = client.chat.completions.create(\n        model=\"gpt-4o\",\n        messages=[{\"role\": \"user\", \"content\": prompt}],\n        temperature=0.1  # Low temperature for factual QA\n    )\n    return response.choices[0].message.content\n\\`\\`\\`\n\n## 5. RAG Evaluation\n| Metric | Measures | Tool |\n|--------|---------|------|\n| Context Recall | Retrieved docs contain the answer | RAGAS |\n| Context Precision | Retrieved docs are relevant (not noisy) | RAGAS |\n| Answer Faithfulness | Answer is grounded in retrieved context | RAGAS |\n| Answer Relevance | Answer addresses the question | RAGAS |\n| Hallucination Rate | Answer contains info not in context | Manual / LLM-as-judge |\n\n## 6. Common Failure Modes\n- **Chunking too small:** Splits sentences mid-thought → context missing\n- **Poor retrieval:** Relevant docs not retrieved → LLM lacks context\n- **Too many chunks:** Noise overwhelms signal → lower faithfulness\n- **Wrong answer despite good retrieval:** LLM ignores context\n- **Hallucination:** LLM adds facts not present in retrieved context",
    "fullNotes": "# Detailed Notes: RAG\n\n- **Hierarchical Chunking:** Store full documents and summaries at different granularities. Retrieve at fine-grain but pass parent-chunk or document summary for wider context.\n- **Query Expansion:** Rephrase the query multiple times (HyDE — Hypothetical Document Embeddings) or expand with related terms to improve retrieval recall.\n- **Late Interaction Models (ColBERT):** Instead of one vector per document, store one vector per token. Match query tokens to document tokens for fine-grained retrieval. Higher accuracy but higher storage cost.",
    "shortNotes": "- RAG: Retrieve relevant chunks → inject into prompt → LLM generates grounded answer\n- Chunk size: 256-512 tokens with 10-15% overlap. Larger chunks = more context, less precision.\n- Hybrid retrieval: dense (semantic) + sparse (BM25) → better coverage via RRF\n- Reranking: retrieve top-50, rerank with cross-encoder, use top-5\n- Context precision: are retrieved chunks relevant? Context recall: is the answer in them?\n- Hallucination mitigation: low temperature, explicit \"only use context\" instruction, cite sources",
    "cheatSheet": "### RAG Pipeline Architecture\n\\`\\`\\`\nDocuments → Chunking → Embedding → Vector DB\n                                        ↑\nUser Query → Embedding → ANN Search → Retrieved Chunks\n                                        ↓\n                              Prompt Construction\n                                        ↓\n                            LLM → Grounded Answer\n\\`\\`\\`\n\n### Chunking Strategies\n| Strategy | When to Use |\n|----------|------------|\n| Fixed-size (RecursiveCharacter) | General purpose |\n| Semantic chunking | When paragraph boundaries matter |\n| Document-aware (HTML/MD) | Structured documents |\n| Sentence splitter | Short factual texts |",
    "interviewQuestions": [
      {
        "question": "What are the main failure modes in a RAG system and how do you address them?",
        "answerHint": "Retrieval failures: wrong or irrelevant chunks retrieved (fix: hybrid retrieval, reranking, better chunking), relevant chunks not retrieved due to vocabulary mismatch (fix: query expansion, BM25 hybrid). Generation failures: LLM ignores context and hallucinates (fix: stronger system prompt, citation requirements, faithfulness evaluation), LLM makes correct claims not in context (fix: strict faithfulness metric). Chunking failures: context split across chunks (fix: larger chunks with overlap, semantic chunking). Evaluate each stage independently using RAGAS or similar frameworks.",
        "type": "TECHNICAL"
      },
      {
        "question": "What is hybrid retrieval and why does it outperform pure dense retrieval?",
        "answerHint": "Hybrid retrieval combines dense semantic search (embedding similarity) with sparse lexical search (BM25/TF-IDF). Dense retrieval finds semantically similar content even with different vocabulary, but can miss exact keyword matches. Sparse retrieval (BM25) excels at exact keyword matching (product names, IDs, rare terms) but misses paraphrases. Combining both via Reciprocal Rank Fusion (RRF) — where the final score is the sum of reciprocal ranks from both lists — consistently outperforms either alone on standard retrieval benchmarks like BEIR.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "RAG Architecture: Production Retrieval-Augmented Generation",
        "url": "https://www.youtube.com/watch?v=tcqEUSNCn8I",
        "type": "VIDEO"
      },
      {
        "title": "RAGAS: RAG Evaluation Framework",
        "url": "https://docs.ragas.io/",
        "type": "ARTICLE"
      },
      {
        "title": "Advanced RAG (LlamaIndex Guide)",
        "url": "https://docs.llamaindex.ai/en/stable/optimizing/advanced_retrieval/",
        "type": "ARTICLE"
      }
    ]
  },
  {
    "id": "aiml_16_agents",
    "slug": "agents",
    "title": "AI Agents & Tool Use",
    "description": "Master AI agent architectures, tool calling, planning, memory, multi-agent workflows, and agent evaluation.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 75,
    "learningContent": "# AI Agents & Tool Use\n\n## 1. What is an AI Agent?\nAn AI agent is an LLM that can perceive its environment, reason about goals, select actions (tools), observe results, and iteratively work toward completing a task.\n\n**Agentic loop:**\n\\`\\`\\`\nUser goal → LLM reasons → Selects action/tool → \nExecutes tool → Observes result → LLM reasons again → \n... → Produces final answer\n\\`\\`\\`\n\n## 2. Tool Calling\nModern LLMs support structured function/tool calling — they output JSON specifying which tool to call and with what arguments.\n\n\\`\\`\\`python\nfrom openai import OpenAI\n\nclient = OpenAI()\n\ntools = [\n    {\n        \"type\": \"function\",\n        \"function\": {\n            \"name\": \"search_documents\",\n            \"description\": \"Search the knowledge base for relevant information\",\n            \"parameters\": {\n                \"type\": \"object\",\n                \"properties\": {\n                    \"query\": {\"type\": \"string\", \"description\": \"The search query\"},\n                    \"max_results\": {\"type\": \"integer\", \"default\": 5}\n                },\n                \"required\": [\"query\"]\n            }\n        }\n    }\n]\n\nresponse = client.chat.completions.create(\n    model=\"gpt-4o\",\n    messages=[{\"role\": \"user\", \"content\": \"What is our refund policy?\"}],\n    tools=tools,\n    tool_choice=\"auto\"\n)\n\n# Check if model wants to call a tool\nif response.choices[0].message.tool_calls:\n    tool_call = response.choices[0].message.tool_calls[0]\n    tool_name = tool_call.function.name\n    args = json.loads(tool_call.function.arguments)\n    result = call_tool(tool_name, args)\n\\`\\`\\`\n\n## 3. ReAct (Reasoning + Acting)\nReAct agents alternate between reasoning and acting:\n\\`\\`\\`\nThought: I need to find the current weather in Paris.\nAction: search(query=\"Paris weather today\")\nObservation: Paris is 18°C and partly cloudy.\nThought: I now have the answer.\nFinal Answer: The current weather in Paris is 18°C and partly cloudy.\n\\`\\`\\`\n\n## 4. Memory and State\n| Memory Type | Storage | Scope |\n|-------------|---------|-------|\n| In-context | LLM context window | Current conversation |\n| Session | Redis / database | Single user session |\n| Long-term | Vector database | Across conversations |\n| Procedural | Tools / code | Agent behavior |\n\n## 5. Multi-Agent Workflows\n\\`\\`\\`python\n# LangGraph: stateful, cyclical agent workflows\nfrom langgraph.graph import StateGraph\n\n# Define a supervisor agent that routes subtasks to specialist agents\ndef supervisor(state):\n    # Decide: which specialist to call next?\n    return {\"next\": \"researcher\" if needs_research(state) else \"writer\"}\n\nworkflow = StateGraph(AgentState)\nworkflow.add_node(\"supervisor\", supervisor)\nworkflow.add_node(\"researcher\", research_agent)\nworkflow.add_node(\"writer\", writer_agent)\n\\`\\`\\`\n\n## 6. Agent Reliability and Safety\n- **Tool validation:** Validate all arguments before execution\n- **Permission scoping:** Agents should have minimum necessary permissions\n- **Human approval:** For irreversible or high-risk actions (delete, payment, deploy)\n- **Retry with backoff:** Tools can fail transiently — implement retry logic\n- **Hallucinated tool calls:** LLM may call non-existent tools or with wrong args — validate strictly\n- **Prompt injection:** Malicious content in retrieved documents can hijack agent actions",
    "fullNotes": "# Detailed Notes: AI Agents\n\n- **ReAct vs Plan-and-Execute:** ReAct interleaves reasoning and action in a single loop. Plan-and-Execute first creates a full plan (list of steps), then executes each step. Plan-and-Execute is more predictable for long tasks but less adaptive to unexpected tool results.\n- **Context Window Management:** Long agent conversations exhaust the context window. Strategies: summarization of prior turns, sliding window, selective memory retrieval.\n- **Agent Evaluation:** Much harder than LLM evaluation. Metrics: task completion rate, number of steps to completion, error rate, tool call accuracy, final answer quality.",
    "shortNotes": "- Agent: LLM + tools + memory + planning loop\n- Tool calling: LLM outputs structured JSON specifying tool + args\n- ReAct: interleave Thought → Action → Observation until done\n- Memory: in-context (current), session (Redis), long-term (vector DB)\n- Human-in-the-loop: require approval for irreversible or high-risk actions\n- Prompt injection: sanitize tool outputs — they may contain adversarial instructions\n- Evaluate agents on task completion rate, not just output quality",
    "cheatSheet": "### Agent Design Checklist\n- [ ] Define clear tool interfaces with JSON schemas and descriptions\n- [ ] Validate all tool inputs before execution\n- [ ] Scope permissions to minimum required\n- [ ] Add human approval gates for irreversible actions\n- [ ] Implement retry + backoff for transient tool failures\n- [ ] Sanitize tool outputs to prevent prompt injection\n- [ ] Log every tool call + result for debugging and audit\n\n### Agent Frameworks\n| Framework | Best For |\n|-----------|---------|\n| LangGraph | Complex, stateful agent workflows |\n| OpenAI Assistants API | Managed tool use with file handling |\n| Anthropic tool use | Claude-based agents |\n| CrewAI | Multi-agent role-based tasks |",
    "interviewQuestions": [],
    "resources": [
      {
        "title": "AI Agents & Function Calling by Harrison Chase (LangChain)",
        "url": "https://www.youtube.com/watch?v=p1t3z4XqV9g",
        "type": "VIDEO"
      },
      {
        "title": "LangGraph Documentation",
        "url": "https://langchain-ai.github.io/langgraph/",
        "type": "ARTICLE"
      },
      {
        "title": "ReAct: Reasoning + Acting in LLMs (Yao et al.)",
        "url": "https://arxiv.org/abs/2210.03629",
        "type": "ARTICLE"
      }
    ]
  },
  {
    "id": "aiml_17_finetuning",
    "slug": "finetuning",
    "title": "Fine-Tuning & Adaptation",
    "description": "Master supervised fine-tuning, LoRA/QLoRA, parameter-efficient methods, dataset preparation, and adaptation tradeoffs.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 90,
    "learningContent": "# Fine-Tuning & Adaptation\n\n## 1. When to Fine-Tune\nFine-tuning adjusts a pretrained model's weights for a specific task or domain.\n\n**Use fine-tuning when:**\n- You need consistent output format/style\n- Domain adaptation (medical, legal, code)\n- Prompt engineering alone doesn't solve the task\n- Cost/latency: a smaller fine-tuned model can outperform a larger general model\n\n**Don't fine-tune when:**\n- Few examples (< a few hundred) — use few-shot prompting instead\n- The task changes frequently — prompts are easier to update than model weights\n\n## 2. Supervised Fine-Tuning (SFT)\n\\`\\`\\`python\nfrom datasets import Dataset\nfrom trl import SFTTrainer\nfrom transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments\n\nmodel = AutoModelForCausalLM.from_pretrained(\"meta-llama/Llama-3-8B\")\ntokenizer = AutoTokenizer.from_pretrained(\"meta-llama/Llama-3-8B\")\n\n# Prepare instruction dataset in chat format\ndataset = Dataset.from_list([\n    {\"messages\": [\n        {\"role\": \"user\", \"content\": \"Classify this email as spam or not.\"},\n        {\"role\": \"assistant\", \"content\": \"Not spam. The email discusses a legitimate meeting.\"}\n    ]}\n])\n\ntraining_args = TrainingArguments(\n    output_dir=\"./sft_output\",\n    num_train_epochs=3,\n    per_device_train_batch_size=4,\n    learning_rate=2e-5,\n    warmup_ratio=0.1,\n    lr_scheduler_type=\"cosine\"\n)\n\ntrainer = SFTTrainer(model=model, args=training_args, train_dataset=dataset, tokenizer=tokenizer)\ntrainer.train()\n\\`\\`\\`\n\n## 3. LoRA — Low-Rank Adaptation (Parameter-Efficient Fine-Tuning)\nLoRA freezes the pretrained model weights and adds small low-rank adapter matrices:\n**W' = W + ΔW = W + BA**\nwhere B ∈ ℝᵈˣʳ, A ∈ ℝʳˣᵏ, and r << min(d, k) (rank).\n\nThis reduces trainable parameters by ~99%: instead of fine-tuning a 7B model's attention weight matrix (d×k = 4096×4096 = 16M params), LoRA trains two small matrices B (4096×16) and A (16×4096) = 131k params.\n\n\\`\\`\\`python\nfrom peft import get_peft_model, LoraConfig, TaskType\n\nlora_config = LoraConfig(\n    r=16,                     # Rank — controls adapter capacity\n    lora_alpha=32,            # Scaling factor (effective LR = alpha/r)\n    target_modules=[\"q_proj\", \"v_proj\"],  # Which weight matrices to adapt\n    lora_dropout=0.05,\n    task_type=TaskType.CAUSAL_LM\n)\nmodel = get_peft_model(model, lora_config)\nmodel.print_trainable_parameters()  # \"trainable params: 6,553,600 || all params: 6,745,497,600\"\n\\`\\`\\`\n\n## 4. QLoRA — Quantized LoRA\nQLoRA combines LoRA with 4-bit NormalFloat (NF4) quantization of the base model weights. Fine-tune a 7B model on a single 24GB GPU.\n\n\\`\\`\\`python\nfrom transformers import BitsAndBytesConfig\n\nquantization_config = BitsAndBytesConfig(\n    load_in_4bit=True,\n    bnb_4bit_quant_type=\"nf4\",\n    bnb_4bit_compute_dtype=torch.bfloat16,\n    bnb_4bit_use_double_quant=True\n)\nmodel = AutoModelForCausalLM.from_pretrained(\"meta-llama/Llama-3-70B\", quantization_config=quantization_config)\n\\`\\`\\`\n\n## 5. Catastrophic Forgetting\nFine-tuning can cause the model to forget general capabilities. Mitigations:\n- **Low learning rate** (1e-5 to 3e-5 — much lower than pretraining)\n- **Few epochs** (1-3 for domain adaptation)\n- **LoRA:** Adapters are small → base model knowledge preserved\n- **Task-specific data mixing:** Include general instruction data in fine-tuning",
    "fullNotes": "# Detailed Notes: Fine-Tuning\n\n- **Data Quality vs Quantity:** For fine-tuning, 1000 high-quality examples typically outperform 10k low-quality ones. Focus on diversity, correctness, and format consistency.\n- **Alignment Fine-tuning (RLHF/DPO):** After SFT, RLHF trains a reward model on human preference pairs and uses PPO to maximize reward. DPO (Direct Preference Optimization) directly optimizes preferences without a separate reward model — simpler and often comparable.\n- **Adapter Merging:** After LoRA fine-tuning, merge adapters into base weights: W_merged = W + BA. This eliminates inference latency from applying adapters separately.",
    "shortNotes": "- Fine-tune when: consistent style needed, domain gap, prompt engineering fails\n- SFT: supervised fine-tuning on (instruction, response) pairs\n- LoRA: add low-rank adapter matrices (r≈16), freeze base model (99% param reduction)\n- QLoRA: LoRA + 4-bit base model quantization → fine-tune 70B on 1 GPU\n- Catastrophic forgetting: model forgets general capabilities → use low LR, few epochs\n- DPO: direct preference optimization — simpler alternative to RLHF\n- After training: merge LoRA adapters into base weights for zero-overhead inference",
    "cheatSheet": "### Fine-Tuning Decision Tree\n\\`\\`\\`\nIs the task achievable with prompting? → Use few-shot prompting\nDo you have <500 examples? → Use RAG or prompt engineering\nDo you have 500-10k examples? → Fine-tune with LoRA/QLoRA\nDo you have >10k examples? → Full fine-tuning or LoRA\nNeed to preserve general capabilities? → LoRA + low LR + few epochs\nNeed to run on 1 GPU? → QLoRA\n\\`\\`\\`\n### LoRA Hyperparameters\n| Param | Typical Value | Effect |\n|-------|--------------|--------|\n| r | 8–64 | Higher = more capacity |\n| alpha | 2×r | Controls scaling |\n| dropout | 0.05–0.1 | Regularization |\n| target_modules | q,v projections | Which layers to adapt |",
    "interviewQuestions": [
      {
        "question": "What is LoRA and why does it work for fine-tuning large language models?",
        "answerHint": "LoRA (Low-Rank Adaptation) hypothesizes that the updates to pretrained weights during fine-tuning have low intrinsic rank — the change ΔW can be approximated by two small matrices BA where r << min(d,k). Instead of fine-tuning W (millions of parameters), you only train B and A (thousands of parameters). This reduces trainable parameters by ~99%, dramatically cutting memory and compute requirements. It works because fine-tuning is task-specific adaptation — the required changes to the weight space lie in a low-dimensional subspace of the full parameter space.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "LoRA & QLoRA Fine-Tuning LLMs Explained by Umar Jamil",
        "url": "https://www.youtube.com/watch?v=PXWYUTMt-AU",
        "type": "VIDEO"
      },
      {
        "title": "LoRA Paper (Hu et al., 2021)",
        "url": "https://arxiv.org/abs/2106.09685",
        "type": "ARTICLE"
      },
      {
        "title": "HuggingFace PEFT Documentation",
        "url": "https://huggingface.co/docs/peft/",
        "type": "ARTICLE"
      }
    ]
  },
  {
    "id": "aiml_18_evaluation_safety",
    "slug": "evaluation_safety",
    "title": "AI Evaluation & Safety",
    "description": "Master LLM evaluation frameworks, hallucination detection, robustness, adversarial considerations, and responsible AI practices.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 75,
    "learningContent": "# AI Evaluation & Safety\n\n## 1. Why Evaluating AI is Hard\nTraditional ML metrics (accuracy, F1, AUC) don't apply to open-ended generation. LLM outputs can be:\n- Factually correct but poorly formatted\n- Well-formatted but factually wrong\n- Relevant but hallucinated\n- Safe but unhelpful\n\nEvaluation requires task-specific, multi-dimensional assessment.\n\n## 2. Reference-Based vs LLM-as-Judge\n\\`\\`\\`python\n# Reference-based: compare to ground truth\nfrom rouge_score import rouge_scorer\nscorer = rouge_scorer.RougeScorer(['rouge1', 'rougeL'])\nscores = scorer.score(reference_answer, model_answer)\n\n# BLEU (for translation)\nfrom sacrebleu import corpus_bleu\nbleu = corpus_bleu(hypotheses, [references])\n\n# BERTScore: semantic similarity (better than ROUGE)\nfrom bert_score import score as bert_score\nP, R, F1 = bert_score([model_answer], [reference_answer], lang='en')\n\\`\\`\\`\n\n**LLM-as-Judge:**\n\\`\\`\\`python\nfrom openai import OpenAI\nclient = OpenAI()\n\ndef llm_judge(question, model_answer, reference_answer):\n    prompt = f\"\"\"Rate the model's answer on a scale of 1-5 for:\n1. Factual accuracy (compared to reference)\n2. Completeness\n3. Clarity\n\nQuestion: {question}\nReference: {reference_answer}\nModel Answer: {model_answer}\n\nProvide a JSON response with scores and brief justification.\"\"\"\n    \n    response = client.chat.completions.create(model=\"gpt-4o\", messages=[{\"role\":\"user\",\"content\":prompt}], response_format={\"type\":\"json_object\"})\n    return response.choices[0].message.content\n\\`\\`\\`\n\n## 3. Hallucination Evaluation\n\\`\\`\\`python\n# Faithfulness evaluation for RAG: does the answer contradict the context?\ndef evaluate_faithfulness(context: str, answer: str) -> dict:\n    prompt = f\"\"\"Given the context and answer, identify claims in the answer \nthat are NOT supported by or contradict the context.\n\nContext: {context}\nAnswer: {answer}\n\nReturn JSON: {{\"supported_claims\": [], \"unsupported_claims\": [], \"faithfulness_score\": 0-1}}\"\"\"\n    # Call LLM-as-judge\n\\`\\`\\`\n\n## 4. Benchmark Suites\n| Benchmark | Task | Use For |\n|-----------|------|---------|\n| MMLU | Knowledge QA (57 domains) | General knowledge |\n| HumanEval / MBPP | Code generation | Coding models |\n| MT-Bench | Multi-turn conversation | Chat model quality |\n| HELM | Holistic, multi-scenario | Model comparison |\n| RAGAS | RAG pipeline metrics | RAG evaluation |\n| TruthfulQA | Truthfulness vs imitation | Hallucination |\n\n## 5. Adversarial Safety Considerations\n- **Prompt injection:** Malicious instructions in retrieved content\n- **Jailbreaking:** Bypassing safety guardrails\n- **Data poisoning:** Malicious training data manipulation\n- **PII leakage:** Model memorizes and reproduces private training data\n- **Tool misuse:** Agent executes harmful actions with legitimate tools\n- **Bias and fairness:** Differential model performance across demographic groups\n\n\\`\\`\\`python\n# Input/output guardrails with LLM classifier\nfrom openai import OpenAI\n\ndef safety_check(user_input: str) -> bool:\n    response = client.moderations.create(input=user_input)\n    return not response.results[0].flagged\n\\`\\`\\`",
    "fullNotes": "# Detailed Notes: AI Evaluation & Safety\n\n- **Inter-annotator Agreement:** Human evaluation requires measuring how consistently human raters agree. Low agreement (kappa < 0.6) means the task is ambiguous or raters need better guidelines. Use multiple raters and report agreement alongside evaluation metrics.\n- **Evaluation Dataset Contamination:** If the LLM was trained on benchmark test sets (common with web-scraped data), reported performance is inflated. Always check if the model has seen your evaluation data during training.\n- **Red Teaming:** Adversarially probe your system to find safety and quality failures before deployment. Combine automated probes (using another LLM to generate adversarial inputs) with human expert testing.",
    "shortNotes": "- ROUGE/BLEU: lexical overlap metrics — fast but miss semantic equivalence\n- BERTScore: semantic similarity via BERT representations — better than ROUGE\n- LLM-as-judge: flexible, powerful, but biased toward verbosity and similar style\n- Hallucination = generated content not grounded in context/source\n- RAGAS: context recall, context precision, faithfulness, answer relevance\n- Adversarial safety: prompt injection, jailbreaking, PII leakage, bias\n- OpenAI Moderation API: fast, free safety classifier for input/output filtering",
    "cheatSheet": "### AI Evaluation Framework\n1. **Task metrics:** ROUGE (summarization), BLEU (translation), Pass@k (code)\n2. **Semantic metrics:** BERTScore, embedding similarity\n3. **LLM-judge metrics:** GPT-4 scoring on accuracy, helpfulness, harmlessness\n4. **RAG metrics:** RAGAS (faithfulness, context precision, recall)\n5. **Safety metrics:** Refusal rate, jailbreak success rate, PII exposure\n6. **Human eval:** Gold standard for open-ended quality assessment\n\n### Evaluation Anti-patterns\n- Evaluating only on training distribution\n- Using the same LLM to generate AND evaluate answers\n- Optimizing for one metric that doesn't correlate with real quality\n- Ignoring failure modes (evaluate on adversarial inputs too)",
    "interviewQuestions": [
      {
        "question": "How would you evaluate whether an LLM application is safe to deploy in production?",
        "answerHint": "Multi-layered evaluation: (1) Input safety: classify all inputs with a safety filter (OpenAI Moderation or custom classifier) — reject or sanitize flagged inputs. (2) Hallucination: evaluate faithfulness on a representative sample — does the model only claim what is in context? (3) Red team: use automated LLM-based adversarial probing + human expert testing to find jailbreaks, prompt injection, and bias issues. (4) Fairness: evaluate performance across demographic groups. (5) Output filtering: detect and redact PII in outputs. (6) Monitoring: continuous evaluation post-deployment — drift detection, human feedback loops, anomaly alerts.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "RLHF, DPO & AI Alignment by StatQuest",
        "url": "https://www.youtube.com/watch?v=9_KkW3XkQ5U",
        "type": "VIDEO"
      },
      {
        "title": "LMSYS Chatbot Arena & MT-Bench",
        "url": "https://chat.lmsys.org/",
        "type": "ARTICLE"
      },
      {
        "title": "Evaluating LLMs (Patterns for LLM Systems)",
        "url": "https://www.youtube.com/watch?v=ahnGLM-RC1Y",
        "type": "VIDEO"
      }
    ]
  },
  {
    "id": "aiml_19_serving",
    "slug": "serving",
    "title": "Model Serving & Inference Fundamentals",
    "description": "Master model serialization, inference APIs, batching, latency/throughput, quantization concepts, and inference monitoring.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 75,
    "learningContent": "# Model Serving & Inference Fundamentals\n\n## 1. Model Serialization\n\\`\\`\\`python\nimport torch\n\n# PyTorch: Save and load model weights\ntorch.save(model.state_dict(), 'model.pth')\nmodel.load_state_dict(torch.load('model.pth'))\n\n# TorchScript: Serialize for production (no Python dependency)\nscripted_model = torch.jit.script(model)\nscripted_model.save('model_scripted.pt')\nscripted_loaded = torch.jit.load('model_scripted.pt')\n\n# ONNX: Interoperable format — export PyTorch, run anywhere\ntorch.onnx.export(\n    model, dummy_input,\n    \"model.onnx\",\n    input_names=[\"input\"],\n    output_names=[\"output\"],\n    dynamic_axes={\"input\": {0: \"batch_size\"}}  # Variable batch size\n)\n\n# For scikit-learn: joblib\nimport joblib\njoblib.dump(sklearn_model, 'model.pkl')\n\\`\\`\\`\n\n## 2. Building Inference APIs\n\\`\\`\\`python\nfrom fastapi import FastAPI\nfrom pydantic import BaseModel\nimport torch\nimport numpy as np\n\napp = FastAPI()\n\nclass PredictRequest(BaseModel):\n    features: list[float]\n\nclass PredictResponse(BaseModel):\n    prediction: float\n    probability: float\n\n# Load model once at startup\nmodel = torch.jit.load('model_scripted.pt')\nmodel.eval()\n\n@app.post(\"/predict\", response_model=PredictResponse)\nasync def predict(request: PredictRequest):\n    with torch.no_grad():\n        x = torch.FloatTensor([request.features])\n        logits = model(x)\n        prob = torch.sigmoid(logits).item()\n    return PredictResponse(prediction=int(prob > 0.5), probability=prob)\n\\`\\`\\`\n\n## 3. Batching for Throughput\n\\`\\`\\`python\nimport asyncio\nfrom collections import defaultdict\n\n# Dynamic batching: accumulate requests and process them together\nclass DynamicBatcher:\n    def __init__(self, max_batch_size=32, max_wait_ms=10):\n        self.queue = asyncio.Queue()\n        self.max_batch = max_batch_size\n        self.max_wait = max_wait_ms / 1000\n\n    async def batch_predict(self, features_list):\n        # Single GPU forward pass on entire batch\n        with torch.no_grad():\n            batch = torch.FloatTensor(features_list)\n            return model(batch).tolist()\n\\`\\`\\`\n\n**Throughput vs Latency:**\n- Single request: low latency, poor GPU utilization\n- Batch of 32: higher latency, 10-20× better GPU utilization\n\n## 4. Quantization Concepts\nReduce model size and speed up inference by using lower-precision arithmetic:\n\n| Precision | Size | Speed | Quality Loss |\n|-----------|------|-------|-------------|\n| float32 | 4B/param | Baseline | None |\n| float16 | 2B/param | ~2× | Minimal |\n| int8 | 1B/param | ~4× | Small |\n| int4 | 0.5B/param | ~8× | Moderate |\n\n\\`\\`\\`python\n# Post-training quantization with bitsandbytes\nfrom transformers import AutoModelForCausalLM, BitsAndBytesConfig\n\nmodel = AutoModelForCausalLM.from_pretrained(\n    \"meta-llama/Llama-3-8B\",\n    quantization_config=BitsAndBytesConfig(load_in_8bit=True)\n)\n\\`\\`\\`\n\n## 5. Caching for LLM APIs\n\\`\\`\\`python\nimport hashlib, redis\n\nredis_client = redis.Redis()\n\ndef cached_llm_call(prompt: str, model: str = \"gpt-4o\") -> str:\n    cache_key = hashlib.sha256(f\"{model}:{prompt}\".encode()).hexdigest()\n    cached = redis_client.get(cache_key)\n    if cached:\n        return cached.decode()\n\n    response = openai_client.chat.completions.create(\n        model=model, messages=[{\"role\":\"user\",\"content\":prompt}]\n    )\n    result = response.choices[0].message.content\n    redis_client.setex(cache_key, 3600, result)  # Cache for 1 hour\n    return result\n\\`\\`\\`\n\n## 6. Inference Monitoring\nKey metrics to track:\n- **Latency:** p50, p95, p99 response times\n- **Throughput:** Requests per second\n- **Error rate:** 4xx/5xx responses\n- **Token usage:** Input/output tokens per request (cost)\n- **GPU utilization:** GPU must be well-utilized\n- **Cache hit rate:** For prompt caching",
    "fullNotes": "# Detailed Notes: Model Serving\n\n- **CPU vs GPU Inference:** LLMs require GPU for reasonable latency. Classical ML models (XGBoost, sklearn) run efficiently on CPU. Small neural networks can be CPU-deployed if latency requirements are relaxed.\n- **Model Versioning:** Maintain multiple model versions simultaneously. Use feature flags or A/B routing to direct traffic to specific versions. Shadow mode: new model processes requests silently alongside old model for comparison.\n- **Advanced Serving (9L):** vLLM, TensorRT-LLM, continuous batching, speculative decoding, multi-GPU serving — these belong to Phase 9L.",
    "shortNotes": "- Serialize PyTorch models with TorchScript or ONNX for production\n- FastAPI + Pydantic: standard Python inference API framework\n- Batching: process multiple requests together for GPU throughput\n- Quantization: float16 (minimal loss) → int8 (~4×speedup) → int4 (~8×speedup)\n- Cache LLM responses by prompt hash to reduce latency and cost\n- Monitor: p50/p95/p99 latency, throughput, error rate, GPU utilization\n- CPU for classical ML, GPU for DL/LLM inference",
    "cheatSheet": "### Model Serialization Formats\n| Format | Framework | Use Case |\n|--------|----------|---------|\n| .pth (state_dict) | PyTorch | Training checkpoints |\n| .pt (TorchScript) | PyTorch | Production serving |\n| .onnx | Cross-framework | Interoperable serving |\n| .pkl (joblib) | sklearn | Classical ML serving |\n| safetensors | HuggingFace | Safe, fast HF format |\n\n### Inference Optimization Priority\n1. Batching (biggest GPU throughput win)\n2. Mixed precision (float16/bfloat16)\n3. Quantization (int8/int4 for LLMs)\n4. Response caching (for repeat queries)\n5. Model compilation (torch.compile)",
    "interviewQuestions": [
      {
        "question": "What is the difference between model latency and throughput, and how do you optimize each?",
        "answerHint": "Latency is the time for a single request to complete (affects user experience). Throughput is the number of requests processed per second (affects cost). They often trade off: batching increases throughput by processing multiple requests together, but increases individual request latency. To minimize latency: use model distillation, quantization, caching, and avoid batching (process requests immediately). To maximize throughput: use dynamic batching, GPU, mixed precision, and model parallelism. For web-facing APIs: optimize p99 latency (tail latency). For batch processing: maximize throughput.",
        "type": "TECHNICAL"
      },
      {
        "question": "Why and when would you use int8 quantization for model inference?",
        "answerHint": "Int8 quantization maps float32 weights to 8-bit integers, reducing memory by 4× and improving inference speed by ~2-4× (integer arithmetic is faster than float on most hardware). It is appropriate when: (1) model size is a constraint (serving large models on limited GPU memory), (2) inference throughput needs to improve, (3) slight quality degradation (~0.5-1% accuracy loss) is acceptable. Not appropriate for safety-critical applications where accuracy is paramount, or for models that are already quantization-sensitive (some architectures degrade more than others).",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "TensorRT-LLM and FlashAttention Inference Optimizations",
        "url": "https://www.youtube.com/watch?v=gT829Qo8b2Y",
        "type": "VIDEO"
      },
      {
        "title": "vLLM & PagedAttention: Serving LLMs with High Throughput",
        "url": "https://www.youtube.com/watch?v=5ZlavRFKJ88",
        "type": "VIDEO"
      },
      {
        "title": "FastAPI for ML Serving (HuggingFace)",
        "url": "https://huggingface.co/docs/api-inference",
        "type": "ARTICLE"
      },
      {
        "title": "Chip Huyen: Designing ML Systems",
        "url": "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/",
        "type": "BOOK"
      }
    ]
  },
  {
    "id": "aiml_20_interview",
    "slug": "interview",
    "title": "AI/ML Engineering Interview Preparation",
    "description": "Comprehensive ML interview preparation covering ML system design, coding challenges, theoretical questions, and FAANG-level depth.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 90,
    "learningContent": "# AI/ML Engineering Interview Preparation\n\n## 1. Interview Formats\n\n| Interview Type | What to Expect |\n|---------------|---------------|\n| ML Theory | Derive gradient descent, explain backprop, regularization, optimization |\n| ML Coding | Implement models from scratch (LogReg, KNN, K-Means in NumPy) |\n| ML System Design | Design a recommendation system, search ranking, fraud detection |\n| Applied ML | Analyze a dataset, train a model, discuss tradeoffs |\n| Behavioral | ML failures, tradeoff decisions, cross-functional collaboration |\n\n## 2. ML System Design Framework\nFor any ML design question:\n1. **Clarify requirements:** What are we optimizing? Online or offline? Latency SLA?\n2. **Define the ML task:** Classification? Ranking? Generation?\n3. **Data:** Sources, scale, labeling strategy, freshness\n4. **Features:** Feature engineering, storage, online vs offline features\n5. **Model:** Algorithm choice + justification, training infrastructure\n6. **Offline evaluation:** Metrics, evaluation dataset, baseline\n7. **Online evaluation:** A/B test design, guardrail metrics\n8. **Serving:** Latency, throughput, caching, fallback\n9. **Monitoring:** Data drift, concept drift, performance degradation\n\n## 3. Classic Implementation Challenges\n\\`\\`\\`python\n# Implement K-Means from scratch\nimport numpy as np\n\ndef kmeans(X, k, max_iters=100):\n    centroids = X[np.random.choice(len(X), k, replace=False)]\n    for _ in range(max_iters):\n        distances = np.linalg.norm(X[:, np.newaxis] - centroids, axis=2)  # (N, k)\n        labels = np.argmin(distances, axis=1)\n        new_centroids = np.array([X[labels == i].mean(axis=0) for i in range(k)])\n        if np.allclose(centroids, new_centroids):\n            break\n        centroids = new_centroids\n    return labels, centroids\n\n# Implement logistic regression with gradient descent\ndef sigmoid(z): return 1 / (1 + np.exp(-z))\n\ndef logistic_regression(X, y, lr=0.01, epochs=1000):\n    w, b = np.zeros(X.shape[1]), 0.0\n    for _ in range(epochs):\n        z = X @ w + b\n        p = sigmoid(z)\n        grad_w = X.T @ (p - y) / len(y)\n        grad_b = (p - y).mean()\n        w -= lr * grad_w\n        b -= lr * grad_b\n    return w, b\n\\`\\`\\`\n\n## 4. Top ML Interview Questions with Deep Answers\n\n**Q: How does gradient descent find the minimum?**\nA: Gradient descent iteratively moves parameters in the direction of steepest descent (negative gradient). For a convex loss surface, this guaranteed to reach the global minimum with appropriate learning rate. For non-convex surfaces (neural networks), it typically finds a local minimum or saddle point — but empirically, SGD with noise finds flat minima that generalize well.\n\n**Q: What is the curse of dimensionality?**\nA: As feature dimension d increases, the volume of the space grows exponentially. Data becomes increasingly sparse — your nearest neighbors are almost as far as your furthest neighbors, making distance-based methods (KNN, K-Means, SVM) ineffective. Also, the amount of training data needed to maintain statistical density grows exponentially with d.\n\n**Q: Design a recommendation system for a video platform.**\nA: Frame as collaborative filtering + content-based hybrid. Offline: train matrix factorization (ALS) or two-tower model on user-video interactions. Features: video embeddings (title, description, visual), user history embeddings, context (time of day, device). Serving: precompute user vectors, ANN retrieval of top-100 candidates, rerank with a point-wise model (XGBoost). Online evaluation: CTR, watch time, diversity metrics, fairness. Fallback: popularity-based for cold-start users.\n\n## 5. Critical Concepts for Final Review\n- Loss functions and their probabilistic interpretation (MLE connection)\n- Regularization: L1 (sparse weights) vs L2 (shrinks weights)\n- Attention mechanism: QKV formulation, masking, multi-head\n- Backpropagation: chain rule through computational graph\n- Bias-variance tradeoff and learning curves\n- Cross-validation: stratified K-fold, time-series CV\n- Data leakage: preprocessing leakage, target leakage, temporal leakage\n- Evaluation: precision vs recall, ROC-AUC vs PR-AUC, calibration",
    "fullNotes": "# Senior ML Interview Topics\n\n- **Two-Tower Models:** Widely used in recommendation and search. Query tower encodes user/query features; item tower encodes item features. Train with contrastive loss (positive = clicked item, negatives = random sample). Both towers produce embeddings; ANN search retrieves top-k items at inference time.\n- **Model Debugging:** If model performs poorly: plot learning curves (overfitting vs underfitting), compute per-class performance (class imbalance?), examine high-loss examples (labeling errors?), check feature importance (signal from right features?).",
    "shortNotes": "- ML design interviews: requirements → task → data → features → model → eval → serving\n- Always start with a simple baseline (logistic regression, rule-based)\n- Know how to implement: LogReg, KNN, K-Means, softmax, backprop in NumPy\n- Explain every algorithm choice with tradeoffs — not just \"I used XGBoost because it's best\"\n- Know evaluation deeply: when to use F1 vs AUC vs PR-AUC\n- Data leakage is the #1 ML engineering failure mode — demonstrate awareness\n- LLM design questions: consider RAG vs fine-tuning vs prompting tradeoffs",
    "cheatSheet": "### ML System Design Checklist\n- [ ] Clarify the business objective and ML framing\n- [ ] Define offline and online success metrics\n- [ ] Identify data sources and labeling strategy\n- [ ] Design feature engineering pipeline\n- [ ] Justify model choice with tradeoffs\n- [ ] Define evaluation framework (train/val/test splits, CV)\n- [ ] Design serving architecture (latency, throughput, caching)\n- [ ] Plan A/B test and rollout strategy\n- [ ] Identify monitoring needs (drift, performance degradation)\n\n### Key Papers to Know\n| Paper | Why Important |\n|-------|--------------|\n| Attention Is All You Need | Transformer architecture |\n| LoRA | Parameter-efficient fine-tuning |\n| InstructGPT (RLHF) | LLM alignment |\n| Chain-of-Thought Prompting | Emergent reasoning |\n| REALM/RAG | Retrieval-augmented generation |",
    "interviewQuestions": [
      {
        "question": "You are asked to build a spam detection system for email. Walk through your complete ML approach.",
        "answerHint": "Data: collect labeled emails (spam/ham) with metadata. Features: TF-IDF on body/subject, sender reputation, header analysis, URL features, attachment presence. Model: start with Logistic Regression baseline (strong for text), then XGBoost with feature engineering, then fine-tuned BERT for high-accuracy. Handle imbalance: spam typically <5% — use class_weight, PR-AUC as metric. Evaluation: precision vs recall tradeoff (prefer high recall to catch spam, accept some false positives), maintain user-reported metrics. Serving: <10ms latency required, cache sender reputation, online feature store for real-time signals. Monitor: data drift as spammers adapt, periodic retraining.",
        "type": "SYSTEM_DESIGN"
      },
      {
        "question": "Explain the attention mechanism and why Transformers replaced RNNs for NLP.",
        "answerHint": "Attention computes: softmax(QKᵀ/√dₖ)·V — a weighted sum of values where weights reflect query-key similarity. RNNs process sequences sequentially, so gradients must flow through many timesteps to connect distant tokens (vanishing gradient, poor long-range dependencies). Transformers use attention to directly connect any two positions in O(1) steps regardless of distance. All positions are processed in parallel (not sequentially), enabling massive hardware utilization. The attention matrix provides interpretable token-to-token relationships. The main limitation is O(N²) attention for sequence length N — addressed by sparse attention, Flash Attention, and linear attention approximations.",
        "type": "CONCEPTUAL"
      }
    ],
    "resources": [
      {
        "title": "FAANG Machine Learning Engineer Mock Interview",
        "url": "https://www.youtube.com/watch?v=e3gA5tF-vjM",
        "type": "VIDEO"
      },
      {
        "title": "Machine Learning System Design Interview Guide",
        "url": "https://www.youtube.com/watch?v=0h5p64n4-X8",
        "type": "VIDEO"
      },
      {
        "title": "ML Interview Book (Chip Huyen)",
        "url": "https://huyenchip.com/ml-interviews-book/",
        "type": "BOOK"
      },
      {
        "title": "Machine Learning System Design Interview",
        "url": "https://www.youtube.com/watch?v=wUQp0mHm-Z4",
        "type": "VIDEO"
      }
    ]
  }
];
