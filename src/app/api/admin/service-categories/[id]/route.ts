import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { UpdateCategoryDTO } from '@/types/categories';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    const categoryId = parseInt(id);
    const body: UpdateCategoryDTO = await request.json();

    // Update category directly (Supabase will return null if not found)
    // This combines validation and update in a single query
    const { data: updatedCategory, error } = await supabase
      .from('service_categories')
      .update({
        ...(body.name_nl && { name_nl: body.name_nl }),
        ...(body.name_en && { name_en: body.name_en }),
        ...(body.icon_url !== undefined && { icon_url: body.icon_url }),
        ...(body.is_active !== undefined && { is_active: body.is_active }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', categoryId)
      .eq('is_deleted', false)
      .select(`
        id,
        slug,
        name_nl,
        name_en,
        icon_url,
        is_active,
        is_deleted,
        deleted_at
      `)
      .single();

    if (error || !updatedCategory) {
      // Check if it's a not found error or actual error
      if (error?.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }
      console.error('Error updating service category:', error);
      return NextResponse.json(
        { error: 'Failed to update service category' },
        { status: 500 }
      );
    }

    // Return immediately without counting (frontend can refresh to get counts)
    // This makes the update much faster and prevents connection pool exhaustion
    return NextResponse.json({
      message: 'Category updated successfully',
      category: {
        ...updatedCategory,
        professional_count: 0, // Frontend will refresh and get real count
      },
    });
  } catch (error) {
    console.error('Error in admin service categories PATCH route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    const categoryId = parseInt(id);

    // Soft delete the category (only if inactive and not already deleted)
    // Using .select() to verify the operation succeeded
    const { data: deletedCategory, error } = await supabase
      .from('service_categories')
      .update({
        is_deleted: true,
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', categoryId)
      .eq('is_deleted', false)
      .eq('is_active', false)
      .select('id')
      .single();

    if (error || !deletedCategory) {
      // Check if it's because category is still active or not found
      if (error?.code === 'PGRST116') {
        // No rows matched - either not found, already deleted, or still active
        const { data: checkCategory } = await supabase
          .from('service_categories')
          .select('is_active, is_deleted')
          .eq('id', categoryId)
          .single();

        if (!checkCategory) {
          return NextResponse.json(
            { error: 'Category not found' },
            { status: 404 }
          );
        }

        if (checkCategory.is_deleted) {
          return NextResponse.json(
            { error: 'Category already deleted' },
            { status: 400 }
          );
        }

        if (checkCategory.is_active) {
          return NextResponse.json(
            {
              error: 'Category must be deactivated before deletion',
              code: 'CATEGORY_STILL_ACTIVE',
            },
            { status: 400 }
          );
        }
      }

      console.error('Error soft deleting service category:', error);
      return NextResponse.json(
        { error: 'Failed to delete service category' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Error in admin service categories DELETE route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
