'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { Plus, MoreHorizontal, Edit2, Trash2, Power } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ServiceCategory, CreateCategoryDTO, UpdateCategoryDTO } from '@/types/categories';
import toast from 'react-hot-toast';
import CategoryFormDialog from './CategoryFormDialog';
import CategoryDeleteDialog from './CategoryDeleteDialog';
import {
  useAdminServiceCategories,
  useCreateCategory,
  useUpdateCategory,
  useToggleCategoryStatus,
  useDeleteCategory,
} from '@/lib/hooks/admin/service-categories';

export default function ServiceCategoriesList() {
  const t = useTranslations('common.adminDashboard');
  const locale = useLocale();
  const router = useRouter();

  // Queries and mutations
  const { data: categories = [], isLoading } = useAdminServiceCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const toggleMutation = useToggleCategoryStatus();
  const deleteMutation = useDeleteCategory();

  // Dialog states
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

  const getCategoryName = (category: ServiceCategory) => {
    return locale === 'nl' ? category.name_nl : category.name_en || category.name_nl;
  };

  const handleViewAll = () => {
    router.push('/admin-dashboard/service-categories');
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setFormDialogOpen(true);
  };

  const handleEditCategory = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setFormDialogOpen(true);
  };

  const handleFormSubmit = async (data: CreateCategoryDTO | UpdateCategoryDTO) => {
    try {
      if (selectedCategory) {
        // Update existing category
        await updateMutation.mutateAsync({
          id: selectedCategory.id,
          data: data as UpdateCategoryDTO,
        });
      } else {
        // Create new category
        await createMutation.mutateAsync(data as CreateCategoryDTO);
      }
    } catch (error: any) {
      if (error?.message?.includes('already exists')) {
        throw new Error(locale === 'nl' ? 'Deze slug bestaat al' : 'This slug already exists');
      }
      throw error;
    }
  };

  const handleToggleStatus = async (category: ServiceCategory) => {
    try {
      await toggleMutation.mutateAsync({
        id: category.id,
        isActive: !category.is_active,
      });
      toast.success(
        category.is_active
          ? locale === 'nl'
            ? 'Categorie gedeactiveerd'
            : 'Category deactivated'
          : locale === 'nl'
          ? 'Categorie geactiveerd'
          : 'Category activated'
      );
    } catch (error: any) {
      toast.error(error?.message || 'An error occurred');
    }
  };

  const handleDeleteCategory = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;
    try {
      await deleteMutation.mutateAsync(selectedCategory.id);
    } catch (error: any) {
      if (error?.code === 'CATEGORY_STILL_ACTIVE') {
        throw new Error(
          locale === 'nl'
            ? 'Categorie moet eerst inactief zijn'
            : 'Category must be inactive first'
        );
      }
      throw error;
    }
  };

  // Filter categories: only show non-deleted
  const nonDeletedCategories = categories.filter((cat) => !cat.is_deleted);

  // Sort by professional count descending
  const sortedCategories = [...nonDeletedCategories].sort(
    (a, b) => (b.professional_count || 0) - (a.professional_count || 0)
  );

  // Separate popular (top 3) and least used (bottom 3)
  const popularCategories = sortedCategories.slice(0, 3);
  const leastUsedCategories = sortedCategories.slice(-3).reverse();

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
    <>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden h-fit">
        {/* Header with Button */}
        <div className="px-6 py-6 border-b border-slate-200 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {t('serviceCategories', { defaultValue: 'Servicecategorieën' })}
          </h2>
          <Button
            onClick={handleAddCategory}
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
                    locale={locale}
                    onEdit={handleEditCategory}
                    onToggleStatus={handleToggleStatus}
                    onDelete={handleDeleteCategory}
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
                    locale={locale}
                    onEdit={handleEditCategory}
                    onToggleStatus={handleToggleStatus}
                    onDelete={handleDeleteCategory}
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

      {/* Dialogs */}
      <CategoryFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        category={selectedCategory}
        onSubmit={handleFormSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <CategoryDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        category={selectedCategory}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}

interface CategoryListItemProps {
  category: ServiceCategory;
  getCategoryName: (category: ServiceCategory) => string;
  locale: string;
  onEdit: (category: ServiceCategory) => void;
  onToggleStatus: (category: ServiceCategory) => void;
  onDelete: (category: ServiceCategory) => void;
}

function CategoryListItem({
  category,
  getCategoryName,
  locale,
  onEdit,
  onToggleStatus,
  onDelete,
}: CategoryListItemProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50 transition-colors group relative">
      {/* Left Section - Icon and Category Info */}
      <div className="flex items-center gap-3 flex-1">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
          {category.icon_url ? (
            <Image
              src={category.icon_url}
              alt={getCategoryName(category)}
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
          ) : (
            <span className="text-lg">📦</span>
          )}
        </div>

        {/* Category Info */}
        <div>
          <h3 className="font-medium text-slate-900 text-sm">
            {getCategoryName(category)}
          </h3>
          <p className="text-xs text-slate-500">
            {category.professional_count || 0}{' '}
            {locale === 'nl' ? 'professionals' : 'professionals'}
          </p>
        </div>
      </div>

      {/* Right Section - Status Badge and Menu */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <Badge
          className={cn(
            'text-xs font-medium border-0 px-3 py-1',
            category.is_active
              ? 'bg-green-100 text-green-700'
              : 'bg-slate-100 text-slate-600'
          )}
        >
          {category.is_active
            ? locale === 'nl'
              ? 'Actief'
              : 'Active'
            : locale === 'nl'
            ? 'Inactief'
            : 'Inactive'}
        </Badge>

        {/* Three Dots Menu Button */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 hover:bg-slate-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MoreHorizontal className="w-4 h-4 text-slate-600" />
          </Button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(category);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 first:rounded-t-lg"
              >
                <Edit2 className="w-4 h-4" />
                {locale === 'nl' ? 'Bewerken' : 'Edit'}
              </button>

              {/* Show Deactivate only if category is active */}
              {category.is_active && (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onToggleStatus(category);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <Power className="w-4 h-4" />
                  {locale === 'nl' ? 'Deactiveren' : 'Deactivate'}
                </button>
              )}

              {/* Show Delete only if category is inactive */}
              {!category.is_active && (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(category);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 last:rounded-b-lg"
                >
                  <Trash2 className="w-4 h-4" />
                  {locale === 'nl' ? 'Verwijderen' : 'Delete'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Close menu when clicking outside */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-0"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
