const fs = require('fs');
const path = require('path');

const routes = [
  { path: 'roadmap', title: 'Roadmap', desc: 'Your personalized learning journey.' },
  { path: 'learn', title: 'Learn', desc: 'Educational content and modules.' },
  { path: 'practice', title: 'Practice', desc: 'DSA, coding, and CS practice problems.' },
  { path: 'projects', title: 'Projects', desc: 'Your flagship and supporting projects.' },
  { path: 'ai-ml', title: 'AI/ML', desc: 'Artificial Intelligence and Machine Learning curriculum.' },
  { path: 'system-design', title: 'System Design', desc: 'System design fundamentals and case studies.' },
  { path: 'interview', title: 'Interview Preparation', desc: 'Mock interviews and technical prep.' },
  { path: 'career', title: 'Career', desc: 'Resume, applications, and networking.' },
  { path: 'resources', title: 'Resources', desc: 'Curated external resources and tools.' },
  { path: 'progress', title: 'Progress', desc: 'Detailed analytics and progress tracking.' },
  { path: 'mentor', title: 'Mentor', desc: 'Your personal AI mentor for guidance.' }
];

const template = (title, desc) => `import React from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { EmptyState } from '@/components/shared/EmptyState';
import { Construction } from 'lucide-react';

export default function Page() {
  return (
    <>
      <PageHeader title="${title}" />
      <EmptyState
        icon={<Construction size={24} />}
        title="${title} under construction"
        description="${desc} This section is being built out."
      />
    </>
  );
}
`;

routes.forEach(route => {
  const dirPath = path.join(__dirname, 'apps', 'web', 'src', 'app', route.path);
  if (fs.existsSync(dirPath)) {
    fs.writeFileSync(path.join(dirPath, 'page.tsx'), template(route.title, route.desc));
    console.log(`Created page for ${route.path}`);
  }
});
