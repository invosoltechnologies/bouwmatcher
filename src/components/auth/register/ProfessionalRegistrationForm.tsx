'use client';

import { useState } from 'react';
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
import { signUpProfessional } from '@/lib/supabase/auth';

export default function ProfessionalRegistrationForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [subStep, setSubStep] = useState<'contact' | 'password'>('contact');
  const [contactData, setContactData] = useState<ContactInfoData | null>(null);
  const [workAreaData, setWorkAreaData] = useState<WorkAreaData | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [serviceCategoriesData, setServiceCategoriesData] = useState<ServiceCategoriesData | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [subcategoriesData, setSubcategoriesData] = useState<SubcategoriesData | null>(null);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
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

  const handleWorkAreaNext = async (data: WorkAreaData) => {
    setWorkAreaData(data);
    setIsLoading(true);

    try {
      // Get current user from Supabase
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();

      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('Gebruiker niet gevonden. Log opnieuw in.');
      }

      // Update professional_profiles with location data
      const { error: updateError } = await supabase
        .from('professional_profiles')
        .update({
          work_address: data.location,
          work_postal_code: data.postalCode,
          work_city: data.city,
          work_latitude: data.latitude,
          work_longitude: data.longitude,
          service_radius_km: data.serviceRadius,
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Database update error:', updateError);
        throw new Error('Kon werkgebied niet opslaan');
      }

      toast.success('Werkgebied opgeslagen!');
      setCurrentStep(3);
    } catch (err: unknown) {
      console.error('Work area save error:', err);

      let errorMessage = 'Er is een fout opgetreden bij het opslaan';
      if (err && typeof err === 'object' && 'message' in err) {
        errorMessage = (err as { message: string }).message;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceCategoriesNext = async (data: ServiceCategoriesData) => {
    setServiceCategoriesData(data);
    setIsLoading(true);

    try {
      // Get current user from Supabase
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();

      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('Gebruiker niet gevonden. Log opnieuw in.');
      }

      // Update professional_profiles with specializations
      const { error: updateError } = await supabase
        .from('professional_profiles')
        .update({
          specializations: data.selectedCategories,
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Database update error:', updateError);
        throw new Error('Kon vakgebieden niet opslaan');
      }

      toast.success('Vakgebieden opgeslagen!');
      setCurrentStep(4);
    } catch (err: unknown) {
      console.error('Service categories save error:', err);

      let errorMessage = 'Er is een fout opgetreden bij het opslaan';
      if (err && typeof err === 'object' && 'message' in err) {
        errorMessage = (err as { message: string }).message;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubcategoriesNext = async (data: SubcategoriesData) => {
    setSubcategoriesData(data);
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompanyNext = async (data: CompanyData) => {
    setCompanyData(data);
    setIsLoading(true);

    try {
      // Get current user from Supabase
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();

      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('Gebruiker niet gevonden. Log opnieuw in.');
      }

      // Step 1: Check if company already exists by business_id (KVK number)
      const { data: existingCompany } = await supabase
        .from('professional_companies')
        .select('id')
        .eq('business_id', data.kvkNumber)
        .single();

      let companyId: string;

      if (existingCompany) {
        // Company exists - use existing company_id
        companyId = existingCompany.id;
        console.log('Company already exists, linking to existing company:', companyId);
      } else {
        // Company doesn't exist - create new one
        const { data: newCompany, error: companyError } = await supabase
          .from('professional_companies')
          .insert({
            company_name: data.companyName,
            business_id: data.kvkNumber,
            postal_code: data.postalCode,
            house_number: data.houseNumber,
            street_name: data.street,
            city: data.city,
            full_address: `${data.street} ${data.houseNumber}, ${data.postalCode} ${data.city}`,
            created_by: user.id,
            is_active: true,
            verification_status: 'pending',
          })
          .select('id')
          .single();

        if (companyError || !newCompany) {
          console.error('Error creating company:', companyError);
          throw new Error('Kon bedrijf niet aanmaken');
        }

        companyId = newCompany.id;
        console.log('New company created:', companyId);
      }

      // Step 2: Link user to company via company_id in professional_profiles
      const { error: updateError } = await supabase
        .from('professional_profiles')
        .update({
          company_id: companyId,
          role_in_company: existingCompany ? 'employee' : 'owner', // First user is owner, others are employees
          joined_company_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Database update error:', updateError);
        throw new Error('Kon bedrijfsgegevens niet opslaan');
      }

      toast.success('Bedrijfsgegevens opgeslagen!');
      // Complete registration
      router.push('/dashboard');
    } catch (err: unknown) {
      console.error('Company save error:', err);

      let errorMessage = 'Er is een fout opgetreden bij het opslaan';
      if (err && typeof err === 'object' && 'message' in err) {
        errorMessage = (err as { message: string }).message;
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
