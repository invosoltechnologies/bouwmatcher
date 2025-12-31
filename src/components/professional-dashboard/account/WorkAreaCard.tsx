'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useWorkArea } from '@/lib/hooks/professional/account/useWorkArea';

interface WorkAreaCardProps {
  onEdit: () => void;
}

export default function WorkAreaCard({ onEdit }: WorkAreaCardProps) {
  const t = useTranslations('common.proDashboard.account.workArea');
  const { data, isLoading, isError } = useWorkArea();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold text-slate-900">{t('title')}</h2>
        </div>
        <div className="text-muted-foreground">{t('loading')}</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold text-slate-900">{t('title')}</h2>
        </div>
        <div className="text-red-600">{t('error')}</div>
      </div>
    );
  }

  const workArea = data?.data;
  console.log("workArea",workArea);

  if (!data?.saved || !workArea) {
    return (
      <div className='bg-white rounded-lg border border-neutral-200 p-6'>
        <div className='flex items-start justify-between mb-6'>
          <h2 className='text-xl font-semibold text-slate-900'>{t('title')}</h2>
          <Button
            variant='outline'
            size='default'
            onClick={onEdit}
            className='text-primary border-primary font-normal text-sm rounded-xl'
          >
            {t('edit')}
          </Button>
        </div>
        <div className='text-muted-foreground'>
          <p>{t('notSet')}</p>
          <p className='text-sm mt-2'>
            {t('notSetHint')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg border border-neutral-200 p-6'>
      <div className='flex items-start justify-between mb-6'>
        <h2 className='text-xl font-semibold text-slate-900'>{t('title')}</h2>
        <Button
          variant='outline'
          size='default'
          onClick={onEdit}
          className='text-primary border-primary font-normal text-base rounded-xl'
        >
          {t('edit')}
        </Button>
      </div>

      <div className='space-y-4'>
        {/* Work Address */}
        <div className='flex items-center justify-between py-3 border-b border-neutral-200'>
          <span className='text-sm text-muted-foreground'>{t('workLocation')}</span>
          <span className='text-sm text-slate-900 text-right'>
            {workArea.work_address}
          </span>
        </div>

        {/* Postal Code */}
        {workArea.work_postal_code && (
          <div className='flex items-center justify-between py-3 border-b border-neutral-200'>
            <span className='text-sm text-muted-foreground'>{t('postalCode')}</span>
            <span className='text-sm text-slate-900'>{workArea.work_postal_code}</span>
          </div>
        )}

        {/* City */}
        {workArea.work_city && (
          <div className='flex items-center justify-between py-3 border-b border-neutral-200'>
            <span className='text-sm text-muted-foreground'>{t('city')}</span>
            <span className='text-sm text-slate-900'>{workArea.work_city}</span>
          </div>
        )}

        {/* Service Radius */}
        <div className='flex items-center justify-between py-3 border-b border-neutral-200'>
          <span className='text-sm text-muted-foreground'>{t('serviceRadius')}</span>
          <span className='text-sm text-slate-900'>
            {workArea.service_radius_km === 50
              ? '+50 km'
              : `${workArea.service_radius_km} km`}
          </span>
        </div>

        {/* Coordinates */}
        <div className='flex items-center justify-between py-3'>
          <span className='text-sm text-muted-foreground'>{t('coordinates')}</span>
          <span className='text-sm text-slate-900 text-right'>
            {Number(workArea.work_latitude).toFixed(6)}, {Number(workArea.work_longitude).toFixed(6)}
          </span>
        </div>
      </div>
    </div>
  );
}
