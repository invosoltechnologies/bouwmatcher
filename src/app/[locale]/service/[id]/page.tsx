import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ServiceBanner from '@/components/Service/ServiceBanner';
import DefaultLayout from '@/components/DefaultLayout';
import { createClient } from '@/lib/supabase/server';
import ServiceIntroduction from '@/components/Service/ServiceIntroduction';
import ServiceFAQ from '@/components/Service/ServiceFAQ';
import ServicePriceComparison from '@/components/Service/ServicePriceComparison';
import ServiceTips from '@/components/Service/ServiceTips';
import ServiceCostTable from '@/components/Service/ServiceCostTable';
import ServiceTypes from '@/components/Service/ServiceTypes';
import ServiceReviews from '@/components/Service/ServiceReviews';
import Values from '@/components/Homepage/Values';
import type { ValueItem } from '@/components/Homepage/Values';
import ServiceSEO from '@/components/Service/ServiceSEO';
import ServiceProcess from '@/components/Service/ServiceProcess';
import ServiceCTA from '@/components/Service/ServiceCTA';
import ServiceMarquee from '@/components/Service/ServiceMarquee';
import DynamicServiceSections from '@/components/Service/DynamicServiceSections';
import type { ProcessStep } from '@/components/ui/process-steps';

// ISR configuration - revalidate every hour
export const revalidate = 3600;

interface ServicePageProps {
  params: Promise<{ id: string; locale: string }>;
}

interface CmsDataResponse {
  hasCmsData: boolean;
  banner: Record<string, unknown> | null;
  sections: Record<string, unknown>;
  sectionsConfig: { order: string[]; active: string[] } | null;
  category?: {
    id: string;
    name_nl: string;
    name_en: string;
  };
}

// Architect FAQ data - customize per service
const architectFaqItems = [
  {
    question: 'Wat kost een architect gemiddeld?',
    answer:
      'De kosten voor een architect variëren afhankelijk van projectomvang, complexiteit en de ervaring van de architect. Gemiddeld bedragen architectenhonoraria tussen de 8-15% van de totale bouwkosten. Voor kleinere projecten kan dit hoger uitvallen. Het is altijd verstandig meerdere offertes op te vragen.',
  },
  {
    question: 'Is een architect verlicht voor een vergunning?',
    answer:
      'Een architect is niet wettelijk verplicht voor alle aanpassingen, maar veel gemeenten vereisen architecten tekeningen voor grotere verbouwingen of nieuwbouw. Voor kleine werkzaamheden kunnen bouwplannen van een erkend tekenaar volstaan. Controleer altijd de lokale bouwvoorschriften.',
  },
  {
    question: 'Kan een architect helpen bij kleine verbouwingen?',
    answer:
      'Ja, absolute! Architecten kunnen helpen bij alles van complete huisrenovaties tot het herinrichten van één ruimte. Zij brengen professioneel inzicht, creatieve oplossingen en garanderen technische correctheid. Dit bespaart vaak fouten en kosten op lange termijn.',
  },
  {
    question: 'Wat is het verschil tussen een architect en een tekenaar?',
    answer:
      'Een architect is een erkende professional met uitgebreide opleiding en registratie. Zij kunnen bouwplannen tekenen, vergunningen aanvragen en toezicht houden tijdens de bouw. Een tekenaar kan technische tekeningen maken, maar heeft niet altijd de zelfde expertise of bevoegdheden.',
  },
  {
    question: 'Bieden architecten bouwbegeleiding aan?',
    answer:
      'Ja, veel architecten bieden bouwbegeleiding aan. Zij controleren of het werk volgens de plannen wordt uitgevoerd, controleren kwaliteit en helpen bij onverwachte problemen. Dit geeft zekerheid dat je project vakkundig wordt afgebouwd.',
  },
  {
    question: 'Hoe lang duurt het ontwerpen van een huis?',
    answer:
      'De ontwerptijd hangt af van projectomvang en complexiteit. Een eenvoudig ontwerp kan 4-8 weken duren, terwijl grote projecten 3-6 maanden kunnen vergen. Toevoegingen voor vergunningen en aanpassingen kunnen extra tijd in beslag nemen.',
  },
];

