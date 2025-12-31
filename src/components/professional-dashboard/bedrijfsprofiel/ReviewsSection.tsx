'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function ReviewsSection() {
  const t = useTranslations('common.proDashboard.bedrijfsprofiel.reviews');

  const handleRequestReview = () => {
    // TODO: Implement request review functionality
    console.log('Request review');
  };

  return (
    <Card className='px-4 sm:px-5 gap-3 sm:gap-4'>
      <CardHeader className='p-0'>
        <CardTitle className='text-base sm:text-lg lg:text-xl font-semibold'>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className='p-0 space-y-4 sm:space-y-6'>
        {/* Info Banner */}
        <div className='bg-slate-50 border border-gray-200 rounded-xl py-3 px-3 sm:py-4 sm:px-3.5 flex items-center gap-2 sm:gap-3'>
          <Image
            src='/icons/shield.svg'
            className='-mt-0.5 flex-shrink-0'
            alt='Shield Icon'
            width={14}
            height={14}
          />
          <p className='text-xs sm:text-sm text-muted-foreground'>
            {t('privacyNote')}
          </p>
        </div>

        {/* No Reviews Placeholder */}
        <div className='flex flex-col items-center justify-center py-6 sm:py-8 text-center'>
          <div className='w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3 sm:mb-4'>
            <Star className='w-6 h-6 sm:w-8 sm:h-8 text-slate-400' />
          </div>
          <p className='text-xs sm:text-sm text-muted-foreground'>{t('noReviews')}</p>
        </div>

        {/* Request Review Button with Background Strip */}
        {/* <div className='bg-accent/10 rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4'>
          <div className='flex gap-2 sm:gap-2.5 items-center'>
            <Image
              src='/icons/bulb.svg'
              alt='Review Star Icon'
              width={10}
              height={14}
              className='flex-shrink-0'
            />
            <p className='text-xs sm:text-sm font-medium text-secondary-foreground'>{t('requestReviews')}</p>
          </div>
          <Button
            onClick={handleRequestReview}
            className='w-full sm:w-auto py-2.5 px-3 bg-accent hover:bg-accent/90'
            size='lg'
          >
            {t('requestReviews')}
          </Button>
        </div> */}
      </CardContent>
    </Card>
  );
}
