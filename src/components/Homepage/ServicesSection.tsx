'use client';

import { useState } from 'react';
import { SectionPill } from '@/components/ui/section-pill';
import { Switch } from '@/components/ui/switch';
import { MoveHorizontal, Grid3X3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const servicesData = [
  { name: 'Architect', icon: '/icons/services/architect.svg', url: '/services/architect' },
  { name: 'Interieur', icon: '/icons/services/Interieur.svg', url: '/services/interieur' },
  { name: 'Metselaar', icon: '/icons/services/Metselaar.svg', url: '/services/metselaar' },
  { name: 'Stucadoor', icon: '/icons/services/Stucadoor.svg', url: '/services/stucadoor' },
  { name: 'Tegelzetter', icon: '/icons/services/Tegelzetter.svg', url: '/services/tegelzetter' },
  { name: 'Trappen', icon: '/icons/services/Trappen.svg', url: '/services/trappen' },
  { name: 'Schrijnwerker', icon: '/icons/services/Schrijnwerker.svg', url: '/services/schrijnwerker' },
  { name: 'Maatwerk', icon: '/icons/services/Maatwerk.svg', url: '/services/maatwerk' },
  { name: 'Omheining', icon: '/icons/services/Omheining.svg', url: '/services/omheining' },
  { name: 'Zonnepanelen', icon: '/icons/services/Zonnepanelen.svg', url: '/services/zonnepanelen' },
  { name: 'Veranda', icon: '/icons/services/Veranda.svg', url: '/services/veranda' },
  { name: 'Zonwering', icon: '/icons/services/Zonwering.svg', url: '/services/zonwering' },
  { name: 'Haard', icon: '/icons/services/Haard.svg', url: '/services/haard' },
  { name: 'Airco', icon: '/icons/services/Airco.svg', url: '/services/airco' },
  { name: 'Thuisbatterij', icon: '/icons/services/Thuisbatterij.svg', url: '/services/thuisbatterij' },
  { name: 'Isolatie', icon: '/icons/services/Isolatie.svg', url: '/services/isolatie' },
  { name: 'Grondwerken', icon: '/icons/services/Grondwerken.svg', url: '/services/grondwerken' },
  { name: 'Schoonmaak', icon: '/icons/services/Schoonmaak.svg', url: '/services/schoonmaak' },
  { name: 'Tuinpoorten', icon: '/icons/services/Tuinpoorten.svg', url: '/services/tuinpoorten' },
  { name: 'Tuinhuis', icon: '/icons/services/Tuinhuis.svg', url: '/services/tuinhuis' },
  { name: 'Septische', icon: '/icons/services/Septische.svg', url: '/services/septische' },
  { name: 'Schilderwerk', icon: '/icons/services/Schilderwerk.svg', url: '/services/schilderwerk' },
  { name: 'Betonwerken', icon: '/icons/services/Betonwerken.svg', url: '/services/betonwerken' },
  { name: 'Hekwerken', icon: '/icons/services/Hekwerken.svg', url: '/services/hekwerken' },
];

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
  const [isGridView, setIsGridView] = useState(false);

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
    <section className="py-14 bg-white">
      <div className="custom-container">
        <div className="flex items-start justify-between mb-16">
          <div className="flex-1">
            <SectionPill
              text="Populaire diensten"
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              }
              className="bg-white/80 border border-[#023AA233] text-primary py-3.5 px-6 mb-5"
              textClassName="font-montserrat text-sm font-normal"
              iconClassName="text-primary"
            />
            <h2 className="text-5xl font-normal text-foreground mb-5">
              Categorieën
            </h2>
            <p className="text-muted-foreground text-2xl">
              Zoek professionals voor elk type woningverbetering
            </p>
          </div>

          <div className="flex items-center gap-3 ml-8">
            <MoveHorizontal className={`w-5 h-5 ${!isGridView ? 'text-primary' : 'text-gray-400'}`} />
            <Switch
              checked={isGridView}
              onCheckedChange={setIsGridView}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-200"
            />
            <Grid3X3 className={`w-5 h-5 ${isGridView ? 'text-primary' : 'text-gray-400'}`} />
          </div>
        </div>

        {isGridView ? <GridView /> : <CarouselView />}
      </div>
    </section>
  );
}