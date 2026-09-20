"use client";

import React, { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { plannerApi, DailyPlan, DailyPlanTask } from '@/services/plannerApi';
import { Clock, CheckCircle, Target, Loader2, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function StudyPlanPage() {
  const router = useRouter();
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState<number>(180);
  const [generating, setGenerating] = useState(false);

  const fetchPlan = async () => {
    setLoading(true);
    try {
      const p = await plannerApi.getTodayPlan();
      setPlan(p);
      if (p) setBudget(p.targetTime);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPlan();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const p = await plannerApi.generatePlan(budget);
      setPlan(p);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const handleComplete = async (taskId: string) => {
    try {
      await plannerApi.completeTask(taskId);
      await fetchPlan(); // reload
    } catch (e) {
      console.error(e);
    }
  };

  const getTaskAction = (task: DailyPlanTask) => {
    if (task.status === 'COMPLETED') return null;
    
    let url = '/practice';
    if (task.entitySlug && task.entitySlug.startsWith('/')) {
      url = task.entitySlug;
    } else if (task.type === 'LEARN_TOPIC') {
      url = '/learn';
    } else if (task.type === 'INTERVIEW_PRACTICE') {
      url = '/interview';
    } else if (task.type === 'REVISE_NOTES') {
      url = '/topics';
    }
    
    return (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="outline" size="sm" onClick={() => router.push(url)}>
          <Play size={14} style={{ marginRight: '4px' }} /> Go
        </Button>
        <Button variant="primary" size="sm" onClick={() => handleComplete(task.id)}>
          Mark Done
        </Button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <PageHeader title="Today's Study Plan" />
        <div style={{ textAlign: 'center', padding: '3rem' }}><Loader2 className={styles.spin} /> Loading Plan...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <PageHeader 
          title="Today's Study Plan" 
          description="Your adaptive, priority-based daily tasks."
        />
        <div className={styles.controls}>
          <select 
            className={styles.select} 
            value={budget} 
            onChange={(e) => setBudget(Number(e.target.value))}
          >
            <option value={30}>30 mins</option>
            <option value={60}>60 mins</option>
            <option value={90}>90 mins</option>
            <option value={120}>120 mins</option>
            <option value={180}>180 mins</option>
          </select>
          <Button variant="outline" onClick={handleGenerate} disabled={generating}>
            {generating ? 'Generating...' : 'Regenerate Plan'}
          </Button>
        </div>
      </div>

      {!plan || plan.tasks.length === 0 ? (
        <Card>
          <CardContent style={{ textAlign: 'center', padding: '3rem' }}>
            <Target size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
            <h3>No Active Plan</h3>
            <p>Generate a new study plan based on your current data.</p>
            <Button onClick={handleGenerate} disabled={generating} style={{ marginTop: '1rem' }}>
              Generate {budget} min Plan
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className={styles.statsRow}>
            <Card className={styles.statCard}>
              <CardContent>
                <div className={styles.statLabel}>Target Budget</div>
                <div className={styles.statValue}>{plan.targetTime}m</div>
              </CardContent>
            </Card>
            <Card className={styles.statCard}>
              <CardContent>
                <div className={styles.statLabel}>Planned Time</div>
                <div className={styles.statValue}>{plan.plannedTime}m</div>
              </CardContent>
            </Card>
            <Card className={styles.statCard}>
              <CardContent>
                <div className={styles.statLabel}>Completed Time</div>
                <div className={styles.statValue} style={{ color: 'var(--success-color)' }}>{plan.completedTime}m</div>
              </CardContent>
            </Card>
          </div>

          <div className={styles.taskList}>
            {plan.tasks.map(task => (
              <Card key={task.id} className={`${styles.taskCard} ${task.status === 'COMPLETED' ? styles.completedTask : ''}`}>
                <CardContent className={styles.taskContent}>
                  <div className={styles.taskInfo}>
                    <div className={styles.taskTitleRow}>
                      {task.status === 'COMPLETED' ? <CheckCircle size={20} color="var(--success-color)" /> : <Clock size={20} color="var(--text-secondary)" />}
                      <h3>{task.title}</h3>
                      <Badge variant="secondary" size="sm">{task.estimatedMinutes}m</Badge>
                      <Badge variant="outline" size="sm">{task.type.replace(/_/g, ' ')}</Badge>
                    </div>
                    <div className={styles.taskReason}>
                      <strong>Why?</strong> {task.reason}
                    </div>
                  </div>
                  <div className={styles.taskActions}>
                    {getTaskAction(task)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
