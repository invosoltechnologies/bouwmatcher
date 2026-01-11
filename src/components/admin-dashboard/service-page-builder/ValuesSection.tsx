'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Upload } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  useSaveServicePageValues,
  useUploadValueIcon,
} from '@/lib/hooks/admin/service-page-values';
import {
  ServicePageValuesDTO,
  SaveValueItemDTO,
} from '@/lib/api/admin/service-page-values.api';

interface ValuesSectionProps {
  servicePageId: string;
  initialData?: ServicePageValuesDTO | null;
}

type ValuePosition = 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right';

export default function ValuesSection({
  servicePageId,
  initialData,
}: ValuesSectionProps) {
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);

  // Section fields
  const [headingNl, setHeadingNl] = useState(initialData?.heading_nl || '');
  const [headingEn, setHeadingEn] = useState(initialData?.heading_en || '');
  const [descriptionNl, setDescriptionNl] = useState(initialData?.description_nl || '');
  const [descriptionEn, setDescriptionEn] = useState(initialData?.description_en || '');
  const [centerTextNl, setCenterTextNl] = useState(initialData?.center_text_nl || '');
  const [centerTextEn, setCenterTextEn] = useState(initialData?.center_text_en || '');
  const [uploadingPosition, setUploadingPosition] = useState<string | null>(null);

  // Values items
  const [values, setValues] = useState<Record<ValuePosition, SaveValueItemDTO>>({
    top_left: { position: 'top_left', heading_nl: '', heading_en: '', description_nl: '', description_en: '', icon_url: null, icon_alt_text: null },
    top_right: { position: 'top_right', heading_nl: '', heading_en: '', description_nl: '', description_en: '', icon_url: null, icon_alt_text: null },
    bottom_left: { position: 'bottom_left', heading_nl: '', heading_en: '', description_nl: '', description_en: '', icon_url: null, icon_alt_text: null },
    bottom_right: { position: 'bottom_right', heading_nl: '', heading_en: '', description_nl: '', description_en: '', icon_url: null, icon_alt_text: null },
  });

  const saveMutation = useSaveServicePageValues();
  const uploadIconMutation = useUploadValueIcon();

  // Initialize from initial data
  useEffect(() => {
    if (initialData) {
      setHeadingNl(initialData.heading_nl || '');
      setHeadingEn(initialData.heading_en || '');
      setDescriptionNl(initialData.description_nl || '');
      setDescriptionEn(initialData.description_en || '');
      setCenterTextNl(initialData.center_text_nl || '');
      setCenterTextEn(initialData.center_text_en || '');

      // Initialize values from items
      const newValues: Record<ValuePosition, SaveValueItemDTO> = {
        top_left: { position: 'top_left', heading_nl: '', heading_en: '', description_nl: '', description_en: '', icon_url: null, icon_alt_text: null },
        top_right: { position: 'top_right', heading_nl: '', heading_en: '', description_nl: '', description_en: '', icon_url: null, icon_alt_text: null },
        bottom_left: { position: 'bottom_left', heading_nl: '', heading_en: '', description_nl: '', description_en: '', icon_url: null, icon_alt_text: null },
        bottom_right: { position: 'bottom_right', heading_nl: '', heading_en: '', description_nl: '', description_en: '', icon_url: null, icon_alt_text: null },
      };

      initialData.items.forEach((item) => {
        const pos = item.position as ValuePosition;
        newValues[pos] = {
          id: item.id,
          position: pos,
          heading_nl: item.heading_nl,
          heading_en: item.heading_en,
          description_nl: item.description_nl,
          description_en: item.description_en,
          icon_url: item.icon_url,
          icon_alt_text: item.icon_alt_text,
        };
      });

      setValues(newValues);
    }
  }, [initialData]);

  const handleValueChange = (position: ValuePosition, field: string, value: string | null) => {
    setValues((prev) => ({
      ...prev,
      [position]: { ...prev[position], [field]: value },
    }));
  };

  const handleIconUpload = async (position: ValuePosition, file: File) => {
    try {
      setUploadingPosition(position);
      const result = await uploadIconMutation.mutateAsync({ file });
      handleValueChange(position, 'icon_url', result.url);
    } catch (error) {
      console.error('Icon upload error:', error);
    } finally {
      setUploadingPosition(null);
    }
  };

  const handleSave = async () => {
    try {
      await saveMutation.mutateAsync({
        servicePageId,
        headingNl,
        headingEn,
        descriptionNl,
        descriptionEn,
        centerTextNl,
        centerTextEn,
        items: Object.values(values),
      });
    } catch (error) {
      console.error('Error saving values section:', error);
    }
  };

  const renderValueCard = (position: ValuePosition, label: string) => {
    const item = values[position];

    return (
      <div className='space-y-4 p-4 bg-white rounded-lg border border-slate-200'>
        <h5 className='font-semibold text-slate-900'>{label}</h5>

        {/* Two Column NL/EN */}
        <div className='grid grid-cols-2 gap-4'>
          {/* Dutch (NL) */}
          <div className='space-y-3'>
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-slate-900'>
                {locale === 'nl' ? 'Titel (NL)' : 'Title (NL)'}
              </label>
              <Input
                placeholder='Max 25 chars'
                value={item.heading_nl}
                onChange={(e) => handleValueChange(position, 'heading_nl', e.target.value.slice(0, 25))}
                className='bg-slate-50 border-slate-300'
                maxLength={25}
              />
              <p className='text-xs text-slate-500'>{item.heading_nl.length}/25</p>
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-slate-900'>
                {locale === 'nl' ? 'Beschrijving (NL)' : 'Description (NL)'}
              </label>
              <Textarea
                placeholder='Max 190 chars'
                value={item.description_nl}
                onChange={(e) => handleValueChange(position, 'description_nl', e.target.value.slice(0, 190))}
                className='bg-slate-50 border-slate-300 min-h-[60px]'
                maxLength={190}
              />
              <p className='text-xs text-slate-500'>{item.description_nl.length}/190</p>
            </div>
          </div>

          {/* English (EN) */}
          <div className='space-y-3'>
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-slate-900'>
                {locale === 'nl' ? 'Titel (EN)' : 'Title (EN)'}
              </label>
              <Input
                placeholder='Max 25 chars'
                value={item.heading_en}
                onChange={(e) => handleValueChange(position, 'heading_en', e.target.value.slice(0, 25))}
                className='bg-slate-50 border-slate-300'
                maxLength={25}
              />
              <p className='text-xs text-slate-500'>{item.heading_en.length}/25</p>
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-slate-900'>
                {locale === 'nl' ? 'Beschrijving (EN)' : 'Description (EN)'}
              </label>
              <Textarea
                placeholder='Max 190 chars'
                value={item.description_en}
                onChange={(e) => handleValueChange(position, 'description_en', e.target.value.slice(0, 190))}
                className='bg-slate-50 border-slate-300 min-h-[60px]'
                maxLength={190}
              />
              <p className='text-xs text-slate-500'>{item.description_en.length}/190</p>
            </div>
          </div>
        </div>

        {/* Icon and Alt Text */}
        <div className='space-y-2 pt-2 border-t border-slate-200'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-slate-900'>
              {locale === 'nl' ? 'Pictogram' : 'Icon'}
            </label>
            {item.icon_url && (
              <div className='relative w-full h-20 rounded-lg overflow-hidden border border-slate-300 bg-white flex items-center justify-center'>
                <img
                  src={item.icon_url}
                  alt='Icon'
                  className='w-12 h-12'
                />
              </div>
            )}
            <label className='cursor-pointer'>
              <div className='flex items-center justify-center w-full px-3 py-2 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 transition-colors'>
                <div className='flex flex-col items-center gap-1'>
                  <Upload className='w-4 h-4 text-slate-600' />
                  <span className='text-xs text-slate-600'>
                    {locale === 'nl' ? 'Upload' : 'Upload'}
                  </span>
                </div>
              </div>
              <input
                type='file'
                accept='image/*'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleIconUpload(position, file);
                }}
                disabled={uploadingPosition === position}
                className='hidden'
              />
            </label>
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-slate-900'>
              {locale === 'nl' ? 'Alt Tekst' : 'Alt Text'}
            </label>
            <Input
              placeholder='Alt text for accessibility'
              value={item.icon_alt_text || ''}
              onChange={(e) => handleValueChange(position, 'icon_alt_text', e.target.value)}
              className='bg-slate-50 border-slate-300'
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className='py-0 border border-slate-200 rounded-lg overflow-hidden'>
      {/* Header - Collapsible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'
      >
        <h3 className='text-lg font-semibold text-slate-900'>
          {locale === 'nl' ? 'Waarom Bouwmatcher? Sectie' : 'Why Bouwmatcher? Section'}
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
                  placeholder='bijv. Waarom Bouwmatcher?'
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
                <p className='text-xs text-slate-500'>{descriptionNl.length}/500</p>
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Middel Tekst (max 90)' : 'Center Text (max 90)'}
                </label>
                <Textarea
                  placeholder='Tekst voor cirkel in het midden'
                  value={centerTextNl}
                  onChange={(e) => setCenterTextNl(e.target.value.slice(0, 90))}
                  className='bg-slate-50 border-slate-300 min-h-[60px]'
                  maxLength={90}
                />
                <p className='text-xs text-slate-500'>{centerTextNl.length}/90</p>
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
                  placeholder='e.g. Why Bouwmatcher?'
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
                <p className='text-xs text-slate-500'>{descriptionEn.length}/500</p>
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Middel Tekst (max 90)' : 'Center Text (max 90)'}
                </label>
                <Textarea
                  placeholder='Text for circle in center'
                  value={centerTextEn}
                  onChange={(e) => setCenterTextEn(e.target.value.slice(0, 90))}
                  className='bg-slate-50 border-slate-300 min-h-[60px]'
                  maxLength={90}
                />
                <p className='text-xs text-slate-500'>{centerTextEn.length}/90</p>
              </div>
            </div>
          </div>

          {/* Values Grid (2x2) */}
          <div className='space-y-4'>
            <h4 className='font-semibold text-slate-900'>
              {locale === 'nl' ? 'Waarden' : 'Values'}
            </h4>

            {/* Top Row */}
            <div className='grid grid-cols-2 gap-6'>
              {renderValueCard('top_left', locale === 'nl' ? 'Linksboven' : 'Top Left')}
              {renderValueCard('top_right', locale === 'nl' ? 'Rechtsboven' : 'Top Right')}
            </div>

            {/* Bottom Row */}
            <div className='grid grid-cols-2 gap-6'>
              {renderValueCard('bottom_left', locale === 'nl' ? 'Linksonder' : 'Bottom Left')}
              {renderValueCard('bottom_right', locale === 'nl' ? 'Rechtsonder' : 'Bottom Right')}
            </div>
          </div>

          {/* Save Button */}
          <div className='flex justify-end pt-4 border-t border-slate-200'>
            <Button
              onClick={handleSave}
              disabled={saveMutation.isPending}
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
