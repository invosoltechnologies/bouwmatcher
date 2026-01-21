'use client';

import { useLocale } from 'next-intl';
import type { BlogPostFull } from '@/types/models/blog-post.model';

interface BlogDetailContentProps {
  blogPost: BlogPostFull;
}

export default function BlogDetailContent({ blogPost }: BlogDetailContentProps) {
  const locale = useLocale();

  // Extract content based on locale
  const content = locale === 'nl' ? blogPost.content?.content_nl : blogPost.content?.content_en;

  return (
    <article className="bg-white">
      {/* Main Content Section */}
      <section className="bg-white py-8 md:py-14">
        <div className="custom-container">
          <div className="max-w-4xl mx-auto">
            {/* Main Content */}
            {content && (
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
