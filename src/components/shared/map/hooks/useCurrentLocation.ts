/**
 * useCurrentLocation Hook
 * Gets user's current location using browser geolocation API
 */

import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export function useCurrentLocation() {
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = useCallback(
    (onSuccess: (lat: number, lng: number) => void) => {
      if (!navigator.geolocation) {
        toast.error('Geolocatie wordt niet ondersteund door je browser.');
        return;
      }

      setIsLoading(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          console.log('Got coordinates:', lat, lng);
          onSuccess(lat, lng);
          toast.success('Locatie gevonden!');
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);

          // Show user-friendly message based on error code
          if (error.code === error.PERMISSION_DENIED) {
            toast('Je kunt je locatie handmatig invoeren', { icon: 'ℹ️' });
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            toast.error('Locatie is niet beschikbaar. Voer handmatig in.');
          } else if (error.code === error.TIMEOUT) {
            toast.error('Locatie verzoek verlopen. Voer handmatig in.');
          } else {
            toast.error('Kon je locatie niet ophalen. Controleer je browser instellingen.');
          }
        }
      );
    },
    []
  );

  return { getCurrentLocation, isLoading };
}
