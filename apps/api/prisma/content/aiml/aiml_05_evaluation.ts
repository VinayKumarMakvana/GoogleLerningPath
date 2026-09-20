export const aiml_05_evaluation = {
  MODEL_EVALUATION: {
    title: 'Model Evaluation & Experimentation',
    description: 'Master classification/regression metrics, cross-validation, threshold selection, experiment tracking, and error analysis.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 75,
    prerequisites: ['Supervised Learning', 'Statistics & Estimation'],
    learningContent: `
# Model Evaluation & Experimentation

## 1. Classification Metrics

**Confusion Matrix:**
| | Predicted Positive | Predicted Negative |
|--|--|--|
| Actual Positive | TP | FN |
| Actual Negative | FP | TN |

- **Precision:** TP / (TP + FP) — "Of all positive predictions, how many are actually positive?" (minimize false alarms)
- **Recall (Sensitivity):** TP / (TP + FN) — "Of all actual positives, how many did we catch?" (minimize misses)
- **F1 Score:** 2 × (Precision × Recall) / (Precision + Recall) — harmonic mean
- **Accuracy:** (TP + TN) / Total — misleading for imbalanced classes

\`\`\`python
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score

print(classification_report(y_test, y_pred))  # Full per-class report
cm = confusion_matrix(y_test, y_pred)
auc = roc_auc_score(y_test, y_proba)
\`\`\`

## 2. ROC-AUC and PR-AUC
- **ROC curve:** TPR (Recall) vs FPR at all thresholds. AUC = probability that model ranks a random positive above a random negative. Threshold-independent.
- **PR-AUC:** Precision vs Recall at all thresholds. More informative than ROC-AUC for heavily imbalanced datasets.

**When to use PR-AUC:** When the positive class is rare and you care more about the performance on that class (fraud detection, cancer screening).

## 3. Regression Metrics
- **MAE (Mean Absolute Error):** Average |ŷ - y|. Robust to outliers.
- **MSE (Mean Squared Error):** Average (ŷ - y)². Penalizes large errors more heavily.
- **RMSE:** √MSE. Same units as target.
- **R² (Coefficient of Determination):** 1 - SS_res/SS_tot. Fraction of variance explained. 1.0 = perfect.

## 4. Cross-Validation
\`\`\`python
from sklearn.model_selection import cross_val_score, StratifiedKFold

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=cv, scoring='roc_auc')
print(f"AUC: {scores.mean():.3f} ± {scores.std():.3f}")
\`\`\`

Use **Stratified K-Fold** for classification to preserve class proportions in each fold.

## 5. Experiment Tracking
\`\`\`python
import mlflow

mlflow.set_experiment("my_classification_exp")
with mlflow.start_run():
    mlflow.log_params({"n_estimators": 100, "max_depth": 5})
    mlflow.log_metrics({"auc": 0.91, "f1": 0.78})
    mlflow.sklearn.log_model(model, "model")
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Evaluation

- **Threshold Selection:** By default, most classifiers use 0.5 as the decision threshold. Adjust it based on business cost: if false negatives are more costly than false positives (e.g., cancer screening), lower the threshold to boost recall at the expense of precision. Plot precision-recall curve and choose the threshold that meets business constraints.
- **Calibration:** A calibrated model's predicted probability of 0.7 means the event actually occurs ~70% of the time. Calibrate with Platt Scaling or Isotonic Regression using sklearn's CalibratedClassifierCV.
- **Offline vs Online Evaluation:** Offline metrics (AUC, F1 on held-out set) are necessary but not sufficient. Online A/B tests measure the true business impact of deploying a model.
`,
    shortNotes: `
- Precision: minimize false alarms. Recall: minimize misses. F1: balance.
- Accuracy is misleading for class imbalance — always report F1 / AUC.
- ROC-AUC: threshold-independent ranking metric. PR-AUC: better for imbalance.
- Use StratifiedKFold for classification cross-validation.
- Report mean ± std across CV folds to account for variance.
- Log all experiments with MLflow/W&B: params, metrics, model artifacts.
- Threshold tuning: lower threshold → higher recall, lower precision.
`,
    cheatSheet: `
### Metric Selection Guide
| Task | Primary Metric | Secondary |
|------|---------------|-----------|
| Balanced classification | Accuracy, F1 | ROC-AUC |
| Imbalanced (rare positive) | PR-AUC, F1 | Recall |
| Fraud/Medical detection | Recall | Precision |
| Ranking/Retrieval | MAP@K, NDCG | Precision@K |
| Regression | RMSE | MAE, R² |
| Probabilistic output | Log-loss | Calibration |
`,
    interviewQuestions: [
      { question: 'When would you prefer PR-AUC over ROC-AUC?', answerHint: 'ROC-AUC can be misleading for heavily imbalanced datasets because it includes the True Negative Rate in its computation. When negatives vastly outnumber positives (e.g., fraud: 0.1% positive rate), a model can have a high ROC-AUC even with poor precision on the minority class. PR-AUC focuses only on the positive class — Precision vs Recall — providing a more honest measure of performance when detecting rare events (fraud, cancer, network intrusions) where the positive class is what matters.', type: 'TECHNICAL' },
      { question: 'What is the bias-variance tradeoff and how do you diagnose it in a model?', answerHint: 'High bias (underfitting): the model is too simple and has systematically wrong predictions. Symptoms: high training error AND high validation error, similar magnitudes. Fix: more complex model, more features. High variance (overfitting): the model has memorized training noise. Symptoms: low training error but high validation error (large gap). Fix: regularization, dropout, more data, simpler model, feature selection. Diagnose by plotting learning curves (training vs validation error vs dataset size) or train/validation error gap.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'scikit-learn Model Evaluation', url: 'https://scikit-learn.org/stable/modules/model_evaluation.html', type: 'ARTICLE', priority: 'S', source: 'scikit-learn', isOfficial: true, description: 'Complete model evaluation metrics documentation.' },
      { title: 'Precision, Recall, F1, ROC — StatQuest', url: 'https://www.youtube.com/watch?v=4jRBRDbJemM', type: 'VIDEO', priority: 'S', source: 'StatQuest', isOfficial: false, description: 'Visual guide to classification metrics.' }
    ]
  }
};
