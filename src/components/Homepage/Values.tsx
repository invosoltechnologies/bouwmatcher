import { Button } from '@/components/ui/button';
import ValuesShape from './ValuesShape';
import { ReactNode } from 'react';

export interface ValueItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface ValuesProps {
  heading?: string;
  description?: string;
  centerText?: string;
  values?: ValueItem[];
  ctaButtons?: ReactNode;
  showCTA?: boolean;
}

export default function Values({
  heading = 'De matchmaker voor al jouw bouwprojecten',
  description = 'Voor iedereen die zonder zorgen een vakman wil inschakelen.',
  centerText = 'Jouw zekerheid\nin de bouw.',
  values,
  ctaButtons,
  showCTA = true,
}: ValuesProps) {
  const defaultCTAButtons = (
    <>
      <Button
        variant='default'
        size='lg'
        className='bg-primary hover:bg-primary/90 text-white font-medium px-6 py-4 rounded-[12px] text-base'
      >
        Word een professional
      </Button>
      <Button
        variant='default'
        size='lg'
        className='bg-accent hover:bg-accent/90 text-white font-medium px-6 py-4 rounded-[12px] text-base'
      >
        Vind een professional
      </Button>
    </>
  );

  return (
    <section className='py-16 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-5xl font-normal text-foreground mb-5'>
            {heading}
          </h2>
          <p className='text-muted-foreground text-2xl'>
            {description}
          </p>
        </div>

        <div className='mb-12'>
          <ValuesShape values={values} centerText={centerText} />
        </div>

        {showCTA && (
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            {ctaButtons || defaultCTAButtons}
          </div>
        )}
      </div>
    </section>
  );
}