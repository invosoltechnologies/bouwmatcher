'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Pencil } from 'lucide-react';
import Image from 'next/image';

export default function CompanyDescriptionCard() {
  const handleEditClick = () => {
    // TODO: Implement edit functionality
    console.log('Edit company description');
  };

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-semibold'>
            Bedrijfsomschrijving
          </CardTitle>
          <button
            onClick={handleEditClick}
            className='text-muted-foreground hover:text-primary transition-colors cursor-pointer group'
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
      </CardHeader>
      <CardContent>
        <p className='text-sm text-secondary-foreground leading-relaxed'>
          Wij zijn een ervaren bouwbedrijf gespecialiseerd in renovaties en
          nieuwbouw projecten in Amsterdam Noord. Met meer dan 10 jaar ervaring
          leveren wij kwaliteit en betrouwbaarheid. Ons team staat klaar om uw
          droomproject werkelijkheid te maken.
        </p>
      </CardContent>
    </Card>
  );
}
