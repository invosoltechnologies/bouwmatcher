import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = await createClient();
    const { slug } = await params;

    // Get the blog post by slug (only if published)
    const { data: blogPost, error } = await supabase
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
        blog_post_content (*),
        blog_post_meta (*)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Fetch related posts (only published ones)
    const { data: relatedPostsData } = await supabase
      .from('blog_post_related')
      .select(`
        id,
        order_index,
        related_post:blog_posts!blog_post_related_related_blog_post_id_fkey (
          id,
          slug,
          published_at,
          blog_post_content (
            title_nl,
            title_en,
            excerpt_nl,
            excerpt_en,
            featured_image_url
          )
        )
      `)
      .eq('blog_post_id', blogPost.id)
      .order('order_index', { ascending: true });

    // Filter only published related posts
    const relatedPosts = (relatedPostsData || [])
      .filter((item: any) => item.related_post)
      .map((item: any) => ({
        id: item.id,
        order_index: item.order_index,
        related_post: {
          ...item.related_post,
          content: item.related_post.blog_post_content?.[0] || null,
        },
      }));

    // Flatten the structure
    const response = {
      id: blogPost.id,
      slug: blogPost.slug,
      service_category_id: blogPost.service_category_id,
      service_subcategory_id: blogPost.service_subcategory_id,
      published_at: blogPost.published_at,
      service_category: blogPost.service_categories || null,
      service_subcategory: blogPost.service_subcategories || null,
      content: blogPost.blog_post_content?.[0] || null,
      meta: blogPost.blog_post_meta?.[0] || null,
      related_posts: relatedPosts,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in blog slug GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
