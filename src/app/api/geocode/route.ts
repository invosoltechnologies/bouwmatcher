import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Missing lat or lng parameters' },
      { status: 400 }
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error('Google Maps API key is missing');
    return NextResponse.json(
      { error: 'API key configuration error' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );

    const data = await response.json();

    console.log('Server-side geocoding response:', data);

    if (data.results && data.results[0]) {
      return NextResponse.json({
        address: data.results[0].formatted_address,
        addressComponents: data.results[0].address_components || [],
        status: 'OK',
      });
    } else {
      console.error('No results in geocoding response. Status:', data.status);
      return NextResponse.json(
        { error: 'No results found', status: data.status },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error in geocoding API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}