'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { servicesData } from '@/data/services';
import Image from 'next/image';

export default function ProjectForm() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [postcode, setPostcode] = useState('');
  const [executionDate, setExecutionDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const categories = servicesData.map(service => service.name_nl);

  const executionDates = [
    'Zo snel mogelijk',
    'Binnen 1 maand',
    'Binnen 3 maanden',
    'Binnen 6 maanden',
    'Over meer dan 6 maanden',
    'Nog niet beslist'
  ];

  const handleStartProject = async () => {
    // Validate category selection
    if (!category) {
      alert('Selecteer een categorie');
      return;
    }

    // Find the service category slug
    const selectedService = servicesData.find(s => s.name_nl === category);
    if (!selectedService) return;

    setIsLoading(true);

    try {
      // Call API to initialize draft project (API will lookup ID by slug)
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
      alert('Er is een fout opgetreden. Probeer het opnieuw.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className='bg-white/90 rounded-3xl shadow-lg p-8 border border-white/50'
      style={{ boxShadow: '0px 15px 35px 0px #00000040' }}
    >
      <div className='w-full flex justify-between items-end gap-6'>
        {/* Form inputs div */}
        <div className='w-full flex items-start justify-start gap-6'>
          {/* Category Dropdown */}
          <div className='w-full'>
            <div className='flex items-center gap-2 mb-3'>
              <Image
                src='/icons/stack-icon.svg'
                width={20}
                height={20}
                alt='Category'
              />
              <label className='text-foreground font-medium text-base'>
                Categorie
              </label>
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className=' min-w-[253px] font-montserrat cursor-pointer min-h-14 px-3 py-[22px] bg-white border-gray-200 rounded-[12px] text-base'>
                <SelectValue placeholder='Selecteer categorie' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className='font-montserrat'>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Postcode Input */}
          <div className='w-full'>
            <div className='flex items-center gap-2 mb-3'>
              <Image
                src='/icons/map.svg'
                width={18}
                height={18}
                alt='Category'
                className='[filter:brightness(0)_saturate(100%)_invert(14%)_sepia(95%)_saturate(2511%)_hue-rotate(214deg)_brightness(100%)_contrast(105%)]'
              />
              <label className='text-foreground font-medium text-base'>
                Postcode
              </label>
            </div>
            <Input
              type='text'
              placeholder='1000 AB'
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className='font-montserrat min-w-[253px] min-h-14 px-4 py-[22px] bg-white border-gray-200 rounded-xl text-base'
            />
          </div>

          {/* Execution Date Dropdown */}
          <div className='w-full'>
            <div className='flex items-center gap-2 mb-3'>
              <Image
                src='/icons/clock-icon.svg'
                width={20}
                height={20}
                alt='Date'
              />
              <label className='text-foreground font-medium text-base'>
                Uitvoerdatum
              </label>
            </div>
            <Select value={executionDate} onValueChange={setExecutionDate}>
              <SelectTrigger className='font-montserrat min-w-[253px] min-h-14  px-4 py-[22px] bg-white border-gray-200 rounded-xl text-base'>
                <SelectValue placeholder='Zo snel mogelijk' />
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
        <div className='w-full flex justify-center'>
          <Button
            onClick={handleStartProject}
            disabled={isLoading}
            className='bg-accent hover:bg-accent/90 text-white px-14 py-4 min-w-64 h-14 rounded-[12px] font-medium text-base flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <Search className='w-6 h-6' />
            {isLoading ? 'Laden...' : 'Project starten'}
          </Button>
        </div>
      </div>
    </div>
  );
}