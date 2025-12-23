import DefaultLayout from "@/components/DefaultLayout";
import FAQHero from "@/components/FAQ/FAQHero";
import FAQContent from "@/components/FAQ/FAQContent";
import CTASection from "@/components/Homepage/CTASection";

export default function FAQKlantenPage() {
  return (
    <DefaultLayout>
      <FAQHero type="klanten" />
      <FAQContent type="klanten" />
      <CTASection />
    </DefaultLayout>
  );
}
