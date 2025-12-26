import { notFound } from 'next/navigation';
import CTASection from '@/components/Homepage/CTASection';
import ServiceBanner from '@/components/Service/ServiceBanner';
import ServiceDetails from '@/components/Service/ServiceDetails';
import ProcessSection from '@/components/Homepage/ProcessSection';
import DefaultLayout from '@/components/DefaultLayout';
import { createClient } from '@/lib/supabase/server';

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
      <ServiceDetails service={service} />
      <ProcessSection/>
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
