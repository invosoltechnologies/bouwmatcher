import { Button } from '@/components/ui/button';
import ValuesShape from './ValuesShape';

export default function Values() {
  const ctaButtons = (
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
            De matchmaker voor al jouw bouwprojecten
          </h2>
          <p className='text-muted-foreground text-2xl'>
            Voor iedereen die zonder zorgen een vakman wil inschakelen.
          </p>
        </div>

        <div className='mb-12'>
          <ValuesShape />
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          {ctaButtons}
        </div>
      </div>
    </section>
  );
}