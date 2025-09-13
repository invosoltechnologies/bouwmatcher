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
    <div className={cn(
      "w-full flex items-center justify-between bg-gradient-to-r from-green-100 to-blue-50 rounded-[24px] p-8 lg:p-12 lg:py-16",
      className
    )}>
      <div className="flex-1 max-w-[500px] pr-8">
        <h2 className="text-[32px] lg:text-[36px] font-bold text-gray-900 mb-6 leading-tight">
          {heading}
        </h2>
        <p className="text-gray-600 text-[16px] lg:text-[18px] mb-8 leading-relaxed">
          {description}
        </p>
        <Button 
          onClick={ctaAction}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-[16px] shadow-lg"
        >
          {ctaText}
        </Button>
      </div>
      
      <div className="flex-shrink-0">
        <Image
          src={image || fallbackImage}
          alt="CTA Image"
          width={280}
          height={280}
          className="w-[280px] h-[280px] object-contain"
        />
      </div>
    </div>
  )
}

export { CTA }