import React from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { EmptyState } from '@/components/shared/EmptyState';
import { Construction } from 'lucide-react';

export default function Page() {
  return (
    <>
      <PageHeader title="Interview Preparation" />
      <EmptyState
        icon={<Construction size={24} />}
        title="Interview Preparation under construction"
        description="Mock interviews and technical prep. This section is being built out."
      />
    </>
  );
}
