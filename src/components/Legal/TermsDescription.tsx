'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function TermsDescription() {
  const t = useTranslations('legal.terms');

  return (
    <section className='py-8 md:py-16'>
      <div className='custom-container'>
        <div className='space-y-8 md:space-y-12'>
          {/* 1. Definities / Definitions */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section1Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section1Intro')}
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
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section1List7')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section1List8')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section1List9')}
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section1Outro')}
              </p>
            </div>
          </div>

          {/* 2. Voorwerp van het contract / Subject of the Contract */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section2Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section2Para1')}
              </p>
            </div>
          </div>

          {/* 3. Inschrijving en accountbeheer / Registration and Account Management */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section3Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <ul className='space-y-2 md:space-y-3 pl-8 md:pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section3List1')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section3List2')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section3List3')}
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section3Para1')}
              </p>
            </div>
          </div>

          {/* 4. Verplichtingen van Gebruikers / Obligations of Users */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section4Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section4Intro')}
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
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section4Para1')}
              </p>
            </div>
          </div>

          {/* 5. Verplichtingen van Leveranciers / Obligations of Suppliers */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section5Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section5Intro')}
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
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section5List4')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section5List5')}
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section5Para1')}
              </p>
            </div>
          </div>

          {/* 6. Vergoeding en betaling / Fees and Payment */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section6Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <ul className='space-y-2 md:space-y-3 pl-8 md:pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section6List1')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section6List2')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section6List3')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section6List4')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section6List5')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section6List6')}
                </li>
              </ul>
            </div>
          </div>

          {/* 7. Protesten en retourbeleid / Complaints and Return Policy */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section7Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section7Para1')}
              </p>
              <ul className='space-y-2 md:space-y-3 pl-8 md:pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section7List1')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section7List2')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section7List3')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section7List4')}
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section7Para2')}
              </p>
            </div>
          </div>

          {/* 8. Reviews en feedback / Reviews and Feedback */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section8Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <ul className='space-y-2 md:space-y-3 pl-8 md:pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section8List1')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section8List2')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section8List3')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section8List4')}
                </li>
              </ul>
            </div>
          </div>

          {/* 9. Intellectueel eigendom / Intellectual Property */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section9Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <ul className='space-y-2 md:space-y-3 pl-8 md:pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section9List1')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section9List2')}
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section9Para1')}
              </p>
            </div>
          </div>

          {/* 10. Aansprakelijkheid / Liability */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section10Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <ul className='space-y-2 md:space-y-3 pl-8 md:pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section10List1')}
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl list-disc'>
                  {t('section10List2')}
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section10Para1')}
              </p>
            </div>
          </div>

          {/* 11. Overmacht / Force Majeure */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section11Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section11Para1')}
              </p>
            </div>
          </div>

          {/* 12. Duur, opschorting en beëindiging / Duration, Suspension, and Termination */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section12Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
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
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section12Para1')}
              </p>
            </div>
          </div>

          {/* 13. Bescherming van persoonsgegevens / Protection of Personal Data */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section13Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section13Para1')}
              </p>
            </div>
          </div>

          {/* 14. Wijzigingen van de voorwaarden / Amendments to the Terms */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section14Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section14Para1')}
              </p>
            </div>
          </div>

          {/* 15. Toepasselijk recht en bevoegde rechtbank / Governing Law and Jurisdiction */}
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

          {/* 16. Contactgegevens / Contact Details */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section16Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <div className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                <p className='mb-2'>Bouwmatcher BV</p>
                <p className='mb-2'>Philipsite 5 bus 1</p>
                <p className='mb-2'>3001 Leuven, België</p>
                <p className='mb-2'>
                  E-mail:{' '}
                  <Link
                    href='mailto:support@bouwmatcher.com'
                    className='text-muted-foreground underline hover:text-primary'
                  >
                    support@bouwmatcher.com
                  </Link>
                </p>
                <p>
                  Website:{' '}
                  <Link
                    href='/contact'
                    className='text-muted-foreground underline hover:text-primary'
                  >
                    www.bouwmatcher.com/contact
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
