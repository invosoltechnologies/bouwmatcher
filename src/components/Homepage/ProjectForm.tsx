'use client';
import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type Service } from '@/data/services';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

interface ProjectFormProps {
  mode?: 'home' | 'service';
  preselectedService?: string; // service slug
}

export default function ProjectForm({ mode = 'home', preselectedService }: ProjectFormProps) {
  const t = useTranslations('homepage.projectForm');
  const locale = useLocale();
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [category, setCategory] = useState('');
  const [postcode, setPostcode] = useState('');
  const [executionDate, setExecutionDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/service-categories');
        const data = await response.json();
        const fetchedServices = data.serviceCategories || [];
        setServices(fetchedServices);

        // Set preselected service if provided
        if (preselectedService) {
          const preselected = fetchedServices.find((s: Service) => s.slug === preselectedService);
          if (preselected) {
            // Store the slug instead of the name
            setCategory(preselected.slug);
          }
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [preselectedService, locale]);

  const executionDates = [
    t('executionDate1'),
    t('executionDate2'),
    t('executionDate3'),
    t('executionDate4'),
    t('executionDate5'),
    t('executionDate6')
  ];

  const handleStartProject = async () => {
    // Validate category selection
    if (!category) {
      alert(t('selectCategoryAlert'));
      return;
    }

    // Category is now stored as slug, find the service by slug
    const selectedService = services.find((s: Service) => s.slug === category);
    if (!selectedService) return;

    setIsLoading(true);

    try {
      // HOME MODE: Redirect to service detail page
      if (mode === 'home') {
        router.push(`/service/${selectedService.slug}`);
        return;
      }

      // SERVICE MODE: Initialize draft and redirect to create-project
      const response = await fetch('/api/project-draft/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceCategorySlug: selectedService.slug,
          postcode: postcode || null,
          executionTiming: executionDate || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize project');
      }

      // Store session token in localStorage
      localStorage.setItem('projectSessionToken', data.sessionToken);

      // Redirect to questionnaire with draft ID
      router.push(`/create-project?draft=${data.draftId}`);
    } catch (error) {
      console.error('Error starting project:', error);
      alert(t('errorAlert'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className='bg-white/90 rounded-2xl md:rounded-3xl shadow-lg px-6 py-8 md:p-8 border border-white/50'
      style={{ boxShadow: '0px 15px 35px 0px #00000040' }}
    >
      <div className='w-full flex flex-col md:flex-row justify-between items-stretch md:items-end gap-4 md:gap-6'>
        {/* Form inputs div */}
        <div className='w-full flex flex-col md:flex-row items-stretch md:items-start justify-start gap-4 md:gap-6'>
          {/* Category Dropdown */}
          <div className='w-full'>
            <div className='flex items-center gap-2 mb-2 md:mb-3'>
              <Image
                src='/icons/stack-icon.svg'
                width={20}
                height={20}
                alt='Category'
              />
              <label className='text-foreground font-medium text-sm md:text-base'>
                {t('categoryLabel')}
              </label>
            </div>
            <Select
              value={category}
              onValueChange={setCategory}
              disabled={mode === 'service'}
            >
              <SelectTrigger
                className={`w-full md:min-w-[253px] font-montserrat min-h-12 md:min-h-14 px-3 py-3 md:py-[22px] border-gray-200 rounded-[12px] text-sm md:text-base ${
                  mode === 'service'
                    ? 'bg-accent text-white cursor-not-allowed'
                    : 'bg-white text-muted-foreground cursor-pointer'
                }`}
                iconClassName={mode === 'service' ? 'hidden' : ''}
              >
                <SelectValue placeholder={t('categoryPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => {
                  const serviceName = locale === 'en' ? service.name_en : service.name_nl;
                  return (
                    <SelectItem key={service.slug} value={service.slug} className='font-montserrat'>
                      {serviceName}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Postcode Input */}
          <div className='w-full'>
            <div className='flex items-center gap-2 mb-2 md:mb-3'>
              <Image
                src='/icons/map.svg'
                width={18}
                height={18}
                alt='Category'
                className='[filter:brightness(0)_saturate(100%)_invert(14%)_sepia(95%)_saturate(2511%)_hue-rotate(214deg)_brightness(100%)_contrast(105%)]'
              />
              <label className='text-foreground font-medium text-sm md:text-base'>
                {t('postcodeLabel')}
              </label>
            </div>
            <Input
              type='text'
              placeholder={t('postcodePlaceholder')}
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className='font-montserrat w-full md:min-w-[253px] min-h-12 md:min-h-14 px-4 py-3 md:py-[22px] bg-white border-gray-200 rounded-xl text-sm md:text-base'
            />
          </div>

          {/* Execution Date Dropdown */}
          <div className='w-full'>
            <div className='flex items-center gap-2 mb-2 md:mb-3'>
              <Image
                src='/icons/clock-icon.svg'
                width={20}
                height={20}
                alt='Date'
              />
              <label className='text-foreground font-medium text-sm md:text-base'>
                {t('executionDateLabel')}
              </label>
            </div>
            <Select value={executionDate} onValueChange={setExecutionDate}>
              <SelectTrigger className='font-montserrat w-full md:min-w-[253px] min-h-12 md:min-h-14 px-4 py-3 md:py-[22px] bg-white border-gray-200 rounded-xl text-sm md:text-base'>
                <SelectValue placeholder={t('executionDatePlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {executionDates.map((date) => (
                  <SelectItem
                    key={date}
                    value={date}
                    className='font-montserrat'
                  >
                    {date}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Button div */}
        <div className='w-full md:w-auto flex justify-center'>
          <Button
            onClick={handleStartProject}
            disabled={isLoading}
            className='bg-accent hover:bg-accent/90 text-white px-8 md:px-14 py-3 md:py-4 w-full md:w-auto md:min-w-64 h-12 md:h-14 rounded-[12px] font-medium text-sm md:text-base flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <Search className='w-5 h-5 md:w-6 md:h-6' />
            {isLoading ? t('loadingButton') : t('startButton')}
          </Button>
        </div>
      </div>
    </div>
  );
}