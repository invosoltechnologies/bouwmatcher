'use client';

import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Pencil, Phone, Mail } from 'lucide-react';
import type { CompanyInfoData, ContactInfoData } from '@/lib/types/account';

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
  return (
    <Card>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-1'>
              <CardTitle className='text-2xl font-semibold'>
                {companyInfo.companyName}
              </CardTitle>
              <button
                onClick={onEditClick}
                className='text-muted-foreground hover:text-primary transition-colors'
                aria-label='Bewerken'
              >
                <Pencil className='w-5 h-5' />
              </button>
            </div>
            <div className='flex items-center gap-1 text-muted-foreground mb-2'>
              <MapPin className='w-4 h-4' />
              <span className='text-sm'>{companyInfo.city}</span>
            </div>
            <div className='flex items-center gap-1'>
              {/* Empty star ratings */}
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className='w-4 h-4 text-gray-300'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
              ))}
              <span className='text-sm text-muted-foreground ml-2'>Geen reviews</span>
            </div>
            <p className='text-xs text-muted-foreground mt-1'>
              Dit bedrijf heeft zich recent bij Bouwmatcher aangesloten!
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Contact Details with Gradient Background */}
        <div
          className='rounded-xl p-5 mb-4'
          style={{
            background:
              'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)',
          }}
        >
          <h3 className='text-sm font-semibold mb-3'>Contactgegevens</h3>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Phone className='w-4 h-4 text-primary' />
              <a
                href={`tel:${contactInfo.phoneNumber}`}
                className='text-sm text-primary hover:underline'
              >
                {contactInfo.phoneNumber}
              </a>
            </div>
            <div className='flex items-center gap-2'>
              <Mail className='w-4 h-4 text-primary' />
              <a
                href={`mailto:${contactInfo.quotesEmail}`}
                className='text-sm text-primary hover:underline'
              >
                {contactInfo.quotesEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Share Profile Button */}
        <Button className='w-full rounded-xl' size='lg'>
          Bedrijfsprofiel delen
        </Button>
      </CardContent>
    </Card>
  );
}
