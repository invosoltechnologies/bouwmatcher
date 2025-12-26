'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function PrivacyDescription() {
  const t = useTranslations('legal.privacy');

  return (
    <section className='py-8 md:py-16'>
      <div className='custom-container'>
        <div className='space-y-8 md:space-y-12'>
          {/* 1. Introductie */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section1Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section1Para1')}
              </p>
              <ul className='space-y-2 md:space-y-3 pl-8 md:pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section1List1')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section1List2')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section1List3')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section1List4')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section1List5')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section1List6')}
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section1Para2')}
              </p>
            </div>
          </div>

          {/* 2. Toepasselijkheid */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section2Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section2Para1')}
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section2Para2')}
              </p>
            </div>
          </div>

          {/* 3. Verwerkingsverantwoordelijke */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section3Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <div className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                <p className='mb-2'>Bouwmatcher BV</p>
                <p className='mb-2'>Philipsite 5 bus 1</p>
                <p className='mb-2'>3001 Leuven, België</p>
                <p className='mb-2'>{t('contactEmail')}: <Link href="mailto:support@bouwmatcher.com" className="text-muted-foreground underline hover:text-primary">support@bouwmatcher.com</Link></p>
                <p>{t('contactWebsite')}: <Link href="/contact" className="text-muted-foreground underline hover:text-primary">www.bouwmatcher.com/contact</Link></p>
              </div>
            </div>
          </div>

          {/* 4. Offerteaanvragen */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section4Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section4Para1')}
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section4Para2')}
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section4Para3')}
              </p>
              <ul className='space-y-2 md:space-y-3 pl-8 md:pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section4List1')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section4List2')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section4List3')}
                </li>
              </ul>
            </div>
          </div>

          {/* 5. Accounts */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section5Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section5Para1')}
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section5Para2')}
              </p>
              <ul className='space-y-2 md:space-y-3 pl-8 md:pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section5List1')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section5List2')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section5List3')}
                </li>
              </ul>
            </div>
          </div>

          {/* 6. Contactmomenten */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section6Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section6Para1')}
              </p>
            </div>
          </div>

          {/* 7. Nieuwsbrief & marketing */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section7Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section7Para1')}
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section7Para2')}
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section7Para3')}
              </p>
            </div>
          </div>

          {/* 8. Wettelijke verplichtingen & geschillen */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section8Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section8Para1')}
              </p>
            </div>
          </div>

          {/* 9. Cookies */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section9Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section9Para1')}
              </p>
            </div>
          </div>

          {/* 10. Geautomatiseerde besluitvorming */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section10Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section10Para1')}
              </p>
            </div>
          </div>

          {/* 11. Delen van gegevens */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section11Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section11Para1')}
              </p>
              <ul className='space-y-2 md:space-y-3 pl-8 md:pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section11List1')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section11List2')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section11List3')}
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section11Para2')}
              </p>
            </div>
          </div>

          {/* 12. Beveiliging van gegevens */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section12Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section12Para1')}
              </p>
              <ul className='space-y-2 md:space-y-3 pl-8 md:pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section12List1')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section12List2')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section12List3')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section12List4')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section12List5')}
                </li>
              </ul>
            </div>
          </div>

          {/* 13. Bewaartermijnen */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section13Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <ul className='space-y-2 md:space-y-3 pl-8 md:pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section13List1')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section13List2')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section13List3')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section13List4')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section13List5')}
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section13Para1')}
              </p>
            </div>
          </div>

          {/* 14. Jouw rechten */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section14Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section14Para1')}
              </p>
              <ul className='space-y-2 md:space-y-3 pl-8 md:pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section14List1')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section14List2')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section14List3')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section14List4')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section14List5')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section14List6')}
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section14Para2')}{' '}
                <Link href="mailto:support@bouwmatcher.com" className="text-muted-foreground underline hover:text-primary">support@bouwmatcher.com</Link>
                . {t('section14Para3')}
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section14Para4')}
              </p>
            </div>
          </div>

          {/* 15. Wijzigingen */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section15Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section15Para1')}
              </p>
            </div>
          </div>

          {/* 16. Contact */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section16Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <div className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                <p className='mb-2'>Bouwmatcher BV</p>
                <p className='mb-2'>Philipsite 5 bus 1</p>
                <p className='mb-2'>3001 Leuven, België</p>
                <p className='mb-2'>{t('contactEmail')}: <Link href="mailto:support@bouwmatcher.com" className="text-muted-foreground underline hover:text-primary">support@bouwmatcher.com</Link></p>
                <p>{t('contactWebsite')}: <Link href="/contact" className="text-muted-foreground underline hover:text-primary">www.bouwmatcher.com/contact</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
