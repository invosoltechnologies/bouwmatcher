'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Loader2, Check } from 'lucide-react';
import { useSaveBlogContent } from '@/lib/hooks/admin/blog-content';
import ImageUpload from '../service-page-builder/ImageUpload';

interface BannerSectionProps {
  blogPostId: string;
  initialContent?: {
    title_nl?: string | null;
    title_en?: string | null;
    excerpt_nl?: string | null;
    excerpt_en?: string | null;
    featured_image_url?: string | null;
    featured_image_alt?: string | null;
  } | null;
}

export default function BannerSection({
  blogPostId,
  initialContent,
}: BannerSectionProps) {
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);
  const [featuredImageUrl, setFeaturedImageUrl] = useState(
    initialContent?.featured_image_url || ''
  );
  const [featuredImageAlt, setFeaturedImageAlt] = useState(
    initialContent?.featured_image_alt || ''
  );

  // Dutch (NL) fields
  const [titleNl, setTitleNl] = useState(initialContent?.title_nl || '');
  const [excerptNl, setExcerptNl] = useState(initialContent?.excerpt_nl || '');

  // English (EN) fields
  const [titleEn, setTitleEn] = useState(initialContent?.title_en || '');
  const [excerptEn, setExcerptEn] = useState(initialContent?.excerpt_en || '');

  const saveMutation = useSaveBlogContent();

  // Sync state with initialContent when it loads
  useEffect(() => {
    if (initialContent) {
      setFeaturedImageUrl(initialContent.featured_image_url || '');
      setFeaturedImageAlt(initialContent.featured_image_alt || '');
      setTitleNl(initialContent.title_nl || '');
      setExcerptNl(initialContent.excerpt_nl || '');
      setTitleEn(initialContent.title_en || '');
      setExcerptEn(initialContent.excerpt_en || '');
    }
  }, [initialContent]);

  const handleSave = async () => {
    try {
      await saveMutation.mutateAsync({
        blog_post_id: blogPostId,
        title_nl: titleNl,
        title_en: titleEn,
        excerpt_nl: excerptNl,
        excerpt_en: excerptEn,
        featured_image_url: featuredImageUrl,
        featured_image_alt: featuredImageAlt,
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

          {featuredImageUrl && (
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
          {/* Featured Image Upload & Alt Text */}
          <div className='space-y-4'>
            <div className='flex items-end gap-6'>
              {/* Image Upload */}
              <div className='flex-shrink-0'>
                <ImageUpload
                  imageUrl={featuredImageUrl}
                  onImageChange={setFeaturedImageUrl}
                  bucket='blog-posts'
                  label={locale === 'nl' ? 'Uitgelichte Afbeelding' : 'Featured Image'}
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
                      ? 'bijv. Blog afbeelding'
                      : 'e.g. Blog image'
                  }
                  value={featuredImageAlt}
                  onChange={(e) => setFeaturedImageAlt(e.target.value)}
                  className='bg-white border-slate-300'
                  maxLength={150}
                />
                <p className='text-xs text-slate-500'>
                  {featuredImageAlt.length}/150 {' - '}
                  {locale === 'nl'
                    ? 'Beschrijf de afbeelding voor schermlezers'
                    : 'Describe the image for screen readers'}
                </p>
              </div>
            </div>

            <p className='text-xs text-slate-500 italic'>
              {locale === 'nl'
                ? '💡 Aanbevolen resolutie: 572×402px'
                : '💡 Recommended resolution: 572×402px'}
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

              {/* Title NL */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Titel' : 'Title'}
                </label>
                <Input
                  placeholder='bijv. Waarom het vinden van de juiste vakman lastig is'
                  value={titleNl}
                  onChange={(e) => setTitleNl(e.target.value)}
                  className='bg-slate-50 border-slate-300'
                  maxLength={200}
                />
                <p className='text-xs text-slate-500'>
                  {titleNl.length}/200
                </p>
              </div>

              {/* Short Description NL */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Korte Beschrijving' : 'Short Description'}
                </label>
                <Textarea
                  placeholder='Korte samenvatting van de blogpost...'
                  value={excerptNl}
                  onChange={(e) => setExcerptNl(e.target.value)}
                  className='bg-slate-50 border-slate-300 min-h-24'
                  maxLength={300}
                />
                <p className='text-xs text-slate-500'>
                  {excerptNl.length}/300
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

              {/* Title EN */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Titel' : 'Title'}
                </label>
                <Input
                  placeholder='e.g. Why finding the right professional is difficult'
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className='bg-slate-50 border-slate-300'
                  maxLength={200}
                />
                <p className='text-xs text-slate-500'>{titleEn.length}/200</p>
              </div>

              {/* Short Description EN */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl' ? 'Korte Beschrijving' : 'Short Description'}
                </label>
                <Textarea
                  placeholder='Short summary of the blog post...'
                  value={excerptEn}
                  onChange={(e) => setExcerptEn(e.target.value)}
                  className='bg-slate-50 border-slate-300 min-h-24'
                  maxLength={300}
                />
                <p className='text-xs text-slate-500'>
                  {excerptEn.length}/300
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
