'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { APIProvider, Map, Marker, useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LocateFixed, Compass, Search, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import toast from 'react-hot-toast';

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

function PlacesAutocompleteInput({
  onPlaceSelect,
  inputValue,
  setInputValue,
}: {
  onPlaceSelect: (place: { address: string; lat: number; lng: number }) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}) {
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const places = useMapsLibrary('places');
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    if (!places) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(document.createElement('div')));
  }, [places]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (!autocompleteService || !value) {
      setSuggestions([]);
      return;
    }

    // Get autocomplete predictions
    autocompleteService.getPlacePredictions(
      {
        input: value,
        componentRestrictions: { country: 'nl' }, // Netherlands only
      },
      (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
        }
      }
    );
  };

  const handleSelectSuggestion = (placeId: string, description: string) => {
    if (!placesService) return;

    // Get place details including coordinates
    placesService.getDetails(
      {
        placeId: placeId,
        fields: ['geometry', 'formatted_address'],
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const address = place.formatted_address || description;

          setInputValue(address);
          setSuggestions([]);
          onPlaceSelect({ address, lat, lng });
        }
      }
    );
  };

  const handleSearch = () => {
    if (!inputValue.trim()) {
      toast.error('Voer een locatie in');
      return;
    }

    if (!autocompleteService) return;

    setIsSearching(true);

    autocompleteService.getPlacePredictions(
      {
        input: inputValue,
        componentRestrictions: { country: 'nl' },
      },
      (predictions, status) => {
        setIsSearching(false);

        if (status === google.maps.places.PlacesServiceStatus.OK && predictions && predictions.length > 0) {
          // Auto-select first result
          handleSelectSuggestion(predictions[0].place_id, predictions[0].description);
        } else {
          toast.error('Geen resultaten gevonden. Probeer een andere zoekopdracht.');
        }
      }
    );
  };

  return (
    <div className='relative'>
      <div className='relative'>
        <Image
          src='/icons/map-pin.svg'
          alt='Map Pin'
          width={9}
          height={16}
          className='absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none'
        />
        <button
          type='button'
          onClick={handleSearch}
          disabled={isSearching}
          className='absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors disabled:opacity-50'
          title='Zoek locatie'
        >
          {isSearching ? (
            <div className='w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin' />
          ) : (
            <Search className='w-5 h-5' />
          )}
        </button>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
          placeholder='Zoek adres of postcode'
          className='w-full pl-10 pr-12 py-4 bg-white border border-neutral-300 rounded-lg text-base md:text-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
          style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
        />
      </div>

      {/* Autocomplete Dropdown */}
      {suggestions.length > 0 && (
        <ul className='absolute z-50 w-full mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-60 overflow-auto'>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() =>
                handleSelectSuggestion(
                  suggestion.place_id,
                  suggestion.description
                )
              }
              className='px-4 py-3 hover:bg-neutral-50 cursor-pointer border-b border-neutral-100 last:border-b-0'
            >
              <div className='flex items-center gap-2'>
                <Image
                  src='/icons/map-pin.svg'
                  alt='Map Pin'
                  width={9}
                  height={16}
                />

                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-slate-900 truncate'>
                    {suggestion.structured_formatting.main_text}
                  </p>
                  <p className='text-xs text-slate-500 truncate'>
                    {suggestion.structured_formatting.secondary_text}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MapComponent({
  center,
  mapTypeId,
  onClick,
  radius,
  children,
}: {
  center: { lat: number; lng: number };
  mapTypeId: 'roadmap' | 'satellite' | 'terrain';
  onClick: (lat: number, lng: number) => void;
  radius: number;
  children?: React.ReactNode;
}) {
  const map = useMap();
  const [zoom, setZoom] = useState(6);
  const circleRef = useRef<google.maps.Circle | null>(null);

  useEffect(() => {
    if (!map) return;

    const listener = map.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        onClick(e.latLng.lat(), e.latLng.lng());
      }
    });

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [map, onClick]);

  useEffect(() => {
    if (map) {
      const zoomListener = map.addListener('zoom_changed', () => {
        setZoom(map.getZoom() || 6);
      });

      return () => {
        google.maps.event.removeListener(zoomListener);
      };
    }
  }, [map]);

  // Draw circle for service radius
  useEffect(() => {
    if (!map || !center.lat || !center.lng) return;

    // Remove existing circle if any
    if (circleRef.current) {
      circleRef.current.setMap(null);
    }

    // Only show circle if coordinates are selected (not default Netherlands center)
    if (center.lat === 52.3676 && center.lng === 4.9041) return;

    // Create new circle
    circleRef.current = new google.maps.Circle({
      map,
      center: { lat: center.lat, lng: center.lng },
      radius: radius * 1000, // Convert km to meters
      strokeColor: '#023AA2', // Primary color
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#023AA2', // Primary color
      fillOpacity: 0.15,
    });

    return () => {
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }
    };
  }, [map, center, radius]);

  const handleZoomIn = () => {
    if (map) {
      map.setZoom((map.getZoom() || 6) + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.setZoom((map.getZoom() || 6) - 1);
    }
  };

  return (
    <>
      {children}
      {/* Zoom Controls */}
      <div className='absolute bottom-4 right-3 flex flex-col gap-2'>
        <button
          onClick={handleZoomIn}
          className='bg-white text-slate-900 p-2 rounded-lg shadow-lg hover:bg-neutral-50 transition-colors'
          title='Zoom in'
        >
          <Plus className='w-5 h-5' />
        </button>
        <button
          onClick={handleZoomOut}
          className='bg-white text-slate-900 p-2 rounded-lg shadow-lg hover:bg-neutral-50 transition-colors'
          title='Zoom out'
        >
          <Minus className='w-5 h-5' />
        </button>
      </div>
    </>
  );
}

