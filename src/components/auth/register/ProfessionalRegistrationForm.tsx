'use client';

import { useState } from 'react';
import RegistrationSteps from '@/components/auth/RegistrationSteps';
import ContactInfoForm from '@/components/auth/register/ContactInfoForm';
import PasswordSetupForm from '@/components/auth/register/PasswordSetupForm';
import type { ContactInfoData, PasswordSetupData } from '@/types/auth';

export default function ProfessionalRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [subStep, setSubStep] = useState<'contact' | 'password'>('contact');
  const [contactData, setContactData] = useState<ContactInfoData | null>(null);

  const handleContactInfoNext = (data: ContactInfoData) => {
    setContactData(data);
    setSubStep('password');
  };

  const handlePasswordBack = () => {
    setSubStep('contact');
  };

  const handlePasswordNext = (data: PasswordSetupData) => {
    console.log('Registration complete:', { ...contactData, ...data });
    // Move to next step (step 2)
    setCurrentStep(2);
    setSubStep('contact');
  };

  return (
    <>
      <RegistrationSteps currentStep={currentStep} />

      <main className='flex-1 flex items-center justify-center px-4 py-12'>
        {currentStep === 1 && (
          <>
            {subStep === 'contact' && (
              <ContactInfoForm
                onNext={handleContactInfoNext}
                defaultValues={contactData || undefined}
              />
            )}
            {subStep === 'password' && contactData && (
              <PasswordSetupForm
                email={contactData.email}
                onBack={handlePasswordBack}
                onNext={handlePasswordNext}
              />
            )}
          </>
        )}

        {currentStep === 2 && (
          <div className='text-center'>
            <h2 className='text-2xl font-semibold mb-4'>Step 2 - Werkgebied</h2>
            <p className='text-neutral-600'>Step content coming soon...</p>
          </div>
        )}

        {/* Add more steps as needed */}
      </main>
    </>
  );
}
