import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function BlogHero() {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Featured blog card with just image */}
          <div className="flex-1 max-w-lg">
            <Card className="p-0 overflow-hidden shadow-lg">
              <Image
                src="/images/blog/temp-blog.png"
                alt="De perfecte voordeur kiezen"
                width={500}
                height={400}
                className="w-full h-80 object-cover"
              />
            </Card>
          </div>

          {/* Right side - Content */}
          <div className="flex-1">
            {/* Nested pills for category and read time */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-3 bg-blue-50 rounded-full px-4 py-2 border border-blue-100">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Nieuw!
                </span>
                <span className="text-gray-600 text-sm">
                  8 mins read
                </span>
              </div>
            </div>

            {/* Blog heading */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              De perfecte voordeur kiezen: materialen, isolatie en veiligheid
            </h1>

            {/* Content */}
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Hout, kunststof of aluminium? In dit artikel vergelijken we looks,
              onderhoud, U-waardes en inbraakwerendheid zodat je gericht
              kunt kiezen. Inclusief richtprijzen en wanneer vervangen of
              repareren slim is.
            </p>

            {/* Read more button */}
            <button className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Read more
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}