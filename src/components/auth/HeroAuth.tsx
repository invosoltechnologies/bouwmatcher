import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {  ArrowRight } from 'lucide-react';

export default function HeroContact() {
  return (
    <section className='pt-[168px] pb-56 relative'>
      {/* Background div with gradient and blur */}
      <div className='absolute inset-0 w-full h-full -z-10 blur-[66.5px] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4]' />

      {/* Content */}
      <div className='custom-container relative z-10 h-full'>
        <div className='flex flex-col lg:flex-row gap-8 items-center w-full'>
          {/* Left Content */}
          <div className='flex-1'>
            {/* Main Heading */}
            <h1 className='text-4xl lg:text-5xl font-display font-normal leading-tight mb-6'>
              Altijd nieuwe opdrachten binnen handbereik
            </h1>

            <p className='text-2xl leading-7 text-[#555555E5] mb-8'>
              Kom direct in contact met klanten die nú een specialist zoeken.{' '}
            </p>

            {/* CTA Button */}
            <Button
              className='text-lg w-auto py-5 px-6 flex items-center font-semibold rounded-2xl gap-2'
              style={{
                boxShadow:
                  '0px 10px 15px 0px #0000001A, 0px 4px 6px 0px #0000001A',
              }}
              size={null}
            >
              Meld je gratis aan
              <ArrowRight className='font-bold text-lg' size={45} />
            </Button>
          </div>

          {/* Right Content - Image Space */}
          <div className='flex-1 flex justify-end'>
            <div className='relative right-8'>
              {/* Placeholder for image */}
              <Image
                src='/images/auth/auth-banner.png'
                width={592}
                height={384}
                alt='banner img'
              />

              {/* Blue decorative div - behind image */}
              <div
                className='absolute w-24 h-24 bg-accent border border-gray-200 rounded-2xl -z-10'
                style={{
                  top: '-20px',
                  left: '-22px',
                  boxShadow:
                    '0px 20px 25px 0px #0000001A, 0px 8px 10px 0px #0000001A',
                }}
              ></div>
              {/* Green decorative div - behind image */}
              <div
                className='absolute w-24 h-24 bg-primary border border-gray-200 rounded-2xl -z-10'
                style={{
                  bottom: '-12px',
                  right: '-12px',
                  boxShadow:
                    '0px 20px 25px 0px #0000001A, 0px 8px 10px 0px #0000001A',
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='bg-white w-full h-14'></div> */}
    </section>
  );
}
