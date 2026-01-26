'use client';

import { use, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useProfessionalDetails } from '@/lib/hooks/admin/useProfessionalDetails';
import AdminProfessionalHeader from '@/components/admin-dashboard/professional-detail/AdminProfessionalHeader';
import AccountStatusCard from '@/components/professional-dashboard/account/AccountStatusCard';
import ContactInfoCard from '@/components/professional-dashboard/account/ContactInfoCard';
import CompanyInfoCard from '@/components/professional-dashboard/account/CompanyInfoCard';
import ServiceCategoriesDisplayCard from '@/components/admin-dashboard/professional-detail/ServiceCategoriesDisplayCard';
import WorkAreaDisplayCard from '@/components/admin-dashboard/professional-detail/WorkAreaDisplayCard';
import AdminQuickActionsCard from '@/components/admin-dashboard/professional-detail/AdminQuickActionsCard';
import { ContactProfessionalModal } from '@/components/admin-dashboard/ContactProfessionalModal';
import { ConfirmationDialog } from '@/components/admin-dashboard/ConfirmationDialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText, Star, Calendar, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import {
  useBlockProfessional,
  useUnblockProfessional,
  useVerifyProfessional,
  useUnverifyProfessional,
} from '@/lib/hooks/admin/professional-actions';

export default function ProfessionalDetailPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const professionalId = params.id as string;

  const { data, isLoading, error } = useProfessionalDetails(professionalId);

  // Modal states
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [unblockDialogOpen, setUnblockDialogOpen] = useState(false);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [unverifyDialogOpen, setUnverifyDialogOpen] = useState(false);

  // Mutation hooks
  const blockMutation = useBlockProfessional();
  const unblockMutation = useUnblockProfessional();
  const verifyMutation = useVerifyProfessional();
  const unverifyMutation = useUnverifyProfessional();

  const handleBack = () => {
    router.push(`/${locale}/admin-dashboard/professionals`);
  };

  const handleContact = () => {
    setContactModalOpen(true);
  };

  // Confirmation handlers
  const confirmBlockProfessional = async () => {
    try {
      await blockMutation.mutateAsync(professionalId);
      toast.success('Professional is geblokkeerd!', {
        position: 'bottom-center',
        duration: 2000,
        style: {
          background: '#10b981',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
        },
      });
      setBlockDialogOpen(false);
    } catch (err) {
      console.error('Failed to block professional:', err);
      toast.error('Blokkeren mislukt', {
        position: 'bottom-center',
        duration: 2000,
      });
    }
  };

  const confirmUnblockProfessional = async () => {
    try {
      await unblockMutation.mutateAsync(professionalId);
      toast.success('Professional is gedeblokkeerd!', {
        position: 'bottom-center',
        duration: 2000,
        style: {
          background: '#10b981',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
        },
      });
      setUnblockDialogOpen(false);
    } catch (err) {
      console.error('Failed to unblock professional:', err);
      toast.error('Deblokkeren mislukt', {
        position: 'bottom-center',
        duration: 2000,
      });
    }
  };

  const confirmVerifyProfessional = async () => {
    try {
      await verifyMutation.mutateAsync(professionalId);
      toast.success('Professional is geverifieerd!', {
        position: 'bottom-center',
        duration: 2000,
        style: {
          background: '#10b981',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
        },
      });
      setVerifyDialogOpen(false);
    } catch (err) {
      console.error('Failed to verify professional:', err);
      toast.error('Verificatie mislukt', {
        position: 'bottom-center',
        duration: 2000,
      });
    }
  };

  const confirmUnverifyProfessional = async () => {
    try {
      await unverifyMutation.mutateAsync(professionalId);
      toast.success('Professional is niet meer geverifieerd!', {
        position: 'bottom-center',
        duration: 2000,
        style: {
          background: '#10b981',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
        },
      });
      setUnverifyDialogOpen(false);
    } catch (err) {
      console.error('Failed to unverify professional:', err);
      toast.error('Ongedaan maken mislukt', {
        position: 'bottom-center',
        duration: 2000,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-slate-500">Professional gegevens laden...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">
            Fout bij het laden van professional gegevens
          </p>
        </div>
      </div>
    );
  }

  const { profile, company, specializations, subcategories, certificates, ratings } = data;

  // Prepare data for existing components
  const contactInfo = {
    contactPerson: `${profile.firstName} ${profile.lastName}`,
    quotesEmail: profile.quotesEmail || 'Niet opgegeven',
    invoicesEmail: profile.invoicesEmail || 'Niet opgegeven',
    generalEmail: profile.email,
    phoneNumber: profile.phone || 'Niet opgegeven',
  };

  const companyInfo = company
    ? {
        companyName: company.companyName,
        address: company.fullAddress || 'Niet opgegeven',
        postalCode: company.postalCode || 'Niet opgegeven',
        city: company.city || 'Niet opgegeven',
        website: company.website || 'Niet opgegeven',
        businessId: company.businessId || 'Niet opgegeven',
      }
    : null;

  // Transform categories for display
  const categories = specializations.map((spec) => ({
    id: spec.id,
    name: spec.categoryNameNl || spec.categoryNameEn || 'Onbekend',
    priority: spec.priority,
  }));

  const subcats = subcategories.map((sub) => ({
    id: sub.id,
    name: sub.subcategoryNameNl || sub.subcategoryNameEn || 'Onbekend',
  }));

  // Determine account status
  const getAccountStatus = () => {
    if (!profile.isActive) {
      return {
        statusKey: 'suspended',
        descriptionKey: 'suspended',
        statusCode: -1 as const,
      };
    }
    if (profile.isVerified === 'verified') {
      return {
        statusKey: 'verified',
        descriptionKey: 'verified',
        statusCode: 1 as const,
      };
    }
    return {
      statusKey: 'inReview',
      descriptionKey: 'inReview',
      statusCode: 2 as const,
    };
  };

  const accountStatus = getAccountStatus();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Onbekend';
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminProfessionalHeader
        avatar={profile.profilePictureUrl}
        firstName={profile.firstName}
        lastName={profile.lastName}
        email={profile.email}
        phone={profile.phone}
        status={profile.isVerified as any}
        rating={ratings.summary.averageRating}
        reviewCount={ratings.summary.totalRatings}
        onBack={handleBack}
        onVerify={() => setVerifyDialogOpen(true)}
        onUnverify={() => setUnverifyDialogOpen(true)}
        onBlock={() => setBlockDialogOpen(true)}
        onUnblock={() => setUnblockDialogOpen(true)}
        onContact={handleContact}
      />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Status */}
          <AccountStatusCard
            statusKey={accountStatus.statusKey}
            descriptionKey={accountStatus.descriptionKey}
            statusCode={accountStatus.statusCode}
          />

          {/* Contact Information */}
          <ContactInfoCard contactInfo={contactInfo} />

          {/* Company Information */}
          {companyInfo && <CompanyInfoCard companyInfo={companyInfo} />}

          {/* Service Categories */}
          <ServiceCategoriesDisplayCard
            categories={categories}
            subcategories={subcats}
          />

          {/* Work Area */}
          <WorkAreaDisplayCard
            workAddress={profile.workAddress}
            workPostalCode={profile.workPostalCode}
            workCity={profile.workCity}
            workCountry={profile.workCountry}
            serviceRadiusKm={profile.serviceRadiusKm}
          />

          {/* Portfolio Photos */}
          {profile.portfolioPhotos && profile.portfolioPhotos.length > 0 && (
            <Card className="px-5 gap-4">
              <CardHeader className="p-0 gap-0">
                <CardTitle className="text-xl leading-normal">
                  Portfolio Foto&apos;s
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {profile.portfolioPhotos.map((photo: string, idx: number) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-lg overflow-hidden bg-slate-100 relative"
                    >
                      <img
                        src={photo}
                        alt={`Portfolio ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Certificates */}
          {certificates && certificates.length > 0 && (
            <Card className="px-5 gap-4">
              <CardHeader className="p-0 gap-0">
                <CardTitle className="text-xl leading-normal">
                  Certificaten
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-3">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">
                          {cert.title}
                        </p>
                        <p className="text-xs text-slate-600">
                          {cert.issuing_organization}
                        </p>
                        {cert.issue_date && (
                          <p className="text-xs text-slate-500 mt-1">
                            Uitgegeven: {formatDate(cert.issue_date)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Reviews */}
          {ratings.recent && ratings.recent.length > 0 && (
            <Card className="px-5 gap-4">
              <CardHeader className="p-0 gap-0">
                <CardTitle className="text-xl leading-normal">
                  Recente Beoordelingen
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4">
                  {ratings.recent.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 border border-slate-200 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900">
                          {review.reviewer_name}
                        </span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'w-4 h-4',
                                i < Math.floor(review.rating)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-slate-200 fill-slate-200'
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      {review.review_text && (
                        <p className="text-sm text-slate-600 mb-2">
                          {review.review_text}
                        </p>
                      )}
                      <p className="text-xs text-slate-500">
                        {formatDate(review.created_at)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Admin Quick Actions */}
          <AdminQuickActionsCard
            status={profile.isVerified as any}
            onVerify={() => setVerifyDialogOpen(true)}
            onUnverify={() => setUnverifyDialogOpen(true)}
            onBlock={() => setBlockDialogOpen(true)}
            onUnblock={() => setUnblockDialogOpen(true)}
            onContact={handleContact}
            isLoading={
              blockMutation.isPending ||
              unblockMutation.isPending ||
              verifyMutation.isPending ||
              unverifyMutation.isPending
            }
          />

          {/* Quick Stats */}
          <Card className="px-5 gap-4">
            <CardHeader className="p-0 gap-0">
              <CardTitle className="text-xl leading-normal">
                Snelle Statistieken
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-slate-600">Lid sinds</p>
                    <p className="text-sm font-medium text-slate-900">
                      {formatDate(profile.createdAt)}
                    </p>
                  </div>
                </div>

                {profile.lastLoginAt && (
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-slate-600">Laatste login</p>
                      <p className="text-sm font-medium text-slate-900">
                        {formatDate(profile.lastLoginAt)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-slate-600">Totaal beoordelingen</p>
                    <p className="text-sm font-medium text-slate-900">
                      {ratings.summary.totalRatings}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactProfessionalModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        professionalName={`${profile.firstName} ${profile.lastName}`}
        email={profile.email}
        phone={profile.phone}
      />

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        isOpen={blockDialogOpen}
        onClose={() => setBlockDialogOpen(false)}
        onConfirm={confirmBlockProfessional}
        title={`Weet je zeker dat je ${profile.firstName} ${profile.lastName} wilt blokkeren?`}
        description="Het account wordt geschorst (is_active = false) en de gebruiker kan niet meer inloggen."
        confirmText="Blokkeren"
        variant="danger"
        isLoading={blockMutation.isPending}
      />

      <ConfirmationDialog
        isOpen={unblockDialogOpen}
        onClose={() => setUnblockDialogOpen(false)}
        onConfirm={confirmUnblockProfessional}
        title={`Weet u zeker dat u ${profile.firstName} ${profile.lastName} wilt deblokkeren?`}
        description="Het account wordt geactiveerd (is_active = true) en de status wordt niet-geverifieerd. De gebruiker kan weer inloggen."
        confirmText="Deblokkeren"
        variant="success"
        isLoading={unblockMutation.isPending}
      />

      <ConfirmationDialog
        isOpen={verifyDialogOpen}
        onClose={() => setVerifyDialogOpen(false)}
        onConfirm={confirmVerifyProfessional}
        title={`Weet u zeker dat u ${profile.firstName} ${profile.lastName} wilt verifiëren?`}
        description="Deze gebruiker wordt als geverifieerd gemarkeerd en kan volledige toegang krijgen."
        confirmText="Verifiëren"
        variant="success"
        isLoading={verifyMutation.isPending}
      />

      <ConfirmationDialog
        isOpen={unverifyDialogOpen}
        onClose={() => setUnverifyDialogOpen(false)}
        onConfirm={confirmUnverifyProfessional}
        title={`Weet u zeker dat u de verificatie van ${profile.firstName} ${profile.lastName} wilt intrekken?`}
        description="Deze gebruiker wordt als niet-geverifieerd gemarkeerd maar kan wel blijven inloggen."
        confirmText="Niet Verifiëren"
        variant="danger"
        isLoading={unverifyMutation.isPending}
      />
    </div>
  );
}
