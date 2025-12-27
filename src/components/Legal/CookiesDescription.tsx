'use client';

import { useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function CookiesDescription() {
  const t = useTranslations('legal.cookies');

  // Cookie table rows - each is an array of [name, type, provider, purpose, retention]
  const cookieRows = [
    ['PHPSESSID', 'Functioneel', 'Bouwmatcher', 'Houdt sessie-informatie bij zodat formulieren werken.', 'Sessie'],
    ['CookieConsent', 'Functioneel', 'Bouwmatcher', 'Onthoudt jouw cookie-instellingen.', '1 jaar'],
    ['_ga', 'Analytisch', 'Google Analytics', 'Analyseert bezoekersgedrag en websitegebruik.', '2 jaar'],
    ['_gid', 'Analytisch', 'Google Analytics', 'Analyseert bezoekersgedrag en websitegebruik.', '24 uur'],
    ['_fbp', 'Marketing', 'Facebook / Meta', 'Houdt bij welke pagina\'s je bezoekt voor statistieken.', '3 maanden'],
    ['fr', 'Marketing', 'Facebook / Meta', 'Toont relevante advertenties op Facebook & Instagram.', '3 maanden'],
    ['li_sugr', 'Marketing', 'LinkedIn', 'Browser-ID cookie voor LinkedIn Ads.', '90 dagen'],
    ['bcookie', 'Marketing', 'LinkedIn', 'Gebruikt voor advertentietargeting.', '1 jaar'],
    ['_uetvid', 'Marketing', 'Microsoft Ads', 'Helpt advertenties af te stemmen op jouw interesses.', '13 maanden'],
  ];

  return (
    <section className='py-8 md:py-16'>
      <div className='custom-container'>
        <div className='space-y-8 md:space-y-12'>
          {/* 1. Wat zijn cookies? */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section1Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section1Para1')}
              </p>
            </div>
          </div>

          {/* 2. Welke cookies gebruiken wij? */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-2xl font-medium text-foreground mb-10'>
              {t('section2Title')}
            </h2>
            <div className='space-y-6 md:space-y-8'>
              <h3 className='text-xl md:text-2xl font-medium text-foreground'>
                {t('section2p1Title')}
              </h3>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section2p1Para1')}
              </p>

              <h3 className='text-xl md:text-2xl font-medium text-foreground'>
                {t('section2p2Title')}
              </h3>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section2p2Para1')}
              </p>

              <h3 className='text-xl md:text-2xl font-medium text-foreground'>
                {t('section2p3Title')}
              </h3>
              <p className='text-muted-foreground font-normal leading-relaxed text-lg md:text-2xl'>
                {t('section2p3Para1')}
              </p>
            </div>
          </div>

          {/* 3. Overzicht van gebruikte cookies */}
          <div className='space-y-4 md:space-y-6'>
            <h2 className='text-xl md:text-2xl font-medium text-foreground'>
              {t('section3Title')}
            </h2>
            <div className='space-y-3 md:space-y-4'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='text-foreground font-medium text-base md:text-xl'>Cookie</TableHead>
                    <TableHead className='text-foreground font-medium text-base md:text-xl'>Type</TableHead>
                    <TableHead className='text-foreground font-medium text-base md:text-xl'>Uitgever / Provider</TableHead>
                    <TableHead className='text-foreground font-medium text-base md:text-xl'>Doel / Functie</TableHead>
                    <TableHead className='text-foreground font-medium text-base md:text-xl'>Bewaartermijn</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cookieRows.map((row: string[], index: number) => (
                    <TableRow key={index}>
                      {row.map((cell: string, cellIndex: number) => (
                        <TableCell
                          key={cellIndex}
                          className='text-muted-foreground text-sm md:text-lg'
                        >
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl mt-6'>
                {t('section3Para1')}
              </p>
            </div>
          </div>

          {/* 4. Cookies beheren of verwijderen */}
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
            </div>
          </div>

          {/* 5. Wijzigingen */}
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
