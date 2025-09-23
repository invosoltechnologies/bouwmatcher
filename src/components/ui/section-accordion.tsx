"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Download, Printer } from "lucide-react"
import Image from "next/image"
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
    <div className={cn(className)}>
      <AccordionPrimitive.Root
        type='single'
        collapsible
        defaultValue={defaultOpen ? 'item-1' : undefined}
      >
        <AccordionPrimitive.Item
          value='item-1'
          className='p-11.5 bg-white/90 border border-gray-200 rounded-3xl'
          style={{
            boxShadow:
              '0 5.918px 8.876px 0 rgba(0, 0, 0, 0.10), 0 14.794px 22.191px 0 rgba(0, 0, 0, 0.10)',
          }}
        >
          <AccordionPrimitive.Header className='flex'>
            <AccordionPrimitive.Trigger className='flex flex-1 items-center justify-between gap-4 p-0 border-none hover:bg-none [&[data-state=open]>div>img]:rotate-0 [&[data-state=closed]>div>img]:-rotate-90'>
              <div className='flex items-center gap-4'>
                <Image
                  src='icons/dropdown-icon.svg'
                  width={40}
                  height={40}
                  alt='accordion-icon'
                  className='transition-transform duration-300'
                />
                <h2 className='text-[44px] text-secondary-foreground'>
                  {title}
                </h2>
              </div>

              <div className='flex items-center gap-2'>
                {onDownload && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onDownload();
                    }}
                    className='flex items-center gap-2.5 bg-slate-100 p-3.5  px-5 pb-2 font-montserrat text-2xl rounded-[12px] hover:text-secondary-foreground hover:bg-blue-50 cursor-pointer transition-all'
                  >
                    <Download size={23} />
                    <span className='hidden sm:inline'>{downloadLabel}</span>
                  </div>
                )}

                {onPrint && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onPrint();
                    }}
                    className='flex items-center gap-2.5 bg-slate-100 p-3.5 px-5 pb-2 font-montserrat text-2xl rounded-[12px] hover:text-secondary-foreground hover:bg-blue-50 cursor-pointer transition-all'
                  >
                    <Printer size={23} />
                    <span className='hidden sm:inline'>{printLabel}</span>
                  </div>
                )}
              </div>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          <AccordionPrimitive.Content className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden'>
            <div className='px-0 py-10 bg-white'>{children}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
    </div>
  );
}