function WorkAreaFormContent({ onNext }: WorkAreaFormProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedRadius, setSelectedRadius] = useState<number>(10);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [mapTypeId, setMapTypeId] = useState<'roadmap' | 'satellite' | 'terrain'>('terrain');

  const reverseGeocode = useCallback(
    async (lat: number, lng: number) => {
      try {
        console.log('Reverse geocoding coordinates:', lat, lng);

        const response = await fetch(`/api/geocode?lat=${lat}&lng=${lng}`);
        const data = await response.json();

        console.log('Geocoding API response:', data);

        if (response.ok && data.address) {
          console.log('Successfully got address:', data.address);
          return data.address;
        } else {
          console.error('No results in geocoding response. Status:', data.status);
          console.error('Full response:', data);
        }
      } catch (error) {
        console.error('Error reverse geocoding:', error);
        toast.error('Fout bij het ophalen van het adres');
      }
      return null;
    },
    []
  );

  const handlePlaceSelect = useCallback(
    (place: { address: string; lat: number; lng: number }) => {
      setSelectedLocation(place.address);
      setInputValue(place.address);
      setCoordinates({ lat: place.lat, lng: place.lng });
    },
    []
  );

  const handleMapClick = useCallback(
    async (lat: number, lng: number) => {
      setCoordinates({ lat, lng });

      // Show loading state
      setInputValue('Adres ophalen...');

      const address = await reverseGeocode(lat, lng);
      if (address) {
        setSelectedLocation(address);
        setInputValue(address);
      } else {
        setInputValue('');
        toast.error('Kon adres niet ophalen voor deze locatie');
      }
    },
    [reverseGeocode]
  );

  // Handle current location button
  const handleGetCurrentLocation = () => {
    setIsLoadingLocation(true);
    setInputValue('Huidige locatie ophalen...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          console.log('Got coordinates:', lat, lng);

          setCoordinates({ lat, lng });
          setInputValue('Adres ophalen...');

          try {
            const address = await reverseGeocode(lat, lng);
            console.log('Got address:', address);

            if (address) {
              setSelectedLocation(address);
              setInputValue(address);
              toast.success('Locatie gevonden!');
            } else {
              setInputValue('');
              toast.error('Kon geen adres vinden voor deze locatie');
            }
          } catch (error) {
            console.error('Reverse geocode error:', error);
            setInputValue('');
            toast.error('Fout bij ophalen adres');
          }

          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setInputValue('');
          toast.error('Kon je locatie niet ophalen. Controleer je browser instellingen.');
          setIsLoadingLocation(false);
        }
      );
    } else {
      setInputValue('');
      toast.error('Geolocatie wordt niet ondersteund door je browser.');
      setIsLoadingLocation(false);
    }
  };

  const handleSubmit = () => {
    if (!selectedLocation || !coordinates) {
      toast.error('Selecteer eerst een werklocatie');
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
  const defaultCenter = coordinates || { lat: 52.3676, lng: 4.9041 };

  return (
    <div className='w-full max-w-[1400px] mx-auto px-4'>
      {/* Main Card */}
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
                Kies je werkbasis en straal. Je kunt dit later altijd aanpassen.
              </p>
            </div>

            {/* Location Search */}
            <div className='space-y-3'>
              <Label className='text-sm md:text-lg text-slate-900'>
                Je werklocatie
              </Label>
              <PlacesAutocompleteInput
                onPlaceSelect={handlePlaceSelect}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </div>

            {/* Radius Selection */}
            <div className='space-y-3'>
              <Label className='text-sm md:text-lg text-slate-900'>Straal</Label>
              <div className='flex flex-wrap gap-3'>
                {RADIUS_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type='button'
                    onClick={() => setSelectedRadius(option.value)}
                    className={cn(
                      'px-6 py-3 cursor-pointer rounded-full text-base font-medium transition-all',
                      selectedRadius === option.value
                        ? 'bg-primary text-white'
                        : 'bg-white text-slate-900 border border-neutral-300 hover:border-primary'
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

            {/* Privacy Message - Always visible */}
            <div className='bg-emerald-50 p-4 border border-accent rounded-md'>
              <p className='text-base text-emerald-800 flex items-center gap-2'>
                <Compass className='w-6 h-6' />
                Jouw exacte adres wordt nooit getoond.
              </p>
            </div>
          </div>

          {/* Right Panel - Map */}
          <div className='w-full lg:w-[60%] h-[450px] lg:h-[500px] rounded-2xl overflow-hidden relative'>
            <Map
              defaultCenter={defaultCenter}
              defaultZoom={coordinates ? 11 : 6}
              mapId='bf51a910020fa25a'
              gestureHandling='greedy'
              disableDefaultUI={true}
              mapTypeId={mapTypeId}
              clickableIcons={false}
            >
              <MapComponent
                center={coordinates || defaultCenter}
                mapTypeId={mapTypeId}
                onClick={handleMapClick}
                radius={selectedRadius}
              >
                {coordinates && (
                  <Marker position={coordinates} title={selectedLocation} />
                )}
              </MapComponent>
            </Map>

            {/* Top Right Controls */}
            <div className='absolute top-3 right-3 flex flex-col gap-2'>
              <button
                onClick={handleGetCurrentLocation}
                disabled={isLoadingLocation}
                className='bg-primary text-white p-2.5 rounded-lg shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-50'
                title='Gebruik huidige locatie'
              >
                {isLoadingLocation ? (
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                ) : (
                  <LocateFixed className='w-5 h-5' />
                )}
              </button>

              {/* Map Type Toggle */}
              <button
                onClick={() =>
                  setMapTypeId((prev) =>
                    prev === 'roadmap'
                      ? 'satellite'
                      : prev === 'satellite'
                        ? 'terrain'
                        : 'roadmap'
                  )
                }
                className='bg-white text-slate-900 p-2.5 rounded-lg shadow-lg hover:bg-neutral-50 transition-colors'
                title={`Schakel naar ${mapTypeId === 'roadmap' ? 'satelliet' : mapTypeId === 'satellite' ? 'terrein' : 'kaart'}`}
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className='flex justify-end mt-6 px-2'>
        <Button
          type='button'
          onClick={handleSubmit}
          className='px-8 py-5 text-lg rounded-xl font-semibold shadow-lg'
          disabled={!selectedLocation || !coordinates}
          size={null}
        >
          Naar vakgebieden →
        </Button>
      </div>
    </div>
  );
}

export default function WorkAreaForm(props: WorkAreaFormProps) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  return (
    <APIProvider apiKey={googleMapsApiKey} libraries={['places']}>
      <WorkAreaFormContent {...props} />
    </APIProvider>
  );
}
