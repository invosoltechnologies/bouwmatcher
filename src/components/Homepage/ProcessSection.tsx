'use client';

import { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
}

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
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = stepRefs.current.findIndex(ref => ref === entry.target);
            if (stepIndex !== -1 && !visibleSteps.includes(stepIndex)) {
              setVisibleSteps(prev => [...prev, stepIndex].sort((a, b) => a - b));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    stepRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleSteps]);

  const isStepCompleted = (stepIndex: number) => visibleSteps.includes(stepIndex);
  const isStepVisible = (stepIndex: number) => visibleSteps.includes(stepIndex);

  return (
    <section className='py-20 bg-white' ref={sectionRef}>
      <div className='custom-container'>
        {/* Header - Following FAQ Section style */}
        <div className='text-center mb-[60px]'>
          <h2 className='text-5xl font-normal text-foreground mb-5'>
            Zo vindt u de juiste vakman
          </h2>
          <p className='text-gray-600 text-2xl'>
            Volg onze eenvoudige stappen en ontdek snel de specialist die
            perfect aansluit bij uw project en wensen.
          </p>
        </div>

        {/* Process Steps */}
        <div className='relative max-w-[938px] mx-auto'>
          {/* Central Progress Bar */}
          <div className='absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-gray-200'>
            {/* Filled portion of the bar */}
            <div
              className='w-full transition-all duration-1000 ease-out'
              style={{
                height: `${(visibleSteps.length / processSteps.length) * 100}%`,
                background: 'linear-gradient(180deg, #023AA2 0%, #0AB27E 100%)',
              }}
            />
          </div>

          {/* Step indicators on the bar */}
          {processSteps.map((step, index) => (
            <div
              key={step.id}
              className='absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full  flex items-center justify-center text-[20px] font-bold transition-all duration-500'
              style={{
                top: `${(index / (processSteps.length - 1)) * 100}%`,
                marginTop:
                  index === 0
                    ? '120px'
                    : index === 1
                    ? '20px'
                    : index === processSteps.length - 1
                    ? '-150px'
                    : '-75px',
                backgroundColor: isStepCompleted(index) ? '#0AB27E' : '#023AA2',
                color: 'white',
                boxShadow: '0px 0px 0px 0px #0AB27E26',
              }}
            >
              {isStepCompleted(index) ? <Check /> : step.id}
            </div>
          ))}

          {/* Process Steps */}
          {processSteps.map((step, index) => {
            const isLeft = index % 2 === 0;
            const isVisible = isStepVisible(index);

            return (
              <div
                key={step.id}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className={`relative mb-20 ${
                  index === processSteps.length - 1 ? 'mb-0' : ''
                }`}
                style={{
                  top: `${(index / (processSteps.length - 1)) * 100}%`,
                }}
              >
                <div className='flex items-center justify-center gap-[102px]'>
                  {/* Left side content */}
                  <div className='w-1/2'>
                    {isLeft ? (
                      // Process Card (Left - Odd steps)
                      <div
                        className={`pt-6 px-6 pb-9 rounded-2xl text-right transition-all duration-800 transform ${
                          isVisible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-10 opacity-0'
                        }`}
                        style={{
                          background:
                            'linear-gradient(90deg, rgba(2, 58, 162, 0.2) 0%, rgba(10, 178, 126, 0.2) 100%)',
                          boxShadow: '0px 12px 30px 0px #023AA21F',
                        }}
                      >
                        <div className='flex flex-col items-end justify-end gap-1'>
                          <Image
                            src={step.icon}
                            alt={step.title}
                            width={48}
                            height={48}
                            className='w-12 h-12 mb-4'
                          />
                          <h3 className='text-base font-bold text-foreground'>
                            {step.title}
                          </h3>
                          <p className='text-foreground text-base'>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ) : (
                      // Process Image (Left side when step is even)
                      <div
                        className={`transition-all duration-800 transform ${
                          isVisible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-10 opacity-0'
                        }`}
                      >
                        <Image
                          src={step.image}
                          alt={step.title}
                          width={333}
                          height={219}
                          className='w-full object-cover'
                        />
                      </div>
                    )}
                  </div>

                  {/* Right side content */}
                  <div className='w-1/2'>
                    {!isLeft ? (
                      // Process Card (Right - Even steps)
                      <div
                        className={`pt-6 px-6 pb-9 rounded-2xl text-left transition-all duration-800 transform ${
                          isVisible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-10 opacity-0'
                        }`}
                        style={{
                          background:
                            'linear-gradient(90deg, rgba(10, 178, 126, 0.2) 0%, rgba(2, 58, 162, 0.2) 100%)',
                          boxShadow: '0px 12px 30px 0px #0AB27E1F',
                        }}
                      >
                        <div className='flex flex-col items-start justify-end gap-1'>
                          <Image
                            src={step.icon}
                            alt={step.title}
                            width={48}
                            height={48}
                            className='w-12 h-12 mb-4'
                          />
                          <h3 className='text-base font-bold text-foreground'>
                            {step.title}
                          </h3>
                          <p className='text-foreground text-base'>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ) : (
                      // Process Image (Right side when step is odd)
                      <div
                        className={`transition-all duration-800 transform ${
                          isVisible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-10 opacity-0'
                        }`}
                      >
                        <Image
                          src={step.image}
                          alt={step.title}
                          width={333}
                          height={219}
                          className='w-full object-cover'
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className='flex justify-center gap-4 mt-16'>
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
        </div>
      </div>
    </section>
  );
}