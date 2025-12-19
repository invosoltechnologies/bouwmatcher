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
    <div className="bg-white rounded-[12px] border-2 border-gray-200 pt-6 pb-4 px-2 min-w-[106px] h-[130px] md:pt-6.5 md:pb-0 md:px-0 md:min-w-[133px] md:h-[152px] flex flex-col items-center justify-start gap-3 md:gap-4 transition-all hover:shadow-lg hover:border-primary">
      <div className="w-12 h-12 md:w-16 md:h-16 flex bg-blue-100 rounded-full items-center justify-center flex-shrink-0">
        <Image
          src={service.icon_url}
          alt={service.name_nl}
          width={24}
          height={24}
          className="w-[18px] h-[18px] md:w-6 md:h-6 object-fit"
        />
      </div>
      <p className="font-montserrat block text-xs md:text-sm text-center text-wrap break-all text-foreground px-1">
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
    // Mobile: 3 cards per row, 3 rows = 9 cards per slide
    // Desktop: 8 cards per row, 3 rows = 24 cards per slide
    const mobileServicesPerRow = 3;
    const desktopServicesPerRow = 8;
    const rowsPerSlide = 3;
    const mobileServicesPerSlide = mobileServicesPerRow * rowsPerSlide; // 9
    const desktopServicesPerSlide = desktopServicesPerRow * rowsPerSlide; // 24

    // We'll create slides for both mobile and desktop
    // Calculate total slides for desktop (will be used for pagination on desktop)
    const desktopTotalSlides = Math.ceil(services.length / desktopServicesPerSlide);
    const mobileTotalSlides = Math.ceil(services.length / mobileServicesPerSlide);

    const slides = [];

    // Generate slides - we need to generate enough for mobile (more slides)
    const maxSlides = Math.max(mobileTotalSlides, desktopTotalSlides);

    for (let slideIndex = 0; slideIndex < maxSlides; slideIndex++) {
      // Mobile calculation
      const mobileSlideStartIndex = slideIndex * mobileServicesPerSlide;
      const mobileSlideServices = services.slice(mobileSlideStartIndex, mobileSlideStartIndex + mobileServicesPerSlide);

      // Desktop calculation
      const desktopSlideStartIndex = slideIndex * desktopServicesPerSlide;
      const desktopSlideServices = services.slice(desktopSlideStartIndex, desktopSlideStartIndex + desktopServicesPerSlide);

      // Skip empty slides
      if (mobileSlideServices.length === 0 && desktopSlideServices.length === 0) continue;

      const rows = [];
      for (let rowIndex = 0; rowIndex < rowsPerSlide; rowIndex++) {
        // Mobile rows (3 cards per row)
        const mobileRowStartIndex = rowIndex * mobileServicesPerRow;
        const mobileRowServices = mobileSlideServices.slice(mobileRowStartIndex, mobileRowStartIndex + mobileServicesPerRow);

        // Desktop rows (8 cards per row)
        const desktopRowStartIndex = rowIndex * desktopServicesPerRow;
        const desktopRowServices = desktopSlideServices.slice(desktopRowStartIndex, desktopRowStartIndex + desktopServicesPerRow);

        // Combine both for rendering with responsive grid
        const allRowServices = [...new Set([...mobileRowServices, ...desktopRowServices])];

        if (allRowServices.length > 0) {
          rows.push(
            <div key={rowIndex} className="grid grid-cols-3 lg:grid-cols-8 gap-4 md:gap-x-11 mb-4 md:mb-6">
              {/* Mobile: show mobileRowServices */}
              {mobileRowServices.map((service: Service) => (
                <div key={service.slug} className="lg:hidden">
                  <ServiceCard service={service} />
                </div>
              ))}
              {/* Desktop: show desktopRowServices */}
              {desktopRowServices.map((service: Service) => (
                <div key={service.slug} className="hidden lg:block">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          );
        }
      }

      slides.push(
        <CarouselItem key={slideIndex}>
          <div className="space-y-4 md:space-y-6">
            {rows}
          </div>
        </CarouselItem>
      );
    }

    return (
      <div className='relative'>
        <div className='hidden md:block absolute z-20 w-12.5 h-full bg-gradient-to-r from-transparent to-white right-0'></div>
        <div className='hidden md:block absolute z-20 w-12.5 h-full bg-gradient-to-l from-transparent to-white left-0'></div>
        <Carousel setApi={handleSetApi} className='w-full'>
          <CarouselContent>{slides}</CarouselContent>
        </Carousel>

        {/* Bullet Pagination */}
        <div className='flex justify-center items-center gap-2 mt-6 md:mt-8'>
          {Array.from({ length: slides.length }).map((_, index) => (
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
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-x-11 md:gap-y-6">
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
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-16 gap-4'>
          <div className='flex-1 w-full text-center '>
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
              className='bg-white/80 border border-[#023AA233] text-primary py-3.5 px-6 mb-3 md:mb-5'
              textClassName='font-montserrat text-sm font-normal'
              iconClassName='text-primary'
            />
            <h2 className='text-[32px] md:text-5xl font-normal text-foreground mb-2 md:mb-5'>
              Categorieën
            </h2>
            <p className='text-muted-foreground text-base md:text-2xl'>
              Zoek professionals voor elk type woningverbetering
            </p>
          </div>

          <div className='w-full md:w-auto flex justify-center md:justify-end'>
            <ViewSwitcher
              options={viewOptions}
              value={currentView}
              onValueChange={setCurrentView}
            />
          </div>
        </div>

        {currentView === 'grid' ? <GridView /> : CarouselView}
      </div>
    </section>
  );
}