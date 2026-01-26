'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  priority: number;
}

interface Subcategory {
  id: string;
  name: string;
}

interface ServiceCategoriesDisplayCardProps {
  categories: Category[];
  subcategories: Subcategory[];
}

export default function ServiceCategoriesDisplayCard({
  categories,
  subcategories,
}: ServiceCategoriesDisplayCardProps) {
  const getCategoryColor = (index: number) => {
    const colors = [
      { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
      { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
    ];
    return colors[index % colors.length];
  };

  const getSubcategoryColor = (index: number) => {
    const colors = [
      { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
      { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
      { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
      { bg: 'bg-lime-50', text: 'text-lime-700', border: 'border-lime-200' },
    ];
    return colors[index % colors.length];
  };

  return (
    <Card className="px-5 gap-4">
      <CardHeader className="p-0 gap-0">
        <CardTitle className="text-xl leading-normal">
          Service Categorieën
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-5">
        {/* Main Categories */}
        {categories.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-3">
              Hoofdcategorieën
            </h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, idx) => {
                const categoryColor = getCategoryColor(idx);
                return (
                  <Badge
                    key={category.id}
                    variant="secondary"
                    className={cn(
                      'text-xs font-medium border px-3 py-1.5 rounded-full',
                      categoryColor.bg,
                      categoryColor.text,
                      categoryColor.border
                    )}
                  >
                    {category.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        {/* Subcategories */}
        {subcategories.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-3">
              Subcategorieën
            </h4>
            <div className="flex flex-wrap gap-2">
              {subcategories.map((subcategory, idx) => {
                const subcategoryColor = getSubcategoryColor(idx);
                return (
                  <Badge
                    key={subcategory.id}
                    variant="secondary"
                    className={cn(
                      'text-xs font-medium border px-3 py-1.5 rounded-full',
                      subcategoryColor.bg,
                      subcategoryColor.text,
                      subcategoryColor.border
                    )}
                  >
                    {subcategory.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        {categories.length === 0 && subcategories.length === 0 && (
          <p className="text-sm text-slate-500 py-4 text-center">
            Geen service categorieën opgegeven
          </p>
        )}
      </CardContent>
    </Card>
  );
}
