'use client';

import { SectionPill } from '@/components/ui/section-pill';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  bgColor: string;
  borderColor?: string;
}

interface ServiceReviewsProps {
  eyebrowText: string;
  heading: string;
  description: string;
  reviews: Review[];
  backgroundImage?: string;
}

export default function ServiceReviews({
  eyebrowText,
  heading,
  description,
  reviews,
  backgroundImage = '/images/homepage/bg-reviews-section.png',
}: ServiceReviewsProps) {
  return (
    <>
      {/* Top gradient border */}
      <div
        className='w-full h-px'
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #023AA2 50%, rgba(0, 0, 0, 0) 100%)',
        }}
      />

      <section
        className='py-14 md:py-24 relative bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      >
        {/* Background overlay for better text readability */}
        <div className='absolute inset-0 bg-white/20 blur-in-3xl' />

        <div className='custom-container relative z-10'>
          <div className='text-center mb-8 md:mb-12'>
            <div className='flex justify-center mb-3 md:mb-6'>
              <SectionPill
                text={eyebrowText}
                icon={<Quote className='w-3.5 rotate-180 fill-accent' />}
                className='text-accent py-3.5 px-6 mb-3 md:mb-5'
                textClassName='font-montserrat text-sm font-normal'
                iconClassName='text-accent'
                stylePill={{
                  background:
                    'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)',
                }}
              />
            </div>

            <h2 className='text-[32px] md:text-5xl font-normal text-foreground mb-2 md:mb-5 px-4'>
              {heading}
            </h2>
            <p className='text-muted-foreground text-base md:text-2xl px-4'>
              {description}
            </p>
          </div>

          {/* Reviews Carousel */}
          <div className='relative'>
            {/* Hide gradient overlay on mobile */}
            <div className='hidden md:block absolute z-20 w-12.5 h-full bg-gradient-to-r from-transparent to-white right-0' />

            <div className='w-full overflow-hidden group'>
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    @keyframes scroll-right-to-left {
                      0% { transform: translateX(0); }
                      100% { transform: translateX(-50%); }
                    }

                    .reviews-scroll {
                      animation: scroll-right-to-left 30s linear infinite;
                    }

                    .group:hover .reviews-scroll {
                      animation-play-state: paused;
                    }
                  `,
                }}
              />
              <div
                className='flex py-18.5 reviews-scroll'
                style={{
                  width: 'calc(200% + 66px)',
                }}
              >
                {/* First set of reviews */}
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className='flex-shrink-0 w-80 mr-8.5'
                  >
                    <Card
                      className='h-full border rounded-[12px] p-0'
                      style={{
                        backgroundColor: review.bgColor,
                        borderColor: review.borderColor,
                        boxShadow:
                          '0px 10px 15px 0px #0000001A, 0px 4px 6px 0px #0000001A',
                      }}
                    >
                      <CardContent className='p-6 pt-4 flex flex-col h-full'>
                        <p className='font-montserrate text-foreground text-base font-normal leading-6 mb-2'>
                          {review.name}
                        </p>
                        <div className='flex items-center gap-1 mb-4'>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className='text-muted-foreground text-sm leading-relaxed font-montserrat flex-1'>
                          &quot;{review.review}&quot;
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
                {/* Duplicate set for infinite scroll */}
                {reviews.map((review) => (
                  <div
                    key={`duplicate-${review.id}`}
                    className='flex-shrink-0 w-80 mr-8.5'
                  >
                    <Card
                      className='h-full border rounded-[12px] p-0'
                      style={{
                        backgroundColor: review.bgColor,
                        borderColor: review.borderColor,
                        boxShadow:
                          '0px 10px 15px 0px #0000001A, 0px 4px 6px 0px #0000001A',
                      }}
                    >
                      <CardContent className='p-6 pt-4 flex flex-col h-full'>
                        <p className='font-montserrate text-foreground text-base font-normal leading-6 mb-2'>
                          {review.name}
                        </p>
                        <div className='flex items-center gap-1 mb-4'>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className='text-muted-foreground text-sm leading-relaxed font-montserrat flex-1'>
                          &quot;{review.review}&quot;
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom gradient border */}
      <div
        className='w-full h-px'
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #023AA2 50%, rgba(0, 0, 0, 0) 100%)',
        }}
      />
    </>
  );
}