// Price Comparison Data - customize per service
const architectPriceItems = [
  { label: 'Nieuwbouwontwerp', priceRange: '€ 4.000 - € 16.000' },
  { label: 'Verbouwing / renovatie ontwerp', priceRange: '€ 1.500 - € 8.000' },
  { label: 'Aanbouw / uitbreiding ontwerp', priceRange: '€ 1.000 - € 4.500' },
  { label: 'Interieurontwerp', priceRange: '€ 500 - € 3.300' },
  { label: 'Vergunningstrajecten / uitwerking', priceRange: '€ 800 - € 2.200' },
];

// Tips Data - customize per service
const architectTips = [
  'Bekijk eerders projecten en uiteenzetingen van de architect.',
  'Kas iemand met ervaring in jouw specifieke bouwtype.',
  'Vraag naar werkwijze, planning en kostenbewaking.',
  'Controleer of de architect ervaring heeft met vergunningtrajecten.',
  'Vergelijk meerdere offertes en kies op basis van kwaliteit en benadering.',
];

// Cost Table Data - customize per service
const architectCostTableColumns = ['Schetsontwerp', 'Definitief ontwerp', 'Bouwbegeleiding', 'Vergunningen'];
const architectCostTableRows = [
  {
    'Schetsontwerp': 'Ontwerpconcept',
    'Definitief ontwerp': '€ 1.000 - € 8.000',
    'Bouwbegeleiding': 'Toezicht bouw',
    'Vergunningen': '€ 50 - € 100 per uur',
  },
  {
    'Schetsontwerp': '3-5 weken',
    'Definitief ontwerp': '2-4 weken',
    'Bouwbegeleiding': 'Onderhandeling gemeente',
    'Vergunningen': '2-8 weken',
  },
  {
    'Schetsontwerp': 'Renderstekeningen',
    'Definitief ontwerp': 'Bouwkundig tekeningen',
    'Bouwbegeleiding': '€ 50 - € 100 per uur',
    'Vergunningen': '30 visualisaties',
  },
  {
    'Schetsontwerp': 'Ruimtelijke schets',
    'Definitief ontwerp': 'Bouwplannen en details',
    'Bouwbegeleiding': 'Bouwtoezicht',
    'Vergunningen': 'Bouwslaande vergunning',
  },
];

// Service Types Data - customize per service
const architectTypes = [
  {
    title: 'Architect voor verbouwingen',
    description:
      'Voor uitbreidingen, herindelingen, renovaties en aanbouwen. Specialisatie in het transformeren van bestaande ruimtes.',
  },
  {
    title: 'Interieurarchitect',
    description:
      'Richt zich volledig op binnenruimtes, indeling, functionaliteit en afwerking. Voor moderne en stijlvolle interieurs.',
  },
  {
    title: 'Landschapsarchitect',
    description:
      'Gespecialiseerd in tuinen, omgevingen en buitenruimtes. Voor aangelegde groene, parkeerplekken en buitenkanten.',
  },
];

// Reviews Data - customize per service
const architectReviews = [
  {
    id: '1',
    name: 'Emma J.',
    rating: 5,
    review:
      'Bouwmatcher maakte het zo gemakkelijk om een betroubware specialist te vinden. Duidelijke communicatie, eerlijke prijzen en de taak was eerder voltooid dan verwacht.',
    bgColor: '#EDFDF2',
    borderColor: '#BEEECD',
  },
  {
    id: '2',
    name: 'Daniel V.',
    rating: 5,
    review:
      'Ik was verrast door hoe snel ik op elkaar passende offertes ontving. Binnen een dag had ik een betrouwbare professionaal aan mijn deur. Uitstekende service!',
    bgColor: '#ECF4FF',
    borderColor: '#D0E4FF',
  },
  {
    id: '3',
    name: 'Sophie de B.',
    rating: 5,
    review:
      'Het platform heeft me zoveel tijd bespaard. De loodgieter was professioneel, legde alles duidelijk uit en liet alles vlekkeloos achter. Ten zeerste aanbevelen!',
    bgColor: '#EDFDF2',
    borderColor: '#BEEECD',
  },
  {
    id: '4',
    name: 'Thomas B.',
    rating: 4,
    review:
      'Snel, transparant en betrouwbaar. Ik kond gemakkelijk een ervaren architect vinden zonder mij zorgen te hoeven maken. Zeer tevreden met het resultaat!',
    bgColor: '#ECF4FF',
    borderColor: '#D0E4FF',
  },
];

