import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/admin/reviews/all
 * Fetch all reviews (pending, approved, rejected) with admin approval details
 * Query params:
 *   - limit (default: 20)
 *   - offset (default: 0)
 *   - sortBy (default: 'created_at')
 *   - sortOrder (default: 'desc')
 *   - status (optional: 'pending', 'approved', 'rejected' - fetch all if not provided)
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
    const statusFilter = searchParams.get('status');

    // Build query
    let query = supabase
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
        company:professional_companies(id, company_name),
        project:projects(
          id,
          first_name,
          last_name,
          personal_user_id,
          service_category_id,
          subcategory_id,
          service_category:service_categories(id, name_nl, name_en),
          subcategory:service_subcategories(id, name_nl, name_en)
        )
      `,
        { count: 'exact' }
      );

    // Apply status filter if provided
    if (statusFilter && ['pending', 'approved', 'rejected'].includes(statusFilter)) {
      query = query.eq('approval_status', statusFilter);
    }

    // Apply sorting and pagination
    const { data: reviews, error: reviewsError, count } = await query
      .order(sortBy, { ascending: sortOrder === 'asc' })
      .range(offset, offset + limit - 1);

    if (reviewsError) {
      console.error('Error fetching all reviews:', reviewsError);
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      );
    }

    // Transform reviews to flatten professional and company data
    const transformedReviews = (reviews || []).map((review: any) => {
      // Get project owner name from project data
      const projectOwnerName = review.project
        ? `${review.project.first_name || ''} ${review.project.last_name || ''}`.trim()
        : null;

      // Get category and subcategory names
      const categoryName = review.project?.service_category?.name_nl || null;
      const subcategoryName = review.project?.subcategory?.name_nl || null;
      const categoryId = review.project?.service_category_id || null;
      const subcategoryId = review.project?.subcategory_id || null;

      return {
        ...review,
        professional_name: review.professional
          ? `${review.professional.first_name} ${review.professional.last_name}`
          : 'Unknown',
        professional_email: review.professional?.email,
        company_name: review.company?.company_name,
        reviewer_name: projectOwnerName || (review.rated_by_user_type === 'personal_user' ? 'Klant' : 'Professional'),
        project_owner_name: projectOwnerName,
        category_name: categoryName,
        subcategory_name: subcategoryName,
        category_id: categoryId,
        subcategory_id: subcategoryId,
      };
    });

    return NextResponse.json({
      reviews: transformedReviews,
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error in all reviews API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
