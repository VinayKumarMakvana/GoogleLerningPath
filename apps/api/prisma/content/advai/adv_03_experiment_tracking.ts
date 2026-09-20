export const adv_03_experiment_tracking = {
  EXPERIMENT_TRACKING: {
    title: 'Experiment Tracking & Model Management',
    description: 'Master experiment tracking, hyperparameter management, model artifact management, and W&B/MLflow at production scale.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Data & ML Pipelines'],
    learningContent: `
# Experiment Tracking & Model Management

## 1. Why Experiment Tracking Matters
Without tracking, teams face:
- "Which run produced the model currently in production?"
- "What hyperparameters did the best model use?"
- "When we retrain next month, can we reproduce today's result?"
- "Did increasing the learning rate help or hurt for this dataset version?"

Experiment tracking makes every training run a first-class artifact with full provenance.

## 2. MLflow: Comprehensive Tracking
\`\`\`python
import mlflow
import mlflow.pytorch

mlflow.set_tracking_uri("http://mlflow-server:5000")
mlflow.set_experiment("recommendation-model-v4")

with mlflow.start_run(run_name="transformer-lr0.001-bs64") as run:
    run_id = run.info.run_id

    # Log git commit for code reproducibility
    import subprocess
    git_sha = subprocess.check_output(['git', 'rev-parse', 'HEAD']).decode().strip()
    mlflow.set_tag("git_commit", git_sha)

    # Log all hyperparameters
    mlflow.log_params({
        "model_type": "transformer",
        "learning_rate": 0.001,
        "batch_size": 64,
        "epochs": 20,
        "dataset_version": "v3.2",
        "feature_set": "user_context_v5"
    })

    # Log metrics at each epoch
    for epoch in range(20):
        train_loss, val_auc = train_epoch(model, ...)
        mlflow.log_metrics({
            "train_loss": train_loss,
            "val_auc": val_auc
        }, step=epoch)

    # Log model artifact with schema
    signature = mlflow.models.infer_signature(X_train, model.predict(X_train))
    mlflow.pytorch.log_model(
        model,
        artifact_path="model",
        signature=signature,
        input_example=X_train[:5]
    )

    # Log evaluation artifacts
    mlflow.log_artifact("confusion_matrix.png")
    mlflow.log_artifact("feature_importance.json")

print(f"Run ID: {run_id}")
\`\`\`

## 3. Weights & Biases (W&B)
W&B offers richer collaboration, visualization, and sweep capabilities:
\`\`\`python
import wandb

wandb.init(project="llm-finetuning", name="llama-3-8b-lora-r16", config={
    "model": "llama-3-8b",
    "lora_rank": 16,
    "learning_rate": 2e-5,
    "epochs": 3,
    "dataset": "instruction-v4"
})

for step, batch in enumerate(train_loader):
    loss = train_step(batch)
    wandb.log({"train/loss": loss, "train/step": step})

# W&B Sweeps: automated hyperparameter search
sweep_config = {
    "method": "bayes",
    "metric": {"name": "val/auc", "goal": "maximize"},
    "parameters": {
        "learning_rate": {"min": 1e-5, "max": 1e-3},
        "lora_rank": {"values": [4, 8, 16, 32]}
    }
}
sweep_id = wandb.sweep(sweep_config, project="llm-finetuning")
wandb.agent(sweep_id, function=train, count=20)
\`\`\`

## 4. What to Track in Every Run
| Category | Items |
|----------|-------|
| Code | Git commit SHA, branch |
| Data | Dataset version/hash, split sizes |
| Config | All hyperparameters, model architecture |
| Environment | Python version, library versions, hardware |
| Metrics | Train/val/test metrics at each epoch |
| Artifacts | Model weights, preprocessor, evaluation plots |
| System | Training time, GPU utilization, peak memory |
`,
    fullNotes: `
# Detailed Notes: Experiment Tracking

- **Nested Runs:** MLflow supports nested runs (parent run containing child runs for each fold in cross-validation). Useful for aggregating results from hyperparameter sweeps.
- **MLflow Projects:** Define a reproducible ML project with an MLproject file specifying the entry point, parameters, and conda environment. Anyone can run mlflow run . to reproduce the experiment.
- **Model Signatures:** MLflow model signatures define the input schema (feature names and types) and output schema. This enables automated validation of model inputs at serving time, catching mismatches early.
`,
    shortNotes: `
- Track every run: params, metrics, artifacts, git SHA, dataset version
- MLflow: tracking server + artifact store + model registry in one platform
- W&B: richer UI, team collaboration, built-in hyperparameter sweeps (Sweeps)
- Always log the git commit SHA — code version is as important as data/model version
- Log model signatures: input schema + output schema → catch serving mismatches early
- W&B Sweeps: Bayesian hyperparameter optimization — more efficient than grid search
`,
    cheatSheet: `
### Experiment Tracking Minimum Viable Setup
\`\`\`python
# MLflow minimum viable tracking
with mlflow.start_run():
    mlflow.log_params({"lr": 0.01, "epochs": 10})
    mlflow.log_metrics({"val_auc": 0.92})
    mlflow.sklearn.log_model(model, "model")

# Compare runs
mlflow ui  # Opens UI at http://localhost:5000
\`\`\`
### Reproducibility Checklist
- [ ] Git SHA logged
- [ ] Dataset version/hash logged
- [ ] All hyperparameters logged (no hardcoded values)
- [ ] Library versions captured (requirements.txt / poetry.lock)
- [ ] Random seeds set and logged
- [ ] Hardware configuration logged
`,
    interviewQuestions: [
      { question: 'What information should be captured in every ML experiment run for full reproducibility?', answerHint: 'For full reproducibility: (1) Code: git commit SHA and branch. (2) Data: dataset version or hash, number of training/validation/test samples. (3) Config: every hyperparameter (nothing hardcoded). (4) Environment: Python version, key library versions (torch, transformers), hardware (GPU type). (5) Metrics: training/validation metrics at each epoch. (6) Artifacts: model weights, preprocessor objects, evaluation plots. (7) System: training duration, peak GPU memory, GPU utilization. With all of this, any past experiment can be exactly reproduced by a different engineer on different hardware.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'MLflow Documentation', url: 'https://mlflow.org/docs/latest/', type: 'ARTICLE', priority: 'S', source: 'MLflow', isOfficial: true, description: 'Official MLflow documentation.' },
      { title: 'Weights & Biases Documentation', url: 'https://docs.wandb.ai/', type: 'ARTICLE', priority: 'S', source: 'W&B', isOfficial: true, description: 'Official W&B documentation including Sweeps and Reports.' }
    ]
  }
};
