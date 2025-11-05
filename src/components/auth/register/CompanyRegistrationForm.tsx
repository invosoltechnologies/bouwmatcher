'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface CompanySearchResult {
  name: string;
  kvkNumber: string;
  address: string;
  city: string;
  postalCode: string;
  houseNumber: string;
  street: string;
}

interface CompanyRegistrationFormProps {
  onNext: (data: CompanyData) => void;
  onBack?: () => void;
}

export interface CompanyData {
  companyName: string;
  kvkNumber: string;
  postalCode: string;
  houseNumber: string;
  street: string;
  city: string;
}

type FormMode = 'search' | 'manual';

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function CompanyRegistrationForm({ onNext, onBack }: CompanyRegistrationFormProps) {
  const [mode, setMode] = useState<FormMode>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CompanySearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CompanyData>();

  // Auto-search when user types (debounced)
  const performSearch = useCallback(async (query: string) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch(`/api/company-search?query=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error('Failed to search companies');
      }

      const { companies } = await response.json();
      setSearchResults(companies || []);
    } catch (error) {
      console.error('Company search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    if (mode === 'search') {
      performSearch(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, mode, performSearch]);

  // Handle company selection from results
  const handleSelectCompany = (company: CompanySearchResult) => {
    setValue('companyName', company.name);
    setValue('kvkNumber', company.kvkNumber);
    setValue('postalCode', company.postalCode);
    setValue('houseNumber', company.houseNumber);
    setValue('street', company.street);
    setValue('city', company.city);
    setMode('manual');
  };

  // Handle manual entry
  const handleManualEntry = () => {
    setMode('manual');
    setValue('companyName', searchQuery);
  };

  // Handle back button
  const handleBack = () => {
    if (mode === 'manual') {
      // Go back to search mode
      setMode('search');
      setSearchQuery('');
      setSearchResults([]);
    } else if (onBack) {
      // Go back to previous step
      onBack();
    }
  };

  // Submit form
  const onSubmit = (data: CompanyData) => {
    onNext(data);
  };

  return (
    <div className='max-w-3xl w-full mx-auto'>
      {/* Header */}
      <div className='mb-11.5 mt-5.5 text-center'>
        <h1 className='text-2xl md:text-4xl font-normal text-slate-900 mb-3'>
          Kies je bedrijf
        </h1>
        <p className='text-base md:text-lg text-muted-foreground'>
          Zoek op bedrijfsnaam of Bedrijfs ID
        </p>
      </div>

      {/* Search Mode */}
      {mode === 'search' && (
        <div>
          {/* Search Input with shadow */}
          <div
            className='relative rounded-2xl'
            style={{ boxShadow: '0px 12px 36px 0px #023AA21F' }}
          >
            <Input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Typ je bedrijfsnaam of bedrijfs ID…'
              className='pl-6 pr-12 h-16 bg-white border-gray-200 rounded-2xl lg:text-lg placeholder:text-slate-400'
            />
            <Search className='absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none' />
          </div>

          {/* Search Results - Below search box, no card */}
          {searchResults.length > 0 && (
            <div className='mt-6 space-y-3'>
              {searchResults.map((company, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-lg hover:border-primary transition-all'
                  style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
                >
                  <div className='flex-1'>
                    <h3 className='text-base font-semibold text-slate-900'>
                      {company.name}
                    </h3>
                    <p className='text-sm text-slate-600'>
                      {company.address}, {company.city}
                    </p>
                    <p className='text-sm text-slate-500'>
                      Bedrijfs ID {company.kvkNumber}
                    </p>
                  </div>
                  <Button
                    type='button'
                    onClick={() => handleSelectCompany(company)}
                    className='px-6 py-2.5 text-base rounded-xl font-semibold ml-4 shrink-0'
                    size={null}
                  >
                    Dit is mijn bedrijf →
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* "Not found" link */}
          {searchQuery.trim().length >= 2 && !isSearching && (
            <div className='mt-6 text-center'>
              <button
                type='button'
                onClick={handleManualEntry}
                className='text-primary text-base lg:text-lg font-medium hover:text-primary/80 hover:underline'
              >
                Ik vind mijn bedrijf niet.
              </button>
            </div>
          )}

          {/* Loading indicator */}
          {isSearching && (
            <div className='mt-6 text-center text-slate-500'>Zoeken...</div>
          )}
        </div>
      )}

      {/* Manual Entry Mode */}
      {mode === 'manual' && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* No background card, just form fields */}
          <div className='space-y-6'>
            {/* Company Name */}
            <div>
              <Label
                htmlFor='companyName'
                className='text-base text-slate-900 mb-2 block'
              >
                Bedrijfsnaam
              </Label>
              <Input
                id='companyName'
                {...register('companyName', {
                  required: 'Bedrijfsnaam is verplicht',
                })}
                type='text'
                placeholder='Big Gym'
                className='h-14 bg-white border-neutral-300 rounded-lg text-base'
              />
              {errors.companyName && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* KVK Number */}
            <div>
              <Label
                htmlFor='kvkNumber'
                className='text-base text-slate-900 mb-2 block'
              >
                Bedrijfs ID
              </Label>
              <Input
                id='kvkNumber'
                {...register('kvkNumber', {
                  required: 'Bedrijfs ID is verplicht',
                  pattern: {
                    value: /^\d{8}$/,
                    message: 'Bedrijfs ID moet 8 cijfers zijn',
                  },
                })}
                type='text'
                placeholder='12345678'
                maxLength={8}
                className='h-14 bg-white border-neutral-300 rounded-lg text-base'
              />
              {errors.kvkNumber && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.kvkNumber.message}
                </p>
              )}
            </div>

            {/* Postal Code and House Number */}
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label
                  htmlFor='postalCode'
                  className='text-base text-slate-900 mb-2 block'
                >
                  Postcode
                </Label>
                <Input
                  id='postalCode'
                  {...register('postalCode', {
                    required: 'Postcode is verplicht',
                  })}
                  type='text'
                  placeholder='1234 AB'
                  className='h-14 bg-white border-neutral-300 rounded-lg text-base'
                />
                {errors.postalCode && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.postalCode.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor='houseNumber'
                  className='text-base text-slate-900 mb-2 block'
                >
                  Huisnummer
                </Label>
                <Input
                  id='houseNumber'
                  {...register('houseNumber', {
                    required: 'Huisnummer is verplicht',
                  })}
                  type='text'
                  placeholder='123'
                  className='h-14 bg-white border-neutral-300 rounded-lg text-base'
                />
                {errors.houseNumber && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.houseNumber.message}
                  </p>
                )}
              </div>
            </div>

            {/* Street */}
            <div>
              <Label
                htmlFor='street'
                className='text-base text-slate-900 mb-2 block'
              >
                Straatnaam
              </Label>
              <Input
                id='street'
                {...register('street', {
                  required: 'Straatnaam is verplicht',
                })}
                type='text'
                placeholder='Straatnaam'
                className='h-14 bg-white border-neutral-300 rounded-lg text-base'
              />
              {errors.street && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.street.message}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <Label
                htmlFor='city'
                className='text-base text-slate-900 mb-2 block'
              >
                Plaats
              </Label>
              <Input
                id='city'
                {...register('city', {
                  required: 'Plaats is verplicht',
                })}
                type='text'
                placeholder='Amsterdam'
                className='h-14 bg-white border-neutral-300 rounded-lg text-base'
              />
              {errors.city && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Buttons for Manual Mode */}
          <div className='flex justify-between mt-8 px-2'>
            <Button
              type='button'
              variant='ghost'
              onClick={handleBack}
              className='text-lg rounded-xl font-semibold'
              size={null}
            >
              ← Terug
            </Button>
            <Button
              type='submit'
              className='px-8 py-5 text-lg rounded-xl font-semibold shadow-lg'
              size={null}
            >
              Naar persoonsgegevens →
            </Button>
          </div>
        </form>
      )}

      {/* Bottom Buttons for Search Mode */}
      {mode === 'search' && (
        <div className='flex justify-start mt-8 px-2'>
          <Button
            type='button'
            variant='ghost'
            onClick={handleBack}
            className=' text-lg rounded-xl font-semibold'
            size={null}
          >
            ← Terug
          </Button>
        </div>
      )}
    </div>
  );
}
