import React from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { EmptyState } from '@/components/shared/EmptyState';
import { Construction } from 'lucide-react';

export default function Page() {
  return (
    <>
      <PageHeader title="Resources" />
      <EmptyState
        icon={<Construction size={24} />}
        title="Resources under construction"
        description="Curated external resources and tools. This section is being built out."
      />
    </>
  );
}