// Values Data - customize per service
const architectValues: ValueItem[] = [
  {
    id: 1,
    icon: '/icons/values/Betrouwbaarheid.svg',
    title: 'Kwaliteit gegarandeerd',
    description: 'Alleen geverifieerde en betrouwbare architecten met bewezen ervaring',
    position: 'top-left',
  },
  {
    id: 2,
    icon: '/icons/values/Doelgericht.svg',
    title: 'Snel & eenvoudig',
    description: 'Binnen 24 uur meerdere offertes van geschikte architecten',
    position: 'top-right',
  },
  {
    id: 3,
    icon: '/icons/values/Transparantie.svg',
    title: 'Transparante prijzen',
    description: 'Vergelijk prijzen en diensten zonder verborgen kosten',
    position: 'bottom-left',
  },
  {
    id: 4,
    icon: '/icons/values/Eerlijkheid.svg',
    title: 'Veilig & betrouwbaar',
    description: 'Alle architecten zijn gescreend en verzekerd voor uw gemoedsrust',
    position: 'bottom-right',
  },
];

// SEO Content Data - customize per service (Two-column card layout with auto-split)
const architectSEOData = {
  heading: 'SEO Content',
  description:
    'Alles wat je moet weten over architecten en hoe zij jouw bouwproject tot leven brengen.',
  cards: [
    {
      title: 'Wat doet een architect?',
      content:
        'Een architect maakt ontwerpen, ruimtelijke indelingen en technische tekeningen. Hij of zij bewaakt functionaliteit, esthetiek en naleving van bouwvoorschriften. Daarnaast adviseert de architect over materialen, lichtinval en energieprestaties.',
    },
    {
      title: 'Wanneer heb je een architect nodig?',
      content:
        'Een architect is essentieel voor nieuwbouwprojecten, uitbreidingen, grote renovaties en vergunningsaanvragen. Het voorkomt fouten in het ontwerp en zorgt voor een soepel traject richting uitvoering.',
    },
    {
      title: 'Rol tijdens de uitvoering',
      content:
        'Architecten kunnen toezicht houden op de bouw, controleren of het werk volgens plan verloopt, en adviseren bij onvoorziene situaties. Dit verhoogt de bouwkwaliteit en betrouwbaarheid.',
    },
  ],
};

// Process Steps Data - customize per service
const architectProcessSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Beschrijf jouw project',
    description:
      'Vul je projectgegevens in en beschrijf wat je nodig hebt. Wij helpen je stap voor stap.',
    icon: '/icons/process/step1-icon.svg',
    image: '/images/homepage/process/step1.png',
  },
  {
    id: 2,
    title: 'Ontvang offertes',
    description:
      'Binnen 24 uur ontvang je offertes van geschikte architecten uit jouw regio.',
    icon: '/icons/process/step2-icon.svg',
    image: '/images/homepage/process/step2.png',
  },
  {
    id: 3,
    title: 'Vergelijk & selecteer',
    description:
      'Vergelijk de verschillende aanbiedingen op prijs, ervaring en stijl. Kies degene die het beste bij je past.',
    icon: '/icons/process/step3-icon.svg',
    image: '/images/homepage/process/step3.png',
  },
  {
    id: 4,
    title: 'Realiseer je project',
    description:
      'Werken met jouw geselecteerde architect aan het ontwerp en realisatie van je bouwproject.',
    icon: '/icons/process/step4-icon.svg',
    image: '/images/homepage/process/step4.png',
  },
];

// CTA Data - customize per service
const architectCTAData = {
  heading: 'Klaar om te beginnen?',
  description: 'Vind nu de perfecte architect voor jouw bouwproject en ontvang within 24 uur offertes.',
  ctaText: 'Start nu',
};

// Marquee Data - customize per service
const architectMarqueeItems = [
  { text: 'Uw project starten' },
  { text: 'Gecertificeerde en gecontroleerde architecten' },
  { text: 'Duidelijke prijzen zonder verborgen kosten' },
];

// Service Page Configuration - customize order and marquee position per service
const architectServiceConfig = {
  sectionOrder: [
    'intro',
    'types',
    'process',
    'price',
    'tips',
    'cost',
    'faq',
    'reviews',
    'values',
    'seo',
  ],
  marquee: {
    enabled: true,
    showAfter: 'faq', // Can be: 'intro', 'types', 'process', 'price', 'tips', 'cost', 'faq', 'reviews', 'values', 'seo'
    items: architectMarqueeItems,
  },
};

