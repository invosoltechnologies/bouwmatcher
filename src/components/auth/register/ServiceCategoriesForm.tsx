'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Loader } from '@/components/ui/loader';
import CategorySearch from '@/components/shared/categories/CategorySearch';
import PopularCategoriesSection from '@/components/shared/categories/PopularCategoriesSection';
import AllCategoriesGrid from '@/components/shared/categories/AllCategoriesGrid';
import SelectedCategoriesCart from '@/components/shared/categories/SelectedCategoriesCart';
import SelectedCategoriesSidebar from '@/components/shared/categories/SelectedCategoriesSidebar';
import { useTranslations, useLocale } from 'next-intl';
import type { ServiceCategory, ProfessionalSpecialization } from '@/types/categories';

interface ServiceCategoriesFormProps {
  onNext: (data: ServiceCategoriesData) => void;
  onBack?: () => void;
}

export interface ServiceCategoriesData {
  selectedCategories: number[];
}

const MAX_CATEGORIES = 6;

// Popular service categories (these should match your database slugs)
const POPULAR_SLUGS = ['schilderwerk', 'loodgieter', 'elektricien'];

export default function ServiceCategoriesForm({ onNext, onBack }: ServiceCategoriesFormProps) {
  const t = useTranslations('auth.register.serviceCategories');
  const locale = useLocale();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [popularCategories, setPopularCategories] = useState<ServiceCategory[]>([]);
  const [allCategories, setAllCategories] = useState<ServiceCategory[]>([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState<ProfessionalSpecialization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/service-categories');

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const { serviceCategories } = await response.json();

        setCategories(serviceCategories || []);

        // Separate popular and all categories
        const popular = serviceCategories?.filter((cat: ServiceCategory) =>
          POPULAR_SLUGS.includes(cat.slug)
        ) || [];
        const all = serviceCategories || [];

        setPopularCategories(popular);
        setAllCategories(all);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error(t('loadingError'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch existing specializations from database
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await fetch('/api/professional-specializations');

        if (!response.ok) {
          // If 404, user hasn't added any specializations yet (this is ok)
          if (response.status === 404) {
            console.log('No specializations found yet');
            return;
          }
          throw new Error('Failed to fetch specializations');
        }

        const { specializations } = await response.json();
        setSelectedSpecializations(specializations || []);
      } catch (error) {
        console.error('Error fetching specializations:', error);
        toast.error(t('loadingSpecializations'));
      }
    };

    fetchSpecializations();
  }, []);

  const toggleCategory = async (categoryId: number) => {
    const isSelected = selectedSpecializations.some(
      (s) => s.service_category_id === categoryId
    );

    if (isSelected) {
      // Remove category - delete from database first
      const spec = selectedSpecializations.find(
        (s) => s.service_category_id === categoryId
      );
      if (!spec) return;

      setIsSaving(true);
      try {
        const response = await fetch(
          `/api/professional-specializations?id=${spec.id}`,
          { method: 'DELETE' }
        );

        if (!response.ok) {
          throw new Error('Failed to delete specialization');
        }

        // Update UI after successful deletion
        setSelectedSpecializations((prev) => prev.filter((s) => s.id !== spec.id));
        toast.success(t('categoryRemoved'));
      } catch (error) {
        console.error('Error deleting specialization:', error);
        toast.error(t('removeError'));
      } finally {
        setIsSaving(false);
      }
    } else {
      // Add category (check max limit)
      if (selectedSpecializations.length >= MAX_CATEGORIES) {
        toast.error(t('maxCategoriesError', { maxCategories: MAX_CATEGORIES }));
        return;
      }

      setIsSaving(true);
      try {
        const priority = selectedSpecializations.length + 1;
        const response = await fetch('/api/professional-specializations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_category_id: categoryId,
            priority,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add specialization');
        }

        const { specialization } = await response.json();

        // Update UI after successful addition
        setSelectedSpecializations((prev) => [...prev, specialization]);
        toast.success(t('categoryAdded'));
      } catch (error) {
        console.error('Error adding specialization:', error);
        toast.error(t('addError'));
      } finally {
        setIsSaving(false);
      }
    }
  };

  const removeCategory = async (specializationId: string) => {
    setIsSaving(true);
    try {
      const response = await fetch(
        `/api/professional-specializations?id=${specializationId}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error('Failed to delete specialization');
      }

      // Update UI after successful deletion
      setSelectedSpecializations((prev) => prev.filter((s) => s.id !== specializationId));
      toast.success(t('categoryRemoved'));
    } catch (error) {
      console.error('Error deleting specialization:', error);
      toast.error(t('removeError'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newSpecializations = [...selectedSpecializations];
    const draggedItem = newSpecializations[draggedIndex];

    newSpecializations.splice(draggedIndex, 1);
    newSpecializations.splice(index, 0, draggedItem);

    setSelectedSpecializations(newSpecializations);
    setDraggedIndex(index);
  };

  const handleDragEnd = async () => {
    setDraggedIndex(null);

    // After reordering, save new priorities to database
    setIsSaving(true);
    try {
      const order = selectedSpecializations.map((spec, index) => ({
        id: spec.id,
        priority: index + 1, // Priority starts from 1
      }));

      const response = await fetch('/api/professional-specializations/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order }),
      });

      if (!response.ok) {
        throw new Error('Failed to update priorities');
      }

      toast.success(t('orderUpdated'));
    } catch (error) {
      console.error('Error updating priorities:', error);
      toast.error(t('orderError'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = () => {
    if (selectedSpecializations.length === 0) {
      toast.error(t('minCategoriesError'));
      return;
    }

    // Data is already saved to database, just move to next step
    onNext({
      selectedCategories: selectedSpecializations.map((s) => s.service_category_id),
    });
  };

  // Show loader while fetching initial data
  if (isLoading) {
    return <Loader fullScreen text={t('loadingCategories')} />;
  }

  return (
    <div className='md:custom-container'>
      {/* Full Screen Loader for saving operations */}
      {isSaving && <Loader fullScreen text={t('saving')} />}

      {/* Header */}
      <div className='mb-6 sm:mb-8 lg:mb-11.5 mt-4 sm:mt-5 lg:mt-5.5 text-center'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 mb-2 sm:mb-3'>
          {t('heading')}
        </h1>
        <p className='text-sm sm:text-base lg:text-lg text-muted-foreground'>
          {t('description', { maxCategories: MAX_CATEGORIES })}
        </p>
      </div>

      {/* Main Card */}
      <div
        className='bg-white/95 rounded-3xl p-4 sm:p-6 lg:p-8'
        style={{ boxShadow: '0px 12px 36px 0px #023AA21F' }}
      >
        <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8'>
          {/* Left Panel - Selection */}
          <div className='w-full lg:w-[60%] space-y-4 sm:space-y-6 lg:space-y-8'>
            {/* Search Input - filters the list below */}
            <CategorySearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t('searchPlaceholder')}
              isDropdown={false}
              isListFiltered={true}
            />

            {/* Popular Categories */}
            {popularCategories.length > 0 && (
              <PopularCategoriesSection
                categories={popularCategories}
                selectedIds={selectedSpecializations.map((s) => s.service_category_id)}
                onToggle={toggleCategory}
                disabled={isSaving}
                showLabel={true}
                label={t('popularLabel')}
                locale={locale}
              />
            )}

            {/* All Categories Grid */}
            <AllCategoriesGrid
              categories={allCategories}
              selectedIds={selectedSpecializations.map((s) => s.service_category_id)}
              onToggle={toggleCategory}
              searchQuery={searchQuery}
              disabled={isSaving}
              showLabel={true}
              label={t('allLabel')}
              columns={2}
              locale={locale}
            />

            {/* Add custom option */}
            <div className='pt-2 sm:pt-4'>
              <button
                type='button'
                className='text-primary hover:text-primary/80 text-sm sm:text-base font-medium flex items-center gap-2'
                onClick={() => toast(t('comingSoon'))}
              >
                {t('addCustom')}
              </button>
            </div>
          </div>

          {/* Right Panel - Sidebar (Desktop only) */}
          <div className='hidden lg:block w-full lg:w-[40%]'>
            <SelectedCategoriesSidebar
              title={t('selectedTitle')}
              selectedSpecializations={selectedSpecializations}
              maxCategories={MAX_CATEGORIES}
              onRemove={removeCategory}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              draggedIndex={draggedIndex}
              isDraggable={true}
              showReorderButton={true}
              onReorderClick={() => toast(t('comingSoon'))}
              showInfoCard={true}
              emptyStateIcon='/icons/services/renovatie.svg'
              locale={locale}
              t={t}
            />
          </div>
        </div>
      </div>

      {/* Floating Cart (Mobile/Tablet only) */}
      <div className='lg:hidden'>
        <SelectedCategoriesCart
          title={t('selectedTitle')}
          selectedSpecializations={selectedSpecializations}
          maxCategories={MAX_CATEGORIES}
          onRemove={removeCategory}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          draggedIndex={draggedIndex}
          isDraggable={true}
          showReorderButton={true}
          onReorderClick={() => toast(t('comingSoon'))}
          showInfoCard={true}
          emptyStateIcon='/icons/services/renovatie.svg'
          locale={locale}
          t={t}
        />
      </div>

      {/* Bottom Buttons - Add padding to avoid overlap with floating cart on mobile */}
      <div className='flex justify-between mt-4 sm:mt-6 px-2 sm:px-4 pb-24 sm:pb-28 lg:pb-4'>
        {onBack && (
          <Button
            type='button'
            variant='ghost'
            onClick={onBack}
            className='px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-base lg:text-lg rounded-xl font-semibold'
            size={null}
          >
            {t('backButton')}
          </Button>
        )}
        <Button
          type='button'
          onClick={handleSubmit}
          className='px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-base lg:text-lg rounded-xl font-semibold shadow-lg ml-auto'
          disabled={selectedSpecializations.length === 0 || isSaving}
          size={null}
        >
          {isSaving ? t('submitting') : t('submitButton')}
        </Button>
      </div>
    </div>
  );
}
