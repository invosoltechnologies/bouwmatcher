'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Loader } from '@/components/ui/loader';
import CategorySearch from '@/components/shared/categories/CategorySearch';
import GradientCountBar from '@/components/shared/categories/GradientCountBar';
import SubcategoryAccordion from '@/components/shared/categories/SubcategoryAccordion';
import SelectedCategoriesSidebar from '@/components/shared/categories/SelectedCategoriesSidebar';
import SelectedCategoriesCart from '@/components/shared/categories/SelectedCategoriesCart';
import TipsBestPracticesCard from './TipsBestPracticesCard';
import MonthStatsCard from './MonthStatsCard';
import type {
  ServiceCategory,
  ServiceCategoryWithSubcategories,
  ServiceSubcategory,
  ProfessionalSpecialization,
} from '@/types/categories';

const MAX_CATEGORIES = 6;

export default function WerkgebiedPageClient() {
  const t = useTranslations('common.proDashboard.werkgebied');

  const [allCategories, setAllCategories] = useState<ServiceCategory[]>([]);
  const [categories, setCategories] = useState<ServiceCategoryWithSubcategories[]>([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState<ProfessionalSpecialization[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Fetch all categories and user's specializations with subcategories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all service categories for the dropdown
        const categoriesResponse = await fetch('/api/service-categories');
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }
        const { serviceCategories } = await categoriesResponse.json();
        setAllCategories(serviceCategories || []);

        // Get the user's selected specializations (categories)
        const specializationsResponse = await fetch('/api/professional-specializations');
        if (!specializationsResponse.ok) {
          throw new Error('Failed to fetch specializations');
        }

        const { specializations } = await specializationsResponse.json();
        setSelectedSpecializations(specializations || []);

        if (!specializations || specializations.length === 0) {
          setIsLoading(false);
          return;
        }

        // Get the category IDs
        const categoryIds = specializations.map(
          (s: { service_category_id: number }) => s.service_category_id
        );

        // Fetch subcategories for these categories
        const subcategoriesResponse = await fetch(
          `/api/service-subcategories?categoryIds=${categoryIds.join(',')}`
        );

        if (!subcategoriesResponse.ok) {
          throw new Error('Failed to fetch subcategories');
        }

        const { subcategories } = await subcategoriesResponse.json();

        // Fetch existing professional subcategories
        const professionalSubcategoriesResponse = await fetch('/api/professional-subcategories');
        let existingSubcategoryIds: number[] = [];

        if (professionalSubcategoriesResponse.ok) {
          const { subcategories: professionalSubcategories } = await professionalSubcategoriesResponse.json();
          existingSubcategoryIds = professionalSubcategories.map(
            (ps: { subcategory_id: number }) => ps.subcategory_id
          );
        }

        // Group subcategories by category
        const categoriesMap = new Map<number, ServiceCategoryWithSubcategories>();

        specializations.forEach((spec: {
          service_category_id: number;
          service_categories: {
            id: number;
            slug: string;
            name_nl: string;
            icon_url: string | null;
          };
        }) => {
          categoriesMap.set(spec.service_category_id, {
            id: spec.service_categories.id,
            slug: spec.service_categories.slug,
            name_nl: spec.service_categories.name_nl,
            icon_url: spec.service_categories.icon_url,
            subcategories: [],
          });
        });

        // Add subcategories to their respective categories
        subcategories.forEach((sub: ServiceSubcategory) => {
          const category = categoriesMap.get(sub.service_category_id);
          if (category) {
            category.subcategories.push(sub);
          }
        });

        const categoriesArray = Array.from(categoriesMap.values());
        setCategories(categoriesArray);

        // Set previously selected subcategories
        if (existingSubcategoryIds.length > 0) {
          setSelectedSubcategories(new Set(existingSubcategoryIds));
        }

        // Open all accordions by default
        setOpenAccordions(categoriesArray.map(cat => cat.id.toString()));
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error(t('errorLoading'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [t]);

  const handleCategorySelect = async (category: ServiceCategory) => {
    // Check if category is already selected
    const isSelected = selectedSpecializations.some((s) => s.service_category_id === category.id);

    if (isSelected) {
      toast(t('categoryAlreadyAdded'));
      return;
    }

    // Check max limit
    if (selectedSpecializations.length >= MAX_CATEGORIES) {
      toast.error(t('maxCategoriesError', { max: MAX_CATEGORIES }));
      return;
    }

    // Add the category
    setIsSaving(true);
    try {
      const response = await fetch('/api/professional-specializations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_category_id: category.id,
          priority: selectedSpecializations.length + 1,
        }),
      });

      if (!response.ok) throw new Error('Failed to add specialization');

      toast.success(t('categoryAdded'));

      // Refresh the page data
      window.location.reload();
    } catch (error) {
      console.error('Error adding specialization:', error);
      toast.error(t('errorAdding'));
    } finally {
      setIsSaving(false);
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

      // Refresh to update subcategories
      window.location.reload();
    } catch (error) {
      console.error('Error deleting specialization:', error);
      toast.error(t('errorRemoving'));
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
        priority: index + 1,
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
      toast.error(t('errorUpdatingOrder'));
    } finally {
      setIsSaving(false);
    }
  };

  // const toggleCategoryFilter = (categoryId: number) => {
  //   setSelectedCategoryFilters((prev) => {
  //     const newSet = new Set(prev);
  //     if (newSet.has(categoryId)) {
  //       newSet.delete(categoryId);
  //     } else {
  //       newSet.add(categoryId);
  //     }
  //     return newSet;
  //   });
  // };

  const deselectAllSubcategories = () => {
    setSelectedSubcategories(new Set());
  };

  const toggleSubcategory = (subcategoryId: number) => {
    setSelectedSubcategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(subcategoryId)) {
        newSet.delete(subcategoryId);
      } else {
        newSet.add(subcategoryId);
      }
      return newSet;
    });
  };

  const selectAllInCategory = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return;

    const allSelected = category.subcategories.every((sub) =>
      selectedSubcategories.has(sub.id)
    );

    setSelectedSubcategories((prev) => {
      const newSet = new Set(prev);
      if (allSelected) {
        // Deselect all
        category.subcategories.forEach((sub) => newSet.delete(sub.id));
      } else {
        // Select all
        category.subcategories.forEach((sub) => newSet.add(sub.id));
      }
      return newSet;
    });
  };

  const handleSave = async () => {
    if (selectedSubcategories.size === 0) {
      toast.error(t('minSelectionError'));
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/professional-subcategories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subcategoryIds: Array.from(selectedSubcategories),
          skipStepUpdate: true, // Don't update current_step when saving from dashboard
        }),
      });

      if (!response.ok) throw new Error('Failed to save subcategories');

      toast.success(t('saveSuccess'));
    } catch (error) {
      console.error('Error saving subcategories:', error);
      toast.error(t('errorSaving'));
    } finally {
      setIsSaving(false);
    }
  };

  // Filter categories based on search
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      subcategories: category.subcategories.filter((sub) =>
        sub.name_nl.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.subcategories.length > 0);

  // Show loader while fetching initial data
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <Loader fullScreen text={t('loading')} />
      </div>
    );
  }

  return (
    <div className='lg:p-6 lg:space-y-6'>
      {isSaving && <Loader fullScreen text={t('saving')} />}

      {/* Two Column Layout */}
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Left Column - Main Content */}
        <div className='flex-1 space-y-6'>
          {/* Main Card */}
          <div
            className='bg-white rounded-2xl overflow-hidden border border-neutral-200'
          >
            {/* Combobox Search for adding categories */}
            <div className='p-6'>
              <CategorySearch
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t('searchPlaceholder')}
                isDropdown={true}
                isListFiltered={false}
                categories={allCategories}
                selectedIds={selectedSpecializations.map((s) => s.service_category_id)}
                onCategorySelect={handleCategorySelect}
              />
            </div>

            {/* Gradient Bar with Selected Count */}
            {categories.length > 0 && (
              <GradientCountBar
                selectedCount={selectedSubcategories.size}
                maxLimit={30}
                onDeselectAll={deselectAllSubcategories}
                showLimit={true}
                showDeselectButton={true}
                label={t('selected')}
              />
            )}

            {/* Accordion Section with Subcategories */}
            {categories.length > 0 ? (
              <div className='lg:p-6 px-4 py-6'>
                <SubcategoryAccordion
                  categories={filteredCategories}
                  selectedSubcategoryIds={selectedSubcategories}
                  onToggleSubcategory={toggleSubcategory}
                  onSelectAllInCategory={selectAllInCategory}
                  openAccordions={openAccordions}
                  onAccordionChange={setOpenAccordions}
                  showPrices={true}
                  searchQuery={searchQuery}
                />
              </div>
            ) : (
              <div className='p-6 text-center py-12'>
                <p className='text-slate-500 mb-4'>
                  {t('noCategories')}
                </p>
              </div>
            )}
          </div>

          {/* Save Button */}
          {categories.length > 0 && (
            <div className='flex justify-end'>
              <Button
                type='button'
                onClick={handleSave}
                className='px-8 py-3 text-base rounded-xl font-semibold'
                disabled={selectedSubcategories.size === 0 || isSaving}
                size={null}
              >
                {isSaving ? t('savingButton') : t('saveButton')}
              </Button>
            </div>
          )}

          {/* Tips & Best Practices Card (Mobile) */}
          <div className='lg:hidden'>
            <TipsBestPracticesCard />
          </div>

          {/* Deze maand Stats Card (Mobile) */}
          <div className='lg:hidden'>
            <MonthStatsCard />
          </div>
        </div>

        {/* Right Column - Sidebar (Desktop only) */}
        <div className='hidden lg:block w-full lg:w-[380px] space-y-6'>
          {/* Selected Categories Sidebar */}
          <SelectedCategoriesSidebar
            title={t('selectedCategories')}
            selectedSpecializations={selectedSpecializations}
            maxCategories={MAX_CATEGORIES}
            onRemove={removeCategory}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            draggedIndex={draggedIndex}
            isDraggable={true}
            showReorderButton={true}
            onReorderClick={() => toast(t('dragToReorder'))}
            showInfoCard={true}
            emptyStateIcon='/icons/services/renovatie.svg'
          />

          {/* Tips & Best Practices Card (Desktop) */}
          <TipsBestPracticesCard />

          {/* Deze maand Stats Card (Desktop) */}
          <MonthStatsCard />
        </div>
      </div>

      {/* Floating Cart (Mobile/Tablet only) */}
      <div className='lg:hidden'>
        <SelectedCategoriesCart
          title={t('selectedCategories')}
          selectedSpecializations={selectedSpecializations}
          maxCategories={MAX_CATEGORIES}
          onRemove={removeCategory}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          draggedIndex={draggedIndex}
          isDraggable={true}
          showReorderButton={true}
          onReorderClick={() => toast(t('dragToReorder'))}
          showInfoCard={true}
          emptyStateIcon='/icons/services/renovatie.svg'
          onProceed={handleSave}
        />
      </div>
    </div>
  );
}