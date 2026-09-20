export const adv_01_mlops_foundations = {
  MLOPS_FOUNDATIONS: {
    title: 'MLOps Foundations & ML Lifecycle',
    description: 'Understand the complete ML production lifecycle, MLOps principles, and the operational differences from traditional software engineering.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 75,
    prerequisites: ['ML Pipelines & Reproducibility', 'Model Serving & Inference Fundamentals'],
    learningContent: `
# MLOps Foundations & ML Lifecycle

## 1. What is MLOps?
MLOps (Machine Learning Operations) applies DevOps, DataOps, and ModelOps principles to ML systems. It addresses the operational gap between "a model that works in a notebook" and "a model reliably powering production systems."

**Why ML is different from traditional software:**
| Dimension | Traditional Software | ML Systems |
|-----------|---------------------|------------|
| Code changes | Explicit | Implicit (data changes model behavior) |
| Testing | Unit/integration tests | Data + model quality tests |
| Versioning | Code only | Code + data + model + config |
| Debugging | Stack traces | Data slices, metric degradation |
| Failures | Immediate | Silent (model degrades gradually) |

## 2. The ML Lifecycle
\`\`\`
Data Ingestion → Data Validation → Feature Engineering
       ↓
  Model Training → Evaluation → Validation Gates
       ↓
  Model Registry → Staging → Canary → Production
       ↓
  Monitoring → Drift Detection → Automated Retraining
\`\`\`

## 3. MLOps Maturity Levels

| Level | Description | Key Capability |
|-------|-------------|----------------|
| 0 | Manual process | Notebooks, ad hoc training |
| 1 | ML pipeline automation | Automated training, evaluation |
| 2 | CI/CD for ML | Automated testing, deployment, monitoring |
| 3 | Automated ML | Self-healing, auto-retraining |

Most organizations are at Level 0-1. Level 2 requires significant investment. Level 3 is aspirational for most.

## 4. Three Axes of MLOps

**DataOps:** Data quality, validation, versioning, lineage, freshness.
- "Did the training data change?" is a first-class operational question in ML.
- Schema drift, distribution shift, label drift are real operational failures.

**ModelOps:** Training, evaluation, registry, deployment, A/B testing, rollback.
- A model is a versioned artifact, like a software package.
- A new model version requires validation before promotion.

**MonitoringOps:** Continuous quality assessment of deployed models.
- Data drift (feature distributions change)
- Concept drift (the relationship Y = f(X) changes)
- Performance degradation (metrics drop)

## 5. Core MLOps Tools Landscape
\`\`\`
Data: DVC, Delta Lake, Feast (feature store)
Training: Kubeflow Pipelines, MLflow Projects, Vertex AI Pipelines
Tracking: MLflow, Weights & Biases, Neptune
Registry: MLflow Model Registry, Vertex AI Model Registry
Serving: Triton, vLLM, TorchServe, BentoML
Monitoring: Evidently, Arize, WhyLabs, Prometheus + Grafana
\`\`\`
`,
    fullNotes: `
# Detailed Notes: MLOps

- **Two-Phase Development:** Most ML teams discover that 20% of effort is building the initial model and 80% is building production infrastructure. MLOps is the 80%.
- **Technical Debt in ML Systems (Sculley et al., 2015):** "Hidden Technical Debt in Machine Learning Systems" identifies entanglement, undeclared consumers, correction cascades, and data/code dependencies as the unique technical debt challenges of ML.
- **ML-specific CI:** Beyond linting and unit tests, ML CI must validate: data schema hasn't changed, data statistics are within expected ranges, model metrics meet thresholds, model latency is acceptable, and there's no training-serving skew.
`,
    shortNotes: `
- MLOps = DevOps + DataOps + ModelOps applied to ML systems
- ML is different: data changes model behavior silently without code changes
- Version all three: code, data, AND model — together define system behavior
- Maturity levels: manual (0) → pipeline automation (1) → CI/CD (2) → auto (3)
- Drift types: data drift (features change), concept drift (Y=f(X) changes)
- Core loop: train → evaluate → register → deploy → monitor → retrain
`,
    cheatSheet: `
### MLOps Lifecycle Checklist
- [ ] Data validation before every training run
- [ ] Experiment tracking: every run logged (params, metrics, artifacts)
- [ ] Model evaluation gates: threshold on key metrics before promotion
- [ ] Staging environment: validate model before production
- [ ] Canary/shadow deployment: gradual traffic shift
- [ ] Monitoring: data drift + model performance alerts
- [ ] Automated retraining trigger when performance degrades
- [ ] Rollback procedure: previous model version ready to promote
`,
    interviewQuestions: [
      { question: 'What are the unique operational challenges of ML systems compared to traditional software?', answerHint: 'ML systems have several unique properties: (1) Code is only one part of system behavior — data changes silently modify what the model does, unlike software where behavior only changes with code. (2) Failures are often silent — the model degrades gradually rather than throwing exceptions; you need monitoring to detect it. (3) You must version three things simultaneously: code, data, and model weights. (4) Testing is more complex: unit tests don\'t validate whether a model will behave correctly on production data distributions. (5) Debugging requires data analysis, not just stack traces.', type: 'TECHNICAL' },
      { question: 'What is the difference between data drift and concept drift?', answerHint: 'Data drift (covariate shift) occurs when the distribution of input features P(X) changes. For example, user demographics on a platform shift over time — older models trained on historical data may not represent current users. Concept drift occurs when the relationship between inputs and outputs P(Y|X) changes. For example, a fraud detection model trained before a new fraud pattern emerges. Data drift is detectable by comparing feature distributions. Concept drift is harder to detect — you need fresh labels to observe it. Both require model retraining.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Hidden Technical Debt in ML Systems (Google, 2015)', url: 'https://papers.nips.cc/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html', type: 'ARTICLE', priority: 'S', source: 'Google / NeurIPS', isOfficial: true, description: 'Seminal paper on ML-specific technical debt — required reading.' },
      { title: 'Practitioners Guide to MLOps (Google Cloud)', url: 'https://services.google.com/fh/files/misc/practitioners_guide_to_mlops_whitepaper.pdf', type: 'ARTICLE', priority: 'S', source: 'Google Cloud', isOfficial: true, description: 'Authoritative MLOps lifecycle guide from Google.' }
    ]
  }
};
