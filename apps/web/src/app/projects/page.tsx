import React from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { EmptyState } from '@/components/shared/EmptyState';
import { Construction } from 'lucide-react';

export default function Page() {
  return (
    <>
      <PageHeader title="Projects" />
      <EmptyState
        icon={<Construction size={24} />}
        title="Projects under construction"
        description="Your flagship and supporting projects. This section is being built out."
      />
    </>
  );
}
