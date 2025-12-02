'use client';

import { Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CategoryPill } from '@/components/ui/category-pill';
import type { ServiceCategory, ServiceCategoryWithSubcategories } from '@/types/categories';

interface CategoryFilterBarProps {
  categories: ServiceCategory[] | ServiceCategoryWithSubcategories[];
  selectedFilters: Set<number>;
  onToggleFilter: (id: number) => void;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  label?: string;
  showLabel?: boolean;
}

export default function CategoryFilterBar({
  categories,
  selectedFilters,
  onToggleFilter,
  showSearch = true,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Zoek opdrachttypes...',
  label = 'Jouw vakgebieden:',
  showLabel = true,
}: CategoryFilterBarProps) {
  return (
    <div className='p-6 lg:p-8 pb-0'>
      {showLabel && (
        <Label className='text-base text-slate-900 mb-3 block'>{label}</Label>
      )}
      <div className='flex items-center gap-4 mb-6'>
        {/* Category Pills */}
        <div className='flex flex-wrap gap-3 flex-1'>
          {categories.map((category) => (
            <CategoryPill
              key={category.id}
              id={category.id}
              name={category.name_nl}
              icon={category.icon_url}
              selected={selectedFilters.has(category.id)}
              onClick={() => onToggleFilter(category.id)}
            />
          ))}
        </div>

        {/* Search Input */}
        {showSearch && onSearchChange && (
          <div className='relative w-full max-w-xs'>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10' />
            <Input
              type='text'
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className='pl-12 pr-4 h-12 bg-white border-neutral-300 rounded-lg text-base'
            />
          </div>
        )}
      </div>
    </div>
  );
}