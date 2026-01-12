'use client';

import ProjectForm from '@/components/Homepage/ProjectForm';
import Pill from '@/components/ui/pill';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface TrustPill {
  text: string;
  dotColor: string;
}

interface ServiceBannerProps {
  serviceName: string;
  serviceSlug: string;
  heading: string;
  description: string;
  backgroundImage: string;
  trustPills: TrustPill[];
}

export default function ServiceBanner({
  serviceName,
  serviceSlug,
  heading,
  description,
  backgroundImage,
  trustPills,
}: ServiceBannerProps) {
  return (
    <>
      {/* Banner Section */}
      <section className='bg-white-300 pt-44'>
        <div className='max-w-[1326px] mx-auto rounded-3xl'>
          <div
            className='relative rounded-3xl min-h-screen py-23 px-20 bg-cover bg-center bg-no-repeat'
            style={{
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.35) 100%), linear-gradient(90deg, rgba(10, 178, 126, 0.20) 0%, rgba(2, 58, 162, 0.20) 100%), url('${backgroundImage}') lightgray 50% / cover no-repeat`,
            }}
          >
            <div className='relative z-10 h-full'>
              <div className='flex flex-col items-center text-center'>
                {/* Main Heading */}
                <h1 className='text-4xl lg:text-[55px] font-normal leading-tight mb-2 text-white'>
                  {heading}
                </h1>

                {/* Description */}
                <p className='text-white text-xl leading-relaxed mx-auto mb-18'>
                  {description}
                </p>

                {/* Project Form */}
                <div className='w-full mb-16'>
                  <ProjectForm
                    mode='service'
                    preselectedService={serviceSlug}
                  />
                </div>

                {/* Trust Pills */}
                <div className='flex flex-wrap justify-center gap-4'>
                  {trustPills.map((pill) => (
                    <Pill
                      key={pill.text}
                      className='w-[264px] h-[52px] bg-white/90'
                      style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
                      text={pill.text}
                      dotColor={pill.dotColor}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className='pt-12 pb-4 border border-neutral-300 rounded-b-3xl z-0 -mt-7'
            style={{
              background:
                'linear-gradient(90deg, rgba(10, 178, 126, 0.05) 0%, rgba(2, 58, 162, 0.05) 100%)',
              boxShadow: '0 2px 3.2px 0 rgba(0, 0, 0, 0.10)',
            }}
          >
            <div className='custom-container'>
              <div className='flex flex-wrap justify-left gap-3'>
                <Link href='/' className='text-neutral-600 hover:text-primary-600 transition-colors'>
                  Home
                </Link>
                <ChevronRight className='w-5 h-5 text-neutral-400' />
                <span className='text-neutral-900 font-medium'>
                  {serviceName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}