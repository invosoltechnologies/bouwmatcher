'use client';

import { useState } from 'react';
import { SectionPill } from '@/components/ui/section-pill';
import { ViewSwitcher } from '@/components/ui/view-switcher';
import { servicesData } from '@/data/services';
import { MoveHorizontal, Grid3X3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ServiceCard = ({ service }: { service: typeof servicesData[0] }) => (
  <Link
    href={service.url}
    target="_blank"
    className="cursor-pointer block"
  >
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 px-6 pt-6 h-36 flex flex-col items-center justify-start">
      <div className="w-12 h-12 flex items-center justify-center mb-4">
        <Image
          src={service.icon}
          alt={service.name}
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
      <span className="text-sm font-medium text-center text-gray-700">
        {service.name}
      </span>
    </div>
  </Link>
);

export default function ServicesSection() {
  const [currentView, setCurrentView] = useState('grid');

  const viewOptions = [
    {
      value: 'carousel',
      label: 'Carrousel',
      icon: <MoveHorizontal className="w-4 h-4" />,
    },
    {
      value: 'grid',
      label: 'Rooster',
      icon: <Grid3X3 className="w-4 h-4" />,
    },
  ];

  const CarouselView = () => {
    const rows = [];
    const servicesPerRow = 8;
    const totalRows = 3;

    for (let i = 0; i < totalRows; i++) {
      const startIndex = i * servicesPerRow;
      const rowServices = servicesData.slice(startIndex, startIndex + servicesPerRow);

      if (rowServices.length > 0) {
        rows.push(
          <div key={i} className="grid grid-cols-8 gap-11 mb-6">
            {rowServices.map((service) => (
              <ServiceCard key={service.name} service={service} />
            ))}
          </div>
        );
      }
    }

    return <div className="space-y-6">{rows}</div>;
  };

  const GridView = () => (
    <div className="grid grid-cols-8 gap-x-11 gap-y-6">
      {servicesData.map((service) => (
        <ServiceCard key={service.name} service={service} />
      ))}
    </div>
  );

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

        {currentView === 'grid' ? <GridView /> : <CarouselView />}
      </div>
    </section>
  );
}