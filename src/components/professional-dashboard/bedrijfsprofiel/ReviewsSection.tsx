'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Shield } from 'lucide-react';
import Image from 'next/image';

export default function ReviewsSection() {
  const handleRequestReview = () => {
    // TODO: Implement request review functionality
    console.log('Request review');
  };

  return (
    <Card className='px-5 gap-4'>
      <CardHeader className='p-0'>
        <CardTitle className='text-lg font-semibold'>Reviews</CardTitle>
      </CardHeader>
      <CardContent className='p-0 space-y-6'>
        {/* Info Banner */}
        <div className='bg-slate-50 border border-gray-200 rounded-xl py-4 px-3.5 flex items-center gap-3'>
          <Image
            src='/icons/shield.svg'
            className='-mt-0.5'
            alt='Shield Icon'
            width={14}
            height={14}
          />
          <p className='text-sm text-muted-foreground'>
            In overeenstemming met ons privacybeleid worden reviews na 1 jaar
            geanonimiseerd.
          </p>
        </div>

        {/* No Reviews Placeholder */}
        <div className='flex flex-col items-center justify-center py-8 text-center'>
          <div className='w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4'>
            <Star className='w-8 h-8 text-slate-400' />
          </div>
          <p className='text-sm text-muted-foreground'>Geen reviews</p>
        </div>

        {/* Request Review Button with Background Strip */}
        <div className='bg-accent/10 rounded-xl p-3.5 flex justify-between items-center'>
          <div className='flex gap-2.5 items-center'>
            <Image
              src='/icons/bulb.svg'
              alt='Review Star Icon'
              width={10}
              height={14}
            />
            <p className='text-sm font-medium text-secondary-foreground'>Vraag reviews aan</p>
          </div>
          <Button
            onClick={handleRequestReview}
            className='py-2.5 px-3 bg-accent hover:bg-accent/90 '
            size='lg'
          >
            Vraag reviews aan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
