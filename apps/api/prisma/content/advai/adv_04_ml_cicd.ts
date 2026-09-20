export const adv_04_ml_cicd = {
  ML_CICD: {
    title: 'ML CI/CD & Automation',
    description: 'Build automated ML pipelines with CI/CD, model validation gates, canary deployments, shadow mode, and automated rollback.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 75,
    prerequisites: ['Experiment Tracking & Model Management'],
    learningContent: `
# ML CI/CD & Automation

## 1. ML CI vs Traditional CI
Traditional CI: Does the code compile? Do the tests pass?
ML CI additionally asks:
- Does the training data meet quality expectations?
- Does the trained model meet performance thresholds?
- Is the model's latency within the SLA?
- Does the model degrade on critical data slices?
- Is there training-serving skew?

## 2. ML CI Pipeline (GitHub Actions)
\`\`\`yaml
# .github/workflows/ml_ci.yaml
name: ML CI Pipeline

on:
  push:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'  # Nightly retraining

jobs:
  validate-data:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: pip install great_expectations dvc
      - name: Pull latest data
        run: dvc pull
      - name: Validate data schema and statistics
        run: python scripts/validate_data.py
        # Fails pipeline if data quality checks fail

  train-and-evaluate:
    needs: validate-data
    runs-on: [self-hosted, gpu]  # GPU runner
    steps:
      - name: Train model
        run: python train.py --config configs/v2.yaml
      - name: Evaluate model
        run: python evaluate.py --min_auc=0.88 --max_latency_ms=50
        # evaluate.py exits with code 1 if thresholds not met
      - name: Run fairness checks
        run: python fairness_eval.py --protected_attributes age,gender

  validate-model:
    needs: train-and-evaluate
    steps:
      - name: Compare vs champion model
        run: |
          python compare_models.py \\
            --challenger model_artifacts/new_model/ \\
            --champion registry://recommendation-model/production \\
            --min_improvement 0.005  # Must improve AUC by 0.5%

  register-and-deploy:
    needs: validate-model
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Register model to staging
        run: python register_model.py --stage=staging
      - name: Deploy to canary (5% traffic)
        run: kubectl set image deployment/recommendation-service model=$NEW_MODEL_IMAGE
        # Canary: 5% traffic routed to new model
\`\`\`

## 3. Deployment Strategies for ML Models
\`\`\`
┌─────────────────────────────────────────────────┐
│  Shadow Mode: New model runs in parallel         │
│  - No traffic impact                            │
│  - Compare outputs without risk                 │
│  - Validate latency, outputs, behavior          │
└─────────────────────────────────────────────────┘
         ↓ (outputs look good)
┌─────────────────────────────────────────────────┐
│  Canary: 5% → 20% → 50% → 100% traffic shift   │
│  - Monitor business metrics per cohort          │
│  - Automatic rollback if degradation detected   │
└─────────────────────────────────────────────────┘
         ↓ (metrics stable)
┌─────────────────────────────────────────────────┐
│  Full Production: 100% traffic                  │
│  - Continue monitoring                           │
│  - Previous model kept warm for 48h for rollback│
└─────────────────────────────────────────────────┘
\`\`\`

## 4. Model Validation Gates
\`\`\`python
# evaluate.py — the validation gate
def validate_model(model, eval_dataset, thresholds):
    metrics = compute_metrics(model, eval_dataset)

    checks = [
        (metrics['auc'] >= thresholds['min_auc'],
         f"AUC {metrics['auc']:.3f} below threshold {thresholds['min_auc']}"),
        (metrics['p99_latency_ms'] <= thresholds['max_p99_latency'],
         f"P99 latency {metrics['p99_latency_ms']}ms exceeds {thresholds['max_p99_latency']}ms"),
        (metrics['fairness_gap'] <= thresholds['max_fairness_gap'],
         f"Fairness gap {metrics['fairness_gap']:.3f} exceeds threshold"),
    ]

    failures = [msg for passed, msg in checks if not passed]
    if failures:
        print("\\n".join(failures))
        sys.exit(1)  # Fail the CI pipeline
    print("All validation gates passed ✓")
\`\`\`
`,
    fullNotes: `
# Detailed Notes: ML CI/CD

- **Champion-Challenger Testing:** The current production model is the "champion." A new model is the "challenger." The challenger must beat the champion by a statistically significant margin on the evaluation set before promotion. This prevents deploying a model that's marginally better on one test set but genuinely worse in production.
- **A/B Testing for Model Deployment:** Route a subset of real traffic to the new model, measure actual business metrics (clicks, purchases, engagement) rather than offline metrics, and use statistical hypothesis testing to determine significance before full rollout.
`,
    shortNotes: `
- ML CI adds: data validation, model performance thresholds, latency checks, fairness
- Shadow mode: run new model in parallel with zero traffic impact — compare outputs
- Canary deployment: gradually shift traffic (5% → 100%) monitoring metrics at each step
- Champion-challenger: new model must beat current production model by threshold margin
- Always keep previous model warm for rapid rollback (48h minimum)
- Automated rollback: trigger when online metrics drop beyond threshold
`,
    cheatSheet: `
### ML Deployment Safety Checklist
1. Shadow mode validation (offline comparison with zero risk)
2. Champion vs challenger evaluation (offline improvement > threshold)
3. Canary deployment at 5% traffic
4. Monitor: p99 latency, error rate, business metrics (CTR, conversion)
5. If metrics stable for 1h → increase to 20% → 50% → 100%
6. If any alert fires → automatic rollback to previous version
7. Keep previous version ready to serve for 48h after full rollout
`,
    interviewQuestions: [
      { question: 'What is shadow mode deployment and when would you use it before a canary?', answerHint: 'Shadow mode runs a new model in parallel with the production model — the new model receives the same requests and produces outputs, but its outputs are NOT returned to users. Instead, outputs are compared to the production model\'s outputs offline. Use shadow mode when: (1) you want to validate model behavior on real production traffic without any user impact, (2) you need to measure latency against real request sizes/patterns, (3) the model serves safety-critical or financial decisions where even a 1% canary is too risky. After shadow mode validates behavior (no unexpected outputs, acceptable latency), promote to canary for business metric validation with real users.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Google MLOps: Continuous Delivery for ML', url: 'https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning', type: 'ARTICLE', priority: 'S', source: 'Google Cloud', isOfficial: true, description: 'Google\'s canonical MLOps pipeline automation architecture.' }
    ]
  }
};
