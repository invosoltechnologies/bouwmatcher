'use client';

import { useState } from 'react';
import { useAccount } from '@/lib/hooks/professional/account';
import CompanyHeaderCard from './CompanyHeaderCard';
import CompanyDescriptionCard from './CompanyDescriptionCard';
import ProjectPhotosCard from './ProjectPhotosCard';
import ReviewsSection from './ReviewsSection';
import LocationMapCard from './LocationMapCard';
import CertificatesCard from './CertificatesCard';
import ProfileCompletionCard from '../account/ProfileCompletionCard';
import MoreInfoCard from './MoreInfoCard';
import EditCompanyModal from '../account/EditCompanyModal';

export default function BusinessProfilePageClient() {
  const { data, isLoading } = useAccount();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <p className='text-muted-foreground'>Laden...</p>
      </div>
    );
  }

  if (!data?.accountData) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <p className='text-destructive'>Fout bij het laden van profielgegevens</p>
      </div>
    );
  }

  const accountData = data.accountData;

  return (
    <div className='p-6 space-y-6'>
      {/* Company Header Card - Full Width */}
      <CompanyHeaderCard
        companyInfo={accountData.companyInfo}
        contactInfo={accountData.contactInfo}
        onEditClick={() => setIsEditModalOpen(true)}
      />

      {/* Two Column Layout */}
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Left Column - Main Content */}
        <div className='flex-1 space-y-6'>
          <CompanyDescriptionCard />
          <ProjectPhotosCard />
          <ReviewsSection />
          <LocationMapCard />
          <CertificatesCard />
        </div>

        {/* Right Column - Sidebar */}
        <div className='w-full lg:w-80 space-y-6'>
          <ProfileCompletionCard
            completionPercentage={accountData.profileCompletion.percentage}
            tasks={accountData.profileCompletion.tasks}
          />
          <MoreInfoCard
            registrationStatus={accountData.accountStatus.status}
            businessId={accountData.companyInfo.businessId}
          />
        </div>
      </div>

      {/* Edit Company Modal */}
      <EditCompanyModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        companyInfo={accountData.companyInfo}
      />
    </div>
  );
}
