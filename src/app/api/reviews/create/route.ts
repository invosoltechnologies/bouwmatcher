import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface CreateReviewBody {
  projectId: string;
  accessToken: string;
  professionalEmail: string;
  rating: number;
  reviewText: string;
}

/**
 * POST /api/reviews/create
 * Create a review for a completed project
 * Body: { projectId, accessToken, professionalEmail, rating, reviewText }
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateReviewBody = await request.json();
    const { projectId, accessToken, professionalEmail, rating, reviewText } = body;

    // Validate input
    if (!projectId || !accessToken || !professionalEmail || !rating || !reviewText) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return NextResponse.json(
        { error: 'Rating must be an integer between 1 and 5' },
        { status: 400 }
      );
    }

    if (reviewText.length < 10 || reviewText.length > 1000) {
      return NextResponse.json(
        { error: 'Review text must be between 10 and 1000 characters' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Step 1: Verify project and token
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id, status')
      .eq('id', projectId)
      .eq('access_token', accessToken)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { error: 'Invalid project or access token' },
        { status: 404 }
      );
    }

    // Step 2: Find professional by email
    const { data: professional, error: profError } = await supabase
      .from('professional_profiles')
      .select('id, company_id')
      .eq('quotes_email', professionalEmail.toLowerCase())
      .single();

    if (profError || !professional) {
      return NextResponse.json(
        { error: 'Professional not found' },
        { status: 404 }
      );
    }

    // Step 3: Create review record
    const { data: review, error: reviewError } = await supabase
      .from('professional_company_ratings')
      .insert({
        company_id: professional.company_id,
        professional_id: professional.id,
        project_id: projectId,
        rating,
        review_text: reviewText,
        rated_by_user_type: 'personal_user',
        approval_status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (reviewError) {
      console.error('Error creating review:', reviewError);
      throw reviewError;
    }

    console.log(`✅ Review created for project ${projectId}`);

    return NextResponse.json({
      success: true,
      message: 'Review created successfully',
      review: {
        id: review.id,
        rating: review.rating,
        review_text: review.review_text,
        created_at: review.created_at,
      },
    });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
