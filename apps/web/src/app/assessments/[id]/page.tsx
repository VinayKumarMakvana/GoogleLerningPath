"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { assessmentApi, Assessment } from '@/services/assessmentApi';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Clock, AlertTriangle, Play } from 'lucide-react';
import styles from './page.module.css';

export default function AssessmentInstructions() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const res = await assessmentApi.getAssessment(id);
        setAssessment(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchAssessment();
  }, [id]);

  const handleStart = async () => {
    setStarting(true);
    try {
      await assessmentApi.startAttempt(id);
      router.push(`/assessments/${id}/attempt`);
    } catch (e) {
      console.error(e);
      setStarting(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading instructions...</div>;
  if (!assessment) return <div className={styles.error}>Assessment not found.</div>;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => router.push('/assessments')}>
        <ArrowLeft size={16} /> Back to Assessments
      </button>

      <Card className={styles.mainCard}>
        <CardContent>
          <div className={styles.header}>
            <Badge variant={assessment.difficulty === 'EASY' ? 'success' : 'warning'}>{assessment.difficulty}</Badge>
            <Badge variant="outline">{assessment.type}</Badge>
          </div>

          <h1 className={styles.title}>{assessment.title}</h1>
          <p className={styles.description}>{assessment.description}</p>

          <div className={styles.rulesContainer}>
            <h2><AlertTriangle size={20} style={{ color: 'var(--warning-color)' }} /> Assessment Rules</h2>
            <ul className={styles.rulesList}>
              <li>
                <strong>Timed Exam:</strong> You have exactly <strong>{assessment.duration} minutes</strong> to complete this assessment. 
                The timer runs on the server and will continue even if you close the browser.
              </li>
              <li>
                <strong>Submissions:</strong> You must click &quot;Submit Assessment&quot; before the timer expires. 
                Any problems not solved before the timer hits 0 will be marked as failed.
              </li>
              <li>
                <strong>Honor System:</strong> You may use hints, but try to solve problems independently first. 
                Hint usage is recorded for your personal analytics.
              </li>
              <li>
                <strong>Scoring:</strong> You only receive points for problems marked as solved.
              </li>
            </ul>
          </div>

          <div className={styles.summaryBar}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total Problems</span>
              <span className={styles.summaryValue}>{assessment.problems?.length || 0}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Time Limit</span>
              <span className={styles.summaryValue}><Clock size={16}/> {assessment.duration} mins</span>
            </div>
            <Button 
              variant="primary" 
              size="lg" 
              className={styles.startButton}
              onClick={handleStart}
              disabled={starting}
            >
              <Play size={18} fill="currentColor" /> {starting ? 'Starting...' : 'Begin Assessment'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
