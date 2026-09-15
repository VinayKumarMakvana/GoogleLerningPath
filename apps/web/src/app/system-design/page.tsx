import React from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { EmptyState } from '@/components/shared/EmptyState';
import { Construction } from 'lucide-react';

export default function Page() {
  return (
    <>
      <PageHeader title="System Design" />
      <EmptyState
        icon={<Construction size={24} />}
        title="System Design under construction"
        description="System design fundamentals and case studies. This section is being built out."
      />
    </>
  );
}
