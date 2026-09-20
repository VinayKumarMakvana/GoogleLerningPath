"use client";

import React, { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { Card, CardContent } from '@/components/ui/Card';
import { projectApi } from '@/services/projectApi';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    projectApi.getProjects().then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading projects...</div>;

  return (
    <div className={styles.container}>
      <PageHeader 
        title="Engineering Projects" 
        subtitle="Build production-grade systems to prove your engineering capabilities."
      />

      <div className={styles.grid}>
        {projects.map((project) => (
          <Card 
            key={project.id as string} 
            className={styles.projectCard}
            onClick={() => router.push(`/projects/${project.slug as string}`)}
          >
            <CardContent style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className={styles.cardHeader}>
                <div className={styles.title}>{project.title as string}</div>
                <div className={`${styles.badge} ${
                  project.status === 'COMPLETED' ? styles.badgeCompleted :
                  project.status === 'ACTIVE' ? styles.badgeActive :
                  styles.badgeNotStarted
                }`}>
                  {(project.status as string).replace('_', ' ')}
                </div>
              </div>
              
              <div className={styles.description}>{project.description as string}</div>
              
              <div style={{ flexGrow: 1 }} />
              
              <div className={styles.stats}>
                <span>{project.projectType as string}</span>
                <span>{project.completedTasks as number} / {project.totalTasks as number} Tasks</span>
              </div>
              
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${project.progress}%`, height: '100%' }}
                />
              </div>

              <div className={styles.technologies}>
                {(project.technologies as string[]).slice(0, 3).map((t: string) => (
                  <span key={t} className={styles.techTag}>{t}</span>
                ))}
                {(project.technologies as string[]).length > 3 && (
                  <span className={styles.techTag}>+{(project.technologies as string[]).length - 3}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
