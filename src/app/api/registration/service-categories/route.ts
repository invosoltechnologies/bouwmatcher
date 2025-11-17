import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

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

    // Get professional profile
    const { data: profile, error: profileError } = await supabase
      .from('professional_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    // Get the request body
    const body = await request.json();
    const { categoryIds } = body;

    // Validate required fields
    if (!categoryIds || !Array.isArray(categoryIds) || categoryIds.length === 0) {
      return NextResponse.json(
        { error: 'categoryIds array is required and must not be empty' },
        { status: 400 }
      );
    }

    // Validate maximum categories
    if (categoryIds.length > 10) {
      return NextResponse.json(
        { error: 'Maximum 10 categories allowed' },
        { status: 400 }
      );
    }

    // First, delete existing specializations for this professional
    const { error: deleteError } = await supabase
      .from('professional_specializations')
      .delete()
      .eq('professional_id', profile.id);

    if (deleteError) {
      console.error('Error deleting existing specializations:', deleteError);
      return NextResponse.json(
        { error: 'Failed to update specializations' },
        { status: 500 }
      );
    }

    // Insert new specializations with priority based on order
    const specializationsToInsert = categoryIds.map((categoryId: string, index: number) => ({
      professional_id: profile.id,
      service_category_id: categoryId,
      priority: index + 1,
    }));

    const { data: insertedSpecializations, error: insertError } = await supabase
      .from('professional_specializations')
      .insert(specializationsToInsert)
      .select();

    if (insertError) {
      console.error('Error inserting specializations:', insertError);
      return NextResponse.json(
        { error: 'Failed to save specializations' },
        { status: 500 }
      );
    }

    // Update current_step to 4 after completing step 3
    const { error: stepUpdateError } = await supabase
      .from('professional_profiles')
      .update({ current_step: 4, updated_at: new Date().toISOString() })
      .eq('user_id', user.id);

    if (stepUpdateError) {
      console.error('Error updating current_step:', stepUpdateError);
      // Don't fail the request, just log the error
    }

    return NextResponse.json({
      success: true,
      specializations: insertedSpecializations,
    });
  } catch (error) {
    console.error('Error in service categories update API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
