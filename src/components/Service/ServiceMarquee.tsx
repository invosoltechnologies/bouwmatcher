'use client';

import Image from 'next/image';

interface MarqueeItem {
  text: string;
}

interface ServiceMarqueeProps {
  items: MarqueeItem[];
}

export default function ServiceMarquee({ items }: ServiceMarqueeProps) {
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div
      className='w-full py-4 md:py-6 overflow-hidden'
      style={{
        background: 'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)',
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }

            .marquee-container {
              animation: marquee-scroll 40s linear infinite;
            }

            .marquee-container:hover {
              animation-play-state: paused;
            }
          `,
        }}
      />

      <div className='custom-container'>
        <div className='flex items-center gap-6 md:gap-8 marquee-container' style={{ width: 'calc(200% + 24px)' }}>
          {duplicatedItems.map((item, index) => (
            <div key={index} className='flex items-center gap-3 md:gap-4 whitespace-nowrap flex-shrink-0'>
              {/* Star Icon */}
              <div className='flex-shrink-0'>
                <Image
                  src='/icons/marquee-star.svg'
                  alt='star'
                  width={20}
                  height={20}
                  className='w-5 h-5 md:w-6 md:h-6'
                />
              </div>

              {/* Text - Montserrat Medium 27.27px */}
              <span
                className='font-medium text-foreground'
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 500,
                  fontSize: '1rem',
                  lineHeight: '1.875rem',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
