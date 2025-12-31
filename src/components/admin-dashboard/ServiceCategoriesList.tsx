'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface ServiceCategory {
  id: string;
  name: string;
  professionalCount: number;
  isActive: boolean;
}

interface ServiceCategoriesListProps {
  categories: ServiceCategory[];
  onViewAll?: (categoryId: string) => void;
}

export default function ServiceCategoriesList({
  categories,
  onViewAll,
}: ServiceCategoriesListProps) {
  const t = useTranslations('common.adminDashboard');

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden h-fit">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 border-b border-slate-200">
        <h2 className="text-lg md:text-xl font-semibold text-secondary-foreground">
          {t('serviceCategories', { defaultValue: 'Servicecategorieën' })}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t('serviceCategoriesDesc', {
            defaultValue: 'Aantal professionals per categorie',
          })}
        </p>
      </div>

      {/* Categories List */}
      <div className="divide-y divide-slate-200">
        {categories.map((category) => (
          <div
            key={category.id}
            className="px-4 md:px-6 py-4 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-secondary-foreground truncate">
                    {category.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className={cn(
                      'text-xs capitalize flex-shrink-0',
                      category.isActive
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    )}
                  >
                    {category.isActive
                      ? t('active', { defaultValue: 'Actief' })
                      : t('inactive', { defaultValue: 'Inactief' })}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {category.professionalCount}{' '}
                  {category.professionalCount === 1
                    ? t('professional', { defaultValue: 'professional' })
                    : t('professionals', { defaultValue: 'professionals' })}
                </p>
              </div>
            </div>

            {/* View all professionals button */}
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 w-full text-primary hover:text-primary hover:bg-primary/5"
              onClick={() => onViewAll?.(category.id)}
            >
              {t('viewAllProfessionals', {
                defaultValue: 'Bekijk alle professionals',
              })}
            </Button>
          </div>
        ))}
      </div>

      {/* Show all categories link */}
      <div className="px-4 md:px-6 py-4 border-t border-slate-200 text-center">
        <Button variant="link" className="text-primary font-medium">
          {t('viewAllCategories', {
            defaultValue: 'Bekijk alle categorieën',
          })}
        </Button>
      </div>
    </div>
  );
}
