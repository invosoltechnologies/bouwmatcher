import { cn } from '@/lib/utils';

interface LoaderProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export function Loader({
  fullScreen = false,
  size = 'md',
  text = 'Laden...',
  className,
}: LoaderProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const spinnerSize = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-14 h-14 border-4',
  };

  const textSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const LoaderContent = () => (
    <div className='flex flex-col items-center justify-center gap-4'>
      {/* Spinning Circle Loader */}
      <div className='relative'>
        {/* Outer ring with gradient */}
        <div className={cn('relative', sizeClasses[size])}>
          {/* Gradient spinning ring */}
          <div
            className={cn(
              'absolute inset-0 rounded-full animate-spin',
              spinnerSize[size]
            )}
            style={{
              background:
                'conic-gradient(from 0deg, #10b981 0%, #023AA2 50%, #10b981 100%)',
              WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white 0)',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white 0)',
            }}
          />
          {/* Inner glow */}
          <div
            className={cn(
              'absolute inset-0 rounded-full opacity-50 blur-sm animate-spin',
              spinnerSize[size]
            )}
            style={{
              background:
                'conic-gradient(from 0deg, #10b981 0%, #023AA2 50%, #10b981 100%)',
              WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white 0)',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white 0)',
            }}
          />
        </div>
      </div>

      {/* Loading Text */}
      {text && (
        <p
          className={cn(
            'font-medium text-primary animate-pulse',
            textSize[size]
          )}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          // Glassy background
          'bg-white/80 backdrop-blur-md',
          className
        )}
      >
        <div className='bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20'>
          <LoaderContent />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center p-8', className)}>
      <LoaderContent />
    </div>
  );
}

// Simple inline spinner for buttons
export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin',
        className
      )}
    />
  );
}
