import { notFound } from 'next/navigation';
import CTASection from '@/components/Homepage/CTASection';
import ServiceBanner from '@/components/Service/ServiceBanner';
import ServiceDetails from '@/components/Service/ServiceDetails';
import ProcessSection from '@/components/Homepage/ProcessSection';
import DefaultLayout from '@/components/DefaultLayout';
import { createClient } from '@/lib/supabase/server';
import ServiceIntroduction from '@/components/Service/ServiceIntroduction';

interface ServicePageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: service, error } = await supabase
    .from('service_categories')
    .select('*')
    .eq('slug', id)
    .single();

  if (error || !service) {
    notFound();
  }

  return (
    <DefaultLayout>
      <ServiceBanner service={service} />
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
      <ProcessSection />
      <CTASection />
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
