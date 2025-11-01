'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Search, Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Loader } from '@/components/ui/loader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PricePill } from '@/components/ui/price-pill';
import { CategoryPill } from '@/components/ui/category-pill';

interface ServiceSubcategory {
  id: number;
  slug: string;
  name_nl: string;
  name_en: string | null;
  service_category_id: number;
  service_category_name: string;
  price_particulier: number | null;
  price_zakelijk: number | null;
  icon_url: string | null;
}

interface ServiceCategory {
  id: number;
  slug: string;
  name_nl: string;
  icon_url: string | null;
  subcategories: ServiceSubcategory[];
}

interface SubcategoriesFormProps {
  onNext: (data: SubcategoriesData) => void;
  onBack?: () => void;
}

export interface SubcategoriesData {
  selectedSubcategories: number[];
}

export default function SubcategoriesForm({ onNext, onBack }: SubcategoriesFormProps) {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
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
        const categoriesMap = new Map<number, ServiceCategory>();

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
        {/* Category Filter Pills and Search - Same Line */}
        <div className='p-6 lg:p-8 pb-0'>
          <Label className='text-base text-slate-900 mb-3 block'>
            Jouw vakgebieden:
          </Label>
          <div className='flex items-center gap-4 mb-6'>
            {/* Category Pills */}
            <div className='flex flex-wrap gap-3 flex-1'>
              {categories.map((category) => (
                <CategoryPill
                  key={category.id}
                  id={category.id}
                  name={category.name_nl}
                  icon={category.icon_url}
                  selected={selectedCategoryFilters.has(category.id)}
                  onClick={() => toggleCategoryFilter(category.id)}
                />
              ))}
            </div>

            {/* Search Input */}
            <div className='relative w-full max-w-xs'>
              <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10' />
              <Input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Zoek opdrachttypes...'
                className='pl-12 pr-4 h-12 bg-white border-neutral-300 rounded-lg text-base'
              />
            </div>
          </div>
        </div>

        {/* Gradient Bar with Selected Count - Full Width */}
        <div
          className='px-6 lg:px-8 py-3 flex items-center justify-between'
          style={{ background: 'linear-gradient(90deg, rgba(2, 58, 162, 0.1) 0%, rgba(10, 178, 126, 0.1) 100%)' }}
        >
          <p className='text-sm font-medium text-slate-900'>
            {selectedSubcategories.size} geselecteerd
          </p>
          <div className='flex items-center gap-4'>
            <button
              type='button'
              onClick={deselectAllSubcategories}
              className='text-primary text-sm font-medium hover:text-primary/80'
            >
              Deselecteer alle
            </button>
            <p className='text-sm font-medium text-slate-900'>
              Limiet: {selectedSubcategories.size}/30
            </p>
          </div>
        </div>

        {/* Accordion Section */}
        <div className='p-6 lg:p-8 pt-6'>

        {/* Categories Accordion */}
        {filteredCategories.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-slate-500'>
              Geen resultaten gevonden voor &quot;{searchQuery}&quot;
            </p>
          </div>
        ) : (
          <Accordion
            type='multiple'
            value={openAccordions}
            onValueChange={setOpenAccordions}
            className='space-y-4'
          >
            {filteredCategories.map((category) => {
              return (
                <AccordionItem
                  key={category.id}
                  value={category.id.toString()}
                  className='border-2 rounded-xl px-4 transition-all border-neutral-300 bg-white'
                  style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
                >
                  <AccordionTrigger
                    className='hover:no-underline py-4'
                    chevronClassName='w-5 h-5 text-slate-900'
                  >
                    <div className='flex items-center justify-between flex-1 pr-4'>
                      <div className='flex items-center gap-3'>
                        {category.icon_url && (
                          <Image
                            src={category.icon_url}
                            alt={category.name_nl}
                            width={24}
                            height={24}
                            className='[filter:brightness(0)_saturate(100%)_invert(7%)_sepia(8%)_saturate(6422%)_hue-rotate(187deg)_brightness(98%)_contrast(95%)]'
                          />
                        )}
                        <span className='text-base font-semibold text-slate-900'>
                          {category.name_nl}
                        </span>
                        <span className='text-sm text-slate-500'>
                          {category.subcategories.filter((sub) =>
                            selectedSubcategories.has(sub.id)
                          ).length}/{category.subcategories.length}
                        </span>
                      </div>
                      <span
                        role='button'
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectAllInCategory(category.id);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            selectAllInCategory(category.id);
                          }
                        }}
                        className='text-primary text-sm font-medium hover:text-primary/80 cursor-pointer'
                      >
                        Alles selecteren
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className='space-y-3 pt-2'>
                      {category.subcategories.map((subcategory) => {
                        const isSelected = selectedSubcategories.has(subcategory.id);
                        return (
                          <div
                            key={subcategory.id}
                            className={cn(
                              'flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer',
                              isSelected
                                ? 'border-primary bg-primary/10'
                                : 'border-neutral-200 bg-white hover:border-primary'
                            )}
                            onClick={() => toggleSubcategory(subcategory.id)}
                            style={
                              !isSelected
                                ? { boxShadow: '0px 2px 6.5px 0px #0000001A' }
                                : undefined
                            }
                          >
                            <div className='flex items-center gap-3'>
                              <div className='w-6 h-6 rounded-full flex items-center justify-center shrink-0'>
                                {isSelected ? (
                                  <div className='w-6 h-6 rounded-full bg-accent flex items-center justify-center'>
                                    <Check className='w-4 h-4 text-white' />
                                  </div>
                                ) : (
                                  <Circle className='w-6 h-6 text-slate-300 fill-slate-300' />
                                )}
                              </div>
                              {subcategory.icon_url && (
                                <Image
                                  src={subcategory.icon_url}
                                  alt={subcategory.name_nl}
                                  width={20}
                                  height={20}
                                />
                              )}
                              <span className='text-base font-medium text-slate-900'>
                                {subcategory.name_nl}
                              </span>
                            </div>
                            {isSelected && (
                              <div className='flex items-center gap-2'>
                                {subcategory.price_particulier && (
                                  <PricePill
                                    price={subcategory.price_particulier}
                                    type='particulier'
                                  />
                                )}
                                {subcategory.price_zakelijk && (
                                  <PricePill
                                    price={subcategory.price_zakelijk}
                                    type='zakelijk'
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
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
