'use client';

import { useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MapPin, Locate, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkAreaFormProps {
  onNext: (data: WorkAreaData) => void;
  onBack?: () => void;
}

export interface WorkAreaData {
  location: string;
  latitude: number;
  longitude: number;
  serviceRadius: number;
}

const RADIUS_OPTIONS = [
  { value: 10, label: '10 km' },
  { value: 20, label: '20 km' },
  { value: 30, label: '30 km' },
  { value: 50, label: '+50 km' },
];

export default function WorkAreaForm({ onNext, onBack }: WorkAreaFormProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedRadius, setSelectedRadius] = useState<number>(10);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  // Handle current location button
  const handleGetCurrentLocation = () => {
    setIsLoadingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setCoordinates({ lat, lng });

          // Reverse geocode to get address
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}`
            );
            const data = await response.json();

            if (data.results && data.results[0]) {
              const address = data.results[0].formatted_address;
              setSelectedLocation(address);
              setSearchInput(address);
            }
          } catch (error) {
            console.error('Error reverse geocoding:', error);
          }

          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Kon je locatie niet ophalen. Controleer je browser instellingen.');
          setIsLoadingLocation(false);
        }
      );
    } else {
      alert('Geolocatie wordt niet ondersteund door je browser.');
      setIsLoadingLocation(false);
    }
  };

  // Handle address search
  const handleSearchAddress = async () => {
    if (!searchInput.trim()) return;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchInput
        )}&key=${googleMapsApiKey}`
      );
      const data = await response.json();

      if (data.results && data.results[0]) {
        const result = data.results[0];
        const lat = result.geometry.location.lat;
        const lng = result.geometry.location.lng;

        setCoordinates({ lat, lng });
        setSelectedLocation(result.formatted_address);
      } else {
        alert('Adres niet gevonden. Probeer een ander adres.');
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      alert('Fout bij het zoeken naar het adres.');
    }
  };

  const handleSubmit = () => {
    if (!selectedLocation || !coordinates) {
      alert('Selecteer eerst een werklocatie');
      return;
    }

    onNext({
      location: selectedLocation,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      serviceRadius: selectedRadius,
    });
  };

  // Default map center (Netherlands)
  const defaultCenter = coordinates || { lat: 52.3676, lng: 4.9041 }; // Amsterdam

  return (
    <div className='w-full max-w-7xl mx-auto'>
      <div className='flex flex-col lg:flex-row gap-8 items-cneter'>
        {/* Left Panel - Form */}
        <div className='w-full lg:w-2/5 space-y-6'>
          <div>
            <h1 className='text-2xl md:text-4xl font-normal text-slate-900 mb-3'>
              Waar werk je?
            </h1>
            <p className='text-sm md:text-base text-muted-foreground'>
              Kies je werkbasis en straal. Je kunt dit later altijd aanpassen.
            </p>
          </div>

          {/* Location Search */}
          <div className='space-y-3'>
            <Label className='text-sm md:text-lg text-slate-700'>
              Je werklocatie
            </Label>
            <div className='flex gap-2'>
              <div className='relative flex-1'>
                <MapPin className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                <Input
                  type='text'
                  placeholder='Zoek adres of postcode'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSearchAddress();
                    }
                  }}
                  className='pl-10 py-6 bg-white border-neutral-300 rounded-lg text-base md:text-lg'
                  style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
                />
              </div>
              <Button
                type='button'
                onClick={handleSearchAddress}
                className='px-4 py-6'
                variant='outline'
              >
                Zoek
              </Button>
            </div>
          </div>

          {/* Radius Selection */}
          <div className='space-y-3'>
            <Label className='text-sm md:text-lg text-slate-700'>Straal</Label>
            <div className='flex flex-wrap gap-3'>
              {RADIUS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type='button'
                  onClick={() => setSelectedRadius(option.value)}
                  className={cn(
                    'px-6 py-3 rounded-full text-base font-medium transition-all',
                    selectedRadius === option.value
                      ? 'bg-primary text-white'
                      : 'bg-white text-slate-700 border border-neutral-300 hover:bg-neutral-50'
                  )}
                  style={
                    selectedRadius !== option.value
                      ? { boxShadow: '0px 2px 6.5px 0px #0000001A' }
                      : undefined
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy Message */}
          {selectedLocation && (
            <div className='bg-green-50 border-l-4 border-green-500 p-4 rounded'>
              <p className='text-sm text-green-800 flex items-center gap-2'>
                <span className='text-green-600'>✓</span>
                Jouw exacte adres wordt nooit getoond.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className='flex gap-4 pt-4'>
            {onBack && (
              <Button
                type='button'
                onClick={onBack}
                variant='outline'
                className='px-6 py-4 text-base rounded-2xl'
              >
                Terug
              </Button>
            )}
            <Button
              type='button'
              onClick={handleSubmit}
              className='flex-1 px-6 py-4 text-base md:text-lg rounded-2xl font-semibold'
              disabled={!selectedLocation || !coordinates}
            >
              Naar vakgebieden →
            </Button>
          </div>
        </div>

        {/* Right Panel - Map */}
        <div className='w-full lg:w-3/5 h-[400px] lg:h-[600px] rounded-2xl overflow-hidden relative bg-neutral-100'>
          <APIProvider apiKey={googleMapsApiKey}>
            <Map
              defaultCenter={defaultCenter}
              center={coordinates || defaultCenter}
              defaultZoom={coordinates ? 12 : 7}
              mapId='work-area-map'
              gestureHandling='greedy'
              disableDefaultUI={false}
              zoomControl={true}
              mapTypeControl={false}
              streetViewControl={false}
              fullscreenControl={false}
            >
              {coordinates && (
                <Marker
                  position={coordinates}
                  title={selectedLocation}
                />
              )}
            </Map>
          </APIProvider>

          {/* Map Controls */}
          <div className='absolute top-4 right-4 flex flex-col gap-2'>
            <button
              onClick={handleGetCurrentLocation}
              disabled={isLoadingLocation}
              className='bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-50'
              title='Gebruik huidige locatie'
            >
              {isLoadingLocation ? (
                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
              ) : (
                <Locate className='w-5 h-5' />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}