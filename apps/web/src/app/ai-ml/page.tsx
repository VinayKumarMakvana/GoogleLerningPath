"use client";

import React, { useState, useMemo } from 'react';
import { 
  Brain, 
  Search, 
  Clock, 
  BookOpen, 
  FileText, 
  Zap, 
  HelpCircle, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Check
} from 'lucide-react';
import { AIML_TOPICS, AimlTopic } from '@/data/aimlData';
import { RichMarkdown } from '@/components/shared/RichMarkdown';
import styles from './page.module.css';

const STAGES = [
  {
    title: 'Stage 1: Math Foundations & Data Engineering',
    desc: 'Linear algebra, feature engineering, supervised/unsupervised learning, validation metrics.',
    topicIds: ['aiml_01_foundations', 'aiml_02_data_prep', 'aiml_03_supervised', 'aiml_04_unsupervised', 'aiml_05_evaluation']
  },
  {
    title: 'Stage 2: Ensembles & PyTorch Deep Learning',
    desc: 'XGBoost, production pipelines, neural network math, PyTorch tensor computation, and computer vision.',
    topicIds: ['aiml_06_ensemble', 'aiml_07_pipelines', 'aiml_08_deep_learning', 'aiml_09_pytorch', 'aiml_10_computer_vision']
  },
  {
    title: 'Stage 3: Modern NLP, Transformers & LLMs',
    desc: 'Word embeddings, self-attention mechanisms, Transformer architecture, LLM pre-training, and vector databases.',
    topicIds: ['aiml_11_nlp', 'aiml_12_transformers', 'aiml_13_llm_foundations', 'aiml_14_embeddings']
  },
  {
    title: 'Stage 4: RAG, Agents & High-Throughput Serving',
    desc: 'Retrieval Augmented Generation, tool-calling agents, LoRA fine-tuning, safety alignment (RLHF/DPO), and vLLM serving.',
    topicIds: ['aiml_15_rag', 'aiml_16_agents', 'aiml_17_finetuning', 'aiml_18_evaluation_safety', 'aiml_19_serving', 'aiml_20_interview']
  }
];

