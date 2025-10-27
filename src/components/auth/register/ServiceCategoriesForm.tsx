'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, Search, GripVertical, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface ServiceCategory {
  id: number;
  slug: string;
  name_nl: string;
  name_en: string;
  icon_url: string | null;
}

interface ServiceCategoriesFormProps {
  onNext: (data: ServiceCategoriesData) => void;
  onBack?: () => void;
}

export interface ServiceCategoriesData {
  selectedCategories: number[];
}

const MAX_CATEGORIES = 6;

// Popular service categories (these should match your database slugs)
const POPULAR_SLUGS = ['schilder', 'loodgieter', 'elektricien'];

export default function ServiceCategoriesForm({ onNext, onBack }: ServiceCategoriesFormProps) {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [popularCategories, setPopularCategories] = useState<ServiceCategory[]>([]);
  const [allCategories, setAllCategories] = useState<ServiceCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ServiceCategory[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Fetch categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();

        const { data, error } = await supabase
          .from('service_categories')
          .select('*')
          .order('name_nl');

        if (error) throw error;

        setCategories(data || []);

        // Separate popular and all categories
        const popular = data?.filter((cat) => POPULAR_SLUGS.includes(cat.slug)) || [];
        const all = data || [];

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

  const toggleCategory = (category: ServiceCategory) => {
    const isSelected = selectedCategories.some((c) => c.id === category.id);

    if (isSelected) {
      // Remove category
      setSelectedCategories(selectedCategories.filter((c) => c.id !== category.id));
    } else {
      // Add category (check max limit)
      if (selectedCategories.length >= MAX_CATEGORIES) {
        toast.error(`Je kunt maximaal ${MAX_CATEGORIES} vakgebieden selecteren`);
        return;
      }
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const removeCategory = (categoryId: number) => {
    setSelectedCategories(selectedCategories.filter((c) => c.id !== categoryId));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newCategories = [...selectedCategories];
    const draggedItem = newCategories[draggedIndex];

    newCategories.splice(draggedIndex, 1);
    newCategories.splice(index, 0, draggedItem);

    setSelectedCategories(newCategories);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSubmit = () => {
    if (selectedCategories.length === 0) {
      toast.error('Selecteer minimaal 1 vakgebied');
      return;
    }

    onNext({
      selectedCategories: selectedCategories.map((c) => c.id),
    });
  };

  const progressPercentage = (selectedCategories.length / MAX_CATEGORIES) * 100;

  return (
    <div className='w-full max-w-[1400px] mx-auto px-4'>
      {/* Main Card */}
      <div
        className='bg-white/95 rounded-3xl p-6 lg:p-10'
        style={{ boxShadow: '0px 12px 36px 0px #023AA21F' }}
      >
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Left Panel - Selection */}
          <div className='w-full lg:w-[60%] space-y-6'>
            <div>
              <h1 className='text-2xl md:text-4xl font-normal text-slate-900 mb-3'>
                Wat zijn je vakgebieden?
              </h1>
              <p className='text-base md:text-lg text-muted-foreground'>
                Selecteer maximaal {MAX_CATEGORIES} gewenste vakgebieden. Je kunt er later meer toevoegen.
              </p>
            </div>

            {/* Search with Combobox */}
            <div className='space-y-3'>
              <Label className='text-sm md:text-lg text-slate-900'>
                Zoek vakgebied...
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='w-full justify-between h-auto py-4 px-4 text-base md:text-lg font-normal border-neutral-300'
                    style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
                  >
                    <div className='flex items-center gap-2 text-slate-400'>
                      <Search className='w-5 h-5' />
                      <span>Zoek vakgebied...</span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Zoek vakgebied...' />
                    <CommandList>
                      <CommandEmpty>Geen resultaten gevonden.</CommandEmpty>
                      <CommandGroup>
                        {allCategories.map((category) => {
                          const isSelected = selectedCategories.some(
                            (c) => c.id === category.id
                          );
                          return (
                            <CommandItem
                              key={category.id}
                              value={category.name_nl}
                              onSelect={() => {
                                toggleCategory(category);
                              }}
                            >
                              <div className='flex items-center gap-3 flex-1'>
                                {category.icon_url && (
                                  <Image
                                    src={category.icon_url}
                                    alt={category.name_nl}
                                    width={24}
                                    height={24}
                                    className='shrink-0'
                                  />
                                )}
                                <span className='flex-1'>{category.name_nl}</span>
                                <Check
                                  className={cn(
                                    'w-5 h-5 shrink-0',
                                    isSelected ? 'opacity-100 text-primary' : 'opacity-0'
                                  )}
                                />
                              </div>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Popular Categories */}
            {popularCategories.length > 0 && (
              <div className='space-y-3'>
                <Label className='text-sm md:text-lg text-slate-900'>
                  Populaire keuzes
                </Label>
                <div className='flex flex-wrap gap-3'>
                  {popularCategories.map((category) => {
                    const isSelected = selectedCategories.some((c) => c.id === category.id);
                    return (
                      <button
                        key={category.id}
                        type='button'
                        onClick={() => toggleCategory(category)}
                        className={cn(
                          'px-6 py-3 rounded-lg text-base font-medium transition-all flex items-center gap-2',
                          isSelected
                            ? 'bg-primary text-white'
                            : 'bg-white text-slate-900 border border-neutral-300 hover:border-primary'
                        )}
                        style={
                          !isSelected
                            ? { boxShadow: '0px 2px 6.5px 0px #0000001A' }
                            : undefined
                        }
                      >
                        {category.icon_url && (
                          <Image
                            src={category.icon_url}
                            alt={category.name_nl}
                            width={20}
                            height={20}
                            className={cn(isSelected && 'brightness-0 invert')}
                          />
                        )}
                        {category.name_nl}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* All Categories List */}
            <div className='space-y-3'>
              <Label className='text-sm md:text-lg text-slate-900'>
                Alle vakgebieden
              </Label>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                {allCategories.map((category) => {
                  const isSelected = selectedCategories.some((c) => c.id === category.id);
                  return (
                    <button
                      key={category.id}
                      type='button'
                      onClick={() => toggleCategory(category)}
                      className={cn(
                        'px-4 py-3 rounded-lg text-base transition-all flex items-center gap-3 text-left',
                        isSelected
                          ? 'bg-primary/10 border-2 border-primary'
                          : 'bg-white border border-neutral-300 hover:border-primary'
                      )}
                      style={
                        !isSelected
                          ? { boxShadow: '0px 2px 6.5px 0px #0000001A' }
                          : undefined
                      }
                    >
                      {category.icon_url && (
                        <Image
                          src={category.icon_url}
                          alt={category.name_nl}
                          width={24}
                          height={24}
                          className='shrink-0'
                        />
                      )}
                      <span className='flex-1'>{category.name_nl}</span>
                      {isSelected && (
                        <Check className='w-5 h-5 text-primary shrink-0' />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add custom option */}
            <div className='pt-4'>
              <button
                type='button'
                className='text-primary hover:text-primary/80 text-base font-medium flex items-center gap-2'
                onClick={() => toast.info('Vak voorstellen functie komt binnenkort')}
              >
                + Mis je een vak? → Vak voorstellen
              </button>
            </div>
          </div>

          {/* Right Panel - Selected Categories */}
          <div className='w-full lg:w-[40%] space-y-6'>
            <div>
              <h2 className='text-xl md:text-2xl font-normal text-slate-900 mb-3'>
                Gekozen vakgebieden
              </h2>
              <p className='text-sm md:text-base text-muted-foreground mb-4'>
                {selectedCategories.length} / {MAX_CATEGORIES} gekozen
              </p>
              <Progress value={progressPercentage} className='h-2' />
            </div>

            {selectedCategories.length > 0 ? (
              <div className='space-y-3'>
                <p className='text-sm text-muted-foreground mb-3'>
                  Sleep om te herschikken
                </p>
                <div className='space-y-2'>
                  {selectedCategories.map((category, index) => (
                    <div
                      key={category.id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      className={cn(
                        'bg-blue-50 border border-accent rounded-lg p-4 flex items-center gap-3 cursor-move transition-all',
                        draggedIndex === index && 'opacity-50'
                      )}
                    >
                      <GripVertical className='w-5 h-5 text-slate-400 shrink-0' />
                      {category.icon_url && (
                        <Image
                          src={category.icon_url}
                          alt={category.name_nl}
                          width={24}
                          height={24}
                          className='shrink-0'
                        />
                      )}
                      <span className='flex-1 text-base text-slate-900'>
                        {category.name_nl}
                      </span>
                      <button
                        type='button'
                        onClick={() => removeCategory(category.id)}
                        className='text-slate-400 hover:text-red-500 transition-colors shrink-0'
                      >
                        <X className='w-5 h-5' />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className='bg-blue-50 border border-accent rounded-lg p-6 text-center'>
                <p className='text-base text-slate-600'>
                  Volgorde bepaalt prioriteit
                </p>
                <p className='text-sm text-muted-foreground mt-2'>
                  Sleep om te herschikken.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className='flex justify-between mt-6 px-2'>
        {onBack && (
          <Button
            type='button'
            variant='outline'
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
          disabled={selectedCategories.length === 0}
          size={null}
        >
          Naar extra vakgebieden →
        </Button>
      </div>
    </div>
  );
}
