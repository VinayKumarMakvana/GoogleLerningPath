import React from 'react';
import { cookies } from 'next/headers';
import { BookOpen, Layers } from 'lucide-react';
import { API_BASE_URL } from '@/services/api';
import LearnClient from './LearnClient';
import styles from './page.module.css';

async function fetchTopics() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(`${API_BASE_URL}/curriculum/topics`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  });

  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function Page() {
  const topics = await fetchTopics();

  // Group topics by track
  const grouped = topics.reduce((acc: any, topic: any) => {
    const trackName = topic.track?.title || 'General';
    if (!acc[trackName]) acc[trackName] = [];
    acc[trackName].push(topic);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      {/* Hero Header */}
      <div className={styles.heroHeader}>
        <span className={styles.heroBadge}>
          <Layers size={14} /> Full Spectrum SWE Syllabus
        </span>
        <h1 className={styles.heroTitle}>Engineering Curriculum & Tracks</h1>
        <p className={styles.heroSubtitle}>
          Complete structured engineering syllabus covering C++ / Systems, DSA Patterns, Computer Science Fundamentals (OS, DBMS, Networks), and Backend Infrastructure.
        </p>
      </div>

      <LearnClient groupedTopics={grouped} />
    </div>
  );
}
