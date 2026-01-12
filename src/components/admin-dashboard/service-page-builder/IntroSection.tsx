'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Loader2, Check } from 'lucide-react';
import TinyMCEEditor from '@/components/ui/tinymce-editor';
import { useSaveServicePageIntro } from '@/lib/hooks/admin/service-page-intro';
import { ServicePageIntroDTO } from '@/lib/api/admin/service-page-intro.api';
import ImageUpload from './ImageUpload';

interface IntroSectionProps {
  servicePageId: string;
  initialIntro?: ServicePageIntroDTO | null;
}

export default function IntroSection({
  servicePageId,
  initialIntro,
}: IntroSectionProps) {
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(
    initialIntro?.background_image_url || ''
  );
  const [backgroundImageAlt, setBackgroundImageAlt] = useState(
    initialIntro?.background_image_alt || ''
  );

  // Dutch (NL) fields
  const [headingNl, setHeadingNl] = useState(initialIntro?.heading_nl || '');
  const [descriptionNl, setDescriptionNl] = useState(
    initialIntro?.description_nl || ''
  );

  // English (EN) fields
  const [headingEn, setHeadingEn] = useState(initialIntro?.heading_en || '');
  const [descriptionEn, setDescriptionEn] = useState(
    initialIntro?.description_en || ''
  );

  const saveMutation = useSaveServicePageIntro();

  const handleSave = async () => {
    try {
      await saveMutation.mutateAsync({
        servicePageId,
        headingNl,
        headingEn,
        descriptionNl,
        descriptionEn,
        backgroundImageUrl,
        backgroundImageAlt,
      });
    } catch (error) {
      console.error('Error saving intro:', error);
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
            {locale === 'nl' ? 'Intro Sectie' : 'Intro Section'}
          </h3>
          {backgroundImageUrl && (
            <span className='text-xs text-green-600 font-medium px-2 py-1 bg-green-50 rounded-full'>
              ✓ Configured
            </span>
          )}
        </div>
        <div className='flex items-center gap-2'>
          {isExpanded ? (
            <ChevronUp className='w-5 h-5 text-slate-600 group-hover:text-primary transition-colors' />
          ) : (
            <ChevronDown className='w-5 h-5 text-slate-600 group-hover:text-primary transition-colors' />
          )}
        </div>
      </button>

      {/* Content - Expandable */}
      {isExpanded && (
        <div className='border-t border-slate-200 p-6 space-y-8 bg-gradient-to-b from-slate-50 to-white'>
          {/* Background Image Upload & Alt Text */}
          <div className='space-y-4'>
            <div className='flex items-end gap-6'>
              {/* Image Upload */}
              <div className='flex-shrink-0'>
                <ImageUpload
                  imageUrl={backgroundImageUrl}
                  onImageChange={setBackgroundImageUrl}
                  bucket='service-pages'
                  label={locale === 'nl' ? 'Afbeelding' : 'Image'}
                  aspectRatio='banner-small'
                  disabled={saveMutation.isPending}
                  compact={true}
                />
              </div>

              {/* Alt Text Input */}
              <div className='flex-1 space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl'
                    ? 'Alt Tekst (Toegankelijkheid)'
                    : 'Alt Text (Accessibility)'}
                </label>
                <Input
                  placeholder={
                    locale === 'nl'
                      ? 'bijv. Team aan het werk op locatie'
                      : 'e.g. Team working on site'
                  }
                  value={backgroundImageAlt}
                  onChange={(e) => setBackgroundImageAlt(e.target.value)}
                  className='bg-white border-slate-300'
                  maxLength={150}
                />
                <p className='text-xs text-slate-500'>
                  {backgroundImageAlt.length}/150 {' - '}
                  {locale === 'nl'
                    ? 'Beschrijf de afbeelding voor schermlezers'
                    : 'Describe the image for screen readers'}
                </p>
              </div>
            </div>

            <p className='text-xs text-slate-500 italic'>
              {locale === 'nl'
                ? '💡 Aanbevolen resolutie: 612x408px'
                : '💡 Recommended resolution: 612x408px'}
            </p>
          </div>

          {/* Two Column Layout for Languages */}
          <div className='grid grid-cols-2 gap-6'>
            {/* Dutch (NL) Column */}
            <div className='space-y-4 p-5 bg-white rounded-xl border-2 border-slate-200 shadow-sm hover:border-primary/50 transition-colors'>
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
                  placeholder='bijv. Introductie tot onze services'
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
                  {locale === 'nl'
                    ? 'Beschrijving (HTML)'
                    : 'Description (HTML)'}
                </label>
                <TinyMCEEditor
                  value={descriptionNl}
                  onChange={setDescriptionNl}
                  placeholder='Beschrijf de intro in detail...'
                  className='bg-slate-50'
                />
              </div>
            </div>

            {/* English (EN) Column */}
            <div className='space-y-4 p-5 bg-white rounded-xl border-2 border-slate-200 shadow-sm hover:border-primary/50 transition-colors'>
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
                  placeholder='e.g. Introduction to our services'
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
                  {locale === 'nl'
                    ? 'Beschrijving (HTML)'
                    : 'Description (HTML)'}
                </label>
                <TinyMCEEditor
                  value={descriptionEn}
                  onChange={setDescriptionEn}
                  placeholder='Describe the intro in detail...'
                  className='bg-slate-50'
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className='flex justify-end pt-6 border-t-2 border-slate-200'>
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
