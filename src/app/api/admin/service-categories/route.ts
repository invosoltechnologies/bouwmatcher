import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { CreateCategoryDTO } from '@/types/categories';

export async function GET() {
  try {
    const supabase = await createClient();

    // Fetch all non-deleted categories (both active and inactive)
    const { data: serviceCategories, error } = await supabase
      .from('service_categories')
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
    const categoriesWithCount = (serviceCategories || []).map((cat: { id: number; slug: string; name_nl: string; name_en: string; icon_url: string | null; is_active: boolean; is_deleted: boolean; deleted_at: string | null }) => ({
      ...cat,
      professional_count: countMap.get(cat.id) || 0,
    }));

    // Sort by professional_count descending
    categoriesWithCount.sort((a, b) => b.professional_count - a.professional_count);

    return NextResponse.json({ serviceCategories: categoriesWithCount });
  } catch (error) {
    console.error('Error in admin service categories API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body: CreateCategoryDTO = await request.json();

    // Validate required fields
    if (!body.name_nl || !body.name_en || !body.slug) {
      return NextResponse.json(
        { error: 'name_nl, name_en, and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const { data: existingCategory } = await supabase
      .from('service_categories')
      .select('id')
      .eq('slug', body.slug)
      .single();

    if (existingCategory) {
      return NextResponse.json(
        { error: 'A category with this slug already exists' },
        { status: 409 }
      );
    }

    // Create new category
    const { data: newCategory, error } = await supabase
      .from('service_categories')
      .insert({
        name_nl: body.name_nl,
        name_en: body.name_en,
        slug: body.slug,
        is_active: true,
        is_deleted: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating service category:', error);
      return NextResponse.json(
        { error: 'Failed to create service category' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Category created successfully',
        category: {
          ...newCategory,
          professional_count: 0,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in admin service categories POST route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
