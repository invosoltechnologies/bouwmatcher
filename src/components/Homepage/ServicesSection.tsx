'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { SectionPill } from '@/components/ui/section-pill';
import { ViewSwitcher } from '@/components/ui/view-switcher';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { type Service } from '@/data/services';
import { MoveHorizontal, Grid3X3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ServiceCard = ({ service }: { service: Service }) => (
  <Link
    href={`/service/${service.slug}`}
    className="cursor-pointer block"
  >
    <div className="bg-white rounded-[12px] border-2 border-gray-200 pt-6.5 min-w-[133px] h-[152px] flex flex-col items-center justify-start gap-4 transition-all hover:shadow-lg hover:border-primary">
      <div className="w-16 h-16 flex bg-blue-100 rounded-full items-center justify-center">
        <Image
          src={service.icon_url}
          alt={service.name_nl}
          width={24}
          height={24}
          className="object-fit"
        />
      </div>
      <p className="font-montserrat block text-sm text-center text-wrap break-all text-foreground">
        {service.name_nl}
      </p>
    </div>
  </Link>
);

export default function ServicesSection() {
  const [currentView, setCurrentView] = useState('carousel');
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSetApi = useCallback((api: CarouselApi) => {
    setCarouselApi(api);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/service-categories');
        const data = await response.json();
        setServices(data.serviceCategories || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", handleSelect);

    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

  const viewOptions = [
    {
      value: 'carousel',
      label: 'Carrousel',
      icon: <MoveHorizontal className="w-4 h-4" />,
    },
    {
      value: 'grid',
      label: 'Rooster',
      icon: <Grid3X3 className="w-4 h-4 fill-muted-foreground hover:fill-primary text-gray-100 hover:gray-100" />,
    },
  ];

  const CarouselView = useMemo(() => {
    const servicesPerRow = 8;
    const rowsPerSlide = 3;
    const servicesPerSlide = servicesPerRow * rowsPerSlide; // 24 services per slide
    const totalSlides = Math.ceil(services.length / servicesPerSlide);

    const slides = [];
    for (let slideIndex = 0; slideIndex < totalSlides; slideIndex++) {
      const slideStartIndex = slideIndex * servicesPerSlide;
      const slideServices = services.slice(slideStartIndex, slideStartIndex + servicesPerSlide);

      // Create 3 rows for this slide
      const rows = [];
      for (let rowIndex = 0; rowIndex < rowsPerSlide; rowIndex++) {
        const rowStartIndex = rowIndex * servicesPerRow;
        const rowServices = slideServices.slice(rowStartIndex, rowStartIndex + servicesPerRow);

        if (rowServices.length > 0) {
          rows.push(
            <div key={rowIndex} className="grid grid-cols-8 gap-x-11 mb-6">
              {rowServices.map((service: Service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          );
        }
      }

      slides.push(
        <CarouselItem key={slideIndex}>
          <div className="space-y-6">
            {rows}
          </div>
        </CarouselItem>
      );
    }

    return (
      <div className='relative'>
        <div className='absolute z-20 w-12.5 h-full bg-gradient-to-r from-transparent to-white right-0'></div>
        <div className='absolute z-20 w-12.5 h-full bg-gradient-to-l from-transparent to-white left-0'></div>
        <Carousel setApi={handleSetApi} className='w-full'>
          <CarouselContent>{slides}</CarouselContent>
        </Carousel>

        {/* Bullet Pagination */}
        <div className='flex justify-center items-center gap-2 mt-8'>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => carouselApi?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }, [handleSetApi, carouselApi, currentSlide, services]);

  const GridView = () => (
    <div className="grid grid-cols-8 gap-x-11 gap-y-6">
      {services.map((service: Service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );

  if (loading) {
    return (
      <section className='py-14 bg-white'>
        <div className='custom-container flex justify-center items-center min-h-[400px]'>
          <p className='text-muted-foreground'>Loading services...</p>
        </div>
      </section>
    );
  }

  return (
    <section className='py-14 bg-white'>
      <div className='custom-container'>
        <div className='flex items-center justify-between mb-16'>
          <div className='flex-1'>
            <SectionPill
              text='Populaire diensten'
              icon={
                <Image
                  src='/icons/services-pill-icon.svg'
                  alt='Handshake'
                  width={16}
                  height={24}
                />
              }
              className='bg-white/80 border border-[#023AA233] text-primary py-3.5 px-6 mb-5'
              textClassName='font-montserrat text-sm font-normal'
              iconClassName='text-primary'
            />
            <h2 className='text-5xl font-normal text-foreground mb-5'>
              Categorieën
            </h2>
            <p className='text-muted-foreground text-2xl'>
              Zoek professionals voor elk type woningverbetering
            </p>
          </div>

          <ViewSwitcher
            options={viewOptions}
            value={currentView}
            onValueChange={setCurrentView}
          />
        </div>

        {currentView === 'grid' ? <GridView /> : CarouselView}
      </div>
    </section>
  );
}