'use client';

import { Label } from '@/components/ui/label';
import { CategoryPill } from '@/components/ui/category-pill';
import type { ServiceCategory } from '@/types/categories';

interface PopularCategoriesSectionProps {
  categories: ServiceCategory[];
  selectedIds: number[];
  onToggle: (categoryId: number) => void;
  disabled?: boolean;
  showLabel?: boolean;
  label?: string;
  locale?: string;
}

export default function PopularCategoriesSection({
  categories,
  selectedIds,
  onToggle,
  disabled = false,
  showLabel = true,
  label = 'Populaire keuzes',
  locale = 'nl',
}: PopularCategoriesSectionProps) {
  // Get category name based on locale
  const getCategoryName = (category: ServiceCategory) => {
    return locale === 'en' ? (category.name_en || category.name_nl) : category.name_nl;
  };

  return (
    <div>
      {showLabel && (
        <Label className='text-base text-slate-900 mb-4 block'>{label}</Label>
      )}
      <div className='flex flex-wrap gap-3'>
        {categories.map((category) => (
          <CategoryPill
            key={category.id}
            id={category.id}
            name={getCategoryName(category)}
            icon={category.icon_url}
            selected={selectedIds.includes(category.id)}
            onClick={() => !disabled && onToggle(category.id)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}