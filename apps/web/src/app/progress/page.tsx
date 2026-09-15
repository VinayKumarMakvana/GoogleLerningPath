import React from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { EmptyState } from '@/components/shared/EmptyState';
import { Construction } from 'lucide-react';

export default function Page() {
  return (
    <>
      <PageHeader title="Progress" />
      <EmptyState
        icon={<Construction size={24} />}
        title="Progress under construction"
        description="Detailed analytics and progress tracking. This section is being built out."
      />
    </>
  );
}
