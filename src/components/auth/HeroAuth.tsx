'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function HeroAuth() {
  const t = useTranslations('auth.hero');

  return (
    <section className='relative pt-28 md:pt-[168px] pb-16 md:pb-56'>
      {/* Background div with gradient and blur */}
      <div className='absolute inset-0 w-full h-full -z-10 blur-[66.5px] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4]' />

      {/* Content */}
      <div className='custom-container relative z-10 h-full px-4'>
        {/* Mobile/Tablet Layout */}
        <div className='lg:hidden pb-6'>
          {/* Main Heading - Left aligned */}
          <h1 className='text-3xl font-display font-normal leading-tight mb-4 text-left'>
            {t('heading')}
          </h1>

          {/* Description */}
          <p className='text-lg md:text-xl leading-7 text-[#555555E5] mb-6'>
            {t('description')}
          </p>

          {/* Image - Right aligned */}
          <div className='flex justify-end mb-6'>
            <div className='relative w-[320px] max-w-full'>
              <Image
                src='/images/auth/auth-banner.png'
                width={592}
                height={384}
                alt='banner img'
                className='w-full h-auto rounded-2xl'
              />

              {/* Blue decorative div - behind image */}
              <div
                className='absolute w-16 h-16 md:w-20 md:h-20 bg-accent border border-gray-200 rounded-2xl -z-10'
                style={{
                  top: '-12px',
                  left: '-12px',
                  boxShadow:
                    '0px 20px 25px 0px #0000001A, 0px 8px 10px 0px #0000001A',
                }}
              ></div>
              {/* Green decorative div - behind image */}
              <div
                className='absolute w-16 h-16 md:w-20 md:h-20 bg-primary border border-gray-200 rounded-2xl -z-10'
                style={{
                  bottom: '-8px',
                  right: '-8px',
                  boxShadow:
                    '0px 20px 25px 0px #0000001A, 0px 8px 10px 0px #0000001A',
                }}
              ></div>
            </div>
          </div>

          {/* CTA Button - Below image, centered */}
          <div className='flex justify-center'>
            <Link href='/auth/login'>
              <Button
                className='text-base md:text-lg w-auto py-3 md:py-5 px-5 md:px-6 flex items-center font-semibold rounded-2xl gap-2'
                style={{
                  boxShadow:
                    '0px 10px 15px 0px #0000001A, 0px 4px 6px 0px #0000001A',
                }}
                size={null}
              >
                {t('ctaButton')}
                <ArrowRight className='font-bold text-base md:text-lg' size={24} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className='hidden lg:flex gap-8 items-center w-full'>
          {/* Left Content */}
          <div className='flex-1'>
            {/* Main Heading */}
            <h1 className='text-4xl lg:text-5xl font-display font-normal leading-tight mb-6'>
              {t('heading')}
            </h1>

            <p className='text-2xl leading-7 text-[#555555E5] mb-8'>
              {t('description')}
            </p>

            {/* CTA Button */}
            <Link href='/auth/login'>
              <Button
                className='text-lg w-auto py-5 px-6 flex items-center font-semibold rounded-2xl gap-2'
                style={{
                  boxShadow:
                    '0px 10px 15px 0px #0000001A, 0px 4px 6px 0px #0000001A',
                }}
                size={null}
              >
                {t('ctaButton')}
                <ArrowRight className='font-bold text-lg' size={45} />
              </Button>
            </Link>
          </div>

          {/* Right Content - Image Space */}
          <div className='flex-1 flex justify-end'>
            <div className='relative right-8'>
              {/* Placeholder for image */}
              <Image
                src='/images/auth/auth-banner.png'
                width={592}
                height={384}
                alt='banner img'
              />

              {/* Blue decorative div - behind image */}
              <div
                className='absolute w-24 h-24 bg-accent border border-gray-200 rounded-2xl -z-10'
                style={{
                  top: '-20px',
                  left: '-22px',
                  boxShadow:
                    '0px 20px 25px 0px #0000001A, 0px 8px 10px 0px #0000001A',
                }}
              ></div>
              {/* Green decorative div - behind image */}
              <div
                className='absolute w-24 h-24 bg-primary border border-gray-200 rounded-2xl -z-10'
                style={{
                  bottom: '-12px',
                  right: '-12px',
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
