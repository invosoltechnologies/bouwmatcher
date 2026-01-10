'use client';

import { useState, useMemo } from 'react';
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
import { Plus, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ServicePagesTable from '@/components/admin-dashboard/ServicePagesTable';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  useServicePages,
  useDeleteServicePage,
  useUpdateServicePageStatus,
  useCreateServicePage,
} from '@/lib/hooks/admin/service-pages';
import { ServicePageDTO } from '@/lib/api/admin/service-pages.api';
import { useAdminServiceCategories } from '@/lib/hooks/admin/service-categories';

export default function ServicePagesPage() {
  const t = useTranslations('common.adminDashboard');
  const locale = useLocale();
  const router = useRouter();

  // Queries and mutations
  const { data: pages = [] } = useServicePages();
  const { data: categories = [] } = useAdminServiceCategories();
  const createMutation = useCreateServicePage();
  const deleteMutation = useDeleteServicePage();
  const statusMutation = useUpdateServicePageStatus();

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'pending' | 'active'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<ServicePageDTO | null>(null);
  const [statusChangeDialog, setStatusChangeDialog] = useState(false);
  const [statusChangeTarget, setStatusChangeTarget] = useState<'draft' | 'pending' | 'active' | null>(null);

  // Filtered pages
  const filteredPages = useMemo(() => {
    return pages.filter((page) => {
      // Search filter
      const categoryName =
        locale === 'nl'
          ? page.category_name_nl || page.category_name
          : page.category_name_en || page.category_name;

      const matchesSearch = (categoryName || '')
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Status filter
      if (statusFilter !== 'all' && page.status !== statusFilter) {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'all' && page.service_category_id !== categoryFilter) {
        return false;
      }

      return matchesSearch;
    });
  }, [pages, searchQuery, statusFilter, categoryFilter, locale]);

  // Handlers
  const handleCreateNew = async () => {
    // Navigate to category selection or create form
    if (categories.length === 0) {
      toast.error(locale === 'nl' ? 'Geen categorieën beschikbaar' : 'No categories available');
      return;
    }

    // For now, redirect to create page or show category selection
    router.push(`/${locale}/admin-dashboard/service-pages/new`);
  };

  const handleEdit = (page: ServicePageDTO) => {
    router.push(`/${locale}/admin-dashboard/service-pages/${page.id}`);
  };

  const handleDeleteClick = (page: ServicePageDTO) => {
    setSelectedPage(page);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPage) return;

    try {
      await deleteMutation.mutateAsync(selectedPage.id);
      setDeleteDialogOpen(false);
      setSelectedPage(null);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleStatusChange = async (
    page: ServicePageDTO,
    newStatus: 'draft' | 'pending' | 'active'
  ) => {
    setSelectedPage(page);
    setStatusChangeTarget(newStatus);
    setStatusChangeDialog(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!selectedPage || !statusChangeTarget) return;

    try {
      await statusMutation.mutateAsync({
        pageId: selectedPage.id,
        status: statusChangeTarget,
      });
      setStatusChangeDialog(false);
      setSelectedPage(null);
      setStatusChangeTarget(null);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || categoryFilter !== 'all';

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('all');
  };

  return (
    <div>
      {/* Filters Section */}
      <div className='bg-white rounded-t-lg border border-slate-200 border-b-0 p-6 space-y-4'>
        <div className='flex flex-wrap gap-4'>
          {/* Search */}
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4' />
            <Input
              placeholder={
                locale === 'nl' ? 'Zoeken op slug...' : 'Search by slug...'
              }
              className='pl-10 bg-slate-50 border-slate-300'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={(value: any) => setStatusFilter(value)}
          >
            <SelectTrigger className='bg-slate-50 border-slate-300'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>
                {locale === 'nl' ? 'Alle statussen' : 'All Statuses'}
              </SelectItem>
              <SelectItem value='draft'>
                {locale === 'nl' ? 'Concept' : 'Draft'}
              </SelectItem>
              <SelectItem value='pending'>
                {locale === 'nl' ? 'In behandeling' : 'Pending'}
              </SelectItem>
              <SelectItem value='active'>
                {locale === 'nl' ? 'Actief' : 'Active'}
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className='bg-slate-50 border-slate-300'>
              <SelectValue
                placeholder={
                  locale === 'nl' ? 'Alle categorieën' : 'All Categories'
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>
                {locale === 'nl' ? 'Alle categorieën' : 'All Categories'}
              </SelectItem>
              {categories
                .filter((cat) => !cat.is_deleted)
                .map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {locale === 'nl'
                      ? category.name_nl
                      : category.name_en || category.name_nl}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* Add New Button */}
          <div className='flex justify-end'>
            <Button onClick={handleCreateNew} className='gap-2'>
              <Plus className='w-4 h-4' />
              {locale === 'nl' ? 'Nieuwe pagina' : 'Add New Page'}
            </Button>
          </div>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <div className='flex justify-end'>
            <Button
              variant='outline'
              size='sm'
              onClick={handleResetFilters}
              className='gap-2'
            >
              <X className='w-4 h-4' />
              {locale === 'nl' ? 'Reset' : 'Reset'}
            </Button>
          </div>
        )}
      </div>

      {/* Table Section */}
      <ServicePagesTable
        pages={filteredPages}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onStatusChange={handleStatusChange}
        onCreateNew={handleCreateNew}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>
            {locale === 'nl' ? 'Pagina verwijderen?' : 'Delete Service Page?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {locale === 'nl'
              ? 'Weet je zeker dat je deze servicepagina wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.'
              : 'Are you sure you want to delete this service page? This action cannot be undone.'}
          </AlertDialogDescription>
          <div className='flex justify-end gap-3'>
            <AlertDialogCancel>
              {locale === 'nl' ? 'Annuleren' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className='bg-red-600 hover:bg-red-700 text-white'
            >
              {locale === 'nl' ? 'Verwijderen' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Status Change Confirmation Dialog */}
      <AlertDialog
        open={statusChangeDialog}
        onOpenChange={setStatusChangeDialog}
      >
        <AlertDialogContent>
          <AlertDialogTitle>
            {locale === 'nl' ? 'Status wijzigen?' : 'Change Status?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {locale === 'nl'
              ? `Weet je zeker dat je de status wilt wijzigen naar "${
                  statusChangeTarget === 'draft'
                    ? 'Concept'
                    : statusChangeTarget === 'pending'
                    ? 'In behandeling'
                    : 'Actief'
                }"?`
              : `Are you sure you want to change the status to "${
                  statusChangeTarget === 'draft'
                    ? 'Draft'
                    : statusChangeTarget === 'pending'
                    ? 'Pending'
                    : 'Active'
                }"?`}
          </AlertDialogDescription>
          <div className='flex justify-end gap-3'>
            <AlertDialogCancel>
              {locale === 'nl' ? 'Annuleren' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmStatusChange}>
              {locale === 'nl' ? 'Bevestigen' : 'Confirm'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
