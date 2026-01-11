'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Loader2, Check } from 'lucide-react';
import { useSaveServicePageBanner } from '@/lib/hooks/admin/service-page-banners';
import { ServicePageBannerDTO } from '@/lib/api/admin/service-page-banners.api';
import ImageUpload from './ImageUpload';

interface BannerSectionProps {
  servicePageId: string;
  initialBanner?: ServicePageBannerDTO | null;
}

export default function BannerSection({
  servicePageId,
  initialBanner,
}: BannerSectionProps) {
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(
    initialBanner?.background_image_url || ''
  );
  const [backgroundImageAlt, setBackgroundImageAlt] = useState(
    initialBanner?.background_image_alt || ''
  );

  // Dutch (NL) fields
  const [eyebrowTextNl, setEyebrowTextNl] = useState(
    initialBanner?.eyebrow_text_nl || ''
  );
  const [h1TextNl, setH1TextNl] = useState(initialBanner?.h1_text_nl || '');
  const [descriptionNl, setDescriptionNl] = useState(
    initialBanner?.description_nl || ''
  );

  // English (EN) fields
  const [eyebrowTextEn, setEyebrowTextEn] = useState(
    initialBanner?.eyebrow_text_en || ''
  );
  const [h1TextEn, setH1TextEn] = useState(initialBanner?.h1_text_en || '');
  const [descriptionEn, setDescriptionEn] = useState(
    initialBanner?.description_en || ''
  );

  const saveMutation = useSaveServicePageBanner();

  const handleSave = async () => {
    try {
      await saveMutation.mutateAsync({
        servicePageId,
        eyebrowTextNl,
        eyebrowTextEn,
        h1TextNl,
        h1TextEn,
        descriptionNl,
        descriptionEn,
        backgroundImageUrl,
        backgroundImageAlt,
      });
    } catch (error) {
      console.error('Error saving banner:', error);
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
            <span className='text-lg'>🎨</span>
          </div>
          <h3 className='text-lg font-semibold text-slate-900'>
            {locale === 'nl' ? 'Banner Sectie' : 'Banner Section'}
          </h3>
        </div>
        <div className='flex items-center gap-2'>
          {backgroundImageUrl && (
            <span className='text-xs text-green-600 font-medium px-2 py-1 bg-green-50 rounded-full'>
              ✓ Configured
            </span>
          )}
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
          {/* Background Image Upload */}
          <div className='space-y-4'>
            <ImageUpload
              imageUrl={backgroundImageUrl}
              onImageChange={setBackgroundImageUrl}
              bucket='service-pages'
              label={locale === 'nl' ? 'Achtergrond Afbeelding' : 'Background Image'}
              aspectRatio='banner-small'
              disabled={saveMutation.isPending}
            />
            <p className='text-xs text-slate-500 italic'>
              {locale === 'nl'
                ? '💡 Aanbevolen resolutie: 1326x652px voor optimale weergave'
                : '💡 Recommended resolution: 1326x652px for optimal display'}
            </p>

            {/* Alt Text Input */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-slate-900'>
                {locale === 'nl' ? 'Alt Tekst (Toegankelijkheid)' : 'Alt Text (Accessibility)'}
              </label>
              <Input
                placeholder={
                  locale === 'nl'
                    ? 'bijv. Professionele aannemer aan het werk'
                    : 'e.g. Professional contractor at work'
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

              {/* Eyebrow Text NL */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Voorkop Tekst' : 'Eyebrow Text'}
                </label>
                <Input
                  placeholder='bijv. Nieuwe categorie'
                  value={eyebrowTextNl}
                  onChange={(e) => setEyebrowTextNl(e.target.value)}
                  className='bg-slate-50 border-slate-300'
                  maxLength={100}
                />
                <p className='text-xs text-slate-500'>
                  {eyebrowTextNl.length}/100
                </p>
              </div>

              {/* H1 Text NL */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Hoofdtitel' : 'Main Heading'}
                </label>
                <Input
                  placeholder='bijv. Professionele Reparatie'
                  value={h1TextNl}
                  onChange={(e) => setH1TextNl(e.target.value)}
                  className='bg-slate-50 border-slate-300'
                  maxLength={150}
                />
                <p className='text-xs text-slate-500'>
                  {h1TextNl.length}/150
                </p>
              </div>

              {/* Description NL */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Beschrijving' : 'Description'}
                </label>
                <Textarea
                  placeholder='Beschrijf de service in detail...'
                  value={descriptionNl}
                  onChange={(e) => setDescriptionNl(e.target.value)}
                  className='bg-slate-50 border-slate-300 min-h-24'
                  maxLength={500}
                />
                <p className='text-xs text-slate-500'>
                  {descriptionNl.length}/500
                </p>
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

              {/* Eyebrow Text EN */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Voorkop Tekst' : 'Eyebrow Text'}
                </label>
                <Input
                  placeholder='e.g. New category'
                  value={eyebrowTextEn}
                  onChange={(e) => setEyebrowTextEn(e.target.value)}
                  className='bg-slate-50 border-slate-300'
                  maxLength={100}
                />
                <p className='text-xs text-slate-500'>
                  {eyebrowTextEn.length}/100
                </p>
              </div>

              {/* H1 Text EN */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Hoofdtitel' : 'Main Heading'}
                </label>
                <Input
                  placeholder='e.g. Professional Repair'
                  value={h1TextEn}
                  onChange={(e) => setH1TextEn(e.target.value)}
                  className='bg-slate-50 border-slate-300'
                  maxLength={150}
                />
                <p className='text-xs text-slate-500'>
                  {h1TextEn.length}/150
                </p>
              </div>

              {/* Description EN */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Beschrijving' : 'Description'}
                </label>
                <Textarea
                  placeholder='Describe the service in detail...'
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  className='bg-slate-50 border-slate-300 min-h-24'
                  maxLength={500}
                />
                <p className='text-xs text-slate-500'>
                  {descriptionEn.length}/500
                </p>
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
