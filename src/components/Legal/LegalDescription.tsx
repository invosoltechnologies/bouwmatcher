'use client'

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Pill from '@/components/ui/pill';
import { Cookie } from 'lucide-react';
import { SectionAccordion } from '@/components/ui/section-accordion';

export default function LegalDescription() {
  const handleDownloadPDF = () => {
    // Implement PDF download logic
    console.log('Downloading PDF...');
  };

  const handlePrint = () => {
    // Implement print logic
    window.print();
  };

  return (
    <section className='pt-0 pb-56 relative'>
      {/* Background div with gradient and blur */}
      <div className='absolute inset-0 w-full h-full -z-10 blur-[33.5px] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4]' />
      <div className='custom-container'>
        <div className='max-w-4xl mx-auto space-y-6'>
          <SectionAccordion
            title='Privacy Policy'
            onDownload={handleDownloadPDF}
            onPrint={handlePrint}
            defaultOpen={true}
          >
            <div className='space-y-6'>
              {/* Key Points Section */}
              <div className='bg-green-50 p-6 rounded-lg'>
                <div className='flex items-center gap-2 mb-4'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <h3 className='font-semibold text-green-800'>Key Points</h3>
                </div>
                <div className='space-y-3 text-sm text-green-700'>
                  <div className='flex items-start gap-2'>
                    <div className='w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0'></div>
                    <span>
                      We collect data to connect you with trusted building
                      professionals
                    </span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <div className='w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0'></div>
                    <span>
                      Your data is processed lawfully with appropriate
                      safeguards
                    </span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <div className='w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0'></div>
                    <span>
                      You have full control over your personal information
                    </span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <div className='w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0'></div>
                    <span>
                      We implement industry-standard security measures
                    </span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <div className='w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0'></div>
                    <span>Contact us anytime at privacy@bouwmatcher.nl</span>
                  </div>
                </div>
              </div>

              {/* Introduction Section */}
              <div>
                <h3 className='font-semibold text-gray-900 mb-3'>
                  Introduction & Controller
                </h3>
                <p className='text-gray-700 text-sm leading-relaxed'>
                  Bouwmatcher B.V. (&quot;we,&quot; &quot;us,&quot; or
                  &quot;our&quot;) operates the Bouwmatcher platform, connecting
                  homeowners with qualified building professionals across the
                  Netherlands. This Privacy Policy explains how we collect, use,
                  and protect your personal data when you use our services.
                </p>
              </div>

              {/* Contact Details Section */}
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h4 className='font-medium text-gray-900 mb-3'>
                  Contact Details:
                </h4>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                  <div>
                    <span className='font-medium text-gray-700'>Company:</span>
                    <span className='text-gray-600 ml-2'>Bouwmatcher B.V.</span>
                  </div>
                  <div>
                    <span className='font-medium text-gray-700'>Email:</span>
                    <span className='text-gray-600 ml-2'>
                      privacy@bouwmatcher.nl
                    </span>
                  </div>
                  <div>
                    <span className='font-medium text-gray-700'>Address:</span>
                    <span className='text-gray-600 ml-2'>
                      Herengracht 124, 1015 BT Amsterdam
                    </span>
                  </div>
                  <div>
                    <span className='font-medium text-gray-700'>Phone:</span>
                    <span className='text-gray-600 ml-2'>+31 20 123 4567</span>
                  </div>
                  <div>
                    <span className='font-medium text-gray-700'>KvK:</span>
                    <span className='text-gray-600 ml-2'>87654321</span>
                  </div>
                  <div>
                    <span className='font-medium text-gray-700'>DPO:</span>
                    <span className='text-gray-600 ml-2'>
                      dpo@bouwmatcher.nl
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SectionAccordion>
        </div>
      </div>
    </section>
  );
}
