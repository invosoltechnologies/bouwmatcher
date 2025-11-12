'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function VerificationBanner() {
  const handleVerificationClick = () => {
    // TODO: Navigate to verification page
    console.log('Navigate to verification');
  };

  return (
    <div
      className='rounded-xl p-5 pt-5.5  mb-6'
      style={{
        background:
          'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)',
      }}
    >
      <h2 className='text-lg font-semibold leading-snug text-secondary-foreground mb-2'>
        Nog niet geverifieerd
      </h2>
      <p className='text-muted-foreground text-base leading-snug mb-4 max-w-2xl'>
        Rond de verificatie af om direct toegang te krijgen tot interessante
        aanvragen. Tot die tijd kun je ze alleen bekijken. Het proces is kort,
        eenvoudig en verhoogt de veiligheid voor iedereen.
      </p>
      <Button onClick={handleVerificationClick} className='py-3.5 rounded-xl'>
        Verificatie voltooien
        <ArrowRight className='w-4 h-4' />
      </Button>
    </div>
  );
}
