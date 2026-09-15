import React from 'react';
import { PageHeader } from '@/components/shared/Headers';
import { EmptyState } from '@/components/shared/EmptyState';
import { Construction } from 'lucide-react';

export default function Page() {
  return (
    <>
      <PageHeader title="AI/ML" />
      <EmptyState
        icon={<Construction size={24} />}
        title="AI/ML under construction"
        description="Artificial Intelligence and Machine Learning curriculum. This section is being built out."
      />
    </>
  );
}
