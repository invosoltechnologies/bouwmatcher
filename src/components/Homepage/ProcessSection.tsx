import { Button } from '@/components/ui/button';
import ProcessSteps, { ProcessStep } from '@/components/ui/process-steps';

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Beschrijf uw project',
    description: 'Vertel ons wat u zoekt. Wat zijn uw wensen?',
    icon: '/icons/process/step1-icon.svg',
    image: '/images/homepage/process/step1.png',
  },
  {
    id: 2,
    title: 'Vergelijk specialisten',
    description: 'Neem contact op en vergelijk offerte van specialisten.',
    icon: '/icons/process/step2-icon.svg',
    image: '/images/homepage/process/step2.png',
  },
  {
    id: 3,
    title: 'Kies uw specialist',
    description: 'Ga voor de specialist die het beste bij uw project past',
    icon: '/icons/process/step3-icon.svg',
    image: '/images/homepage/process/step3.png',
  },
  {
    id: 4,
    title: 'Start uw project',
    description:
      'De uitvoering kan beginnen: betrouwbaar, efficiënt en volgens planning.',
    icon: '/icons/process/step4-icon.svg',
    image: '/images/homepage/process/step4.png',
  },
];

export default function ProcessSection() {
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
    <ProcessSteps
      steps={processSteps}
      title="Zo vindt u de juiste vakman"
      subtitle="Volg onze eenvoudige stappen en ontdek snel de specialist die perfect aansluit bij uw project en wensen."
      showCTA={true}
      ctaButtons={ctaButtons}
    />
  );
}