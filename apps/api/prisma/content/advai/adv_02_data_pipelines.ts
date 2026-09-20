export const adv_02_data_pipelines = {
  DATA_PIPELINES: {
    title: 'Data & ML Pipelines',
    description: 'Master data ingestion, validation, schema enforcement, lineage, dataset versioning, and ML pipeline orchestration.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['MLOps Foundations & ML Lifecycle'],
    learningContent: `
# Data & ML Pipelines

## 1. Data Ingestion Patterns
\`\`\`python
# Batch ingestion: scheduled ETL from sources
import apache_beam as beam

with beam.Pipeline() as pipeline:
    (
        pipeline
        | 'ReadFromBigQuery' >> beam.io.ReadFromBigQuery(query='SELECT * FROM events WHERE date > "2024-01-01"')
        | 'ValidateSchema' >> beam.Map(validate_schema)
        | 'TransformFeatures' >> beam.Map(transform)
        | 'WriteToGCS' >> beam.io.WriteToText('gs://bucket/training-data/')
    )

# Streaming ingestion: Kafka → Feature Store
from kafka import KafkaConsumer
consumer = KafkaConsumer('user-events', bootstrap_servers=['kafka:9092'])
for msg in consumer:
    event = json.loads(msg.value)
    feature_store.write_online(entity_id=event['user_id'], features=compute_features(event))
\`\`\`

## 2. Data Validation with Great Expectations
\`\`\`python
import great_expectations as ge

ds = ge.read_csv("training_data.csv")

# Define expectations — contract for your data
ds.expect_column_to_exist("user_age")
ds.expect_column_values_to_not_be_null("user_id")
ds.expect_column_values_to_be_between("user_age", min_value=0, max_value=120)
ds.expect_column_values_to_match_regex("email", r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
ds.expect_column_mean_to_be_between("purchase_amount", min_value=10, max_value=500)

result = ds.validate()
if not result.success:
    raise ValueError(f"Data validation failed: {result}")
\`\`\`

## 3. Dataset Versioning with DVC
\`\`\`bash
# Track large data files in git without storing them in git
dvc init
dvc remote add -d myremote s3://my-bucket/dvc-store

# Version a dataset
dvc add data/training.csv
git add data/training.csv.dvc .gitignore
git commit -m "Add v3 training dataset"
git tag dataset-v3

# Switch to a previous version
git checkout dataset-v2
dvc checkout
\`\`\`

## 4. Pipeline Orchestration with Kubeflow Pipelines
\`\`\`python
from kfp import dsl, compiler

@dsl.component(base_image='python:3.11')
def validate_data(data_path: str, output_path: str):
    import great_expectations as ge
    # ... validation logic

@dsl.component
def train_model(data_path: str, model_output: str, learning_rate: float = 0.01):
    # ... training logic

@dsl.pipeline(name='ML Training Pipeline')
def ml_pipeline(data_path: str):
    validate_task = validate_data(data_path=data_path, output_path='/tmp/validated')
    train_task = train_model(
        data_path=validate_task.outputs['output_path'],
        model_output='/tmp/model'
    )
    train_task.after(validate_task)  # Dependency

compiler.Compiler().compile(ml_pipeline, 'pipeline.yaml')
\`\`\`

## 5. Training-Serving Skew
One of the most insidious ML production problems: the feature transformation applied during training differs from what's applied at serving time.

\`\`\`python
# WRONG: Different preprocessing in training vs serving
# Training (Python/Pandas):
train_df['user_age_normalized'] = (train_df['user_age'] - 35.2) / 12.1  # Hardcoded stats

# Serving (Java/Go service):
normalized_age = (user_age - 35.3) / 12.0  # Different constants!

# CORRECT: Share the same preprocessing artifact
from sklearn.preprocessing import StandardScaler
import joblib

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
joblib.dump(scaler, 'artifacts/scaler_v1.pkl')  # Store with model version

# Serving: load and use the SAME scaler object
scaler = joblib.load('artifacts/scaler_v1.pkl')
X_serving_scaled = scaler.transform(X_serving)
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Data Pipelines

- **Data Lineage:** Track where each piece of data came from, how it was transformed, and which models were trained on it. Essential for debugging, compliance (GDPR — right to deletion), and reproducibility. Tools: Apache Atlas, Marquez, DataHub.
- **Schema Evolution:** Production data schemas change over time. Backward-compatible changes (adding nullable columns) are safe. Breaking changes (renaming columns, changing types) require pipeline versioning and migration. Use schema registries (Confluent Schema Registry for Kafka, Avro/Protobuf schemas).
- **Incremental vs Full Refresh:** Full refresh reprocesses all historical data (correct but expensive). Incremental updates only process new/changed data (fast but requires careful watermark management to avoid missing updates).
`,
    shortNotes: `
- Great Expectations: define data contracts (expectations) to validate before training
- DVC: git-like dataset versioning, stores data in S3/GCS, tracks metadata in git
- Training-serving skew: preprocessing differs between train and serve → silent failures
- Fix skew: serialize and version preprocessor objects alongside the model
- Kubeflow Pipelines: DAG-based ML pipeline orchestration on Kubernetes
- Data lineage: track data origin, transformations, and model dependencies
- Schema evolution: backward-compatible changes safe; breaking changes require migration
`,
    cheatSheet: `
### Data Pipeline Validation Gates
1. Schema validation (all expected columns present + correct types)
2. Null check (critical columns have no nulls)
3. Range checks (numerical columns within expected bounds)
4. Statistical checks (mean, std within 3σ of historical baseline)
5. Volume check (row count within expected range — detect truncated loads)
6. Freshness check (most recent timestamp is recent enough)

### DVC Core Commands
\`\`\`bash
dvc add data/           # Track data directory
dvc push                # Upload to remote
dvc pull                # Download from remote
dvc repro               # Re-run pipeline if inputs changed
dvc diff HEAD~1         # Show what data changed
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is training-serving skew and how do you prevent it?', answerHint: 'Training-serving skew occurs when the feature transformations applied during model training differ from those applied at serving time. Examples: different normalization constants hardcoded in each system, different tokenization libraries, different imputation strategies, or different feature computation logic in different languages. Prevention: (1) serialize and version the preprocessing object (scaler, tokenizer, encoder) as an artifact alongside the model — both training and serving load the same object. (2) Use a shared feature store that applies the same transformation logic in both training (batch) and serving (online) paths. (3) Regularly run "skew detection" comparing training feature distributions to serving feature distributions.', type: 'TECHNICAL' },
      { question: 'How does DVC enable reproducible ML experiments with large datasets?', answerHint: 'DVC (Data Version Control) stores large data files in external storage (S3, GCS, local) and keeps lightweight .dvc files (containing content hashes) in git. This allows: (1) Version datasets like code without bloating the git repository. (2) Checkout any historical dataset version with git checkout + dvc checkout. (3) Link data versions to code/model versions in git history. (4) Share datasets across team members via dvc pull. (5) Reproduce any historical experiment by checking out the git commit that contains the .dvc pointer and running dvc checkout to download the exact data version.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Great Expectations Documentation', url: 'https://docs.greatexpectations.io/', type: 'ARTICLE', priority: 'S', source: 'Great Expectations', isOfficial: true, description: 'Official data validation framework documentation.' },
      { title: 'DVC Documentation', url: 'https://dvc.org/doc', type: 'ARTICLE', priority: 'S', source: 'DVC / Iterative.ai', isOfficial: true, description: 'Official DVC documentation for ML data and experiment versioning.' }
    ]
  }
};
