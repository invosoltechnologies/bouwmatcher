'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function DisclaimerDescription() {
  const t = useTranslations('legal.disclaimer');

  return (
    <section className='py-8 md:py-16'>
      <div className='custom-container'>
        <div className='space-y-8 md:space-y-12'>
          {/* 1. Juistheid van informatie / Accuracy of Information */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section1Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section1Para1')}
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section1Para2')}{' '}
                <Link
                  href='mailto:support@bouwmatcher.be'
                  className='text-muted-foreground underline hover:text-primary'
                >
                  support@bouwmatcher.be
                </Link>
                .
              </p>
            </div>
          </div>

          {/* 2. Bemiddelende rol / Intermediary Role */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section2Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section2Para1')}
              </p>
              <ul className='space-y-2 md:space-y-3 pl-8 md:pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section2List1')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section2List2')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section2List3')}
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section2Para2')}
              </p>
            </div>
          </div>

          {/* 3. Intellectueel eigendom / Intellectual Property */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section3Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section3Para1')}
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section3Para2')}
              </p>
            </div>
          </div>

          {/* 4. Gebruik van de website / Use of the Website */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section4Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section4Para1')}
              </p>
            </div>
          </div>

          {/* 5. Rechten voorbehouden / Rights Reserved */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section5Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section5Para1')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
