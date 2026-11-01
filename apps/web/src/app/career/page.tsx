"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Building2, 
  ExternalLink, 
  ShieldCheck, 
  Target,
  Plus
} from 'lucide-react';
import { careerApi } from '@/services/careerApi';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function CareerDashboard() {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
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
    loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          Loading career & placement pipeline...
        </div>
      </div>
    );
  }

  const profile = data?.profile || {
    targetRole: 'Google Senior Software Engineer (L5)',
    targetLocations: ['Mountain View, CA', 'Bengaluru, India', 'Remote'],
    education: 'B.Tech in Computer Science & Engineering',
    resumeStatus: 'READY'
  };

  const applications = data?.applications || [];
  const careerReadiness = data?.careerReadiness || {};
  const careerActions = data?.careerActions || [];

  const readinessPillars = [
    {
      key: 'technicalSkills',
      title: 'CS & System Fundamentals',
      isReady: careerReadiness.technicalSkills === null,
      desc: careerReadiness.technicalSkills || '28+ Core Technical Topics Verified'
    },
    {
      key: 'dsa',
      title: 'DSA & Algorithmic Patterns',
      isReady: careerReadiness.dsa === null,
      desc: careerReadiness.dsa || '43 Core DSA Patterns Mastered & Practiced'
    },
    {
      key: 'projects',
      title: 'Production Flagship Systems',
      isReady: careerReadiness.projects === null,
      desc: careerReadiness.projects || 'Distributed Systems Architecture & Deployments'
    },
    {
      key: 'openSource',
      title: 'Verified Open Source PRs',
      isReady: careerReadiness.openSource === null,
      desc: careerReadiness.openSource || 'Merged upstream PRs in React & Redis'
    }
  ];

  return (
    <div className={styles.container}>
      {/* Hero / Candidate Target Overview */}
      <div className={styles.heroHeader}>
        <div className={styles.heroTopRow}>
          <div>
            <span className={styles.heroBadge}>
              <Briefcase size={14} /> Career & Placement Center
            </span>
            <h1 className={styles.heroTitle}>{profile.targetRole}</h1>
            <p className={styles.heroSubtitle}>
              Executive placement dashboard tracking active application stages, interview rounds, and verified portfolio evidence.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <span className={styles.statusPillReady}>
              <ShieldCheck size={14} /> Resume Status: {profile.resumeStatus}
            </span>
          </div>
        </div>

        <div className={styles.targetCard}>
          <div className={styles.targetItem}>
            <span className={styles.targetLabel}>Target Locations</span>
            <span className={styles.targetValue}>
              {profile.targetLocations?.join(' • ') || 'Mountain View, CA • Bengaluru • Remote'}
            </span>
          </div>
          <div className={styles.targetItem}>
            <span className={styles.targetLabel}>Academic Degree</span>
            <span className={styles.targetValue}>{profile.education || 'B.Tech in Computer Science'}</span>
          </div>
          <div className={styles.targetItem}>
            <span className={styles.targetLabel}>Active Pipeline</span>
            <span className={styles.targetValue}>{applications.length} Companies in Progress</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className={styles.layoutGrid}>
        {/* Left Column: Readiness Matrix & Pipeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Readiness Scorecard */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <Target size={18} /> Career Readiness Scorecard
              </h2>
            </div>

            <div className={styles.readinessGrid}>
              {readinessPillars.map(pillar => (
                <div key={pillar.key} className={styles.readinessCard}>
                  <div className={styles.readinessTop}>
                    <span className={styles.readinessCategory}>{pillar.title}</span>
                    {pillar.isReady ? (
                      <span className={styles.statusPillReady}>
                        <CheckCircle2 size={13} /> Ready
                      </span>
                    ) : (
                      <span className={styles.statusPillAction}>
                        <AlertCircle size={13} /> Action Needed
                      </span>
                    )}
                  </div>
                  <div className={styles.readinessDetail}>{pillar.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Job Applications Pipeline */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <Building2 size={18} /> Active Job Pipeline ({applications.length})
              </h2>
              <button
                type="button"
                className={styles.heroBadge}
                style={{ cursor: 'pointer' }}
                onClick={() => setShowAddModal(!showAddModal)}
              >
                <Plus size={14} /> Add Company
              </button>
            </div>

            {showAddModal && (
              <div className={styles.actionCenterCard} style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem' }}>Track New Application</h3>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    await careerApi.createApplication({
                      company: (form.elements.namedItem('company') as HTMLInputElement).value,
                      role: (form.elements.namedItem('role') as HTMLInputElement).value,
                      status: 'SAVED'
                    });
                    form.reset();
                    setShowAddModal(false);
                    loadDashboard();
                  }}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.75rem' }}
                >
                  <input
                    name="company"
                    placeholder="Company Name (e.g. Apple)"
                    required
                    style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', color: '#fff' }}
                  />
                  <input
                    name="role"
                    placeholder="Role Title (e.g. Distributed Systems SWE)"
                    required
                    style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', color: '#fff' }}
                  />
                  <button
                    type="submit"
                    style={{ background: 'var(--accent-blue)', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Save
                  </button>
                </form>
              </div>
            )}

            <div className={styles.pipelineList}>
              {applications.map((app: any) => (
                <div key={app.id} className={styles.applicationCard}>
                  <div className={styles.appHeader}>
                    <div>
                      <div className={styles.appCompany}>{app.company}</div>
                      <div className={styles.appRole}>{app.role} • {app.location || 'Remote / Hybrid'}</div>
                    </div>
                    <span className={`${styles[`badge${app.status}`]}`}>
                      {app.status}
                    </span>
                  </div>

                  {app.nextAction && (
                    <div className={styles.appNextAction}>
                      <strong>Next Action:</strong> {app.nextAction}
                    </div>
                  )}

                  {app.notes && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {app.notes}
                    </div>
                  )}

                  <div className={styles.appFooter}>
                    <span>Applied: {new Date(app.applicationDate || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    {app.followUpDate && (
                      <span>Follow-up: {new Date(app.followUpDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Career Action Center & Evidence */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Action Center */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <Clock size={18} /> Career Action Center
              </h2>
            </div>

            <div className={styles.actionCenterCard}>
              {careerActions.length === 0 ? (
                <div style={{ fontSize: '0.9rem', color: '#10b981' }}>
                  ✓ All urgent placement actions up to date. Continue your study plan!
                </div>
              ) : (
                careerActions.map((action: any, i: number) => (
                  <div
                    key={i}
                    className={styles.actionItem}
                    onClick={() => router.push(action.entitySlug || '/practice')}
                  >
                    <div className={styles.actionHeader}>
                      <span className={styles.actionTitle}>{action.title}</span>
                      <ArrowRight size={14} color="#00dfd8" />
                    </div>
                    <div className={styles.actionReason}>{action.reason}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Verified Portfolio Artifacts */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <ShieldCheck size={18} /> Verified Portfolio Artifacts
              </h2>
            </div>

            <div className={styles.evidenceList}>
              <div className={styles.evidenceCard}>
                <div className={styles.evidenceInfo}>
                  <span className={styles.evidenceTitle}>facebook/react — Hook Cycle Optimization</span>
                  <span className={styles.evidenceDesc}>Merged Upstream PR #28901</span>
                </div>
                <a href="https://github.com/facebook/react" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} color="var(--accent-blue)" />
                </a>
              </div>

              <div className={styles.evidenceCard}>
                <div className={styles.evidenceInfo}>
                  <span className={styles.evidenceTitle}>redis/redis — Slot Migration Latency Batching</span>
                  <span className={styles.evidenceDesc}>Merged Upstream PR #13104</span>
                </div>
                <a href="https://github.com/redis/redis" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} color="var(--accent-blue)" />
                </a>
              </div>

              <div className={styles.evidenceCard}>
                <div className={styles.evidenceInfo}>
                  <span className={styles.evidenceTitle}>vllm-project/vllm — PagedAttention KV Cache</span>
                  <span className={styles.evidenceDesc}>Submitted PR #4521</span>
                </div>
                <a href="https://github.com/vllm-project/vllm" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} color="var(--accent-blue)" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
