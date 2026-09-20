"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { assessmentApi, AssessmentAttempt } from '@/services/assessmentApi';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Target, Clock, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import styles from './page.module.css';

export default function AssessmentResultPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [attempt, setAttempt] = useState<AssessmentAttempt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        // Find the latest attempt for this assessment. 
        // Wait, getActiveAttempt returns IN_PROGRESS, but if submitted, it might throw or return null.
        // Actually, we can fetch the history and find the most recent one for this assessment ID.
        const history = await assessmentApi.getHistory();
        const latest = history.find(h => h.assessmentId === id);
        
        if (latest) {
          // fetch full attempt details
          const full = await assessmentApi.getAttempt(latest.id);
          setAttempt(full);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchAttempt();
  }, [id]);

  if (loading) return <div className={styles.loading}>Loading results...</div>;
  if (!attempt || attempt.status === 'IN_PROGRESS') {
    return (
      <div className={styles.error}>
        <h2>No completed assessment found.</h2>
        <Button variant="primary" onClick={() => router.push(`/assessments/${id}`)}>Go to Assessment</Button>
      </div>
    );
  }

  const assessment = attempt.assessment!;
  const results = attempt.results || [];
  
  let solved = 0;
  let failed = 0;
  
  results.forEach(r => {
    if (r.status === 'SOLVED') solved++;
    else failed++;
  });

  const unanswered = (assessment.problems?.length || 0) - solved - failed;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => router.push('/assessments')}>
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className={styles.header}>
        <h1>{assessment.title} - Results</h1>
        <Badge variant={attempt.status === 'TIMED_OUT' ? 'error' : 'success'}>
          {attempt.status.replace('_', ' ')}
        </Badge>
      </div>

      <div className={styles.scoreGrid}>
        <Card className={styles.scoreCard}>
          <CardContent className={styles.scoreContent}>
            <Target size={32} className={styles.scoreIcon} />
            <div className={styles.scoreValue}>{attempt.score?.toFixed(0)}%</div>
            <div className={styles.scoreLabel}>Final Score</div>
          </CardContent>
        </Card>
        
        <Card className={styles.scoreCard}>
          <CardContent className={styles.scoreContent}>
            <CheckCircle2 size={32} className={styles.scoreIconSuccess} />
            <div className={styles.scoreValue}>{solved} / {assessment.problems?.length}</div>
            <div className={styles.scoreLabel}>Problems Solved</div>
          </CardContent>
        </Card>

        <Card className={styles.scoreCard}>
          <CardContent className={styles.scoreContent}>
            <Clock size={32} className={styles.scoreIconTime} />
            <div className={styles.scoreValue}>{Math.floor((attempt.timeUsed || 0) / 60)}m {(attempt.timeUsed || 0) % 60}s</div>
            <div className={styles.scoreLabel}>Time Used</div>
          </CardContent>
        </Card>
      </div>

      {failed > 0 && (
        <Card className={styles.reviewCard}>
          <CardContent>
            <h2><AlertTriangle size={20} className={styles.warningIcon} /> Review Required</h2>
            <p>You struggled with or failed {failed} problem(s). These have been automatically added to your Needs Review queue.</p>
            <Button variant="primary" onClick={() => router.push('/practice')}>
              Go to Practice Arena
            </Button>
          </CardContent>
        </Card>
      )}
      
      {unanswered > 0 && (
        <Card className={styles.unansweredCard}>
          <CardContent>
            <h2><AlertCircle size={20} className={styles.errorIcon} /> Unanswered Problems</h2>
            <p>You left {unanswered} problem(s) unanswered, which were marked as failed.</p>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
