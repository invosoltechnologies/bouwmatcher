import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/admin/reviews/pending
 * Fetch all pending reviews awaiting admin approval
 * Query params:
 *   - limit (default: 20)
 *   - offset (default: 0)
 *   - sortBy (default: 'created_at')
 *   - sortOrder (default: 'desc')
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Verify admin user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id, role, is_active')
      .eq('email', user.email)
      .single();

    if (!adminUser || !adminUser.is_active) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc';

    // Fetch pending reviews with company and professional info
    const { data: reviews, error: reviewsError, count } = await supabase
      .from('professional_company_ratings')
      .select(
        `
        id,
        rating,
        review_text,
        approval_status,
        approved_at,
        rejection_reason,
        created_at,
        updated_at,
        project_id,
        rated_by_user_type,
        professional_id,
        company_id,
        professional:professional_profiles(id, first_name, last_name, email),
        company:professional_companies(id, company_name)
      `,
        { count: 'exact' }
      )
      .eq('approval_status', 'pending')
      .order(sortBy, { ascending: sortOrder === 'asc' })
      .range(offset, offset + limit - 1);

    if (reviewsError) {
      console.error('Error fetching pending reviews:', reviewsError);
      return NextResponse.json(
        { error: 'Failed to fetch pending reviews' },
        { status: 500 }
      );
    }

    // Transform reviews to flatten professional and company data
    const transformedReviews = (reviews || []).map((review: any) => ({
      ...review,
      professional_name: review.professional
        ? `${review.professional.first_name} ${review.professional.last_name}`
        : 'Unknown',
      professional_email: review.professional?.email,
      company_name: review.company?.company_name,
      reviewer_name: review.rated_by_user_type === 'personal_user' ? 'Customer' : 'Professional',
    }));

    return NextResponse.json({
      reviews: transformedReviews,
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error in pending reviews API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
