'use client';

interface PriceItem {
  label: string;
  priceRange: string;
}

interface ServicePriceComparisonProps {
  heading: string;
  description?: string;
  priceItems: PriceItem[];
}

export default function ServicePriceComparison({
  heading,
  description,
  priceItems,
}: ServicePriceComparisonProps) {
  // Safety check for priceItems
  if (!priceItems || priceItems.length === 0) {
    return null;
  }

  return (
    <section className='py-14 md:py-20 bg-white'>
      <div className='custom-container'>
        {/* Heading and Description */}
        <div className='text-center mb-8 md:mb-[60px]'>
          <h2 className='text-[32px] md:text-5xl font-normal text-foreground mb-2 md:mb-5 px-4'>
            {heading}
          </h2>
          {description && (
            <p className='text-muted-foreground text-base md:text-2xl px-4'>
              {description}
            </p>
          )}
        </div>

        {/* Price Comparison Table */}
        <div className='max-w-full px-0 md:max-w-4xl mx-auto md:px-0'>
          <div className='overflow-x-auto'>
            <div className='min-w-full'>
              {priceItems.map((item, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between gap-4 md:gap-6 py-4 md:py-5 px-5 md:px-6 border-b border-neutral-200 last:border-b-0 hover:bg-accent/5 transition-colors'
                >
                  {/* Label */}
                  <div className='flex-grow min-w-0'>
                    <p className='text-sm md:text-lg font-medium text-foreground truncate'>
                      {item.label}
                    </p>
                  </div>

                  {/* Price Badge */}
                  <div
                    className='flex-shrink-0 px-4 py-2 md:px-5 md:py-3 rounded-full text-xs md:text-sm font-medium text-white whitespace-nowrap'
                    style={{
                      background:
                        'linear-gradient(135deg, #0AB27E 0%, #023AA2 100%)',
                    }}
                  >
                    {item.priceRange}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
