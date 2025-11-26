'use client';

import { Button } from '@/components/ui/button';
import { useWorkArea } from '@/lib/hooks/professional/account/useWorkArea';

interface WorkAreaCardProps {
  onEdit: () => void;
}

export default function WorkAreaCard({ onEdit }: WorkAreaCardProps) {
  const { data, isLoading, isError } = useWorkArea();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Werkgebied</h2>
        </div>
        <div className="text-muted-foreground">Laden...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Werkgebied</h2>
        </div>
        <div className="text-red-600">Fout bij het laden van werkgebied gegevens</div>
      </div>
    );
  }

  const workArea = data?.data;
  console.log("workArea",workArea);

  if (!data?.saved || !workArea) {
    return (
      <div className='bg-white rounded-lg border border-neutral-200 p-6'>
        <div className='flex items-start justify-between mb-6'>
          <h2 className='text-xl font-semibold text-slate-900'>Werkgebied</h2>
          <Button
            variant='outline'
            size='default'
            onClick={onEdit}
            className='text-primary border-primary font-normal text-sm rounded-xl'
          >
            Wijzig
          </Button>
        </div>
        <div className='text-muted-foreground'>
          <p>Je werkgebied is nog niet ingesteld.</p>
          <p className='text-sm mt-2'>
            Klik op &quot;Wijzig&quot; om je werklocatie en straal in te stellen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg border border-neutral-200 p-6'>
      <div className='flex items-start justify-between mb-6'>
        <h2 className='text-xl font-semibold text-slate-900'>Werkgebied</h2>
        <Button
          variant='outline'
          size='default'
          onClick={onEdit}
          className='text-primary border-primary font-normal text-base rounded-xl'
        >
          Wijzig
        </Button>
      </div>

      <div className='space-y-4'>
        {/* Work Address */}
        <div className='flex items-center justify-between py-3 border-b border-neutral-200'>
          <span className='text-sm text-muted-foreground'>Werklocatie</span>
          <span className='text-sm text-slate-900 text-right'>
            {workArea.work_address}
          </span>
        </div>

        {/* Postal Code */}
        {workArea.work_postal_code && (
          <div className='flex items-center justify-between py-3 border-b border-neutral-200'>
            <span className='text-sm text-muted-foreground'>Postcode</span>
            <span className='text-sm text-slate-900'>{workArea.work_postal_code}</span>
          </div>
        )}

        {/* City */}
        {workArea.work_city && (
          <div className='flex items-center justify-between py-3 border-b border-neutral-200'>
            <span className='text-sm text-muted-foreground'>Stad</span>
            <span className='text-sm text-slate-900'>{workArea.work_city}</span>
          </div>
        )}

        {/* Service Radius */}
        <div className='flex items-center justify-between py-3 border-b border-neutral-200'>
          <span className='text-sm text-muted-foreground'>Service straal</span>
          <span className='text-sm text-slate-900'>
            {workArea.service_radius_km === 50
              ? '+50 km'
              : `${workArea.service_radius_km} km`}
          </span>
        </div>

        {/* Coordinates */}
        <div className='flex items-center justify-between py-3'>
          <span className='text-sm text-muted-foreground'>Coördinaten</span>
          <span className='text-sm text-slate-900 text-right'>
            {Number(workArea.work_latitude).toFixed(6)}, {Number(workArea.work_longitude).toFixed(6)}
          </span>
        </div>
      </div>
    </div>
  );
}
