'use client';

import { Check } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

type StepStatus = 'completed' | 'in-progress' | 'default';

interface Step {
  number: number;
  label: string;
  status: StepStatus;
}

interface RegistrationStepsProps {
  currentStep: number;
}

export default function RegistrationSteps({ currentStep }: RegistrationStepsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('auth.register.steps');

  const steps: Step[] = [
    { number: 1, label: t('personalInfo'), status: 'default' },
    { number: 2, label: t('workArea'), status: 'default' },
    { number: 3, label: t('specializations'), status: 'default' },
    { number: 4, label: t('extraSpecializations'), status: 'default' },
    { number: 5, label: t('registerCompany'), status: 'default' },
  ];

  // Update step statuses based on current step
  const stepsWithStatus = steps.map((step, index) => {
    if (index + 1 < currentStep) {
      return { ...step, status: 'completed' as StepStatus };
    } else if (index + 1 === currentStep) {
      return { ...step, status: 'in-progress' as StepStatus };
    }
    return step;
  });

  // Auto-scroll to current step on mobile
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeStep = container.querySelector(`[data-step="${currentStep}"]`);

      if (activeStep) {
        const containerWidth = container.offsetWidth;
        const stepLeft = (activeStep as HTMLElement).offsetLeft;
        const stepWidth = (activeStep as HTMLElement).offsetWidth;

        // Center the active step
        const scrollPosition = stepLeft - (containerWidth / 2) + (stepWidth / 2);

        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [currentStep]);

  return (
    <div className='w-full bg-transparent py-4 md:py-6'>
      <div
        ref={scrollContainerRef}
        className='overflow-x-auto scrollbar-hide px-4 md:px-0'
        style={{
          scrollSnapType: 'x mandatory',
        }}
      >
        <div className='flex items-start justify-between min-w-[600px] md:min-w-0 md:max-w-5xl md:mx-auto'>
          {stepsWithStatus.map((step, index) => (
            <div
              key={step.number}
              data-step={step.number}
              className='flex flex-col items-center relative flex-1 min-w-[120px] md:min-w-0'
              style={{
                scrollSnapAlign: 'center',
              }}
            >
              {/* Step Circle */}
              <div
                className={`
                  w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-semibold transition-all z-10
                  ${
                    step.status === 'completed'
                      ? 'bg-accent text-white'
                      : step.status === 'in-progress'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-muted-foreground'
                  }
                `}
              >
                {step.status === 'completed' ? (
                  <Check className='w-4 h-4 md:w-5 md:h-5' />
                ) : (
                  step.number
                )}
              </div>

              {/* Step Label */}
              <span
                className={`
                  mt-2 md:mt-3 text-xs md:text-sm lg:text-base text-center whitespace-nowrap font-medium px-1
                  ${
                    step.status === 'in-progress'
                      ? 'text-primary'
                      : step.status === 'completed'
                      ? 'text-accent'
                      : 'text-muted-foreground'
                  }
                `}
              >
                {step.label}
              </span>

              {/* Connector Line */}
              {index < stepsWithStatus.length - 1 && (
                <div className='absolute top-4 md:top-5 lg:top-6 left-1/2 w-full h-[2px] z-0 px-12 md:px-16'>
                  <div className='w-full h-full bg-gray-200'>
                    <div
                      className={`h-full transition-all ${
                        step.status === 'completed'
                          ? 'bg-accent w-full'
                          : 'w-0'
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