// Type definitions for section rendering
interface SectionRendererProps {
  sectionKey: string;
  locale: string;
}

type SectionRenderer = (props: SectionRendererProps) => React.ReactNode;

// Section component mapper - maps section keys to their rendered components
const createSectionRenderer = (): Record<string, SectionRenderer> => ({
  intro: () => (
    <ServiceIntroduction
      intro={{
        heading_nl: 'Wat is een architect?',
        heading_en: 'What is an architect?',
        description_nl:
          'Een architect is verantwoordelijk voor het ontwerpen en uitwerken van bouwprojecten, variërend van woningen en aanbouwen tot zakelijke gebouwen en renovaties. Een architect vertaalt jouw wensen naar een veilig, functioneel en esthetisch ontwerp dat voldoet aan wetgeving en bouwvoorschriften. Hierbij worden schetsen, plattegronden, technische tekeningen en 3D-visualisaties opgesteld.\n\nArchitecten werken nauw samen met aannemers, ingenieurs en andere bouwprofessionals om ervoor te zorgen dat het ontwerp praktisch uitvoerbaar is en binnen het budget blijft. Ze kunnen daarnaast helpen met vergunningstrajecten, materiaalkeuze en bouwbegeleiding. Door een architect in te schakelen, voorkom je fouten tijdens de uitvoering en zorg je voor structuur binnen het gehele project.\n\nOf het gaat om een nieuwbouwwoning, uitbreiding, renovatie of herindeling van een bestaande ruimte: een architect legt de basis voor een kwalitatief en duurzaam eindresultaat.',
        description_en:
          "An architect is responsible for designing and developing construction projects, ranging from residential buildings and extensions to commercial buildings and renovations. An architect translates your wishes into a safe, functional and aesthetic design that complies with regulations and building codes. In doing so, sketches, floor plans, technical drawings and 3D visualizations are created.\n\nArchitects work closely with contractors, engineers and other construction professionals to ensure that the design is practically feasible and stays within budget. They can also assist with permits, material selection and construction supervision. By engaging an architect, you avoid errors during execution and ensure structure throughout the entire project.\n\nWhether it's a new residential building, extension, renovation or reconfiguration of an existing space: an architect lays the foundation for a quality and sustainable end result.",
        backgroundImage: '/images/services/service-intro-bg.png',
      }}
      language="nl"
    />
  ),

  types: ({ locale }) => (
    <ServiceTypes
      heading={locale === 'nl' ? 'Soorten architecten' : 'Types of Architects'}
      serviceTypes={architectTypes}
    />
  ),

  process: ({ locale }) => (
    <ServiceProcess
      title={locale === 'nl' ? 'Hoe werkt Bouwmatcher?' : 'How does Bouwmatcher work?'}
      subtitle={
        locale === 'nl'
          ? 'In 4 stappen naar jouw perfecte architect'
          : 'Get to your perfect architect in 4 steps'
      }
      steps={architectProcessSteps}
      showCTA={false}
    />
  ),

  price: ({ locale }) => (
    <ServicePriceComparison
      heading={locale === 'nl' ? 'Vergelijkingstabel' : 'Comparison Table'}
      description={
        locale === 'nl'
          ? 'Bekijk de gemiddelde kosten voor verschillende architectenwerkzaamheden'
          : 'View average costs for different architect services'
      }
      priceItems={architectPriceItems}
    />
  ),

  tips: ({ locale }) => (
    <ServiceTips
      heading={
        locale === 'nl'
          ? 'Tips voor het kiezen van een architect'
          : 'Tips for Choosing an Architect'
      }
      description={
        locale === 'nl'
          ? 'Volg deze tips om de juiste architect voor uw project te selecteren'
          : 'Follow these tips to select the right architect for your project'
      }
      tips={architectTips}
    />
  ),

  cost: ({ locale }) => (
    <ServiceCostTable
      heading={locale === 'nl' ? 'Kostenenoverzicht' : 'Cost Overview'}
      description={
        locale === 'nl'
          ? 'Gedetailleerd overzicht van architect diensten en kosten'
          : 'Detailed overview of architect services and costs'
      }
      columns={architectCostTableColumns}
      rows={architectCostTableRows}
    />
  ),

  faq: ({ locale }) => (
    <ServiceFAQ
      heading={locale === 'nl' ? 'Veelgestelde vragen' : 'Frequently Asked Questions'}
      description={
        locale === 'nl'
          ? 'Heb je vragen over architecten? Hier vind je antwoorden op de meestgestelde vragen.'
          : 'Have questions about architects? Find answers to the most asked questions here.'
      }
      faqItems={architectFaqItems}
    />
  ),

  reviews: ({ locale }) => (
    <ServiceReviews
      eyebrowText={locale === 'nl' ? 'Klantverhalen' : 'Client Stories'}
      heading={locale === 'nl' ? 'Waarom anderen voor ons kiezen' : 'Why Others Choose Us'}
      description={
        locale === 'nl'
          ? 'Echte ervaringen van tevreden klanten'
          : 'Real experiences from satisfied clients'
      }
      reviews={architectReviews}
    />
  ),

  values: ({ locale }) => (
    <Values
      heading={locale === 'nl' ? 'Waarom Bouwmatcher?' : 'Why Bouwmatcher?'}
      description={
        locale === 'nl'
          ? 'Vind de perfecte architect voor jouw project'
          : 'Find the perfect architect for your project'
      }
      centerText={locale === 'nl' ? 'Betrouwbaar platform' : 'Trusted platform'}
      values={architectValues}
      showCTA={false}
    />
  ),

  seo: () => (
    <ServiceSEO
      heading={architectSEOData.heading}
      description={architectSEOData.description}
      cards={architectSEOData.cards}
    />
  ),
});

