'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';

interface FAQHeroProps {
  type: 'klanten' | 'specialisten';
}

export default function FAQHero({ type }: FAQHeroProps) {
  const t = useTranslations(`faq.${type}.hero`);

  const scrollToFAQ = () => {
    const faqSection = document.getElementById('faq-section');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className='relative min-h-[60vh] pt-32 md:pt-[168px] pb-12 md:pb-20'>
      {/* Background div with gradient and blur */}
      <div className='absolute inset-0 w-full h-full -z-10 blur-[66.5px] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4]' />

      {/* Content */}
      <div className='custom-container relative z-10 h-full px-4'>
        {/* Mobile/Tablet Layout */}
        <div className='lg:hidden pb-6'>
          {/* Type Badge - Centered */}
          <div className='flex justify-center mb-4'>
            <div className='inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-[#023AA233]'>
              <div className='w-1.5 h-1.5 bg-accent rounded-full'></div>
              <span className='text-sm text-primary font-medium'>
                {t('badge')}
              </span>
            </div>
          </div>

          {/* Main Heading - Left aligned */}
          <h1 className='text-3xl font-display font-normal leading-tight mb-6 text-left'>
            {t('heading')} <span className='text-accent'>{t('headingAccent')}</span>
          </h1>

          {/* Image - Right aligned */}
          <div className='flex justify-end mb-6'>
            <div className='relative w-[320px] max-w-full'>
              <Image
                src='/images/homepage/banner.png'
                width={692}
                height={485}
                alt='FAQ banner'
                className='w-full h-auto rounded-2xl'
              />
            </div>
          </div>

          {/* CTA Buttons - Below image, centered */}
          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <Button
              size='lg'
              className='text-base h-auto px-8 py-3 rounded-xl'
              onClick={scrollToFAQ}
            >
              {t('ctaButton1')}
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='text-base h-auto px-8 py-3 rounded-xl'
              onClick={scrollToFAQ}
            >
              {t('ctaButton2')}
            </Button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className='hidden lg:flex gap-8 items-center w-full'>
          {/* Left Content */}
          <div className='flex-1'>
            {/* Type Badge */}
            <div className='inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-8 py-2 mb-6 border border-[#023AA233]'>
              <div className='w-2 h-2 bg-accent rounded-full'></div>
              <span className='text-sm text-primary font-medium'>
                {t('badge')}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className='text-4xl lg:text-5xl font-display font-normal leading-tight mb-8'>
              {t('heading')} <span className='text-accent'>{t('headingAccent')}</span>
            </h1>

            {/* CTA Buttons */}
            <div className='flex gap-4'>
              <Button
                size='lg'
                className='text-lg h-auto px-9.5 py-4'
                onClick={scrollToFAQ}
              >
                {t('ctaButton1')}
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='text-lg h-auto px-9.5 py-4'
                onClick={scrollToFAQ}
              >
                {t('ctaButton2')}
              </Button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className='flex-1 flex justify-end'>
            <div className='relative right-8'>
              <Image
                src='/images/homepage/banner.png'
                width={692}
                height={485}
                alt='FAQ banner'
              />

              {/* Blue decorative div - behind image */}
              <div
                className='absolute w-24 h-24 bg-primary border border-gray-200 rounded-2xl -z-10'
                style={{
                  top: '-12px',
                  right: '12px',
                  boxShadow:
                    '0px 20px 25px 0px #0000001A, 0px 8px 10px 0px #0000001A',
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
