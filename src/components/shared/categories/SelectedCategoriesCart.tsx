'use client';

import { useState } from 'react';
import { Info, Move, X, ChevronUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ProfessionalSpecialization } from '@/types/categories';

interface SelectedCategoriesCartProps {
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

export default function SelectedCategoriesCart({
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
}: SelectedCategoriesCartProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get category name from service_categories table field based on locale
  const getCategoryName = (spec: ProfessionalSpecialization) => {
    if (!spec.service_categories) return '';
    const catName = locale === 'en'
      ? (spec.service_categories.name_en || spec.service_categories.name_nl)
      : spec.service_categories.name_nl;
    return catName || '';
  };

  const progressPercentage = (selectedSpecializations.length / maxCategories) * 100;
  const count = selectedSpecializations.length;

  return (
    <>
      {/* Backdrop - Only visible when expanded */}
      {isExpanded && (
        <div
          className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300'
          onClick={() => setIsExpanded(false)}
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        />
      )}

      {/* Floating Cart Container */}
      <div
        className='fixed left-0 right-0 bottom-0 z-50 transition-transform duration-300 ease-in-out'
        style={{
          transform: isExpanded
            ? 'translateY(0)'
            : 'translateY(calc(100% - 80px))',
          background: 'hsla(0, 0%, 100%, 0.2)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
        }}
      >
        {/* Main Cart Container */}
        <div
          className={cn(
            'bg-white rounded-t-3xl shadow-2xl',
            'w-full  max-h-[80vh] overflow-hidden flex flex-col',
            isExpanded ? '' : 'max-w-3/4 mx-auto'
          )}
        >
          {/* Collapsed View - Always Visible */}
          <div
            className='flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-neutral-50 transition-colors'
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className='flex items-center gap-3 flex-1'>
              {/* Circular Progress Indicator */}
              <div className='relative w-12 h-12 sm:w-14 sm:h-14'>
                <svg
                  className='w-full h-full transform -rotate-90'
                  viewBox='0 0 48 48'
                >
                  {/* Background circle (unfilled) */}
                  <circle
                    cx='24'
                    cy='24'
                    r='20'
                    stroke='#e5e7eb'
                    strokeWidth='3'
                    fill='none'
                  />
                  {/* Progress circle (filled) */}
                  <circle
                    cx='24'
                    cy='24'
                    r='20'
                    stroke='#0FA3B1'
                    strokeWidth='3'
                    fill='none'
                    strokeDasharray={`${
                      (progressPercentage / 100) * 125.6
                    } 125.6`}
                    strokeLinecap='round'
                    className='transition-all duration-300'
                  />
                </svg>
                {/* Count in center */}
                <div className='absolute inset-0 flex items-center justify-center'>
                  <span className='text-xs sm:text-sm font-bold text-slate-900'>
                    {count}/{maxCategories}
                  </span>
                </div>
              </div>
              <span className='text-sm sm:text-base font-medium text-slate-900'>
                {t ? t('selectedTitle') : 'Gekozen vakgebieden'}
              </span>
            </div>
            <ChevronUp
              className={cn(
                'w-5 h-5 text-slate-600 transition-transform duration-300',
                isExpanded && 'transform rotate-180'
              )}
            />
          </div>

          {/* Expanded View Content */}
          {isExpanded && (
            <div className='flex flex-col flex-1 overflow-hidden'>
              {/* Scrollable Content Area */}
              <div className='flex-1 overflow-y-auto p-4 sm:p-6 space-y-6'>
                {/* Header with Close Button */}
                <div className='flex items-center justify-between'>
                  <h3 className='text-lg sm:text-xl font-semibold text-slate-900'>
                    {title}
                  </h3>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className='text-slate-400 hover:text-slate-600 transition-colors'
                  ></button>
                </div>

                {/* Selection Info and Reorder Button */}
                <div className='flex items-center justify-between'>
                  <p className='text-xs sm:text-sm text-muted-foreground'>
                    {count} / {maxCategories}{' '}
                    {locale === 'en' ? 'selected' : 'gekozen'}
                  </p>
                  {showReorderButton && count > 0 && (
                    <button
                      type='button'
                      className='text-primary text-xs sm:text-sm font-medium flex items-center gap-1.5 hover:text-primary/80 transition-colors'
                      onClick={onReorderClick}
                    >
                      <Move className='w-3 h-3 sm:w-4 sm:h-4 text-primary' />
                      {locale === 'en' ? 'Reorder' : 'Herorden'}
                    </button>
                  )}
                </div>

                {/* Progress Bar */}
                <Progress value={progressPercentage} className='h-2' />

                {/* Selected Items or Empty State */}
                {count > 0 ? (
                  <div className='space-y-3'>
                    <div className='space-y-2'>
                      {selectedSpecializations.map((spec, index) => {
                        const isDragging = draggedIndex === index;
                        return (
                          <div
                            key={spec.id}
                            draggable={isDraggable}
                            onDragStart={(e) => {
                              if (isDraggable) {
                                onDragStart(index);
                                e.currentTarget.style.cursor = 'grabbing';
                              }
                            }}
                            onDragOver={(e) => {
                              if (isDraggable) {
                                e.preventDefault();
                                e.stopPropagation();
                                onDragOver(e, index);
                              }
                            }}
                            onDragEnd={(e) => {
                              if (isDraggable) {
                                onDragEnd();
                                e.currentTarget.style.cursor = 'grab';
                              }
                            }}
                            onTouchStart={(e) => {
                              if (isDraggable) {
                                e.currentTarget.style.cursor = 'grabbing';
                              }
                            }}
                            className={cn(
                              'bg-teal-50 border-2 border-accent border-dashed rounded-xl p-3 sm:p-4 flex items-center gap-3 transition-all touch-none',
                              isDraggable &&
                                'cursor-grab active:cursor-grabbing',
                              isDragging && 'opacity-50'
                            )}
                          >
                            <div className='w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center shrink-0'>
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
                            <span className='flex-1 text-sm sm:text-base font-medium text-slate-900'>
                              {getCategoryName(spec)}
                            </span>
                            <span className='text-xs sm:text-sm font-medium text-slate-400 shrink-0'>
                              #{index + 1}
                            </span>
                            <button
                              type='button'
                              onClick={() => onRemove(spec.id)}
                              className='w-7 h-7 sm:w-8 sm:h-8 cursor-pointer rounded-full bg-red-100 flex items-center justify-center text-red-500 hover:bg-red-200 transition-all group shrink-0'
                            >
                              <X className='w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-90 transition-transform duration-200' />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className='rounded-xl p-6 sm:p-8 text-center'>
                    <div className='w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-3 sm:mb-4'>
                      <Image
                        src={emptyStateIcon}
                        alt={t ? t('emptyStateTitle') : 'Nog niets gekozen'}
                        width={32}
                        height={32}
                        className='opacity-40'
                        style={{ filter: 'grayscale(100%)' }}
                      />
                    </div>
                    <p className='text-sm sm:text-base font-medium text-slate-900 mb-1'>
                      {t ? t('emptyStateTitle') : 'Nog niets gekozen'}
                    </p>
                    <p className='text-xs sm:text-sm text-slate-600'>
                      {t
                        ? t('emptyStateDescription')
                        : 'Kies je vakgebieden uit de lijst links'}
                    </p>
                  </div>
                )}

                {/* Info Card */}
                {showInfoCard && (
                  <div className='bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4'>
                    <div className='flex items-start gap-3'>
                      <Info className='w-5 h-5 text-primary shrink-0 mt-0.5' />
                      <div>
                        <p className='text-xs sm:text-sm font-medium text-slate-900'>
                          {t
                            ? t('infoPriorityTitle')
                            : 'Volgorde bepaalt prioriteit'}
                        </p>
                        <p className='text-xs text-slate-600 mt-1'>
                          {t
                            ? t('infoPriorityDescription')
                            : 'Sleep om te herschikken.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Fixed Bottom Button */}
              <div className='border-t border-neutral-200 p-4 sm:p-5 bg-white'>
                <button
                  type='button'
                  onClick={() => setIsExpanded(false)}
                  className='w-full bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-primary/90 transition-colors'
                >
                  {t ? t('submitButton') : 'Doorgaan'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
