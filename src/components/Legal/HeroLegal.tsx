'use client';

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import Pill from "@/components/ui/pill";
import { Cookie, FileWarning } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export default function HeroLegal() {
  const t = useTranslations('legal.hero');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  // Determine which page we're on
  const isPrivacyPage = pathname.includes('/privacy-policy');
  const isTermsPage = pathname.includes('/terms');
  const isCookiesPage = pathname.includes('/cookies-policy');
  const isDisclaimerPage = pathname.includes('/disclaimer');

  // Get dynamic heading and description based on current page
  const getPageContent = () => {
    if (isPrivacyPage) {
      return {
        heading: t('privacyHeading'),
        description: t('privacyDescription')
      };
    }
    if (isTermsPage) {
      return {
        heading: t('termsHeading'),
        description: t('termsDescription')
      };
    }
    if (isCookiesPage) {
      return {
        heading: t('cookiesHeading'),
        description: t('cookiesDescription')
      };
    }
    if (isDisclaimerPage) {
      return {
        heading: t('disclaimerHeading'),
        description: t('disclaimerDescription')
      };
    }
    // Default to Legal Center
    return {
      heading: t('heading'),
      description: t('description')
    };
  };

  const { heading, description } = getPageContent();

  return (
    <section className='pt-30 md:pt-[168px] pb-20 md:pb-48 relative'>
      {/* Background div with gradient and blur */}
      <div className='absolute inset-0 w-full h-full -z-10 blur-[66.5px] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4]' />

      {/* Content */}
      <div className='custom-container relative z-10 h-full'>
        <div className='flex flex-col lg:flex-row gap-8 items-start lg:items-center w-full'>
          {/* Left Content */}
          <div className='flex-1 w-full'>
            {/* Version and Last Updated Pills */}
            <div className='flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6'>
              <div className='bg-primary text-white font-montserrat rounded-full px-3 md:px-4 py-1.5 md:py-2'>
                <span className='text-xs md:text-sm font-extrabold'>{t('version')}</span>
              </div>
              <div className='bg-emerald-100 border border-accent/55 font-montserrat text-emerald-700 rounded-full px-3 md:px-4 py-1.5 md:py-2'>
                <span className='text-xs md:text-sm'>{t('lastUpdated')}</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-display font-normal leading-tight mb-4 md:mb-6'>
              {heading}
            </h1>

            <p className='text-base md:text-2xl leading-relaxed text-[#555555E5] mb-6 md:mb-8'>
              {description}
            </p>

            {/* Language Selection */}
            <div className='flex items-center gap-2 mb-6 md:mb-8'>
              <span className='text-gray-700 text-sm md:text-base mr-2'>{t('language')}</span>
              <Button
                variant={locale === 'en' ? 'default' : 'outline'}
                size='sm'
                className='px-2 md:px-3 py-1 h-auto text-xs md:text-sm'
                onClick={() => handleLanguageChange('en')}
              >
                {t('languageEN')}
              </Button>
              <Button
                variant={locale === 'nl' ? 'default' : 'outline'}
                size='sm'
                className='px-2 md:px-3 py-1 h-auto text-xs md:text-sm'
                onClick={() => handleLanguageChange('nl')}
              >
                {t('languageNL')}
              </Button>
            </div>

            {/* Legal Policy Buttons */}
            <div className='flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8'>
              {/* Privacy Policy Button - Hidden on privacy page */}
              {!isPrivacyPage && (
                <Link href='/privacy-policy'>
                  <Button className='flex items-center gap-1.5 md:gap-2 text-sm md:text-lg rounded-xl md:rounded-2xl px-3 md:px-4 md:py-5 py-2 h-auto text-white font-medium'>
                    <Image
                      src='/icons/shield.svg'
                      width={15}
                      height={15}
                      alt='Privacy Policy'
                      className='filter brightness-0 invert w-3 h-3 md:w-4 md:h-4'
                    />
                    <span>{t('privacyButton')}</span>
                  </Button>
                </Link>
              )}

              {/* Terms & Conditions Button - Hidden on terms page */}
              {!isTermsPage && (
                <Link href='/terms'>
                  <Button className='flex items-center gap-1.5 md:gap-2 text-sm md:text-lg rounded-xl md:rounded-2xl px-3 md:px-4 py-2 md:py-5 h-auto bg-accent hover:bg-accent/90 text-white font-medium'>
                    <Image
                      src='/icons/agreement-document.svg'
                      width={15}
                      height={15}
                      alt='Terms & Conditions'
                      className='filter brightness-0 invert w-3 h-3 md:w-4 md:h-4'
                    />
                    <span>{t('termsButton')}</span>
                  </Button>
                </Link>
              )}

              {/* Cookies Policy Button - Hidden on cookies page */}
              {!isCookiesPage && (
                <Link href='/cookies-policy'>
                  <Button className='flex items-center gap-1.5 md:gap-2 text-sm md:text-lg rounded-xl md:rounded-2xl px-3 md:px-4 py-2 md:py-5 h-auto text-white font-medium'   >
                    <Cookie className='w-3 h-3 md:w-4 md:h-4' />
                    <span>{t('cookiesButton')}</span>
                  </Button>
                </Link>
              )}

              {/* Disclaimer Button - Hidden on disclaimer page */}
              {!isDisclaimerPage && (
                <Link href='/disclaimer'>
                  <Button className='flex items-center gap-1.5 md:gap-2 text-sm md:text-lg rounded-xl md:rounded-2xl px-3 md:px-4 py-2 md:py-5 h-auto text-white font-medium'>
                    <FileWarning className='w-3 h-3 md:w-4 md:h-4' />
                    <span>{t('disclaimerButton')}</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Right Content - Image Space */}
          <div className='flex-1 flex flex-col justify-center lg:justify-end w-full mt-0 lg:mt-0'>
            <div className='relative right-0 lg:-right-12 w-full max-w-md lg:max-w-none'>
              {/* Placeholder for image */}
              <Image
                src='/images/legal/legal-banner.png'
                width={692}
                height={485}
                alt='banner img'
                className='w-full h-auto object-contain'
              />

              {/* Blue decorative div - behind image */}
              <div
                className='absolute w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-accent border border-gray-200 rounded-2xl -z-10'
                style={{
                  top: '-15px',
                  left: '-15px',
                  boxShadow:
                    '0px 20px 25px 0px #0000001A, 0px 8px 10px 0px #0000001A',
                }}
              ></div>
              {/* Green decorative div - behind image */}
              <div
                className='absolute w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-accent border border-gray-200 rounded-2xl -z-10'
                style={{
                  bottom: '-13px',
                  right: '-16px',
                  boxShadow:
                    '0px 20px 25px 0px #0000001A, 0px 8px 10px 0px #0000001A',
                }}
              ></div>

              {/* Bottom right pill */}
              <div className='absolute z-10 -left-2 md:-left-5 -bottom-4 md:-bottom-7'>
                <Pill
                  className='bg-white/60 p-3 pr-4 md:p-4 md:pr-5 text-xs md:text-sm'
                  style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
                  text={t('privacyFirstPill')}
                  dotColor='#0AB27E'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='bg-white w-full h-14'></div> */}
    </section>
  );
}