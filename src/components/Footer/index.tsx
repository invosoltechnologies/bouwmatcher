'use client';
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('common.footer');
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='custom-container pt-8 md:pt-16 pb-6 md:pb-8 flex flex-col gap-8 md:gap-16'>
        <div className='flex flex-col lg:flex-row gap-8 md:gap-12'>
          {/* Logo and Description */}
          <div className='flex-4'>
            <Link href='/' className='flex items-center mb-4 md:mb-6'>
              <Image
                src='/images/logo.svg'
                alt='Bouw Matcher'
                width={186}
                height={79}
                className='w-[140px] h-[59px] md:w-[186px] md:h-[79px] brightness-0 invert'
              />
            </Link>
            <p className='text-white text-sm md:text-xl font-light leading-relaxed max-w-sm'>
              {t('description')}
            </p>
          </div>

          {/* Help Section */}
          <div className='flex-1'>
            <h3 className='text-white text-base md:text-xl font-medium mb-4 md:mb-6'>{t('helpTitle')}</h3>
            <div className='space-y-3 md:space-y-4'>
              <Link
                href='/blog'
                className='block text-white text-sm md:text-base font-light hover:text-white hover:underline transition-colors'
              >
                {t('news')}
              </Link>
              <Link
                href='/veelgestelde-vragen'
                className='block text-white text-sm md:text-base font-light hover:text-white hover:underline transition-colors'
              >
                {t('faq')}
              </Link>
              <Link
                href='/contact'
                className='block text-white text-sm md:text-base font-light hover:text-white hover:underline transition-colors'
              >
                {t('contact')}
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className='flex-1'>
            <h3 className='text-white text-base md:text-xl font-medium mb-4 md:mb-6'>{t('contactTitle')}</h3>
            <div className='space-y-3 md:space-y-4'>
              <div className='flex items-center gap-3'>
                <Image
                  src='/icons/phone.svg'
                  alt='Phone'
                  width={16}
                  height={16}
                  className='w-4 h-4 brightness-0 invert flex-shrink-0'
                />
                <span className='text-white text-sm md:text-base font-light'>{t('phone')}</span>
              </div>
              <div className='flex items-center gap-3'>
                <Image
                  src='/icons/whatsapp.svg'
                  alt='WhatsApp'
                  width={16}
                  height={16}
                  className='w-4 h-4 brightness-0 invert flex-shrink-0'
                />
                <Link
                  href='https://wa.me/32491115949'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white text-sm md:text-base font-light hover:text-white hover:underline transition-colors'
                >
                  {t('phone')}
                </Link>
              </div>
              <div className='flex items-center gap-3'>
                <Image
                  src='/icons/mail.svg'
                  alt='Email'
                  width={16}
                  height={16}
                  className='w-4 h-4 brightness-0 invert flex-shrink-0'
                />
                <Link
                  href='mailto:support@bouwmatcher.com'
                  className='text-white text-sm md:text-base font-light hover:text-white hover:underline transition-colors break-all'
                >
                  {t('email')}
                </Link>
              </div>
              <div className='flex items-start gap-3'>
                <Image
                  src='/icons/map.svg'
                  alt='Location'
                  width={16}
                  height={16}
                  className='w-4 h-4 brightness-0 invert mt-1 flex-shrink-0'
                />
                <div className='text-white text-sm md:text-base font-light'>
                  <div>{t('addressLine1')}</div>
                  <div>{t('addressLine2')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Socials Section */}
          <div className='flex-1'>
            <h3 className='text-white text-base md:text-xl font-medium mb-4 md:mb-6'>{t('socialsTitle')}</h3>
            <div className='space-y-3 md:space-y-4'>
              <Link
                href='#'
                className='flex items-center gap-3 text-white text-sm md:text-base font-light hover:text-white hover:underline transition-colors'
              >
                <Image
                  src='/icons/facebook.svg'
                  alt='Facebook'
                  width={16}
                  height={16}
                  className='w-4 h-4 brightness-0 invert'
                />
                <span>{t('facebook')}</span>
              </Link>
              <Link
                href='#'
                className='flex items-center gap-3 text-white text-sm md:text-base font-light hover:text-white hover:underline transition-colors'
              >
                <Image
                  src='/icons/instagram.svg'
                  alt='Instagram'
                  width={16}
                  height={16}
                  className='w-4 h-4 brightness-0 invert'
                />
                <span>{t('instagram')}</span>
              </Link>
              <Link
                href='#'
                className='flex items-center gap-3 text-white text-sm md:text-base font-light hover:text-white hover:underline transition-colors'
              >
                <Image
                  src='/icons/linkdin.svg'
                  alt='LinkedIn'
                  width={16}
                  height={16}
                  className='w-4 h-4 brightness-0 invert'
                />
                <span>{t('linkedin')}</span>
              </Link>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className='border-t border-gray-800 pt-6'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs md:text-sm text-white'>
            <div className='text-center md:text-left w-full md:w-auto'>{t('copyright')}</div>
            <div className='flex md:flex-row justify-center items-center gap-3 md:gap-6 w-full md:w-auto text-center md:text-left'>
              <Link
                href='/privacy-policy'
                className='hover:text-white hover:underline transition-colors'
              >
                {t('privacy')}
              </Link>
              <Link
                href='/terms-conditions'
                className='hover:text-white hover:underline transition-colors'
              >
                {t('terms')}
              </Link>
              <Link
                href='/cookie-policy'
                className='hover:text-white hover:underline transition-colors'
              >
                {t('cookies')}
              </Link>
              <Link
                href='/disclaimer'
                className='hover:text-white hover:underline transition-colors'
              >
                {t('disclaimer')}
              </Link>
              <span className='hidden md:inline'>{t('companyNumber')}</span>
            </div>
            <div className='text-center w-full md:hidden text-xs mt-2'>
              {t('companyNumber')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}