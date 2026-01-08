'use client';

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  heading: string;
  description: string;
  faqItems: FAQItem[];
}

export default function ServiceFAQ({
  heading,
  description,
  faqItems,
}: ServiceFAQProps) {
  return (
    <section className='py-14 md:py-20 bg-white'>
      <div className='custom-container'>
        {/* Heading and Description */}
        <div className='text-center mb-8 md:mb-[60px]'>
          <h2 className='text-[32px] md:text-5xl font-normal text-foreground mb-2 md:mb-5 px-4'>
            {heading}
          </h2>
          <p className='text-muted-foreground text-base md:text-2xl px-4'>
            {description}
          </p>
        </div>

        {/* FAQ Cards */}
        <div className='max-w-full px-0 md:max-w-4xl mx-auto md:px-0'>
          <div className='space-y-4'>
            {faqItems.map((item, index) => (
              <div
                key={index}
                className='rounded-2xl border border-white/20 mb-4 border-b-accent/20 p-5 md:p-6'
                style={{
                  boxShadow: '0px 10px 30px 0px #023AA214',
                  background:
                    'linear-gradient(90deg, rgba(10, 178, 126, 0.1) 0%, rgba(2, 58, 162, 0.1) 100%)',
                }}
              >
                {/* Question - Always Visible */}
                <div>
                  <h3 className='text-sm md:text-xl text-muted-foreground leading-relaxed'>
                    {item.question}
                  </h3>
                </div>

                {/* Answer - Always Visible */}
                <div className='text-[#787878] py-6 pb-0 md:py-8 md:pb-0 text-sm md:text-lg border-t border-accent mt-6 leading-relaxed'>
                  <div
                    className='[&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2'
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
