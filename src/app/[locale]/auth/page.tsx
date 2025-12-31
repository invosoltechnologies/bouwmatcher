'use client';

import FAQSection from "@/components/Homepage/FAQSection";
import ReviewsSection from "@/components/Homepage/ReviewsSection";
import StatsSection from "@/components/Homepage/StatsSection";
import Values, { ValueItem } from "@/components/Homepage/Values";
import ProcessSteps, { ProcessStep } from "@/components/ui/process-steps";
import DefaultLayout from "@/components/DefaultLayout";
import HeroAuth from "@/components/auth/HeroAuth";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function AuthPage() {
  const t = useTranslations('auth');

  const authValuesData: ValueItem[] = [
    {
      id: 1,
      icon: '/icons/values/Betrouwbaarheid.svg',
      title: t('values.item1Title'),
      description: t('values.item1Description'),
      position: 'top-left'
    },
    {
      id: 2,
      icon: '/icons/values/Transparantie.svg',
      title: t('values.item2Title'),
      description: t('values.item2Description'),
      position: 'top-right'
    },
    {
      id: 3,
      icon: '/icons/values/Eerlijkheid.svg',
      title: t('values.item3Title'),
      description: t('values.item3Description'),
      position: 'bottom-left'
    },
    {
      id: 4,
      icon: '/icons/values/Doelgericht.svg',
      title: t('values.item4Title'),
      description: t('values.item4Description'),
      position: 'bottom-right'
    }
  ];

  const authProcessSteps: ProcessStep[] = [
    {
      id: 1,
      title: t('process.step1Title'),
      description: t('process.step1Description'),
      icon: '/icons/process/step1-icon.svg',
      image: '/images/homepage/process/step1.png',
    },
    {
      id: 2,
      title: t('process.step2Title'),
      description: t('process.step2Description'),
      icon: '/icons/process/step2-icon.svg',
      image: '/images/homepage/process/step2.png',
    },
    {
      id: 3,
      title: t('process.step3Title'),
      description: t('process.step3Description'),
      icon: '/icons/process/step3-icon.svg',
      image: '/images/homepage/process/step3.png',
    },
    {
      id: 4,
      title: t('process.step4Title'),
      description: t('process.step4Description'),
      icon: '/icons/process/step4-icon.svg',
      image: '/images/homepage/process/step4.png',
    },
  ];

  return (
    <DefaultLayout>
      <HeroAuth />
      <Values
        heading={t('values.heading')}
        description={t('values.description')}
        centerText={t('values.centerText')}
        values={authValuesData}
        ctaButtons={
          <Link href='/auth/login'>
            <Button
              variant='default'
              size='lg'
              className='bg-primary hover:bg-primary/90 text-white font-medium px-6 py-4 rounded-[12px] text-base'
            >
              {t('values.ctaButton')}
            </Button>
          </Link>
        }
      />
      <ProcessSteps
        steps={authProcessSteps}
        title={t('process.title')}
        subtitle={t('process.subtitle')}
        showCTA={true}
        ctaButtons={
          <Link href='/auth/login'>
            <Button
              variant='default'
              size='lg'
              className='bg-primary hover:bg-primary/90 text-white font-medium px-6 py-4 rounded-[12px] text-base'
            >
              {t('process.ctaButton')}
            </Button>
          </Link>
        }
      />
      <StatsSection
        ctaButtons={
          <Link href='/auth/login'>
            <Button
              variant='default'
              size='lg'
              className='bg-primary hover:bg-primary/90 text-white font-medium px-6 py-4 rounded-[12px] text-base'
            >
              {t('values.ctaButton')}
            </Button>
          </Link>
        }
      />
      <ReviewsSection />
      <FAQSection faqType="specialists" />
    </DefaultLayout>
  );
}
