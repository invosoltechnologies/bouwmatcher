'use client';

import { useEffect, useRef } from 'react';
import { Map, Marker, useMap } from '@vis.gl/react-google-maps';
import { ZoomControls } from './MapControls/ZoomControls';
import type { Coordinates, MapType } from '@/types/map';
import { DEFAULT_MAP_CENTER } from '@/types/map';

interface ServiceRadiusMapProps {
  center: Coordinates;
  onClick: (lat: number, lng: number) => void;
  radius: number;
  showZoomControls?: boolean;
  mapTypeId?: MapType;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Map component inner logic that uses the map instance
 */
function MapLogic({
  center,
  onClick,
  radius,
}: {
  center: Coordinates;
  onClick: (lat: number, lng: number) => void;
  radius: number;
}) {
  const map = useMap();
  const circleRef = useRef<google.maps.Circle | null>(null);

  // Handle map click events
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

  // Pan map to center when coordinates change
  useEffect(() => {
    if (!map || !center.lat || !center.lng) return;

    // Don't pan if it's the default Netherlands center
    if (center.lat === DEFAULT_MAP_CENTER.lat && center.lng === DEFAULT_MAP_CENTER.lng) return;

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
    if (center.lat === DEFAULT_MAP_CENTER.lat && center.lng === DEFAULT_MAP_CENTER.lng) return;

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

  return null;
}

/**
 * Service Radius Map Component
 *
 * Displays an interactive Google Map with:
 * - Click-to-select location functionality
 * - Service radius circle visualization
 * - Marker at selected location
 * - Optional zoom controls
 */
export function ServiceRadiusMap({
  center,
  onClick,
  radius,
  showZoomControls = true,
  mapTypeId = 'terrain',
  className = 'w-full h-[500px] rounded-xl overflow-hidden',
  children,
}: ServiceRadiusMapProps) {
  // Determine if we should show a marker (not at default center)
  const showMarker = center.lat !== DEFAULT_MAP_CENTER.lat || center.lng !== DEFAULT_MAP_CENTER.lng;

  return (
    <div className={`relative ${className}`}>
      <Map
        defaultCenter={DEFAULT_MAP_CENTER}
        defaultZoom={6}
        mapTypeId={mapTypeId}
        gestureHandling='greedy'
        disableDefaultUI
        clickableIcons={false}
      >
        {/* Map logic (event listeners, circle drawing) */}
        <MapLogic center={center} onClick={onClick} radius={radius} />

        {/* Marker at selected location */}
        {showMarker && <Marker position={center} />}

        {/* Zoom controls */}
        {showZoomControls && <ZoomControls position='bottom-right' />}

        {/* Additional children (e.g., other controls) */}
        {children}
      </Map>
    </div>
  );
}
