import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface SectionsConfig {
  order: string[];
  active: string[];
}

const SECTION_TABLE_MAPPING: Record<string, { table: string; relations?: string[] }> = {
  intro: { table: 'service_page_intro' },
  faq: { table: 'service_page_faqs', relations: ['service_page_faq_items'] },
  comparison_table: { table: 'service_page_comparison_tables' },
  tips: { table: 'service_page_tips' },
  overview_table: { table: 'service_page_overview_tables' },
  seo_content: { table: 'service_page_seo_content' },
  process: { table: 'service_page_process', relations: ['service_page_process_steps'] },
  values: { table: 'service_page_values', relations: ['service_page_value_items'] },
  cta: { table: 'service_page_cta' },
  types: { table: 'service_page_types' },
  reviews: { table: 'service_page_reviews' },
  marquees: { table: 'service_page_marquees', relations: ['service_page_marquee_items'] },
};

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { searchParams } = new URL(request.url);
    const servicePageId = searchParams.get('servicePageId');

    if (!servicePageId) {
      return NextResponse.json(
        { error: 'servicePageId is required' },
        { status: 400 }
      );
    }

    const { data: page, error } = await supabase
      .from('service_pages')
      .select('sections_config')
      .eq('id', servicePageId)
      .single();

    if (error) throw error;

    return NextResponse.json(page?.sections_config || { order: ['banner'], active: ['banner'] });
  } catch (error) {
    console.error('Error fetching sections config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sections config' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { servicePageId, sectionKey } = await request.json();

    if (!servicePageId || !sectionKey) {
      return NextResponse.json(
        { error: 'servicePageId and sectionKey are required' },
        { status: 400 }
      );
    }

    if (!SECTION_TABLE_MAPPING[sectionKey]) {
      return NextResponse.json(
        { error: 'Invalid section key' },
        { status: 400 }
      );
    }

    // Fetch current config
    const { data: page, error: fetchError } = await supabase
      .from('service_pages')
      .select('sections_config')
      .eq('id', servicePageId)
      .single();

    if (fetchError) throw fetchError;

    const config: SectionsConfig = page?.sections_config || { order: ['banner'], active: ['banner'] };

    // Add section if not already active
    if (!config.active.includes(sectionKey)) {
      config.active.push(sectionKey);
      config.order.push(sectionKey);
    }

    // Update config
    const { error: updateError } = await supabase
      .from('service_pages')
      .update({ sections_config: config })
      .eq('id', servicePageId);

    if (updateError) throw updateError;

    return NextResponse.json({
      message: 'Section added successfully',
      config,
    });
  } catch (error) {
    console.error('Error adding section:', error);
    return NextResponse.json(
      { error: 'Failed to add section' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { servicePageId, sectionKey } = await request.json();

    if (!servicePageId || !sectionKey) {
      return NextResponse.json(
        { error: 'servicePageId and sectionKey are required' },
        { status: 400 }
      );
    }

    if (sectionKey === 'banner') {
      return NextResponse.json(
        { error: 'Cannot delete banner section' },
        { status: 400 }
      );
    }

    const sectionInfo = SECTION_TABLE_MAPPING[sectionKey];
    if (!sectionInfo) {
      return NextResponse.json(
        { error: 'Invalid section key' },
        { status: 400 }
      );
    }

    // Delete related items first if they exist
    if (sectionInfo.relations) {
      for (const relationTable of sectionInfo.relations) {
        // Find the foreign key column name
        const fkColumn = sectionInfo.table.endsWith('s')
          ? sectionInfo.table.slice(0, -1) + '_id'
          : sectionInfo.table + '_id';

        // Get all related items
        const { data: relatedData } = await supabase
          .from(relationTable)
          .select('id')
          .eq(fkColumn, (
            await supabase
              .from(sectionInfo.table)
              .select('id')
              .eq('service_page_id', servicePageId)
          ).data?.[0]?.id);

        // Delete related items
        if (relatedData && relatedData.length > 0) {
          await supabase
            .from(relationTable)
            .delete()
            .eq(fkColumn, (
              await supabase
                .from(sectionInfo.table)
                .select('id')
                .eq('service_page_id', servicePageId)
            ).data?.[0]?.id);
        }
      }
    }

    // Delete main section
    const { error: deleteError } = await supabase
      .from(sectionInfo.table)
      .delete()
      .eq('service_page_id', servicePageId);

    if (deleteError) throw deleteError;

    // Update config
    const { data: page, error: fetchError } = await supabase
      .from('service_pages')
      .select('sections_config')
      .eq('id', servicePageId)
      .single();

    if (fetchError) throw fetchError;

    const config: SectionsConfig = page?.sections_config || { order: ['banner'], active: ['banner'] };
    config.active = config.active.filter((s) => s !== sectionKey);
    config.order = config.order.filter((s) => s !== sectionKey);

    const { error: updateError } = await supabase
      .from('service_pages')
      .update({ sections_config: config })
      .eq('id', servicePageId);

    if (updateError) throw updateError;

    return NextResponse.json({
      message: 'Section deleted successfully',
      config,
    });
  } catch (error) {
    console.error('Error deleting section:', error);
    return NextResponse.json(
      { error: 'Failed to delete section' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { servicePageId, order } = await request.json();

    if (!servicePageId || !order || !Array.isArray(order)) {
      return NextResponse.json(
        { error: 'servicePageId and order array are required' },
        { status: 400 }
      );
    }

    // Fetch current config
    const { data: page, error: fetchError } = await supabase
      .from('service_pages')
      .select('sections_config')
      .eq('id', servicePageId)
      .single();

    if (fetchError) throw fetchError;

    const config: SectionsConfig = page?.sections_config || { order: ['banner'], active: ['banner'] };

    // Validate that banner is always first
    if (order[0] !== 'banner') {
      return NextResponse.json(
        { error: 'Banner must be the first section' },
        { status: 400 }
      );
    }

    // Update order
    config.order = order;

    const { error: updateError } = await supabase
      .from('service_pages')
      .update({ sections_config: config })
      .eq('id', servicePageId);

    if (updateError) throw updateError;

    return NextResponse.json({
      message: 'Sections reordered successfully',
      config,
    });
  } catch (error) {
    console.error('Error reordering sections:', error);
    return NextResponse.json(
      { error: 'Failed to reorder sections' },
      { status: 500 }
    );
  }
}
