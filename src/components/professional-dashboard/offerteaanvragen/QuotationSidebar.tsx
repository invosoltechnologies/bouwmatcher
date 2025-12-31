'use client';

import { MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface QuotationSidebarProps {
  accountName: string;
  location: string;
  accountStatus: string;
  workArea: string;
}

export default function QuotationSidebar({
  accountName,
  location,
  accountStatus,
  workArea,
}: QuotationSidebarProps) {
  const t = useTranslations('common.proDashboard.offerteaanvragen.sidebar');
  const handleModifyWorkArea = () => {
    // TODO: Navigate to work area modification
    console.log('Modify work area');
  };

  const handleAccountStatusClick = () => {
    // TODO: Navigate to account page
    console.log('Navigate to account');
  };

  const handleContactSupport = () => {
    // TODO: Open contact support
    console.log('Contact support');
  };

  return (
    <div className='w-full max-w-sm space-y-4 sm:space-y-6'>
      {/* Reviews Section */}
      <div className='bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl'>
        <h3 className='text-base sm:text-lg leading-none font-medium text-foreground py-3 sm:py-4.5 px-4 sm:px-5.5'>
          {t('reviewsTitle')}
        </h3>

        <div className='space-y-3 sm:space-y-4 py-4 sm:py-7 border-t px-4 sm:px-5.5 border-blue-200'>
          <div className='flex gap-2 sm:gap-3'>
            <Image
              src='/icons/professional-dashboard/status_check.svg'
              alt='Status check'
              width={24}
              height={24}
              className='flex-shrink-0 sm:w-7 sm:h-7'
            />
            <div>
              <p className='text-xs sm:text-sm font-medium text-foreground mb-1'>
                {t('reviewStep1Title')}
              </p>
              <p className='text-xs text-muted-foreground'>
                {t('reviewStep1Description')}
              </p>
            </div>
          </div>

          <div className='flex gap-2 sm:gap-3'>
            <Image
              src='/icons/professional-dashboard/review.svg'
              alt='Review'
              width={24}
              height={24}
              className='flex-shrink-0 sm:w-7 sm:h-7'
            />

            <div>
              <p className='text-xs sm:text-sm font-medium text-foreground mb-1'>
                {t('reviewStep2Title')}
              </p>
              <p className='text-xs text-muted-foreground'>
                {t('reviewStep2Description')}
              </p>
            </div>
          </div>

          <div className='flex gap-2 sm:gap-3'>
            <Image
              src='/icons/professional-dashboard/profile.svg'
              alt='Profile'
              width={24}
              height={24}
              className='flex-shrink-0 sm:w-7 sm:h-7'
            />

            <div>
              <p className='text-xs sm:text-sm font-medium text-foreground mb-1'>
                {t('reviewStep3Title')}
              </p>
              <p className='text-xs text-muted-foreground'>
                {t('reviewStep3Description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details Section */}
      <div className='bg-white border border-gray-200 rounded-xl sm:rounded-2xl'>
        <h3 className='text-base sm:text-lg leading-none font-medium text-foreground py-3 sm:py-4.5 px-4 sm:px-5.5'>
          {t('accountDetailsTitle')}
        </h3>

        <div className='space-y-3 sm:space-y-4 pt-2.5 pb-4 sm:pb-5 border-t px-4 sm:px-5.5 border-gray-200'>
          {/* Account Name and Location */}
          <div>
            <p className='text-xs sm:text-sm font-medium leading-normal text-muted-foreground mb-1'>
              {accountName}
            </p>
            <p className='text-xs sm:text-sm text-foreground'>{location}</p>
          </div>

          {/* Account Status */}
          <div>
            <p className='text-xs sm:text-sm text-semibold text-muted-foreground mb-2'>{t('accountStatus')}</p>
            <button
              onClick={handleAccountStatusClick}
              className='flex items-center justify-between w-full p-2.5 sm:p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors'
            >
              <div className='flex items-center gap-2'>
                <span className='text-amber-400 text-base sm:text-lg'>⚠</span>
                <span className='text-xs sm:text-sm font-medium text-orange-700'>
                  {accountStatus}
                </span>
              </div>
              <ChevronRight className='w-3 h-3 sm:w-4 sm:h-4 text-orange-700' />
            </button>
          </div>

          {/* Work Area */}
          <div>
            <p className='text-xs text-muted-foreground mb-2'>{t('workAreaLabel')}</p>
            <div className='flex items-start gap-2 mb-3'>
              <MapPin className='w-3 h-3 sm:w-4 sm:h-4 text-primary mt-0.5 flex-shrink-0' />
              <p className='text-xs sm:text-sm text-foreground flex-1'>{workArea}</p>
              <ChevronRight className='w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground mt-0.5 flex-shrink-0' />
            </div>
            <Button
              onClick={handleModifyWorkArea}
              variant='outline'
              className='w-full border-primary text-primary hover:bg-primary hover:text-white rounded-xl text-xs sm:text-sm'
            >
              {t('modifyWorkArea')}
            </Button>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className='bg-white border border-gray-200 rounded-xl sm:rounded-2xl'>
        <h3 className='text-base sm:text-lg leading-none font-semibold text-foreground py-3 sm:py-4.5 px-4 sm:px-5.5'>
          {t('tipsTitle')}
        </h3>

        <div className='space-y-3 sm:space-y-4 py-4 sm:py-7 border-t px-4 sm:px-5.5 border-gray-200'>
          <div className='flex gap-2 sm:gap-3'>
            <div className='w-5 h-5 sm:w-6 sm:h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0'>
              <span className='text-white text-xs font-bold'>✓</span>
            </div>
            <p className='text-xs sm:text-sm text-foreground'>
              {t('tip1')}
            </p>
          </div>

          <div className='flex gap-2 sm:gap-3'>
            <div className='w-5 h-5 sm:w-6 sm:h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0'>
              <span className='text-white text-xs font-bold'>📞</span>
            </div>
            <p className='text-xs sm:text-sm text-foreground'>
              {t('tip2')}
            </p>
          </div>

          <div className='flex gap-2 sm:gap-3'>
            <div className='w-5 h-5 sm:w-6 sm:h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0'>
              <span className='text-white text-xs font-bold'>✉</span>
            </div>
            <p className='text-xs sm:text-sm text-foreground'>
              {t('tip3')}
            </p>
          </div>

          <div className='flex gap-2 sm:gap-3'>
            <div className='w-5 h-5 sm:w-6 sm:h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0'>
              <span className='text-white text-xs font-bold'>⭐</span>
            </div>
            <p className='text-xs sm:text-sm text-foreground'>
              {t('tip4')}
            </p>
          </div>
        </div>
      </div>

      {/* Help Section */}
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
    </div>
  );
}
