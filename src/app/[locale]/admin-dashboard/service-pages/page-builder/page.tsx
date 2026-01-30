'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { ArrowLeft } from 'lucide-react';

// Sections
import BannerSection from '@/components/admin-dashboard/service-page-builder/BannerSection';
import IntroSection from '@/components/admin-dashboard/service-page-builder/IntroSection';
import FaqSection from '@/components/admin-dashboard/service-page-builder/FaqSection';
import ComparisonTableSection from '@/components/admin-dashboard/service-page-builder/ComparisonTableSection';
import TipsSection from '@/components/admin-dashboard/service-page-builder/TipsSection';
import OverviewTableSection from '@/components/admin-dashboard/service-page-builder/OverviewTableSection';
import SeoContentSection from '@/components/admin-dashboard/service-page-builder/SeoContentSection';
import ProcessSection from '@/components/admin-dashboard/service-page-builder/ProcessSection';
import ValuesSection from '@/components/admin-dashboard/service-page-builder/ValuesSection';
import CTASection from '@/components/admin-dashboard/service-page-builder/CTASection';
import TypesSection from '@/components/admin-dashboard/service-page-builder/TypesSection';
import ReviewsSection from '@/components/admin-dashboard/service-page-builder/ReviewsSection';
import MarqueesSection from '@/components/admin-dashboard/service-page-builder/MarqueesSection';

// UI Components
import SectionCard from '@/components/admin-dashboard/service-page-builder/SectionCard';
import AddSectionDropdown from '@/components/admin-dashboard/service-page-builder/AddSectionDropdown';
import PublishModal from '@/components/admin-dashboard/service-page-builder/PublishModal';
import ReorderModal from '@/components/admin-dashboard/service-page-builder/ReorderModal';

// Hooks
import { useServicePageBanner } from '@/lib/hooks/admin/service-page-banners';
import { useServicePageIntro } from '@/lib/hooks/admin/service-page-intro';
import { useServicePageFaq } from '@/lib/hooks/admin/service-page-faqs';
import { useServicePageComparisonTable } from '@/lib/hooks/admin/service-page-comparison-tables';
import { useServicePageTips } from '@/lib/hooks/admin/service-page-tips';
import { useServicePageOverviewTable } from '@/lib/hooks/admin/service-page-overview-tables';
import { useServicePageSeoContent } from '@/lib/hooks/admin/service-page-seo-content';
import { useServicePageProcess } from '@/lib/hooks/admin/service-page-process';
import { useServicePageValues } from '@/lib/hooks/admin/service-page-values';
import { useServicePageCta } from '@/lib/hooks/admin/service-page-cta';
import { useServicePageTypes } from '@/lib/hooks/admin/service-page-types';
import { useServicePageReviews } from '@/lib/hooks/admin/service-page-reviews';
import { useServicePageMarquees } from '@/lib/hooks/admin/service-page-marquees';
import { useServicePageById } from '@/lib/hooks/admin/service-pages';
import {
  useServicePageSections,
  useAddSection,
  useDeleteSection,
  useReorderSections,
  usePublishPage,
} from '@/lib/hooks/admin/service-page-sections';

const ALL_SECTIONS = [
  'intro',
  'faq',
  'comparison_table',
  'tips',
  'overview_table',
  'seo_content',
  'process',
  'values',
  'cta',
  'types',
  'reviews',
  'marquees',
];

const SECTION_LABELS: Record<string, { nl: string; en: string }> = {
  intro: { nl: 'Intro Sectie', en: 'Intro Section' },
  faq: { nl: 'FAQ Sectie', en: 'FAQ Section' },
  comparison_table: { nl: 'Vergelijkingtabel', en: 'Comparison Table' },
  tips: { nl: 'Tips Sectie', en: 'Tips Section' },
  overview_table: { nl: 'Overzichtstabel', en: 'Overview Table' },
  seo_content: { nl: 'SEO Inhoud', en: 'SEO Content' },
  process: { nl: 'Proces Sectie', en: 'Process Section' },
  values: { nl: 'Waarden Sectie', en: 'Values Section' },
  cta: { nl: 'CTA Sectie', en: 'CTA Section' },
  types: { nl: 'Types Sectie', en: 'Types Section' },
  reviews: { nl: 'Reviews Sectie', en: 'Reviews Section' },
  marquees: { nl: 'Marquee Sectie', en: 'Marquee Section' },
};

// Map of section keys to component renderers
const SECTION_COMPONENTS: Record<
  string,
  (props: { servicePageId: string; initialData?: any }) => React.ReactElement
