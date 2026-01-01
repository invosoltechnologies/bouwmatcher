import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    // Fetch categories with count of professionals per category
    const { data: serviceCategories, error } = await supabase
      .from('service_categories')
      .select(`
        id,
        slug,
        name_nl,
        name_en,
        icon_url,
        professional_specializations(count)
      `);

    if (error) {
      console.error('Error fetching service categories:', error);
      return NextResponse.json(
        { error: 'Failed to fetch service categories' },
        { status: 500 }
      );
    }

    // Map and add professional_count, then sort by count descending
    const categoriesWithCount = (serviceCategories || []).map((cat: any) => ({
      ...cat,
      professional_count: cat.professional_specializations?.[0]?.count || 0,
      professional_specializations: undefined, // Remove the nested data
    })).sort((a: any, b: any) => b.professional_count - a.professional_count);

    return NextResponse.json({ serviceCategories: categoriesWithCount });
  } catch (error) {
    console.error('Error in service categories API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
