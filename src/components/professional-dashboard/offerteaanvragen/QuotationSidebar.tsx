'use client';

import { MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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
    <div className='w-full max-w-sm space-y-6'>
      {/* Reviews Section */}
      <div className='bg-blue-50 border border-blue-200 rounded-2xl'>
        <h3 className='text-lg leading-none font-medium text-foreground py-4.5 px-5.5'>
          Hoe ontvang ik reviews van tevreden klanten?
        </h3>

        <div className='space-y-4 py-7 border-t px-5.5 border-blue-200'>
          <div className='flex gap-3'>
            <Image
              src='/icons/professional-dashboard/status_check.svg'
              alt='Trending Up'
              width={28}
              height={28}
              className='flex-shrink-0'
            />
            <div>
              <p className='text-sm font-medium text-foreground mb-1'>
                Wijzig de status om voortgang te monitoren
              </p>
              <p className='text-xs text-muted-foreground'>
                Houd je klanten op de hoogte van de voortgang
              </p>
            </div>
          </div>

          <div className='flex gap-3'>
            <Image
              src='/icons/professional-dashboard/review.svg'
              alt='Trending Up'
              width={28}
              height={28}
              className='flex-shrink-0'
            />

            <div>
              <p className='text-sm font-medium text-foreground mb-1'>
                Vraag na afronding een review aan
              </p>
              <p className='text-xs text-muted-foreground'>
                Stuur een vriendelijk verzoek voor feedback
              </p>
            </div>
          </div>

          <div className='flex gap-3'>
            <Image
              src='/icons/professional-dashboard/profile.svg'
              alt='Trending Up'
              width={28}
              height={28}
              className='flex-shrink-0'
            />

            <div>
              <p className='text-sm font-medium text-foreground  mb-1'>
                Reviews verschijnen op je bedrijfsprofiel
              </p>
              <p className='text-xs text-muted-foreground'>
                Bouw vertrouwen op bij potentiële klanten
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details Section */}
      <div className='bg-white border border-gray-200 rounded-2xl'>
        <h3 className='text-lg leading-none font-medium text-foreground py-4.5 px-5.5'>
          Accountdetails
        </h3>

        <div className='space-y-4 pt-2.5 pb-5 border-t px-5.5 border-gray-200'>
          {/* Account Name and Location */}
          <div>
            <p className='text-sm font-medium leading-normal text-muted-foreground mb-1'>
              {accountName}
            </p>
            <p className='text-sm text-foreground'>{location}</p>
          </div>

          {/* Account Status */}
          <div>
            <p className='text-sm text-semibold text-muted-foreground mb-2'>Accountstatus</p>
            <button
              onClick={handleAccountStatusClick}
              className='flex items-center justify-between w-full p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors'
            >
              <div className='flex items-center gap-2'>
                  <span className='text-amber-400 text-lg'>⚠</span>
                
                <span className='text-sm font-medium text-orange-700'>
                  {accountStatus}
                </span>
              </div>
              <ChevronRight className='w-4 h-4 text-orange-700' />
            </button>
          </div>

          {/* Work Area */}
          <div>
            <p className='text-xs text-muted-foreground mb-2'>Werkgebied</p>
            <div className='flex items-start gap-2 mb-3'>
              <MapPin className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
              <p className='text-sm text-foreground flex-1'>{workArea}</p>
              <ChevronRight className='w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0' />
            </div>
            <Button
              onClick={handleModifyWorkArea}
              variant='outline'
              className='w-full border-primary text-primary hover:bg-primary hover:text-white rounded-xl'
            >
              Wijzig werkgebied
            </Button>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className='bg-white border border-gray-200 rounded-2xl'>
        <h3 className='text-lg leading-none font-semibold text-foreground py-4.5 px-5.5'>
          Tips
        </h3>

        <div className='space-y-4 py-7 border-t px-5.5 border-gray-200'>
          <div className='flex gap-3'>
            <div className='w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0'>
              <span className='text-white text-xs font-bold'>✓</span>
            </div>
            <p className='text-sm text-foreground'>
              Neem binnen 8 uur contact op
            </p>
          </div>

          <div className='flex gap-3'>
            <div className='w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0'>
              <span className='text-white text-xs font-bold'>📞</span>
            </div>
            <p className='text-sm text-foreground'>
              Bel indien mogelijk; anders een korte e-mail
            </p>
          </div>

          <div className='flex gap-3'>
            <div className='w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0'>
              <span className='text-white text-xs font-bold'>✉</span>
            </div>
            <p className='text-sm text-foreground'>
              Controleer contactgegevens; meld fouten aan support
            </p>
          </div>

          <div className='flex gap-3'>
            <div className='w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0'>
              <span className='text-white text-xs font-bold'>⭐</span>
            </div>
            <p className='text-sm text-foreground'>
              Volg teeds op door de status bij te werken.
            </p>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className='bg-white border border-gray-200 rounded-2xl'>
        <div className='flex items-center gap-3 py-4.5 px-5.5'>
          <div className='w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0'>
            <span className='text-white text-sm font-bold'>!</span>
          </div>
          <h3 className='text-lg leading-none font-semibold text-foreground'>
            Hulp nodig?
          </h3>
        </div>

        <div className='py-7 border-t px-5.5 border-gray-200'>
          <p className='text-sm text-muted-foreground mb-4'>
            Ons support team staat klaar om je te helpen met al je vragen over
            offerteaanvragen.
          </p>

          <Button
            onClick={handleContactSupport}
            className='w-full rounded-xl font-medium'
          >
            Contact opnemen
          </Button>
        </div>
      </div>
    </div>
  );
}
