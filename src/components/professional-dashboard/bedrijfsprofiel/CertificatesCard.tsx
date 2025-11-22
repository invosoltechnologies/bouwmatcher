'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Plus } from 'lucide-react';

export default function CertificatesCard() {
  const handleAddCertificate = () => {
    // TODO: Implement add certificate functionality
    console.log('Add certificate');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>
          Certificaten & Kwaliteitsmarken
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* No Certificates Placeholder */}
        <div className='flex flex-col items-center justify-center py-8 text-center'>
          <div className='w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4'>
            <Award className='w-8 h-8 text-slate-400' />
          </div>
          <p className='text-sm text-muted-foreground mb-4'>
            Geen certificaten toegevoegd
          </p>

          {/* Add Certificate Button */}
          <Button
            onClick={handleAddCertificate}
            variant='outline'
            className='rounded-xl gap-2'
            size='default'
          >
            <Plus className='w-4 h-4' />
            Certificaat toevoegen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
