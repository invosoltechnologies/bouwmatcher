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
  locale?: string;
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
  locale = 'nl',
}: CategoryFilterBarProps) {
  // Get category name based on locale
  const getCategoryName = (category: ServiceCategory | ServiceCategoryWithSubcategories) => {
    return locale === 'en' ? (category.name_en || category.name_nl) : category.name_nl;
  };
  return (
    <div className='p-4 sm:p-6 lg:p-8 pb-0'>
      {showLabel && (
        <Label className='text-sm sm:text-base text-slate-900 mb-2 sm:mb-3 block'>{label}</Label>
      )}
      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6'>
        {/* Category Pills */}
        <div className='flex flex-wrap gap-2 sm:gap-3 flex-1 w-full sm:w-auto'>
          {categories.map((category) => (
            <CategoryPill
              key={category.id}
              id={category.id}
              name={getCategoryName(category)}
              icon={category.icon_url}
              selected={selectedFilters.has(category.id)}
              onClick={() => onToggleFilter(category.id)}
            />
          ))}
        </div>

        {/* Search Input */}
        {showSearch && onSearchChange && (
          <div className='relative w-full sm:w-auto sm:max-w-xs'>
            <Search className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 pointer-events-none z-10' />
            <Input
              type='text'
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className='pl-10 sm:pl-12 pr-3 sm:pr-4 h-10 sm:h-12 bg-white border-neutral-300 rounded-lg text-sm sm:text-base'
            />
          </div>
        )}
      </div>
    </div>
  );
}