'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Pill from "@/components/ui/pill";
import { ArrowDown } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function HeroContact() {
  const t = useTranslations('contact.hero');

  const scrollToContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className='pt-30 md:pt-[168px] pb-56 relative'>
      {/* Background div with gradient and blur */}
      <div className='absolute inset-0 w-full h-full -z-10 blur-[66.5px] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4]' />

      {/* Content */}
      <div className='custom-container relative z-10 h-full'>
        <div className='flex flex-col lg:flex-row gap-8 items-start lg:items-center w-full'>
          {/* Left Content */}
          <div className='flex-1 w-full'>
            {/* Feature Pills - Moved above heading on mobile */}

            {/* Main Heading */}
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-display font-normal leading-tight mb-4 md:mb-6 mt-4 md:mt-0'>
              {t('heading')}{' '}
              <span className='text-accent'>{t('headingAccent')} </span>
              {t('headingSuffix')}
            </h1>

            <p className='text-base md:text-2xl leading-7 text-[#555555E5] mb-8 md:mb-8'>
              {t('description')}
            </p>
            <div className='flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-8'>
              <div
                className='flex items-center gap-2 bg-white rounded-full px-4 md:px-6 py-2 md:py-3 border border-gray-200'
                style={{
                  boxShadow:
                    '0px 10px 15px 0px #0000000D, 0px 4px 6px 0px #0000000D',
                }}
              >
                <Image
                  src='/icons/clock-icon.svg'
                  width={16}
                  height={16}
                  alt='Date'
                  className='-mt-0.5 w-3 h-3 md:w-4 md:h-4'
                />
                <span className='text-xs md:text-sm font-semibold text-primary'>
                  {t('pillResponse')}
                </span>
              </div>
              <div
                className='flex items-center gap-2 bg-white rounded-full px-3 md:px-4 py-2 border border-gray-200'
                style={{
                  boxShadow:
                    '0px 10px 15px 0px #0000000D, 0px 4px 6px 0px #0000000D',
                }}
              >
                <Image
                  src='/icons/shield.svg'
                  width={16}
                  height={16}
                  alt='Shield'
                  className='-mt-0.5 w-3 h-3 md:w-4 md:h-4'
                />
                <span className='text-xs md:text-sm font-semibold text-primary'>
                  {t('pillSecurity')}
                </span>
              </div>
              <div
                className='flex items-center gap-2 bg-white rounded-full px-3 md:px-4 py-2 border border-gray-200'
                style={{
                  boxShadow:
                    '0px 10px 15px 0px #0000000D, 0px 4px 6px 0px #0000000D',
                }}
              >
                <Image
                  src='/icons/globe.svg'
                  width={16}
                  height={16}
                  alt='Globe'
                  className='-mt-0.5 w-3 h-3 md:w-4 md:h-4'
                />
                <span className='text-xs md:text-sm font-semibold text-primary'>
                  {t('pillLanguage')}
                </span>
              </div>
            </div>
            {/* CTA Button - Desktop only */}
            <Button
              onClick={scrollToContactForm}
              size={null}
              className='hidden md:flex text-lg h-auto px-10 py-4 items-center font-semibold rounded-2xl gap-2'
              style={{
                boxShadow:
                  '0px 10px 15px 0px #0000001A, 0px 4px 6px 0px #0000001A',
              }}
            >
              <span>{t('ctaButton')}</span>
              <ArrowDown className='font-semibold text-lg' />
            </Button>
          </div>

          {/* Right Content - Image Space */}
          <div className='flex-1 flex flex-col justify-center lg:justify-end w-full mt-0 lg:mt-0'>
            <div className='relative right-0 lg:right-8 w-full max-w-md lg:max-w-none'>
              {/* Placeholder for image */}
              <Image
                src='/images/contact/contact-hero.png'
                width={692}
                height={485}
                alt='banner img'
                className='w-full h-auto object-contain'
              />

              {/* Blue decorative div - behind image */}
              <div
                className='absolute w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-primary border border-gray-200 rounded-2xl -z-10'
                style={{
                  top: '5px',
                  left: '15px',
                  boxShadow:
                    '0px 20px 25px 0px #0000001A, 0px 8px 10px 0px #0000001A',
                }}
              ></div>
              {/* Green decorative div - behind image */}
              <div
                className='absolute w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-accent border border-gray-200 rounded-2xl -z-10'
                style={{
                  bottom: '35px',
                  right: '15px',
                  boxShadow:
                    '0px 20px 25px 0px #0000001A, 0px 8px 10px 0px #0000001A',
                }}
              ></div>

              {/* Bottom right pill */}
              <div className='absolute bottom-6 md:bottom-10 left-2 md:left-4'>
                <Pill
                  className='bg-white/80 p-3 pr-4 md:p-4 md:pr-5 text-xs md:text-sm'
                  style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
                  text={t('availability')}
                  dotColor='#0AB27E'
                />
              </div>
            </div>

            {/* CTA Button - Mobile only, below image */}
            <Button
              onClick={scrollToContactForm}
              size={null}
              className='md:hidden flex text-base h-auto px-8 py-3 items-center justify-center font-semibold rounded-2xl gap-2 mt-8 w-full'
              style={{
                boxShadow:
                  '0px 10px 15px 0px #0000001A, 0px 4px 6px 0px #0000001A',
              }}
            >
              <span>{t('ctaButton')}</span>
              <ArrowDown className='font-semibold text-base' />
            </Button>
          </div>
        </div>
      </div>
      {/* <div className='bg-white w-full h-14'></div> */}
    </section>
  );
}