'use client';

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function BlogHero() {
  const t = useTranslations('blog.hero');

  return (
    <section className='relative min-h-screen pt-25 md:pt-[168px] pb-5'>
      <div className='absolute inset-0 w-full h-full -z-10 blur-[66.5px] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4]' />

      <div className='custom-container'>
        {/* Desktop: Two columns, Mobile: Image with overlay content */}
        <div className='flex flex-col lg:flex-row items-center gap-14.5'>
          {/* Mobile: Card with image and overlay content */}
          <div className='lg:hidden w-full'>
            <Card className='relative overflow-hidden shadow-md rounded-3xl h-[450px]'>
              <Image
                src='/images/blog/temp-blog.png'
                alt={t('featuredTitle')}
                width={572}
                height={408}
                className='w-full h-full object-cover'
              />

              {/* Black overlay */}
              <div className='absolute inset-0 bg-black/55' />

              {/* Overlay content for mobile */}
              <div className='absolute inset-0 p-6 flex flex-col justify-center items-center text-center'>
                {/* Nested pills for category and read time */}
                <div className='inline-flex items-center gap-3 bg-white/10 backdrop-blur-md shadow rounded-full px-2 py-1.5 pr-4 border border-white/20 mb-4'>
                  <span className='bg-primary text-white px-3.5 py-2 rounded-full text-sm font-medium leading-3.5'>
                    {t('badge')}
                  </span>
                  <span className='text-white text-sm leading-3.5'>
                    {t('readTime')}
                  </span>
                </div>

                {/* Blog heading */}
                <h1 className='text-2xl font-display font-normal leading-tight mb-4 text-white text-center md:text-left'>
                  {t('featuredTitle')}
                </h1>

                {/* Content */}
                <p className='text-base text-white mb-6 leading-relaxed text-center'>
                  {t('featuredExcerpt')}
                </p>

                {/* Read more button */}
                <button className='flex items-center gap-2 cursor-pointer text-base leading-6 text-primary font-medium hover:bg-gray-50 transition-colors bg-white rounded-full px-5 py-2.5'>
                  {t('readMore')}
                  <ArrowRight size={20}/>
                </button>
              </div>
            </Card>
          </div>

          {/* Desktop: Separate image and content */}
          <div className='hidden lg:block flex-1 max-w-xl'>
            <Card className='p-5 overflow-hidden shadow-md'>
              <Image
                src='/images/blog/temp-blog.png'
                alt={t('featuredTitle')}
                width={572}
                height={408}
                className='w-full object-cover'
              />
            </Card>
          </div>

          {/* Desktop: Content side */}
          <div className='hidden lg:block flex-1'>
            {/* Nested pills for category and read time */}
            <div className='inline-flex items-center gap-3 bg-primary/5 shadow rounded-full px-2 py-1.5 pr-4 border border-gray-200 mb-6'>
              <span className='bg-primary text-white px-3.5 py-2 rounded-full text-sm font-medium leading-3.5'>
                {t('badge')}
              </span>
              <span className='text-muted-foreground text-sm leading-3.5'>
                {t('readTime')}
              </span>
            </div>

            {/* Blog heading */}
            <h1 className='text-5xl font-display font-normal leading-tight mb-8'>
              {t('featuredTitle')}
            </h1>

            {/* Content */}
            <p className='text-2xl text-muted-foreground mb-6 leading-relaxed'>
              {t('featuredExcerpt')}
            </p>

            {/* Read more button */}
            <button className='flex items-center gap-3 cursor-pointer text-2xl leading-7 text-primary font-medium hover:text-primary/80 transition-colors'>
              {t('readMore')}
              <ArrowRight size={24}/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}