"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ChevronDown, ChevronRight, Clock, Target, AlertCircle } from 'lucide-react';
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
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({});

  const togglePhase = (id: string) => {
    setExpandedPhases(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'MUST_HAVE': return 'error';
      case 'HIGH_VALUE': return 'primary';
      case 'ADVANCED': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className={styles.roadmapViewer}>
      {roadmap.phases.map(phase => (
        <Card key={phase.id} className={styles.phaseCard}>
          <div 
            className={styles.phaseHeader} 
            onClick={() => togglePhase(phase.id)}
          >
            <div className={styles.phaseTitleWrapper}>
              {expandedPhases[phase.id] ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
              <h2 className={styles.phaseTitle}>{phase.title}</h2>
            </div>
          </div>
          
          {expandedPhases[phase.id] && (
            <div className={styles.phaseContent}>
              {phase.modules.map(mod => (
                <div key={mod.id} className={styles.moduleSection}>
                  <h3 className={styles.moduleTitle}>{mod.title}</h3>
                  <div className={styles.skillsGrid}>
                    {mod.skills.map(skill => (
                      <div key={skill.id} className={styles.skillBox}>
                        <h4 className={styles.skillTitle}>{skill.title}</h4>
                        <ul className={styles.topicList}>
                          {skill.topics.map(topic => (
                            <li key={topic.id} className={styles.topicItem}>
                              <div className={styles.topicMain}>
                                <span>{topic.title}</span>
                                <Badge variant={getPriorityColor(topic.priority) as any}>
                                  {topic.priority.replace('_', ' ')}
                                </Badge>
                              </div>
                              <div className={styles.topicMeta}>
                                <Clock size={12} /> {topic.estimatedLearnTime + topic.estimatedPracticeTime} min
                                <Target size={12} style={{ marginLeft: '8px' }}/> {topic.difficulty}
                              </div>
                            </li>
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
      ))}
    </div>
  );
}
