import React from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { EmptyState } from '@/components/shared/EmptyState';
import { Construction } from 'lucide-react';

export default function Page() {
  return (
    <>
      <PageHeader title="Career" />
      <EmptyState
        icon={<Construction size={24} />}
        title="Career under construction"
        description="Resume, applications, and networking. This section is being built out."
      />
    </>
  );
}
