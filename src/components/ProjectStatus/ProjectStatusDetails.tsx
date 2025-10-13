import React from 'react'
import { Calendar, MapPin } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface ProjectStatusDetailsProps {
  createdDate?: string
  location?: string
  status?: string
  currentStep?: number
}

const ProjectStatusDetails = ({
  createdDate = '23 september 2025',
  location = 'Enschede',
  status = 'Wachten op offertes',
  currentStep = 0
}: ProjectStatusDetailsProps) => {
  const steps = [
    { label: 'wachten op offertes', value: 0 },
    { label: 'vakspecialist gekozen', value: 1 },
    { label: 'in uitvoering', value: 2 },
    { label: 'project afgerond', value: 3 }
  ]

  return (
    <div className='w-full max-w-[620px] mx-auto pt-[196px] pb-24'>
      {/* Header */}
      <div className='text-center mb-[60px]'>
        <h1 className='text-5xl font-normal text-foreground mb-5'>
          Aanvraagstatus
        </h1>
        <div className='flex items-center flex-col justify-center gap-4 text-base text-muted-foreground'>
          <div className='flex items-center gap-2'>
            <Calendar className='w-4 h-4' />
            <span>Aangevraagd op {createdDate}</span>
          </div>
          <div className='flex items-center gap-2'>
            <MapPin className='w-4 h-4' />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Status Progress */}
      <div
        className='rounded-lg py-8 px-7.5 mb-6'
        style={{
          background:
            'linear-gradient(90deg, rgba(10, 178, 126, 0.10) 0%, rgba(2, 58, 162, 0.10) 100%)',
        }}
      >
        <div className='mb-6'>
          <span className='text-base font-medium text-secondary-foreground'>
            Status:{' '}
          </span>
          <span className='text-base font-semibold text-primary'>{status}</span>
        </div>

        {/* Progress Steps */}
        <div className='relative'>
          {/* Progress Line */}
          <div
            className='absolute top-1 left-0 right-0 h-0.5 bg-muted-foreground'
            style={{ zIndex: 0 }}
          />
          <div
            className='absolute top-1 left-0 h-0.5 bg-primary transition-all duration-500'
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
              zIndex: 0,
            }}
          />

          {/* Steps */}
          <div className='relative flex justify-between'>
            {steps.map((step, index) => (
              <div
                key={index}
                className='flex flex-col items-center'
                style={{ zIndex: 1 }}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full flex items-center justify-center mb-2 transition-all ${
                    index <= currentStep ? 'bg-primary ' : 'bg-muted-foreground'
                  }`}
                >
                  {index < currentStep && (
                    <div className='w-2 h-2 bg-white rounded-full' />
                  )}
                </div>
                <span
                  className={`text-xs text-center ${
                    index <= currentStep
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground font-normal'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Box */}
      <Alert
        className='border-red-200 bg-white/50 py-7 px-7.5 [&>svg]:text-red-600'
        style={{ boxShadow: '0px 0.94px 1.88px 0px #0000000D' }}
      >
        <div className='col-start-2'>
          <div className='flex'>
            <svg className='w-7 h-7' fill='#DC2626' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
            <h3 className='text-base font-semibold text-red-900 mb-2'>
              Check je e-mail voor offertes van specialisten
            </h3>
          </div>

          <AlertDescription className='text-sm text-red-600 mb-4'>
            Lokale specialisten nemen per e-mail contact met je op. Vergelijk
            hun offertes om je probleem sneller op te lossen.
          </AlertDescription>

          <div className='space-y-3'>
            <div className='bg-red-50 border border-red-200 rounded-md py-3.5 px-4'>
              <p className='text-sm text-red-600'>
                <span className='font-medium text-red-900'>
                  • Nieuwe offertes komen per e-mail binnen.
                </span>{' '}
                Open je inbox om reacties van specialisten op je aanvraag te
                zien.
              </p>
            </div>

            <div className='bg-red-50 border border-red-200 rounded-md py-3.5 px-4'>
              <p className='text-sm text-red-600'>
                <span className='font-medium text-red-900'>
                  • Niets gezien? Check Spam/Reclame en zoek op
                  &ldquo;Bouwmatcher&rdquo;.
                </span>{' '}
                Voeg afzenders toe aan je contacten.
              </p>
            </div>

            <div className='bg-red-50 border border-red-200 rounded-md py-3.5 px-4'>
              <p className='text-sm text-red-600'>
                <span className='font-medium text-red-900'>
                  • Snel reageren = beter aanbod.
                </span>{' '}
                Stel je vragen of geef je beschikbaarheid door, snelle reacties
                helpen met lagere prijzen en eerdere planning.
              </p>
            </div>
          </div>
        </div>
      </Alert>
    </div>
  );
}

export default ProjectStatusDetails