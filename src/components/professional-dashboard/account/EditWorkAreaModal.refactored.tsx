'use client';

import { useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { Button } from '@/components/ui/button';
import { X, LocateFixed } from 'lucide-react';
import toast from 'react-hot-toast';
import { extractLocationDetails } from '@/lib/utils/address-parser';
import {
  PlacesAutocompleteInput,
  ServiceRadiusMap,
  RadiusSelector,
  useReverseGeocode,
  useCurrentLocation,
} from '@/components/shared/map';
import { useWorkAreaForm, workAreaDataToFormData, formDataToWorkAreaPayload } from '@/lib/hooks/professional/account/useWorkAreaForm';
import { useUpdateWorkArea } from '@/lib/hooks/professional/account/useUpdateWorkArea';
import type { WorkAreaData } from '@/lib/hooks/professional/account/useWorkArea';
import type { PlaceSelection, GoogleAddressComponent } from '@/types/map';

interface EditWorkAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: WorkAreaData | null;
}

export function EditWorkAreaModal({ isOpen, onClose, initialData }: EditWorkAreaModalProps) {
  if (!isOpen) return null;

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <EditWorkAreaModalContent isOpen={isOpen} onClose={onClose} initialData={initialData} />
    </APIProvider>
  );
}

function EditWorkAreaModalContent({ onClose, initialData }: Omit<EditWorkAreaModalProps, 'isOpen'>) {
  // React Hook Form
  const form = useWorkAreaForm({
    defaultValues: initialData ? workAreaDataToFormData(initialData) : undefined,
  });

  const { setValue, watch } = form;

  // React Query mutation
  const updateWorkAreaMutation = useUpdateWorkArea();

  // Extracted hooks
  const { reverseGeocode } = useReverseGeocode();
  const { getCurrentLocation, isLoading: isLoadingLocation } = useCurrentLocation();

  // UI state
  const [inputValue, setInputValue] = useState(initialData?.work_address || '');
  const [addressComponents, setAddressComponents] = useState<GoogleAddressComponent[]>([]);

  // Watch form values
  const latitude = watch('latitude');
  const longitude = watch('longitude');
  const serviceRadius = watch('serviceRadius');

  // Handlers
  const handlePlaceSelect = (place: PlaceSelection) => {
    setValue('location', place.address);
    setValue('latitude', place.lat);
    setValue('longitude', place.lng);
    setInputValue(place.address);

    if (place.addressComponents) {
      setAddressComponents(place.addressComponents);
    }
  };

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

    // Update via React Query mutation
    updateWorkAreaMutation.mutate(
      {
        work_address: location,
        work_postal_code: postalCode,
        work_city: city,
        work_country: country,
        work_latitude: lat,
        work_longitude: lng,
        service_radius_km: serviceRadius,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-auto'>
        {/* Header */}
        <div className='sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10'>
          <h2 className='text-2xl font-semibold text-slate-900'>Werkgebied bewerken</h2>
          <button
            onClick={onClose}
            className='text-slate-500 hover:text-slate-900 transition-colors'
            aria-label='Sluiten'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6'>
          <div className='flex flex-col lg:flex-row gap-8'>
            {/* Left Panel */}
            <div className='w-full lg:w-[40%] space-y-6'>
              {/* Location Search */}
              <div className='space-y-3'>
                <PlacesAutocompleteInput
                  onPlaceSelect={handlePlaceSelect}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  placeholder='Zoek adres of postcode'
                  variant='compact'
                />
              </div>

              {/* Radius Selection */}
              <RadiusSelector
                selectedRadius={serviceRadius}
                onRadiusChange={(radius) => setValue('serviceRadius', radius)}
                label='Straal'
                variant='compact'
              />

              {/* Current Location Button */}
              <Button
                type='button'
                variant='outline'
                className='w-full flex items-center gap-2'
                onClick={handleGetCurrentLocation}
                disabled={isLoadingLocation || updateWorkAreaMutation.isPending}
              >
                <LocateFixed className='w-5 h-5' />
                {isLoadingLocation ? 'Locatie ophalen...' : 'Gebruik huidige locatie'}
              </Button>
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
                className='w-full h-[500px] rounded-xl overflow-hidden'
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='sticky bottom-0 bg-white border-t p-6 flex justify-end gap-4'>
          <Button
            type='button'
            variant='outline'
            onClick={onClose}
            disabled={updateWorkAreaMutation.isPending}
          >
            Annuleren
          </Button>
          <Button
            type='button'
            onClick={handleSubmit}
            disabled={updateWorkAreaMutation.isPending}
          >
            {updateWorkAreaMutation.isPending ? 'Opslaan...' : 'Opslaan'}
          </Button>
        </div>
      </div>
    </div>
  );
}
