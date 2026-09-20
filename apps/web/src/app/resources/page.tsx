import React from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink, Book, Video, Wrench, GraduationCap } from 'lucide-react';
import { cookies } from 'next/headers';
import { API_BASE_URL } from '@/services/api';

import ResourcesClient from './ResourcesClient';

async function fetchResources() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(`${API_BASE_URL}/curriculum/resources`, {
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
  const resources = await fetchResources();

  // Group by Track, then by Priority
  const groupedByTrack = resources.reduce((acc: any, r: any) => {
    const trackName = r.topic?.track?.title || 'General';
    const p = r.priority || 'B';
    
    if (!acc[trackName]) acc[trackName] = {};
    if (!acc[trackName][p]) acc[trackName][p] = [];
    
    acc[trackName][p].push(r);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <PageHeader title="Curated Resources" />
      <p className="text-muted-foreground mb-8">
        The best external documentation, books, and courses curated by the platform, organized by priority.
      </p>

      <ResourcesClient groupedResourcesByTrack={groupedByTrack} />
    </div>
  );
}
