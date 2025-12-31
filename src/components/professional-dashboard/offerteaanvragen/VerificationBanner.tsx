'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function VerificationBanner() {
  const t = useTranslations('common.proDashboard.offerteaanvragen.verificationBanner');

  const handleVerificationClick = () => {
    // TODO: Navigate to verification page
    console.log('Navigate to verification');
  };

  return (
    <div
      className='rounded-xl p-4 sm:p-5 mb-4 sm:mb-6'
      style={{
        background:
          'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)',
      }}
    >
      <h2 className='text-base sm:text-lg font-semibold leading-snug text-secondary-foreground mb-2'>
        {t('title')}
      </h2>
      <p className='text-sm sm:text-base text-muted-foreground leading-snug mb-3 sm:mb-4 max-w-2xl'>
        {t('description')}
      </p>
      <Button onClick={handleVerificationClick} className='w-full sm:w-auto py-3 sm:py-3.5 rounded-xl text-sm sm:text-base'>
        {t('completeButton')}
        <ArrowRight className='w-4 h-4 ml-2' />
      </Button>
    </div>
  );
}
