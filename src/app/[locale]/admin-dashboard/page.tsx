'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  HardDrive,
  CheckCircle2,
  Star,
  UserRoundX,
  Clock,
} from 'lucide-react';
import StatsCard from '@/components/admin-dashboard/StatsCard';
import ProfessionalsTable from '@/components/admin-dashboard/ProfessionalsTable';
import ReviewCard from '@/components/admin-dashboard/ReviewCard';
import ServiceCategoriesList from '@/components/admin-dashboard/ServiceCategoriesList';
import { ReviewRejectionModal } from '@/components/admin-dashboard/ReviewRejectionModal';
import { useProfessionals } from '@/lib/hooks/admin/professionals';
import { useAllReviews, useReviewApproval, type Review } from '@/lib/hooks/admin/reviews';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

export default function AdminDashboardPage() {
  const t = useTranslations('common.adminDashboard');
  const router = useRouter();
  const [loadingReviewId, setLoadingReviewId] = useState<string | null>(null);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  const { data, isLoading } = useProfessionals({
    limit: 5,
    sortBy: 'created_at',
    sortOrder: 'desc',
  });

  const { data: reviewsData, isLoading: reviewsLoading, refetch: refetchReviews } = useAllReviews(4, 0);
  const reviewApprovalMutation = useReviewApproval();

  // Transform API response and compute stats
  const { transformedProfessionals, stats } = useMemo(() => {
    if (!data?.professionals) {
      return {
        transformedProfessionals: [],
        stats: {
          totalProfessionals: 0,
          verificationRate: 0,
          averageRating: 0,
          pendingVerifications: 0,
        },
      };
    }

    const professionals = data.professionals;
    const transformed = professionals.map((professional) => ({
      id: professional.id,
      name: `${professional.first_name} ${professional.last_name}`,
      email: professional.email,
      avatar: professional.profile_picture_url || undefined,
      categories: professional.categories?.map((cat) => cat.name) || [],
      status: professional.status,
      rating: professional.rating,
      reviewCount: professional.review_count,
      registeredAt: new Date(professional.created_at).toISOString().split('T')[0],
    }));

    // Calculate statistics
    const verified = professionals.filter((p) => p.status === 'verified').length;
    const verificationRate = professionals.length > 0
      ? Math.round((verified / professionals.length) * 100 * 10) / 10
      : 0;

    const totalRating = professionals.reduce((sum, p) => sum + p.rating, 0);
    const averageRating = professionals.length > 0
      ? Math.round((totalRating / professionals.length) * 10) / 10
      : 0;

    const pending = professionals.filter((p) =>
      p.status === 'pending' || p.status === 'in_review'
    ).length;

    return {
      transformedProfessionals: transformed,
      stats: {
        totalProfessionals: data.total,
        verificationRate,
        averageRating,
        pendingVerifications: pending,
      },
    };
  }, [data]);

  return (
    <div className="space-y-6">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        <StatsCard
          icon={HardDrive}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
          value={stats.totalProfessionals}
          label={t('stats.newLeads', { defaultValue: 'Nieuwe leads (30d)' })}
          change={{
            value: '12%',
            isPositive: true,
          }}
          bottomText={t('stats.newLeadsChange', {
            defaultValue: '+23 versus vorige maand',
          })}
          bottomTextColor="text-green-600"
        />

        <StatsCard
          icon={CheckCircle2}
          iconColor="text-green-600"
          iconBgColor="bg-green-50"
          value={`${stats.verificationRate}%`}
          label={t('stats.verificationRate', {
            defaultValue: 'Verificatiepercentage',
          })}
          change={{
            value: '8%',
            isPositive: true,
          }}
          bottomText={t('stats.verificationRateDetails', {
            defaultValue: '150 van 175 goedgekeurd',
          })}
          bottomTextColor="text-green-600"
        />

        <StatsCard
          icon={Star}
          iconColor="text-yellow-600"
          iconBgColor="bg-yellow-50"
          value={stats.averageRating}
          label={t('stats.averageRating', {
            defaultValue: 'Gemiddelde beoordeling',
          })}
          change={{
            value: '3%',
            isPositive: true,
          }}
          bottomText={t('stats.averageRatingDetails', {
            defaultValue: 'Uit 1.234 beoordelingen',
          })}
          bottomTextColor="text-amber-600"
        />

        <StatsCard
          icon={UserRoundX}
          iconColor="text-red-600"
          iconBgColor="bg-red-50"
          value={stats.pendingVerifications}
          label={t('stats.blockedProfessionals', {
            defaultValue: 'Geblokkeerde professionals',
          })}
          change={{
            value: '2%',
            isPositive: true,
          }}
          bottomText={t('stats.blockedProfessionalsChange', {
            defaultValue: '+1 deze week',
          })}
          bottomTextColor="text-green-600"
        />

        <StatsCard
          icon={Clock}
          iconColor="text-cyan-600"
          iconBgColor="bg-cyan-50"
          value={stats.pendingVerifications}
          label={t('stats.moderationQueue', {
            defaultValue: 'Moderatiewachtrij',
          })}
          change={{
            value: '5%',
            isPositive: true,
          }}
          bottomText={t('stats.moderationQueueDetails', {
            defaultValue: 'Heeft aandacht nodig',
          })}
          bottomTextColor="text-red-600"
        />
      </div>

      {/* Recent Professionals Table - Full Width */}
      <ProfessionalsTable
        professionals={transformedProfessionals}
        onViewProfile={(id) => router.push(`/admin-dashboard/professionals/${id}`)}
        onViewAll={() => router.push('/admin-dashboard/professionals')}
      />

      {/* Bottom Grid - Reviews and Service Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reviews - Left Column */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-secondary-foreground">
              {t('recentReviews', { defaultValue: 'Recente beoordelingen' })}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t('recentReviewsDesc', {
                defaultValue: 'Wachtende goedkeuring',
              })}
            </p>
          </div>

          <div className="space-y-4">
            {reviewsLoading ? (
              <div className="py-8 text-center text-muted-foreground">
                Beoordelingen laden...
              </div>
            ) : !reviewsData?.reviews || reviewsData.reviews.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                Geen beoordelingen in afwachting van goedkeuring
              </div>
            ) : (
              reviewsData.reviews.map((review: Review) => (
                <ReviewCard
                  key={review.id}
                  id={review.id}
                  rating={review.rating}
                  reviewText={review.review_text || ''}
                  reviewerName={review.reviewer_name || 'Unknown'}
                  professionalName={review.professional_name || ''}
                  companyName={review.company_name}
                  date={review.created_at}
                  status={review.approval_status || 'pending'}
                  rejectionReason={review.rejection_reason}
                  approvedAt={review.approved_at}
                  isAdmin={true}
                  isLoading={loadingReviewId === review.id}
                  onApprove={async (reviewId) => {
                    try {
                      setLoadingReviewId(reviewId);
                      await reviewApprovalMutation.mutateAsync({
                        reviewId,
                        action: 'approve',
                      });
                      toast.success('Beoordeling goedgekeurd!');
                      await refetchReviews();
                    } catch (error) {
                      toast.error(
                        error instanceof Error
                          ? error.message
                          : 'Goedkeuring mislukt'
                      );
                    } finally {
                      setLoadingReviewId(null);
                    }
                  }}
                  onShowRejectionModal={() => {
                    setSelectedReviewId(review.id);
                    setShowRejectionModal(true);
                  }}
                />
              ))
            )}
          </div>

          {/* Show all link */}
          {reviewsData && reviewsData.total > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200 text-center">
              <button className="text-primary font-medium hover:underline">
                {t('viewAllReviews', { defaultValue: 'Alle beoordelingen bekijken' })} ({reviewsData.total})
              </button>
            </div>
          )}
        </div>

        {/* Service Categories - Right Column */}
        <ServiceCategoriesList />
      </div>

      {/* Rejection Modal */}
      <ReviewRejectionModal
        isOpen={showRejectionModal}
        onClose={() => {
          setShowRejectionModal(false);
          setSelectedReviewId(null);
        }}
        onConfirm={async (reason) => {
          if (!selectedReviewId) return;

          try {
            setLoadingReviewId(selectedReviewId);
            await reviewApprovalMutation.mutateAsync({
              reviewId: selectedReviewId,
              action: 'reject',
              rejectionReason: reason,
            });
            toast.success('Beoordeling afgewezen!');
            setShowRejectionModal(false);
            setSelectedReviewId(null);
            await refetchReviews();
          } catch (error) {
            toast.error(
              error instanceof Error ? error.message : 'Afwijzing mislukt'
            );
          } finally {
            setLoadingReviewId(null);
          }
        }}
        isLoading={loadingReviewId === selectedReviewId}
      />
    </div>
  );
}
