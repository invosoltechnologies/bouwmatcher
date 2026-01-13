'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks';
import { useTranslations } from 'next-intl';

interface CompanySearchResult {
  name: string;
  kvkNumber: string;
  address: string;
  city: string;
  postalCode: string;
  houseNumber: string;
  street: string;
  country?: 'NL' | 'BE';
  businessIdType?: 'KVK' | 'KBO';
  businessIdFormatted?: string;
  // Additional fields from Bedrijfsdata API
  vatNumber?: string;
  phone?: string;
  email?: string;
  website?: string;
  employees?: number;
  description?: string;
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
  country: 'NL' | 'BE';
  businessIdType: 'KVK' | 'KBO';
  businessIdFormatted?: string;
  // Additional fields from API
  vatNumber?: string;
  phone?: string;
  email?: string;
  website?: string;
  employees?: number;
  description?: string;
  // Verification source
  isFromApi: boolean; // true if selected from search results, false if manually entered
}

type FormMode = 'search' | 'manual';

export default function CompanyRegistrationForm({ onNext, onBack }: CompanyRegistrationFormProps) {
  const t = useTranslations('auth.register.companyRegistration');
  const [mode, setMode] = useState<FormMode>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CompanySearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [country, setCountry] = useState<'NL' | 'BE'>('NL');

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CompanyData>({
    defaultValues: {
      country: 'NL',
      businessIdType: 'KVK',
    },
  });

  // Auto-search when user types (debounced)
  const performSearch = useCallback(async (query: string, selectedCountry: 'NL' | 'BE') => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch(
        `/api/company-search?query=${encodeURIComponent(query)}&country=${selectedCountry}`
      );

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
      performSearch(debouncedSearchQuery, country);
    }
  }, [debouncedSearchQuery, country, mode, performSearch]);

  // Handle company selection from results
  const handleSelectCompany = (company: CompanySearchResult) => {
    setValue('companyName', company.name);
    setValue('kvkNumber', company.kvkNumber);
    setValue('postalCode', company.postalCode);
    setValue('houseNumber', company.houseNumber);
    setValue('street', company.street);
    setValue('city', company.city);
    setValue('country', company.country || country);
    setValue('businessIdType', company.businessIdType || (country === 'BE' ? 'KBO' : 'KVK'));
    if (company.businessIdFormatted) {
      setValue('businessIdFormatted', company.businessIdFormatted);
    }
    // Set additional fields from API
    if (company.vatNumber) setValue('vatNumber', company.vatNumber);
    if (company.phone) setValue('phone', company.phone);
    if (company.email) setValue('email', company.email);
    if (company.website) setValue('website', company.website);
    if (company.employees) setValue('employees', company.employees);
    if (company.description) setValue('description', company.description);
    setMode('manual');
  };

  // Handle manual entry
  const handleManualEntry = () => {
    setMode('manual');
    setValue('companyName', searchQuery);
    setValue('country', country);
    setValue('businessIdType', country === 'BE' ? 'KBO' : 'KVK');
  };

  // Handle country change
  const handleCountryChange = (newCountry: 'NL' | 'BE') => {
    setCountry(newCountry);
    setValue('country', newCountry);
    setValue('businessIdType', newCountry === 'BE' ? 'KBO' : 'KVK');
    // Clear search results when country changes
    setSearchResults([]);
    setSearchQuery('');
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
    // Add isFromApi flag: true if company was selected from search results, false if manually entered
    const dataWithVerificationSource = {
      ...data,
      isFromApi: searchResults.some(result => result.kvkNumber === data.kvkNumber),
    };
    onNext(dataWithVerificationSource);
  };

  return (
    <div className='max-w-3xl w-full mx-auto'>
      {/* Header */}
      <div className='mb-11.5 mt-5.5 text-center'>
        <h1 className='text-2xl md:text-4xl font-normal text-slate-900 mb-3'>
          {t('heading')}
        </h1>
        <p className='text-base md:text-lg text-muted-foreground'>
          {t('description')}
        </p>
      </div>

      {/* Country Selector */}
      <div className='mb-8 flex justify-center'>
        <RadioGroup
          value={country}
          onValueChange={(value) => handleCountryChange(value as 'NL' | 'BE')}
          className='flex gap-4'
        >
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='NL' id='nl' />
            <Label htmlFor='nl' className='text-base font-medium cursor-pointer'>
              {t('countryNL')}
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='BE' id='be' />
            <Label htmlFor='be' className='text-base font-medium cursor-pointer'>
              {t('countryBE')}
            </Label>
          </div>
        </RadioGroup>
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
              placeholder={t('searchPlaceholder')}
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
                      {company.businessIdType === 'KBO' ? 'KBO' : 'Bedrijfs ID'}{' '}
                      {company.businessIdFormatted || company.kvkNumber}
                    </p>
                  </div>
                  <Button
                    type='button'
                    onClick={() => handleSelectCompany(company)}
                    className='px-6 py-2.5 text-base rounded-xl font-semibold ml-4 shrink-0'
                    size={null}
                  >
                    {t('selectCompanyButton')}
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
                {t('notFoundButton')}
              </button>
            </div>
          )}

          {/* Loading indicator */}
          {isSearching && (
            <div className='mt-6 text-center text-slate-500'>{t('searching')}</div>
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
                {t('companyNameLabel')}
              </Label>
              <Input
                id='companyName'
                {...register('companyName', {
                  required: t('companyNameRequired'),
                })}
                type='text'
                placeholder={t('companyNamePlaceholder')}
                className='h-14 bg-white border-neutral-300 rounded-lg text-base'
              />
              {errors.companyName && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* Business ID (KVK/KBO Number) */}
            <div>
              <Label
                htmlFor='kvkNumber'
                className='text-base text-slate-900 mb-2 block'
              >
                {country === 'BE' ? t('kboLabel') : t('kvkLabel')}
              </Label>
              <Input
                id='kvkNumber'
                {...register('kvkNumber', {
                  required: country === 'BE' ? t('kboRequired') : t('kvkRequired'),
                  pattern: country === 'BE'
                    ? {
                        value: /^\d{10}$/,
                        message: t('kboInvalid'),
                      }
                    : {
                        value: /^\d{8}$/,
                        message: t('kvkInvalid'),
                      },
                })}
                type='text'
                placeholder={country === 'BE' ? t('kboPlaceholder') : t('kvkPlaceholder')}
                maxLength={country === 'BE' ? 10 : 8}
                className='h-14 bg-white border-neutral-300 rounded-lg text-base'
              />
              {errors.kvkNumber && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.kvkNumber.message}
                </p>
              )}
              {country === 'BE' && (
                <p className='text-sm text-slate-500 mt-1'>
                  {t('kboFormat')}
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
                  {t('postalCodeLabel')}
                </Label>
                <Input
                  id='postalCode'
                  {...register('postalCode', {
                    required: t('postalCodeRequired'),
                  })}
                  type='text'
                  placeholder={t('postalCodePlaceholder')}
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
                  {t('houseNumberLabel')}
                </Label>
                <Input
                  id='houseNumber'
                  {...register('houseNumber', {
                    required: t('houseNumberRequired'),
                  })}
                  type='text'
                  placeholder={t('houseNumberPlaceholder')}
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
                {t('streetLabel')}
              </Label>
              <Input
                id='street'
                {...register('street', {
                  required: t('streetRequired'),
                })}
                type='text'
                placeholder={t('streetPlaceholder')}
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
                {t('cityLabel')}
              </Label>
              <Input
                id='city'
                {...register('city', {
                  required: t('cityRequired'),
                })}
                type='text'
                placeholder={t('cityPlaceholder')}
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

            >
              {t('backButton')}
            </Button>
            <Button
              type='submit'
              className='px-8 py-5 text-lg rounded-xl font-semibold shadow-lg'
              size={null}
            >
              {t('submitButton')}
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
            className='text-lg rounded-xl font-semibold'
          >
            {t('backButton')}
          </Button>
        </div>
      )}
    </div>
  );
}
