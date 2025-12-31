'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { APIProvider, Map, Marker, useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LocateFixed, Compass, Search, Plus, Minus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useUpdateWorkArea } from '@/lib/hooks/professional/account/useUpdateWorkArea';
import type { WorkAreaData } from '@/lib/hooks/professional/account/useWorkArea';
import { extractLocationDetails, type GoogleAddressComponent } from '@/lib/utils/address-parser';

interface EditWorkAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: WorkAreaData | null;
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
  onPlaceSelect: (place: { address: string; lat: number; lng: number; addressComponents?: GoogleAddressComponent[] }) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}) {
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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

    autocompleteService.getPlacePredictions(
      {
        input: value,
        componentRestrictions: { country: ['nl', 'be'] },
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
      toast.error('Voer een locatie in');
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
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
          placeholder='Zoek adres of postcode'
          className='w-full pl-10 pr-12 py-3 bg-white border border-neutral-300 rounded-lg text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
        />
      </div>

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
  onClick,
  radius,
  children,
}: {
  center: { lat: number; lng: number };
  onClick: (lat: number, lng: number) => void;
  radius: number;
  children?: React.ReactNode;
}) {
  const map = useMap();
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
    if (!map || !center.lat || !center.lng) return;

    if (center.lat === 52.3676 && center.lng === 4.9041) return;

    map.panTo({ lat: center.lat, lng: center.lng });

    const currentZoom = map.getZoom();
    if (!currentZoom || currentZoom < 11) {
      map.setZoom(13);
    }
  }, [map, center]);

  useEffect(() => {
    if (!map || !center.lat || !center.lng) return;

    if (circleRef.current) {
      circleRef.current.setMap(null);
    }

    if (center.lat === 52.3676 && center.lng === 4.9041) return;

    circleRef.current = new google.maps.Circle({
      map,
      center: { lat: center.lat, lng: center.lng },
      radius: radius * 1000,
      strokeColor: '#023AA2',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#023AA2',
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

function EditWorkAreaModalContent({ isOpen, onClose, initialData }: EditWorkAreaModalProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>(initialData?.work_address || '');
  const [inputValue, setInputValue] = useState<string>(initialData?.work_address || '');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(
    initialData ? { lat: Number(initialData.work_latitude), lng: Number(initialData.work_longitude) } : null
  );
  const [addressComponents, setAddressComponents] = useState<GoogleAddressComponent[]>([]);
  const [selectedRadius, setSelectedRadius] = useState<number>(initialData?.service_radius_km || 10);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const updateWorkAreaMutation = useUpdateWorkArea();

  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    try {
      const response = await fetch(`/api/geocode?lat=${lat}&lng=${lng}`);
      const data = await response.json();

      if (response.ok && data.address) {
        return {
          address: data.address,
          addressComponents: data.addressComponents || [],
        };
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      toast.error('Fout bij het ophalen van het adres');
    }
    return null;
  }, []);

  const handlePlaceSelect = useCallback((place: { address: string; lat: number; lng: number; addressComponents?: GoogleAddressComponent[] }) => {
    setSelectedLocation(place.address);
    setInputValue(place.address);
    setCoordinates({ lat: place.lat, lng: place.lng });
    if (place.addressComponents) {
      setAddressComponents(place.addressComponents);
    }
  }, []);

  const handleMapClick = useCallback(
    async (lat: number, lng: number) => {
      setCoordinates({ lat, lng });
      setInputValue('Adres ophalen...');

      const result = await reverseGeocode(lat, lng);
      if (result) {
        setSelectedLocation(result.address);
        setInputValue(result.address);
        setAddressComponents(result.addressComponents);
      } else {
        setInputValue('');
        toast.error('Kon adres niet ophalen voor deze locatie');
      }
    },
    [reverseGeocode]
  );

  const handleGetCurrentLocation = () => {
    setIsLoadingLocation(true);
    setInputValue('Huidige locatie ophalen...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setCoordinates({ lat, lng });
          setInputValue('Adres ophalen...');

          try {
            const result = await reverseGeocode(lat, lng);
            if (result) {
              setSelectedLocation(result.address);
              setInputValue(result.address);
              setAddressComponents(result.addressComponents);
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

  const handleSubmit = async () => {
    if (!selectedLocation || !coordinates) {
      toast.error('Selecteer eerst een werklocatie');
      return;
    }

    // Extract postal code, city, and country using the utility function
    const { postalCode, city, country } = extractLocationDetails(selectedLocation, addressComponents);

    updateWorkAreaMutation.mutate(
      {
        work_address: selectedLocation,
        work_postal_code: postalCode,
        work_city: city,
        work_country: country,
        work_latitude: coordinates.lat,
        work_longitude: coordinates.lng,
        service_radius_km: selectedRadius,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const defaultCenter = coordinates || { lat: 52.3676, lng: 4.9041 };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto'>
        <div className='p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-semibold text-slate-900'>Werkgebied bewerken</h2>
            <button
              onClick={onClose}
              className='text-slate-400 hover:text-slate-600 transition-colors'
            >
              <X className='w-6 h-6' />
            </button>
          </div>

          <div className='flex flex-col lg:flex-row gap-6'>
            <div className='w-full lg:w-[40%] space-y-6'>
              <div className='space-y-3'>
                <Label className='text-base text-slate-900'>Je werklocatie</Label>
                <PlacesAutocompleteInput
                  onPlaceSelect={handlePlaceSelect}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
              </div>

              <div className='space-y-3'>
                <Label className='text-base text-slate-900'>Straal</Label>
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
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className='bg-emerald-50 p-4 border border-accent rounded-md'>
                <p className='text-sm text-emerald-800 flex items-center gap-2'>
                  <Compass className='w-5 h-5' />
                  Jouw exacte adres wordt nooit getoond.
                </p>
              </div>
            </div>

            <div className='w-full lg:w-[60%] h-[400px] rounded-xl overflow-hidden relative'>
              <Map
                defaultCenter={defaultCenter}
                defaultZoom={coordinates ? 11 : 6}
                mapId='bf51a910020fa25a'
                gestureHandling='greedy'
                disableDefaultUI={true}
                clickableIcons={false}
              >
                <MapComponent
                  center={coordinates || defaultCenter}
                  onClick={handleMapClick}
                  radius={selectedRadius}
                >
                  {coordinates && <Marker position={coordinates} title={selectedLocation} />}
                </MapComponent>
              </Map>

              <div className='absolute top-3 right-3'>
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
              </div>
            </div>
          </div>

          <div className='flex justify-end gap-3 mt-6 pt-6 border-t border-neutral-200'>
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
              disabled={!selectedLocation || !coordinates || updateWorkAreaMutation.isPending}
            >
              {updateWorkAreaMutation.isPending ? 'Opslaan...' : 'Opslaan'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EditWorkAreaModal(props: EditWorkAreaModalProps) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  return (
    <APIProvider apiKey={googleMapsApiKey} libraries={['places']}>
      <EditWorkAreaModalContent {...props} />
    </APIProvider>
  );
}
