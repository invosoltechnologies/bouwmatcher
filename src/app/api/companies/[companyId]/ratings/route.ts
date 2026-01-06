import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const supabase = await createClient();
    const { companyId } = await params;

    // Fetch only approved ratings for the company
    const { data: ratings, error: ratingsError } = await supabase
      .from('professional_company_ratings')
      .select('*')
      .eq('company_id', companyId)
      .eq('approval_status', 'approved')
      .order('created_at', { ascending: false });

    if (ratingsError) {
      console.error('Error fetching ratings:', ratingsError);
      return NextResponse.json(
        { error: 'Failed to fetch ratings' },
        { status: 500 }
      );
    }

    // Fetch aggregate rating from company table (calculated by database trigger)
    const { data: companyData, error: companyError } = await supabase
      .from('professional_companies')
      .select('aggregate_rating, total_ratings')
      .eq('id', companyId)
      .single();

    if (companyError) {
      console.error('Error fetching company data:', companyError);
      return NextResponse.json(
        { error: 'Failed to fetch company data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ratings: ratings || [],
      summary: {
        averageRating: companyData?.aggregate_rating || 0,
        totalRatings: companyData?.total_ratings || 0,
      },
    });
  } catch (error) {
    console.error('Error in ratings GET API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const supabase = await createClient();

    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { companyId } = await params;
    const body = await request.json();
    const { rating, reviewText, ratingId } = body;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Get the user's professional profile
    const { data: profileData, error: profileError } = await supabase
      .from('professional_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    // Check if updating existing rating
    if (ratingId) {
      // Update existing rating
      const { data: updatedRating, error: updateError } = await supabase
        .from('professional_company_ratings')
        .update({
          rating,
          review_text: reviewText || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', ratingId)
        .eq('rated_by_profile_id', profileData.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating rating:', updateError);
        return NextResponse.json(
          { error: 'Failed to update rating' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        rating: updatedRating,
      });
    }

    // Check if professional is trying to rate their own company (prevent self-rating)
    const { data: companyData } = await supabase
      .from('professional_companies')
      .select('id')
      .eq('id', companyId)
      .single();

    if (companyData) {
      // Check if the rater's company matches the company being rated
      const { data: raterCompany } = await supabase
        .from('professional_profiles')
        .select('company_id')
        .eq('id', profileData.id)
        .single();

      if (raterCompany?.company_id === companyId) {
        return NextResponse.json(
          { error: 'Cannot rate your own company' },
          { status: 403 }
        );
      }
    }

    // Check if user already rated this company
    const { data: existingRating } = await supabase
      .from('professional_company_ratings')
      .select('id')
      .eq('company_id', companyId)
      .eq('rated_by_profile_id', profileData.id)
      .maybeSingle();

    if (existingRating) {
      return NextResponse.json(
        { error: 'You have already rated this company' },
        { status: 400 }
      );
    }

    // Create new rating
    const { data: newRating, error: createError } = await supabase
      .from('professional_company_ratings')
      .insert({
        company_id: companyId,
        rated_by_profile_id: profileData.id,
        rating,
        review_text: reviewText || null,
        approval_status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating rating:', createError);
      return NextResponse.json(
        { error: 'Failed to create rating' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      rating: newRating,
    });
  } catch (error) {
    console.error('Error in ratings POST API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const supabase = await createClient();

    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { companyId } = await params;
    const { searchParams } = new URL(request.url);
    const ratingId = searchParams.get('ratingId');

    if (!ratingId) {
      return NextResponse.json(
        { error: 'Rating ID is required' },
        { status: 400 }
      );
    }

    // Get the user's professional profile
    const { data: profileData, error: profileError } = await supabase
      .from('professional_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    // Delete rating (only if user owns it)
    const { error: deleteError } = await supabase
      .from('professional_company_ratings')
      .delete()
      .eq('id', ratingId)
      .eq('company_id', companyId)
      .eq('rated_by_profile_id', profileData.id);

    if (deleteError) {
      console.error('Error deleting rating:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete rating' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Error in ratings DELETE API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
