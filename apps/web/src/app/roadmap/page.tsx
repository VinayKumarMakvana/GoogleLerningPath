import React from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { EmptyState } from '@/components/shared/EmptyState';
import { Construction } from 'lucide-react';
import { RoadmapViewer } from '@/components/curriculum/RoadmapViewer';

async function getRoadmap() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/curriculum/roadmap`, {
      cache: 'no-store'
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
