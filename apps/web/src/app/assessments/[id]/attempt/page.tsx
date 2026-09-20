"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { assessmentApi, Assessment, AssessmentAttempt } from '@/services/assessmentApi';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Clock, AlertTriangle, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import styles from './page.module.css';

export default function AssessmentAttemptPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [attempt, setAttempt] = useState<AssessmentAttempt | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [currentProblemIdx, setCurrentProblemIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchActive = async () => {
      try {
        const [activeAttempt, assessmentData] = await Promise.all([
          assessmentApi.getActiveAttempt(id),
          assessmentApi.getAssessment(id)
        ]);
        
        if (activeAttempt.status !== 'IN_PROGRESS') {
          router.replace(`/assessments/${id}/result`);
          return;
        }

        setAttempt(activeAttempt);
        setAssessment(assessmentData);

        // Calculate time left based on server start time
        const start = new Date(activeAttempt.startedAt).getTime();
        const durationMs = assessmentData.duration * 60000;
        const end = start + durationMs;
        const now = new Date().getTime();
        const remaining = Math.max(0, Math.floor((end - now) / 1000));
        
        setTimeLeft(remaining);

      } catch (e) {
        console.error(e);
        router.push('/assessments');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchActive();
  }, [id, router]);

  const handleTimeUp = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await assessmentApi.submitAttempt(attempt!.id);
      router.replace(`/assessments/${id}/result`);
    } catch (e) {
      console.error('Failed to submit on timeout', e);
    }
  };

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, submitting, attempt, router, id]);

  const handleSubmitAssessment = async () => {
    if (!confirm('Are you sure you want to submit your assessment? You cannot change answers after submitting.')) return;
    
    setSubmitting(true);
    try {
      await assessmentApi.submitAttempt(attempt!.id);
      router.replace(`/assessments/${id}/result`);
    } catch (e) {
      console.error(e);
      setSubmitting(false);
    }
  };

  const handleMarkProblem = async (status: string) => {
    if (!attempt || !assessment) return;
    const problem = assessment.problems![currentProblemIdx];
    try {
      const updatedResult = await assessmentApi.recordProblemResult(attempt.id, problem.practiceProblem.id, status, 0, 0);
      
      // Update local state to reflect the result
      setAttempt(prev => {
        if (!prev) return prev;
        const results = [...(prev.results || [])];
        const idx = results.findIndex(r => r.practiceProblemId === problem.practiceProblem.id);
        if (idx >= 0) results[idx] = updatedResult;
        else results.push(updatedResult);
        return { ...prev, results };
      });

    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className={styles.loading}>Preparing Assessment...</div>;
  if (!assessment || !attempt) return null;

  const currentProbData = assessment.problems![currentProblemIdx];
  const problem = currentProbData.practiceProblem;
  const currentResult = attempt.results?.find(r => r.practiceProblemId === problem.id);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.titleInfo}>
          <h2>{assessment.title}</h2>
          <span className={styles.problemCounter}>Problem {currentProblemIdx + 1} of {assessment.problems!.length}</span>
        </div>
        <div className={`${styles.timer} ${timeLeft! < 300 ? styles.timerWarning : ''}`}>
          <Clock size={20} />
          {formatTime(timeLeft || 0)}
        </div>
        <Button variant="primary" onClick={handleSubmitAssessment} disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Assessment'}
        </Button>
      </div>

      <div className={styles.layout}>
        {/* Left Column: Problem Nav */}
        <div className={styles.sidebar}>
          <h3>Problems</h3>
          <div className={styles.problemNav}>
            {assessment.problems!.map((p, idx) => {
              const res = attempt.results?.find(r => r.practiceProblemId === p.practiceProblem.id);
              let stateClass = styles.navUnattempted;
              if (res?.status === 'SOLVED') stateClass = styles.navSolved;
              else if (res?.status === 'FAILED') stateClass = styles.navFailed;

              return (
                <button 
                  key={p.id}
                  className={`${styles.navButton} ${idx === currentProblemIdx ? styles.navActive : ''} ${stateClass}`}
                  onClick={() => setCurrentProblemIdx(idx)}
                >
                  <span className={styles.navIndex}>{idx + 1}.</span>
                  <span className={styles.navTitle}>{p.practiceProblem.title}</span>
                  {res?.status === 'SOLVED' && <CheckCircle2 size={14} className={styles.navIconSuccess} />}
                  {res?.status === 'FAILED' && <AlertTriangle size={14} className={styles.navIconFailed} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Problem View */}
        <div className={styles.mainView}>
          <Card className={styles.problemCard}>
            <CardContent>
              <div className={styles.problemHeader}>
                <h1>{problem.title}</h1>
                <Badge variant={problem.difficulty === 'EASY' ? 'success' : problem.difficulty === 'MEDIUM' ? 'warning' : 'error'}>
                  {problem.difficulty}
                </Badge>
              </div>

              <div className={styles.markdownBody}>
                <ReactMarkdown>{problem.statement || ''}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          <Card className={styles.actionCard}>
            <CardContent>
              <h3>Honor System Status</h3>
              <p className={styles.honorText}>Since code execution is disabled during this phase, please verify your solution locally and self-report your result.</p>
              
              <div className={styles.actionButtons}>
                <Button 
                  variant={currentResult?.status === 'SOLVED' ? 'primary' : 'outline'}
                  onClick={() => handleMarkProblem('SOLVED')}
                >
                  Mark as Solved
                </Button>
                <Button 
                  variant={currentResult?.status === 'FAILED' ? 'primary' : 'outline'}
                  onClick={() => handleMarkProblem('FAILED')}
                >
                  Mark as Failed
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className={styles.navControls}>
            <Button 
              variant="secondary" 
              onClick={() => setCurrentProblemIdx(prev => prev - 1)}
              disabled={currentProblemIdx === 0}
            >
              <ChevronLeft size={16} /> Previous
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setCurrentProblemIdx(prev => prev + 1)}
              disabled={currentProblemIdx === assessment.problems!.length - 1}
            >
              Next <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
