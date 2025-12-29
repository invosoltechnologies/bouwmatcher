'use client';

import { FAQAccordion } from "@/components/ui/faq-accordion";
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface FAQContentProps {
  type: 'klanten' | 'specialisten';
}

export default function FAQContent({ type }: FAQContentProps) {
  const t = useTranslations(`faq.${type}`);

  // Define the number of questions for each type
  const questionCount = type === 'klanten' ? 9 : 7;

  const faqData = useMemo(() => {
    const questions = [];
    for (let i = 1; i <= questionCount; i++) {
      questions.push({
        question: t(`q${i}`),
        answer: t.raw(`a${i}`),
      });
    }
    return questions;
  }, [t, questionCount]);

  return (
    <section id='faq-section' className='py-14 md:py-20 bg-white'>
      <div className='custom-container'>
        <div className='max-w-full px-0 md:max-w-4xl mx-auto md:px-0'>
          <FAQAccordion items={faqData} />
        </div>
      </div>
    </section>
  );
}
