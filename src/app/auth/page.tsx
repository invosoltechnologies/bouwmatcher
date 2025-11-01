import FAQSection from "@/components/Homepage/FAQSection";
import ReviewsSection from "@/components/Homepage/ReviewsSection";
import StatsSection from "@/components/Homepage/StatsSection";
import Values, { ValueItem } from "@/components/Homepage/Values";
import ProcessSteps, { ProcessStep } from "@/components/ui/process-steps";
import DefaultLayout from "@/components/DefaultLayout";
import HeroAuth from "@/components/auth/HeroAuth";
import { Button } from "@/components/ui/button";

const authValuesData: ValueItem[] = [
  {
    id: 1,
    icon: '/icons/values/Betrouwbaarheid.svg',
    title: 'Betrouwbaarheid',
    description: 'Je krijgt alleen échte aanvragen van opdrachtgevers. Wij filteren de projecten zorgvuldig zodat jij zeker weet dat je met serieuze leads werkt.',
    position: 'top-left'
  },
  {
    id: 2,
    icon: '/icons/values/Transparantie.svg',
    title: 'Transparantie',
    description: 'Geen verborgen kosten of kleine lettertjes. Jij betaalt zelf welke leads je opent en betaal alleen voor de contactgegevens van projecten die jij interessant vindt.',
    position: 'top-right'
  },
  {
    id: 3,
    icon: '/icons/values/Eerlijkheid.svg',
    title: 'Eerlijkheid',
    description: 'Geen wurgcontracten of onredelijke verplichtingen. Jij behoudt altijd de controle en kiest zelf welke opdrachten je wilt oppakken.',
    position: 'bottom-left'
  },
  {
    id: 4,
    icon: '/icons/values/Doelgericht.svg',
    title: 'Doelgericht',
    description: 'Wij koppelen jou direct aan relevante opdrachtgevers in jouw vakgebied. Zo bespaar je minder tijd aan zoeken en meer tijd aan uitvoeren.',
    position: 'bottom-right'
  }
];

const authProcessSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Schrijf je in',
    description: 'Registreer je gratis als specialist en maak een profiel aan.',
    icon: '/icons/process/step1-icon.svg',
    image: '/images/homepage/process/step1.png',
  },
  {
    id: 2,
    title: 'Doorloop de verificatie',
    description:
      'Wij controleren je gegevens zodat opdrachtgevers zeker weten dat ze met een betrouwbare specialist werken.',
    icon: '/icons/process/step2-icon.svg',
    image: '/images/homepage/process/step2.png',
  },
  {
    id: 3,
    title: 'Voeg je vakgebieden toe',
    description:
      'Geef aan in welke vakgebieden je actief bent en welke projecten bij jou passen.',
    icon: '/icons/process/step3-icon.svg',
    image: '/images/homepage/process/step3.png',
  },
  {
    id: 4,
    title: 'Ontvang en reageer op offertes',
    description:
      'Je profiel staat live: ontvang aanvragen en reageer direct op opdrachten die jou aanspreken.',
    icon: '/icons/process/step4-icon.svg',
    image: '/images/homepage/process/step4.png',
  },
];

export default function AuthPage() {
  return (
    <DefaultLayout>
      <HeroAuth />
      <Values
        heading='De matchmaker die jou helpt aan nieuwe opdrachten'
        description='Voor specialisten die zonder zorgen aan mooie projecten willen werken.'
        centerText='Jouw zekerheid in de bouw.'
        values={authValuesData}
        ctaButtons={
          <Button
            variant='default'
            size='lg'
            className='bg-primary hover:bg-primary/90 text-white font-medium px-6 py-4 rounded-[12px] text-base'
          >
            Word een professional
          </Button>
        }
      />
      <ProcessSteps
        steps={authProcessSteps}
        title='Zo werkt het voor specialisten'
        subtitle='Volg deze eenvoudige stappen en ontdek hoe jij snel aan de slag gaat met nieuwe opdrachten.'
        showCTA={true}
        ctaButtons={
          <Button
            variant='default'
            size='lg'
            className='bg-primary hover:bg-primary/90 text-white font-medium px-6 py-4 rounded-[12px] text-base'
          >
            Word een professional
          </Button>
        }
      />
      <StatsSection
        ctaButtons={
          <Button
            variant='default'
            size='lg'
            className='bg-primary hover:bg-primary/90 text-white font-medium px-6 py-4 rounded-[12px] text-base'
          >
            Word een professional
          </Button>
        }
      />
      <ReviewsSection />
      <FAQSection />
    </DefaultLayout>
  );
}
