'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Search, Check } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import type { ServiceCategory } from '@/types/categories';

interface CategorySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isDropdown?: boolean; // Show dropdown/combobox for selection
  isListFiltered?: boolean; // For filtering categories list (used in registration)
  categories?: ServiceCategory[]; // All categories for dropdown
  selectedIds?: number[]; // Currently selected category IDs
  onCategorySelect?: (category: ServiceCategory) => void; // When category selected from dropdown
}

export default function CategorySearch({
  value,
  onChange,
  placeholder = 'Zoek vakgebied...',
  isDropdown = false,
  categories = [],
  selectedIds = [],
  onCategorySelect,
}: CategorySearchProps) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();

  // Get category name based on locale
  const getCategoryName = (category: ServiceCategory) => {
    return locale === 'en' ? (category.name_en || category.name_nl) : category.name_nl;
  };

  // Dropdown/Combobox mode (for dashboard - select from dropdown)
  if (isDropdown) {
    return (
      <div className='space-y-3'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className='w-full justify-between h-auto py-4 px-4 text-base md:text-lg font-normal border-neutral-300 hover:border-primary hover:bg-white focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary data-[state=open]:border-primary data-[state=open]:ring-2 data-[state=open]:ring-primary/20'
              style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
            >
              <div className='flex items-center gap-2 text-slate-400'>
                <Search className='w-5 h-5' />
                <span>{placeholder}</span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0' align='start'>
            <Command shouldFilter={true}>
              <CommandInput
                placeholder={placeholder}
                value={value}
                onValueChange={onChange}
              />
              <CommandList>
                <CommandEmpty>Geen resultaten gevonden.</CommandEmpty>
                <CommandGroup>
                  {categories.map((category) => {
                    const isSelected = selectedIds.includes(category.id);
                    const categoryName = getCategoryName(category);
                    return (
                      <CommandItem
                        key={category.id}
                        value={categoryName}
                        onSelect={() => {
                          onCategorySelect?.(category);
                          onChange(''); // Clear search after selection
                          setOpen(false);
                        }}
                      >
                        <div className='flex items-center gap-3 flex-1'>
                          {category.icon_url && (
                            <Image
                              src={category.icon_url}
                              alt={categoryName}
                              width={24}
                              height={24}
                              className='shrink-0'
                            />
                          )}
                          <span className='flex-1'>{categoryName}</span>
                          <Check
                            className={cn(
                              'w-5 h-5 shrink-0',
                              isSelected
                                ? 'opacity-100 text-primary'
                                : 'opacity-0'
                            )}
                          />
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  // Simple search input mode (for registration - filters the list below)
  return (
    <div className='space-y-3'>
      <div className='relative'>
        <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
        <input
          type='text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className='w-full pl-12 pr-4 py-4 bg-white border border-neutral-300 rounded-lg text-base md:text-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
          style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
        />
      </div>
    </div>
  );
}