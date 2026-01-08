'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations, useLocale } from 'next-intl';
import { Plus, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import ServiceCategoriesTable from '@/components/admin-dashboard/ServiceCategoriesTable';
import CategoryFormDialog from '@/components/admin-dashboard/CategoryFormDialog';
import CategoryDeleteDialog from '@/components/admin-dashboard/CategoryDeleteDialog';
import { ServiceCategory, CreateCategoryDTO, UpdateCategoryDTO } from '@/types/categories';
import {
  useAdminServiceCategories,
  useCreateCategory,
  useUpdateCategory,
  useToggleCategoryStatus,
  useDeleteCategory,
} from '@/lib/hooks/admin/service-categories';

export default function ServiceCategoriesPage() {
  const t = useTranslations('common.adminDashboard');
  const locale = useLocale();

  // Queries and mutations
  const { data: categories = [], isLoading } = useAdminServiceCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const toggleMutation = useToggleCategoryStatus();
  const deleteMutation = useDeleteCategory();

  // Filters and search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Dialog states
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

  // Filter categories
  const nonDeletedCategories = categories.filter((cat) => !cat.is_deleted);

  const filteredCategories = nonDeletedCategories.filter((category) => {
    // Search filter
    const categoryName = locale === 'nl' ? category.name_nl : category.name_en || category.name_nl;
    const matchesSearch =
      categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    if (statusFilter === 'active') return matchesSearch && category.is_active;
    if (statusFilter === 'inactive') return matchesSearch && !category.is_active;
    return matchesSearch;
  });

  // Handlers
  const handleAddCategory = () => {
    window.location.href = `/${locale}/admin-dashboard/service-categories/form`;
  };

  const handleEditCategory = (category: ServiceCategory) => {
    window.location.href = `/${locale}/admin-dashboard/service-categories/form?id=${category.id}`;
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

  return (
    <div className="space-y-6">

      {/* Filters and Actions */}
      <div className="bg-white rounded-t-lg border border-slate-200 border-b-0 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {locale === 'nl' ? 'Service Categorieën' : 'Service Categories'}
          </h2>
          <Button
            onClick={handleAddCategory}
            className="gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            {locale === 'nl' ? 'Categorie toevoegen' : 'Add Category'}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-end">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <Input
              placeholder={
                locale === 'nl'
                  ? 'Zoeken op naam of slug...'
                  : 'Search by name or slug...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-50 border-slate-300"
            />
          </div>

          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as 'all' | 'active' | 'inactive')}
          >
            <SelectTrigger className="w-full sm:w-[180px] bg-slate-50 border-slate-300" iconWidth={16} iconHeight={16}>
              <SelectValue
                placeholder={
                  locale === 'nl' ? 'Filter op status' : 'Filter by status'
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {locale === 'nl' ? 'Alle statussen' : 'All statuses'}
              </SelectItem>
              <SelectItem value="active">
                {locale === 'nl' ? 'Actief' : 'Active'}
              </SelectItem>
              <SelectItem value="inactive">
                {locale === 'nl' ? 'Inactief' : 'Inactive'}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Categories Table */}
      <ServiceCategoriesTable
        categories={filteredCategories}
        onEdit={handleEditCategory}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeleteCategory}
        isLoading={isLoading}
      />

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
    </div>
  );
}
