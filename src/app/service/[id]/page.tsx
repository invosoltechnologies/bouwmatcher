import { notFound } from 'next/navigation';
import Image from 'next/image';
import { servicesData } from '@/data/services';
import { SectionPill } from '@/components/ui/section-pill';
import CTASection from '@/components/Homepage/CTASection';
import ServiceBanner from '@/components/Service/ServiceBanner';
import ServiceDetails from '@/components/Service/ServiceDetails';
import ProcessSection from '@/components/Homepage/ProcessSection';

interface ServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;

  const service = servicesData.find(s =>
    s.url === `/service/${id}`
  );

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceBanner service={service} />
      <ServiceDetails service={service} />
      <ProcessSection/>
      <CTASection />
    </>
  );
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    id: service.url.replace('/service/', ''),
  }));
}