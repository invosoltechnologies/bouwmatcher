import Link from 'next/link';

export default function DisclaimerDescription() {
  return (
    <section className='py-16'>
      <div className='custom-container'>
        <div className='space-y-12'>
          {/* 1. Juistheid van informatie */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              1. Juistheid van informatie
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Bouwmatcher besteedt de grootst mogelijke zorg aan de inhoud van deze website en streeft ernaar dat alle informatie correct, actueel en volledig is. Ondanks deze inspanningen kan Bouwmatcher niet garanderen dat er zich geen fouten of onvolledigheden voordoen.
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Bouwmatcher aanvaardt geen enkele aansprakelijkheid voor directe of indirecte schade die voortvloeit uit het gebruik van, of het vertrouwen op, de op deze website aangeboden informatie. Signaleer je een fout of onduidelijkheid, dan stellen wij het op prijs als je dit meldt via onze contactpagina of per e-mail: <Link href="mailto:support@bouwmatcher.com" className="text-muted-foreground underline hover:text-primary">support@bouwmatcher.com</Link>.
              </p>
            </div>
          </div>

          {/* 2. Bemiddelende rol */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              2. Bemiddelende rol
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Bouwmatcher fungeert uitsluitend als bemiddelingsplatform tussen Gebruikers en Leveranciers. Wij zijn geen partij bij overeenkomsten die rechtstreeks tussen hen tot stand komen en dragen geen verantwoordelijkheid voor:
              </p>
              <ul className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  de uitvoering van werkzaamheden;
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  de kwaliteit van de diensten;
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  de afspraken of contracten die buiten ons platform om worden gesloten.
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Alle verplichtingen en aansprakelijkheden uit dergelijke overeenkomsten liggen uitsluitend bij de betrokken partijen zelf.
              </p>
            </div>
          </div>

          {/* 3. Intellectueel eigendom */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              3. Intellectueel eigendom
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Alle inhoud van deze website, waaronder maar niet beperkt tot teksten, afbeeldingen, logo&apos;s, lay-out, software en ontwerp, is beschermd door intellectuele eigendomsrechten die aan Bouwmatcher of haar licentiegevers toebehoren.
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Het is niet toegestaan om (delen van) de inhoud van deze website te kopiëren, reproduceren, verspreiden of op enige wijze beschikbaar te stellen aan derden zonder voorafgaande schriftelijke toestemming van Bouwmatcher.
              </p>
            </div>
          </div>

          {/* 4. Gebruik van de website */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              4. Gebruik van de website
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                De informatie op deze website is uitsluitend bedoeld voor persoonlijk en niet-commercieel gebruik. Het gebruik van deze website is geheel voor eigen risico van de bezoeker. Bouwmatcher behoudt zich het recht voor de inhoud of functionaliteit van de website op elk moment te wijzigen, te beperken of te beëindigen zonder voorafgaande kennisgeving.
              </p>
            </div>
          </div>

          {/* 5. Rechten voorbehouden */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              5. Rechten voorbehouden
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Bouwmatcher, of de rechthebbende, behoudt alle rechten, waaronder auteursrechten, merkrechten en overige intellectuele eigendomsrechten met betrekking tot de inhoud van deze website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
