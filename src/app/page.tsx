
import Hero from "@/components/Homepage/Hero";
import CTASection from "@/components/Homepage/CTASection";
import FAQSection from "@/components/Homepage/FAQSection";
import ReviewsSection from "@/components/Homepage/ReviewsSection";
import StatsSection from "@/components/Homepage/StatsSection";
import PartnersSection from "@/components/Homepage/PartnersSection";
import ServicesSection from "@/components/Homepage/ServicesSection";
import ProcessSection from "@/components/Homepage/ProcessSection";

export default function Home() {
  return (
<>
<Hero />
<ProcessSection />
<ServicesSection />
<PartnersSection />
<StatsSection />
<ReviewsSection />
<FAQSection />
<CTASection />
</>
  );
}
