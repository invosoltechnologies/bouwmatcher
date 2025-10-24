'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegistrationSteps from '@/components/auth/RegistrationSteps';
import ContactInfoForm from '@/components/auth/register/ContactInfoForm';
import PasswordSetupForm from '@/components/auth/register/PasswordSetupForm';
import type { ContactInfoData, PasswordSetupData } from '@/types/auth';
import { signUpProfessional } from '@/lib/supabase/auth';

export default function ProfessionalRegistrationForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [subStep, setSubStep] = useState<'contact' | 'password'>('contact');
  const [contactData, setContactData] = useState<ContactInfoData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContactInfoNext = (data: ContactInfoData) => {
    setContactData(data);
    setSubStep('password');
  };

  const handlePasswordBack = () => {
    setSubStep('contact');
  };

  const handlePasswordNext = async (data: PasswordSetupData) => {
    if (!contactData) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await signUpProfessional({
        email: contactData.email,
        password: data.password,
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        phone: contactData.phone,
      });

      console.log('Registration successful:', result);

      // Redirect to dashboard after successful registration
      router.push('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Er is een fout opgetreden bij het registreren';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <RegistrationSteps currentStep={currentStep} />

      <main className='flex-1 flex items-center justify-center px-4 py-12'>
        {error && (
          <div className='fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
            {error}
          </div>
        )}

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
                isLoading={isLoading}
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
