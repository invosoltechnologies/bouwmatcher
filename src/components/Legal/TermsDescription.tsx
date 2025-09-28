import Link from 'next/link';

export default function TermsDescription() {
  return (
    <section className='py-16'>
      <div className='custom-container'>
        <div className='space-y-12'>
          {/* 1. Definities */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              1. Definities
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                In deze Algemene Voorwaarden wordt verstaan onder:
              </p>
              <ul className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Algemene Voorwaarden: dit document, bindend voor Gebruikers,
                  Leveranciers en Partners.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Gebruiker: iedere natuurlijke persoon of rechtspersoon die via
                  het platform een offerteaanvraag indient of gebruikmaakt van
                  de diensten.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Leverancier of Vakspecialist: iedere natuurlijke persoon of
                  rechtspersoon die via het platform diensten en/of producten
                  aanbiedt.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Offerteaanvraag of Lead: de door een Gebruiker via de website
                  ingevulde aanvraag om in contact te komen met een Leverancier.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Contract: de verbintenis die ontstaat door registratie of
                  gebruik van het platform, inclusief deze Algemene Voorwaarden.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Creditpacks: vooraf betaalde tegoeden waarmee Leveranciers
                  toegang krijgen tot Offerteaanvragen.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Extranet: het beveiligde gedeelte van de website, uitsluitend
                  toegankelijk voor geregistreerde Leveranciers.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Diensten: de door Bouwmatcher aangeboden matchingdiensten
                  tussen Gebruikers en Leveranciers.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Partner: bedrijven of organisaties die met Bouwmatcher een
                  samenwerkingsverband aangaan buiten het leverancierscontract.
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Review: een beoordeling van een Leverancier door een Gebruiker.
              </p>
            </div>
          </div>

          {/* 2. Voorwerp van het contract */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              2. Voorwerp van het contract
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Bouwmatcher stelt een online platform ter beschikking dat
                fungeert als bemiddelaar tussen Gebruikers en Leveranciers.
                Bouwmatcher is geen partij bij de overeenkomsten die tussen hen
                tot stand komen en draagt geen verantwoordelijkheid voor de
                uitvoering, naleving of kwaliteit ervan. Bouwmatcher biedt geen
                garantie op het aantal offertes, de kwaliteit van Leveranciers
                of de uiteindelijke uitvoering van de werken.
              </p>
            </div>
          </div>

          {/* 3. Inschrijving en accountbeheer */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              3. Inschrijving en accountbeheer
            </h2>
            <div className='space-y-4'>
              <ul className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Een Gebruiker registreert zich door het indienen van een
                  Offerteaanvraag.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Een Leverancier registreert zich via een Bestelbon of via het
                  Extranet.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Leveranciers zijn verplicht juiste, actuele en volledige
                  gegevens te verstrekken. Bouwmatcher kan inschrijvingen zonder
                  opgave van redenen weigeren.
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Iedere gebruiker is verantwoordelijk voor de geheimhouding van
                zijn inloggegevens. Misbruik, verlies of onbevoegd gebruik moet
                onmiddellijk aan Bouwmatcher worden gemeld.
              </p>
            </div>
          </div>

          {/* 4. Verplichtingen van Gebruikers */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              4. Verplichtingen van Gebruikers
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                De Gebruiker garandeert dat:
              </p>
              <ul className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  alle verstrekte informatie correct en waarheidsgetrouw is;
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Offerteaanvragen uitsluitend worden gedaan met een reële
                  aankoopintentie;
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  aanvragen niet louter worden gebruikt om offertes van
                  concurrenten te vergelijken zonder intentie tot aankoop.
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                De Gebruiker is aansprakelijk voor de juistheid van alle door
                hem verstrekte gegevens.
              </p>
            </div>
          </div>

          {/* 5. Verplichtingen van Leveranciers */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              5. Verplichtingen van Leveranciers
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                De Leverancier verbindt zich ertoe:
              </p>
              <ul className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Offerteaanvragen binnen 48 uur na ontvangst op te volgen;
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  correcte en uitvoerbare offertes te bezorgen;
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  enkel aanbiedingen te doen die daadwerkelijk kunnen worden
                  uitgevoerd;
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  respectvol en professioneel te communiceren met Gebruikers;
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  de kwaliteit en uitvoering van zijn diensten te waarborgen.
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Bouwmatcher kan sancties opleggen of accounts schorsen bij
                herhaaldelijke klachten of schendingen van deze voorwaarden.
              </p>
            </div>
          </div>

          {/* 6. Vergoeding en betaling */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              6. Vergoeding en betaling
            </h2>
            <div className='space-y-4'>
              <ul className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Voor Gebruikers zijn de diensten van Bouwmatcher kosteloos.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Leveranciers betalen een vergoeding via Creditpacks of via
                  facturatie.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Creditpacks zijn één jaar geldig en niet terugbetaalbaar.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Facturen zijn betaalbaar via domiciliëring of automatische
                  incasso, tenzij schriftelijk anders overeengekomen.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Bij wanbetaling kan Bouwmatcher de toegang tot het Extranet
                  opschorten.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Laattijdige betalingen geven aanleiding tot 1%
                  nalatigheidsintrest per maand, vermeerderd met een forfaitaire
                  schadevergoeding van 15% van het openstaande bedrag (minimum
                  €50).
                </li>
              </ul>
            </div>
          </div>

          {/* 7. Protesten en retourbeleid */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              7. Protesten en retourbeleid
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Een Leverancier kan binnen tien (10) kalenderdagen na ontvangst
                van een Offerteaanvraag een Protest indienen via het Extranet.
                Protesten zijn enkel geldig indien:
              </p>
              <ol className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-decimal'>
                  de Gebruiker geen reële aankoopintentie heeft;
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-decimal'>
                  de Gebruiker een student, concurrent of buiten het werkgebied
                  van de Leverancier is;
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-decimal'>
                  de aanvraag buiten de vooraf overeengekomen criteria valt;
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-decimal'>
                  de aanvraag identiek is aan een reeds eerder ontvangen
                  aanvraag binnen twee weken.
                </li>
              </ol>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Bouwmatcher beslist autonoom en finaal over de gegrondheid van
                een Protest. Bij goedkeuring wordt compensatie uitsluitend
                toegekend in de vorm van credits.
              </p>
            </div>
          </div>

          {/* 8. Reviews en feedback */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              8. Reviews en feedback
            </h2>
            <div className='space-y-4'>
              <ul className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Reviews moeten eerlijk, respectvol en gebaseerd zijn op eigen
                  ervaring.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Bouwmatcher kan reviews verwijderen die ongepast, misleidend
                  of beledigend zijn.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Het plaatsen van valse of gemanipuleerde reviews is verboden.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Leveranciers kunnen gemotiveerde verzoeken tot verwijdering
                  van een review indienen.
                </li>
              </ul>
            </div>
          </div>

          {/* 9. Intellectueel eigendom */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              9. Intellectueel eigendom
            </h2>
            <div className='space-y-4'>
              <ul className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Alle intellectuele eigendomsrechten verbonden aan het
                  platform, de software, logo&apos;`s, teksten, beelden en
                  ontwerpen behoren uitsluitend toe aan Bouwmatcher.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Het is verboden deze zonder voorafgaande schriftelijke
                  toestemming te gebruiken, kopiëren of verspreiden.
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Gebruikers en Leveranciers behouden de rechten op eigen
                geplaatste inhoud, maar verlenen Bouwmatcher een beperkte,
                niet-exclusieve licentie om deze te gebruiken voor promotie- en
                publicatiedoeleinden.
              </p>
            </div>
          </div>

          {/* 10. Aansprakelijkheid */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              10. Aansprakelijkheid
            </h2>
            <div className='space-y-4'>
              <ul className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Bouwmatcher is niet aansprakelijk voor schade die voortvloeit
                  uit overeenkomsten of transacties tussen Gebruikers en
                  Leveranciers.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Bouwmatcher garandeert geen continuïteit, minimum aantal
                  offertes of kwaliteit van de aangeboden diensten.
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Storingen van het internet, virussen, technische defecten of
                fouten in de gegevens vallen niet onder de aansprakelijkheid van
                Bouwmatcher.
              </p>
            </div>
          </div>

          {/* 11. Overmacht */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              11. Overmacht
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Bouwmatcher kan niet aansprakelijk worden gesteld voor
                tekortkomingen door omstandigheden buiten haar redelijke
                controle, waaronder maar niet beperkt tot: netwerkstoreningen,
                stakingen, natuurrampen, pandemieën of overheidsmaatregelen.
              </p>
            </div>
          </div>

          {/* 12. Duur, opschorting en beëindiging */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              12. Duur, opschorting en beëindiging
            </h2>
            <div className='space-y-4'>
              <ul className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Bouwmatcher kan het Contract met onmiddellijke ingang
                  beëindigen bij wanbetaling, fraude, misbruik of schending van
                  deze voorwaarden.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Reeds betaalde bedragen worden niet teruggestort.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Leveranciers kunnen hun contract beëindigen met een
                  opzegtermijn van twee (2) weken.
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Bouwmatcher kan accounts tijdelijk of definitief schorsen bij
                vermoeden van fraude of misbruik.
              </p>
            </div>
          </div>

          {/* 13. Bescherming van persoonsgegevens */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              13. Bescherming van persoonsgegevens
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Bouwmatcher verwerkt persoonsgegevens conform haar Privacybeleid
                en Cookiebeleid, gepubliceerd op de website. Gebruikers en
                Leveranciers hebben recht op inzage, rectificatie en
                verwijdering van hun gegevens. Klachten kunnen worden ingediend
                bij de Gegevensbeschermingsautoriteit.
              </p>
            </div>
          </div>

          {/* 14. Wijzigingen van de voorwaarden */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              14. Wijzigingen van de voorwaarden
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Bouwmatcher behoudt zich het recht voor deze Algemene
                Voorwaarden te allen tijde te wijzigen. De gewijzigde
                voorwaarden worden gepubliceerd op de website en zijn bindend
                vanaf de datum van publicatie. Het verder gebruik van het
                platform geldt als aanvaarding van de nieuwe voorwaarden.
              </p>
            </div>
          </div>

          {/* 15. Toepasselijk recht en bevoegde rechtbank */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              15. Toepasselijk recht en bevoegde rechtbank
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Op deze Algemene Voorwaarden is uitsluitend Belgisch recht van
                toepassing. Geschillen behoren tot de exclusieve bevoegdheid van
                de rechtbanken van Leuven. Partijen verbinden zich ertoe eerst
                te trachten geschillen minnelijk te regelen.
              </p>
            </div>
          </div>

          {/* 16. Contactgegevens */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              16. Contactgegevens
            </h2>
            <div className='space-y-4'>
              <div className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                <p className='mb-2'>Bouwmatcher BV</p>
                <p className='mb-2'>Philipsite 5 bus 1</p>
                <p className='mb-2'>3001 Leuven, België</p>
                <p className='mb-2'>
                  E-mail:{' '}
                  <Link
                    href='mailto:bouwmatchersocials@gmail.com'
                    className='text-muted-foreground underline hover:text-primary'
                  >
                    bouwmatchersocials@gmail.com
                  </Link>
                </p>
                <p>
                  Website:{' '}
                  <Link
                    href='/'
                    className='text-muted-foreground underline hover:text-primary'
                  >
                    www.bouwmatcher.com
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
