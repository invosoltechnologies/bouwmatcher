'use client';

import { useTranslations } from 'next-intl';

interface GradientCountBarProps {
  selectedCount: number;
  maxLimit: number;
  onDeselectAll?: () => void;
  showLimit?: boolean;
  showDeselectButton?: boolean;
  gradient?: string;
  label?: string;
  translationKey?: string;
}

export default function GradientCountBar({
  selectedCount,
  maxLimit,
  onDeselectAll,
  showLimit = true,
  showDeselectButton = true,
  gradient = 'linear-gradient(90deg, rgba(2, 58, 162, 0.1) 0%, rgba(10, 178, 126, 0.1) 100%)',
  label,
  translationKey = '',
}: GradientCountBarProps) {
  // Always call the hook, but pass a default empty string if no translationKey provided
  const t = useTranslations(translationKey || 'common');

  const displayLabel = label || (translationKey ? t('selected') : 'geselecteerd');
  const deselectAllText = translationKey ? t('deselectAll') : 'Deselecteer alle';
  const limitText = 'Limiet'; // Same in both languages

  return (
    <div className='px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4' style={{ background: gradient }}>
      <p className='text-xs sm:text-sm font-medium text-slate-900'>
        {selectedCount} {displayLabel}
      </p>
      <div className='flex items-center gap-3 sm:gap-4'>
        {showDeselectButton && selectedCount > 0 && onDeselectAll && (
          <button
            type='button'
            onClick={onDeselectAll}
            className='text-primary text-xs sm:text-sm font-medium hover:text-primary/80'
          >
            {deselectAllText}
          </button>
        )}
        {showLimit && (
          <p className='text-xs sm:text-sm font-medium text-slate-900 whitespace-nowrap'>
            {limitText}: {selectedCount}/{maxLimit}
          </p>
        )}
      </div>
    </div>
  );
}