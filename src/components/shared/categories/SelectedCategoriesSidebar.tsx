'use client';

import { Info, Move, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ProfessionalSpecialization } from '@/types/categories';

interface SelectedCategoriesSidebarProps {
  title?: string;
  selectedSpecializations: ProfessionalSpecialization[];
  maxCategories: number;
  onRemove: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  draggedIndex: number | null;
  isDraggable?: boolean;
  showReorderButton?: boolean;
  onReorderClick?: () => void;
  showInfoCard?: boolean;
  emptyStateIcon?: string;
  locale?: string;
  t?: (key: string) => string;
}

export default function SelectedCategoriesSidebar({
  title = 'Gekozen vakgebieden',
  selectedSpecializations,
  maxCategories,
  onRemove,
  onDragStart,
  onDragOver,
  onDragEnd,
  draggedIndex,
  isDraggable = true,
  showReorderButton = true,
  onReorderClick,
  showInfoCard = true,
  emptyStateIcon = '/icons/services/renovatie.svg',
  locale = 'nl',
  t,
}: SelectedCategoriesSidebarProps) {
  // Get category name from service_categories table field based on locale
  const getCategoryName = (spec: ProfessionalSpecialization) => {
    if (!spec.service_categories) return '';
    const catName = locale === 'en'
      ? (spec.service_categories.name_en || spec.service_categories.name_nl)
      : spec.service_categories.name_nl;
    return catName || '';
  };

  const progressPercentage = (selectedSpecializations.length / maxCategories) * 100;

  return (
    <div className='w-full space-y-8'>
      <div>
        <h2 className='text-xl md:text-2xl font-normal text-slate-900 mb-3'>{title}</h2>
        <div className='flex items-center justify-between mb-4'>
          <p className='text-sm md:text-base text-muted-foreground'>
            {selectedSpecializations.length} / {maxCategories} {locale === 'en' ? 'selected' : 'gekozen'}
          </p>

          {showReorderButton && selectedSpecializations.length > 0 && (
            <button
              type='button'
              className='text-primary text-sm font-medium flex items-center gap-1.5 hover:text-primary/80 transition-colors'
              onClick={onReorderClick}
            >
              <Move className='w-4 h-4 text-primary' />
              {locale === 'en' ? 'Reorder' : 'Herorden'}
            </button>
          )}
        </div>
        <Progress value={progressPercentage} className='h-2' />
      </div>

      {selectedSpecializations.length > 0 ? (
        <div className='space-y-3'>
          <div className='space-y-2'>
            {selectedSpecializations.map((spec, index) => {
              const isDragging = draggedIndex === index;
              return (
                <div
                  key={spec.id}
                  draggable={isDraggable}
                  onDragStart={() => isDraggable && onDragStart(index)}
                  onDragOver={(e) => isDraggable && onDragOver(e, index)}
                  onDragEnd={() => isDraggable && onDragEnd()}
                  className={cn(
                    'bg-teal-50 border-2 border-accent border-dashed rounded-xl p-4 flex items-center gap-3 transition-all',
                    isDraggable && 'cursor-move',
                    isDragging && 'opacity-50'
                  )}
                >
                  <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0'>
                    {spec.service_categories.icon_url && (
                      <Image
                        src={spec.service_categories.icon_url}
                        alt={getCategoryName(spec)}
                        width={14}
                        height={14}
                        className='brightness-0 invert'
                      />
                    )}
                  </div>
                  <span className='flex-1 text-base font-medium text-slate-900'>
                    {getCategoryName(spec)}
                  </span>
                  <span className='text-sm font-medium text-slate-400 shrink-0'>
                    #{index + 1}
                  </span>
                  <button
                    type='button'
                    onClick={() => onRemove(spec.id)}
                    className='w-8 h-8 cursor-pointer rounded-full bg-red-100 flex items-center justify-center text-red-500 hover:bg-red-200 transition-all group shrink-0'
                  >
                    <X className='w-4 h-4 group-hover:rotate-90 transition-transform duration-200' />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className='rounded-xl p-8 text-center'>
          <div className='w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-4'>
            <Image
              src={emptyStateIcon}
              alt={t ? t('emptyStateTitle') : 'Nog niets gekozen'}
              width={32}
              height={32}
              className='opacity-40'
              style={{ filter: 'grayscale(100%)' }}
            />
          </div>
          <p className='text-base font-medium text-slate-900 mb-1'>
            {t ? t('emptyStateTitle') : 'Nog niets gekozen'}
          </p>
          <p className='text-sm text-slate-600'>
            {t ? t('emptyStateDescription') : 'Kies je vakgebieden uit de lijst links'}
          </p>
        </div>
      )}

      {showInfoCard && (
        <div className='bg-blue-50 border border-blue-200 rounded-xl p-4'>
          <div className='flex items-start gap-3'>
            <Info className='w-5 h-5 text-primary' />
            <div>
              <p className='text-sm font-medium text-slate-900'>
                {t ? t('infoPriorityTitle') : 'Volgorde bepaalt prioriteit'}
              </p>
              <p className='text-xs text-slate-600 mt-1'>
                {t ? t('infoPriorityDescription') : 'Sleep om te herschikken.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}