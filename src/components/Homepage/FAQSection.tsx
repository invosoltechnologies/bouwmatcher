'use client';

import { FAQAccordion } from "@/components/ui/faq-accordion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

interface FAQSectionProps {
  faqType?: 'homepage' | 'specialists';
}

export default function FAQSection({ faqType = 'homepage' }: FAQSectionProps) {
  const translationKey = faqType === 'specialists' ? 'faq.specialisten' : 'homepage.faq';
  const t = useTranslations(translationKey);

  const faqData = [
    {
      question: t('q1'),
      answer: t.raw('a1'),
    },
    {
      question: t('q2'),
      answer: t.raw('a2'),
    },
    {
      question: t('q3'),
      answer: t.raw('a3'),
    },
    {
      question: t('q4'),
      answer: t.raw('a4'),
    },
    {
      question: t('q5'),
      answer: t.raw('a5'),
    },
    {
      question: t('q6'),
      answer: t.raw('a6'),
    },
  ];

  // Determine the FAQ link based on the type
  const faqLink = faqType === 'specialists' ? '/faq-specialisten' : '/faq-klanten';

  return (
    <section className='py-14 md:py-20 bg-white'>
      <div className='custom-container'>
        <div className='text-center mb-8 md:mb-[60px]'>
          <h2 className='text-[32px] md:text-5xl font-normal text-foreground mb-2 md:mb-5 px-4'>
            {t('heading')}
          </h2>
          <p className='text-muted-foreground text-base md:text-2xl px-4'>
            {t('description')}
          </p>
        </div>

        <div className='max-w-full px-0  md:max-w-4xl mx-auto md:px-0'>
          <FAQAccordion items={faqData} />

          <div className='flex justify-center mt-8 md:mt-12'>
            <Link href={faqLink}>
              <Button
                className='group bg-accent hover:bg-accent/90 text-white px-6 md:px-10 py-3 md:py-4 rounded-2xl text-sm md:text-base font-montserrat'
                size="lg"
              >
                <span className='hidden md:inline'>{t('ctaButtonLong')}</span>
                <span className='md:hidden'>{t('ctaButtonShort')}</span>
                <ArrowRight className='w-3.5 h-6 transition-transform duration-200 group-hover:translate-x-1 font-bold' />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
