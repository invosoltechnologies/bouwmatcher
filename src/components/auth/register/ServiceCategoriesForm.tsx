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
import { Check, Info, Move, Search, X } from 'lucide-react';
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
const POPULAR_SLUGS = ['schilderwerk', 'loodgieter', 'elektricien'];

export default function ServiceCategoriesForm({ onNext, onBack }: ServiceCategoriesFormProps) {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [popularCategories, setPopularCategories] = useState<ServiceCategory[]>([]);
  const [allCategories, setAllCategories] = useState<ServiceCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ServiceCategory[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

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
    <div className='custom-container'>
      {/* Main Card */}
      <div className='mb-11.5 mt-5.5 text-center'>
        <h1 className='text-2xl md:text-4xl font-normal text-slate-900 mb-3'>
          Wat zijn je vakgebieden?
        </h1>
        <p className='text-base md:text-lg text-muted-foreground'>
          Selecteer maximaal {MAX_CATEGORIES} gewenste vakgebieden. Je kunt er
          later meer toevoegen.
        </p>
      </div>
      <div
        className='bg-white/95 rounded-3xl p-6 lg:p-8'
        style={{ boxShadow: '0px 12px 36px 0px #023AA21F' }}
      >
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Left Panel - Selection */}
          <div className='w-full lg:w-[60%] space-y-8'>
            {/* Search Input */}
            <div className='space-y-3'>
              <div className='relative'>
                <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Zoek vakgebied...'
                  className='w-full pl-12 pr-4 py-4 bg-white border border-neutral-300 rounded-lg text-base md:text-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
                  style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
                />
              </div>
            </div>

            {/* Combobox - Commented for future use */}
            {/* <div className='space-y-3'>
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
                                <span className='flex-1'>
                                  {category.name_nl}
                                </span>
                                <Check
                                  className={cn(
                                    'w-5 h-5 shrink-0',
                                    isSelected
                                      ? 'opacity-100 text-primary'
                                      : 'opacity-0'
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
            </div> */}

            {/* Popular Categories */}
            {popularCategories.length > 0 && (
              <div className='space-y-3'>
                <Label className='text-sm md:text-lg text-slate-900'>
                  Populaire keuzes
                </Label>
                <div className='flex flex-wrap gap-3'>
                  {popularCategories.map((category) => {
                    const isSelected = selectedCategories.some(
                      (c) => c.id === category.id
                    );
                    return (
                      <button
                        key={category.id}
                        type='button'
                        onClick={() => toggleCategory(category)}
                        className={cn(
                          'px-4.5 py-3 cursor-pointer rounded-full text-base font-medium transition-all flex items-center gap-2',
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
                            className={cn(
                              isSelected
                                ? 'brightness-0 invert'
                                : '[filter:brightness(0)_saturate(100%)_invert(7%)_sepia(8%)_saturate(6422%)_hue-rotate(187deg)_brightness(98%)_contrast(95%)]'
                            )}
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
            <div className='space-y-4'>
              <Label className='text-sm md:text-lg text-slate-900'>
                Alle vakgebieden
              </Label>
              {allCategories.filter((category) =>
                category.name_nl
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              ).length === 0 ? (
                <div className='col-span-2 text-center py-8'>
                  <p className='text-slate-500'>
                    Geen vakgebieden gevonden voor &quot;{searchQuery}&quot;
                  </p>
                </div>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  {allCategories
                    .filter((category) =>
                      category.name_nl
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((category) => {
                      const isSelected = selectedCategories.some(
                        (c) => c.id === category.id
                      );
                      return (
                        <button
                          key={category.id}
                          type='button'
                          onClick={() => toggleCategory(category)}
                          className={cn(
                            'px-4 py-3 rounded-lg text-base transition-all flex items-center gap-3 text-left',
                            isSelected
                              ? 'bg-primary border border-primary text-white'
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
                              className={cn(
                                isSelected ? 'brightness-0 invert' : ''
                              )}
                            />
                          )}
                          <span className='flex-1'>{category.name_nl}</span>
                          {/* {isSelected && (
                        <Check className='w-5 h-5 text-primary shrink-0' />
                      )} */}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>

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

          {/* Right Panel - Selected Categories */}
          <div className='w-full lg:w-[40%] space-y-8'>
            <div>
              <h2 className='text-xl md:text-2xl font-normal text-slate-900 mb-3'>
                Gekozen vakgebieden
              </h2>
              <div className='flex items-center justify-between mb-4'>
                <p className='text-sm md:text-base text-muted-foreground'>
                  {selectedCategories.length} / {MAX_CATEGORIES} gekozen
                </p>

                {selectedCategories.length > 0 && (
                  <button
                    type='button'
                    className='text-primary text-sm font-medium flex items-center gap-1.5 hover:text-primary/80 transition-colors'
                    onClick={() => toast('Volgorde opnieuw instellen')}
                  >
<Move className='w-4 h-4 text-primary' />
                    Herorden
                  </button>
                )}
              </div>
              <Progress value={progressPercentage} className='h-2' />
            </div>

            {/* Info Message - Always visible */}

            {selectedCategories.length > 1 ? (
              <div className='space-y-3'>
                <div className='space-y-2'>
                  {selectedCategories.map((category, index) => (
                    <div
                      key={category.id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      className={cn(
                        'bg-teal-50 border-2 border-accent border-dashed rounded-xl p-4 flex items-center gap-3 cursor-move transition-all',
                        draggedIndex === index && 'opacity-50'
                      )}
                    >
                      <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0'>
                        {category.icon_url && (
                          <Image
                            src={category.icon_url}
                            alt={category.name_nl}
                            width={12}
                            height={12}
                            className='brightness-0 invert'
                          />
                        )}
                      </div>
                      <span className='flex-1 text-base font-medium text-slate-900'>
                        {category.name_nl}
                      </span>
                      <span className='text-sm font-medium text-slate-400 shrink-0'>
                        #{index + 1}
                      </span>
                      <button
                        type='button'
                        onClick={() => removeCategory(category.id)}
                        className='w-8 h-8 cursor-pointer rounded-full bg-red-100 flex items-center justify-center text-red-500 hover:bg-red-200 transition-all group shrink-0'
                      >
                        <X className='w-4 h-4 group-hover:rotate-90 transition-transform duration-200' />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className=' rounded-xl p-8 text-center'>
                <div className='w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-4'>
                  <Image
                    src='/icons/services/renovatie.svg'
                    alt='Nog niets gekozen'
                    width={32}
                    height={32}
                    className='opacity-40'
                    style={{ filter: 'grayscale(100%)' }}
                  />
                </div>
                <p className='text-base font-medium text-slate-900 mb-1'>
                  Nog niets gekozen
                </p>
                <p className='text-sm text-slate-600'>
                  Kies je vakgebieden uit de lijst links
                </p>
              </div>
            )}
            <div className='bg-blue-50 border border-blue-200 rounded-xl p-4'>
              <div className='flex items-start gap-3'>
                <Info className='w-5 h-5 text-primary' />

                <div>
                  <p className='text-sm font-medium text-slate-900'>
                    Volgorde bepaalt prioriteit
                  </p>
                  <p className='text-xs text-slate-600 mt-1'>
                    Sleep om te herschikken.
                  </p>
                </div>
              </div>
            </div>
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
