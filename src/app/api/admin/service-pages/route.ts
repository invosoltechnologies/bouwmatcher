import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    let query = supabase
      .from('service_pages')
      .select(`
        id,
        service_category_id,
        status,
        created_by,
        updated_by,
        published_by,
        published_at,
        created_at,
        updated_at,
        service_categories (
          name_nl,
          name_en
        )
      `)
      .order('created_at', { ascending: false });

    // Apply status filter
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: servicePages, error } = await query;

    if (error) {
      console.error('Error fetching service pages:', error);
      return NextResponse.json(
        { error: 'Failed to fetch service pages' },
        { status: 500 }
      );
    }

    // Map the response to include category names
    const mappedPages = (servicePages || []).map((page: any) => ({
      id: page.id,
      service_category_id: page.service_category_id,
      status: page.status,
      created_by: page.created_by,
      updated_by: page.updated_by,
      published_by: page.published_by,
      published_at: page.published_at,
      created_at: page.created_at,
      updated_at: page.updated_at,
      category_name: page.service_categories?.name_nl,
      category_name_nl: page.service_categories?.name_nl,
      category_name_en: page.service_categories?.name_en,
    }));

    // Apply search filter (on category names)
    let filteredPages = mappedPages;
    if (search) {
      filteredPages = mappedPages.filter((page: any) =>
        (page.category_name_nl?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (page.category_name_en?.toLowerCase() || '').includes(search.toLowerCase())
      );
    }

    return NextResponse.json({
      servicePages: filteredPages,
      total: filteredPages.length,
    });
  } catch (error) {
    console.error('Error in admin service pages API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const {
      service_category_id,
      meta_title_nl,
      meta_title_en,
      meta_description_nl,
      meta_description_en,
    } = body;

    // Validate required fields
    if (!service_category_id) {
      return NextResponse.json(
        { error: 'service_category_id is required' },
        { status: 400 }
      );
    }

    // Check if a page already exists for this category
    const { data: existingPage } = await supabase
      .from('service_pages')
      .select('id')
      .eq('service_category_id', service_category_id)
      .single();

    if (existingPage) {
      return NextResponse.json(
        { error: 'A service page already exists for this category' },
        { status: 409 }
      );
    }

    // Create new service page with draft status
    const { data: newPage, error: pageError } = await supabase
      .from('service_pages')
      .insert({
        service_category_id,
        status: 'draft',
      })
      .select()
      .single();

    if (pageError) {
      console.error('Error creating service page:', pageError);
      return NextResponse.json(
        { error: 'Failed to create service page' },
        { status: 500 }
      );
    }

    // Create service page meta with the provided fields
    const { error: metaError } = await supabase
      .from('service_page_metas')
      .insert({
        service_page_id: newPage.id,
        meta_title_nl: meta_title_nl || '',
        meta_title_en: meta_title_en || '',
        meta_description_nl: meta_description_nl || '',
        meta_description_en: meta_description_en || '',
      });

    if (metaError) {
      console.error('Error creating service page meta:', metaError);
      // Still return success as the page was created
      // The meta can be added later in the page builder
    }

    return NextResponse.json(
      {
        message: 'Service page created successfully',
        servicePage: newPage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in admin service pages POST route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
