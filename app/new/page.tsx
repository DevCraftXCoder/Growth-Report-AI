import { Suspense } from 'react';
import WizardShell from '@/components/wizard/WizardShell';
import { WizardSkeleton } from '@/components/wizard/WizardSkeleton';

export default function NewPage() {
  return (
    <Suspense fallback={<div style={{ padding: 32 }}><WizardSkeleton /></div>}>
      <WizardShell />
    </Suspense>
  );
}
