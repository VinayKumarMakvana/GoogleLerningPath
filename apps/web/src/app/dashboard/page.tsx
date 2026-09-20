import React from 'react';
import Link from 'next/link';
import { PageHeader, SectionHeader } from '@/components/shared/Headers';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { PlayCircle, Target, AlertCircle, Calendar } from 'lucide-react';
import styles from './page.module.css';

export default function DashboardPage() {
  return (
    <>
      <PageHeader 
        title="Dashboard" 
        description="Good morning. Continue your Google SWE preparation."
      />
      
      <div className={styles.grid}>
        <div className={styles.mainColumn}>
          {/* Continue Learning */}
          <section>
            <SectionHeader title="Continue Learning" />
            <Card className={styles.welcomeCard}>
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>Binary Search — Search Space</h3>
                    <div style={{ display: 'flex', gap: '16px', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                      <span>Topic: Binary Search</span>
                      <span>Estimated: 45 min</span>
                    </div>
                  </div>
                  <Button size="lg" className={styles.continueBtn}>
                    <PlayCircle size={20} /> Resume
                  </Button>
                </div>
                <div style={{ marginTop: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
                    <span>Module Progress</span>
                    <span>65%</span>
                  </div>
                  <ProgressBar progress={65} />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Today's Plan */}
          <section>
            <SectionHeader title="Today's Plan" />
            <Card>
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontWeight: 500 }}>Target: 3 hours</span>
                  <Badge variant="primary">On Track</Badge>
                </div>
                <ProgressBar progress={30} size="sm" />
                
                <div className={styles.planList}>
                  <div className={styles.planItem}>
                    <span className={styles.planTitle}>DSA Practice</span>
                    <span className={styles.planTime}>75 min</span>
                  </div>
                  <div className={styles.planItem}>
                    <span className={styles.planTitle}>CS / Development</span>
                    <span className={styles.planTime}>75 min</span>
                  </div>
                  <div className={styles.planItem}>
                    <span className={styles.planTitle}>System Design</span>
                    <span className={styles.planTime}>30 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        <div className={styles.sideColumn}>
          {/* Current Roadmap Context */}
          <section>
            <SectionHeader title="Current Roadmap" />
            <Card>
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Target size={24} color="var(--color-primary)" />
                  <div>
                    <div style={{ fontWeight: 500 }}>Phase 2: Core DSA</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Module: Advanced Trees</div>
                  </div>
                </div>
                <Button variant="outline" style={{ width: '100%' }}>View Full Roadmap</Button>
              </CardContent>
            </Card>
          </section>

          {/* Weak Areas */}
          <section>
            <SectionHeader title="Needs Attention" />
            <Card>
              <CardContent>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-warning)' }}>
                    <AlertCircle size={16} />
                    <span style={{ color: 'var(--color-text-main)', fontSize: '0.875rem' }}>Graphs (DFS/BFS)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-warning)' }}>
                    <AlertCircle size={16} />
                    <span style={{ color: 'var(--color-text-main)', fontSize: '0.875rem' }}>DBMS Transactions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Upcoming */}
          <section>
            <SectionHeader title="Upcoming" />
            <Card>
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Calendar size={20} color="var(--color-text-muted)" style={{ marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>Mock Interview</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Tomorrow, 10:00 AM</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Quick Actions */}
          <section>
            <SectionHeader title="Quick Actions" />
            <div className={styles.quickActions}>
              <Link href="/practice">
                <Button variant="outline">Practice</Button>
              </Link>
              <Button variant="outline">Revise</Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
