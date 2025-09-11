import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className='relative min-h-screen flex items-center justify-center pt-[168px] pb-[26px]'>
      {/* Background div with gradient and blur */}
      <div className='absolute inset-0 w-full h-full -z-10 blur-[66.5px] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4]' />

      {/* Content */}
      <div className='custom-container relative z-10 h-full flex items-center'>
        <div className='flex flex-col lg:flex-row gap-8 items-center w-full'>
          {/* Left Content */}
          <div className='flex-1'>
            {/* Trust Pill */}
            <div className='inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-8 py-2 mb-6 border border-[#023AA233]'>
              <div className='w-2 h-2 bg-accent rounded-full'></div>
              <span className='text-sm text-primary font-medium'>
                Vertrouwen door 10,000+ Klanten
              </span>
            </div>

            {/* Main Heading */}
            <h1 className='text-4xl lg:text-5xl font-display font-normal leading-tight mb-8'>
              Vind en vergelijk
              <br />
              vertrouwde <span className='text-accent'>professionals</span>
            </h1>

            {/* CTA Button */}
            <Button size="lg" className="text-lg h-auto px-9.5 py-4">
              Hoe werkt het?
            </Button>
          </div>

          {/* Right Content - Image Space */}
          <div className='flex-1 relative'>            
            {/* Placeholder for image */}
              <Image src='/images/homepage/banner.png' width={692} height={485} alt="banner img" />
              
            {/* Blue decorative div - behind image */}
            <div 
              className='absolute w-24 h-24 bg-primary border border-gray-200 rounded-2xl -z-10 -top-3 right-3'
              style={{ 
                boxShadow: '0px 20px 25px 0px #0000001A, 0px 8px 10px 0px #0000001A'
              }}
            ></div>
            {/* Bottom right pill */}
            <div className='absolute bottom-10 left-4 bg-white/80 backdrop-blur-sm  rounded-xl p-4 pr-5 border border-gray-200'>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-accent rounded-full'></div>
                <span className='text-sm text-gray-700 font-medium'>
                  24/7 beschikbaar
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}