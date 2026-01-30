'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Loader2, Check } from 'lucide-react';
import TinyMCEEditor from '@/components/ui/tinymce-editor';
import { useSaveBlogContent } from '@/lib/hooks/admin/blog-content';

interface ContentSectionProps {
  blogPostId: string;
  initialContent?: {
    content_nl?: string | null;
    content_en?: string | null;
  } | null;
}

export default function ContentSection({
  blogPostId,
  initialContent,
}: ContentSectionProps) {
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);

  // Dutch (NL) fields
  const [contentNl, setContentNl] = useState(initialContent?.content_nl || '');

  // English (EN) fields
  const [contentEn, setContentEn] = useState(initialContent?.content_en || '');

  const saveMutation = useSaveBlogContent();

  // Sync state with initialContent when it loads
  useEffect(() => {
    if (initialContent) {
      setContentNl(initialContent.content_nl || '');
      setContentEn(initialContent.content_en || '');
    }
  }, [initialContent]);

  const handleSave = async () => {
    try {
      await saveMutation.mutateAsync({
        blog_post_id: blogPostId,
        content_nl: contentNl,
        content_en: contentEn,
      });
    } catch (error) {
      console.error('Error saving content:', error);
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
            {locale === 'nl' ? 'Blog Inhoud' : 'Blog Content'}
          </h3>
          {contentNl && (
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

              {/* Content NL */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl'
                    ? 'Blog Inhoud (HTML)'
                    : 'Blog Content (HTML)'}
                </label>
                <TinyMCEEditor
                  value={contentNl}
                  onChange={setContentNl}
                  placeholder='Schrijf je blogpost in detail...'
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

              {/* Content EN */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-slate-900'>
                  {locale === 'nl'
                    ? 'Blog Inhoud (HTML)'
                    : 'Blog Content (HTML)'}
                </label>
                <TinyMCEEditor
                  value={contentEn}
                  onChange={setContentEn}
                  placeholder='Write your blog post in detail...'
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
