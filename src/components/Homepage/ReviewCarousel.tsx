import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Review {
  id: string
  name: string
  rating: number
  review: string
  bgColor: string
  borderColor?: string
}

const reviewsData: Review[] = [
  {
    id: '1',
    name: 'Emma J.',
    rating: 5,
    review:
      'Bouwmatcher maakte het zo gemakkelijk om een betrouwbare aannemer te vinden. Duidelijke communicatie, eerlijke prijzen en de taak was eerder voltooid dan verwacht.',
    bgColor: '#EDFDF2',
    borderColor: '#BEEECD',
  },
  {
    id: '2',
    name: 'Daniel V.',
    rating: 5,
    review:
      'Ik was verrast door hoe snel ik op elkaar werd gekoppeld. Binnen een dag had ik een bekwame professional aan mijn deur. Uitstekende service!',
    bgColor: '#ECF4FF',
    borderColor: '#D0E4FF',
  },
  {
    id: '3',
    name: 'Sophie de B.',
    rating: 5,
    review:
      'Het platform heeft me zoveel tijd bespaard. De loodgieter was professioneel, legde alles duidelijk uit en liet alles vlekkeloos achter. Ten zeerste aanbevolen.',
    bgColor: '#EDFDF2',
    borderColor: '#BEEECD',
  },
  {
    id: '4',
    name: 'Thomas B.',
    rating: 4,
    review:
      'Snel, transparant en betrouwbaar. De specialist was verbond met mijn project was een echte expert en heeft alles perfect gedaan. Zou zeker beter vragen.',
    bgColor: '#ECF4FF',
    borderColor: '#D0E4FF',
  },
];

export function ReviewCarousel() {
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
  );
}