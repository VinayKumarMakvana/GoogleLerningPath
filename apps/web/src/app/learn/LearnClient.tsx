'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

export default function LearnClient({ groupedTopics }: { groupedTopics: Record<string, any[]> }) {
  const trackNames = Object.keys(groupedTopics).sort();
  
  // Default to Backend Engineering if it exists, otherwise the first track
  const defaultTrack = trackNames.includes('Backend Engineering') 
    ? 'Backend Engineering' 
    : trackNames[0];

  const [activeTrack, setActiveTrack] = useState<string>(defaultTrack);

  if (trackNames.length === 0) {
    return (
      <div className="text-center p-12 bg-card rounded-lg border">
        <p className="text-muted-foreground">No curriculum available yet.</p>
      </div>
    );
  }

  const activeTopics = groupedTopics[activeTrack] || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-8 border-b pb-4">
        {trackNames.map(trackName => (
          <button
            key={trackName}
            onClick={() => setActiveTrack(trackName)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTrack === trackName 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {trackName}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{activeTrack}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTopics.map((topic: any) => (
            <Link href={`/topics/${topic.id}`} key={topic.id}>
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer flex flex-col">
                <CardHeader className="pb-2 flex-grow-0">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg line-clamp-2">{topic.title}</CardTitle>
                    {topic.progress === 'COMPLETED' && (
                      <Badge variant="default" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 shrink-0">Done</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-end">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {topic.description || 'Learn the fundamentals'}
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {topic.estimatedLearnTime} mins
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {topic.difficulty || 'BEGINNER'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
