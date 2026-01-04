'use client';

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Calendar, MapPin, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ProjectStatusDetailsProps {
  createdDate?: string
  location?: string
  status?: string
  currentStep?: number
}

interface ProjectData {
  id: string;
  createdDate: string;
  location: string;
  status: string;
  currentStep: number;
  rawStatus: string;
  description?: string;
  requestType?: string;
  serviceCategory?: number;
}

// English translations
const fallbackTranslations_EN: Record<string, string> = {
  'title': 'Request Status',
  'loading': 'Loading project details...',
  'status': 'Status',
  'requestedOn': 'Requested on',
  'errorLoadingProject': 'Failed to load project details',
  'noProjectFound': 'No project found. Please check the link and try again.',
  'steps.waiting': 'Waiting for quotes',
  'steps.selected': 'Specialist selected',
  'steps.inProgress': 'In progress',
  'steps.completed': 'Project completed',
  'updateStatus': 'Update project status',
  'statusLabel.pending_quotes': 'Waiting for quotes',
  'statusLabel.specialist_selected': 'Specialist selected',
  'statusLabel.in_progress': 'In progress',
  'statusLabel.completed': 'Project completed',
  'alert.title': 'Check your email for quotes from specialists',
  'alert.description': 'Local specialists will contact you by email. Compare their quotes to solve your problem faster.',
  'alert.point1.title': 'New quotes arrive via email.',
  'alert.point1.description': 'Check your inbox for responses from specialists to your request.',
  'alert.point2.title': 'Don\'t see anything? Check Spam/Promotions and search for "Bouwmatcher".',
  'alert.point2.description': 'Add senders to your contacts.',
  'alert.point3.title': 'Quick response = better offers.',
  'alert.point3.description': 'Ask questions or provide your availability. Quick responses help with lower prices and earlier scheduling.'
};

// Dutch translations
const fallbackTranslations_NL: Record<string, string> = {
  'title': 'Aanvraagstatus',
  'loading': 'Project gegevens laden...',
  'status': 'Status',
  'requestedOn': 'Aangevraagd op',
  'errorLoadingProject': 'Kan projectgegevens niet laden',
  'noProjectFound': 'Project niet gevonden. Controleer de link en probeer opnieuw.',
  'steps.waiting': 'Wachten op offertes',
  'steps.selected': 'Vakspecialist gekozen',
  'steps.inProgress': 'In uitvoering',
  'steps.completed': 'Project afgerond',
  'updateStatus': 'Projectstatus bijwerken',
  'statusLabel.pending_quotes': 'Wachten op offertes',
  'statusLabel.specialist_selected': 'Vakspecialist gekozen',
  'statusLabel.in_progress': 'In uitvoering',
  'statusLabel.completed': 'Project afgerond',
  'alert.title': 'Controleer uw e-mail op offertes van specialisten',
  'alert.description': 'Lokale specialisten zullen u per e-mail contacteren. Vergelijk hun offertes om uw probleem sneller op te lossen.',
  'alert.point1.title': 'Nieuwe offertes komen via e-mail aan.',
  'alert.point1.description': 'Controleer uw inbox op reacties van specialisten op uw aanvraag.',
  'alert.point2.title': 'Ziet u niets? Controleer Spam/Promoties en zoek naar "Bouwmatcher".',
  'alert.point2.description': 'Voeg afzenders toe aan uw contacten.',
  'alert.point3.title': 'Snelle reactie = betere aanbiedingen.',
  'alert.point3.description': 'Stel vragen of geef uw beschikbaarheid aan. Snelle reacties helpen met lagere prijzen en eerder plannen.'
};

