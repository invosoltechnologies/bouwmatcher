'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Loader } from '@/components/ui/loader';
import CategorySearch from '@/components/shared/categories/CategorySearch';
import PopularCategoriesSection from '@/components/shared/categories/PopularCategoriesSection';
import AllCategoriesGrid from '@/components/shared/categories/AllCategoriesGrid';
import SelectedCategoriesSidebar from '@/components/shared/categories/SelectedCategoriesSidebar';
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
        toast.error('Kon vakgebieden niet laden');
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
        toast.error('Kon geselecteerde vakgebieden niet laden');
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
        toast.success('Vakgebied verwijderd');
      } catch (error) {
        console.error('Error deleting specialization:', error);
        toast.error('Kon vakgebied niet verwijderen');
      } finally {
        setIsSaving(false);
      }
    } else {
      // Add category (check max limit)
      if (selectedSpecializations.length >= MAX_CATEGORIES) {
        toast.error(`Je kunt maximaal ${MAX_CATEGORIES} vakgebieden selecteren`);
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
        toast.success('Vakgebied toegevoegd');
      } catch (error) {
        console.error('Error adding specialization:', error);
        toast.error('Kon vakgebied niet toevoegen');
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
      toast.success('Vakgebied verwijderd');
    } catch (error) {
      console.error('Error deleting specialization:', error);
      toast.error('Kon vakgebied niet verwijderen');
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

      toast.success('Volgorde bijgewerkt');
    } catch (error) {
      console.error('Error updating priorities:', error);
      toast.error('Kon volgorde niet bijwerken');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = () => {
    if (selectedSpecializations.length === 0) {
      toast.error('Selecteer minimaal 1 vakgebied');
      return;
    }

    // Data is already saved to database, just move to next step
    onNext({
      selectedCategories: selectedSpecializations.map((s) => s.service_category_id),
    });
  };

  // Show loader while fetching initial data
  if (isLoading) {
    return <Loader fullScreen text='Vakgebieden laden...' />;
  }

  return (
    <div className='custom-container'>
      {/* Full Screen Loader for saving operations */}
      {isSaving && <Loader fullScreen text='Bezig met opslaan...' />}

      {/* Header */}
      <div className='mb-11.5 mt-5.5 text-center'>
        <h1 className='text-2xl md:text-4xl font-normal text-slate-900 mb-3'>
          Wat zijn je vakgebieden?
        </h1>
        <p className='text-base md:text-lg text-muted-foreground'>
          Selecteer maximaal {MAX_CATEGORIES} gewenste vakgebieden. Je kunt er
          later meer toevoegen.
        </p>
      </div>

      {/* Main Card */}
      <div
        className='bg-white/95 rounded-3xl p-6 lg:p-8'
        style={{ boxShadow: '0px 12px 36px 0px #023AA21F' }}
      >
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Left Panel - Selection */}
          <div className='w-full lg:w-[60%] space-y-8'>
            {/* Search Input - filters the list below */}
            <CategorySearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder='Zoek vakgebied...'
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
                label='Populaire keuzes'
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
              label='Alle vakgebieden'
              columns={2}
            />

            {/* Add custom option */}
            <div className='pt-4'>
              <button
                type='button'
                className='text-primary hover:text-primary/80 text-base font-medium flex items-center gap-2'
                onClick={() => toast('Vak voorstellen functie komt binnenkort')}
              >
                + Mis je een vak? → Vak voorstellen
              </button>
            </div>
          </div>

          {/* Right Panel - Selected Categories Sidebar */}
          <div className='w-full lg:w-[40%]'>
            <SelectedCategoriesSidebar
              title='Gekozen vakgebieden'
              selectedSpecializations={selectedSpecializations}
              maxCategories={MAX_CATEGORIES}
              onRemove={removeCategory}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              draggedIndex={draggedIndex}
              isDraggable={true}
              showReorderButton={true}
              onReorderClick={() => toast('Volgorde opnieuw instellen')}
              showInfoCard={true}
              emptyStateIcon='/icons/services/renovatie.svg'
            />
          </div>
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
          disabled={selectedSpecializations.length === 0 || isSaving}
          size={null}
        >
          {isSaving ? 'Opslaan...' : 'Naar extra vakgebieden →'}
        </Button>
      </div>
    </div>
  );
}
