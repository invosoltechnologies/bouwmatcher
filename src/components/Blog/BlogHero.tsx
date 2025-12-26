'use client';

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function BlogHero() {
  const t = useTranslations('blog.hero');

  return (
    <section className='relative min-h-screen pt-[168px] pb-5'>
      <div className='absolute inset-0 w-full h-full -z-10 blur-[66.5px] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4]' />

      <div className='custom-container'>
        <div className='flex flex-col lg:flex-row items-center gap-14.5'>
          {/* Left side - Featured blog card with just image */}
          <div className='flex-1 max-w-xl'>
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

          {/* Right side - Content */}
          <div className='flex-1'>
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
            <h1 className='text-2xl lg:text-5xl font-display font-normal leading-tight mb-8'>
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