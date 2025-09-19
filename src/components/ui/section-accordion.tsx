"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Download, Printer } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SectionAccordionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  onDownload?: () => void
  onPrint?: () => void
  downloadLabel?: string
  printLabel?: string
  className?: string
}

export function SectionAccordion({
  title,
  children,
  defaultOpen = false,
  onDownload,
  onPrint,
  downloadLabel = "Download PDF",
  printLabel = "Print",
  className
}: SectionAccordionProps) {
  return (
    <div className={cn("border border-gray-200 rounded-lg overflow-hidden", className)}>
      <AccordionPrimitive.Root
        type="single"
        collapsible
        defaultValue={defaultOpen ? "item-1" : undefined}
      >
        <AccordionPrimitive.Item value="item-1" className="border-none">
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between gap-4 bg-gray-50 px-6 py-4 text-left font-medium transition-all hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 [&[data-state=open]>div>img]:rotate-0 [&[data-state=closed]>div>img]:rotate-90">
              <div className="flex items-center gap-4">
                <div className="transition-transform duration-300">
                  <Image
                    src="/icons/faq_accordian-icon.svg"
                    width={32}
                    height={32}
                    alt="accordion-icon"
                    className="transition-transform duration-300"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              </div>

              <div className="flex items-center gap-2">
                {onDownload && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDownload()
                    }}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Download size={16} />
                    <span className="hidden sm:inline">{downloadLabel}</span>
                  </Button>
                )}

                {onPrint && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onPrint()
                    }}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <Printer size={16} />
                    <span className="hidden sm:inline">{printLabel}</span>
                  </Button>
                )}
              </div>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          <AccordionPrimitive.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
            <div className="px-6 py-4 bg-white">
              {children}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
    </div>
  )
}