'use client';

import { SectionPill } from '@/components/ui/section-pill';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function PartnersSection() {
  const t = useTranslations('homepage.partners');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const partners = [
    { id: 1, image: '/images/homepage/partners/bouwdepot.png', alt: 'Bouwdepot' },
    { id: 2, image: '/images/homepage/partners/gedimat.png', alt: 'Gedimat' },
    // { id: 3, image: '/images/homepage/partners/partner.png', alt: 'Partner 3' },
    // { id: 4, image: '/images/homepage/partners/partner.png', alt: 'Partner 4' },
    // { id: 5, image: '/images/homepage/partners/partner.png', alt: 'Partner 5' },
    // { id: 6, image: '/images/homepage/partners/partner.png', alt: 'Partner 6' },
  ];

  return (
      <section className='py-14 md:py-24 bg-white'>
        <div className='custom-container'>
          <div className='text-center mb-8 md:mb-16'>

              <SectionPill
                text={t('pillText')}
                icon={
                  <Image
                    src="/icons/handshake-icon.svg"
                    alt="Handshake"
                    width={24}
                    height={24}
                  />
                }
                className='text-accent py-3 px-6 mb-3 md:mb-5 border-gray-200'
                textClassName='font-montserrat text-sm font-normal text-primary'
                iconClassName='text-accent w-6'
                stylePill={{
                  background:
                    'linear-gradient(90deg, rgba(2, 58, 162, 0.1) 0%, rgba(10, 178, 126, 0.1) 100%)',
                }}
              />


            <h2 className='text-[32px] md:text-5xl font-normal text-foreground mb-2 md:mb-5'>
              {t('heading')}
            </h2>
            <p className='text-muted-foreground text-base md:text-2xl px-4'>
              {t('description')}
            </p>
          </div>

          <div className='flex justify-center flex-wrap gap-4 md:gap-6 lg:gap-8'>
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className='relative bg-white py-3 px-6 md:py-4 md:px-10 transition-all duration-300 cursor-pointer'
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Image
                  src={partner.image}
                  alt={partner.alt}
                  width={96}
                  height={48}
                  className='w-16 h-8 md:w-24 md:h-12 object-contain'
                />

                {/* Hover pill overlay */}
                {hoveredIndex === index && (
                  <div className='absolute top-0 -right-2'>
                    <SectionPill
                      text={t('verified')}
                      className='text-white py-1.5 px-4'
                      textClassName='font-montserrat text-xs font-medium'
                      stylePill={{
                        background: '#0AB27E',
                        boxShadow: '0px 2px 5.9px 0px #0000002B',

                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}