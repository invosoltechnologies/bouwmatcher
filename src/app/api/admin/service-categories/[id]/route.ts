import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * PATCH /api/admin/service-categories/[id]
 * Update category basic information
 */
export async function PATCH(request: NextRequest, props: RouteParams) {
  try {
    const { id } = await props.params;
    const categoryId = parseInt(id, 10);

    if (isNaN(categoryId)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }

    const supabase = await createClient();
    const body = await request.json();
    const { name_nl, name_en, slug } = body;

    // Validate required fields
    if (!name_nl || !name_en || !slug) {
      return NextResponse.json(
        { error: 'name_nl, name_en, and slug are required' },
        { status: 400 }
      );
    }

    // Check if category exists
    const { data: existingCategory, error: checkError } = await supabase
      .from('service_categories')
      .select('id, slug')
      .eq('id', categoryId)
      .single();

    if (checkError || !existingCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // If slug is being changed, check if new slug already exists
    if (slug !== existingCategory.slug) {
      const { data: slugExists, error: slugCheckError } = await supabase
        .from('service_categories')
        .select('id')
        .eq('slug', slug)
        .neq('id', categoryId)
        .single();

      if (slugCheckError && slugCheckError.code !== 'PGRST116') {
        console.error('Error checking slug:', slugCheckError);
        return NextResponse.json(
          { error: 'Failed to validate slug' },
          { status: 500 }
        );
      }

      if (slugExists) {
        return NextResponse.json(
          { error: 'A category with this slug already exists' },
          { status: 409 }
        );
      }
    }

    // Update the category
    const { error: updateError } = await supabase
      .from('service_categories')
      .update({
        name_nl,
        name_en,
        slug,
        updated_at: new Date().toISOString(),
      })
      .eq('id', categoryId);

    if (updateError) {
      console.error('Error updating category:', updateError);
      return NextResponse.json(
        { error: 'Failed to update category' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error in PATCH /api/admin/service-categories/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
