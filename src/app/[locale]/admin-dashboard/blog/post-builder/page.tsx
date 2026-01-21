'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Sections
import BannerSection from '@/components/admin-dashboard/blog-builder/BannerSection';
import ContentSection from '@/components/admin-dashboard/blog-builder/ContentSection';
import PublishModal from '@/components/admin-dashboard/blog-builder/PublishModal';

// Hooks
import { useBlogPost, usePublishBlogPost } from '@/lib/hooks/admin/blog-post';
import { useBlogContent } from '@/lib/hooks/admin/blog-content';

function BlogPostBuilderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const blogPostId = searchParams.get('id');

  // Fetch blog post and content data
  const { data: blogPost, isLoading: isLoadingPost } = useBlogPost(blogPostId || '');
  const { data: content } = useBlogContent(blogPostId || '');
  const publishMutation = usePublishBlogPost();

  if (!blogPostId) {
    return (
      <div className='p-6 text-center'>
        <p className='text-slate-600'>
          {locale === 'nl' ? 'Geen blog ID opgegeven' : 'No blog ID provided'}
        </p>
      </div>
    );
  }

  if (isLoadingPost) {
    return (
      <div className='p-6 text-center'>
        <p className='text-slate-600'>
          {locale === 'nl' ? 'Laden...' : 'Loading...'}
        </p>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className='p-6 text-center'>
        <p className='text-slate-600'>
          {locale === 'nl' ? 'Blogpost niet gevonden' : 'Blog post not found'}
        </p>
      </div>
    );
  }

  const handleSaveAsDraft = async () => {
    if (!blogPostId) return;
    await publishMutation.mutateAsync({ id: blogPostId, status: 'draft' });
    setIsPublishModalOpen(false);
    router.push(`/${locale}/admin-dashboard/blog`);
  };

  const handlePublish = async () => {
    if (!blogPostId) return;
    await publishMutation.mutateAsync({ id: blogPostId, status: 'published' });
    setIsPublishModalOpen(false);
    router.push(`/${locale}/admin-dashboard/blog`);
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <Button
            variant='outline'
            onClick={() => router.back()}
            className='gap-2 mb-4'
          >
            <ArrowLeft className='w-4 h-4' />
            {locale === 'nl' ? 'Terug' : 'Back'}
          </Button>
          <p className='text-slate-600 mt-1'>
            {locale === 'nl'
              ? `Blog: ${content?.title_nl || 'Untitled'}`
              : `Blog: ${content?.title_en || 'Untitled'}`}
          </p>
        </div>
        <div className='text-right'>
          <p className='text-sm text-slate-600'>
            {locale === 'nl' ? 'Status:' : 'Status:'}{' '}
            <span className='font-semibold text-slate-900 capitalize'>
              {blogPost.status}
            </span>
          </p>
        </div>
      </div>

      {/* Sections Container */}
      <div className='custom-container space-y-6'>
        <h2 className='text-lg font-semibold text-slate-900'>
          {locale === 'nl' ? 'Secties' : 'Sections'}
        </h2>

        {/* Banner Section */}
        <div className='bg-white rounded-lg'>
          <BannerSection blogPostId={blogPostId} initialContent={content} />
        </div>

        {/* Content Section */}
        <div className='bg-white rounded-lg'>
          <ContentSection blogPostId={blogPostId} initialContent={content} />
        </div>

        {/* Action Buttons */}
        <div className='flex gap-4 pt-6 border-t border-slate-200'>
          <Button
            onClick={() => setIsPublishModalOpen(true)}
            className='ml-auto'
          >
            {locale === 'nl' ? 'Pagina Opslaan' : 'Save Page'}
          </Button>
        </div>
      </div>

      {/* Publish Modal */}
      <PublishModal
        open={isPublishModalOpen}
        onOpenChange={setIsPublishModalOpen}
        onSaveAsDraft={handleSaveAsDraft}
        onPublish={handlePublish}
        isLoading={publishMutation.isPending}
        currentStatus={blogPost?.status || 'draft'}
      />
    </div>
  );
}

export default function BlogPostBuilderPage() {
  return (
    <Suspense fallback={<div className='p-6 text-center'>Loading...</div>}>
      <BlogPostBuilderContent />
    </Suspense>
  );
}
