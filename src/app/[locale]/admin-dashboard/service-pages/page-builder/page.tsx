'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import BannerSection from '@/components/admin-dashboard/service-page-builder/BannerSection';
import IntroSection from '@/components/admin-dashboard/service-page-builder/IntroSection';
import FaqSection from '@/components/admin-dashboard/service-page-builder/FaqSection';
import { useServicePageBanner } from '@/lib/hooks/admin/service-page-banners';
import { useServicePageIntro } from '@/lib/hooks/admin/service-page-intro';
import { useServicePageFaq } from '@/lib/hooks/admin/service-page-faqs';
import { useServicePageById } from '@/lib/hooks/admin/service-pages';

export default function ServicePageBuilderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('common.adminDashboard');

  const pageId = searchParams.get('page_id');

  const { data: servicePage, isLoading: isLoadingPage } =
    useServicePageById(pageId || '');
  const { data: banner } = useServicePageBanner(pageId);
  const { data: intro } = useServicePageIntro(pageId);
  const { data: faq } = useServicePageFaq(pageId);

  if (!pageId) {
    return (
      <div className='p-6 text-center'>
        <p className='text-slate-600'>
          {locale === 'nl'
            ? 'Geen pagina ID opgegeven'
            : 'No page ID provided'}
        </p>
      </div>
    );
  }

  if (isLoadingPage) {
    return (
      <div className='p-6 text-center'>
        <p className='text-slate-600'>
          {locale === 'nl' ? 'Laden...' : 'Loading...'}
        </p>
      </div>
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

        {/* Banner Section - Compulsory */}
        <div className='bg-white rounded-lg'>
          <BannerSection
            servicePageId={pageId}
            initialBanner={banner}
          />
        </div>

        {/* Intro Section */}
        <div className='bg-white rounded-lg'>
          <IntroSection
            servicePageId={pageId}
            initialIntro={intro}
          />
        </div>

        {/* FAQ Section */}
        <div className='bg-white rounded-lg'>
          <FaqSection
            servicePageId={pageId}
            initialFaq={faq}
          />
        </div>

        {/* Placeholder for other sections */}
        <div className='p-6 border-2 border-dashed border-slate-300 rounded-lg text-center text-slate-500'>
          <p>
            {locale === 'nl'
              ? 'Meer secties volgen spoedig...'
              : 'More sections coming soon...'}
          </p>
        </div>
      </div>
    </div>
  );
}
