'use client';
import { SectionPill } from '@/components/ui/section-pill';
import { ReviewCarousel } from './ReviewCarousel';
import { Quote } from 'lucide-react';

export default function ReviewsSection() {
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
        className='py-24 relative bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: "url('/images/homepage/bg-reviews-section.png')",
        }}
      >
      {/* Background overlay for better text readability */}
      <div className='absolute inset-0 bg-white/20  blur-in-3xl'></div>

      <div className='custom-container relative z-10'>
        <div className='text-center'>
          <div className='flex justify-center mb-6 '>
            <SectionPill
              text='Klantverhalen'
              icon={<Quote className='w-3.5 rotate-180 fill-accent' />}
              className='text-accent py-3.5 px-6 mb-5'
              textClassName='font-montserrat text-sm font-normal'
              iconClassName='text-accent'
              stylePill={{
                background:
                  'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)',
              }}
            />
          </div>

          <h2 className='text-5xl font-normal text-foreground mb-5'>
            Waarom anderen voor ons kiezen
          </h2>
          <p className='text-muted-foreground text-2xl'>
            Echte ervaringen van tevreden klanten
          </p>
        </div>
        <div className='relative'>

          <div className='absolute z-20 w-12.5 h-full bg-gradient-to-r from-transparent to-white right-0'></div>
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
