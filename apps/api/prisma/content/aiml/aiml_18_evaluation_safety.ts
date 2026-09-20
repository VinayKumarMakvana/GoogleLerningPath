export const aiml_18_evaluation_safety = {
  AI_EVALUATION_SAFETY: {
    title: 'AI Evaluation & Safety',
    description: 'Master LLM evaluation frameworks, hallucination detection, robustness, adversarial considerations, and responsible AI practices.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 75,
    prerequisites: ['Fine-Tuning & Adaptation', 'Model Evaluation & Experimentation'],
    learningContent: `
# AI Evaluation & Safety

## 1. Why Evaluating AI is Hard
Traditional ML metrics (accuracy, F1, AUC) don't apply to open-ended generation. LLM outputs can be:
- Factually correct but poorly formatted
- Well-formatted but factually wrong
- Relevant but hallucinated
- Safe but unhelpful

Evaluation requires task-specific, multi-dimensional assessment.

## 2. Reference-Based vs LLM-as-Judge
\`\`\`python
# Reference-based: compare to ground truth
from rouge_score import rouge_scorer
scorer = rouge_scorer.RougeScorer(['rouge1', 'rougeL'])
scores = scorer.score(reference_answer, model_answer)

# BLEU (for translation)
from sacrebleu import corpus_bleu
bleu = corpus_bleu(hypotheses, [references])

# BERTScore: semantic similarity (better than ROUGE)
from bert_score import score as bert_score
P, R, F1 = bert_score([model_answer], [reference_answer], lang='en')
\`\`\`

**LLM-as-Judge:**
\`\`\`python
from openai import OpenAI
client = OpenAI()

def llm_judge(question, model_answer, reference_answer):
    prompt = f"""Rate the model's answer on a scale of 1-5 for:
1. Factual accuracy (compared to reference)
2. Completeness
3. Clarity

Question: {question}
Reference: {reference_answer}
Model Answer: {model_answer}

Provide a JSON response with scores and brief justification."""
    
    response = client.chat.completions.create(model="gpt-4o", messages=[{"role":"user","content":prompt}], response_format={"type":"json_object"})
    return response.choices[0].message.content
\`\`\`

## 3. Hallucination Evaluation
\`\`\`python
# Faithfulness evaluation for RAG: does the answer contradict the context?
def evaluate_faithfulness(context: str, answer: str) -> dict:
    prompt = f"""Given the context and answer, identify claims in the answer 
that are NOT supported by or contradict the context.

Context: {context}
Answer: {answer}

Return JSON: {{"supported_claims": [], "unsupported_claims": [], "faithfulness_score": 0-1}}"""
    # Call LLM-as-judge
\`\`\`

## 4. Benchmark Suites
| Benchmark | Task | Use For |
|-----------|------|---------|
| MMLU | Knowledge QA (57 domains) | General knowledge |
| HumanEval / MBPP | Code generation | Coding models |
| MT-Bench | Multi-turn conversation | Chat model quality |
| HELM | Holistic, multi-scenario | Model comparison |
| RAGAS | RAG pipeline metrics | RAG evaluation |
| TruthfulQA | Truthfulness vs imitation | Hallucination |

## 5. Adversarial Safety Considerations
- **Prompt injection:** Malicious instructions in retrieved content
- **Jailbreaking:** Bypassing safety guardrails
- **Data poisoning:** Malicious training data manipulation
- **PII leakage:** Model memorizes and reproduces private training data
- **Tool misuse:** Agent executes harmful actions with legitimate tools
- **Bias and fairness:** Differential model performance across demographic groups

\`\`\`python
# Input/output guardrails with LLM classifier
from openai import OpenAI

def safety_check(user_input: str) -> bool:
    response = client.moderations.create(input=user_input)
    return not response.results[0].flagged
\`\`\`
`,
    fullNotes: `
# Detailed Notes: AI Evaluation & Safety

- **Inter-annotator Agreement:** Human evaluation requires measuring how consistently human raters agree. Low agreement (kappa < 0.6) means the task is ambiguous or raters need better guidelines. Use multiple raters and report agreement alongside evaluation metrics.
- **Evaluation Dataset Contamination:** If the LLM was trained on benchmark test sets (common with web-scraped data), reported performance is inflated. Always check if the model has seen your evaluation data during training.
- **Red Teaming:** Adversarially probe your system to find safety and quality failures before deployment. Combine automated probes (using another LLM to generate adversarial inputs) with human expert testing.
`,
    shortNotes: `
- ROUGE/BLEU: lexical overlap metrics — fast but miss semantic equivalence
- BERTScore: semantic similarity via BERT representations — better than ROUGE
- LLM-as-judge: flexible, powerful, but biased toward verbosity and similar style
- Hallucination = generated content not grounded in context/source
- RAGAS: context recall, context precision, faithfulness, answer relevance
- Adversarial safety: prompt injection, jailbreaking, PII leakage, bias
- OpenAI Moderation API: fast, free safety classifier for input/output filtering
`,
    cheatSheet: `
### AI Evaluation Framework
1. **Task metrics:** ROUGE (summarization), BLEU (translation), Pass@k (code)
2. **Semantic metrics:** BERTScore, embedding similarity
3. **LLM-judge metrics:** GPT-4 scoring on accuracy, helpfulness, harmlessness
4. **RAG metrics:** RAGAS (faithfulness, context precision, recall)
5. **Safety metrics:** Refusal rate, jailbreak success rate, PII exposure
6. **Human eval:** Gold standard for open-ended quality assessment

### Evaluation Anti-patterns
- Evaluating only on training distribution
- Using the same LLM to generate AND evaluate answers
- Optimizing for one metric that doesn't correlate with real quality
- Ignoring failure modes (evaluate on adversarial inputs too)
`,
    interviewQuestions: [
      { question: 'What are the limitations of using ROUGE scores to evaluate LLM outputs?', answerHint: 'ROUGE measures lexical overlap (n-gram overlap) between the generated and reference text. Limitations: (1) Semantic blindness — a synonym substitution ("automobile" for "car") reduces ROUGE even though the meaning is identical. (2) Reference dependency — good answers not matching the specific reference wording score poorly. (3) Length bias — longer answers with more overlap score higher even if less precise. (4) No factuality check — a factually wrong answer with vocabulary overlap can score well. BERTScore addresses the semantic blindness issue; LLM-as-judge handles factuality and completeness holistically.', type: 'TECHNICAL' },
      { question: 'How would you evaluate whether an LLM application is safe to deploy in production?', answerHint: 'Multi-layered evaluation: (1) Input safety: classify all inputs with a safety filter (OpenAI Moderation or custom classifier) — reject or sanitize flagged inputs. (2) Hallucination: evaluate faithfulness on a representative sample — does the model only claim what is in context? (3) Red team: use automated LLM-based adversarial probing + human expert testing to find jailbreaks, prompt injection, and bias issues. (4) Fairness: evaluate performance across demographic groups. (5) Output filtering: detect and redact PII in outputs. (6) Monitoring: continuous evaluation post-deployment — drift detection, human feedback loops, anomaly alerts.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'LMSYS Chatbot Arena & MT-Bench', url: 'https://chat.lmsys.org/', type: 'ARTICLE', priority: 'A', source: 'LMSYS', isOfficial: true, description: 'Human preference-based LLM evaluation and leaderboard.' },
      { title: 'Evaluating LLMs (Patterns for LLM Systems)', url: 'https://www.youtube.com/watch?v=ahnGLM-RC1Y', type: 'VIDEO', priority: 'S', source: 'Eugene Yan / MLOps Community', isOfficial: false, description: 'Practical LLM evaluation strategies from production ML.' }
    ]
  }
};
