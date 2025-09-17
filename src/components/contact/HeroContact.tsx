import Image from "next/image";
import { Button } from "@/components/ui/button";
import Pill from "@/components/ui/pill";
import { ArrowDown, Clock, Shield, Globe } from "lucide-react";

export default function HeroContact() {
  return (
    <section className='relative min-h-screen pt-[168px]'>
      {/* Background div with gradient and blur */}
      <div className='absolute inset-0 w-full h-full -z-10 blur-[66.5px] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4]' />

      {/* Content */}
      <div className='custom-container relative z-10 h-full'>
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
            <h1 className='text-4xl lg:text-5xl font-display font-normal leading-tight mb-6'>
              Neem <span className='text-accent'>contact </span>op met
              Bouwmatcher
            </h1>

            <p className='text-2xl leading-7 text-[#555555E5] mb-6'>
              We reageren binnen 24 uur. Gratis & vrijblijvend.
            </p>

            {/* Feature Pills */}
            <div className='flex flex-wrap gap-4 mb-8'>
              <div className='flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-200'>
                <Clock className='w-4 h-4 text-blue-600' />
                <span className='text-sm font-medium'>&lt;24u reactie</span>
              </div>
              <div className='flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-200'>
                <Shield className='w-4 h-4 text-blue-600' />
                <span className='text-sm font-medium'>Veilige gegevens (GDPR)</span>
              </div>
              <div className='flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-200'>
                <Globe className='w-4 h-4 text-blue-600' />
                <span className='text-sm font-medium'>NL/EN</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              size='lg'
              className='text-lg h-auto px-9.5 py-4 flex items-center gap-4'
            >
              <span>Stel je vraag</span>
              <ArrowDown />
            </Button>
          </div>

          {/* Right Content - Image Space */}
          <div className='flex-1 flex justify-end'>
            <div className='relative right-8'>
              {/* Placeholder for image */}
              <Image
                src='/images/contact/contact-hero.png'
                width={692}
                height={485}
                alt='banner img'
              />

              {/* Blue decorative div - behind image */}
              <div
                className='absolute w-24 h-24 bg-primary border border-gray-200 rounded-2xl -z-10'
                style={{
                  top: '5px',
                  left: '25px',
                  boxShadow:
                    '0px 20px 25px 0px #0000001A, 0px 8px 10px 0px #0000001A',
                }}
              ></div>
              {/* Green decorative div - behind image */}
              <div
                className='absolute w-24 h-24 bg-accent border border-gray-200 rounded-2xl -z-10'
                style={{
                  bottom: '45px',
                  right: '25px',
                  boxShadow:
                    '0px 20px 25px 0px #0000001A, 0px 8px 10px 0px #0000001A',
                }}
              ></div>

              {/* Bottom right pill */}
              <div className='absolute bottom-10 left-4'>
                <Pill
                  className='bg-white/80 p-4 pr-5'
                  style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
                  text='Online'
                  dotColor='#0AB27E'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='bg-white w-full h-14'></div> */}
    </section>
  );
}