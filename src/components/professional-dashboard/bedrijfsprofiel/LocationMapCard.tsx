'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export default function LocationMapCard() {
  const handleEditLocation = () => {
    // TODO: Implement edit location functionality
    console.log('Edit location');
  };

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-semibold'>Bedrijfslocatie</CardTitle>
          <Button
            variant='outline'
            size='sm'
            onClick={handleEditLocation}
            className='rounded-xl'
          >
            Bewerk
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Map Placeholder */}
        <div className='w-full h-64 rounded-xl bg-slate-100 relative overflow-hidden'>
          {/* Placeholder map with centered marker */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-center'>
              <MapPin className='w-12 h-12 text-primary mx-auto mb-2' />
              <p className='text-sm text-muted-foreground'>Kaart wordt geladen...</p>
              <p className='text-xs text-muted-foreground mt-1'>
                Google Maps integratie
              </p>
            </div>
          </div>

          {/* TODO: Integrate Google Maps */}
          {/* <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
            <Map
              defaultCenter={{ lat: 52.3676, lng: 4.9041 }} // Amsterdam coordinates
              defaultZoom={13}
              mapId='business-location-map'
            >
              <Marker position={{ lat: 52.3676, lng: 4.9041 }} />
            </Map>
          </APIProvider> */}
        </div>
      </CardContent>
    </Card>
  );
}
