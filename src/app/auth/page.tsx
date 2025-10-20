import FAQSection from "@/components/Homepage/FAQSection";
import ReviewsSection from "@/components/Homepage/ReviewsSection";
import StatsSection from "@/components/Homepage/StatsSection";
import PartnersSection from "@/components/Homepage/PartnersSection";
import ServicesSection from "@/components/Homepage/ServicesSection";
import Values, { ValueItem } from "@/components/Homepage/Values";
import DefaultLayout from "@/components/DefaultLayout";
import HeroAuth from "@/components/auth/HeroAuth";
import { Button } from "@/components/ui/button";
import ProcessSection from "@/components/Homepage/ProcessSection";

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

export default function AuthPage() {
  return (
    <DefaultLayout>
      <HeroAuth />
      <Values
        heading='De matchmaker die jou helpt aan nieuwe opdrachten'
        description='Voor specialisten die zonder zorgen aan mooie projecten willen werken.'
        centerText='Jouw zekerheid\nin de bouw.'
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
      <ProcessSection />
      <StatsSection />
      <ReviewsSection />
      <FAQSection />
    </DefaultLayout>
  );
}
