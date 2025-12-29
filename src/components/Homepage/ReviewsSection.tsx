'use client';
import { SectionPill } from '@/components/ui/section-pill';
import { ReviewCarousel } from './ReviewCarousel';
import { Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ReviewsSection() {
  const t = useTranslations('homepage.reviews');

  return (
    <>
      {/* Top gradient border */}
      <div
        className="w-full h-px"
        style={{
          background: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #023AA2 50%, rgba(0, 0, 0, 0) 100%)"
        }}
      ></div>

      <section
        className='py-14 md:py-24 relative bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: "url('/images/homepage/bg-reviews-section.png')",
        }}
      >
      {/* Background overlay for better text readability */}
      <div className='absolute inset-0 bg-white/20  blur-in-3xl'></div>

      <div className='custom-container relative z-10'>
        <div className='text-center mb-8 md:mb-12'>
          <div className='flex justify-center mb-3 md:mb-6'>
            <SectionPill
              text={t('pillText')}
              icon={<Quote className='w-3.5 rotate-180 fill-accent' />}
              className='text-accent py-3.5 px-6 mb-3 md:mb-5'
              textClassName='font-montserrat text-sm font-normal'
              iconClassName='text-accent'
              stylePill={{
                background:
                  'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)',
              }}
            />
          </div>

          <h2 className='text-[32px] md:text-5xl font-normal text-foreground mb-2 md:mb-5 px-4'>
            {t('heading')}
          </h2>
          <p className='text-muted-foreground text-base md:text-2xl px-4'>
            {t('description')}
          </p>
        </div>
        <div className='relative'>
          {/* Hide gradient overlay on mobile */}
          <div className='hidden md:block absolute z-20 w-12.5 h-full bg-gradient-to-r from-transparent to-white right-0'></div>
          <ReviewCarousel />
        </div>
      </div>
      </section>

      {/* Bottom gradient border */}
      <div
        className="w-full h-px"
        style={{
          background: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #023AA2 50%, rgba(0, 0, 0, 0) 100%)"
        }}
      ></div>
    </>
  );
}
