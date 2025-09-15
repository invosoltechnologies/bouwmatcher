
import Hero from "@/components/Homepage/Hero";
import CTASection from "@/components/Homepage/CTASection";
import FAQSection from "@/components/Homepage/FAQSection";
import ReviewsSection from "@/components/Homepage/ReviewsSection";
import StatsSection from "@/components/Homepage/StatsSection";
import PartnersSection from "@/components/Homepage/PartnersSection";
import ServicesSection from "@/components/Homepage/ServicesSection";

export default function Home() {
  return (
<>
<Hero />
<ServicesSection />
<PartnersSection />
<StatsSection />
<ReviewsSection />
<FAQSection />
<CTASection />
</>
  );
}
