import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function BlogHero() {
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
                alt='De perfecte voordeur kiezen'
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
                Nieuw!
              </span>
              <span className='text-muted-foreground text-sm leading-3.5'>
                8 mins read
              </span>
            </div>

            {/* Blog heading */}
            <h1 className='text-2xl lg:text-5xl font-display font-normal leading-tight mb-8'>
              De perfecte voordeur kiezen: materialen, isolatie en veiligheid
            </h1>

            {/* Content */}
            <p className='text-2xl text-muted-foreground mb-6 leading-relaxed'>
              Hout, kunststof of aluminium? In dit artikel vergelijken we looks,
              onderhoud, U-waardes en inbraakwerendheid zodat je gericht kunt
              kiezen. Inclusief richtprijzen en wanneer vervangen of repareren
              slim is.
            </p>

            {/* Read more button */}
            <button className='flex items-center gap-3 cursor-pointer text-2xl leading-7 text-primary font-medium hover:text-primary/80 transition-colors'>
              Read more
              <ArrowRight size={24}/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}