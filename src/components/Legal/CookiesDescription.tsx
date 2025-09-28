import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function CookiesDescription() {
  return (
    <section className='py-16'>
      <div className='custom-container'>
        <div className='space-y-12'>
          {/* 1. Wat zijn cookies? */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              1. Wat zijn cookies?
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Cookies zijn kleine tekstbestanden die door je browser op je computer, smartphone of tablet worden opgeslagen. Ze onthouden jouw voorkeuren, verzamelen informatie over het gebruik van de website en zorgen ervoor dat wij jou relevante inhoud en advertenties kunnen tonen.
              </p>
            </div>
          </div>

          {/* 2. Welke cookies gebruiken wij? */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground mb-10'>
              2. Welke cookies gebruiken wij?
            </h2>
            <div className='space-y-8'>
              <h3 className='text-2xl font-medium text-foreground'>
                2.1 Functionele cookies (altijd actief)
              </h3>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Deze cookies zijn noodzakelijk voor de werking van de website. Ze onthouden bijvoorbeeld jouw taalinstellingen en zorgen ervoor dat formulieren correct functioneren. Deze cookies zijn anoniem en kunnen niet worden uitgeschakeld.
              </p>

              <h3 className='text-2xl font-medium text-foreground'>
                2.2 Analytische cookies (opt-in)
              </h3>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Met analytische cookies meten we hoe onze website wordt gebruikt. Zo zien we welke pagina&apos;s populair zijn en waar bezoekers afhaken. Deze inzichten gebruiken wij om onze website continu te verbeteren.
              </p>

              <h3 className='text-2xl font-medium text-foreground'>
                2.3 Marketing- en personalisatiecookies (opt-in)
              </h3>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Deze cookies zorgen ervoor dat je advertenties en informatie te zien krijgt die aansluiten bij jouw interesses. Denk hierbij aan advertenties via Google, Facebook, LinkedIn en Microsoft Ads.
              </p>
            </div>
          </div>

          {/* 3. Overzicht van gebruikte cookies */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              3. Overzicht van gebruikte cookies
            </h2>
            <div className='space-y-4'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='text-foreground font-medium text-xl'>Cookie</TableHead>
                    <TableHead className='text-foreground font-medium text-xl'>Type</TableHead>
                    <TableHead className='text-foreground font-medium text-xl'>Uitgever</TableHead>
                    <TableHead className='text-foreground font-medium text-xl'>Doel / Functie</TableHead>
                    <TableHead className='text-foreground font-medium text-xl'>Bewaartermijn</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className='text-muted-foreground text-lg'>PHPSESSID</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Functioneel</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Bouwmatcher</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Houdt sessie-informatie bij zodat formulieren werken.</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Sessie</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='text-muted-foreground text-lg'>CookieConsent</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Functioneel</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Bouwmatcher</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Onthoudt jouw cookie-instellingen.</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>1 jaar</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='text-muted-foreground text-lg'>_ga</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Analytisch</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Google Analytics</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Analyseert bezoekersgedrag en websitegebruik.</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>2 jaar</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='text-muted-foreground text-lg'>_gid</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Analytisch</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Google Analytics</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Analyseert bezoekersgedrag en websitegebruik.</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>24 uur</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='text-muted-foreground text-lg'>_fbp</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Marketing</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Facebook / Meta</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Houdt bij welke pagina&apos;s je bezoekt voor statistieken.</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>3 maanden</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='text-muted-foreground text-lg'>fr</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Marketing</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Facebook / Meta</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Toont relevante advertenties op Facebook & Instagram.</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>3 maanden</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='text-muted-foreground text-lg'>li_sugr</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Marketing</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>LinkedIn</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Browser-ID cookie voor LinkedIn Ads.</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>90 dagen</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='text-muted-foreground text-lg'>bcookie</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Marketing</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>LinkedIn</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Gebruikt voor advertentietargeting.</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>1 jaar</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='text-muted-foreground text-lg'>_uetvid</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Marketing</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Microsoft Ads</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>Helpt advertenties af te stemmen op jouw interesses.</TableCell>
                    <TableCell className='text-muted-foreground text-lg'>13 maanden</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl mt-6'>
                Voor een volledig overzicht van alle cookies die wij gebruiken, kun je terecht in je cookievoorkeuren. Hier kun je ook je toestemming wijzigen of intrekken.
              </p>
            </div>
          </div>

          {/* 4. Cookies beheren of verwijderen */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              4. Cookies beheren of verwijderen
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Je kan je voorkeuren op elk moment aanpassen via de cookie-instellingen onderaan onze website.
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Daarnaast kan je cookies handmatig beheren, blokkeren of verwijderen via de instellingen van je internetbrowser (bijvoorbeeld Chrome, Safari, Firefox of Edge). Houd er rekening mee dat het uitschakelen van cookies de werking van de website kan beïnvloeden.
              </p>
            </div>
          </div>

          {/* 5. Wijzigingen */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              5. Wijzigingen
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Bouwmatcher kan dit Cookiebeleid aanpassen wanneer de gebruikte cookies of de toepasselijke wetgeving wijzigen. De meest recente versie is steeds beschikbaar op www.bouwmatcher.com.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
