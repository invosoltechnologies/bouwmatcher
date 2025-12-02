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
}: AllCategoriesGridProps) {
  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name_nl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {showLabel && (
        <Label className='text-base text-slate-900 mb-4 block'>{label}</Label>
      )}
      <div
        className={cn(
          'grid gap-4',
          columns === 2 && 'grid-cols-1 md:grid-cols-2',
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
                'flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left',
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
                  alt={category.name_nl}
                  width={24}
                  height={24}
                  className={cn(
                    'shrink-0',
                    isSelected &&
                      'brightness-0 invert'
                  )}
                />
              )}
              <span className='text-base font-medium flex-1'>{category.name_nl}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}