"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { Card, CardContent } from '@/components/ui/Card';
import { careerApi } from '@/services/careerApi';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function CareerDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadDashboard = useCallback(async () => {
    try {
      const res = await careerApi.getDashboard();
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDashboard();
  }, [loadDashboard]);

  if (loading) return <div style={{ padding: '2rem' }}>Loading professional profile...</div>;
  if (!data) return <div style={{ padding: '2rem' }}>Error loading profile data.</div>;

  const {
    profile,
    applications,
    evidence,
    careerReadiness,
    careerActions
  } = data;

  const formatKey = (k: string) => {
    if (k === 'dsa') return 'DSA Mastery';
    if (k === 'openSource') return 'Open Source';
    if (k === 'technicalSkills') return 'Technical Skills';
    return k.charAt(0).toUpperCase() + k.slice(1);
  };

  return (
    <div className={styles.container}>
      <PageHeader 
        title="Professional Profile" 
        subtitle={`Target Role: ${profile.targetRole}`}
      />

      {/* Career Action Center */}
      <div className={styles.actionCenter}>
        <div className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>Career Action Center</div>
        {careerActions.length === 0 ? (
          <div className={styles.successAlert}>You have no urgent career actions pending. Keep learning!</div>
        ) : (
          <div>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {careerActions.map((action: any, i: number) => (
              <div key={i} className={styles.actionItem} onClick={() => router.push(action.entitySlug)}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className={styles.actionTitle}>{action.title}</span>
                  <span className={styles.badge}>{action.estimatedMinutes} min</span>
                </div>
                <div className={styles.actionReason}>{action.reason}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.grid}>
        <div>
          {/* Career Readiness Grid */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Career Readiness</div>
            <div className={styles.readinessGrid}>
              {Object.entries(careerReadiness).map(([key, missingAction]) => {
                const isReady = missingAction === null;
                return (
                  <div key={key} className={styles.readinessCard}>
                    <div className={styles.readinessHeader}>
                      <span>{formatKey(key)}</span>
                      <span className={styles.checkIcon} style={{ background: isReady ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)', color: isReady ? 'white' : 'var(--text-secondary)' }}>
                        {isReady ? '✓' : '!'}
                      </span>
                    </div>
                    {!isReady && <div className={styles.alert}>Action Required: {missingAction as string}</div>}
                    {isReady && <div className={styles.successAlert}>Ready</div>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Evidence Hub */}
          <div className={styles.section} style={{ marginTop: '2rem' }}>
            <div className={styles.sectionTitle}>Verified Evidence Hub</div>
            {evidence.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No verified evidence yet.</p>
            ) : (
              <div>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {evidence.map((ev: any, i: number) => (
                  <div key={i} className={styles.evidenceItem}>
                    <div className={styles.evidenceHeader}>
                      <span className={styles.evidenceTitle}>{ev.title}</span>
                      <span className={styles.evidenceType}>{ev.type}</span>
                    </div>
                    <div className={styles.evidenceDesc}>{ev.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          {/* Application Tracker */}
          <Card style={{ marginBottom: '2rem' }}>
            <CardContent style={{ padding: '1.5rem' }}>
              <div className={styles.sectionTitle}>Active Applications</div>
              {applications.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)' }}>No active applications.</p>
              ) : (
                <div className={styles.appList}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {applications.map((app: any) => (
                    <div key={app.id} className={styles.appItem} onClick={() => router.push(`/career/${app.id}`)}>
                      <div>
                        <div className={styles.appRole}>{app.role}</div>
                        <div className={styles.appCompany}>{app.company}</div>
                      </div>
                      <div className={styles.badge}>{app.status}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent style={{ padding: '1.5rem' }}>
              <div className={styles.sectionTitle}>New Application</div>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                await careerApi.createApplication({
                  company: (form.elements.namedItem('company') as HTMLInputElement).value,
                  role: (form.elements.namedItem('role') as HTMLInputElement).value,
                  status: 'SAVED'
                });
                form.reset();
                loadDashboard();
              }}>
                <div className={styles.formGroup}>
                  <input name="company" className={styles.input} placeholder="Company Name" required />
                </div>
                <div className={styles.formGroup}>
                  <input name="role" className={styles.input} placeholder="Role" required />
                </div>
                <button type="submit" className={styles.input} style={{ background: 'var(--primary-color)', color: 'white', border: 'none', cursor: 'pointer' }}>
                  Save Application
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
