'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink, Book, Video, Wrench, GraduationCap } from 'lucide-react';

function getIcon(type: string) {
  switch (type) {
    case 'VIDEO': return <Video size={18} className="text-blue-500" />;
    case 'COURSE': return <GraduationCap size={18} className="text-purple-500" />;
    case 'TOOL': return <Wrench size={18} className="text-orange-500" />;
    case 'BOOK': return <Book size={18} className="text-amber-700" />;
    case 'ARTICLE':
    default:
      return <Book size={18} className="text-emerald-500" />;
  }
}

export default function ResourcesClient({ groupedResourcesByTrack }: { groupedResourcesByTrack: Record<string, Record<string, any[]>> }) {
  const trackNames = Object.keys(groupedResourcesByTrack).sort();
  
  const defaultTrack = trackNames.includes('Backend Engineering') 
    ? 'Backend Engineering' 
    : trackNames[0];

  const [activeTrack, setActiveTrack] = useState<string>(defaultTrack);

  if (trackNames.length === 0) {
    return (
      <div className="text-center p-12 bg-card rounded-lg border">
        <p className="text-muted-foreground">No resources available yet.</p>
      </div>
    );
  }

  const activeGrouped = groupedResourcesByTrack[activeTrack] || {};

  const priorityLabels: Record<string, string> = {
    'S': 'S-Tier (Must Read)',
    'A': 'A-Tier (Highly Recommended)',
    'B': 'B-Tier (Good Reference)'
  };

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

      <h2 className="text-2xl font-bold tracking-tight mb-2">{activeTrack} Resources</h2>
      
      {['S', 'A', 'B'].map((priority) => {
        if (!activeGrouped[priority] || activeGrouped[priority].length === 0) return null;
        return (
          <div key={priority} className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight mt-8 border-b pb-2">
              {priorityLabels[priority]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeGrouped[priority].map((r: any) => (
                <a href={r.url} target="_blank" rel="noopener noreferrer" key={r.id}>
                  <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group flex flex-col">
                    <CardHeader className="pb-2 flex-grow-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-start gap-2">
                          <div className="mt-1">{getIcon(r.type)}</div>
                          <CardTitle className="text-base leading-tight group-hover:text-primary transition-colors">
                            {r.title}
                          </CardTitle>
                        </div>
                        <ExternalLink size={16} className="text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-end">
                      {r.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-2 mb-3">
                          {r.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {r.topic && (
                          <Badge variant="secondary" className="text-xs font-normal">
                            Topic: {r.topic.title}
                          </Badge>
                        )}
                        {r.source && (
                          <Badge variant="outline" className="text-xs font-normal border-blue-500/30 text-blue-500">
                            {r.source}
                          </Badge>
                        )}
                        {r.isOfficial && (
                          <Badge variant="default" className="text-xs font-normal bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">
                            Official
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
