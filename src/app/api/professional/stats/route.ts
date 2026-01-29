import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * API endpoint to fetch monthly statistics for a professional
 * Returns:
 * - Total quote requests (matched leads) for the current month
 * - New leads this month (purchased leads)
 * - Conversion rate (purchased leads / total matched leads)
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

    // Get professional profile
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

    // Get current month start date
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthStartISO = currentMonthStart.toISOString();

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

    // If no subscribed subcategories, return zero stats
    if (!subscribedSubcategories || subscribedSubcategories.length === 0) {
      return NextResponse.json({
        quoteRequests: 0,
        newLeads: 0,
        conversionRate: 0,
      });
    }

    const subcategoryIds = subscribedSubcategories.map(s => s.subcategory_id);

    // Fetch all projects matching subcategories for this month
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, latitude, longitude, created_at')
      .in('subcategory_id', subcategoryIds)
      .gte('created_at', currentMonthStartISO)
      .in('status', ['pending_quotes', 'specialist_selected', 'in_progress', 'completed'])
      .not('latitude', 'is', null)
      .not('longitude', 'is', null);

    if (projectsError) {
      console.error('Error fetching projects:', projectsError);
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      );
    }

    // Filter projects by geographic proximity
    const serviceRadiusKm = profile.service_radius_km || 10;
    const professionalLat = parseFloat(profile.work_latitude || '0');
    const professionalLon = parseFloat(profile.work_longitude || '0');

    const matchedProjects = (projects || []).filter(project => {
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
    });

    const quoteRequests = matchedProjects.length;

    // Get professional's purchased leads for this month
    const { data: purchases, error: purchasesError } = await supabase
      .from('professional_lead_purchases')
      .select('id, created_at')
      .eq('professional_id', profile.id)
      .gte('created_at', currentMonthStartISO);

    if (purchasesError) {
      console.error('Error fetching purchases:', purchasesError);
    }

    const newLeads = purchases?.length || 0;

    // Calculate conversion rate
    const conversionRate = quoteRequests > 0
      ? Math.round((newLeads / quoteRequests) * 100)
      : 0;

    return NextResponse.json({
      quoteRequests,
      newLeads,
      conversionRate,
    });

  } catch (error) {
    console.error('Error in stats API:', error);
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
