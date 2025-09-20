'use client';

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { NavigationArrow } from "@/components/ui/navigation-arrow";

// Mock data for demonstration - this will be replaced with dynamic content
const mockBlogs = [
  {
    id: 1,
    title: "Winter of zomer schilderen",
    excerpt: "Wanneer presteerd verf het best, welke voorbereiding is nodig en wat kost het per m².",
    image: "/images/blog/temp-blog.png",
    date: "02 Sep 2025",
    category: "Painting"
  },
  {
    id: 2,
    title: "Badkamer renoveren stap voor stap",
    excerpt: "Realistische doorlooptijd, budgetopbouw en veelgemaakte fouten om te vermijden.",
    image: "/images/blog/temp-blog.png",
    date: "01 Sep 2025",
    category: "Badkamer renoveren"
  },
  {
    id: 3,
    title: "Lekkage? Snel handelen met deze checklist",
    excerpt: "Wat je direct zelf controleert, wanneer je een loodgieter belt en welke info hij nodig heeft.",
    image: "/images/blog/temp-blog.png",
    date: "23 Aug 2025",
    category: "Lekkage"
  },
  {
    id: 4,
    title: "Meterkast klaar voor inductie en EV",
    excerpt: "Groeperen, vermogen en kosten voor een veilige elektrische upgrade.",
    image: "/images/blog/temp-blog.png",
    date: "12 Jul 2025",
    category: "Inductie en EV"
  },
  {
    id: 5,
    title: "Spouwmuur of zolder isoleren",
    excerpt: "Warmteverlies, terugverdientijd en welke isolatie waar het meeste oplevert.",
    image: "/images/blog/temp-blog.png",
    date: "01 Sep 2025",
    category: "Isoleren"
  },
  {
    id: 6,
    title: "HR++ of triple glas in nieuwe kozijnen",
    excerpt: "Vergelijk comfort, geluiddemping en prijs per raamtype.",
    image: "/images/blog/temp-blog.png",
    date: "23 Aug 2025",
    category: "Raamtype"
  }
];

const BLOGS_PER_PAGE = 3;

export default function BlogList() {
  const [currentPage, setCurrentPage] = useState(0);
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
                  Read more
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