import React from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { API_BASE_URL } from '@/services/api';

import LearnClient from './LearnClient';

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
    <div className="space-y-6">
      <PageHeader title="Curriculum" />
      <p className="text-muted-foreground mb-8">
        Select a Track to view its specific modules and topics.
      </p>
      
      <LearnClient groupedTopics={grouped} />
    </div>
  );
}
