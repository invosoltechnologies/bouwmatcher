import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: serviceCategories, error } = await supabase
      .from('service_categories')
      .select('id, slug, name_nl, name_en, icon_url')
      .order('name_nl', { ascending: true });

    if (error) {
      console.error('Error fetching service categories:', error);
      return NextResponse.json(
        { error: 'Failed to fetch service categories' },
        { status: 500 }
      );
    }

    return NextResponse.json({ serviceCategories });
  } catch (error) {
    console.error('Error in service categories API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
