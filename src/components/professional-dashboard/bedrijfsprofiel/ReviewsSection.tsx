'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCompanyRatings } from '@/lib/hooks/professional/ratings';
import { cn } from '@/lib/utils';

interface ReviewsSectionProps {
  companyId?: string;
}

export default function ReviewsSection({ companyId }: ReviewsSectionProps) {
  const t = useTranslations('common.proDashboard.bedrijfsprofiel.reviews');

  const { data: ratingsData, isLoading } = useCompanyRatings(companyId || '');

  const handleRequestReview = () => {
    // TODO: Implement request review functionality
    console.log('Request review');
  };

  const ratings = ratingsData?.ratings || [];
  const summary = ratingsData?.summary;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 dag geleden';
    if (diffDays < 7) return `${diffDays} dagen geleden`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weken geleden`;
    return date.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
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

        {isLoading ? (
          <div className='flex flex-col items-center justify-center py-6 sm:py-8 text-center'>
            <Loader2 className='w-6 h-6 sm:w-8 sm:h-8 text-slate-400 animate-spin mb-3 sm:mb-4' />
            <p className='text-xs sm:text-sm text-muted-foreground'>Reviews laden...</p>
          </div>
        ) : ratings.length === 0 ? (
          <>
            {/* No Reviews Placeholder */}
            <div className='flex flex-col items-center justify-center py-6 sm:py-8 text-center'>
              <div className='w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3 sm:mb-4'>
                <Star className='w-6 h-6 sm:w-8 sm:h-8 text-slate-400' />
              </div>
              <p className='text-xs sm:text-sm text-muted-foreground'>{t('noReviews')}</p>
            </div>
          </>
        ) : (
          <div className='space-y-4'>
            {/* Reviews List */}
            {ratings.map((rating) => (
              <div key={rating.id} className='border border-slate-200 rounded-lg p-3 sm:p-4'>
                <div className='flex items-start justify-between gap-3 mb-2'>
                  <div className='flex items-center gap-1'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-3 h-3 sm:w-4 sm:h-4',
                          i < rating.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 fill-gray-300'
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className='text-xs sm:text-sm text-secondary-foreground mb-2 line-clamp-2'>
                  {rating.review_text}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {formatDate(rating.created_at)}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
