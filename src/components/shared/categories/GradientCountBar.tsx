'use client';

interface GradientCountBarProps {
  selectedCount: number;
  maxLimit: number;
  onDeselectAll?: () => void;
  showLimit?: boolean;
  showDeselectButton?: boolean;
  gradient?: string;
  label?: string;
}

export default function GradientCountBar({
  selectedCount,
  maxLimit,
  onDeselectAll,
  showLimit = true,
  showDeselectButton = true,
  gradient = 'linear-gradient(90deg, rgba(2, 58, 162, 0.1) 0%, rgba(10, 178, 126, 0.1) 100%)',
  label = 'geselecteerd',
}: GradientCountBarProps) {
  return (
    <div className='px-6 lg:px-8 py-3 flex items-center justify-between' style={{ background: gradient }}>
      <p className='text-sm font-medium text-slate-900'>
        {selectedCount} {label}
      </p>
      <div className='flex items-center gap-4'>
        {showDeselectButton && selectedCount > 0 && onDeselectAll && (
          <button
            type='button'
            onClick={onDeselectAll}
            className='text-primary text-sm font-medium hover:text-primary/80'
          >
            Deselecteer alle
          </button>
        )}
        {showLimit && (
          <p className='text-sm font-medium text-slate-900'>
            Limiet: {selectedCount}/{maxLimit}
          </p>
        )}
      </div>
    </div>
  );
}