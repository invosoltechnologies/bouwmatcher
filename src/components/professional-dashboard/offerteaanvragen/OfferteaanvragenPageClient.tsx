'use client';

import { useState, useMemo, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { nl, enUS } from 'date-fns/locale';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import VerificationBanner from './VerificationBanner';
import FilterSection from './FilterSection';
import FilterTabs from './FilterTabs';
import QuotationRequestCard from './QuotationRequestCard';
import QuotationSidebar from './QuotationSidebar';
import LeadDetailsView from './LeadDetailsView';
import { useLeads } from '@/lib/hooks/professional/leads';
import { useAccount } from '@/lib/hooks/professional/account';
import { useWorkArea } from '@/lib/hooks/professional/account';
import { Lead } from '@/types/models/lead.model';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function OfferteaanvragenPageClient() {
  const t = useTranslations('common.proDashboard.offerteaanvragen');
  const locale = useLocale();
  const dateLocale = locale === 'en' ? enUS : nl;
  const searchParams = useSearchParams();

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [projectType, setProjectType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'vergrendeld' | 'ontgrendeld' | 'laatste10'>('vergrendeld');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  // Handle Stripe redirect success/cancel
  useEffect(() => {
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    const sessionId = searchParams.get('session_id');

    if (success === 'true' && sessionId) {
      toast.success(
        locale === 'en'
          ? 'Payment successful! You can now access the lead details. Check your email for the receipt.'
          : 'Betaling geslaagd! Je hebt nu toegang tot de lead. Check je email voor de factuur.',
        { duration: 6000 }
      );

      // Clear URL parameters
      if (window.history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.delete('success');
        url.searchParams.delete('session_id');
        window.history.replaceState({}, '', url.toString());
      }
    } else if (canceled === 'true') {
      toast.error(
        locale === 'en'
          ? 'Payment was canceled. The lead remains locked.'
          : 'Betaling geannuleerd. De lead blijft vergrendeld.',
        { duration: 5000 }
      );

      // Clear URL parameters
      if (window.history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.delete('canceled');
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, [searchParams, locale]);

  // Fetch leads with real-time updates
  const { data, isLoading, error } = useLeads();

  // Fetch account data to check verification status
  const { data: accountData } = useAccount();

  // Fetch work area data
  const { data: workAreaData } = useWorkArea();

  const handleSearch = () => {
    // Search functionality is handled by filtering below
    console.log('Search:', { dateRange, projectType, searchQuery });
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  // Filter and transform leads based on search criteria
  const filteredLeads = useMemo(() => {
    if (!data) return [];

    // Combine locked and unlocked leads for filtering
    const allLeads = [...(data.lockedLeads || []), ...(data.unlockedLeads || [])];
    let filtered = allLeads;

    // Filter by date range
    if (dateRange?.from) {
      filtered = filtered.filter(lead => {
        const leadDate = new Date(lead.created_at);

        // Set start of day for 'from' date
        const startDate = new Date(dateRange.from!);
        startDate.setHours(0, 0, 0, 0);

        if (dateRange.to) {
          // Set end of day for 'to' date
          const endDate = new Date(dateRange.to);
          endDate.setHours(23, 59, 59, 999);

          return leadDate >= startDate && leadDate <= endDate;
        }

        return leadDate >= startDate;
      });
    }

    // Filter by project type (subcategory ID)
    if (projectType !== 'all' && projectType) {
      const subcategoryId = parseInt(projectType, 10);
      if (!isNaN(subcategoryId)) {
        filtered = filtered.filter(lead => lead.subcategory_id === subcategoryId);
      }
    }

    // Filter by search query (name)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(lead => {
        const fullName = `${lead.first_name || ''} ${lead.last_name || ''}`.toLowerCase();
        return fullName.includes(query);
      });
    }

    return filtered;
  }, [data, dateRange, projectType, searchQuery]);

  // Transform leads to quotation request format
  const quotationRequests = useMemo(() => {
    return filteredLeads.map((lead: Lead) => {
      const categoryName = locale === 'en'
        ? (lead.service_categories?.name_en || lead.service_categories?.name_nl || 'Project')
        : (lead.service_categories?.name_nl || 'Project');
      const city = lead.city || (locale === 'en' ? 'Unknown location' : 'Onbekende locatie');
      const title = `${categoryName} in ${city}`;
      const author = `${lead.first_name?.[0] || 'X'}. ${lead.last_name || (locale === 'en' ? 'Unknown' : 'Onbekend')}`;
      const date = format(new Date(lead.created_at), 'd MMM', { locale: dateLocale });

      return {
        id: lead.id,
        title,
        author,
        date,
        isLocked: lead.is_locked, // Use the actual locked status from API
        hasPhotos: lead.has_photos,
        photoCount: lead.has_photos ? 3 : 0, // We don't have exact count, using placeholder
        isAvailable: true, // Lead is available if it's in the list
        assignmentStatus: lead.assignment_status || 'available',
        projectStatus: lead.status,
        isVisibilityActive: lead.isVisibilityActive !== false, // Default to true for locked leads
      };
    });
  }, [filteredLeads, locale, dateLocale]);

  // Apply tab filtering
  const displayedRequests = useMemo(() => {
    switch (activeTab) {
      case 'vergrendeld':
        // Show all locked leads
        return quotationRequests.filter(req => req.isLocked);
      case 'ontgrendeld':
        // Show unlocked leads (none for now as all are locked)
        return quotationRequests.filter(req => !req.isLocked);
      case 'laatste10':
        // Show last 10 leads
        return quotationRequests.slice(0, 10);
      default:
        return quotationRequests;
    }
  }, [quotationRequests, activeTab]);

  // Prepare sidebar data
  const sidebarData = useMemo(() => {
    const contactInfo = accountData?.accountData?.contactInfo;
    const companyInfo = accountData?.accountData?.companyInfo;
    const accountStatus = accountData?.accountData?.accountStatus;
    const workArea = workAreaData?.data;

    const accountName = contactInfo?.contactPerson || 'Professional';
    const location = companyInfo?.companyName || companyInfo?.city || 'Location not set';

    // Format account status
    let statusText = 'Niet geverifieerd';
    let statusKey = 'unverified';
    if (accountStatus) {
      if (accountStatus.status === 'suspended') {
        statusText = 'Account geschorst';
        statusKey = 'suspended';
      } else if (accountStatus.statusCode === 1) {
        statusText = 'Geverifieerd';
        statusKey = 'verified';
      } else if (accountStatus.statusKey === 'inReview') {
        statusText = 'In beoordeling';
        statusKey = 'inReview';
      } else if (accountStatus.statusCode === 2) {
        statusText = 'Verificatie in behandeling';
        statusKey = 'pending';
      }
    }

    // Format work area
    let workAreaText = 'Werkgebied niet ingesteld';
    if (workArea) {
      const radius = workArea.service_radius_km;
      const address = workArea.work_address;
      const postalCode = workArea.work_postal_code;
      const city = workArea.work_city;

      if (address || city) {
        workAreaText = `Radius ${radius} km vanuit ${address || ''} ${postalCode || ''} ${city || ''}`.trim();
      }
    }

    return {
      accountName,
      location,
      accountStatus: statusText,
      accountStatusKey: statusKey,
      workArea: workAreaText,
    };
  }, [accountData, workAreaData]);

  // If a lead is selected, show detail view
  if (selectedLeadId) {
    return (
      <div className="w-full">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setSelectedLeadId(null)}
          className="mb-4 hover:bg-transparent hover:text-primary p-0"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          {t('backToOverview')}
        </Button>

        {/* Lead Details - Full Width, No Sidebar */}
        <LeadDetailsView
          leadId={selectedLeadId}
          onClose={() => setSelectedLeadId(null)}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Verification Banner - Show if not verified or suspended */}
          {(accountData?.accountData?.accountStatus?.statusCode !== 1 ||
            accountData?.accountData?.accountStatus?.status === 'suspended') && (
            <VerificationBanner />
          )}

          {/* Filter Section */}
          <FilterSection
            projectType={projectType}
            searchQuery={searchQuery}
            onProjectTypeChange={setProjectType}
            onSearchQueryChange={setSearchQuery}
            onSearch={handleSearch}
            onDateRangeChange={handleDateRangeChange}
          />

          {/* Parent Card for Filter Tabs and Quotation Cards */}
          <div
            className="bg-white rounded-xl p-3 sm:p-4 lg:p-5"
            style={{ boxShadow: '0px 5.5px 16.5px 0px #023AA214' }}
          >
            {/* Filter Tabs */}
            <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">{t('loading')}</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-destructive mb-2">{t('states.loadingError')}</p>
                  <p className="text-sm text-muted-foreground">{t('states.loadingErrorRetry')}</p>
                </div>
              </div>
            )}

            {/* No Results */}
            {!isLoading && !error && displayedRequests.length === 0 && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">{t('states.noLeads')}</p>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery || dateRange || projectType !== 'all'
                      ? t('states.noLeadsFiltered')
                      : t('states.noLeadsDefault')}
                  </p>
                </div>
              </div>
            )}

            {/* Quotation Request Cards */}
            {!isLoading && !error && displayedRequests.length > 0 && (
              <div className="space-y-3">
                {displayedRequests.map((request) => (
                  <div
                    key={request.id}
                    onClick={() => setSelectedLeadId(request.id)}
                    className="cursor-pointer"
                  >
                    <QuotationRequestCard
                      title={request.title}
                      author={request.author}
                      date={request.date}
                      isLocked={request.isLocked}
                      hasPhotos={request.hasPhotos}
                      photoCount={request.photoCount}
                      isAvailable={request.isAvailable}
                      assignmentStatus={request.assignmentStatus}
                      projectStatus={request.projectStatus}
                      isVisibilityActive={request.isVisibilityActive}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0">
          <QuotationSidebar
            accountName={sidebarData.accountName}
            location={sidebarData.location}
            accountStatus={sidebarData.accountStatus}
            accountStatusKey={sidebarData.accountStatusKey}
            workArea={sidebarData.workArea}
          />
        </div>
      </div>
    </div>
  );
}
