'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Upload } from 'lucide-react';
import { useSaveServicePageBanner } from '@/lib/hooks/admin/service-page-banners';
import { ServicePageBannerDTO } from '@/lib/api/admin/service-page-banners.api';

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

  const [isUploading, setIsUploading] = useState(false);
  const saveMutation = useSaveServicePageBanner();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', 'service-pages');

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setBackgroundImageUrl(data.url);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

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
      });
    } catch (error) {
      console.error('Error saving banner:', error);
    }
  };

  return (
    <Card className='border py-0 border-slate-200 rounded-lg overflow-hidden'>
      {/* Header - Collapsible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'
      >
        <h3 className='text-lg font-semibold text-slate-900'>
          {locale === 'nl' ? 'Banner Sectie' : 'Banner Section'}
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
          {/* Background Image Upload */}
          <div className='space-y-3'>
            <label className='block text-sm font-medium text-slate-900'>
              {locale === 'nl' ? 'Achtergrond Afbeelding' : 'Background Image'}
            </label>
            <div className='flex items-center gap-4'>
              {backgroundImageUrl && (
                <div className='relative w-32 h-32 rounded-lg overflow-hidden border border-slate-300'>
                  <img
                    src={backgroundImageUrl}
                    alt='Banner background'
                    className='w-full h-full object-cover'
                  />
                </div>
              )}
              <div className='flex-1'>
                <label className='cursor-pointer'>
                  <div className='flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 transition-colors'>
                    <div className='flex flex-col items-center gap-2'>
                      <Upload className='w-5 h-5 text-slate-600' />
                      <span className='text-sm text-slate-600'>
                        {locale === 'nl'
                          ? 'Klik om afbeelding te uploaden'
                          : 'Click to upload image'}
                      </span>
                    </div>
                  </div>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className='hidden'
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Two Column Layout for Languages */}
          <div className='grid grid-cols-2 gap-6'>
            {/* Dutch (NL) Column */}
            <div className='space-y-4 p-4 bg-white rounded-lg border border-slate-200'>
              <h4 className='font-semibold text-slate-900 text-sm uppercase tracking-wide'>
                Nederlands (NL)
              </h4>

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
            <div className='space-y-4 p-4 bg-white rounded-lg border border-slate-200'>
              <h4 className='font-semibold text-slate-900 text-sm uppercase tracking-wide'>
                English (EN)
              </h4>

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
          <div className='flex justify-end pt-4 border-t border-slate-200'>
            <Button
              onClick={handleSave}
              disabled={saveMutation.isPending || isUploading}
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
