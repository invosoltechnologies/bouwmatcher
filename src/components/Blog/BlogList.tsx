import Image from "next/image";

// Mock data for demonstration - this will be replaced with dynamic content
const mockBlogs = [
  {
    id: 1,
    title: "De perfecte voordeur kiezen: materialen, isolatie en veiligheid",
    excerpt: "Hout, kunststof of aluminium? In dit artikel vergelijken we looks, onderhoud, U-waardes en inbraakwerendheid zodat je gericht kunt kiezen.",
    image: "/images/blog/temp-blog.png",
    readTime: "8 mins read",
    isNew: true,
    category: "Renovatie"
  },
  {
    id: 2,
    title: "Badkamer renovatie: stap-voor-stap plan",
    excerpt: "Een complete gids voor het renoveren van je badkamer, van ontwerp tot afwerking. Inclusief budgettips en veelgemaakte fouten.",
    image: "/images/blog/temp-blog.png",
    readTime: "12 mins read",
    isNew: false,
    category: "Badkamer"
  },
  {
    id: 3,
    title: "Duurzame isolatie: welke opties heb je?",
    excerpt: "Vergelijk verschillende isolatiematerialen en hun impact op je energierekening en het milieu.",
    image: "/images/blog/temp-blog.png",
    readTime: "6 mins read",
    isNew: true,
    category: "Duurzaamheid"
  },
  {
    id: 4,
    title: "Keuken verbouwen: trends en praktische tips",
    excerpt: "De nieuwste keukentrends en praktische tips voor een succesvolle keukenverbouwing binnen je budget.",
    image: "/images/blog/temp-blog.png",
    readTime: "10 mins read",
    isNew: false,
    category: "Keuken"
  },
  {
    id: 5,
    title: "Zonnepanelen installeren: wat moet je weten?",
    excerpt: "Alles over zonnepanelen: van aanschaf tot installatie en onderhoud. Inclusief subsidies en terugverdientijd.",
    image: "/images/blog/temp-blog.png",
    readTime: "15 mins read",
    isNew: false,
    category: "Energie"
  },
  {
    id: 6,
    title: "Tuinontwerp: van plan tot paradijs",
    excerpt: "Stap voor stap je tuin ontwerpen en aanleggen. Van voorbereiding tot de finishing touch.",
    image: "/images/blog/temp-blog.png",
    readTime: "9 mins read",
    isNew: false,
    category: "Tuin"
  }
];

export default function BlogList() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Alle artikelen
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ontdek onze collectie van praktische gidsen, tips en inspiratie voor je volgende bouwproject.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={400}
                  height={240}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {blog.isNew && (
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Nieuw!
                    </span>
                  )}
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {blog.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white text-gray-600 px-3 py-1 rounded-full text-sm">
                    {blog.readTime}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>
                <button className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  Lees meer
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
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Meer artikelen laden
          </button>
        </div>
      </div>
    </section>
  );
}