'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Building2, Star as StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { CompanyInfoData, ContactInfoData, CompanyRatingSummary } from '@/lib/types/account';
import Image from 'next/image';
import { useState } from 'react';

interface CompanyHeaderCardProps {
  companyInfo: CompanyInfoData;
  contactInfo: ContactInfoData;
  onEditClick: () => void;
  roleInCompany: string | null;
  ratingSummary?: CompanyRatingSummary;
  userRating?: number | null;
  onLogoClick?: () => void;
}

export default function CompanyHeaderCard({
  companyInfo,
  onEditClick,
  roleInCompany,
  ratingSummary,
  userRating,
  onLogoClick,
}: CompanyHeaderCardProps) {
  const t = useTranslations('common.proDashboard.bedrijfsprofiel.header');
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const isOwner = roleInCompany === 'owner';

  const handleShareClick = () => {
    console.log('Share profile link:', {
      companyName: companyInfo.companyName,
      businessId: companyInfo.businessId,
      url: `${window.location.origin}/professional/${companyInfo.businessId}`,
    });
  };

  const handleLogoClick = () => {
    if (isOwner && onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <Card className='px-3 sm:px-5 gap-3 sm:gap-4'>
      <CardContent className='p-0 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6'>
        <div className='flex items-start sm:items-center gap-3 sm:gap-6.5 w-full lg:w-auto'>
          {/* Company Logo with Hover Effect */}
          <div
            className={`relative flex items-center justify-center rounded-lg flex-shrink-0 overflow-hidden group ${
              isOwner ? 'cursor-pointer' : ''
            } ${
              companyInfo.logoUrl
                ? 'w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px]'
                : 'px-8 py-6 sm:px-12 sm:py-8 lg:px-14 lg:py-9.5 bg-slate-100'
            }`}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            onClick={handleLogoClick}
          >
            {companyInfo.logoUrl ? (
              <Image
                src={companyInfo.logoUrl}
                alt={companyInfo.companyName}
                width={100}
                height={100}
                className='object-contain w-full h-full'
              />
            ) : (
              <Building2 className='w-5 h-6 sm:w-6 sm:h-7 lg:w-7 lg:h-9 text-gray-500' />
            )}

            {/* Hover Overlay - Only show for owners */}
            {isOwner && isLogoHovered && (
              <div className='absolute inset-0 bg-blue-600/80 flex items-center justify-center transition-all'>
                <Image
                  src='/icons/edit-pencil.svg'
                  alt='Edit logo'
                  width={24}
                  height={24}
                  className='[filter:brightness(0)_invert(1)]'
                />
              </div>
            )}
          </div>

          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2 mb-1.5 sm:mb-2'>
              <h2 className='text-lg sm:text-xl font-normal leading-normal truncate'>
                {companyInfo.companyName}
              </h2>
              <button
                onClick={onEditClick}
                className='text-muted-foreground cursor-pointer transition-all group flex-shrink-0'
                aria-label={t('editAriaLabel')}
              >
                <Image
                  src='/icons/edit-pencil.svg'
                  className='mb-1 transition-all group-hover:[filter:brightness(0)_saturate(100%)_invert(15%)_sepia(91%)_saturate(2528%)_hue-rotate(214deg)_brightness(94%)_contrast(107%)]'
                  alt={t('editAriaLabel')}
                  width={16}
                  height={16}
                />
              </button>
            </div>
            <div className='flex items-center gap-1 text-muted-foreground mb-1.5 sm:mb-2'>
              <MapPin className='w-auto h-3.5 sm:h-4 flex-shrink-0' />
              <span className='text-xs sm:text-sm leading-snug truncate'>
                {companyInfo.address}
              </span>
            </div>
            <div className='flex items-center gap-1 mb-2 sm:mb-3 flex-wrap'>
              <div className='flex gap-0.5'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index}>
                    {index < Math.round(ratingSummary?.averageRating || 0) ? (
                      <StarIcon className='w-5 h-5 fill-yellow-400 text-yellow-400' />
                    ) : (
                      <StarIcon className='w-5 h-5 text-gray-300' />
                    )}
                  </div>
                ))}
              </div>

              <span className='text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2'>
                {ratingSummary && ratingSummary.totalRatings > 0
                  ? `${ratingSummary.totalRatings} ${
                      ratingSummary.totalRatings === 1 ? t('review') : t('reviews')
                    }`
                  : t('noReviews')}
              </span>
            </div>

            {(!ratingSummary || ratingSummary.totalRatings === 0) && (
              <p className='text-xs text-muted-foreground bg-slate-50 rounded-full p-1.5 sm:p-2 inline-block'>
                {t('recentlyJoined')}
              </p>
            )}
          </div>
        </div>

        {/* Contact Details with Gradient Background */}
        <div
          className='rounded-xl p-4 sm:p-5 lg:p-5.5 mb-0 w-full lg:w-auto lg:min-w-[280px]'
          style={{
            background:
              'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)',
          }}
        >
          <h3 className='text-sm sm:text-base font-medium mb-2 sm:mb-3'>{t('contactInfo')}</h3>
          <div className='flex flex-col gap-2'>
            {companyInfo.businessPhone && companyInfo.businessPhone !== '-' && (
              <div className='flex items-center gap-2 sm:gap-3'>
                <Phone className='w-4 h-5 sm:w-4.5 sm:h-5.5 text-primary flex-shrink-0' />
                <a
                  href={`tel:${companyInfo.businessPhone}`}
                  className='text-xs sm:text-sm text-primary hover:underline truncate'
                >
                  {companyInfo.businessPhone}
                </a>
              </div>
            )}
            {companyInfo.businessEmail && companyInfo.businessEmail !== '-' && (
              <div className='flex items-center gap-2 sm:gap-3'>
                <Mail className='w-4 h-5 sm:w-4.5 sm:h-5.5 text-primary flex-shrink-0' />
                <a
                  href={`mailto:${companyInfo.businessEmail}`}
                  className='text-xs sm:text-sm text-primary hover:underline truncate'
                >
                  {companyInfo.businessEmail}
                </a>
              </div>
            )}
            {/* Share Profile Button */}
            <Button
              className='w-full rounded-xl py-3 sm:py-4 px-6 sm:px-13.5 text-sm sm:text-base mt-2 sm:mt-3'
              size='lg'
              onClick={handleShareClick}
            >
              {t('shareProfile')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
