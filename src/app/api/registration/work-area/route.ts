import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: profiles } = await supabase
      .from('professional_profiles')
      .select('work_address, work_latitude, work_longitude, service_radius_km')
      .eq('user_id', user.id)
      .limit(1);

    if (!profiles || profiles.length === 0) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    const profile = profiles[0];

    if (!profile.work_address || !profile.work_latitude || !profile.work_longitude) {
      return NextResponse.json({
        saved: false,
        data: null,
      });
    }

    return NextResponse.json({
      saved: true,
      data: {
        work_address: profile.work_address,
        work_latitude: profile.work_latitude,
        work_longitude: profile.work_longitude,
        service_radius_km: profile.service_radius_km || 10,
      },
    });
  } catch (error) {
    console.error('Error in work-area GET API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the request body
    const body = await request.json();
    const {
      work_address,
      work_postal_code,
      work_city,
      work_latitude,
      work_longitude,
      service_radius_km,
    } = body;

    // Validate required fields
    if (!work_address || !work_latitude || !work_longitude) {
      return NextResponse.json(
        { error: 'Missing required fields: work_address, work_latitude, work_longitude' },
        { status: 400 }
      );
    }

    // Validate coordinates
    if (
      typeof work_latitude !== 'number' ||
      typeof work_longitude !== 'number' ||
      work_latitude < -90 ||
      work_latitude > 90 ||
      work_longitude < -180 ||
      work_longitude > 180
    ) {
      return NextResponse.json(
        { error: 'Invalid coordinates' },
        { status: 400 }
      );
    }

    // Validate service radius
    if (service_radius_km && (service_radius_km < 1 || service_radius_km > 200)) {
      return NextResponse.json(
        { error: 'Service radius must be between 1 and 200 km' },
        { status: 400 }
      );
    }

    // Update professional profile with work area data
    const updateData = {
      work_address,
      work_postal_code: work_postal_code || null,
      work_city: work_city || null,
      work_latitude,
      work_longitude,
      service_radius_km: service_radius_km || 10,
      current_step: 3, // Move to step 3 after completing step 2
      updated_at: new Date().toISOString(),
    };

    // Use update without .single() to avoid the "more than one row" error
    const { data: updatedProfiles, error: updateError } = await supabase
      .from('professional_profiles')
      .update(updateData)
      .eq('user_id', user.id)
      .select();

    if (updateError) {
      console.error('Error updating work area:', updateError);
      return NextResponse.json(
        { error: 'Failed to update work area' },
        { status: 500 }
      );
    }

    // If multiple profiles were updated, log a warning
    if (updatedProfiles && updatedProfiles.length > 1) {
      console.warn(`Updated ${updatedProfiles.length} profiles for user ${user.id}. Consider cleaning up duplicates.`);
    }

    return NextResponse.json({
      success: true,
      profile: updatedProfiles?.[0] || null,
    });
  } catch (error) {
    console.error('Error in work area update API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
