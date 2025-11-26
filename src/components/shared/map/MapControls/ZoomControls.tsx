'use client';

import { Plus, Minus } from 'lucide-react';
import { useMap } from '@vis.gl/react-google-maps';

interface ZoomControlsProps {
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}

export function ZoomControls({ position = 'bottom-right' }: ZoomControlsProps) {
  const map = useMap();

  const handleZoomIn = () => {
    if (map) {
      map.setZoom((map.getZoom() || 6) + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.setZoom((map.getZoom() || 6) - 1);
    }
  };

  const positionClasses = {
    'top-right': 'top-4 right-3',
    'bottom-right': 'bottom-4 right-3',
    'top-left': 'top-4 left-3',
    'bottom-left': 'bottom-4 left-3',
  };

  return (
    <div className={`absolute ${positionClasses[position]} flex flex-col gap-2 z-10`}>
      <button
        onClick={handleZoomIn}
        className='bg-white text-slate-900 p-2 rounded-lg shadow-lg hover:bg-neutral-50 transition-colors'
        title='Zoom in'
        aria-label='Zoom in'
      >
        <Plus className='w-5 h-5' />
      </button>
      <button
        onClick={handleZoomOut}
        className='bg-white text-slate-900 p-2 rounded-lg shadow-lg hover:bg-neutral-50 transition-colors'
        title='Zoom out'
        aria-label='Zoom out'
      >
        <Minus className='w-5 h-5' />
      </button>
    </div>
  );
}
