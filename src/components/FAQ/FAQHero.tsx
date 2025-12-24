import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';

interface FAQHeroProps {
  type: 'klanten' | 'specialisten';
}

export default function FAQHero({ type }: FAQHeroProps) {
  const t = useTranslations(`faq.${type}.hero`);

  // Determine the link to the other FAQ page
  const otherFaqLink = type === 'klanten' ? '/faq-specialisten' : '/faq-klanten';

  return (
    <section className='pt-30 md:pt-[168px] pb-20 md:pb-28 relative'>
      {/* Background div with gradient and blur */}
      <div className='absolute inset-0 w-full h-full -z-10 blur-[66.5px] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4]' />

      {/* Content */}
      <div className='custom-container relative z-10 h-full'>
        <div className='flex flex-col lg:flex-row gap-8 items-start lg:items-center w-full'>
          {/* Left Content */}
          <div className='flex-1 w-full'>
            {/* Main Heading */}
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-display font-normal leading-tight mb-2 md:mb-4'>
              {t('heading')}{' '}
              <span className='text-accent'>{t('headingAccent')}</span>
            </h1>

            {/* Small text above heading */}
            <p className='text-lg md:text-xl text-muted-foreground font-montserrat mb-2 md:mb-9.5'>
              {t('description')}
            </p>

            {/* CTA Button - Desktop only */}
            <Link href={otherFaqLink}>
              <Button
                size={null}
                variant='default'
                className='hidden md:flex text-lg h-auto px-10 py-4 items-center font-semibold rounded-2xl'
                style={{
                  boxShadow:
                    '0px 10px 15px 0px #0000001A, 0px 4px 6px 0px #0000001A',
                }}
              >
                {type === 'klanten' ? t('ctaButton1') : t('ctaButton2')}
              </Button>
            </Link>
          </div>

          {/* Right Content - Image Space */}
          <div className='flex-1 flex flex-col justify-center lg:justify-end w-full mt-0 lg:mt-0'>
            <div className='relative right-0 lg:right-8 w-full max-w-md lg:max-w-none'>
              {/* Image */}
              <Image
                src='/images/faq/faq_hero.png'
                width={692}
                height={485}
                alt='FAQ banner'
                className='w-full h-auto object-contain'
              />

              {/* Primary decorative div - top left */}
              <div
                className='absolute w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-primary border border-gray-200 rounded-2xl -z-10'
                style={{
                  top: '5px',
                  left: '15px',
                  boxShadow:
                    '0px 20px 25px 0px #0000001A, 0px 8px 10px 0px #0000001A',
                }}
              ></div>

              {/* Accent decorative div - bottom right */}
              <div
                className='absolute w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-accent border border-gray-200 rounded-2xl -z-10'
                style={{
                  bottom: '35px',
                  right: '15px',
                  boxShadow:
                    '0px 20px 25px 0px #0000001A, 0px 8px 10px 0px #0000001A',
                }}
              ></div>
            </div>

            {/* CTA Button - Mobile only, below image */}
            <Link href={otherFaqLink}>
              <Button
                size={null}
                variant={type === 'klanten' ? 'default' : 'outline'}
                className='md:hidden flex text-base h-auto px-8 py-3 items-center justify-center font-semibold rounded-2xl mt-8 w-full'
                style={{
                  boxShadow:
                    '0px 10px 15px 0px #0000001A, 0px 4px 6px 0px #0000001A',
                }}
              >
                {type === 'klanten' ? t('ctaButton1') : t('ctaButton2')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
