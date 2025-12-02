'use client';

import { useState, useEffect, useCallback } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { Button } from '@/components/ui/button';
import { LocateFixed, Compass } from 'lucide-react';
import toast from 'react-hot-toast';
import { extractLocationDetails } from '@/lib/utils/address-parser';
import {
  PlacesAutocompleteInput,
  ServiceRadiusMap,
  RadiusSelector,
  useReverseGeocode,
  useCurrentLocation,
} from '@/components/shared/map';
import { useWorkAreaForm, workAreaDataToFormData } from '@/lib/hooks/professional/account/useWorkAreaForm';
import { useWorkArea } from '@/lib/hooks/professional/account/useWorkArea';
import type { PlaceSelection, GoogleAddressComponent } from '@/types/map';

interface WorkAreaFormProps {
  onNext: (data: WorkAreaData) => void;
  onBack?: () => void;
  initialData?: WorkAreaData | null;
}

export interface WorkAreaData {
  location: string;
  latitude: number;
  longitude: number;
  serviceRadius: number;
  postalCode: string | null;
  city: string | null;
  country: string | null;
}

export function WorkAreaForm({ onNext, onBack, initialData }: WorkAreaFormProps) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <WorkAreaFormContent onNext={onNext} onBack={onBack} initialData={initialData} />
    </APIProvider>
  );
}

