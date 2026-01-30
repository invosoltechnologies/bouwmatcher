'use client';

import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FormProgressProps {
  currentStep: number;
  totalSteps?: number;
}

export default function FormProgress({ currentStep }: FormProgressProps) {
  const t = useTranslations('common.adminDashboard.categoryForm.progress');

  const steps = [
    { number: 1, label: t('categoryInfo') },
    { number: 2, label: t('subcategoriesQuestions') },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line Background with shimmer effect */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10 overflow-hidden">
          <div
            className="absolute inset-0 shimmer-effect"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
            }}
          />
        </div>

        {/* Step 1 - Primary color up to Step 1 */}
        {currentStep === 1 && (
          <div
            className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500 -z-10"
            style={{ width: '50%' }}
          />
        )}

        {/* Step 2 - Accent (first half) + Primary (second half) */}
        {currentStep === 2 && (
          <>
            {/* First half - Accent color */}
            <div
              className="absolute top-5 left-0 h-0.5 bg-accent transition-all duration-500 -z-10"
              style={{ width: '50%' }}
            />
            {/* Second half - Primary color */}
            <div
              className="absolute top-5 h-0.5 bg-primary transition-all duration-500 -z-10"
              style={{ left: '50%', width: '50%' }}
            />
          </>
        )}

        {/* Steps */}
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div
              key={step.number}
              className='flex flex-col items-center flex-1'
            >
              <div
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm
                  transition-all duration-300  border-2
                  ${
                    isCompleted
                      ? 'border-accent bg-accent text-white'
                      : isCurrent
                        ? 'border-primary bg-white text-primary'
                        : 'border-gray-300 bg-white text-secondary-foreground'
                  }
                `}
              >
                {isCompleted ? <Check className='h-5 w-5' /> : step.number}
              </div>
              <p
                className={`
                  mt-2 text-sm font-medium text-center
                  ${isCurrent ? 'text-primary' : isCompleted ? 'text-accent' : 'text-secondary-foreground'}
                `}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .shimmer-effect {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
