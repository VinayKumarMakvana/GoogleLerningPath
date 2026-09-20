export const adv_18_feature_infra = {
  FEATURE_INFRA: {
    title: 'AI Data & Feature Infrastructure',
    description: 'Master feature stores, offline/online consistency, streaming features, and data infrastructure for ML pipelines.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 60,
    prerequisites: ['Data & ML Pipelines'],
    learningContent: `
# AI Data & Feature Infrastructure

## 1. What is a Feature Store?
A Feature Store (like Feast, Hopsworks, or Tecton) is the central hub for managing ML features. It sits between data engineering (who create features) and data science (who consume them for training/serving).

**Why do we need it?**
1. **Reuse:** Prevent different teams from rewriting the same "user_7_day_click_count" logic.
2. **Consistency (Training-Serving Skew):** Ensure the exact same transformation logic and data are used for offline training (batch) and online serving (real-time).
3. **Point-in-Time Correctness:** Generate training data without "data leakage" from the future.

## 2. Feature Store Architecture
\`\`\`
[ Data Sources ] (Kafka, Snowflake, BigQuery)
       ↓
[ Feature Processing ] (Spark, Flink, dbt)
       ↓
[ Feature Store Central Registry ]
       ↓
  ┌────┴────┐
  ↓         ↓
[Offline] [Online]
  ↓         ↓
[Train]   [Serve]
\`\`\`

- **Offline Store (Data Warehouse):** BigQuery/Snowflake. Stores months/years of historical features for batch training. High throughput, high latency.
- **Online Store (Key-Value Store):** Redis/DynamoDB. Stores only the *latest* feature values for real-time serving. Low latency (<10ms), high concurrency.

## 3. Point-in-Time Correctness (Time Travel)
When building a training dataset, you join labels (e.g., "user clicked ad at 10:00 AM") with features. If you join with the user's total click count computed at 11:00 AM, you have **data leakage**. The model learns from the future.

Feature stores perform a "Point-in-Time (AS OF) Join":
\`\`\`sql
-- Conceptual SQL for Point-in-Time Join
SELECT 
    labels.user_id, 
    labels.click_timestamp,
    features.user_7_day_click_count
FROM labels
ASOF JOIN features
  ON labels.user_id = features.user_id
  AND features.timestamp <= labels.click_timestamp
\`\`\`
This guarantees the features exactly reflect the state of the world *just before* the prediction event.

## 4. Feature Types
1. **Batch Features:** Computed daily/hourly via ETL (e.g., "user total purchases").
2. **Streaming Features:** Computed in near real-time via Kafka/Flink (e.g., "page views in last 5 minutes").
3. **Real-time (On-Demand) Features:** Computed at prediction time using request data (e.g., "similarity between query text and user history"). Cannot be pre-computed.

## 5. Integrating with LLMs
Feature stores are increasingly acting as the structured data backbone for RAG.
- Instead of just retrieving raw text from a Vector DB, an LLM agent queries the Feature Store: \`get_features(user_id='123')\`.
- The agent injects structured user state (account balance, recent transaction status) into the prompt context.
- Much more reliable than vector search for structured facts.
`,
    fullNotes: `
# Detailed Notes: Feature Infrastructure

- **Feast (Feature Store):** An open-source feature store. It does not compute features (you use Spark/dbt for that). It manages the definitions, the offline-to-online materialization sync, and provides the retrieval SDKs.
- **Materialization:** The process of copying newly computed features from the offline store (data warehouse) to the online store (Redis). Usually runs on a cron schedule (e.g., every hour).
- **Streaming Aggregations:** Hardest part of feature engineering. Computing a sliding window "clicks in last 5 mins" requires stateful stream processing (Apache Flink or Spark Structured Streaming) reading from Kafka.
`,
    shortNotes: `
- Feature Store solves: reuse, training-serving skew, and point-in-time correctness
- Offline Store (BigQuery/Snowflake): historical data for training, high throughput
- Online Store (Redis/DynamoDB): latest data for real-time inference, <10ms latency
- Point-in-Time Join: prevents data leakage by joining features "AS OF" the event timestamp
- Batch features (ETL) vs Streaming features (Flink) vs Real-time/On-demand (at inference)
- Feature Stores in GenAI: provide structured context to LLMs (better than Vector DB for facts)
`,
    cheatSheet: `
### Feature Store Capabilities
| Problem | Feature Store Solution |
|---------|------------------------|
| Duplicated work | Central registry of feature definitions |
| Training-Serving Skew | Single definition powers both Offline & Online stores |
| Data Leakage | Point-in-time correct (AS OF) historical joins |
| Serving Latency | Materialization to low-latency Online Store (Redis) |

### Feast Core Concepts
- **FeatureView:** A group of features computed together (e.g., user_profile_features).
- **Entity:** The primary key (e.g., user_id).
- **Materialize:** Command to sync data from offline to online store.
`,
    interviewQuestions: [
      { question: 'What is point-in-time correctness (time travel) in feature engineering, and why is it critical for ML training?', answerHint: 'Point-in-time correctness ensures that when generating training data, the feature values used for a specific event reflect the exact state of the world just before that event occurred. If you are predicting whether a user clicked an ad at 10:05 AM on Tuesday, you must use their "recent click rate" feature calculated precisely up to 10:04 AM. If you accidentally join with their click rate calculated at the end of the day, you introduce data leakage (the model sees future information). A feature store handles this complex "AS OF" temporal join automatically, ensuring training data is historically accurate.', type: 'TECHNICAL' },
      { question: 'Describe the difference between an Offline Feature Store and an Online Feature Store.', answerHint: 'The Offline store (usually a Data Warehouse like BigQuery or Snowflake) holds the full historical log of all feature values over time. It is optimized for high-throughput batch reads to generate massive training datasets. The Online store (usually a Key-Value store like Redis or DynamoDB) holds ONLY the most recent value for each feature. It is optimized for extremely low-latency (<10ms) single-row lookups to serve real-time predictions. A feature store orchestrates the "materialization" pipeline that continuously syncs the latest values from the offline store to the online store.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Feast Documentation', url: 'https://docs.feast.dev/', type: 'ARTICLE', priority: 'S', source: 'Feast', isOfficial: true, description: 'Documentation for the leading open-source feature store.' },
      { title: 'Feature Stores: A Hierarchy of Needs', url: 'https://www.tecton.ai/blog/feature-store-hierarchy-of-needs/', type: 'ARTICLE', priority: 'A', source: 'Tecton', isOfficial: false, description: 'Excellent conceptual breakdown of why feature stores exist.' }
    ]
  }
};
