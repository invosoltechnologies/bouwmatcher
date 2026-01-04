'use client';

import { useEffect, useRef, useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search, AlertCircle } from 'lucide-react';
import { useLocale } from 'next-intl';

export interface LocationData {
  postcode: string;
  city: string;
  streetName: string;
  streetNumber: string;
  latitude: number;
  longitude: number;
}

interface LocationMapSelectorProps {
  onLocationSelect: (location: LocationData) => void;
  initialLocation?: Partial<LocationData>;
  disabled?: boolean;
}

/**
 * Interactive location selector with:
 * - Google Places Autocomplete search
 * - Interactive map for pin placement
 * - Automatic reverse geocoding from pin coordinates
 * - All address fields auto-filled
 */
export function LocationMapSelector({
  onLocationSelect,
  initialLocation,
  disabled = false,
}: LocationMapSelectorProps) {
  const locale = useLocale();
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchInput, setSearchInput] = useState('');
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: initialLocation?.latitude || 50.8503,
    lng: initialLocation?.longitude || 4.3517, // Default: Belgium center
  });
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: initialLocation?.latitude || 50.8503,
    lng: initialLocation?.longitude || 4.3517,
  });
  const [locationData, setLocationData] = useState<Partial<LocationData>>(
    initialLocation || {}
  );
  const [isLoadingGeocode, setIsLoadingGeocode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiReady, setApiReady] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Load Google Maps Places library on mount
  useEffect(() => {
    if (!apiKey || typeof window === 'undefined') return;

    const script = document.getElementById('google-maps-script');
    if (script && (window as any).google?.maps?.places) {
      setApiReady(true);
      return;
    }

    if (script) {
      return; // Script is loading, wait for onload
    }

    const newScript = document.createElement('script');
    newScript.id = 'google-maps-script';
    newScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    newScript.async = true;

    newScript.onload = () => {
      // Wait a moment for the library to be fully available
      setTimeout(() => {
        if ((window as any).google?.maps?.places) {
          setApiReady(true);
        } else {
          setError('Google Maps Places library failed to load');
        }
      }, 100);
    };

    newScript.onerror = () => {
      setError('Failed to load Google Maps API');
    };

    document.head.appendChild(newScript);
  }, [apiKey]);

  // Initialize autocomplete after API is ready
  useEffect(() => {
    if (!apiReady || !searchInputRef.current) return;

    try {
      const win = window as any;
      if (!win.google?.maps?.places?.Autocomplete) {
        console.error('Google Maps Places Autocomplete library not available');
        setError('Location search unavailable');
        return;
      }

      const autocomplete = new win.google.maps.places.Autocomplete(
        searchInputRef.current,
        {
          componentRestrictions: { country: ['BE', 'NL'] },
          types: ['address'],
        }
      );

      autocompleteRef.current = autocomplete;

      const handlePlaceSelect = () => {
        const place = autocomplete.getPlace();
        if (!place.geometry?.location) {
          setError('Unable to get location from search');
          return;
        }

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        setMarkerPosition({ lat, lng });
        setMapCenter({ lat, lng });
        setSearchInput('');
        setError(null);

        // Reverse geocode to get address components
        reverseGeocode(lat, lng);
      };

      autocomplete.addListener('place_changed', handlePlaceSelect);

      return () => {
        win.google.maps.event.clearInstanceListeners(autocomplete);
      };
    } catch (err) {
      console.error('Failed to initialize autocomplete:', err);
      setError('Failed to initialize location search');
    }
  }, [apiReady]);

  /**
   * Reverse geocode coordinates to get address components
   */
  const reverseGeocode = async (lat: number, lng: number) => {
    setIsLoadingGeocode(true);
    setError(null);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const result = data.results[0];
        const components = result.address_components;

        // Extract address components
        const postcode =
          components.find((c: any) =>
            c.types.includes('postal_code')
          )?.long_name || '';
        const city =
          components.find((c: any) =>
            c.types.includes('locality')
          )?.long_name ||
          components.find((c: any) =>
            c.types.includes('administrative_area_level_2')
          )?.long_name ||
          '';
        const streetName =
          components.find((c: any) => c.types.includes('route'))?.long_name || '';
        const streetNumber =
          components.find((c: any) =>
            c.types.includes('street_number')
          )?.long_name || '';

        const newLocation: LocationData = {
          postcode,
          city,
          streetName,
          streetNumber,
          latitude: lat,
          longitude: lng,
        };

        setLocationData(newLocation);
        onLocationSelect(newLocation);
      } else {
        setError('Unable to get address details from location');
      }
    } catch (err) {
      console.error('Reverse geocoding error:', err);
      setError('Failed to get address details');
    } finally {
      setIsLoadingGeocode(false);
    }
  };

  /**
   * Handle map click to place marker
   */
  const handleMapClick = (event: any) => {
    if (!event.detail?.latLng) return;

    const lat = event.detail.latLng.lat;
    const lng = event.detail.latLng.lng;

    setMarkerPosition({ lat, lng });
    setMapCenter({ lat, lng });
    reverseGeocode(lat, lng);
  };

  /**
   * Get current location using browser geolocation
   */
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoadingGeocode(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setMarkerPosition({ lat, lng });
        setMapCenter({ lat, lng });
        reverseGeocode(lat, lng);
      },
      (err) => {
        setError('Unable to access your location');
        console.error('Geolocation error:', err);
        setIsLoadingGeocode(false);
      }
    );
  };

  const t = (key: string) => {
    const translations = {
      searchPlaceholder: locale === 'nl' ? 'Zoek locatie...' : 'Search location...',
      useCurrentLocation:
        locale === 'nl' ? 'Gebruik mijn huidige locatie' : 'Use my current location',
      clickMapToPin:
        locale === 'nl'
          ? 'Klik op de kaart om een marker te plaatsen'
          : 'Click on the map to place a marker',
      address: locale === 'nl' ? 'Adres' : 'Address',
      postcode: locale === 'nl' ? 'Postcode' : 'Postcode',
      city: locale === 'nl' ? 'Stad' : 'City',
      streetName: locale === 'nl' ? 'Straatnaam' : 'Street name',
      streetNumber:
        locale === 'nl' ? 'Huisnummer' : 'House number',
      loading: locale === 'nl' ? 'Laden...' : 'Loading...',
      error: locale === 'nl' ? 'Fout' : 'Error',
    };
    return translations[key as keyof typeof translations] || key;
  };

  // Show loading state if API is not ready yet
  if (!apiReady) {
    return (
      <div className="w-full max-w-[680px] mx-auto space-y-4">
        <div className="bg-neutral-100 rounded-lg p-6 text-center">
          <p className="text-neutral-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey || ''}>
      <div className="w-full max-w-[680px] mx-auto space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Input
            ref={searchInputRef}
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            disabled={disabled}
            className="w-full placeholder:text-neutral-400 text-secondary-foreground font-medium py-2 px-4 pl-10 rounded-lg text-base md:py-4 md:px-6 md:pl-12 md:rounded-xl h-auto md:text-lg"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-neutral-400" />
        </div>

        {/* Current Location Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleUseCurrentLocation}
          disabled={disabled || isLoadingGeocode}
          className="w-full flex items-center text-base md:text-lg justify-center gap-2 px-4 py-2 md:py-4 md:px-6 rounded-lg border-2 border-primary text-primary hover:bg-primary font-medium"
        >
          <MapPin className="w-4 h-4 md:w-5 md:h-5" />
          {isLoadingGeocode ? t('loading') : t('useCurrentLocation')}
        </Button>

        {/* Map */}
        <div className="relative rounded-lg overflow-hidden border-2 border-neutral-200">
          <Map
            zoom={13}
            center={mapCenter}
            onClick={handleMapClick}
            className="w-full h-[400px]"
            reuseMaps={true}
          >
            <Marker position={markerPosition} />
          </Map>

          <div className="absolute top-4 left-4 right-4 bg-white bg-opacity-90 rounded-lg px-3 py-2 text-sm text-neutral-600 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{t('clickMapToPin')}</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Address Details Section */}
        {Object.keys(locationData).length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-secondary-foreground text-sm">
              {t('address')}
            </h3>

            {/* Postcode & City Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  {t('postcode')}
                </label>
                <input
                  type="text"
                  value={locationData.postcode || ''}
                  readOnly
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  {t('city')}
                </label>
                <input
                  type="text"
                  value={locationData.city || ''}
                  readOnly
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm font-medium"
                />
              </div>
            </div>

            {/* Street Name & Number Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  {t('streetName')}
                </label>
                <input
                  type="text"
                  value={locationData.streetName || ''}
                  readOnly
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  {t('streetNumber')}
                </label>
                <input
                  type="text"
                  value={locationData.streetNumber || ''}
                  readOnly
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded text-sm font-medium"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </APIProvider>
  );
}
