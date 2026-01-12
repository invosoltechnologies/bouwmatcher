import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = await createClient();
    const { slug } = await params;

    // Get category by slug
    const { data: category, error: categoryError } = await supabase
      .from('service_categories')
      .select('id, name_nl, name_en')
      .eq('slug', slug)
      .single();

    if (categoryError || !category) {
      // Return empty structure for fallback
      return NextResponse.json({
        hasCmsData: false,
        banner: null,
        sections: {},
        sectionsConfig: null,
      });
    }

    // Get service page for this category
    const { data: servicePage, error: pageError } = await supabase
      .from('service_pages')
      .select('id, sections_config, status')
      .eq('service_category_id', category.id)
      .eq('status', 'active')
      .single();

    if (pageError || !servicePage || servicePage.status !== 'active') {
      // No active CMS page - use fallback
      return NextResponse.json({
        hasCmsData: false,
        banner: null,
        sections: {},
        sectionsConfig: null,
      });
    }

    const pageId = servicePage.id;
    const sectionsConfig = servicePage.sections_config || {
      order: ['banner'],
      active: ['banner'],
    };

    // Fetch banner (required for CMS data trigger)
    const { data: banner } = await supabase
      .from('service_page_banners')
      .select('*')
      .eq('service_page_id', pageId)
      .single();

    // If no banner, use fallback
    if (!banner) {
      return NextResponse.json({
        hasCmsData: false,
        banner: null,
        sections: {},
        sectionsConfig: null,
      });
    }

    // Fetch all sections in parallel
    const [
      { data: intro, error: introError },
      { data: faqsData, error: faqError },
      { data: comparisonTable, error: compError },
      { data: tips, error: tipsError },
      { data: overviewTable, error: overviewError },
      { data: seoContent, error: seoError },
      { data: processData, error: processError },
      { data: valuesData, error: valuesError },
      { data: cta, error: ctaError },
      { data: types, error: typesError },
      { data: reviews, error: reviewsError },
      { data: marqueeData, error: marqueeError },
    ] = await Promise.all([
      // Intro
      supabase
        .from('service_pages_intro')
        .select('*')
        .eq('service_page_id', pageId)
        .single(),
      // FAQs with items
      supabase
        .from('service_page_faqs')
        .select('*, service_page_faq_items(*)')
        .eq('service_page_id', pageId)
        .single(),
      // Comparison table
      supabase
        .from('service_page_comparison_tables')
        .select('*')
        .eq('service_page_id', pageId)
        .single(),
      // Tips
      supabase
        .from('service_page_tips')
        .select('*')
        .eq('service_page_id', pageId)
        .single(),
      // Overview table
      supabase
        .from('service_page_overview_tables')
        .select('*')
        .eq('service_page_id', pageId)
        .single(),
      // SEO content
      supabase
        .from('service_page_seo_content')
        .select('*')
        .eq('service_page_id', pageId)
        .single(),
      // Process with steps
      supabase
        .from('service_page_process')
        .select('*, service_page_process_steps(*)')
        .eq('service_page_id', pageId)
        .single(),
      // Values with items
      supabase
        .from('service_page_values')
        .select('*, service_page_value_items(*)')
        .eq('service_page_id', pageId)
        .single(),
      // CTA
      supabase
        .from('service_page_cta')
        .select('*')
        .eq('service_page_id', pageId)
        .single(),
      // Types
      supabase
        .from('service_page_types')
        .select('*')
        .eq('service_page_id', pageId)
        .single(),
      // Reviews
      supabase
        .from('service_page_reviews')
        .select('*')
        .eq('service_page_id', pageId)
        .single(),
      // Marquees with items
      supabase
        .from('service_page_marquees')
        .select('*, service_page_marquee_items(*)')
        .eq('service_page_id', pageId)
        .single(),
    ]);

    // Build sections object with only existing data
    const sections: Record<string, any> = {};

    if (banner) sections.banner = banner;
    if (intro) sections.intro = intro;
    if (faqsData) sections.faq = faqsData;
    if (comparisonTable) sections.comparison_table = comparisonTable;
    if (tips) sections.tips = tips;
    if (overviewTable) sections.overview_table = overviewTable;
    if (seoContent) sections.seo_content = seoContent;
    if (processData) sections.process = processData;
    if (valuesData) sections.values = valuesData;
    if (cta) sections.cta = cta;
    if (types) sections.types = types;
    if (reviews) sections.reviews = reviews;
    if (marqueeData) sections.marquees = marqueeData;

    return NextResponse.json({
      hasCmsData: true,
      banner,
      sections,
      sectionsConfig,
      category: {
        id: category.id,
        name_nl: category.name_nl,
        name_en: category.name_en,
      },
    });
  } catch (error) {
    console.error('Error fetching service page:', error);
    return NextResponse.json({
      hasCmsData: false,
      banner: null,
      sections: {},
      sectionsConfig: null,
    });
  }
}
