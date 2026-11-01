'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import styles from './page.module.css';

export default function LearnClient({ groupedTopics }: { groupedTopics: Record<string, any[]> }) {
  const trackNames = Object.keys(groupedTopics).sort();
  
  const defaultTrack = trackNames.includes('Backend Engineering') 
    ? 'Backend Engineering' 
    : trackNames[0];

  const [activeTrack, setActiveTrack] = useState<string>(defaultTrack || '');

  if (trackNames.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
        <p>No curriculum tracks available.</p>
      </div>
    );
  }

  const activeTopics = groupedTopics[activeTrack] || [];
  const completedCount = activeTopics.filter((t: any) => t.progress === 'COMPLETED').length;
  const totalEstTime = activeTopics.reduce((acc: number, t: any) => acc + (t.estimatedLearnTime || 45), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Track Selection Pills */}
      <div className={styles.trackBar}>
        {trackNames.map(trackName => (
          <button
            key={trackName}
            onClick={() => setActiveTrack(trackName)}
            className={`${styles.trackPill} ${activeTrack === trackName ? styles.trackPillActive : ''}`}
          >
            {trackName}
          </button>
        ))}
      </div>

      {/* Active Track Header Banner */}
      <div className={styles.trackBanner}>
        <div>
          <h2 className={styles.trackTitle}>{activeTrack}</h2>
          <div className={styles.trackMeta}>
            <span><BookOpen size={14} style={{ display: 'inline', marginRight: 4 }} /> {activeTopics.length} Core Modules</span>
            <span>•</span>
            <span><Clock size={14} style={{ display: 'inline', marginRight: 4 }} /> ~{Math.round(totalEstTime / 60)} Hours Total</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Track Progress: {completedCount}/{activeTopics.length} Done
          </span>
        </div>
      </div>

      {/* Topics Grid */}
      <div className={styles.topicGrid}>
        {activeTopics.map((topic: any) => {
          const isDone = topic.progress === 'COMPLETED';
          const diff = topic.difficulty || 'BEGINNER';

          return (
            <Link href={`/topics/${topic.id}`} key={topic.id} className={styles.topicCard}>
              <div className={styles.topicCardHeader}>
                <div className={styles.topicCardTitle}>{topic.title}</div>
                {isDone ? (
                  <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                    <CheckCircle2 size={15} /> Done
                  </span>
                ) : (
                  <span className={`${styles.diffBadge} ${styles[`diff${diff}`]}`}>
                    {diff}
                  </span>
                )}
              </div>

              <div className={styles.topicCardDesc}>
                {topic.description || 'Master core principles, memory layouts, algorithmic complexity, and standard library primitives.'}
              </div>

              <div className={styles.topicCardFooter}>
                <span>
                  <Clock size={13} style={{ display: 'inline', marginRight: 4 }} />
                  {topic.estimatedLearnTime || 45} mins
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-blue)', fontWeight: 600 }}>
                  Start Module <ChevronRight size={14} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
