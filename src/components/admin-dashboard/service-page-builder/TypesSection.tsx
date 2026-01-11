'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useSaveServicePageTypes } from '@/lib/hooks/admin/service-page-types';
import { ServicePageTypesDTO } from '@/lib/api/admin/service-page-types.api';

interface TypesSectionProps {
  servicePageId: string;
  initialData?: ServicePageTypesDTO | null;
}

export default function TypesSection({
  servicePageId,
  initialData,
}: TypesSectionProps) {
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);

  // Section fields
  const [headingNl, setHeadingNl] = useState(initialData?.heading_nl || '');
  const [headingEn, setHeadingEn] = useState(initialData?.heading_en || '');
  const [descriptionNl, setDescriptionNl] = useState(
    initialData?.description_nl || ''
  );
  const [descriptionEn, setDescriptionEn] = useState(
    initialData?.description_en || ''
  );

  const saveMutation = useSaveServicePageTypes();

  // Initialize fields
  useEffect(() => {
    if (initialData) {
      setHeadingNl(initialData.heading_nl || '');
      setHeadingEn(initialData.heading_en || '');
      setDescriptionNl(initialData.description_nl || '');
      setDescriptionEn(initialData.description_en || '');
    }
  }, [initialData]);

  const handleSave = async () => {
    try {
      await saveMutation.mutateAsync({
        servicePageId,
        headingNl,
        headingEn,
        descriptionNl,
        descriptionEn,
      });
    } catch (error) {
      console.error('Error saving Types section:', error);
    }
  };

  return (
    <Card className='py-0 border border-slate-200 rounded-lg overflow-hidden'>
      {/* Header - Collapsible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'
      >
        <h3 className='text-lg font-semibold text-slate-900'>
          {locale === 'nl' ? 'Types Sectie' : 'Types Section'}
        </h3>
        {isExpanded ? (
          <ChevronUp className='w-5 h-5 text-slate-600' />
        ) : (
          <ChevronDown className='w-5 h-5 text-slate-600' />
        )}
      </button>

      {/* Content - Expandable */}
      {isExpanded && (
        <div className='border-t border-slate-200 p-6 space-y-6 bg-slate-50'>
          {/* Section Header */}
          <div className='grid grid-cols-2 gap-6'>
            {/* Dutch (NL) */}
            <div className='space-y-4 p-4 bg-white rounded-lg border border-slate-200'>
              <h4 className='font-semibold text-slate-900 text-sm uppercase tracking-wide'>
                Nederlands (NL)
              </h4>

              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Hoofdtitel' : 'Heading'}
                </label>
                <Input
                  placeholder='bijv. Waarom anderen voor ons kiezen'
                  value={headingNl}
                  onChange={(e) => setHeadingNl(e.target.value)}
                  className='bg-slate-50 border-slate-300'
                  maxLength={100}
                />
                <p className='text-xs text-slate-500'>{headingNl.length}/100</p>
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Beschrijving' : 'Description'}
                </label>
                <Textarea
                  placeholder='Optionele beschrijving...'
                  value={descriptionNl}
                  onChange={(e) => setDescriptionNl(e.target.value)}
                  className='bg-slate-50 border-slate-300 min-h-[80px]'
                  maxLength={500}
                />
                <p className='text-xs text-slate-500'>
                  {descriptionNl.length}/500
                </p>
              </div>
            </div>

            {/* English (EN) */}
            <div className='space-y-4 p-4 bg-white rounded-lg border border-slate-200'>
              <h4 className='font-semibold text-slate-900 text-sm uppercase tracking-wide'>
                English (EN)
              </h4>

              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Hoofdtitel' : 'Heading'}
                </label>
                <Input
                  placeholder='e.g. Why others choose us'
                  value={headingEn}
                  onChange={(e) => setHeadingEn(e.target.value)}
                  className='bg-slate-50 border-slate-300'
                  maxLength={100}
                />
                <p className='text-xs text-slate-500'>{headingEn.length}/100</p>
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Beschrijving' : 'Description'}
                </label>
                <Textarea
                  placeholder='Optional description...'
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  className='bg-slate-50 border-slate-300 min-h-[80px]'
                  maxLength={500}
                />
                <p className='text-xs text-slate-500'>
                  {descriptionEn.length}/500
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className='flex justify-end pt-4 border-t border-slate-200'>
            <Button
              onClick={handleSave}
              disabled={
                saveMutation.isPending || !headingNl || !headingEn
              }
              className='gap-2'
            >
              {saveMutation.isPending
                ? locale === 'nl'
                  ? 'Opslaan...'
                  : 'Saving...'
                : locale === 'nl'
                ? 'Opslaan'
                : 'Save'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
