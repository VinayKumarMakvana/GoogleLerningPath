"use client";

import React, { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { interviewApi } from '@/services/interviewApi';
import { useRouter } from 'next/navigation';

export default function MockInterviewSession({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [evaluating, setEvaluating] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    // In a real app, you'd fetch the session details and loop through the problems,
    // recording attempts using practiceApi.createAttempt({ ...data, interviewSessionId: params.id })
    // For this mock evaluation view, we assume the user just finished.
  }, [params.id]);

  const handleFinish = async () => {
    setEvaluating(true);
    try {
      const res = await interviewApi.evaluateMockSession(params.id);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setEvaluating(false);
    }
  };

  if (result) {
    const feedback = typeof result.feedback === 'string' ? JSON.parse(result.feedback) : result.feedback;
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
        <PageHeader title="Mock Interview Complete" />
        <Card style={{ marginTop: '2rem' }}>
          <CardContent style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Feedback Report</h2>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '2rem' }}>
              Score: {result.score}%
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong>Strengths:</strong> {feedback.strengths}
            </div>
            <div style={{ marginBottom: '1rem', color: 'var(--error-color)' }}>
              <strong>Gaps:</strong> {feedback.gaps}
            </div>
            {feedback.weakPatterns && feedback.weakPatterns.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <strong>Patterns to Revise:</strong> {feedback.weakPatterns.join(', ')}
              </div>
            )}
            
            <Button onClick={() => router.push('/interview')}>Return to Hub</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <PageHeader title="Mock Session Active" />
      <Card style={{ marginTop: '2rem' }}>
        <CardContent style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ marginBottom: '2rem' }}>
            In a real environment, you would solve the generated problems here in an embedded code editor. 
            All attempts would be tracked with <code>interviewSessionId: &apos;{params.id}&apos;</code>.
          </p>
          <Button onClick={handleFinish} disabled={evaluating}>
            {evaluating ? 'Evaluating...' : 'Simulate Completion & Evaluate'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