export default async function ServicePage({ params }: ServicePageProps) {
  const { id, locale } = await params;

  const t = await getTranslations('service.banner');
  const trustPillsData = t.raw('trustPills') as string[];
  const trustPills = trustPillsData.map((text) => ({
    text,
    dotColor: '#0AB27E',
  }));

  const supabase = await createClient();

  const { data: service, error } = await supabase
    .from('service_categories')
    .select('*')
    .eq('slug', id)
    .single();

  if (error || !service) {
    notFound();
  }

  // Fetch subcategories for this service category
  let subcategories: any[] = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const subcategoriesUrl = `${baseUrl}/api/service-subcategories?categoryIds=${service.id}`;

    const response = await fetch(subcategoriesUrl, {
      next: { revalidate: 3600 }, // ISR - revalidate every hour
    });

    if (response.ok) {
      const data = await response.json();
      subcategories = data.subcategories || [];
    }
  } catch (error) {
    console.error('[SUBCATEGORIES-FETCH-ERROR]', {
      service: id,
      error: error instanceof Error ? error.message : String(error),
    });
    // Continue with empty array if fetch fails
  }

  // Try to fetch CMS data from public API
  let cmsData: CmsDataResponse | null = null;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const apiUrl = `${baseUrl}/api/service-pages/${id}`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 60 }, // ISR - revalidate every hour
    });

    if (response.ok) {
      cmsData = (await response.json()) as CmsDataResponse;
    }
  } catch (error) {
    console.error('[CMS-FETCH-ERROR]', {
      service: id,
      error: error instanceof Error ? error.message : String(error),
    });
    // Continue with fallback if API fails
  }

  const useCmsData = cmsData?.hasCmsData && cmsData?.banner;

  // Comprehensive CMS data log
  console.log('[CMS-DATA]', JSON.stringify({
    service: id,
    locale,
    timestamp: new Date().toISOString(),
    useCmsData,
    cmsData: cmsData || null,
  }, null, 2));

  // Banner data - use CMS if available, otherwise fallback
  const bannerData = useCmsData && cmsData && cmsData.banner
    ? {
        heading: locale === 'nl'
          ? (cmsData.banner.h1_text_nl as string) || (cmsData.banner.h1_text_en as string) || 'Vind en vergelijk'
          : (cmsData.banner.h1_text_en as string) || (cmsData.banner.h1_text_nl as string) || 'Find and compare',
        description: locale === 'nl'
          ? (cmsData.banner.description_nl as string) || ''
          : (cmsData.banner.description_en as string) || '',
        backgroundImage: (cmsData.banner.background_image as string) || '/images/services/service-bg.png',
      }
    : {
        heading: locale === 'nl' ? 'Vind en vergelijk' : 'Find and compare',
        description:
          locale === 'nl'
            ? 'Op deze pagina ontdek je alles over de service, werkzaamheden, kosten, vergunningen en hoe je eenvoudig de juiste specialist vindt via Bouwmatcher.'
            : 'On this page you will discover everything about the service, activities, costs, permits and how you can easily find the right specialist via Bouwmatcher.',
        backgroundImage: '/images/services/service-bg.png',
      };

  // Initialize section renderer for fallback
  const sectionRenderer = createSectionRenderer();

  return (
    <DefaultLayout>
      <ServiceBanner
        serviceName={service.name_nl} // Still passed for ProjectForm component
        serviceSlug={service.slug}
        heading={bannerData.heading}
        description={bannerData.description}
        backgroundImage={bannerData.backgroundImage}
        trustPills={trustPills}
      />

      {/* If CMS data available, render dynamic sections (skip banner since it's already shown); otherwise render fallback */}
      {useCmsData && cmsData && cmsData.sectionsConfig ? (
        <DynamicServiceSections
          sectionsConfig={{
            ...cmsData.sectionsConfig,
            order: cmsData.sectionsConfig.order.filter((s) => s !== 'banner'), // Remove banner from dynamic rendering
          }}
          sectionsData={{
            ...cmsData.sections,
            // Keep reviews section metadata, add reviewsItems for actual review data
            reviews: cmsData.sections.reviews ? {
              ...cmsData.sections.reviews,
              reviewsItems: architectReviews, // Always use fallback reviews
            } : {
              eye_text_nl: '',
              eye_text_en: '',
              heading_nl: '',
              heading_en: '',
              description_nl: '',
              description_en: '',
              reviewsItems: architectReviews,
            },
            // Add subcategories for types section
            types: cmsData.sections.types ? {
              ...cmsData.sections.types,
              typesItems: subcategories,
            } : {
              heading_nl: '',
              heading_en: '',
              description_nl: '',
              description_en: '',
              typesItems: subcategories,
            },
          }}
          locale={locale}
          trustPills={trustPills}
          marqueeConfig={
            cmsData.sections.marquees
              ? {
                  isEnabled: ((cmsData.sections.marquees as Record<string, unknown>).is_enabled as boolean) || false,
                  afterSections: ((cmsData.sections.marquees as Record<string, unknown>).after_sections as string[]) || [],
                  items: (((cmsData.sections.marquees as Record<string, unknown>).service_page_marquee_items as any[]) || []).map(
                    (item: Record<string, unknown>) => ({
                      text: locale === 'nl' ? String(item.text_nl || '') : String(item.text_en || ''),
                    })
                  ),
                }
              : undefined
          }
        />
      ) : (
        <>
          {/* Fallback to hardcoded architect content */}
          {architectServiceConfig.sectionOrder.map((sectionKey) => {
            const showMarqueeAfter =
              architectServiceConfig.marquee.enabled &&
              architectServiceConfig.marquee.showAfter === sectionKey;

            // Get the section renderer function, fallback to null if not found
            const renderSection = sectionRenderer[sectionKey];

            return (
              <div key={sectionKey}>
                {/* Render Section if renderer exists */}
                {renderSection && renderSection({ sectionKey, locale })}

                {/* Render Marquee After Section if Configured */}
                {showMarqueeAfter && (
                  <ServiceMarquee items={architectServiceConfig.marquee.items} />
                )}
              </div>
            );
          })}

          {/* Default CTA - only shown for fallback pages */}
          <ServiceCTA
            heading={locale === 'nl' ? architectCTAData.heading : 'Ready to get started?'}
            description={
              locale === 'nl'
                ? architectCTAData.description
                : 'Find the perfect architect for your building project and receive quotes within 24 hours.'
            }
            ctaText={locale === 'nl' ? architectCTAData.ctaText : 'Start now'}
          />
        </>
      )}
    </DefaultLayout>
  );
}

export async function generateStaticParams() {
  // Use environment variables directly for build-time data fetching
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

  const { createClient: createBrowserClient } = await import('@supabase/supabase-js');
  const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

  const { data: services } = await supabase
    .from('service_categories')
    .select('slug');

  if (!services) {
    return [];
  }

  const locales = ['en', 'nl'];
  const params = [];

  for (const service of services) {
    for (const locale of locales) {
      params.push({
        id: service.slug,
        locale,
      });
    }
  }

  return params;
}
