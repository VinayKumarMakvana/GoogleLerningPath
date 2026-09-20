"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/Headers';
import { practiceApi, PracticeProblem, PracticeAttempt, PracticeDashboardData } from '@/services/practiceApi';
import { ProblemCard } from '@/components/practice/ProblemCard';
import styles from './page.module.css';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, AlertCircle, TrendingUp, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { plannerApi, DailyPlan } from '@/services/plannerApi';

function PracticeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [problems, setProblems] = useState<PracticeProblem[]>([]);
  const [attempts, setAttempts] = useState<Record<string, string>>({}); // problemId -> status
  const [dashboard, setDashboard] = useState<PracticeDashboardData | null>(null);
  const [studyPlan, setStudyPlan] = useState<DailyPlan | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'ALL'>('DASHBOARD');
  
  const [filters, setFilters] = useState({ 
    difficulty: '', 
    platform: '',
    topic: searchParams.get('topic') || ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [problemsRes, attemptsRes, dashboardRes, planRes] = await Promise.all([
          practiceApi.getProblems(filters),
          practiceApi.getMyAttempts(),
          practiceApi.getDashboard(),
          plannerApi.getTodayPlan().catch(() => null)
        ]);
        
        setProblems(problemsRes.data || []);
        setDashboard(dashboardRes);
        setStudyPlan(planRes);
        
        const attemptMap: Record<string, string> = {};
        if (attemptsRes && Array.isArray(attemptsRes)) {
          attemptsRes.forEach((a: PracticeAttempt) => {
            attemptMap[a.practice.slug] = a.status;
          });
        }
        setAttempts(attemptMap);
      } catch (error) {
        console.error('Failed to fetch practice data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setActiveTab('ALL'); // switch to ALL when filtering
  };

  return (
    <div className={styles.container}>
      <PageHeader 
        title="Practice Arena" 
        description="Master Data Structures & Algorithms with curated, high-quality problems." 
      />

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'DASHBOARD' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('DASHBOARD')}
        >
          Dashboard
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'ALL' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('ALL')}
        >
          All Problems
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading arena...</div>
      ) : activeTab === 'DASHBOARD' && dashboard ? (
        <div className={styles.dashboard}>
          <div className={styles.dashboardGrid}>
            <div className={styles.mainCol}>
              <h2><TrendingUp size={20} /> Your Journey</h2>
              <div className={styles.cardsRow}>
                {dashboard.continuePractice && (
                  <Card className={styles.highlightCard} onClick={() => router.push(`/practice/${dashboard.continuePractice?.slug}`)}>
                    <CardContent>
                      <Badge variant="secondary" className={styles.cardBadge}>Continue Practice</Badge>
                      <h3>{dashboard.continuePractice.title}</h3>
                      <div className={styles.cardMeta}>
                        <span>{dashboard.continuePractice.difficulty}</span>
                        <span>{dashboard.continuePractice.platform}</span>
                      </div>
                      <div className={styles.cardAction}>Resume <ArrowRight size={14} /></div>
                    </CardContent>
                  </Card>
                )}

                {dashboard.recommendedNext && (
                  <Card className={styles.highlightCard} onClick={() => router.push(`/practice/${dashboard.recommendedNext?.slug}`)}>
                    <CardContent>
                      <Badge variant="success" className={styles.cardBadge}>Recommended Next</Badge>
                      <h3>{dashboard.recommendedNext.title}</h3>
                      <div className={styles.cardMeta}>
                        <span>{dashboard.recommendedNext.difficulty}</span>
                        <span>{dashboard.recommendedNext.platform}</span>
                      </div>
                      <div className={styles.cardAction}>Start <ArrowRight size={14} /></div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className={styles.reviewSection}>
                <h2><AlertCircle size={20} /> Review Today</h2>
                {dashboard.needsReview.length === 0 ? (
                  <div className={styles.emptyState}>Your review queue is empty. Great job!</div>
                ) : (
                  <div className={styles.problemList}>
                    {dashboard.needsReview.map(problem => (
                      <ProblemCard key={problem.id} problem={problem} attemptState="NEEDS_REVIEW" />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.sideCol}>
              <h2>Today&apos;s Plan</h2>
              <Card className={styles.patternCard} style={{ marginBottom: '1.5rem', cursor: 'pointer' }} onClick={() => router.push('/study-plan')}>
                <CardContent>
                  {studyPlan ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>{studyPlan.completedTime}m / {studyPlan.targetTime}m</strong>
                        <Badge variant={studyPlan.status === 'COMPLETED' ? 'success' : 'outline'} size="sm">{studyPlan.status}</Badge>
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {studyPlan.tasks.filter(t => t.status === 'COMPLETED').length} of {studyPlan.tasks.length} tasks completed
                      </div>
                      <div className={styles.cardAction} style={{ marginTop: '0.5rem' }}>View Plan <ArrowRight size={14} /></div>
                    </div>
                  ) : (
                    <div className={styles.emptyState}>
                      <Target size={24} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                      <div>No active study plan.</div>
                      <div className={styles.cardAction} style={{ marginTop: '0.5rem' }}>Generate Plan <ArrowRight size={14} /></div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <h2>Pattern Mastery</h2>
              <Card className={styles.patternCard}>
                <CardContent>
                  {dashboard.patternStats.length === 0 ? (
                    <div className={styles.emptyState}>No patterns available.</div>
                  ) : (
                    <div className={styles.patternList}>
                      {dashboard.patternStats.map(stat => {
                        let badgeVariant: 'default' | 'success' | 'warning' | 'error' | 'outline' = 'default';
                        if (stat.state === 'MASTERED') badgeVariant = 'success';
                        else if (stat.state === 'REVIEW') badgeVariant = 'error';
                        else if (stat.state === 'PRACTICING') badgeVariant = 'warning';
                        else badgeVariant = 'outline';

                        return (
                          <div key={stat.id} className={`${styles.patternRow} ${stat.isWeak ? styles.weakPattern : ''}`}>
                            <div className={styles.patternInfo}>
                              <strong>{stat.name}</strong>
                              <Badge variant={badgeVariant} size="sm">{stat.state.replace('_', ' ')}</Badge>
                            </div>
                            <div className={styles.patternBars}>
                              <div className={styles.progressText}>
                                {stat.solved} solved, {stat.struggled} review needed (Total: {stat.total})
                              </div>
                              <div className={styles.progressBar}>
                                <div className={styles.progressFillSolved} style={{ width: `${(stat.solved / stat.total) * 100}%` }}></div>
                                <div className={styles.progressFillStruggled} style={{ width: `${(stat.struggled / stat.total) * 100}%`, left: `${(stat.solved / stat.total) * 100}%` }}></div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.allProblems}>
          <div className={styles.controls}>
            <select 
              name="difficulty" 
              value={filters.difficulty} 
              onChange={handleFilterChange}
              className={styles.select}
            >
              <option value="">All Difficulties</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>

            <select 
              name="platform" 
              value={filters.platform} 
              onChange={handleFilterChange}
              className={styles.select}
            >
              <option value="">All Platforms</option>
              <option value="LEETCODE">LeetCode</option>
              <option value="CODEFORCES">Codeforces</option>
            </select>
          </div>

          <div className={styles.problemList}>
            {problems.length === 0 ? (
              <div className={styles.emptyState}>
                No problems found matching these criteria.
              </div>
            ) : (
              problems.map(problem => (
                <ProblemCard 
                  key={problem.id} 
                  problem={problem} 
                  attemptState={attempts[problem.slug]} 
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem' }}>Loading practice arena...</div>}>
      <PracticeContent />
    </Suspense>
  );
}
