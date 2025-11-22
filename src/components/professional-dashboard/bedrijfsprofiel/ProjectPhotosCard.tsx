'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, Image as ImageIcon } from 'lucide-react';

export default function ProjectPhotosCard() {
  const handleAddPhoto = () => {
    // TODO: Implement photo upload functionality
    console.log('Add photo');
  };

  // Placeholder photo slots (0 out of 6)
  const photoSlots = Array(6).fill(null);

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-semibold'>Projectfoto&apos;s</CardTitle>
          <span className='text-sm text-muted-foreground'>0/6</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex flex-wrap gap-4'>
          {/* Add Photo Button */}
          <button
            onClick={handleAddPhoto}
            className='w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary'
          >
            <Plus className='w-8 h-8' />
            <span className='text-xs'>Foto toevoegen</span>
          </button>

          {/* Photo Placeholder Slots */}
          {photoSlots.map((_, index) => (
            <div
              key={index}
              className='w-32 h-32 rounded-xl bg-slate-100 flex items-center justify-center'
            >
              <ImageIcon className='w-8 h-8 text-slate-300' />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
