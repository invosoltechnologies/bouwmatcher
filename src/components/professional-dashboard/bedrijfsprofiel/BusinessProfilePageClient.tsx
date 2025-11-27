'use client';

import { useState, useMemo } from 'react';
import { useAccount } from '@/lib/hooks/professional/account';
import { useCompanyRatings } from '@/lib/hooks/professional/ratings';
import CompanyHeaderCard from './CompanyHeaderCard';
import CompanyDescriptionCard from './CompanyDescriptionCard';
import ProjectPhotosCard from './ProjectPhotosCard';
import ReviewsSection from './ReviewsSection';
import LocationMapCard from './LocationMapCard';
import CertificatesCard from './CertificatesCard';
import ProfileCompletionCard from '../account/ProfileCompletionCard';
import MoreInfoCard from './MoreInfoCard';
import EditCompanyModal from '../account/EditCompanyModal';
import EditCompanyDescriptionModal from './EditCompanyDescriptionModal';
import CompanyLogoUploadModal from './CompanyLogoUploadModal';
import CompanyRatingModal from './CompanyRatingModal';

export default function BusinessProfilePageClient() {
  const { data, isLoading } = useAccount();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  // Fetch company ratings (using optional company ID)
  const companyId = data?.accountData?.companyInfo?.companyId || '';
  const {
    data: ratingsData,
    isLoading: ratingsLoading,
  } = useCompanyRatings(companyId);

  // Find user's existing rating
  const userRating = useMemo(() => {
    if (!ratingsData?.ratings || !data?.accountData) return null;
    // Find rating by matching the professional profile ID (not company ID)
    const profileId = data.accountData.companyInfo.companyId;
    return (
      ratingsData.ratings.find(
        (r) => r.rated_by_profile_id === profileId
      ) || null
    );
  }, [ratingsData, data]);

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
        roleInCompany={accountData.roleInCompany}
        onLogoClick={() => setIsLogoModalOpen(true)}
        onRatingClick={() => setIsRatingModalOpen(true)}
        ratingSummary={ratingsLoading ? undefined : ratingsData?.summary}
        userRating={userRating?.rating || null}
      />

      {/* Two Column Layout */}
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Left Column - Main Content */}
        <div className='flex-1 space-y-6'>
          <CompanyDescriptionCard
            description={accountData.companyInfo.businessDescription}
            roleInCompany={accountData.roleInCompany}
            onEditClick={() => setIsDescriptionModalOpen(true)}
          />
          <ProjectPhotosCard photos={accountData.portfolioPhotos} />
          <ReviewsSection />
          {/* <LocationMapCard /> */}
          <CertificatesCard certificates={accountData.certificates} />
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
        roleInCompany={accountData.roleInCompany}
      />

      {/* Edit Company Description Modal */}
      <EditCompanyDescriptionModal
        isOpen={isDescriptionModalOpen}
        onClose={() => setIsDescriptionModalOpen(false)}
        currentDescription={accountData.companyInfo.businessDescription}
      />

      {/* Company Logo Upload Modal */}
      <CompanyLogoUploadModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        currentLogoUrl={accountData.companyInfo.logoUrl}
      />

      {/* Company Rating Modal */}
      <CompanyRatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        companyId={accountData.companyInfo.companyId}
        existingRating={userRating}
      />
    </div>
  );
}
