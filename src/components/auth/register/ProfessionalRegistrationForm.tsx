'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
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

    try {
      const result = await signUpProfessional({
        email: contactData.email,
        password: data.password,
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        phone: contactData.phone,
      });

      console.log('Registration successful:', result);

      // Check if user has a session (auto-confirmed)
      if (!result.session) {
        toast.error('Registratie voltooid, maar geen sessie ontvangen. Probeer in te loggen.');
        setTimeout(() => router.push('/auth/login'), 2000);
        return;
      }

      // Show success message
      toast.success('Account succesvol aangemaakt! Je wordt doorgestuurd...');

      // Wait a moment for session to be fully saved
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to dashboard after successful registration
      router.push('/dashboard');
      router.refresh(); // Force refresh to update auth state
    } catch (err: unknown) {
      console.error('Registration error:', err);

      // Better error messages
      let errorMessage = 'Er is een fout opgetreden bij het registreren';

      if (err && typeof err === 'object' && 'message' in err) {
        const message = (err as { message: string }).message;
        if (message.includes('already registered')) {
          errorMessage = 'Dit e-mailadres is al geregistreerd';
        } else if (message.includes('Password')) {
          errorMessage = 'Wachtwoord moet minimaal 6 tekens lang zijn';
        } else if (message.includes('violates row-level security')) {
          errorMessage = 'Database fout: Controleer of de RLS policies correct zijn ingesteld';
        } else {
          errorMessage = message;
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
