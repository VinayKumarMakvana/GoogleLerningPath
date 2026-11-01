"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  ChevronDown, 
  ChevronRight, 
  Clock, 
  Target, 
  Video, 
  Compass, 
  MapPin, 
  BookOpen, 
  CheckCircle2, 
  Layers,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { PHASE_ROADMAP_GUIDES } from '@/data/phaseRoadmapData';
import styles from './RoadmapViewer.module.css';

interface Topic {
  id: string;
  title: string;
  difficulty: string;
  priority: string;
  estimatedLearnTime: number;
  estimatedPracticeTime: number;
}

interface Skill {
  id: string;
  title: string;
  topics: Topic[];
}

interface Module {
  id: string;
  title: string;
  skills: Skill[];
}

interface Phase {
  id: string;
  title: string;
  order: number;
  modules: Module[];
}

interface RoadmapViewerProps {
  roadmap: {
    title: string;
    description: string;
    phases: Phase[];
  };
}

export function RoadmapViewer({ roadmap }: RoadmapViewerProps) {
  // Keep Phase 0 and Phase 1 expanded by default
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    if (roadmap?.phases?.length) {
      initial[roadmap.phases[0].id] = true;
      if (roadmap.phases[1]) initial[roadmap.phases[1].id] = true;
    }
    return initial;
  });

  const togglePhase = (id: string) => {
    setExpandedPhases(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    roadmap.phases.forEach(p => { all[p.id] = true; });
    setExpandedPhases(all);
  };

  const collapseAll = () => {
    setExpandedPhases({});
  };

  const allExpanded = roadmap.phases.length > 0 && roadmap.phases.every(p => expandedPhases[p.id]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'MUST_HAVE': return 'error';
      case 'HIGH_VALUE': return 'primary';
      case 'ADVANCED': return 'warning';
      default: return 'default';
    }
  };

  const totalTopics = roadmap.phases.reduce((acc, p) => 
    acc + p.modules.reduce((mAcc, m) => 
      mAcc + m.skills.reduce((sAcc, s) => sAcc + s.topics.length, 0), 0), 0);

  return (
    <div className={styles.roadmapViewer}>
      {/* Master Executive Hero Banner */}
      <div className={styles.roadmapHero}>
        <span className={styles.heroBadge}>
          <Compass size={14} /> Master Engineering Roadmap • Target: Google L5
        </span>
        <h1 className={styles.heroTitle}>The Complete Google SWE Engineering Roadmap</h1>
        <p className={styles.heroSubtitle}>
          An authoritative 13-stage journey designed to take you from foundational memory mechanics to distributed systems, AI/ML, and bar-raiser onsite interviews. Follow the strategic roadmap guide below, study the architectural diagrams, and master each topic step by step.
        </p>

        {/* Visual Progression Timeline */}
        <div className={styles.timelineTrack}>
          {roadmap.phases.map(p => {
            const guide = PHASE_ROADMAP_GUIDES[p.order];
            return (
              <div 
                key={p.id} 
                className={styles.timelineNode}
                onClick={() => {
                  setExpandedPhases(prev => ({ ...prev, [p.id]: true }));
                  const el = document.getElementById(`phase-card-${p.id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className={styles.timelineStep}>Phase {p.order}</span>
                <span className={styles.timelineLabel}>{guide ? guide.category : p.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls Bar */}
      <div className={styles.controlsBar}>
        <span className={styles.progressInfo}>
          <strong>{roadmap.phases.length} Phases</strong> • {totalTopics} Master Curriculum Topics with Verified Video Lectures
        </span>
        <button 
          className={styles.toggleAllBtn}
          onClick={allExpanded ? collapseAll : expandAll}
        >
          {allExpanded ? 'Collapse All Phases' : 'Expand All Phases'}
        </button>
      </div>

      {/* 13 Phases Accordion List */}
      {roadmap.phases.map(phase => {
        const guide = PHASE_ROADMAP_GUIDES[phase.order];
        const phaseTopicCount = phase.modules.reduce((mAcc, m) => 
          mAcc + m.skills.reduce((sAcc, s) => sAcc + s.topics.length, 0), 0);
        const phaseModuleCount = phase.modules.length;
        const isExpanded = !!expandedPhases[phase.id];

        return (
          <Card key={phase.id} id={`phase-card-${phase.id}`} className={styles.phaseCard}>
            {/* Header */}
            <div 
              className={styles.phaseHeader} 
              onClick={() => togglePhase(phase.id)}
            >
              <div className={styles.phaseTitleWrapper}>
                {isExpanded ? <ChevronDown size={22} color="var(--accent-blue)" /> : <ChevronRight size={22} color="var(--text-muted)" />}
                <h2 className={styles.phaseTitle}>{phase.title}</h2>
              </div>

              <div className={styles.phaseMetaRow}>
                {guide && (
                  <span className={styles.durationBadge}>
                    <Clock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }} />
                    {guide.durationWeeks}
                  </span>
                )}
                <span className={styles.phaseBadge}>
                  {phaseModuleCount} {phaseModuleCount === 1 ? 'Module' : 'Modules'} • {phaseTopicCount} Topics
                </span>
              </div>
            </div>

            {/* Expanded Phase Content */}
            {isExpanded && (
              <div className={styles.phaseContent}>
                {/* 1. ROADMAP GUIDE & HOW TO STUDY (DIAGRAM & STRATEGY) */}
                {guide && (
                  <div className={styles.roadmapGuideBox}>
                    <h3 className={styles.guideSectionTitle}>
                      <MapPin size={16} /> Phase Roadmap: Kese & Kya Padhna He (Strategy & Guidance)
                    </h3>
                    
                    <div>
                      <p className={styles.objectiveText}>
                        <strong>Phase Objective:</strong> {guide.objective}
                      </p>
                    </div>

                    <div>
                      <strong style={{ fontSize: '0.85rem', color: '#f8fafc', display: 'block', marginBottom: '6px' }}>
                        Step-by-Step Study Strategy:
                      </strong>
                      <ol className={styles.strategyList}>
                        {guide.studyStrategy.map((step, idx) => (
                          <li key={idx} className={styles.strategyItem}>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Architecture Diagram */}
                    <div className={styles.diagramBox}>
                      <span className={styles.diagramLabel}>
                        <Layers size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                        Phase Architectural Flow Diagram:
                      </span>
                      <pre className={styles.diagramPre}>{guide.architectureDiagram}</pre>
                    </div>

                    {/* Completion Milestone Gate */}
                    <div className={styles.milestoneBox}>
                      <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong>Milestone Gate (Complete before advancing):</strong>
                        <div>{guide.milestone}</div>
                      </div>
                    </div>

                    {/* Key Skills */}
                    <div className={styles.skillsPillRow}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Core Skills:</span>
                      {guide.keySkills.map((sk, idx) => (
                        <span key={idx} className={styles.skillPill}>{sk}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. CURRICULUM MODULES & VERIFIED RESOURCES (PLACED AFTER THE ROADMAP GUIDE) */}
                <div className={styles.curriculumDivider}>
                  <div className={styles.dividerLine} />
                  <span className={styles.dividerText}>Curriculum Modules & Video Resources</span>
                  <div className={styles.dividerLine} />
                </div>

                {phase.modules.map(mod => (
                  <div key={mod.id} className={styles.moduleSection}>
                    <h3 className={styles.moduleTitle}>{mod.title}</h3>
                    <div className={styles.skillsGrid}>
                      {mod.skills.map(skill => (
                        <div key={skill.id} className={styles.skillBox}>
                          <h4 className={styles.skillTitle}>{skill.title}</h4>
                          <ul className={styles.topicList}>
                            {skill.topics.map(topic => (
                              <Link href={`/topics/${topic.id}`} key={topic.id} style={{ textDecoration: 'none' }}>
                                <li className={styles.topicItem}>
                                  <div className={styles.topicMain}>
                                    <span className={styles.topicTitleText}>{topic.title}</span>
                                    <Badge variant={getPriorityColor(topic.priority) as "default" | "error" | "primary" | "warning"}>
                                      {topic.priority ? topic.priority.replace('_', ' ') : 'CORE'}
                                    </Badge>
                                  </div>
                                  <div className={styles.topicMeta}>
                                    <span>
                                      <Clock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }} /> 
                                      {(topic.estimatedLearnTime || 45) + (topic.estimatedPracticeTime || 45)} min
                                    </span>
                                    <span>
                                      <Target size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }} /> 
                                      {topic.difficulty || 'INTERMEDIATE'}
                                    </span>
                                    <span className={styles.videoBadge}>
                                      <Video size={11} /> Video Lecture
                                    </span>
                                    <span style={{ marginLeft: 'auto', color: 'var(--accent-blue)', display: 'inline-flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                                      Study Topic <ArrowRight size={12} />
                                    </span>
                                  </div>
                                </li>
                              </Link>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
