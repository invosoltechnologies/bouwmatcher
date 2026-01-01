'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { Plus, MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ServiceCategory {
  id: number;
  slug: string;
  name_nl: string;
  name_en: string;
  icon_url: string | null;
  professional_count?: number;
}

interface ServiceCategoriesListProps {
  onViewAll?: (categoryId: string) => void;
}

export default function ServiceCategoriesList({
  onViewAll,
}: ServiceCategoriesListProps) {
  const t = useTranslations('common.adminDashboard');
  const locale = useLocale();
  const router = useRouter();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/service-categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const { serviceCategories } = await response.json();

        // Separate popular (first 3) and least used (last 3)
        const allCategories = serviceCategories || [];
        setCategories(allCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryName = (category: ServiceCategory) => {
    return locale === 'nl' ? category.name_nl : category.name_en;
  };

  const handleViewAll = () => {
    router.push('/admin-dashboard/service-categories');
  };

  // Separate popular (top 3) and least used (bottom 3)
  const popularCategories = categories.slice(0, 3);
  const leastUsedCategories = categories.slice(-3).reverse();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden h-fit">
        <div className="px-6 py-8 text-center">
          <p className="text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden h-fit">
      {/* Header with Button */}
      <div className="px-6 py-6 border-b border-slate-200 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900">
          {t('serviceCategories', { defaultValue: 'Servicecategorieën' })}
        </h2>
        <Button
          variant="default"
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          {t('addCategory', { defaultValue: 'Categorie toevoegen' })}
        </Button>
      </div>

      {/* Categories List */}
      <div className="space-y-6 px-6 py-6">
        {/* Popular Categories Section */}
        {popularCategories.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wide px-2">
              {t('popular', { defaultValue: 'Populair' })}
            </h3>
            <div className="space-y-3">
              {popularCategories.map((category) => (
                <CategoryListItem
                  key={category.id}
                  category={category}
                  getCategoryName={getCategoryName}
                  isActive={true}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        )}

        {/* Least Used Categories Section */}
        {leastUsedCategories.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wide px-2">
              {t('lessUsed', { defaultValue: 'Minder gebruikt' })}
            </h3>
            <div className="space-y-3">
              {leastUsedCategories.map((category) => (
                <CategoryListItem
                  key={category.id}
                  category={category}
                  getCategoryName={getCategoryName}
                  isActive={category.professional_count ? category.professional_count > 0 : false}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* View All Link */}
      <div className="px-6 py-4 border-t border-slate-200">
        <button
          onClick={handleViewAll}
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          {t('viewAll', { defaultValue: 'Bekijk alles' })} →
        </button>
      </div>
    </div>
  );
}

interface CategoryListItemProps {
  category: ServiceCategory;
  getCategoryName: (category: ServiceCategory) => string;
  isActive: boolean;
  locale: string;
}

function CategoryListItem({ category, getCategoryName, isActive, locale }: CategoryListItemProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleEdit = () => {
    setMenuOpen(false);
    // TODO: Implement edit functionality
    console.log('Edit category:', category.id);
  };

  const handleDelete = () => {
    setMenuOpen(false);
    // TODO: Implement delete functionality
    console.log('Delete category:', category.id);
  };

  return (
    <div className='flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50 transition-colors group relative'>
      {/* Left Section - Icon and Category Info */}
      <div className='flex items-center gap-3 flex-1'>
        {/* Icon */}
        <div className='w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0'>
          {category.icon_url ? (
            <Image
              src={category.icon_url}
              alt={getCategoryName(category)}
              width={20}
              height={20}
              className='w-5 h-5 object-contain'
            />
          ) : (
            <span className='text-lg'>📦</span>
          )}
        </div>

        {/* Category Info */}
        <div>
          <h3 className='font-medium text-slate-900 text-sm'>
            {getCategoryName(category)}
          </h3>
          <p className='text-xs text-slate-500'>
            {category.professional_count || 0} professionals
          </p>
        </div>
      </div>

      {/* Right Section - Status Badge and Menu */}
      <div className='flex items-center gap-3 flex-shrink-0'>
        <Badge
          className={cn(
            'text-xs font-medium border-0 px-3 py-1',
            isActive
              ? 'bg-green-100 text-green-700'
              : 'bg-slate-100 text-slate-600'
          )}
        >
          {isActive
            ? locale === 'nl'
              ? 'Actief'
              : 'Active'
            : locale === 'nl'
            ? 'Inactief'
            : 'Inactive'}
        </Badge>

        {/* Three Dots Menu Button */}
        <div className='relative'>
          <Button
            variant='ghost'
            size='sm'
            className='p-0 hover:bg-slate-200'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MoreHorizontal className='w-4 h-4 text-slate-600' />
          </Button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className='absolute right-0 top-full mt-1 w-44 bg-white border border-slate-200 rounded-lg shadow-lg z-10'>
              <button
                onClick={handleEdit}
                className='w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 first:rounded-t-lg'
              >
                <Edit2 className='w-4 h-4' />
                {locale === 'nl' ? 'Bewerken' : 'Edit'}
              </button>
              <button
                onClick={handleDelete}
                className='w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 last:rounded-b-lg'
              >
                <Trash2 className='w-4 h-4' />
                {locale === 'nl' ? 'Verwijderen' : 'Delete'}
              </button>
            </div>
          )}
        </div>

        {/* Close menu when clicking outside */}
        {menuOpen && (
          <div
            className='fixed inset-0 z-0'
            onClick={() => setMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
