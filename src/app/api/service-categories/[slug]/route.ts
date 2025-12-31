import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/service-categories/[slug]
 * Fetch a single service category by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const supabase = await createClient();

    const { data: service, error } = await supabase
      .from('service_categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return NextResponse.json(
          { error: 'Service not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json({ service });
  } catch (error) {
    console.error('Error fetching service category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service category' },
      { status: 500 }
    );
  }
}
