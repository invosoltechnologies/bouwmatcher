'use client';

interface ServiceType {
  title: string;
  description: string;
}

interface ServiceTypesProps {
  heading: string;
  description?: string;
  serviceTypes: ServiceType[];
}

export default function ServiceTypes({
  heading,
  description,
  serviceTypes,
}: ServiceTypesProps) {
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

        {/* Service Types Grid */}
        <div className='max-w-full px-0 md:max-w-6xl mx-auto md:px-0'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
            {serviceTypes.map((type, index) => (
              <div
                key={index}
                className='group relative overflow-hidden rounded-2xl border border-neutral-200 p-6 md:p-8 bg-white transition-all duration-300 ease-out hover:border-accent hover:shadow-lg hover:-translate-y-1'
              >
                {/* Background Gradient on Hover */}
                <div
                  className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(10, 178, 126, 0.05) 0%, rgba(2, 58, 162, 0.05) 100%)',
                  }}
                />

                {/* Content */}
                <div className='relative z-10'>
                  {/* Title */}
                  <h3 className='text-lg md:text-xl font-semibold text-foreground mb-3 md:mb-4 group-hover:text-accent transition-colors duration-300'>
                    {type.title}
                  </h3>

                  {/* Description */}
                  <p className='text-sm md:text-base text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300'>
                    {type.description}
                  </p>

                  {/* Animated Accent Line */}
                  <div
                    className='absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-accent/50 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out'
                    style={{
                      background:
                        'linear-gradient(90deg, #0AB27E 0%, #023AA2 100%)',
                    }}
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
