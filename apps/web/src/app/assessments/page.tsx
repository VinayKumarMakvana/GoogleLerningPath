"use client";

import React, { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { assessmentApi, Assessment, AssessmentAttempt } from '@/services/assessmentApi';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Clock, BookOpen, Activity, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function AssessmentsDashboard() {
  const router = useRouter();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [history, setHistory] = useState<AssessmentAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assessmentsRes, historyRes] = await Promise.all([
          assessmentApi.getAssessments(),
          assessmentApi.getHistory()
        ]);
        setAssessments(assessmentsRes);
        setHistory(historyRes);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getLatestAttempt = (assessmentId: string) => {
    return history.find(h => h.assessmentId === assessmentId);
  };

  return (
    <div className={styles.container}>
      <PageHeader 
        title="Assessments" 
        description="Test your DSA knowledge under timed conditions. Results automatically feed into your weakness engine."
      />

      {loading ? (
        <div className={styles.loading}>Loading assessments...</div>
      ) : (
        <div className={styles.grid}>
          {assessments.map(assessment => {
            const latest = getLatestAttempt(assessment.id);
            const isCompleted = latest?.status === 'SUBMITTED' || latest?.status === 'TIMED_OUT';
            const inProgress = latest?.status === 'IN_PROGRESS';

            return (
              <Card key={assessment.id} className={styles.assessmentCard}>
                <CardContent>
                  <div className={styles.cardHeader}>
                    <Badge variant={assessment.difficulty === 'EASY' ? 'success' : 'warning'}>
                      {assessment.difficulty}
                    </Badge>
                    <Badge variant="outline">{assessment.type}</Badge>
                  </div>
                  
                  <h3 className={styles.title}>{assessment.title}</h3>
                  <p className={styles.description}>{assessment.description}</p>
                  
                  <div className={styles.meta}>
                    <div className={styles.metaItem}>
                      <Clock size={16} /> {assessment.duration} mins
                    </div>
                    <div className={styles.metaItem}>
                      <BookOpen size={16} /> {assessment._count?.problems || 0} Problems
                    </div>
                  </div>

                  <div className={styles.actionArea}>
                    {isCompleted ? (
                      <div className={styles.completedInfo}>
                        <div className={styles.scoreRow}>
                          <span className={styles.scoreLabel}>Latest Score</span>
                          <span className={styles.scoreValue}>{latest.score?.toFixed(0)}%</span>
                        </div>
                        <div className={styles.buttons}>
                          <Button variant="outline" onClick={() => router.push(`/assessments/${assessment.id}/result`)} size="sm">
                            View Result
                          </Button>
                          <Button variant="secondary" onClick={() => router.push(`/assessments/${assessment.id}`)} size="sm">
                            Retake
                          </Button>
                        </div>
                      </div>
                    ) : inProgress ? (
                      <div className={styles.completedInfo}>
                        <span className={styles.inProgressText}><Activity size={16} /> In Progress</span>
                        <Button variant="primary" onClick={() => router.push(`/assessments/${assessment.id}/attempt`)} size="sm">
                          Resume
                        </Button>
                      </div>
                    ) : (
                      <Button variant="primary" className={styles.startButton} onClick={() => router.push(`/assessments/${assessment.id}`)}>
                        Start Assessment <ArrowRight size={16} />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
