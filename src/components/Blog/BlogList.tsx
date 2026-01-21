'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NavigationArrow } from "@/components/ui/navigation-arrow";
import { useTranslations, useLocale } from 'next-intl';
import { formatDistanceToNow } from 'date-fns';
import { enUS, nl } from 'date-fns/locale';
import { getPublicStorageUrl } from '@/lib/utils/storage-url';
import type { BlogPostFull } from '@/types/models/blog-post.model';

const BLOGS_PER_PAGE = 3;

interface BlogListProps {
  blogs: BlogPostFull[];
  heading?: {
    nl: string;
    en: string;
  };
  description?: {
    nl: string;
    en: string;
  };
  showHeader?: boolean;
}

export default function BlogList({ blogs, heading, description, showHeader = true }: BlogListProps) {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState(0);

  // Default heading and description
  const defaultHeading = {
    nl: 'Onze recente artikelen',
    en: 'Our Latest Articles',
  };

  const defaultDescription = {
    nl: 'Blijf op de hoogte van onze nieuwste inzichten',
    en: 'Stay up to date with our latest insights',
  };

  const displayHeading = heading || defaultHeading;
  const displayDescription = description || defaultDescription;

  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);

  const currentBlogs = blogs.slice(
    currentPage * BLOGS_PER_PAGE,
    (currentPage + 1) * BLOGS_PER_PAGE
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  // Helper function to get blog data based on locale
  const getBlogData = (blog: BlogPostFull) => {
    const title = locale === 'nl' ? blog.content?.title_nl : blog.content?.title_en;
    const excerpt = locale === 'nl' ? blog.content?.excerpt_nl : blog.content?.excerpt_en;
    const imageUrl = (blog.content?.featured_image_url
      ? getPublicStorageUrl(blog.content.featured_image_url, 'blog-posts')
      : null) || '/images/blog/temp-blog.png';

    // Determine category display
    let categoryLabel = t('general');
    if (blog.service_category) {
      categoryLabel = locale === 'nl'
        ? blog.service_category.name_nl
        : blog.service_category.name_en;
    } else if (blog.service_subcategory) {
      categoryLabel = locale === 'nl'
        ? blog.service_subcategory.name_nl
        : blog.service_subcategory.name_en;
    }

    // Format published date
    const dateLocale = locale === 'nl' ? nl : enUS;
    const publishedDate = blog.published_at
      ? formatDistanceToNow(new Date(blog.published_at), {
          addSuffix: true,
          locale: dateLocale,
        })
      : '';

    return { title, excerpt, imageUrl, categoryLabel, publishedDate };
  };

  // Show empty state
  if (blogs.length === 0) {
    return (
      <section className="py-8 md:py-14 bg-white">
        <div className="custom-container">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">{t('noBlogs')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-14 bg-white">
      <div className="custom-container">
        {/* Header */}
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-16">
            <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-2xl md:text-5xl font-display font-normal text-foreground mb-2 md:mb-5">
                {displayHeading[locale as 'nl' | 'en']}
              </h2>
              <p className="text-muted-foreground text-sm md:text-2xl">
                {displayDescription[locale as 'nl' | 'en']}
              </p>
            </div>

            {/* Navigation Arrows - Desktop only */}
            <div className="hidden md:flex gap-4">
              <NavigationArrow
                direction="left"
                onClick={handlePrevious}
                disabled={currentPage === 0}
              />
              <NavigationArrow
                direction="right"
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
              />
            </div>
          </div>
        )}

        {/* Blog Grid - Mobile: all blogs, Desktop: paginated */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Mobile: Show all blogs */}
          {blogs.map((blog) => {
            const { title, excerpt, imageUrl, categoryLabel, publishedDate } = getBlogData(blog);

            return (
              <Link
                key={blog.id}
                href={`/${locale}/blog/${blog.slug}`}
                className="group cursor-pointer md:hidden"
              >
                <article>
                  {/* Image */}
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={imageUrl}
                      alt={title || 'Blog post'}
                      width={400}
                      height={240}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    {/* Category and Date */}
                    <div className="w-full flex items-center justify-between gap-4">
                      <span className="bg-accent/10 text-accent px-2.5 py-1 rounded-full text-xs font-medium">
                        {categoryLabel}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {publishedDate}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-display font-normal leading-tight text-foreground group-hover:text-primary transition-colors">
                      {title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-primary text-sm font-medium hover:text-primary/80 transition-colors">
                      {t('hero.readMore')}
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}

          {/* Desktop: Show paginated blogs */}
          {currentBlogs.map((blog) => {
            const { title, excerpt, imageUrl, categoryLabel, publishedDate } = getBlogData(blog);

            return (
              <Link
                key={blog.id}
                href={`/${locale}/blog/${blog.slug}`}
                className="hidden md:block group cursor-pointer"
              >
                <article>
                  {/* Image */}
                  <div className="mb-6 overflow-hidden rounded-lg">
                    <Image
                      src={imageUrl}
                      alt={title || 'Blog post'}
                      width={400}
                      height={240}
                      className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    {/* Category and Date */}
                    <div className="w-full flex items-center justify-between gap-4">
                      <span className="bg-accent/10 text-accent px-3 py-1.5 rounded-full text-sm font-medium">
                        {categoryLabel}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {publishedDate}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-display font-normal leading-tight text-foreground group-hover:text-primary transition-colors">
                      {title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground leading-relaxed">
                      {excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center gap-3 text-primary font-medium hover:text-primary/80 transition-colors">
                      {t('hero.readMore')}
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Pagination Dots - Desktop only */}
        <div className="hidden md:flex justify-center items-center gap-2 mt-16">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentPage === index ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}