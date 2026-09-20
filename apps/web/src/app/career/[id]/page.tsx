"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { careerApi } from '@/services/careerApi';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function ApplicationDetail({ params }: { params: { id: string } }) {
  const [app, setApp] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadApp = useCallback(async () => {
    setLoading(true);
    try {
      const data = await careerApi.getApplication(params.id);
      setApp(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadApp();
  }, [loadApp]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!app) return;
    
    await careerApi.updateApplication(app.id as string, app);
    router.push('/career');
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading application...</div>;
  if (!app) return <div style={{ padding: '2rem' }}>Application not found.</div>;

  return (
    <div className={styles.container}>
      <Button onClick={() => router.push('/career')} variant="secondary" style={{ marginBottom: '2rem' }}>
        &larr; Back to Dashboard
      </Button>

      <div className={styles.header}>
        <div>
          <div className={styles.title}>{app.role as string}</div>
          <div className={styles.company}>{app.company as string}</div>
        </div>
        <div>
          <select 
            className={styles.input} 
            value={app.status as string}
            onChange={e => setApp({ ...app, status: e.target.value })}
            style={{ fontWeight: 'bold' }}
          >
            <option value="SAVED">Saved</option>
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interviewing</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
            <option value="WITHDRAWN">Withdrawn</option>
          </select>
        </div>
      </div>

      <Card>
        <CardContent style={{ padding: '2rem' }}>
          <form onSubmit={handleSave}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Location</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={(app.location as string) || ''}
                  onChange={e => setApp({ ...app, location: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Job URL</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={(app.jobUrl as string) || ''}
                  onChange={e => setApp({ ...app, jobUrl: e.target.value })}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Application Date</label>
                <input 
                  type="date" 
                  className={styles.input} 
                  value={app.applicationDate ? (app.applicationDate as string).split('T')[0] : ''}
                  onChange={e => setApp({ ...app, applicationDate: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Follow Up Date</label>
                <input 
                  type="date" 
                  className={styles.input} 
                  value={app.followUpDate ? (app.followUpDate as string).split('T')[0] : ''}
                  onChange={e => setApp({ ...app, followUpDate: e.target.value })}
                />
              </div>

              <div className={styles.formGroupFull}>
                <label className={styles.label}>Next Action</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={(app.nextAction as string) || ''}
                  onChange={e => setApp({ ...app, nextAction: e.target.value })}
                  placeholder="e.g. Email recruiter, Prepare for technical screen"
                />
              </div>

              <div className={styles.formGroupFull}>
                <label className={styles.label}>Notes</label>
                <textarea 
                  className={`${styles.input} ${styles.textarea}`}
                  value={(app.notes as string) || ''}
                  onChange={e => setApp({ ...app, notes: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.actions}>
              <Button type="button" onClick={() => router.push('/career')} variant="secondary">Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