> = {
  intro: (props) => <IntroSection {...props} initialIntro={props.initialData} />,
  faq: (props) => <FaqSection {...props} initialFaq={props.initialData} />,
  comparison_table: (props) => <ComparisonTableSection {...props} initialData={props.initialData} />,
  tips: (props) => <TipsSection {...props} initialData={props.initialData} />,
  overview_table: (props) => <OverviewTableSection {...props} initialData={props.initialData} />,
  seo_content: (props) => <SeoContentSection {...props} initialData={props.initialData} />,
  process: (props) => <ProcessSection {...props} initialData={props.initialData} />,
  values: (props) => <ValuesSection {...props} initialData={props.initialData} />,
  cta: (props) => <CTASection {...props} initialData={props.initialData} />,
  types: (props) => <TypesSection {...props} initialData={props.initialData} />,
  reviews: (props) => <ReviewsSection {...props} initialData={props.initialData} />,
  marquees: (props) => <MarqueesSection {...props} initialData={props.initialData} />,
};

function ServicePageBuilderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();

  const pageId = searchParams.get('page_id');

  // Fetch page and all section data
  const { data: servicePage, isLoading: isLoadingPage } = useServicePageById(pageId || '');
  const { data: sectionsConfig, isLoading: isLoadingSections } = useServicePageSections(pageId);

  // Fetch all section data
  const { data: banner, isLoading: isLoadingBanner } = useServicePageBanner(pageId);
  const { data: intro, isLoading: isLoadingIntro } = useServicePageIntro(pageId);
  const { data: faq, isLoading: isLoadingFaq } = useServicePageFaq(pageId);
  const { data: comparisonTable, isLoading: isLoadingComparisonTable } = useServicePageComparisonTable(pageId);
  const { data: tips, isLoading: isLoadingTips } = useServicePageTips(pageId);
  const { data: overviewTable, isLoading: isLoadingOverviewTable } = useServicePageOverviewTable(pageId);
  const { data: seoContent, isLoading: isLoadingSeoContent } = useServicePageSeoContent(pageId);
  const { data: process, isLoading: isLoadingProcess } = useServicePageProcess(pageId);
  const { data: values, isLoading: isLoadingValues } = useServicePageValues(pageId);
  const { data: cta, isLoading: isLoadingCta } = useServicePageCta(pageId);
  const { data: types, isLoading: isLoadingTypes } = useServicePageTypes(pageId);
  const { data: reviews, isLoading: isLoadingReviews } = useServicePageReviews(pageId);
  const { data: marquees, isLoading: isLoadingMarquees } = useServicePageMarquees(pageId);

  // Check if any section data is still loading
  const isLoadingAnySectionData = isLoadingBanner || isLoadingIntro || isLoadingFaq ||
    isLoadingComparisonTable || isLoadingTips || isLoadingOverviewTable ||
    isLoadingSeoContent || isLoadingProcess || isLoadingValues || isLoadingCta ||
    isLoadingTypes || isLoadingReviews || isLoadingMarquees;

  // Mutations
  const addSectionMutation = useAddSection();
  const deleteSectionMutation = useDeleteSection();
  const reorderSectionsMutation = useReorderSections();
  const publishPageMutation = usePublishPage();

  // Modal states
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showReorderModal, setShowReorderModal] = useState(false);

  // Get all section data as a map
  const allSectionData = useMemo(
    () => ({
      intro,
      faq,
      comparison_table: comparisonTable,
      tips,
      overview_table: overviewTable,
      seo_content: seoContent,
      process,
      values,
      cta,
      types,
      reviews,
      marquees,
    }),
    [
      intro,
      faq,
      comparisonTable,
      tips,
      overviewTable,
      seoContent,
      process,
      values,
      cta,
      types,
      reviews,
      marquees,
    ]
  );

  // Calculate available sections (not yet added)
  const activeSections = sectionsConfig?.active || ['banner'];
  const availableSections = ALL_SECTIONS.filter((s) => !activeSections.includes(s));
  const sectionOrder = sectionsConfig?.order || ['banner'];

  const handleAddSection = async (sectionKey: string) => {
    if (!pageId) return;
    await addSectionMutation.mutateAsync({
      servicePageId: pageId,
      sectionKey,
    });
  };

  const handleDeleteSection = async (sectionKey: string) => {
    if (!pageId) return;
    await deleteSectionMutation.mutateAsync({
      servicePageId: pageId,
      sectionKey,
    });
  };

  const handleReorderSections = async (order: string[]) => {
    if (!pageId) return;
    await reorderSectionsMutation.mutateAsync({
      servicePageId: pageId,
      order,
    });
  };

  const handlePublishPage = async (status: 'draft' | 'pending' | 'active') => {
    if (!pageId) return;
    await publishPageMutation.mutateAsync({
      servicePageId: pageId,
      status,
    });
  };

  if (!pageId) {
    return (
      <div className='p-6 text-center'>
        <p className='text-slate-600'>
          {locale === 'nl' ? 'Geen pagina ID opgegeven' : 'No page ID provided'}
        </p>
      </div>
    );
  }

  if (isLoadingPage) {
    return (
      <Loader
        size='md'
        text={locale === 'nl' ? 'Laden...' : 'Loading...'}
        className='min-h-[400px]'
      />
    );
  }

  if (!servicePage) {
    return (
      <div className='p-6 text-center'>
        <p className='text-slate-600'>
          {locale === 'nl' ? 'Pagina niet gevonden' : 'Page not found'}
        </p>
      </div>
    );
  }

  // Show loader while section data is being fetched
  const isInitialLoad = isLoadingSections || isLoadingAnySectionData;

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <Button
            variant='outline'
            onClick={() => router.back()}
            className='gap-2 mb-4'
          >
            <ArrowLeft className='w-4 h-4' />
            {locale === 'nl' ? 'Terug' : 'Back'}
          </Button>
          <p className='text-slate-600 mt-1'>
            {locale === 'nl'
              ? `Category: ${servicePage.category_name_nl || servicePage.category_name}`
              : `Category: ${servicePage.category_name_en || servicePage.category_name}`}
          </p>
        </div>
        <div className='text-right'>
          <p className='text-sm text-slate-600'>
            {locale === 'nl' ? 'Status:' : 'Status:'}{' '}
            <span className='font-semibold text-slate-900 capitalize'>
              {servicePage.status}
            </span>
          </p>
        </div>
      </div>

      {/* Sections Container */}
      <div className='custom-container space-y-6'>
        <h2 className='text-lg font-semibold text-slate-900'>
          {locale === 'nl' ? 'Secties' : 'Sections'}
        </h2>

        {/* Show loader while initial data is loading */}
        {isInitialLoad ? (
          <Loader
            size='md'
            text={locale === 'nl' ? 'Secties laden...' : 'Loading sections...'}
            className='min-h-[300px]'
          />
        ) : (
          <>
            {/* Banner Section - Always first */}
            <div className='bg-white rounded-lg'>
              <BannerSection servicePageId={pageId} initialBanner={banner} />
            </div>

            {/* Dynamic Sections */}
            {sectionOrder.map((sectionKey) => {
              if (sectionKey === 'banner') return null;

              const Component = SECTION_COMPONENTS[sectionKey];
              const sectionData = allSectionData[sectionKey as keyof typeof allSectionData];

              if (!Component) return null;

              return (
                <div key={sectionKey} className='bg-white rounded-lg'>
                  <SectionCard
                    sectionName={SECTION_LABELS[sectionKey as keyof typeof SECTION_LABELS]?.[locale as 'nl' | 'en'] || sectionKey}
                    onDelete={() => handleDeleteSection(sectionKey)}
                    isDeleting={
                      deleteSectionMutation.isPending &&
                      deleteSectionMutation.variables?.sectionKey === sectionKey
                    }
                  >
                    {Component({
                      servicePageId: pageId,
                      initialData: sectionData,
                    })}
                  </SectionCard>
                </div>
              );
            })}
          </>
        )}

        {!isInitialLoad && (
          <>
            {/* Add New Section */}
            <div className='space-y-4 pt-6'>
              <h3 className='text-lg font-semibold text-slate-900'>
                {locale === 'nl' ? 'Sectie Beheer' : 'Section Management'}
              </h3>

              <AddSectionDropdown
                availableSections={availableSections}
                onAdd={handleAddSection}
                isAdding={addSectionMutation.isPending}
              />
            </div>

            {/* Action Buttons */}
            <div className='flex gap-4 pt-6 border-t border-slate-200'>
              <Button
                onClick={() => setShowReorderModal(true)}
                variant='outline'
                disabled={sectionOrder.length <= 1}
              >
                {locale === 'nl' ? 'Wijzig Volgorde' : 'Change Sections Order'}
              </Button>
              <Button
                onClick={() => setShowPublishModal(true)}
                className='ml-auto'
              >
                {locale === 'nl' ? 'Pagina Opslaan' : 'Save Page'}
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      <PublishModal
        open={showPublishModal}
        onOpenChange={setShowPublishModal}
        onPublish={handlePublishPage}
        isPublishing={publishPageMutation.isPending}
      />

      <ReorderModal
        open={showReorderModal}
        onOpenChange={setShowReorderModal}
        sections={sectionOrder}
        onReorder={handleReorderSections}
        isReordering={reorderSectionsMutation.isPending}
      />
    </div>
  );
}

export default function ServicePageBuilderPage() {
  return (
    <Suspense fallback={<div className='p-6 text-center'>Loading...</div>}>
      <ServicePageBuilderContent />
    </Suspense>
  );
}
