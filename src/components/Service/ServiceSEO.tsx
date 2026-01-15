'use client';

import { useMemo } from 'react';
import { sanitizeTableHTML } from '@/lib/utils/html-sanitizer';
import { parseH3Content } from '@/lib/utils/h3-content-parser';

interface Card {
  title: string;
  content: string;
}

interface ServiceSEOProps {
  heading: string;
  description: string;
  content?: string; // CMS HTML content with H3 tags (optional)
  cards?: Card[]; // Fallback data for non-CMS pages
}

export default function ServiceSEO({
  heading,
  description,
  content,
  cards,
}: ServiceSEOProps) {
  // Sanitize and parse H3 content
  const sanitizedContent = useMemo(() => {
    if (content && content.trim() !== '') {
      return sanitizeTableHTML(content);
    }
    return '';
  }, [content]);

  // Parse H3s from content or use fallback cards
  const parsedCards = useMemo(() => {
    if (sanitizedContent) {
      return parseH3Content(sanitizedContent);
    }
    return cards || [];
  }, [sanitizedContent, cards]);

  // Determine which mode to use
  const useCmsContent = sanitizedContent.length > 0;
  const useFallbackCards = !useCmsContent && cards && cards.length > 0;

  // Safety check - return null if no content available
  if (!useCmsContent && !useFallbackCards) {
    return null;
  }

  // Split cards into two columns
  const midpoint = Math.ceil(parsedCards.length / 2);
  const leftCards = parsedCards.slice(0, midpoint);
  const rightCards = parsedCards.slice(midpoint);

  return (
    <section
      className='py-14 md:py-20 relative'
      style={{
        background:
          'linear-gradient(135deg, rgba(10, 178, 126, 0.05) 0%, rgba(2, 58, 162, 0.05) 100%)',
      }}
    >
      <div className='custom-container'>
        <div className='max-w-7xl mx-auto'>
          {/* Section Header */}
          <div className='mb-10 md:mb-14 max-w-4xl mx-auto text-center'>
            <h2 className='text-[32px] md:text-5xl font-normal text-foreground mb-4 md:mb-6'>
              {heading}
            </h2>
            <p className='text-base md:text-lg text-muted-foreground leading-relaxed'>
              {description}
            </p>
          </div>

          {/* Two Column Cards Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
            {/* Left Column */}
            <div className='space-y-5 md:space-y-6'>
              {leftCards.map((card, index) => (
                <div
                  key={index}
                  className='rounded-2xl p-5 md:p-6 bg-white transition-all duration-300 hover:shadow-lg'
                  style={{
                    border: '2px solid transparent',
                    backgroundImage:
                      'linear-gradient(white, white), linear-gradient(135deg, #0AB27E 0%, #023AA2 100%)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                  }}
                >
                  {/* Card Title (from h3) */}
                  <h3 className='text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4'>
                    {card.title}
                  </h3>

                  {/* Card Content */}
                  {useCmsContent ? (
                    // CMS Mode: Render HTML with styling
                    <div
                      className='service-seo-content text-sm md:text-base'
                      dangerouslySetInnerHTML={{ __html: card.content }}
                    />
                  ) : (
                    // Fallback Mode: Render plain text
                    <p className='text-sm md:text-base text-muted-foreground leading-relaxed'>
                      {card.content}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className='space-y-5 md:space-y-6'>
              {rightCards.map((card, index) => (
                <div
                  key={index}
                  className='rounded-2xl p-5 md:p-6 bg-white transition-all duration-300 hover:shadow-lg'
                  style={{
                    border: '2px solid transparent',
                    backgroundImage:
                      'linear-gradient(white, white), linear-gradient(135deg, #0AB27E 0%, #023AA2 100%)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                  }}
                >
                  {/* Card Title (from h3) */}
                  <h3 className='text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4'>
                    {card.title}
                  </h3>

                  {/* Card Content */}
                  {useCmsContent ? (
                    // CMS Mode: Render HTML with styling
                    <div
                      className='service-seo-content text-sm md:text-base'
                      dangerouslySetInnerHTML={{ __html: card.content }}
                    />
                  ) : (
                    // Fallback Mode: Render plain text
                    <p className='text-sm md:text-base text-muted-foreground leading-relaxed'>
                      {card.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
