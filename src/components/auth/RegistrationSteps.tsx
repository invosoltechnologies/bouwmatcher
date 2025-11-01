'use client';

import { Check } from 'lucide-react';

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
  const steps: Step[] = [
    { number: 1, label: 'Persoonsgegevens', status: 'default' },
    { number: 2, label: 'Werkgebied', status: 'default' },
    { number: 3, label: 'Vakgebieden', status: 'default' },
    { number: 4, label: 'Extra vakgebieden', status: 'default' },
    { number: 5, label: 'Bedrijf registreren', status: 'default' },
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

  return (
    <div className='w-full bg-transparent custom-container'>
        <div className='flex items-start justify-between'>
          {stepsWithStatus.map((step, index) => (
            <div key={step.number} className='flex flex-col items-center relative flex-1'>
              {/* Step Circle */}
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-base font-semibold transition-all z-10
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
                  <Check className='w-5 h-5' />
                ) : (
                  step.number
                )}
              </div>

              {/* Step Label */}
              <span
                className={`
                  mt-3 text-sm md:text-base text-center whitespace-nowrap font-medium
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
                <div className='absolute top-6 left-1/2 w-full h-[2px] z-0 px-16'>
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
  );
}
