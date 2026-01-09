'use client';

import { CTA } from '@/components/ui/cta';
import { ReactNode } from 'react';

interface ServiceCTAProps {
  heading: string;
  description: string;
  ctaText: string;
  ctaAction?: () => void;
}

export default function ServiceCTA({
  heading,
  description,
  ctaText,
  ctaAction,
}: ServiceCTAProps) {
  const handleClick = ctaAction || (() => {
    window.location.href = 'mailto:info@bouwmatcher.nl';
  });

  return (
    <section className='w-full my-8 md:my-14 lg:my-20.5'>
      <div className='custom-container'>
        <CTA
          heading={heading}
          description={description}
          ctaText={ctaText}
          ctaAction={handleClick}
        />
      </div>
    </section>
  );
}
