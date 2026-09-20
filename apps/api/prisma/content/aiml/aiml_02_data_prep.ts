export const aiml_02_data_prep = {
  DATA_PREP: {
    title: 'Data Preparation & Feature Engineering',
    description: 'Master data cleaning, preprocessing, feature engineering, and handling class imbalance for ML pipelines.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 90,
    prerequisites: ['Machine Learning Foundations', 'Pandas & Data Processing'],
    learningContent: `
# Data Preparation & Feature Engineering

Feature engineering is often the highest-leverage activity in ML. Better features beat better algorithms.

## 1. Data Cleaning
\`\`\`python
import pandas as pd
import numpy as np

df = pd.read_csv("data.csv")

# Missing values
df["age"].fillna(df["age"].median(), inplace=True)   # Numerical: median imputation
df["city"].fillna("Unknown", inplace=True)            # Categorical: constant imputation

# From sklearn: more sophisticated imputation
from sklearn.impute import KNNImputer
imputer = KNNImputer(n_neighbors=5)
df_imputed = imputer.fit_transform(df[numerical_cols])

# Outliers: cap with IQR
Q1, Q3 = df["salary"].quantile([0.25, 0.75])
IQR = Q3 - Q1
df["salary"] = df["salary"].clip(Q1 - 1.5*IQR, Q3 + 1.5*IQR)
\`\`\`

## 2. Feature Scaling
**Critical for:** Linear models, SVMs, KNN, neural networks. Not needed for tree-based models.

\`\`\`python
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# StandardScaler: zero mean, unit variance. Robust to outliers if they're handled.
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)  # fit + transform on train
X_test_scaled = scaler.transform(X_test)         # ONLY transform on test (use train's stats)

# MinMaxScaler: scales to [0, 1]. Sensitive to outliers.
\`\`\`

**Important:** Always fit scalers ONLY on training data. Applying training statistics to test data is correct — it simulates the real-world scenario where you don't have test statistics.

## 3. Encoding Categorical Features
\`\`\`python
from sklearn.preprocessing import OrdinalEncoder, OneHotEncoder

# OneHotEncoder: for nominal categories (no ordering)
enc = OneHotEncoder(sparse_output=False, handle_unknown='ignore')

# OrdinalEncoder: for ordinal categories (low < medium < high)
enc = OrdinalEncoder(categories=[['low', 'medium', 'high']])

# For high-cardinality categoricals: Target Encoding (mean target per category)
# Use category_encoders library
\`\`\`

## 4. Feature Engineering
Creating new, informative features from raw data:
\`\`\`python
# Interaction features
df["revenue_per_user"] = df["revenue"] / (df["users"] + 1)  # +1 avoids division by zero

# Datetime features
df["hour"] = df["timestamp"].dt.hour
df["day_of_week"] = df["timestamp"].dt.dayofweek
df["is_weekend"] = df["day_of_week"].isin([5, 6]).astype(int)

# Log transformation (for skewed distributions)
df["log_price"] = np.log1p(df["price"])   # log(1+x) — handles zeros
\`\`\`

## 5. Class Imbalance
\`\`\`python
from imblearn.over_sampling import SMOTE
from imblearn.under_sampling import RandomUnderSampler

# SMOTE: Synthetic Minority Over-sampling — generates synthetic minority samples
smote = SMOTE(random_state=42)
X_res, y_res = smote.fit_resample(X_train, y_train)

# Or: Use class_weight='balanced' in sklearn models to weight minority class higher
from sklearn.linear_model import LogisticRegression
model = LogisticRegression(class_weight='balanced')
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Data Preparation

- **Pipeline Architecture:** Always wrap preprocessing in sklearn Pipelines to prevent data leakage and ensure reproducibility. The pipeline object's fit_transform/transform methods handle the train/test split correctly automatically.
- **Feature Selection:** Remove redundant/irrelevant features with: Variance Threshold (remove near-zero variance), Correlation analysis (remove highly correlated pairs), Recursive Feature Elimination (RFE), and feature importance from tree models.
- **Text of why not fit_transform on test:** If you compute the scaler mean/std on the test set, you're using information from the future (the distribution of unseen data). In production, you never have access to the test distribution — so fitting on test is unrealistic and leaky.
`,
    shortNotes: `
- Always fit preprocessors on train only; transform both train and test
- Numerical imputation: median (robust to outliers). Categorical: mode or 'Unknown'
- StandardScaler: zero mean, unit variance (use for most ML)
- OneHotEncoder for nominal. OrdinalEncoder for ordered categories.
- Feature engineering: domain-driven transformations often beat algorithmic complexity
- SMOTE: generates synthetic minority samples — apply ONLY on training data
- class_weight='balanced': automatic inverse-frequency class weighting
`,
    cheatSheet: `
### Preprocessing Quick Reference
| Situation | Method |
|-----------|--------|
| Missing numeric | Median imputation or KNN |
| Missing categorical | Mode or constant 'Unknown' |
| Nominal categories | OneHotEncoder |
| High-cardinality nominal | Target Encoding |
| Ordinal categories | OrdinalEncoder |
| Numeric scaling (linear/NN) | StandardScaler |
| Skewed numeric | log1p transform |
| Class imbalance | SMOTE + class_weight='balanced' |
`,
    interviewQuestions: [
      { question: 'Why must you fit preprocessors only on the training set and not on the entire dataset?', answerHint: 'Fitting a scaler or imputer on the full dataset (including test data) constitutes data leakage. The test set represents future, unseen data. By using test statistics (mean, std) during training preprocessing, you incorporate information about the test distribution that would not be available in a real deployment. This leads to overly optimistic evaluation metrics. In production, you apply the training-fitted scaler to incoming data — perfectly mirrored by fitting on train and transforming test with training statistics.', type: 'TECHNICAL' },
      { question: 'What is SMOTE and when should it NOT be used?', answerHint: 'SMOTE (Synthetic Minority Over-sampling Technique) generates synthetic minority class samples by interpolating between existing minority samples in feature space. It should only be applied to the training set — never to the validation or test set, as doing so would create synthetic test samples and bias evaluation metrics. SMOTE should not be used: (1) when the minority class is genuinely rare and you want to preserve that rarity in evaluation, (2) for high-dimensional sparse data (like text BoW) where interpolation is meaningless, (3) when class_weight adjustment alone is sufficient.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'sklearn Preprocessing Guide', url: 'https://scikit-learn.org/stable/modules/preprocessing.html', type: 'ARTICLE', priority: 'S', source: 'scikit-learn', isOfficial: true, description: 'Official scikit-learn preprocessing documentation.' },
      { title: 'Feature Engineering for ML', url: 'https://www.youtube.com/watch?v=6WDFfaYtN6s', type: 'VIDEO', priority: 'S', source: 'StatQuest', isOfficial: false, description: 'Feature engineering strategies explained visually.' }
    ]
  }
};
