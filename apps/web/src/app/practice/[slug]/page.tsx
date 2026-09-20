"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { practiceApi, PracticeProblem, PracticeAttempt } from '@/services/practiceApi';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ArrowLeft, ExternalLink, Lightbulb, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import styles from './page.module.css';

const MISTAKE_OPTIONS = [
  'Concept Gap',
  'Pattern Recognition Gap',
  'Implementation Error',
  'Complexity Error',
  'Edge Case Error',
  'Syntax Error',
  'Needed Hint'
];

export default function ProblemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [problem, setProblem] = useState<PracticeProblem | null>(null);
  const [attempt, setAttempt] = useState<PracticeAttempt | null>(null);
  const [history, setHistory] = useState<PracticeAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Interaction states
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Review Flow states
  const [reviewFlowStatus, setReviewFlowStatus] = useState<'SOLVED' | 'FAILED' | null>(null);
  const [selectedReviewState, setSelectedReviewState] = useState<string>('');
  const [selectedMistakes, setSelectedMistakes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [probRes, attemptsRes] = await Promise.all([
          practiceApi.getProblem(slug),
          practiceApi.getMyAttempts()
        ]);
        setProblem(probRes);
        
        const problemAttempts = attemptsRes?.filter((a: PracticeAttempt) => a.practice.slug === slug) || [];
        setHistory(problemAttempts);
        
        const existingAttempt = problemAttempts.length > 0 ? problemAttempts[0] : null; // Since API returns desc order
        if (existingAttempt && existingAttempt.status === 'STARTED') {
          setAttempt(existingAttempt);
          setHintsRevealed(existingAttempt.hintsUsed || 0);
        } else {
          // Auto-start a new attempt
          const newAttempt = await practiceApi.createAttempt(probRes.id, { status: 'STARTED' });
          setAttempt(newAttempt);
          setHistory(prev => [newAttempt, ...prev]);
        }
      } catch (error) {
        console.error('Failed to load problem:', error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchData();
  }, [slug]);

  const handleStartReview = (status: 'SOLVED' | 'FAILED') => {
    setReviewFlowStatus(status);
    setSelectedReviewState(status === 'FAILED' ? 'NEEDS_REVIEW' : '');
    setSelectedMistakes([]);
  };

  const handleToggleMistake = (m: string) => {
    setSelectedMistakes(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  };

  const handleSubmitReview = async () => {
    if (!problem || !reviewFlowStatus) return;
    setIsSubmitting(true);
    try {
      const updated = await practiceApi.createAttempt(problem.id, { 
        status: reviewFlowStatus,
        hintsUsed: hintsRevealed,
        highestHintLevel: hintsRevealed > 0 ? hintsRevealed - 1 : -1,
        reviewState: selectedReviewState || undefined,
        mistakeCategories: selectedMistakes
      });
      setAttempt(updated);
      setHistory(prev => prev.map(a => a.id === updated.id ? updated : a));
      setReviewFlowStatus(null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRevealHint = async () => {
    if (problem && hintsRevealed < (problem.hints?.length || 0)) {
      const newRevealed = hintsRevealed + 1;
      setHintsRevealed(newRevealed);
      
      // Auto-save hint usage
      try {
        await practiceApi.createAttempt(problem.id, {
          status: attempt?.status || 'STARTED',
          hintsUsed: newRevealed,
          highestHintLevel: newRevealed - 1,
          hintDetails: [{ level: newRevealed - 1, timestamp: new Date().toISOString() }]
        });
      } catch(e) {
        console.error('Failed to save hint usage', e);
      }
    }
  };

  if (loading) return <div className={styles.loading}>Loading problem...</div>;
  if (!problem) return <div className={styles.error}>Problem not found.</div>;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => router.push('/practice')}>
        <ArrowLeft size={16} /> Back to Practice
      </button>

      <div className={styles.layout}>
        {/* Left Column: Problem Description */}
        <div className={styles.leftCol}>
          <div className={styles.header}>
            <div className={styles.titleRow}>
              <h1>{problem.title}</h1>
              {attempt?.status === 'SOLVED' && <CheckCircle2 className={styles.solvedIcon} size={24} />}
            </div>
            <div className={styles.metaRow}>
              <Badge variant={problem.difficulty === 'EASY' ? 'success' : problem.difficulty === 'MEDIUM' ? 'warning' : 'error'}>
                {problem.difficulty}
              </Badge>
              {problem.sourceUrl ? (
                <a href={problem.sourceUrl} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                  {problem.platform} <ExternalLink size={14} />
                </a>
              ) : (
                <Badge variant="outline">{problem.platform}</Badge>
              )}
            </div>
          </div>

          <Card className={styles.statementCard}>
            <CardContent>
              <div className={styles.markdownBody}>
                <ReactMarkdown>{problem.statement || ''}</ReactMarkdown>
              </div>

              {problem.examples && problem.examples.length > 0 && (
                <div className={styles.examples}>
                  <h3>Examples</h3>
                  {problem.examples.map((ex, i) => (
                    <div key={i} className={styles.exampleBlock}>
                      <p><strong>Input:</strong> {ex.input}</p>
                      <p><strong>Output:</strong> {ex.output}</p>
                      {ex.explanation && <p><strong>Explanation:</strong> {ex.explanation}</p>}
                    </div>
                  ))}
                </div>
              )}

              {problem.constraints && problem.constraints.length > 0 && (
                <div className={styles.constraints}>
                  <h3>Constraints</h3>
                  <ul>
                    {problem.constraints.map((c, i) => (
                      <li key={i}><ReactMarkdown>{c}</ReactMarkdown></li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Interaction Panel */}
        <div className={styles.rightCol}>
          <Card className={styles.actionCard}>
            <CardContent>
              <h3>Attempt Status</h3>
              <div className={styles.statusBox}>
                Current Status: <strong>{attempt?.status || 'STARTED'}</strong>
              </div>
              
              {attempt?.reviewState && (
                <div className={styles.statusBox} style={{ marginTop: '0.5rem', backgroundColor: 'var(--surface-color)' }}>
                  Review State: <strong>{attempt.reviewState.replace(/_/g, ' ')}</strong>
                </div>
              )}

              {/* Review Flow */}
              {!reviewFlowStatus && attempt?.status === 'STARTED' && problem.problemType === 'MCQ' ? (
                <div className={styles.mcqForm}>
                  <p>Select the correct answer:</p>
                  <div className={styles.optionsList} style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '16px 0' }}>
                    {(problem.options as any[])?.map((opt: any) => (
                      <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer' }}>
                        <input type="radio" name="mcq" value={opt.id} onChange={(e) => setSelectedReviewState(e.target.value)} />
                        <span>{opt.text}</span>
                      </label>
                    ))}
                  </div>
                  <Button variant="primary" onClick={async () => {
                    if (!selectedReviewState) return;
                    setIsSubmitting(true);
                    try {
                      const updated = await practiceApi.createAttempt(problem.id, { 
                        status: 'SUBMITTED',
                        result: selectedReviewState
                      });
                      setAttempt(updated);
                      setHistory(prev => prev.map(a => a.id === updated.id ? updated : a));
                    } catch (e) {
                      console.error(e);
                    } finally {
                      setIsSubmitting(false);
                    }
                  }} disabled={isSubmitting || !selectedReviewState}>Submit Answer</Button>
                </div>
              ) : !reviewFlowStatus && attempt?.status === 'STARTED' ? (
                <div className={styles.honorSystem}>
                  <p>Did you solve this problem?</p>
                  <div className={styles.buttonGroup}>
                    <Button 
                      variant="primary" 
                      onClick={() => handleStartReview('SOLVED')}
                      disabled={isSubmitting}
                    >
                      Yes, I Solved It
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleStartReview('FAILED')}
                      disabled={isSubmitting}
                    >
                      No, Needs Review
                    </Button>
                  </div>
                </div>
              ) : attempt?.status === 'STARTED' ? (
                <div className={styles.reviewForm}>
                  <h4>How did it go?</h4>
                  <div className={styles.reviewOptions}>
                    {reviewFlowStatus === 'SOLVED' ? (
                      <>
                        <Button variant={selectedReviewState === 'SOLVED_CONFIDENTLY' ? 'primary' : 'outline'} onClick={() => setSelectedReviewState('SOLVED_CONFIDENTLY')} size="sm">Solved Confidently</Button>
                        <Button variant={selectedReviewState === 'SOLVED_WITH_HINTS' ? 'primary' : 'outline'} onClick={() => setSelectedReviewState('SOLVED_WITH_HINTS')} size="sm">Solved with Hints</Button>
                        <Button variant={selectedReviewState === 'STRUGGLED' ? 'primary' : 'outline'} onClick={() => setSelectedReviewState('STRUGGLED')} size="sm">Struggled (Got it eventually)</Button>
                      </>
                    ) : (
                      <Button variant="primary" onClick={() => setSelectedReviewState('NEEDS_REVIEW')} size="sm">Needs Review</Button>
                    )}
                  </div>

                  {(selectedReviewState === 'STRUGGLED' || selectedReviewState === 'NEEDS_REVIEW') && (
                    <div className={styles.mistakesSection}>
                      <h4>What held you back? (Optional)</h4>
                      <div className={styles.mistakesGrid}>
                        {MISTAKE_OPTIONS.map(m => (
                          <label key={m} className={styles.checkboxLabel}>
                            <input 
                              type="checkbox" 
                              checked={selectedMistakes.includes(m)} 
                              onChange={() => handleToggleMistake(m)}
                            />
                            {m}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={styles.buttonGroup} style={{ marginTop: '1rem' }}>
                    <Button variant="primary" onClick={handleSubmitReview} disabled={isSubmitting || !selectedReviewState}>
                      Submit Result
                    </Button>
                    <Button variant="outline" onClick={() => setReviewFlowStatus(null)} disabled={isSubmitting}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : null}

              {(attempt as any)?.explanation && (
                <div className={styles.explanationBox} style={{ marginTop: '16px', padding: '16px', backgroundColor: 'var(--success-bg, #e6f4ea)', borderRadius: '8px' }}>
                  <h4>Explanation</h4>
                  <p>{(attempt as any).explanation}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {history.length > 0 && (
            <Card className={styles.historyCard} style={{ marginTop: '1rem', marginBottom: '1rem' }}>
              <CardContent>
                <h3>Attempt History</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                  {history.map((hist, i) => (
                    <div key={hist.id} style={{ fontSize: '0.875rem', padding: '0.5rem', backgroundColor: 'var(--surface-color)', borderRadius: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <strong>Attempt {history.length - i}</strong>
                        <span>{new Date(hist.updatedAt).toLocaleDateString()}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <Badge variant={hist.status === 'SOLVED' ? 'success' : hist.status === 'FAILED' ? 'error' : 'default'} size="sm">
                          {hist.status}
                        </Badge>
                        {hist.reviewState && (
                          <Badge variant="outline" size="sm">{hist.reviewState.replace(/_/g, ' ')}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {problem.hints && problem.hints.length > 0 && (
            <Card className={styles.hintCard}>
              <CardContent>
                <div className={styles.hintHeader}>
                  <h3><Lightbulb size={18} /> Hints</h3>
                  <span>{hintsRevealed} / {problem.hints.length} Used</span>
                </div>
                
                <div className={styles.hintsList}>
                  {problem.hints.map((hint, index) => (
                    <div key={index} className={styles.hintItem}>
                      {index < hintsRevealed ? (
                        <div className={styles.hintText}>{hint}</div>
                      ) : index === hintsRevealed ? (
                        <Button variant="secondary" onClick={handleRevealHint} size="sm">
                          Reveal Hint {index + 1}
                        </Button>
                      ) : (
                        <div className={styles.hintLocked}>Locked</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className={styles.metaCard}>
            <CardContent>
              <h3>Expected Complexity</h3>
              <div className={styles.complexityRow}>
                <span>Time:</span> <code>{problem.expectedTime || 'N/A'}</code>
              </div>
              <div className={styles.complexityRow}>
                <span>Space:</span> <code>{problem.expectedSpace || 'N/A'}</code>
              </div>

              <h3 style={{ marginTop: '1.5rem' }}>Related Patterns</h3>
              <div className={styles.tags}>
                {problem.patterns?.map(p => <Badge key={p.id} variant="secondary">{p.name}</Badge>)}
              </div>
              
              {problem.topics && problem.topics.length > 0 && (
                <>
                  <h3 style={{ marginTop: '1.5rem' }}>Study Resources</h3>
                  <div className={styles.tags}>
                    {problem.topics.map(t => (
                      <Button key={t.id} variant="outline" size="sm" onClick={() => router.push(`/topics/${t.id}`)}>
                        Review {t.title}
                      </Button>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
