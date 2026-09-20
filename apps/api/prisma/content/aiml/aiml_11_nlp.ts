export const aiml_11_nlp = {
  NLP_FOUNDATIONS: {
    title: 'NLP Foundations',
    description: 'Master tokenization, text preprocessing, word embeddings, and sequence representations for NLP tasks.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 75,
    prerequisites: ['Deep Learning Foundations', 'Python for AI/ML Engineering'],
    learningContent: `
# NLP Foundations

## 1. Text Preprocessing
\`\`\`python
import re
import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer

def preprocess(text: str) -> list[str]:
    text = text.lower()                          # Lowercase
    text = re.sub(r'[^a-z0-9\\s]', '', text)     # Remove punctuation
    tokens = word_tokenize(text)                  # Tokenize
    tokens = [t for t in tokens if t not in stopwords]  # Remove stopwords
    tokens = [PorterStemmer().stem(t) for t in tokens]   # Stem
    return tokens
\`\`\`

**Bag of Words (BoW):** Represent text as a vector of word counts. Loses word order. Works surprisingly well for classification.

**TF-IDF:** Term Frequency × Inverse Document Frequency. Weights words by how discriminative they are — common words (the, a) get low weights.

## 2. Tokenization Strategies
- **Word tokenization:** Split on whitespace. Simple but breaks for subwords (running → run + ning)
- **Subword (BPE — Byte Pair Encoding):** Start with characters, iteratively merge frequent pairs into subword tokens. Used in GPT models. Handles OOV (out-of-vocabulary) words naturally.
- **Sentencepiece/WordPiece:** Alternative subword algorithms. Used in BERT.

\`\`\`python
from transformers import GPT2Tokenizer

tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
tokens = tokenizer("Hello, how are you?")
print(tokens['input_ids'])  # [15496, 11, 703, 389, 345, 30]
print(tokenizer.decode(tokens['input_ids']))  # "Hello, how are you?"
\`\`\`

## 3. Word Embeddings
**Word2Vec:** Train a shallow neural network to predict context words. Result: dense vector representations where semantic similarity = cosine similarity.

Two architectures:
- **CBOW:** Predict center word from context
- **Skip-gram:** Predict context words from center word (better for rare words)

\`\`\`python
from gensim.models import Word2Vec

model = Word2Vec(sentences, vector_size=100, window=5, min_count=2, sg=1)  # sg=1: Skip-gram
model.wv['king'] - model.wv['man'] + model.wv['woman'] ≈ model.wv['queen']
\`\`\`

**GloVe:** Train on global co-occurrence statistics. Complements Word2Vec.

## 4. Text Classification
\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

clf = Pipeline([
    ('tfidf', TfidfVectorizer(max_features=50000, ngram_range=(1,2))),
    ('clf', LogisticRegression(C=1.0))
])
clf.fit(X_train_texts, y_train)
\`\`\`

A TF-IDF + Logistic Regression baseline is a surprisingly strong starting point for most text classification tasks.
`,
    fullNotes: `
# Detailed Notes: NLP Foundations

- **Vocabulary size tradeoff:** Large vocabulary → better coverage, more parameters. Small vocabulary → more OOV, less memory. BPE tokenizers typically use 30k-50k tokens, covering essentially any text without OOV.
- **Static vs Contextual Embeddings:** Word2Vec gives one vector per word regardless of context ("bank" always has the same embedding). Contextual embeddings (BERT) give a different vector per occurrence based on surrounding words — dramatically more powerful.
- **N-grams:** Capture short phrases in BoW/TF-IDF. bigram(1,2) often significantly improves text classification over unigrams alone.
`,
    shortNotes: `
- BoW: word count vector (no order). TF-IDF: weighted by discriminativeness.
- BPE tokenization: handles OOV, used by GPT. WordPiece: used by BERT.
- Word2Vec: dense word embeddings where semantic similarity = cosine similarity
- king - man + woman ≈ queen: word analogy demonstrates embedding geometry
- TF-IDF + LogReg: strong baseline for text classification
- Stopwords: high-frequency words with low information (the, a, is)
- Static embeddings (Word2Vec) vs contextual (BERT/GPT)
`,
    cheatSheet: `
### NLP Pipeline Steps
1. Text → Preprocessing (lowercase, remove special chars)
2. Tokenization (whitespace, BPE, WordPiece)
3. Vocabulary / Embedding lookup
4. Sequence representation (BoW, TF-IDF, embeddings)
5. Model (LogReg, LSTM, Transformer)
6. Output (class label, generated text, extracted spans)

### Tokenizer Comparison
| Tokenizer | Used In | OOV Handling |
|-----------|---------|-------------|
| Word | Classic NLP | Fails on new words |
| BPE | GPT-2/3/4 | Character fallback |
| WordPiece | BERT | ## prefix for subwords |
| Sentencepiece | T5, LLaMA | Language-agnostic |
`,
    interviewQuestions: [
      { question: 'What is TF-IDF and why is it more useful than raw word counts?', answerHint: 'TF-IDF = Term Frequency × Inverse Document Frequency. TF counts how often a word appears in a document. IDF = log(N/df) penalizes words that appear in many documents (common words like "the", "is" have high DF, low IDF). The product gives high scores to words that are frequent in a specific document but rare overall — these are the discriminative, informative terms. Raw word counts give too much weight to common words that carry no information for classification.', type: 'TECHNICAL' },
      { question: 'What are the limitations of word embeddings like Word2Vec?', answerHint: 'Word2Vec produces static embeddings — each word has exactly one vector regardless of context. "Bank" (financial institution) and "bank" (river bank) have the same embedding, conflating different meanings. Additionally, Word2Vec cannot handle OOV (out-of-vocabulary) words at all. Contextual embeddings from Transformers (BERT, GPT) solve the context problem by producing different representations for the same word based on its surrounding context. Subword tokenizers (BPE) solve the OOV problem.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Stanford CS224N: NLP with Deep Learning', url: 'https://web.stanford.edu/class/cs224n/', type: 'COURSE', priority: 'S', source: 'Stanford', isOfficial: false, description: 'The gold-standard NLP course covering foundations through Transformers.' },
      { title: 'Word2Vec Paper (Mikolov et al., 2013)', url: 'https://arxiv.org/abs/1301.3781', type: 'ARTICLE', priority: 'A', source: 'arXiv', isOfficial: false, description: 'Original Word2Vec paper introducing dense word embeddings.' }
    ]
  }
};
