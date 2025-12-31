'use client';

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useTranslations } from 'next-intl'

interface Review {
  id: string
  nameKey: string
  rating: number
  reviewKey: string
  bgColor: string
  borderColor?: string
}

export function ReviewCarousel() {
  const t = useTranslations('homepage.reviews');

  const reviewsData: Review[] = [
    {
      id: '1',
      nameKey: 'review1Name',
      rating: 5,
      reviewKey: 'review1Text',
      bgColor: '#EDFDF2',
      borderColor: '#BEEECD',
    },
    {
      id: '2',
      nameKey: 'review2Name',
      rating: 5,
      reviewKey: 'review2Text',
      bgColor: '#ECF4FF',
      borderColor: '#D0E4FF',
    },
    {
      id: '3',
      nameKey: 'review3Name',
      rating: 5,
      reviewKey: 'review3Text',
      bgColor: '#EDFDF2',
      borderColor: '#BEEECD',
    },
    {
      id: '4',
      nameKey: 'review4Name',
      rating: 4,
      reviewKey: 'review4Text',
      bgColor: '#ECF4FF',
      borderColor: '#D0E4FF',
    },
  ];

  return (
    <div className="w-full overflow-hidden group">
      <style dangerouslySetInnerHTML={{
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
        `
      }} />
      <div
        className="flex py-18.5 reviews-scroll"
        style={{
          width: 'calc(200% + 66px)',
        }}
      >
        {/* First set of reviews */}
        {reviewsData.map((review) => (
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
                  {t(review.nameKey as any)}
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
                  &quot;{t(review.reviewKey as any)}&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
        {/* Duplicate set for infinite scroll */}
        {reviewsData.map((review) => (
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
                  {t(review.nameKey as any)}
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
                  &quot;{t(review.reviewKey as any)}&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}