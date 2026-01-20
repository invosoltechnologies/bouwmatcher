import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateSlug } from '@/lib/utils/slug-generator';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const service_category_id = searchParams.get('service_category_id');
    const service_subcategory_id = searchParams.get('service_subcategory_id');

    let query = supabase
      .from('blog_posts')
      .select(`
        *,
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
        blog_post_content (*)
      `)
      .order('created_at', { ascending: false });

    // Apply status filter
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

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
      console.error('Error fetching blog posts:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blog posts' },
        { status: 500 }
      );
    }

    // Filter by search term if provided (search in title)
    let filteredPosts = blogPosts || [];
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPosts = filteredPosts.filter((post: any) => {
        const titleNl = post.blog_post_content?.[0]?.title_nl?.toLowerCase() || '';
        const titleEn = post.blog_post_content?.[0]?.title_en?.toLowerCase() || '';
        return titleNl.includes(searchLower) || titleEn.includes(searchLower);
      });
    }

    // Map the response to flatten the structure
    const mappedPosts = filteredPosts.map((post: any) => ({
      id: post.id,
      slug: post.slug,
      status: post.status,
      service_category_id: post.service_category_id,
      service_subcategory_id: post.service_subcategory_id,
      created_by: post.created_by,
      updated_by: post.updated_by,
      published_by: post.published_by,
      published_at: post.published_at,
      created_at: post.created_at,
      updated_at: post.updated_at,
      service_category: post.service_categories,
      service_subcategory: post.service_subcategories,
      content: post.blog_post_content?.[0] || null,
    }));

    return NextResponse.json(mappedPosts);
  } catch (error) {
    console.error('Error in blog posts GET:', error);
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
    const { slug, title_nl, title_en, service_category_id, service_subcategory_id } = body;

    // Validate required fields
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existingPost) {
      return NextResponse.json(
        { error: 'A blog post with this slug already exists' },
        { status: 400 }
      );
    }

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    // Create blog post
    const { data: blogPost, error: blogPostError } = await supabase
      .from('blog_posts')
      .insert({
        slug,
        status: 'draft',
        service_category_id: service_category_id || null,
        service_subcategory_id: service_subcategory_id || null,
        created_by: user?.id || null,
      })
      .select()
      .single();

    if (blogPostError) {
      console.error('Error creating blog post:', blogPostError);
      return NextResponse.json(
        { error: 'Failed to create blog post' },
        { status: 500 }
      );
    }

    // Always create blog post content (required for displaying title)
    const { data: content, error: contentError } = await supabase
      .from('blog_post_content')
      .insert({
        blog_post_id: blogPost.id,
        title_nl: title_nl || null,
        title_en: title_en || null,
      })
      .select()
      .single();

    if (contentError) {
      console.error('Error creating blog post content:', contentError);
      return NextResponse.json(
        { error: 'Failed to create blog post content' },
        { status: 500 }
      );
    }

    // Create empty meta record
    const { error: metaError } = await supabase
      .from('blog_post_meta')
      .insert({
        blog_post_id: blogPost.id,
      });

    if (metaError) {
      console.error('Error creating blog post meta:', metaError);
      // Don't fail the request, meta can be added later
    }

    return NextResponse.json({
      ...blogPost,
      content,
    }, { status: 201 });
  } catch (error) {
    console.error('Error in blog posts POST:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
