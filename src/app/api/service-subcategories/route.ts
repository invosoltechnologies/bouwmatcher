import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get categoryIds from query params
    const { searchParams } = new URL(request.url);
    const categoryIdsParam = searchParams.get('categoryIds');

    if (!categoryIdsParam) {
      return NextResponse.json(
        { error: 'categoryIds parameter is required' },
        { status: 400 }
      );
    }

    // Parse category IDs
    const categoryIds = categoryIdsParam.split(',').map(id => parseInt(id.trim(), 10));

    if (categoryIds.some(isNaN)) {
      return NextResponse.json(
        { error: 'Invalid category IDs provided' },
        { status: 400 }
      );
    }

    // Fetch subcategories for the specified categories
    const { data: subcategories, error } = await supabase
      .from('service_subcategories')
      .select('*')
      .in('service_category_id', categoryIds)
      .eq('is_active', true)
      .order('service_category_name', { ascending: true })
      .order('sort_order', { ascending: true })
      .order('name_nl', { ascending: true });

    if (error) {
      console.error('Error fetching subcategories:', error);
      return NextResponse.json(
        { error: 'Failed to fetch subcategories' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      subcategories: subcategories || [],
    });
  } catch (error) {
    console.error('Unexpected error in service-subcategories API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
