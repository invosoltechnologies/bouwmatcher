'use client';

import { useState } from 'react';
import AuthNavbar from '@/components/auth/AuthNavbar';
import RegistrationSteps from '@/components/auth/RegistrationSteps';

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div
      className='min-h-screen pt-26 bg-white flex flex-col'
    >
      <AuthNavbar />

      <RegistrationSteps currentStep={currentStep} />

      <main className='flex-1 flex items-center justify-center px-4 py-12'>
        <div className='w-full max-w-3xl'>
          {/* Step content will go here */}
          <div className='text-center'>
            <h2 className='text-2xl font-semibold mb-4'>
              Step {currentStep} Content
            </h2>
            <p className='text-neutral-600 mb-8'>
              This is where the step content will be displayed
            </p>

            {/* Temporary navigation buttons for testing */}
            <div className='flex gap-4 justify-center'>
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className='px-6 py-2 bg-neutral-200 rounded-lg disabled:opacity-50'
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                disabled={currentStep === 5}
                className='px-6 py-2 bg-primary text-white rounded-lg disabled:opacity-50'
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
