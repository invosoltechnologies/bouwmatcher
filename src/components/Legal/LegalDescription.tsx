'use client'
import { SectionAccordion } from '@/components/ui/section-accordion';
import { KeyPoints } from '@/components/ui/key-points';
import { DataCollectionCard } from '@/components/ui/data-collection-card';
import { AlertCard, AlertCardHeader, AlertCardContent } from '@/components/ui/alert-card';
import { BorderedCard, BorderedCardHeader, BorderedCardContent } from '@/components/ui/bordered-card';
import { KeyRound, Check, UserRound, ChartLine, Smartphone, Shield } from 'lucide-react';

export default function LegalDescription() {
  const handleDownloadPDF = () => {
    // Implement PDF download logic
    console.log('Downloading PDF...');
  };

  const handlePrint = () => {
    // Implement print logic
    window.print();
  };

  const dataCollectionSections = [
    {
      icon: UserRound,
      iconColor: "text-blue-600",
      title: "Account Information",
      items: [
        "Name, email address, phone number",
        "Profile photo and professional credentials (for professionals)",
        "Billing and payment information",
        "Communication preferences"
      ]
    },
    {
      icon: ChartLine,
      iconColor: "text-emerald-600",
      title: "Usage Data",
      items: [
        "Project requests and quotes",
        "Messages and communications",
        "Reviews and ratings",
        "Search queries and browsing behavior"
      ]
    },
    {
      icon: Smartphone,
      iconColor: "text-purple-600",
      title: "Device Information",
      items: [
        "IP address and location data",
        "Device type, browser, operating system",
        "Cookies and similar technologies",
        "Log files and analytics data"
      ]
    }
  ];

  const legalBasisCards = [
    {
      title: "Contract Performance",
      description: "To provide our matching services and facilitate connections between users and professionals.",
      cardClass: "bg-blue-50 border border-blue-200",
      textClass: "text-blue-900"
    },
    {
      title: "Legitimate Interests",
      description: "To improve our services, prevent fraud, and ensure platform security.",
      cardClass: "bg-emerald-50 border border-emerald-200",
      textClass: "text-emerald-900"
    },
    {
      title: "Consent",
      description: "For marketing communications and optional features you choose to enable.",
      cardClass: "bg-purple-50 border border-purple-200",
      textClass: "text-purple-900"
    },
    {
      title: "Legal Obligation",
      description: "To comply with tax, accounting, and regulatory requirements.",
      cardClass: "bg-orange-50 border border-orange-200",
      textClass: "text-orange-900"
    }
  ];

  const dataSharingItems = [
    {
      title: "Service Providers",
      description: "Trusted third parties who help us operate our platform, including payment processors, hosting providers, and analytics services.",
      borderColor: "border-l-5 border-l-blue-500"
    },
    {
      title: "Professionals You Choose",
      description: "When you request quotes, we share relevant project details with selected professionals to facilitate the matching process.",
      borderColor: "border-l-5 border-l-emerald-500"
    },
    {
      title: "Legal Requirements",
      description: "When required by law, court order, or to protect our rights and the safety of our users.",
      borderColor: "border-l-5 border-l-orange-500"
    }
  ];

  const internationalTransferItems = [
    "Adequacy decisions by the European Commission",
    "Standard Contractual Clauses (SCCs)",
    "Certification schemes and codes of conduct"
  ];

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
              <div className='bg-slate-50 p-8 rounded-2xl'>
                <h2 className='text-secondary-foreground text-2xl font-montserrat font-semibold mb-6'>
                  Contact Details:
                </h2>
                <div className='flex flex-col md:flex-row gap-8'>
                  <div className='flex-1 space-y-0.5'>
                    <div>
                      <p className='text-slate-700 text-xl font-montserrat'>
                        <span className='font-semibold'>Company: </span>
                        Bouwmatcher B.V.
                      </p>
                    </div>
                    <div>
                      <p className='text-slate-700 text-xl font-montserrat'>
                        <span className='font-semibold'>Address: </span>
                        Herengracht 124, 1015 BT Amsterdam
                      </p>
                    </div>
                    <div>
                      <p className='text-slate-700 text-xl font-montserrat'>
                        <span className='font-semibold'>KvK: </span>
                        87654321
                      </p>
                    </div>
                  </div>
                  <div className='flex-1 space-y-0.5'>
                    <div>
                      <p className='text-slate-700 text-xl font-montserrat'>
                        <span className='font-semibold'>Email: </span>
                        privacy@bouwmatcher.nl
                      </p>
                    </div>
                    <div>
                      <p className='text-slate-700 text-xl font-montserrat'>
                        <span className='font-semibold'>Phone: </span>
                        +31 20 123 4567
                      </p>
                    </div>
                    <div>
                      <p className='text-slate-700 text-xl font-montserrat'>
                        <span className='font-semibold'>DPO: </span>
                        dpo@bouwmatcher.nl
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Collection Section */}
              <div className='mt-12'>
                <h2 className='text-secondary-foreground text-3xl  mb-8'>
                  Data We Collect
                </h2>
                <div className='space-y-6'>
                  {dataCollectionSections.map((section, index) => (
                    <DataCollectionCard
                      key={index}
                      icon={section.icon}
                      iconColor={section.iconColor}
                      title={section.title}
                      items={section.items}
                    />
                  ))}
                </div>
              </div>

              {/* Why & Legal Bases Section */}
              <div className='mt-12'>
                <h2 className='text-secondary-foreground text-3xl mb-4'>
                  Why & Legal Bases
                </h2>
                <p className='text-slate-700 text-xl font-montserrat mb-8'>
                  We process your personal data based on the following legal
                  grounds:
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {legalBasisCards.map((card, index) => (
                    <AlertCard key={index} className={card.cardClass}>
                      <AlertCardHeader className={card.textClass}>
                        {card.title}
                      </AlertCardHeader>
                      <AlertCardContent className={card.textClass}>
                        {card.description}
                      </AlertCardContent>
                    </AlertCard>
                  ))}
                </div>
              </div>

              {/* Data Sharing Section */}
              <div className='mt-12'>
                <h2 className='text-secondary-foreground text-3xl mb-4'>
                  Data Sharing
                </h2>
                <p className='text-slate-700 text-xl font-montserrat mb-8'>
                  We may share your data with the following parties under strict
                  conditions:
                </p>
                <div className='space-y-6'>
                  {dataSharingItems.map((item, index) => (
                    <BorderedCard key={index} borderColor={item.borderColor}>
                      <BorderedCardHeader>{item.title}</BorderedCardHeader>
                      <BorderedCardContent>
                        {item.description}
                      </BorderedCardContent>
                    </BorderedCard>
                  ))}
                </div>
              </div>

              {/* International Transfers Section */}
              <div className='mt-12'>
                <h2 className='text-secondary-foreground text-3xl mb-4'>
                  International Transfers
                </h2>
                <p className='text-slate-700 text-xl font-montserrat mb-8'>
                  Your data is primarily processed within the European Union.
                  When we use service providers outside the EU, we ensure
                  adequate protection through:
                </p>
                <ul className='space-y-4 ml-8.5'>
                  {internationalTransferItems.map((item, index) => (
                    <li key={index} className='flex items-center gap-4'>
                      <Shield
                        className='w-6 h-6 text-emerald-600'
                        fill='currentColor'
                      />
                      <span className='text-slate-700 text-xl font-montserrat'>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionAccordion>
        </div>
      </div>
    </section>
  );
}
