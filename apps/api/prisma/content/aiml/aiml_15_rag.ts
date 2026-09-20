export const aiml_15_rag = {
  RAG_RETRIEVAL: {
    title: 'RAG & Retrieval Systems',
    description: 'Master Retrieval-Augmented Generation: document ingestion, chunking, retrieval, reranking, and production RAG evaluation.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Embeddings & Vector Databases', 'Large Language Model Foundations'],
    learningContent: `
# RAG & Retrieval Systems

## 1. What is RAG?
RAG (Retrieval-Augmented Generation) grounds LLM responses in external knowledge by:
1. **Retrieve:** Find relevant documents from a knowledge base
2. **Augment:** Inject retrieved context into the LLM prompt
3. **Generate:** LLM produces an answer grounded in retrieved context

This addresses two key LLM limitations: knowledge cutoff and hallucination.

## 2. Document Ingestion Pipeline
\`\`\`python
from langchain.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Load documents
loader = DirectoryLoader('./docs', glob="**/*.pdf", loader_cls=PyPDFLoader)
documents = loader.load()

# Chunk documents
splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,        # Max tokens per chunk
    chunk_overlap=64,      # Overlap for context continuity
    separators=["\\n\\n", "\\n", " ", ""]  # Try these separators in order
)
chunks = splitter.split_documents(documents)
print(f"Split into {len(chunks)} chunks")

# Add metadata for filtering
for chunk in chunks:
    chunk.metadata['doc_type'] = 'policy'
    chunk.metadata['version'] = '2024-Q3'
\`\`\`

## 3. Retrieval Strategies
\`\`\`python
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer

encoder = SentenceTransformer('all-MiniLM-L6-v2')
client = QdrantClient(url="http://localhost:6333")

def retrieve(query: str, top_k: int = 10, filters: dict = None):
    query_vec = encoder.encode(query).tolist()
    results = client.search(
        collection_name="knowledge_base",
        query_vector=query_vec,
        limit=top_k,
        query_filter=filters  # Metadata filtering
    )
    return [r.payload['text'] for r in results]
\`\`\`

**Hybrid Retrieval:** Combine dense (embedding) + sparse (BM25/TF-IDF) retrieval using Reciprocal Rank Fusion (RRF):
\`\`\`python
def hybrid_retrieve(query, dense_results, bm25_results, k=60):
    # RRF scoring: score = Σ 1/(rank_i + k)
    scores = {}
    for rank, doc in enumerate(dense_results): scores[doc] = scores.get(doc, 0) + 1/(rank+1+k)
    for rank, doc in enumerate(bm25_results): scores[doc] = scores.get(doc, 0) + 1/(rank+1+k)
    return sorted(scores, key=scores.get, reverse=True)
\`\`\`

## 4. Context Construction and Generation
\`\`\`python
from openai import OpenAI

client = OpenAI()

def rag_query(user_question: str) -> str:
    # Step 1: Retrieve
    retrieved_chunks = retrieve(user_question, top_k=5)
    context = "\\n\\n".join(retrieved_chunks)

    # Step 2: Augment prompt
    prompt = f"""Answer the question based ONLY on the provided context. 
If the context doesn't contain the answer, say "I don't know."

Context:
{context}

Question: {user_question}"""

    # Step 3: Generate
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1  # Low temperature for factual QA
    )
    return response.choices[0].message.content
\`\`\`

## 5. RAG Evaluation
| Metric | Measures | Tool |
|--------|---------|------|
| Context Recall | Retrieved docs contain the answer | RAGAS |
| Context Precision | Retrieved docs are relevant (not noisy) | RAGAS |
| Answer Faithfulness | Answer is grounded in retrieved context | RAGAS |
| Answer Relevance | Answer addresses the question | RAGAS |
| Hallucination Rate | Answer contains info not in context | Manual / LLM-as-judge |

## 6. Common Failure Modes
- **Chunking too small:** Splits sentences mid-thought → context missing
- **Poor retrieval:** Relevant docs not retrieved → LLM lacks context
- **Too many chunks:** Noise overwhelms signal → lower faithfulness
- **Wrong answer despite good retrieval:** LLM ignores context
- **Hallucination:** LLM adds facts not present in retrieved context
`,
    fullNotes: `
# Detailed Notes: RAG

- **Hierarchical Chunking:** Store full documents and summaries at different granularities. Retrieve at fine-grain but pass parent-chunk or document summary for wider context.
- **Query Expansion:** Rephrase the query multiple times (HyDE — Hypothetical Document Embeddings) or expand with related terms to improve retrieval recall.
- **Late Interaction Models (ColBERT):** Instead of one vector per document, store one vector per token. Match query tokens to document tokens for fine-grained retrieval. Higher accuracy but higher storage cost.
`,
    shortNotes: `
- RAG: Retrieve relevant chunks → inject into prompt → LLM generates grounded answer
- Chunk size: 256-512 tokens with 10-15% overlap. Larger chunks = more context, less precision.
- Hybrid retrieval: dense (semantic) + sparse (BM25) → better coverage via RRF
- Reranking: retrieve top-50, rerank with cross-encoder, use top-5
- Context precision: are retrieved chunks relevant? Context recall: is the answer in them?
- Hallucination mitigation: low temperature, explicit "only use context" instruction, cite sources
`,
    cheatSheet: `
### RAG Pipeline Architecture
\`\`\`
Documents → Chunking → Embedding → Vector DB
                                        ↑
User Query → Embedding → ANN Search → Retrieved Chunks
                                        ↓
                              Prompt Construction
                                        ↓
                            LLM → Grounded Answer
\`\`\`

### Chunking Strategies
| Strategy | When to Use |
|----------|------------|
| Fixed-size (RecursiveCharacter) | General purpose |
| Semantic chunking | When paragraph boundaries matter |
| Document-aware (HTML/MD) | Structured documents |
| Sentence splitter | Short factual texts |
`,
    interviewQuestions: [
      { question: 'What are the main failure modes in a RAG system and how do you address them?', answerHint: 'Retrieval failures: wrong or irrelevant chunks retrieved (fix: hybrid retrieval, reranking, better chunking), relevant chunks not retrieved due to vocabulary mismatch (fix: query expansion, BM25 hybrid). Generation failures: LLM ignores context and hallucinates (fix: stronger system prompt, citation requirements, faithfulness evaluation), LLM makes correct claims not in context (fix: strict faithfulness metric). Chunking failures: context split across chunks (fix: larger chunks with overlap, semantic chunking). Evaluate each stage independently using RAGAS or similar frameworks.', type: 'TECHNICAL' },
      { question: 'What is hybrid retrieval and why does it outperform pure dense retrieval?', answerHint: 'Hybrid retrieval combines dense semantic search (embedding similarity) with sparse lexical search (BM25/TF-IDF). Dense retrieval finds semantically similar content even with different vocabulary, but can miss exact keyword matches. Sparse retrieval (BM25) excels at exact keyword matching (product names, IDs, rare terms) but misses paraphrases. Combining both via Reciprocal Rank Fusion (RRF) — where the final score is the sum of reciprocal ranks from both lists — consistently outperforms either alone on standard retrieval benchmarks like BEIR.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'RAGAS: RAG Evaluation Framework', url: 'https://docs.ragas.io/', type: 'ARTICLE', priority: 'S', source: 'RAGAS', isOfficial: true, description: 'Production RAG evaluation library with metrics for retrieval and generation.' },
      { title: 'Advanced RAG (LlamaIndex Guide)', url: 'https://docs.llamaindex.ai/en/stable/optimizing/advanced_retrieval/', type: 'ARTICLE', priority: 'S', source: 'LlamaIndex', isOfficial: true, description: 'Comprehensive guide to advanced RAG techniques.' }
    ]
  }
};
