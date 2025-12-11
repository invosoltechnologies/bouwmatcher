'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import AccountStatusCard from '@/components/professional-dashboard/account/AccountStatusCard';
import ContactInfoCard from '@/components/professional-dashboard/account/ContactInfoCard';
import ProfileCompletionCard from '@/components/professional-dashboard/account/ProfileCompletionCard';
import EditCompanyModal from '@/components/professional-dashboard/account/EditCompanyModal';
import EditContactModal from '@/components/professional-dashboard/account/EditContactModal';
import WorkAreaCard from '@/components/professional-dashboard/account/WorkAreaCard';
import EditWorkAreaModal from '@/components/professional-dashboard/account/EditWorkAreaModal';
import { useAccount } from '@/lib/hooks/professional/account';
import { useWorkArea } from '@/lib/hooks/professional/account/useWorkArea';

export default function AccountPageClient() {
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isWorkAreaModalOpen, setIsWorkAreaModalOpen] = useState(false);

  const { data, isLoading, isError } = useAccount();
  const { data: workAreaData } = useWorkArea();
useEffect(() => {
  console.log('AccountData', data?.accountData);
}, [data?.accountData]);
  // Show error toast if fetch fails
  if (isError) {
    toast.error('Kon accountgegevens niet laden');
  }

  const handleContactEdit = () => {
    setIsContactModalOpen(true);
  };

  const handleWorkAreaEdit = () => {
    setIsWorkAreaModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Laden...</div>
      </div>
    );
  }

  if (!data?.accountData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Geen accountgegevens gevonden</div>
      </div>
    );
  }

  const accountData = data.accountData;



  return (
    <div className="flex gap-6 w-full">
      {/* Main Content */}
      <div className="flex-1 max-w-3xl">
        <AccountStatusCard
          status={accountData.accountStatus.status}
          description={accountData.accountStatus.description}
          statusCode={accountData.accountStatus.statusCode}
        />

        <div className="mt-6">
          {/* <CompanyInfoCard
            companyInfo={accountData.companyInfo}
            onEdit={handleCompanyEdit}
          /> */}
        </div>

        <div className="mt-6">
          <WorkAreaCard onEdit={handleWorkAreaEdit} />
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
        />
      </aside>

      {/* Edit Modals */}
      <EditCompanyModal
        isOpen={isCompanyModalOpen}
        onClose={() => setIsCompanyModalOpen(false)}
        companyInfo={accountData.companyInfo}
      />
      <EditContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        contactInfo={accountData.contactInfo}
      />
      <EditWorkAreaModal
        isOpen={isWorkAreaModalOpen}
        onClose={() => setIsWorkAreaModalOpen(false)}
        initialData={workAreaData?.data}
      />
    </div>
  );
}
