import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const service_category_id = searchParams.get('service_category_id');
    const service_subcategory_id = searchParams.get('service_subcategory_id');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('blog_posts')
      .select(`
        id,
        slug,
        service_category_id,
        service_subcategory_id,
        published_at,
        service_categories (
          id,
          name_nl,
          name_en
        ),
        service_subcategories (
          id,
          name_nl,
          name_en
        ),
        blog_post_content (
          title_nl,
          title_en,
          excerpt_nl,
          excerpt_en,
          featured_image_url
        )
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply category filter
    if (service_category_id) {
      query = query.eq('service_category_id', service_category_id);
    }

    // Apply subcategory filter
    if (service_subcategory_id) {
      query = query.eq('service_subcategory_id', service_subcategory_id);
    }

    const { data: blogPosts, error } = await query;

    if (error) {
      console.error('Error fetching published blog posts:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blog posts' },
        { status: 500 }
      );
    }

    // Map the response to flatten the structure
    const mappedPosts = (blogPosts || []).map((post: any) => ({
      id: post.id,
      slug: post.slug,
      service_category_id: post.service_category_id,
      service_subcategory_id: post.service_subcategory_id,
      published_at: post.published_at,
      service_category: post.service_categories,
      service_subcategory: post.service_subcategories,
      content: post.blog_post_content?.[0] || null,
    }));

    // Get total count for pagination
    let countQuery = supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');

    if (service_category_id) {
      countQuery = countQuery.eq('service_category_id', service_category_id);
    }
    if (service_subcategory_id) {
      countQuery = countQuery.eq('service_subcategory_id', service_subcategory_id);
    }

    const { count } = await countQuery;

    return NextResponse.json({
      posts: mappedPosts,
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error in blog GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
