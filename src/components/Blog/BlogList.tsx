'use client';

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { NavigationArrow } from "@/components/ui/navigation-arrow";
import { useTranslations } from 'next-intl';

const BLOGS_PER_PAGE = 3;

export default function BlogList() {
  const t = useTranslations('blog');
  const [currentPage, setCurrentPage] = useState(0);

  // Blog data using translations
  const mockBlogs = [
    {
      id: 1,
      title: t('list.winterSchilderen.title'),
      excerpt: t('list.winterSchilderen.excerpt'),
      image: "/images/blog/temp-blog.png",
      date: t('list.winterSchilderen.date'),
      category: t('list.winterSchilderen.category')
    },
    {
      id: 2,
      title: t('list.badkamerRenoveren.title'),
      excerpt: t('list.badkamerRenoveren.excerpt'),
      image: "/images/blog/temp-blog.png",
      date: t('list.badkamerRenoveren.date'),
      category: t('list.badkamerRenoveren.category')
    },
    {
      id: 3,
      title: t('list.lekkage.title'),
      excerpt: t('list.lekkage.excerpt'),
      image: "/images/blog/temp-blog.png",
      date: t('list.lekkage.date'),
      category: t('list.lekkage.category')
    },
    {
      id: 4,
      title: t('list.meterkast.title'),
      excerpt: t('list.meterkast.excerpt'),
      image: "/images/blog/temp-blog.png",
      date: t('list.meterkast.date'),
      category: t('list.meterkast.category')
    },
    {
      id: 5,
      title: t('list.isoleren.title'),
      excerpt: t('list.isoleren.excerpt'),
      image: "/images/blog/temp-blog.png",
      date: t('list.isoleren.date'),
      category: t('list.isoleren.category')
    }
  ];

  const totalPages = Math.ceil(mockBlogs.length / BLOGS_PER_PAGE);

  const currentBlogs = mockBlogs.slice(
    currentPage * BLOGS_PER_PAGE,
    (currentPage + 1) * BLOGS_PER_PAGE
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <section className="py-14 bg-white">
      <div className="custom-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex-1">
            <h2 className="text-5xl font-display font-normal text-foreground mb-5">
              Onze recente artikelen
            </h2>
            <p className="text-muted-foreground text-2xl">
              Blijf op de hoogte van onze nieuwste inzichten
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <NavigationArrow
              direction="left"
              onClick={handlePrevious}
              disabled={currentPage === 0}
            />
            <NavigationArrow
              direction="right"
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBlogs.map((blog) => (
            <article key={blog.id} className="group cursor-pointer">
              {/* Image */}
              <div className="mb-6 overflow-hidden rounded-lg">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={400}
                  height={240}
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="space-y-4">
                {/* Category and Date */}
                <div className="w-full flex items-center justify-between gap-4">
                  <span className="bg-accent/10 text-accent px-3 py-1.5 rounded-full text-sm font-medium">
                    {blog.category}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {blog.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-display font-normal leading-tight text-foreground group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Read More */}
                <button className="flex items-center gap-3 text-primary font-medium hover:text-primary/80 transition-colors">
                  {t('hero.readMore')}
                  <ArrowRight size={20} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-16">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentPage === index ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}