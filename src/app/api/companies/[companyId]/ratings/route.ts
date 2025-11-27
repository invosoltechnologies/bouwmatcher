import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { companyId: string } }
) {
  try {
    const supabase = await createClient();
    const { companyId } = params;

    // Fetch all ratings for the company
    const { data: ratings, error: ratingsError } = await supabase
      .from('professional_company_ratings')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (ratingsError) {
      console.error('Error fetching ratings:', ratingsError);
      return NextResponse.json(
        { error: 'Failed to fetch ratings' },
        { status: 500 }
      );
    }

    // Calculate average rating
    const totalRatings = ratings?.length || 0;
    const averageRating =
      totalRatings > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
        : 0;

    return NextResponse.json({
      ratings: ratings || [],
      summary: {
        averageRating: Math.round(averageRating * 10) / 10,
        totalRatings,
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
  { params }: { params: { companyId: string } }
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

    const { companyId } = params;
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
  { params }: { params: { companyId: string } }
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

    const { companyId } = params;
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
