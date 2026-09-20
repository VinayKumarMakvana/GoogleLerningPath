export const aiml_07_pipelines = {
  ML_PIPELINES: {
    title: 'ML Pipelines & Reproducibility',
    description: 'Build reproducible ML pipelines with scikit-learn Pipelines, experiment tracking, and versioning best practices.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Ensemble Methods & Advanced Classical ML'],
    learningContent: `
# ML Pipelines & Reproducibility

## 1. scikit-learn Pipelines
A Pipeline chains preprocessing and modeling steps into a single object, guaranteeing correct fit/transform logic and preventing leakage.

\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier

# Define preprocessing for each column type
numeric_features = ['age', 'salary']
categorical_features = ['department', 'city']

preprocessor = ColumnTransformer(transformers=[
    ('num', StandardScaler(), numeric_features),
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
])

# Full pipeline: preprocessor + model
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])

# This single object correctly handles train/test split
pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)

# Cross-validation on the full pipeline
from sklearn.model_selection import cross_val_score
scores = cross_val_score(pipeline, X, y, cv=5, scoring='roc_auc')
\`\`\`

## 2. Experiment Tracking with MLflow
\`\`\`python
import mlflow
import mlflow.sklearn

mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("customer_churn_v2")

with mlflow.start_run(run_name="rf_baseline"):
    # Log hyperparameters
    mlflow.log_params({
        "n_estimators": 100,
        "max_depth": 10,
        "feature_set": "v2_with_tenure"
    })
    
    pipeline.fit(X_train, y_train)
    
    # Log metrics
    mlflow.log_metrics({
        "train_auc": roc_auc_score(y_train, pipeline.predict_proba(X_train)[:,1]),
        "val_auc": roc_auc_score(y_val, pipeline.predict_proba(X_val)[:,1])
    })
    
    # Log the full pipeline as a model artifact
    mlflow.sklearn.log_model(pipeline, "model", input_example=X_train[:5])
\`\`\`

## 3. Reproducibility Checklist
- Set random seeds: \`random_state=42\`, \`np.random.seed(42)\`
- Pin dependency versions: \`requirements.lock.txt\` or \`poetry.lock\`
- Version your datasets (DVC, S3 with versioning)
- Log all hyperparameters and code version (git SHA) in experiment tracker
- Use Docker to freeze the full environment

## 4. Model Serialization
\`\`\`python
import joblib

# Save the full pipeline
joblib.dump(pipeline, "model_pipeline_v1.pkl")

# Load it
pipeline_loaded = joblib.load("model_pipeline_v1.pkl")
predictions = pipeline_loaded.predict(X_new)
\`\`\`
`,
    fullNotes: `
# Detailed Notes: ML Pipelines

- **DVC (Data Version Control):** Git-like versioning for large ML datasets and model artifacts stored in S3, GCS, or local storage. Allows reproducible dataset tracking alongside code.
- **Custom Transformers:** You can create custom pipeline steps by implementing sklearn's BaseEstimator and TransformerMixin with fit() and transform() methods.
- **Weights & Biases (W&B):** An alternative to MLflow with richer visualization and team collaboration features. Strongly preferred in deep learning research.
`,
    shortNotes: `
- sklearn Pipeline: chain preprocessing + model. Handles train/test correctly.
- ColumnTransformer: apply different preprocessors to different columns.
- Always use Pipelines — they prevent data leakage in cross-validation.
- MLflow: log params, metrics, and model artifacts for every experiment.
- Pin all dependency versions for reproducibility.
- Set random_state seeds everywhere (train_test_split, models, CV).
- Save models with joblib; use MLflow model registry for production.
`,
    cheatSheet: `
### sklearn Pipeline Cheat Sheet
\`\`\`python
Pipeline([
    ('step1', Transformer1()),
    ('step2', Transformer2()),
    ('model',  Estimator())
])
# .fit(X_train) → fits all steps on train
# .predict(X_test) → transforms X_test, then predicts (no re-fitting!)
# .fit_transform(X_train) only valid for transformers
\`\`\`
### Reproducibility Seeds
\`\`\`python
import random, numpy as np
random.seed(42)
np.random.seed(42)
# For PyTorch: torch.manual_seed(42)
\`\`\`
`,
    interviewQuestions: [
      { question: 'Why should preprocessing be inside a scikit-learn Pipeline rather than done manually before model training?', answerHint: 'Putting preprocessing inside a Pipeline guarantees correct separation of training and test data during cross-validation. If you manually scale X before calling cross_val_score, the scaler is fitted on all folds (including the validation fold), leaking test statistics into training. With a Pipeline, cross_val_score fits the scaler only on the training fold and applies it to the validation fold — the correct procedure. Pipelines also make deployment easier: one object handles all transforms and predictions, eliminating desynchronization bugs.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'sklearn Pipeline Documentation', url: 'https://scikit-learn.org/stable/modules/compose.html', type: 'ARTICLE', priority: 'S', source: 'scikit-learn', isOfficial: true, description: 'Official Pipeline and ColumnTransformer documentation.' },
      { title: 'MLflow Documentation', url: 'https://mlflow.org/docs/latest/index.html', type: 'ARTICLE', priority: 'A', source: 'MLflow', isOfficial: true, description: 'Official MLflow experiment tracking documentation.' }
    ]
  }
};