const ProjectStatusDetails = ({
  createdDate: defaultCreatedDate,
  location: defaultLocation,
  status: defaultStatus,
  currentStep: defaultCurrentStep = 0
}: ProjectStatusDetailsProps) => {
  // Get current locale and select appropriate translations
  const locale = useLocale();
  const translations = locale === 'nl' ? fallbackTranslations_NL : fallbackTranslations_EN;
  const t = (key: string) => translations[key] || key;
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createdDate = projectData?.createdDate || defaultCreatedDate;
  const location = projectData?.location || defaultLocation;
  const status = projectData?.status || defaultStatus;
  const currentStep = projectData?.currentStep ?? defaultCurrentStep ?? 0;

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    const fetchProjectData = async () => {
      try {
        const response = await fetch(`/api/projects/status?token=${token}`);

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || t('errorLoadingProject'));
        }

        const data = await response.json();
        setProjectData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err instanceof Error ? err.message : t('errorLoadingProject'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectData();
  }, [token]);

  const steps = [
    { label: t('steps.waiting'), value: 0 },
    { label: t('steps.selected'), value: 1 },
    { label: t('steps.inProgress'), value: 2 },
    { label: t('steps.completed'), value: 3 }
  ]

  if (isLoading) {
    return (
      <div className='w-full max-w-[620px] mx-auto pt-[196px] pb-24'>
        <div className='text-center'>
          <p className='text-lg text-gray-500'>{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full max-w-[620px] mx-auto pt-[196px] pb-24'>
        <Alert className='border-red-200 bg-red-50'>
          <AlertCircle className='h-4 w-4 text-red-600' />
          <AlertDescription className='text-sm text-red-600 ml-2'>
            {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!token || !projectData) {
    return (
      <div className='w-full max-w-[620px] mx-auto pt-[196px] pb-24'>
        <Alert className='border-yellow-200 bg-yellow-50'>
          <AlertCircle className='h-4 w-4 text-yellow-600' />
          <AlertDescription className='text-sm text-yellow-600 ml-2'>
            {t('noProjectFound')}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className='w-full max-w-[620px] mx-auto pt-[196px] pb-24'>
      {/* Header */}
      <div className='text-center mb-[60px]'>
        <h1 className='text-5xl font-normal text-foreground mb-5'>
          {t('title')}
        </h1>
        <div className='flex items-center flex-col justify-center gap-4 text-base text-muted-foreground'>
          {createdDate && (
            <div className='flex items-start gap-2'>
              <Calendar className='w-4 h-4 mt-0.5' />
              <span>{t('requestedOn')} {createdDate}</span>
            </div>
          )}
          {location && (
            <div className='flex items-center gap-2'>
              <Image src='/icons/map-pin.svg' alt='Location' width={9} height={9} />
              <span>{location}</span>
            </div>
          )}
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
            {t('status')}:{' '}
          </span>
          <span className='text-base font-semibold text-primary'>{t(`statusLabel.${status}`)}</span>
        </div>

        {/* Progress Steps */}
        <div className='relative pt-8 pb-4'>
          <style>{`
            @keyframes ripple {
              0% {
                box-shadow: 0 0 0 0 rgba(var(--primary-rgb, 59, 130, 246), 0.7);
              }
              70% {
                box-shadow: 0 0 0 8px rgba(var(--primary-rgb, 59, 130, 246), 0);
              }
              100% {
                box-shadow: 0 0 0 0 rgba(var(--primary-rgb, 59, 130, 246), 0);
              }
            }
            .ripple-active {
              animation: ripple 2s infinite;
            }
          `}</style>

          {/* Background Progress Line */}
          <div
            className='absolute top-7 left-0 right-0 h-1 bg-gray-300 rounded-full'
            style={{ zIndex: 0 }}
          />
          {/* Filled Progress Line */}
          <div
            className='absolute top-7 left-0 h-1 bg-primary rounded-full transition-all duration-500'
            style={{
              width: `calc(${(currentStep / (steps.length - 1)) * 100}% + 12px)`,
              zIndex: 0,
            }}
          />

          {/* Steps Container - no padding, edge to edge */}
          <div className='relative flex justify-between'>
            {/* Step Dots */}
            {steps.map((step, index) => (
              <div
                key={index}
                className='flex flex-col items-center relative'
                style={{ zIndex: 2 }}
              >
                <div
                  className={`relative w-6 h-6 rounded-full flex items-center justify-center mb-4 transition-all border-2 ${
                    index <= currentStep
                      ? 'bg-primary border-primary ripple-active'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {index < currentStep && (
                    <svg
                      className='w-3.5 h-3.5 text-white'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-xs text-center leading-tight ${
                    index <= currentStep
                      ? 'text-primary font-semibold'
                      : 'text-gray-500 font-normal'
                  }`}
                  style={{ maxWidth: '70px' }}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Box - Always show info for now, customize based on status later */}
      <div
        className='border border-red-300 bg-red-50 rounded-lg p-6'
        style={{ boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.08)' }}
      >
        <div className='flex gap-4'>
          <AlertCircle className='w-5 h-5 flex-shrink-0 mt-0.5 text-red-600' />
          <div className='flex-1'>
            <h3 className='text-lg font-semibold text-red-900 mb-2'>
              {t('alert.title')}
            </h3>

            <p className='text-sm text-red-700 mb-4 leading-relaxed'>
              {t('alert.description')}
            </p>

            <div className='space-y-3'>
              <div className='bg-white border border-red-200 rounded-md py-3 px-4'>
                <p className='text-sm text-red-900 leading-relaxed'>
                  <span className='font-semibold text-red-900'>
                    {t('alert.point1.title')}
                  </span>
                  <br />
                  <span className='text-red-700 text-sm'>
                    {t('alert.point1.description')}
                  </span>
                </p>
              </div>

              <div className='bg-white border border-red-200 rounded-md py-3 px-4'>
                <p className='text-sm text-red-900 leading-relaxed'>
                  <span className='font-semibold text-red-900'>
                    {t('alert.point2.title')}
                  </span>
                  <br />
                  <span className='text-red-700 text-sm'>
                    {t('alert.point2.description')}
                  </span>
                </p>
              </div>

              <div className='bg-white border border-red-200 rounded-md py-3 px-4'>
                <p className='text-sm text-red-900 leading-relaxed'>
                  <span className='font-semibold text-red-900'>
                    {t('alert.point3.title')}
                  </span>
                  <br />
                  <span className='text-red-700 text-sm'>
                    {t('alert.point3.description')}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Status Button */}
      {token && projectData && (
        <div className='mt-12 flex justify-center'>
          <Button
            onClick={() => {
              window.location.href = `/project-status/update?token=${token}`;
            }}
            className='px-8 py-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg'
          >
            {t('updateStatus')}
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProjectStatusDetails
