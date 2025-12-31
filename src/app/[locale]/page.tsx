'use client';

import { useEffect } from 'react';
import Hero from "@/components/Homepage/Hero";
import CTASection from "@/components/Homepage/CTASection";
import FAQSection from "@/components/Homepage/FAQSection";
import ReviewsSection from "@/components/Homepage/ReviewsSection";
import StatsSection from "@/components/Homepage/StatsSection";
import PartnersSection from "@/components/Homepage/PartnersSection";
import ServicesSection from "@/components/Homepage/ServicesSection";
import ProcessSection from "@/components/Homepage/ProcessSection";
import Values from "@/components/Homepage/Values";
import DefaultLayout from "@/components/DefaultLayout";

export default function Home() {
  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    if (hash) {
      // Remove the # from the hash
      const elementId = hash.substring(1);
      // Wait a bit for the page to fully render
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <DefaultLayout>
      <Hero />
      <div id="process-section">
        <ProcessSection />
      </div>
      <Values />
      <div id="categories-section">
        <ServicesSection />
      </div>
      <PartnersSection />
      <StatsSection />
      <ReviewsSection />
      <FAQSection />
      <CTASection />
    </DefaultLayout>
  );
}
