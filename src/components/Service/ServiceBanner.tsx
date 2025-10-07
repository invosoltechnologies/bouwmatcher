'use client';

import { Service } from '@/data/services';
import ProjectForm from '@/components/Homepage/ProjectForm';
import Pill from '@/components/ui/pill';

interface ServiceBannerProps {
  service: Service;
}

export default function ServiceBanner({ service }: ServiceBannerProps) {
  return (
    <>
      {/* Banner Section */}
      <section className='bg-white-300 pt-62'>
        <div className='max-w-[1326px] mx-auto rounded-3xl'>
          <div
            className='relative rounded-3xl min-h-screen py-23 px-20 bg-cover bg-center bg-no-repeat'
            style={{
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.35) 100%), linear-gradient(90deg, rgba(10, 178, 126, 0.20) 0%, rgba(2, 58, 162, 0.20) 100%), url('/images/services/service-bg.png') lightgray 50% / cover no-repeat`,
            }}
          >
            <div className='relative z-10 h-full'>
              <div className='flex flex-col items-center text-center'>
                {/* Trust Pill */}
                <div className='inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-8 py-2 mb-6 border border-[#023AA233]'>
                  <div className='w-2 h-2 bg-accent rounded-full'></div>
                  <span className='text-sm text-primary font-medium'>
                    Vind een {service.name_nl.toLowerCase()}specialist
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className='text-4xl lg:text-[55px] font-normal leading-tight mb-2 text-white'>
                  Vind en vergelijk {service.name_nl.toLowerCase()}specialisten
                </h1>

                {/* Description */}
                <p className='text-white text-xl leading-relaxed max-w-3xl mx-auto mb-18'>
                  Van voordeur tot schuifpui, transparante prijzen, echte
                  reviews en snelle reactie.
                </p>

                {/* Project Form */}
                <div className='w-full mb-16'>
                  <ProjectForm />
                </div>

                {/* Trust Pills */}
                <div className='flex flex-wrap justify-center gap-4'>
                  <Pill
                    className='w-[264px] h-[52px] bg-white/90'
                    style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
                    text='Eerlijkheid'
                    dotColor='#0AB27E'
                  />
                  <Pill
                    className='w-[264px] h-[52px] bg-white/90'
                    style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
                    text='Transparantie'
                    dotColor='#0AB27E'
                  />
                  <Pill
                    className='w-[264px] h-[52px] bg-white/90'
                    style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
                    text='Doelgericht'
                    dotColor='#0AB27E'
                  />
                  <Pill
                    className='w-[264px] h-[52px] bg-white/90'
                    style={{ boxShadow: '0px 4px 5.3px 0px #00000017' }}
                    text='Geen valse beloften'
                    dotColor='#0AB27E'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='pt-12 pb-4 border border-neutral-300 rounded-b-3xl z-0 -mt-7'
          style={{
            background: 'linear-gradient(90deg, rgba(10, 178, 126, 0.05) 0%, rgba(2, 58, 162, 0.05) 100%)',
            boxShadow: '0 2px 3.2px 0 rgba(0, 0, 0, 0.10)'
          }}
          >
            <div className='custom-container'>
              <div className='flex flex-wrap justify-center gap-3'>
                <button className='px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors'>
                  Btw
                </button>
                <button className='px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors'>
                  Tips
                </button>
                <button className='px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors'>
                  Werkzaamheden
                </button>
                <button className='px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors'>
                  Winterschilder
                </button>
                <button className='px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors'>
                  Kosten
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}