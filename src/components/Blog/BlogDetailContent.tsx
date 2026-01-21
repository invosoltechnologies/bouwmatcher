'use client';

import Image from "next/image";
import { useLocale, useTranslations } from 'next-intl';
import { formatDistanceToNow } from 'date-fns';
import { enUS, nl } from 'date-fns/locale';
import { getPublicStorageUrl } from '@/lib/utils/storage-url';
import { calculateReadingTime } from '@/lib/utils/reading-time';
import type { BlogPostFull } from '@/types/models/blog-post.model';

interface BlogDetailContentProps {
  blogPost: BlogPostFull;
}

export default function BlogDetailContent({ blogPost }: BlogDetailContentProps) {
  const locale = useLocale();
  const t = useTranslations('blog');

  // Extract data based on locale
  const title = locale === 'nl' ? blogPost.content?.title_nl : blogPost.content?.title_en;
  const excerpt = locale === 'nl' ? blogPost.content?.excerpt_nl : blogPost.content?.excerpt_en;
  const content = locale === 'nl' ? blogPost.content?.content_nl : blogPost.content?.content_en;
  const imageUrl = blogPost.content?.featured_image_url
    ? getPublicStorageUrl(blogPost.content.featured_image_url, 'blog-posts')
    : '/images/blog/temp-blog.png';
  const imageAlt = blogPost.content?.featured_image_alt || title || 'Blog post image';

  // Determine category display
  let categoryLabel = t('general');
  if (blogPost.service_category) {
    categoryLabel = locale === 'nl'
      ? blogPost.service_category.name_nl
      : blogPost.service_category.name_en;
  } else if (blogPost.service_subcategory) {
    categoryLabel = locale === 'nl'
      ? blogPost.service_subcategory.name_nl
      : blogPost.service_subcategory.name_en;
  }

  // Format published date
  const dateLocale = locale === 'nl' ? nl : enUS;
  const publishedDate = blogPost.published_at
    ? formatDistanceToNow(new Date(blogPost.published_at), {
        addSuffix: true,
        locale: dateLocale,
      })
    : '';

  // Calculate reading time
  const readingTime = calculateReadingTime(content || '');
  const readTimeText = locale === 'nl' ? `${readingTime} min lezen` : `${readingTime} min read`;

  return (
    <article className="bg-white">
      {/* Hero Section with Featured Image */}
      <section className="relative w-full h-[400px] md:h-[600px]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Content Section */}
      <div className="custom-container py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Category Badge and Meta Info */}
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
              {categoryLabel}
            </span>
            <span className="text-muted-foreground text-sm">
              {publishedDate}
            </span>
            <span className="text-muted-foreground text-sm">
              {readTimeText}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-display font-normal text-foreground mb-6 leading-tight">
            {title}
          </h1>

          {/* Excerpt */}
          {excerpt && (
            <div className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed border-l-4 border-primary pl-6">
              {excerpt}
            </div>
          )}

          {/* Main Content */}
          {content && (
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-display prose-headings:font-normal prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:md:text-4xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-base prose-p:md:text-lg prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6
                prose-li:text-muted-foreground prose-li:mb-2
                prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
              "
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </div>
    </article>
  );
}
