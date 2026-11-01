"use client";

import React, { useState, useMemo } from 'react';
import { 
  Network, 
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
  Layers,
  Check
} from 'lucide-react';
import { SYSTEM_DESIGN_TOPICS, SystemDesignTopic } from '@/data/systemDesignData';
import { RichMarkdown } from '@/components/shared/RichMarkdown';
import styles from './page.module.css';

const STAGES = [
  {
    title: 'Stage 1: Foundations & Estimation',
    desc: 'Core client-server architecture, back-of-the-envelope math, and API design.',
    topicIds: ['sd_01_fund', 'sd_02_req', 'sd_03_api']
  },
  {
    title: 'Stage 2: Storage, Caching & Scalability',
    desc: 'Database choices, Redis caching patterns, load balancers, and sharding.',
    topicIds: ['sd_04_db', 'sd_05_cache', 'sd_06_load', 'sd_07_shard']
  },
  {
    title: 'Stage 3: Distributed Systems & Event Architecture',
    desc: 'CAP theorem, distributed consensus (Raft), Kafka message queues, and microservices.',
    topicIds: ['sd_08_cap', 'sd_09_msg', 'sd_10_arch']
  },
  {
    title: 'Stage 4: Flagship Case Studies & Interview Playbook',
    desc: 'High-Level Design (TinyURL, Feed, WhatsApp, Rate Limiters), LLD, and FAANG frameworks.',
    topicIds: ['sd_11_hld', 'sd_12_lld', 'sd_13_interview']
  }
];

export default function SystemDesignPage() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(SYSTEM_DESIGN_TOPICS[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'learn' | 'notes' | 'cheatsheet' | 'interview' | 'resources'>('learn');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({
    'sd_01_fund': true,
    'sd_02_req': true,
    'sd_05_cache': true
  });

  const activeTopic = useMemo(() => {
    return SYSTEM_DESIGN_TOPICS.find(t => t.id === selectedTopicId) || SYSTEM_DESIGN_TOPICS[0];
  }, [selectedTopicId]);

  const currentIndex = SYSTEM_DESIGN_TOPICS.findIndex(t => t.id === activeTopic.id);
  const prevTopic = currentIndex > 0 ? SYSTEM_DESIGN_TOPICS[currentIndex - 1] : null;
  const nextTopic = currentIndex < SYSTEM_DESIGN_TOPICS.length - 1 ? SYSTEM_DESIGN_TOPICS[currentIndex + 1] : null;

  const toggleHint = (idx: number) => {
    setRevealedHints(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleComplete = (id: string) => {
    setCompletedTopics(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / SYSTEM_DESIGN_TOPICS.length) * 100);

  return (
    <div className={styles.container}>
      {/* Hero Header */}
      <div className={styles.heroHeader}>
        <div className={styles.heroTopRow}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>
              <Network size={14} /> High-Scale Distributed Systems
            </span>
            <h1 className={styles.heroTitle}>System Design & Architecture Masterclass</h1>
            <p className={styles.heroSubtitle}>
              Structured 4-stage engineering roadmap designed for senior Google L5/L6 bar-raiser interview readiness.
            </p>
          </div>
          
          <div className={styles.heroProgressCard}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Curriculum Progress: {completedCount}/{SYSTEM_DESIGN_TOPICS.length} Completed ({progressPercent}%)</span>
            <div style={{ width: '100%', maxWidth: '220px', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #0070f3, #00dfd8)', borderRadius: '4px', transition: 'width 0.3s ease' }} />
            </div>
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>4 Stages</span>
            <span className={styles.statLabel}>Learning Path</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>13 Modules</span>
            <span className={styles.statLabel}>Architectural Concepts</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>FAANG L5</span>
            <span className={styles.statLabel}>Target Readiness</span>
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
            placeholder="Search systems, caching, sharding, case studies..."
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
            const stageTopics = SYSTEM_DESIGN_TOPICS.filter(t => stage.topicIds.includes(t.id));
            const matchingTopics = stageTopics.filter(t => 
              t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
              t.description.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (matchingTopics.length === 0) return null;

            return (
              <div key={stageIdx} style={{ marginBottom: '1.25rem' }}>
                <div style={{ marginBottom: '0.5rem', paddingLeft: '4px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
                                background: isDone ? '#00dfd8' : 'transparent',
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
                  background: completedTopics[activeTopic.id] ? 'rgba(0, 223, 216, 0.15)' : 'var(--bg-surface)', 
                  borderColor: completedTopics[activeTopic.id] ? '#00dfd8' : 'var(--border-color)',
                  color: completedTopics[activeTopic.id] ? '#00dfd8' : 'var(--text-secondary)',
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
                <BookOpen size={16} /> Architectural Concept
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'notes' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('notes')}
              >
                <FileText size={16} /> In-Depth Notes
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
                            <strong style={{ display: 'block', marginBottom: '4px' }}>Bar Raiser Framework Answer:</strong>
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
                      <ExternalLink size={16} color="var(--accent-blue)" />
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
