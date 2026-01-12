'use client';

import { useEffect, useState } from 'react';
import { ServiceIntro } from '@/data/services';

interface ServiceIntroductionProps {
  intro: ServiceIntro;
  language?: 'nl' | 'en';
}

export default function ServiceIntroduction({
  intro,
  language = 'nl',
}: ServiceIntroductionProps) {
  const heading = language === 'nl' ? intro.heading_nl : intro.heading_en;
  const description =
    language === 'nl' ? intro.description_nl : intro.description_en;

  const [sanitized, setSanitized] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (description && description.includes('<')) {
      // Dynamically import DOMPurify for client-side sanitization
      import('dompurify').then((module) => {
        const DOMPurify = module.default;
        setSanitized(DOMPurify.sanitize(description));
        setIsLoaded(true);
      });
    } else {
      setIsLoaded(true);
    }
  }, [description]);

  // Sanitize and render HTML content
  const renderDescription = () => {
    if (!isLoaded) {
      return null;
    }

    // Check if description contains HTML tags
    if (description && description.includes('<') && sanitized) {
      return (
        <div
          className='html-content text-base lg:text-lg text-white/95 leading-relaxed'
          dangerouslySetInnerHTML={{ __html: sanitized }}
        />
      );
    }
    // Plain text description
    return (
      <p className='text-base lg:text-lg text-white/95 leading-relaxed'>
        {description}
      </p>
    );
  };

  return (
    <section className='relative py-16'>
      <div className='max-w-[1326px] mx-auto px-6'>
        <div
          className='relative rounded-3xl overflow-hidden min-h-[400px] flex items-center justify-center px-12 py-16'
          style={{
            backgroundImage: `url(${intro.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          {/* Overlay with radial gradient and blur */}
          <div
            className='absolute inset-0'
            style={{
              background:
                'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0.6) 100%)',
              backdropFilter: 'blur(6.5px)',
            }}
          />

          {/* Content */}
          <div className='relative z-10 max-w-3xl text-center'>
            <h2 className='text-3xl lg:text-4xl font-semibold text-white mb-6 leading-tight'>
              {heading}
            </h2>
            {renderDescription()}
          </div>
        </div>
      </div>
    </section>
  );
}
