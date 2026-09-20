export const aiml_04_unsupervised = {
  UNSUPERVISED_LEARNING: {
    title: 'Unsupervised Learning',
    description: 'Master clustering (K-Means, DBSCAN), dimensionality reduction (PCA, UMAP), and anomaly detection.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 75,
    prerequisites: ['Supervised Learning', 'Eigenvalues, Eigenvectors & Decompositions'],
    learningContent: `
# Unsupervised Learning

## 1. K-Means Clustering
**Algorithm:**
1. Initialize K cluster centroids (randomly or K-Means++)
2. Assign each point to nearest centroid
3. Update centroids to mean of assigned points
4. Repeat until convergence

**Objective:** Minimize within-cluster sum of squares (WCSS): Σₖ Σ_{x∈Cₖ} ‖x - μₖ‖²

\`\`\`python
from sklearn.cluster import KMeans

# Choosing K: Elbow method
wcss = []
for k in range(1, 11):
    kmeans = KMeans(n_clusters=k, random_state=42, n_init='auto')
    kmeans.fit(X)
    wcss.append(kmeans.inertia_)
# Plot WCSS vs K — look for the "elbow"

# Silhouette score: measures cluster quality (-1 to 1, higher is better)
from sklearn.metrics import silhouette_score
score = silhouette_score(X, kmeans.labels_)
\`\`\`

**Limitations:** Assumes spherical clusters, sensitive to outliers, requires K upfront.

## 2. DBSCAN
Density-based clustering — finds arbitrarily shaped clusters and identifies outliers.

- **Core points:** Have ≥ minPts neighbors within radius ε
- **Border points:** Within ε of a core point but fewer than minPts neighbors
- **Noise (outliers):** Not reachable from any core point

\`\`\`python
from sklearn.cluster import DBSCAN
db = DBSCAN(eps=0.5, min_samples=5)
labels = db.fit_predict(X)
# label = -1 means outlier/noise
\`\`\`

## 3. PCA — Dimensionality Reduction
PCA finds orthogonal directions of maximum variance. (See 9J Eigenvalues module for the math.)

\`\`\`python
from sklearn.decomposition import PCA

pca = PCA(n_components=2)            # Keep top 2 principal components
X_reduced = pca.fit_transform(X)

print(pca.explained_variance_ratio_) # % variance explained by each component
print(pca.explained_variance_ratio_.cumsum())  # Cumulative — choose n for ~95%
\`\`\`

## 4. UMAP — Non-linear Dimensionality Reduction
UMAP (Uniform Manifold Approximation and Projection) learns non-linear manifold structure, preserving both local and global structure better than t-SNE. Used heavily for visualizing embeddings.

\`\`\`python
import umap
reducer = umap.UMAP(n_components=2, random_state=42)
X_2d = reducer.fit_transform(X)
\`\`\`

## 5. Anomaly Detection
\`\`\`python
from sklearn.ensemble import IsolationForest

# Isolation Forest: isolates anomalies by random splitting
# Anomalies require fewer splits to isolate
clf = IsolationForest(contamination=0.05, random_state=42)  # 5% anomaly rate expected
preds = clf.fit_predict(X)  # -1 = anomaly, 1 = normal
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Unsupervised Learning

- **K-Means++ Initialization:** Instead of random centroid initialization (which can lead to poor solutions), K-Means++ chooses centroids probabilistically — each new centroid is chosen proportionally to its squared distance from existing centroids. Guarantees O(log K) approximation to optimal and converges faster.
- **Hierarchical Clustering:** Builds a tree (dendrogram) of clusters. Agglomerative (bottom-up): start with N clusters and merge. Divisive (top-down): start with 1 and split. Useful when K is unknown.
- **t-SNE vs UMAP:** Both are non-linear dimensionality reduction for visualization. t-SNE is slower (O(N²)), focuses on local structure, and cannot generalize to new points. UMAP is faster, preserves both local and global structure, and can transform new data.
`,
    shortNotes: `
- K-Means: iterative assignment + centroid update. Minimize WCSS.
- Use Elbow method + Silhouette score to choose K.
- DBSCAN: density-based, finds outliers (label=-1), no K needed.
- PCA: linear dimensionality reduction. Maximize variance.
- explained_variance_ratio_: choose n_components for 95% cumulative variance.
- UMAP: non-linear, faster than t-SNE, preserves global structure.
- Isolation Forest: anomaly detection via random partitioning.
`,
    cheatSheet: `
### Clustering Algorithm Comparison
| Algorithm | Shape | Outliers | Need K? | Scale |
|-----------|-------|---------|---------|-------|
| K-Means | Spherical | Sensitive | Yes | Large |
| DBSCAN | Arbitrary | Robust (flags them) | No | Medium |
| Hierarchical | Arbitrary | Sensitive | No | Small |
| GMM | Ellipsoidal | Soft assignment | Yes | Medium |
`,
    interviewQuestions: [
      { question: 'What are the limitations of K-Means clustering and how does DBSCAN address them?', answerHint: 'K-Means assumes spherical clusters of similar size, is sensitive to outliers (which get assigned to the nearest centroid and distort it), and requires K to be specified upfront. DBSCAN addresses these by using density to define clusters — it finds arbitrarily shaped clusters without requiring K, and explicitly labels low-density points as outliers (noise, label=-1) rather than assigning them to a cluster. However, DBSCAN struggles with varying density clusters and is sensitive to its ε and minPts hyperparameters.', type: 'TECHNICAL' },
      { question: 'What does the explained_variance_ratio_ tell you in PCA, and how do you use it to choose the number of components?', answerHint: 'explained_variance_ratio_[i] is the fraction of the total variance in the data captured by the i-th principal component. By plotting the cumulative sum and finding the "elbow" — or selecting the n_components needed to capture ~95% of the variance — you can choose a compressed representation that retains most of the signal while discarding noise and irrelevant variation. This is especially useful for reducing training time, visualization, and combating the curse of dimensionality.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'scikit-learn Clustering Guide', url: 'https://scikit-learn.org/stable/modules/clustering.html', type: 'ARTICLE', priority: 'S', source: 'scikit-learn', isOfficial: true, description: 'Comprehensive clustering documentation.' },
      { title: 'StatQuest: K-means and DBSCAN', url: 'https://www.youtube.com/watch?v=4b5d3muPQmA', type: 'VIDEO', priority: 'S', source: 'StatQuest', isOfficial: false, description: 'Visual explanation of clustering algorithms.' }
    ]
  }
};
