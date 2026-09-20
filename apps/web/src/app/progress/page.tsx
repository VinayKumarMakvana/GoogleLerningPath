"use client";

import React, { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { progressApi, ProgressIntelligence, RevisionRecommendation } from '@/services/progressApi';
import { Loader2, TrendingUp, BookOpen, Target, Clock, Zap, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function ProgressPage() {
  const router = useRouter();
  const [intel, setIntel] = useState<ProgressIntelligence | null>(null);
  const [revision, setRevision] = useState<RevisionRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const [intelRes, revRes] = await Promise.all([
          progressApi.getIntelligence(),
          progressApi.getRevisionQueue()
        ]);
        setIntel(intelRes);
        setRevision(revRes);
      } catch (error) {
        console.error('Failed to fetch progress intelligence:', error);
      } finally {
        setLoading(false);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchProgress();
  }, []);

  if (loading || !intel) {
    return (
      <div className={styles.container}>
        <PageHeader title="Progress Intelligence" />
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <Loader2 className={styles.spin} /> Loading intelligence data...
        </div>
      </div>
    );
  }

  const completionRate = intel.curriculum.totalTopics > 0 
    ? Math.round((intel.curriculum.completedTopics / intel.curriculum.totalTopics) * 100) 
    : 0;

  return (
    <div className={styles.container}>
      <PageHeader 
        title="Progress Intelligence" 
        description="Factual insights into your learning, practice, and mastery." 
      />

      <div className={styles.dashboardGrid}>
        {/* Main Column */}
        <div className={styles.mainCol}>
          <section>
            <h2 className={styles.sectionTitle}><TrendingUp size={20} /> Learning Overview</h2>
            <div className={styles.statsRow}>
              <Card className={styles.statCard}>
                <CardContent>
                  <div className={styles.statLabel}>Curriculum</div>
                  <div className={styles.statValue}>{completionRate}%</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {intel.curriculum.completedTopics} / {intel.curriculum.totalTopics} topics
                  </div>
                </CardContent>
              </Card>
              <Card className={styles.statCard}>
                <CardContent>
                  <div className={styles.statLabel}>DSA Solved</div>
                  <div className={styles.statValue}>{intel.practice.solvedProblems}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    of {intel.practice.totalProblems} total
                  </div>
                </CardContent>
              </Card>
              <Card className={styles.statCard}>
                <CardContent>
                  <div className={styles.statLabel}>Avg Score</div>
                  <div className={styles.statValue}>{intel.assessment.averageScore.toFixed(0)}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    in {intel.assessment.completed} assessments
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className={styles.sectionTitle}><Clock size={20} /> Revision Engine</h2>
            {revision.length === 0 ? (
              <Card>
                <CardContent style={{ textAlign: 'center', padding: '2rem' }}>
                  Your revision queue is empty. Great job staying up to date!
                </CardContent>
              </Card>
            ) : (
              <div className={styles.revisionList}>
                {revision.slice(0, 5).map(rev => (
                  <Card key={rev.id} className={styles.revisionCard} onClick={() => router.push(rev.url)}>
                    <CardContent style={{ padding: '1.25rem' }}>
                      <div className={styles.revisionHeader}>
                        <h4>{rev.title}</h4>
                        <Badge variant={rev.priority === 1 ? 'error' : 'warning'}>Priority {rev.priority}</Badge>
                      </div>
                      <div className={styles.revisionReason}>
                        <strong>Why?</strong> {rev.reason}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className={styles.sectionTitle}><Activity size={20} /> Recent Activity</h2>
            <div className={styles.activityList}>
              {intel.recentActivity.map(act => (
                <div key={act.id} className={styles.activityItem}>
                  <div className={styles.activityTitle}>{act.title}</div>
                  <div className={styles.activityMeta}>
                    <Badge variant={act.status === 'SOLVED' ? 'success' : act.status === 'FAILED' ? 'error' : 'outline'}>
                      {act.status}
                    </Badge>
                    <span>{new Date(act.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
              {intel.recentActivity.length === 0 && <div>No recent activity.</div>}
            </div>
          </section>
        </div>

        {/* Side Column */}
        <div className={styles.sideCol}>
          <section>
            <h2 className={styles.sectionTitle}><Zap size={20} /> DSA Mastery</h2>
            <Card>
              <CardContent className={styles.masteryBars}>
                <div className={styles.masteryRow}>
                  <span className={styles.masteryLabel}>Mastered</span>
                  <Badge variant="success">{intel.patternMastery.MASTERED}</Badge>
                </div>
                <div className={styles.masteryRow}>
                  <span className={styles.masteryLabel}>Review Needed</span>
                  <Badge variant="error">{intel.patternMastery.REVIEW}</Badge>
                </div>
                <div className={styles.masteryRow}>
                  <span className={styles.masteryLabel}>Practicing</span>
                  <Badge variant="warning">{intel.patternMastery.PRACTICING}</Badge>
                </div>
                <div className={styles.masteryRow}>
                  <span className={styles.masteryLabel}>Learning</span>
                  <Badge variant="outline">{intel.patternMastery.LEARNING}</Badge>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className={styles.sectionTitle}><Target size={20} /> Study Plans</h2>
            <Card>
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span>Completed Plans</span>
                  <strong>{intel.studyPlans.completed}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span>Missed/Partial</span>
                  <strong>{intel.studyPlans.missed}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <span>Total Generated</span>
                  <strong>{intel.studyPlans.total}</strong>
                </div>
              </CardContent>
            </Card>
          </section>
          
          <section>
            <h2 className={styles.sectionTitle}><BookOpen size={20} /> Quick Stats</h2>
            <Card>
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span>Recent Accuracy</span>
                  <strong>{intel.recentAccuracy.toFixed(0)}%</strong>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
