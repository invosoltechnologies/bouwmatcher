'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { APIProvider, Map, Marker, useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LocateFixed, Compass, Search, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { extractLocationDetails, type GoogleAddressComponent } from '@/lib/utils/address-parser';
import { useTranslations } from 'next-intl';

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

const RADIUS_OPTIONS = [
  { value: 10, key: 'radius10' },
  { value: 20, key: 'radius20' },
  { value: 30, key: 'radius30' },
  { value: 50, key: 'radius50' },
] as const;

function PlacesAutocompleteInput({
  onPlaceSelect,
  inputValue,
  setInputValue,
  t,
}: {
  onPlaceSelect: (place: { address: string; lat: number; lng: number; addressComponents?: GoogleAddressComponent[] }) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  t: (key: string) => string;
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
        componentRestrictions: { country: ['nl', 'be'] }, // Netherlands and Belgium
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

    // Get place details including coordinates and address components
    placesService.getDetails(
      {
        placeId: placeId,
        fields: ['geometry', 'formatted_address', 'address_components'],
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const address = place.formatted_address || description;
          const addressComponents = place.address_components as GoogleAddressComponent[] | undefined;

          setInputValue(address);
          setSuggestions([]);
          onPlaceSelect({ address, lat, lng, addressComponents });
        }
      }
    );
  };

  const handleSearch = () => {
    if (!inputValue.trim()) {
      toast.error(t('enterLocation'));
      return;
    }

    if (!autocompleteService) return;

    setIsSearching(true);

    autocompleteService.getPlacePredictions(
      {
        input: inputValue,
        componentRestrictions: { country: ['nl', 'be'] },
      },
      (predictions, status) => {
        setIsSearching(false);

        if (status === google.maps.places.PlacesServiceStatus.OK && predictions && predictions.length > 0) {
          // Auto-select first result
          handleSelectSuggestion(predictions[0].place_id, predictions[0].description);
        } else {
          toast.error(t('noResults'));
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
          placeholder={t('searchPlaceholder')}
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // Pan map to center when coordinates change
  useEffect(() => {
    if (!map || !center.lat || !center.lng) return;

    // Don't pan if it's the default Netherlands center
    if (center.lat === 52.3676 && center.lng === 4.9041) return;

    // Pan to the new center with smooth animation
    map.panTo({ lat: center.lat, lng: center.lng });

    // Set appropriate zoom level if user has selected a location
    const currentZoom = map.getZoom();
    if (!currentZoom || currentZoom < 11) {
      map.setZoom(13);
    }
  }, [map, center]);

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

function WorkAreaFormContent({ onNext, initialData }: WorkAreaFormProps) {
  const t = useTranslations('auth.register.workArea');
  const [selectedLocation, setSelectedLocation] = useState<string>(initialData?.location || '');
  const [inputValue, setInputValue] = useState<string>(initialData?.location || '');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(
    initialData ? { lat: initialData.latitude, lng: initialData.longitude } : null
  );
  const [addressComponents, setAddressComponents] = useState<GoogleAddressComponent[]>([]);
  const [selectedRadius, setSelectedRadius] = useState<number>(initialData?.serviceRadius || 10);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [mapTypeId, setMapTypeId] = useState<'roadmap' | 'satellite' | 'terrain'>('terrain');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const reverseGeocode = useCallback(
    async (lat: number, lng: number) => {
      try {
        console.log('Reverse geocoding coordinates:', lat, lng);

        const response = await fetch(`/api/geocode?lat=${lat}&lng=${lng}`);
        const data = await response.json();

        console.log('Geocoding API response:', data);

        if (response.ok && data.address) {
          console.log('Successfully got address:', data.address);
          return {
            address: data.address,
            addressComponents: data.addressComponents || [],
          };
        } else {
          console.error('No results in geocoding response. Status:', data.status);
          console.error('Full response:', data);
        }
      } catch (error) {
        console.error('Error reverse geocoding:', error);
        toast.error(t('addressError'));
      }
      return null;
    },
    [t]
  );

  // Fetch saved location from database or get current location on initial load
  useEffect(() => {
    const initializeLocation = async () => {
      // If we already have initialData (user clicked back), use that
      if (initialData) {
        setIsInitialLoad(false);
        return;
      }

      // Try to fetch from database first
      try {
        const response = await fetch('/api/registration/work-area');

        if (response.ok) {
          const result = await response.json();

          if (result.saved && result.data) {
            // User has saved location, use it
            setSelectedLocation(result.data.work_address);
            setInputValue(result.data.work_address);
            setCoordinates({
              lat: Number(result.data.work_latitude),
              lng: Number(result.data.work_longitude),
            });
            setSelectedRadius(result.data.service_radius_km || 10);
            setIsInitialLoad(false);
            return;
          }
        }
      } catch (error) {
        console.error('Error fetching saved location:', error);
      }

      // No saved location, automatically get current location
      if (navigator.geolocation) {
        setIsLoadingLocation(true);
        setInputValue(t('gettingLocation'));

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            setCoordinates({ lat, lng });
            setInputValue(t('gettingAddress'));

            try {
              const result = await reverseGeocode(lat, lng);
              if (result) {
                setSelectedLocation(result.address);
                setInputValue(result.address);
                setAddressComponents(result.addressComponents);
                toast.success(t('locationFound'));
              }
            } catch (error) {
              console.error('Error getting address:', error);
              setInputValue('');
            }

            setIsLoadingLocation(false);
            setIsInitialLoad(false);
          },
          (error) => {
            // Handle geolocation errors gracefully
            setInputValue('');
            setIsLoadingLocation(false);
            setIsInitialLoad(false);

            // Show user-friendly message based on error code
            if (error.code === error.PERMISSION_DENIED) {
              // User denied location access - this is fine, they can enter manually
              toast(t('locationPermissionDenied'), { icon: 'ℹ️' });
            } else if (error.code === error.POSITION_UNAVAILABLE) {
              toast.error(t('locationUnavailable'));
            } else if (error.code === error.TIMEOUT) {
              toast.error(t('locationTimeout'));
            }
          }
        );
      } else {
        setIsInitialLoad(false);
      }
    };

    if (isInitialLoad) {
      initializeLocation();
    }
  }, [isInitialLoad, initialData, reverseGeocode]);

  const handlePlaceSelect = useCallback(
    (place: { address: string; lat: number; lng: number; addressComponents?: GoogleAddressComponent[] }) => {
      setSelectedLocation(place.address);
      setInputValue(place.address);
      setCoordinates({ lat: place.lat, lng: place.lng });
      if (place.addressComponents) {
        setAddressComponents(place.addressComponents);
      }
    },
    []
  );

  const handleMapClick = useCallback(
    async (lat: number, lng: number) => {
      setCoordinates({ lat, lng });

      // Show loading state
      setInputValue(t('gettingAddress'));

      const result = await reverseGeocode(lat, lng);
      if (result) {
        setSelectedLocation(result.address);
        setInputValue(result.address);
        setAddressComponents(result.addressComponents);
      } else {
        setInputValue('');
        toast.error(t('couldNotGetAddress'));
      }
    },
    [reverseGeocode, t]
  );

  // Handle current location button
  const handleGetCurrentLocation = () => {
    setIsLoadingLocation(true);
    setInputValue(t('gettingLocation'));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          console.log('Got coordinates:', lat, lng);

          setCoordinates({ lat, lng });
          setInputValue(t('gettingAddress'));

          try {
            const result = await reverseGeocode(lat, lng);
            console.log('Got address:', result);

            if (result) {
              setSelectedLocation(result.address);
              setInputValue(result.address);
              setAddressComponents(result.addressComponents);
              toast.success(t('locationFound'));
            } else {
              setInputValue('');
              toast.error(t('couldNotGetAddress'));
            }
          } catch (error) {
            console.error('Reverse geocode error:', error);
            setInputValue('');
            toast.error(t('addressError'));
          }

          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setInputValue('');
          toast.error(t('locationError'));
          setIsLoadingLocation(false);
        }
      );
    } else {
      setInputValue('');
      toast.error(t('geolocationNotSupported'));
      setIsLoadingLocation(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedLocation || !coordinates) {
      toast.error(t('selectLocation'));
      return;
    }

    // Extract postal code, city, and country using the utility function
    const { postalCode, city, country } = extractLocationDetails(selectedLocation, addressComponents);

    onNext({
      location: selectedLocation,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      serviceRadius: selectedRadius,
      postalCode,
      city,
      country,
    });
  };

  // Default map center (Netherlands)
  const defaultCenter = coordinates || { lat: 52.3676, lng: 4.9041 };

  return (
    <div className='w-full px-4'>
      {/* Main Card */}
      <div
        className='bg-white/95 rounded-3xl overflow-hidden'
        style={{ boxShadow: '0px 12px 36px 0px #023AA21F' }}
      >
        {/* Map Panel - Top on mobile, full width */}
        <div className='w-full h-[300px] sm:h-[350px] lg:h-[450px] overflow-hidden relative'>
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
              title={`${t('switchToMap')} ${
                mapTypeId === 'roadmap'
                  ? t('mapTypeSatellite')
                  : mapTypeId === 'satellite'
                  ? t('mapTypeTerrain')
                  : t('mapTypeRoadmap')
              }`}
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

        {/* Form Panel - Below map */}
        <div className='p-4 sm:p-6 pt-10 lg:p-8 space-y-6'>
          {/* Header */}
          <div className='text-center sm:text-left'>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 mb-2'>
              {t('heading')}
            </h1>
            <p className='text-sm sm:text-base lg:text-lg text-muted-foreground'>
              {t('description')}
            </p>
          </div>

          {/* Location Search */}
          <div className='space-y-2 sm:space-y-3'>
            <Label className='text-sm sm:text-base lg:text-lg text-slate-900'>
              {t('locationLabel')}
            </Label>
            <PlacesAutocompleteInput
              onPlaceSelect={handlePlaceSelect}
              inputValue={inputValue}
              setInputValue={setInputValue}
              t={t}
            />
          </div>

          {/* Radius Selection */}
          <div className='space-y-2 sm:space-y-3'>
            <Label className='text-sm sm:text-base lg:text-lg text-slate-900'>
              {t('radiusLabel')}
            </Label>
            <div className='flex flex-wrap gap-2 sm:gap-3'>
              {RADIUS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type='button'
                  onClick={() => setSelectedRadius(option.value)}
                  className={cn(
                    'px-3.5 sm:px-6 py-2 sm:py-3 cursor-pointer rounded-full text-sm sm:text-base font-medium transition-all',
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
                  {t(option.key)}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy Message - Always visible */}
          <div className='bg-emerald-50 p-3 sm:p-4 border border-accent rounded-md'>
            <p className='text-sm sm:text-base text-emerald-800 flex items-start gap-2'>
              <Compass className='w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5' />
              <span>{t('privacyMessage')}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className='flex justify-end mt-4 sm:mt-6 px-4'>
        <Button
          type='button'
          onClick={handleSubmit}
          className='px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl font-semibold shadow-lg'
          disabled={!selectedLocation || !coordinates}
          size={null}
        >
          {t('submitButton')}
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
