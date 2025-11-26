/**
 * useReverseGeocode Hook
 * Converts coordinates to address using Google Geocoding API
 */

import { useCallback } from 'react';
import toast from 'react-hot-toast';
import type { GoogleAddressComponent } from '@/types/map';

interface ReverseGeocodeResult {
  address: string;
  addressComponents: GoogleAddressComponent[];
}

export function useReverseGeocode() {
  const reverseGeocode = useCallback(
    async (lat: number, lng: number): Promise<ReverseGeocodeResult | null> => {
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
        toast.error('Fout bij het ophalen van het adres');
      }
      return null;
    },
    []
  );

  return { reverseGeocode };
}
