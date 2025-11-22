'use client';

import { Card, CardHeader, CardTitle, CardContent, CardAction } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

export default function CompanyDescriptionCard() {
  const handleEditClick = () => {
    // TODO: Implement edit functionality
    console.log('Edit company description');
  };

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-semibold'>Bedrijfsomschrijving</CardTitle>
          <button
            onClick={handleEditClick}
            className='text-muted-foreground hover:text-primary transition-colors'
            aria-label='Bewerken'
          >
            <Pencil className='w-5 h-5' />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-secondary-foreground leading-relaxed'>
          Wij zijn een ervaren bouwbedrijf gespecialiseerd in renovaties en nieuwbouw projecten
          in Amsterdam Noord. Met meer dan 10 jaar ervaring leveren wij kwaliteit en
          betrouwbaarheid. Ons team staat klaar om uw droomproject werkelijkheid te maken.
        </p>
      </CardContent>
    </Card>
  );
}
