'use client';

import AccountStatusCard from '@/components/professional-dashboard/account/AccountStatusCard';
import CompanyInfoCard from '@/components/professional-dashboard/account/CompanyInfoCard';
import ContactInfoCard from '@/components/professional-dashboard/account/ContactInfoCard';
import ProfileCompletionCard from '@/components/professional-dashboard/account/ProfileCompletionCard';

export default function AccountPage() {
  // Dummy data - will be replaced with API integration
  const accountStatus = {
    status: 'In verificatie',
    description: 'Je aanmelding wordt geverifieerd. Dit kan 1-2 werkdagen duren.',
    statusCode: 2 as const, // 2 for in process, 1 for verified, -1 for inactive/blocked
    documentRequired: true,
  };

  const companyInfo = {
    bedrijfsnaam: 'Hotspot Amsterdam Noord',
    adres: 'Klaprozenweg 13',
    postcode: '1032 KK',
    plaats: 'Amsterdam',
    website: '-',
    bedrijfsId: '70193479',
  };

  const contactInfo = {
    contactpersoon: 'Alex Militaru',
    offertesEmail: 'alexmilitaru87@gmail.com',
    facturenEmail: 'alexmilitaru87@gmail.com',
    algemeenEmail: 'alexmilitaru87@gmail.com',
    telefoonnummer: '+31 848 504 039',
  };

  const handleDocumentClick = () => {
    // TODO: Implement document upload
    console.log('Document upload clicked');
  };

  const handleCompanyEdit = () => {
    // TODO: Implement company info edit
    console.log('Edit company info');
  };

  const handleContactEdit = () => {
    // TODO: Implement contact info edit
    console.log('Edit contact info');
  };

  const handleProfileEdit = () => {
    // TODO: Implement profile edit
    console.log('Edit profile');
  };

  // Dummy data for profile completion
  const profileCompletion = {
    percentage: 28,
    tasks: [
      {
        id: '1',
        title: 'Upload een logo en bedrijfsfoto',
        statusText: 'Klaar',
        completed: true,
      },
      {
        id: '2',
        title: 'Vul je omschrijving & doelregio in',
        statusText: 'Nog te doen',
        completed: false,
      },
      {
        id: '3',
        title: 'Vraag ten minste 1 review aan',
        statusText: 'Nog te doen',
        completed: false,
      },
      {
        id: '4',
        title: 'Verifieer je bedrijfsgegevens',
        statusText: 'Nog te doen',
        completed: false,
      },
    ],
  };

  return (
    <div className="flex gap-6 w-full">
      {/* Main Content */}
      <div className="flex-1 max-w-3xl">
        <AccountStatusCard
          status={accountStatus.status}
          description={accountStatus.description}
          statusCode={accountStatus.statusCode}
          documentRequired={accountStatus.documentRequired}
          onDocumentClick={handleDocumentClick}
        />

        <div className="mt-6">
          <CompanyInfoCard companyInfo={companyInfo} onEdit={handleCompanyEdit} />
        </div>

        <div className="mt-6">
          <ContactInfoCard contactInfo={contactInfo} onEdit={handleContactEdit} />
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="max-w-sm w-full flex-shrink-0">
        <ProfileCompletionCard
          completionPercentage={profileCompletion.percentage}
          tasks={profileCompletion.tasks}
          onEditClick={handleProfileEdit}
        />
      </aside>
    </div>
  );
}