'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Loader } from '@/components/ui/loader';
import CategoryFilterBar from '@/components/shared/categories/CategoryFilterBar';
import GradientCountBar from '@/components/shared/categories/GradientCountBar';
import SubcategoryAccordion from '@/components/shared/categories/SubcategoryAccordion';
import { useTranslations, useLocale } from 'next-intl';
import type { ServiceCategoryWithSubcategories, ServiceSubcategory } from '@/types/categories';

interface SubcategoriesFormProps {
  onNext: (data: SubcategoriesData) => void;
  onBack?: () => void;
}

export interface SubcategoriesData {
  selectedSubcategories: number[];
}

export default function SubcategoriesForm({ onNext, onBack }: SubcategoriesFormProps) {
  const t = useTranslations('auth.register.subcategories');
  const locale = useLocale();
  const [categories, setCategories] = useState<ServiceCategoryWithSubcategories[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<Set<number>>(new Set());
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  // Fetch user's selected categories and their subcategories
  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      try {
        // First, get the user's selected specializations (categories from step 3)
        const specializationsResponse = await fetch('/api/professional-specializations');

        if (!specializationsResponse.ok) {
          throw new Error('Failed to fetch specializations');
        }

        const { specializations } = await specializationsResponse.json();

        if (!specializations || specializations.length === 0) {
          toast.error(t('noCategoriesError'));
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
            name_en?: string | null;
            icon_url: string | null;
          };
        }) => {
          categoriesMap.set(spec.service_category_id, {
            id: spec.service_categories.id,
            slug: spec.service_categories.slug,
            name_nl: spec.service_categories.name_nl,
            name_en: spec.service_categories.name_en ?? undefined,
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
        toast.error(t('loadingError'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoriesAndSubcategories();
  }, []);

  const toggleCategoryFilter = (categoryId: number) => {
    setSelectedCategoryFilters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resetCategoryFilters = () => {
    setSelectedCategoryFilters(new Set());
  };

  const deselectAllSubcategories = () => {
    setSelectedSubcategories(new Set());
    setSelectedCategoryFilters(new Set());
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

  const handleSubmit = () => {
    if (selectedSubcategories.size === 0) {
      toast.error(t('minSubcategoriesError'));
      return;
    }

    // Save subcategories and proceed
    onNext({
      selectedSubcategories: Array.from(selectedSubcategories),
    });
  };

  // Helper function to get subcategory name based on locale
  const getSubcategoryName = (sub: ServiceSubcategory) => {
    return locale === 'en' ? (sub.name_en || sub.name_nl) : sub.name_nl;
  };

  // Filter categories based on category filter pills and search
  const filteredCategories = categories
    .filter((category) => {
      // If no category filters selected, show all categories
      if (selectedCategoryFilters.size === 0) return true;
      // Otherwise, only show selected categories
      return selectedCategoryFilters.has(category.id);
    })
    .map((category) => ({
      ...category,
      subcategories: category.subcategories.filter((sub) =>
        getSubcategoryName(sub).toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.subcategories.length > 0);

  // Show loader while fetching initial data
  if (isLoading) {
    return <Loader fullScreen text={t('loadingSubcategories')} />;
  }

  return (
    <div className='md:custom-container'>
      {/* Full Screen Loader for saving operations */}
      {isSaving && <Loader fullScreen text={t('saving')} />}

      {/* Header */}
      <div className='mb-6 sm:mb-8 lg:mb-11.5 mt-4 sm:mt-5 lg:mt-5.5 text-center px-4 sm:px-0'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 mb-2 sm:mb-3'>
          {t('heading')}
        </h1>
        <p className='text-sm sm:text-base lg:text-lg text-muted-foreground'>
          {t('description')}
        </p>
        <p className='text-xs sm:text-sm text-muted-foreground mt-1'>
          {t('additionalInfo')}
        </p>
      </div>

      {/* Main Card */}
      <div
        className='bg-white/95 rounded-3xl overflow-hidden mx-2 sm:mx-0'
        style={{ boxShadow: '0px 12px 36px 0px #023AA21F' }}
      >
        {/* Category Filter Pills and Search */}
        <CategoryFilterBar
          categories={categories}
          selectedFilters={selectedCategoryFilters}
          onToggleFilter={toggleCategoryFilter}
          showSearch={true}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder={t('searchPlaceholder')}
          label={t('yourCategories')}
          showLabel={true}
          locale={locale}
        />

        {/* Gradient Bar with Selected Count */}
        <GradientCountBar
          selectedCount={selectedSubcategories.size}
          maxLimit={30}
          onDeselectAll={deselectAllSubcategories}
          showLimit={true}
          showDeselectButton={true}
          label={t('selectedLabel')}
        />

        {/* Accordion Section with Subcategories */}
        <div className='p-4 sm:p-6 lg:p-8 pt-4 sm:pt-6'>
          <SubcategoryAccordion
            categories={filteredCategories}
            selectedSubcategoryIds={selectedSubcategories}
            onToggleSubcategory={toggleSubcategory}
            onSelectAllInCategory={selectAllInCategory}
            openAccordions={openAccordions}
            onAccordionChange={setOpenAccordions}
            showPrices={true}
            searchQuery={searchQuery}
            locale={locale}
          />
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className='flex justify-between mt-4 sm:mt-6 px-2 sm:px-4'>
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
          className='px-4 sm:px-8 py-4 sm:py-4 text-sm sm:text-base lg:text-lg rounded-xl font-semibold shadow-lg ml-auto'
          disabled={selectedSubcategories.size === 0 || isSaving}
          size={null}
        >
          {isSaving ? t('submitting') : t('submitButton')}
        </Button>
      </div>
    </div>
  );
}
