'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import AccountStatusCard from '@/components/professional-dashboard/account/AccountStatusCard';
import CompanyInfoCard from '@/components/professional-dashboard/account/CompanyInfoCard';
import ContactInfoCard from '@/components/professional-dashboard/account/ContactInfoCard';
import ProfileCompletionCard from '@/components/professional-dashboard/account/ProfileCompletionCard';
import EditCompanyModal from '@/components/professional-dashboard/account/EditCompanyModal';
import EditContactModal from '@/components/professional-dashboard/account/EditContactModal';
import type { AccountData } from '@/lib/types/account';

export default function AccountPageClient() {
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const fetchAccountData = async () => {
    try {
      const response = await fetch('/api/account');

      if (!response.ok) {
        throw new Error('Failed to fetch account data');
      }

      const { accountData } = await response.json();
      setAccountData(accountData);
    } catch (error) {
      console.error('Error fetching account data:', error);
      toast.error('Kon accountgegevens niet laden');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  const handleDocumentClick = () => {
    // TODO: Implement document upload
    console.log('Document upload clicked');
    toast('Document upload functionaliteit komt binnenkort');
  };

  const handleCompanyEdit = () => {
    setIsCompanyModalOpen(true);
  };

  const handleContactEdit = () => {
    setIsContactModalOpen(true);
  };

  const handleProfileEdit = () => {
    // TODO: Navigate to profile edit page
    console.log('Edit profile');
    toast('Profiel bewerken komt binnenkort');
  };

  const handleEditSuccess = () => {
    // Refetch account data after successful edit
    fetchAccountData();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Laden...</div>
      </div>
    );
  }

  if (!accountData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Geen accountgegevens gevonden</div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 w-full">
      {/* Main Content */}
      <div className="flex-1 max-w-3xl">
        <AccountStatusCard
          status={accountData.accountStatus.status}
          description={accountData.accountStatus.description}
          statusCode={accountData.accountStatus.statusCode}
          documentRequired={accountData.accountStatus.documentRequired}
          onDocumentClick={handleDocumentClick}
        />

        <div className="mt-6">
          <CompanyInfoCard
            companyInfo={accountData.companyInfo}
            onEdit={handleCompanyEdit}
          />
        </div>

        <div className="mt-6">
          <ContactInfoCard
            contactInfo={accountData.contactInfo}
            onEdit={handleContactEdit}
          />
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="max-w-sm w-full flex-shrink-0">
        <ProfileCompletionCard
          completionPercentage={accountData.profileCompletion.percentage}
          tasks={accountData.profileCompletion.tasks}
          onEditClick={handleProfileEdit}
        />
      </aside>

      {/* Edit Modals */}
      {accountData && (
        <>
          <EditCompanyModal
            isOpen={isCompanyModalOpen}
            onClose={() => setIsCompanyModalOpen(false)}
            companyInfo={accountData.companyInfo}
            onSuccess={handleEditSuccess}
          />
          <EditContactModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
            contactInfo={accountData.contactInfo}
            onSuccess={handleEditSuccess}
          />
        </>
      )}
    </div>
  );
}
