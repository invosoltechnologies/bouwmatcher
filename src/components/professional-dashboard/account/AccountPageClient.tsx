'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('common.proDashboard.account');
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
    toast.error(t('errorLoading'));
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
        <div className="text-muted-foreground">{t('loading')}</div>
      </div>
    );
  }

  if (!data?.accountData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">{t('noData')}</div>
      </div>
    );
  }

  const accountData = data.accountData;

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6 w-full">
      {/* Main Content */}
      <div className="flex-1 lg:max-w-3xl space-y-6">
        <AccountStatusCard
          statusKey={accountData.accountStatus.statusKey}
          descriptionKey={accountData.accountStatus.descriptionKey}
          statusCode={accountData.accountStatus.statusCode}
        />

        <WorkAreaCard onEdit={handleWorkAreaEdit} />

        <ContactInfoCard
          contactInfo={accountData.contactInfo}
          onEdit={handleContactEdit}
        />
      </div>

      {/* Right Sidebar - comes first on mobile, second on desktop */}
      <aside className="w-full lg:max-w-sm lg:flex-shrink-0 order-first lg:order-last">
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
