"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { contributionApi } from '@/services/contributionApi';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function ContributionDetail({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [contribution, setContribution] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadContribution = useCallback(async () => {
    setLoading(true);
    try {
      const data = await contributionApi.getContribution(params.id);
      setContribution(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadContribution();
  }, [loadContribution]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contribution) return;
    
    await contributionApi.updateContribution(contribution.id as string, contribution);
    router.push('/contributions');
  };

  const toggleTask = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    await contributionApi.updateTaskStatus(params.id, taskId, newStatus);
    loadContribution();
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading contribution...</div>;
  if (!contribution) return <div style={{ padding: '2rem' }}>Contribution not found.</div>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tasks = (contribution.tasks as any[]) || [];

  return (
    <div className={styles.container}>
      <Button onClick={() => router.push('/contributions')} variant="secondary" style={{ marginBottom: '2rem' }}>
        &larr; Back to Contributions
      </Button>

      <div className={styles.header}>
        <div>
          <div className={styles.title}>{contribution.repoName as string}</div>
          <div className={styles.subtitle}>{contribution.type as string} &bull; {contribution.repoUrl as string}</div>
        </div>
        <div>
          <select 
            className={styles.input} 
            value={contribution.status as string}
            onChange={e => setContribution({ ...contribution, status: e.target.value })}
            style={{ fontWeight: 'bold' }}
          >
            <option value="PLANNED">Planned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="MERGED">Merged</option>
            <option value="CLOSED">Closed / Abandoned</option>
          </select>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Contribution Tasks</div>
        {tasks.map(t => (
          <div 
            key={t.id} 
            className={`${styles.taskItem} ${t.status === 'COMPLETED' ? styles.completed : ''}`}
            onClick={() => toggleTask(t.id, t.status)}
          >
            <input 
              type="checkbox" 
              checked={t.status === 'COMPLETED'}
              readOnly
              className={styles.taskCheckbox}
            />
            <div className={styles.taskTitle}>{t.title}</div>
          </div>
        ))}
      </div>

      <Card>
        <CardContent style={{ padding: '2rem' }}>
          <form onSubmit={handleSave}>
            <div className={styles.sectionTitle}>Evidence & Details</div>
            <div className={styles.formGrid}>
              <div className={styles.formGroupFull}>
                <label className={styles.label}>PR / Issue URL (Evidence)</label>
                <input 
                  type="url" 
                  className={styles.input} 
                  value={(contribution.prUrl as string) || ''}
                  onChange={e => setContribution({ ...contribution, prUrl: e.target.value })}
                  placeholder="https://github.com/.../pull/123"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Target Date</label>
                <input 
                  type="date" 
                  className={styles.input} 
                  value={contribution.targetDate ? (contribution.targetDate as string).split('T')[0] : ''}
                  onChange={e => setContribution({ ...contribution, targetDate: e.target.value })}
                />
              </div>
              
              <div className={styles.formGroupFull}>
                <label className={styles.label}>Notes</label>
                <textarea 
                  className={`${styles.input} ${styles.textarea}`}
                  value={(contribution.notes as string) || ''}
                  onChange={e => setContribution({ ...contribution, notes: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.actions}>
              <Button type="button" onClick={() => router.push('/contributions')} variant="secondary">Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
