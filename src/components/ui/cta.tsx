import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CTAProps {
  heading: string
  description: string
  ctaText: string
  ctaAction: () => void
  image?: string
  className?: string
}

function CTA({
  heading,
  description,
  ctaText,
  ctaAction,
  image,
  className
}: CTAProps) {
  const fallbackImage = "/images/cta-img.png"

  return (
    <div
      className={cn(
        'w-full flex items-end justify-between bg-gradient-to-r from-green-100 to-blue-50 rounded-[25px] pt-8 pb-0 px-6 md:pt-9.5 md:pb-0 md:px-16 relative overflow-hidden',
        className
      )}
    >
      <div className='flex-1 max-w-[700px] z-10 pb-6 md:pb-14'>
        <h2 className='text-xl md:text-[32px] lg:text-5xl font-semibold text-foreground leading-tight md:leading-12.5 mb-3 md:mb-0'>
          {heading}
        </h2>
        <p className='text-[#434343] text-sm md:text-[16px] lg:text-2xl lg:leading-[40px] mt-3 md:mt-9.5 mb-4 md:mb-14.5'>
          {description}
        </p>
        <Button
          onClick={ctaAction}
          className='py-2 md:py-[11px] px-6 md:px-[31px] text-base md:text-2xl leading-6 md:leading-10 font-medium w-full md:w-auto'
        >
          {ctaText}
        </Button>
      </div>

      <div className='flex-shrink-0 z-10'>
        <Image
          src={image || fallbackImage}
          alt='CTA Image'
          width={379}
          height={373}
          className='w-[150px] h-[148px] md:w-[250px] md:h-[246px] lg:w-[379px] lg:h-[373px] object-contain'
        />
      </div>
    </div>
  );
}

export { CTA }