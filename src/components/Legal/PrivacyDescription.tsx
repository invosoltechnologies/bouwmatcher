import Link from 'next/link';

export default function PrivacyDescription() {
  return (
    <section className='py-16'>
      <div className='custom-container'>
        <div className='space-y-12'>
          {/* 1. Introductie */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              1. Introductie
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Deze Privacyverklaring van Bouwmatcher BV (hierna:
                &quot;Bouwmatcher&quot;, &quot;wij&quot; of &quot;ons&quot;)
                legt uit hoe wij omgaan met persoonsgegevens van:
              </p>
              <ul className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  bezoekers van onze website,
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  personen die een offertenaanvraag indienen,
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  gebruikers die een account aanmaken,
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  klanten die een review plaatsen,
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  personen die zich abonneren op onze nieuwsbrief,
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  en iedereen die contact met ons opneemt (telefonisch, per
                  e-mail of via social media).
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Wij hechten groot belang aan jouw privacy en verwerken
                persoonsgegevens uitsluitend in overeenstemming met de Algemene
                Verordening Gegevensbescherming (AVG/GDPR).
              </p>
            </div>
          </div>

          {/* 2. Toepasselijkheid */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              2. Toepasselijkheid
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Deze verklaring is van toepassing op alle verwerkingen van
                persoonsgegevens door Bouwmatcher in het kader van onze
                dienstverlening aan particulieren en websitebezoekers.
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Let op: vakspecialisten die via Bouwmatcher opdrachten aanmenen
                zijn zelf verantwoordelijk voor hun verwerking van
                persoonsgegevens.
              </p>
            </div>
          </div>

          {/* 3. Verwerkingsverantwoordelijke */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              3. Verwerkingsverantwoordelijke
            </h2>
            <div className='space-y-4'>
              <div className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                <p className='mb-2'>Bouwmatcher BV</p>
                <p className='mb-2'>Philipsite 5 bus 1</p>
                <p className='mb-2'>3001 Leuven, België</p>
                <p className='mb-2'>E-mail: <Link href="mailto:support@bouwmatcher.com" className="text-muted-foreground underline hover:text-primary">support@bouwmatcher.com</Link></p>
                <p>Website: <Link href="/contact" className="text-muted-foreground underline hover:text-primary">www.bouwmatcher.com/contact</Link></p>
              </div>
            </div>
          </div>

          {/* 4. Offerteaanvragen */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              4. Offerteaanvragen
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Wanneer je een offerteaanvraag indient, gebruiken wij je gegevens om je te koppelen aan geschikte vakspecialisten. Standaard koppelen wij je aanvraag aan maximaal vier bedrijven, tenzij je ons vraagt om minder of juist meer bedrijven te benaderen.
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                De vakspecialisten nemen doorgaans contact met je op via telefoon of e-mail, en soms via sms of WhatsApp. Ook Bouwmatcher kan aanvullende informatie opvragen.
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Verwerkte gegevens:
              </p>
              <ul className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Contactgegevens (naam, adres, e-mailadres, telefoonnummer, geslacht)
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Projectinformatie (soort werk, type woning, situatie, budget)
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Technische gegevens (IP-adres, device-informatie, anti-fraudedata)
                </li>
              </ul>
            </div>
          </div>

          {/* 5. Accounts */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              5. Accounts
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Bij het indienen van een offerteaanvraag wordt automatisch een account aangemaakt. Dit account gebruik je om de status van aanvragen te volgen, reviews te plaatsen en nieuwe aanvragen te doen.
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Verwerkte gegevens:
              </p>
              <ul className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Inloggegevens (e-mailadres en wachtwoord)
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Gegevens over je offerteaanvragen en status
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Reviews en communicatie met vakspecialisten
                </li>
              </ul>
            </div>
          </div>

          {/* 6. Contactmomenten */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              6. Contactmomenten
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Neem je contact met ons op (via telefoon, e-mail, webformulier of social media), dan verwerken wij de gegevens die je verstrekt om je vraag of klacht af te handelen. Dit doen wij op basis van ons gerechtvaardigd belang om je correct te kunnen ondersteunen.
              </p>
            </div>
          </div>

          {/* 7. Nieuwsbrief & marketing */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              7. Nieuwsbrief & marketing
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Je kunt je vrijwillig inschrijven voor onze nieuwsbrief. Hiervoor verwerken wij enkel je e-mailadres.
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Afmelden kan op elk moment via de afmeldlink onderaan de e-mail of via je account.
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Daarnaast sturen wij transactionele e-mails over de status van je offerteaanvraag. Deze berichten zijn noodzakelijk en kun je niet uitschakelen.
              </p>
            </div>
          </div>

          {/* 8. Wettelijke verplichtingen & geschillen */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              8. Wettelijke verplichtingen & geschillen
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                In uitzonderlijke gevallen kunnen wij wettelijk verplicht zijn om persoonsgegevens te delen met autoriteiten zoals politie, justitie of toezichthouders. Ook kunnen gegevens worden gebruikt bij geschillen, bewijsvoering of bij vermoedens van fraude of misbruik.
              </p>
            </div>
          </div>

          {/* 9. Cookies */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              9. Cookies
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Wij maken gebruik van cookies en vergelijkbare technologieën om onze website goed te laten functioneren, het gebruik te analyseren en – met jouw toestemming – gepersonaliseerde advertenties te tonen. Zie ons afzonderlijke Cookiebeleid voor meer details.
              </p>
            </div>
          </div>

          {/* 10. Geautomatiseerde besluitvorming */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              10. Geautomatiseerde besluitvorming
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Bouwmatcher neemt geen geautomatiseerde besluiten die aanzienlijke gevolgen hebben voor gebruikers. Het koppelen van een aanvraag aan vakspecialisten gebeurt deels automatisch op basis van werkgebied en beschikbaarheid, maar de keuze met wie je in zee gaat ligt volledig bij jou.
              </p>
            </div>
          </div>

          {/* 11. Delen van gegevens */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              11. Delen van gegevens
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Wij delen persoonsgegevens uitsluitend indien dat noodzakelijk is voor onze dienstverlening:
              </p>
              <ul className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Met vakspecialisten die jouw aanvraag ontvangen (maximaal 4, tenzij je anders kiest).
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Met IT- en hostingpartners voor beheer en opslag.
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Met marketing- en analysetools (Google, Meta, LinkedIn, Microsoft) – enkel met jouw toestemming.
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Wanneer derden als verwerker optreden, sluiten wij een verwerkersovereenkomst. Indien gegevens buiten de EU worden verwerkt, zorgen wij voor passende waarborgen (zoals EU-standaardcontractbepalingen).
              </p>
            </div>
          </div>

          {/* 12. Beveiliging van gegevens */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              12. Beveiliging van gegevens
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Wij nemen passende technische en organisatorische maatregelen om persoonsgegevens te beschermen, waaronder:
              </p>
              <ul className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  SSL-beveiligde verbindingen
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Toegangsbeheer en logging
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Versleutelde opslag op beveiligde servers
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Geheimhoudingsplicht voor medewerkers
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Regelmatige audits en software-updates
                </li>
              </ul>
            </div>
          </div>

          {/* 13. Bewaartermijnen */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              13. Bewaartermijnen
            </h2>
            <div className='space-y-4'>
              <ul className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Offerteaanvragen: tot 3 jaar na afhandeling
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Accounts: zolang het account actief is
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Reviews: zolang zichtbaar op de website
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Nieuwsbrief/marketing: tot intrekking van toestemming
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Facturen en wettelijke bewaarplicht: 7 jaar
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Na afloop van deze termijnen worden gegevens verwijderd of geanonimiseerd.
              </p>
            </div>
          </div>

          {/* 14. Jouw rechten */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              14. Jouw rechten
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Volgens de AVG heb je de volgende rechten:
              </p>
              <ul className='space-y-3 pl-12'>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Recht op inzage
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Recht op correctie en verwijdering
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Recht op beperking van de verwerking
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Recht op overdraagbaarheid (dataportabiliteit)
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Recht om bezwaar te maken, o.a. tegen direct marketing
                </li>
                <li className='text-muted-foreground font-normal leading-relaxed text-2xl list-disc'>
                  Recht om toestemming in te trekken
                </li>
              </ul>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Verzoeken kun je indienen via <Link href="mailto:support@bouwmatcher.com" className="text-muted-foreground underline hover:text-primary">support@bouwmatcher.com</Link>. Wij kunnen je vragen je identiteit te bevestigen voordat we je verzoek behandelen.
              </p>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Ben je ontevreden over onze afhandeling? Dan kun je een klacht indienen bij de Gegevensbeschermingsautoriteit (www.gegevensbeschermingsautoriteit.be).
              </p>
            </div>
          </div>

          {/* 15. Wijzigingen */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              15. Wijzigingen
            </h2>
            <div className='space-y-4'>
              <p className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                Wij kunnen deze Privacyverklaring wijzigen bij gewijzigde wetgeving of interne aanpassingen. De meest actuele versie staat steeds op onze website. Bij ingrijpende wijzigingen informeren wij je actief.
              </p>
            </div>
          </div>

          {/* 16. Contact */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-medium text-foreground'>
              16. Contact
            </h2>
            <div className='space-y-4'>
              <div className='text-muted-foreground font-normal leading-relaxed text-2xl'>
                <p className='mb-2'>Bouwmatcher BV</p>
                <p className='mb-2'>Philipsite 5 bus 1</p>
                <p className='mb-2'>3001 Leuven, België</p>
                <p className='mb-2'>E-mail: <Link href="mailto:support@bouwmatcher.com" className="text-muted-foreground underline hover:text-primary">support@bouwmatcher.com</Link></p>
                <p>Website: <Link href="/contact" className="text-muted-foreground underline hover:text-primary">www.bouwmatcher.com/contact</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
