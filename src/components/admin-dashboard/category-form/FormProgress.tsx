'use client';

import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function FormProgress({ currentStep, totalSteps }: FormProgressProps) {
  const t = useTranslations('common.adminDashboard.categoryForm.progress');

  const steps = [
    { number: 1, label: t('categoryInfo') },
    { number: 2, label: t('subcategoriesQuestions') },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} className="flex flex-col items-center flex-1">
              <div
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm
                  transition-all duration-300 bg-white border-2
                  ${
                    isCompleted
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : isCurrent
                      ? 'border-blue-600 text-blue-600'
                      : 'border-gray-300 text-gray-400'
                  }
                `}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : step.number}
              </div>
              <p
                className={`
                  mt-2 text-sm font-medium text-center
                  ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-gray-700' : 'text-gray-400'}
                `}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
