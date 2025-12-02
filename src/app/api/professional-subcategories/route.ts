import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/professional-subcategories
 * Fetch all subcategories for the authenticated professional
 */
export async function GET() {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch professional's subcategories
    const { data: subcategories, error } = await supabase
      .from('professional_subcategories')
      .select(`
        id,
        subcategory_id,
        created_at,
        service_subcategories (
          id,
          slug,
          name_nl,
          name_en,
          service_category_id,
          service_category_name,
          price_particulier,
          price_zakelijk,
          icon_url
        )
      `)
      .eq('professional_id', user.id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching professional subcategories:', error);
      return NextResponse.json(
        { error: 'Failed to fetch subcategories' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      subcategories: subcategories || [],
    });
  } catch (error) {
    console.error('Unexpected error in professional-subcategories GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/professional-subcategories
 * Save professional's selected subcategories
 * Body: { subcategoryIds: number[] }
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { subcategoryIds } = body;

    // Validate input
    if (!Array.isArray(subcategoryIds)) {
      return NextResponse.json(
        { error: 'subcategoryIds must be an array' },
        { status: 400 }
      );
    }

    if (subcategoryIds.length === 0) {
      return NextResponse.json(
        { error: 'At least one subcategory must be selected' },
        { status: 400 }
      );
    }

    if (subcategoryIds.length > 30) {
      return NextResponse.json(
        { error: 'Maximum 30 subcategories allowed' },
        { status: 400 }
      );
    }

    // Validate all IDs are numbers
    if (!subcategoryIds.every((id) => typeof id === 'number' && id > 0)) {
      return NextResponse.json(
        { error: 'Invalid subcategory IDs' },
        { status: 400 }
      );
    }

    // Use a transaction-like approach: delete old, insert new
    // Step 1: Delete existing subcategories for this professional
    const { error: deleteError } = await supabase
      .from('professional_subcategories')
      .delete()
      .eq('professional_id', user.id);

    if (deleteError) {
      console.error('Error deleting old subcategories:', deleteError);
      return NextResponse.json(
        { error: 'Failed to update subcategories' },
        { status: 500 }
      );
    }

    // Step 2: Insert new subcategories
    const subcategoriesToInsert = subcategoryIds.map((subcategoryId) => ({
      professional_id: user.id,
      subcategory_id: subcategoryId,
    }));

    const { data: insertedData, error: insertError } = await supabase
      .from('professional_subcategories')
      .insert(subcategoriesToInsert)
      .select(`
        id,
        subcategory_id,
        created_at,
        service_subcategories (
          id,
          slug,
          name_nl,
          name_en,
          service_category_id,
          service_category_name,
          price_particulier,
          price_zakelijk,
          icon_url
        )
      `);

    if (insertError) {
      console.error('Error inserting subcategories:', insertError);

      // Check if it's a foreign key violation
      if (insertError.code === '23503') {
        return NextResponse.json(
          { error: 'One or more invalid subcategory IDs' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to save subcategories' },
        { status: 500 }
      );
    }

    // Update current_step to 5 after completing step 4
    const { error: stepUpdateError } = await supabase
      .from('professional_profiles')
      .update({ current_step: 5, updated_at: new Date().toISOString() })
      .eq('user_id', user.id);

    if (stepUpdateError) {
      console.error('Error updating current_step:', stepUpdateError);
      // Don't fail the request, just log the error
    }

    return NextResponse.json({
      message: 'Subcategories saved successfully',
      subcategories: insertedData,
    });
  } catch (error) {
    console.error('Unexpected error in professional-subcategories POST:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/professional-subcategories
 * Delete all professional's subcategories
 */
export async function DELETE() {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Delete all subcategories for this professional
    const { error } = await supabase
      .from('professional_subcategories')
      .delete()
      .eq('professional_id', user.id);

    if (error) {
      console.error('Error deleting subcategories:', error);
      return NextResponse.json(
        { error: 'Failed to delete subcategories' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Subcategories deleted successfully',
    });
  } catch (error) {
    console.error('Unexpected error in professional-subcategories DELETE:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
