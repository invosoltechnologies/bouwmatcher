import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    // Validate status if provided
    if (status && !['draft', 'pending', 'active'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Update service page
    const updateData: any = {};

    if (status) {
      updateData.status = status;
      if (status === 'active') {
        updateData.published_at = new Date().toISOString();
      }
    }

    const { data: updatedPage, error } = await supabase
      .from('service_pages')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating service page:', error);
      return NextResponse.json(
        { error: 'Failed to update service page' },
        { status: 500 }
      );
    }

    if (!updatedPage) {
      return NextResponse.json(
        { error: 'Service page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Service page updated successfully',
      servicePage: updatedPage,
    });
  } catch (error) {
    console.error('Error in admin service pages PATCH route:', error);
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

    // First, delete associated metas
    const { error: metaError } = await supabase
      .from('service_page_metas')
      .delete()
      .eq('service_page_id', id);

    if (metaError) {
      console.error('Error deleting service page metas:', metaError);
      // Continue with page deletion
    }

    // Delete service page
    const { data: deletedPage, error } = await supabase
      .from('service_pages')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error deleting service page:', error);
      return NextResponse.json(
        { error: 'Failed to delete service page' },
        { status: 500 }
      );
    }

    if (!deletedPage) {
      return NextResponse.json(
        { error: 'Service page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Service page deleted successfully',
    });
  } catch (error) {
    console.error('Error in admin service pages DELETE route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    const { data: servicePage, error } = await supabase
      .from('service_pages')
      .select(`
        id,
        service_category_id,
        status,
        created_by,
        published_by,
        published_at,
        created_at,
        updated_at,
        service_categories (
          name_nl,
          name_en
        )
      `)
      .eq('id', id)
      .single();

    if (error || !servicePage) {
      console.error('Error fetching service page:', error);
      return NextResponse.json(
        { error: 'Service page not found' },
        { status: 404 }
      );
    }

    // Map the response
    const categoryData = Array.isArray(servicePage.service_categories)
      ? servicePage.service_categories[0]
      : servicePage.service_categories;

    const mappedPage = {
      id: servicePage.id,
      service_category_id: servicePage.service_category_id,
      status: servicePage.status,
      created_by: servicePage.created_by,
      published_by: servicePage.published_by,
      published_at: servicePage.published_at,
      created_at: servicePage.created_at,
      updated_at: servicePage.updated_at,
      category_name: categoryData?.name_nl,
      category_name_nl: categoryData?.name_nl,
      category_name_en: categoryData?.name_en,
    };

    return NextResponse.json({
      servicePage: mappedPage,
    });
  } catch (error) {
    console.error('Error in admin service pages GET route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
