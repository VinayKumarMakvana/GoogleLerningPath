import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PlayCircle, Clock } from 'lucide-react';
import { PracticeProblem } from '@/services/practiceApi';
import styles from './ProblemCard.module.css';

interface ProblemCardProps {
  problem: PracticeProblem;
  attemptState?: string; // STARTED, SOLVED, FAILED
}

export function ProblemCard({ problem, attemptState }: ProblemCardProps) {
  const getDifficultyVariant = (diff: string) => {
    switch (diff) {
      case 'EASY': return 'success';
      case 'MEDIUM': return 'warning';
      case 'HARD': return 'error';
      default: return 'default';
    }
  };

  const getStatusBadge = () => {
    if (attemptState === 'SOLVED') return <Badge variant="success">Solved</Badge>;
    if (attemptState === 'STARTED') return <Badge variant="warning">In Progress</Badge>;
    if (attemptState === 'FAILED') return <Badge variant="error">Needs Review</Badge>;
    return null;
  };

  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <div className={styles.mainInfo}>
          <div className={styles.header}>
            <Link href={`/practice/${problem.slug}`} className={styles.title}>
              {problem.title}
            </Link>
            {getStatusBadge()}
          </div>
          
          <div className={styles.meta}>
            <Badge variant={getDifficultyVariant(problem.difficulty) as "success" | "warning" | "error" | "default"}>
              {problem.difficulty}
            </Badge>
            {problem.platform && (
              <Badge variant="outline">{problem.platform}</Badge>
            )}
            {problem.expectedTime && (
              <span className={styles.complexity}>
                <Clock size={12} /> {problem.expectedTime}
              </span>
            )}
          </div>

          <div className={styles.tags}>
            {problem.patterns?.map(p => (
              <Badge key={p.id} variant="secondary">{p.name}</Badge>
            ))}
            {problem.topics?.map(t => (
              <Badge key={t.id} variant="default" className={styles.topicBadge}>{t.title}</Badge>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <Link href={`/practice/${problem.slug}`} className={styles.solveButton}>
            <PlayCircle size={16} /> {attemptState === 'SOLVED' ? 'Review' : 'Solve'}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
