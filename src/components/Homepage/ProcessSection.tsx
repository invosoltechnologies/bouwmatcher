'use client';
import { Button } from '@/components/ui/button';
import ProcessSteps, { ProcessStep } from '@/components/ui/process-steps';
import { useTranslations } from 'next-intl';

export default function ProcessSection() {
  const t = useTranslations('homepage.process');

  const processSteps: ProcessStep[] = [
    {
      id: 1,
      title: t('step1Title'),
      description: t('step1Description'),
      icon: '/icons/process/step1-icon.svg',
      image: '/images/homepage/process/step1.png',
    },
    {
      id: 2,
      title: t('step2Title'),
      description: t('step2Description'),
      icon: '/icons/process/step2-icon.svg',
      image: '/images/homepage/process/step2.png',
    },
    {
      id: 3,
      title: t('step3Title'),
      description: t('step3Description'),
      icon: '/icons/process/step3-icon.svg',
      image: '/images/homepage/process/step3.png',
    },
    {
      id: 4,
      title: t('step4Title'),
      description: t('step4Description'),
      icon: '/icons/process/step4-icon.svg',
      image: '/images/homepage/process/step4.png',
    },
  ];

  const ctaButtons = (
    <>
      <Button
        variant='default'
        size='lg'
        className='bg-primary hover:bg-primary/90 text-white font-medium px-6 py-4 rounded-[12px] text-base'
      >
        {t('ctaPrimary')}
      </Button>
      <Button
        variant='default'
        size='lg'
        className='bg-accent hover:bg-accent/90 text-white font-medium px-6 py-4 rounded-[12px] text-base'
      >
        {t('ctaSecondary')}
      </Button>
    </>
  );

  return (
    <ProcessSteps
      steps={processSteps}
      title={t('title')}
      subtitle={t('subtitle')}
      showCTA={true}
      ctaButtons={ctaButtons}
    />
  );
}