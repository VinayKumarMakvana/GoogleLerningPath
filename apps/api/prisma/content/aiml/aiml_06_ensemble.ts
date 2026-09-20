export const aiml_06_ensemble = {
  ENSEMBLE_METHODS: {
    title: 'Ensemble Methods & Advanced Classical ML',
    description: 'Master Random Forests, Gradient Boosting (XGBoost, LightGBM), and ensemble techniques for production ML.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Supervised Learning', 'Model Evaluation & Experimentation'],
    learningContent: `
# Ensemble Methods & Advanced Classical ML

Ensemble methods combine multiple models to achieve lower bias AND lower variance than any single model.

## 1. Bagging (Bootstrap Aggregating)
Train B models on different bootstrap samples of the training data, then aggregate.
- **Reduces variance** (averaging cancels out noise)
- Works best with high-variance base learners (deep trees)

## 2. Random Forests
Decision trees + bagging + **random feature subsets at each split**.

\`\`\`python
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(
    n_estimators=200,    # Number of trees
    max_depth=None,      # Grow fully — variance reduced by averaging
    max_features='sqrt', # Random feature subset at each split
    random_state=42,
    n_jobs=-1            # Use all CPU cores
)
rf.fit(X_train, y_train)

# Feature importance (based on mean impurity decrease)
importances = rf.feature_importances_
\`\`\`

## 3. Gradient Boosting
Build trees **sequentially**, each correcting the residual errors of the previous ensemble.
- **Reduces bias** iteratively
- Powerful but prone to overfitting

### XGBoost — Industry Standard
\`\`\`python
import xgboost as xgb

model = xgb.XGBClassifier(
    n_estimators=500,
    learning_rate=0.05,      # Shrinks each tree's contribution
    max_depth=6,
    subsample=0.8,           # Row subsampling (like bagging)
    colsample_bytree=0.8,    # Feature subsampling
    reg_alpha=0.1,           # L1 regularization
    reg_lambda=1.0,          # L2 regularization
    eval_metric='auc',
    early_stopping_rounds=50  # Stop if val score doesn't improve for 50 rounds
)
model.fit(X_train, y_train, eval_set=[(X_val, y_val)], verbose=False)
\`\`\`

### LightGBM — Faster XGBoost Alternative
\`\`\`python
import lightgbm as lgb
model = lgb.LGBMClassifier(n_estimators=500, learning_rate=0.05)
\`\`\`
LightGBM uses leaf-wise tree growth (vs level-wise in XGBoost), is much faster on large datasets, and handles categorical features natively.

## 4. Stacking
Train a "meta-model" on the out-of-fold predictions of multiple base models.
\`\`\`python
from sklearn.ensemble import StackingClassifier
from sklearn.linear_model import LogisticRegression

estimators = [('rf', RandomForestClassifier()), ('xgb', xgb.XGBClassifier())]
stacker = StackingClassifier(estimators=estimators, final_estimator=LogisticRegression(), cv=5)
\`\`\`

## 5. Hyperparameter Tuning
\`\`\`python
from sklearn.model_selection import RandomizedSearchCV

param_dist = {'n_estimators': [100,200,500], 'max_depth': [3,6,9], 'learning_rate': [0.01,0.05,0.1]}
search = RandomizedSearchCV(model, param_dist, n_iter=20, cv=5, scoring='roc_auc', n_jobs=-1)
search.fit(X_train, y_train)
print(search.best_params_)
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Ensemble Methods

- **Out-of-Bag (OOB) Error:** Each bootstrap sample leaves out ~37% of data. Random Forest uses these left-out samples to estimate generalization error without a separate validation set. OOB error is a free, unbiased estimate of test error.
- **Feature Importance Caution:** Tree-based feature importance (mean impurity decrease) is biased toward high-cardinality features. For unbiased importance, use permutation importance or SHAP values.
- **SHAP Values:** SHapley Additive exPlanations provide model-agnostic, individual-level feature attributions grounded in game theory. The SHAP library works with XGBoost, LightGBM, and scikit-learn.
`,
    shortNotes: `
- Bagging: parallel training on bootstrap samples → reduces variance
- Random Forest: bagging + random feature subsets → decorrelates trees
- Gradient Boosting: sequential, each tree corrects residuals → reduces bias
- XGBoost: add regularization (L1/L2) + early stopping to gradient boosting
- LightGBM: faster than XGBoost, leaf-wise growth, native categoricals
- Stacking: meta-model trained on base model predictions
- Use SHAP values for unbiased, explainable feature attribution
`,
    cheatSheet: `
### XGBoost Key Hyperparameters
| Parameter | Effect | Range |
|-----------|--------|-------|
| n_estimators | Number of trees | 100–2000 |
| learning_rate | Shrinkage per tree | 0.01–0.3 |
| max_depth | Tree complexity | 3–10 |
| subsample | Row fraction per tree | 0.6–1.0 |
| colsample_bytree | Feature fraction per tree | 0.5–1.0 |
| reg_alpha | L1 regularization | 0–1 |
| reg_lambda | L2 regularization | 0–10 |

**Golden rule:** Use early_stopping_rounds — let the data decide n_estimators.
`,
    interviewQuestions: [
      { question: 'How does gradient boosting differ from random forests?', answerHint: 'Random forests build trees independently in parallel and reduce variance by averaging. Gradient boosting builds trees sequentially — each new tree is fit to the residual errors (gradient of the loss) from the current ensemble, reducing bias. Random forests use deep trees (low bias, high variance); gradient boosting uses shallow trees (high bias, low variance) that collectively form a low-bias model. Gradient boosting tends to outperform random forests but is more prone to overfitting and has more hyperparameters.', type: 'TECHNICAL' },
      { question: 'What is early stopping in gradient boosting and why is it important?', answerHint: 'Early stopping monitors a validation metric (e.g., AUC) after each boosting round. If the metric does not improve for a specified number of rounds (early_stopping_rounds), training stops and the best model is restored. This prevents overfitting — gradient boosting with too many trees will memorize the training data. It also removes the burden of choosing n_estimators upfront: set a large value and let early stopping find the optimal number based on held-out validation performance.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'XGBoost Documentation', url: 'https://xgboost.readthedocs.io/', type: 'ARTICLE', priority: 'S', source: 'XGBoost', isOfficial: true, description: 'Official XGBoost documentation and tutorials.' },
      { title: 'StatQuest: Gradient Boost', url: 'https://www.youtube.com/watch?v=3CC4N4z3GJc', type: 'VIDEO', priority: 'S', source: 'StatQuest', isOfficial: false, description: 'Visual explanation of gradient boosting from first principles.' }
    ]
  }
};
