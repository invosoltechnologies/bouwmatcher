import Image from "next/image";
import { Button } from "@/components/ui/button";
import Pill from "@/components/ui/pill";
import { Cookie } from "lucide-react";

export default function HeroLegal() {
  return (
    <section className='pt-[168px] pb-56 relative'>
      {/* Background div with gradient and blur */}
      <div className='absolute inset-0 w-full h-full -z-10 blur-[66.5px] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4]' />

      {/* Content */}
      <div className='custom-container relative z-10 h-full'>
        <div className='flex flex-col lg:flex-row gap-8 items-center w-full'>
          {/* Left Content */}
          <div className='flex-1'>
            {/* Version and Last Updated Pills */}
            <div className='flex flex-wrap gap-4 mb-6'>
              <div className='bg-primary text-white font-montserrat rounded-full px-4 py-2'>
                <span className='text-sm font-extrabold'>v1.0</span>
              </div>
              <div className='bg-emerald-100 border border-accent/55 font-montserrat text-emerald-700 rounded-full px-4 py-2'>
                <span className='text-sm'>Last updated: January 15, 2025</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className='text-4xl lg:text-5xl font-display font-normal leading-tight mb-6'>
              Legal Center
            </h1>

            <p className='text-2xl leading-7 text-[#555555E5] mb-8'>
              Privacy Policy • Terms & Conditions • Cookies Policy
            </p>

            {/* Language Selection */}
            <div className='flex items-center gap-2 mb-8'>
              <span className='text-gray-700 mr-2'>Language:</span>
              <Button
                variant='outline'
                size='sm'
                className='px-3 py-1 h-auto text-slate-700 border-gray-300'
              >
                EN
              </Button>
              <Button size='sm' className='px-3 py-1 h-auto'>
                NL
              </Button>
            </div>

            {/* Legal Policy Buttons */}
            <div className='flex flex-wrap gap-4 mb-8'>
              <Button className='flex items-center gap-2 text-lg rounded-2xl px-4 py-2 h-auto text-white font-medium'>
                <Image
                  src='/icons/shield.svg'
                  width={15}
                  height={15}
                  alt='Privacy Policy'
                  className='filter brightness-0 invert'
                />
                <span>Privacybeleid</span>
              </Button>
              <Button className='flex items-center gap-2 text-lg rounded-2xl px-4 py-5 h-auto bg-accent hover:bg-accent/90 text-white font-medium'>
                <Image
                  src='/icons/agreement-document.svg'
                  width={15}
                  height={15}
                  alt='Terms & Conditions'
                  className='filter brightness-0 invert'
                />
                <span>Algemene voorwaarden</span>
              </Button>
              <Button className='flex items-center gap-2 text-lg rounded-2xl px-4 py-5 h-auto text-white font-medium'>
                <Cookie size={15} />
                <span>Cookiebeleid</span>
              </Button>
            </div>
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
                className='absolute w-24 h-24 bg-accent border border-gray-200 rounded-2xl -z-10'
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
                  text='Privacy First'
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