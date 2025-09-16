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
        'w-full flex items-center justify-between bg-gradient-to-r from-green-100 to-blue-50 rounded-[25px] lg:pt-9.5 lg:pb-14 lg:px-16 relative',
        className
      )}
    >
      <div className='flex-1 max-w-[700px]'>
        <h2 className='text-[32px] lg:text-5xl font-semibold text-foreground lg:leading-12.5'>
          {heading}
        </h2>
        <p className='text[#434343] text-[16px] lg:text-2xl lg:leading-[40px] mt-9.5 mb-14.5'>
          {description}
        </p>
        <Button
          onClick={ctaAction}
          className='py-[11px] px-[31px] text-2xl leading-10 font-medium'
        >
          {ctaText}
        </Button>
      </div>

      <div className='absolute bottom-0 right-0'>
        <Image
          src={image || fallbackImage}
          alt='CTA Image'
          width={379}
          height={373}
          className='object-contain'
        />
      </div>
    </div>
  );
}

export { CTA }