export default function AimlPage() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(AIML_TOPICS[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'learn' | 'notes' | 'cheatsheet' | 'interview' | 'resources'>('learn');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({
    'aiml_01_foundations': true,
    'aiml_02_data_prep': true,
    'aiml_08_deep_learning': true,
    'aiml_12_transformers': true
  });

  const activeTopic = useMemo(() => {
    return AIML_TOPICS.find(t => t.id === selectedTopicId) || AIML_TOPICS[0];
  }, [selectedTopicId]);

  const currentIndex = AIML_TOPICS.findIndex(t => t.id === activeTopic.id);
  const prevTopic = currentIndex > 0 ? AIML_TOPICS[currentIndex - 1] : null;
  const nextTopic = currentIndex < AIML_TOPICS.length - 1 ? AIML_TOPICS[currentIndex + 1] : null;

  const toggleHint = (idx: number) => {
    setRevealedHints(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleComplete = (id: string) => {
    setCompletedTopics(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / AIML_TOPICS.length) * 100);

  return (
    <div className={styles.container}>
      {/* Hero Header */}
      <div className={styles.heroHeader}>
        <div className={styles.heroTopRow}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>
              <Brain size={14} /> AI & LLM Systems Engineering
            </span>
            <h1 className={styles.heroTitle}>Applied AI / Machine Learning Masterclass</h1>
            <p className={styles.heroSubtitle}>
              Structured 4-stage engineering curriculum from mathematical foundations to Transformers, RAG, and production model serving.
            </p>
          </div>

          <div className={styles.heroProgressCard}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Track Progress: {completedCount}/{AIML_TOPICS.length} Completed ({progressPercent}%)</span>
            <div style={{ width: '100%', maxWidth: '220px', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #7928ca, #ff0080)', borderRadius: '4px', transition: 'width 0.3s ease' }} />
            </div>
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>4 Stages</span>
            <span className={styles.statLabel}>Specialization Track</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>20 Modules</span>
            <span className={styles.statLabel}>End-to-End Curriculum</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>GenAI & Core ML</span>
            <span className={styles.statLabel}>Production Depth</span>
          </div>
        </div>
      </div>

      {/* Controls Row */}
      <div className={styles.controlsRow}>
        <div className={styles.filterPills}>
          <button
            className={`${styles.filterPill} ${selectedStage === 'ALL' ? styles.filterPillActive : ''}`}
            onClick={() => setSelectedStage('ALL')}
          >
            All 4 Stages
          </button>
          {STAGES.map((s, idx) => (
            <button
              key={idx}
              className={`${styles.filterPill} ${selectedStage === s.title ? styles.filterPillActive : ''}`}
              onClick={() => setSelectedStage(s.title)}
            >
              Stage {idx + 1}
            </button>
          ))}
        </div>

        <div className={styles.searchBox}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search LLMs, RAG, PyTorch, Transformers, LoRA, vLLM..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Two Column Structured Layout */}
      <div className={styles.layout}>
        {/* Left Column: Structured Stages & Modules */}
        <div className={styles.moduleList}>
          {STAGES.filter(s => selectedStage === 'ALL' || selectedStage === s.title).map((stage, stageIdx) => {
            const stageTopics = AIML_TOPICS.filter(t => stage.topicIds.includes(t.id));
            const matchingTopics = stageTopics.filter(t => 
              t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
              t.description.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (matchingTopics.length === 0) return null;

            return (
              <div key={stageIdx} style={{ marginBottom: '1.25rem' }}>
                <div style={{ marginBottom: '0.5rem', paddingLeft: '4px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {stage.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {stage.desc}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {matchingTopics.map(topic => {
                    const isSelected = topic.id === activeTopic.id;
                    const isDone = completedTopics[topic.id];

                    return (
                      <div
                        key={topic.id}
                        className={`${styles.moduleItem} ${isSelected ? styles.moduleItemActive : ''}`}
                        onClick={() => {
                          setSelectedTopicId(topic.id);
                          setRevealedHints({});
                        }}
                      >
                        <div className={styles.itemHeader}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleComplete(topic.id);
                              }}
                              style={{ 
                                width: '18px', 
                                height: '18px', 
                                borderRadius: '50%', 
                                border: isDone ? 'none' : '1.5px solid var(--border-color)',
                                background: isDone ? '#a855f7' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                flexShrink: 0
                              }}
                            >
                              {isDone && <Check size={12} color="#000" strokeWidth={3} />}
                            </div>
                            <span className={styles.itemTitle}>{topic.title}</span>
                          </div>
                          <span className={`${styles.diffBadge} ${styles[`diff${topic.difficulty}`]}`}>
                            {topic.difficulty}
                          </span>
                        </div>
                        <div className={styles.itemDesc}>{topic.description}</div>
                        <div className={styles.itemFooter}>
                          <span><Clock size={12} style={{ display: 'inline', marginRight: 4 }} /> {topic.estimatedLearnTime} mins</span>
                          <span>{topic.interviewQuestions.length} Q&As</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Topic Viewer with Rich Markdown Formatting */}
        {activeTopic && (
          <div className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span className={`${styles.diffBadge} ${styles[`diff${activeTopic.difficulty}`]}`}>
                    {activeTopic.difficulty}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Est. Study Time: {activeTopic.estimatedLearnTime} minutes
                  </span>
                </div>
                <h2 className={styles.detailTitle}>{activeTopic.title}</h2>
                <p className={styles.detailSubtitle}>{activeTopic.description}</p>
              </div>

              <button
                type="button"
                className={styles.filterPill}
                style={{ 
                  background: completedTopics[activeTopic.id] ? 'rgba(168, 85, 247, 0.15)' : 'var(--bg-surface)', 
                  borderColor: completedTopics[activeTopic.id] ? '#a855f7' : 'var(--border-color)',
                  color: completedTopics[activeTopic.id] ? '#a855f7' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => toggleComplete(activeTopic.id)}
              >
                <CheckCircle2 size={16} />
                {completedTopics[activeTopic.id] ? 'Marked Complete' : 'Mark as Complete'}
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className={styles.tabsBar}>
              <button
                className={`${styles.tabBtn} ${activeTab === 'learn' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('learn')}
              >
                <BookOpen size={16} /> ML & AI Concept
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'notes' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('notes')}
              >
                <FileText size={16} /> Technical Notes
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'cheatsheet' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('cheatsheet')}
              >
                <Zap size={16} /> Cheat Sheet
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'interview' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('interview')}
              >
                <HelpCircle size={16} /> Interview Questions ({activeTopic.interviewQuestions.length})
              </button>
              {activeTopic.resources.length > 0 && (
                <button
                  className={`${styles.tabBtn} ${activeTab === 'resources' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('resources')}
                >
                  <ExternalLink size={16} /> Resources ({activeTopic.resources.length})
                </button>
              )}
            </div>

            {/* Tab Contents rendered with RichMarkdown */}
            <div className={styles.tabContent}>
              {activeTab === 'learn' && (
                <RichMarkdown content={activeTopic.learningContent || 'Concept notes currently being updated.'} />
              )}

              {activeTab === 'notes' && (
                <RichMarkdown content={activeTopic.fullNotes || 'In-depth notes available.'} />
              )}

              {activeTab === 'cheatsheet' && (
                <RichMarkdown content={activeTopic.cheatSheet || activeTopic.shortNotes || 'No cheat sheet available for this module.'} />
              )}

              {activeTab === 'interview' && (
                <div>
                  {activeTopic.interviewQuestions.length === 0 ? (
                    <p>No interview questions recorded for this topic yet.</p>
                  ) : (
                    activeTopic.interviewQuestions.map((q, idx) => (
                      <div key={idx} className={styles.qaItem}>
                        <div className={styles.qaQuestion}>
                          Q{idx + 1}: {q.question}
                        </div>
                        {revealedHints[idx] ? (
                          <div className={styles.qaHint}>
                            <strong style={{ display: 'block', marginBottom: '4px' }}>Model Evaluation / Answer:</strong>
                            {q.answerHint}
                          </div>
                        ) : (
                          <button
                            type="button"
                            className={styles.filterPill}
                            style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}
                            onClick={() => toggleHint(idx)}
                          >
                            👁️ Reveal Interview Answer Hint
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'resources' && (
                <div>
                  {activeTopic.resources.map((r, idx) => (
                    <a
                      key={idx}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.resourceLink}
                    >
                      <span>
                        <strong>{r.title}</strong>
                        <span style={{ marginLeft: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>[{r.type}]</span>
                      </span>
                      <ExternalLink size={16} color="#a855f7" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Module Stepper */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
              {prevTopic ? (
                <button
                  type="button"
                  className={styles.filterPill}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                  onClick={() => {
                    setSelectedTopicId(prevTopic.id);
                    setRevealedHints({});
                  }}
                >
                  <ChevronLeft size={16} /> Previous: {prevTopic.title}
                </button>
              ) : <div />}

              {nextTopic && (
                <button
                  type="button"
                  className={styles.filterPillActive}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                  onClick={() => {
                    setSelectedTopicId(nextTopic.id);
                    setRevealedHints({});
                  }}
                >
                  Next: {nextTopic.title} <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
