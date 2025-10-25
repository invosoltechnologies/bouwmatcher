'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import RegistrationSteps from '@/components/auth/RegistrationSteps';
import ContactInfoForm from '@/components/auth/register/ContactInfoForm';
import PasswordSetupForm from '@/components/auth/register/PasswordSetupForm';
import WorkAreaForm, { type WorkAreaData } from '@/components/auth/register/WorkAreaForm';
import type { ContactInfoData, PasswordSetupData } from '@/types/auth';
import { signUpProfessional } from '@/lib/supabase/auth';

export default function ProfessionalRegistrationForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [subStep, setSubStep] = useState<'contact' | 'password'>('contact');
  const [contactData, setContactData] = useState<ContactInfoData | null>(null);
  const [workAreaData, setWorkAreaData] = useState<WorkAreaData | null>(null);
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
      toast.success('Account succesvol aangemaakt! Ga verder met stap 2.');

      // Move to step 2 (user stays on register page, already authenticated)
      setCurrentStep(2);
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

  const handleWorkAreaNext = (data: WorkAreaData) => {
    setWorkAreaData(data);
    console.log('Work area data:', data);

    // TODO: Save to database
    toast.success('Werkgebied opgeslagen!');

    // Move to step 3
    setCurrentStep(3);
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
          <WorkAreaForm onNext={handleWorkAreaNext} />
        )}

        {/* Add more steps as needed */}
      </main>
    </>
  );
}
