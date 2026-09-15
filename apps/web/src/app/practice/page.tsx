import React from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { EmptyState } from '@/components/shared/EmptyState';
import { Construction } from 'lucide-react';

export default function Page() {
  return (
    <>
      <PageHeader title="Practice" />
      <EmptyState
        icon={<Construction size={24} />}
        title="Practice under construction"
        description="DSA, coding, and CS practice problems. This section is being built out."
      />
    </>
  );
}
