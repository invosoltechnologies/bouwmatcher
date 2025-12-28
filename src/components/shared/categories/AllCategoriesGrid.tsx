'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import type { ServiceCategory } from '@/types/categories';

interface AllCategoriesGridProps {
  categories: ServiceCategory[];
  selectedIds: number[];
  onToggle: (categoryId: number) => void;
  searchQuery?: string;
  disabled?: boolean;
  showLabel?: boolean;
  label?: string;
  columns?: 2 | 3;
  locale?: string;
}

export default function AllCategoriesGrid({
  categories,
  selectedIds,
  onToggle,
  searchQuery = '',
  disabled = false,
  showLabel = true,
  label = 'Alle vakgebieden',
  columns = 2,
  locale = 'nl',
}: AllCategoriesGridProps) {
  // Get category name based on locale
  const getCategoryName = (category: ServiceCategory) => {
    return locale === 'en' ? (category.name_en || category.name_nl) : category.name_nl;
  };

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) => {
    const name = getCategoryName(category);
    return name && name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      {showLabel && (
        <Label className='text-base text-slate-900 mb-4 block'>{label}</Label>
      )}
      <div
        className={cn(
          'grid gap-4',
          columns === 2 && 'grid-cols-2',
          columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        )}
      >
        {filteredCategories.map((category) => {
          const isSelected = selectedIds.includes(category.id);
          return (
            <button
              key={category.id}
              type='button'
              onClick={() => !disabled && onToggle(category.id)}
              disabled={disabled}
              className={cn(
                'flex items-center gap-3 px-0 py-4 flex-col sm:flex-row sm:p-4 text-sm  rounded-xl border-2 transition-all text-left',
                isSelected
                  ? 'border-primary bg-primary text-white'
                  : 'border-neutral-300 bg-white hover:border-primary',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              style={!isSelected ? { boxShadow: '0px 2px 6.5px 0px #0000001A' } : undefined}
            >
              {category.icon_url && (
                <Image
                  src={category.icon_url}
                  alt={getCategoryName(category)}
                  width={24}
                  height={24}
                  className={cn(
                    'w-5 h-5 sm:w-6 sm:h-6 shrink-0',
                    isSelected &&
                      'brightness-0 invert'
                  )}
                />
              )}
              <span className='text-base font-medium flex-1'>{getCategoryName(category)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}