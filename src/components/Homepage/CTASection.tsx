'use client'

import { CTA } from "@/components/ui/cta"
import { useTranslations } from 'next-intl'

export default function CTASection() {
  const t = useTranslations('homepage.cta');

  const handleCTAClick = () => {
    // Handle contact action - you can customize this
    window.location.href = 'mailto:support@bouwmatcher.be'
  }

  return (
    <section className='w-full my-8 md:my-14 lg:my-20.5'>
      <div className='custom-container'>
        <CTA
          heading={t('heading')}
          description={t('description')}
          ctaText={t('ctaText')}
          ctaAction={handleCTAClick}
        />
      </div>
    </section>
  );
}