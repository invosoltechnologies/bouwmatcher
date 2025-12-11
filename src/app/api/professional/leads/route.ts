import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * API endpoint to fetch matched leads for a professional
 * Matches based on:
 * 1. Professional's subscribed subcategories
 * 2. Geographic proximity (lat/long + service radius)
 */
export async function GET() {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get professional profile with work location and service radius
    const { data: profile, error: profileError } = await supabase
      .from('professional_profiles')
      .select('id, work_latitude, work_longitude, service_radius_km')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    // Check if professional has work location set up
    if (!profile.work_latitude || !profile.work_longitude) {
      return NextResponse.json(
        { error: 'Work location not configured' },
        { status: 400 }
      );
    }

    // Get professional's subscribed subcategories
    const { data: subscribedSubcategories, error: subcategoriesError } = await supabase
      .from('professional_subcategories')
      .select('subcategory_id')
      .eq('professional_id', user.id);

    if (subcategoriesError) {
      return NextResponse.json(
        { error: 'Failed to fetch subscribed categories' },
        { status: 500 }
      );
    }

    // If no subscribed subcategories, return empty array
    if (!subscribedSubcategories || subscribedSubcategories.length === 0) {
      return NextResponse.json({ leads: [] });
    }

    const subcategoryIds = subscribedSubcategories.map(s => s.subcategory_id);

    // Fetch projects that match subcategories
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select(`
        id,
        service_category_id,
        subcategory_id,
        request_type,
        has_photos,
        description,
        postcode,
        street_number,
        street_name,
        city,
        first_name,
        last_name,
        latitude,
        longitude,
        status,
        created_at,
        execution_timing,
        service_categories (
          id,
          name_nl,
          name_en
        )
      `)
      .in('subcategory_id', subcategoryIds)
      .eq('status', 'pending_quotes')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)
      .order('created_at', { ascending: false });

    if (projectsError) {
      console.error('Error fetching projects:', projectsError);
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      );
    }

    // Filter projects by geographic proximity using Haversine formula
    const serviceRadiusKm = profile.service_radius_km || 10;
    const professionalLat = parseFloat(profile.work_latitude);
    const professionalLon = parseFloat(profile.work_longitude);

    const matchedLeads = projects.filter(project => {
      if (!project.latitude || !project.longitude) return false;

      const projectLat = parseFloat(project.latitude);
      const projectLon = parseFloat(project.longitude);

      const distance = calculateDistance(
        professionalLat,
        professionalLon,
        projectLat,
        projectLon
      );

      return distance <= serviceRadiusKm;
    }).map(project => ({
      ...project,
      distance: calculateDistance(
        professionalLat,
        professionalLon,
        parseFloat(project.latitude),
        parseFloat(project.longitude)
      )
    }));

    // Sort by created_at (newest first)
    matchedLeads.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return NextResponse.json({ leads: matchedLeads });

  } catch (error) {
    console.error('Error in leads API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
