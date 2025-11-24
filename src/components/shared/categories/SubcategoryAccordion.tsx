'use client';

import { Check, Circle } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PricePill } from '@/components/ui/price-pill';
import type { ServiceCategoryWithSubcategories } from '@/types/categories';

interface SubcategoryAccordionProps {
  categories: ServiceCategoryWithSubcategories[];
  selectedSubcategoryIds: Set<number>;
  onToggleSubcategory: (subcategoryId: number) => void;
  onSelectAllInCategory: (categoryId: number) => void;
  openAccordions: string[];
  onAccordionChange: (value: string[]) => void;
  showPrices?: boolean;
  searchQuery?: string;
}

export default function SubcategoryAccordion({
  categories,
  selectedSubcategoryIds,
  onToggleSubcategory,
  onSelectAllInCategory,
  openAccordions,
  onAccordionChange,
  showPrices = true,
  searchQuery = '',
}: SubcategoryAccordionProps) {
  if (categories.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-slate-500'>
          {searchQuery
            ? `Geen resultaten gevonden voor "${searchQuery}"`
            : 'Geen categorieën beschikbaar'}
        </p>
      </div>
    );
  }

  return (
    <Accordion
      type='multiple'
      value={openAccordions}
      onValueChange={onAccordionChange}
      className='space-y-4'
    >
      {categories.map((category) => {
        const selectedCount = category.subcategories.filter((sub) =>
          selectedSubcategoryIds.has(sub.id)
        ).length;

        return (
          <AccordionItem
            key={category.id}
            value={category.id.toString()}
            className='border-2 rounded-xl px-4 transition-all border-neutral-300 bg-white'
            style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
          >
            <AccordionTrigger
              className='hover:no-underline py-4'
              chevronClassName='w-5 h-5 text-slate-900'
            >
              <div className='flex items-center justify-between flex-1 pr-4'>
                <div className='flex items-center gap-3'>
                  {category.icon_url && (
                    <Image
                      src={category.icon_url}
                      alt={category.name_nl}
                      width={24}
                      height={24}
                      className='[filter:brightness(0)_saturate(100%)_invert(7%)_sepia(8%)_saturate(6422%)_hue-rotate(187deg)_brightness(98%)_contrast(95%)]'
                    />
                  )}
                  <span className='text-base font-semibold text-slate-900'>
                    {category.name_nl}
                  </span>
                  <span className='text-sm text-slate-500'>
                    {selectedCount}/{category.subcategories.length}
                  </span>
                </div>
                <span
                  role='button'
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectAllInCategory(category.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      onSelectAllInCategory(category.id);
                    }
                  }}
                  className='text-primary text-sm font-medium hover:text-primary/80 cursor-pointer'
                >
                  Alles selecteren
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className='space-y-3 pt-2'>
                {category.subcategories.map((subcategory) => {
                  const isSelected = selectedSubcategoryIds.has(subcategory.id);
                  return (
                    <div
                      key={subcategory.id}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer',
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-neutral-200 bg-white hover:border-primary'
                      )}
                      onClick={() => onToggleSubcategory(subcategory.id)}
                      style={
                        !isSelected
                          ? { boxShadow: '0px 2px 6.5px 0px #0000001A' }
                          : undefined
                      }
                    >
                      <div className='flex items-center gap-3'>
                        <div className='w-6 h-6 rounded-full flex items-center justify-center shrink-0'>
                          {isSelected ? (
                            <div className='w-6 h-6 rounded-full bg-accent flex items-center justify-center'>
                              <Check className='w-4 h-4 text-white' />
                            </div>
                          ) : (
                            <Circle className='w-6 h-6 text-slate-300 fill-slate-300' />
                          )}
                        </div>
                        {subcategory.icon_url && (
                          <Image
                            src={subcategory.icon_url}
                            alt={subcategory.name_nl}
                            width={20}
                            height={20}
                          />
                        )}
                        <span className='text-base font-medium text-slate-900'>
                          {subcategory.name_nl}
                        </span>
                      </div>
                      {isSelected && showPrices && (
                        <div className='flex items-center gap-2'>
                          {subcategory.price_particulier && (
                            <PricePill
                              price={subcategory.price_particulier}
                              type='particulier'
                            />
                          )}
                          {subcategory.price_zakelijk && (
                            <PricePill
                              price={subcategory.price_zakelijk}
                              type='zakelijk'
                            />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}