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
    const { name_nl, name_en, slug, is_active } = body;

    // Check if category exists
    const { data: existingCategory, error: checkError } = await supabase
      .from('service_categories')
      .select('id, slug')
      .eq('id', categoryId)
      .single();

    if (checkError || !existingCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (name_nl !== undefined) updateData.name_nl = name_nl;
    if (name_en !== undefined) updateData.name_en = name_en;
    if (is_active !== undefined) updateData.is_active = is_active;

    // If slug is being changed, check if new slug already exists
    if (slug !== undefined && slug !== existingCategory.slug) {
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
      updateData.slug = slug;
    }

    // Update the category
    const { error: updateError } = await supabase
      .from('service_categories')
      .update(updateData)
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

/**
 * DELETE /api/admin/service-categories/[id]
 * Soft delete a category
 */
export async function DELETE(
  _request: NextRequest,
  props: RouteParams
) {
  try {
    const { id } = await props.params;
    const categoryId = parseInt(id, 10);

    if (isNaN(categoryId)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }

    const supabase = await createClient();

    // Soft delete: set is_deleted = true and deleted_at
    const { error: deleteError } = await supabase
      .from('service_categories')
      .update({
        is_deleted: true,
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', categoryId);

    if (deleteError) {
      console.error('Error soft deleting category:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete category' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Category deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /api/admin/service-categories/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
