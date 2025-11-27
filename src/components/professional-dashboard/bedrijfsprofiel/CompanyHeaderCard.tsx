'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import { MapPin, Phone, Mail, Building2 } from 'lucide-react';
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
  onRatingClick?: () => void;
}

export default function CompanyHeaderCard({
  companyInfo,
  contactInfo,
  onEditClick,
  roleInCompany,
  ratingSummary,
  userRating,
  onLogoClick,
  onRatingClick,
}: CompanyHeaderCardProps) {
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
    <Card className='px-5 gap-4'>
      <CardContent className='p-0 flex justify-between items-center'>
        <div className='flex items-center gap-6.5'>
          {/* Company Logo with Hover Effect */}
          <div
            className={`relative flex items-center justify-center rounded-lg flex-shrink-0 overflow-hidden group ${
              isOwner ? 'cursor-pointer' : ''
            } ${
              companyInfo.logoUrl
                ? 'w-[100px] h-[100px]'
                : 'px-14 py-9.5 bg-slate-100'
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
              <Building2 className='w-7 h-9 text-gray-500' />
            )}

            {/* Hover Overlay - Only show for owners */}
            {isOwner && isLogoHovered && (
              <div className='absolute inset-0 bg-black/50 flex items-center justify-center transition-all'>
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

          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-2'>
              <h2 className='text-xl font-normal leading-normal'>
                {companyInfo.companyName}
              </h2>
              <button
                onClick={onEditClick}
                className='text-muted-foreground cursor-pointer transition-all group'
                aria-label='Bewerken'
              >
                <Image
                  src='/icons/edit-pencil.svg'
                  className='mb-1 transition-all group-hover:[filter:brightness(0)_saturate(100%)_invert(15%)_sepia(91%)_saturate(2528%)_hue-rotate(214deg)_brightness(94%)_contrast(107%)]'
                  alt='Bewerken'
                  width={16}
                  height={16}
                />
              </button>
            </div>
            <div className='flex items-center gap-1 text-muted-foreground mb-2'>
              <MapPin className='w-auto h-4' />
              <span className='text-sm leading-snug'>{companyInfo.address}</span>
            </div>
            <div className='flex items-center gap-1 mb-3'>
              <div onClick={onRatingClick} className='cursor-pointer'>
                <Rating value={ratingSummary?.averageRating || 0} readOnly>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <RatingButton
                      className='text-yellow-500'
                      key={index}
                      size={21}
                    />
                  ))}
                </Rating>
              </div>

              <span className='text-sm text-muted-foreground ml-2'>
                {ratingSummary && ratingSummary.totalRatings > 0
                  ? `${ratingSummary.totalRatings} ${ratingSummary.totalRatings === 1 ? 'review' : 'reviews'}`
                  : 'Geen reviews'}
              </span>
            </div>

            {/* Show user's own rating if they have rated */}
            {userRating && userRating > 0 && (
              <div className='flex items-center gap-2 mb-3 bg-blue-50 rounded-lg p-2'>
                <span className='text-xs text-primary font-medium'>Jouw beoordeling:</span>
                <Rating value={userRating} readOnly>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <RatingButton
                      className='text-yellow-500'
                      key={index}
                      size={16}
                    />
                  ))}
                </Rating>
              </div>
            )}

            {(!ratingSummary || ratingSummary.totalRatings === 0) && (
              <p className='text-xs text-muted-foreground bg-slate-50 rounded-full p-2'>
                Dit bedrijf heeft zich recent bij Bouwmatcher aangesloten!
              </p>
            )}
          </div>
        </div>

        {/* Contact Details with Gradient Background */}
        <div
          className='rounded-xl p-5.5 mb-4'
          style={{
            background:
              'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)',
          }}
        >
          <h3 className='text-base font-medium mb-3'>Contactgegevens</h3>
          <div className='flex flex-col gap-2'>
            {companyInfo.businessPhone && companyInfo.businessPhone !== '-' && (
              <div className='flex items-center gap-3'>
                <Phone className='w-4.5 h-5.5 text-primary' />
                <a
                  href={`tel:${companyInfo.businessPhone}`}
                  className='text-sm text-primary hover:underline'
                >
                  {companyInfo.businessPhone}
                </a>
              </div>
            )}
            {companyInfo.businessEmail && companyInfo.businessEmail !== '-' && (
              <div className='flex items-center gap-3'>
                <Mail className='w-4.5 h-5.5 text-primary' />
                <a
                  href={`mailto:${companyInfo.businessEmail}`}
                  className='text-sm text-primary hover:underline'
                >
                  {companyInfo.businessEmail}
                </a>
              </div>
            )}
            {/* Share Profile Button */}
            <Button
              className='w-full rounded-xl py-4 px-13.5 text-base mt-3'
              size='lg'
              onClick={handleShareClick}
            >
              Bedrijfsprofiel delen
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
