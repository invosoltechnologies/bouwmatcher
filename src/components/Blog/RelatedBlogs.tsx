'use client';

import { useLocale } from 'next-intl';
import BlogList from './BlogList';
import type { BlogPostFull } from '@/types/models/blog-post.model';

interface RelatedBlogsProps {
  currentBlogId: string;
  blogs: BlogPostFull[];
}

export default function RelatedBlogs({ currentBlogId, blogs }: RelatedBlogsProps) {
  const locale = useLocale();

  // Filter out current blog and get related blogs
  // Priority: same category > same subcategory > random
  const relatedBlogs = blogs
    .filter(blog => blog.id !== currentBlogId)
    .sort((a, b) => {
      // If categories match, prioritize
      if (a.service_category_id === b.service_category_id) {
        return 0;
      }
      return -1;
    })
    .slice(0, 3); // Show max 3 related blogs

  if (relatedBlogs.length === 0) {
    return null;
  }

  const heading = {
    nl: 'Gerelateerde artikelen',
    en: 'Related Articles',
  };

  return (
    <section className='py-8 md:py-14 bg-white'>
      <div className='custom-container'>
        <div className='max-w-6xl mx-auto'>
          <BlogList
            blogs={relatedBlogs}
            heading={heading}
            showHeader={true}
          />
        </div>
      </div>
    </section>
  );
}
