import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface CancelProjectBody {
  projectId: string;
  accessToken: string;
  cancellationReason: string;
  review?: {
    professionalEmail: string;
    rating: number;
    reviewText: string;
  };
}

/**
 * POST /api/projects/cancel
 * Cancel a project with optional review
 * Body: { projectId, accessToken, cancellationReason, review? }
 */
export async function POST(request: NextRequest) {
  try {
    const body: CancelProjectBody = await request.json();
    const { projectId, accessToken, cancellationReason, review } = body;

    // Validate input
    if (!projectId || !accessToken || !cancellationReason) {
      return NextResponse.json(
        { error: 'projectId, accessToken, and cancellationReason are required' },
        { status: 400 }
      );
    }

    if (cancellationReason.length < 10) {
      return NextResponse.json(
        { error: 'Cancellation reason must be at least 10 characters' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Step 1: Verify project and token
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id, assigned_professional_id')
      .eq('id', projectId)
      .eq('access_token', accessToken)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { error: 'Invalid project or access token' },
        { status: 404 }
      );
    }

    // Step 2: If review provided, validate and create rating
    if (review) {
      if (!review.rating || review.rating < 1 || review.rating > 5) {
        return NextResponse.json(
          { error: 'Rating must be between 1 and 5' },
          { status: 400 }
        );
      }

      if (review.reviewText.length < 10) {
        return NextResponse.json(
          { error: 'Review text must be at least 10 characters' },
          { status: 400 }
        );
      }

      const { data: professional } = await supabase
        .from('professional_profiles')
        .select('id, company_id')
        .eq('quotes_email', review.professionalEmail.toLowerCase())
        .single();

      if (!professional) {
        return NextResponse.json(
          { error: 'Professional not found' },
          { status: 404 }
        );
      }

      // Create review record
      const { error: reviewError } = await supabase
        .from('professional_company_ratings')
        .insert({
          company_id: professional.company_id,
          professional_id: professional.id,
          project_id: projectId,
          rating: review.rating,
          review_text: review.reviewText,
          rated_by_user_type: 'personal_user',
          approval_status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (reviewError) {
        console.error('Error creating review:', reviewError);
        throw reviewError;
      }
    }

    // Step 3: Update project status and cancellation details
    const { error: updateError } = await supabase
      .from('projects')
      .update({
        status: 'cancelled',
        cancellation_reason: cancellationReason,
        cancelled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', projectId);

    if (updateError) {
      console.error('Error updating project:', updateError);
      throw updateError;
    }

    console.log(`✅ Project ${projectId} cancelled with reason: ${cancellationReason}`);

    return NextResponse.json({
      success: true,
      message: 'Project cancelled successfully',
      data: {
        projectId,
        status: 'cancelled',
        reviewCreated: !!review,
      },
    });
  } catch (error) {
    console.error('Error cancelling project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
