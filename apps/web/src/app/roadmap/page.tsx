import React from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { EmptyState } from '@/components/shared/EmptyState';
import { Construction } from 'lucide-react';
import { RoadmapViewer } from '@/components/curriculum/RoadmapViewer';

export const dynamic = 'force-dynamic';

async function getRoadmap() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
    
    // Phase 8D: Extract JWT token securely from cookies for SSR
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const res = await fetch(`${apiUrl}/curriculum/roadmap`, {
      cache: 'no-store',
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    });
    if (!res.ok) {
      throw new Error('Failed to fetch roadmap');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Page() {
  const roadmap = await getRoadmap();

  return (
    <>
      <PageHeader title="Roadmap" description="Your personalized learning journey." />
      {roadmap ? (
        <RoadmapViewer roadmap={roadmap} />
      ) : (
        <EmptyState
          icon={<Construction size={24} />}
          title="Roadmap Unavailable"
          description="Failed to load curriculum data from the server."
        />
      )}
    </>
  );
}
