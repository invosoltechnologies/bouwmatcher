'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProjectForm from "./ProjectForm";
import Pill from "@/components/ui/pill";
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('homepage.hero');

  const scrollToProcess = () => {
    const processSection = document.getElementById('process-section');
    if (processSection) {
      processSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className='relative min-h-screen pt-32 md:pt-[168px]'>
      {/* Background div with gradient and blur */}
      <div className='absolute inset-0 w-full h-full -z-10 blur-[66.5px] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4]' />

      {/* Content */}
      <div className='custom-container relative z-10 h-full px-4'>
        {/* Mobile/Tablet Layout */}
        <div className='lg:hidden pb-6'>
          {/* Trust Pill - Centered */}
          <div className='flex justify-center mb-4'>
            <div className='inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-[#023AA233]'>
              <div className='w-1.5 h-1.5 bg-accent rounded-full'></div>
              <span className='text-sm text-primary font-medium'>
                {t('trustPill')}
              </span>
            </div>
          </div>

          {/* Main Heading - Left aligned */}
          <h1 className='text-3xl font-display font-normal leading-tight mb-6 text-left'>
            {t('heading')}{' '}
            <span className='text-accent'>{t('headingAccent')}</span>
          </h1>

          {/* Image - Right aligned */}
          <div className='flex justify-end mb-6'>
            <div className='relative w-[320px] max-w-full'>
              <Image
                src='/images/homepage/banner.png'
                width={692}
                height={485}
                alt='banner img'
                className='w-full h-auto rounded-2xl'
              />

              {/* Bottom left pill on image */}
              <div className='absolute bottom-2 left-2'>
                <Pill
                  className='bg-white/90 px-2 py-1 text-[10px]'
                  style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
                  text={t('availability')}
                  dotColor='#0AB27E'
                />
              </div>
            </div>
          </div>

          {/* CTA Button - Below image, centered */}
          <div className='flex justify-center'>
            <Button onClick={scrollToProcess} size='lg' className='text-base h-auto px-8 py-3 rounded-xl'>
              {t('ctaButton')}
            </Button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className='hidden lg:flex gap-8 items-center w-full'>
          {/* Left Content */}
          <div className='flex-1'>
            {/* Trust Pill */}
            <div className='inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-8 py-2 mb-6 border border-[#023AA233]'>
              <div className='w-2 h-2 bg-accent rounded-full'></div>
              <span className='text-sm text-primary font-medium'>
                {t('trustPill')}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className='text-4xl lg:text-5xl font-display font-normal leading-tight mb-8'>
              {t('heading')}
              <br />
              {t('heading').split(' ').slice(-1)[0]} <span className='text-accent'>{t('headingAccent')}</span>
            </h1>

            {/* CTA Button */}
            <Button onClick={scrollToProcess} size='lg' className='text-lg h-auto px-9.5 py-4'>
              {t('ctaButton')}
            </Button>
          </div>

          {/* Right Content - Image Space */}
          <div className='flex-1 flex justify-end'>
            <div className='relative right-8'>
              {/* Placeholder for image */}
              <Image
                src='/images/homepage/banner.png'
                width={692}
                height={485}
                alt='banner img'
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

              {/* Bottom right pill */}
              <div className='absolute bottom-10 left-4'>
                <Pill
                  className='bg-white/80 p-4 pr-5'
                  style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
                  text={t('availability')}
                  dotColor='#0AB27E'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project Form */}
        <div id="project-form" className='mt-8 md:mt-16'>
          <ProjectForm mode='home' />
        </div>

        {/* Trust Pills - Scrollable on mobile, grid on desktop */}
        <div className='mt-8 md:mt-16 mb-6.5'>
          {/* Mobile: Horizontal scroll */}
          <div className='md:hidden px-8 overflow-x-auto scrollbar-hide'>
            <div className='flex gap-4 pb-2'>
              <Pill
                className='min-w-[264px] h-[52px] flex-shrink-0'
                style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
                text={t('values.honesty')}
                dotColor='#0AB27E'
              />
              <Pill
                className='min-w-[264px] h-[52px] flex-shrink-0'
                style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
                text={t('values.transparency')}
                dotColor='#0AB27E'
              />
              <Pill
                className='min-w-[264px] h-[52px] flex-shrink-0'
                style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
                text={t('values.goalOriented')}
                dotColor='#0AB27E'
              />
              <Pill
                className='min-w-[264px] h-[52px] flex-shrink-0'
                style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
                text={t('values.noFalsePromises')}
                dotColor='#0AB27E'
              />
            </div>
          </div>

          {/* Desktop: Centered grid */}
          <div className='hidden md:flex flex-wrap justify-center gap-4'>
            <Pill
              className='w-[264px] h-[52px]'
              style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
              text={t('values.honesty')}
              dotColor='#0AB27E'
            />
            <Pill
              className='w-[264px] h-[52px]'
              style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
              text={t('values.transparency')}
              dotColor='#0AB27E'
            />
            <Pill
              className='w-[264px] h-[52px]'
              style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
              text={t('values.goalOriented')}
              dotColor='#0AB27E'
            />
            <Pill
              className='w-[264px] h-[52px]'
              style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
              text={t('values.noFalsePromises')}
              dotColor='#0AB27E'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
