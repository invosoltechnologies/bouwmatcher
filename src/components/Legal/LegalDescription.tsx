'use client'
import { SectionAccordion } from '@/components/ui/section-accordion';
import { KeyPoints } from '@/components/ui/key-points';
import { KeyRound, Check } from 'lucide-react';

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
    <section className='pt-12 pb-56 relative'>
      {/* Background div with gradient and blur */}
      <div className='absolute inset-0 w-full h-full -z-10 blur-[33.5px] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4]' />
      <div className='custom-container'>
        <div className='w-full space-y-6'>
          <SectionAccordion
            title='Privacy Policy'
            onDownload={handleDownloadPDF}
            onPrint={handlePrint}
            defaultOpen={true}
          >
            <div className='space-y-6'>
              {/* Key Points Section */}
              <KeyPoints
                title='Key Points'
                backgroundColor='bg-accent/5'
                headingIcon={KeyRound}
                headingIconClassName='text-emerald-600 w-6 h-6'
                headingClassName='text-secondary-foreground text-[26px]'
                listIcon={Check}
                listIconClassName='text-emerald-600 w-5 h-5'
                listItemClassName='text-secondary-foreground font-montserrat text-xl'
                points={[
                  'We collect data to connect you with trusted building professionals',
                  'Your data is processed lawfully with appropriate safeguards',
                  'You have full control over your personal information',
                  'We implement industry-standard security measures',
                  'Contact us anytime at privacy@bouwmatcher.nl',
                ]}
              />

              {/* Introduction Section */}
              <div className=' mt-11.5'>
                <h3 className='text-[26px] text-secondary-foreground mb-6 '>
                  Introduction & Controller
                </h3>
                <p className='text-muted-foreground text-2xl leading-relaxed'>
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
