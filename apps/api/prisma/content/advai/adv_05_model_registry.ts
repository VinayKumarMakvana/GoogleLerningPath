export const adv_05_model_registry = {
  MODEL_REGISTRY: {
    title: 'Model Registry & Reproducibility',
    description: 'Master model registries, lifecycle stages, artifact versioning, lineage tracking, and full ML reproducibility.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['ML CI/CD & Automation'],
    learningContent: `
# Model Registry & Reproducibility

## 1. What is a Model Registry?
A model registry is a centralized store for versioned model artifacts with lifecycle management (staging, production, archived) and full lineage (what data and code produced this model).

\`\`\`python
import mlflow
from mlflow import MlflowClient

client = MlflowClient()

# Register a model from a training run
mlflow.register_model(
    model_uri=f"runs:/{run_id}/model",
    name="recommendation-model"
)

# Transition stages: None → Staging → Production → Archived
client.transition_model_version_stage(
    name="recommendation-model",
    version=5,
    stage="Production",
    archive_existing_versions=True  # Archive current Production version
)

# Load the production model by name (not by run ID)
production_model = mlflow.pyfunc.load_model(
    model_uri="models:/recommendation-model/Production"
)

# Compare model versions
versions = client.search_model_versions(f"name='recommendation-model'")
for v in versions:
    print(f"Version {v.version}: stage={v.current_stage}, run_id={v.run_id}")
\`\`\`

## 2. Lifecycle Stages
\`\`\`
None → Staging → Production → Archived

None:       Just registered, awaiting evaluation
Staging:    Validated offline, deployed to staging environment
Production: Serving live traffic
Archived:   Retired, kept for reproducibility / rollback
\`\`\`

**Promotion gate:** A model must pass all CI/CD validation gates before being promoted from Staging to Production. This should be an automated process triggered by CI.

## 3. Full ML Reproducibility Checklist
\`\`\`python
class MLArtifactBundle:
    """Everything needed to reproduce a model training run"""
    run_id: str          # MLflow run ID
    git_sha: str         # Exact code version
    dataset_hash: str    # DVC hash of training data
    hyperparams: dict    # All hyperparameters
    env_yaml: str        # conda/pip environment spec
    model_weights: str   # Path to serialized weights
    preprocessor: str    # Path to serialized preprocessor
    eval_metrics: dict   # Offline evaluation results
    training_duration: float  # In seconds

# To reproduce: git checkout {git_sha}
#               dvc checkout (downloads dataset {dataset_hash})
#               conda env create -f {env_yaml}
#               python train.py --config {hyperparams}
\`\`\`

## 4. Serving from Registry
\`\`\`python
# Production service always loads by alias, not by run ID
# This enables registry-driven deployment without code changes
MODEL_NAME = "recommendation-model"
MODEL_STAGE = "Production"  # Or: "latest" for testing

model = mlflow.pyfunc.load_model(f"models:/{MODEL_NAME}/{MODEL_STAGE}")

@app.post("/recommend")
def recommend(user_id: str):
    features = feature_store.get_features(user_id)
    return model.predict(features)
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Model Registry

- **Aliases vs Stages:** MLflow 2.x introduced model aliases as a more flexible alternative to fixed stages. An alias like "production" or "champion" can be applied to any version and updated independently.
- **Registry Webhooks:** Model registries can trigger webhooks on state transitions (e.g., when a model is moved to Production, automatically deploy to the serving cluster, send Slack notification, and update the monitoring dashboard).
- **Multi-Environment Registries:** Maintain separate registries or namespaces for dev, staging, and production. A model must be promoted through each environment's registry, ensuring isolated artifact management.
`,
    shortNotes: `
- Model registry: centralized versioned store for model artifacts + lifecycle management
- Stages: None → Staging → Production → Archived
- Load by stage name (not run ID) in production — enables registry-driven deployment
- Promotion: automated CI/CD gate must pass before Staging → Production
- Full reproducibility: git SHA + dataset hash + hyperparams + env spec
- Archive old models — never delete (needed for audit, rollback, and reproduction)
`,
    cheatSheet: `
### MLflow Model Registry Core Operations
\`\`\`python
# Register
mlflow.register_model("runs:/{run_id}/model", "my-model")

# Promote to Production
client.transition_model_version_stage("my-model", version=3, stage="Production")

# Load by stage
mlflow.pyfunc.load_model("models:/my-model/Production")

# Load by version number
mlflow.pyfunc.load_model("models:/my-model/3")

# Compare versions
client.search_model_versions("name='my-model'")
\`\`\`
`,
    interviewQuestions: [
      { question: 'Why should production services load models by stage name (e.g., "Production") rather than by run ID or version number?', answerHint: 'Loading by stage name (e.g., models:/my-model/Production) decouples the serving code from the model version. When a new model is promoted to Production in the registry, the serving service automatically loads the new version on next restart or hot-reload — without any code changes or redeployment. Loading by hardcoded run ID or version number requires a code change and redeployment every time the model is updated, which creates unnecessary coupling and release risk. Registry-driven deployment is essential for automated model promotion pipelines.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'MLflow Model Registry Documentation', url: 'https://mlflow.org/docs/latest/model-registry.html', type: 'ARTICLE', priority: 'S', source: 'MLflow', isOfficial: true, description: 'Official MLflow model registry guide.' }
    ]
  }
};
