"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { Card, CardContent } from '@/components/ui/Card';
import { contributionApi } from '@/services/contributionApi';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function ContributionsDashboard() {
  const [contributions, setContributions] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadContributions = useCallback(async () => {
    try {
      const res = await contributionApi.getContributions();
      setContributions(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadContributions();
  }, [loadContributions]);

  if (loading) return <div style={{ padding: '2rem' }}>Loading contributions...</div>;

  return (
    <div className={styles.container}>
      <PageHeader 
        title="Open Source Workspace" 
        subtitle="Manage your GitHub contributions and verify open source evidence."
      />

      <div className={styles.grid}>
        <div>
          <div className={styles.sectionTitle}>Your Contributions</div>
          {contributions.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>You haven&apos;t tracked any contributions yet.</p>
          ) : (
            <div className={styles.list}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {contributions.map((c: any) => {
                const tasks = c.tasks || [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const completedTasks = tasks.filter((t: any) => t.status === 'COMPLETED').length;
                return (
                  <div key={c.id} className={styles.card} onClick={() => router.push(`/contributions/${c.id}`)}>
                    <div>
                      <div className={styles.repoName}>{c.repoName}</div>
                      <div className={styles.repoDetails}>
                        {c.type} &bull; {completedTasks}/{tasks.length} tasks completed
                      </div>
                    </div>
                    <div className={styles.badge}>{c.status}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <Card>
            <CardContent style={{ padding: '1.5rem' }}>
              <div className={styles.sectionTitle}>New Contribution</div>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                await contributionApi.createContribution({
                  repoName: (form.elements.namedItem('repoName') as HTMLInputElement).value,
                  repoUrl: (form.elements.namedItem('repoUrl') as HTMLInputElement).value,
                  type: (form.elements.namedItem('type') as HTMLSelectElement).value,
                  status: 'PLANNED'
                });
                form.reset();
                loadContributions();
              }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Repository Name</label>
                  <input name="repoName" className={styles.input} placeholder="e.g. facebook/react" required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Repository URL</label>
                  <input name="repoUrl" type="url" className={styles.input} placeholder="https://github.com/..." required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Contribution Type</label>
                  <select name="type" className={styles.input} required>
                    <option value="ISSUE">Issue / Bug Report</option>
                    <option value="PR">Pull Request</option>
                    <option value="FEATURE">Feature Addition</option>
                    <option value="BUG_FIX">Bug Fix</option>
                    <option value="DOCUMENTATION">Documentation</option>
                  </select>
                </div>
                <button type="submit" className={styles.input} style={{ background: 'var(--primary-color)', color: 'white', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>
                  Start Contribution
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