function WorkAreaFormContent({ onNext, onBack, initialData }: WorkAreaFormProps) {
  // React Hook Form
  const form = useWorkAreaForm({
    defaultValues: initialData
      ? workAreaDataToFormData({
          work_address: initialData.location,
          work_postal_code: initialData.postalCode,
          work_city: initialData.city,
          work_country: initialData.country,
          work_latitude: initialData.latitude,
          work_longitude: initialData.longitude,
          service_radius_km: initialData.serviceRadius,
        })
      : undefined,
  });

  const { setValue, watch } = form;

  // Fetch saved work area data
  const { data: savedData } = useWorkArea();

  // Extracted hooks
  const { reverseGeocode } = useReverseGeocode();
  const { getCurrentLocation, isLoading: isLoadingLocation } = useCurrentLocation();

  // UI state
  const [inputValue, setInputValue] = useState(initialData?.location || '');
  const [addressComponents, setAddressComponents] = useState<GoogleAddressComponent[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Watch form values
  const latitude = watch('latitude');
  const longitude = watch('longitude');
  const serviceRadius = watch('serviceRadius');

  // Handlers
  const handlePlaceSelect = useCallback((place: PlaceSelection) => {
    setValue('location', place.address);
    setValue('latitude', place.lat);
    setValue('longitude', place.lng);
    setInputValue(place.address);

    if (place.addressComponents) {
      setAddressComponents(place.addressComponents);
    }
  }, [setValue]);

  // Auto-load saved data or current location on mount
  useEffect(() => {
    const initializeLocation = async () => {
      // If we already have initialData (user clicked back), use that
      if (initialData) {
        setIsInitialLoad(false);
        return;
      }

      // Try to fetch from database first
      if (savedData?.saved && savedData.data) {
        const data = savedData.data;
        setValue('location', data.work_address);
        setValue('latitude', data.work_latitude);
        setValue('longitude', data.work_longitude);
        setValue('serviceRadius', data.service_radius_km || 10);
        setValue('postalCode', data.work_postal_code);
        setValue('city', data.work_city);
        setValue('country', data.work_country);
        setInputValue(data.work_address);
        setIsInitialLoad(false);
        return;
      }

      // No saved location, automatically get current location
      getCurrentLocation(async (lat, lng) => {
        const result = await reverseGeocode(lat, lng);
        if (result) {
          handlePlaceSelect({
            address: result.address,
            lat,
            lng,
            addressComponents: result.addressComponents,
          });
        }
      });

      setIsInitialLoad(false);
    };

    if (isInitialLoad) {
      initializeLocation();
    }
  }, [isInitialLoad, initialData, savedData, setValue, getCurrentLocation, reverseGeocode, handlePlaceSelect]);

  const handleMapClick = async (lat: number, lng: number) => {
    setInputValue('Adres ophalen...');

    const result = await reverseGeocode(lat, lng);
    if (result) {
      handlePlaceSelect({
        address: result.address,
        lat,
        lng,
        addressComponents: result.addressComponents,
      });
    } else {
      setInputValue('');
      toast.error('Kon adres niet ophalen voor deze locatie');
    }
  };

  const handleGetCurrentLocation = () => {
    setInputValue('Huidige locatie ophalen...');
    getCurrentLocation(handleMapClick);
  };

  const handleSubmit = () => {
    const location = watch('location');
    const lat = watch('latitude');
    const lng = watch('longitude');

    if (!location || !lat || !lng) {
      toast.error('Selecteer eerst een werklocatie');
      return;
    }

    // Extract postal code, city, and country using utility
    const { postalCode, city, country } = extractLocationDetails(location, addressComponents);

    onNext({
      location,
      latitude: lat,
      longitude: lng,
      serviceRadius,
      postalCode,
      city,
      country,
    });
  };

  return (
    <div className='w-full max-w-[1400px] mx-auto px-4'>
      <div
        className='bg-white/95 rounded-3xl p-6 lg:p-10'
        style={{ boxShadow: '0px 12px 36px 0px #023AA21F' }}
      >
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Left Panel - Form */}
          <div className='w-full lg:w-[40%] space-y-13'>
            <div>
              <h1 className='text-2xl md:text-4xl font-normal text-slate-900 mb-3'>
                Waar werk je?
              </h1>
              <p className='text-base md:text-lg text-muted-foreground'>
                Geef je werklocatie aan
              </p>
            </div>

            {/* Location Search */}
            <div className='space-y-3'>
              <PlacesAutocompleteInput
                onPlaceSelect={handlePlaceSelect}
                inputValue={inputValue}
                setInputValue={setInputValue}
                placeholder='Zoek adres of postcode'
                variant='default'
              />
            </div>

            {/* Radius Selection */}
            <RadiusSelector
              selectedRadius={serviceRadius}
              onRadiusChange={(radius) => setValue('serviceRadius', radius)}
              label='Straal'
              variant='default'
            />

            {/* Current Location Button */}
            <Button
              type='button'
              variant='outline'
              className='w-full flex items-center gap-2'
              onClick={handleGetCurrentLocation}
              disabled={isLoadingLocation}
            >
              <LocateFixed className='w-5 h-5' />
              {isLoadingLocation ? 'Locatie ophalen...' : 'Gebruik huidige locatie'}
            </Button>

            {/* Privacy Message */}
            <div className='bg-emerald-50 p-4 border border-accent rounded-md'>
              <p className='text-base text-emerald-800 flex items-center gap-2'>
                <Compass className='w-6 h-6' />
                Jouw exacte adres wordt nooit getoond.
              </p>
            </div>
          </div>

          {/* Right Panel - Map */}
          <div className='w-full lg:w-[60%]'>
            <ServiceRadiusMap
              center={{
                lat: latitude || 52.3676,
                lng: longitude || 4.9041,
              }}
              radius={serviceRadius}
              onClick={handleMapClick}
              showZoomControls
              mapTypeId='terrain'
              className='w-full h-[450px] lg:h-[500px] rounded-2xl overflow-hidden'
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className='flex gap-4 mt-8'>
          {onBack && (
            <Button type='button' variant='outline' onClick={onBack} className='flex-1 lg:flex-initial'>
              ← Terug
            </Button>
          )}
          <Button
            type='button'
            onClick={handleSubmit}
            className='flex-1 lg:flex-initial'
          >
            Naar vakgebieden →
          </Button>
        </div>
      </div>
    </div>
  );
}
