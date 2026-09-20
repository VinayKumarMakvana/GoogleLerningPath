"use client";

import React, { useEffect, useState } from 'react';
import { projectApi } from '@/services/projectApi';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import styles from './page.module.css';

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [project, setProject] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [githubUrl, setGithubUrl] = useState('');
  const [deploymentUrl, setDeploymentUrl] = useState('');

  const loadProject = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await projectApi.getProjectBySlug(params.slug);
      setProject(data);
      setGithubUrl((data.githubUrl as string) || '');
      setDeploymentUrl((data.deploymentUrl as string) || '');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [params.slug]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProject();
  }, [loadProject]);

  const updateProjectState = async (status: string) => {
    if (!project) return;
    await projectApi.updateProjectState(project.id as string, { status, githubUrl, deploymentUrl });
    loadProject();
  };

  const toggleTask = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'COMPLETED' ? 'NOT_STARTED' : 'COMPLETED';
    await projectApi.updateTaskState(taskId, { status: newStatus });
    loadProject();
  };

  const submitProjectForReview = async () => {
    if (!project) return;
    await projectApi.submitProject(project.id as string, { githubUrl, deploymentUrl });
    loadProject();
  };

  const currentSubmission = project?.submissions?.[0] as any;
  const isVerified = currentSubmission?.status === 'VERIFIED';
  const hasPendingReview = currentSubmission?.status === 'PENDING_REVIEW';
  const hasFindings = currentSubmission?.reviews && currentSubmission.reviews.length > 0;
  const activeReview = currentSubmission?.reviews?.[0];

  if (loading) return <div style={{ padding: '2rem' }}>Loading project...</div>;
  if (!project) return <div style={{ padding: '2rem' }}>Project not found.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>{project.title}</div>
          <div className={styles.meta}>
            <span>{project.projectType}</span>
            <span>•</span>
            <span>{project.difficulty}</span>
            <span>•</span>
            <span>~{project.estimatedHours} Hours</span>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
        </div>
        <div className={styles.controls}>
          {project.status === 'NOT_STARTED' && (
            <Button onClick={() => updateProjectState('ACTIVE')}>Start Project</Button>
          )}
          {project.status === 'ACTIVE' && (
            <Button onClick={() => updateProjectState('COMPLETED')} variant="primary">Mark Completed</Button>
          )}
          {project.status === 'COMPLETED' && (
            <Button onClick={() => updateProjectState('ACTIVE')} variant="secondary">Reopen Project</Button>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Verification & Review Lifecycle</div>
        <Card>
          <CardContent style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Step 1: Submission */}
            <div className={styles.lifecycleStep}>
              <h3>1. Submit Project Evidence</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Provide your Github repository and live deployment links.</p>
              <div className={styles.inputGroup} style={{ marginTop: 8 }}>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={githubUrl}
                  onChange={e => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/your-username/repo"
                  disabled={hasPendingReview || isVerified}
                />
              </div>
              <div className={styles.inputGroup}>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={deploymentUrl}
                  onChange={e => setDeploymentUrl(e.target.value)}
                  placeholder="https://your-live-app.com"
                  disabled={hasPendingReview || isVerified}
                />
              </div>
              {(!currentSubmission || currentSubmission.status === 'NEEDS_REVISION') && (
                <Button onClick={submitProjectForReview} style={{ alignSelf: 'flex-start' }} variant="primary">
                  {currentSubmission?.status === 'NEEDS_REVISION' ? 'Resubmit for Review' : 'Submit for Review'}
                </Button>
              )}
              {hasPendingReview && (
                <div style={{ padding: '8px 12px', background: 'var(--warning-bg, #fff3cd)', color: '#856404', borderRadius: 4, display: 'inline-block' }}>
                  ⏳ Your submission is pending engineering review.
                </div>
              )}
            </div>

            {/* Step 2: Findings */}
            {hasFindings && (
              <div className={styles.lifecycleStep} style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <h3>2. Engineering Review Findings</h3>
                <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', marginTop: 12 }}>
                  {activeReview.findings.map((finding: any) => (
                    <div key={finding.id} style={{ padding: '12px', borderLeft: `4px solid ${finding.severity === 'CRITICAL' ? 'red' : finding.severity === 'HIGH' ? 'orange' : 'var(--primary-color)'}`, background: 'var(--surface-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <strong>{finding.category} Issue <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>({finding.severity})</span></strong>
                        <span>{finding.affectedArea}</span>
                      </div>
                      <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>{finding.explanation}</p>
                      <p style={{ margin: '4px 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}><em>Recommendation:</em> {finding.recommendation}</p>
                      {finding.generatedTaskId && (
                        <div style={{ marginTop: 8, fontSize: '0.85rem', color: 'var(--primary-color)' }}>
                          ↳ Custom revision task added to your Milestone.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Defense & Evidence */}
            {isVerified && (
              <div className={styles.lifecycleStep} style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <h3>3. Verified Engineering Evidence</h3>
                <div style={{ padding: '16px', background: 'var(--success-bg, #d4edda)', color: '#155724', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: '2rem' }}>🏆</div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0' }}>Project Verified</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>You have successfully passed the Code Review and Engineering Defense. This project is now a verified portfolio item on your Career profile.</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Architecture Summary</div>
        <p style={{ lineHeight: 1.6 }}>{project.architectureSummary as string}</p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {(project.technologies as string[]).map((t: string) => (
            <span key={t} style={{ background: 'var(--surface-light)', padding: '0.25rem 0.75rem', borderRadius: 12, fontSize: '0.85rem' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Implementation Plan</div>
        {(project.milestones as Record<string, unknown>[]).map((milestone) => (
          <div key={milestone.id as string} className={styles.milestone}>
            <div className={styles.milestoneTitle}>{milestone.order as number}. {milestone.title as string}</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{milestone.description as string}</p>
            
            <div>
              {(milestone.tasks as Record<string, unknown>[]).map((task) => {
                const userState = (project.userTaskStates as Record<string, unknown>[]).find(ts => ts.taskId === task.id);
                const isCompleted = userState?.status === 'COMPLETED';
                
                return (
                  <div key={task.id as string} className={styles.task}>
                    <input 
                      type="checkbox" 
                      checked={isCompleted}
                      onChange={() => toggleTask(task.id as string, (userState?.status as string) || 'NOT_STARTED')}
                      style={{ width: 20, height: 20, marginTop: 4 }}
                    />
                    <div className={styles.taskContent}>
                      <div className={styles.taskTitle}>{task.title as string} <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginLeft: 8 }}>{task.estimatedMinutes as number}m</span></div>
                      <div className={styles.taskDesc}>{task.description as string}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
