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
import Values from '@/components/Homepage/Values';
import type { ValueItem } from '@/components/Homepage/Values';

interface SectionsConfig {
  order: string[];
  active: string[];
}

interface TrustPill {
  text: string;
  dotColor: string;
}

interface MarqueeConfig {
  isEnabled: boolean;
  afterSections: string[];
  items: Array<{ text: string }>;
}

interface DynamicServiceSectionsProps {
  sectionsConfig: SectionsConfig;
  sectionsData: Record<string, any>;
  locale: string;
  trustPills?: TrustPill[];
  marqueeConfig?: MarqueeConfig;
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
  marqueeConfig,
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

        // Declare rendered section variable
        let renderedSection: React.ReactNode = null;

        // Special handling for banner component
        if (sectionKey === 'banner') {
          renderedSection = (
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
        else if (sectionKey === 'intro') {
          renderedSection = (
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
        else if (sectionKey === 'faq') {
          const faqItems = (sectionData.service_page_faq_items as any[])?.map((item) => ({
            question: locale === 'nl' ? item.question_nl : item.question_en,
            answer: locale === 'nl' ? item.answer_nl : item.answer_en,
          })) || [];

          renderedSection = (
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
        else if (sectionKey === 'process') {
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

          renderedSection = (
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
        else if (sectionKey === 'comparison_table') {
          const content = locale === 'nl' ? sectionData.content_nl : sectionData.content_en;

          if (!content || content.trim() === '') {
            return null;
          }

          renderedSection = (
            <div key={sectionKey}>
              <ServicePriceComparison
                heading={locale === 'nl' ? sectionData.heading_nl : sectionData.heading_en}
                description={locale === 'nl' ? sectionData.description_nl : sectionData.description_en}
                content={content}
              />
            </div>
          );
        }
        // Special handling for tips component
        else if (sectionKey === 'tips') {
          const content = locale === 'nl' ? sectionData.content_nl : sectionData.content_en;

          if (!content || content.trim() === '') {
            return null;
          }

          renderedSection = (
            <div key={sectionKey}>
              <ServiceTips
                heading={locale === 'nl' ? sectionData.heading_nl : sectionData.heading_en}
                description={locale === 'nl' ? sectionData.description_nl : sectionData.description_en}
                content={content}
              />
            </div>
          );
        }
        // Special handling for overview_table component
        else if (sectionKey === 'overview_table') {
          const content = locale === 'nl' ? sectionData.content_nl : sectionData.content_en;

          if (!content || content.trim() === '') {
            return null;
          }

          renderedSection = (
            <div key={sectionKey}>
              <ServiceCostTable
                heading={locale === 'nl' ? sectionData.heading_nl : sectionData.heading_en}
                description={locale === 'nl' ? sectionData.description_nl : sectionData.description_en}
                content={content}
              />
            </div>
          );
        }
        // Special handling for seo_content component
        else if (sectionKey === 'seo_content') {
          const content = locale === 'nl' ? sectionData.content_nl : sectionData.content_en;

          if (!content || content.trim() === '') {
            return null;
          }

          renderedSection = (
            <div key={sectionKey}>
              <ServiceSEO
                heading={locale === 'nl' ? sectionData.heading_nl : sectionData.heading_en}
                description={locale === 'nl' ? sectionData.description_nl : sectionData.description_en}
                content={content}
              />
            </div>
          );
        }
        // Special handling for values component
        else if (sectionKey === 'values') {
          const items = sectionData.service_page_value_items || sectionData.items || [];

          if (items.length === 0) {
            return null;
          }

          // Transform CMS data to ValueItem format
          const transformedValues: ValueItem[] = items.map((item: Record<string, unknown>, index: number) => {
            const positionMap: Record<string, 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'> = {
              'top_left': 'top-left',
              'top_right': 'top-right',
              'bottom_left': 'bottom-left',
              'bottom_right': 'bottom-right',
            };

            return {
              id: index + 1, // Simple unique ID: 1, 2, 3, 4
              icon: String(item.icon_url || ''),
              title: locale === 'nl' ? String(item.heading_nl || '') : String(item.heading_en || ''),
              description: locale === 'nl' ? String(item.description_nl || '') : String(item.description_en || ''),
              position: positionMap[String(item.position)] || 'top-left',
            };
          });

          renderedSection = (
            <div key={sectionKey}>
              <Values
                heading={locale === 'nl' ? sectionData.heading_nl : sectionData.heading_en}
                description={locale === 'nl' ? sectionData.description_nl : sectionData.description_en}
                centerText={locale === 'nl' ? sectionData.center_text_nl : sectionData.center_text_en}
                values={transformedValues}
                showCTA={false}
              />
            </div>
          );
        }
        // Special handling for cta component
        else if (sectionKey === 'cta') {
          const handleCtaAction = () => {
            const link = sectionData.cta_link;
            if (link) {
              if (link.startsWith('http://') || link.startsWith('https://')) {
                window.location.href = link;
              } else if (link.startsWith('/')) {
                window.location.href = link;
              } else if (link.startsWith('mailto:')) {
                window.location.href = link;
              } else {
                window.location.href = `/${link}`;
              }
            }
          };

          renderedSection = (
            <div key={sectionKey}>
              <ServiceCTA
                heading={locale === 'nl' ? sectionData.heading_nl : sectionData.heading_en}
                description={locale === 'nl' ? (sectionData.description_nl || '') : (sectionData.description_en || '')}
                ctaText={locale === 'nl' ? sectionData.button_text_nl : sectionData.button_text_en}
                ctaAction={handleCtaAction}
              />
            </div>
          );
        }
        // Special handling for reviews component
        else

        if (sectionKey === 'reviews') {
          // Get reviews items data (fallback or CMS)
          const reviewsItems = sectionData.reviewsItems || [];

          // Return null if no reviews data available
          if (!reviewsItems || reviewsItems.length === 0) {
            return null;
          }

          renderedSection = (
            <div key={sectionKey}>
              <ServiceReviews
                eyebrowText={locale === 'nl' ? sectionData.eye_text_nl : sectionData.eye_text_en}
                heading={locale === 'nl' ? sectionData.heading_nl : sectionData.heading_en}
                description={locale === 'nl' ? (sectionData.description_nl || '') : (sectionData.description_en || '')}
                reviews={reviewsItems}
              />
            </div>
          );
        } else if (sectionKey === 'types') {
          // Get types items data (subcategories)
          const typesItems = sectionData.typesItems || [];

          // Return null if no types data available
          if (!typesItems || typesItems.length === 0) {
            return null;
          }

          // Transform subcategory data to ServiceTypes format
          const transformedTypes = typesItems.map((item: Record<string, unknown>) => ({
            title: locale === 'nl' ? String(item.name_nl || '') : String(item.name_en || ''),
            description: locale === 'nl' ? String(item.description_nl || '') : String(item.description_en || ''),
          }));

          renderedSection = (
            <div key={sectionKey}>
              <ServiceTypes
                heading={locale === 'nl' ? sectionData.heading_nl : sectionData.heading_en}
                description={locale === 'nl' ? (sectionData.description_nl || '') : (sectionData.description_en || '')}
                serviceTypes={transformedTypes}
              />
            </div>
          );
        } else if (sectionKey === 'marquees') {
          // Special handling for marquees - skip rendering as standalone section
          // Marquees are rendered after other sections based on marqueeConfig.afterSections
          return null;
        } else {
          // Get component for other section types
          const Component = SECTION_COMPONENTS[sectionKey];
          if (!Component) {
            console.warn(`No component found for section: ${sectionKey}`);
            return null;
          }

          // Render with section data
          renderedSection = (
            <div key={sectionKey}>
              <Component data={sectionData} locale={locale} />
            </div>
          );
        }

        // Check if marquee should be rendered after this section
        const shouldRenderMarquee =
          marqueeConfig &&
          marqueeConfig.isEnabled &&
          marqueeConfig.afterSections &&
          marqueeConfig.afterSections.includes(sectionKey) &&
          marqueeConfig.items &&
          marqueeConfig.items.length > 0;

        if (shouldRenderMarquee) {
          return (
            <div key={`${sectionKey}-with-marquee`}>
              {renderedSection}
              <ServiceMarquee items={marqueeConfig.items} />
            </div>
          );
        }

        return renderedSection;
      })}
    </>
  );
}
