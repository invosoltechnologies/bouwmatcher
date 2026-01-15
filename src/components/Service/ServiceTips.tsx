'use client';

import { sanitizeTableHTML } from '@/lib/utils/html-sanitizer';
import { useMemo } from 'react';

interface ServiceTipsProps {
  heading: string;
  description?: string;
  content?: string; // CMS HTML content (optional)
  tips?: string[]; // Fallback data for non-CMS pages
}

export default function ServiceTips({
  heading,
  description,
  content,
  tips,
}: ServiceTipsProps) {
  // Sanitize HTML content (fallback for old data that wasn't sanitized)
  // Uses regex-based sanitization for consistent server/client results
  const sanitizedContent = useMemo(() => {
    if (content && content.trim() !== '') {
      return sanitizeTableHTML(content);
    }
    return '';
  }, [content]);

  // Determine which rendering mode to use
  const useCmsContent = content && content.trim() !== '';
  const useFallbackTips = !useCmsContent && tips && tips.length > 0;

  // Safety check - return null if no content available
  if (!useCmsContent && !useFallbackTips) {
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

        {/* Render CMS content or fallback tips */}
        <div className='max-w-full px-0 md:max-w-4xl mx-auto md:px-0'>
          <div
            className='rounded-2xl border border-white/20 p-5 md:p-8'
            style={{
              boxShadow: '0px 10px 30px 0px #023AA214',
              background:
                'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)',
            }}
          >
            {useCmsContent ? (
              // CMS HTML Content from TinyMCE - apply service-tips-content class
              <div className='service-tips-content' dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            ) : (
              // Fallback: Render tips array for non-CMS pages - no service-tips-content class
              <ul className='space-y-4 md:space-y-5'>
                {tips!.map((tip, index) => (
                  <li key={index} className='flex gap-4 md:gap-5 items-start'>
                    {/* Custom Bullet */}
                    <div
                      className='w-2 h-2 md:w-3 md:h-3 rounded-full mt-2 md:mt-3 flex-shrink-0'
                      style={{
                        backgroundColor: '#0AB27E',
                      }}
                    />
                    {/* Tip Text */}
                    <span className='text-sm md:text-lg text-muted-foreground leading-relaxed'>
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
