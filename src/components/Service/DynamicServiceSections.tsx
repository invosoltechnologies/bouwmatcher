'use client';

import ServiceBanner from './ServiceBanner';
import ServiceIntroduction from './ServiceIntroduction';
import ServiceFAQ from './ServiceFAQ';
import ServicePriceComparison from './ServicePriceComparison';
import ServiceTips from './ServiceTips';
import ServiceCostTable from './ServiceCostTable';
import ServiceSEO from './ServiceSEO';
import ServiceProcess from './ServiceProcess';
import ServiceDetails from './ServiceDetails';
import ServiceCTA from './ServiceCTA';
import ServiceTypes from './ServiceTypes';
import ServiceReviews from './ServiceReviews';
import ServiceMarquee from './ServiceMarquee';

interface SectionsConfig {
  order: string[];
  active: string[];
}

interface TrustPill {
  text: string;
  dotColor: string;
}

interface DynamicServiceSectionsProps {
  sectionsConfig: SectionsConfig;
  sectionsData: Record<string, any>;
  locale: string;
  trustPills?: TrustPill[];
}

// Component mapping for dynamic rendering
const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
  banner: ServiceBanner,
  intro: ServiceIntroduction,
  faq: ServiceFAQ,
  comparison_table: ServicePriceComparison,
  tips: ServiceTips,
  overview_table: ServiceCostTable,
  seo_content: ServiceSEO,
  process: ServiceProcess,
  values: ServiceDetails,
  cta: ServiceCTA,
  types: ServiceTypes,
  reviews: ServiceReviews,
  marquees: ServiceMarquee,
};

export default function DynamicServiceSections({
  sectionsConfig,
  sectionsData,
  locale,
  trustPills,
}: DynamicServiceSectionsProps) {
  if (!sectionsConfig || !sectionsConfig.order) {
    return null;
  }

  return (
    <>
      {sectionsConfig.order.map((sectionKey) => {
        // Skip if section not in active array
        if (!sectionsConfig.active.includes(sectionKey)) {
          return null;
        }

        // Skip if no data for this section
        const sectionData = sectionsData[sectionKey];
        if (!sectionData) {
          return null;
        }

        // Special handling for banner component
        if (sectionKey === 'banner') {
          return (
            <div key={sectionKey}>
              <ServiceBanner
                serviceName={sectionData.service_name || ''}
                serviceSlug={sectionData.service_slug || ''}
                heading={locale === 'nl'
                  ? (sectionData.h1_text_nl as string) || (sectionData.h1_text_en as string)
                  : (sectionData.h1_text_en as string) || (sectionData.h1_text_nl as string)
                }
                description={locale === 'nl'
                  ? (sectionData.description_nl as string) || ''
                  : (sectionData.description_en as string) || ''
                }
                backgroundImage={(sectionData.background_image_url as string) || sectionData.background_image || '/images/services/service-bg.png'}
                trustPills={trustPills || []}
              />
            </div>
          );
        }

        // Special handling for intro component
        if (sectionKey === 'intro') {
          return (
            <div key={sectionKey}>
              <ServiceIntroduction
                intro={{
                  heading_nl: (sectionData.heading_nl as string) || '',
                  heading_en: (sectionData.heading_en as string) || '',
                  description_nl: (sectionData.description_nl as string) || '',
                  description_en: (sectionData.description_en as string) || '',
                  backgroundImage: (sectionData.background_image_url as string) || sectionData.background_image || '/images/services/service-bg.png',
                }}
                language={locale === 'nl' ? 'nl' : 'en'}
              />
            </div>
          );
        }

        // Special handling for FAQ component
        if (sectionKey === 'faq') {
          const faqItems = (sectionData.service_page_faq_items as any[])?.map((item) => ({
            question: locale === 'nl' ? item.question_nl : item.question_en,
            answer: locale === 'nl' ? item.answer_nl : item.answer_en,
          })) || [];

          return (
            <div key={sectionKey}>
              <ServiceFAQ
                heading={locale === 'nl' ? sectionData.heading_nl : sectionData.heading_en}
                description={locale === 'nl' ? sectionData.description_nl : sectionData.description_en}
                faqItems={faqItems}
              />
            </div>
          );
        }

        // Special handling for process component
        if (sectionKey === 'process') {
          const steps = (sectionData.service_page_process_steps as any[])?.map((item: any) => {
            const title = locale === 'nl' ? item.heading_nl : item.heading_en;
            return {
              id: item.id,
              title,
              title_nl: item.heading_nl,
              title_en: item.heading_en,
              description:
                locale === 'nl' ? item.description_nl : item.description_en,
              description_nl: item.description_nl,
              description_en: item.description_en,
              icon: item.icon_url || '',
              image: item.image_url || '',
              // Generate alt text from title
              iconAlt: `${title}-icon`,
              imageAlt: `${title}-image`,
            };
          }) || [];

          if (steps.length === 0) {
            return null;
          }

          return (
            <div key={sectionKey}>
              <ServiceProcess
                title={locale === 'nl' ? (sectionData.heading_nl || sectionData.title_nl) : (sectionData.heading_en || sectionData.title_en)}
                subtitle={locale === 'nl' ? (sectionData.description_nl || sectionData.subtitle_nl) : (sectionData.description_en || sectionData.subtitle_en)}
                steps={steps}
              />
            </div>
          );
        }

        // Special handling for comparison_table component
        if (sectionKey === 'comparison_table') {
          const content = locale === 'nl' ? sectionData.content_nl : sectionData.content_en;

          if (!content || content.trim() === '') {
            return null;
          }

          return (
            <div key={sectionKey}>
              <ServicePriceComparison
                heading={locale === 'nl' ? sectionData.heading_nl : sectionData.heading_en}
                description={locale === 'nl' ? sectionData.description_nl : sectionData.description_en}
                content={content}
              />
            </div>
          );
        }

        // Get component for other section types
        const Component = SECTION_COMPONENTS[sectionKey];
        if (!Component) {
          console.warn(`No component found for section: ${sectionKey}`);
          return null;
        }

        // Render with section data
        return (
          <div key={sectionKey}>
            <Component data={sectionData} locale={locale} />
          </div>
        );
      })}
    </>
  );
}
