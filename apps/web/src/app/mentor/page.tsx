import React from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { EmptyState } from '@/components/shared/EmptyState';
import { Construction } from 'lucide-react';

export default function Page() {
  return (
    <>
      <PageHeader title="Mentor" />
      <EmptyState
        icon={<Construction size={24} />}
        title="Mentor under construction"
        description="Your personal AI mentor for guidance. This section is being built out."
      />
    </>
  );
}
