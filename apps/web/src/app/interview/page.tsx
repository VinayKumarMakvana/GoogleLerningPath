"use client";

import React, { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { interviewApi, InterviewReadiness, AdaptiveTask, ReadinessArea } from '@/services/interviewApi';
import { Loader2, Target, Briefcase, Zap, ShieldAlert, Crosshair, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const RenderAreaCard = ({ title, area, icon: Icon }: { title: string; area: ReadinessArea; icon: React.ElementType }) => (
  <Card className={styles.areaCard}>
    <CardContent style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className={styles.areaHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Icon size={20} color="var(--primary-color)" />
          <span className={styles.areaTitle}>{title}</span>
        </div>
        <span className={styles.areaScore}>{area.score}%</span>
      </div>
      <div className={styles.areaDetail}>
        <strong>Strengths:</strong> <span style={{ color: 'var(--success-color)' }}>{area.strengths}</span>
      </div>
      <div className={styles.areaDetail}>
        <strong>Gaps:</strong> <span style={{ color: 'var(--error-color)' }}>{area.gaps}</span>
      </div>
      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
        <strong>Next Action:</strong> {area.recommendedAction}
      </div>
    </CardContent>
  </Card>
);

export default function InterviewHub() {
  const router = useRouter();
  const [readiness, setReadiness] = useState<InterviewReadiness | null>(null);
  const [queue, setQueue] = useState<AdaptiveTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        const [readRes, queueRes] = await Promise.all([
          interviewApi.getReadiness(),
          interviewApi.getAdaptiveQueue()
        ]);
        setReadiness(readRes);
        setQueue(queueRes);
      } catch (error) {
        console.error('Failed to fetch interview data:', error);
      } finally {
        setLoading(false);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchInterviewData();
  }, []);

  const handleGenerateMock = async () => {
    setGenerating(true);
    try {
      const session = await interviewApi.generateMockSession({ difficulty: 'MEDIUM' });
      router.push(`/interview/${session.sessionId}`);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  if (loading || !readiness) {
    return (
      <div className={styles.container}>
        <PageHeader title="Adaptive Interview Hub" />
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <Loader2 className={styles.spin} /> Analyzing readiness evidence...
        </div>
      </div>
    );
  }

  // RenderAreaCard extracted above

  return (
    <div className={styles.container}>
      <PageHeader 
        title="Adaptive Interview Hub" 
        description="Factual readiness indicators based on your practice, mastery, and assessment history." 
      />

      <div className={styles.dashboardGrid}>
        {/* Main Column */}
        <div className={styles.mainCol}>
          <section>
            <h2 className={styles.sectionTitle}><Briefcase size={20} /> Readiness Breakdown</h2>
            <div className={styles.areasGrid}>
              <RenderAreaCard title="DSA Mastery" area={readiness.dsa} icon={Zap} />
              <RenderAreaCard title="CS Fundamentals" area={readiness.fundamentals} icon={Target} />
              <RenderAreaCard title="Problem Solving" area={readiness.problemSolving} icon={Crosshair} />
              <RenderAreaCard title="Mock Experience" area={readiness.interviewPractice} icon={Briefcase} />
            </div>
          </section>

          <section>
            <h2 className={styles.sectionTitle}><ShieldAlert size={20} /> Adaptive Prep Queue</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              We prioritize filling your evidence gaps before suggesting mock interviews. 
              Clear overdue reviews and weak patterns first to maximize mock utility.
            </p>
            {queue.length === 0 ? (
              <Card>
                <CardContent style={{ textAlign: 'center', padding: '2rem' }}>
                  No immediate gaps found. You are ready to generate a mock interview!
                </CardContent>
              </Card>
            ) : (
              <div className={styles.queueList}>
                {queue.map((task, idx) => (
                  <Card key={idx} className={styles.queueCard} onClick={() => router.push(task.url)}>
                    <CardContent style={{ padding: '1.25rem' }}>
                      <div className={styles.queueHeader}>
                        <h4>{task.title}</h4>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <Badge variant={task.priority === 1 ? 'error' : task.priority === 4 ? 'success' : 'warning'}>
                            Priority {task.priority}
                          </Badge>
                          <ArrowRight size={16} color="var(--primary-color)" />
                        </div>
                      </div>
                      <div className={styles.queueReason}>
                        <strong>Evidence:</strong> {task.reason}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Side Column */}
        <div className={styles.sideCol}>
          <section>
            <h2 className={styles.sectionTitle}><Crosshair size={20} /> Action Center</h2>
            <Card>
              <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  Ready to test yourself under pressure? Generate a timed, randomized mock interview using your mastered topics.
                </p>
                <Button 
                  onClick={handleGenerateMock} 
                  disabled={generating || readiness.dsa.score < 10} 
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {generating ? 'Generating...' : 'Start Mock Session'}
                </Button>
                {readiness.dsa.score < 10 && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--error-color)', textAlign: 'center' }}>
                    Requires at least 10% DSA Mastery to unlock mock sessions.
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
