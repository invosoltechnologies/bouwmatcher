'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import RegistrationSteps from '@/components/auth/RegistrationSteps';
import ContactInfoForm from '@/components/auth/register/ContactInfoForm';
import PasswordSetupForm from '@/components/auth/register/PasswordSetupForm';
import WorkAreaForm, { type WorkAreaData } from '@/components/auth/register/WorkAreaForm';
import ServiceCategoriesForm, { type ServiceCategoriesData } from '@/components/auth/register/ServiceCategoriesForm';
import SubcategoriesForm, { type SubcategoriesData } from '@/components/auth/register/SubcategoriesForm';
import CompanyRegistrationForm, { type CompanyData } from '@/components/auth/register/CompanyRegistrationForm';
import type { ContactInfoData, PasswordSetupData } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';

export default function ProfessionalRegistrationForm() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [subStep, setSubStep] = useState<'contact' | 'password'>('contact');
  const [isLoadingStep, setIsLoadingStep] = useState(true);
  const [contactData, setContactData] = useState<ContactInfoData | null>(null);
  const [workAreaData, setWorkAreaData] = useState<WorkAreaData | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [serviceCategoriesData, setServiceCategoriesData] = useState<ServiceCategoriesData | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [subcategoriesData, setSubcategoriesData] = useState<SubcategoriesData | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);

  // Load current step on component mount
  useEffect(() => {
    const loadCurrentStep = async () => {
      try {
        const response = await fetch('/api/registration/current-step');

        if (response.ok) {
          const data = await response.json();

          // If profile is completed, redirect to dashboard
          if (data.profile_completed) {
            router.push('/pro-dashboard');
            return;
          }

          // Set the current step from API
          if (data.current_step && data.current_step > 1) {
            setCurrentStep(data.current_step);
          }
        }
      } catch (error) {
        console.error('Error loading current step:', error);
      } finally {
        setIsLoadingStep(false);
      }
    };

    loadCurrentStep();
  }, [router]);

  const handleContactInfoNext = (data: ContactInfoData) => {
    setContactData(data);
    setSubStep('password');
  };

  const handlePasswordBack = () => {
    setSubStep('contact');
  };

  const handlePasswordNext = async (data: PasswordSetupData) => {
    if (!contactData) return;

    signUp.mutate(
      {
        email: contactData.email,
        password: data.password,
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        phone: contactData.phone,
      },
      {
        onSuccess: (result) => {
          console.log('Registration successful:', result);

          if (result.success) {
            toast.success('Account succesvol aangemaakt! Ga verder met stap 2.');
            setCurrentStep(2);
          } else {
            if (result.error?.includes('already registered')) {
              toast.error('Dit e-mailadres is al geregistreerd');
            } else if (result.error?.includes('Password')) {
              toast.error('Wachtwoord moet minimaal 6 tekens lang zijn');
            } else if (result.error?.includes('violates row-level security')) {
              toast.error('Database fout: Controleer of de RLS policies correct zijn ingesteld');
            } else {
              toast.error(result.error || 'Er is een fout opgetreden bij het registreren');
            }
          }
        },
        onError: (err: unknown) => {
          console.error('Registration error:', err);
          toast.error('Er is een fout opgetreden bij het registreren');
        },
      }
    );
  };

  const handleWorkAreaNext = async (data: WorkAreaData) => {
    setWorkAreaData(data);

    try {
      const response = await fetch('/api/registration/work-area', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          work_address: data.location,
          work_postal_code: data.postalCode,
          work_city: data.city,
          work_latitude: data.latitude,
          work_longitude: data.longitude,
          service_radius_km: data.serviceRadius,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Kon werkgebied niet opslaan');
      }

      toast.success('Werkgebied opgeslagen!');
      setCurrentStep(3);
    } catch (err: unknown) {
      console.error('Work area save error:', err);
      const errorMessage = err && typeof err === 'object' && 'message' in err
        ? (err as { message: string }).message
        : 'Er is een fout opgetreden bij het opslaan';
      toast.error(errorMessage);
    }
  };

  const handleServiceCategoriesNext = async (data: ServiceCategoriesData) => {
    setServiceCategoriesData(data);

    try {
      const response = await fetch('/api/registration/service-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryIds: data.selectedCategories,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Kon vakgebieden niet opslaan');
      }

      toast.success('Vakgebieden opgeslagen!');
      setCurrentStep(4);
    } catch (err: unknown) {
      console.error('Service categories save error:', err);
      const errorMessage = err && typeof err === 'object' && 'message' in err
        ? (err as { message: string }).message
        : 'Er is een fout opgetreden bij het opslaan';
      toast.error(errorMessage);
    }
  };

  const handleSubcategoriesNext = async (data: SubcategoriesData) => {
    setSubcategoriesData(data);

    try {
      // Validate data
      if (!data.selectedSubcategories || data.selectedSubcategories.length === 0) {
        throw new Error('Selecteer minimaal 1 onderdeel');
      }

      if (data.selectedSubcategories.length > 30) {
        throw new Error('Maximaal 30 onderdelen toegestaan');
      }

      // Call API to save subcategories
      const response = await fetch('/api/professional-subcategories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subcategoryIds: data.selectedSubcategories,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Kon onderdelen niet opslaan');
      }

      toast.success('Onderdelen opgeslagen!');
      setCurrentStep(5);
    } catch (err: unknown) {
      console.error('Subcategories save error:', err);

      let errorMessage = 'Er is een fout opgetreden bij het opslaan';
      if (err && typeof err === 'object' && 'message' in err) {
        errorMessage = (err as { message: string }).message;
      }

      toast.error(errorMessage);
    }
  };

  const handleCompanyNext = async (data: CompanyData) => {
    setCompanyData(data);

    try {
      const response = await fetch('/api/registration/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: data.companyName,
          kvkNumber: data.kvkNumber,
          postalCode: data.postalCode,
          houseNumber: data.houseNumber,
          street: data.street,
          city: data.city,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Kon bedrijfsgegevens niet opslaan');
      }

      toast.success('Registratie voltooid!');
      router.push('/pro-dashboard/account');
    } catch (err: unknown) {
      console.error('Company save error:', err);

      let errorMessage = 'Er is een fout opgetreden bij het opslaan';
      if (err && typeof err === 'object' && 'message' in err) {
        errorMessage = (err as { message: string }).message;
      }

      toast.error(errorMessage);
    }
  };

  // Show loading state while checking current step
  if (isLoadingStep) {
    return (
      <>
        <RegistrationSteps currentStep={currentStep} />
        <main className='flex-1 flex items-center justify-center px-4 py-12'>
          <div className='flex flex-col items-center gap-4'>
            <div className='w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin' />
            <p className='text-muted-foreground'>Laden...</p>
          </div>
        </main>
      </>
    );
  }

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
                isLoading={signUp.isPending}
              />
            )}
          </>
        )}

        {currentStep === 2 && (
          <WorkAreaForm
            onNext={handleWorkAreaNext}
            initialData={workAreaData}
          />
        )}

        {currentStep === 3 && (
          <ServiceCategoriesForm
            onNext={handleServiceCategoriesNext}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <SubcategoriesForm
            onNext={handleSubcategoriesNext}
            onBack={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 5 && (
          <CompanyRegistrationForm
            onNext={handleCompanyNext}
            onBack={() => setCurrentStep(4)}
          />
        )}
      </main>
    </>
  );
}
