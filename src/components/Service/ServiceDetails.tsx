'use client';

import { Service } from '@/data/services';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowBigDown, ArrowDown, ChevronDown, ChevronRight } from 'lucide-react';

interface ServiceDetailsProps {
  service: Service;
}

const sidebarData = {
  meerInformatie: [
    'Algemene informatie',
    'Werkwijze en proces',
    'Materialen en tools',
    'Certificeringen',
    'Garanties',
  ],
  prijsgidsen: [
    'Schilder kosten',
    'Schilder kosten',
    'Schilder kosten',
    'Schilder kosten',
  ],
};

const serviceDetailsSections = [
  {
    id: 'wat-is',
    title: 'Wat is schilderwerk?',
    content: `Schilderwerk omvat het aanbrengen van verf, lak of andere coatings op verschillende oppervlakken zoals muren, plafonds, houtwerk en metaal. Het dient zowel een beschermende als decoratieve functie. Professioneel schilderwerk zorgt voor een langdurige afwerking die bestand is tegen weersinvloeden en dagelijks gebruik.`,
  },
  {
    id: 'voorbereiding',
    title: 'Voorbereiding en planning',
    content: `Een goede voorbereiding is essentieel voor kwalitatief schilderwerk. Dit omvat het schoonmaken van oppervlakken, het repareren van scheuren en gaten, het aanbrengen van primer waar nodig, en het afplakken van randen. De keuze van materialen en kleuren wordt afgestemd op de specifieke wensen en het type oppervlak.`,
  },
  {
    id: 'uitvoering',
    title: 'Uitvoering van het werk',
    content: `Tijdens de uitvoering wordt er gewerkt volgens een vaste werkwijze: eerst het voorwerk, dan de primer, gevolgd door de gewenste aantal lagen eindverf. Professionele schilders zorgen voor gelijkmatige verflagen en nette afwerkingen bij randen en hoeken. Het werk wordt uitgevoerd met kwalitatieve materialen en gereedschappen.`,
  },
  {
    id: 'onderhoud',
    title: 'Onderhoud en nazorg',
    content: `Na afronding van het schilderwerk is het belangrijk om de juiste onderhoudsinstructies te volgen. Dit helpt de levensduur van het schilderwerk te verlengen. Regelmatige schoonmaak en tijdige bijwerkingen van kleine beschadigingen voorkomen grotere reparaties in de toekomst.`,
  },
  {
    id: 'kosten',
    title: 'Kosten en prijsindicatie',
    content: `De kosten voor schilderwerk variëren afhankelijk van verschillende factoren zoals de grootte van het project, het type oppervlak, de gewenste kwaliteit van materialen en de complexiteit van het werk. Vraag altijd meerdere offertes aan om een goed beeld te krijgen van de marktprijzen.`,
  },
];

export default function ServiceDetails({ service }: ServiceDetailsProps) {
  return (
    // <section className='py-16 bg-gradient-to-r from-[#0AB27E0D] to-[#023AA20D] mt-11'>
    <section className='py-16 bg-white'>
      <div className='custom-container'>
        <div className='grid lg:grid-cols-4 gap-8'>
          {/* Sidebar */}
          <div className='lg:col-span-1'>
            <div className='space-y-6 sticky top-48'>
              {/* Meer informatie over */}
              <Accordion
                type='single'
                collapsible
                className='w-full  bg-gradient-to-r from-[#0AB27E0D] to-[#023AA20D] py-5 px-6 border border-neutral-200 rounded-xl'
                style={{
                  boxShadow: '0 2px 6.9px 0 rgba(0, 0, 0, 0.07)',
                }}
              >
                <AccordionItem value='meer-info' className='border-none'>
                  <AccordionTrigger
                    className='text-lg font-medium hover:no-underline cursor-pointer py-0'
                    chevronClassName='w-5 h-5'
                  >
                    Meer informatie over
                  </AccordionTrigger>
                  <AccordionContent className='pt-2 cursor-pointer'>
                    <div className='space-y-2'>
                      {sidebarData.meerInformatie.map((item, index) => (
                        <button
                          key={index}
                          className='w-full text-left text-base text-muted-foreground hover:text-primary cursor-pointer  transition-colors'
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Prijsgidsen */}
              <div className='w-full  bg-gradient-to-r from-[#0AB27E0D] to-[#023AA20D] py-5 px-6 border border-neutral-200 rounded-xl'>
                <h3 className='text-lg font-medium hover:no-underline cursor-pointer mb-3'>
                  Prijsgidsen
                </h3>
                <div className='space-y-3'>
                  {sidebarData.prijsgidsen.map((item, index) => (
                    <button
                      key={index}
                      className='w-full flex cursor-pointer items-center justify-between text-left text-base text-primary hover:text-primary/80 transition-colors group'
                    >
                      <span>{item}</span>
                      <ChevronRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                    </button>
                  ))}
                </div>
                <button className='text-muted-foreground flex gap-1 text-base cursor-pointer mt-3 hover:text-primary transition-colors'>
                  Toon meer{' '}
                  <ChevronDown className='w-4 h-4 mt-1 group-hover:translate-x-1 transition-transform' />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='lg:col-span-3'>
            <div className='max-w-4xl'>
              <h2 className='text-3xl font-medium text-foreground mb-8'>
                Alles over {service.name.toLowerCase()}
              </h2>

              <Accordion type='single' collapsible className='w-full space-y-4'>
                {serviceDetailsSections.map((section) => (
                  <AccordionItem
                    key={section.id}
                    value={section.id}
                    className='border border-gray-200 rounded-lg px-6 py-5 bg-gray-50 bg-gradient-to-r from-[#0AB27E0D] to-[#023AA20D]'
                  >
                    <AccordionTrigger
                      className='text-left py-0 font-medium text-xl text-foreground hover:no-underline '
                      chevronClassName='w-6.5 h-6.5 text-foreground'
                    >
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent className='pt-5 pb-4'>
                      <div className='text-muted-foreground text-base leading-relaxed'>
                        {section.content}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Related Articles Section */}
              <div className='mt-12'>
                <h3 className='text-2xl font-normal text-foreground mb-6'>
                  Gerelateerde artikelen
                </h3>
                <div className='grid md:grid-cols-2 gap-6'>
                  <div className='bg-gray-50 rounded-lg p-6'>
                    <h4 className='font-medium text-lg mb-3'>
                      Tips voor het kiezen van de juiste schilder
                    </h4>
                    <p className='text-muted-foreground text-sm mb-4'>
                      Ontdek wat je moet weten bij het selecteren van een
                      professionele schilder voor jouw project.
                    </p>
                    <button className='text-primary text-sm font-medium hover:text-primary/80 transition-colors'>
                      Lees meer →
                    </button>
                  </div>

                  <div className='bg-gray-50 rounded-lg p-6'>
                    <h4 className='font-medium text-lg mb-3'>
                      Welke verf kies je voor welke ruimte?
                    </h4>
                    <p className='text-muted-foreground text-sm mb-4'>
                      Een gids voor het kiezen van de juiste verfsoort voor
                      verschillende kamers in huis.
                    </p>
                    <button className='text-primary text-sm font-medium hover:text-primary/80 transition-colors'>
                      Lees meer →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}