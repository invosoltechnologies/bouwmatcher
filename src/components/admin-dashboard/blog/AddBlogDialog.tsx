'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLocale } from 'next-intl';
import { generateSlug } from '@/lib/utils/slug-generator';
import { cn } from '@/lib/utils';

interface AddBlogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    slug: string;
    title_nl: string;
    title_en: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

export default function AddBlogDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: AddBlogDialogProps) {
  const locale = useLocale();
  const [step, setStep] = useState(1);
  const [titleNl, setTitleNl] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [slug, setSlug] = useState('');
  const [metaTitleNl, setMetaTitleNl] = useState('');
  const [metaTitleEn, setMetaTitleEn] = useState('');
  const [metaDescNl, setMetaDescNl] = useState('');
  const [metaDescEn, setMetaDescEn] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleNlChange = (value: string) => {
    setTitleNl(value);
    // Auto-generate slug from Dutch title if slug is empty
    if (!slug) {
      setSlug(generateSlug(value));
    }
    // Auto-fill meta title if empty
    if (!metaTitleNl) {
      setMetaTitleNl(value.substring(0, 60));
    }
  };

  const handleTitleEnChange = (value: string) => {
    setTitleEn(value);
    // Auto-fill meta title if empty
    if (!metaTitleEn) {
      setMetaTitleEn(value.substring(0, 60));
    }
  };

  const handleNext = () => {
    if (!titleNl || !slug) {
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    if (!titleNl || !slug) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        slug,
        title_nl: titleNl,
        title_en: titleEn || titleNl,
      });
      // Reset form
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setTitleNl('');
    setTitleEn('');
    setSlug('');
    setMetaTitleNl('');
    setMetaTitleEn('');
    setMetaDescNl('');
    setMetaDescEn('');
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {locale === 'nl' ? 'Nieuwe Blogpost Toevoegen' : 'Add New Blog Post'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="flex gap-2">
            <div
              className={cn(
                'h-2 flex-1 rounded-full transition-colors',
                step >= 1 ? 'bg-primary' : 'bg-slate-200'
              )}
            />
            <div
              className={cn(
                'h-2 flex-1 rounded-full transition-colors',
                step >= 2 ? 'bg-primary' : 'bg-slate-200'
              )}
            />
          </div>

          {/* Step 1: Title & Slug */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {locale === 'nl' ? 'Stap 1: Titel en URL' : 'Step 1: Title and URL'}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {locale === 'nl'
                    ? 'Voer de titel en URL slug voor de blogpost in'
                    : 'Enter the title and URL slug for the blog post'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Dutch Title */}
                <div className="space-y-2">
                  <Label htmlFor="title-nl">
                    🇳🇱 {locale === 'nl' ? 'Titel (Nederlands)' : 'Title (Dutch)'}
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="title-nl"
                    value={titleNl}
                    onChange={(e) => handleTitleNlChange(e.target.value)}
                    placeholder={locale === 'nl' ? 'Voer titel in...' : 'Enter title...'}
                    className="bg-slate-50 border-slate-300"
                  />
                </div>

                {/* English Title */}
                <div className="space-y-2">
                  <Label htmlFor="title-en">
                    🇬🇧 {locale === 'nl' ? 'Titel (Engels)' : 'Title (English)'}
                  </Label>
                  <Input
                    id="title-en"
                    value={titleEn}
                    onChange={(e) => handleTitleEnChange(e.target.value)}
                    placeholder={locale === 'nl' ? 'Voer titel in...' : 'Enter title...'}
                    className="bg-slate-50 border-slate-300"
                  />
                </div>
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label htmlFor="slug">
                  {locale === 'nl' ? 'URL Slug' : 'URL Slug'}
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  placeholder="blog-post-url-slug"
                  className="bg-slate-50 border-slate-300 font-mono text-sm"
                />
                <p className="text-xs text-slate-500">
                  {locale === 'nl'
                    ? 'Dit wordt gebruikt in de URL: /blog/'
                    : 'This will be used in the URL: /blog/'}
                  {slug || 'your-slug-here'}
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={handleCancel}>
                  {locale === 'nl' ? 'Annuleren' : 'Cancel'}
                </Button>
                <Button onClick={handleNext} disabled={!titleNl || !slug}>
                  {locale === 'nl' ? 'Volgende' : 'Next'}
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Meta Information */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {locale === 'nl' ? 'Stap 2: SEO Metadata' : 'Step 2: SEO Metadata'}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {locale === 'nl'
                    ? 'Voer SEO informatie in (optioneel, kan later worden bewerkt)'
                    : 'Enter SEO information (optional, can be edited later)'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Dutch Meta Title */}
                <div className="space-y-2">
                  <Label htmlFor="meta-title-nl">
                    🇳🇱 {locale === 'nl' ? 'Meta Titel (NL)' : 'Meta Title (NL)'}
                  </Label>
                  <Input
                    id="meta-title-nl"
                    value={metaTitleNl}
                    onChange={(e) => setMetaTitleNl(e.target.value.substring(0, 60))}
                    placeholder={titleNl}
                    maxLength={60}
                    className="bg-slate-50 border-slate-300"
                  />
                  <p className="text-xs text-slate-500">{metaTitleNl.length}/60</p>
                </div>

                {/* English Meta Title */}
                <div className="space-y-2">
                  <Label htmlFor="meta-title-en">
                    🇬🇧 {locale === 'nl' ? 'Meta Titel (EN)' : 'Meta Title (EN)'}
                  </Label>
                  <Input
                    id="meta-title-en"
                    value={metaTitleEn}
                    onChange={(e) => setMetaTitleEn(e.target.value.substring(0, 60))}
                    placeholder={titleEn || titleNl}
                    maxLength={60}
                    className="bg-slate-50 border-slate-300"
                  />
                  <p className="text-xs text-slate-500">{metaTitleEn.length}/60</p>
                </div>

                {/* Dutch Meta Description */}
                <div className="space-y-2">
                  <Label htmlFor="meta-desc-nl">
                    🇳🇱 {locale === 'nl' ? 'Meta Beschrijving (NL)' : 'Meta Description (NL)'}
                  </Label>
                  <Textarea
                    id="meta-desc-nl"
                    value={metaDescNl}
                    onChange={(e) => setMetaDescNl(e.target.value.substring(0, 160))}
                    placeholder={locale === 'nl' ? 'Korte beschrijving...' : 'Short description...'}
                    maxLength={160}
                    rows={3}
                    className="bg-slate-50 border-slate-300 resize-none"
                  />
                  <p className="text-xs text-slate-500">{metaDescNl.length}/160</p>
                </div>

                {/* English Meta Description */}
                <div className="space-y-2">
                  <Label htmlFor="meta-desc-en">
                    🇬🇧 {locale === 'nl' ? 'Meta Beschrijving (EN)' : 'Meta Description (EN)'}
                  </Label>
                  <Textarea
                    id="meta-desc-en"
                    value={metaDescEn}
                    onChange={(e) => setMetaDescEn(e.target.value.substring(0, 160))}
                    placeholder={locale === 'nl' ? 'Korte beschrijving...' : 'Short description...'}
                    maxLength={160}
                    rows={3}
                    className="bg-slate-50 border-slate-300 resize-none"
                  />
                  <p className="text-xs text-slate-500">{metaDescEn.length}/160</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={handleBack}>
                  {locale === 'nl' ? 'Terug' : 'Back'}
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading
                    ? locale === 'nl'
                      ? 'Aanmaken...'
                      : 'Creating...'
                    : locale === 'nl'
                    ? 'Aanmaken'
                    : 'Create'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
