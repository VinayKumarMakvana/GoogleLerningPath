"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PlayCircle, 
  Target, 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Flame, 
  Code2, 
  Network, 
  Bot, 
  ArrowRight, 
  Zap, 
  Award,
  Layers,
  Sparkles,
  Loader2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { dashboardApi, DashboardData } from '@/services/dashboardApi';
import { plannerApi, DailyPlanTask } from '@/services/plannerApi';
import styles from './page.module.css';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Array<{ id: string; title: string; category: string; time: string; completed: boolean }>>([
    { id: '1', title: 'Solve: LRU Cache (High Frequency Google Question)', category: 'DSA Practice', time: '30 min', completed: true },
    { id: '2', title: 'Deep Dive: Distributed Caching & Invalidation Patterns', category: 'System Design', time: '45 min', completed: true },
    { id: '3', title: 'Solve: Minimum Window Substring (Sliding Window)', category: 'DSA Practice', time: '35 min', completed: false },
    { id: '4', title: 'System Design: Design a High-Throughput Distributed Rate Limiter', category: 'System Design', time: '40 min', completed: false },
    { id: '5', title: 'Mock Interview: Explain CAP Theorem & Trade-offs at Scale', category: 'Interview Practice', time: '30 min', completed: false }
  ]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const dashboard = await dashboardApi.getDashboard();
        if (dashboard) {
          setData(dashboard);
          if (dashboard.todayPlan && dashboard.todayPlan.tasks && dashboard.todayPlan.tasks.length > 0) {
            setTasks(dashboard.todayPlan.tasks.map((t: DailyPlanTask) => ({
              id: t.id,
              title: t.title,
              category: t.type.replace('_', ' '),
              time: `${t.estimatedMinutes} min`,
              completed: t.status === 'COMPLETED'
            })));
          }
        }
      } catch (err) {
        console.warn('Dashboard live fetch fallback to initialized data', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const toggleTask = async (id: string) => {
    // Optimistic UI update
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    try {
      await plannerApi.completeTask(id);
    } catch (err) {
      // Graceful fallback
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
  const streakDays = data?.streak || 14;

  const solvedCount = 142;
  const totalDsa = 250;

  return (
    <div className={styles.container}>
      {/* Hero / Executive Header */}
      <div className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadgeRow}>
            <span className={styles.livePulseDot} />
            <span className={styles.heroTargetBadge}>
              {data?.profile?.targetRole || 'Google SWE L5 Prep'}
            </span>
            <span className={styles.heroPhase}>Phase 2: Advanced Distributed Systems & Concurrency</span>
          </div>
          <h1 className={styles.heroTitle}>Engineering Command Center</h1>
          <p className={styles.heroSubtitle}>
            Welcome back, <strong style={{ color: '#fff' }}>Vinay</strong>. You are tracking in the <span className={styles.highlightText}>top 5% velocity</span> this week. Keep your streak alive to hit your upcoming Google L5 onsite milestone.
          </p>
        </div>
        
        <div className={styles.heroActions}>
          <Link href="/practice">
            <Button size="lg" className={styles.quickStartBtn}>
              <Zap size={18} /> Daily Drill
            </Button>
          </Link>
          <Link href="/mentor">
            <Button variant="secondary" size="lg">
              <Bot size={18} /> Ask AI Mentor
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Key Performance Metrics Grid */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricTitle}>DSA Problems Solved</span>
            <div className={`${styles.metricIconWrap} ${styles.blueIcon}`}>
              <Code2 size={18} />
            </div>
          </div>
          <div className={styles.metricValueRow}>
            <span className={styles.metricValue}>{solvedCount}</span>
            <span className={styles.metricTotal}>/ {totalDsa}</span>
          </div>
          <div className={styles.metricFooter}>
            <span className={styles.trendPositive}>
              <TrendingUp size={14} /> +12 this week
            </span>
            <span className={styles.metricSubtext}>57% of core curriculum</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricTitle}>System Design Mastery</span>
            <div className={`${styles.metricIconWrap} ${styles.purpleIcon}`}>
              <Network size={18} />
            </div>
          </div>
          <div className={styles.metricValueRow}>
            <span className={styles.metricValue}>13</span>
            <span className={styles.metricTotal}>/ 13 Modules</span>
          </div>
          <div className={styles.metricFooter}>
            <span className={styles.trendPositive}>
              <Sparkles size={14} /> High-Scale Certified
            </span>
            <span className={styles.metricSubtext}>Distributed caching & sharding done</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricTitle}>Mock Interview Score</span>
            <div className={`${styles.metricIconWrap} ${styles.cyanIcon}`}>
              <Award size={18} />
            </div>
          </div>
          <div className={styles.metricValueRow}>
            <span className={styles.metricValue}>88%</span>
          </div>
          <div className={styles.metricFooter}>
            <Badge variant="primary">Google L5 Ready</Badge>
            <span className={styles.metricSubtext}>Last bar-raiser: 92/100</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricTitle}>Active Daily Streak</span>
            <div className={`${styles.metricIconWrap} ${styles.amberIcon}`}>
              <Flame size={18} />
            </div>
          </div>
          <div className={styles.metricValueRow}>
            <span className={styles.metricValue}>{streakDays}</span>
            <span className={styles.metricTotal}>Days</span>
          </div>
          <div className={styles.metricFooter}>
            <span className={styles.trendAmber}>
              <Flame size={14} /> Top 5% Consistency
            </span>
            <span className={styles.metricSubtext}>Personal Best: 21d</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className={styles.dashboardGrid}>
        {/* Main Column */}
        <div className={styles.mainColumn}>
          {/* Active Module / Resume Solving Card */}
          <section>
            <div className={styles.sectionHeaderRow}>
              <h2 className={styles.sectionTitle}>
                <Layers size={18} className={styles.sectionIcon} />
                Continue Where You Left Off
              </h2>
              <Badge variant="outline">Priority 1</Badge>
            </div>
            
            <Card className={styles.resumeCard}>
              <CardContent className={styles.resumeCardContent}>
                <div className={styles.resumeHeader}>
                  <div className={styles.resumeInfo}>
                    <div className={styles.tagGroup}>
                      <span className={styles.topicBadge}>Binary Search</span>
                      <span className={styles.difficultyBadge}>Medium</span>
                      <span className={styles.companyBadge}>Google Top Pick</span>
                    </div>
                    <h3 className={styles.problemTitle}>
                      Capacity To Ship Packages Within D Days
                    </h3>
                    <p className={styles.problemDesc}>
                      Pattern: Search Space Reduction over monotonic predicate function. Standard Google L4/L5 assessment filter.
                    </p>
                  </div>
                  
                  <Link href="/practice" className={styles.resumeBtnWrapper}>
                    <Button size="lg" className={styles.resumeBtn}>
                      <PlayCircle size={18} /> Resume Coding
                    </Button>
                  </Link>
                </div>

                <div className={styles.resumeProgressSection}>
                  <div className={styles.progressLabels}>
                    <span className={styles.progressText}>Module Progress (Search Space Reduction)</span>
                    <span className={styles.progressPercentText}>65%</span>
                  </div>
                  <ProgressBar progress={65} size="md" />
                  <div className={styles.progressMeta}>
                    <span>3 of 5 patterns completed</span>
                    <span>Estimated time remaining: 25 mins</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Today's Focus & Execution Queue */}
          <section>
            <div className={styles.sectionHeaderRow}>
              <div className={styles.sectionTitleWithSub}>
                <h2 className={styles.sectionTitle}>Today's Focus & Study Plan</h2>
                <span className={styles.sectionSubtext}>
                  {completedCount} of {tasks.length} goals completed ({progressPercent}%)
                </span>
              </div>
              <Badge variant={progressPercent === 100 ? "success" : "primary"}>
                {progressPercent === 100 ? "All Done! 🎉" : "Target: 3.5 Hours"}
              </Badge>
            </div>

            <Card>
              <CardContent className={styles.planCardContent}>
                <div className={styles.planProgressWrapper}>
                  <ProgressBar progress={progressPercent} size="sm" />
                </div>

                <div className={styles.tasksList}>
                  {tasks.map(task => (
                    <div 
                      key={task.id} 
                      className={`${styles.taskItem} ${task.completed ? styles.taskCompleted : ''}`}
                      onClick={() => toggleTask(task.id)}
                    >
                      <button 
                        className={styles.taskCheckbox} 
                        aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
                      >
                        <CheckCircle2 
                          size={19} 
                          className={task.completed ? styles.checkedIcon : styles.uncheckedIcon} 
                        />
                      </button>
                      
                      <div className={styles.taskDetails}>
                        <span className={styles.taskTitle}>{task.title}</span>
                        <div className={styles.taskMeta}>
                          <span className={styles.taskCategory}>{task.category}</span>
                          <span className={styles.taskDot}>•</span>
                          <span className={styles.taskTime}>
                            <Clock size={12} /> {task.time}
                          </span>
                        </div>
                      </div>

                      <div className={styles.taskAction}>
                        <span className={styles.taskStatusText}>
                          {task.completed ? 'Completed' : 'Click to complete'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Side Column */}
        <div className={styles.sideColumn}>
          {/* AI Diagnostic & Targeted Weakness Attention */}
          <section>
            <div className={styles.sectionHeaderRow}>
              <h2 className={styles.sectionTitle}>
                <AlertTriangle size={17} className={styles.warningIcon} />
                Needs Attention
              </h2>
            </div>
            
            <Card className={styles.attentionCard}>
              <CardContent className={styles.attentionCardContent}>
                <div className={styles.attentionList}>
                  <div className={styles.attentionItem}>
                    <div className={styles.attentionTop}>
                      <span className={styles.attentionCategory}>Distributed Caching</span>
                      <span className={styles.accuracyWarning}>L5 System Design</span>
                    </div>
                    <div className={styles.attentionTitle}>Thundering Herd & Cache Stampede</div>
                    <p className={styles.attentionHint}>
                      Flagged by AI Diagnostic: Review Mutex/Locking vs Probabilistic Early Expiration (XFetch algorithm).
                    </p>
                    <Link href="/system-design">
                      <Button variant="outline" size="sm" className={styles.drillBtn}>
                        Review Chapter <ArrowRight size={13} />
                      </Button>
                    </Link>
                  </div>

                  <div className={styles.attentionItem}>
                    <div className={styles.attentionTop}>
                      <span className={styles.attentionCategory}>Sliding Window</span>
                      <span className={styles.accuracyWarning}>Hard Frequency</span>
                    </div>
                    <div className={styles.attentionTitle}>Subarrays with K Different Integers</div>
                    <p className={styles.attentionHint}>
                      AtMost(K) - AtMost(K-1) dual-pass optimization pattern needs reinforcement.
                    </p>
                    <Link href="/practice">
                      <Button variant="outline" size="sm" className={styles.drillBtn}>
                        Targeted Drill <ArrowRight size={13} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Upcoming Schedule & Deadlines */}
          <section>
            <div className={styles.sectionHeaderRow}>
              <h2 className={styles.sectionTitle}>
                <Calendar size={17} className={styles.calendarIcon} />
                Upcoming Milestones
              </h2>
            </div>

            <Card>
              <CardContent className={styles.milestoneCardContent}>
                <div className={styles.milestoneList}>
                  <div className={styles.milestoneItem}>
                    <div className={styles.milestoneDateBox}>
                      <span className={styles.milestoneMonth}>NOV</span>
                      <span className={styles.milestoneDay}>03</span>
                    </div>
                    <div className={styles.milestoneDetails}>
                      <div className={styles.milestoneName}>Google Mixed Assessment A6</div>
                      <div className={styles.milestoneTime}>60-min timed proctored exam</div>
                    </div>
                  </div>

                  <div className={styles.milestoneItem}>
                    <div className={styles.milestoneDateBox}>
                      <span className={styles.milestoneMonth}>NOV</span>
                      <span className={styles.milestoneDay}>05</span>
                    </div>
                    <div className={styles.milestoneDetails}>
                      <div className={styles.milestoneName}>AI Mock Interview (System Design)</div>
                      <div className={styles.milestoneTime}>Distributed Rate Limiter & Token Bucket</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Quick Velocity Tools */}
          <section>
            <div className={styles.sectionHeaderRow}>
              <h2 className={styles.sectionTitle}>Specialized Hubs</h2>
            </div>
            
            <div className={styles.velocityGrid}>
              <Link href="/assessments">
                <div className={styles.velocityCard}>
                  <Award size={18} className={styles.velIconBlue} />
                  <span className={styles.velTitle}>Assessments</span>
                </div>
              </Link>
              <Link href="/interview">
                <div className={styles.velocityCard}>
                  <Bot size={18} className={styles.velIconCyan} />
                  <span className={styles.velTitle}>Mock Interview</span>
                </div>
              </Link>
              <Link href="/system-design">
                <div className={styles.velocityCard}>
                  <Network size={18} className={styles.velIconPurple} />
                  <span className={styles.velTitle}>System Design</span>
                </div>
              </Link>
              <Link href="/ai-ml">
                <div className={styles.velocityCard}>
                  <Sparkles size={18} className={styles.velIconAmber} />
                  <span className={styles.velTitle}>AI / ML Systems</span>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
