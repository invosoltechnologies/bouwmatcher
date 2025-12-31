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
    <section className="py-8 md:py-14 bg-white">
      <div className="custom-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-16">
          <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl md:text-5xl font-display font-normal text-foreground mb-2 md:mb-5">
              Onze recente artikelen
            </h2>
            <p className="text-muted-foreground text-sm md:text-2xl">
              Blijf op de hoogte van onze nieuwste inzichten
            </p>
          </div>

          {/* Navigation Arrows - Desktop only */}
          <div className="hidden md:flex gap-4">
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

        {/* Blog Grid - Mobile: all blogs, Desktop: paginated */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Mobile: Show all blogs */}
          {mockBlogs.map((blog) => (
            <article key={blog.id} className="group cursor-pointer md:hidden">
              {/* Image */}
              <div className="mb-4 overflow-hidden rounded-lg">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={400}
                  height={240}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="space-y-3">
                {/* Category and Date */}
                <div className="w-full flex items-center justify-between gap-4">
                  <span className="bg-accent/10 text-accent px-2.5 py-1 rounded-full text-xs font-medium">
                    {blog.category}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {blog.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-display font-normal leading-tight text-foreground group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Read More */}
                <button className="flex items-center gap-2 text-primary text-sm font-medium hover:text-primary/80 transition-colors">
                  {t('hero.readMore')}
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}

          {/* Desktop: Show paginated blogs */}
          {currentBlogs.map((blog) => (
            <article key={blog.id} className="hidden md:block group cursor-pointer">
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

        {/* Pagination Dots - Desktop only */}
        <div className="hidden md:flex justify-center items-center gap-2 mt-16">
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