export const aiml_14_embeddings = {
  EMBEDDINGS_VECTOR_DATABASES: {
    title: 'Embeddings & Vector Databases',
    description: 'Master embedding models, semantic similarity, vector search algorithms, and production vector databases.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 75,
    prerequisites: ['Large Language Model Foundations', 'Vectors & Vector Spaces'],
    learningContent: `
# Embeddings & Vector Databases

## 1. What are Embeddings?
An embedding model maps content (text, images, code) to a dense vector in a semantic space where similar content has similar vectors (measured by cosine similarity or dot product).

\`\`\`python
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')  # 384-dim embeddings

sentences = [
    "The cat sat on the mat.",
    "A feline rested on the rug.",   # Semantically similar
    "The stock market crashed today." # Semantically different
]
embeddings = model.encode(sentences)  # Shape: (3, 384)

# Cosine similarity
def cosine_sim(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

print(cosine_sim(embeddings[0], embeddings[1]))  # ~0.85 (similar)
print(cosine_sim(embeddings[0], embeddings[2]))  # ~0.12 (different)
\`\`\`

## 2. Embedding Model Types
- **Sentence Transformers (SBERT):** Siamese network trained with contrastive loss to produce sentence-level embeddings. Fast, widely used for semantic search.
- **OpenAI text-embedding-3:** High-quality embeddings via API. 1536 or 3072 dimensions.
- **BGE / E5 / GTE:** Open-source models competitive with OpenAI.
- **Matryoshka Embeddings:** Can be truncated to smaller dimensions without retraining.

## 3. Approximate Nearest Neighbor (ANN) Search
Exact nearest neighbor search is O(N·d) — too slow for millions of vectors.
ANN algorithms find approximate top-k results in O(log N) or O(d√N).

**FAISS (Facebook AI Similarity Search):**
\`\`\`python
import faiss
import numpy as np

d = 384          # Embedding dimension
index = faiss.IndexFlatIP(d)  # Inner product (cosine after normalization)
faiss.normalize_L2(embeddings) # Normalize to unit sphere for cosine similarity

index = faiss.IndexIVFFlat(faiss.IndexFlatIP(d), d, 100)  # IVF: 100 clusters
index.train(embeddings)
index.add(embeddings)

query = model.encode(["cat sitting on floor"])
faiss.normalize_L2(query)
distances, indices = index.search(query, k=5)  # Top-5 results
\`\`\`

**HNSW (Hierarchical Navigable Small World):** Graph-based ANN. Used by Qdrant, Weaviate, pgvector. Excellent recall/speed tradeoff.

## 4. Vector Databases
| Database | Type | Best For |
|----------|------|---------|
| **Qdrant** | Purpose-built vector DB | Production RAG, filtering |
| **Weaviate** | Vector DB + GraphQL | Hybrid search, ML integrations |
| **Pinecone** | Managed cloud | Minimal ops, quick start |
| **pgvector** | PostgreSQL extension | Existing PostgreSQL stack |
| **ChromaDB** | Embeddable, local | Development, prototyping |

\`\`\`python
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct

client = QdrantClient(":memory:")  # In-memory for dev
client.create_collection("docs", vectors_config=VectorParams(size=384, distance=Distance.COSINE))

points = [PointStruct(id=i, vector=emb.tolist(), payload={"text": sentences[i]}) for i, emb in enumerate(embeddings)]
client.upsert("docs", points=points)

results = client.search("docs", query_vector=query[0].tolist(), limit=3)
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Embeddings

- **Asymmetric Embeddings:** Some tasks require different models for queries vs documents (e.g., BEIR benchmark tasks). Asymmetric models (BGE-M3) are trained with query-document pairs specifically.
- **Embedding Drift:** The meaning of the same text can map to different vectors if you switch embedding models or update model versions. This requires re-embedding all documents — plan for this in production.
- **Reranking:** ANN retrieval returns approximate nearest neighbors. A cross-encoder reranker (e.g., cross-encoder/ms-marco-MiniLM) takes each (query, candidate) pair and scores them more accurately, but at O(k) cost for top-k candidates.
`,
    shortNotes: `
- Embeddings: dense vectors where semantic similarity = cosine similarity
- SBERT: fast sentence embeddings via Siamese Transformer network
- ANN search: find approximate nearest neighbors in O(log N) instead of O(N)
- FAISS: Facebook's ANN library. HNSW: graph-based ANN (used by most vector DBs).
- Vector databases: Qdrant, Weaviate, Pinecone, pgvector
- Always normalize embeddings to unit sphere for cosine similarity with dot product index
- Reranking: fast retrieval (ANN) → accurate reranking (cross-encoder)
`,
    cheatSheet: `
### Embedding Pipeline
\`\`\`
Text → Embedding Model → Dense Vector (384-3072 dims)
      ↓
Vector Database (HNSW index)
      ↓
Query → ANN Search → Top-k candidates → (Optional) Reranker → Final results
\`\`\`

### Choosing ANN Index (FAISS)
| Index | Memory | Speed | Recall | Use When |
|-------|--------|-------|--------|---------|
| IndexFlatL2 | High | Slow | 100% | Small datasets (<100k) |
| IndexIVFFlat | Medium | Fast | ~95% | Medium datasets |
| IndexHNSWFlat | Medium | Very Fast | ~97% | Production retrieval |
| IndexIVFPQ | Low | Fast | ~90% | Memory-constrained |
`,
    interviewQuestions: [
      { question: 'How do vector databases enable efficient semantic search at scale?', answerHint: 'Vector databases store embeddings and build an Approximate Nearest Neighbor (ANN) index (usually HNSW) over them. Exact nearest neighbor search is O(N·d) per query — too slow for millions of vectors. ANN algorithms find the approximate top-k results in O(log N) by exploiting the structure of the high-dimensional space (HNSW uses a hierarchical graph). The tradeoff is a small recall loss (~1-5%) for a massive speedup. Vector databases also support metadata filtering (find nearest neighbors where language==\'en\' AND date>2024), atomic updates, and distributed partitioning.', type: 'TECHNICAL' },
      { question: 'What is a reranker and when should you use one in a retrieval system?', answerHint: 'A reranker is a cross-encoder model that takes a (query, candidate) pair and produces a fine-grained relevance score. Unlike bi-encoder retrieval (embed query and doc independently, then compare), cross-encoders compute attention between query and candidate jointly — much more accurate but O(k) times slower (for k candidates). In a retrieval pipeline: (1) fast ANN retrieval fetches the top-100 candidates using embeddings, (2) the cross-encoder reranker scores each of the 100 (query, candidate) pairs and reorders them, (3) the top-5 reranked results are returned. This combines speed and accuracy.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'FAISS Documentation', url: 'https://faiss.ai/', type: 'ARTICLE', priority: 'S', source: 'Meta AI', isOfficial: true, description: 'Official FAISS vector search library documentation.' },
      { title: 'Sentence Transformers Documentation', url: 'https://www.sbert.net/', type: 'ARTICLE', priority: 'S', source: 'UKP Lab', isOfficial: true, description: 'Official sentence-transformers library for embedding generation.' }
    ]
  }
};
