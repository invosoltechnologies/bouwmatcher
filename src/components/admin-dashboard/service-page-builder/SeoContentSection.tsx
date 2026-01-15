'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Loader2, Check } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import TinyMCEEditor from '@/components/ui/tinymce-editor';
import { useSaveServicePageSeoContent } from '@/lib/hooks/admin/service-page-seo-content';
import { ServicePageSeoContentDTO } from '@/lib/api/admin/service-page-seo-content.api';

interface SeoContentSectionProps {
  servicePageId: string;
  initialData?: ServicePageSeoContentDTO | null;
}

export default function SeoContentSection({
  servicePageId,
  initialData,
}: SeoContentSectionProps) {
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);

  // Section fields
  const [headingNl, setHeadingNl] = useState(initialData?.heading_nl || '');
  const [headingEn, setHeadingEn] = useState(initialData?.heading_en || '');
  const [descriptionNl, setDescriptionNl] = useState(initialData?.description_nl || '');
  const [descriptionEn, setDescriptionEn] = useState(initialData?.description_en || '');
  const [contentNl, setContentNl] = useState(initialData?.content_nl || '');
  const [contentEn, setContentEn] = useState(initialData?.content_en || '');

  const saveMutation = useSaveServicePageSeoContent();

  useEffect(() => {
    if (initialData) {
      setHeadingNl(initialData.heading_nl || '');
      setHeadingEn(initialData.heading_en || '');
      setDescriptionNl(initialData.description_nl || '');
      setDescriptionEn(initialData.description_en || '');
      setContentNl(initialData.content_nl || '');
      setContentEn(initialData.content_en || '');
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
        contentNl,
        contentEn,
      });
    } catch (error) {
      console.error('Error saving SEO content section:', error);
    }
  };

  return (
    <Card className='border py-0 border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
      {/* Header - Collapsible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='w-full flex items-center justify-between p-5 hover:bg-gradient-to-r hover:from-slate-50 hover:to-white transition-all group'
      >
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
            <span className='text-lg'>📝</span>
          </div>
          <h3 className='text-lg font-semibold text-slate-900'>
            {locale === 'nl' ? 'SEO Inhoud Sectie' : 'SEO Content Section'}
          </h3>
          {(contentNl || contentEn) && (
            <span className='text-xs text-green-600 font-medium px-2 py-1 bg-green-50 rounded-full'>
              ✓ Configured
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className='w-5 h-5 text-slate-600' />
        ) : (
          <ChevronDown className='w-5 h-5 text-slate-600' />
        )}
      </button>

      {/* Content - Expandable */}
      {isExpanded && (
        <div className='border-t border-slate-200 p-6 space-y-6 bg-slate-50'>
          {/* Two Column Layout for Languages */}
          <div className='grid grid-cols-2 gap-6'>
            {/* Dutch (NL) Column */}
            <div className='space-y-4 p-4 bg-white rounded-lg border border-slate-200'>
              <div className='flex items-center gap-2 pb-3 border-b border-slate-100'>
                <span className='text-xl'>🇳🇱</span>
                <h4 className='font-semibold text-slate-900 text-sm uppercase tracking-wide'>
                  Nederlands (NL)
                </h4>
              </div>

              {/* Heading NL */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Hoofdtitel' : 'Heading'}
                </label>
                <Input
                  placeholder='bijv. SEO Informatie'
                  value={headingNl}
                  onChange={(e) => setHeadingNl(e.target.value)}
                  className='bg-slate-50 border-slate-300'
                  maxLength={100}
                />
                <p className='text-xs text-slate-500'>{headingNl.length}/100</p>
              </div>

              {/* Description NL */}
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

              {/* Content NL */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Inhoud (HTML)' : 'Content (HTML)'}
                </label>
                <TinyMCEEditor
                  value={contentNl}
                  onChange={setContentNl}
                  placeholder='Voer SEO inhoud in...'
                  className='bg-slate-50'
                />
              </div>
            </div>

            {/* English (EN) Column */}
            <div className='space-y-4 p-4 bg-white rounded-lg border border-slate-200'>
              <div className='flex items-center gap-2 pb-3 border-b border-slate-100'>
                <span className='text-xl'>🇬🇧</span>
                <h4 className='font-semibold text-slate-900 text-sm uppercase tracking-wide'>
                  English (EN)
                </h4>
              </div>

              {/* Heading EN */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Hoofdtitel' : 'Heading'}
                </label>
                <Input
                  placeholder='e.g. SEO Information'
                  value={headingEn}
                  onChange={(e) => setHeadingEn(e.target.value)}
                  className='bg-slate-50 border-slate-300'
                  maxLength={100}
                />
                <p className='text-xs text-slate-500'>{headingEn.length}/100</p>
              </div>

              {/* Description EN */}
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

              {/* Content EN */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Inhoud (HTML)' : 'Content (HTML)'}
                </label>
                <TinyMCEEditor
                  value={contentEn}
                  onChange={setContentEn}
                  placeholder='Enter SEO content...'
                  className='bg-slate-50'
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className='flex justify-end pt-4 border-t border-slate-200'>
            <Button
              onClick={handleSave}
              disabled={saveMutation.isPending}
              className='gap-2 px-6 py-2.5 shadow-md hover:shadow-lg transition-all'
            >
              {saveMutation.isPending ? (
                <>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  {locale === 'nl' ? 'Opslaan...' : 'Saving...'}
                </>
              ) : (
                <>
                  <Check className='w-4 h-4' />
                  {locale === 'nl' ? 'Opslaan' : 'Save'}
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
