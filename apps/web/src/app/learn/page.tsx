import React from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { EmptyState } from '@/components/shared/EmptyState';
import { Construction } from 'lucide-react';

export default function Page() {
  return (
    <>
      <PageHeader title="Learn" />
      <EmptyState
        icon={<Construction size={24} />}
        title="Learn under construction"
        description="Educational content and modules. This section is being built out."
      />
    </>
  );
}
