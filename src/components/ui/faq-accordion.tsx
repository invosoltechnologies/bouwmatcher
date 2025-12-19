"use client"

import * as React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"
import { cn } from "@/lib/utils"

interface FAQItem {
  question: string
  answer: string
  icon?: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  className?: string
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  return (
    <Accordion type='single' collapsible className={cn('w-full', className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className='bg-white/90 rounded-2xl border border-white/20 mb-4 border-b-accent/20 [&[data-state=open]]:border-accent p-5 md:p-6'
          style={{ boxShadow: '0px 10px 30px 0px #023AA214' }}
        >
          <AccordionTrigger
            className='text-left text-sm md:text-xl py-0 text-muted-foreground hover:no-underline hover:border-accent [&[data-state=open]>img]:rotate-45'
            icon='/icons/faq_accordian-icon.svg'
          >
            {item.question}
          </AccordionTrigger>
          <AccordionContent className='text-[#787878] py-6 pb-0 md:py-8 md:pb-0 text:sm md:text-lg border-t border-accent mt-6 leading-relaxed'>
            <div
              className='[&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2'
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}