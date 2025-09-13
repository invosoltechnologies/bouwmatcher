'use client'

import { CTA } from "@/components/ui/cta"

export default function CTASection() {
  const handleCTAClick = () => {
    // Handle contact action - you can customize this
    window.location.href = 'mailto:info@bouwmatcher.nl'
  }

  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <CTA
          heading="Heeft u vragen over ons proces?"
          description="Neem gerust contact met ons op via e-mail, telefoon of WhatsApp. Ons team staat klaar om u verder te helpen."
          ctaText="Neem contact op"
          ctaAction={handleCTAClick}
        />
      </div>
    </div>
  )
}