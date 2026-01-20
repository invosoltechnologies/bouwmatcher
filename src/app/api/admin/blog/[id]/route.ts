import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    const { data: blogPost, error } = await supabase
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
        blog_post_content (*),
        blog_post_meta (*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Fetch related posts
    const { data: relatedPosts } = await supabase
      .from('blog_post_related')
      .select(`
        *,
        related_post:blog_posts!blog_post_related_related_blog_post_id_fkey (
          id,
          slug,
          status,
          blog_post_content (
            title_nl,
            title_en,
            excerpt_nl,
            excerpt_en,
            featured_image_url
          )
        )
      `)
      .eq('blog_post_id', id)
      .order('order_index', { ascending: true });

    // Flatten the structure
    const response = {
      ...blogPost,
      content: blogPost.blog_post_content?.[0] || null,
      meta: blogPost.blog_post_meta?.[0] || null,
      service_category: blogPost.service_categories || null,
      service_subcategory: blogPost.service_subcategories || null,
      related_posts: relatedPosts || [],
    };

    // Remove the nested arrays
    delete response.blog_post_content;
    delete response.blog_post_meta;
    delete response.service_categories;
    delete response.service_subcategories;

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in blog post GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    // Validate status
    if (!status || !['draft', 'pending', 'published'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    // Prepare update data
    const updateData: any = {
      status,
      updated_by: user?.id || null,
    };

    // If publishing, set published_at and published_by
    if (status === 'published') {
      updateData.published_at = new Date().toISOString();
      updateData.published_by = user?.id || null;
    }

    const { data: blogPost, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog post status:', error);
      return NextResponse.json(
        { error: 'Failed to update blog post status' },
        { status: 500 }
      );
    }

    return NextResponse.json(blogPost);
  } catch (error) {
    console.error('Error in blog post PATCH:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    // Delete blog post (cascade will delete related content, meta, and related posts)
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog post:', error);
      return NextResponse.json(
        { error: 'Failed to delete blog post' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in blog post DELETE:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
