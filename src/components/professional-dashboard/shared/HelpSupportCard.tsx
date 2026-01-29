'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface HelpSupportCardProps {
  /**
   * Translation namespace for the help card text
   * Should contain: helpTitle, helpDescription, contactButton
   */
  translationNamespace: string;
}

/**
 * Reusable Help/Support Card component used across professional dashboard
 * Displays a help section with a contact support button
 */
export default function HelpSupportCard({ translationNamespace }: HelpSupportCardProps) {
  const t = useTranslations(translationNamespace);
  const router = useRouter();
  const locale = useLocale();

  const handleContactSupport = () => {
    router.push(`/${locale}/contact`);
  };

  return (
    <div className='bg-white border border-gray-200 rounded-xl sm:rounded-2xl'>
      <div className='flex items-center gap-2 sm:gap-3 py-3 sm:py-4.5 px-4 sm:px-5.5'>
        <div className='w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0'>
          <span className='text-white text-xs sm:text-sm font-bold'>!</span>
        </div>
        <h3 className='text-base sm:text-lg leading-none font-semibold text-foreground'>
          {t('helpTitle')}
        </h3>
      </div>

      <div className='py-4 sm:py-7 border-t px-4 sm:px-5.5 border-gray-200'>
        <p className='text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4'>
          {t('helpDescription')}
        </p>

        <Button
          onClick={handleContactSupport}
          className='w-full rounded-xl font-medium text-sm sm:text-base'
        >
          {t('contactButton')}
        </Button>
      </div>
    </div>
  );
}
