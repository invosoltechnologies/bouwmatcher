import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    // Fetch categories with count of professionals per category
    // Filter: only active and non-deleted categories
    const { data: serviceCategories, error } = await supabase
      .from('service_categories')
      .select(`
        id,
        slug,
        name_nl,
        name_en,
        icon_url,
        is_active
      `)
      .eq('is_active', true)
      .eq('is_deleted', false);

    if (error) {
      console.error('Error fetching service categories:', error);
      return NextResponse.json(
        { error: 'Failed to fetch service categories' },
        { status: 500 }
      );
    }

    // Get all professional specializations in a single query
    const { data: specializations, error: countError } = await supabase
      .from('professional_specializations')
      .select('service_category_id');

    // Count professionals per category
    const countMap = new Map<number, number>();
    if (!countError && specializations) {
      specializations.forEach((spec: { service_category_id: number }) => {
        const categoryId = spec.service_category_id;
        countMap.set(categoryId, (countMap.get(categoryId) || 0) + 1);
      });
    } else if (countError) {
      console.error('Error fetching professional specializations:', countError);
    }

    // Map counts to categories
    const categoriesWithCount = (serviceCategories || []).map((cat: { id: number; slug: string; name_nl: string; name_en: string; icon_url: string | null; is_active: boolean }) => ({
      ...cat,
      professional_count: countMap.get(cat.id) || 0,
    }));

    // Sort by professional_count descending
    categoriesWithCount.sort((a, b) => b.professional_count - a.professional_count);

    return NextResponse.json({ serviceCategories: categoriesWithCount });
  } catch (error) {
    console.error('Error in service categories API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
