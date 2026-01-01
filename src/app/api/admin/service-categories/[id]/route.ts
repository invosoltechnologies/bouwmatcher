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

    // Validate category exists and is not deleted
    const { data: existingCategory, error: fetchError } = await supabase
      .from('service_categories')
      .select('id')
      .eq('id', categoryId)
      .eq('is_deleted', false)
      .single();

    if (fetchError || !existingCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Update category
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

    if (error) {
      console.error('Error updating service category:', error);
      return NextResponse.json(
        { error: 'Failed to update service category' },
        { status: 500 }
      );
    }

    // Get professional count for updated category
    const { count, error: countError } = await supabase
      .from('professional_specializations')
      .select('id', { count: 'exact' })
      .eq('service_category_id', categoryId);

    if (countError) {
      console.error(`Error counting specializations for category ${categoryId}:`, countError);
    }

    const categoryWithCount = {
      ...updatedCategory,
      professional_count: count || 0,
    };

    return NextResponse.json({
      message: 'Category updated successfully',
      category: categoryWithCount,
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

    // Validate category exists and is not deleted
    const { data: existingCategory, error: fetchError } = await supabase
      .from('service_categories')
      .select('id, is_active')
      .eq('id', categoryId)
      .eq('is_deleted', false)
      .single();

    if (fetchError || !existingCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check if category is inactive before deletion
    if (existingCategory.is_active) {
      return NextResponse.json(
        {
          error: 'Category must be deactivated before deletion',
          code: 'CATEGORY_STILL_ACTIVE',
        },
        { status: 400 }
      );
    }

    // Soft delete the category
    const { error } = await supabase
      .from('service_categories')
      .update({
        is_deleted: true,
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', categoryId);

    if (error) {
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
