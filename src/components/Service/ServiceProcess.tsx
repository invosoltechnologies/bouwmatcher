'use client';

import { Button } from '@/components/ui/button';
import ProcessSteps, { ProcessStep } from '@/components/ui/process-steps';
import { ReactNode } from 'react';

interface ServiceProcessProps {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
  showCTA?: boolean;
  ctaButtons?: ReactNode;
}

export default function ServiceProcess({
  title,
  subtitle,
  steps,
  showCTA = false,
  ctaButtons,
}: ServiceProcessProps) {
  return (
    <ProcessSteps
      steps={steps}
      title={title}
      subtitle={subtitle}
      showCTA={showCTA}
      ctaButtons={ctaButtons}
    />
  );
}
