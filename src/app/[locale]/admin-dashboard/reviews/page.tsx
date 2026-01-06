'use client';

import { useMemo, useState, useEffect } from 'react';
import { Star, Filter, Search } from 'lucide-react';
import StatsCard from '@/components/admin-dashboard/StatsCard';
import ReviewCard from '@/components/admin-dashboard/ReviewCard';
import { ReviewRejectionModal } from '@/components/admin-dashboard/ReviewRejectionModal';
import { useAllReviews, useReviewApproval } from '@/lib/hooks/admin/reviews';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'all';

export default function AdminReviewsPage() {
  const t = useTranslations('common.adminDashboard.reviews');
  const [activeTab, setActiveTab] = useState<ReviewStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [loadingReviewId, setLoadingReviewId] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [allStats, setAllStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });
  const LIMIT = 10;

  const { data: reviewsData, isLoading: reviewsLoading, refetch } = useAllReviews(
    LIMIT,
    offset,
    activeTab !== 'all' ? activeTab : undefined
  );
  const reviewApprovalMutation = useReviewApproval();

  // Fetch stats from all reviews endpoint
  const fetchStats = async () => {
    try {
      const [pendingRes, approvedRes, rejectedRes, allRes] = await Promise.all([
        fetch('/api/admin/reviews/all?limit=1&offset=0&status=pending'),
        fetch('/api/admin/reviews/all?limit=1&offset=0&status=approved'),
        fetch('/api/admin/reviews/all?limit=1&offset=0&status=rejected'),
        fetch('/api/admin/reviews/all?limit=1&offset=0'),
      ]);

      const pendingData = await pendingRes.json();
      const approvedData = await approvedRes.json();
      const rejectedData = await rejectedRes.json();
      const allData = await allRes.json();

      setAllStats({
        pending: pendingData.total || 0,
        approved: approvedData.total || 0,
        rejected: rejectedData.total || 0,
        total: allData.total || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Transform and filter reviews
  const { displayedReviews } = useMemo(() => {
    if (!reviewsData?.reviews) {
      return {
        displayedReviews: [],
      };
    }

    const reviews = reviewsData.reviews;

    // Filter by search query
    let filtered = reviews;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.professional_name?.toLowerCase().includes(query) ||
        r.company_name?.toLowerCase().includes(query) ||
        r.reviewer_name?.toLowerCase().includes(query)
      );
    }

    return {
      displayedReviews: filtered,
    };
  }, [reviewsData, searchQuery]);

  const handleApprove = async (reviewId: string) => {
    setLoadingReviewId(reviewId);
    try {
      await reviewApprovalMutation.mutateAsync({
        reviewId,
        action: 'approve',
      });
      toast.success('Beoordeling goedgekeurd');
      await refetch();
      await fetchStats();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Goedkeuring mislukt');
    } finally {
      setLoadingReviewId(null);
    }
  };

  const handleReject = async (reason: string) => {
    if (!selectedReviewId) return;

    setLoadingReviewId(selectedReviewId);
    try {
      await reviewApprovalMutation.mutateAsync({
        reviewId: selectedReviewId,
        action: 'reject',
        rejectionReason: reason,
      });
      toast.success('Beoordeling afgewezen');
      setShowRejectionModal(false);
      setSelectedReviewId(null);
      await refetch();
      await fetchStats();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Afwijzing mislukt');
    } finally {
      setLoadingReviewId(null);
    }
  };

  const handleShowRejectionModal = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setShowRejectionModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header with Title and Link */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Recent beoordelingen</h1>
        <a href="/admin-dashboard/reviews" className="text-primary hover:underline text-sm font-medium">
          Bekijk alles
        </a>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          icon={Star}
          iconColor="text-yellow-600"
          iconBgColor="bg-yellow-50"
          value={allStats.pending}
          label="Pending Reviews"
          topText="In Afwachting"
        />
        <StatsCard
          icon={Star}
          iconColor="text-green-600"
          iconBgColor="bg-green-50"
          value={allStats.approved}
          label="Approved Reviews"
          topText="Goedgekeurd"
        />
        <StatsCard
          icon={Star}
          iconColor="text-red-600"
          iconBgColor="bg-red-50"
          value={allStats.rejected}
          label="Rejected Reviews"
          topText="Afgewezen"
        />
        <StatsCard
          icon={Star}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
          value={allStats.total}
          label="Total Reviews"
          topText="Totaal"
        />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by company, professional, or reviewer name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOffset(0);
            }}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          className="gap-2"
        >
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-slate-200">
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value as ReviewStatus);
            setOffset(0);
          }}
          className="w-full"
        >
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-4">
            <TabsTrigger
              value="pending"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent"
            >
              Pending ({allStats.pending})
            </TabsTrigger>
            <TabsTrigger
              value="approved"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent"
            >
              Approved ({allStats.approved})
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent"
            >
              Rejected ({allStats.rejected})
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent"
            >
              All ({allStats.total})
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            {reviewsLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading reviews...</p>
              </div>
            ) : displayedReviews.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No reviews found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedReviews.map((review) => (
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
                    onApprove={handleApprove}
                    onShowRejectionModal={() => handleShowRejectionModal(review.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </Tabs>
      </div>

      {/* Pagination */}
      {!reviewsLoading && displayedReviews.length > 0 && (
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setOffset(Math.max(0, offset - LIMIT))}
            disabled={offset === 0}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {Math.floor(offset / LIMIT) + 1}
          </span>
          <Button
            variant="outline"
            onClick={() => setOffset(offset + LIMIT)}
            disabled={displayedReviews.length < LIMIT}
          >
            Next
          </Button>
        </div>
      )}

      {/* Rejection Modal */}
      <ReviewRejectionModal
        isOpen={showRejectionModal}
        onClose={() => {
          setShowRejectionModal(false);
          setSelectedReviewId(null);
        }}
        onConfirm={handleReject}
        isLoading={loadingReviewId === selectedReviewId}
      />
    </div>
  );
}
