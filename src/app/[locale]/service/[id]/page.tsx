import { notFound } from 'next/navigation';
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
import type { ProcessStep } from '@/components/ui/process-steps';

interface ServicePageProps {
  params: Promise<{ id: string; locale: string }>;
}

const trustPills = [
  { text: 'Eerlijkheid', dotColor: '#0AB27E' },
  { text: 'Transparantie', dotColor: '#0AB27E' },
  { text: 'Doelgericht', dotColor: '#0AB27E' },
  { text: 'Geen valse beloften', dotColor: '#0AB27E' },
];

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

export default async function ServicePage({ params }: ServicePageProps) {
  const { id, locale } = await params;

  const supabase = await createClient();

  const { data: service, error } = await supabase
    .from('service_categories')
    .select('*')
    .eq('slug', id)
    .single();

  if (error || !service) {
    notFound();
  }

  // Banner data - customize per service as needed
  const bannerData = {
    heading: locale === 'nl' ? 'Vind en vergelijk' : 'Find and compare',
    description:
      locale === 'nl'
        ? 'Op deze pagina ontdek je alles over de service, werkzaamheden, kosten, vergunningen en hoe je eenvoudig de juiste specialist vindt via Bouwmatcher.'
        : 'On this page you will discover everything about the service, activities, costs, permits and how you can easily find the right specialist via Bouwmatcher.',
    backgroundImage: '/images/services/service-bg.png',
  };

  return (
    <DefaultLayout>
      <ServiceBanner
        serviceName={locale === 'nl' ? service.name_nl : service.name_en}
        serviceSlug={service.slug}
        heading={bannerData.heading}
        description={bannerData.description}
        backgroundImage={bannerData.backgroundImage}
        trustPills={trustPills}
      />
      {/* Service Introduction Section */}
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
        language='nl'
      />
      {/* Marquee Section */}
      <ServiceMarquee items={architectMarqueeItems} />
      <ServiceTypes
        heading={
          locale === 'nl' ? 'Soorten architecten' : 'Types of Architects'
        }
        serviceTypes={architectTypes}
      />
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
      <ServicePriceComparison
        heading={locale === 'nl' ? 'Vergelijkingstabel' : 'Comparison Table'}
        description={
          locale === 'nl'
            ? 'Bekijk de gemiddelde kosten voor verschillende architectenwerkzaamheden'
            : 'View average costs for different architect services'
        }
        priceItems={architectPriceItems}
      />
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
      <ServiceFAQ
        heading={
          locale === 'nl' ? 'Veelgestelde vragen' : 'Frequently Asked Questions'
        }
        description={
          locale === 'nl'
            ? 'Heb je vragen over architecten? Hier vind je antwoorden op de meestgestelde vragen.'
            : 'Have questions about architects? Find answers to the most asked questions here.'
        }
        faqItems={architectFaqItems}
      />
      <ServiceReviews
        eyebrowText={locale === 'nl' ? 'Klantverhalen' : 'Client Stories'}
        heading={
          locale === 'nl'
            ? 'Waarom anderen voor ons kiezen'
            : 'Why Others Choose Us'
        }
        description={
          locale === 'nl'
            ? 'Echte ervaringen van tevreden klanten'
            : 'Real experiences from satisfied clients'
        }
        reviews={architectReviews}
      />
      <Values
        heading={locale === 'nl' ? 'Waarom Bouwmatcher?' : 'Why Bouwmatcher?'}
        description={
          locale === 'nl'
            ? 'Vind de perfecte architect voor jouw project'
            : 'Find the perfect architect for your project'
        }
        centerText={
          locale === 'nl' ? 'Betrouwbaar platform' : 'Trusted platform'
        }
        values={architectValues}
        showCTA={false}
      />
      <ServiceSEO
        heading={architectSEOData.heading}
        description={architectSEOData.description}
        cards={architectSEOData.cards}
      />
      <ServiceCTA
        heading={
          locale === 'nl' ? architectCTAData.heading : 'Ready to get started?'
        }
        description={
          locale === 'nl'
            ? architectCTAData.description
            : 'Find the perfect architect for your building project and receive quotes within 24 hours.'
        }
        ctaText={locale === 'nl' ? architectCTAData.ctaText : 'Start now'}
      />
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
