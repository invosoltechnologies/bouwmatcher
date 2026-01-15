'use client';

import '@/app/[locale]/service/service-tables.css';
import { sanitizeTableHTML } from '@/lib/utils/html-sanitizer';
import { useMemo } from 'react';

interface ServicePriceComparisonProps {
  heading: string;
  description?: string;
  content: string;
}

export default function ServicePriceComparison({
  heading,
  description,
  content,
}: ServicePriceComparisonProps) {
  // Sanitize HTML content (fallback for old data that wasn't sanitized)
  // Uses regex-based sanitization for consistent server/client results
  const sanitizedContent = useMemo(() => sanitizeTableHTML(content), [content]);

  // Safety check for content
  if (!content || content.trim() === '') {
    return null;
  }

  return (
    <section className='py-14 md:py-20 bg-white'>
      <div className='custom-container'>
        {/* Heading and Description */}
        <div className='text-center mb-8 md:mb-[60px]'>
          <h2 className='text-[32px] md:text-5xl font-normal text-foreground mb-2 md:mb-5 px-4'>
            {heading}
          </h2>
          {description && (
            <p className='text-muted-foreground text-base md:text-2xl px-4'>
              {description}
            </p>
          )}
        </div>

        {/* HTML Table Content from TinyMCE */}
        <div className='max-w-full px-0 md:max-w-4xl mx-auto md:px-0'>
          <div
            className='service-comparison-table-content'
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>
      </div>
    </section>
  );
}
