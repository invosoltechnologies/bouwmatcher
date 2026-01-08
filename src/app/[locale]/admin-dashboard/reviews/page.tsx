'use client';

import { useMemo, useState, useEffect } from 'react';
import { Star, Search, X, CheckCircle, XCircle } from 'lucide-react';
import StatsCard from '@/components/admin-dashboard/StatsCard';
import ReviewsTable from '@/components/admin-dashboard/ReviewsTable';
import { ReviewRejectionModal } from '@/components/admin-dashboard/ReviewRejectionModal';
import { useAllReviews, useReviewApproval } from '@/lib/hooks/admin/reviews';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'all';

interface ServiceCategory {
  id: number;
  name_nl: string;
  name_en: string;
}

interface ServiceSubcategory {
  id: number;
  name_nl: string;
  name_en: string;
  service_category_id: number;
}

export default function AdminReviewsPage() {
  const t = useTranslations('common.adminDashboard.reviews');
  const [activeStatus, setActiveStatus] = useState<ReviewStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [loadingReviewId, setLoadingReviewId] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('all');
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [subcategories, setSubcategories] = useState<ServiceSubcategory[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());
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
    activeStatus !== 'all' ? activeStatus : undefined
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
    fetchCategories();
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/service-categories');
      const data = await response.json();
      setCategories(data.serviceCategories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch subcategories when category changes
  useEffect(() => {
    if (selectedCategoryId && selectedCategoryId !== 'all') {
      fetchSubcategories(selectedCategoryId);
    } else {
      setSubcategories([]);
      setSelectedSubcategoryId('all');
    }
  }, [selectedCategoryId]);

  const fetchSubcategories = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/service-subcategories?categoryIds=${categoryId}`);
      const data = await response.json();
      setSubcategories(data.subcategories || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  // Transform and filter reviews
  const { displayedReviews } = useMemo(() => {
    if (!reviewsData?.reviews) {
      return {
        displayedReviews: [],
      };
    }

    const reviews = reviewsData.reviews;

    // Filter by search query, category, and subcategory
    let filtered = reviews;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.professional_name?.toLowerCase().includes(query) ||
        r.company_name?.toLowerCase().includes(query) ||
        r.reviewer_name?.toLowerCase().includes(query) ||
        r.review_text?.toLowerCase().includes(query)
      );
    }

    if (selectedCategoryId && selectedCategoryId !== 'all') {
      filtered = filtered.filter(r =>
        r.category_id?.toString() === selectedCategoryId
      );
    }

    if (selectedSubcategoryId && selectedSubcategoryId !== 'all') {
      filtered = filtered.filter(r =>
        r.subcategory_id?.toString() === selectedSubcategoryId
      );
    }

    return {
      displayedReviews: filtered,
    };
  }, [reviewsData, searchQuery, selectedCategoryId, selectedSubcategoryId]);

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
      setSelectedRowIds(new Set());
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
      setSelectedRowIds(new Set());
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

  const handleBulkApprove = async (reviewIds: string[]) => {
    try {
      for (const reviewId of reviewIds) {
        await reviewApprovalMutation.mutateAsync({
          reviewId,
          action: 'approve',
        });
      }
      toast.success(`${reviewIds.length} beoordelingen goedgekeurd`);
      await refetch();
      await fetchStats();
      setSelectedRowIds(new Set());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Bulk goedkeuring mislukt');
    }
  };

  const handleBulkReject = (reviewIds: string[]) => {
    if (reviewIds.length > 0) {
      setSelectedReviewId(reviewIds[0]);
      setShowRejectionModal(true);
    }
  };

  return (
    <div >
      {/* Stats Cards Section */}
      <div className='mb-6'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div onClick={() => setActiveStatus('all')} className="w-full">
            <StatsCard
              icon={Star}
              iconColor="text-blue-600"
              iconBgColor="bg-blue-50"
              value={allStats.total}
              label="Alle Beoordelingen"
              topText="Totaal"
              borderColor="border-blue-300"
              isActive={activeStatus === 'all'}
            />
          </div>
          <div onClick={() => setActiveStatus('pending')} className="w-full">
            <StatsCard
              icon={Star}
              iconColor="text-amber-600"
              iconBgColor="bg-amber-50"
              value={allStats.pending}
              label="In Afwachting"
              topText="Te Beoordelen"
              borderColor="border-amber-300"
              isActive={activeStatus === 'pending'}
            />
          </div>
          <div onClick={() => setActiveStatus('approved')} className="w-full">
            <StatsCard
              icon={Star}
              iconColor="text-emerald-600"
              iconBgColor="bg-emerald-50"
              value={allStats.approved}
              label="Goedgekeurd"
              topText="Geaccepteerd"
              borderColor="border-emerald-300"
              isActive={activeStatus === 'approved'}
            />
          </div>
          <div onClick={() => setActiveStatus('rejected')} className="w-full">
            <StatsCard
              icon={Star}
              iconColor="text-red-600"
              iconBgColor="bg-red-50"
              value={allStats.rejected}
              label="Afgewezen"
              topText="Geweigerd"
              borderColor="border-red-300"
              isActive={activeStatus === 'rejected'}
            />
          </div>
        </div>
      </div>

      {/* Filters and Search Section */}
      <div className="bg-white rounded-t-lg border border-slate-200 border-b-0 p-6">
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Zoeken op naam, bedrijf, of review..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOffset(0);
              }}
              className="pl-10 bg-slate-50 border-slate-300"
            />
          </div>

          {/* Category Filter */}
          <Select
            value={selectedCategoryId}
            onValueChange={(value) => {
              setSelectedCategoryId(value);
              setOffset(0);
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px] bg-slate-50 border-slate-300" iconWidth={16} iconHeight={16}>
              <SelectValue placeholder="Categorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle categorieën</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name_nl}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Subcategory Filter */}
          <Select
            value={selectedSubcategoryId}
            onValueChange={(value) => {
              setSelectedSubcategoryId(value);
              setOffset(0);
            }}
            disabled={selectedCategoryId === 'all'}
          >
            <SelectTrigger className="w-full sm:w-[180px] bg-slate-50 border-slate-300" iconWidth={16} iconHeight={16}>
              <SelectValue placeholder="Subcategorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle subcategorieën</SelectItem>
              {subcategories.map((subcategory) => (
                <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
                  {subcategory.name_nl}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Reset Filters Button */}
          {(selectedCategoryId !== 'all' || selectedSubcategoryId !== 'all' || searchQuery) && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategoryId('all');
                setSelectedSubcategoryId('all');
                setOffset(0);
              }}
              className="h-9 gap-2 whitespace-nowrap"
            >
              <X className="w-4 h-4" />
              Reset
            </Button>
          )}
        </div>

        {/* Bulk Actions Bar */}
        {selectedRowIds.size > 0 && (
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4">
            <span className="text-sm font-medium text-blue-900">
              {selectedRowIds.size} beoordeling{selectedRowIds.size !== 1 ? 'en' : ''} geselecteerd
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleBulkApprove(Array.from(selectedRowIds))}
                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Goedkeuren
              </Button>
              <Button
                size="sm"
                onClick={() => handleBulkReject(Array.from(selectedRowIds))}
                className="bg-red-600 hover:bg-red-700 text-white gap-2"
              >
                <XCircle className="w-4 h-4" />
                Afwijzen
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-b-xl border border-slate-200 border-t-0 shadow-sm overflow-hidden">
        {reviewsLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-500">Beoordelingen laden...</p>
          </div>
        ) : displayedReviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">Geen beoordelingen gevonden</p>
          </div>
        ) : (
          <div className="p-6 pt-0">
            <ReviewsTable
              reviews={displayedReviews}
              onApprove={handleApprove}
              onReject={handleShowRejectionModal}
              onBulkApprove={handleBulkApprove}
              onBulkReject={handleBulkReject}
              loadingReviewId={loadingReviewId}
              selectedRowIds={selectedRowIds}
              onSelectionChange={setSelectedRowIds}
            />
          </div>
        )}
      </div>

      {/* Pagination */}
      {!reviewsLoading && displayedReviews.length > 0 && (
        <div className="flex items-center justify-between bg-white rounded-lg border border-slate-200 p-4">
          <span className="text-sm text-slate-600">
            Pagina {Math.floor(offset / LIMIT) + 1}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOffset(Math.max(0, offset - LIMIT))}
              disabled={offset === 0}
            >
              Vorige
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOffset(offset + LIMIT)}
              disabled={displayedReviews.length < LIMIT}
            >
              Volgende
            </Button>
          </div>
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
