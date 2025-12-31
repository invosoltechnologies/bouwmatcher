'use client';

import { useState, useEffect } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { Search } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import type { PlaceSelection, GoogleAddressComponent } from '@/types/map';

interface PlacesAutocompleteInputProps {
  onPlaceSelect: (place: PlaceSelection) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  placeholder?: string;
  variant?: 'default' | 'compact';
  disabled?: boolean;
}

export function PlacesAutocompleteInput({
  onPlaceSelect,
  inputValue,
  setInputValue,
  placeholder = 'Zoek adres of postcode',
  variant = 'default',
  disabled = false,
}: PlacesAutocompleteInputProps) {
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
          // Auto-select first result
          handleSelectSuggestion(predictions[0].place_id, predictions[0].description);
        } else {
          toast.error('Geen resultaten gevonden. Probeer een andere zoekopdracht.');
        }
      }
    );
  };

  // Variant-specific styling
  const inputClassName = variant === 'compact'
    ? 'w-full pl-10 pr-12 py-3 bg-white border border-neutral-300 rounded-lg text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
    : 'w-full pl-10 pr-12 py-4 bg-white border border-neutral-300 rounded-lg text-base md:text-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary';

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
          disabled={isSearching || disabled}
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
          placeholder={placeholder}
          disabled={disabled}
          className={inputClassName}
          style={{ boxShadow: '0px 2px 6.5px 0px #0000001A' }}
        />
      </div>

      {/* Autocomplete Dropdown */}
      {suggestions.length > 0 && !disabled && (
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
