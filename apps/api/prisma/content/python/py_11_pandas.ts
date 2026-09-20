export const py_11_pandas = {
  PANDAS_DATA_PROCESSING: {
    title: 'Pandas & Data Processing',
    description: 'Master DataFrames, Series, data cleaning, joins, aggregation, and efficient large-scale data processing.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 90,
    prerequisites: ['NumPy & Scientific Computing'],
    learningContent: `
# Pandas & Data Processing

Pandas is the primary data manipulation library in Python. It provides DataFrames (table-like structures) for loading, cleaning, transforming, and analyzing structured data.

## 1. Series and DataFrame
\`\`\`python
import pandas as pd
import numpy as np

# Series: 1D labeled array
s = pd.Series([10, 20, 30, 40], index=["a", "b", "c", "d"])

# DataFrame: 2D table
df = pd.DataFrame({
    "name": ["Alice", "Bob", "Charlie"],
    "age": [30, 25, 35],
    "score": [95.5, 82.0, np.nan]  # NaN represents missing data
})
print(df.dtypes)
print(df.describe())  # Statistical summary
\`\`\`

## 2. Selection and Indexing
\`\`\`python
df["name"]               # Select column (Series)
df[["name", "age"]]      # Select multiple columns (DataFrame)

df.loc[0]                # Select row by label
df.iloc[0]               # Select row by integer position

df.loc[df["age"] > 28]   # Boolean filtering
df.query("age > 28 and score > 80")  # SQL-style query
\`\`\`

## 3. Handling Missing Data
\`\`\`python
df.isnull().sum()        # Count missing values per column
df.dropna()              # Drop rows with any NaN
df.fillna(0)             # Fill NaN with 0
df["score"].fillna(df["score"].mean())  # Fill with mean
\`\`\`

## 4. GroupBy and Aggregation
\`\`\`python
sales = pd.DataFrame({
    "region": ["North", "South", "North", "South"],
    "revenue": [100, 200, 150, 250]
})

summary = (
    sales
    .groupby("region")["revenue"]
    .agg(["sum", "mean", "count"])
)
\`\`\`

## 5. Merging and Joining
\`\`\`python
users = pd.DataFrame({"id": [1, 2], "name": ["Alice", "Bob"]})
orders = pd.DataFrame({"user_id": [1, 1, 2], "amount": [50, 75, 30]})

# SQL-style JOIN
result = pd.merge(users, orders, left_on="id", right_on="user_id", how="left")
\`\`\`

## 6. Efficient Processing
\`\`\`python
# Apply function to each row (slow — Python loop internally)
df["upper_name"] = df["name"].apply(str.upper)

# Vectorized string operations (fast — C internally)
df["upper_name"] = df["name"].str.upper()

# Use .to_numpy() to extract NumPy array for math operations
scores_array = df["score"].to_numpy()
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Pandas

- **SettingWithCopyWarning:** When you select a subset of a DataFrame and then try to modify it, Pandas warns you that you might be modifying a copy instead of the original. Always use \`.loc\` for safe in-place modifications: \`df.loc[mask, "col"] = value\`.
- **Method Chaining:** Modern Pandas favors a declarative, chaining style (similar to SQL): \`df.rename(...).dropna().groupby(...).agg(...).reset_index()\`. This creates readable, step-by-step pipelines.
- **Parquet vs CSV:** For large datasets, never use CSV in production. Parquet is a columnar binary format that is 5-10x smaller and 10x faster to read/write. \`df.to_parquet("data.parquet")\`.
`,
    shortNotes: `
- DataFrame: 2D labeled table. Series: 1D labeled column.
- .loc[] selects by label. .iloc[] selects by integer position.
- .dropna() removes rows with NaN. .fillna(val) replaces NaN with a value.
- .groupby().agg() performs SQL-like GROUP BY aggregations.
- pd.merge() performs SQL-style JOINs (left, right, inner, outer).
- Prefer vectorized str operations (df["col"].str.upper()) over .apply().
- Use Parquet format for production data pipelines, not CSV.
`,
    cheatSheet: `
### Pandas Merge (JOIN) Types
| How      | SQL Equivalent | Keeps                        |
|----------|---------------|------------------------------|
| inner    | INNER JOIN    | Only matching rows           |
| left     | LEFT JOIN     | All left + matching right    |
| right    | RIGHT JOIN    | All right + matching left    |
| outer    | FULL OUTER    | All rows from both           |
`,
    interviewQuestions: [
      { question: 'What is the difference between .loc[] and .iloc[] in Pandas?', answerHint: '.loc[] (label-based) selects rows and columns by their index labels. If the DataFrame has a string index like ["alice", "bob"], you use df.loc["alice"]. .iloc[] (integer-position-based) always selects by integer position (0, 1, 2...) regardless of the index. When the default integer index is used, they appear equivalent, but they differ critically when a custom index is applied.', type: 'TECHNICAL' },
      { question: 'Why is using .apply() in a tight Pandas loop considered a performance anti-pattern?', answerHint: '.apply() internally executes a Python loop over each row or column, giving up the performance advantage of NumPy\'s C-level vectorized operations. For string operations, the entire .str accessor namespace (df["col"].str.upper(), .str.replace(), .str.contains()) executes vectorized C operations that are 10-100x faster. Similarly, basic arithmetic should always use vectorized expressions (df["a"] + df["b"]) instead of .apply(lambda row: row.a + row.b).', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Pandas Official Documentation', url: 'https://pandas.pydata.org/docs/', type: 'ARTICLE', priority: 'S', source: 'pandas.pydata.org', isOfficial: true, description: 'The complete Pandas user guide and API reference.' },
      { title: 'Pandas Complete Tutorial', url: 'https://www.youtube.com/watch?v=vmEHCJofslg', type: 'VIDEO', priority: 'S', source: 'Keith Galli', isOfficial: false, description: 'Comprehensive Pandas tutorial from fundamentals to advanced analysis.' }
    ]
  }
};
