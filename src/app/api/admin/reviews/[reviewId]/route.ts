import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * PATCH /api/admin/reviews/[reviewId]
 * Approve or reject a pending review
 * Body: { action: 'approve' | 'reject' }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
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

    const { reviewId } = await params;
    const body = await request.json();
    const { action, rejectionReason } = body;

    // Validate action
    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be approve or reject' },
        { status: 400 }
      );
    }

    // Validate rejection reason if rejecting
    if (action === 'reject' && (!rejectionReason || rejectionReason.trim().length < 10)) {
      return NextResponse.json(
        { error: 'Rejection reason must be at least 10 characters' },
        { status: 400 }
      );
    }

    const approvalStatus = action === 'approve' ? 'approved' : 'rejected';
    const now = new Date().toISOString();

    // Prepare update object
    const updateObject: any = {
      approval_status: approvalStatus,
      updated_at: now,
    };

    if (action === 'approve') {
      updateObject.approved_at = now;
      updateObject.approved_by = adminUser.id;
    } else if (action === 'reject') {
      updateObject.rejection_reason = rejectionReason.trim();
    }

    // Update review status
    const { data: updatedReview, error: updateError } = await supabase
      .from('professional_company_ratings')
      .update(updateObject)
      .eq('id', reviewId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating review:', updateError);
      return NextResponse.json(
        { error: 'Failed to update review status' },
        { status: 500 }
      );
    }

    if (!updatedReview) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    // If approved, update the company's aggregate rating
    if (action === 'approve') {
      const { data: company, error: companyError } = await supabase
        .from('professional_companies')
        .select('id')
        .eq('id', updatedReview.company_id)
        .single();

      if (!companyError && company) {
        // Fetch all approved ratings for this company to recalculate aggregate
        const { data: approvedRatings, error: ratingsError } = await supabase
          .from('professional_company_ratings')
          .select('rating')
          .eq('company_id', company.id)
          .eq('approval_status', 'approved');

        if (!ratingsError && approvedRatings && approvedRatings.length > 0) {
          const avgRating =
            approvedRatings.reduce((sum, r) => sum + r.rating, 0) / approvedRatings.length;

          // Update company aggregate rating
          await supabase
            .from('professional_companies')
            .update({
              aggregate_rating: Math.round(avgRating * 10) / 10,
              total_ratings: approvedRatings.length,
            })
            .eq('id', company.id);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Review ${action}ed successfully`,
      review: updatedReview,
    });
  } catch (error) {
    console.error('Error in review approval API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
