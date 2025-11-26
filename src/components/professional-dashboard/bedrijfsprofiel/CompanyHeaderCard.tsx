'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import { MapPin, Pencil, Phone, Mail, Building2 } from 'lucide-react';
import type { CompanyInfoData, ContactInfoData } from '@/lib/types/account';
import Image from 'next/image';

interface CompanyHeaderCardProps {
  companyInfo: CompanyInfoData;
  contactInfo: ContactInfoData;
  onEditClick: () => void;
}

export default function CompanyHeaderCard({
  companyInfo,
  contactInfo,
  onEditClick,
}: CompanyHeaderCardProps) {
  const handleShareClick = () => {
    console.log('Share profile link:', {
      companyName: companyInfo.companyName,
      businessId: companyInfo.businessId,
      url: `${window.location.origin}/professional/${companyInfo.businessId}`,
    });
  };

  return (
    <Card className='px-5 gap-4'>
      <CardContent className='p-0 flex justify-between items-center'>
        <div className='flex items-center gap-6.5'>
          <div className='flex items-center justify-center px-14 py-9.5 bg-slate-100 rounded-lg flex-shrink-0'>
            <Building2 className='w-7 h-9 text-gray-500' />
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
              <span className='text-sm leading-snug'>{companyInfo.city}</span>
            </div>
            <div className='flex items-center gap-1 mb-3'>
              {/* Empty star ratings */}
              <Rating defaultValue={3}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton
                    className='text-yellow-500'
                    key={index}
                    size={21}
                  />
                ))}
              </Rating>

              <span className='text-sm text-muted-foreground ml-2'>
                Geen reviews
              </span>
            </div>
            <p className='text-xs text-muted-foreground bg-slate-50 rounded-full p-2'>
              Dit bedrijf heeft zich recent bij Bouwmatcher aangesloten!
            </p>
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
            <div className='flex items-center gap-2'>
              <Phone className='w-4.5 h-5.5 text-primary' />
              <a
                href={`tel:${contactInfo.phoneNumber}`}
                className='text-sm text-primary hover:underline'
              >
                {contactInfo.phoneNumber}
              </a>
            </div>
            <div className='flex items-center gap-2'>
              <Mail className='w-4.5 h-5.5 text-primary' />
              <a
                href={`mailto:${contactInfo.quotesEmail}`}
                className='text-sm text-primary hover:underline'
              >
                {contactInfo.quotesEmail}
              </a>
            </div>
            {/* Share Profile Button */}
            <Button
              className='w-full rounded-xl py-4 px-13.5 text-base mt-3.5'
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
