'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Loader } from '@/components/ui/loader';
import CategoryFilterBar from '@/components/shared/categories/CategoryFilterBar';
import GradientCountBar from '@/components/shared/categories/GradientCountBar';
import SubcategoryAccordion from '@/components/shared/categories/SubcategoryAccordion';
import type { ServiceCategoryWithSubcategories, ServiceSubcategory } from '@/types/categories';

interface SubcategoriesFormProps {
  onNext: (data: SubcategoriesData) => void;
  onBack?: () => void;
}

export interface SubcategoriesData {
  selectedSubcategories: number[];
}

export default function SubcategoriesForm({ onNext, onBack }: SubcategoriesFormProps) {
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
          toast.error('Geen vakgebieden gevonden. Ga terug naar stap 3.');
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
        toast.error('Kon gegevens niet laden');
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
      toast.error('Selecteer minimaal 1 onderdeel');
      return;
    }

    // Save subcategories and proceed
    onNext({
      selectedSubcategories: Array.from(selectedSubcategories),
    });
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
        sub.name_nl.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.subcategories.length > 0);

  // Show loader while fetching initial data
  if (isLoading) {
    return <Loader fullScreen text='Onderdelen laden...' />;
  }

  return (
    <div className='custom-container'>
      {/* Full Screen Loader for saving operations */}
      {isSaving && <Loader fullScreen text='Bezig met opslaan...' />}

      {/* Header */}
      <div className='mb-11.5 mt-5.5 text-center'>
        <h1 className='text-2xl md:text-4xl font-normal text-slate-900 mb-3'>
          Opdrachten die we graag ontvangen zijn...
        </h1>
        <p className='text-base md:text-lg text-muted-foreground'>
          Selecteer de type projecten binnen je vakgebieden.
        </p>
        <p className='text-sm text-muted-foreground mt-1'>
          Je kunt altijd meer vakgebieden/type je wilt ontvangen.
        </p>
      </div>

      {/* Main Card */}
      <div
        className='bg-white/95 rounded-3xl overflow-hidden'
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
          searchPlaceholder='Zoek opdrachttypes...'
          label='Jouw vakgebieden:'
          showLabel={true}
        />

        {/* Gradient Bar with Selected Count */}
        <GradientCountBar
          selectedCount={selectedSubcategories.size}
          maxLimit={30}
          onDeselectAll={deselectAllSubcategories}
          showLimit={true}
          showDeselectButton={true}
          label='geselecteerd'
        />

        {/* Accordion Section with Subcategories */}
        <div className='p-6 lg:p-8 pt-6'>
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
      </div>

      {/* Bottom Buttons */}
      <div className='flex justify-between mt-6 px-2'>
        {onBack && (
          <Button
            type='button'
            variant='ghost'
            onClick={onBack}
            className='px-8 py-5 text-lg rounded-xl font-semibold'
            size={null}
          >
            ← Terug
          </Button>
        )}
        <Button
          type='button'
          onClick={handleSubmit}
          className='px-8 py-5 text-lg rounded-xl font-semibold shadow-lg ml-auto'
          disabled={selectedSubcategories.size === 0 || isSaving}
          size={null}
        >
          {isSaving ? 'Opslaan...' : 'Naar bedrijfsgegevens →'}
        </Button>
      </div>
    </div>
  );
}
